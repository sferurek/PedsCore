import { describe, expect, it } from "vitest";
import { calculateTool, pcdaiCalculator } from "../src/index.js";

const base = {
  abdominal_pain: "0",
  stools: "0",
  wellbeing: "0",
  hematocrit_category: "0",
  esr_mm_h: 10,
  albumin_g_dl: 4,
  weight: "0",
  height: "0",
  abdomen: "0",
  perirectal: "0",
  extraintestinal: "0"
};

describe("PCDAI", () => {
  it("scores 0 for the minimum profile", () => {
    const result = pcdaiCalculator.calculate(base);
    expect(result.score).toBe(0);
    expect(result.maxScore).toBe(100);
  });

  it("reaches the published maximum of 100", () => {
    const result = pcdaiCalculator.calculate({
      abdominal_pain: "10",
      stools: "10",
      wellbeing: "10",
      hematocrit_category: "5",
      esr_mm_h: 70,
      albumin_g_dl: 2.5,
      weight: "10",
      height: "10",
      abdomen: "10",
      perirectal: "10",
      extraintestinal: "10"
    });
    expect(result.score).toBe(100);
  });

  it("uses the published ESR thresholds", () => {
    expect(pcdaiCalculator.calculate({ ...base, esr_mm_h: 19 }).score).toBe(0);
    expect(pcdaiCalculator.calculate({ ...base, esr_mm_h: 20 }).score).toBe(2.5);
    expect(pcdaiCalculator.calculate({ ...base, esr_mm_h: 50 }).score).toBe(2.5);
    expect(pcdaiCalculator.calculate({ ...base, esr_mm_h: 51 }).score).toBe(5);
  });

  it("uses the published albumin thresholds", () => {
    expect(pcdaiCalculator.calculate({ ...base, albumin_g_dl: 3.5 }).score).toBe(0);
    expect(pcdaiCalculator.calculate({ ...base, albumin_g_dl: 3.1 }).score).toBe(5);
    expect(pcdaiCalculator.calculate({ ...base, albumin_g_dl: 3.0 }).score).toBe(10);
  });

  it("requires all 11 components", () => {
    const result = pcdaiCalculator.calculate({
      abdominal_pain: "0",
      stools: "0"
    });
    expect(result.score).toBeUndefined();
    expect(result.warnings.some((item) => item.id === "missing_pcdai")).toBe(true);
  });

  it("does not invent universal activity bands from the original paper", () => {
    const result = pcdaiCalculator.calculate({
      ...base,
      abdominal_pain: "10",
      stools: "10",
      wellbeing: "10"
    });
    expect(result.classification?.en).toBe("PCDAI 30/100");
    expect(result.warnings.some((item) => item.id === "pcdai_bands")).toBe(true);
  });

  it("is available through the public dispatcher", () => {
    const result = calculateTool("pcdai", base);
    expect(result.score).toBe(0);
    expect(result.warnings.some((item) => item.id === "calculator_not_implemented")).toBe(false);
  });
});
