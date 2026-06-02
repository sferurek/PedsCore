import { describe, expect, it } from "vitest";
import {
  calculateTool,
  getToolBySlug,
  implementedCalculatorToolIds
} from "../src/index";

const forbiddenRecommendations = /tratamiento|administrar|analgesia|sedaci[oó]n|opioide|hipotermia|\bUCI\b|ingresar|alta|anticonvulsivante/i;

describe("Block 5D validation gate", () => {
  it("keeps CRIES pending validation because the exact option table is incomplete", () => {
    const tool = getToolBySlug("cries");

    expect(tool?.implementationStatus).toBe("pending_validation");
    expect(tool?.validationNotes.en).toContain("exact 0/1/2 option table");
    expect(implementedCalculatorToolIds).not.toContain("cries");
    expect(calculateTool("cries", {}).warnings[0]?.id).toBe("calculator_not_implemented");
  });

  it("keeps Thompson HIE pending validation because item-specific ranges are incomplete", () => {
    const tool = getToolBySlug("thompson-hie-score");

    expect(tool?.implementationStatus).toBe("pending_validation");
    expect(tool?.validationNotes.en).toContain("specific ranges");
    expect(implementedCalculatorToolIds).not.toContain("thompson_hie");
    expect(calculateTool("thompson_hie", {}).warnings[0]?.id).toBe("calculator_not_implemented");
  });

  it("does not include therapeutic recommendations in pending-result text", () => {
    const texts = [
      calculateTool("cries", {}).warnings[0]?.message.es,
      calculateTool("cries", {}).warnings[0]?.message.en,
      calculateTool("thompson_hie", {}).warnings[0]?.message.es,
      calculateTool("thompson_hie", {}).warnings[0]?.message.en
    ].join(" ");

    expect(texts).not.toMatch(forbiddenRecommendations);
  });
});
