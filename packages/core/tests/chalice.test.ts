import { describe, expect, it } from "vitest";
import { chaliceCalculator } from "../src/index";

const noCriteria = {
  age_years: 8,
  head_injury_present: true,
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

describe("CHALICE rule", () => {
  it("classifies no criteria and present criteria", () => {
    expect(chaliceCalculator.calculate(noCriteria).classification?.en).toContain("no rule criteria");
    expect(chaliceCalculator.calculate({ ...noCriteria, abnormal_drowsiness: true }).classification?.en).toContain("rule criteria are identified");
  });

  it("blocks patients outside the published pediatric population", () => {
    expect(chaliceCalculator.calculate({ ...noCriteria, age_years: 16 }).warnings[0]?.id).toBe("chalice_outside_validated_population");
    expect(chaliceCalculator.calculate({ ...noCriteria, head_injury_present: false }).warnings[0]?.id).toBe("chalice_outside_validated_population");
  });

  it("requires the >5 cm scalp criterion only under 1 year", () => {
    const older = { ...noCriteria, bruise_swelling_laceration_over_5cm_under_1_year: undefined };
    expect(chaliceCalculator.calculate(older).classification?.en).toContain("no rule criteria");

    const infant = {
      ...noCriteria,
      age_years: 0.5,
      bruise_swelling_laceration_over_5cm_under_1_year: undefined
    };
    expect(chaliceCalculator.calculate(infant).warnings[0]?.id).toBe("missing_required_inputs");
  });

  it("warns on incomplete and invalid predictor input", () => {
    expect(chaliceCalculator.calculate({}).warnings[0]?.id).toBe("missing_required_inputs");
    expect(chaliceCalculator.calculate({ ...noCriteria, focal_neurology: "bad" }).warnings[0]?.id).toBe("invalid_boolean_input");
  });
});
