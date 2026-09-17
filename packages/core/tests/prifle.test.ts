import { describe, expect, it } from "vitest";
import { prifleCalculator } from "../src/index";

const base = {
  baseline_mode: "known",
  baseline_eccl: 120,
  current_eccl: 120,
  urine_output_ml_kg_h: 1,
  urine_duration_hours: 8,
  anuria_hours: 0,
  persistence_status: "none"
};

describe("pRIFLE calculator", () => {
  it("classifies eCCl decline as Risk, Injury, and Failure", () => {
    expect(prifleCalculator.calculate({ ...base, current_eccl: 90 }).label?.en).toBe("Risk");
    expect(prifleCalculator.calculate({ ...base, current_eccl: 60 }).label?.en).toBe("Injury");
    expect(prifleCalculator.calculate({ ...base, current_eccl: 30 }).label?.en).toBe("Failure");
  });

  it("classifies urine-output thresholds and takes the worse acute criterion", () => {
    const injury = prifleCalculator.calculate({
      ...base,
      current_eccl: 100,
      urine_output_ml_kg_h: 0.4,
      urine_duration_hours: 16
    });
    expect(injury.label?.en).toBe("Injury");
    expect(injury.classification?.en).toContain("eCCl: No acute pRIFLE category met");
    expect(injury.classification?.en).toContain("urine output: Injury");

    const failure = prifleCalculator.calculate({
      ...base,
      urine_output_ml_kg_h: 0.2,
      urine_duration_hours: 24
    });
    expect(failure.label?.en).toBe("Failure");
  });

  it("recognizes 12 hours of anuria as Failure", () => {
    expect(prifleCalculator.calculate({ ...base, anuria_hours: 12 }).label?.en).toBe("Failure");
  });

  it("requires explicit handling of unknown baseline and warns when 120 is imputed", () => {
    const result = prifleCalculator.calculate({
      ...base,
      baseline_mode: "imputed_120",
      baseline_eccl: undefined,
      current_eccl: 80
    });

    expect(result.label?.en).toBe("Risk");
    expect(result.warnings.some((item) => item.id === "baseline_imputed_120")).toBe(true);

    expect(
      prifleCalculator.calculate({
        ...base,
        baseline_mode: "known",
        baseline_eccl: undefined
      }).warnings[0]?.id
    ).toBe("baseline_eccl_required");
  });

  it("reports Loss and ESKD only when persistence is explicitly selected", () => {
    expect(
      prifleCalculator.calculate({
        ...base,
        current_eccl: 20,
        persistence_status: "failure_over_4_weeks"
      }).label?.en
    ).toBe("Loss");

    expect(
      prifleCalculator.calculate({
        ...base,
        current_eccl: 20,
        persistence_status: "failure_over_3_months"
      }).label?.en
    ).toBe("ESKD");
  });

  it("does not attach treatment or renal-replacement instructions", () => {
    const result = prifleCalculator.calculate({ ...base, current_eccl: 20 });
    const text = [
      result.label?.es,
      result.label?.en,
      result.classification?.es,
      result.classification?.en,
      ...result.warnings.flatMap((item) => [item.message.es, item.message.en])
    ].join(" ");

    expect(text).not.toMatch(
      /dialisis|di[aá]lisis|fluid|fluidos|diuretic|diuretico|tratamiento|treatment|ingreso|admission|alta|discharge/i
    );
  });
});
