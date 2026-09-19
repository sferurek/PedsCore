import type { CalculationResult, LocalizedText } from "../types.js";
import { getBoolean, getNumber, getTool, label, warning } from "./common.js";
import type { CalculatorDefinition } from "./common.js";

const highRiskResult = (
  toolId: string,
  reason: LocalizedText,
  trace: CalculationResult["trace"]
): CalculationResult => ({
  toolId,
  score: 2,
  maxScore: 2,
  classification: label(
    "Alto riesgo según Step-by-Step",
    "High risk by Step-by-Step"
  ),
  criteriaMatched: [reason],
  warnings: [
    warning(
      "step_by_step_not_management",
      "La clasificación Step-by-Step es una estratificación de riesgo de infección bacteriana invasiva en la población validada; PedsCore no la convierte en una orden de alta, ingreso, punción lumbar o antibioterapia.",
      "Step-by-Step is a risk stratification for invasive bacterial infection in its validated population; PedsCore does not convert it into a discharge, admission, lumbar-puncture, or antibiotic instruction."
    )
  ],
  trace
});

export const stepByStepCalculator: CalculatorDefinition = {
  toolId: "step_by_step",
  calculate: (input): CalculationResult => {
    const tool = getTool("step-by-step-febrile-infant");
    const ageDays = getNumber(input, "age_days");
    const feverWithoutSource = getBoolean(input, "fever_without_source");

    if (ageDays === null || feverWithoutSource === null) {
      return {
        toolId: tool.id,
        warnings: [
          warning(
            "missing_step_by_step_eligibility",
            "Completa edad y confirma si existe fiebre sin foco aparente.",
            "Complete age and confirm whether fever without an apparent source is present."
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

    if (ageDays <= 21) {
      return highRiskResult(
        tool.id,
        label("Edad ≤21 días", "Age ≤21 days"),
        [
          { inputId: "age_days", value: ageDays, score: 2 },
          { inputId: "fever_without_source", value: feverWithoutSource }
        ]
      );
    }

    const wellAppearing = getBoolean(input, "well_appearing");
    if (wellAppearing === null) {
      return {
        toolId: tool.id,
        warnings: [
          warning(
            "missing_step_by_step_appearance",
            "Completa la valoración del estado general.",
            "Complete the general-appearance assessment."
          )
        ],
        trace: [
          { inputId: "age_days", value: ageDays },
          { inputId: "fever_without_source", value: feverWithoutSource }
        ]
      };
    }

    if (!wellAppearing) {
      return highRiskResult(
        tool.id,
        label("Mal aspecto clínico", "Ill appearance"),
        [
          { inputId: "age_days", value: ageDays },
          { inputId: "fever_without_source", value: feverWithoutSource },
          { inputId: "well_appearing", value: wellAppearing, score: 2 }
        ]
      );
    }

    const leukocyturia = getBoolean(input, "leukocyturia");
    if (leukocyturia === null) {
      return {
        toolId: tool.id,
        warnings: [
          warning(
            "missing_step_by_step_urine",
            "Completa la valoración de leucocituria.",
            "Complete the leukocyturia assessment."
          )
        ],
        trace: [
          { inputId: "age_days", value: ageDays },
          { inputId: "fever_without_source", value: feverWithoutSource },
          { inputId: "well_appearing", value: wellAppearing }
        ]
      };
    }

    if (leukocyturia) {
      return highRiskResult(
        tool.id,
        label("Leucocituria", "Leukocyturia"),
        [
          { inputId: "age_days", value: ageDays },
          { inputId: "fever_without_source", value: feverWithoutSource },
          { inputId: "well_appearing", value: wellAppearing },
          { inputId: "leukocyturia", value: leukocyturia, score: 2 }
        ]
      );
    }

    const pct = getNumber(input, "procalcitonin_ng_ml");
    if (pct === null) {
      return {
        toolId: tool.id,
        warnings: [
          warning(
            "missing_step_by_step_pct",
            "Completa la procalcitonina para continuar la secuencia Step-by-Step.",
            "Complete procalcitonin to continue the Step-by-Step sequence."
          )
        ],
        trace: [
          { inputId: "age_days", value: ageDays },
          { inputId: "fever_without_source", value: feverWithoutSource },
          { inputId: "well_appearing", value: wellAppearing },
          { inputId: "leukocyturia", value: leukocyturia }
        ]
      };
    }

    if (pct < 0) {
      return {
        toolId: tool.id,
        warnings: [
          warning(
            "invalid_step_by_step_pct",
            "Revisa el valor de procalcitonina.",
            "Review the procalcitonin value."
          )
        ],
        trace: [{ inputId: "procalcitonin_ng_ml", value: pct }]
      };
    }

    if (pct >= 0.5) {
      return highRiskResult(
        tool.id,
        label("PCT ≥0,5 ng/mL", "PCT ≥0.5 ng/mL"),
        [
          { inputId: "age_days", value: ageDays },
          { inputId: "fever_without_source", value: feverWithoutSource },
          { inputId: "well_appearing", value: wellAppearing },
          { inputId: "leukocyturia", value: leukocyturia },
          { inputId: "procalcitonin_ng_ml", value: pct, score: 2 }
        ]
      );
    }

    const crp = getNumber(input, "crp_mg_l");
    const anc = getNumber(input, "anc");
    if (crp === null || anc === null) {
      return {
        toolId: tool.id,
        warnings: [
          warning(
            "missing_step_by_step_intermediate_inputs",
            "Con los criterios de alto riesgo negativos, completa PCR y ANC para diferenciar riesgo intermedio de bajo.",
            "With high-risk criteria negative, complete CRP and ANC to distinguish intermediate from low risk."
          )
        ],
        trace: [
          { inputId: "age_days", value: ageDays },
          { inputId: "fever_without_source", value: feverWithoutSource },
          { inputId: "well_appearing", value: wellAppearing },
          { inputId: "leukocyturia", value: leukocyturia },
          { inputId: "procalcitonin_ng_ml", value: pct }
        ]
      };
    }

    if (crp < 0 || anc < 0) {
      return {
        toolId: tool.id,
        warnings: [
          warning(
            "invalid_step_by_step_inputs",
            "Revisa PCR y ANC antes de completar Step-by-Step.",
            "Review CRP and ANC before completing Step-by-Step."
          )
        ],
        trace: []
      };
    }

    const intermediateReasons = [
      ...(crp > 20 ? [label("PCR >20 mg/L", "CRP >20 mg/L")] : []),
      ...(anc > 10000 ? [label("ANC >10.000/mm³", "ANC >10,000/mm³")] : [])
    ];
    const score = intermediateReasons.length > 0 ? 1 : 0;

    return {
      toolId: tool.id,
      score,
      maxScore: 2,
      classification:
        score === 1
          ? label(
              "Riesgo intermedio según Step-by-Step",
              "Intermediate risk by Step-by-Step"
            )
          : label("Bajo riesgo según Step-by-Step", "Low risk by Step-by-Step"),
      criteriaMatched:
        score === 1
          ? intermediateReasons
          : [
              label(
                "Ningún criterio de alto o intermedio riesgo",
                "No high- or intermediate-risk criterion"
              )
            ],
      warnings: [
        warning(
          "step_by_step_not_management",
          "La clasificación Step-by-Step es una estratificación de riesgo de infección bacteriana invasiva en la población validada; PedsCore no la convierte en una orden de alta, ingreso, punción lumbar o antibioterapia.",
          "Step-by-Step is a risk stratification for invasive bacterial infection in its validated population; PedsCore does not convert it into a discharge, admission, lumbar-puncture, or antibiotic instruction."
        )
      ],
      trace: [
        { inputId: "age_days", value: ageDays },
        { inputId: "fever_without_source", value: feverWithoutSource },
        { inputId: "well_appearing", value: wellAppearing },
        { inputId: "leukocyturia", value: leukocyturia },
        { inputId: "procalcitonin_ng_ml", value: pct },
        { inputId: "crp_mg_l", value: crp, score: crp > 20 ? 1 : 0 },
        { inputId: "anc", value: anc, score: anc > 10000 ? 1 : 0 }
      ]
    };
  }
};
