import { describe, expect, it } from "vitest";
import { westleyCroupCalculator } from "../src/index";

const minInput = {
  level_of_consciousness: "normal",
  cyanosis: "absent",
  stridor: "absent",
  air_entry: "normal",
  retractions: "none"
};

const forbiddenRecommendations =
  /tratamiento|tratar|administrar|adrenalina|epinefrina|epinephrine|corticoide|steroid|ox[ií]geno|oxygen|ingresar|ingreso|admit|admission|alta|discharge|escal(ar|ado)|escalation|intubar|intubate|medicaci[oó]n|medication/i;

const resultText = (
  result: ReturnType<typeof westleyCroupCalculator.calculate>
) =>
  [
    result.interpretation?.label.es,
    result.interpretation?.label.en,
    result.interpretation?.description?.es,
    result.interpretation?.description?.en,
    ...result.warnings.flatMap((item) => [item.message.es, item.message.en])
  ]
    .filter(Boolean)
    .join(" ");

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

  it("traces all Westley domains with intermediate score contributions", () => {
    const result = westleyCroupCalculator.calculate({
      level_of_consciousness: "normal",
      cyanosis: "absent",
      stridor: "at_rest",
      air_entry: "decreased",
      retractions: "moderate"
    });

    expect(result.score).toBe(5);
    expect(result.interpretation?.id).toBe("moderate");
    expect(result.trace.map((entry) => entry.inputId).sort()).toEqual([
      "air_entry",
      "cyanosis",
      "level_of_consciousness",
      "retractions",
      "stridor"
    ]);
  });

  it("classifies mild, moderate and severe scores", () => {
    expect(westleyCroupCalculator.calculate({ ...minInput, stridor: "with_agitation" }).interpretation?.id).toBe("mild");
    expect(westleyCroupCalculator.calculate({ ...minInput, retractions: "severe" }).interpretation?.id).toBe("moderate");
    expect(westleyCroupCalculator.calculate({ ...minInput, cyanosis: "with_agitation", stridor: "at_rest" }).interpretation?.id).toBe("moderate");
    expect(westleyCroupCalculator.calculate({ ...minInput, cyanosis: "with_agitation", stridor: "at_rest", retractions: "moderate" }).interpretation?.id).toBe("severe");
    expect(westleyCroupCalculator.calculate({ ...minInput, level_of_consciousness: "disoriented", cyanosis: "at_rest", stridor: "at_rest" }).interpretation?.id).toBe("impending_respiratory_failure");
  });

  it("warns on incomplete and invalid input", () => {
    expect(westleyCroupCalculator.calculate({}).warnings[0]?.id).toBe("missing_required_inputs");
    expect(westleyCroupCalculator.calculate({ ...minInput, stridor: "bad" }).warnings[0]?.id).toBe("invalid_score_input");
  });

  it("does not return therapeutic or disposition recommendations", () => {
    const result = westleyCroupCalculator.calculate({
      level_of_consciousness: "normal",
      cyanosis: "with_agitation",
      stridor: "at_rest",
      air_entry: "markedly_decreased",
      retractions: "moderate"
    });

    expect(resultText(result)).not.toMatch(forbiddenRecommendations);
  });
});
