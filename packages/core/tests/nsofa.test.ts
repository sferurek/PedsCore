import { describe, expect, it } from "vitest";
import { nSofaCalculator } from "../src/index.js";

const base = {
  intubated: false,
  spo2_percent: 95,
  fio2_fraction: 0.21,
  inotrope_count: 0,
  systemic_steroids: false,
  platelets_10e3_ul: 150
};

const component = (result: ReturnType<typeof nSofaCalculator.calculate>, id: string) =>
  result.trace.find((item) => item.inputId === id)?.score;

describe("nSOFA reference and boundary checks", () => {
  it("scores a stable non-intubated profile as zero", () => {
    const result = nSofaCalculator.calculate(base);
    expect(result.score).toBe(0);
    expect(result.maxScore).toBe(15);
  });

  it("keeps respiratory S/F boundaries exact when intubated", () => {
    expect(component(nSofaCalculator.calculate({ ...base, intubated: true, spo2_percent: 90, fio2_fraction: 0.3 }), "spo2_fio2")).toBe(0);
    expect(component(nSofaCalculator.calculate({ ...base, intubated: true, spo2_percent: 89.7, fio2_fraction: 0.3 }), "spo2_fio2")).toBe(2);
    expect(component(nSofaCalculator.calculate({ ...base, intubated: true, spo2_percent: 99.5, fio2_fraction: 0.5 }), "spo2_fio2")).toBe(4);
    expect(component(nSofaCalculator.calculate({ ...base, intubated: true, spo2_percent: 89.4, fio2_fraction: 0.6 }), "spo2_fio2")).toBe(6);
    expect(component(nSofaCalculator.calculate({ ...base, intubated: true, spo2_percent: 89.1, fio2_fraction: 0.9 }), "spo2_fio2")).toBe(8);
  });

  it("keeps cardiovascular combinations exact", () => {
    expect(component(nSofaCalculator.calculate({ ...base, systemic_steroids: true }), "inotrope_count")).toBe(1);
    expect(component(nSofaCalculator.calculate({ ...base, inotrope_count: 1 }), "inotrope_count")).toBe(2);
    expect(component(nSofaCalculator.calculate({ ...base, inotrope_count: 1, systemic_steroids: true }), "inotrope_count")).toBe(3);
    expect(component(nSofaCalculator.calculate({ ...base, inotrope_count: 2, systemic_steroids: false }), "inotrope_count")).toBe(3);
    expect(component(nSofaCalculator.calculate({ ...base, inotrope_count: 2, systemic_steroids: true }), "inotrope_count")).toBe(4);
  });

  it("keeps platelet thresholds exact", () => {
    expect(component(nSofaCalculator.calculate({ ...base, platelets_10e3_ul: 150 }), "platelets_10e3_ul")).toBe(0);
    expect(component(nSofaCalculator.calculate({ ...base, platelets_10e3_ul: 149 }), "platelets_10e3_ul")).toBe(1);
    expect(component(nSofaCalculator.calculate({ ...base, platelets_10e3_ul: 99 }), "platelets_10e3_ul")).toBe(2);
    expect(component(nSofaCalculator.calculate({ ...base, platelets_10e3_ul: 49 }), "platelets_10e3_ul")).toBe(3);
  });
});
