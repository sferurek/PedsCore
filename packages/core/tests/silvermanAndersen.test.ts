import { describe, expect, it } from "vitest";
import { silvermanAndersenCalculator } from "../src/index";

const fields = {
  thoracoabdominal_movement: 0,
  intercostal_retractions: 0,
  xiphoid_retraction: 0,
  nasal_flaring: 0,
  expiratory_grunt: 0
};

describe("Silverman-Andersen calculator", () => {
  it("calculates 0", () => {
    expect(silvermanAndersenCalculator.calculate(fields).score).toBe(0);
  });

  it("calculates 10", () => {
    expect(
      silvermanAndersenCalculator.calculate(
        Object.fromEntries(Object.keys(fields).map((field) => [field, 2]))
      ).score
    ).toBe(10);
  });

  it("classifies a moderate case", () => {
    const result = silvermanAndersenCalculator.calculate({
      ...fields,
      thoracoabdominal_movement: 2,
      intercostal_retractions: 2,
      xiphoid_retraction: 1
    });

    expect(result.score).toBe(5);
    expect(result.interpretation?.id).toBe("moderate");
  });

  it("warns on incomplete input", () => {
    expect(silvermanAndersenCalculator.calculate({}).warnings[0]?.id).toBe(
      "missing_required_inputs"
    );
  });

  it("warns on invalid input", () => {
    expect(
      silvermanAndersenCalculator.calculate({
        ...fields,
        nasal_flaring: -1
      }).warnings[0]?.id
    ).toBe("invalid_score_input");
  });
});

