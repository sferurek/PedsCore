import { describe, expect, it } from "vitest";
import {
  calculateTool,
  getToolBySlug,
  implementedCalculatorToolIds
} from "../src/index";

const forbiddenRecommendations = /tratamiento|ingresar|\balta\b|intubar|\bTC\b|tomograf[ií]a|fluidos|administrar|\bUCI\b/i;

describe("Block 5C validation gate", () => {
  it("keeps Wood-Downes-Ferres active after maintainer variant selection", () => {
    const tool = getToolBySlug("wood-downes-ferres");

    expect(tool?.implementationStatus).toBe("implemented");
    expect(tool?.validationNotes.en).toContain("six-domain Wood-Downes-Ferres");
    expect(implementedCalculatorToolIds).toContain("wood_downes_ferres");
    expect(
      calculateTool("wood_downes_ferres", {
        wheezing: "none",
        retractions: "none",
        air_entry: "good_symmetric",
        respiratory_rate: "under_30",
        heart_rate: "under_120",
        cyanosis: "absent"
      }).score
    ).toBe(0);
  });

  it("activates the selected pediatric Glasgow variant after source and age-split review", () => {
    const tool = getToolBySlug("pediatric-glasgow-coma-scale");

    expect(tool?.implementationStatus).toBe("implemented");
    expect(tool?.validationNotes.en).toContain("younger than 2 years");
    expect(implementedCalculatorToolIds).toContain("pediatric_gcs");
    expect(
      calculateTool("pediatric_gcs", {
        age_group: "preverbal_under_2",
        eye_response: "spontaneous",
        verbal_response: "best_age_appropriate",
        motor_response: "best_age_appropriate"
      }).score
    ).toBe(15);
  });

  it("does not include therapeutic recommendations in validation-gate result text", () => {
    const texts = [
      calculateTool("wood_downes_ferres", {
        wheezing: "none",
        retractions: "none",
        air_entry: "good_symmetric",
        respiratory_rate: "under_30",
        heart_rate: "under_120",
        cyanosis: "absent"
      }).warnings[0]?.message.es,
      calculateTool("wood_downes_ferres", {
        wheezing: "none",
        retractions: "none",
        air_entry: "good_symmetric",
        respiratory_rate: "under_30",
        heart_rate: "under_120",
        cyanosis: "absent"
      }).warnings[0]?.message.en,
      calculateTool("pediatric_gcs", {}).warnings[0]?.message.es,
      calculateTool("pediatric_gcs", {}).warnings[0]?.message.en
    ].join(" ");

    expect(texts).not.toMatch(forbiddenRecommendations);
  });
});
