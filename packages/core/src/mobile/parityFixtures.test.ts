import { describe, expect, it } from "vitest";
import { calculateTool } from "../calculators/registry.js";
import {
  MOBILE_PARITY_FIXTURE_SCHEMA_VERSION,
  createMobileParityFixtureBundle
} from "./parityFixtures.js";

describe("createMobileParityFixtureBundle", () => {
  it("derives expected results from the canonical calculator registry", () => {
    const bundle = createMobileParityFixtureBundle({
      sourceRevision: "0123456789012345678901234567890123456789",
      generatedAt: "2026-09-21T06:30:00.000Z"
    });

    expect(bundle.schemaVersion).toBe(MOBILE_PARITY_FIXTURE_SCHEMA_VERSION);
    expect(bundle.cases.length).toBeGreaterThanOrEqual(7);
    expect(new Set(bundle.cases.map((item) => item.id)).size).toBe(bundle.cases.length);

    for (const fixture of bundle.cases) {
      expect(fixture.expected).toEqual(calculateTool(fixture.toolId, fixture.input));
    }
  });

  it("covers numeric, unit-conversion, invalid-input, categorical and threshold behaviour", () => {
    const bundle = createMobileParityFixtureBundle({ sourceRevision: "revision" });
    const ids = bundle.cases.map((item) => item.id);

    expect(ids).toEqual(expect.arrayContaining([
      "qtc-bazett-nominal",
      "qtc-bazett-invalid",
      "bedside-schwartz-unit-conversion",
      "step-by-step-age-high-risk",
      "step-by-step-low-risk",
      "step-by-step-threshold-intermediate"
    ]));
  });

  it("requires source provenance", () => {
    expect(() => createMobileParityFixtureBundle({ sourceRevision: "  " })).toThrow(
      "sourceRevision is required"
    );
  });
});
