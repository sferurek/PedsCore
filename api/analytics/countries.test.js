import { describe, expect, it } from "vitest";
import {
  getAnalyticsCountriesConfig,
  normalizeCountryRows
} from "./countries.js";

describe("analytics countries endpoint helpers", () => {
  it("keeps public stats disabled until server-side env vars are present", () => {
    expect(getAnalyticsCountriesConfig({}).enabled).toBe(false);
    expect(
      getAnalyticsCountriesConfig({
        UMAMI_PUBLIC_STATS_ENABLED: "false",
        UMAMI_API_URL: "https://umami.example",
        UMAMI_WEBSITE_ID: "website",
        UMAMI_API_TOKEN: "token"
      }).enabled
    ).toBe(false);
  });

  it("uses production env names for threshold and cache", () => {
    const config = getAnalyticsCountriesConfig({
      UMAMI_API_URL: "https://umami.example/",
      UMAMI_WEBSITE_ID: "website",
      UMAMI_API_TOKEN: "token",
      UMAMI_COUNTRY_MIN_THRESHOLD: "7",
      UMAMI_COUNTRY_CACHE_SECONDS: "7200"
    });

    expect(config).toMatchObject({
      enabled: true,
      apiUrl: "https://umami.example",
      minimumThreshold: 7,
      cacheSeconds: 7200
    });
  });

  it("normalizes only aggregate country rows above the privacy threshold", () => {
    const rows = normalizeCountryRows(
      [
        { name: "ES", visits: 8, pageviews: 15, city: "Madrid" },
        { name: "US", visits: 4, pageviews: 20 },
        { name: "invalid-country", visits: 99, pageviews: 99 }
      ],
      5
    );

    expect(rows).toEqual([
      {
        code: "ES",
        name: "Spain",
        visits: 8,
        pageviews: 15
      }
    ]);
    expect(JSON.stringify(rows)).not.toContain("Madrid");
    expect(JSON.stringify(rows)).not.toContain("invalid-country");
  });

  it("accepts plausible Umami metric response variants", () => {
    expect(
      normalizeCountryRows(
        [
          { x: "PT", y: 9 },
          { countryCode: "FR", visitors: 12, views: 30 },
          { code: "DE", sessions: 15, pageviews: 45 }
        ],
        5
      )
    ).toEqual([
      { code: "DE", name: "Germany", visits: 15, pageviews: 45 },
      { code: "FR", name: "France", visits: 12, pageviews: 30 },
      { code: "PT", name: "Portugal", visits: 9, pageviews: 9 }
    ]);
  });

  it("does not expose raw sensitive row fields", () => {
    const rows = normalizeCountryRows(
      [
        {
          name: "ES",
          visits: 10,
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
