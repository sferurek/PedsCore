import { describe, expect, it } from "vitest";
import {
  bedsideSchwartzCalculator,
  revisedSchwartzCalculator
} from "../src/index";

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

describe("Revised Schwartz CKiD 2009 calculator", () => {
  it("calculates multivariable eGFR with creatinine in mg/dL", () => {
    const result = revisedSchwartzCalculator.calculate({
      height_cm: 140,
      serum_creatinine: 1,
      creatinine_unit: "mg_dl",
      cystatin_c_mg_l: 1.8,
      bun_mg_dl: 30,
      sex: "female"
    });

    expect(result.value).toBeCloseTo(46.5, 1);
    expect(result.unit).toBe("mL/min/1.73 m2");
    expect(result.warnings[0]?.id).toBe("egfr_estimate_only");
  });

  it("applies the male factor and creatinine unit conversion", () => {
    const result = revisedSchwartzCalculator.calculate({
      height_cm: 140,
      serum_creatinine: 88.4,
      creatinine_unit: "umol_l",
      cystatin_c_mg_l: 1.8,
      bun_mg_dl: 30,
      sex: "male"
    });

    expect(result.value).toBeCloseTo(51.1, 1);
    expect(
      result.trace.find((entry) => entry.inputId === "serum_creatinine_mg_dl")
        ?.value
    ).toBeCloseTo(1, 3);
  });

  it("returns safe warnings for missing and invalid inputs", () => {
    expect(revisedSchwartzCalculator.calculate({}).warnings[0]?.id).toBe(
      "missing_required_inputs"
    );

    expect(
      revisedSchwartzCalculator.calculate({
        height_cm: 140,
        serum_creatinine: 1,
        creatinine_unit: "mg_dl",
        cystatin_c_mg_l: 0,
        bun_mg_dl: 30,
        sex: "female"
      }).warnings[0]?.id
    ).toBe("invalid_revised_schwartz_inputs");
  });

  it("flags extreme values without suppressing the descriptive estimate", () => {
    const result = revisedSchwartzCalculator.calculate({
      height_cm: 230,
      serum_creatinine: 0.05,
      creatinine_unit: "mg_dl",
      cystatin_c_mg_l: 0.1,
      bun_mg_dl: 180,
      sex: "female"
    });

    expect(result.value).toBeTypeOf("number");
    expect(
      result.warnings.some(
        (warning) => warning.id === "extreme_revised_schwartz_input"
      )
    ).toBe(true);
  });
});
