import { describe, expect, it } from "vitest";
import { getCountryGeometry } from "./globalMap";

describe("Natural Earth country mapping", () => {
  it.each(["ES", "US", "GB", "FR", "DE", "BR", "AU", "JP"])(
    "maps %s to a polygon and representative point",
    (code) => {
      const country = getCountryGeometry(code);
      expect(country?.path).toMatch(/^M/);
      expect(country?.x).toBeGreaterThan(0);
      expect(country?.y).toBeGreaterThan(0);
    }
  );

  it("returns no geometry for an unknown ISO code", () => {
    expect(getCountryGeometry("ZZ")).toBeUndefined();
  });
});
