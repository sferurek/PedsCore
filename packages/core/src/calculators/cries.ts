import { findInterpretation, getNumericScore, getTool, missingResult, warning } from "./common.js";
import type { CalculatorDefinition } from "./common.js";

const inputIds = [
  "crying",
  "oxygen",
  "vital_signs",
  "expression",
  "sleeplessness"
] as const;

export const criesCalculator: CalculatorDefinition = {
  toolId: "cries",
  calculate: (input) => {
    const tool = getTool("cries");

    if (inputIds.some((id) => input[id] === undefined || input[id] === null || input[id] === "")) {
      return missingResult(tool.id, [...inputIds]);
    }

    let score = 0;
    const trace = [];

    for (const inputId of inputIds) {
      const value = getNumericScore(tool, input, inputId);
      if (value === null || !Number.isInteger(value) || value < 0 || value > 2) {
        return {
          toolId: tool.id,
          warnings: [
            warning(
              "invalid_cries_item_score",
              `La puntuacion de ${inputId} debe estar entre 0 y 2.`,
              `The ${inputId} score must be between 0 and 2.`
            )
          ],
          trace: [{ inputId, value: input[inputId] }]
        };
      }

      score += value;
      trace.push({ inputId, value: input[inputId], score: value });
    }

    const interpretation = findInterpretation(tool.interpretationBands, score);
    const classification =
      score <= 4
        ? {
            es: "Por debajo del umbral de dolor moderado",
            en: "Below moderate-pain threshold"
          }
        : score <= 7
          ? { es: "Dolor moderado", en: "Moderate pain" }
          : { es: "Dolor grave", en: "Severe pain" };

    return {
      toolId: tool.id,
      score,
      maxScore: 10,
      classification,
      ...(interpretation ? { interpretation } : {}),
      warnings: [],
      trace
    };
  }
};
