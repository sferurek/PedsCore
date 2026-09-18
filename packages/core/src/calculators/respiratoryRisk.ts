import type { CalculationResult } from "../types.js";
import {
  getBoolean,
  getNumber,
  getNumericScore,
  getTool,
  label,
  warning
} from "./common.js";
import type { CalculatorDefinition } from "./common.js";

const contextWarning = warning(
  "context_required",
  "Herramienta de apoyo clínico. Debe aplicarse a la población para la que fue validada y no sustituye la valoración clínica ni los protocolos locales.",
  "Clinical-support tool. Apply only to the population in which it was validated; it does not replace clinical assessment or local protocols."
);

export const passAsthmaCalculator: CalculatorDefinition = {
  toolId: "pass",
  calculate: (input): CalculationResult => {
    const tool = getTool("pass");
    const work = getNumericScore(tool, input, "work_of_breathing");
    const wheeze = getNumericScore(tool, input, "wheezing");
    const expiration = getNumericScore(tool, input, "prolonged_expiration");

    if (work === null || wheeze === null || expiration === null) {
      return {
        toolId: tool.id,
        warnings: [warning(
          "missing_pass_inputs",
          "Faltan uno o más de los tres componentes PASS.",
          "One or more PASS components are missing."
        )],
        trace: []
      };
    }

    const score = work + wheeze + expiration;

    return {
      toolId: tool.id,
      score,
      maxScore: 6,
      classification: label(`PASS ${score}/6`, `PASS ${score}/6`),
      warnings: [
        contextWarning,
        warning(
          "pass_no_universal_treatment_band",
          "La publicación original validó PASS como medida de gravedad, pero no definió una pauta terapéutica universal por bandas; interpretar el valor y su tendencia junto con el contexto clínico.",
          "The original publication validated PASS as a severity measure but did not define universal treatment bands; interpret the value and trend with clinical context."
        )
      ],
      trace: [
        { inputId: "work_of_breathing", value: input.work_of_breathing, score: work },
        { inputId: "wheezing", value: input.wheezing, score: wheeze },
        { inputId: "prolonged_expiration", value: input.prolonged_expiration, score: expiration }
      ]
    };
  }
};

export const riscCalculator: CalculatorDefinition = {
  toolId: "risc",
  calculate: (input): CalculationResult => {
    const tool = getTool("risc");
    const ageMonths = getNumber(input, "age_months");
    const hivNegative = getBoolean(input, "hiv_negative");
    const spo2 = getNumber(input, "spo2_room_air");
    const chestIndrawing = getBoolean(input, "chest_indrawing");
    const wheezing = getBoolean(input, "wheezing");
    const refusingFeeds = getBoolean(input, "refusing_feeds");
    const weightForAgeZ = getNumber(input, "weight_for_age_z");

    if (
      ageMonths === null || hivNegative === null || spo2 === null ||
      chestIndrawing === null || wheezing === null ||
      refusingFeeds === null || weightForAgeZ === null
    ) {
      return {
        toolId: tool.id,
        warnings: [warning(
          "missing_risc_inputs",
          "Faltan variables necesarias para calcular RISC.",
          "Required variables for RISC are missing."
        )],
        trace: []
      };
    }

    if (ageMonths < 0 || ageMonths >= 24 || !hivNegative || spo2 < 0 || spo2 > 100) {
      return {
        toolId: tool.id,
        classification: label(
          "Fuera de la población validada para esta variante RISC",
          "Outside the validated population for this RISC variant"
        ),
        warnings: [
          contextWarning,
          warning(
            "risc_population_gate",
            "Esta implementación corresponde al modelo RISC original para niños VIH negativos menores de 24 meses hospitalizados con infección respiratoria baja.",
            "This implementation is the original RISC model for HIV-negative children under 24 months hospitalized with lower respiratory tract infection."
          )
        ],
        trace: [
          { inputId: "age_months", value: ageMonths },
          { inputId: "hiv_negative", value: hivNegative },
          { inputId: "spo2_room_air", value: spo2 }
        ]
      };
    }

    const hypoxemiaScore = spo2 <= 90 ? 3 : 0;
    const indrawingScore = spo2 > 90 && chestIndrawing ? 2 : 0;
    const wheezeScore = wheezing ? -2 : 0;
    const feedsScore = refusingFeeds ? 1 : 0;
    const weightScore = weightForAgeZ <= -3 ? 2 : weightForAgeZ <= -2 ? 1 : 0;
    const score = hypoxemiaScore + indrawingScore + wheezeScore + feedsScore + weightScore;

    return {
      toolId: tool.id,
      score,
      maxScore: 6,
      classification: label(`RISC ${score}`, `RISC ${score}`),
      warnings: [
        contextWarning,
        warning(
          "risc_population_specific",
          "RISC predice mortalidad en la cohorte y contexto en que fue derivado. No convertir el puntaje en una probabilidad individual sin una validación/calibración aplicable a la población local.",
          "RISC predicts mortality in the cohort and setting in which it was derived. Do not convert the score into an individual probability without applicable local validation/calibration."
        )
      ],
      trace: [
        { inputId: "spo2_room_air", value: spo2, score: hypoxemiaScore },
        { inputId: "chest_indrawing", value: chestIndrawing, score: indrawingScore },
        { inputId: "wheezing", value: wheezing, score: wheezeScore },
        { inputId: "refusing_feeds", value: refusingFeeds, score: feedsScore },
        { inputId: "weight_for_age_z", value: weightForAgeZ, score: weightScore }
      ]
    };
  }
};
