import type { CalculationResult, LocalizedText } from "../types.js";
import { getBoolean, missingResult, warning } from "./common.js";
import type { CalculatorDefinition, CalculatorInput } from "./common.js";

const highRiskInputIds = [
  "gcs_less_than_15_at_2_hours",
  "suspected_open_or_depressed_skull_fracture",
  "worsening_headache",
  "irritability_on_exam"
];

const mediumRiskInputIds = [
  "signs_of_basal_skull_fracture",
  "large_boggy_scalp_hematoma",
  "dangerous_mechanism"
];

const inputIds = [...highRiskInputIds, ...mediumRiskInputIds];

const labels: Record<string, LocalizedText> = {
  gcs_less_than_15_at_2_hours: {
    es: "GCS menor de 15 a las 2 horas",
    en: "GCS less than 15 at 2 hours"
  },
  suspected_open_or_depressed_skull_fracture: {
    es: "Sospecha de fractura craneal abierta o deprimida",
    en: "Suspected open or depressed skull fracture"
  },
  worsening_headache: {
    es: "Cefalea en empeoramiento",
    en: "Worsening headache"
  },
  irritability_on_exam: {
    es: "Irritabilidad en la exploracion",
    en: "Irritability on examination"
  },
  signs_of_basal_skull_fracture: {
    es: "Signos de fractura de base de craneo",
    en: "Signs of basal skull fracture"
  },
  large_boggy_scalp_hematoma: {
    es: "Hematoma de cuero cabelludo grande y blando",
    en: "Large boggy scalp hematoma"
  },
  dangerous_mechanism: {
    es: "Mecanismo peligroso segun regla CATCH",
    en: "Dangerous mechanism according to CATCH"
  }
};

const classificationText = {
  high: {
    es: "Segun los criterios CATCH publicados, se identifican criterios de mayor riesgo.",
    en: "According to the published CATCH criteria, higher-risk criteria are identified."
  },
  medium: {
    es: "Segun los criterios CATCH publicados, se identifican criterios de riesgo medio.",
    en: "According to the published CATCH criteria, medium-risk criteria are identified."
  },
  none: {
    es: "Segun los criterios CATCH publicados, no se identifican criterios de la regla.",
    en: "According to the published CATCH criteria, no rule criteria are identified."
  }
} satisfies Record<string, LocalizedText>;

const informationalWarning = warning(
  "clinical_rule_traceability_only",
  "Esta regla se muestra como apoyo informativo y de trazabilidad. No sustituye la valoracion clinica ni los protocolos locales.",
  "This rule is shown for informational and traceability purposes. It does not replace clinical assessment or local protocols."
);

export const catchCalculator: CalculatorDefinition = {
  toolId: "catch_tbi",
  calculate(input: CalculatorInput): CalculationResult {
    const trace = [];
    const matched: LocalizedText[] = [];
    let hasHighRisk = false;
    let hasMediumRisk = false;

    for (const inputId of inputIds) {
      if (input[inputId] === undefined || input[inputId] === null || input[inputId] === "") {
        return missingResult("catch_tbi", inputIds);
      }

      const value = getBoolean(input, inputId);

      if (value === null) {
        return {
          toolId: "catch_tbi",
          warnings: [
            warning(
              "invalid_boolean_input",
              "Los criterios de la regla deben ser verdadero o falso.",
              "Rule criteria must be true or false."
            )
          ],
          trace: [{ inputId, value: input[inputId] }]
        };
      }

      trace.push({ inputId, value });

      if (value) {
        const criterionLabel = labels[inputId];
        if (criterionLabel) {
          matched.push(criterionLabel);
        }
        if (highRiskInputIds.includes(inputId)) {
          hasHighRisk = true;
        } else {
          hasMediumRisk = true;
        }
      }
    }

    const classification = hasHighRisk
      ? classificationText.high
      : hasMediumRisk
        ? classificationText.medium
        : classificationText.none;

    return {
      toolId: "catch_tbi",
      classification,
      criteriaMatched: matched,
      warnings: [informationalWarning],
      trace
    };
  }
};
