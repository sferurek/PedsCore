import { describe, expect, it } from "vitest";
import { nipsCalculator } from "../src/index";

const minInput = {
  facial_expression: "relaxed",
  cry: "absent",
  breathing_patterns: "regular",
  arms: "relaxed",
  legs: "relaxed",
  state_of_arousal: "asleep_or_awake"
};

const forbiddenRecommendations = /tratamiento|administrar|analgesia|sedaci[oó]n|opioide|hipotermia|\bUCI\b|ingresar|alta|anticonvulsivante|intervenir|analg[eé]sico/i;

const resultText = (result: ReturnType<typeof nipsCalculator.calculate>) =>
  [
    result.interpretation?.label.es,
    result.interpretation?.label.en,
    result.interpretation?.description?.es,
    result.interpretation?.description?.en,
    ...result.warnings.flatMap((item) => [item.message.es, item.message.en])
  ]
    .filter(Boolean)
    .join(" ");

describe("NIPS calculator", () => {
  it("calculates minimum and maximum scores", () => {
    expect(nipsCalculator.calculate(minInput).score).toBe(0);
    expect(
      nipsCalculator.calculate({
        facial_expression: "grimace",
        cry: "vigorous",
        breathing_patterns: "altered",
        arms: "flexed_or_extended",
        legs: "flexed_or_extended",
        state_of_arousal: "agitated"
      }).score
    ).toBe(7);
  });

  it("classifies scores by the documented threshold", () => {
    expect(nipsCalculator.calculate({ ...minInput, cry: "whimper" }).interpretation?.id).toBe(
      "below_documented_threshold"
    );
    expect(
      nipsCalculator.calculate({
        ...minInput,
        facial_expression: "grimace",
        cry: "vigorous",
        breathing_patterns: "altered",
        arms: "flexed_or_extended"
      }).interpretation?.id
    ).toBe("above_documented_threshold");
  });

  it("traces all NIPS domains with an intermediate score", () => {
    const result = nipsCalculator.calculate({
      ...minInput,
      facial_expression: "grimace",
      cry: "whimper",
      breathing_patterns: "altered"
    });

    expect(result.score).toBe(3);
    expect(result.interpretation?.id).toBe("below_documented_threshold");
    expect(result.trace.map((entry) => entry.inputId).sort()).toEqual([
      "arms",
      "breathing_patterns",
      "cry",
      "facial_expression",
      "legs",
      "state_of_arousal"
    ]);
  });

  it("warns on incomplete and invalid input", () => {
    expect(nipsCalculator.calculate({}).warnings[0]?.id).toBe("missing_required_inputs");
    expect(nipsCalculator.calculate({ ...minInput, facial_expression: "bad" }).warnings[0]?.id).toBe(
      "invalid_score_input"
    );
    expect(nipsCalculator.calculate({ ...minInput, arms: 2 }).warnings[0]?.id).toBe(
      "invalid_score_input"
    );
  });

  it("does not return therapeutic recommendations", () => {
    const result = nipsCalculator.calculate({
      facial_expression: "grimace",
      cry: "vigorous",
      breathing_patterns: "altered",
      arms: "flexed_or_extended",
      legs: "flexed_or_extended",
      state_of_arousal: "agitated"
    });

    expect(resultText(result)).not.toMatch(forbiddenRecommendations);
  });
});
