import type { CalculationResult } from "../types.js";
import {
  getBoolean,
  getNumber,
  getTool,
  label,
  warning
} from "./common.js";
import type { CalculatorDefinition } from "./common.js";

const infectionContextWarning = warning(
  "infection_rule_context",
  "Herramienta de apoyo clinico. Debe aplicarse solo a la poblacion y contexto para los que fue validada y no sustituye la valoracion clinica ni los protocolos locales.",
  "Clinical-support tool. Apply only to the validated population and context; it does not replace clinical assessment or local protocols."
);

export const bacterialMeningitisScoreCalculator: CalculatorDefinition = {
  toolId: "bacterial_meningitis_score",
  calculate: (input): CalculationResult => {
    const tool = getTool("bacterial-meningitis-score");
    const ageDays = getNumber(input, "age_days");
    const csfWbc = getNumber(input, "csf_wbc");
    const antibioticsBeforeLp = getBoolean(input, "antibiotics_before_lp");
    const criticalIllness = getBoolean(input, "critical_illness");
    const immunosuppression = getBoolean(input, "immunosuppression");
    const cnsDeviceOrRecentNeurosurgery = getBoolean(input, "cns_device_or_recent_neurosurgery");
    const otherBacterialInfection = getBoolean(input, "other_bacterial_infection");

    if (
      ageDays === null || csfWbc === null ||
      antibioticsBeforeLp === null || criticalIllness === null ||
      immunosuppression === null || cnsDeviceOrRecentNeurosurgery === null ||
      otherBacterialInfection === null
    ) {
      return {
        toolId: tool.id,
        warnings: [warning(
          "missing_bms_eligibility",
          "Faltan datos de elegibilidad para aplicar BMS.",
          "Eligibility data are missing for BMS."
        )],
        trace: []
      };
    }

    const outsideValidatedPopulation =
      ageDays < 29 ||
      csfWbc < 10 ||
      antibioticsBeforeLp ||
      criticalIllness ||
      immunosuppression ||
      cnsDeviceOrRecentNeurosurgery ||
      otherBacterialInfection;

    if (outsideValidatedPopulation) {
      return {
        toolId: tool.id,
        classification: label(
          "Fuera de la poblacion validada para BMS",
          "Outside the validated BMS population"
        ),
        warnings: [
          infectionContextWarning,
          warning(
            "bms_not_applicable",
            "BMS no debe interpretarse como regla validada en este contexto.",
            "BMS should not be interpreted as a validated rule in this context."
          )
        ],
        trace: [
          { inputId: "age_days", value: ageDays },
          { inputId: "csf_wbc", value: csfWbc },
          { inputId: "antibiotics_before_lp", value: antibioticsBeforeLp },
          { inputId: "critical_illness", value: criticalIllness },
          { inputId: "immunosuppression", value: immunosuppression },
          { inputId: "cns_device_or_recent_neurosurgery", value: cnsDeviceOrRecentNeurosurgery },
          { inputId: "other_bacterial_infection", value: otherBacterialInfection }
        ]
      };
    }

    const gramPositive = getBoolean(input, "csf_gram_positive");
    const csfAnc = getNumber(input, "csf_anc");
    const csfProtein = getNumber(input, "csf_protein_mg_dl");
    const peripheralAnc = getNumber(input, "peripheral_anc");
    const seizure = getBoolean(input, "seizure");

    if (
      gramPositive === null || csfAnc === null || csfProtein === null ||
      peripheralAnc === null || seizure === null
    ) {
      return {
        toolId: tool.id,
        warnings: [warning(
          "missing_bms_inputs",
          "Faltan variables necesarias para calcular BMS.",
          "Required variables for BMS are missing."
        )],
        trace: []
      };
    }

    let score = 0;
    if (gramPositive) score += 2;
    if (csfAnc >= 1000) score += 1;
    if (csfProtein >= 80) score += 1;
    if (peripheralAnc >= 10000) score += 1;
    if (seizure) score += 1;

    return {
      toolId: tool.id,
      score,
      maxScore: 6,
      classification:
        score === 0
          ? label("Muy bajo riesgo segun BMS", "Very low risk by BMS")
          : label("No cumple criterios de muy bajo riesgo", "Does not meet very-low-risk criteria"),
      warnings: [infectionContextWarning],
      trace: [
        { inputId: "csf_gram_positive", value: gramPositive, score: gramPositive ? 2 : 0 },
        { inputId: "csf_anc", value: csfAnc, score: csfAnc >= 1000 ? 1 : 0 },
        { inputId: "csf_protein_mg_dl", value: csfProtein, score: csfProtein >= 80 ? 1 : 0 },
        { inputId: "peripheral_anc", value: peripheralAnc, score: peripheralAnc >= 10000 ? 1 : 0 },
        { inputId: "seizure", value: seizure, score: seizure ? 1 : 0 }
      ]
    };
  }
};

