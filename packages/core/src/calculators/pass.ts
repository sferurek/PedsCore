import type { CalculationResult } from "../types.js";
import {
  getNumericScore,
  getTool,
  missingResult,
  warning
} from "./common.js";
import type { CalculatorDefinition } from "./common.js";

const inputIds = [
  "work_of_breathing",
  "wheezing",
  "prolonged_expiration"
];

export const passCalculator: CalculatorDefinition = {
  toolId: "pass",
  calculate: (input): CalculationResult => {
    const tool = getTool("pass");
    const trace: CalculationResult["trace"] = [];
    const scores: number[] = [];

    for (const inputId of inputIds) {
      if (
        input[inputId] === undefined ||
        input[inputId] === null ||
        input[inputId] === ""
      ) {
        return missingResult(tool.id, inputIds);
      }

      const score = getNumericScore(tool, input, inputId);

      if (score === null || !Number.isInteger(score) || score < 0 || score > 2) {
        return {
          toolId: tool.id,
          warnings: [
            warning(
              "invalid_score_input",
              "Seleccion no valida para PASS.",
              "Invalid PASS selection."
            )
          ],
          trace: [{ inputId, value: input[inputId] }]
        };
      }

      scores.push(score);
      trace.push({ inputId, value: input[inputId], score });
    }

    return {
      toolId: tool.id,
      score: scores.reduce((total, value) => total + value, 0),
      maxScore: 6,
      warnings: [],
      trace
    };
  }
};
