import { describe, expect, it } from "vitest";
import { calculateTool, stepByStepCalculator } from "../src/index.js";

const base = {
  age_days: 30,
  fever_without_source: true,
  well_appearing: true,
  leukocyturia: false,
  procalcitonin_ng_ml: 0.2,
  crp_mg_l: 10,
  anc: 5000
};

describe("Step-by-Step febrile infant", () => {
  it("classifies low risk only when all sequential criteria are negative", () => {
    const result = stepByStepCalculator.calculate(base);
    expect(result.score).toBe(0);
    expect(result.classification?.en).toContain("Low risk");
  });

  it("classifies age 21 days as high risk", () => {
    const result = stepByStepCalculator.calculate({ ...base, age_days: 21 });
    expect(result.score).toBe(2);
    expect(result.criteriaMatched?.some((item) => item.en.includes("≤21"))).toBe(true);
  });

  it("stops at age <=21 without requiring downstream biomarkers", () => {
    const result = stepByStepCalculator.calculate({
      age_days: 21,
      fever_without_source: true
    });
    expect(result.score).toBe(2);
    expect(result.criteriaMatched?.[0]?.en).toContain("≤21");
  });

  it("stops at ill appearance or leukocyturia without requiring later tests", () => {
    expect(stepByStepCalculator.calculate({
      age_days: 30,
      fever_without_source: true,
      well_appearing: false
    }).score).toBe(2);

    expect(stepByStepCalculator.calculate({
      age_days: 30,
      fever_without_source: true,
      well_appearing: true,
      leukocyturia: true
    }).score).toBe(2);
  });

  it("classifies PCT exactly 0.5 ng/mL as high risk", () => {
    const result = stepByStepCalculator.calculate({ ...base, procalcitonin_ng_ml: 0.5 });
    expect(result.score).toBe(2);
  });

  it("uses strict CRP >20 and ANC >10000 intermediate thresholds", () => {
    expect(stepByStepCalculator.calculate({ ...base, crp_mg_l: 20, anc: 10000 }).score).toBe(0);
    expect(stepByStepCalculator.calculate({ ...base, crp_mg_l: 20.1 }).score).toBe(1);
    expect(stepByStepCalculator.calculate({ ...base, anc: 10001 }).score).toBe(1);
  });

  it("prioritizes high-risk criteria over intermediate biomarkers", () => {
    const result = stepByStepCalculator.calculate({
      ...base,
      leukocyturia: true,
      crp_mg_l: 80,
      anc: 15000
    });
    expect(result.score).toBe(2);
    expect(result.classification?.en).toContain("High risk");
  });

  it("does not classify fever outside the selected population", () => {
    const result = stepByStepCalculator.calculate({ ...base, fever_without_source: false });
    expect(result.score).toBeUndefined();
    expect(result.classification?.en).toContain("Outside");
  });

  it("is available through the dispatcher", () => {
    const result = calculateTool("step_by_step", base);
    expect(result.score).toBe(0);
    expect(result.warnings.some((item) => item.id === "calculator_not_implemented")).toBe(false);
  });
});
