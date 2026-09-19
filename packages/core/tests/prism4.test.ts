import { describe, expect, it } from "vitest";
import { prism4Calculator } from "../src/index.js";

const base = {
  first_picu_admission_this_hospitalization: true,
  prism_iv_sampling_window_confirmed: true,
  cardiac_intervention_under_3_months: false,
  cardiac_postintervention_window_confirmed: false,
  age_days: 366,
  admission_source: "other",
  cpr_within_24h: false,
  cancer: false,
  low_risk_primary_system: false,
  systolic_bp_mmhg: 100,
  heart_rate: 100,
  temperature_c: 37,
  gcs: 15,
  pupil_status: "reactive",
  ph_lowest: 7.35,
  ph_highest: 7.45,
  total_co2_lowest_mmol_l: 20,
  total_co2_highest_mmol_l: 25,
  paco2_mmhg: 40,
  pao2_mmhg: 100,
  glucose_mg_dl: 100,
  potassium_mmol_l: 4,
  creatinine_mg_dl: 0.5,
  bun_mg_dl: 10,
  wbc_per_mm3: 8000,
  platelets_per_mm3: 250000,
  pt_seconds: 12,
  ptt_seconds: 30
};

const trace = (result: ReturnType<typeof prism4Calculator.calculate>, id: string) =>
  result.trace.find((item) => item.inputId === id);

describe("PRISM IV reference and boundary checks", () => {
  it("matches the published mortality equation for a zero-subscore child", () => {
    const result = prism4Calculator.calculate(base);
    expect(result.score).toBe(0);
    expect(trace(result, "prism4_logit")?.value).toBe(-5.776);
    expect(result.value).toBe(0.31);
  });

  it("applies published age coefficients at the neonatal/infant boundaries", () => {
    expect(trace(prism4Calculator.calculate({ ...base, age_days: 13 }), "age_coefficient")?.value).toBe(1.311);
    expect(trace(prism4Calculator.calculate({ ...base, age_days: 14 }), "age_coefficient")?.value).toBe(0.968);
    expect(trace(prism4Calculator.calculate({ ...base, age_days: 31 }), "age_coefficient")?.value).toBe(0.357);
    expect(trace(prism4Calculator.calculate({ ...base, age_days: 366 }), "age_coefficient")?.value).toBe(0);
  });

  it("keeps systolic blood-pressure boundaries exact for children", () => {
    expect(trace(prism4Calculator.calculate({ ...base, systolic_bp_mmhg: 76 }), "prism_non_neurologic_score")?.value).toBe(0);
    expect(trace(prism4Calculator.calculate({ ...base, systolic_bp_mmhg: 75 }), "prism_non_neurologic_score")?.value).toBe(3);
    expect(trace(prism4Calculator.calculate({ ...base, systolic_bp_mmhg: 55 }), "prism_non_neurologic_score")?.value).toBe(3);
    expect(trace(prism4Calculator.calculate({ ...base, systolic_bp_mmhg: 54 }), "prism_non_neurologic_score")?.value).toBe(7);
  });

  it("keeps neurologic boundaries and fixed-pupil weights exact", () => {
    expect(trace(prism4Calculator.calculate({ ...base, gcs: 8 }), "prism_neurologic_score")?.value).toBe(0);
    expect(trace(prism4Calculator.calculate({ ...base, gcs: 7 }), "prism_neurologic_score")?.value).toBe(5);
    expect(trace(prism4Calculator.calculate({ ...base, pupil_status: "one_fixed" }), "prism_neurologic_score")?.value).toBe(7);
    expect(trace(prism4Calculator.calculate({ ...base, pupil_status: "both_fixed" }), "prism_neurologic_score")?.value).toBe(11);
  });

  it("does not require post-intervention confirmation when the special branch does not apply", () => {
    const input = { ...base };
    delete input.cardiac_postintervention_window_confirmed;
    const result = prism4Calculator.calculate(input);
    expect(result.value).toBeTypeOf("number");
  });

  it("requires the special post-intervention window when applicable", () => {
    const blocked = prism4Calculator.calculate({
      ...base,
      age_days: 60,
      cardiac_intervention_under_3_months: true,
      cardiac_postintervention_window_confirmed: false
    });
    expect(blocked.warnings[0]?.id).toBe("prism4_sampling_not_confirmed");
  });
});
