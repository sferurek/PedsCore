import { afterEach, describe, expect, it, vi } from "vitest";
import {
  fetchGlobalUsageStats,
  normalizeGlobalUsageStats
} from "./statsApi";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("public global stats API client", () => {
  it("normalizes only public aggregate country stats", () => {
    const stats = normalizeGlobalUsageStats({
      status: "ok",
      configured: true,
      disabled: false,
      range: "all_time",
      minimumThreshold: 5,
      totals: {
        visits: 12,
        pageviews: 24,
        countriesReached: 1,
        last7DaysVisits: 3
      },
      countries: [
        {
          code: "ES",
          name: "Spain",
          visits: 12,
          pageviews: 24,
          userAgent: "raw agent"
        },
        { code: "invalid", name: "Invalid", visits: 99, pageviews: 99 }
      ]
    });

    expect(stats.countries).toEqual([
      {
        code: "ES",
        name: "Spain",
        visits: 12,
        pageviews: 24
      }
    ]);
    expect(JSON.stringify(stats)).not.toContain("raw agent");
  });

  it("normalizes the production endpoint response shape", () => {
    const stats = normalizeGlobalUsageStats({
      configured: true,
      disabled: false,
      range: "all_time",
      totalVisits: 50,
      totalPageviews: 120,
      last7DaysVisits: 9,
      countriesReached: 1,
      countries: [{ code: "US", name: "United States", visits: 50, pageviews: 120 }]
    });

    expect(stats).toMatchObject({
      status: "ok",
      configured: true,
      disabled: false,
      range: "all_time",
      minimumThreshold: 5,
      totals: {
        visits: 50,
        pageviews: 120,
        countriesReached: 1,
        last7DaysVisits: 9
      }
    });
  });

  it("normalizes not-configured responses without raw errors", () => {
    const stats = normalizeGlobalUsageStats({
      configured: false,
      disabled: false,
      range: "all_time",
      totalVisits: 0,
      totalPageviews: 0,
      last7DaysVisits: 0,
      countriesReached: 0,
      countries: [],
      error: "UMAMI_API_TOKEN missing"
    });

    expect(stats).toMatchObject({
      status: "not_configured",
      configured: false,
      disabled: false,
      countries: []
    });
    expect(JSON.stringify(stats)).not.toContain("UMAMI_API_TOKEN");
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
});
