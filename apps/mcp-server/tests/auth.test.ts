import { createServer } from "node:http";
import type { AddressInfo } from "node:net";
import { gzipSync } from "node:zlib";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createPedsCoreMcpApp } from "../src/app.js";
import type { AuthConfig } from "../src/auth.js";

const authConfig: AuthConfig = {
  mode: "cognito",
  resourceUri: "https://mcp.example.com/mcp",
  authorizationServer: "https://pedscore.auth.eu-west-1.amazoncognito.com",
  issuer: "https://cognito-idp.eu-west-1.amazonaws.com/eu-west-1_example",
  requiredScopes: ["https://mcp.example.com/mcp/clinical.read"]
};

let baseUrl = "";
let httpServer: ReturnType<typeof createServer>;

beforeAll(async () => {
  const app = createPedsCoreMcpApp({ authConfig });
  httpServer = createServer(app);

  await new Promise<void>((resolve, reject) => {
    httpServer.once("error", reject);
    httpServer.listen(0, "127.0.0.1", () => resolve());
  });

  const address = httpServer.address() as AddressInfo;
  baseUrl = `http://127.0.0.1:${address.port}`;
});

afterAll(async () => {
  await new Promise<void>((resolve, reject) => {
    httpServer.close((error) => (error ? reject(error) : resolve()));
  });
});

describe("Alexa+ OAuth resource protection", () => {
  it("publishes RFC 9728 protected resource metadata", async () => {
    const response = await fetch(`${baseUrl}/.well-known/oauth-protected-resource`);

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      resource: "https://mcp.example.com/mcp",
      authorization_servers: [
        "https://pedscore.auth.eu-west-1.amazoncognito.com"
      ],
      scopes_supported: [
        "https://mcp.example.com/mcp/clinical.read"
      ]
    });
  });

  it("returns 401 without WWW-Authenticate for unauthenticated MCP requests", async () => {
    const response = await fetch(`${baseUrl}/mcp`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json, text/event-stream"
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "tools/list",
        params: {}
      })
    });

    expect(response.status).toBe(401);
    expect(response.headers.has("www-authenticate")).toBe(false);
  });

  it("keeps health checks public and reports auth mode", async () => {
    const response = await fetch(`${baseUrl}/health`);

    expect(response.status).toBe(200);
    expect(await response.json()).toMatchObject({
      status: "ok",
      authentication: "cognito"
    });
  });

  it("keeps authentication enforced for compressed JSON requests", async () => {
    const response = await fetch(`${baseUrl}/mcp`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "content-encoding": "gzip",
        accept: "application/json, text/event-stream"
      },
      body: new Uint8Array(gzipSync(JSON.stringify({
        jsonrpc: "2.0", id: 2, method: "tools/list", params: {}
      })))
    });
    expect(response.status).toBe(401);
    await response.text();
  });

  it("survives trailing bytes after a compressed body before authentication", async () => {
    const compressed = gzipSync("{}");
    const body = new Uint8Array(Buffer.concat([compressed, Buffer.from("trailing")]));
    const response = await fetch(`${baseUrl}/mcp`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "content-encoding": "gzip"
      },
      body
    });
    expect([400, 401]).toContain(response.status);
    await response.text();
    const health = await fetch(`${baseUrl}/health`);
    expect(health.status).toBe(200);
    expect(await health.json()).toMatchObject({ status: "ok" });
  });
});
