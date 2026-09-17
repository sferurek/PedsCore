import { getNumericScore, getTool, missingResult, warning } from "./common.js";
import type { CalculatorDefinition } from "./common.js";

const inputIds = [
  "expiratory_wheeze",
  "inspiratory_wheeze",
  "wheeze_extent",
  "supraclavicular_retractions",
  "intercostal_retractions",
  "subcostal_retractions"
] as const;

const maxima: Record<(typeof inputIds)[number], number> = {
  expiratory_wheeze: 4,
  inspiratory_wheeze: 2,
  wheeze_extent: 2,
  supraclavicular_retractions: 3,
  intercostal_retractions: 3,
  subcostal_retractions: 3
};

export const rdaiCalculator: CalculatorDefinition = {
  toolId: "rdai",
  calculate: (input) => {
    const tool = getTool("rdai");
    if (inputIds.some((id) => input[id] === undefined || input[id] === null || input[id] === "")) {
      return missingResult(tool.id, [...inputIds]);
    }
    let score = 0;
    const trace = [];
    for (const inputId of inputIds) {
      const value = getNumericScore(tool, input, inputId);
      const max = maxima[inputId];
      if (value === null || !Number.isInteger(value) || value < 0 || value > max) {
        return {
          toolId: tool.id,
          warnings: [warning(
            "invalid_rdai_item_score",
            `La puntuacion de ${inputId} debe ser un entero entre 0 y ${max}.`,
            `The ${inputId} score must be an integer from 0 to ${max}.`
          )],
          trace: [{ inputId, value: input[inputId] }]
        };
      }
      score += value;
      trace.push({ inputId, value: input[inputId], score: value });
    }
    return {
      toolId: tool.id,
      score,
      maxScore: 17,
      classification: {
        es: `RDAI ${score}/17 · medida descriptiva del distrés respiratorio`,
        en: `RDAI ${score}/17 · descriptive respiratory-distress measure`
      },
      warnings: [warning(
        "rdai_no_decision_thresholds",
        "El RDAI no debe usarse aisladamente para decidir tratamiento, ingreso o alta.",
        "RDAI must not be used alone to determine treatment, admission, or discharge."
      )],
      trace
    };
  }
};
