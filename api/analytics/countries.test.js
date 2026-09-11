import { afterEach, describe, expect, it, vi } from "vitest";
import handler, {
  getAnalyticsCountriesConfig,
  normalizeCountryRows
} from "./countries.js";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

const invokeHandler = async (method = "GET") => {
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

  const handlerPromise = handler({ method }, res);
  const rawBody = await ended;
  await handlerPromise;

  return {
    body: rawBody ? JSON.parse(rawBody) : null,
    headers,
    statusCode: res.statusCode
  };
};

describe("analytics countries endpoint helpers", () => {
  it("reports unconfigured and disabled Vercel states explicitly", () => {
    expect(
      getAnalyticsCountriesConfig({ ANALYTICS_STATS_PROVIDER: "vercel" })
    ).toMatchObject({ enabled: false, provider: "vercel" });
    expect(
      getAnalyticsCountriesConfig({
        ANALYTICS_STATS_PROVIDER: "vercel",
        ANALYTICS_PUBLIC_STATS_ENABLED: "false"
      })
    ).toMatchObject({ enabled: false, disabled: true, provider: "vercel" });
  });

  it("supports Vercel Web Analytics server-side configuration", () => {
    const config = getAnalyticsCountriesConfig({
      ANALYTICS_STATS_PROVIDER: "vercel",
      VERCEL_ACCESS_TOKEN: "token",
      VERCEL_ANALYTICS_PROJECT_ID: "prj_123",
      VERCEL_ANALYTICS_TEAM_ID: "team_123",
      ANALYTICS_COUNTRY_MIN_THRESHOLD: "6",
      ANALYTICS_COUNTRY_CACHE_SECONDS: "1800"
    });

    expect(config).toMatchObject({
      enabled: true,
      provider: "vercel",
      accessToken: "token",
      projectId: "prj_123",
      teamId: "team_123",
      minimumThreshold: 6,
      cacheSeconds: 1800
    });
  });

  it("keeps Umami as an explicit alternative provider", () => {
    const config = getAnalyticsCountriesConfig({
      ANALYTICS_STATS_PROVIDER: "umami",
      UMAMI_API_URL: "https://umami.example/",
      UMAMI_WEBSITE_ID: "website",
      UMAMI_API_TOKEN: "token"
    });

    expect(config).toMatchObject({
      enabled: true,
      provider: "umami",
      apiUrl: "https://umami.example"
    });
  });

  it("normalizes visitors and hides country rows below the privacy threshold", () => {
    const rows = normalizeCountryRows(
      [
        { country: "ES", visitors: 8, pageviews: 15, city: "Madrid" },
        { country: "US", visitors: 4, pageviews: 20 },
        { country: "Others", visitors: 99, pageviews: 99 }
      ],
      5
    );

    expect(rows).toEqual([
      {
        code: "ES",
        name: "Spain",
        visitors: 8,
        pageviews: 15
      }
    ]);
    expect(JSON.stringify(rows)).not.toContain("Madrid");
    expect(JSON.stringify(rows)).not.toContain("Others");
  });

  it("does not expose raw sensitive country fields", () => {
    const rows = normalizeCountryRows(
      [
        {
          country: "ES",
          visitors: 10,
          pageviews: 20,
          ip: "192.0.2.1",
          userAgent: "raw-agent",
          referrer: "https://example.invalid",
          sessionId: "session"
        }
      ],
      5
    );
    const serialized = JSON.stringify(rows);

    expect(serialized).toContain("Spain");
    expect(serialized).not.toContain("192.0.2.1");
    expect(serialized).not.toContain("raw-agent");
    expect(serialized).not.toContain("referrer");
    expect(serialized).not.toContain("session");
  });
});

