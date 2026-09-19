import type { CalculationResult } from "../types.js";
import { getBoolean, getNumber, getTool, label, warning } from "./common.js";
import type { CalculatorDefinition } from "./common.js";

export const stepByStepCalculator: CalculatorDefinition = {
  toolId: "step_by_step",
  calculate: (input): CalculationResult => {
    const tool = getTool("step-by-step-febrile-infant");
    const ageDays = getNumber(input, "age_days");
    const feverWithoutSource = getBoolean(input, "fever_without_source");
    const wellAppearing = getBoolean(input, "well_appearing");
    const leukocyturia = getBoolean(input, "leukocyturia");
    const pct = getNumber(input, "procalcitonin_ng_ml");
    const crp = getNumber(input, "crp_mg_l");
    const anc = getNumber(input, "anc");

    if (
      ageDays === null ||
      feverWithoutSource === null ||
      wellAppearing === null ||
      leukocyturia === null ||
      pct === null ||
      crp === null ||
      anc === null
    ) {
      return {
        toolId: tool.id,
        warnings: [
          warning(
            "missing_step_by_step_inputs",
            "Completa edad, elegibilidad clínica, aspecto, orina, PCT, PCR y ANC.",
            "Complete age, clinical eligibility, appearance, urine, PCT, CRP, and ANC."
          )
        ],
        trace: []
      };
    }

    if (ageDays < 0 || ageDays > 90) {
      return {
        toolId: tool.id,
        warnings: [
          warning(
            "step_by_step_age_scope",
            "Step-by-Step fue validado en lactantes febriles de hasta 90 días.",
            "Step-by-Step was validated in febrile infants up to 90 days of age."
          )
        ],
        trace: [{ inputId: "age_days", value: ageDays }]
      };
    }

    if (!feverWithoutSource) {
      return {
        toolId: tool.id,
        classification: label(
          "Fuera de la población Step-by-Step seleccionada",
          "Outside the selected Step-by-Step population"
        ),
        warnings: [
          warning(
            "step_by_step_population",
            "Esta implementación corresponde a lactantes de hasta 90 días con fiebre sin foco. No clasifica otros contextos febriles.",
            "This implementation applies to infants up to 90 days old with fever without source. It does not classify other febrile contexts."
          )
        ],
        trace: [
          { inputId: "age_days", value: ageDays },
          { inputId: "fever_without_source", value: feverWithoutSource }
        ]
      };
    }

    const highRiskReasons = [
      ...(!wellAppearing ? [label("Mal aspecto clínico", "Ill appearance")] : []),
      ...(ageDays <= 21 ? [label("Edad ≤21 días", "Age ≤21 days")] : []),
      ...(leukocyturia ? [label("Leucocituria", "Leukocyturia")] : []),
      ...(pct >= 0.5 ? [label("PCT ≥0,5 ng/mL", "PCT ≥0.5 ng/mL")] : [])
    ];

    const intermediateReasons = [
      ...(crp > 20 ? [label("PCR >20 mg/L", "CRP >20 mg/L")] : []),
      ...(anc > 10000 ? [label("ANC >10.000/mm³", "ANC >10,000/mm³")] : [])
    ];

    const score = highRiskReasons.length > 0 ? 2 : intermediateReasons.length > 0 ? 1 : 0;
    const classification =
      score === 2
        ? label("Alto riesgo según Step-by-Step", "High risk by Step-by-Step")
        : score === 1
          ? label("Riesgo intermedio según Step-by-Step", "Intermediate risk by Step-by-Step")
          : label("Bajo riesgo según Step-by-Step", "Low risk by Step-by-Step");

    return {
      toolId: tool.id,
      score,
      maxScore: 2,
      classification,
      criteriaMatched:
        score === 2
          ? highRiskReasons
          : score === 1
            ? intermediateReasons
            : [label("Ningún criterio de alto o intermedio riesgo", "No high- or intermediate-risk criterion")],
      warnings: [
        warning(
          "step_by_step_not_management",
          "La clasificación Step-by-Step es una estratificación de riesgo de infección bacteriana invasiva en la población validada; PedsCore no la convierte en una orden de alta, ingreso, punción lumbar o antibioterapia.",
          "Step-by-Step is a risk stratification for invasive bacterial infection in its validated population; PedsCore does not convert it into a discharge, admission, lumbar-puncture, or antibiotic instruction."
        )
      ],
      trace: [
        { inputId: "age_days", value: ageDays, score: ageDays <= 21 ? 2 : 0 },
        { inputId: "fever_without_source", value: feverWithoutSource },
        { inputId: "well_appearing", value: wellAppearing, score: wellAppearing ? 0 : 2 },
        { inputId: "leukocyturia", value: leukocyturia, score: leukocyturia ? 2 : 0 },
        { inputId: "procalcitonin_ng_ml", value: pct, score: pct >= 0.5 ? 2 : 0 },
        { inputId: "crp_mg_l", value: crp, score: crp > 20 ? 1 : 0 },
        { inputId: "anc", value: anc, score: anc > 10000 ? 1 : 0 }
      ]
    };
  }
};
