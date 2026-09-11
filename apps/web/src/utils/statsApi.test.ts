import { afterEach, describe, expect, it, vi } from "vitest";
import {
  fetchGlobalUsageStats,
  getPublicStatsEndpoint,
  normalizeGlobalUsageStats
} from "./statsApi";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("public global stats API client", () => {
  it("normalizes Vercel visitor metrics, ranges and safe country fields", () => {
    const stats = normalizeGlobalUsageStats({
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
      totalVisitors: 12,
      totalPageviews: 24,
      countriesReached: 2,
      last7DaysVisitors: 3,
      countries: [
        {
          code: "ES",
          name: "Spain",
          visitors: 12,
          pageviews: 24,
          userAgent: "raw agent"
        },
        { code: "invalid", name: "Invalid", visitors: 99, pageviews: 99 }
      ]
    });

    expect(stats).toMatchObject({
      status: "ok",
      configured: true,
      provider: "vercel",
      totals: {
        visitors: 12,
        pageviews: 24,
        countriesReached: 2,
        last7DaysVisitors: 3
      },
      countries: [
        { code: "ES", name: "Spain", visitors: 12, pageviews: 24 }
      ]
    });
    expect(JSON.stringify(stats)).not.toContain("raw agent");
  });

  it("treats configured metrics as valid when no country meets the threshold", () => {
    const stats = normalizeGlobalUsageStats({
      status: "ok",
      configured: true,
      provider: "vercel",
      totalVisitors: 3,
      totalPageviews: 5,
      last7DaysVisitors: 3,
      countriesReached: 1,
      countries: []
    });

    expect(stats.status).toBe("ok");
    expect(stats.countries).toEqual([]);
    expect(stats.totals.visitors).toBe(3);
  });

  it("normalizes unconfigured and provider-error states without raw errors", () => {
    const unconfigured = normalizeGlobalUsageStats({
      status: "not_configured",
      configured: false,
      error: "VERCEL_ACCESS_TOKEN missing"
    });
    const failed = normalizeGlobalUsageStats({
      status: "provider_error",
      configured: true,
      provider: "vercel"
    });

    expect(unconfigured.status).toBe("not_configured");
    expect(failed.status).toBe("failed_to_load");
    expect(JSON.stringify(unconfigured)).not.toContain("VERCEL_ACCESS_TOKEN");
  });

  it.each([undefined, "", "   \t"])(
    "uses the default endpoint for an empty value: %s",
    (value) => {
      if (value !== undefined) {
        vi.stubEnv("VITE_PUBLIC_STATS_ENDPOINT", value);
      }

      expect(getPublicStatsEndpoint()).toBe("/api/analytics/countries");
    }
  );

  it("uses a configured public stats endpoint", () => {
    vi.stubEnv("VITE_PUBLIC_STATS_ENDPOINT", "  /custom/stats  ");
    expect(getPublicStatsEndpoint()).toBe("/custom/stats");
  });

  it("returns disabled state without fetching when public stats are disabled", async () => {
    vi.stubEnv("VITE_PUBLIC_STATS_ENABLED", "false");
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    await expect(fetchGlobalUsageStats()).resolves.toMatchObject({
      status: "disabled"
    });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("fails safely when the API returns an error", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        Response.json(
          { status: "provider_error", configured: true, provider: "vercel" },
          { status: 502 }
        )
      )
    );

    await expect(fetchGlobalUsageStats()).resolves.toMatchObject({
      status: "failed_to_load",
      configured: true,
      provider: "vercel"
    });
  });
});
