import { describe, expect, it } from "vitest";
import handler, { serializeToolForApi } from "./tools.js";
import { getAllTools } from "@peds-core/core";

const invokeHandler = async ({ method = "GET", query = {} } = {}) => {
  const headers = new Map();
  let resolveEnd;
  const ended = new Promise((resolve) => {
    resolveEnd = resolve;
  });
  const res = {
    statusCode: 0,
    setHeader: (name, value) => headers.set(name, value),
    end: (value) => resolveEnd(value)
  };

  const handlerPromise = handler({ method, query }, res);
  const rawBody = await ended;
  await handlerPromise;

  return {
    body: rawBody ? JSON.parse(rawBody) : null,
    headers,
    statusCode: res.statusCode
  };
};

describe("public API v1 serialization", () => {
  it("exposes local input metadata without scores or raw calculator logic", () => {
    const phoenix = getAllTools().find((tool) => tool.id === "phoenix_sepsis");
    expect(phoenix).toBeDefined();

    const serialized = serializeToolForApi(phoenix, true);

    expect(serialized.discovery.calculationAvailability).toBe("local_active");
    expect(serialized.inputSchemaAvailable).toBe(true);
    expect(serialized.inputs.length).toBeGreaterThan(0);
    expect(serialized.inputs[0]).not.toHaveProperty("score");
    expect(serialized.review.tier).toBe("A");
    expect(serialized.review.technicalAudit.status).toBe("remediated_and_verified");
    expect(serialized.review.independentReviewStatus).toBe("not_started");
  });

  it("does not expose protected/external instrument input schemas", () => {
    const flacc = getAllTools().find((tool) => tool.id === "flacc");
    expect(flacc).toBeDefined();

    const serialized = serializeToolForApi(flacc, true);

    expect(serialized.discovery.calculationAvailability).toBe("external_official");
    expect(serialized.inputSchemaAvailable).toBe(false);
    expect(serialized.inputs).toBeNull();
    expect(serialized.interpretationBands).toBeNull();
  });
});

describe("public API v1 endpoint", () => {
  it("lists tools with pagination and public caching", async () => {
    const response = await invokeHandler({ query: { limit: "2", offset: "0" } });

    expect(response.statusCode).toBe(200);
    expect(response.body.apiVersion).toBe("v1");
    expect(response.body.scope).toBe("metadata_only");
    expect(response.body.tools).toHaveLength(2);
    expect(response.body.total).toBeGreaterThan(100);
    expect(response.body.hasMore).toBe(true);
    expect(response.headers.get("Cache-Control")).toContain("s-maxage=3600");
    expect(response.headers.get("Access-Control-Allow-Origin")).toBe("*");
  });

  it("returns a detail by ID or slug", async () => {
    const byId = await invokeHandler({ query: { id: "phoenix_sepsis" } });
    const bySlug = await invokeHandler({ query: { id: "phoenix-sepsis" } });

    expect(byId.statusCode).toBe(200);
    expect(byId.body.tool.id).toBe("phoenix_sepsis");
    expect(byId.body.tool.references.length).toBeGreaterThan(0);
    expect(bySlug.body.tool.id).toBe("phoenix_sepsis");
  });

  it("supports text filtering without clinical input data", async () => {
    const response = await invokeHandler({ query: { q: "phoenix", limit: "20" } });

    expect(response.statusCode).toBe(200);
    expect(response.body.tools.some((tool) => tool.id === "phoenix_sepsis")).toBe(true);
    expect(JSON.stringify(response.body)).not.toContain("fio2_fraction");
  });

  it("returns 404 for unknown tools and rejects writes", async () => {
    const missing = await invokeHandler({ query: { id: "not-a-tool" } });
    expect(missing.statusCode).toBe(404);
    expect(missing.body.status).toBe("not_found");

    const post = await invokeHandler({ method: "POST" });
    expect(post.statusCode).toBe(405);
    expect(post.body.status).toBe("method_not_allowed");
  });

  it("supports HEAD and CORS preflight", async () => {
    const head = await invokeHandler({ method: "HEAD" });
    expect(head.statusCode).toBe(200);
    expect(head.body).toBeNull();

    const options = await invokeHandler({ method: "OPTIONS" });
    expect(options.statusCode).toBe(204);
    expect(options.body).toBeNull();
    expect(options.headers.get("Access-Control-Allow-Methods")).toContain("GET");
  });
});
