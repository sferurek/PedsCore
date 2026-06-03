import { getAllTools, getToolBySlug } from "@peds-core/core";
import { describe, expect, it } from "vitest";
import {
  canPrepareResult,
  getFirstInputId,
  getInitialFormState,
  getInputSummary,
  getNextIncompleteInputId,
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
