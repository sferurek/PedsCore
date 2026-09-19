import type { CalculationResult } from "../types.js";
import { getBoolean, getTool, label, warning } from "./common.js";
import type { CalculatorDefinition } from "./common.js";

export const pymsCalculator: CalculatorDefinition = {
  toolId: "pyms",
  calculate: (input): CalculationResult => {
    const tool = getTool("pyms");
    const lowBmi = getBoolean(input, "bmi_below_pyms_cutoff");
    const recentWeightLoss = getBoolean(input, "recent_weight_loss");
    const recentIntake = input.recent_intake;
    const expectedImpact = input.expected_nutrition_impact;

    if (
      lowBmi === null ||
      recentWeightLoss === null ||
      typeof recentIntake !== "string" ||
      typeof expectedImpact !== "string"
    ) {
      return {
        toolId: tool.id,
        warnings: [warning(
          "missing_pyms_inputs",
          "Completa los cuatro pasos de PYMS.",
          "Complete all four PYMS steps."
        )],
        trace: []
      };
    }

    const intakeScore =
      recentIntake === "usual" ? 0 :
      recentIntake === "reduced" ? 1 :
      recentIntake === "minimal_or_none" ? 2 : null;
    const impactScore =
      expectedImpact === "none" ? 0 :
      expectedImpact === "affected" ? 1 :
      expectedImpact === "minimal_or_none" ? 2 : null;

    if (intakeScore === null || impactScore === null) {
      return {
        toolId: tool.id,
        warnings: [warning(
          "invalid_pyms_inputs",
          "Selecciona categorías PYMS válidas para ingesta y efecto previsto de la enfermedad.",
          "Select valid PYMS categories for intake and expected illness effect."
        )],
        trace: []
      };
    }

    const bmiScore = lowBmi ? 2 : 0;
    const weightLossScore = recentWeightLoss ? 1 : 0;
    const score = bmiScore + weightLossScore + intakeScore + impactScore;

    return {
      toolId: tool.id,
      score,
      maxScore: 7,
      classification:
        score === 0 ? label("Riesgo nutricional bajo", "Low nutritional risk") :
        score === 1 ? label("Riesgo nutricional moderado", "Moderate nutritional risk") :
        label("Riesgo nutricional alto", "High nutritional risk"),
      warnings: [
        warning(
          "pyms_screening_scope",
          "PYMS es una herramienta de cribado de riesgo nutricional hospitalario; no diagnostica malnutrición ni genera por sí sola un plan nutricional.",
          "PYMS is an inpatient nutritional-risk screening tool; it does not diagnose malnutrition or generate a nutrition plan by itself."
        ),
        warning(
          "pyms_bmi_reference",
          "El primer paso requiere determinar si el IMC está por debajo del punto de corte PYMS usando una referencia pediátrica apropiada; el estudio original empleó la referencia UK 1990.",
          "The first step requires deciding whether BMI is below the PYMS cutoff using an appropriate pediatric reference; the original study used the UK 1990 reference."
        )
      ],
      trace: [
        { inputId: "bmi_below_pyms_cutoff", value: lowBmi, score: bmiScore },
        { inputId: "recent_weight_loss", value: recentWeightLoss, score: weightLossScore },
        { inputId: "recent_intake", value: recentIntake, score: intakeScore },
        { inputId: "expected_nutrition_impact", value: expectedImpact, score: impactScore }
      ]
    };
  }
};
