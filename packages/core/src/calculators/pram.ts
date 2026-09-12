import type { CalculationResult } from "../types.js";
import {
  findInterpretation,
  getNumber,
  getNumericScore,
  getTool,
  missingResult,
  warning
} from "./common.js";
import type { CalculatorDefinition } from "./common.js";

const optionInputIds = [
  "suprasternal_retractions",
  "scalene_muscle_contraction",
  "air_entry",
  "wheezing"
];

const requiredInputIds = [
  "age_years",
  ...optionInputIds,
  "oxygen_measurement_condition",
  "oxygen_saturation"
];

const oxygenSaturationScore = (spo2: number): number => {
  if (spo2 >= 95) {
    return 0;
  }

  if (spo2 >= 92) {
    return 1;
  }

  return 2;
};

export const pramCalculator: CalculatorDefinition = {
  toolId: "pram",
  calculate: (input): CalculationResult => {
    const tool = getTool("pram");
    const ageYears = getNumber(input, "age_years");
    const oxygenSaturation = getNumber(input, "oxygen_saturation");

    if (
      ageYears === null ||
      oxygenSaturation === null ||
      requiredInputIds.some(
        (inputId) =>
          input[inputId] === undefined ||
          input[inputId] === null ||
          input[inputId] === ""
      )
    ) {
      return missingResult(tool.id, requiredInputIds);
    }

    if (ageYears < 2 || ageYears >= 18) {
      return {
        toolId: tool.id,
        warnings: [
          warning(
            "unsupported_age",
            "PRAM se valido para ninos de 2 a menos de 18 anos con asma aguda. No se calcula una puntuacion fuera de ese intervalo.",
            "PRAM was validated for children aged 2 to under 18 years with acute asthma. A score is not calculated outside that range."
          )
        ],
        trace: [{ inputId: "age_years", value: ageYears }]
      };
    }

    if (input.oxygen_measurement_condition !== "stable_room_air_one_minute") {
      return {
        toolId: tool.id,
        warnings: [
          warning(
            "invalid_oxygen_measurement_condition",
            "El componente de oxigenacion de PRAM requiere una SpO2 estable medida en aire ambiente durante al menos 1 minuto. No se calcula una puntuacion si esta condicion no esta confirmada o si la lectura se obtuvo con oxigeno suplementario.",
            "The PRAM oxygenation component requires a stable SpO2 measured on room air for at least 1 minute. A score is not calculated when this condition is unconfirmed or the reading was obtained with supplemental oxygen."
          )
        ],
        trace: [
          {
            inputId: "oxygen_measurement_condition",
            value: input.oxygen_measurement_condition
          }
        ]
      };
    }

    if (oxygenSaturation < 0 || oxygenSaturation > 100) {
      return {
        toolId: tool.id,
        warnings: [
          warning(
            "invalid_oxygen_saturation",
            "La saturacion de oxigeno debe estar entre 0 y 100%.",
            "Oxygen saturation must be between 0 and 100%."
          )
        ],
        trace: [{ inputId: "oxygen_saturation", value: oxygenSaturation }]
      };
    }

    const oxygenScore = oxygenSaturationScore(oxygenSaturation);
    const scores = [oxygenScore];
    const trace: CalculationResult["trace"] = [
      {
        inputId: "age_years",
        value: ageYears
      },
      {
        inputId: "oxygen_measurement_condition",
        value: input.oxygen_measurement_condition
      },
      {
        inputId: "oxygen_saturation",
        value: oxygenSaturation,
        score: oxygenScore
      }
    ];

    for (const inputId of optionInputIds) {
      const score = getNumericScore(tool, input, inputId);

      if (score === null || score < 0 || score > 3) {
        return {
          toolId: tool.id,
          warnings: [
            warning(
              "invalid_score_input",
              "Seleccion no valida para la puntuacion PRAM.",
              "Invalid selection for the PRAM score."
            )
          ],
          trace: [{ inputId, value: input[inputId] }]
        };
      }

      scores.push(score);
      trace.push({ inputId, value: input[inputId], score });
    }

    const score = scores.reduce((total, value) => total + value, 0);
    const interpretation = findInterpretation(tool.interpretationBands, score);

    return {
      toolId: tool.id,
      score,
      maxScore: 12,
      ...(interpretation ? { interpretation } : {}),
      warnings: [],
      trace
    };
  }
};
