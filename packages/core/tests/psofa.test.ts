import { describe, expect, it } from "vitest";
import { calculateTool } from "../src/index.js";

const normal = {
  age_months: 120,
  oxygenation_mode: "pf",
  oxygenation_ratio: 450,
  respiratory_support: false,
  platelets_10e3_ul: 200,
  bilirubin_mg_dl: 0.5,
  map_mmhg: 80,
  vasoactive_level: "none",
  gcs: 15,
  creatinine_mg_dl: 0.5
};

describe("pSOFA", () => {
  it("returns 0 for a normal profile", () => {
    const result = calculateTool("psofa", normal);
    expect(result.score).toBe(0);
    expect(result.maxScore).toBe(24);
  });

  it("scores severe dysfunction across all six systems", () => {
    const result = calculateTool("psofa", {
      age_months: 120,
      oxygenation_mode: "pf",
      oxygenation_ratio: 80,
      respiratory_support: true,
      platelets_10e3_ul: 10,
      bilirubin_mg_dl: 15,
      map_mmhg: 40,
      vasoactive_level: "high",
      gcs: 4,
      creatinine_mg_dl: 5
    });
    expect(result.score).toBe(24);
  });

  it("supports the pediatric S/F alternative", () => {
    const result = calculateTool("psofa", { ...normal, oxygenation_mode:"sf", oxygenation_ratio:200 });
    expect(result.score).toBe(2);
  });

  it("is available through the registry", () => {
    expect(calculateTool("psofa", normal).warnings.some(w => w.id === "calculator_not_implemented")).toBe(false);
  });
});
