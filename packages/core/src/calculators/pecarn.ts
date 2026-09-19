import type { CalculationResult, LocalizedText } from "../types.js";
import { getBoolean, getNumber, missingResult, warning } from "./common.js";
import type { CalculatorDefinition, CalculatorInput } from "./common.js";

const under2PredictorIds = [
  "altered_mental_status_or_gcs_less_than_15",
  "palpable_skull_fracture",
  "non_frontal_scalp_hematoma",
  "loss_of_consciousness_5_seconds_or_more",
  "severe_mechanism",
  "abnormal_behavior_per_parent"
];

const twoOrMorePredictorIds = [
  "altered_mental_status_or_gcs_less_than_15",
  "signs_of_basilar_skull_fracture",
  "history_of_loss_of_consciousness",
  "history_of_vomiting",
  "severe_mechanism",
  "severe_headache"
];

const eligibilityBooleanIds = [
  "blunt_head_trauma",
  "presentation_within_24h",
  "trivial_mechanism_only",
  "penetrating_trauma",
  "known_brain_tumor",
  "preexisting_neurologic_disorder_complicating_assessment",
  "prior_neuroimaging_before_transfer",
  "ventricular_shunt",
  "bleeding_disorder"
];

const labels: Record<string, LocalizedText> = {
  altered_mental_status_or_gcs_less_than_15: {
    es: "Alteración del estado mental o GCS menor de 15",
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
    es: "Pérdida de conciencia de 5 segundos o más",
    en: "Loss of consciousness 5 seconds or more"
  },
  severe_mechanism: {
    es: "Mecanismo grave PECARN",
    en: "PECARN severe mechanism"
  },
  abnormal_behavior_per_parent: {
    es: "Comportamiento anormal según padres",
    en: "Abnormal behavior according to parent"
  },
  signs_of_basilar_skull_fracture: {
    es: "Signos de fractura basilar",
    en: "Signs of basilar skull fracture"
  },
  history_of_loss_of_consciousness: {
    es: "Antecedente de pérdida de conciencia",
    en: "History of loss of consciousness"
  },
  history_of_vomiting: {
    es: "Antecedente de vómitos",
    en: "History of vomiting"
  },
  severe_headache: {
    es: "Cefalea severa",
    en: "Severe headache"
  }
};

const classificationText = {
  high: {
    es: "Según los criterios PECARN publicados, se identifican criterios de mayor riesgo.",
    en: "According to the published PECARN criteria, higher-risk criteria are identified."
  },
  intermediate: {
    es: "Según los criterios PECARN publicados, se identifican criterios intermedios.",
    en: "According to the published PECARN criteria, intermediate criteria are identified."
  },
  none: {
    es: "Según los criterios PECARN publicados, no se identifican predictores de la regla.",
    en: "According to the published PECARN criteria, no rule predictors are identified."
  }
} satisfies Record<string, LocalizedText>;

const informationalWarning = warning(
  "clinical_rule_traceability_only",
  "Esta regla se muestra solo como apoyo informativo y de trazabilidad. No sustituye la valoración clínica, los protocolos locales ni la decisión médica.",
  "This rule is shown only for informational and traceability purposes. It does not replace clinical assessment, local protocols or medical decision-making."
);

