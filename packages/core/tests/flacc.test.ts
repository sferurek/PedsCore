import { describe, expect, it } from "vitest";
import { flaccCalculator } from "../src/index";

const fields = {
  face: 0,
  legs: 0,
  activity: 0,
  cry: 0,
  consolability: 0
};

describe("FLACC calculator", () => {
  it("calculates minimum", () => {
    const result = flaccCalculator.calculate(fields);
    expect(result.score).toBe(0);
    expect(result.interpretation?.id).toBe("no_pain");
  });

  it("calculates maximum", () => {
    expect(
      flaccCalculator.calculate(
        Object.fromEntries(Object.keys(fields).map((field) => [field, 2]))
      ).score
    ).toBe(10);
  });

  it("classifies mild and moderate scores", () => {
    expect(flaccCalculator.calculate({ ...fields, face: 1 }).interpretation?.id).toBe(
      "mild"
    );
    expect(
      flaccCalculator.calculate({ ...fields, face: 2, legs: 2 }).interpretation?.id
    ).toBe("moderate");
  });

  it("warns on incomplete and invalid input", () => {
    expect(flaccCalculator.calculate({}).warnings[0]?.id).toBe(
      "missing_required_inputs"
    );
    expect(flaccCalculator.calculate({ ...fields, cry: 4 }).warnings[0]?.id).toBe(
      "invalid_score_input"
    );
  });
});

