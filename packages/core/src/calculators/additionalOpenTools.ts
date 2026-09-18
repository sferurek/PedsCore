import type { CalculationResult } from "../types.js";
import {
  getBoolean,
  getNumber,
  getTool,
  label,
  warning
} from "./common.js";
import type { CalculatorDefinition } from "./common.js";

const contextWarning = warning(
  "clinical_context_required",
  "Herramienta de apoyo clínico. Debe aplicarse a la población y contexto para los que fue validada y no sustituye la valoración clínica.",
  "Clinical-support tool. Apply only to the population and setting in which it was validated; it does not replace clinical assessment."
);

export const mriscCalculator: CalculatorDefinition = {
  toolId: "mrisc",
  calculate: (input): CalculationResult => {
    const tool = getTool("mrisc");
    const ageMonths = getNumber(input, "age_months");
    const unconsciousHistory = getBoolean(input, "history_unconscious");
    const unableDrink = getBoolean(input, "unable_to_drink");
    const nightSweats = getBoolean(input, "night_sweats");
    const chestIndrawing = getBoolean(input, "chest_indrawing");
    const alertAwake = getBoolean(input, "alert_and_awake");
    const malaria = getBoolean(input, "malaria");
    const dehydrated = getBoolean(input, "dehydrated");
    const weightForAgeZ = getNumber(input, "weight_for_age_z");

    if (
      ageMonths === null || unconsciousHistory === null || unableDrink === null ||
      nightSweats === null || chestIndrawing === null || alertAwake === null ||
      malaria === null || dehydrated === null || weightForAgeZ === null
    ) {
      return {
        toolId: tool.id,
        warnings: [warning(
          "missing_mrisc_inputs",
          "Faltan variables necesarias para calcular mRISC.",
          "Required variables for mRISC are missing."
        )],
        trace: []
      };
    }

    if (ageMonths < 0 || ageMonths >= 60) {
      return {
        toolId: tool.id,
        classification: label(
          "Fuera de la población validada para mRISC",
          "Outside the validated mRISC population"
        ),
        warnings: [contextWarning],
        trace: [{ inputId: "age_months", value: ageMonths }]
      };
    }

    const unconsciousScore = unconsciousHistory ? 1 : 0;
    const drinkScore = unableDrink ? 1 : 0;
    const nightSweatsScore = nightSweats ? -1 : 0;
    const indrawingScore = chestIndrawing ? 1 : 0;
    const alertScore = alertAwake ? 0 : 2;
    const malariaScore = malaria ? -1 : 0;
    const malariaIndrawingScore = malaria && chestIndrawing ? 1 : 0;
    const dehydrationScore = dehydrated ? 1 : 0;
    const wazScore = weightForAgeZ <= -2 ? 1 : 0;

    const score =
      unconsciousScore + drinkScore + nightSweatsScore + indrawingScore +
      alertScore + malariaScore + malariaIndrawingScore + dehydrationScore + wazScore;

    return {
      toolId: tool.id,
      score,
      classification: label(`mRISC ${score}`, `mRISC ${score}`),
      warnings: [
        contextWarning,
        warning(
          "mrisc_setting_specific",
          "mRISC se derivó en niños menores de 5 años hospitalizados con enfermedad respiratoria grave en Kenia. No convertir el puntaje en una probabilidad individual de mortalidad fuera de una población validada.",
          "mRISC was derived in hospitalized children under 5 years with severe respiratory illness in Kenya. Do not convert the score into an individual mortality probability outside a validated population."
        )
      ],
      trace: [
        { inputId: "history_unconscious", value: unconsciousHistory, score: unconsciousScore },
        { inputId: "unable_to_drink", value: unableDrink, score: drinkScore },
        { inputId: "night_sweats", value: nightSweats, score: nightSweatsScore },
        { inputId: "chest_indrawing", value: chestIndrawing, score: indrawingScore },
        { inputId: "alert_and_awake", value: alertAwake, score: alertScore },
        { inputId: "malaria", value: malaria, score: malariaScore },
        { inputId: "malaria_chest_indrawing_interaction", value: malaria && chestIndrawing, score: malariaIndrawingScore },
        { inputId: "dehydrated", value: dehydrated, score: dehydrationScore },
        { inputId: "weight_for_age_z", value: weightForAgeZ, score: wazScore }
      ]
    };
  }
};

