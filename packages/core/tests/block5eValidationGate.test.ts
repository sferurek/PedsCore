import { describe, expect, it } from "vitest";
import {
  calculateTool,
  getToolBySlug,
  implementedCalculatorToolIds
} from "../src/index";

const forbiddenRecommendations = /tratamiento|administrar|analgesia|sedaci[oó]n|opioide|\bUCI\b|ingresar|alta/i;

const pendingResultText = (toolId: string) => {
  const result = calculateTool(toolId, {});
  return result.warnings.map((item) => `${item.message.es} ${item.message.en}`).join(" ");
};

describe("Block 5E validation gate", () => {
  it("keeps CRIES pending validation because the exact scoring table is incomplete", () => {
    const tool = getToolBySlug("cries");

    expect(tool?.implementationStatus).toBe("pending_validation");
    expect(tool?.validationNotes.en).toContain("exact 0/1/2 options");
    expect(tool?.validationNotes.en).toContain("complete primary source");
    expect(implementedCalculatorToolIds).not.toContain("cries");
    expect(calculateTool("cries", {}).warnings[0]?.id).toBe("calculator_not_implemented");
  });

  it("keeps CHEOPS pending validation because per-option scoring is incomplete", () => {
    const tool = getToolBySlug("cheops");

    expect(tool?.implementationStatus).toBe("pending_validation");
    expect(tool?.validationNotes.en).toContain("exact score per option");
    expect(implementedCalculatorToolIds).not.toContain("cheops");
    expect(calculateTool("cheops", {}).warnings[0]?.id).toBe("calculator_not_implemented");
  });

  it("keeps Visual Analogue Scale needing a primary reference because format is not defined", () => {
    const tool = getToolBySlug("visual-analogue-scale");

    expect(tool?.implementationStatus).toBe("needs_primary_reference");
    expect(tool?.validationNotes.en).toContain("0-10 versus 0-100 mm");
    expect(implementedCalculatorToolIds).not.toContain("visual_analogue_scale");
    expect(calculateTool("visual_analogue_scale", {}).warnings[0]?.id).toBe("calculator_not_implemented");
  });

  it("keeps Wong-Baker inactive because of licensing review", () => {
    expect(getToolBySlug("wong-baker-faces")?.implementationStatus).toBe(
      "not_implemented_due_to_licensing"
    );
    expect(implementedCalculatorToolIds).not.toContain("wong_baker_faces");
  });

  it("does not include therapeutic recommendations in pending-result text", () => {
    const texts = [
      pendingResultText("cries"),
      pendingResultText("cheops"),
      pendingResultText("visual_analogue_scale")
    ].join(" ");

    expect(texts).not.toMatch(forbiddenRecommendations);
  });
});
