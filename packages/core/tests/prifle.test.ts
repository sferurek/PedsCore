import { describe, expect, it } from "vitest";
import { prifleCalculator } from "../src/index.js";

const base = {
  baseline_eccl: 100,
  current_eccl: 100,
  urine_output_ml_kg_h: 1,
  urine_duration_hours: 0,
  anuria_hours: 0,
  persistent_failure_days: 0
};

describe("pRIFLE boundary checks", () => {
  it("keeps eCCl decline thresholds exact", () => {
    expect(prifleCalculator.calculate(base).score).toBe(0);
    expect(prifleCalculator.calculate({ ...base, current_eccl: 75 }).score).toBe(1);
    expect(prifleCalculator.calculate({ ...base, current_eccl: 50 }).score).toBe(2);
    expect(prifleCalculator.calculate({ ...base, current_eccl: 25 }).score).toBe(3);
    expect(prifleCalculator.calculate({ ...base, current_eccl: 34.9, baseline_eccl: 200 }).score).toBe(3);
  });

  it("keeps oliguria and anuria thresholds exact", () => {
    expect(prifleCalculator.calculate({ ...base, urine_output_ml_kg_h: 0.49, urine_duration_hours: 8 }).score).toBe(1);
    expect(prifleCalculator.calculate({ ...base, urine_output_ml_kg_h: 0.49, urine_duration_hours: 16 }).score).toBe(2);
    expect(prifleCalculator.calculate({ ...base, urine_output_ml_kg_h: 0.29, urine_duration_hours: 24 }).score).toBe(3);
    expect(prifleCalculator.calculate({ ...base, anuria_hours: 12 }).score).toBe(3);
  });

  it("keeps Loss and End-stage persistence thresholds exact", () => {
    expect(prifleCalculator.calculate({ ...base, persistent_failure_days: 28 }).score).toBe(0);
    expect(prifleCalculator.calculate({ ...base, persistent_failure_days: 29 }).score).toBe(4);
    expect(prifleCalculator.calculate({ ...base, persistent_failure_days: 90 }).score).toBe(4);
    expect(prifleCalculator.calculate({ ...base, persistent_failure_days: 91 }).score).toBe(5);
  });
});
