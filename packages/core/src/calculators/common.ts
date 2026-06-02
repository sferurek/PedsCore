import type {
  CalculationResult,
  CalculationWarning,
  ClinicalToolMetadata,
  InterpretationBand,
  LocalizedText
} from "../types.js";
import { getToolBySlug } from "../catalog/clinicalTools.js";

export type CalculatorInput = Record<string, unknown>;

export interface CalculatorDefinition {
  toolId: string;
  calculate(input: CalculatorInput): CalculationResult;
}

export const warning = (
  id: string,
  es: string,
  en: string
): CalculationWarning => ({
  id,
  message: { es, en }
});

export const label = (es: string, en: string): LocalizedText => ({ es, en });

export const getTool = (slug: string): ClinicalToolMetadata => {
  const tool = getToolBySlug(slug);

  if (!tool) {
    throw new Error(`Tool not found: ${slug}`);
  }

  return tool;
};

export const getNumericScore = (
  tool: ClinicalToolMetadata,
  input: CalculatorInput,
  inputId: string
): number | null => {
  const value = input[inputId];

  if (typeof value === "number") {
    return Number.isFinite(value) ? value : null;
  }

  if (typeof value === "string") {
    const optionScore = tool.inputs
      ?.find((toolInput) => toolInput.id === inputId)
      ?.options?.find((option) => option.id === value)?.score;

    return typeof optionScore === "number" ? optionScore : null;
  }

  return null;
};

export const getNumber = (
  input: CalculatorInput,
  inputId: string
): number | null => {
  const value = input[inputId];

  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string" && value.trim() !== "") {
    const parsedValue = Number(value);
    return Number.isFinite(parsedValue) ? parsedValue : null;
  }

  return null;
};

export const findInterpretation = (
  bands: InterpretationBand[] | undefined,
  score: number
): InterpretationBand | undefined =>
  bands?.find((band) => {
    const minMatches = band.min === undefined || score >= band.min;
    const maxMatches = band.max === undefined || score <= band.max;
    return minMatches && maxMatches;
  });

export const missingResult = (
  toolId: string,
  inputIds: string[]
): CalculationResult => ({
  toolId,
  warnings: [
    warning(
      "missing_required_inputs",
      "Faltan campos requeridos para calcular el resultado.",
      "Required fields are missing before the result can be calculated."
    )
  ],
  trace: inputIds.map((inputId) => ({ inputId, value: undefined }))
});

export const invalidScoreResult = (
  toolId: string,
  inputId: string,
  value: unknown
): CalculationResult => ({
  toolId,
  warnings: [
    warning(
      "invalid_score_input",
      "Cada campo de puntuacion debe tener un valor entre 0 y 2.",
      "Each scoring field must have a value between 0 and 2."
    )
  ],
  trace: [{ inputId, value }]
});

export const sumScoreTool = (
  tool: ClinicalToolMetadata,
  input: CalculatorInput,
  inputIds: string[]
): CalculationResult => {
  const scores: number[] = [];
  const trace = [];

  for (const inputId of inputIds) {
    if (input[inputId] === undefined || input[inputId] === null || input[inputId] === "") {
      return missingResult(tool.id, inputIds);
    }

    const score = getNumericScore(tool, input, inputId);

    if (score === null || score < 0 || score > 2) {
      return invalidScoreResult(tool.id, inputId, input[inputId]);
    }

    scores.push(score);
    trace.push({ inputId, value: input[inputId], score });
  }

  const score = scores.reduce((total, value) => total + value, 0);
  const interpretation = findInterpretation(tool.interpretationBands, score);

  return {
    toolId: tool.id,
    score,
    ...(interpretation ? { interpretation } : {}),
    warnings: [],
    trace
  };
};
