import { describe, expect, it } from "vitest";
import {
  calculateTool,
  getToolBySlug,
  implementedCalculatorToolIds
} from "../src/index";

const forbiddenRecommendations = /tratamiento|ingresar|alta|intubar|\bTC\b|tomograf[ií]a|fluidos|administrar|\bUCI\b/i;

describe("Block 5C validation gate", () => {
  it("keeps Wood-Downes-Ferres pending validation because variant details are incomplete", () => {
    const tool = getToolBySlug("wood-downes-ferres");

    expect(tool?.implementationStatus).toBe("pending_validation");
    expect(tool?.validationNotes.en).toContain("exact version");
    expect(implementedCalculatorToolIds).not.toContain("wood_downes_ferres");
    expect(calculateTool("wood_downes_ferres", {}).warnings[0]?.id).toBe("calculator_not_implemented");
  });

  it("keeps pediatric Glasgow pending validation because pediatric verbal scoring is incomplete", () => {
    const tool = getToolBySlug("pediatric-glasgow-coma-scale");

    expect(tool?.implementationStatus).toBe("pending_validation");
    expect(tool?.validationNotes.en).toContain("pediatric verbal");
    expect(implementedCalculatorToolIds).not.toContain("pediatric_gcs");
    expect(calculateTool("pediatric_gcs", {}).warnings[0]?.id).toBe("calculator_not_implemented");
  });

  it("does not include therapeutic recommendations in validation-gate result text", () => {
    const texts = [
      calculateTool("wood_downes_ferres", {}).warnings[0]?.message.es,
      calculateTool("wood_downes_ferres", {}).warnings[0]?.message.en,
      calculateTool("pediatric_gcs", {}).warnings[0]?.message.es,
      calculateTool("pediatric_gcs", {}).warnings[0]?.message.en
    ].join(" ");

    expect(texts).not.toMatch(forbiddenRecommendations);
  });
});
