import { describe, expect, it } from "vitest";
import { garciaAlixNersCalculator } from "../src/calculators/garciaAlixNers.js";

const baseInput = {
  alertness: "a0",
  posture: "p0",
  spontaneous_activity: "s0",
  motor_response: "m0",
  myotatic_reflexes: "r0",
  breathing: "b0",
  clinical_seizures: "c0",
  aeeg_seizures: "e0",
  aeeg_background: "g0"
};

describe("García-Alix NE-RS", () => {
  it("classifies a complete normal/mild profile", () => {
    const result = garciaAlixNersCalculator.calculate(baseInput);
    expect(result.score).toBe(0);
    expect(result.maxScore).toBe(70);
    expect(result.classification?.en).toContain("Mild");
  });

  it("uses the validated 8-point moderate threshold", () => {
    const result = garciaAlixNersCalculator.calculate({ ...baseInput, alertness: "a8" });
    expect(result.score).toBe(8);
    expect(result.classification?.en).toContain("Moderate");
  });

  it("uses the validated 30-point severe threshold", () => {
    const result = garciaAlixNersCalculator.calculate({
      ...baseInput,
      alertness: "a8",
      posture: "p8",
      spontaneous_activity: "s8",
      motor_response: "m6"
    });
    expect(result.score).toBe(30);
    expect(result.classification?.en).toContain("Severe");
  });

  it("requires all nine NE-RS items", () => {
    const incomplete = { ...baseInput } as Record<string, string>;
    delete incomplete.aeeg_background;
    const result = garciaAlixNersCalculator.calculate(incomplete);
    expect(result.score).toBeUndefined();
    expect(result.warnings.some((item) => item.id === "missing_ners")).toBe(true);
  });
});
