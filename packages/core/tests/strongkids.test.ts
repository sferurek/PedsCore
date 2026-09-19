import { describe, expect, it } from "vitest";
import { calculateTool, strongkidsCalculator } from "../src/index.js";

describe("STRONGkids", () => {
  it("scores 0 as low nutritional risk", () => {
    const result = strongkidsCalculator.calculate({
      poor_nutritional_status: false,
      high_risk_disease: false,
      reduced_intake_or_losses: false,
      weight_loss_or_poor_gain: false
    });

    expect(result.score).toBe(0);
    expect(result.maxScore).toBe(5);
    expect(result.classification?.en).toBe("Low nutritional risk");
  });

  it("applies the published 1+2+1+1 weighting", () => {
    const result = strongkidsCalculator.calculate({
      poor_nutritional_status: true,
      high_risk_disease: true,
      reduced_intake_or_losses: true,
      weight_loss_or_poor_gain: true
    });

    expect(result.score).toBe(5);
    expect(result.classification?.en).toBe("High nutritional risk");
    expect(result.trace.map((item) => item.score)).toEqual([1, 2, 1, 1]);
  });

  it("classifies scores 1-3 as moderate risk", () => {
    const result = strongkidsCalculator.calculate({
      poor_nutritional_status: false,
      high_risk_disease: true,
      reduced_intake_or_losses: true,
      weight_loss_or_poor_gain: false
    });

    expect(result.score).toBe(3);
    expect(result.classification?.en).toBe("Moderate nutritional risk");
  });

  it("requires all four screening domains", () => {
    const result = strongkidsCalculator.calculate({
      poor_nutritional_status: false,
      high_risk_disease: false,
      reduced_intake_or_losses: false
    });

    expect(result.score).toBeUndefined();
    expect(result.warnings.some((item) => item.id === "missing_strongkids_inputs")).toBe(true);
  });

  it("is available through the public calculator dispatcher", () => {
    const result = calculateTool("strongkids", {
      poor_nutritional_status: true,
      high_risk_disease: false,
      reduced_intake_or_losses: false,
      weight_loss_or_poor_gain: false
    });

    expect(result.score).toBe(1);
    expect(result.warnings.some((item) => item.id === "calculator_not_implemented")).toBe(false);
  });
});
