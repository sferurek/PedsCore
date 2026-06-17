import { describe, expect, it } from "vitest";
import {
  calculateTool,
  pediatricBurnTbsaCalculator,
  pediatricBurnTbsaRegions,
  pediatricBurnTbsaSource
} from "../src/index";

describe("Pediatric Burn TBSA calculator", () => {
  it("calculates a single complete region from the selected age band", () => {
    const result = pediatricBurnTbsaCalculator.calculate({
      age_band: "birth_to_1_year",
      burn_fraction_head: "1"
    });

    expect(result.value).toBe(19);
    expect(result.unit).toBe("%");
  });

  it("calculates partial regional involvement", () => {
    const result = pediatricBurnTbsaCalculator.calculate({
      age_band: "ten_to_fourteen_years",
      burn_fraction_anterior_trunk: "0_5"
    });

    expect(result.value).toBe(6.5);
  });

  it("sums multiple regions correctly", () => {
    const result = pediatricBurnTbsaCalculator.calculate({
      age_band: "five_to_nine_years",
      burn_fraction_head: "0_5",
      burn_fraction_right_hand: "1",
      burn_fraction_left_foot: "0_25"
    });

    expect(result.value).toBe(9.88);
  });

  it("changes head and leg contributions by age band", () => {
    const infantHead = pediatricBurnTbsaCalculator.calculate({
      age_band: "birth_to_1_year",
      burn_fraction_head: "1"
    });
    const fifteenYearHead = pediatricBurnTbsaCalculator.calculate({
      age_band: "fifteen_years",
      burn_fraction_head: "1"
    });
    const infantRightThigh = pediatricBurnTbsaCalculator.calculate({
      age_band: "birth_to_1_year",
      burn_fraction_right_thigh: "1"
    });
    const fifteenYearRightThigh = pediatricBurnTbsaCalculator.calculate({
      age_band: "fifteen_years",
      burn_fraction_right_thigh: "1"
    });

    expect(infantHead.value).toBeGreaterThan(fifteenYearHead.value ?? 0);
    expect(infantRightThigh.value).toBeLessThan(fifteenYearRightThigh.value ?? 0);
  });

  it("keeps complete-region totals at 100% or below", () => {
    const allRegions = Object.fromEntries(
      pediatricBurnTbsaRegions.map((region) => [
        `burn_fraction_${region.id}`,
        "1"
      ])
    );
    const result = pediatricBurnTbsaCalculator.calculate({
      age_band: "one_to_four_years",
      ...allRegions
    });

    expect(result.value).toBe(100);
    expect(result.warnings.map((item) => item.id)).not.toContain("tbsa_over_100");
  });

  it("rejects invalid regional fractions", () => {
    const result = pediatricBurnTbsaCalculator.calculate({
      age_band: "one_to_four_years",
      burn_fraction_head: 1.25
    });

    expect(result.warnings[0]?.id).toBe("invalid_burn_fraction");
  });

  it("requires an age band", () => {
    const result = pediatricBurnTbsaCalculator.calculate({
      burn_fraction_head: "1"
    });

    expect(result.warnings[0]?.id).toBe("missing_age_band");
  });

  it("is registered for generic calculation", () => {
    const result = calculateTool("pediatric_burn_tbsa", {
      age_band: "fifteen_years",
      burn_fraction_head: "1"
    });

    expect(result.value).toBe(9);
  });

  it("uses a numeric source without therapeutic output", () => {
    const result = pediatricBurnTbsaCalculator.calculate({
      age_band: "five_to_nine_years",
      burn_fraction_head: "1"
    });
    const serialized = JSON.stringify({
      source: pediatricBurnTbsaSource,
      result
    }).toLocaleLowerCase("en");

    expect(serialized).toContain("numeric");
    expect(serialized).toContain("superficial");
    expect(serialized).not.toContain("fluid volume");
    expect(serialized).not.toContain("refer to burn");
    expect(serialized).not.toContain("severe burn");
  });
});
