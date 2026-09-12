import { getNumericScore, getTool, missingResult, warning, findInterpretation } from "./common.js";
import type { CalculatorDefinition } from "./common.js";

const inputIds = [
  "heart_rate",
  "respiratory_effort",
  "muscle_tone",
  "reflex_irritability",
  "color"
];

const requiredInputIds = ["assessment_time", ...inputIds];

export const apgarCalculator: CalculatorDefinition = {
  toolId: "apgar",
  calculate: (input) => {
    const tool = getTool("apgar");
    if (requiredInputIds.some((inputId) => input[inputId] === undefined || input[inputId] === null || input[inputId] === "")) {
      return missingResult(tool.id, requiredInputIds);
    }

    const trace = [];
    const scores: number[] = [];
    for (const inputId of inputIds) {
      const score = getNumericScore(tool, input, inputId);
      if (score === null || score < 0 || score > 2) {
        return {
          toolId: tool.id,
          warnings: [warning("invalid_score_input", "Cada dominio de Apgar debe tener un valor entre 0 y 2.", "Each Apgar domain must have a value between 0 and 2.")],
          trace: [{ inputId, value: input[inputId] }]
        };
      }
      scores.push(score);
      trace.push({ inputId, value: input[inputId], score });
    }

    const score = scores.reduce((total, value) => total + value, 0);
    const interpretation = input.assessment_time === "five_minutes"
      ? findInterpretation(tool.interpretationBands, score)
      : undefined;

    return {
      toolId: tool.id,
      score,
      maxScore: 10,
      ...(interpretation ? { interpretation } : {}),
      warnings: [],
      trace: [{ inputId: "assessment_time", value: input.assessment_time }, ...trace]
    };
  }
};
