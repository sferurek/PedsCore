import { describe, expect, it } from "vitest";
import { passCalculator } from "../packages/core/src/calculators/pass.js";

describe("Pediatric Asthma Severity Score (PASS)", () => {
  it("scores zero when all three findings are absent or mild", () => {
    const result = passCalculator.calculate({ wheezing: 0, work_of_breathing: 0, prolonged_expiration: 0 });
    expect(result.score).toBe(0);
    expect(result.maxScore).toBe(6);
  });

  it("scores the published maximum of six", () => {
    const result = passCalculator.calculate({ wheezing: 2, work_of_breathing: 2, prolonged_expiration: 2 });
    expect(result.score).toBe(6);
    expect(result.maxScore).toBe(6);
  });

  it("sums each 0-2 clinical domain independently", () => {
    const result = passCalculator.calculate({ wheezing: 2, work_of_breathing: 1, prolonged_expiration: 2 });
    expect(result.score).toBe(5);
  });

  it("requires all three PASS domains", () => {
    const result = passCalculator.calculate({ wheezing: 1, work_of_breathing: 1 });
    expect(result.score).toBeUndefined();
    expect(result.warnings.some((warning) => warning.id === "missing_pass_inputs")).toBe(true);
  });
});
