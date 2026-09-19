import type { CalculationResult } from "../types.js";
import { getBoolean, getNumber, getTool, label, warning } from "./common.js";
import type { CalculatorDefinition } from "./common.js";

export const mRiscCalculator: CalculatorDefinition = {
  toolId: "mrisc",
  calculate: (input): CalculationResult => {
    const tool = getTool("mrisc");
    const ageMonths = getNumber(input, "age_months");
    const spo2 = getNumber(input, "spo2_percent");
    const chestIndrawing = getBoolean(input, "chest_indrawing");
    const wheezing = getBoolean(input, "wheezing");
    const refusingFeeds = getBoolean(input, "refusing_feeds");
    const dehydration = getBoolean(input, "dehydration");
    const weightAgeZ = getNumber(input, "weight_for_age_z");

    if (ageMonths === null || spo2 === null || chestIndrawing === null || wheezing === null || refusingFeeds === null || dehydration === null || weightAgeZ === null) {
      return { toolId: tool.id, warnings: [warning("missing_mrisc_inputs", "Faltan variables para calcular mRISC.", "Variables are missing for mRISC.")], trace: [] };
    }
    if (ageMonths < 0 || ageMonths >= 60 || spo2 <= 0 || spo2 > 100) {
      return { toolId: tool.id, warnings: [warning("mrisc_scope", "mRISC fue derivado en niños hospitalizados menores de 5 años con enfermedad respiratoria aguda en Kenia.", "mRISC was derived in hospitalized children under 5 years with acute respiratory illness in Kenya.")], trace: [] };
    }

    const hypoxemiaPoints = spo2 < 90 ? 3 : 0;
    const indrawingPoints = chestIndrawing ? 1 : 0;
    const wheezePoints = wheezing ? -1 : 0;
    const feedingPoints = refusingFeeds ? 1 : 0;
    const dehydrationPoints = dehydration ? 1 : 0;
    const nutritionPoints = weightAgeZ < -3 ? 2 : weightAgeZ < -2 ? 1 : 0;
    const score = hypoxemiaPoints + indrawingPoints + wheezePoints + feedingPoints + dehydrationPoints + nutritionPoints;

    return {
      toolId: tool.id,
      score,
      maxScore: 8,
      classification: label(`mRISC ${score}`, `mRISC ${score}`),
      warnings: [warning(
        "mrisc_context",
        "mRISC es un modelo pronóstico de mortalidad derivado en niños hospitalizados menores de 5 años en Kenia. Su calibración no debe extrapolarse automáticamente a otras poblaciones ni utilizarse como única decisión de manejo.",
        "mRISC is a mortality prognostic model derived in hospitalized children under 5 years in Kenya. Its calibration should not be automatically extrapolated to other populations or used as the sole management decision."
      )],
      trace: [
        { inputId: "spo2_percent", value: spo2, score: hypoxemiaPoints },
        { inputId: "chest_indrawing", value: chestIndrawing, score: indrawingPoints },
        { inputId: "wheezing", value: wheezing, score: wheezePoints },
        { inputId: "refusing_feeds", value: refusingFeeds, score: feedingPoints },
        { inputId: "dehydration", value: dehydration, score: dehydrationPoints },
        { inputId: "weight_for_age_z", value: weightAgeZ, score: nutritionPoints }
      ]
    };
  }
};
