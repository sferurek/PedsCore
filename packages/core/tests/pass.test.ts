import { describe, expect, it } from "vitest";
import { passCalculator } from "../src/index";

const minimum = {
  work_of_breathing: "none_or_mild",
  wheezing: "none_or_mild",
  prolonged_expiration: "normal_or_mild"
};

describe("Gorelick PASS calculator", () => {
  it("calculates the 0-6 range", () => {
    expect(passCalculator.calculate(minimum).score).toBe(0);

    expect(
      passCalculator.calculate({
        work_of_breathing: "severe",
        wheezing: "severe_or_poor_air_exchange",
        prolonged_expiration: "severely_prolonged"
      }).score
    ).toBe(6);
  });

  it("sums the three original PASS domains", () => {
    const result = passCalculator.calculate({
      work_of_breathing: "moderate",
      wheezing: "severe_or_poor_air_exchange",
      prolonged_expiration: "moderately_prolonged"
    });

    expect(result.score).toBe(4);
    expect(result.maxScore).toBe(6);
    expect(result.trace.map((entry) => entry.inputId)).toEqual([
      "work_of_breathing",
      "wheezing",
      "prolonged_expiration"
    ]);
    expect(result.trace.map((entry) => entry.score)).toEqual([1, 2, 1]);
  });

  it("keeps silent chest due to poor air exchange within the highest wheeze category", () => {
    const result = passCalculator.calculate({
      ...minimum,
      wheezing: "severe_or_poor_air_exchange"
    });

    expect(result.score).toBe(2);
  });

  it("rejects incomplete and invalid selections", () => {
    expect(passCalculator.calculate({}).warnings[0]?.id).toBe(
      "missing_required_inputs"
    );
    expect(
      passCalculator.calculate({
        ...minimum,
        wheezing: "invalid"
      }).warnings[0]?.id
    ).toBe("invalid_score_input");
  });

  it("does not attach treatment or disposition recommendations to the result", () => {
    const result = passCalculator.calculate({
      work_of_breathing: "severe",
      wheezing: "severe_or_poor_air_exchange",
      prolonged_expiration: "severely_prolonged"
    });

    const text = result.warnings
      .flatMap((item) => [item.message.es, item.message.en])
      .join(" ");

    expect(text).not.toMatch(
      /tratamiento|medicaci[oó]n|ingreso|alta|treatment|medication|admission|discharge/i
    );
  });
});
