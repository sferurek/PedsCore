import type { CalculationResult } from "../types.js";
import {
  findInterpretation,
  getNumericScore,
  getTool,
  invalidScoreResult,
  missingResult
} from "./common.js";
import type { CalculatorDefinition } from "./common.js";

const inputIds = [
  "level_of_consciousness",
  "cyanosis",
  "stridor",
  "air_entry",
  "retractions"
];

export const westleyCroupCalculator: CalculatorDefinition = {
  toolId: "westley_croup",
  calculate: (input): CalculationResult => {
    const tool = getTool("westley-croup-score");
    const scores: number[] = [];
    const trace: CalculationResult["trace"] = [];

    for (const inputId of inputIds) {
      if (input[inputId] === undefined || input[inputId] === null || input[inputId] === "") {
        return missingResult(tool.id, inputIds);
      }

      const score = getNumericScore(tool, input, inputId);

      if (score === null || score < 0 || score > 5) {
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
      maxScore: 17,
      ...(interpretation ? { interpretation } : {}),
      warnings: [],
      trace
    };
  }
};
