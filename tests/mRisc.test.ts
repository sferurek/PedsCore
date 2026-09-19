import { describe, expect, it } from "vitest";
import { mRiscCalculator } from "../packages/core/src/calculators/mRisc.js";

const base = { age_months: 12, spo2_percent: 95, chest_indrawing: false, wheezing: false, refusing_feeds: false, dehydration: false, weight_for_age_z: 0 };

describe("mRISC", () => {
  it("scores zero without risk factors", () => expect(mRiscCalculator.calculate(base).score).toBe(0));
  it("scores the maximum eight when all positive risk factors are present", () => {
    const result = mRiscCalculator.calculate({ ...base, spo2_percent: 89, chest_indrawing: true, refusing_feeds: true, dehydration: true, weight_for_age_z: -3.1 });
    expect(result.score).toBe(8);
    expect(result.maxScore).toBe(8);
  });
  it("subtracts one point for wheezing", () => expect(mRiscCalculator.calculate({ ...base, wheezing: true }).score).toBe(-1));
  it("uses strict hypoxemia and malnutrition boundaries", () => {
    expect(mRiscCalculator.calculate({ ...base, spo2_percent: 90 }).score).toBe(0);
    expect(mRiscCalculator.calculate({ ...base, spo2_percent: 89.9 }).score).toBe(3);
    expect(mRiscCalculator.calculate({ ...base, weight_for_age_z: -2 }).score).toBe(0);
    expect(mRiscCalculator.calculate({ ...base, weight_for_age_z: -2.01 }).score).toBe(1);
    expect(mRiscCalculator.calculate({ ...base, weight_for_age_z: -3.01 }).score).toBe(2);
  });
  it("rejects ages outside the under-five derivation population", () => {
    const result = mRiscCalculator.calculate({ ...base, age_months: 60 });
    expect(result.score).toBeUndefined();
    expect(result.warnings.some((w) => w.id === "mrisc_scope")).toBe(true);
  });
});