export const gorelickDehydrationCalculator: CalculatorDefinition = {
  toolId: "gorelick_dehydration",
  calculate: (input): CalculationResult => {
    const tool = getTool("gorelick-dehydration");
    const ids = [
      "abnormal_general_appearance",
      "prolonged_capillary_refill",
      "absent_tears",
      "dry_mucous_membranes",
      "sunken_eyes",
      "deep_breathing",
      "weak_pulses",
      "reduced_skin_elasticity",
      "tachycardia",
      "reduced_urine_output"
    ] as const;

    const values = ids.map((id) => getBoolean(input, id));
    if (values.some((value) => value === null)) {
      return {
        toolId: tool.id,
        warnings: [warning(
          "missing_gorelick_inputs",
          "Faltan signos para completar la escala de Gorelick de 10 puntos.",
          "Signs are missing to complete the 10-point Gorelick scale."
        )],
        trace: []
      };
    }

    const score = values.reduce((sum, value) => sum + (value ? 1 : 0), 0);
    const classification =
      score >= 7
        ? label("Deshidratación grave (≈≥10%)", "Severe dehydration (≈≥10%)")
        : score >= 3
          ? label("Deshidratación clínicamente significativa (≈≥5%)", "Clinically significant dehydration (≈≥5%)")
          : label("No o mínima deshidratación (<5%)", "No or minimal dehydration (<5%)");

    return {
      toolId: tool.id,
      score,
      maxScore: 10,
      classification,
      warnings: [
        contextWarning,
        warning(
          "gorelick_age_scope",
          "La escala de Gorelick de 10 puntos fue estudiada principalmente en niños de 1 mes a 5 años con gastroenteritis/deshidratación.",
          "The 10-point Gorelick scale was studied mainly in children aged 1 month to 5 years with gastroenteritis/dehydration."
        )
      ],
      trace: ids.map((inputId, index) => ({
        inputId,
        value: values[index],
        score: values[index] ? 1 : 0
      }))
    };
  }
};

export const visualAnalogueScaleCalculator: CalculatorDefinition = {
  toolId: "visual_analogue_scale",
  calculate: (input): CalculationResult => {
    const tool = getTool("visual-analogue-scale");
    const pain = getNumber(input, "pain_vas_cm");

    if (pain === null) {
      return {
        toolId: tool.id,
        warnings: [warning(
          "missing_vas_input",
          "Introduce la posición marcada en la escala visual analógica.",
          "Enter the marked position on the visual analogue scale."
        )],
        trace: []
      };
    }

    if (pain < 0 || pain > 10) {
      return {
        toolId: tool.id,
        warnings: [warning(
          "invalid_vas_input",
          "La EVA debe estar entre 0 y 10 cm.",
          "VAS must be between 0 and 10 cm."
        )],
        trace: []
      };
    }

    return {
      toolId: tool.id,
      value: Number(pain.toFixed(1)),
      unit: "cm",
      label: label("Intensidad de dolor EVA", "VAS pain intensity"),
      warnings: [
        contextWarning,
        warning(
          "vas_no_universal_bands",
          "PedsCore no aplica bandas universales de leve/moderado/grave porque los puntos de corte dependen de edad, contexto y población.",
          "PedsCore does not apply universal mild/moderate/severe bands because cutoffs vary by age, context, and population."
        )
      ],
      trace: [{ inputId: "pain_vas_cm", value: pain }]
    };
  }
};
