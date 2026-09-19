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

describe("Alexa+ store and compliance endpoints", () => {
  it("serves privacy and terms pages over HTML", async () => {
    for (const path of ["/privacy", "/terms"]) {
      const response = await fetch(`${baseUrl}${path}`);
      expect(response.status).toBe(200);
      expect(response.headers.get("content-type")).toContain("text/html");
      expect(await response.text()).toContain("PedsCore AI");
    }
  });

  it("serves all six required light icon sizes as PNG", async () => {
    for (const size of [72, 64, 88, 126, 180, 241]) {
      const response = await fetch(`${baseUrl}/store-assets/icon-${size}x${size}.png`);
      expect(response.status).toBe(200);
      expect(response.headers.get("content-type")).toContain("image/png");
      const bytes = new Uint8Array(await response.arrayBuffer());
      expect(Array.from(bytes.slice(0, 8))).toEqual([137, 80, 78, 71, 13, 10, 26, 10]);
    }
  });

  it("serves the required 600x900 carousel image as PNG", async () => {
    const response = await fetch(`${baseUrl}/store-assets/carousel-1.png`);
    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("image/png");
    expect(Number(response.headers.get("content-length"))).toBeGreaterThan(1000);
  });
});
