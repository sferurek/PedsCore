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
      minimumVisits: 5,
      totals: {
        visits: 12,
        pageviews: 24,
        countriesReached: 1,
        last7DaysVisits: 3
      },
      countries: [
        {
          countryCode: "ES",
          countryName: "Spain",
          visits: 12,
          pageviews: 24,
          userAgent: "raw agent"
        },
        { countryCode: "invalid", countryName: "Invalid", visits: 99, pageviews: 99 }
      ]
    });

    expect(stats.countries).toEqual([
      {
        countryCode: "ES",
        countryName: "Spain",
        visits: 12,
        pageviews: 24
      }
    ]);
    expect(JSON.stringify(stats)).not.toContain("raw agent");
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
