import { describe, expect, it } from "vitest";
import { pecarnUnder2Calculator } from "../src/index";

const noCriteria = {
  altered_mental_status_or_gcs_less_than_15: false,
  palpable_skull_fracture: false,
  non_frontal_scalp_hematoma: false,
  loss_of_consciousness_5_seconds_or_more: false,
  severe_mechanism: false,
  abnormal_behavior_per_parent: false
};

const forbidden = /CT|tomografia|tomografía|TC|alta|ingreso|adrenalina|tratamiento|observar/i;

describe("PECARN under 2 rule", () => {
  it("classifies no predictors, higher-risk and intermediate criteria", () => {
    expect(pecarnUnder2Calculator.calculate(noCriteria).classification?.en).toContain("no rule predictors");
    expect(pecarnUnder2Calculator.calculate({ ...noCriteria, altered_mental_status_or_gcs_less_than_15: true }).classification?.en).toContain("higher-risk");
    expect(pecarnUnder2Calculator.calculate({ ...noCriteria, palpable_skull_fracture: true }).classification?.en).toContain("higher-risk");
    expect(pecarnUnder2Calculator.calculate({ ...noCriteria, severe_mechanism: true }).classification?.en).toContain("intermediate");
    expect(pecarnUnder2Calculator.calculate({ ...noCriteria, severe_mechanism: true, abnormal_behavior_per_parent: true }).criteriaMatched).toHaveLength(2);
  });

  it("warns on incomplete and invalid input", () => {
    expect(pecarnUnder2Calculator.calculate({}).warnings[0]?.id).toBe("missing_required_inputs");
    expect(pecarnUnder2Calculator.calculate({ ...noCriteria, severe_mechanism: "bad" }).warnings[0]?.id).toBe("invalid_boolean_input");
  });

  it("does not return prohibited management wording", () => {
    const resultText = JSON.stringify(pecarnUnder2Calculator.calculate({ ...noCriteria, severe_mechanism: true }).classification);
    expect(resultText).not.toMatch(forbidden);
  });
});

