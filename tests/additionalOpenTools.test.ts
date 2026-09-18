import { describe, expect, it } from "vitest";
import {
  gorelickDehydrationCalculator,
  mriscCalculator,
  visualAnalogueScaleCalculator
} from "../packages/core/src/calculators/additionalOpenTools.js";

describe("mRISC", () => {
  it("sums the published mRISC point table", () => {
    const result = mriscCalculator.calculate({
      age_months: 24,
      history_unconscious: true,
      unable_to_drink: true,
      night_sweats: false,
      chest_indrawing: true,
      alert_and_awake: false,
      malaria: false,
      dehydrated: true,
      weight_for_age_z: -2.5
    });
    expect(result.score).toBe(7);
  });

  it("applies malaria and night-sweat negative points", () => {
    const result = mriscCalculator.calculate({
      age_months: 24,
      history_unconscious: false,
      unable_to_drink: false,
      night_sweats: true,
      chest_indrawing: false,
      alert_and_awake: true,
      malaria: true,
      dehydrated: false,
      weight_for_age_z: -1
    });
    expect(result.score).toBe(-2);
  });
});

describe("Gorelick dehydration", () => {
  const base = {
    abnormal_general_appearance: false,
    prolonged_capillary_refill: false,
    absent_tears: false,
    dry_mucous_membranes: false,
    sunken_eyes: false,
    deep_breathing: false,
    weak_pulses: false,
    reduced_skin_elasticity: false,
    tachycardia: false,
    reduced_urine_output: false
  };

  it("classifies 0-2 signs as minimal dehydration", () => {
    const result = gorelickDehydrationCalculator.calculate({
      ...base,
      absent_tears: true,
      dry_mucous_membranes: true
    });
    expect(result.score).toBe(2);
    expect(result.classification?.en).toContain("minimal");
  });

  it("classifies 7 signs as severe dehydration", () => {
    const result = gorelickDehydrationCalculator.calculate({
      ...base,
      abnormal_general_appearance: true,
      prolonged_capillary_refill: true,
      absent_tears: true,
      dry_mucous_membranes: true,
      sunken_eyes: true,
      deep_breathing: true,
      weak_pulses: true
    });
    expect(result.score).toBe(7);
    expect(result.classification?.en).toContain("Severe");
  });
});

describe("VAS", () => {
  it("returns the 0-10 cm pain value", () => {
    const result = visualAnalogueScaleCalculator.calculate({ pain_vas_cm: 6.4 });
    expect(result.value).toBe(6.4);
    expect(result.unit).toBe("cm");
  });
});
