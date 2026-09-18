import { describe, expect, it } from "vitest";
import {
  modifiedTalCalculator,
  taussigCroupCalculator
} from "../packages/core/src/calculators/respiratoryScores.js";

describe("Tal and Taussig respiratory scores", () => {
  it("scores Modified Tal age-adjusted respiratory rate correctly under 6 months", () => {
    const result = modifiedTalCalculator.calculate({
      age_months: 4,
      respiratory_rate: 60,
      wheeze_crackles: "wheeze_2",
      retractions: "retractions_1",
      spo2: 93
    });

    expect(result.score).toBe(6);
    expect(result.classification?.en).toBe("Moderate");
  });

  it("scores Modified Tal age-adjusted respiratory rate correctly from 6 months onward", () => {
    const result = modifiedTalCalculator.calculate({
      age_months: 10,
      respiratory_rate: 65,
      wheeze_crackles: "wheeze_3",
      retractions: "retractions_3",
      spo2: 88
    });

    expect(result.score).toBe(12);
    expect(result.classification?.en).toBe("Severe");
  });

  it("classifies low Modified Tal score as mild", () => {
    const result = modifiedTalCalculator.calculate({
      age_months: 8,
      respiratory_rate: 28,
      wheeze_crackles: "wheeze_0",
      retractions: "retractions_0",
      spo2: 97
    });

    expect(result.score).toBe(0);
    expect(result.classification?.en).toBe("Mild");
  });

  it("calculates a severe Taussig score", () => {
    const result = taussigCroupCalculator.calculate({
      stridor: "stridor_3",
      air_entry: "air_3",
      color: "color_3",
      retractions: "taussig_ret_3",
      consciousness: "conscious_3"
    });

    expect(result.score).toBe(15);
    expect(result.classification?.en).toBe("Severe");
  });

  it("classifies a mild-moderate Taussig score", () => {
    const result = taussigCroupCalculator.calculate({
      stridor: "stridor_1",
      air_entry: "air_1",
      color: "color_0",
      retractions: "taussig_ret_2",
      consciousness: "conscious_1"
    });

    expect(result.score).toBe(5);
    expect(result.classification?.en).toBe("Mild-moderate");
  });

  it("adds a safety warning for the extreme or silent stridor category", () => {
    const result = taussigCroupCalculator.calculate({
      stridor: "stridor_3",
      air_entry: "air_3",
      color: "color_0",
      retractions: "taussig_ret_3",
      consciousness: "conscious_2"
    });

    expect(result.warnings.some((warning) => warning.id === "taussig_silent_stridor_warning")).toBe(true);
  });
});
