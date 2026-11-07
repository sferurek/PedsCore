import { describe, expect, it } from "vitest";
import { calculateTool } from "../src/index.js";

const base = {
  age_months: 120, respiratory_support: false, platelets_10e3_ul: 150,
  bilirubin_mg_dl: 1.1, map_mmhg: 65, dopamine_mcg_kg_min: 0,
  dobutamine_any_dose: false, epinephrine_mcg_kg_min: 0,
  norepinephrine_mcg_kg_min: 0, gcs: 15, creatinine_mg_dl: 0.6
};

describe("pSOFA supplied oxygenation ratios — local follow-up", () => {
  it.each(["pao2_fio2_ratio", "spo2_fio2_ratio"])("rejects malformed supplied %s even when the other ratio is usable", (field) => {
    for (const value of ["INVALID", "1e309", NaN, Infinity, false, [], {}]) {
      const result = calculateTool("psofa", { ...base, pao2_fio2_ratio: 400, spo2_fio2_ratio: 292, [field]: value });
      expect(result.score, field).toBeUndefined();
      expect(result.classification).toBeUndefined();
      expect(result.warnings[0]?.id).toBe("invalid_psofa_inputs");
      expect(result.trace).toContainEqual({ inputId: field, value });
    }
  });

  it("preserves genuinely unavailable ratios and the existing available-ratio selection", () => {
    for (const value of [undefined, null, "", " "]) {
      expect(calculateTool("psofa", { ...base, pao2_fio2_ratio: value, spo2_fio2_ratio: 292 }).score).toBe(0);
      expect(calculateTool("psofa", { ...base, pao2_fio2_ratio: 400, spo2_fio2_ratio: value }).score).toBe(0);
    }
  });

  it("preserves finite fractional ratios and compatible numeric strings", () => {
    const numeric = calculateTool("psofa", { ...base, pao2_fio2_ratio: 310.5, spo2_fio2_ratio: 250.25 });
    const strings = calculateTool("psofa", { ...base, pao2_fio2_ratio: "310.5", spo2_fio2_ratio: "250.25" });
    expect(numeric.score).toBe(1);
    expect(strings).toEqual(numeric);
  });

  it("still blocks a completely unavailable oxygenation assessment", () => {
    const result = calculateTool("psofa", base);
    expect(result.score).toBeUndefined();
    expect(result.warnings[0]?.id).toBe("missing_psofa_inputs");
  });
});
