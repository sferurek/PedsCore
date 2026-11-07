import { describe, expect, it } from "vitest";
import { calculateTool } from "../src/index.js";

const phoenixEligibility = {
  age_months: 60, suspected_infection: true, birth_hospitalization_before_discharge: false,
  postconceptional_age_at_least_37_weeks: true, any_respiratory_support: false,
  invasive_mechanical_ventilation: false
};
const numericFields = ["fio2_fraction", "pao2_mmhg", "spo2_percent", "vasoactive_count", "lactate_mmol_l",
  "map_mmhg", "platelets_10e3_ul", "inr", "d_dimer_mg_l_feu", "fibrinogen_mg_dl", "gcs"];
const apgar = { heart_rate: 2, respiratory_effort: 2, muscle_tone: 2, reflex_irritability: 2, color: 2 };

describe("supplied values versus unavailable measurements", () => {
  it.each(numericFields)("does not treat malformed supplied Phoenix %s as unmeasured", (field) => {
    for (const value of [NaN, Infinity, -Infinity, "INVALID", "1e309", true, [], {}]) {
      const result = calculateTool("phoenix_sepsis", { ...phoenixEligibility, [field]: value });
      expect(result.score, `${field}=${String(value)}`).toBeUndefined();
      expect(result.classification).toBeUndefined();
      expect(result.warnings[0]?.id).toBe("invalid_phoenix_inputs");
      expect(result.trace).toContainEqual({ inputId: field, value });
    }
  });

  it("rejects a supplied unsupported pupils value instead of counting it as unavailable", () => {
    for (const value of [0, 1, "INVALID", "true", [], {}]) {
      const result = calculateTool("phoenix_sepsis", { ...phoenixEligibility, both_pupils_fixed: value });
      expect(result.score).toBeUndefined();
      expect(result.warnings[0]?.id).toBe("invalid_phoenix_inputs");
    }
  });

  it("preserves absent, null and blank optional Phoenix measurements as partial data", () => {
    for (const value of [undefined, null, "", " "]) {
      const result = calculateTool("phoenix_sepsis", {
        ...phoenixEligibility, ...Object.fromEntries(numericFields.map((field) => [field, value])), both_pupils_fixed: value
      });
      expect(result.score).toBe(0);
      expect(result.warnings.some((warning) => warning.id === "phoenix_partial_data")).toBe(true);
    }
  });

  it("preserves supplied finite values and supported boolean encodings", () => {
    const numeric = { ...phoenixEligibility, lactate_mmol_l: 5, platelets_10e3_ul: 80, both_pupils_fixed: true };
    const byNumber = calculateTool("phoenix_sepsis", numeric);
    const byString = calculateTool("phoenix_sepsis", { ...numeric, lactate_mmol_l: "5", platelets_10e3_ul: "80", both_pupils_fixed: "yes" });
    expect(byNumber.score).toBe(4);
    expect({ ...byString, trace: [] }).toEqual({ ...byNumber, trace: [] });
    expect(calculateTool("phoenix_sepsis", { ...phoenixEligibility, lactate_mmol_l: 0, both_pupils_fixed: false }).score).toBe(0);
  });

  it.each(["INVALID", "ten_minutes", 5, true, []])("rejects unsupported Apgar assessment-time identifier %j", (assessment_time) => {
    const result = calculateTool("apgar", { ...apgar, assessment_time });
    expect(result.score).toBeUndefined();
    expect(result.interpretation).toBeUndefined();
    expect(result.warnings[0]?.id).toBe("invalid_apgar_assessment_time");
  });
});
