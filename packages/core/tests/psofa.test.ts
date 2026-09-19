import { describe, expect, it } from "vitest";
import { psofaCalculator } from "../src/index.js";

const base = {
  age_months: 120,
  pao2_fio2_ratio: 400,
  respiratory_support: false,
  platelets_10e3_ul: 150,
  bilirubin_mg_dl: 1.1,
  map_mmhg: 65,
  dopamine_mcg_kg_min: 0,
  dobutamine_any_dose: false,
  epinephrine_mcg_kg_min: 0,
  norepinephrine_mcg_kg_min: 0,
  gcs: 15,
  creatinine_mg_dl: 0.6
};

const component = (result: ReturnType<typeof psofaCalculator.calculate>, id: string) =>
  result.trace.find((item) => item.inputId === id)?.score;

describe("pSOFA boundary checks", () => {
  it("scores a normal six-organ profile as zero", () => {
    const result = psofaCalculator.calculate(base);
    expect(result.score).toBe(0);
    expect(result.maxScore).toBe(24);
  });

  it("keeps PaO2/FiO2 respiratory boundaries exact", () => {
    expect(component(psofaCalculator.calculate({ ...base, pao2_fio2_ratio: 400 }), "pao2_fio2_ratio")).toBe(0);
    expect(component(psofaCalculator.calculate({ ...base, pao2_fio2_ratio: 399 }), "pao2_fio2_ratio")).toBe(1);
    expect(component(psofaCalculator.calculate({ ...base, pao2_fio2_ratio: 299 }), "pao2_fio2_ratio")).toBe(2);
    expect(component(psofaCalculator.calculate({ ...base, pao2_fio2_ratio: 199, respiratory_support: true }), "pao2_fio2_ratio")).toBe(3);
    expect(component(psofaCalculator.calculate({ ...base, pao2_fio2_ratio: 99, respiratory_support: true }), "pao2_fio2_ratio")).toBe(4);
  });

  it("keeps SpO2/FiO2 surrogate boundaries exact", () => {
    const sfBase = { ...base, pao2_fio2_ratio: undefined, spo2_fio2_ratio: 292 };
    expect(component(psofaCalculator.calculate(sfBase), "spo2_fio2_ratio")).toBe(0);
    expect(component(psofaCalculator.calculate({ ...sfBase, spo2_fio2_ratio: 291 }), "spo2_fio2_ratio")).toBe(1);
    expect(component(psofaCalculator.calculate({ ...sfBase, spo2_fio2_ratio: 263 }), "spo2_fio2_ratio")).toBe(2);
    expect(component(psofaCalculator.calculate({ ...sfBase, spo2_fio2_ratio: 220, respiratory_support: true }), "spo2_fio2_ratio")).toBe(3);
    expect(component(psofaCalculator.calculate({ ...sfBase, spo2_fio2_ratio: 147, respiratory_support: true }), "spo2_fio2_ratio")).toBe(4);
  });

  it("keeps cardiovascular, neurologic and renal boundaries exact", () => {
    expect(component(psofaCalculator.calculate({ ...base, map_mmhg: 64 }), "cardiovascular")).toBe(1);
    expect(component(psofaCalculator.calculate({ ...base, dopamine_mcg_kg_min: 0.1 }), "cardiovascular")).toBe(2);
    expect(component(psofaCalculator.calculate({ ...base, dopamine_mcg_kg_min: 5.1 }), "cardiovascular")).toBe(3);
    expect(component(psofaCalculator.calculate({ ...base, dopamine_mcg_kg_min: 15.1 }), "cardiovascular")).toBe(4);
    expect(component(psofaCalculator.calculate({ ...base, gcs: 14 }), "gcs")).toBe(1);
    expect(component(psofaCalculator.calculate({ ...base, gcs: 12 }), "gcs")).toBe(2);
    expect(component(psofaCalculator.calculate({ ...base, gcs: 9 }), "gcs")).toBe(3);
    expect(component(psofaCalculator.calculate({ ...base, gcs: 5 }), "gcs")).toBe(4);
    expect(component(psofaCalculator.calculate({ ...base, creatinine_mg_dl: 0.7 }), "creatinine_mg_dl")).toBe(1);
    expect(component(psofaCalculator.calculate({ ...base, creatinine_mg_dl: 1.1 }), "creatinine_mg_dl")).toBe(2);
    expect(component(psofaCalculator.calculate({ ...base, creatinine_mg_dl: 1.8 }), "creatinine_mg_dl")).toBe(3);
    expect(component(psofaCalculator.calculate({ ...base, creatinine_mg_dl: 2.6 }), "creatinine_mg_dl")).toBe(4);
  });
});
