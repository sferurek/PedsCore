import type { CalculationResult } from "../types.js";
import { getBoolean, getNumber, getTool, label, warning } from "./common.js";
import type { CalculatorDefinition } from "./common.js";

export const riscCalculator: CalculatorDefinition = {
  toolId: "risc",
  calculate: (input): CalculationResult => {
    const tool = getTool("risc");
    const ageMonths = getNumber(input, "age_months");
    const hivInfected = getBoolean(input, "hiv_infected");
    const spo2 = getNumber(input, "spo2_percent");
    const chestIndrawing = getBoolean(input, "chest_indrawing");
    const wheezing = getBoolean(input, "wheezing");
    const refusingFeeds = getBoolean(input, "refusing_feeds");
    const weightAgeZ = getNumber(input, "weight_for_age_z");

    if (ageMonths === null || hivInfected === null || spo2 === null || chestIndrawing === null || wheezing === null || refusingFeeds === null) {
      return { toolId: tool.id, warnings: [warning("missing_risc_inputs", "Faltan variables para calcular RISC.", "Variables are missing for RISC.")], trace: [] };
    }
    if (ageMonths < 0 || ageMonths >= 24 || spo2 <= 0 || spo2 > 100) {
      return { toolId: tool.id, warnings: [warning("risc_scope", "RISC original fue derivado en menores de 24 meses hospitalizados por infección respiratoria baja.", "The original RISC was derived in children under 24 months hospitalized with lower respiratory tract infection.")], trace: [] };
    }
    if (hivInfected) {
      return { toolId: tool.id, warnings: [warning("risc_hiv_model", "El RISC original utiliza un modelo distinto en niños con VIH que requiere edad y clasificación clínica del VIH. Esta implementación local está restringida al modelo original para niños sin VIH.", "The original RISC uses a separate model in children with HIV requiring age and HIV clinical classification. This local implementation is restricted to the original HIV-uninfected model.")], trace: [] };
    }
    if (weightAgeZ === null) {
      return { toolId: tool.id, warnings: [warning("missing_risc_waz", "Se requiere el z-score de peso para la edad para el modelo RISC sin VIH.", "Weight-for-age z score is required for the HIV-uninfected RISC model.")], trace: [] };
    }

    const hypoxemia = spo2 <= 90;
    const respiratoryPoints = hypoxemia ? 3 : chestIndrawing ? 2 : 0;
    const wheezePoints = wheezing ? -2 : 0;
    const feedingPoints = refusingFeeds ? 1 : 0;
    const nutritionPoints = weightAgeZ < -3 ? 2 : weightAgeZ <= -2 ? 1 : 0;
    const score = respiratoryPoints + wheezePoints + feedingPoints + nutritionPoints;

    return {
      toolId: tool.id,
      score,
      maxScore: 6,
      classification: label(`RISC ${score}`, `RISC ${score}`),
      warnings: [warning(
        "risc_context",
        "RISC estima riesgo de mortalidad en el contexto de derivación original: menores de 24 meses hospitalizados por infección respiratoria baja en Sudáfrica. No debe extrapolarse automáticamente a otras poblaciones ni usarse como única decisión de manejo.",
        "RISC estimates mortality risk in its original derivation context: children under 24 months hospitalized with lower respiratory tract infection in South Africa. It should not be automatically extrapolated to other populations or used as the sole management decision."
      )],
      trace: [
        { inputId: "spo2_percent", value: spo2, score: hypoxemia ? 3 : 0 },
        { inputId: "chest_indrawing", value: chestIndrawing, score: !hypoxemia && chestIndrawing ? 2 : 0 },
        { inputId: "wheezing", value: wheezing, score: wheezePoints },
        { inputId: "refusing_feeds", value: refusingFeeds, score: feedingPoints },
        { inputId: "weight_for_age_z", value: weightAgeZ, score: nutritionPoints }
      ]
    };
  }
};
