import type { ClinicalToolMetadata, ToolInput } from "@peds-core/core";

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

const isEmpty = (value: FormValue): boolean => {
  if (Array.isArray(value)) {
    return value.length === 0;
  }

  return value === null || value === "";
};

export const getMissingRequiredInputs = (
  tool: ClinicalToolMetadata,
  values: FormValues
): string[] =>
  (tool.inputs ?? [])
    .filter((input) => input.required && isEmpty(values[input.id] ?? null))
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