describe("analytics countries endpoint", () => {
  it("serves semantically correct Vercel visitor metrics and explicit ranges", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-09-11T12:00:00.000Z"));
    vi.stubEnv("ANALYTICS_STATS_PROVIDER", "vercel");
    vi.stubEnv("VERCEL_ACCESS_TOKEN", "secret-token");
    vi.stubEnv("VERCEL_ANALYTICS_PROJECT_ID", "prj_123");
    vi.stubEnv("ANALYTICS_COUNTRY_MIN_THRESHOLD", "5");
    vi.stubEnv("ANALYTICS_COUNTRY_CACHE_SECONDS", "1800");

    const fetchMock = vi.fn(async (url, options) => {
      const requestUrl = new URL(String(url));
      expect(options.headers.Authorization).toBe("Bearer secret-token");

      if (requestUrl.pathname.endsWith("/visits/aggregate")) {
        expect(requestUrl.searchParams.get("since")).toBe("2026-08-12");
        expect(requestUrl.searchParams.get("until")).toBe("2026-09-11");
        return Response.json({
          data: [
            { country: "ES", visitors: 12, pageviews: 30 },
            { country: "US", visitors: 8, pageviews: 20 },
            { country: "FR", visitors: 4, pageviews: 10 }
          ]
        });
      }

      if (!requestUrl.searchParams.has("since")) {
        return Response.json({ data: { visitors: 50, pageviews: 120 } });
      }

      expect(requestUrl.searchParams.get("since")).toBe("2026-09-04");
      return Response.json({ data: { visitors: 9, pageviews: 18 } });
    });
    vi.stubGlobal("fetch", fetchMock);

    const response = await invokeHandler();

    expect(response.statusCode).toBe(200);
    expect(response.headers.get("Cache-Control")).toContain("s-maxage=1800");
    expect(response.body).toMatchObject({
      status: "ok",
      configured: true,
      disabled: false,
      provider: "vercel",
      metric: "visitors",
      totalsRange: "since_analytics_enabled",
      countriesRange: {
        kind: "reporting_window",
        since: "2026-08-12",
        until: "2026-09-11"
      },
      minimumThreshold: 5,
      totalVisitors: 50,
      totalPageviews: 120,
      last7DaysVisitors: 9,
      countriesReached: 3,
      countries: [
        { code: "ES", name: "Spain", visitors: 12, pageviews: 30 },
        { code: "US", name: "United States", visitors: 8, pageviews: 20 }
      ]
    });
    expect(fetchMock).toHaveBeenCalledTimes(3);
    expect(JSON.stringify(response.body)).not.toContain("secret-token");
  });

  it("keeps configured true when the provider rejects authentication", async () => {
    vi.stubEnv("ANALYTICS_STATS_PROVIDER", "vercel");
    vi.stubEnv("VERCEL_ACCESS_TOKEN", "invalid-token");
    vi.stubEnv("VERCEL_ANALYTICS_PROJECT_ID", "prj_123");
    vi.stubGlobal("fetch", vi.fn(async () => new Response(null, { status: 401 })));

    const response = await invokeHandler();

    expect(response.statusCode).toBe(502);
    expect(response.body).toMatchObject({
      status: "provider_error",
      configured: true,
      provider: "vercel"
    });
    expect(JSON.stringify(response.body)).not.toContain("invalid-token");
  });

  it("returns explicit unconfigured and disabled responses", async () => {
    vi.stubEnv("ANALYTICS_STATS_PROVIDER", "vercel");
    const unconfigured = await invokeHandler();

    expect(unconfigured.statusCode).toBe(200);
    expect(unconfigured.body).toMatchObject({
      status: "not_configured",
      configured: false,
      disabled: false,
      provider: "vercel"
    });

    vi.stubEnv("ANALYTICS_PUBLIC_STATS_ENABLED", "false");
    const disabled = await invokeHandler();
    expect(disabled.body).toMatchObject({
      status: "disabled",
      configured: false,
      disabled: true,
      provider: "vercel"
    });
  });

  it("allows HEAD without a response body and rejects other methods", async () => {
    vi.stubEnv("ANALYTICS_STATS_PROVIDER", "vercel");

    const head = await invokeHandler("HEAD");
    expect(head.statusCode).toBe(200);
    expect(head.body).toBeNull();

    const post = await invokeHandler("POST");
    expect(post.statusCode).toBe(405);
    expect(post.body).toEqual({ status: "method_not_allowed" });
  });
});
