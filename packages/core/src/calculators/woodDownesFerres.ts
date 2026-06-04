import type { CalculationResult, CalculationWarning, LocalizedText } from "../types.js";
import {
  findInterpretation,
  getNumericScore,
  getTool,
  invalidScoreResult,
  missingResult,
  warning
} from "./common.js";
import type { CalculatorDefinition } from "./common.js";

const inputIds = [
  "wheezing",
  "retractions",
  "air_entry",
  "respiratory_rate",
  "heart_rate",
  "cyanosis"
];

const labels: Record<string, LocalizedText> = {
  wheezing: { es: "Sibilancias", en: "Wheezing" },
  retractions: { es: "Tiraje", en: "Retractions" },
  air_entry: { es: "Entrada de aire", en: "Air entry" },
  respiratory_rate: { es: "Frecuencia respiratoria", en: "Respiratory rate" },
  heart_rate: { es: "Frecuencia cardiaca", en: "Heart rate" },
  cyanosis: { es: "Cianosis", en: "Cyanosis" }
};

const informationalWarning = warning(
  "wood_downes_ferres_informational_only",
  "Uso informativo y de trazabilidad. No sustituye la valoracion clinica ni los protocolos locales.",
  "Informational and traceability use only. It does not replace clinical assessment or local protocols."
);

const scopeWarning = warning(
  "wood_downes_ferres_no_clinical_conduct",
  "No define conducta clinica, destino asistencial ni intervenciones.",
  "It does not define clinical conduct, care disposition, or interventions."
);

export const woodDownesFerresCalculator: CalculatorDefinition = {
  toolId: "wood_downes_ferres",
  calculate: (input): CalculationResult => {
    const tool = getTool("wood-downes-ferres");
    const scores: number[] = [];
    const trace: CalculationResult["trace"] = [];
    const criteriaMatched: LocalizedText[] = [];
    const warnings: CalculationWarning[] = [informationalWarning, scopeWarning];

    for (const inputId of inputIds) {
      if (input[inputId] === undefined || input[inputId] === null || input[inputId] === "") {
        return missingResult(tool.id, inputIds);
      }

      const score = getNumericScore(tool, input, inputId);

      if (score === null || score < 0 || score > 3) {
        return invalidScoreResult(tool.id, inputId, input[inputId]);
      }

      if ((inputId === "heart_rate" || inputId === "cyanosis") && score > 1) {
        return invalidScoreResult(tool.id, inputId, input[inputId]);
      }

      scores.push(score);
      trace.push({ inputId, value: input[inputId], score });

      if (score > 0) {
        const criterionLabel = labels[inputId];
        if (criterionLabel) {
          criteriaMatched.push(criterionLabel);
        }
      }
    }

    const score = scores.reduce((total, value) => total + value, 0);
    const interpretation = findInterpretation(tool.interpretationBands, score);

    return {
      toolId: tool.id,
      score,
      maxScore: 14,
      ...(interpretation ? { interpretation } : {}),
      criteriaMatched,
      warnings,
      trace
    };
  }
};
