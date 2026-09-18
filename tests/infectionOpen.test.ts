import { describe, expect, it } from "vitest";
import {
  bacterialMeningitisScoreCalculator,
  pecarnFebrileInfantCalculator
} from "../packages/core/src/calculators/infectionOpen.js";

describe("open infection calculators", () => {
  it("classifies BMS 0 as very low risk in an eligible child", () => {
    const result = bacterialMeningitisScoreCalculator.calculate({
      age_days: 365,
      csf_wbc: 25,
      antibiotics_before_lp: false,
      critical_illness: false,
      immunosuppression: false,
      cns_device_or_recent_neurosurgery: false,
      other_bacterial_infection: false,
      csf_gram_positive: false,
      csf_anc: 500,
      csf_protein_mg_dl: 50,
      peripheral_anc: 7000,
      seizure: false
    });

    expect(result.score).toBe(0);
    expect(result.classification?.en).toContain("Very low risk");
  });

  it("assigns the correct BMS weighted score", () => {
    const result = bacterialMeningitisScoreCalculator.calculate({
      age_days: 365,
      csf_wbc: 50,
      antibiotics_before_lp: false,
      critical_illness: false,
      immunosuppression: false,
      cns_device_or_recent_neurosurgery: false,
      other_bacterial_infection: false,
      csf_gram_positive: true,
      csf_anc: 1200,
      csf_protein_mg_dl: 100,
      peripheral_anc: 12000,
      seizure: true
    });

    expect(result.score).toBe(6);
  });

  it("does not present BMS as validated outside its population", () => {
    const result = bacterialMeningitisScoreCalculator.calculate({
      age_days: 20,
      csf_wbc: 25,
      antibiotics_before_lp: false,
      critical_illness: false,
      immunosuppression: false,
      cns_device_or_recent_neurosurgery: false,
      other_bacterial_infection: false
    });

    expect(result.score).toBeUndefined();
    expect(result.classification?.en).toContain("Outside");
  });

  it("classifies PECARN febrile infant low risk only when all simplified criteria are met", () => {
    const result = pecarnFebrileInfantCalculator.calculate({
      age_days: 28,
      well_appearing: true,
      previously_healthy: true,
      term_infant: true,
      urinalysis_negative: true,
      anc: 3900,
      procalcitonin_ng_ml: 0.4
    });

    expect(result.score).toBe(0);
    expect(result.classification?.en).toContain("low-risk");
  });

  it("does not classify PECARN low risk when one biomarker exceeds threshold", () => {
    const result = pecarnFebrileInfantCalculator.calculate({
      age_days: 45,
      well_appearing: true,
      previously_healthy: true,
      term_infant: true,
      urinalysis_negative: true,
      anc: 5000,
      procalcitonin_ng_ml: 0.4
    });

    expect(result.score).toBe(1);
  });

  it("gates PECARN outside the validated population", () => {
    const result = pecarnFebrileInfantCalculator.calculate({
      age_days: 75,
      well_appearing: true,
      previously_healthy: true,
      term_infant: true
    });

    expect(result.score).toBeUndefined();
    expect(result.classification?.en).toContain("Outside");
  });
});
