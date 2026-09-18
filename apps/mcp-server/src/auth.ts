import type { NextFunction, Request, Response } from "express";
import { createRemoteJWKSet, jwtVerify } from "jose";

export type AuthMode = "off" | "cognito";

export interface AuthConfig {
  mode: AuthMode;
  resourceUri?: string;
  authorizationServer?: string;
  issuer?: string;
  requiredScopes: string[];
}

export const loadAuthConfig = (): AuthConfig => {
  const mode = (process.env.MCP_AUTH_MODE ?? "off") as AuthMode;
  const requiredScopes = (process.env.MCP_REQUIRED_SCOPES ?? "")
    .split(/[ ,]+/)
    .map((scope) => scope.trim())
    .filter(Boolean);

  return {
    mode,
    ...(process.env.MCP_RESOURCE_URI ? { resourceUri: process.env.MCP_RESOURCE_URI } : {}),
    ...(process.env.COGNITO_AUTHORIZATION_SERVER
      ? { authorizationServer: process.env.COGNITO_AUTHORIZATION_SERVER.replace(/\/$/, "") }
      : {}),
    ...(process.env.COGNITO_ISSUER
      ? { issuer: process.env.COGNITO_ISSUER.replace(/\/$/, "") }
      : {}),
    requiredScopes
  };
};

const missingAuthConfig = (config: AuthConfig): string[] => {
  if (config.mode !== "cognito") return [];

  const missing: string[] = [];
  if (!config.resourceUri) missing.push("MCP_RESOURCE_URI");
  if (!config.authorizationServer) missing.push("COGNITO_AUTHORIZATION_SERVER");
  if (!config.issuer) missing.push("COGNITO_ISSUER");
  if (config.requiredScopes.length === 0) missing.push("MCP_REQUIRED_SCOPES");
  return missing;
};

export const validateAuthConfig = (config: AuthConfig): void => {
  if (!["off", "cognito"].includes(config.mode)) {
    throw new Error(`Unsupported MCP_AUTH_MODE: ${config.mode}`);
  }

  const missing = missingAuthConfig(config);
  if (missing.length > 0) {
    throw new Error(`Missing authentication configuration: ${missing.join(", ")}`);
  }
};

const unauthorized = (res: Response, message = "Unauthorized") => {
  res.status(401).json({
    jsonrpc: "2.0",
    error: {
      code: -32001,
      message
    },
    id: null
  });
};

export const createBearerAuthMiddleware = (config: AuthConfig) => {
  validateAuthConfig(config);

  if (config.mode === "off") {
    return (_req: Request, _res: Response, next: NextFunction) => next();
  }

  const issuer = config.issuer!;
  const resourceUri = config.resourceUri!;
  const jwks = createRemoteJWKSet(new URL(`${issuer}/.well-known/jwks.json`));

  return async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.header("authorization");

    if (!authHeader?.startsWith("Bearer ")) {
      unauthorized(res);
      return;
    }

    const token = authHeader.slice("Bearer ".length).trim();

    try {
      const { payload } = await jwtVerify(token, jwks, {
        issuer,
        audience: resourceUri
      });

      if (payload.token_use !== "access") {
        unauthorized(res);
        return;
      }

      const scopes = new Set(
        typeof payload.scope === "string" ? payload.scope.split(/\s+/).filter(Boolean) : []
      );

      const hasAllRequiredScopes = config.requiredScopes.every((scope) => scopes.has(scope));
      if (!hasAllRequiredScopes) {
        res.status(403).json({
          jsonrpc: "2.0",
          error: {
            code: -32003,
            message: "Insufficient scope"
          },
          id: null
        });
        return;
      }

      next();
    } catch {
      unauthorized(res);
    }
  };
};

export const protectedResourceMetadata = (config: AuthConfig) => {
  validateAuthConfig(config);

  if (config.mode !== "cognito") {
    return null;
  }

  return {
    resource: config.resourceUri!,
    authorization_servers: [config.authorizationServer!],
    scopes_supported: config.requiredScopes
  };
};
