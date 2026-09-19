import { describe, expect, it } from "vitest";
import {
  calculateTool,
  getToolBySlug,
  implementedCalculatorToolIds
} from "../src/index";

const forbiddenRecommendations = /tratamiento|administrar|analgesia|sedaci[oó]n|opioide|\bUCI\b|ingresar|\balta\b/i;

const pendingResultText = (toolId: string) => {
  const result = calculateTool(toolId, {});
  return result.warnings.map((item) => `${item.message.es} ${item.message.en}`).join(" ");
};

describe("Block 5E validation gate", () => {
  it("keeps CRIES aligned with its completed validation state", () => {
    const tool = getToolBySlug("cries");

    expect(tool?.implementationStatus).toBe("implemented");
    expect(tool?.calculationStatus).toBe("active");
    expect(implementedCalculatorToolIds).toContain("cries");
    expect(calculateTool("cries", {}).warnings[0]?.id).toBe("missing_required_inputs");
  });

  it("keeps CHEOPS rights-blocked and non-operational", () => {
    const tool = getToolBySlug("cheops");

    expect(tool?.implementationStatus).toBe("not_implemented_due_to_licensing");
    expect(tool?.validationNotes.en).toContain("exact score per option");
    expect(implementedCalculatorToolIds).not.toContain("cheops");
    expect(calculateTool("cheops", {}).warnings[0]?.id).toBe("calculator_not_implemented");
  });

  it("keeps Visual Analogue Scale aligned with the selected 100-mm pediatric variant", () => {
    const tool = getToolBySlug("visual-analogue-scale");

    expect(tool?.implementationStatus).toBe("implemented");
    expect(tool?.calculationStatus).toBe("active");
    expect(tool?.validationNotes.en).toContain("100-mm");
    expect(implementedCalculatorToolIds).toContain("visual_analogue_scale");
    expect(calculateTool("visual_analogue_scale", {}).warnings[0]?.id).toBe("missing_vas_input");
  });

  it("keeps Wong-Baker inactive because of licensing review", () => {
    expect(getToolBySlug("wong-baker-faces")?.implementationStatus).toBe(
      "not_implemented_due_to_licensing"
    );
    expect(implementedCalculatorToolIds).not.toContain("wong_baker_faces");
  });

  it("does not include therapeutic recommendations in pending-result text", () => {
    const texts = [
      pendingResultText("cheops"),
      pendingResultText("visual_analogue_scale")
    ].join(" ");

    expect(texts).not.toMatch(forbiddenRecommendations);
  });
});
