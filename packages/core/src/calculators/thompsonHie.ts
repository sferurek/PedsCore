import { findInterpretation, getNumber, getTool, missingResult, warning } from "./common.js";
import type { CalculatorDefinition } from "./common.js";

const itemRanges = {
  tone: [0, 3],
  consciousness: [0, 3],
  seizures: [0, 2],
  posture: [0, 3],
  moro: [0, 2],
  grasp: [0, 2],
  suck: [0, 2],
  respiration: [0, 3],
  fontanelle: [0, 2]
} as const;

const inputIds = Object.keys(itemRanges) as Array<keyof typeof itemRanges>;

export const thompsonHieCalculator: CalculatorDefinition = {
  toolId: "thompson_hie",
  calculate: (input) => {
    const tool = getTool("thompson-hie-score");

    if (inputIds.some((id) => input[id] === undefined || input[id] === null || input[id] === "")) {
      return missingResult(tool.id, inputIds);
    }

    let score = 0;
    const trace = [];

    for (const inputId of inputIds) {
      const value = getNumber(input, inputId);
      const [min, max] = itemRanges[inputId];

      if (value === null || !Number.isInteger(value) || value < min || value > max) {
        return {
          toolId: tool.id,
          warnings: [
            warning(
              "invalid_thompson_item_score",
              `La puntuacion de ${inputId} debe ser un numero entero entre ${min} y ${max}.`,
              `The ${inputId} score must be an integer from ${min} to ${max}.`
            )
          ],
          trace: [{ inputId, value: input[inputId] }]
        };
      }

      score += value;
      trace.push({ inputId, value, score: value });
    }

    const interpretation = findInterpretation(tool.interpretationBands, score);
    const classification =
      score === 0
        ? { es: "Sin anormalidades puntuadas", en: "No scored abnormalities" }
        : score <= 10
          ? { es: "Rango leve (convencion AAP)", en: "Mild range (AAP convention)" }
          : score <= 14
            ? { es: "Rango moderado", en: "Moderate range" }
            : { es: "Rango grave", en: "Severe range" };

    return {
      toolId: tool.id,
      score,
      maxScore: 22,
      classification,
      ...(interpretation ? { interpretation } : {}),
      warnings: [],
      trace
    };
  }
};
