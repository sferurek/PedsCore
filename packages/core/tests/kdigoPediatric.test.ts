import { describe, expect, it } from "vitest";
import { kdigoPediatricCalculator } from "../src/index.js";

const base = {
  baseline_creatinine_mg_dl: 1,
  current_creatinine_mg_dl: 1,
  age_years: 10,
  current_egfr: 100,
  urine_output_ml_kg_h: 1,
  urine_duration_hours: 0,
  anuria_hours: 0,
  renal_replacement_therapy: false,
  baseline_within_7_days: true,
  rise_within_48_hours: true
};

describe("pediatric KDIGO 2012 boundary checks", () => {
  it("keeps serum-creatinine ratio thresholds exact", () => {
    expect(kdigoPediatricCalculator.calculate(base).score).toBe(0);
    expect(kdigoPediatricCalculator.calculate({ ...base, current_creatinine_mg_dl: 1.5 }).score).toBe(1);
    expect(kdigoPediatricCalculator.calculate({ ...base, current_creatinine_mg_dl: 2 }).score).toBe(2);
    expect(kdigoPediatricCalculator.calculate({ ...base, current_creatinine_mg_dl: 3 }).score).toBe(3);
  });

  it("recognizes the 48-hour absolute rise and pediatric eGFR criterion", () => {
    expect(kdigoPediatricCalculator.calculate({
      ...base,
      baseline_creatinine_mg_dl: 0.5,
      current_creatinine_mg_dl: 0.8,
      baseline_within_7_days: false,
      rise_within_48_hours: true
    }).score).toBe(1);
    expect(kdigoPediatricCalculator.calculate({ ...base, current_egfr: 35 }).score).toBe(0);
    expect(kdigoPediatricCalculator.calculate({ ...base, current_egfr: 34.9 }).score).toBe(3);
    expect(kdigoPediatricCalculator.calculate({ ...base, renal_replacement_therapy: true }).score).toBe(3);
  });

  it("keeps urine-output and anuria duration thresholds exact", () => {
    expect(kdigoPediatricCalculator.calculate({ ...base, urine_output_ml_kg_h: 0.49, urine_duration_hours: 6 }).score).toBe(1);
    expect(kdigoPediatricCalculator.calculate({ ...base, urine_output_ml_kg_h: 0.49, urine_duration_hours: 12 }).score).toBe(2);
    expect(kdigoPediatricCalculator.calculate({ ...base, urine_output_ml_kg_h: 0.29, urine_duration_hours: 24 }).score).toBe(3);
    expect(kdigoPediatricCalculator.calculate({ ...base, urine_output_ml_kg_h: 1, urine_duration_hours: 0, anuria_hours: 12 }).score).toBe(3);
  });
});
