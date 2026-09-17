import { describe, expect, it } from "vitest";
import { ballardCalculator, getTool, getToolDiscovery } from "../src/index";

const scoreFor27 = {
  posture: 2,
  square_window: 2,
  arm_recoil: 2,
  popliteal_angle: 2,
  scarf_sign: 2,
  heel_to_ear: 2,
  skin: 3,
  lanugo: 2,
  plantar_surface: 3,
  breast: 2,
  eye_ear: 2,
  genitals: 3
};

describe("New Ballard calculator", () => {
  it("is implemented as a local numeric calculator without protected source artwork", () => {
    const tool = getTool("ballard");
    expect(tool?.implementationStatus).toBe("implemented");
    expect(tool?.calculationStatus).toBe("active");
    expect(tool?.inputs).toHaveLength(12);
    expect(tool?.inputs?.every((input) => input.type === "number")).toBe(true);
    expect(getToolDiscovery("ballard")?.calculationAvailability).toBe("local_active");
  });

  it("maps official grid anchors to gestational weeks", () => {
    const input = {
      posture: 4,
      square_window: 4,
      arm_recoil: 4,
      popliteal_angle: 5,
      scarf_sign: 4,
      heel_to_ear: 4,
      skin: 5,
      lanugo: 4,
      plantar_surface: 4,
      breast: 4,
      eye_ear: 4,
      genitals: 4
    };

    const result = ballardCalculator.calculate(input);
    expect(result.score).toBe(50);
    expect(result.classification?.en).toContain("44 completed weeks");
  });

  it("uses Ballard's completed-week interpolation for intermediate totals", () => {
    const result27 = ballardCalculator.calculate(scoreFor27);
    expect(result27.score).toBe(27);
    expect(result27.classification?.en).toContain("34 completed weeks");

    const result28 = ballardCalculator.calculate({ ...scoreFor27, posture: 3 });
    expect(result28.score).toBe(28);
    expect(result28.classification?.en).toContain("35 completed weeks");
  });

  it("rejects missing, non-integer, and out-of-range item scores", () => {
    const incomplete = { ...scoreFor27, genitals: undefined };
    expect(ballardCalculator.calculate(incomplete).warnings[0]?.id).toBe("missing_required_inputs");
    expect(ballardCalculator.calculate({ ...scoreFor27, posture: 4.5 }).warnings[0]?.id).toBe("invalid_ballard_item_score");
    expect(ballardCalculator.calculate({ ...scoreFor27, plantar_surface: -3 }).warnings[0]?.id).toBe("invalid_ballard_item_score");
  });

  it("does not assign a gestational age outside the published -10 to 50 maturity grid", () => {
    const result = ballardCalculator.calculate({
      posture: 0,
      square_window: -1,
      arm_recoil: 0,
      popliteal_angle: -1,
      scarf_sign: -1,
      heel_to_ear: -1,
      skin: -1,
      lanugo: 0,
      plantar_surface: -2,
      breast: -1,
      eye_ear: -2,
      genitals: -1
    });

    expect(result.score).toBe(-11);
    expect(result.classification).toBeUndefined();
    expect(result.warnings[0]?.id).toBe("ballard_total_outside_maturity_grid");
  });

  it("keeps copyright-sensitive content out of the local form", () => {
    const tool = getTool("ballard");
    const text = JSON.stringify(tool);
    expect(text).toContain("does not reproduce");
    expect(text).not.toContain("Sticky, friable, transparent");
    expect(text).not.toContain("lids fused");
  });
});
