import { describe, expect, it } from "vitest";
import { pecarn2OrMoreCalculator } from "../src/index";

const eligible = {
  age_months: 60,
  initial_gcs: 15,
  blunt_head_trauma: true,
  presentation_within_24h: true,
  trivial_mechanism_only: false,
  penetrating_trauma: false,
  known_brain_tumor: false,
  preexisting_neurologic_disorder_complicating_assessment: false,
  prior_neuroimaging_before_transfer: false,
  ventricular_shunt: false,
  bleeding_disorder: false
};

const noCriteria = {
  ...eligible,
  altered_mental_status_or_gcs_less_than_15: false,
  signs_of_basilar_skull_fracture: false,
  history_of_loss_of_consciousness: false,
  history_of_vomiting: false,
  severe_mechanism: false,
  severe_headache: false
};

const forbidden =
  /\b(CT|TC|tomografia|tomografía|observe|observar|discharge|alta|admit|ingreso|treatment|tratamiento|neurosurgery|neurocirugía|manejo|management|derivar)\b/i;

const resultText = (result: ReturnType<typeof pecarn2OrMoreCalculator.calculate>) =>
  JSON.stringify({ classification: result.classification, criteriaMatched: result.criteriaMatched, warnings: result.warnings });

describe("PECARN 2 years or older rule", () => {
  it("classifies no predictors, higher-risk and intermediate criteria", () => {
    expect(pecarn2OrMoreCalculator.calculate(noCriteria).classification?.en).toContain("no rule predictors");
    expect(pecarn2OrMoreCalculator.calculate({ ...noCriteria, altered_mental_status_or_gcs_less_than_15: true }).classification?.en).toContain("higher-risk");
    expect(pecarn2OrMoreCalculator.calculate({ ...noCriteria, signs_of_basilar_skull_fracture: true }).classification?.en).toContain("higher-risk");
    expect(pecarn2OrMoreCalculator.calculate({ ...noCriteria, history_of_vomiting: true }).classification?.en).toContain("intermediate");
  });

  it("blocks the wrong age branch and published exclusions", () => {
    expect(pecarn2OrMoreCalculator.calculate({ ...noCriteria, age_months: 23.9 }).warnings[0]?.id).toBe("pecarn_outside_validated_population");
    expect(pecarn2OrMoreCalculator.calculate({ ...noCriteria, bleeding_disorder: true }).warnings[0]?.id).toBe("pecarn_outside_validated_population");
    expect(pecarn2OrMoreCalculator.calculate({ ...noCriteria, initial_gcs: 13 }).warnings[0]?.id).toBe("pecarn_outside_validated_population");
  });

  it("warns on incomplete and invalid predictor input", () => {
    expect(pecarn2OrMoreCalculator.calculate({}).warnings[0]?.id).toBe("missing_required_inputs");
    expect(pecarn2OrMoreCalculator.calculate({ ...noCriteria, severe_headache: "bad" }).warnings[0]?.id).toBe("invalid_boolean_input");
  });

  it("does not return prohibited management wording", () => {
    expect(resultText(pecarn2OrMoreCalculator.calculate({ ...noCriteria, severe_headache: true }))).not.toMatch(forbidden);
  });
});
