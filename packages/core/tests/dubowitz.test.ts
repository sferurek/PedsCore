import { describe, expect, it } from "vitest";
import {
  dubowitzCalculator,
  getTool,
  getToolDiscovery
} from "../src/index";

const zeroInput = {
  posture: 0,
  square_window: 0,
  ankle_dorsiflexion: 0,
  arm_recoil: 0,
  leg_recoil: 0,
  popliteal_angle: 0,
  heel_to_ear: 0,
  scarf_sign: 0,
  head_lag: 0,
  ventral_suspension: 0,
  edema: 0,
  skin_texture: 0,
  skin_color: 0,
  skin_opacity: 0,
  lanugo: 0,
  plantar_creases: 0,
  nipple_formation: 0,
  breast_size: 0,
  ear_form: 0,
  ear_firmness: 0,
  genitals: 0
};

describe("Dubowitz calculator", () => {
  it("is implemented as a local numeric-only calculator", () => {
    const tool = getTool("dubowitz");
    expect(tool?.implementationStatus).toBe("implemented");
    expect(tool?.calculationStatus).toBe("active");
    expect(tool?.inputs).toHaveLength(21);
    expect(tool?.inputs?.every((input) => input.type === "number")).toBe(true);
    expect(getToolDiscovery("dubowitz")?.calculationAvailability).toBe("local_active");
  });

  it("calculates the published regression from the total score", () => {
    const result = dubowitzCalculator.calculate({
      ...zeroInput,
      posture: 2,
      square_window: 4,
      ankle_dorsiflexion: 4,
      arm_recoil: 2,
      leg_recoil: 2,
      popliteal_angle: 5,
      heel_to_ear: 4,
      scarf_sign: 3,
      head_lag: 3,
      ventral_suspension: 4,
      edema: 2,
      skin_texture: 4,
      skin_color: 3,
      skin_opacity: 4,
      lanugo: 4,
      plantar_creases: 4,
      nipple_formation: 3,
      breast_size: 1,
      ear_form: 0,
      ear_firmness: 0,
      genitals: 0
    });

    expect(result.score).toBe(58);
    expect(result.maxScore).toBe(70);
    expect(result.classification?.en).toBe("Estimated gestational age: 39.9 weeks");
  });

  it("calculates minimum and maximum values", () => {
    const min = dubowitzCalculator.calculate(zeroInput);
    expect(min.score).toBe(0);
    expect(min.classification?.en).toBe("Estimated gestational age: 24.6 weeks");

    const max = dubowitzCalculator.calculate({
      posture: 4,
      square_window: 4,
      ankle_dorsiflexion: 4,
      arm_recoil: 2,
      leg_recoil: 2,
      popliteal_angle: 5,
      heel_to_ear: 4,
      scarf_sign: 3,
      head_lag: 3,
      ventral_suspension: 4,
      edema: 2,
      skin_texture: 4,
      skin_color: 3,
      skin_opacity: 4,
      lanugo: 4,
      plantar_creases: 4,
      nipple_formation: 3,
      breast_size: 3,
      ear_form: 3,
      ear_firmness: 3,
      genitals: 2
    });
    expect(max.score).toBe(70);
    expect(max.classification?.en).toBe("Estimated gestational age: 43.1 weeks");
  });

  it("requires all 21 item scores", () => {
    const incomplete = { ...zeroInput, genitals: undefined };
    expect(dubowitzCalculator.calculate(incomplete).warnings[0]?.id).toBe(
      "missing_required_inputs"
    );
  });

  it("rejects non-integer or out-of-range item values", () => {
    expect(
      dubowitzCalculator.calculate({ ...zeroInput, popliteal_angle: 6 }).warnings[0]?.id
    ).toBe("invalid_dubowitz_item_score");

    expect(
      dubowitzCalculator.calculate({ ...zeroInput, posture: 1.5 }).warnings[0]?.id
    ).toBe("invalid_dubowitz_item_score");
  });

  it("keeps copyright-sensitive material out of local metadata", () => {
    const tool = getTool("dubowitz");
    const text = JSON.stringify(tool);
    expect(text).toContain("does not reproduce");
    expect(text).toContain("published regression equation");
    expect(text).not.toContain("with permission");
  });
});
