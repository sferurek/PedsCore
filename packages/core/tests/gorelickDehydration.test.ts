import { describe, expect, it } from "vitest";
import { gorelickDehydrationCalculator } from "../src/calculators/gorelickDehydration.js";

const ids = ["decreased_skin_elasticity","capillary_refill_over_2s","ill_general_appearance","absent_tears","abnormal_respirations","dry_mucous_membranes","sunken_eyes","abnormal_pulse","tachycardia","decreased_urine_output"];
const make = (count: number) => Object.fromEntries(ids.map((id, index) => [id, index < count]));

describe("Gorelick 10-sign dehydration scale", () => {
  it("scores from zero to ten", () => {
    expect(gorelickDehydrationCalculator.calculate(make(0)).score).toBe(0);
    expect(gorelickDehydrationCalculator.calculate(make(10)).score).toBe(10);
  });
  it("uses the original three-sign threshold for approximately 5% dehydration", () => {
    expect(gorelickDehydrationCalculator.calculate(make(2)).classification?.en).toContain("<5%");
    expect(gorelickDehydrationCalculator.calculate(make(3)).classification?.en).toContain("≥5%");
  });
  it("uses the original seven-sign threshold for approximately 10% dehydration", () => {
    expect(gorelickDehydrationCalculator.calculate(make(6)).classification?.en).toContain("≥5%");
    expect(gorelickDehydrationCalculator.calculate(make(7)).classification?.en).toContain("≥10%");
  });
  it("requires all ten observations", () => {
    const incomplete = make(10); delete incomplete.decreased_urine_output;
    const result = gorelickDehydrationCalculator.calculate(incomplete);
    expect(result.score).toBeUndefined();
    expect(result.warnings.some((w) => w.id === "missing_gorelick_inputs")).toBe(true);
  });
});
