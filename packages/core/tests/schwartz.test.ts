import { describe, expect, it } from "vitest";
import { bedsideSchwartzCalculator } from "../src/index";

describe("Bedside Schwartz calculator", () => {
  it("calculates eGFR with creatinine in mg/dL", () => {
    const result = bedsideSchwartzCalculator.calculate({
      height_cm: 100,
      serum_creatinine: 1,
      creatinine_unit: "mg_dl"
    });

    expect(result.value).toBeCloseTo(41.3, 1);
  });

  it("converts creatinine from umol/L", () => {
    const result = bedsideSchwartzCalculator.calculate({
      height_cm: 100,
      serum_creatinine: 88.4,
      creatinine_unit: "umol_l"
    });

    expect(result.value).toBeCloseTo(41.3, 1);
  });

  it("warns on invalid height or creatinine", () => {
    expect(
      bedsideSchwartzCalculator.calculate({
        height_cm: 0,
        serum_creatinine: 1,
        creatinine_unit: "mg_dl"
      }).warnings[0]?.id
    ).toBe("invalid_schwartz_inputs");
    expect(
      bedsideSchwartzCalculator.calculate({
        height_cm: 100,
        serum_creatinine: 0,
        creatinine_unit: "mg_dl"
      }).warnings[0]?.id
    ).toBe("invalid_schwartz_inputs");
  });

  it("warns on missing and extreme values", () => {
    expect(bedsideSchwartzCalculator.calculate({}).warnings[0]?.id).toBe(
      "missing_required_inputs"
    );

    const result = bedsideSchwartzCalculator.calculate({
      height_cm: 250,
      serum_creatinine: 0.05,
      creatinine_unit: "mg_dl"
    });

    expect(result.value).toBeTypeOf("number");
    expect(
      result.warnings.some((warning) => warning.id === "extreme_schwartz_input")
    ).toBe(true);
  });
});

