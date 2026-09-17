import { describe, expect, it } from "vitest";
import { pediatricGcsCalculator } from "../src/index";

describe("Pediatric Glasgow Coma Scale", () => {
  it("calculates the full 3-15 range", () => {
    expect(
      pediatricGcsCalculator.calculate({
        age_group: "preverbal_under_2",
        eye_response: "none",
        verbal_response: "none",
        motor_response: "none"
      }).score
    ).toBe(3);

    expect(
      pediatricGcsCalculator.calculate({
        age_group: "verbal_2_or_more",
        eye_response: "spontaneous",
        verbal_response: "best_age_appropriate",
        motor_response: "best_age_appropriate"
      }).score
    ).toBe(15);
  });

  it("supports the preverbal pediatric adaptation", () => {
    const result = pediatricGcsCalculator.calculate({
      age_group: "preverbal_under_2",
      eye_response: "to_sound",
      verbal_response: "cries_to_pain",
      motor_response: "withdraws_to_touch"
    });

    expect(result.score).toBe(11);
    expect(result.trace.map((item) => item.score).filter((score) => score !== undefined)).toEqual([3, 3, 5]);
  });

  it("supports the standard response set for children two years and older", () => {
    expect(
      pediatricGcsCalculator.calculate({
        age_group: "verbal_2_or_more",
        eye_response: "to_pain",
        verbal_response: "confused_or_irritable",
        motor_response: "localizes_or_withdraws_to_touch"
      }).score
    ).toBe(11);
  });

  it("rejects missing and invalid data", () => {
    expect(pediatricGcsCalculator.calculate({}).warnings[0]?.id).toBe("missing_required_inputs");
    expect(
      pediatricGcsCalculator.calculate({
        age_group: "invalid",
        eye_response: "spontaneous",
        verbal_response: "best_age_appropriate",
        motor_response: "best_age_appropriate"
      }).warnings[0]?.id
    ).toBe("invalid_age_group");
  });

  it("does not attach treatment, imaging, airway, or disposition recommendations", () => {
    const result = pediatricGcsCalculator.calculate({
      age_group: "preverbal_under_2",
      eye_response: "none",
      verbal_response: "none",
      motor_response: "none"
    });

    const text = result.warnings
      .flatMap((item) => [item.message.es, item.message.en])
      .join(" ");

    expect(text).not.toMatch(
      /intubar|intubate|tc|ct|imagen|imaging|ingreso|admission|alta|discharge|tratamiento|treatment/i
    );
  });
});
