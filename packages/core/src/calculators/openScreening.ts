import type { CalculationResult } from "../types.js";
import {
  getBoolean,
  getNumber,
  getTool,
  label,
  warning
} from "./common.js";
import type { CalculatorDefinition } from "./common.js";

const clinicalContextWarning = warning(
  "clinical_context_required",
  "Herramienta de apoyo clínico. Debe aplicarse solo a la población y contexto para los que fue validada y no sustituye la valoración clínica ni los protocolos locales.",
  "Clinical-support tool. Apply only to the validated population and context; it does not replace clinical assessment or local protocols."
);

export const strongKidsCalculator: CalculatorDefinition = {
  toolId: "strongkids",
  calculate: (input): CalculationResult => {
    const tool = getTool("strongkids");
    const subjective = getBoolean(input, "poor_nutritional_status");
    const highRiskDisease = getBoolean(input, "high_risk_disease");
    const intakeLosses = getBoolean(input, "reduced_intake_or_losses");
    const weightLoss = getBoolean(input, "weight_loss_or_poor_gain");

    if (
      subjective === null ||
      highRiskDisease === null ||
      intakeLosses === null ||
      weightLoss === null
    ) {
      return {
        toolId: tool.id,
        warnings: [warning(
          "missing_strongkids_inputs",
          "Faltan respuestas para completar STRONGkids.",
          "Responses are missing to complete STRONGkids."
        )],
        trace: []
      };
    }

    const score =
      (subjective ? 1 : 0) +
      (highRiskDisease ? 2 : 0) +
      (intakeLosses ? 1 : 0) +
      (weightLoss ? 1 : 0);

    return {
      toolId: tool.id,
      score,
      maxScore: 5,
      classification:
        score === 0
          ? label("Riesgo nutricional bajo", "Low nutritional risk")
          : score <= 3
            ? label("Riesgo nutricional moderado", "Moderate nutritional risk")
            : label("Riesgo nutricional alto", "High nutritional risk"),
      warnings: [clinicalContextWarning],
      trace: [
        { inputId: "poor_nutritional_status", value: subjective, score: subjective ? 1 : 0 },
        { inputId: "high_risk_disease", value: highRiskDisease, score: highRiskDisease ? 2 : 0 },
        { inputId: "reduced_intake_or_losses", value: intakeLosses, score: intakeLosses ? 1 : 0 },
        { inputId: "weight_loss_or_poor_gain", value: weightLoss, score: weightLoss ? 1 : 0 }
      ]
    };
  }
};

export const stepByStepFebrileInfantCalculator: CalculatorDefinition = {
  toolId: "step_by_step",
  calculate: (input): CalculationResult => {
    const tool = getTool("step-by-step-febrile-infant");
    const ageDays = getNumber(input, "age_days");
    const wellAppearing = getBoolean(input, "well_appearing");
    const leukocyturia = getBoolean(input, "leukocyturia");
    const procalcitonin = getNumber(input, "procalcitonin_ng_ml");
    const crp = getNumber(input, "crp_mg_l");
    const anc = getNumber(input, "anc");

    if (
      ageDays === null ||
      wellAppearing === null ||
      leukocyturia === null ||
      procalcitonin === null ||
      crp === null ||
      anc === null
    ) {
      return {
        toolId: tool.id,
        warnings: [warning(
          "missing_step_by_step_inputs",
          "Faltan variables necesarias para aplicar Step-by-Step.",
          "Required variables are missing for the Step-by-Step approach."
        )],
        trace: []
      };
    }

    if (ageDays < 0 || ageDays > 90 || procalcitonin < 0 || crp < 0 || anc < 0) {
      return {
        toolId: tool.id,
        warnings: [warning(
          "invalid_step_by_step_inputs",
          "Edad y parámetros analíticos deben ser válidos; la herramienta se aplica hasta 90 días.",
          "Age and laboratory values must be valid; the tool applies through 90 days."
        )],
        trace: []
      };
    }

    let classification = label("Bajo riesgo", "Low risk");
    let score = 0;

    if (!wellAppearing || ageDays <= 21 || leukocyturia || procalcitonin >= 0.5) {
      classification = label("Alto riesgo", "High risk");
      score = 2;
    } else if (crp > 20 || anc > 10000) {
      classification = label("Riesgo intermedio", "Intermediate risk");
      score = 1;
    }

    return {
      toolId: tool.id,
      score,
      maxScore: 2,
      classification,
      warnings: [
        clinicalContextWarning,
        warning(
          "step_by_step_scope",
          "Step-by-Step se validó para lactantes febriles de hasta 90 días, especialmente con fiebre sin foco. La categoría de riesgo no equivale por sí sola a una orden de punción lumbar, antibióticos, ingreso o alta.",
          "Step-by-Step was validated in febrile infants up to 90 days, especially with fever without source. Risk category alone is not an automatic order for lumbar puncture, antibiotics, admission, or discharge."
        )
      ],
      trace: [
        { inputId: "age_days", value: ageDays, score: ageDays <= 21 ? 2 : 0 },
        { inputId: "well_appearing", value: wellAppearing, score: wellAppearing ? 0 : 2 },
        { inputId: "leukocyturia", value: leukocyturia, score: leukocyturia ? 2 : 0 },
        { inputId: "procalcitonin_ng_ml", value: procalcitonin, score: procalcitonin >= 0.5 ? 2 : 0 },
        { inputId: "crp_mg_l", value: crp, score: crp > 20 ? 1 : 0 },
        { inputId: "anc", value: anc, score: anc > 10000 ? 1 : 0 }
      ]
    };
  }
};
