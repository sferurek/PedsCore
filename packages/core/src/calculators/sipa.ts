import type { CalculationResult, CalculationWarning, LocalizedText } from "../types.js";
import { getNumber, getTool, label, warning } from "./common.js";
import type { CalculatorDefinition } from "./common.js";

interface SipaThreshold {
  id: string;
  minAge: number;
  maxAge?: number;
  threshold: number;
  label: LocalizedText;
}

const thresholds: SipaThreshold[] = [
  {
    id: "4_to_under_6",
    minAge: 4,
    maxAge: 6,
    threshold: 1.2,
    label: { es: "4 a <6 anos", en: "4 to <6 years" }
  },
  {
    id: "6_to_12",
    minAge: 6,
    maxAge: 12,
    threshold: 1,
    label: { es: "6 a 12 anos", en: "6 to 12 years" }
  },
  {
    id: "over_12",
    minAge: 12,
    threshold: 0.9,
    label: { es: "Mas de 12 anos", en: "Older than 12 years" }
  }
];

const getThreshold = (ageYears: number): SipaThreshold | undefined =>
  thresholds.find((threshold) => {
    const minMatches = ageYears >= threshold.minAge;
    const maxMatches = threshold.maxAge === undefined || ageYears < threshold.maxAge;
    return minMatches && maxMatches;
  });

const noThresholdWarning = warning(
  "sipa_age_threshold_not_validated",
  "La documentacion local no incluye umbral SIPA validado para esta edad; se muestra solo el indice calculado.",
  "Local documentation does not include a validated SIPA threshold for this age; only the calculated index is shown."
);

const contextWarning = warning(
  "sipa_context_required",
  "Resultado informativo. Interpretar en contexto clinico y protocolos locales.",
  "Informational result. Interpret in clinical context and local protocols."
);

const classificationFor = (
  shockIndex: number,
  threshold: SipaThreshold
): LocalizedText => {
  if (shockIndex > threshold.threshold) {
    return {
      es: `El indice calculado supera el umbral documentado (${threshold.threshold}) para ${threshold.label.es}.`,
      en: `The calculated index is above the documented threshold (${threshold.threshold}) for ${threshold.label.en}.`
    };
  }

  return {
    es: `El indice calculado no supera el umbral documentado (${threshold.threshold}) para ${threshold.label.es}.`,
    en: `The calculated index is not above the documented threshold (${threshold.threshold}) for ${threshold.label.en}.`
  };
};

export const sipaCalculator: CalculatorDefinition = {
  toolId: "sipa",
  calculate: (input): CalculationResult => {
    const tool = getTool("sipa");
    const ageYears = getNumber(input, "age_years");
    const heartRate = getNumber(input, "heart_rate_bpm");
    const systolicBloodPressure = getNumber(input, "systolic_blood_pressure_mm_hg");

    if (ageYears === null || heartRate === null || systolicBloodPressure === null) {
      return {
        toolId: tool.id,
        warnings: [
          warning(
            "missing_required_inputs",
            "Se requieren edad, frecuencia cardiaca y presion arterial sistolica.",
            "Age, heart rate, or systolic blood pressure is missing."
          )
        ],
        trace: [
          { inputId: "age_years", value: input.age_years },
          { inputId: "heart_rate_bpm", value: input.heart_rate_bpm },
          {
            inputId: "systolic_blood_pressure_mm_hg",
            value: input.systolic_blood_pressure_mm_hg
          }
        ]
      };
    }

    if (ageYears < 0 || heartRate <= 0 || systolicBloodPressure <= 0) {
      return {
        toolId: tool.id,
        warnings: [
          warning(
            "invalid_sipa_inputs",
            "Edad, frecuencia cardiaca y presion arterial sistolica deben estar en rangos numericos validos.",
            "Age, heart rate, and systolic blood pressure must be in valid numeric ranges."
          )
        ],
        trace: [
          { inputId: "age_years", value: ageYears },
          { inputId: "heart_rate_bpm", value: heartRate },
          { inputId: "systolic_blood_pressure_mm_hg", value: systolicBloodPressure }
        ]
      };
    }

    const shockIndex = Number((heartRate / systolicBloodPressure).toFixed(2));
    const threshold = getThreshold(ageYears);
    const warnings: CalculationWarning[] = [contextWarning];

    if (!threshold) {
      warnings.push(noThresholdWarning);
    }

    if (ageYears > 18 || heartRate > 240 || systolicBloodPressure > 220 || systolicBloodPressure < 40) {
      warnings.push(
        warning(
          "extreme_sipa_input",
          "Valor extremo detectado; revisar unidades y medicion antes de interpretar.",
          "Extreme value detected; review units and measurement before interpretation."
        )
      );
    }

    return {
      toolId: tool.id,
      value: shockIndex,
      unit: "ratio",
      label: label("Indice de shock", "Shock index"),
      ...(threshold ? { classification: classificationFor(shockIndex, threshold) } : {}),
      warnings,
      trace: [
        { inputId: "age_years", value: ageYears },
        { inputId: "heart_rate_bpm", value: heartRate },
        { inputId: "systolic_blood_pressure_mm_hg", value: systolicBloodPressure },
        ...(threshold
          ? [
              {
                inputId: "documented_threshold",
                value: threshold.threshold
              }
            ]
          : [])
      ]
    };
  }
};
