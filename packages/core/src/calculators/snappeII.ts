import type { CalculationResult } from "../types.js";
import { getBoolean, getNumber, getTool, label, warning } from "./common.js";
import type { CalculatorDefinition } from "./common.js";

export const snappeIiCalculator: CalculatorDefinition = {
  toolId: "snappii",
  calculate: (input): CalculationResult => {
    const tool = getTool("snappe-ii");
    const map = getNumber(input, "mean_bp_mmhg");
    const temperature = getNumber(input, "lowest_temperature_c");
    const pfRatio = getNumber(input, "pao2_fio2_ratio");
    const ph = getNumber(input, "lowest_ph");
    const multipleSeizures = getBoolean(input, "multiple_seizures");
    const urine = getNumber(input, "urine_output_ml_kg_h");
    const birthWeight = getNumber(input, "birth_weight_g");
    const sga = getBoolean(input, "sga_below_3rd_percentile");
    const apgar = getNumber(input, "apgar_5min");

    if (
      map === null || temperature === null || pfRatio === null || ph === null ||
      multipleSeizures === null || urine === null || birthWeight === null ||
      sga === null || apgar === null
    ) {
      return { toolId:tool.id, warnings:[warning(
        "missing_snappeii_inputs",
        "Faltan variables necesarias para completar SNAPPE-II.",
        "Required SNAPPE-II variables are missing."
      )], trace:[] };
    }
    if (
      map < 0 || temperature < 20 || temperature > 45 || pfRatio < 0 ||
      ph <= 0 || urine < 0 || birthWeight <= 0 || apgar < 0 || apgar > 10
    ) {
      return { toolId:tool.id, warnings:[warning(
        "invalid_snappeii_inputs",
        "Revisa unidades y valores antes de calcular SNAPPE-II.",
        "Review units and values before calculating SNAPPE-II."
      )], trace:[] };
    }

    const mapScore = map >= 30 ? 0 : map >= 20 ? 9 : 19;
    const tempScore = temperature > 35.6 ? 0 : temperature >= 35 ? 8 : 15;
    const oxygenScore = pfRatio >= 250 ? 0 : pfRatio >= 100 ? 5 : pfRatio >= 30 ? 16 : 28;
    const phScore = ph >= 7.2 ? 0 : ph >= 7.1 ? 7 : 16;
    const seizureScore = multipleSeizures ? 19 : 0;
    const urineScore = urine >= 1 ? 0 : urine >= 0.1 ? 5 : 18;
    const birthWeightScore = birthWeight >= 1000 ? 0 : birthWeight >= 750 ? 10 : 17;
    const sgaScore = sga ? 12 : 0;
    const apgarScore = apgar >= 7 ? 0 : 18;
    const score = mapScore + tempScore + oxygenScore + phScore + seizureScore +
      urineScore + birthWeightScore + sgaScore + apgarScore;

    return {
      toolId:tool.id,
      score,
      maxScore:162,
      classification:label(`SNAPPE-II ${score}/162`, `SNAPPE-II ${score}/162`),
      warnings:[
        warning(
          "snappeii_context",
          "SNAPPE-II es un score neonatal de gravedad/riesgo basado en variables tempranas de UCI neonatal. No debe utilizarse como predicción individual determinista ni como criterio de limitación de cuidados.",
          "SNAPPE-II is a neonatal severity/risk score based on early NICU variables. It must not be used as a deterministic individual prediction or limitation-of-care criterion."
        ),
        warning(
          "snappeii_window",
          "Utiliza los valores definidos para la ventana inicial del score (habitualmente las primeras 12 horas según las validaciones publicadas).",
          "Use values from the score's defined early window (commonly the first 12 hours in published validations)."
        )
      ],
      trace:[
        { inputId:"mean_bp_mmhg", value:map, score:mapScore },
        { inputId:"lowest_temperature_c", value:temperature, score:tempScore },
        { inputId:"pao2_fio2_ratio", value:pfRatio, score:oxygenScore },
        { inputId:"lowest_ph", value:ph, score:phScore },
        { inputId:"multiple_seizures", value:multipleSeizures, score:seizureScore },
        { inputId:"urine_output_ml_kg_h", value:urine, score:urineScore },
        { inputId:"birth_weight_g", value:birthWeight, score:birthWeightScore },
        { inputId:"sga_below_3rd_percentile", value:sga, score:sgaScore },
        { inputId:"apgar_5min", value:apgar, score:apgarScore }
      ]
    };
  }
};
