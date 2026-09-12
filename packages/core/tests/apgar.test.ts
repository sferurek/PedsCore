import { describe, expect, it } from "vitest";
import { apgarCalculator, getTool } from "../src/index";

const complete = {
  assessment_time: "five_minutes",
  heart_rate: "at_least_100",
  respiratory_effort: "good_cry",
  muscle_tone: "active_motion",
  reflex_irritability: "vigorous_response",
  color: "completely_pink"
};

const valuesForScore = (score: number) => {
  let remaining = score;
  return Array.from({ length: 5 }, () => {
    const value = Math.min(2, remaining);
    remaining -= value;
    return value;
  });
};

describe("Apgar calculator", () => {
  it.each([
    ["heart_rate", ["absent", "below_100", "at_least_100"]],
    ["respiratory_effort", ["absent", "slow_irregular", "good_cry"]],
    ["muscle_tone", ["flaccid", "some_flexion", "active_motion"]],
    ["reflex_irritability", ["none", "grimace", "vigorous_response"]],
    ["color", ["blue_pale", "pink_body_blue_extremities", "completely_pink"]]
  ])("maps every %s descriptor to its canonical score", (inputId, values) => {
    const tool = getTool("apgar");
    const input = tool.inputs?.find((item) => item.id === inputId);
    expect(input?.options?.map((option) => option.id)).toEqual(values);
    expect(input?.options?.map((option) => option.score)).toEqual([0, 1, 2]);
  });

  it.each(Array.from({ length: 11 }, (_, score) => score))("calculates total score %s", (score) => {
    const values = valuesForScore(score);
    const result = apgarCalculator.calculate({
      assessment_time: "one_minute",
      heart_rate: values[0],
      respiratory_effort: values[1],
      muscle_tone: values[2],
      reflex_irritability: values[3],
      color: values[4]
    });
    expect(result.score).toBe(values.reduce((total, value) => total + value, 0));
  });

  it("calculates minimum and maximum scores", () => {
    expect(apgarCalculator.calculate({ assessment_time: "one_minute", heart_rate: 0, respiratory_effort: 0, muscle_tone: 0, reflex_irritability: 0, color: 0 }).score).toBe(0);
    expect(apgarCalculator.calculate(complete).score).toBe(10);
  });

  it.each([
    [3, "low"],
    [4, "moderately_abnormal"],
    [6, "moderately_abnormal"],
    [7, "reassuring"],
    [10, "reassuring"]
  ])("applies 5-minute interpretation boundary %s", (target, interpretation) => {
    const values = valuesForScore(target);
    const result = apgarCalculator.calculate({ assessment_time: "five_minutes", heart_rate: values[0], respiratory_effort: values[1], muscle_tone: values[2], reflex_irritability: values[3], color: values[4] });
    expect(result.score).toBe(target);
    expect(result.interpretation?.id).toBe(interpretation);
  });

  it("does not apply 5-minute interpretation to a 1-minute score", () => {
    const result = apgarCalculator.calculate({ ...complete, assessment_time: "one_minute" });
    expect(result.score).toBe(10);
    expect(result.interpretation).toBeUndefined();
  });

  it("requires the assessment time and every domain", () => {
    expect(apgarCalculator.calculate({ heart_rate: 2 }).warnings[0]?.id).toBe("missing_required_inputs");
  });

  it("rejects impossible score values and non-finite values", () => {
    expect(apgarCalculator.calculate({ ...complete, heart_rate: 3 }).warnings[0]?.id).toBe("invalid_score_input");
    expect(apgarCalculator.calculate({ ...complete, heart_rate: Number.NaN }).warnings[0]?.id).toBe("invalid_score_input");
    expect(apgarCalculator.calculate({ ...complete, color: Number.POSITIVE_INFINITY }).warnings[0]?.id).toBe("invalid_score_input");
  });

  it("records the assessment time and domain trace", () => {
    const result = apgarCalculator.calculate(complete);
    expect(result.trace.map((item) => item.inputId)).toEqual([
      "assessment_time", "heart_rate", "respiratory_effort", "muscle_tone", "reflex_irritability", "color"
    ]);
  });

  it("contains safety language without treatment or prognostic claims", () => {
    const tool = getTool("apgar");
    const text = JSON.stringify(tool);
    expect(text).toMatch(/must not delay resuscitation/i);
    expect(text).toMatch(/does not diagnose asphyxia/i);
    expect(text).toMatch(/neurologic prognosis/i);
  });
});
