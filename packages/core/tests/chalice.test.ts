import { describe, expect, it } from "vitest";
import { chaliceCalculator } from "../src/index";

const noCriteria = {
  witnessed_loss_of_consciousness_over_5_minutes: false,
  history_of_amnesia_over_5_minutes: false,
  abnormal_drowsiness: false,
  three_or_more_vomiting_episodes: false,
  suspicion_of_non_accidental_injury: false,
  post_traumatic_seizure_without_epilepsy: false,
  gcs_less_than_14_or_under_1_less_than_15: false,
  suspected_penetrating_or_depressed_skull_injury_or_tense_fontanelle: false,
  signs_of_basal_skull_fracture: false,
  focal_neurology: false,
  bruise_swelling_laceration_over_5cm_under_1_year: false,
  high_speed_road_traffic_mechanism: false,
  fall_over_3_metres: false,
  high_speed_projectile_or_object: false
};

const forbidden =
  /\b(CT|TC|tomografia|tomografía|observe|observar|discharge|alta|admit|ingreso|treatment|tratamiento|neurosurgery|neurocirugía)\b/i;

const resultText = (result: ReturnType<typeof chaliceCalculator.calculate>) =>
  JSON.stringify({
    classification: result.classification,
    warnings: result.warnings
  });

describe("CHALICE rule", () => {
  it("classifies no criteria", () => {
    const result = chaliceCalculator.calculate(noCriteria);

    expect(result.classification?.en).toContain("no rule criteria");
    expect(result.criteriaMatched).toHaveLength(0);
  });

  it("classifies a present criterion", () => {
    const result = chaliceCalculator.calculate({
      ...noCriteria,
      abnormal_drowsiness: true
    });

    expect(result.classification?.en).toContain("rule criteria are identified");
    expect(result.criteriaMatched).toHaveLength(1);
  });

  it("tracks multiple present criteria", () => {
    const result = chaliceCalculator.calculate({
      ...noCriteria,
      abnormal_drowsiness: true,
      focal_neurology: true,
      fall_over_3_metres: true
    });

    expect(result.classification?.en).toContain("rule criteria are identified");
    expect(result.criteriaMatched).toHaveLength(3);
  });

  it("warns on incomplete and invalid input", () => {
    expect(chaliceCalculator.calculate({}).warnings[0]?.id).toBe("missing_required_inputs");
    expect(
      chaliceCalculator.calculate({ ...noCriteria, focal_neurology: "bad" }).warnings[0]?.id
    ).toBe("invalid_boolean_input");
  });

  it("does not return prohibited management wording", () => {
    expect(
      resultText(chaliceCalculator.calculate({ ...noCriteria, abnormal_drowsiness: true }))
    ).not.toMatch(forbidden);
  });
});
