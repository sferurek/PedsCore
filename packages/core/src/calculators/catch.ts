import type { CalculationResult, LocalizedText } from "../types.js";
import { getBoolean, getNumber, missingResult, warning } from "./common.js";
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

const predictorIds = [...highRiskInputIds, ...mediumRiskInputIds];

const eligibilityBooleanIds = [
  "injury_within_24h",
  "witnessed_loss_of_consciousness",
  "definite_amnesia",
  "witnessed_disorientation",
  "persistent_vomiting_more_than_one_episode",
  "persistent_irritability_if_under_2",
  "obvious_penetrating_skull_injury",
  "obvious_depressed_skull_fracture",
  "acute_focal_neurologic_deficit",
  "chronic_generalized_developmental_delay",
  "suspected_child_abuse",
  "returning_for_reassessment"
];

const labels: Record<string, LocalizedText> = {
  gcs_less_than_15_at_2_hours: { es: "GCS menor de 15 a las 2 horas", en: "GCS less than 15 at 2 hours" },
  suspected_open_or_depressed_skull_fracture: { es: "Sospecha de fractura craneal abierta o deprimida", en: "Suspected open or depressed skull fracture" },
  worsening_headache: { es: "Cefalea en empeoramiento", en: "Worsening headache" },
  irritability_on_exam: { es: "Irritabilidad en la exploración", en: "Irritability on examination" },
  signs_of_basal_skull_fracture: { es: "Signos de fractura de base de cráneo", en: "Signs of basal skull fracture" },
  large_boggy_scalp_hematoma: { es: "Hematoma de cuero cabelludo grande y blando", en: "Large boggy scalp hematoma" },
  dangerous_mechanism: { es: "Mecanismo peligroso según CATCH", en: "Dangerous mechanism according to CATCH" }
};

const classificationText = {
  high: { es: "Según los criterios CATCH publicados, se identifican criterios de mayor riesgo.", en: "According to the published CATCH criteria, higher-risk criteria are identified." },
  medium: { es: "Según los criterios CATCH publicados, se identifican criterios de riesgo medio.", en: "According to the published CATCH criteria, medium-risk criteria are identified." },
  none: { es: "Según los criterios CATCH publicados, no se identifican criterios de la regla.", en: "According to the published CATCH criteria, no rule criteria are identified." }
} satisfies Record<string, LocalizedText>;

const informationalWarning = warning(
  "clinical_rule_traceability_only",
  "Esta regla se muestra solo como apoyo informativo y de trazabilidad. No sustituye la valoración clínica, los protocolos locales ni la decisión médica.",
  "This rule is shown only for informational and traceability purposes. It does not replace clinical assessment, local protocols or medical decision-making."
);

const validateCatchEligibility = (input: CalculatorInput): CalculationResult | null => {
  const ageYears = getNumber(input, "age_years");
  const initialGcs = getNumber(input, "initial_gcs");
  const requiredIds = ["age_years", "initial_gcs", ...eligibilityBooleanIds];

  for (const id of requiredIds) {
    if (input[id] === undefined || input[id] === null || input[id] === "") {
      return missingResult("catch_tbi", requiredIds);
    }
  }

  if (ageYears === null || initialGcs === null || ageYears < 0 || ageYears > 16 || initialGcs < 3 || initialGcs > 15) {
    return {
      toolId: "catch_tbi",
      warnings: [warning(
        "invalid_catch_eligibility",
        "Revisa edad y GCS antes de aplicar CATCH.",
        "Review age and GCS before applying CATCH."
      )],
      trace: []
    };
  }

  for (const id of eligibilityBooleanIds) {
    if (getBoolean(input, id) === null) {
      return {
        toolId: "catch_tbi",
        warnings: [warning(
          "invalid_catch_eligibility",
          "Los criterios de elegibilidad CATCH deben ser verdadero o falso.",
          "CATCH eligibility criteria must be true or false."
        )],
        trace: [{ inputId: id, value: input[id] }]
      };
    }
  }

  const qualifyingMinorHeadInjury =
    getBoolean(input, "witnessed_loss_of_consciousness") === true ||
    getBoolean(input, "definite_amnesia") === true ||
    getBoolean(input, "witnessed_disorientation") === true ||
    getBoolean(input, "persistent_vomiting_more_than_one_episode") === true ||
    (ageYears < 2 && getBoolean(input, "persistent_irritability_if_under_2") === true);

  const excluded = [
    "obvious_penetrating_skull_injury",
    "obvious_depressed_skull_fracture",
    "acute_focal_neurologic_deficit",
    "chronic_generalized_developmental_delay",
    "suspected_child_abuse",
    "returning_for_reassessment"
  ].some((id) => getBoolean(input, id) === true);

  if (
    ageYears > 16 ||
    getBoolean(input, "injury_within_24h") !== true ||
    initialGcs < 13 || initialGcs > 15 ||
    !qualifyingMinorHeadInjury ||
    excluded
  ) {
    return {
      toolId: "catch_tbi",
      warnings: [warning(
        "catch_outside_validated_population",
        "CATCH requiere lesión craneal menor aguda dentro de 24 h, GCS inicial 13-15, al menos un criterio definitorio de lesión menor y ausencia de las exclusiones publicadas.",
        "CATCH requires an acute minor head injury within 24 h, initial GCS 13-15, at least one defining minor-head-injury feature, and no published exclusion criteria."
      )],
      trace: [
        { inputId: "age_years", value: ageYears },
        { inputId: "initial_gcs", value: initialGcs },
        ...eligibilityBooleanIds.map((id) => ({ inputId: id, value: getBoolean(input, id) }))
      ]
    };
  }

  return null;
};

export const catchCalculator: CalculatorDefinition = {
  toolId: "catch_tbi",
  calculate(input: CalculatorInput): CalculationResult {
    const eligibilityFailure = validateCatchEligibility(input);
    if (eligibilityFailure) return eligibilityFailure;

    const trace: CalculationResult["trace"] = [];
    const matched: LocalizedText[] = [];
    let hasHighRisk = false;
    let hasMediumRisk = false;

    for (const inputId of predictorIds) {
      if (input[inputId] === undefined || input[inputId] === null || input[inputId] === "") {
        return missingResult("catch_tbi", predictorIds);
      }

      const value = getBoolean(input, inputId);
      if (value === null) {
        return {
          toolId: "catch_tbi",
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
        if (highRiskInputIds.includes(inputId)) hasHighRisk = true;
        else hasMediumRisk = true;
      }
    }

    return {
      toolId: "catch_tbi",
      classification: hasHighRisk ? classificationText.high : hasMediumRisk ? classificationText.medium : classificationText.none,
      criteriaMatched: matched,
      warnings: [informationalWarning],
      trace
    };
  }
};
