import { describe, expect, it } from "vitest";
import { pramCalculator } from "../src/index";

const minInput = {
  suprasternal_retractions: "absent",
  scalene_muscle_contraction: "absent",
  air_entry: "normal",
  wheezing: "absent",
  oxygen_saturation: 98
};

describe("PRAM calculator", () => {
  it("calculates minimum and maximum scores", () => {
    expect(pramCalculator.calculate(minInput).score).toBe(0);
    expect(
      pramCalculator.calculate({
        suprasternal_retractions: "present",
        scalene_muscle_contraction: "present",
        air_entry: "minimal_absent",
        wheezing: "audible_or_silent",
        oxygen_saturation: 90
      }).score
    ).toBe(12);
  });

  it("classifies mild, moderate and severe scores", () => {
    expect(pramCalculator.calculate({ ...minInput, oxygen_saturation: 93 }).interpretation?.id).toBe("mild");
    expect(pramCalculator.calculate({ ...minInput, suprasternal_retractions: "present", scalene_muscle_contraction: "present" }).interpretation?.id).toBe("moderate");
    expect(pramCalculator.calculate({ ...minInput, air_entry: "minimal_absent", wheezing: "audible_or_silent", oxygen_saturation: 91 }).interpretation?.id).toBe("severe");
  });

  it("warns on invalid oxygen saturation, missing input and invalid option", () => {
    expect(pramCalculator.calculate({ ...minInput, oxygen_saturation: 101 }).warnings[0]?.id).toBe("invalid_oxygen_saturation");
    expect(pramCalculator.calculate({}).warnings[0]?.id).toBe("missing_required_inputs");
    expect(pramCalculator.calculate({ ...minInput, wheezing: "bad" }).warnings[0]?.id).toBe("invalid_score_input");
  });
});

