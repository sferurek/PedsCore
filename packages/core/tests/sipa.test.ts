import { describe, expect, it } from "vitest";
import { sipaCalculator } from "../src/index";

const forbiddenRecommendations = /tratamiento|ingresar|alta|intubar|\bTC\b|tomograf[ií]a|fluidos|administrar|\bUCI\b/i;

const resultText = (result: ReturnType<typeof sipaCalculator.calculate>) =>
  [
    result.label?.es,
    result.label?.en,
    result.classification?.es,
    result.classification?.en,
    ...result.warnings.flatMap((item) => [item.message.es, item.message.en])
  ]
    .filter(Boolean)
    .join(" ");

describe("SIPA calculator", () => {
  it("calculates the shock index", () => {
    const result = sipaCalculator.calculate({
      age_years: 8,
      heart_rate_bpm: 120,
      systolic_blood_pressure_mm_hg: 100
    });

    expect(result.value).toBe(1.2);
    expect(result.unit).toBe("ratio");
  });

  it("classifies documented age thresholds without diagnostic language", () => {
    const below = sipaCalculator.calculate({
      age_years: 5,
      heart_rate_bpm: 100,
      systolic_blood_pressure_mm_hg: 100
    });
    const above = sipaCalculator.calculate({
      age_years: 13,
      heart_rate_bpm: 110,
      systolic_blood_pressure_mm_hg: 100
    });

    expect(below.classification?.en).toContain("not above the documented threshold");
    expect(above.classification?.en).toContain("above the documented threshold");
    expect(resultText(below)).not.toMatch(forbiddenRecommendations);
    expect(resultText(above)).not.toMatch(forbiddenRecommendations);
  });

  it("warns when age is outside locally documented thresholds", () => {
    const result = sipaCalculator.calculate({
      age_years: 3,
      heart_rate_bpm: 110,
      systolic_blood_pressure_mm_hg: 100
    });

    expect(result.value).toBe(1.1);
    expect(result.classification).toBeUndefined();
    expect(result.warnings.some((item) => item.id === "sipa_age_threshold_not_validated")).toBe(true);
  });

  it("warns on missing, invalid, and extreme inputs", () => {
    expect(sipaCalculator.calculate({}).warnings[0]?.id).toBe("missing_required_inputs");
    expect(
      sipaCalculator.calculate({
        age_years: 7,
        heart_rate_bpm: 0,
        systolic_blood_pressure_mm_hg: 100
      }).warnings[0]?.id
    ).toBe("invalid_sipa_inputs");
    expect(
      sipaCalculator.calculate({
        age_years: 7,
        heart_rate_bpm: 250,
        systolic_blood_pressure_mm_hg: 30
      }).warnings.some((item) => item.id === "extreme_sipa_input")
    ).toBe(true);
  });
});
