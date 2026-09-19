import { describe, expect, it } from "vitest";
import { pelod2Calculator } from "../src/index.js";

const base = {
  age_months: 60,
  gcs: 15,
  both_pupils_fixed: false,
  lactate_mmol_l: 1,
  map_mmhg: 80,
  creatinine_umol_l: 50,
  pao2_mmhg: 100,
  fio2_fraction: 0.21,
  paco2_mmhg: 40,
  invasive_ventilation: false,
  wbc_10e9_l: 5,
  platelets_10e9_l: 200
};

const scoreFor = (inputId: string, result: ReturnType<typeof pelod2Calculator.calculate>) =>
  result.trace.find((item) => item.inputId === inputId)?.score;

describe("PELOD-2 reference and boundary checks", () => {
  it("matches the published logistic mortality equation at score zero", () => {
    const result = pelod2Calculator.calculate(base);
    expect(result.score).toBe(0);
    expect(result.trace.find((item) => item.inputId === "mortality_logit")?.value).toBe(-6.61);
    expect(result.value).toBe(0.13);
  });

  it("keeps GCS and lactate cut points exact", () => {
    expect(scoreFor("gcs", pelod2Calculator.calculate({ ...base, gcs: 11 }))).toBe(0);
    expect(scoreFor("gcs", pelod2Calculator.calculate({ ...base, gcs: 10 }))).toBe(1);
    expect(scoreFor("gcs", pelod2Calculator.calculate({ ...base, gcs: 4 }))).toBe(4);
    expect(scoreFor("lactate_mmol_l", pelod2Calculator.calculate({ ...base, lactate_mmol_l: 4.99 }))).toBe(0);
    expect(scoreFor("lactate_mmol_l", pelod2Calculator.calculate({ ...base, lactate_mmol_l: 5 }))).toBe(1);
    expect(scoreFor("lactate_mmol_l", pelod2Calculator.calculate({ ...base, lactate_mmol_l: 11 }))).toBe(4);
  });

  it("keeps age-specific MAP and creatinine boundaries exact", () => {
    expect(scoreFor("map_mmhg", pelod2Calculator.calculate({ ...base, map_mmhg: 65 }))).toBe(0);
    expect(scoreFor("map_mmhg", pelod2Calculator.calculate({ ...base, map_mmhg: 64.9 }))).toBe(2);
    expect(scoreFor("map_mmhg", pelod2Calculator.calculate({ ...base, map_mmhg: 48.9 }))).toBe(3);
    expect(scoreFor("map_mmhg", pelod2Calculator.calculate({ ...base, map_mmhg: 35.9 }))).toBe(6);
    expect(scoreFor("creatinine_umol_l", pelod2Calculator.calculate({ ...base, creatinine_umol_l: 58.9 }))).toBe(0);
    expect(scoreFor("creatinine_umol_l", pelod2Calculator.calculate({ ...base, creatinine_umol_l: 59 }))).toBe(2);
  });

  it("keeps respiratory and hematologic boundaries exact", () => {
    expect(scoreFor("pao2_fio2_ratio", pelod2Calculator.calculate({ ...base, pao2_mmhg: 60, fio2_fraction: 1 }))).toBe(2);
    expect(scoreFor("pao2_fio2_ratio", pelod2Calculator.calculate({ ...base, pao2_mmhg: 60.1, fio2_fraction: 1 }))).toBe(0);
    expect(scoreFor("paco2_mmhg", pelod2Calculator.calculate({ ...base, paco2_mmhg: 58 }))).toBe(0);
    expect(scoreFor("paco2_mmhg", pelod2Calculator.calculate({ ...base, paco2_mmhg: 58.1 }))).toBe(1);
    expect(scoreFor("paco2_mmhg", pelod2Calculator.calculate({ ...base, paco2_mmhg: 95 }))).toBe(3);
    expect(scoreFor("wbc_10e9_l", pelod2Calculator.calculate({ ...base, wbc_10e9_l: 2 }))).toBe(2);
    expect(scoreFor("platelets_10e9_l", pelod2Calculator.calculate({ ...base, platelets_10e9_l: 142 }))).toBe(0);
    expect(scoreFor("platelets_10e9_l", pelod2Calculator.calculate({ ...base, platelets_10e9_l: 141 }))).toBe(1);
    expect(scoreFor("platelets_10e9_l", pelod2Calculator.calculate({ ...base, platelets_10e9_l: 76 }))).toBe(2);
  });
});