const validateEligibility = (
  toolId: string,
  input: CalculatorInput,
  branch: "under2" | "two_or_more"
): CalculationResult | null => {
  const ageMonths = getNumber(input, "age_months");
  const gcs = getNumber(input, "initial_gcs");

  const requiredIds = ["age_months", "initial_gcs", ...eligibilityBooleanIds];
  for (const id of requiredIds) {
    if (input[id] === undefined || input[id] === null || input[id] === "") {
      return missingResult(toolId, requiredIds);
    }
  }

  if (ageMonths === null || gcs === null || ageMonths < 0 || ageMonths >= 216 || gcs < 3 || gcs > 15) {
    return {
      toolId,
      warnings: [warning(
        "invalid_pecarn_eligibility",
        "Revisa edad y GCS antes de aplicar PECARN.",
        "Review age and GCS before applying PECARN."
      )],
      trace: []
    };
  }

  for (const id of eligibilityBooleanIds) {
    if (getBoolean(input, id) === null) {
      return {
        toolId,
        warnings: [warning(
          "invalid_pecarn_eligibility",
          "Los criterios de elegibilidad PECARN deben ser verdadero o falso.",
          "PECARN eligibility criteria must be true or false."
        )],
        trace: [{ inputId: id, value: input[id] }]
      };
    }
  }

  const branchAgeOk = branch === "under2" ? ageMonths < 24 : ageMonths >= 24;
  const blunt = getBoolean(input, "blunt_head_trauma") === true;
  const within24h = getBoolean(input, "presentation_within_24h") === true;
  const excluded = [
    "trivial_mechanism_only",
    "penetrating_trauma",
    "known_brain_tumor",
    "preexisting_neurologic_disorder_complicating_assessment",
    "prior_neuroimaging_before_transfer",
    "ventricular_shunt",
    "bleeding_disorder"
  ].some((id) => getBoolean(input, id) === true);

  if (!branchAgeOk || !blunt || !within24h || gcs < 14 || gcs > 15 || excluded) {
    return {
      toolId,
      warnings: [warning(
        "pecarn_outside_validated_population",
        branch === "under2"
          ? "La rama PECARN <2 años requiere edad <24 meses, TCE cerrado/no trivial, presentación <24 h, GCS 14-15 y ausencia de las exclusiones publicadas."
          : "La rama PECARN ≥2 años requiere edad ≥24 meses y <18 años, TCE cerrado/no trivial, presentación <24 h, GCS 14-15 y ausencia de las exclusiones publicadas.",
        branch === "under2"
          ? "The PECARN <2-year branch requires age <24 months, non-trivial blunt head trauma, presentation <24 h, GCS 14-15, and no published exclusion criteria."
          : "The PECARN ≥2-year branch requires age ≥24 months and <18 years, non-trivial blunt head trauma, presentation <24 h, GCS 14-15, and no published exclusion criteria."
      )],
      trace: [
        { inputId: "age_months", value: ageMonths },
        { inputId: "initial_gcs", value: gcs },
        ...eligibilityBooleanIds.map((id) => ({ inputId: id, value: getBoolean(input, id) }))
      ]
    };
  }

  return null;
};

const calculatePecarn = (
  toolId: string,
  input: CalculatorInput,
  branch: "under2" | "two_or_more",
  predictorIds: string[],
  highRiskIds: string[]
): CalculationResult => {
  const eligibilityFailure = validateEligibility(toolId, input, branch);
  if (eligibilityFailure) return eligibilityFailure;

  const trace: CalculationResult["trace"] = [];
  const matched: LocalizedText[] = [];
  const highRiskSet = new Set(highRiskIds);
  let hasHighRisk = false;
  let hasIntermediate = false;

  for (const inputId of predictorIds) {
    if (input[inputId] === undefined || input[inputId] === null || input[inputId] === "") {
      return missingResult(toolId, predictorIds);
    }

    const value = getBoolean(input, inputId);
    if (value === null) {
      return {
        toolId,
        warnings: [warning(
          "invalid_boolean_input",
          "Los criterios de la regla deben ser verdadero o falso.",
          "Rule criteria must be true or false."
        )],
        trace: [{ inputId, value: input[inputId] }]
      };
    }

    trace.push({ inputId, value });
    if (value) {
      if (labels[inputId]) matched.push(labels[inputId]);
      if (highRiskSet.has(inputId)) hasHighRisk = true;
      else hasIntermediate = true;
    }
  }

  return {
    toolId,
    classification: hasHighRisk ? classificationText.high : hasIntermediate ? classificationText.intermediate : classificationText.none,
    criteriaMatched: matched,
    warnings: [informationalWarning],
    trace
  };
};

export const pecarnUnder2Calculator: CalculatorDefinition = {
  toolId: "pecarn_tbi_under_2",
  calculate: (input) =>
    calculatePecarn("pecarn_tbi_under_2", input, "under2", under2PredictorIds, [
      "altered_mental_status_or_gcs_less_than_15",
      "palpable_skull_fracture"
    ])
};

export const pecarn2OrMoreCalculator: CalculatorDefinition = {
  toolId: "pecarn_tbi_2_or_more",
  calculate: (input) =>
    calculatePecarn("pecarn_tbi_2_or_more", input, "two_or_more", twoOrMorePredictorIds, [
      "altered_mental_status_or_gcs_less_than_15",
      "signs_of_basilar_skull_fracture"
    ])
};
