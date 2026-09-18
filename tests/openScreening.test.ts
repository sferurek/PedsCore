import { describe, expect, it } from "vitest";
import {
  stepByStepFebrileInfantCalculator,
  strongKidsCalculator
} from "../packages/core/src/calculators/openScreening.js";

describe("STRONGkids and Step-by-Step", () => {
  it("scores STRONGkids high risk", () => {
    const result = strongKidsCalculator.calculate({
      poor_nutritional_status: true,
      high_risk_disease: true,
      reduced_intake_or_losses: true,
      weight_loss_or_poor_gain: true
    });

    expect(result.score).toBe(5);
    expect(result.classification?.en).toBe("High nutritional risk");
  });

  it("scores STRONGkids moderate risk", () => {
    const result = strongKidsCalculator.calculate({
      poor_nutritional_status: false,
      high_risk_disease: true,
      reduced_intake_or_losses: false,
      weight_loss_or_poor_gain: false
    });

    expect(result.score).toBe(2);
    expect(result.classification?.en).toBe("Moderate nutritional risk");
  });

  it("classifies Step-by-Step high risk by age", () => {
    const result = stepByStepFebrileInfantCalculator.calculate({
      age_days: 15,
      well_appearing: true,
      leukocyturia: false,
      procalcitonin_ng_ml: 0.1,
      crp_mg_l: 5,
      anc: 3000
    });

    expect(result.score).toBe(2);
    expect(result.classification?.en).toBe("High risk");
  });

  it("classifies Step-by-Step intermediate risk by CRP", () => {
    const result = stepByStepFebrileInfantCalculator.calculate({
      age_days: 40,
      well_appearing: true,
      leukocyturia: false,
      procalcitonin_ng_ml: 0.1,
      crp_mg_l: 30,
      anc: 5000
    });

    expect(result.score).toBe(1);
    expect(result.classification?.en).toBe("Intermediate risk");
  });

  it("classifies Step-by-Step low risk when all criteria are negative", () => {
    const result = stepByStepFebrileInfantCalculator.calculate({
      age_days: 40,
      well_appearing: true,
      leukocyturia: false,
      procalcitonin_ng_ml: 0.2,
      crp_mg_l: 10,
      anc: 6000
    });

    expect(result.score).toBe(0);
    expect(result.classification?.en).toBe("Low risk");
  });
});
