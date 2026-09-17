import { describe, expect, it } from "vitest";
import {
  calculateTool,
  getToolBySlug,
  implementedCalculatorToolIds
} from "../src/index";

const forbiddenRecommendations = /tratamiento|administrar|analgesia|sedaci[oó]n|opioide|hipotermia|\bUCI\b|ingresar|\balta\b|anticonvulsivante/i;

describe("Block 5D validation gate", () => {
  it("keeps CRIES aligned with its active implementation", () => {
    const tool = getToolBySlug("cries");

    expect(tool?.implementationStatus).toBe("implemented");
    expect(tool?.calculationStatus).toBe("active");
    expect(implementedCalculatorToolIds).toContain("cries");
    expect(calculateTool("cries", {}).warnings[0]?.id).toBe("missing_required_inputs");
  });

  it("keeps Thompson HIE aligned with its active implementation", () => {
    const tool = getToolBySlug("thompson-hie-score");

    expect(tool?.implementationStatus).toBe("implemented");
    expect(tool?.calculationStatus).toBe("active");
    expect(implementedCalculatorToolIds).toContain("thompson_hie");
    expect(calculateTool("thompson_hie", {}).warnings[0]?.id).toBe("missing_required_inputs");
  });

  it("does not include therapeutic recommendations in validation-result text", () => {
    const texts = [
      calculateTool("cries", {}).warnings[0]?.message.es,
      calculateTool("cries", {}).warnings[0]?.message.en,
      calculateTool("thompson_hie", {}).warnings[0]?.message.es,
      calculateTool("thompson_hie", {}).warnings[0]?.message.en
    ].join(" ");

    expect(texts).not.toMatch(forbiddenRecommendations);
  });
});
