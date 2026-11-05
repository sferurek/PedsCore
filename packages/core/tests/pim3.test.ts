import { describe, expect, it } from "vitest";
import { getToolBySlug, pim3Calculator } from "../src/index.js";

const unknownReference = {
  both_pupils_fixed: false,
  elective_admission: false,
  mechanical_ventilation_first_hour: false,
  base_excess_unknown: true,
  sbp_unknown: true,
  oxygenation_unknown: true,
  procedure_category: "none",
  diagnosis_risk_group: "none"
};

const traceValue = (result: ReturnType<typeof pim3Calculator.calculate>, id: string) =>
  result.trace.find((item) => item.inputId === id)?.value;

describe("PIM3 equation/reference checks", () => {
  it("matches published coding for unknown physiologic variables", () => {
    const result = pim3Calculator.calculate(unknownReference);
    expect(traceValue(result, "base_excess_mmol_l")).toBe(0);
    expect(traceValue(result, "systolic_bp_mmhg")).toBe(120);
    expect(traceValue(result, "oxygen_term")).toBe(0.23);
    expect(traceValue(result, "pim3_logit")).toBe(-4.39684);
    expect(result.value).toBe(1.22);
  });

  it("matches the published regression equation for a high-risk reference fixture", () => {
    const result = pim3Calculator.calculate({
      both_pupils_fixed: true,
      elective_admission: false,
      mechanical_ventilation_first_hour: true,
      base_excess_unknown: false,
      base_excess_mmol_l: -10,
      sbp_unknown: false,
      systolic_bp_mmhg: 60,
      oxygenation_unknown: false,
      fio2_fraction: 0.8,
      pao2_mmhg: 50,
      procedure_category: "none",
      diagnosis_risk_group: "very_high"
    });
    expect(traceValue(result, "oxygen_term")).toBe(1.6);
    expect(traceValue(result, "pim3_logit")).toBe(4.0063);
    expect(result.value).toBe(98.21);
  });

  it.each([
    { procedure_category: "INVALID" },
    { diagnosis_risk_group: "INVALID" },
    { procedure_category: "", diagnosis_risk_group: "" },
    { diagnosis_risk_group: "HIGH" }
  ])("rejects unsupported category strings without producing a probability: %j", (invalid) => {
    const result = pim3Calculator.calculate({ ...unknownReference, ...invalid });
    expect(result.value).toBeUndefined();
    expect(result.score).toBeUndefined();
    expect(result.warnings[0]?.id).toBe("invalid_pim3_categories");
    expect(result.trace).toEqual([]);
  });

  it("retains every catalogued category combination", () => {
    const tool = getToolBySlug("pim3")!;
    const procedures = tool.inputs!.find(input => input.id === "procedure_category")!.options!;
    const risks = tool.inputs!.find(input => input.id === "diagnosis_risk_group")!.options!;
    for (const { id: procedure_category } of procedures) {
      for (const { id: diagnosis_risk_group } of risks) {
        const result = pim3Calculator.calculate({ ...unknownReference, procedure_category, diagnosis_risk_group });
        expect(result.value).toBeTypeOf("number");
        expect(result.warnings.some(warning => warning.id === "invalid_pim3_categories")).toBe(false);
      }
    }
  });

  it("applies procedure and diagnosis coefficients in the expected direction", () => {
    const baseline = pim3Calculator.calculate(unknownReference);
    const bypass = pim3Calculator.calculate({ ...unknownReference, procedure_category: "cardiac_bypass" });
    const noncardiac = pim3Calculator.calculate({ ...unknownReference, procedure_category: "noncardiac" });
    const veryHigh = pim3Calculator.calculate({ ...unknownReference, diagnosis_risk_group: "very_high" });
    const low = pim3Calculator.calculate({ ...unknownReference, diagnosis_risk_group: "low" });

    expect(Number(traceValue(bypass, "pim3_logit"))).toBeLessThan(Number(traceValue(baseline, "pim3_logit")));
    expect(Number(traceValue(noncardiac, "pim3_logit"))).toBeLessThan(Number(traceValue(bypass, "pim3_logit")));
    expect(Number(traceValue(veryHigh, "pim3_logit"))).toBeGreaterThan(Number(traceValue(baseline, "pim3_logit")));
    expect(Number(traceValue(low, "pim3_logit"))).toBeLessThan(Number(traceValue(baseline, "pim3_logit")));
  });
});
