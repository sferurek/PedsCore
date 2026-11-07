import { afterEach, describe, expect, it, vi } from "vitest";
import handler, { normalizePopularToolRows } from "./tools.js";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  vi.useRealTimers();
});

const invoke = async (method = "GET") => {
  const headers = new Map();
  let body;
  const res = {
    statusCode: 0,
    setHeader: (name, value) => headers.set(name, value),
    end: (value) => { body = value; }
  };
  await handler({ method }, res);
  return { status: res.statusCode, headers, body: body ? JSON.parse(body) : null };
};

const configure = () => {
  vi.stubEnv("VERCEL_ACCESS_TOKEN", "test-secret");
  vi.stubEnv("VERCEL_ANALYTICS_PROJECT_ID", "prj_test");
  vi.stubEnv("VERCEL_ANALYTICS_TEAM_ID", "team_test");
};

describe("popular tools provider contract", () => {
  it("requests supported path grouping and limit, preserving the current UTC time", async () => {
    configure();
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-11-05T14:00:00Z"));
    const fetchMock = vi.fn(async (url, options) => {
      const query = new URL(url).searchParams;
      expect(query.get("by")).toBe("requestPath");
      expect(query.get("limit")).toBe("100");
      expect(query.get("filter")).toBe("startswith(requestPath, '/es/tools/') or startswith(requestPath, '/en/tools/')");
      expect(query.get("since")).toBe("2026-10-06T14:00:00.000Z");
      expect(query.get("until")).toBe("2026-11-05T14:00:00.000Z");
      expect(query.get("projectId")).toBe("prj_test");
      expect(query.get("teamId")).toBe("team_test");
      expect(options.headers.Authorization).toBe("Bearer test-secret");
      return Response.json({ data: [
        { requestPath: "/es/tools/pram", pageviews: 7, visitors: 3 },
        { requestPath: "/en/tools/pram", pageviews: 4, visitors: 2 },
        { requestPath: "/en/tools/pim3", pageviews: 6 },
        { requestPath: "Others", pageviews: 999 }
      ] });
    });
    vi.stubGlobal("fetch", fetchMock);
    const result = await invoke();
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(result.status).toBe(200);
    expect(result.body.tools).toEqual([{ slug: "pram", count: 11 }, { slug: "pim3", count: 6 }]);
    expect(result.headers.get("Cache-Control")).toContain("s-maxage=1800");
    expect(JSON.stringify(result.body)).not.toContain("test-secret");
  });

  it("ignores malformed and non-tool rows without discarding valid provider data", () => {
    expect(normalizePopularToolRows([
      { requestPath: "/es/tools/%invalid", pageviews: 9 },
      { requestPath: "/es/tools/pram?age=6", pageviews: 5 },
      { requestPath: "/es/topics/pram", pageviews: 5 },
      { requestPath: "/es/tools/pram", pageviews: 2 },
      { path: "/en/tools/pram", pageviews: 3 },
      { requestPath: "/en/tools/pim3", pageviews: -1 }
    ])).toEqual([{ slug: "pram", count: 5 }]);
  });

  it("preserves a truthful provider-error response on upstream failure", async () => {
    configure();
    vi.stubGlobal("fetch", vi.fn(async () => new Response("bad request", { status: 400 })));
    vi.spyOn(console, "error").mockImplementation(() => {});
    const result = await invoke();
    expect(result.status).toBe(502);
    expect(result.body).toMatchObject({ status: "provider_error", tools: [] });
    expect(result.headers.get("Cache-Control")).toBe("no-store");
  });

  it("does not call the provider when unconfigured or given an unsupported method", async () => {
    vi.stubEnv("VERCEL_ACCESS_TOKEN", "");
    vi.stubEnv("VERCEL_TOKEN", "");
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    expect((await invoke()).body.status).toBe("not_configured");
    expect((await invoke("POST")).status).toBe(405);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("supports HEAD without returning a response body", async () => {
    configure();
    vi.stubGlobal("fetch", vi.fn(async () => Response.json({ data: [] })));
    const result = await invoke("HEAD");
    expect(result.status).toBe(200);
    expect(result.body).toBeNull();
  });
});
