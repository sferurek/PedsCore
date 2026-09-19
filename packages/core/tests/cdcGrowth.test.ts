import { describe, expect, it } from "vitest";
import {
  cdcGrowthPercentilesCalculator,
  calculateTool
} from "../src/index.js";

const traceObject = (result: ReturnType<typeof cdcGrowthPercentilesCalculator.calculate>) =>
  Object.fromEntries(result.trace.map((item) => [item.inputId, item.value]));

describe("CDC Growth Percentiles", () => {
  it("reproduces the official CDC 24-month male BMI median", () => {
    const result = cdcGrowthPercentilesCalculator.calculate({
      sex: "male",
      age_months: 24,
      weight_kg: 12.388147609,
      stature_cm: 86.45220101
    });
    const trace = traceObject(result);

    expect(trace.bmi).toBeCloseTo(16.57502768, 2);
    expect(trace.bmi_z).toBeCloseTo(0, 2);
    expect(result.value).toBeCloseTo(50, 1);
    expect(trace.bmi_method).toBe("cdc_2000_lms");
  });

  it("uses exact official weight and stature LMS medians at 24 months", () => {
    const result = cdcGrowthPercentilesCalculator.calculate({
      sex: "male",
      age_months: 24,
      weight_kg: 12.6707633,
      stature_cm: 86.45220101
    });
    const trace = traceObject(result);

    expect(trace.weight_z).toBeCloseTo(0, 2);
    expect(trace.weight_percentile).toBeCloseTo(50, 1);
    expect(trace.stature_z).toBeCloseTo(0, 2);
    expect(trace.stature_percentile).toBeCloseTo(50, 1);
  });

  it("rejects children younger than 2 years and points them to WHO", () => {
    const result = cdcGrowthPercentilesCalculator.calculate({
      sex: "female",
      age_months: 23.99,
      weight_kg: 11,
      stature_cm: 84
    });

    expect(result.value).toBeUndefined();
    expect(result.warnings.some((item) => item.id === "cdc_scope")).toBe(true);
    expect(JSON.stringify(result.warnings.find((item) => item.id === "cdc_scope"))).toContain("WHO");
  });

  it("interpolates official LMS values for exact decimal age", () => {
    const result = cdcGrowthPercentilesCalculator.calculate({
      sex: "female",
      age_months: 100.2,
      weight_kg: 28,
      stature_cm: 130
    });
    const trace = traceObject(result);

    expect(result.value).toBeGreaterThan(0);
    expect(result.value).toBeLessThan(100);
    expect(trace.bmi_method).toBe("cdc_2000_lms");
  });

  it("reproduces the published CDC Extended BMI example parameters", () => {
    const result = cdcGrowthPercentilesCalculator.calculate({
      sex: "male",
      age_months: 50.5,
      weight_kg: 22.6,
      stature_cm: 100
    });
    const trace = traceObject(result);

    expect(trace.bmi).toBeCloseTo(22.6, 2);
    expect(trace.bmi_p95).toBeCloseTo(17.8219, 3);
    expect(trace.extended_bmi_sigma).toBeCloseTo(2.3983, 3);
    expect(trace.bmi_method).toBe("cdc_extended_2022");
    expect(result.value).toBeGreaterThan(95);
  });

  it("switches automatically to CDC Extended BMI 2022 above P95", () => {
    const result = cdcGrowthPercentilesCalculator.calculate({
      sex: "male",
      age_months: 144,
      weight_kg: 90,
      stature_cm: 150
    });
    const trace = traceObject(result);

    expect(trace.bmi).toBeCloseTo(40, 2);
    expect(trace.bmi_method).toBe("cdc_extended_2022");
    expect(trace.extended_bmi_sigma).toBeCloseTo(5.2976, 3);
    expect(Number(trace.bmi_percent_of_p95)).toBeGreaterThan(120);
    expect(result.value).toBeGreaterThan(95);
    expect(result.warnings.some((item) => item.id === "cdc_extended_bmi_used")).toBe(true);
    expect(result.classification?.en).toContain("Severe obesity");
  });

  it("calculates through the public dispatcher", () => {
    const result = calculateTool("cdc_growth_percentiles", {
      sex: "female",
      age_months: 120,
      weight_kg: 32,
      stature_cm: 138
    });

    expect(result.warnings.some((item) => item.id === "calculator_not_implemented")).toBe(false);
    expect(result.value).toBeGreaterThan(0);
    expect(result.value).toBeLessThan(100);
  });
});
