import { describe, expect, it } from "vitest";
import { calculateTool, pucaiCalculator } from "../src/index.js";

const base = {
  abdominal_pain: 0,
  rectal_bleeding: 0,
  stool_consistency: 0,
  stool_frequency: 0,
  nocturnal_stool: 0,
  activity_level: 0
};

describe("PUCAI", () => {
  it("scores complete remission at 0", () => {
    const result = pucaiCalculator.calculate(base);
    expect(result.score).toBe(0);
    expect(result.maxScore).toBe(85);
    expect(result.classification?.en).toBe("Remission");
  });

  it("uses the 9/10 remission-to-mild boundary", () => {
    const remission = pucaiCalculator.calculate({ ...base, abdominal_pain: 5 });
    const mild = pucaiCalculator.calculate({ ...base, abdominal_pain: 10 });
    expect(remission.score).toBe(5);
    expect(remission.classification?.en).toBe("Remission");
    expect(mild.score).toBe(10);
    expect(mild.classification?.en).toBe("Mild activity");
  });

  it("uses 35 as the moderate threshold", () => {
    const result = pucaiCalculator.calculate({
      ...base,
      rectal_bleeding: 20,
      stool_frequency: 10,
      abdominal_pain: 5
    });
    expect(result.score).toBe(35);
    expect(result.classification?.en).toBe("Moderate activity");
  });

  it("uses 65 as the severe threshold", () => {
    const result = pucaiCalculator.calculate({
      ...base,
      rectal_bleeding: 30,
      stool_frequency: 15,
      nocturnal_stool: 10,
      abdominal_pain: 10
    });
    expect(result.score).toBe(65);
    expect(result.classification?.en).toBe("Severe activity");
  });

  it("reaches the maximum score of 85", () => {
    const result = pucaiCalculator.calculate({
      abdominal_pain: 10,
      rectal_bleeding: 30,
      stool_consistency: 10,
      stool_frequency: 15,
      nocturnal_stool: 10,
      activity_level: 10
    });
    expect(result.score).toBe(85);
    expect(result.classification?.en).toBe("Severe activity");
  });

  it("requires all six domains", () => {
    const result = pucaiCalculator.calculate({
      abdominal_pain: 0,
      rectal_bleeding: 0
    });
    expect(result.score).toBeUndefined();
    expect(result.warnings.some((item) => item.id === "missing_pucai")).toBe(true);
  });

  it("is available through the public dispatcher", () => {
    const result = calculateTool("pucai", base);
    expect(result.score).toBe(0);
    expect(result.warnings.some((item) => item.id === "calculator_not_implemented")).toBe(false);
  });
});
