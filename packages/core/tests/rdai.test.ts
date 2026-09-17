import { describe, expect, it } from "vitest";
import { rdaiCalculator } from "../src/calculators/rdai.js";

describe("RDAI", () => {
  it("calculates the original Lowell 0-17 score", () => {
    const result = rdaiCalculator.calculate({
      expiratory_wheeze: 4, inspiratory_wheeze: 2, wheeze_extent: 2,
      supraclavicular_retractions: 3, intercostal_retractions: 3, subcostal_retractions: 3
    });
    expect(result.score).toBe(17);
    expect(result.maxScore).toBe(17);
    expect(result.trace).toHaveLength(6);
  });

  it("does not invent severity bands or treatment recommendations", () => {
    const result = rdaiCalculator.calculate({
      expiratory_wheeze: 1, inspiratory_wheeze: 0, wheeze_extent: 1,
      supraclavicular_retractions: 1, intercostal_retractions: 1, subcostal_retractions: 0
    });
    expect(result.score).toBe(4);
    expect(result.warnings?.some((w) => w.id === "rdai_no_decision_thresholds")).toBe(true);
  });

  it("rejects item scores outside the original domain ranges", () => {
    const result = rdaiCalculator.calculate({
      expiratory_wheeze: 5, inspiratory_wheeze: 0, wheeze_extent: 0,
      supraclavicular_retractions: 0, intercostal_retractions: 0, subcostal_retractions: 0
    });
    expect(result.score).toBeUndefined();
    expect(result.warnings?.[0]?.id).toBe("invalid_rdai_item_score");
  });
});
