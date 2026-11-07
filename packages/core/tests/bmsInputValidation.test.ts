import { describe, expect, it } from "vitest";
import { calculateTool } from "../src/index.js";

const valid = {
  age_days: 180, csf_wbc: 2000, csf_rbc: 0,
  antibiotics_before_lp: false, critical_illness: false, immunosuppression: false,
  cns_device_or_recent_neurosurgery: false, other_bacterial_infection: false,
  csf_gram_positive: false, csf_anc: 100, csf_protein_mg_dl: 40,
  peripheral_anc: 5000, seizure: false
};
const labs = ["csf_wbc", "csf_rbc", "csf_anc", "csf_protein_mg_dl", "peripheral_anc"];

describe("BMS numeric validity", () => {
  it.each(labs.flatMap((field) => [-1, "-1"].map((value) => ({ field, value }))))(
    "rejects negative $field=$value before producing a risk classification", ({ field, value }) => {
      const result = calculateTool("bacterial_meningitis_score", { ...valid, [field]: value });
      expect(result.score).toBeUndefined();
      expect(result.classification).toBeUndefined();
      expect(result.warnings[0]?.id).toBe("invalid_bms_inputs");
      expect(result.trace).toContainEqual({ inputId: field, value });
    }
  );

  it("keeps measured zeros valid", () => {
    const result = calculateTool("bacterial_meningitis_score", {
      ...valid, csf_rbc: 0, csf_anc: 0, csf_protein_mg_dl: 0, peripheral_anc: 0
    });
    expect(result.score).toBe(0);
    expect(result.classification?.en).toContain("Very low risk");
  });

  it.each([
    ["csf_anc", 999, 0], ["csf_anc", 1000, 1],
    ["csf_protein_mg_dl", 79.9, 0], ["csf_protein_mg_dl", 80, 1],
    ["peripheral_anc", 9999, 0], ["peripheral_anc", 10000, 1]
  ])("preserves the existing %s=%s boundary", (field, value, expected) => {
    expect(calculateTool("bacterial_meningitis_score", { ...valid, [field]: value }).score).toBe(expected);
  });

  it("preserves all 32 valid combinations of the five existing criteria", () => {
    for (let bits = 0; bits < 32; bits++) {
      const gram = Boolean(bits & 1), csfAnc = Boolean(bits & 2), protein = Boolean(bits & 4);
      const peripheral = Boolean(bits & 8), seizure = Boolean(bits & 16);
      const result = calculateTool("bacterial_meningitis_score", {
        ...valid, csf_gram_positive: gram, csf_anc: csfAnc ? 1000 : 999,
        csf_protein_mg_dl: protein ? 80 : 79, peripheral_anc: peripheral ? 10000 : 9999, seizure
      });
      expect(result.score).toBe(Number(gram) * 2 + Number(csfAnc) + Number(protein) + Number(peripheral) + Number(seizure));
    }
  });

  it("preserves eligibility-first handling when scoring labs are not required", () => {
    const { csf_anc, csf_protein_mg_dl, peripheral_anc, ...eligibility } = valid;
    void csf_anc; void csf_protein_mg_dl; void peripheral_anc;
    const result = calculateTool("bacterial_meningitis_score", { ...eligibility, antibiotics_before_lp: true });
    expect(result.score).toBeUndefined();
    expect(result.warnings.some((warning) => warning.id === "bms_not_applicable")).toBe(true);
  });
});
