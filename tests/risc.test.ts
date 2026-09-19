import { describe, expect, it } from "vitest";
import { riscCalculator } from "../packages/core/src/calculators/risc.js";

const base = { age_months: 12, hiv_infected: false, spo2_percent: 95, chest_indrawing: false, wheezing: false, refusing_feeds: false, weight_for_age_z: 0 };

describe("RISC (HIV-uninfected model)", () => {
  it("scores zero with no risk factors", () => {
    expect(riscCalculator.calculate(base).score).toBe(0);
  });
  it("reproduces the maximum score of six", () => {
    const result = riscCalculator.calculate({ ...base, spo2_percent: 89, chest_indrawing: true, refusing_feeds: true, weight_for_age_z: -3.5 });
    expect(result.score).toBe(6);
    expect(result.maxScore).toBe(6);
  });
  it("does not add chest-indrawing points on top of hypoxemia", () => {
    const hypoxemia = riscCalculator.calculate({ ...base, spo2_percent: 90, chest_indrawing: true });
    expect(hypoxemia.score).toBe(3);
  });
  it("subtracts two points for wheezing", () => {
    expect(riscCalculator.calculate({ ...base, wheezing: true }).score).toBe(-2);
  });
  it("scores weight-for-age boundaries", () => {
    expect(riscCalculator.calculate({ ...base, weight_for_age_z: -2 }).score).toBe(1);
    expect(riscCalculator.calculate({ ...base, weight_for_age_z: -3 }).score).toBe(1);
    expect(riscCalculator.calculate({ ...base, weight_for_age_z: -3.01 }).score).toBe(2);
  });
  it("rejects use beyond the original under-24-month population", () => {
    const result = riscCalculator.calculate({ ...base, age_months: 24 });
    expect(result.score).toBeUndefined();
    expect(result.warnings.some((w) => w.id === "risc_scope")).toBe(true);
  });
  it("does not silently apply the HIV-negative model to HIV-infected children", () => {
    const result = riscCalculator.calculate({ ...base, hiv_infected: true });
    expect(result.score).toBeUndefined();
    expect(result.warnings.some((w) => w.id === "risc_hiv_model")).toBe(true);
  });
});
