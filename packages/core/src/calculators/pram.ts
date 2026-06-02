import type { CalculationResult } from "../types.js";
import {
  findInterpretation,
  getNumber,
  getNumericScore,
  getTool,
  invalidScoreResult,
  missingResult,
  warning
} from "./common.js";
import type { CalculatorDefinition } from "./common.js";

const optionInputIds = [
  "suprasternal_retractions",
  "scalene_muscle_contraction",
  "air_entry",
  "wheezing"
];

const oxygenSaturationScore = (spo2: number): number => {
  if (spo2 >= 95) {
    return 0;
  }

  if (spo2 >= 92) {
    return 1;
  }

  return 2;
};

export const pramCalculator: CalculatorDefinition = {
  toolId: "pram",
  calculate: (input): CalculationResult => {
    const tool = getTool("pram");
    const oxygenSaturation = getNumber(input, "oxygen_saturation");

    if (oxygenSaturation === null) {
      return missingResult(tool.id, [...optionInputIds, "oxygen_saturation"]);
    }

    if (oxygenSaturation < 0 || oxygenSaturation > 100) {
      return {
        toolId: tool.id,
        warnings: [
          warning(
            "invalid_oxygen_saturation",
            "La saturacion de oxigeno debe estar entre 0 y 100%.",
            "Oxygen saturation must be between 0 and 100%."
          )
        ],
        trace: [{ inputId: "oxygen_saturation", value: oxygenSaturation }]
      };
    }

    const oxygenScore = oxygenSaturationScore(oxygenSaturation);
    const scores = [oxygenScore];
    const trace: CalculationResult["trace"] = [
      {
        inputId: "oxygen_saturation",
        value: oxygenSaturation,
        score: oxygenScore
      }
    ];

    for (const inputId of optionInputIds) {
      if (input[inputId] === undefined || input[inputId] === null || input[inputId] === "") {
        return missingResult(tool.id, [...optionInputIds, "oxygen_saturation"]);
      }

      const score = getNumericScore(tool, input, inputId);

      if (score === null || score < 0 || score > 3) {
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
      maxScore: 12,
      ...(interpretation ? { interpretation } : {}),
      warnings: [],
      trace
    };
  }
};
