import { describe, expect, it } from "vitest";
import {
  calculateTool,
  gorelickDehydrationCalculator,
  passAsthmaCalculator,
  pelod2Calculator,
  pim3Calculator,
  prifleCalculator,
  prism4Calculator
} from "../src/index.js";

describe("PASS", () => {
  it("scores the 3-domain 0-6 scale", () => {
    const result = passAsthmaCalculator.calculate({
      age_years: 8,
      work_of_breathing: "work_2",
      wheezing: "wheeze_2",
      prolonged_expiration: "expiration_2"
    });
    expect(result.score).toBe(6);
    expect(result.maxScore).toBe(6);
  });

  it("rejects ages outside 1-18 years", () => {
    const result = passAsthmaCalculator.calculate({
      age_years: 0.5,
      work_of_breathing: "work_0",
      wheezing: "wheeze_0",
      prolonged_expiration: "expiration_0"
    });
    expect(result.score).toBeUndefined();
    expect(result.classification?.en).toContain("Outside");
  });
});

const gorelickBase = {
  age_months: 18,
  abnormal_general_appearance: false,
  prolonged_capillary_refill: false,
  absent_tears: false,
  dry_mucous_membranes: false,
  sunken_eyes: false,
  deep_breathing: false,
  weak_pulses: false,
  reduced_skin_elasticity: false,
  tachycardia: false,
  reduced_urine_output: false
};

describe("Gorelick dehydration", () => {
  it("uses 3 and 7 abnormal signs as published thresholds", () => {
    const three = gorelickDehydrationCalculator.calculate({
      ...gorelickBase,
      absent_tears: true,
      dry_mucous_membranes: true,
      sunken_eyes: true
    });
    expect(three.score).toBe(3);
    expect(three.classification?.en).toContain("≥5%");

    const seven = gorelickDehydrationCalculator.calculate({
      ...gorelickBase,
      abnormal_general_appearance: true,
      prolonged_capillary_refill: true,
      absent_tears: true,
      dry_mucous_membranes: true,
      sunken_eyes: true,
      deep_breathing: true,
      weak_pulses: true
    });
    expect(seven.score).toBe(7);
    expect(seven.classification?.en).toContain("≥10%");
  });

  it("enforces the published 1 month to 5 year population", () => {
    const result = gorelickDehydrationCalculator.calculate({ ...gorelickBase, age_months: 61 });
    expect(result.score).toBeUndefined();
  });
});

const prifleBase = {
  baseline_eccl: 100,
  current_eccl: 100,
  urine_output_ml_kg_h: 1,
  urine_duration_hours: 1,
  anuria_hours: 0,
  persistent_failure_weeks: 0
};

describe("pRIFLE", () => {
  it("uses the exact R/I/F functional thresholds", () => {
    expect(prifleCalculator.calculate({ ...prifleBase, current_eccl: 75 }).score).toBe(1);
    expect(prifleCalculator.calculate({ ...prifleBase, current_eccl: 50 }).score).toBe(2);
    expect(prifleCalculator.calculate({ ...prifleBase, current_eccl: 25 }).score).toBe(3);
  });

  it("uses 4 and 12 weeks for Loss and End-stage persistence", () => {
    expect(prifleCalculator.calculate({ ...prifleBase, persistent_failure_weeks: 4 }).score).toBe(4);
    expect(prifleCalculator.calculate({ ...prifleBase, persistent_failure_weeks: 12 }).score).toBe(5);
  });
});

describe("PELOD-2", () => {
  it("returns score 0 for a physiologically normal sample", () => {
    const result = pelod2Calculator.calculate({
      age_months: 60,
      gcs: 15,
      both_pupils_fixed: false,
      lactate_mmol_l: 2,
      map_mmhg: 80,
      creatinine_umol_l: 40,
      pao2_mmhg: 100,
      fio2_fraction: 0.21,
      paco2_mmhg: 40,
      invasive_ventilation: false,
      wbc_10e9_l: 10,
      platelets_10e9_l: 200
    });
    expect(result.score).toBe(0);
    expect(result.value).toBeCloseTo(0.13, 2);
  });
});

describe("PIM3", () => {
  it("reproduces the published baseline equation", () => {
    const result = pim3Calculator.calculate({
      both_pupils_fixed: false,
      elective_admission: false,
      mechanical_ventilation_first_hour: false,
      base_excess_unknown: true,
      sbp_unknown: true,
      oxygenation_unknown: true,
      procedure_category: "none",
      diagnosis_risk_group: "none"
    });
    expect(result.value).toBeCloseTo(1.22, 2);
    expect(result.unit).toBe("%");
  });
});

describe("PRISM IV", () => {
  it("returns the public-domain PRISM IV model for a normal physiologic sample", () => {
    const result = prism4Calculator.calculate({
      age_days: 1826,
      admission_source: "other",
      cpr_within_24h: false,
      cancer: false,
      low_risk_primary_system: false,
      systolic_bp_mmhg: 100,
      heart_rate: 100,
      temperature_c: 37,
      gcs: 15,
      pupil_status: "normal",
      ph_lowest: 7.35,
      ph_highest: 7.35,
      total_co2_lowest_mmol_l: 24,
      total_co2_highest_mmol_l: 24,
      paco2_mmhg: 40,
      pao2_mmhg: 100,
      glucose_mg_dl: 100,
      potassium_mmol_l: 4,
      creatinine_mg_dl: 0.5,
      bun_mg_dl: 10,
      wbc_per_mm3: 5000,
      platelets_per_mm3: 250000,
      pt_seconds: 12,
      ptt_seconds: 30
    });
    expect(result.score).toBe(0);
    expect(result.value).toBeCloseTo(0.31, 2);
    expect(result.unit).toBe("%");
  });
});

describe("public dispatcher", () => {
  it("exposes all six newly unlocked calculators", () => {
    for (const id of ["pass","gorelick_dehydration","prifle","pelod_2","prism_iv","pim3"]) {
      expect(calculateTool(id, {}).warnings[0]?.id).not.toBe("calculator_not_implemented");
    }
  });
});
