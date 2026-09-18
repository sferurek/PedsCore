import type { CalculationResult } from "../types.js";
import { getNumericScore, getTool, missingResult, warning } from "./common.js";
import type { CalculatorDefinition } from "./common.js";

const inputIds = [
  "subjective_clinical_assessment",
  "high_risk_disease",
  "reduced_intake_or_losses",
  "weight_loss_or_poor_gain"
] as const;

export const strongkidsCalculator: CalculatorDefinition = {
  toolId: "strongkids",
  calculate: (input): CalculationResult => {
    const tool = getTool("strongkids");

    for (const inputId of inputIds) {
      if (input[inputId] === undefined || input[inputId] === null || input[inputId] === "") {
        return missingResult(tool.id, [...inputIds]);
      }
    }

    let total = 0;
    const trace: CalculationResult["trace"] = [];

    for (const inputId of inputIds) {
      const score = getNumericScore(tool, input, inputId);

      if (score === null || !Number.isInteger(score)) {
        return {
          toolId: tool.id,
          warnings: [
            warning(
              "invalid_strongkids_input",
              "Seleccion no valida para STRONGkids.",
              "Invalid STRONGkids selection."
            )
          ],
          trace: [{ inputId, value: input[inputId] }]
        };
      }

      total += score;
      trace.push({ inputId, value: input[inputId], score });
    }

    const classification =
      total === 0
        ? {
            es: "Riesgo nutricional bajo",
            en: "Low nutritional risk"
          }
        : total <= 3
          ? {
              es: "Riesgo nutricional moderado",
              en: "Moderate nutritional risk"
            }
          : {
              es: "Riesgo nutricional alto",
              en: "High nutritional risk"
            };

    return {
      toolId: tool.id,
      score: total,
      maxScore: 5,
      label: {
        es: `STRONGkids: ${total}/5`,
        en: `STRONGkids: ${total}/5`
      },
      classification,
      warnings: [],
      trace
    };
  }
};
