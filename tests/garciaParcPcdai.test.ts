import { describe, expect, it } from "vitest";
import { garciaAlixNersCalculator } from "../packages/core/src/calculators/garciaAlixNers.js";
import { parcCalculator } from "../packages/core/src/calculators/parc.js";
import { pcdaiCalculator } from "../packages/core/src/calculators/pcdai.js";

describe("García-Alix NE-RS", () => {
  it("scores 0 for normal findings", () => {
    const result = garciaAlixNersCalculator.calculate({
      alertness:"a0", posture:"p0", spontaneous_activity:"s0", motor_response:"m0",
      myotatic_reflexes:"r0", breathing:"b0", clinical_seizures:"c0",
      aeeg_seizures:"e0", aeeg_background:"g0"
    });
    expect(result.score).toBe(0);
    expect(result.maxScore).toBe(70);
  });
  it("reaches the published maximum of 70", () => {
    const result = garciaAlixNersCalculator.calculate({
      alertness:"a8", posture:"p8", spontaneous_activity:"s8", motor_response:"m8",
      myotatic_reflexes:"r6", breathing:"b8", clinical_seizures:"c8",
      aeeg_seizures:"e8", aeeg_background:"g8"
    });
    expect(result.score).toBe(70);
    expect(result.classification?.en).toContain("Severe");
  });
});

describe("pARC", () => {
  it("matches the published-formula example approximately", () => {
    const result = parcCalculator.calculate({
      age_years:15, sex:"female", pain_duration:"lt24",
      pain_with_walking:false, migration_to_rlq:false,
      maximal_rlq_tenderness:false, abdominal_guarding:false,
      anc_10e3_ul:2
    });
    expect(result.value).toBeCloseTo(0.2,1);
  });
});

describe("PCDAI", () => {
  it("ranges from 0 to 100", () => {
    const low = pcdaiCalculator.calculate({
      abdominal_pain:"0", stools:"0", wellbeing:"0", hematocrit_category:"0",
      esr_mm_h:10, albumin_g_dl:4, weight:"0", height:"0",
      abdomen:"0", perirectal:"0", extraintestinal:"0"
    });
    const high = pcdaiCalculator.calculate({
      abdominal_pain:"10", stools:"10", wellbeing:"10", hematocrit_category:"5",
      esr_mm_h:70, albumin_g_dl:2.5, weight:"10", height:"10",
      abdomen:"10", perirectal:"10", extraintestinal:"10"
    });
    expect(low.score).toBe(0);
    expect(high.score).toBe(100);
  });
});
