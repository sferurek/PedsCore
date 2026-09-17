import { describe, expect, it } from "vitest";
import { brosjodCalculator } from "../src/index";

const base = {
  wheeze_rales: "none",
  indrawing: "none",
  air_entry: "normal",
  age_months: 2,
  oxygen_mode: "room_air",
  oxygen_saturation: 98,
  respiratory_rate: 35,
  heart_rate: 120
};

describe("BROSJOD calculator", () => {
  it("calculates the minimum score", () => {
    const result = brosjodCalculator.calculate(base);
    expect(result.score).toBe(0);
    expect(result.interpretation?.id).toBe("mild");
  });

  it("applies age-specific respiratory and heart-rate bands", () => {
    const result = brosjodCalculator.calculate({
      ...base,
      age_months: 14,
      respiratory_rate: 45,
      heart_rate: 130
    });
    expect(result.score).toBe(4);
    expect(result.trace.find((item) => item.inputId === "respiratory_rate")?.score).toBe(2);
    expect(result.trace.find((item) => item.inputId === "heart_rate")?.score).toBe(2);
  });

  it("calculates the maximum published total", () => {
    const result = brosjodCalculator.calculate({
      wheeze_rales: "inspiratory_expiratory",
      indrawing: "extensive",
      air_entry: "very_reduced",
      age_months: 18,
      oxygen_mode: "supplemental_oxygen",
      oxygen_saturation: 90,
      fio2: 50,
      respiratory_rate: 60,
      heart_rate: 150
    });
    expect(result.score).toBe(16);
    expect(result.interpretation?.id).toBe("severe");
  });

  it("uses the validated revised severity bands", () => {
    expect(brosjodCalculator.calculate({ ...base, air_entry: "very_reduced", indrawing: "extensive" }).score).toBe(6);
    expect(brosjodCalculator.calculate({ ...base, air_entry: "very_reduced", indrawing: "extensive" }).interpretation?.id).toBe("mild");
    expect(brosjodCalculator.calculate({ ...base, air_entry: "very_reduced", indrawing: "extensive", wheeze_rales: "expiratory_or_inspiratory" }).interpretation?.id).toBe("moderate");
    expect(brosjodCalculator.calculate({ ...base, air_entry: "very_reduced", indrawing: "extensive", wheeze_rales: "inspiratory_expiratory", oxygen_saturation: 92 }).interpretation?.id).toBe("moderate");
  });

  it("scores oxygenation on room air and supported oxygen without guessing undefined combinations", () => {
    expect(brosjodCalculator.calculate({ ...base, oxygen_saturation: 93 }).trace.find((item) => item.inputId === "oxygen_saturation")?.score).toBe(1);
    expect(brosjodCalculator.calculate({ ...base, oxygen_saturation: 89 }).trace.find((item) => item.inputId === "oxygen_saturation")?.score).toBe(2);
    expect(brosjodCalculator.calculate({ ...base, oxygen_mode: "supplemental_oxygen", oxygen_saturation: 96, fio2: 35 }).trace.find((item) => item.inputId === "oxygen_saturation")?.score).toBe(1);
    expect(brosjodCalculator.calculate({ ...base, oxygen_mode: "supplemental_oxygen", oxygen_saturation: 93, fio2: 50 }).trace.find((item) => item.inputId === "oxygen_saturation")?.score).toBe(2);
    expect(brosjodCalculator.calculate({ ...base, oxygen_mode: "supplemental_oxygen", oxygen_saturation: 96, fio2: 50 }).warnings[0]?.id).toBe("unsupported_oxygen_combination");
  });

  it("rejects age outside the validated under-2 population", () => {
    expect(brosjodCalculator.calculate({ ...base, age_months: 24 }).warnings[0]?.id).toBe("invalid_brosjod_input");
  });
});
