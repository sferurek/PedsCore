import { describe, expect, it } from "vitest";
import { pediatricKdigoCalculator } from "../packages/core/src/calculators/pediatricKdigo.js";

describe("Pediatric KDIGO AKI", () => {
  it("stages creatinine ratios at 1.5, 2 and 3 times baseline", () => {
    expect(pediatricKdigoCalculator.calculate({ baseline_creatinine_mg_dl: 1, current_creatinine_mg_dl: 1.5 }).score).toBe(1);
    expect(pediatricKdigoCalculator.calculate({ baseline_creatinine_mg_dl: 1, current_creatinine_mg_dl: 2 }).score).toBe(2);
    expect(pediatricKdigoCalculator.calculate({ baseline_creatinine_mg_dl: 1, current_creatinine_mg_dl: 3 }).score).toBe(3);
  });
  it("recognizes a 0.3 mg/dL rise within 48 hours as stage 1", () => {
    expect(pediatricKdigoCalculator.calculate({ current_creatinine_mg_dl: 0.8, creatinine_rise_48h_mg_dl: 0.3 }).score).toBe(1);
  });
  it("recognizes pediatric eGFR below 35 as stage 3", () => {
    expect(pediatricKdigoCalculator.calculate({ egfr_ml_min_1_73m2: 34.9 }).score).toBe(3);
  });
  it("stages urine output at 6, 12 and 24 hours", () => {
    expect(pediatricKdigoCalculator.calculate({ urine_output_ml_kg_h: 0.4, urine_output_duration_hours: 6 }).score).toBe(1);
    expect(pediatricKdigoCalculator.calculate({ urine_output_ml_kg_h: 0.4, urine_output_duration_hours: 12 }).score).toBe(2);
    expect(pediatricKdigoCalculator.calculate({ urine_output_ml_kg_h: 0.2, urine_output_duration_hours: 24 }).score).toBe(3);
  });
  it("recognizes anuria for 12 hours and renal replacement therapy as stage 3", () => {
    expect(pediatricKdigoCalculator.calculate({ anuria_duration_hours: 12 }).score).toBe(3);
    expect(pediatricKdigoCalculator.calculate({ renal_replacement_therapy: true }).score).toBe(3);
  });
  it("uses the worse of creatinine and urine-output criteria", () => {
    const result = pediatricKdigoCalculator.calculate({ baseline_creatinine_mg_dl: 1, current_creatinine_mg_dl: 1.5, urine_output_ml_kg_h: 0.4, urine_output_duration_hours: 12 });
    expect(result.score).toBe(2);
  });
});