export const pecarnFebrileInfantCalculator: CalculatorDefinition = {
  toolId: "pecarn_febrile_infant",
  calculate: (input): CalculationResult => {
    const tool = getTool("pecarn-febrile-infant");
    const ageDays = getNumber(input, "age_days");
    const wellAppearing = getBoolean(input, "well_appearing");
    const previouslyHealthy = getBoolean(input, "previously_healthy");
    const termInfant = getBoolean(input, "term_infant");

    if (
      ageDays === null || wellAppearing === null ||
      previouslyHealthy === null || termInfant === null
    ) {
      return {
        toolId: tool.id,
        warnings: [warning(
          "missing_pecarn_fi_eligibility",
          "Faltan datos de elegibilidad para aplicar la regla PECARN del lactante febril.",
          "Eligibility data are missing for the PECARN febrile infant rule."
        )],
        trace: []
      };
    }

    if (
      ageDays < 0 || ageDays > 60 ||
      !wellAppearing || !previouslyHealthy || !termInfant
    ) {
      return {
        toolId: tool.id,
        classification: label(
          "Fuera de la poblacion validada para esta regla PECARN",
          "Outside the validated population for this PECARN rule"
        ),
        warnings: [infectionContextWarning],
        trace: [
          { inputId: "age_days", value: ageDays },
          { inputId: "well_appearing", value: wellAppearing },
          { inputId: "previously_healthy", value: previouslyHealthy },
          { inputId: "term_infant", value: termInfant }
        ]
      };
    }

    const urineNegative = getBoolean(input, "urinalysis_negative");
    const anc = getNumber(input, "anc");
    const procalcitonin = getNumber(input, "procalcitonin_ng_ml");

    if (urineNegative === null || anc === null || procalcitonin === null) {
      return {
        toolId: tool.id,
        warnings: [warning(
          "missing_pecarn_fi_inputs",
          "Faltan urianalisis, ANC o procalcitonina.",
          "Urinalysis, ANC, or procalcitonin is missing."
        )],
        trace: []
      };
    }

    if (anc < 0 || procalcitonin < 0) {
      return {
        toolId: tool.id,
        warnings: [warning(
          "invalid_pecarn_fi_inputs",
          "ANC y procalcitonina deben ser valores validos y no negativos.",
          "ANC and procalcitonin must be valid non-negative values."
        )],
        trace: []
      };
    }

    const lowRisk = urineNegative && anc <= 4000 && procalcitonin <= 0.5;

    return {
      toolId: tool.id,
      score: lowRisk ? 0 : 1,
      maxScore: 1,
      classification: lowRisk
        ? label("Cumple criterios PECARN de bajo riesgo", "Meets PECARN low-risk criteria")
        : label("No cumple todos los criterios PECARN de bajo riesgo", "Does not meet all PECARN low-risk criteria"),
      criteriaMatched: lowRisk
        ? [label("Urianalisis negativo, ANC ≤4000/mm³ y PCT ≤0,5 ng/mL", "Negative urinalysis, ANC ≤4000/mm³, and PCT ≤0.5 ng/mL")]
        : [],
      warnings: [
        infectionContextWarning,
        warning(
          "pecarn_fi_not_management_protocol",
          "La clasificacion de riesgo no determina por si sola la necesidad de puncion lumbar, antibioticos, ingreso o alta.",
          "Risk classification alone does not determine lumbar puncture, antibiotics, admission, or discharge."
        )
      ],
      trace: [
        { inputId: "urinalysis_negative", value: urineNegative },
        { inputId: "anc", value: anc },
        { inputId: "procalcitonin_ng_ml", value: procalcitonin }
      ]
    };
  }
};
