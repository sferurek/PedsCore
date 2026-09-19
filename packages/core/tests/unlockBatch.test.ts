import { describe, expect, it } from "vitest";
import {
  calculateTool,
  gorelickDehydrationCalculator,
  passAsthmaCalculator,
  psofaCalculator
} from "../src/index.js";

const unlockedIds = [
  "pass",
  "gorelick_dehydration",
  "prifle",
  "pelod_2",
  "prism_iv",
  "pim3",
  "psofa"
] as const;

describe("audited unlock batch", () => {
  it("registers every unlocked calculator", () => {
    for (const id of unlockedIds) {
      const result = calculateTool(id, {});
      expect(result.warnings.some((item) => item.id === "calculator_not_implemented"), id).toBe(false);
    }
  });

  it("scores PASS from 0 to 6", () => {
    const low = passAsthmaCalculator.calculate({
      age_years: 8,
      work_of_breathing: "work_0",
      wheezing: "wheeze_0",
      prolonged_expiration: "expiration_0"
    });
    const high = passAsthmaCalculator.calculate({
      age_years: 8,
      work_of_breathing: "work_2",
      wheezing: "wheeze_2",
      prolonged_expiration: "expiration_2"
    });
    expect(low.score).toBe(0);
    expect(high.score).toBe(6);
  });

  it("scores the 10-sign Gorelick scale", () => {
    const yes = {
      abnormal_general_appearance:true,
      prolonged_capillary_refill:true,
      absent_tears:true,
      dry_mucous_membranes:true,
      sunken_eyes:true,
      deep_breathing:true,
      weak_pulses:true,
      reduced_skin_elasticity:true,
      tachycardia:true,
      reduced_urine_output:true
    };
    const result = gorelickDehydrationCalculator.calculate(yes);
    expect(result.score).toBe(10);
    expect(result.classification?.en).toContain("Severe");
  });

  it("scores pSOFA across all six organ systems", () => {
    const result = psofaCalculator.calculate({
      age_months: 120,
      pao2_fio2_ratio: 450,
      respiratory_support: false,
      platelets_10e3_ul: 200,
      bilirubin_mg_dl: 0.8,
      map_mmhg: 80,
      dopamine_mcg_kg_min: 0,
      dobutamine_any_dose: false,
      epinephrine_mcg_kg_min: 0,
      norepinephrine_mcg_kg_min: 0,
      gcs: 15,
      creatinine_mg_dl: 0.5
    });
    expect(result.score).toBe(0);
    expect(result.maxScore).toBe(24);
  });
});
