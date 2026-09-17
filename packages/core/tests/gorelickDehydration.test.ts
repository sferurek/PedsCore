import { describe, expect, it } from "vitest";
import { gorelickDehydrationCalculator } from "../src/index";

const noSigns = {
  ill_general_appearance: "absent",
  capillary_refill_over_2s: "absent",
  absent_tears: "absent",
  dry_mucous_membranes: "absent",
  sunken_eyes: "absent",
  abnormal_breathing: "absent",
  weak_pulse: "absent",
  reduced_skin_elasticity: "absent",
  tachycardia: "absent",
  reduced_urine_output: "absent"
};

describe("Gorelick dehydration scale", () => {
  it("calculates the full ten-sign score and four-sign subscore", () => {
    const result = gorelickDehydrationCalculator.calculate({
      ...noSigns,
      ill_general_appearance: "present",
      capillary_refill_over_2s: "present",
      absent_tears: "present"
    });

    expect(result.score).toBe(3);
    expect(result.maxScore).toBe(10);
    expect(result.label?.en).toContain("Gorelick-10: 3/10");
    expect(result.label?.en).toContain("Gorelick-4: 3/4");
    expect(result.classification?.en).toContain(">=5%");
    expect(result.classification?.en).toContain(">=10%");
  });

  it("maps seven or more signs to the original >=10% range", () => {
    const result = gorelickDehydrationCalculator.calculate({
      ill_general_appearance: "present",
      capillary_refill_over_2s: "present",
      absent_tears: "present",
      dry_mucous_membranes: "present",
      sunken_eyes: "present",
      abnormal_breathing: "present",
      weak_pulse: "present",
      reduced_skin_elasticity: "absent",
      tachycardia: "absent",
      reduced_urine_output: "absent"
    });

    expect(result.score).toBe(7);
    expect(result.classification?.en).toContain(">=10% weight deficit");
  });

  it("keeps zero signs below the original >=5% threshold", () => {
    const result = gorelickDehydrationCalculator.calculate(noSigns);

    expect(result.score).toBe(0);
    expect(result.label?.en).toContain("0/10");
    expect(result.label?.en).toContain("0/4");
    expect(result.classification?.en).toContain("below the original-study >=5%");
  });

  it("rejects missing and invalid selections", () => {
    expect(gorelickDehydrationCalculator.calculate({}).warnings[0]?.id).toBe(
      "missing_required_inputs"
    );

    expect(
      gorelickDehydrationCalculator.calculate({
        ...noSigns,
        tachycardia: "invalid"
      }).warnings[0]?.id
    ).toBe("invalid_score_input");
  });

  it("does not attach fluid, admission, discharge, or treatment instructions", () => {
    const result = gorelickDehydrationCalculator.calculate({
      ...noSigns,
      ill_general_appearance: "present",
      capillary_refill_over_2s: "present",
      absent_tears: "present"
    });

    const text = [
      result.label?.es,
      result.label?.en,
      result.classification?.es,
      result.classification?.en,
      ...result.warnings.flatMap((item) => [item.message.es, item.message.en])
    ].join(" ");

    expect(text).not.toMatch(
      /administrar|fluidos|suero|ml\/kg|ingreso|alta|tratamiento|administer|fluids|admission|discharge|treatment/i
    );
  });
});
