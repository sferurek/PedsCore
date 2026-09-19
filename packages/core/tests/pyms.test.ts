import { describe, expect, it } from "vitest";
import { calculateTool } from "../src/index.js";

const base = {
  bmi_below_pyms_cutoff: false,
  recent_weight_loss: false,
  recent_intake: "usual",
  expected_nutrition_impact: "none"
};

describe("PYMS", () => {
  it("classifies score 0 as low risk", () => {
    const result = calculateTool("pyms", base);
    expect(result.score).toBe(0);
    expect(result.maxScore).toBe(7);
    expect(result.classification?.en).toContain("Low");
  });

  it("classifies score 1 as moderate risk", () => {
    const result = calculateTool("pyms", { ...base, recent_weight_loss:true });
    expect(result.score).toBe(1);
    expect(result.classification?.en).toContain("Moderate");
  });

  it("classifies score 2 or more as high risk", () => {
    const result = calculateTool("pyms", { ...base, bmi_below_pyms_cutoff:true });
    expect(result.score).toBe(2);
    expect(result.classification?.en).toContain("High");
  });

  it("reaches the functional maximum of 7", () => {
    const result = calculateTool("pyms", {
      bmi_below_pyms_cutoff:true,
      recent_weight_loss:true,
      recent_intake:"minimal_or_none",
      expected_nutrition_impact:"minimal_or_none"
    });
    expect(result.score).toBe(7);
  });

  it("is available through the public dispatcher", () => {
    expect(calculateTool("pyms", base).warnings.some(w => w.id === "calculator_not_implemented")).toBe(false);
  });
});
