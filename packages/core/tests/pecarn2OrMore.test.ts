import { describe, expect, it } from "vitest";
import { pecarn2OrMoreCalculator } from "../src/index";

const noCriteria = {
  altered_mental_status_or_gcs_less_than_15: false,
  signs_of_basilar_skull_fracture: false,
  history_of_loss_of_consciousness: false,
  history_of_vomiting: false,
  severe_mechanism: false,
  severe_headache: false
};

const forbidden = /CT|tomografia|tomografía|TC|alta|ingreso|adrenalina|tratamiento|observar/i;

describe("PECARN 2 years or older rule", () => {
  it("classifies no predictors, higher-risk and intermediate criteria", () => {
    expect(pecarn2OrMoreCalculator.calculate(noCriteria).classification?.en).toContain("no rule predictors");
    expect(pecarn2OrMoreCalculator.calculate({ ...noCriteria, altered_mental_status_or_gcs_less_than_15: true }).classification?.en).toContain("higher-risk");
    expect(pecarn2OrMoreCalculator.calculate({ ...noCriteria, signs_of_basilar_skull_fracture: true }).classification?.en).toContain("higher-risk");
    expect(pecarn2OrMoreCalculator.calculate({ ...noCriteria, history_of_vomiting: true }).classification?.en).toContain("intermediate");
    expect(pecarn2OrMoreCalculator.calculate({ ...noCriteria, severe_headache: true }).classification?.en).toContain("intermediate");
    expect(pecarn2OrMoreCalculator.calculate({ ...noCriteria, history_of_vomiting: true, severe_headache: true }).criteriaMatched).toHaveLength(2);
  });

  it("warns on incomplete and invalid input", () => {
    expect(pecarn2OrMoreCalculator.calculate({}).warnings[0]?.id).toBe("missing_required_inputs");
    expect(pecarn2OrMoreCalculator.calculate({ ...noCriteria, severe_headache: "bad" }).warnings[0]?.id).toBe("invalid_boolean_input");
  });

  it("does not return prohibited management wording", () => {
    const resultText = JSON.stringify(pecarn2OrMoreCalculator.calculate({ ...noCriteria, severe_headache: true }).classification);
    expect(resultText).not.toMatch(forbidden);
  });
});

