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
        countryCode: "ES",
        countryName: "Spain",
        visits: 8,
        pageviews: 15
      }
    ]);
    expect(JSON.stringify(rows)).not.toContain("Madrid");
    expect(JSON.stringify(rows)).not.toContain("invalid-country");
  });
});
