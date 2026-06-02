import { describe, expect, it } from "vitest";
import { westleyCroupCalculator } from "../src/index";

const minInput = {
  level_of_consciousness: "normal",
  cyanosis: "absent",
  stridor: "absent",
  air_entry: "normal",
  retractions: "none"
};

describe("Westley Croup calculator", () => {
  it("calculates minimum and maximum scores", () => {
    expect(westleyCroupCalculator.calculate(minInput).score).toBe(0);
    expect(
      westleyCroupCalculator.calculate({
        level_of_consciousness: "disoriented",
        cyanosis: "at_rest",
        stridor: "at_rest",
        air_entry: "markedly_decreased",
        retractions: "severe"
      }).score
    ).toBe(17);
  });

  it("classifies mild, moderate and severe scores", () => {
    expect(westleyCroupCalculator.calculate({ ...minInput, stridor: "with_agitation" }).interpretation?.id).toBe("mild");
    expect(westleyCroupCalculator.calculate({ ...minInput, retractions: "severe" }).interpretation?.id).toBe("moderate");
    expect(westleyCroupCalculator.calculate({ ...minInput, cyanosis: "with_agitation", stridor: "at_rest" }).interpretation?.id).toBe("severe");
  });

  it("warns on incomplete and invalid input", () => {
    expect(westleyCroupCalculator.calculate({}).warnings[0]?.id).toBe("missing_required_inputs");
    expect(westleyCroupCalculator.calculate({ ...minInput, stridor: "bad" }).warnings[0]?.id).toBe("invalid_score_input");
  });
});

