import { describe, expect, it } from "vitest";
import { strongkidsCalculator } from "../src/index";

const none = {
  subjective_clinical_assessment: "no",
  high_risk_disease: "no",
  reduced_intake_or_losses: "no",
  weight_loss_or_poor_gain: "no"
};

describe("STRONGkids", () => {
  it("scores 0 as low nutritional risk", () => {
    const result = strongkidsCalculator.calculate(none);

    expect(result.score).toBe(0);
    expect(result.maxScore).toBe(5);
    expect(result.classification?.en).toBe("Low nutritional risk");
  });

  it("uses the original 1/2/1/1 item weights", () => {
    const result = strongkidsCalculator.calculate({
      subjective_clinical_assessment: "yes",
      high_risk_disease: "yes",
      reduced_intake_or_losses: "yes",
      weight_loss_or_poor_gain: "yes"
    });

    expect(result.score).toBe(5);
    expect(result.trace.map((item) => item.score)).toEqual([1, 2, 1, 1]);
  });

  it("classifies 1 to 3 as moderate risk", () => {
    expect(
      strongkidsCalculator.calculate({
        ...none,
        high_risk_disease: "yes"
      }).classification?.en
    ).toBe("Moderate nutritional risk");

    expect(
      strongkidsCalculator.calculate({
        ...none,
        high_risk_disease: "yes",
        subjective_clinical_assessment: "yes"
      }).score
    ).toBe(3);
  });

  it("classifies 4 to 5 as high risk", () => {
    const result = strongkidsCalculator.calculate({
      ...none,
      high_risk_disease: "yes",
      subjective_clinical_assessment: "yes",
      reduced_intake_or_losses: "yes"
    });

    expect(result.score).toBe(4);
    expect(result.classification?.en).toBe("High nutritional risk");
  });

  it("rejects missing inputs", () => {
    expect(strongkidsCalculator.calculate({}).warnings[0]?.id).toBe(
      "missing_required_inputs"
    );
  });

  it("does not attach nutrition treatment instructions", () => {
    const result = strongkidsCalculator.calculate({
      subjective_clinical_assessment: "yes",
      high_risk_disease: "yes",
      reduced_intake_or_losses: "yes",
      weight_loss_or_poor_gain: "yes"
    });

    const text = [
      result.label?.es,
      result.label?.en,
      result.classification?.es,
      result.classification?.en,
      ...result.warnings.flatMap((item) => [item.message.es, item.message.en])
    ].join(" ");

    expect(text).not.toMatch(
      /suplement|sonda|parenteral|dieta|feeding|nutri(c|t)ional intervention|tratamiento|treatment|ingreso|admission|alta|discharge/i
    );
  });
});
