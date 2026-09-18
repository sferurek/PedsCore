import { describe, expect, it } from "vitest";
import { cdcGrowthPercentilesCalculator } from "../packages/core/src/calculators/cdcGrowth.js";
import { phoenixSepsisCalculator } from "../packages/core/src/calculators/phoenixSepsis.js";

describe("CDC 2000 growth percentiles", () => {
  it("reproduces the CDC 24-month male median rows for weight and stature", () => {
    const result = cdcGrowthPercentilesCalculator.calculate({
      sex: "male",
      age_months: 24,
      weight_kg: 12.6707633,
      stature_cm: 86.45220101
    });

    const trace = Object.fromEntries(result.trace.map((item) => [item.inputId, item.value]));
    expect(trace.weight_z).toBeCloseTo(0, 2);
    expect(trace.weight_percentile).toBeCloseTo(50, 1);
    expect(trace.stature_z).toBeCloseTo(0, 2);
    expect(trace.stature_percentile).toBeCloseTo(50, 1);
    expect(result.value).toBeGreaterThan(0);
    expect(result.value).toBeLessThan(100);
  });

  it("rejects ages outside the CDC 2-20 year scope", () => {
    const result = cdcGrowthPercentilesCalculator.calculate({
      sex: "female",
      age_months: 18,
      weight_kg: 10,
      stature_cm: 80
    });

    expect(result.value).toBeUndefined();
    expect(result.warnings.some((w) => w.id === "cdc_scope")).toBe(true);
  });

  it("interpolates between official monthly LMS rows", () => {
    const result = cdcGrowthPercentilesCalculator.calculate({
      sex: "female",
      age_months: 100.2,
      weight_kg: 28,
      stature_cm: 130
    });

    expect(result.value).toBeGreaterThan(0);
    expect(result.value).toBeLessThan(100);
    expect(result.trace.some((item) => item.inputId === "bmi_z")).toBe(true);
  });
});

describe("Phoenix Sepsis Score", () => {
  const normal = {
    age_months: 72,
    suspected_infection: true,
    fio2_fraction: 0.21,
    pao2_mmhg: 100,
    spo2_percent: 98,
    any_respiratory_support: false,
    invasive_mechanical_ventilation: false,
    vasoactive_count: 0,
    lactate_mmol_l: 1,
    map_mmhg: 70,
    platelets_10e3_ul: 250,
    inr: 1,
    d_dimer_mg_l_feu: 0.5,
    fibrinogen_mg_dl: 250,
    gcs: 15,
    both_pupils_fixed: false
  };

  it("scores zero when all four organ domains are normal", () => {
    const result = phoenixSepsisCalculator.calculate(normal);
    expect(result.score).toBe(0);
    expect(result.maxScore).toBe(13);
    expect(result.classification?.en).toContain("Does not meet");
  });

  it("reaches the maximum Phoenix score of 13", () => {
    const result = phoenixSepsisCalculator.calculate({
      age_months: 6,
      suspected_infection: true,
      fio2_fraction: 1,
      pao2_mmhg: 50,
      spo2_percent: 80,
      any_respiratory_support: true,
      invasive_mechanical_ventilation: true,
      vasoactive_count: 2,
      lactate_mmol_l: 12,
      map_mmhg: 10,
      platelets_10e3_ul: 50,
      inr: 2,
      d_dimer_mg_l_feu: 5,
      fibrinogen_mg_dl: 50,
      gcs: 3,
      both_pupils_fixed: true
    });

    expect(result.score).toBe(13);
    expect(result.classification?.en).toContain("septic shock");
  });

  it("requires suspected or confirmed infection before labeling sepsis", () => {
    const result = phoenixSepsisCalculator.calculate({
      ...normal,
      suspected_infection: false,
      gcs: 10,
      platelets_10e3_ul: 50
    });

    expect(result.score).toBe(2);
    expect(result.classification?.en).toContain("without suspected infection");
  });

  it("identifies septic shock when sepsis includes cardiovascular points", () => {
    const result = phoenixSepsisCalculator.calculate({
      ...normal,
      lactate_mmol_l: 6,
      gcs: 10
    });

    expect(result.score).toBe(2);
    expect(result.classification?.en).toContain("septic shock");
  });
});
