import { getNumber, getTool, missingResult, warning } from "./common.js";
import type { CalculatorDefinition } from "./common.js";

const itemRanges = {
  posture: [0, 4],
  square_window: [-1, 4],
  arm_recoil: [0, 4],
  popliteal_angle: [-1, 5],
  scarf_sign: [-1, 4],
  heel_to_ear: [-1, 4],
  skin: [-1, 5],
  lanugo: [0, 4],
  plantar_surface: [-2, 4],
  breast: [-1, 4],
  eye_ear: [-2, 4],
  genitals: [-1, 4]
} as const;

const neuromuscularIds = [
  "posture",
  "square_window",
  "arm_recoil",
  "popliteal_angle",
  "scarf_sign",
  "heel_to_ear"
] as const;

const physicalIds = [
  "skin",
  "lanugo",
  "plantar_surface",
  "breast",
  "eye_ear",
  "genitals"
] as const;

const inputIds = [...neuromuscularIds, ...physicalIds];

const completedGestationalWeeks = (score: number): number | null => {
  if (score < -10 || score > 50) return null;

  // Linear interpolation between the official 5-point / 2-week grid anchors,
  // recorded as completed weeks (rounding down), per Ballard's published FAQ.
  return Math.floor(20 + ((score + 10) * 2) / 5);
};

export const ballardCalculator: CalculatorDefinition = {
  toolId: "ballard",
  calculate: (input) => {
    const tool = getTool("ballard");

    if (inputIds.some((id) => input[id] === undefined || input[id] === null || input[id] === "")) {
      return missingResult(tool.id, inputIds);
    }

    const trace = [];
    const values: Record<string, number> = {};

    for (const inputId of inputIds) {
      const value = getNumber(input, inputId);
      const [min, max] = itemRanges[inputId];

      if (value === null || !Number.isInteger(value) || value < min || value > max) {
        return {
          toolId: tool.id,
          warnings: [
            warning(
              "invalid_ballard_item_score",
              `La puntuacion de ${inputId} debe ser un numero entero entre ${min} y ${max}.`,
              `The ${inputId} score must be an integer from ${min} to ${max}.`
            )
          ],
          trace: [{ inputId, value: input[inputId] }]
        };
      }

      values[inputId] = value;
      trace.push({ inputId, value, score: value });
    }

    const neuromuscularScore = neuromuscularIds.reduce((sum, id) => sum + (values[id] ?? 0), 0);
    const physicalScore = physicalIds.reduce((sum, id) => sum + (values[id] ?? 0), 0);
    const score = neuromuscularScore + physicalScore;
    const weeks = completedGestationalWeeks(score);

    if (weeks === null) {
      return {
        toolId: tool.id,
        score,
        maxScore: 50,
        warnings: [
          warning(
            "ballard_total_outside_maturity_grid",
            "La suma de puntuaciones es valida por item pero queda fuera de la tabla oficial de madurez (-10 a 50); no se asigna edad gestacional.",
            "The individual item scores are valid but the total falls outside the official maturity grid (-10 to 50); no gestational age is assigned."
          )
        ],
        trace
      };
    }

    return {
      toolId: tool.id,
      score,
      maxScore: 50,
      classification: {
        es: `Edad gestacional estimada: ${weeks} semanas completas (neuromuscular ${neuromuscularScore}; fisica ${physicalScore}).`,
        en: `Estimated gestational age: ${weeks} completed weeks (neuromuscular ${neuromuscularScore}; physical ${physicalScore}).`
      },
      warnings: [],
      trace
    };
  }
};
