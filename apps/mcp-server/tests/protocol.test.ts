import { createServer } from "node:http";
import type { AddressInfo } from "node:net";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createPedsCoreMcpApp } from "../src/app.js";

let baseUrl = "";
let httpServer: ReturnType<typeof createServer>;

type RpcPayload = {
  result?: {
    protocolVersion?: string;
    serverInfo?: { name?: string };
    tools?: Array<{ name: string }>;
    isError?: boolean;
    structuredContent?: {
      tools?: Array<{ id: string }>;
      result?: {
        toolId?: string;
        score?: number;
        maxScore?: number;
        warnings?: unknown[];
      };
    };
  };
  error?: unknown;
};

const decodeRpcResponse = async (response: Response): Promise<RpcPayload> => {
  const text = await response.text();
  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    return JSON.parse(text);
  }

  const dataLines = text
    .split(/\r?\n/)
    .filter((line) => line.startsWith("data:"))
    .map((line) => line.slice(5).trim())
    .filter(Boolean);

  if (dataLines.length === 0) {
    throw new Error(`No JSON-RPC payload found in response: ${text}`);
  }

  return JSON.parse(dataLines.at(-1)!);
};

const rpc = async (body: unknown) => {
  const response = await fetch(`${baseUrl}/mcp`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      accept: "application/json, text/event-stream"
    },
    body: JSON.stringify(body)
  });

  return { response, payload: await decodeRpcResponse(response) };
};

beforeAll(async () => {
  const app = createPedsCoreMcpApp();
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

describe("PedsCore MCP Streamable HTTP protocol", () => {
  it("exposes a health endpoint", async () => {
    const response = await fetch(`${baseUrl}/health`);
    expect(response.status).toBe(200);
    expect(await response.json()).toMatchObject({
      status: "ok",
      service: "pedscore-ai-mcp",
      transport: "streamable-http"
    });
  });

  it("negotiates MCP protocol 2025-11-25", async () => {
    const { response, payload } = await rpc({
      jsonrpc: "2.0",
      id: 1,
      method: "initialize",
      params: {
        protocolVersion: "2025-11-25",
        capabilities: {},
        clientInfo: {
          name: "pedscore-ci",
          version: "0.1.0"
        }
      }
    });

    expect(response.ok).toBe(true);
    expect(payload.result?.protocolVersion).toBe("2025-11-25");
    expect(payload.result?.serverInfo?.name).toBe("pedscore-ai");
  });

  it("lists the three initial clinical tools", async () => {
    const { response, payload } = await rpc({
      jsonrpc: "2.0",
      id: 2,
      method: "tools/list",
      params: {}
    });

    expect(response.ok).toBe(true);
    const names = payload.result?.tools?.map((tool) => tool.name) ?? [];
    expect(names).toEqual(
      expect.arrayContaining([
        "search_clinical_tools",
        "get_clinical_tool",
        "calculate_clinical_score"
      ])
    );
  });

  it("discovers Apgar through the MCP tools/call protocol", async () => {
    const { response, payload } = await rpc({
      jsonrpc: "2.0",
      id: 3,
      method: "tools/call",
      params: {
        name: "search_clinical_tools",
        arguments: {
          query: "newborn apgar score",
          language: "en",
          calculableOnly: true
        }
      }
    });

    expect(response.ok).toBe(true);
    expect(payload.result?.isError).not.toBe(true);
    expect(payload.result?.structuredContent?.tools?.[0]?.id).toBe("apgar");
  });

  it("calculates Apgar deterministically through MCP", async () => {
    const { response, payload } = await rpc({
      jsonrpc: "2.0",
      id: 4,
      method: "tools/call",
      params: {
        name: "calculate_clinical_score",
        arguments: {
          toolId: "apgar",
          input: {
            assessment_time: "five_minutes",
            heart_rate: 2,
            respiratory_effort: 2,
            muscle_tone: 2,
            reflex_irritability: 2,
            color: 1
          }
        }
      }
    });

    expect(response.ok).toBe(true);
    expect(payload.result?.isError).not.toBe(true);
    expect(payload.result?.structuredContent?.result).toMatchObject({
      toolId: "apgar",
      score: 9,
      maxScore: 10,
      warnings: []
    });
  });

  it("rejects unsupported HTTP methods on the MCP endpoint", async () => {
    const response = await fetch(`${baseUrl}/mcp`);
    expect(response.status).toBe(405);
  });
});
