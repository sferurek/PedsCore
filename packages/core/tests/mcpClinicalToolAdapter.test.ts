import { describe, expect, it } from "vitest";
import {
  calculateClinicalToolForAgent,
  getClinicalToolForAgent,
  searchClinicalToolsForAgent
} from "../src/mcp/index.js";

describe("MCP clinical tool adapter", () => {
  it("discovers Apgar from natural-language search", () => {
    const results = searchClinicalToolsForAgent({
      query: "newborn apgar score",
      language: "en",
      calculableOnly: true
    });

    expect(results.length).toBeGreaterThan(0);
    expect(results[0]?.id).toBe("apgar");
    expect(results[0]?.calculationAvailable).toBe(true);
  });

  it("returns structured inputs without exposing UI implementation details", () => {
    const tool = getClinicalToolForAgent("apgar", "en");

    expect(tool?.id).toBe("apgar");
    expect(tool?.inputs.map((input) => input.id)).toContain("heart_rate");
    expect(tool?.disclaimerRequired).toBe(true);
    expect(tool?.references.length).toBeGreaterThan(0);
  });

  it("executes the existing deterministic calculator", () => {
    const result = calculateClinicalToolForAgent("apgar", {
      assessment_time: "five_minutes",
      heart_rate: 2,
      respiratory_effort: 2,
      muscle_tone: 2,
      reflex_irritability: 2,
      color: 1
    });

    expect(result.toolId).toBe("apgar");
    expect(result.score).toBe(9);
    expect(result.maxScore).toBe(10);
    expect(result.warnings).toEqual([]);
  });
});
