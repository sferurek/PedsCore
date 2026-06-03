import type { CalculationResult, LocalizedText } from "../types.js";
import { getBoolean, missingResult, warning } from "./common.js";
import type { CalculatorDefinition, CalculatorInput } from "./common.js";

const inputIds = [
  "witnessed_loss_of_consciousness_over_5_minutes",
  "history_of_amnesia_over_5_minutes",
  "abnormal_drowsiness",
  "three_or_more_vomiting_episodes",
  "suspicion_of_non_accidental_injury",
  "post_traumatic_seizure_without_epilepsy",
  "gcs_less_than_14_or_under_1_less_than_15",
  "suspected_penetrating_or_depressed_skull_injury_or_tense_fontanelle",
  "signs_of_basal_skull_fracture",
  "focal_neurology",
  "bruise_swelling_laceration_over_5cm_under_1_year",
  "high_speed_road_traffic_mechanism",
  "fall_over_3_metres",
  "high_speed_projectile_or_object"
];

const labels: Record<string, LocalizedText> = {
  witnessed_loss_of_consciousness_over_5_minutes: {
    es: "Perdida de conciencia presenciada mayor de 5 minutos",
    en: "Witnessed loss of consciousness over 5 minutes"
  },
  history_of_amnesia_over_5_minutes: {
    es: "Amnesia mayor de 5 minutos",
    en: "History of amnesia over 5 minutes"
  },
  abnormal_drowsiness: {
    es: "Somnolencia anormal",
    en: "Abnormal drowsiness"
  },
  three_or_more_vomiting_episodes: {
    es: "Tres o mas episodios de vomitos",
    en: "Three or more vomiting episodes"
  },
  suspicion_of_non_accidental_injury: {
    es: "Sospecha de lesion no accidental",
    en: "Suspicion of non-accidental injury"
  },
  post_traumatic_seizure_without_epilepsy: {
    es: "Convulsion postraumatica sin epilepsia conocida",
    en: "Post-traumatic seizure without known epilepsy"
  },
  gcs_less_than_14_or_under_1_less_than_15: {
    es: "GCS menor de 14, o menor de 15 si tiene menos de 1 ano",
    en: "GCS less than 14, or less than 15 if under 1 year"
  },
  suspected_penetrating_or_depressed_skull_injury_or_tense_fontanelle: {
    es: "Sospecha de lesion craneal penetrante/deprimida o fontanela tensa",
    en: "Suspected penetrating/depressed skull injury or tense fontanelle"
  },
  signs_of_basal_skull_fracture: {
    es: "Signos de fractura de base de craneo",
    en: "Signs of basal skull fracture"
  },
  focal_neurology: {
    es: "Neurologia focal",
    en: "Focal neurology"
  },
  bruise_swelling_laceration_over_5cm_under_1_year: {
    es: "Hematoma, tumefaccion o laceracion mayor de 5 cm si menor de 1 ano",
    en: "Bruise, swelling, or laceration over 5 cm if under 1 year"
  },
  high_speed_road_traffic_mechanism: {
    es: "Mecanismo de trafico de alta energia",
    en: "High-energy road traffic mechanism"
  },
  fall_over_3_metres: {
    es: "Caida mayor de 3 metros",
    en: "Fall over 3 metres"
  },
  high_speed_projectile_or_object: {
    es: "Proyectil u objeto de alta energia",
    en: "High-energy projectile or object"
  }
};

const classificationText = {
  criteria: {
    es: "Segun los criterios CHALICE publicados, se identifican criterios de la regla.",
    en: "According to the published CHALICE criteria, rule criteria are identified."
  },
  none: {
    es: "Segun los criterios CHALICE publicados, no se identifican criterios de la regla.",
    en: "According to the published CHALICE criteria, no rule criteria are identified."
  }
} satisfies Record<string, LocalizedText>;

const informationalWarning = warning(
  "clinical_rule_traceability_only",
  "Esta regla se muestra solo como apoyo informativo y de trazabilidad. No sustituye la valoracion clinica, los protocolos locales ni la decision medica.",
  "This rule is shown only for informational and traceability purposes. It does not replace clinical assessment, local protocols or medical decision-making."
);

export const chaliceCalculator: CalculatorDefinition = {
  toolId: "chalice_tbi",
  calculate(input: CalculatorInput): CalculationResult {
    const trace = [];
    const matched: LocalizedText[] = [];

    for (const inputId of inputIds) {
      if (input[inputId] === undefined || input[inputId] === null || input[inputId] === "") {
        return missingResult("chalice_tbi", inputIds);
      }

      const value = getBoolean(input, inputId);

      if (value === null) {
        return {
          toolId: "chalice_tbi",
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
      }
    }

    return {
      toolId: "chalice_tbi",
      classification: matched.length > 0 ? classificationText.criteria : classificationText.none,
      criteriaMatched: matched,
      warnings: [informationalWarning],
      trace
    };
  }
};
