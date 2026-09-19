import { describe, expect, it } from "vitest";
import { pecarnUnder2Calculator } from "../src/index";

const eligible = {
  age_months: 12,
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
  palpable_skull_fracture: false,
  non_frontal_scalp_hematoma: false,
  loss_of_consciousness_5_seconds_or_more: false,
  severe_mechanism: false,
  abnormal_behavior_per_parent: false
};

const forbidden =
  /\b(CT|TC|tomografia|tomografía|observe|observar|discharge|alta|admit|ingreso|treatment|tratamiento|neurosurgery|neurocirugía|manejo|management|derivar)\b/i;

const resultText = (result: ReturnType<typeof pecarnUnder2Calculator.calculate>) =>
  JSON.stringify({ classification: result.classification, criteriaMatched: result.criteriaMatched, warnings: result.warnings });

describe("PECARN under 2 rule", () => {
  it("classifies no predictors, higher-risk and intermediate criteria", () => {
    expect(pecarnUnder2Calculator.calculate(noCriteria).classification?.en).toContain("no rule predictors");
    expect(pecarnUnder2Calculator.calculate({ ...noCriteria, altered_mental_status_or_gcs_less_than_15: true }).classification?.en).toContain("higher-risk");
    expect(pecarnUnder2Calculator.calculate({ ...noCriteria, palpable_skull_fracture: true }).classification?.en).toContain("higher-risk");
    expect(pecarnUnder2Calculator.calculate({ ...noCriteria, severe_mechanism: true }).classification?.en).toContain("intermediate");
  });

  it("blocks the wrong age branch and published exclusions", () => {
    expect(pecarnUnder2Calculator.calculate({ ...noCriteria, age_months: 24 }).warnings[0]?.id).toBe("pecarn_outside_validated_population");
    expect(pecarnUnder2Calculator.calculate({ ...noCriteria, ventricular_shunt: true }).warnings[0]?.id).toBe("pecarn_outside_validated_population");
    expect(pecarnUnder2Calculator.calculate({ ...noCriteria, presentation_within_24h: false }).warnings[0]?.id).toBe("pecarn_outside_validated_population");
  });

  it("warns on incomplete and invalid predictor input", () => {
    expect(pecarnUnder2Calculator.calculate({}).warnings[0]?.id).toBe("missing_required_inputs");
    expect(pecarnUnder2Calculator.calculate({ ...noCriteria, severe_mechanism: "bad" }).warnings[0]?.id).toBe("invalid_boolean_input");
  });

  it("does not return prohibited management wording", () => {
    expect(resultText(pecarnUnder2Calculator.calculate({ ...noCriteria, severe_mechanism: true }))).not.toMatch(forbidden);
  });
});
