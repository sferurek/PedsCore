import { describe, expect, it } from "vitest";
import { calculateTool, yaleObservationScaleCalculator } from "../src/index.js";

const normal = {
  age_months: 12,
  febrile_illness: true,
  cry: 1,
  parent_reaction: 1,
  state_variation: 1,
  color: 1,
  hydration: 1,
  social_response: 1
};

describe("Yale Observation Scale", () => {
  it("scores the six classic domains from 6 to 30", () => {
    const result = yaleObservationScaleCalculator.calculate(normal);
    expect(result.score).toBe(6);
    expect(result.maxScore).toBe(30);
    expect(result.classification?.en).toContain("Normal");
  });

  it("classifies 11-15 as intermediate", () => {
    const result = yaleObservationScaleCalculator.calculate({
      ...normal,
      cry: 3,
      parent_reaction: 3,
      color: 3
    });
    expect(result.score).toBe(12);
    expect(result.classification?.en).toContain("Intermediate");
  });

  it("classifies 16 or more as markedly abnormal", () => {
    const result = yaleObservationScaleCalculator.calculate({
      ...normal,
      cry: 5,
      parent_reaction: 5,
      state_variation: 5,
      color: 3
    });
    expect(result.score).toBe(20);
    expect(result.classification?.en).toContain("Markedly abnormal");
  });

  it("does not operationally classify infants younger than 3 months", () => {
    const result = yaleObservationScaleCalculator.calculate({ ...normal, age_months: 2 });
    expect(result.score).toBeUndefined();
    expect(result.classification?.en).toContain("Outside");
  });

  it("requires febrile illness", () => {
    const result = yaleObservationScaleCalculator.calculate({ ...normal, febrile_illness: false });
    expect(result.score).toBeUndefined();
  });

  it("is available through the dispatcher", () => {
    const result = calculateTool("yos", normal);
    expect(result.score).toBe(6);
    expect(result.warnings.some((item) => item.id === "calculator_not_implemented")).toBe(false);
  });
});
