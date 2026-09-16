import { getNumber, getTool, missingResult, warning } from "./common.js";
import type { CalculatorDefinition } from "./common.js";

const itemRanges = {
  posture: [0, 4],
  square_window: [0, 4],
  ankle_dorsiflexion: [0, 4],
  arm_recoil: [0, 2],
  leg_recoil: [0, 2],
  popliteal_angle: [0, 5],
  heel_to_ear: [0, 4],
  scarf_sign: [0, 3],
  head_lag: [0, 3],
  ventral_suspension: [0, 4],
  edema: [0, 2],
  skin_texture: [0, 4],
  skin_color: [0, 3],
  skin_opacity: [0, 4],
  lanugo: [0, 4],
  plantar_creases: [0, 4],
  nipple_formation: [0, 3],
  breast_size: [0, 3],
  ear_form: [0, 3],
  ear_firmness: [0, 3],
  genitals: [0, 2]
} as const;

const inputIds = Object.keys(itemRanges) as Array<keyof typeof itemRanges>;

export const dubowitzCalculator: CalculatorDefinition = {
  toolId: "dubowitz",
  calculate: (input) => {
    const tool = getTool("dubowitz");

    if (inputIds.some((id) => input[id] === undefined || input[id] === null || input[id] === "")) {
      return missingResult(tool.id, inputIds);
    }

    const trace = [];
    let score = 0;

    for (const inputId of inputIds) {
      const value = getNumber(input, inputId);
      const [min, max] = itemRanges[inputId];

      if (
        value === null ||
        !Number.isInteger(value) ||
        value < min ||
        value > max
      ) {
        return {
          toolId: tool.id,
          warnings: [
            warning(
              "invalid_dubowitz_item_score",
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

    const gestationalAgeWeeks = 0.2642 * score + 24.595;
    const roundedWeeks = Math.round(gestationalAgeWeeks * 10) / 10;

    return {
      toolId: tool.id,
      score,
      maxScore: 70,
      classification: {
        es: `Edad gestacional estimada: ${roundedWeeks.toFixed(1).replace(".", ",")} semanas`,
        en: `Estimated gestational age: ${roundedWeeks.toFixed(1)} weeks`
      },
      warnings: [],
      trace
    };
  }
};
