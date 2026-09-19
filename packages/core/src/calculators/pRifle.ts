import type { CalculationResult } from "../types.js";
import { getNumber, getTool, label, warning } from "./common.js";
import type { CalculatorDefinition } from "./common.js";

type Stage = 0 | 1 | 2 | 3;
const stageLabel = (stage: Stage) => stage === 3 ? "Failure" : stage === 2 ? "Injury" : stage === 1 ? "Risk" : "No pRIFLE AKI";

export const pRifleCalculator: CalculatorDefinition = {
  toolId: "prifle",
  calculate: (input): CalculationResult => {
    const tool = getTool("prifle");
    const baseline = getNumber(input, "baseline_eccr_ml_min_1_73m2");
    const current = getNumber(input, "current_eccr_ml_min_1_73m2");
    const urine = getNumber(input, "urine_output_ml_kg_h");
    const urineHours = getNumber(input, "urine_output_duration_hours");

    if ((baseline === null || current === null) && (urine === null || urineHours === null)) {
      return { toolId: tool.id, warnings: [warning("missing_prifle_inputs", "Se necesita eCCl basal y actual y/o diuresis con duración para clasificar pRIFLE.", "Baseline and current eCCl and/or urine output with duration are required to classify pRIFLE.")], trace: [] };
    }
    if ((baseline !== null && baseline <= 0) || (current !== null && current <= 0) || (urine !== null && urine < 0) || (urineHours !== null && urineHours < 0)) {
      return { toolId: tool.id, warnings: [warning("invalid_prifle_inputs", "Revisa eCCl, diuresis y duración.", "Review eCCl, urine output, and duration.")], trace: [] };
    }

    let renalStage: Stage = 0;
    let decreasePct: number | null = null;
    if (baseline !== null && current !== null) {
      decreasePct = ((baseline - current) / baseline) * 100;
      if (current < 35 || decreasePct >= 75) renalStage = 3;
      else if (decreasePct >= 50) renalStage = 2;
      else if (decreasePct >= 25) renalStage = 1;
    }

    let urineStage: Stage = 0;
    if (urine !== null && urineHours !== null) {
      if (urine < 0.3 && urineHours >= 24) urineStage = 3;
      else if (urine < 0.5 && urineHours >= 16) urineStage = 2;
      else if (urine < 0.5 && urineHours >= 8) urineStage = 1;
    }

    const stage = Math.max(renalStage, urineStage) as Stage;
    return {
      toolId: tool.id,
      score: stage,
      maxScore: 3,
      classification: label(stageLabel(stage), stage === 3 ? "Failure" : stage === 2 ? "Injury" : stage === 1 ? "Risk" : "Sin LRA por pRIFLE"),
      warnings: [warning(
        "prifle_context",
        "pRIFLE clasifica por el peor criterio entre descenso del aclaramiento estimado de creatinina y diuresis. Las categorías Loss y End-stage describen persistencia temporal posterior y no se infieren de una medición aislada.",
        "pRIFLE classifies by the worse of estimated creatinine-clearance decline and urine-output criteria. Loss and End-stage categories describe subsequent persistence and are not inferred from a single assessment."
      )],
      trace: [
        { inputId: "baseline_eccr_ml_min_1_73m2", value: baseline },
        { inputId: "current_eccr_ml_min_1_73m2", value: current, score: renalStage },
        { inputId: "eccr_decrease_percent", value: decreasePct },
        { inputId: "urine_output_ml_kg_h", value: urine, score: urineStage },
        { inputId: "urine_output_duration_hours", value: urineHours }
      ]
    };
  }
};
