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
      "flacc",
      "qtc_bazett",
      "qtc_fridericia",
      "qtc_framingham",
      "qtc_hodges",
      "bedside_schwartz"
    ]);
    expect(getImplementedTools().map((tool) => tool.id).sort()).toEqual(
      [...implementedCalculatorToolIds].sort()
    );
  });

  it("calculates through the dispatcher", () => {
    const result = calculateTool("apgar", {
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

