import { describe, expect, it } from "vitest";
import { calculateTool, psofaCalculator, snappeIICalculator } from "../src/index.js";

describe("pSOFA", () => {
  it("scores 0 for a normal six-system profile", () => {
    const result = psofaCalculator.calculate({
      age_months: 60,
      pao2_fio2_ratio: 500,
      respiratory_support: false,
      platelets_10e9_l: 200,
      bilirubin_mg_dl: 0.5,
      map_mmhg: 80,
      gcs: 15,
      creatinine_mg_dl: 0.5
    });
    expect(result.score).toBe(0);
    expect(result.maxScore).toBe(24);
  });

  it("can reach 24 with severe dysfunction in all systems", () => {
    const result = psofaCalculator.calculate({
      age_months: 60,
      pao2_fio2_ratio: 80,
      respiratory_support: true,
      platelets_10e9_l: 10,
      bilirubin_mg_dl: 13,
      map_mmhg: 40,
      norepinephrine_mcg_kg_min: 0.2,
      gcs: 5,
      creatinine_mg_dl: 3
    });
    expect(result.score).toBe(24);
  });

  it("only accepts SpO2/FiO2 substitution when SpO2 is <=97%", () => {
    const result = psofaCalculator.calculate({
      age_months: 60,
      spo2_fio2_ratio: 200,
      spo2_percent: 99,
      respiratory_support: true,
      platelets_10e9_l: 200,
      bilirubin_mg_dl: 0.5,
      map_mmhg: 80,
      gcs: 15,
      creatinine_mg_dl: 0.5
    });
    expect(result.score).toBeUndefined();
    expect(result.warnings.some((item) => item.id === "invalid_psofa_sf_ratio")).toBe(true);
  });
});

describe("SNAPPE-II", () => {
  it("scores 0 for the minimum-risk profile", () => {
    const result = snappeIICalculator.calculate({
      mean_bp_mmhg: 30,
      lowest_temperature_c: 36,
      pao2_fio2_ratio: 3,
      lowest_ph: 7.3,
      multiple_seizures: false,
      urine_output_ml_kg_h: 1,
      apgar_5min: 7,
      birth_weight_g: 1000,
      sga_below_3rd_percentile: false
    });
    expect(result.score).toBe(0);
    expect(result.maxScore).toBe(162);
  });

  it("reaches the published maximum score of 162", () => {
    const result = snappeIICalculator.calculate({
      mean_bp_mmhg: 10,
      lowest_temperature_c: 34,
      pao2_fio2_ratio: 0.2,
      lowest_ph: 7,
      multiple_seizures: true,
      urine_output_ml_kg_h: 0.05,
      apgar_5min: 5,
      birth_weight_g: 600,
      sga_below_3rd_percentile: true
    });
    expect(result.score).toBe(162);
  });

  it("uses exact threshold boundaries", () => {
    const result = snappeIICalculator.calculate({
      mean_bp_mmhg: 20,
      lowest_temperature_c: 35.6,
      pao2_fio2_ratio: 1,
      lowest_ph: 7.1,
      multiple_seizures: false,
      urine_output_ml_kg_h: 0.1,
      apgar_5min: 7,
      birth_weight_g: 750,
      sga_below_3rd_percentile: false
    });
    expect(result.score).toBe(44);
  });
});

describe("dispatcher", () => {
  it("exposes pSOFA and SNAPPE-II", () => {
    expect(calculateTool("psofa", {}).warnings[0]?.id).not.toBe("calculator_not_implemented");
    expect(calculateTool("snappii", {}).warnings[0]?.id).not.toBe("calculator_not_implemented");
  });
});
