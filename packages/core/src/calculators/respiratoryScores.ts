import type { CalculationResult } from "../types.js";
import {
  getNumber,
  getNumericScore,
  getTool,
  label,
  missingResult,
  warning
} from "./common.js";
import type { CalculatorDefinition } from "./common.js";

const respiratoryContextWarning = warning(
  "respiratory_score_context",
  "Escala de apoyo clínico. Interpretar junto con la exploración, la tendencia, la pulsioximetría y el contexto del paciente; no sustituye una valoración urgente si hay signos de fallo respiratorio.",
  "Clinical-support score. Interpret with examination, trend, pulse oximetry, and patient context; it does not replace urgent assessment when respiratory failure is suspected."
);

export const modifiedTalCalculator: CalculatorDefinition = {
  toolId: "modified_tal",
  calculate: (input): CalculationResult => {
    const tool = getTool("modified-tal");
    const ageMonths = getNumber(input, "age_months");
    const respiratoryRate = getNumber(input, "respiratory_rate");
    const wheeze = getNumericScore(tool, input, "wheeze_crackles");
    const retractions = getNumericScore(tool, input, "retractions");
    const spo2 = getNumber(input, "spo2");

    if (
      ageMonths === null || respiratoryRate === null ||
      wheeze === null || retractions === null || spo2 === null
    ) {
      return missingResult(tool.id, [
        "age_months",
        "respiratory_rate",
        "wheeze_crackles",
        "retractions",
        "spo2"
      ]);
    }

    if (ageMonths < 0 || respiratoryRate < 0 || spo2 < 0 || spo2 > 100) {
      return {
        toolId: tool.id,
        warnings: [warning(
          "invalid_tal_inputs",
          "Edad, frecuencia respiratoria y saturación deben ser valores válidos.",
          "Age, respiratory rate, and oxygen saturation must be valid values."
        )],
        trace: []
      };
    }

    let rrScore = 0;
    if (ageMonths < 6) {
      rrScore = respiratoryRate <= 40 ? 0 :
        respiratoryRate <= 55 ? 1 :
        respiratoryRate <= 70 ? 2 : 3;
    } else {
      rrScore = respiratoryRate <= 30 ? 0 :
        respiratoryRate <= 45 ? 1 :
        respiratoryRate <= 60 ? 2 : 3;
    }

    const spo2Score = spo2 >= 95 ? 0 : spo2 >= 92 ? 1 : spo2 >= 90 ? 2 : 3;
    const score = rrScore + wheeze + retractions + spo2Score;

    return {
      toolId: tool.id,
      score,
      maxScore: 12,
      classification:
        score <= 4
          ? label("Leve", "Mild")
          : score <= 8
            ? label("Moderada", "Moderate")
            : label("Grave", "Severe"),
      warnings: [respiratoryContextWarning],
      trace: [
        { inputId: "age_months", value: ageMonths },
        { inputId: "respiratory_rate", value: respiratoryRate, score: rrScore },
        { inputId: "wheeze_crackles", value: input.wheeze_crackles, score: wheeze },
        { inputId: "retractions", value: input.retractions, score: retractions },
        { inputId: "spo2", value: spo2, score: spo2Score }
      ]
    };
  }
};

export const taussigCroupCalculator: CalculatorDefinition = {
  toolId: "taussig_croup",
  calculate: (input): CalculationResult => {
    const tool = getTool("taussig-croup-score");
    const ids = ["stridor", "air_entry", "color", "retractions", "consciousness"];
    const values = ids.map((id) => getNumericScore(tool, input, id));

    if (values.some((value) => value === null)) {
      return missingResult(tool.id, ids);
    }

    const scores = values as number[];
    const score = scores.reduce((sum, value) => sum + value, 0);
    const warnings = [respiratoryContextWarning];

    if (input.stridor === "stridor_3") {
      warnings.push(
        warning(
          "taussig_silent_stridor_warning",
          "En Taussig, la categoría extrema de estridor incluye estridor intenso o ausencia de estridor en un niño con obstrucción grave; un tórax/vía aérea silenciosa puede indicar flujo aéreo crítico.",
          "In Taussig, the extreme stridor category includes intense or absent stridor in a child with severe obstruction; a silent airway may indicate critically reduced airflow."
        )
      );
    }

    return {
      toolId: tool.id,
      score,
      maxScore: 15,
      classification:
        score < 5
          ? label("Leve", "Mild")
          : score <= 6
            ? label("Leve-moderada", "Mild-moderate")
            : score <= 8
              ? label("Moderada", "Moderate")
              : label("Grave", "Severe"),
      warnings,
      trace: ids.map((inputId, index) => ({
        inputId,
        value: input[inputId],
        score: scores[index]
      }))
    };
  }
};
