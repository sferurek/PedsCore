import type { CalculationResult } from "../types.js";
import { getBoolean, getNumber, getTool, label, warning } from "./common.js";
import type { CalculatorDefinition } from "./common.js";

export const snappeIICalculator: CalculatorDefinition = {
  toolId: "snappii",
  calculate: (input): CalculationResult => {
    const tool = getTool("snappe-ii");
    const map = getNumber(input, "mean_bp_mmhg");
    const temperature = getNumber(input, "lowest_temperature_c");
    const pfRatio = getNumber(input, "pao2_fio2_ratio");
    const ph = getNumber(input, "lowest_ph");
    const multipleSeizures = getBoolean(input, "multiple_seizures");
    const urineOutput = getNumber(input, "urine_output_ml_kg_h");
    const apgar5 = getNumber(input, "apgar_5min");
    const birthWeight = getNumber(input, "birth_weight_g");
    const sga = getBoolean(input, "sga_below_3rd_percentile");

    if (
      map === null || temperature === null || pfRatio === null || ph === null ||
      multipleSeizures === null || urineOutput === null || apgar5 === null ||
      birthWeight === null || sga === null
    ) {
      return {
        toolId: tool.id,
        warnings: [warning("missing_snappe2_inputs", "Faltan variables necesarias para SNAPPE-II.", "Required SNAPPE-II variables are missing.")],
        trace: []
      };
    }

    if (
      map < 0 || temperature < 20 || temperature > 45 || pfRatio < 0 ||
      ph <= 0 || urineOutput < 0 || apgar5 < 0 || apgar5 > 10 || birthWeight <= 0
    ) {
      return {
        toolId: tool.id,
        warnings: [warning("invalid_snappe2_inputs", "Revisa unidades y valores antes de calcular SNAPPE-II.", "Review units and values before calculating SNAPPE-II.")],
        trace: []
      };
    }

    const mapScore = map >= 30 ? 0 : map >= 20 ? 9 : 19;
    const temperatureScore = temperature > 35.6 ? 0 : temperature >= 35 ? 8 : 15;
    const pfScore = pfRatio >= 2.5 ? 0 : pfRatio >= 1 ? 5 : pfRatio >= 0.3 ? 16 : 28;
    const phScore = ph >= 7.2 ? 0 : ph >= 7.1 ? 7 : 16;
    const seizureScore = multipleSeizures ? 19 : 0;
    const urineScore = urineOutput >= 1 ? 0 : urineOutput >= 0.1 ? 5 : 18;
    const apgarScore = apgar5 >= 7 ? 0 : 18;
    const birthWeightScore = birthWeight >= 1000 ? 0 : birthWeight >= 750 ? 10 : 17;
    const sgaScore = sga ? 12 : 0;

    const score =
      mapScore + temperatureScore + pfScore + phScore + seizureScore +
      urineScore + apgarScore + birthWeightScore + sgaScore;

    return {
      toolId: tool.id,
      score,
      maxScore: 162,
      classification: label(`SNAPPE-II ${score}/162`, `SNAPPE-II ${score}/162`),
      warnings: [
        warning(
          "snappe2_window",
          "SNAPPE-II utiliza los peores valores fisiológicos de las primeras 12 horas de ingreso neonatal y factores perinatales. Es un score de gravedad/riesgo poblacional, no un pronóstico individual.",
          "SNAPPE-II uses the worst physiologic values from the first 12 hours of neonatal admission plus perinatal factors. It is a population-level severity/risk score, not an individual prognosis."
        )
      ],
      trace: [
        { inputId: "mean_bp_mmhg", value: map, score: mapScore },
        { inputId: "lowest_temperature_c", value: temperature, score: temperatureScore },
        { inputId: "pao2_fio2_ratio", value: pfRatio, score: pfScore },
        { inputId: "lowest_ph", value: ph, score: phScore },
        { inputId: "multiple_seizures", value: multipleSeizures, score: seizureScore },
        { inputId: "urine_output_ml_kg_h", value: urineOutput, score: urineScore },
        { inputId: "apgar_5min", value: apgar5, score: apgarScore },
        { inputId: "birth_weight_g", value: birthWeight, score: birthWeightScore },
        { inputId: "sga_below_3rd_percentile", value: sga, score: sgaScore }
      ]
    };
  }
};
