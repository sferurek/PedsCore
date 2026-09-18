import { describe, expect, it } from "vitest";
import {
  passAsthmaCalculator,
  riscCalculator
} from "../packages/core/src/calculators/respiratoryRisk.js";
import {
  pelod2Calculator,
  pim3Calculator,
  prism4Calculator
} from "../packages/core/src/calculators/criticalCareScores.js";

describe("PASS and RISC", () => {
  it("calculates maximum PASS", () => {
    const result = passAsthmaCalculator.calculate({
      age_years: 8,
      work_of_breathing: "work_2",
      wheezing: "wheeze_2",
      prolonged_expiration: "expiration_2"
    });

    expect(result.score).toBe(6);
  });

  it("reproduces the published RISC example pattern", () => {
    const result = riscCalculator.calculate({
      age_months: 12,
      hiv_negative: true,
      spo2_room_air: 88,
      chest_indrawing: true,
      wheezing: true,
      refusing_feeds: false,
      weight_for_age_z: -1
    });

    expect(result.score).toBe(1);
  });
});

describe("PELOD-2", () => {
  it("scores zero with normal values", () => {
    const result = pelod2Calculator.calculate({
      age_months: 24,
      gcs: 15,
      both_pupils_fixed: false,
      lactate_mmol_l: 1,
      map_mmhg: 70,
      creatinine_umol_l: 30,
      pao2_mmhg: 100,
      fio2_fraction: 0.21,
      paco2_mmhg: 40,
      invasive_ventilation: false,
      wbc_10e9_l: 8,
      platelets_10e9_l: 250
    });

    expect(result.score).toBe(0);
    expect(result.value).toBeCloseTo(0.13, 1);
  });

  it("reaches the published maximum score of 33", () => {
    const result = pelod2Calculator.calculate({
      age_months: 24,
      gcs: 3,
      both_pupils_fixed: true,
      lactate_mmol_l: 12,
      map_mmhg: 20,
      creatinine_umol_l: 100,
      pao2_mmhg: 30,
      fio2_fraction: 0.8,
      paco2_mmhg: 100,
      invasive_ventilation: true,
      wbc_10e9_l: 1,
      platelets_10e9_l: 50
    });

    expect(result.score).toBe(33);
  });
});

describe("PIM3", () => {
  it("calculates a low baseline mortality probability", () => {
    const result = pim3Calculator.calculate({
      both_pupils_fixed: false,
      elective_admission: false,
      mechanical_ventilation_first_hour: false,
      base_excess_unknown: false,
      base_excess_mmol_l: 0,
      sbp_unknown: false,
      systolic_bp_mmhg: 100,
      oxygenation_unknown: false,
      fio2_fraction: 0.21,
      pao2_mmhg: 100,
      procedure_category: "none",
      diagnosis_risk_group: "none"
    });

    expect(result.value).toBeCloseTo(1.34, 1);
  });

  it("increases risk with very-high-risk diagnosis and fixed pupils", () => {
    const low = pim3Calculator.calculate({
      both_pupils_fixed: false,
      elective_admission: false,
      mechanical_ventilation_first_hour: false,
      base_excess_unknown: false,
      base_excess_mmol_l: 0,
      sbp_unknown: false,
      systolic_bp_mmhg: 100,
      oxygenation_unknown: false,
      fio2_fraction: 0.21,
      pao2_mmhg: 100,
      procedure_category: "none",
      diagnosis_risk_group: "none"
    });
    const high = pim3Calculator.calculate({
      both_pupils_fixed: true,
      elective_admission: false,
      mechanical_ventilation_first_hour: true,
      base_excess_unknown: false,
      base_excess_mmol_l: -10,
      sbp_unknown: false,
      systolic_bp_mmhg: 60,
      oxygenation_unknown: false,
      fio2_fraction: 1,
      pao2_mmhg: 60,
      procedure_category: "none",
      diagnosis_risk_group: "very_high"
    });

    expect((high.value ?? 0)).toBeGreaterThan(low.value ?? 0);
  });
});

describe("PRISM IV", () => {
  const normal = {
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
    ph_lowest: 7.4,
    ph_highest: 7.4,
    total_co2_lowest_mmol_l: 24,
    total_co2_highest_mmol_l: 24,
    paco2_mmhg: 40,
    pao2_mmhg: 100,
    glucose_mg_dl: 100,
    potassium_mmol_l: 4,
    creatinine_mg_dl: 0.6,
    bun_mg_dl: 10,
    wbc_per_mm3: 8000,
    platelets_per_mm3: 250000,
    pt_seconds: 12,
    ptt_seconds: 30
  };

  it("calculates baseline PRISM IV probability with zero physiologic subscores", () => {
    const result = prism4Calculator.calculate(normal);

    expect(result.score).toBe(0);
    expect(result.value).toBeCloseTo(0.31, 1);
  });

  it("calculates neurologic and non-neurologic physiology internally", () => {
    const result = prism4Calculator.calculate({
      ...normal,
      admission_source: "emergency_department",
      gcs: 7,
      pupil_status: "one_fixed",
      systolic_bp_mmhg: 50
    });

    expect((result.score ?? 0)).toBeGreaterThan(0);
    expect((result.value ?? 0)).toBeGreaterThan(0.31);
  });
});
