import { describe, expect, it } from "vitest";
import { catchCalculator } from "../src/index";

const noCriteria = {
  gcs_less_than_15_at_2_hours: false,
  suspected_open_or_depressed_skull_fracture: false,
  worsening_headache: false,
  irritability_on_exam: false,
  signs_of_basal_skull_fracture: false,
  large_boggy_scalp_hematoma: false,
  dangerous_mechanism: false
};

const forbidden =
  /\b(CT|TC|tomografia|tomografía|observe|observar|discharge|alta|admit|ingreso|treatment|tratamiento|neurosurgery|neurocirugía|manejo|management|derivar)\b/i;

const resultText = (result: ReturnType<typeof catchCalculator.calculate>) =>
  JSON.stringify({
    classification: result.classification,
    criteriaMatched: result.criteriaMatched,
    warnings: result.warnings
  });

describe("CATCH rule", () => {
  it("classifies no criteria", () => {
    const result = catchCalculator.calculate(noCriteria);

    expect(result.classification?.en).toContain("no rule criteria");
    expect(result.criteriaMatched).toHaveLength(0);
  });

  it("classifies higher-risk criteria", () => {
    const result = catchCalculator.calculate({
      ...noCriteria,
      gcs_less_than_15_at_2_hours: true
    });

    expect(result.classification?.en).toContain("higher-risk");
    expect(result.criteriaMatched).toHaveLength(1);
  });

  it("classifies medium-risk criteria", () => {
    const result = catchCalculator.calculate({
      ...noCriteria,
      dangerous_mechanism: true
    });

    expect(result.classification?.en).toContain("medium-risk");
    expect(result.criteriaMatched).toHaveLength(1);
  });

  it("prioritizes higher-risk classification when multiple criteria are present", () => {
    const result = catchCalculator.calculate({
      ...noCriteria,
      worsening_headache: true,
      signs_of_basal_skull_fracture: true,
      dangerous_mechanism: true
    });

    expect(result.classification?.en).toContain("higher-risk");
    expect(result.criteriaMatched).toHaveLength(3);
  });

  it("warns on incomplete and invalid input", () => {
    expect(catchCalculator.calculate({}).warnings[0]?.id).toBe("missing_required_inputs");
    expect(
      catchCalculator.calculate({ ...noCriteria, dangerous_mechanism: "bad" }).warnings[0]?.id
    ).toBe("invalid_boolean_input");
  });

  it("does not return prohibited management wording", () => {
    expect(
      resultText(catchCalculator.calculate({ ...noCriteria, dangerous_mechanism: true }))
    ).not.toMatch(forbidden);
  });
});
