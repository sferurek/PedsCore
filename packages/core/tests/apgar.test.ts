import { describe, expect, it } from "vitest";
import { apgarCalculator } from "../src/index";

describe("Apgar calculator", () => {
  it("calculates the minimum score", () => {
    const result = apgarCalculator.calculate({
      heart_rate: 0,
      respiratory_effort: 0,
      muscle_tone: 0,
      reflex_irritability: 0,
      color: 0
    });

    expect(result.score).toBe(0);
  });

  it("calculates the maximum score", () => {
    const result = apgarCalculator.calculate({
      heart_rate: 2,
      respiratory_effort: 2,
      muscle_tone: 2,
      reflex_irritability: 2,
      color: 2
    });

    expect(result.score).toBe(10);
    expect(result.interpretation?.id).toBe("normal_transition");
  });

  it("calculates an intermediate score", () => {
    const result = apgarCalculator.calculate({
      heart_rate: 2,
      respiratory_effort: 1,
      muscle_tone: 1,
      reflex_irritability: 1,
      color: 1
    });

    expect(result.score).toBe(6);
    expect(result.interpretation?.id).toBe("observation");
  });

  it("warns on incomplete input", () => {
    const result = apgarCalculator.calculate({ heart_rate: 2 });

    expect(result.warnings[0]?.id).toBe("missing_required_inputs");
  });

  it("warns on invalid score input", () => {
    const result = apgarCalculator.calculate({
      heart_rate: 3,
      respiratory_effort: 0,
      muscle_tone: 0,
      reflex_irritability: 0,
      color: 0
    });

    expect(result.warnings[0]?.id).toBe("invalid_score_input");
  });
});

