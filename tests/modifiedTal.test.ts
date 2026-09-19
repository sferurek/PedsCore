import { describe, expect, it } from "vitest";
import { modifiedTalCalculator } from "../packages/core/src/calculators/modifiedTal.js";

describe("Modified Tal Score", () => {
  it("scores zero for a normal assessment in an infant under 6 months", () => {
    const result = modifiedTalCalculator.calculate({ age_months: 3, respiratory_rate: 40, spo2_percent: 95, wheeze_crackles: 0, retractions: 0 });
    expect(result.score).toBe(0);
    expect(result.classification?.en).toContain("Mild");
  });

  it("uses the age-specific respiratory-rate thresholds at 6 months", () => {
    const under6 = modifiedTalCalculator.calculate({ age_months: 5.9, respiratory_rate: 40, spo2_percent: 95, wheeze_crackles: 0, retractions: 0 });
    const sixOrMore = modifiedTalCalculator.calculate({ age_months: 6, respiratory_rate: 40, spo2_percent: 95, wheeze_crackles: 0, retractions: 0 });
    expect(under6.score).toBe(0);
    expect(sixOrMore.score).toBe(1);
  });

  it("scores the published maximum of 12", () => {
    const result = modifiedTalCalculator.calculate({ age_months: 4, respiratory_rate: 71, spo2_percent: 89, wheeze_crackles: 3, retractions: 3 });
    expect(result.score).toBe(12);
    expect(result.maxScore).toBe(12);
    expect(result.classification?.en).toContain("Severe");
  });

  it("classifies 5 as mild, 6-8 as moderate, and 9+ as severe", () => {
    const mild = modifiedTalCalculator.calculate({ age_months: 8, respiratory_rate: 46, spo2_percent: 92, wheeze_crackles: 1, retractions: 1 });
    const moderate = modifiedTalCalculator.calculate({ age_months: 8, respiratory_rate: 46, spo2_percent: 92, wheeze_crackles: 2, retractions: 1 });
    const severe = modifiedTalCalculator.calculate({ age_months: 8, respiratory_rate: 61, spo2_percent: 90, wheeze_crackles: 2, retractions: 2 });
    expect(mild.score).toBe(5);
    expect(mild.classification?.en).toContain("Mild");
    expect(moderate.score).toBe(6);
    expect(moderate.classification?.en).toContain("Moderate");
    expect(severe.score).toBe(9);
    expect(severe.classification?.en).toContain("Severe");
  });
});
