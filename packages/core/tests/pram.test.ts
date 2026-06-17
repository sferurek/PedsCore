import { describe, expect, it } from "vitest";
import { pramCalculator } from "../src/index";

const minInput = {
  suprasternal_retractions: "absent",
  scalene_muscle_contraction: "absent",
  air_entry: "normal",
  wheezing: "absent",
  oxygen_saturation: 98
};

const forbiddenRecommendations =
  /tratamiento|tratar|administrar|broncodilatador|corticoide|ox[ií]geno|ingresar|ingreso|alta|escal(ar|ado)|derivar|medicaci[oó]n|medication|treat|administer|bronchodilator|steroid|oxygen|admission|admit|discharge|escalation|refer/i;

const resultText = (result: ReturnType<typeof pramCalculator.calculate>) =>
  [
    result.interpretation?.label.es,
    result.interpretation?.label.en,
    result.interpretation?.description?.es,
    result.interpretation?.description?.en,
    ...result.warnings.flatMap((item) => [item.message.es, item.message.en])
  ]
    .filter(Boolean)
    .join(" ");

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

  it("traces all PRAM domains with intermediate score contributions", () => {
    const result = pramCalculator.calculate({
      suprasternal_retractions: "present",
      scalene_muscle_contraction: "absent",
      air_entry: "decreased_bases",
      wheezing: "inspiratory_or_expiratory",
      oxygen_saturation: 94
    });

    expect(result.score).toBe(6);
    expect(result.interpretation?.id).toBe("moderate");
    expect(result.trace.map((entry) => entry.inputId).sort()).toEqual([
      "air_entry",
      "oxygen_saturation",
      "scalene_muscle_contraction",
      "suprasternal_retractions",
      "wheezing"
    ]);
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

  it("does not return therapeutic or disposition recommendations", () => {
    const result = pramCalculator.calculate({
      suprasternal_retractions: "present",
      scalene_muscle_contraction: "present",
      air_entry: "minimal_absent",
      wheezing: "audible_or_silent",
      oxygen_saturation: 90
    });

    expect(resultText(result)).not.toMatch(forbiddenRecommendations);
  });
});
