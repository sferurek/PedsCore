import { describe, expect, it } from "vitest";
import {
  phoenixSepsisCalculator,
  prism4Calculator,
  prifleCalculator
} from "../src/index.js";

const phoenixBase = {
  age_months: 60,
  suspected_infection: true,
  birth_hospitalization_before_discharge: false,
  postconceptional_age_at_least_37_weeks: true,
  fio2_fraction: 0.4,
  pao2_mmhg: 160,
  spo2_percent: 97,
  any_respiratory_support: false,
  invasive_mechanical_ventilation: false,
  vasoactive_count: 0,
  lactate_mmol_l: 1,
  map_mmhg: 70,
  platelets_10e3_ul: 200,
  inr: 1,
  d_dimer_mg_l_feu: 1,
  fibrinogen_mg_dl: 250,
  gcs: 15,
  both_pupils_fixed: false
};

describe("Tier A clinical remediation", () => {
  it("Phoenix ignores S/F when SpO2 is above 97%", () => {
    const result = phoenixSepsisCalculator.calculate({
      ...phoenixBase,
      pao2_mmhg: undefined,
      spo2_percent: 98,
      fio2_fraction: 0.5,
      any_respiratory_support: true
    });
    expect(result.trace.find((x)=>x.inputId==="respiratory_subscore")?.value).toBe(0);
    expect(result.warnings.some((w)=>w.id==="phoenix_sf_not_valid_above_97")).toBe(true);
  });

  it("Phoenix uses S/F at SpO2 97% and treats IMV as respiratory support", () => {
    const result = phoenixSepsisCalculator.calculate({
      ...phoenixBase,
      pao2_mmhg: undefined,
      spo2_percent: 97,
      fio2_fraction: 0.5,
      any_respiratory_support: false,
      invasive_mechanical_ventilation: true
    });
    expect(result.trace.find((x)=>x.inputId==="respiratory_subscore")?.value).toBe(2);
    expect(result.warnings.some((w)=>w.id==="phoenix_support_derived_from_imv")).toBe(true);
  });

  it("Phoenix blocks excluded neonatal populations", () => {
    expect(phoenixSepsisCalculator.calculate({
      ...phoenixBase,
      birth_hospitalization_before_discharge: true
    }).warnings[0]?.id).toBe("phoenix_outside_validated_population");
    expect(phoenixSepsisCalculator.calculate({
      ...phoenixBase,
      postconceptional_age_at_least_37_weeks: false
    }).warnings[0]?.id).toBe("phoenix_outside_validated_population");
  });

  it("pRIFLE uses exact >4 week and >3 month chronic-duration thresholds", () => {
    const base = {
      baseline_eccl: 100,
      current_eccl: 20,
      urine_output_ml_kg_h: 1,
      urine_duration_hours: 0,
      anuria_hours: 0
    };
    expect(prifleCalculator.calculate({...base,persistent_failure_days:28}).score).toBe(3);
    expect(prifleCalculator.calculate({...base,persistent_failure_days:29}).score).toBe(4);
    expect(prifleCalculator.calculate({...base,persistent_failure_days:90}).score).toBe(4);
    expect(prifleCalculator.calculate({...base,persistent_failure_days:91}).score).toBe(5);
  });

  it("PRISM IV refuses calculation when the sampling window is not confirmed", () => {
    const normal = {
      first_picu_admission_this_hospitalization: true,
      prism_iv_sampling_window_confirmed: false,
      cardiac_intervention_under_3_months: false,
      cardiac_postintervention_window_confirmed: false,
      age_days: 365,
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
    expect(prism4Calculator.calculate(normal).warnings[0]?.id).toBe("prism4_sampling_not_confirmed");
    const valid = prism4Calculator.calculate({...normal, prism_iv_sampling_window_confirmed:true});
    expect(valid.value).toBeTypeOf("number");
  });
});
