import { getAllTools, getToolBySlug } from "@peds-core/core";
import { describe, expect, it } from "vitest";
import {
  canPrepareResult,
  clearHiddenInputValues,
  getFirstInputId,
  getInitialFormState,
  getInputSummary,
  getNextIncompleteInputId,
  getVisibleInputs,
  isInputVisible,
  hasActiveForm,
  isInputComplete,
  validateForm
} from "./formState";

describe("form state utilities", () => {
  it("creates an initial state for active forms", () => {
    const apgar = getToolBySlug("apgar");
    expect(apgar).toBeDefined();

    const state = getInitialFormState(apgar!);
    expect(Object.keys(state)).toContain("heart_rate");
  });

  it("detects missing required fields", () => {
    const apgar = getToolBySlug("apgar");
    const state = getInitialFormState(apgar!);
    const validation = validateForm(apgar!, state);

    expect(validation.isComplete).toBe(false);
    expect(validation.missingRequiredInputIds.length).toBeGreaterThan(0);
  });

  it("distinguishes tools with and without active forms", () => {
    const apgar = getToolBySlug("apgar");
    const comingSoonTool = getAllTools().find((tool) => !tool.inputs?.length);

    expect(hasActiveForm(apgar!)).toBe(true);
    expect(hasActiveForm(comingSoonTool!)).toBe(false);
  });

  it("does not prepare results until required fields are complete", () => {
    const flacc = getToolBySlug("flacc");
    const state = getInitialFormState(flacc!);

    expect(canPrepareResult(flacc!, state)).toBe(false);
  });

  it("opens the first input by default", () => {
    const apgar = getToolBySlug("apgar");

    expect(getFirstInputId(apgar!)).toBe(apgar?.inputs?.[0]?.id);
  });

  it("opens the first required input when optional inputs exist first", () => {
    const apgar = getToolBySlug("apgar");
    const [firstInput, secondInput] = apgar?.inputs ?? [];
    const tool = {
      ...apgar!,
      inputs: [
        { ...firstInput!, required: false },
        { ...secondInput!, required: true }
      ]
    };

    expect(getFirstInputId(tool)).toBe(secondInput?.id);
  });

  it("finds the next incomplete required input", () => {
    const apgar = getToolBySlug("apgar");
    const heartRate = apgar?.inputs?.find((input) => input.id === "heart_rate");
    const state = {
      ...getInitialFormState(apgar!),
      heart_rate: heartRate?.options?.[0]?.id ?? ""
    };

    expect(getNextIncompleteInputId(apgar!, state, "heart_rate")).toBe(
      "respiratory_effort"
    );
  });

  it("detects complete forms", () => {
    const apgar = getToolBySlug("apgar");
    const state = Object.fromEntries(
      (apgar?.inputs ?? []).map((input) => [input.id, input.options?.[0]?.id ?? "1"])
    );

    expect(validateForm(apgar!, state).isComplete).toBe(true);
    expect(getNextIncompleteInputId(apgar!, state)).toBeNull();
  });

  it("rejects invalid numeric inputs", () => {
    const numericInput = {
      id: "age",
      label: { es: "Edad", en: "Age" },
      type: "number" as const,
      required: true,
      min: 1,
      max: 10
    };

    expect(isInputComplete(numericInput, "")).toBe(false);
    expect(
      isInputComplete(numericInput, 12)
    ).toBe(false);
  });

  it("hides conditional inputs until all visibility conditions are met", () => {
    const tool = getAllTools().find((item) => item.id === "step_by_step");
    expect(tool).toBeDefined();

    const initial = getInitialFormState(tool!);
    expect(getVisibleInputs(tool!, initial).map((input) => input.id)).toEqual([
      "age_days",
      "fever_without_source"
    ]);

    const afterEligibility = {
      ...initial,
      age_days: 30,
      fever_without_source: true
    };
    expect(getVisibleInputs(tool!, afterEligibility).map((input) => input.id)).toContain(
      "well_appearing"
    );
    expect(getVisibleInputs(tool!, afterEligibility).map((input) => input.id)).not.toContain(
      "crp_mg_l"
    );

    const lowHighRiskScreen = {
      ...afterEligibility,
      well_appearing: true,
      leukocyturia: false,
      procalcitonin_ng_ml: 0.2
    };
    const visible = getVisibleInputs(tool!, lowHighRiskScreen).map((input) => input.id);
    expect(visible).toContain("crp_mg_l");
    expect(visible).toContain("anc");
  });

  it("clears stale values from fields that become hidden", () => {
    const tool = getAllTools().find((item) => item.id === "step_by_step");
    expect(tool).toBeDefined();

    const values = {
      ...getInitialFormState(tool!),
      age_days: 30,
      fever_without_source: true,
      well_appearing: true,
      leukocyturia: false,
      procalcitonin_ng_ml: 0.2,
      crp_mg_l: 5,
      anc: 3000
    };

    const next = clearHiddenInputValues(tool!, {
      ...values,
      leukocyturia: true
    });

    expect(next.procalcitonin_ng_ml).toBe("");
    expect(next.crp_mg_l).toBe("");
    expect(next.anc).toBe("");
  });

  it("adapts CHALICE and Phoenix to eligibility answers", () => {
    const chalice = getAllTools().find((item) => item.id === "chalice_tbi");
    const phoenix = getAllTools().find((item) => item.id === "phoenix_sepsis");
    expect(chalice).toBeDefined();
    expect(phoenix).toBeDefined();

    const chaliceInitial = getInitialFormState(chalice!);
    expect(getVisibleInputs(chalice!, chaliceInitial).map((input) => input.id)).toEqual([
      "age_years",
      "head_injury_present"
    ]);
    expect(
      getVisibleInputs(chalice!, { ...chaliceInitial, age_years: 8, head_injury_present: true })
        .map((input) => input.id)
    ).toContain("focal_neurology");

    const phoenixInitial = getInitialFormState(phoenix!);
    expect(getVisibleInputs(phoenix!, phoenixInitial).map((input) => input.id)).toEqual([
      "age_months",
      "suspected_infection",
      "birth_hospitalization_before_discharge",
      "postconceptional_age_at_least_37_weeks"
    ]);
    expect(
      getVisibleInputs(phoenix!, {
        ...phoenixInitial,
        age_months: 36,
        suspected_infection: true,
        birth_hospitalization_before_discharge: false,
        postconceptional_age_at_least_37_weeks: true
      }).map((input) => input.id)
    ).toContain("map_mmhg");
  });

  it("does not require hidden conditional inputs", () => {
    const tool = getToolBySlug("pim3");
    const state = {
      ...getInitialFormState(tool!),
      both_pupils_fixed: false,
      elective_admission: false,
      mechanical_ventilation_first_hour: false,
      base_excess_unknown: true,
      sbp_unknown: true,
      oxygenation_unknown: true,
      procedure_category: "none",
      diagnosis_risk_group: "none"
    };

    expect(validateForm(tool!, state).isComplete).toBe(true);
    const baseExcess = tool?.inputs?.find((input) => input.id === "base_excess_mmol_l");
    expect(isInputVisible(baseExcess!, state)).toBe(false);
  });

  it("summarizes selected input values", () => {
    const apgar = getToolBySlug("apgar");
    const input = apgar?.inputs?.find((item) => item.id === "heart_rate");
    const option = input?.options?.[0];

    expect(getInputSummary(input!, option?.id ?? "", "es")).toBe(option?.label.es);
  });

  it("summarizes boolean, select and multi-select values", () => {
    const input = {
      id: "example",
      label: { es: "Ejemplo", en: "Example" },
      type: "select" as const,
      required: true,
      options: [
        { id: "mild", label: { es: "Leve", en: "Mild" }, value: "mild" },
        { id: "severe", label: { es: "Grave", en: "Severe" }, value: "severe" }
      ]
    };

    expect(getInputSummary({ ...input, type: "boolean" }, true, "es")).toBe("Si");
    expect(getInputSummary(input, "severe", "en")).toBe("Severe");
    expect(getInputSummary({ ...input, type: "multi_select" }, ["mild", "severe"], "es")).toBe(
      "Leve, Grave"
    );
  });
});
