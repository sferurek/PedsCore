import type { CalculationResult } from "../types.js";
import {
  getNumericScore,
  getTool,
  missingResult,
  warning
} from "./common.js";
import type { CalculatorDefinition } from "./common.js";

const inputIds = ["age_group", "eye_response", "verbal_response", "motor_response"];

export const pediatricGcsCalculator: CalculatorDefinition = {
  toolId: "pediatric_gcs",
  calculate: (input): CalculationResult => {
    const tool = getTool("pediatric-glasgow-coma-scale");

    for (const inputId of inputIds) {
      if (
        input[inputId] === undefined ||
        input[inputId] === null ||
        input[inputId] === ""
      ) {
        return missingResult(tool.id, inputIds);
      }
    }

    if (!["preverbal_under_2", "verbal_2_or_more"].includes(String(input.age_group))) {
      return {
        toolId: tool.id,
        warnings: [
          warning(
            "invalid_age_group",
            "Selecciona el grupo pediatrico aplicable para pGCS.",
            "Select the applicable pediatric group for pGCS."
          )
        ],
        trace: [{ inputId: "age_group", value: input.age_group }]
      };
    }

    const trace: CalculationResult["trace"] = [
      { inputId: "age_group", value: input.age_group }
    ];
    const ranges: Record<string, [number, number]> = {
      eye_response: [1, 4],
      verbal_response: [1, 5],
      motor_response: [1, 6]
    };
    const scores: number[] = [];

    for (const inputId of ["eye_response", "verbal_response", "motor_response"]) {
      const score = getNumericScore(tool, input, inputId);
      const [min, max] = ranges[inputId];

      if (score === null || !Number.isInteger(score) || score < min || score > max) {
        return {
          toolId: tool.id,
          warnings: [
            warning(
              "invalid_score_input",
              "Seleccion no valida para pGCS.",
              "Invalid pGCS selection."
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
      maxScore: 15,
      warnings: [],
      trace
    };
  }
};
