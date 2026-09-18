import { describe, expect, it } from "vitest";
import {
  calculateTool,
  getImplementedTools,
  implementedCalculatorToolIds
} from "../src/index";

describe("calculator registry", () => {
  it("lists implemented calculators", () => {
    expect(implementedCalculatorToolIds).toEqual([
      "apgar",
      "silverman_andersen",
      "ballard",
      "dubowitz",
      "modified_sarnat_nichd",
      "thompson_hie",
      "cries",
      "wood_downes_ferres",
      "flacc",
      "qtc_bazett",
      "qtc_fridericia",
      "qtc_framingham",
      "qtc_hodges",
      "bedside_schwartz",
      "revised_schwartz",
      "westley_croup",
      "cdc_growth_percentiles",
      "pram",
      "clinical_dehydration_scale",
      "bedside_pews",
      "pediatric_appendicitis_score",
      "pecarn_tbi_under_2",
      "pecarn_tbi_2_or_more",
      "catch_tbi",
      "chalice_tbi",
      "sipa",
      "nips",
      "pediatric_burn_tbsa"
    ]);
    expect(implementedCalculatorToolIds).toContain("flacc");
    expect(getImplementedTools().map((tool) => tool.id)).not.toContain("flacc");
    expect(getImplementedTools()).toHaveLength(30);
  });

  it("calculates through the dispatcher", () => {
    const result = calculateTool("apgar", {
      assessment_time: "five_minutes",
      heart_rate: 2,
      respiratory_effort: 2,
      muscle_tone: 2,
      reflex_irritability: 2,
      color: 2
    });

    expect(result.score).toBe(10);
  });

  it("returns a safe response for unavailable calculators", () => {
    const result = calculateTool("pews", {});

    expect(result.warnings[0]?.id).toBe("calculator_not_implemented");
  });
});
