import type { CalculationResult } from "../types.js";
import {
  findInterpretation,
  getNumericScore,
  getTool,
  invalidScoreResult,
  missingResult,
  warning
} from "./common.js";
import type { CalculatorDefinition } from "./common.js";

const inputIds = [
  "facial_expression",
  "cry",
  "breathing_patterns",
  "arms",
  "legs",
  "state_of_arousal"
];

const maxScoreByInput = new Map([
  ["facial_expression", 1],
  ["cry", 2],
  ["breathing_patterns", 1],
  ["arms", 1],
  ["legs", 1],
  ["state_of_arousal", 1]
]);

export const nipsCalculator: CalculatorDefinition = {
  toolId: "nips",
  calculate: (input): CalculationResult => {
    const tool = getTool("nips");
    const scores: number[] = [];
    const trace: CalculationResult["trace"] = [];

    for (const inputId of inputIds) {
      if (input[inputId] === undefined || input[inputId] === null || input[inputId] === "") {
        return missingResult(tool.id, inputIds);
      }

      const score = getNumericScore(tool, input, inputId);
      const maxScore = maxScoreByInput.get(inputId) ?? 1;

      if (score === null || score < 0 || score > maxScore) {
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
      maxScore: 7,
      ...(interpretation ? { interpretation } : {}),
      warnings: [
        warning(
          "nips_context_required",
          "Resultado informativo. Interpretar en contexto clinico y protocolos locales.",
          "Informational result. Interpret in clinical context and local protocols."
        )
      ],
      trace
    };
  }
};
