import type { CalculationResult, LocalizedText } from "../types.js";
import {
  getNumericScore,
  getTool,
  missingResult,
  warning
} from "./common.js";
import type { CalculatorDefinition } from "./common.js";

const tenSignIds = [
  "ill_general_appearance",
  "capillary_refill_over_2s",
  "absent_tears",
  "dry_mucous_membranes",
  "sunken_eyes",
  "abnormal_breathing",
  "weak_pulse",
  "reduced_skin_elasticity",
  "tachycardia",
  "reduced_urine_output"
];

const fourSignIds = [
  "ill_general_appearance",
  "capillary_refill_over_2s",
  "absent_tears",
  "dry_mucous_membranes"
];

const classifyTen = (score: number): LocalizedText =>
  score >= 7
    ? {
        es: "Rango asociado con deficit de peso >=10% en el estudio original",
        en: "Range associated with >=10% weight deficit in the original study"
      }
    : score >= 3
      ? {
          es: "Rango asociado con deficit de peso >=5% en el estudio original",
          en: "Range associated with >=5% weight deficit in the original study"
        }
      : {
          es: "Menos de 3 signos: por debajo del umbral de >=5% del estudio original",
          en: "Fewer than 3 signs: below the original-study >=5% threshold"
        };

const classifyFour = (score: number): LocalizedText =>
  score >= 3
    ? {
        es: "Subscore de 4 signos en rango asociado con deficit >=10%",
        en: "Four-sign subscore in the range associated with >=10% deficit"
      }
    : score >= 2
      ? {
          es: "Subscore de 4 signos en rango asociado con deficit >=5%",
          en: "Four-sign subscore in the range associated with >=5% deficit"
        }
      : {
          es: "Subscore de 4 signos por debajo del umbral de >=5%",
          en: "Four-sign subscore below the >=5% threshold"
        };

export const gorelickDehydrationCalculator: CalculatorDefinition = {
  toolId: "gorelick_dehydration",
  calculate: (input): CalculationResult => {
    const tool = getTool("gorelick-dehydration");

    for (const inputId of tenSignIds) {
      if (
        input[inputId] === undefined ||
        input[inputId] === null ||
        input[inputId] === ""
      ) {
        return missingResult(tool.id, tenSignIds);
      }
    }

    const trace: CalculationResult["trace"] = [];
    let score10 = 0;

    for (const inputId of tenSignIds) {
      const score = getNumericScore(tool, input, inputId);

      if (score === null || !Number.isInteger(score) || ![0, 1].includes(score)) {
        return {
          toolId: tool.id,
          warnings: [
            warning(
              "invalid_score_input",
              "Seleccion no valida para la escala de Gorelick.",
              "Invalid selection for the Gorelick scale."
            )
          ],
          trace: [{ inputId, value: input[inputId] }]
        };
      }

      score10 += score;
      trace.push({ inputId, value: input[inputId], score });
    }

    const score4 = fourSignIds.reduce((total, inputId) => {
      const item = trace.find((entry) => entry.inputId === inputId);
      return total + (item?.score ?? 0);
    }, 0);

    const tenClassification = classifyTen(score10);
    const fourClassification = classifyFour(score4);

    return {
      toolId: tool.id,
      score: score10,
      maxScore: 10,
      label: {
        es: `Gorelick-10: ${score10}/10 · Gorelick-4: ${score4}/4`,
        en: `Gorelick-10: ${score10}/10 · Gorelick-4: ${score4}/4`
      },
      classification: {
        es: `${tenClassification.es}. ${fourClassification.es}.`,
        en: `${tenClassification.en}. ${fourClassification.en}.`
      },
      warnings: [],
      trace
    };
  }
};
