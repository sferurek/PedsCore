import { describe, expect, it } from "vitest";
import { pucaiCalculator, wpcdaiCalculator } from "../packages/core/src/calculators/ibdActivity.js";
import { nSofaCalculator } from "../packages/core/src/calculators/nSofa.js";
import { yaleObservationScaleCalculator } from "../packages/core/src/calculators/yaleObservation.js";
import {
  bacterialMeningitisScoreCalculator,
  pecarnFebrileInfantCalculator
} from "../packages/core/src/calculators/infectionOpen.js";

describe("wPCDAI", () => {
  it("scores remission at zero", () => {
    const result = wpcdaiCalculator.calculate({
      abdominal_pain:"none", wellbeing:"well", stools:"low",
      esr_mm_h:10, albumin_g_dl:4,
      weight_change:"gain", perirectal_disease:"none",
      extraintestinal_manifestations:"none"
    });
    expect(result.score).toBe(0);
    expect(result.classification?.en).toBe("Remission");
  });

  it("reaches 125 at maximum item weights", () => {
    const result = wpcdaiCalculator.calculate({
      abdominal_pain:"modsev", wellbeing:"frequent", stools:"high",
      esr_mm_h:70, albumin_g_dl:2.8,
      weight_change:"loss10", perirectal_disease:"active",
      extraintestinal_manifestations:"present"
    });
    expect(result.score).toBe(125);
    expect(result.classification?.en).toBe("Severe activity");
  });
});

describe("PUCAI", () => {
  it("scores 0 for complete remission pattern", () => {
    const result = pucaiCalculator.calculate({
      abdominal_pain:"0", rectal_bleeding:"0", stool_consistency:"0",
      stool_frequency:"0", nocturnal_stool:"0", activity_level:"0"
    });
    expect(result.score).toBe(0);
    expect(result.classification?.en).toBe("Remission");
  });

  it("scores 85 at maximum", () => {
    const result = pucaiCalculator.calculate({
      abdominal_pain:"10", rectal_bleeding:"30", stool_consistency:"10",
      stool_frequency:"15", nocturnal_stool:"10", activity_level:"10"
    });
    expect(result.score).toBe(85);
    expect(result.classification?.en).toBe("Severe activity");
  });
});

describe("nSOFA", () => {
  it("scores zero with no organ dysfunction", () => {
    const result = nSofaCalculator.calculate({
      intubated:false, spo2_percent:96, fio2_fraction:0.21,
      inotrope_count:0, systemic_steroids:false, platelets_10e3_ul:200
    });
    expect(result.score).toBe(0);
  });

  it("reaches maximum 15", () => {
    const result = nSofaCalculator.calculate({
      intubated:true, spo2_percent:80, fio2_fraction:1,
      inotrope_count:2, systemic_steroids:true, platelets_10e3_ul:40
    });
    expect(result.score).toBe(15);
  });
});

describe("Yale Observation Scale", () => {
  it("ranges from 6 to 30", () => {
    const low = yaleObservationScaleCalculator.calculate({
      cry:"1", parent_reaction:"1", state_variation:"1",
      color:"1", hydration:"1", social_response:"1"
    });
    const high = yaleObservationScaleCalculator.calculate({
      cry:"5", parent_reaction:"5", state_variation:"5",
      color:"5", hydration:"5", social_response:"5"
    });
    expect(low.score).toBe(6);
    expect(high.score).toBe(30);
  });
});

describe("Bacterial Meningitis Score", () => {
  const eligibility = {
    age_days:120, csf_wbc:50, csf_rbc:100,
    antibiotics_before_lp:false, critical_illness:false,
    immunosuppression:false, cns_device_or_recent_neurosurgery:false,
    other_bacterial_infection:false
  };
  it("scores 0 as very low risk", () => {
    const result = bacterialMeningitisScoreCalculator.calculate({
      ...eligibility, csf_gram_positive:false, csf_anc:200,
      csf_protein_mg_dl:40, peripheral_anc:5000, seizure:false
    });
    expect(result.score).toBe(0);
  });
  it("scores 6 at maximum", () => {
    const result = bacterialMeningitisScoreCalculator.calculate({
      ...eligibility, csf_gram_positive:true, csf_anc:1500,
      csf_protein_mg_dl:100, peripheral_anc:12000, seizure:true
    });
    expect(result.score).toBe(6);
  });
});

describe("PECARN febrile infant", () => {
  it("identifies simplified low-risk criteria", () => {
    const result = pecarnFebrileInfantCalculator.calculate({
      age_days:40, well_appearing:true, previously_healthy:true, term_infant:true,
      urinalysis_negative:true, anc:3500, procalcitonin_ng_ml:0.3
    });
    expect(result.score).toBe(0);
    expect(result.classification?.en).toContain("low-risk");
  });
});
