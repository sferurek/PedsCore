import { createServer } from "node:http";
import type { AddressInfo } from "node:net";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createPedsCoreMcpApp } from "../src/app.js";

let baseUrl = "";
let httpServer: ReturnType<typeof createServer>;

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

describe("hackathon judge console", () => {
  it("serves a self-contained live MCP verification page", async () => {
    const response = await fetch(`${baseUrl}/judge-demo`);
    const html = await response.text();

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("text/html");
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(html).toContain("PedsCore AI");
    expect(html).toContain("Judge Console");
    expect(html).toContain("search_clinical_tools");
    expect(html).toContain("calculate_clinical_score");
    expect(html).toContain("start_simulation_case");
    expect(html).toContain('fetch("/mcp"');
    expect(html).toContain("9/10");
  });

  it("states the deterministic and privacy boundaries", async () => {
    const response = await fetch(`${baseUrl}/judge-demo`);
    const html = await response.text();

    expect(html).toContain("PedsCore and SIM IMV own the clinical logic");
    expect(html).toContain("No identifiable patient data");
    expect(html).toContain("Educational and simulation use only");
  });
});
