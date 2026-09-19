import { describe, expect, it } from "vitest";
import { calculateTool } from "../src/index.js";

const normal = {
  mean_bp_mmhg: 40,
  lowest_temperature_c: 36.5,
  pao2_fio2_ratio: 300,
  lowest_ph: 7.3,
  multiple_seizures: false,
  urine_output_ml_kg_h: 2,
  birth_weight_g: 1500,
  sga_below_3rd_percentile: false,
  apgar_5min: 8
};

describe("SNAPPE-II", () => {
  it("scores 0 for the minimum-risk profile", () => {
    const result = calculateTool("snappii", normal);
    expect(result.score).toBe(0);
    expect(result.maxScore).toBe(162);
  });

  it("reaches the published maximum score of 162", () => {
    const result = calculateTool("snappii", {
      mean_bp_mmhg: 10,
      lowest_temperature_c: 34,
      pao2_fio2_ratio: 20,
      lowest_ph: 7.0,
      multiple_seizures: true,
      urine_output_ml_kg_h: 0.05,
      birth_weight_g: 700,
      sga_below_3rd_percentile: true,
      apgar_5min: 5
    });
    expect(result.score).toBe(162);
  });

  it("uses exact category boundaries", () => {
    expect(calculateTool("snappii", { ...normal, mean_bp_mmhg:30 }).score).toBe(0);
    expect(calculateTool("snappii", { ...normal, mean_bp_mmhg:29 }).score).toBe(9);
    expect(calculateTool("snappii", { ...normal, pao2_fio2_ratio:100 }).score).toBe(5);
    expect(calculateTool("snappii", { ...normal, lowest_ph:7.2 }).score).toBe(0);
    expect(calculateTool("snappii", { ...normal, birth_weight_g:750 }).score).toBe(10);
  });

  it("is available through the registry", () => {
    expect(calculateTool("snappii", normal).warnings.some(w => w.id === "calculator_not_implemented")).toBe(false);
  });
});
