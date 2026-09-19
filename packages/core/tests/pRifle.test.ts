import { describe, expect, it } from "vitest";
import { pRifleCalculator } from "../src/calculators/pRifle.js";

describe("pRIFLE", () => {
  it("classifies eCCl decline thresholds", () => {
    expect(pRifleCalculator.calculate({ baseline_eccr_ml_min_1_73m2: 100, current_eccr_ml_min_1_73m2: 75 }).classification?.en).toBe("Risk");
    expect(pRifleCalculator.calculate({ baseline_eccr_ml_min_1_73m2: 100, current_eccr_ml_min_1_73m2: 50 }).classification?.en).toBe("Injury");
    expect(pRifleCalculator.calculate({ baseline_eccr_ml_min_1_73m2: 100, current_eccr_ml_min_1_73m2: 25 }).classification?.en).toBe("Failure");
  });
  it("classifies Failure when current eCCl is below 35", () => {
    expect(pRifleCalculator.calculate({ baseline_eccr_ml_min_1_73m2: 100, current_eccr_ml_min_1_73m2: 34.9 }).classification?.en).toBe("Failure");
  });
  it("classifies urine-output duration thresholds", () => {
    expect(pRifleCalculator.calculate({ urine_output_ml_kg_h: 0.4, urine_output_duration_hours: 8 }).classification?.en).toBe("Risk");
    expect(pRifleCalculator.calculate({ urine_output_ml_kg_h: 0.4, urine_output_duration_hours: 16 }).classification?.en).toBe("Injury");
    expect(pRifleCalculator.calculate({ urine_output_ml_kg_h: 0.2, urine_output_duration_hours: 24 }).classification?.en).toBe("Failure");
  });
  it("uses the worse of eCCl and urine criteria", () => {
    const result = pRifleCalculator.calculate({ baseline_eccr_ml_min_1_73m2: 100, current_eccr_ml_min_1_73m2: 75, urine_output_ml_kg_h: 0.4, urine_output_duration_hours: 16 });
    expect(result.classification?.en).toBe("Injury");
  });
});
