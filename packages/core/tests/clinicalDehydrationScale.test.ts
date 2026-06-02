import { describe, expect, it } from "vitest";
import { clinicalDehydrationScaleCalculator } from "../src/index";

const minInput = {
  general_appearance: 0,
  eyes: 0,
  mucous_membranes: 0,
  tears: 0
};

describe("Clinical Dehydration Scale calculator", () => {
  it("calculates minimum and maximum scores", () => {
    expect(clinicalDehydrationScaleCalculator.calculate(minInput).score).toBe(0);
    expect(
      clinicalDehydrationScaleCalculator.calculate({
        general_appearance: 2,
        eyes: 2,
        mucous_membranes: 2,
        tears: 2
      }).score
    ).toBe(8);
  });

  it("classifies an intermediate score", () => {
    const result = clinicalDehydrationScaleCalculator.calculate({
      ...minInput,
      general_appearance: 2,
      eyes: 2
    });

    expect(result.score).toBe(4);
    expect(result.interpretation?.id).toBe("moderate");
  });

  it("warns on incomplete and invalid input", () => {
    expect(clinicalDehydrationScaleCalculator.calculate({}).warnings[0]?.id).toBe("missing_required_inputs");
    expect(clinicalDehydrationScaleCalculator.calculate({ ...minInput, eyes: 4 }).warnings[0]?.id).toBe("invalid_score_input");
  });
});

