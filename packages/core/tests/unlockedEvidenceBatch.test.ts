import { describe, expect, it } from "vitest";
import { calculateTool } from "../src/index.js";

describe("evidence-unlocked calculators", () => {
  it("calculates PASS from its three 0-2 domains", () => {
    const low = calculateTool("pass", {
      age_years: 8,
      work_of_breathing: "work_0",
      wheezing: "wheeze_0",
      prolonged_expiration: "expiration_0"
    });
    const high = calculateTool("pass", {
      age_years: 8,
      work_of_breathing: "work_2",
      wheezing: "wheeze_2",
      prolonged_expiration: "expiration_2"
    });
    expect(low.score).toBe(0);
    expect(high.score).toBe(6);
  });

  it("counts the ten Gorelick dehydration signs", () => {
    const result = calculateTool("gorelick_dehydration", {
      abnormal_general_appearance: true,
      prolonged_capillary_refill: true,
      absent_tears: true,
      dry_mucous_membranes: false,
      sunken_eyes: false,
      deep_breathing: false,
      weak_pulses: false,
      reduced_skin_elasticity: false,
      tachycardia: false,
      reduced_urine_output: false
    });
    expect(result.score).toBe(3);
    expect(result.classification?.en).toContain("≥5%");
  });

  it("classifies pRIFLE by the worst renal or urine-output criterion", () => {
    const injury = calculateTool("prifle", {
      baseline_eccl: 100,
      current_eccl: 50,
      urine_output_ml_kg_h: 1,
      urine_duration_hours: 1,
      anuria_hours: 0,
      persistent_failure_weeks: 0
    });
    const failure = calculateTool("prifle", {
      baseline_eccl: 100,
      current_eccl: 80,
      urine_output_ml_kg_h: 0.2,
      urine_duration_hours: 24,
      anuria_hours: 0,
      persistent_failure_weeks: 0
    });
    expect(injury.score).toBe(2);
    expect(failure.score).toBe(3);
  });

  it("calculates a zero-point PELOD-2 profile and mortality model output", () => {
    const result = calculateTool("pelod_2", {
      age_months: 60,
      gcs: 15,
      both_pupils_fixed: false,
      lactate_mmol_l: 1,
      map_mmhg: 80,
      creatinine_umol_l: 30,
      pao2_mmhg: 100,
      fio2_fraction: 0.21,
      paco2_mmhg: 40,
      invasive_ventilation: false,
      wbc_10e9_l: 8,
      platelets_10e9_l: 200
    });
    expect(result.score).toBe(0);
    expect(result.value).toBeTypeOf("number");
    expect(result.unit).toBe("%");
  });

  it("calculates PIM3 with the published missing-data defaults", () => {
    const result = calculateTool("pim3", {
      both_pupils_fixed: false,
      elective_admission: false,
      mechanical_ventilation_first_hour: false,
      base_excess_unknown: true,
      sbp_unknown: true,
      oxygenation_unknown: true,
      procedure_category: "none",
      diagnosis_risk_group: "none"
    });
    expect(result.value).toBeTypeOf("number");
    expect(result.unit).toBe("%");
    expect(result.warnings.some((item) => item.id === "calculator_not_implemented")).toBe(false);
  });

  it("calculates PRISM IV from a complete physiologic profile", () => {
    const result = calculateTool("prism_iv", {
      age_days: 3650,
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
      total_co2_lowest_mmol_l: 22,
      total_co2_highest_mmol_l: 28,
      paco2_mmhg: 40,
      pao2_mmhg: 90,
      glucose_mg_dl: 100,
      potassium_mmol_l: 4,
      creatinine_mg_dl: 0.5,
      bun_mg_dl: 10,
      wbc_per_mm3: 8000,
      platelets_per_mm3: 250000,
      pt_seconds: 12,
      ptt_seconds: 30
    });
    expect(result.value).toBeTypeOf("number");
    expect(result.unit).toBe("%");
    expect(result.warnings.some((item) => item.id === "calculator_not_implemented")).toBe(false);
  });
});
