import { describe, expect, it } from "vitest";
import { taussigCroupCalculator } from "../src/calculators/taussigCroup.js";

describe("Taussig Croup Score", () => {
  it("scores zero when all five domains are normal", () => {
    const result = taussigCroupCalculator.calculate({ stridor: 0, air_entry: 0, color: 0, retractions: 0, consciousness: 0 });
    expect(result.score).toBe(0);
    expect(result.maxScore).toBe(15);
  });

  it("scores the full 0-15 implementation when all domains are at level 3", () => {
    const result = taussigCroupCalculator.calculate({ stridor: 3, air_entry: 3, color: 3, retractions: 3, consciousness: 3 });
    expect(result.score).toBe(15);
    expect(result.maxScore).toBe(15);
  });

  it("adds each clinical domain independently", () => {
    const result = taussigCroupCalculator.calculate({ stridor: 3, air_entry: 2, color: 1, retractions: 2, consciousness: 1 });
    expect(result.score).toBe(9);
  });

  it("requires all five domains", () => {
    const result = taussigCroupCalculator.calculate({ stridor: 1, air_entry: 1, color: 0, retractions: 1 });
    expect(result.score).toBeUndefined();
    expect(result.warnings.some((warning) => warning.id === "missing_taussig_inputs")).toBe(true);
  });
});
