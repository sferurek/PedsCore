import { describe, expect, it } from "vitest";
import { catchCalculator } from "../src/index";

const eligible = {
  age_years: 8,
  initial_gcs: 15,
  injury_within_24h: true,
  witnessed_loss_of_consciousness: true,
  definite_amnesia: false,
  witnessed_disorientation: false,
  persistent_vomiting_more_than_one_episode: false,
  persistent_irritability_if_under_2: false,
  obvious_penetrating_skull_injury: false,
  obvious_depressed_skull_fracture: false,
  acute_focal_neurologic_deficit: false,
  chronic_generalized_developmental_delay: false,
  suspected_child_abuse: false,
  returning_for_reassessment: false
};

const noCriteria = {
  ...eligible,
  gcs_less_than_15_at_2_hours: false,
  suspected_open_or_depressed_skull_fracture: false,
  worsening_headache: false,
  irritability_on_exam: false,
  signs_of_basal_skull_fracture: false,
  large_boggy_scalp_hematoma: false,
  dangerous_mechanism: false
};

describe("CATCH rule", () => {
  it("classifies criteria only after eligibility is satisfied", () => {
    expect(catchCalculator.calculate(noCriteria).classification?.en).toContain("no rule criteria");
    expect(catchCalculator.calculate({ ...noCriteria, gcs_less_than_15_at_2_hours: true }).classification?.en).toContain("higher-risk");
    expect(catchCalculator.calculate({ ...noCriteria, dangerous_mechanism: true }).classification?.en).toContain("medium-risk");
  });

  it("blocks patients outside the published entry population", () => {
    expect(catchCalculator.calculate({ ...noCriteria, injury_within_24h: false }).warnings[0]?.id).toBe("catch_outside_validated_population");
    expect(catchCalculator.calculate({ ...noCriteria, initial_gcs: 12 }).warnings[0]?.id).toBe("catch_outside_validated_population");
    expect(catchCalculator.calculate({ ...noCriteria, witnessed_loss_of_consciousness: false }).warnings[0]?.id).toBe("catch_outside_validated_population");
    expect(catchCalculator.calculate({ ...noCriteria, suspected_child_abuse: true }).warnings[0]?.id).toBe("catch_outside_validated_population");
  });

  it("requires persistent irritability only when age is under 2 years", () => {
    const older = { ...noCriteria };
    delete older.persistent_irritability_if_under_2;
    expect(catchCalculator.calculate(older).classification?.en).toContain("no rule criteria");

    const infant = {
      ...noCriteria,
      age_years: 1,
      witnessed_loss_of_consciousness: true
    };
    delete infant.persistent_irritability_if_under_2;
    expect(catchCalculator.calculate(infant).warnings[0]?.id).toBe("missing_required_inputs");
  });

  it("warns on incomplete and invalid predictor input", () => {
    expect(catchCalculator.calculate({}).warnings[0]?.id).toBe("missing_required_inputs");
    expect(catchCalculator.calculate({ ...noCriteria, dangerous_mechanism: "bad" }).warnings[0]?.id).toBe("invalid_boolean_input");
  });
});
