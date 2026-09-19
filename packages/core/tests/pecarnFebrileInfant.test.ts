import { describe, expect, it } from "vitest";
import { calculateTool, pecarnFebrileInfantCalculator } from "../src/index.js";

const eligible = {
  age_days: 30,
  fever_38_within_24h: true,
  critically_ill: false,
  previously_healthy: true,
  gestation_over_36_weeks: true,
  antibiotics_last_48h: false,
  indwelling_device: false,
  soft_tissue_infection: false,
  urinalysis_negative: true,
  anc: 3000,
  procalcitonin_ng_ml: 0.3
};

describe("PECARN febrile infant rule", () => {
  it("classifies low risk with the canonical PECARN thresholds", () => {
    const result = pecarnFebrileInfantCalculator.calculate(eligible);
    expect(result.score).toBe(0);
    expect(result.classification?.en).toContain("low-risk");
  });

  it("includes the exact ANC 4090 and PCT 1.71 boundaries", () => {
    const result = pecarnFebrileInfantCalculator.calculate({
      ...eligible,
      anc: 4090,
      procalcitonin_ng_ml: 1.71
    });
    expect(result.score).toBe(0);
  });

  it("fails low-risk classification immediately above either canonical boundary", () => {
    expect(pecarnFebrileInfantCalculator.calculate({ ...eligible, anc: 4091 }).score).toBe(1);
    expect(pecarnFebrileInfantCalculator.calculate({ ...eligible, procalcitonin_ng_ml: 1.72 }).score).toBe(1);
  });

  it("requires a negative urinalysis", () => {
    const result = pecarnFebrileInfantCalculator.calculate({
      ...eligible,
      urinalysis_negative: false
    });
    expect(result.score).toBe(1);
    expect(result.criteriaMatched?.some((item) => item.en.includes("Urinalysis"))).toBe(true);
  });

  it("rejects infants outside the original study eligibility", () => {
    const result = pecarnFebrileInfantCalculator.calculate({
      ...eligible,
      gestation_over_36_weeks: false
    });
    expect(result.score).toBeUndefined();
    expect(result.classification?.en).toContain("Outside");
  });

  it("rejects age above 60 days", () => {
    const result = pecarnFebrileInfantCalculator.calculate({
      ...eligible,
      age_days: 61
    });
    expect(result.score).toBeUndefined();
  });

  it("is available through the public dispatcher", () => {
    const result = calculateTool("pecarn_febrile_infant", eligible);
    expect(result.score).toBe(0);
    expect(result.warnings.some((item) => item.id === "calculator_not_implemented")).toBe(false);
  });
});
