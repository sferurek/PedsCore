import { describe, expect, it } from "vitest";
import { pippRCalculator } from "../src/index";

const base = {
  corrected_gestational_age_weeks: 36,
  baseline_behavioral_state: "active_awake",
  heart_rate_increase_bpm: 0,
  oxygen_saturation_decrease_points: 0,
  oxygen_increase_required: "no",
  brow_bulge_seconds: 0,
  eye_squeeze_seconds: 0,
  nasolabial_furrow_seconds: 0
};

describe("PIPP-R", () => {
  it("keeps contextual items out when physiologic/behavioral subtotal is zero", () => {
    const result = pippRCalculator.calculate({
      ...base,
      corrected_gestational_age_weeks: 26,
      baseline_behavioral_state: "quiet_sleep"
    });

    expect(result.score).toBe(0);
    expect(result.warnings.some((item) => item.id === "contextual_items_not_added")).toBe(true);
  });

  it("scores revised heart-rate bands", () => {
    expect(pippRCalculator.calculate({ ...base, heart_rate_increase_bpm: 4 }).score).toBe(0);
    expect(pippRCalculator.calculate({ ...base, heart_rate_increase_bpm: 5 }).score).toBe(1);
    expect(pippRCalculator.calculate({ ...base, heart_rate_increase_bpm: 15 }).score).toBe(2);
    expect(pippRCalculator.calculate({ ...base, heart_rate_increase_bpm: 25 }).score).toBe(3);
  });

  it("scores revised rounded oxygen-saturation bands and oxygen escalation", () => {
    expect(pippRCalculator.calculate({ ...base, oxygen_saturation_decrease_points: 2 }).score).toBe(0);
    expect(pippRCalculator.calculate({ ...base, oxygen_saturation_decrease_points: 3 }).score).toBe(1);
    expect(pippRCalculator.calculate({ ...base, oxygen_saturation_decrease_points: 6 }).score).toBe(2);
    expect(pippRCalculator.calculate({ ...base, oxygen_saturation_decrease_points: 9 }).score).toBe(3);
    expect(pippRCalculator.calculate({ ...base, oxygen_increase_required: "yes" }).score).toBe(3);
  });

  it("scores facial-action duration over the 30-second observation", () => {
    expect(pippRCalculator.calculate({ ...base, brow_bulge_seconds: 2.9 }).score).toBe(0);
    expect(pippRCalculator.calculate({ ...base, brow_bulge_seconds: 3 }).score).toBe(1);
    expect(pippRCalculator.calculate({ ...base, brow_bulge_seconds: 11 }).score).toBe(2);
    expect(pippRCalculator.calculate({ ...base, brow_bulge_seconds: 21 }).score).toBe(3);
  });

  it("adds gestational age and behavioral state only when a response exists", () => {
    const result = pippRCalculator.calculate({
      ...base,
      corrected_gestational_age_weeks: 27,
      baseline_behavioral_state: "quiet_sleep",
      heart_rate_increase_bpm: 5
    });

    expect(result.score).toBe(7);
    expect(result.trace.find((item) => item.inputId === "corrected_gestational_age_weeks")?.score).toBe(3);
    expect(result.trace.find((item) => item.inputId === "baseline_behavioral_state")?.score).toBe(3);
  });

  it("uses low, moderate, and severe descriptive bands", () => {
    expect(
      pippRCalculator.calculate({ ...base, heart_rate_increase_bpm: 5 }).classification?.en
    ).toBe("Low pain");

    expect(
      pippRCalculator.calculate({
        ...base,
        corrected_gestational_age_weeks: 27,
        baseline_behavioral_state: "quiet_sleep",
        heart_rate_increase_bpm: 5
      }).classification?.en
    ).toBe("Moderate pain");

    expect(
      pippRCalculator.calculate({
        ...base,
        corrected_gestational_age_weeks: 27,
        baseline_behavioral_state: "quiet_sleep",
        heart_rate_increase_bpm: 25,
        oxygen_saturation_decrease_points: 9,
        brow_bulge_seconds: 21,
        eye_squeeze_seconds: 21,
        nasolabial_furrow_seconds: 21
      }).classification?.en
    ).toBe("Severe pain");
  });

  it("does not attach analgesia or sedation instructions", () => {
    const result = pippRCalculator.calculate({
      ...base,
      corrected_gestational_age_weeks: 27,
      baseline_behavioral_state: "quiet_sleep",
      heart_rate_increase_bpm: 25,
      oxygen_saturation_decrease_points: 9,
      brow_bulge_seconds: 21,
      eye_squeeze_seconds: 21,
      nasolabial_furrow_seconds: 21
    });

    const text = [
      result.label?.es,
      result.label?.en,
      result.classification?.es,
      result.classification?.en,
      ...result.warnings.flatMap((item) => [item.message.es, item.message.en])
    ].join(" ");

    expect(text).not.toMatch(/analges|opioid|sedaci|sedat|paracetamol|morfina|morphine|tratamiento|treatment/i);
  });
});
