import { describe, expect, it } from "vitest";
import {
  ckidU25Calculator,
  kdigoPediatricCalculator,
  prifleCalculator
} from "./renalOpen.js";

describe("open renal calculators", () => {
  it("calculates CKiD U25 creatinine eGFR", () => {
    const result = ckidU25Calculator.calculate({
      age_years: 10,
      sex: "female",
      height_cm: 140,
      serum_creatinine: 0.7,
      creatinine_unit: "mg_dl"
    });

    expect(result.value).toBeCloseTo(71.1, 1);
    expect(result.unit).toBe("mL/min/1.73 m2");
  });

  it("averages CKiD U25 creatinine and cystatin estimates when both are present", () => {
    const result = ckidU25Calculator.calculate({
      age_years: 18,
      sex: "male",
      height_cm: 175,
      serum_creatinine: 1,
      creatinine_unit: "mg_dl",
      cystatin_c_mg_l: 1
    });

    expect(result.value).toBeCloseTo((50.8 * 1.75 + 77.1) / 2, 1);
  });

  it("assigns pRIFLE Injury from a 50 percent or greater eCCl decline", () => {
    const result = prifleCalculator.calculate({
      baseline_eccl: 100,
      current_eccl: 45,
      urine_output_ml_kg_h: 1,
      urine_duration_hours: 1,
      anuria_hours: 0,
      persistent_failure_weeks: 0
    });

    expect(result.score).toBe(2);
    expect(result.classification?.en).toContain("Injury");
  });

  it("assigns pRIFLE Failure from severe oliguria", () => {
    const result = prifleCalculator.calculate({
      baseline_eccl: 100,
      current_eccl: 90,
      urine_output_ml_kg_h: 0.2,
      urine_duration_hours: 24,
      anuria_hours: 0,
      persistent_failure_weeks: 0
    });

    expect(result.score).toBe(3);
  });

  it("assigns KDIGO stage 2 from creatinine ratio", () => {
    const result = kdigoPediatricCalculator.calculate({
      baseline_creatinine_mg_dl: 0.5,
      current_creatinine_mg_dl: 1.1,
      age_years: 8,
      urine_output_ml_kg_h: 1,
      urine_duration_hours: 1,
      anuria_hours: 0,
      renal_replacement_therapy: false
    });

    expect(result.score).toBe(2);
  });

  it("uses the worst KDIGO criterion and assigns stage 3 for prolonged severe oliguria", () => {
    const result = kdigoPediatricCalculator.calculate({
      baseline_creatinine_mg_dl: 0.5,
      current_creatinine_mg_dl: 0.6,
      age_years: 8,
      current_egfr: 90,
      urine_output_ml_kg_h: 0.2,
      urine_duration_hours: 24,
      anuria_hours: 0,
      renal_replacement_therapy: false
    });

    expect(result.score).toBe(3);
  });
});
