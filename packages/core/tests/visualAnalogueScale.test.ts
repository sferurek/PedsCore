import { describe, expect, it } from "vitest";
import { calculateTool, visualAnalogueScaleCalculator } from "../src/index.js";

describe("Visual Analogue Scale", () => {
  it("returns the marked distance on the 100-mm line", () => {
    const result = visualAnalogueScaleCalculator.calculate({ pain_vas_mm: 37 });
    expect(result.value).toBe(37);
    expect(result.unit).toBe("mm");
    expect(result.criteriaMatched?.[0]?.en).toContain("3.7 cm");
  });

  it("accepts both endpoints", () => {
    expect(visualAnalogueScaleCalculator.calculate({ pain_vas_mm: 0 }).value).toBe(0);
    expect(visualAnalogueScaleCalculator.calculate({ pain_vas_mm: 100 }).value).toBe(100);
  });

  it("rejects values outside 0-100 mm", () => {
    const result = visualAnalogueScaleCalculator.calculate({ pain_vas_mm: 101 });
    expect(result.value).toBeUndefined();
    expect(result.warnings.some((item) => item.id === "invalid_vas_input")).toBe(true);
  });

  it("does not impose universal severity bands", () => {
    const result = visualAnalogueScaleCalculator.calculate({ pain_vas_mm: 80 });
    expect(result.classification).toBeUndefined();
    expect(result.warnings.some((item) => item.id === "vas_no_universal_bands")).toBe(true);
  });

  it("is available through the dispatcher", () => {
    const result = calculateTool("visual_analogue_scale", { pain_vas_mm: 50 });
    expect(result.value).toBe(50);
    expect(result.warnings.some((item) => item.id === "calculator_not_implemented")).toBe(false);
  });
});
