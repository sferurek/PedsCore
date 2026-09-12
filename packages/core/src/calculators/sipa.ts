import type { CalculationResult, CalculationWarning, LocalizedText } from "../types.js";
import { getNumber, getTool, label, warning } from "./common.js";
import type { CalculatorDefinition } from "./common.js";

interface SipaThreshold {
  id: string;
  minAge: number;
  maxAge: number;
  threshold: number;
  label: LocalizedText;
}

const thresholds: SipaThreshold[] = [
  {
    id: "4_to_6",
    minAge: 4,
    maxAge: 7,
    threshold: 1.22,
    label: { es: "4 a 6 anos", en: "4 to 6 years" }
  },
  {
    id: "7_to_12",
    minAge: 7,
    maxAge: 13,
    threshold: 1,
    label: { es: "7 a 12 anos", en: "7 to 12 years" }
  },
  {
    id: "13_to_16",
    minAge: 13,
    maxAge: 17,
    threshold: 0.9,
    label: { es: "13 a 16 anos", en: "13 to 16 years" }
  }
];

const getThreshold = (ageYears: number): SipaThreshold | undefined =>
  thresholds.find((threshold) => {
    const minMatches = ageYears >= threshold.minAge;
    const maxMatches = ageYears < threshold.maxAge;
    return minMatches && maxMatches;
  });

const unsupportedAgeWarning = warning(
  "unsupported_sipa_age",
  "SIPA se publico y valido para pacientes de 4 a 16 anos con traumatismo. No se calcula una clasificacion fuera de ese intervalo.",
  "SIPA was published and validated for trauma patients aged 4 to 16 years. A classification is not calculated outside that range."
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
      es: `El indice calculado supera el umbral SIPA publicado (${threshold.threshold}) para ${threshold.label.es}.`,
      en: `The calculated index is above the published SIPA threshold (${threshold.threshold}) for ${threshold.label.en}.`
    };
  }

  return {
    es: `El indice calculado esta dentro del umbral SIPA publicado (${threshold.threshold}) para ${threshold.label.es}.`,
    en: `The calculated index is within the published SIPA threshold (${threshold.threshold}) for ${threshold.label.en}.`
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
      const rawValues = [
        input.age_years,
        input.heart_rate_bpm,
        input.systolic_blood_pressure_mm_hg
      ];
      const hasMissingValue = rawValues.some(
        (value) =>
          value === undefined ||
          value === null ||
          (typeof value === "string" && value.trim() === "")
      );

      return {
        toolId: tool.id,
        warnings: [
          hasMissingValue
            ? warning(
                "missing_required_inputs",
                "Se requieren edad, frecuencia cardiaca y presion arterial sistolica.",
                "Age, heart rate, or systolic blood pressure is missing."
              )
            : warning(
                "invalid_sipa_inputs",
                "Edad, frecuencia cardiaca y presion arterial sistolica deben ser numeros finitos.",
                "Age, heart rate, and systolic blood pressure must be finite numbers."
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

    const threshold = getThreshold(ageYears);

    if (!threshold) {
      return {
        toolId: tool.id,
        warnings: [unsupportedAgeWarning],
        trace: [
          { inputId: "age_years", value: ageYears },
          { inputId: "heart_rate_bpm", value: heartRate },
          { inputId: "systolic_blood_pressure_mm_hg", value: systolicBloodPressure }
        ]
      };
    }

    const rawShockIndex = heartRate / systolicBloodPressure;
    const displayedShockIndex = Number(rawShockIndex.toFixed(2));
    const warnings: CalculationWarning[] = [contextWarning];

    if (heartRate > 240 || systolicBloodPressure > 220 || systolicBloodPressure < 40) {
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
      value: displayedShockIndex,
      unit: "ratio",
      label: label("Indice de shock", "Shock index"),
      classification: classificationFor(rawShockIndex, threshold),
      warnings,
      trace: [
        { inputId: "age_years", value: ageYears },
        { inputId: "heart_rate_bpm", value: heartRate },
        { inputId: "systolic_blood_pressure_mm_hg", value: systolicBloodPressure },
        {
          inputId: "published_sipa_threshold",
          value: threshold.threshold
        }
      ]
    };
  }
};
