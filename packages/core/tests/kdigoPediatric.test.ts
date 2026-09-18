import { describe, expect, it } from "vitest";
import { kdigoPediatricCalculator } from "../src/index";

const base = {
  age_scope: "child_28_days_to_under_18_years",
  creatinine_unit: "mg_dl",
  current_creatinine: 0.6,
  baseline_status: "known_or_estimated",
  baseline_creatinine_7d: 0.6,
  previous_creatinine_48h: 0.6,
  current_egfr: 100,
  urine_data_status: "available",
  urine_output_ml_kg_h: 1,
  urine_duration_hours: 6,
  anuria_hours: 0,
  rrt_started: "no"
};

describe("KDIGO pediatric AKI 2012", () => {
  it("classifies creatinine ratio stages 1 to 3", () => {
    expect(kdigoPediatricCalculator.calculate({ ...base, current_creatinine: 0.9 }).score).toBe(1);
    expect(kdigoPediatricCalculator.calculate({ ...base, current_creatinine: 1.2 }).score).toBe(2);
    expect(kdigoPediatricCalculator.calculate({ ...base, current_creatinine: 1.8 }).score).toBe(3);
  });

  it("recognizes the absolute 0.3 mg/dL rise within 48 hours", () => {
    const result = kdigoPediatricCalculator.calculate({
      ...base,
      baseline_status: "unknown",
      baseline_creatinine_7d: undefined,
      previous_creatinine_48h: 0.5,
      current_creatinine: 0.8
    });
    expect(result.score).toBe(1);
    expect(result.classification?.en).toContain("AKI diagnostic criterion: met");
    expect(result.warnings.some((item) => item.id === "baseline_unknown")).toBe(true);
  });

  it("uses the worse urine-output stage", () => {
    expect(kdigoPediatricCalculator.calculate({
      ...base,
      urine_output_ml_kg_h: 0.4,
      urine_duration_hours: 8
    }).score).toBe(1);

    expect(kdigoPediatricCalculator.calculate({
      ...base,
      urine_output_ml_kg_h: 0.4,
      urine_duration_hours: 12
    }).score).toBe(2);

    expect(kdigoPediatricCalculator.calculate({
      ...base,
      urine_output_ml_kg_h: 0.2,
      urine_duration_hours: 24
    }).score).toBe(3);

    expect(kdigoPediatricCalculator.calculate({
      ...base,
      anuria_hours: 12
    }).score).toBe(3);
  });

  it("recognizes pediatric stage 3 eGFR and renal replacement therapy criteria", () => {
    expect(kdigoPediatricCalculator.calculate({ ...base, current_egfr: 34 }).score).toBe(3);
    expect(kdigoPediatricCalculator.calculate({ ...base, rrt_started: "yes" }).score).toBe(3);
  });

  it("supports micromol/L creatinine inputs", () => {
    const result = kdigoPediatricCalculator.calculate({
      ...base,
      creatinine_unit: "umol_l",
      baseline_creatinine_7d: 44.2,
      previous_creatinine_48h: 44.2,
      current_creatinine: 88.4
    });
    expect(result.score).toBe(2);
  });

  it("does not silently impute an unknown baseline", () => {
    const result = kdigoPediatricCalculator.calculate({
      ...base,
      baseline_status: "unknown",
      baseline_creatinine_7d: undefined,
      previous_creatinine_48h: undefined,
      urine_data_status: "unavailable",
      urine_output_ml_kg_h: undefined,
      urine_duration_hours: undefined,
      anuria_hours: undefined
    });

    expect(result.warnings.some((item) => item.id === "baseline_unknown")).toBe(true);
    expect(result.warnings.some((item) => item.id === "urine_output_unavailable")).toBe(true);
  });

  it("keeps neonates outside this tool", () => {
    const result = kdigoPediatricCalculator.calculate({
      ...base,
      age_scope: "neonate_under_28_days"
    });
    expect(result.warnings[0]?.id).toBe("neonatal_kdigo_out_of_scope");
  });

  it("does not attach treatment or disposition instructions", () => {
    const result = kdigoPediatricCalculator.calculate({
      ...base,
      current_creatinine: 2
    });
    const text = [
      result.label?.es,
      result.label?.en,
      result.classification?.es,
      result.classification?.en,
      ...result.warnings.flatMap((item) => [item.message.es, item.message.en])
    ].join(" ");

    expect(text).not.toMatch(
      /fluidos|fluid|diuret|dialisis|di[aá]lysis|tratamiento|treatment|ingreso|admission|alta|discharge/i
    );
  });
});
