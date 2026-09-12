import { describe, expect, it } from "vitest";
import { sipaCalculator } from "../src/index";

const forbiddenRecommendations =
  /tratamiento|ingresar|alta|intubar|\bTC\b|tomograf[ií]a|fluidos|administrar|\bUCI\b|shock presente|requires transfusion|safe|stable/i;

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

const calculate = (ageYears: number, shockIndex: number) =>
  sipaCalculator.calculate({
    age_years: ageYears,
    heart_rate_bpm: shockIndex * 100,
    systolic_blood_pressure_mm_hg: 100
  });

const thresholdFrom = (
  result: ReturnType<typeof sipaCalculator.calculate>
): number | undefined =>
  result.trace.find((item) => item.inputId === "published_sipa_threshold")
    ?.value as number | undefined;

describe("SIPA calculator", () => {
  it("calculates HR / SBP and displays the result to two decimals", () => {
    const result = sipaCalculator.calculate({
      age_years: 8,
      heart_rate_bpm: 120,
      systolic_blood_pressure_mm_hg: 100
    });

    expect(result.value).toBe(1.2);
    expect(result.unit).toBe("ratio");
  });

  it.each([
    [4, 1.22],
    [5, 1.22],
    [6, 1.22],
    [6.999, 1.22],
    [7, 1],
    [11, 1],
    [12, 1],
    [12.999, 1],
    [13, 0.9],
    [16, 0.9],
    [16.999, 0.9]
  ])(
    "uses the source-derived threshold at age %s",
    (ageYears, expectedThreshold) => {
      expect(thresholdFrom(calculate(ageYears, 0.5))).toBe(expectedThreshold);
    }
  );

  it.each([3, 3.999, 17, 18])(
    "rejects age %s outside the published 4-16-year population",
    (ageYears) => {
      const result = calculate(ageYears, 1);

      expect(result.value).toBeUndefined();
      expect(result.classification).toBeUndefined();
      expect(result.warnings).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ id: "unsupported_sipa_age" })
        ])
      );
    }
  );

  it.each([
    [5, 1.22],
    [7, 1],
    [13, 0.9]
  ])(
    "uses the published strict greater-than comparator at age %s and threshold %s",
    (ageYears, threshold) => {
      const below = calculate(ageYears, threshold - 0.0001);
      const equal = calculate(ageYears, threshold);
      const above = calculate(ageYears, threshold + 0.0001);

      expect(below.classification?.en).toContain("within the published SIPA threshold");
      expect(equal.classification?.en).toContain("within the published SIPA threshold");
      expect(above.classification?.en).toContain("above the published SIPA threshold");
    }
  );

  it("classifies with the raw ratio rather than the rounded display value", () => {
    const below = calculate(13, 0.8996);
    const above = calculate(13, 0.9004);

    expect(below.value).toBe(0.9);
    expect(above.value).toBe(0.9);
    expect(below.classification?.en).toContain("within the published SIPA threshold");
    expect(above.classification?.en).toContain("above the published SIPA threshold");
  });

  it("does not turn the 1.22 source threshold into a 1.20 display-rounding threshold", () => {
    const below = calculate(5, 1.2199);
    const above = calculate(5, 1.2201);

    expect(below.value).toBe(1.22);
    expect(above.value).toBe(1.22);
    expect(below.classification?.en).toContain("within the published SIPA threshold");
    expect(above.classification?.en).toContain("above the published SIPA threshold");
  });

  it("keeps the output descriptive and free of treatment recommendations", () => {
    const within = calculate(5, 1);
    const above = calculate(13, 1.1);

    expect(resultText(within)).not.toMatch(forbiddenRecommendations);
    expect(resultText(above)).not.toMatch(forbiddenRecommendations);
  });

  it("distinguishes missing from non-finite inputs", () => {
    expect(sipaCalculator.calculate({}).warnings[0]?.id).toBe(
      "missing_required_inputs"
    );
    expect(
      sipaCalculator.calculate({
        age_years: 7,
        heart_rate_bpm: Number.NaN,
        systolic_blood_pressure_mm_hg: 100
      }).warnings[0]?.id
    ).toBe("invalid_sipa_inputs");
    expect(
      sipaCalculator.calculate({
        age_years: Number.POSITIVE_INFINITY,
        heart_rate_bpm: 100,
        systolic_blood_pressure_mm_hg: 100
      }).warnings[0]?.id
    ).toBe("invalid_sipa_inputs");
  });

  it.each([
    [7, 0, 100],
    [7, -1, 100],
    [7, 100, 0],
    [7, 100, -1],
    [-1, 100, 100]
  ])("rejects invalid numeric inputs %#", (ageYears, heartRate, systolicBp) => {
    const result = sipaCalculator.calculate({
      age_years: ageYears,
      heart_rate_bpm: heartRate,
      systolic_blood_pressure_mm_hg: systolicBp
    });

    expect(result.value).toBeUndefined();
    expect(result.warnings[0]?.id).toBe("invalid_sipa_inputs");
  });

  it("warns when physiologic inputs are extreme", () => {
    expect(
      sipaCalculator.calculate({
        age_years: 7,
        heart_rate_bpm: 250,
        systolic_blood_pressure_mm_hg: 30
      }).warnings.some((item) => item.id === "extreme_sipa_input")
    ).toBe(true);
  });
});
