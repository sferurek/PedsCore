import type { CalculationResult, LocalizedText } from "../types.js";
import { getBoolean, missingResult, warning } from "./common.js";
import type { CalculatorDefinition, CalculatorInput } from "./common.js";

const under2InputIds = [
  "altered_mental_status_or_gcs_less_than_15",
  "palpable_skull_fracture",
  "non_frontal_scalp_hematoma",
  "loss_of_consciousness_5_seconds_or_more",
  "severe_mechanism",
  "abnormal_behavior_per_parent"
];

const twoOrMoreInputIds = [
  "altered_mental_status_or_gcs_less_than_15",
  "signs_of_basilar_skull_fracture",
  "history_of_loss_of_consciousness",
  "history_of_vomiting",
  "severe_mechanism",
  "severe_headache"
];

const labels: Record<string, LocalizedText> = {
  altered_mental_status_or_gcs_less_than_15: {
    es: "Alteracion del estado mental o GCS menor de 15",
    en: "Altered mental status or GCS less than 15"
  },
  palpable_skull_fracture: {
    es: "Fractura craneal palpable",
    en: "Palpable skull fracture"
  },
  non_frontal_scalp_hematoma: {
    es: "Hematoma no frontal",
    en: "Non-frontal scalp hematoma"
  },
  loss_of_consciousness_5_seconds_or_more: {
    es: "Perdida de conciencia de 5 segundos o mas",
    en: "Loss of consciousness 5 seconds or more"
  },
  severe_mechanism: {
    es: "Mecanismo grave",
    en: "Severe mechanism"
  },
  abnormal_behavior_per_parent: {
    es: "Comportamiento anormal segun padres",
    en: "Abnormal behavior according to parent"
  },
  signs_of_basilar_skull_fracture: {
    es: "Signos de fractura basilar",
    en: "Signs of basilar skull fracture"
  },
  history_of_loss_of_consciousness: {
    es: "Antecedente de perdida de conciencia",
    en: "History of loss of consciousness"
  },
  history_of_vomiting: {
    es: "Antecedente de vomitos",
    en: "History of vomiting"
  },
  severe_headache: {
    es: "Cefalea severa",
    en: "Severe headache"
  }
};

const classificationText = {
  high: {
    es: "Segun los criterios PECARN publicados, se identifican criterios de mayor riesgo.",
    en: "According to the published PECARN criteria, higher-risk criteria are identified."
  },
  intermediate: {
    es: "Segun los criterios PECARN publicados, se identifican criterios intermedios.",
    en: "According to the published PECARN criteria, intermediate criteria are identified."
  },
  none: {
    es: "Segun los criterios PECARN publicados, no se identifican predictores de la regla.",
    en: "According to the published PECARN criteria, no rule predictors are identified."
  }
} satisfies Record<string, LocalizedText>;

const informationalWarning = warning(
  "clinical_rule_traceability_only",
  "Esta regla se muestra solo como apoyo informativo y de trazabilidad. No sustituye la valoracion clinica, los protocolos locales ni la decision medica.",
  "This rule is shown only for informational and traceability purposes. It does not replace clinical assessment, local protocols or medical decision-making."
);

const calculatePecarn = (
  toolId: string,
  input: CalculatorInput,
  inputIds: string[],
  highRiskIds: string[]
): CalculationResult => {
  const trace = [];
  const matched: LocalizedText[] = [];
  const highRiskSet = new Set(highRiskIds);
  let hasHighRisk = false;
  let hasIntermediate = false;

  for (const inputId of inputIds) {
    if (input[inputId] === undefined || input[inputId] === null || input[inputId] === "") {
      return missingResult(toolId, inputIds);
    }

    const value = getBoolean(input, inputId);

    if (value === null) {
      return {
        toolId,
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
      if (highRiskSet.has(inputId)) {
        hasHighRisk = true;
      } else {
        hasIntermediate = true;
      }
    }
  }

  const classification = hasHighRisk
    ? classificationText.high
    : hasIntermediate
      ? classificationText.intermediate
      : classificationText.none;

  return {
    toolId,
    classification,
    criteriaMatched: matched,
    warnings: [informationalWarning],
    trace
  };
};

export const pecarnUnder2Calculator: CalculatorDefinition = {
  toolId: "pecarn_tbi_under_2",
  calculate: (input) =>
    calculatePecarn("pecarn_tbi_under_2", input, under2InputIds, [
      "altered_mental_status_or_gcs_less_than_15",
      "palpable_skull_fracture"
    ])
};

export const pecarn2OrMoreCalculator: CalculatorDefinition = {
  toolId: "pecarn_tbi_2_or_more",
  calculate: (input) =>
    calculatePecarn("pecarn_tbi_2_or_more", input, twoOrMoreInputIds, [
      "altered_mental_status_or_gcs_less_than_15",
      "signs_of_basilar_skull_fracture"
    ])
};
