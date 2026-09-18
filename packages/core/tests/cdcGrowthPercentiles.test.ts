import { describe, expect, it } from "vitest";
import { cdcGrowthPercentilesCalculator } from "../src/index";

describe("CDC growth percentiles", () => {
  it("returns weight, stature, and BMI percentiles for ages 2 to <20 years", () => {
    const result = cdcGrowthPercentilesCalculator.calculate({
      sex: "male",
      age_months: 120,
      weight_kg: 32,
      height_cm: 140
    });

    expect(result.warnings).toHaveLength(0);
    expect(result.criteriaMatched).toHaveLength(3);
    expect(result.classification?.en).toContain("Weight-for-age");
    expect(result.classification?.en).toContain("Stature-for-age");
    expect(result.classification?.en).toContain("BMI-for-age");
  });

  it("uses official CDC LMS medians at an exact reference age", () => {
    const result = cdcGrowthPercentilesCalculator.calculate({
      sex: "male",
      age_months: 24.5,
      weight_kg: 12.74154396,
      height_cm: 86.86160934
    });

    const weightTrace = result.trace.find((item) => item.inputId === "weight_percentile");
    const statureTrace = result.trace.find((item) => item.inputId === "stature_percentile");
    expect(Number(weightTrace?.value)).toBeCloseTo(50, 1);
    expect(Number(statureTrace?.value)).toBeCloseTo(50, 1);
  });

  it("interpolates LMS parameters for finer age intervals", () => {
    const lower = cdcGrowthPercentilesCalculator.calculate({
      sex: "female",
      age_months: 100.25,
      weight_kg: 28,
      height_cm: 130
    });
    expect(lower.warnings).toHaveLength(0);
    expect(lower.trace.find((item) => item.inputId === "weight_z")).toBeDefined();
  });

  it("uses the CDC 2022 extended BMI method above the classic P95", () => {
    const result = cdcGrowthPercentilesCalculator.calculate({
      sex: "male",
      age_months: 120,
      weight_kg: 70,
      height_cm: 140
    });

    expect(result.warnings.some((item) => item.id === "cdc_extended_bmi_2022_used")).toBe(true);
    expect(result.trace.find((item) => item.inputId === "bmi_reference_method")?.value).toBe("CDC 2022 extended");
    expect(result.classification?.en).toContain("extended percentile");
  });

  it("rejects ages outside the recommended CDC 2 to <20 year scope", () => {
    expect(
      cdcGrowthPercentilesCalculator.calculate({
        sex: "female",
        age_months: 23.9,
        weight_kg: 10,
        height_cm: 80
      }).warnings[0]?.id
    ).toBe("invalid_cdc_growth_input");

    expect(
      cdcGrowthPercentilesCalculator.calculate({
        sex: "female",
        age_months: 240,
        weight_kg: 60,
        height_cm: 165
      }).warnings[0]?.id
    ).toBe("invalid_cdc_growth_input");
  });

  it("does not produce diagnosis or treatment instructions", () => {
    const result = cdcGrowthPercentilesCalculator.calculate({
      sex: "female",
      age_months: 144,
      weight_kg: 40,
      height_cm: 150
    });
    const text = [
      result.label?.es,
      result.label?.en,
      result.classification?.es,
      result.classification?.en,
      ...(result.criteriaMatched ?? []).flatMap((item) => [item.es, item.en]),
      ...result.warnings.flatMap((item) => [item.message.es, item.message.en])
    ].join(" ");

    expect(text).not.toMatch(/diagnostico|diagnosis|tratamiento|treatment|ingreso|admission|alta|discharge/i);
  });
});
