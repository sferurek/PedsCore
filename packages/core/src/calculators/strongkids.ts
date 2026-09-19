import type { CalculationResult } from "../types.js";
import { getBoolean, getTool, label, warning } from "./common.js";
import type { CalculatorDefinition } from "./common.js";

export const strongkidsCalculator: CalculatorDefinition = {
  toolId: "strongkids",
  calculate: (input): CalculationResult => {
    const tool = getTool("strongkids");
    const poorNutritionalStatus = getBoolean(input, "poor_nutritional_status");
    const highRiskDisease = getBoolean(input, "high_risk_disease");
    const reducedIntakeOrLosses = getBoolean(input, "reduced_intake_or_losses");
    const weightLossOrPoorGain = getBoolean(input, "weight_loss_or_poor_gain");

    if (
      poorNutritionalStatus === null ||
      highRiskDisease === null ||
      reducedIntakeOrLosses === null ||
      weightLossOrPoorGain === null
    ) {
      return {
        toolId: tool.id,
        warnings: [
          warning(
            "missing_strongkids_inputs",
            "Completa los cuatro dominios de STRONGkids.",
            "Complete all four STRONGkids domains."
          )
        ],
        trace: []
      };
    }

    const clinicalScore = poorNutritionalStatus ? 1 : 0;
    const diseaseScore = highRiskDisease ? 2 : 0;
    const intakeScore = reducedIntakeOrLosses ? 1 : 0;
    const growthScore = weightLossOrPoorGain ? 1 : 0;
    const score = clinicalScore + diseaseScore + intakeScore + growthScore;

    const classification =
      score === 0
        ? label("Riesgo nutricional bajo", "Low nutritional risk")
        : score <= 3
          ? label("Riesgo nutricional moderado", "Moderate nutritional risk")
          : label("Riesgo nutricional alto", "High nutritional risk");

    return {
      toolId: tool.id,
      score,
      maxScore: 5,
      classification,
      warnings: [
        warning(
          "strongkids_context",
          "STRONGkids es una herramienta de cribado para niños hospitalizados. El resultado identifica riesgo nutricional y no diagnostica malnutrición ni prescribe tratamiento.",
          "STRONGkids is a screening tool for hospitalized children. The result identifies nutritional risk and does not diagnose malnutrition or prescribe treatment."
        )
      ],
      trace: [
        {
          inputId: "poor_nutritional_status",
          value: poorNutritionalStatus,
          score: clinicalScore
        },
        {
          inputId: "high_risk_disease",
          value: highRiskDisease,
          score: diseaseScore
        },
        {
          inputId: "reduced_intake_or_losses",
          value: reducedIntakeOrLosses,
          score: intakeScore
        },
        {
          inputId: "weight_loss_or_poor_gain",
          value: weightLossOrPoorGain,
          score: growthScore
        }
      ]
    };
  }
};
