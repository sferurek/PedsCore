import type { CalculationResult } from "../types.js";
import { getBoolean, getNumber, getTool, label, warning } from "./common.js";
import type { CalculatorDefinition } from "./common.js";

type Stage = 0 | 1 | 2 | 3;

export const pediatricKdigoCalculator: CalculatorDefinition = {
  toolId: "kdigo_pediatric",
  calculate: (input): CalculationResult => {
    const tool = getTool("kdigo-pediatric");
    const baselineCr = getNumber(input, "baseline_creatinine_mg_dl");
    const currentCr = getNumber(input, "current_creatinine_mg_dl");
    const rise48h = getNumber(input, "creatinine_rise_48h_mg_dl");
    const eGfr = getNumber(input, "egfr_ml_min_1_73m2");
    const urine = getNumber(input, "urine_output_ml_kg_h");
    const urineHours = getNumber(input, "urine_output_duration_hours");
    const anuriaHours = getNumber(input, "anuria_duration_hours");
    const dialysis = getBoolean(input, "renal_replacement_therapy");

    const hasCreatinine = currentCr !== null && (baselineCr !== null || rise48h !== null);
    const hasUrine = urine !== null && urineHours !== null;
    const hasStage3 = eGfr !== null || anuriaHours !== null || dialysis !== null;
    if (!hasCreatinine && !hasUrine && !hasStage3) {
      return { toolId: tool.id, warnings: [warning("missing_kdigo_inputs", "Se necesitan datos de creatinina y/o diuresis para clasificar KDIGO.", "Creatinine and/or urine-output data are required to classify KDIGO.")], trace: [] };
    }

    let creatinineStage: Stage = 0;
    let ratio: number | null = null;
    if (currentCr !== null && baselineCr !== null && baselineCr > 0) {
      ratio = currentCr / baselineCr;
      if (ratio >= 3) creatinineStage = 3;
      else if (ratio >= 2) creatinineStage = 2;
      else if (ratio >= 1.5) creatinineStage = 1;
    }
    if (rise48h !== null && rise48h >= 0.3) creatinineStage = Math.max(creatinineStage, 1) as Stage;
    if (currentCr !== null && currentCr >= 4 && rise48h !== null && rise48h >= 0.3) creatinineStage = 3;
    if (eGfr !== null && eGfr < 35) creatinineStage = 3;
    if (dialysis === true) creatinineStage = 3;

    let urineStage: Stage = 0;
    if (anuriaHours !== null && anuriaHours >= 12) urineStage = 3;
    if (urine !== null && urineHours !== null) {
      if (urine < 0.3 && urineHours >= 24) urineStage = 3;
      else if (urine < 0.5 && urineHours >= 12) urineStage = 2;
      else if (urine < 0.5 && urineHours >= 6) urineStage = 1;
    }

    const stage = Math.max(creatinineStage, urineStage) as Stage;
    return {
      toolId: tool.id,
      score: stage,
      maxScore: 3,
      classification: label(stage === 0 ? "Sin criterios KDIGO de LRA" : `LRA KDIGO estadio ${stage}`, stage === 0 ? "No KDIGO AKI criteria" : `KDIGO AKI stage ${stage}`),
      warnings: [warning(
        "kdigo_context",
        "Se aplica el peor criterio entre creatinina y diuresis. La definición KDIGO de LRA requiere contexto temporal: aumento ≥0,3 mg/dL en 48 h, ≥1,5 veces el basal conocido o presumido en los 7 días previos, o diuresis <0,5 mL/kg/h durante 6 h.",
        "The worse of creatinine and urine-output criteria is used. KDIGO AKI definition requires temporal context: increase ≥0.3 mg/dL within 48 h, ≥1.5 times baseline known or presumed within the prior 7 days, or urine output <0.5 mL/kg/h for 6 h."
      )],
      trace: [
        { inputId: "baseline_creatinine_mg_dl", value: baselineCr },
        { inputId: "current_creatinine_mg_dl", value: currentCr, score: creatinineStage },
        { inputId: "creatinine_ratio", value: ratio },
        { inputId: "creatinine_rise_48h_mg_dl", value: rise48h },
        { inputId: "egfr_ml_min_1_73m2", value: eGfr },
        { inputId: "urine_output_ml_kg_h", value: urine, score: urineStage },
        { inputId: "urine_output_duration_hours", value: urineHours },
        { inputId: "anuria_duration_hours", value: anuriaHours },
        { inputId: "renal_replacement_therapy", value: dialysis }
      ]
    };
  }
};
