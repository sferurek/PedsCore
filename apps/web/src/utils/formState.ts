import type { ClinicalToolMetadata, ToolInput } from "@peds-core/core";
import type { Language } from "./language";

export type FormValue = string | number | boolean | string[] | null;
export type FormValues = Record<string, FormValue>;

export interface FormValidation {
  isComplete: boolean;
  missingRequiredInputIds: string[];
}

export const hasActiveForm = (tool: ClinicalToolMetadata): boolean =>
  Boolean(tool.inputs?.length);

const emptyValueForInput = (input: ToolInput): FormValue => {
  if (input.type === "multi_select") {
    return [];
  }

  if (input.type === "boolean") {
    return null;
  }

  return "";
};

export const getInitialFormState = (tool: ClinicalToolMetadata): FormValues =>
  Object.fromEntries(
    (tool.inputs ?? []).map((input) => [input.id, emptyValueForInput(input)])
  );

export const isEmptyFormValue = (value: FormValue): boolean => {
  if (Array.isArray(value)) {
    return value.length === 0;
  }

  return value === null || value === "";
};

const conditionMatches = (
  actual: FormValue,
  operator: NonNullable<ToolInput["visibleWhen"]>[number]["operator"],
  expected: string | number | boolean
): boolean => {
  if (actual === null || actual === "" || Array.isArray(actual)) return false;

  if (operator === "equals") return actual === expected;
  if (operator === "not_equals") return actual !== expected;

  const actualNumber = typeof actual === "number" ? actual : Number(actual);
  const expectedNumber = typeof expected === "number" ? expected : Number(expected);
  if (!Number.isFinite(actualNumber) || !Number.isFinite(expectedNumber)) return false;

  if (operator === "lt") return actualNumber < expectedNumber;
  if (operator === "lte") return actualNumber <= expectedNumber;
  if (operator === "gt") return actualNumber > expectedNumber;
  return actualNumber >= expectedNumber;
};

export const isInputVisible = (
  input: ToolInput,
  values: FormValues
): boolean =>
  !input.visibleWhen?.length ||
  input.visibleWhen.every((condition) =>
    conditionMatches(
      values[condition.inputId] ?? null,
      condition.operator,
      condition.value
    )
  );

export const getVisibleInputs = (
  tool: ClinicalToolMetadata,
  values: FormValues
): ToolInput[] =>
  (tool.inputs ?? []).filter((input) => isInputVisible(input, values));

export const isInputComplete = (
  input: ToolInput,
  value: FormValue
): boolean => {
  if (!input.required) {
    return true;
  }

  if (isEmptyFormValue(value)) {
    return false;
  }

  if (input.type === "number") {
    const numericValue =
      typeof value === "number" ? value : Number.parseFloat(String(value));

    if (Number.isNaN(numericValue)) {
      return false;
    }

    if (input.min !== undefined && numericValue < input.min) {
      return false;
    }

    if (input.max !== undefined && numericValue > input.max) {
      return false;
    }
  }

  return true;
};

export const getMissingRequiredInputs = (
  tool: ClinicalToolMetadata,
  values: FormValues
): string[] =>
  getVisibleInputs(tool, values)
    .filter((input) => !isInputComplete(input, values[input.id] ?? null))
    .map((input) => input.id);

export const validateForm = (
  tool: ClinicalToolMetadata,
  values: FormValues
): FormValidation => {
  const missingRequiredInputIds = getMissingRequiredInputs(tool, values);

  return {
    isComplete: missingRequiredInputIds.length === 0,
    missingRequiredInputIds
  };
};

export const canPrepareResult = (
  tool: ClinicalToolMetadata,
  values: FormValues
): boolean => hasActiveForm(tool) && validateForm(tool, values).isComplete;

export const getFirstInputId = (
  tool: ClinicalToolMetadata,
  values: FormValues = getInitialFormState(tool)
): string | null => {
  const inputs = getVisibleInputs(tool, values);
  return inputs.find((input) => input.required)?.id ?? inputs[0]?.id ?? null;
};

export const getNextIncompleteInputId = (
  tool: ClinicalToolMetadata,
  values: FormValues,
  currentInputId?: string
): string | null => {
  const inputs = getVisibleInputs(tool, values);
  const currentIndex = currentInputId
    ? inputs.findIndex((input) => input.id === currentInputId)
    : -1;
  const orderedInputs =
    currentIndex >= 0
      ? [...inputs.slice(currentIndex + 1), ...inputs.slice(0, currentIndex + 1)]
      : inputs;
  const nextInput = orderedInputs.find(
    (input) => input.required && !isInputComplete(input, values[input.id] ?? null)
  );

  return nextInput?.id ?? null;
};

export const getInputSummary = (
  input: ToolInput,
  value: FormValue,
  language: Language
): string => {
  if (isEmptyFormValue(value)) {
    return "";
  }

  if (input.type === "boolean") {
    return value === true
      ? language === "es" ? "Si" : "Yes"
      : language === "es" ? "No" : "No";
  }

  if (input.type === "number") {
    return `${value}${input.unit ? ` ${input.unit}` : ""}`;
  }

  if (input.type === "multi_select" && Array.isArray(value)) {
    return value
      .map((item) => input.options?.find((option) => option.id === item)?.label[language] ?? item)
      .join(", ");
  }

  if (typeof value === "string") {
    return input.options?.find((option) => option.id === value)?.label[language] ?? value;
  }

  return String(value);
};
