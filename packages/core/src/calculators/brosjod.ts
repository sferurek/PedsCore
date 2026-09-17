import type { CalculationResult } from "../types.js";
import {
  findInterpretation,
  getNumericScore,
  getTool,
  missingResult,
  warning
} from "./common.js";
import type { CalculatorDefinition, CalculatorInput } from "./common.js";

const requiredInputIds = [
  "wheeze_rales",
  "indrawing",
  "air_entry",
  "age_months",
  "oxygen_mode",
  "oxygen_saturation",
  "respiratory_rate",
  "heart_rate"
];

const numberValue = (input: CalculatorInput, id: string): number | null => {
  const raw = input[id];
  if (raw === undefined || raw === null || raw === "") return null;
  const value = Number(raw);
  return Number.isFinite(value) ? value : null;
};

const scoreRespiratoryRate = (ageMonths: number, rr: number): number | null => {
  if (ageMonths < 0 || ageMonths >= 24 || rr < 0) return null;
  if (ageMonths < 3) {
    if (rr < 40) return 0;
    if (rr < 60) return 1;
    if (rr <= 70) return 2;
    return 3;
  }
  if (ageMonths < 12) {
    if (rr < 30) return 0;
    if (rr < 50) return 1;
    if (rr <= 60) return 2;
    return 3;
  }
  if (rr < 30) return 0;
  if (rr < 40) return 1;
  if (rr <= 50) return 2;
  return 3;
};

const scoreHeartRate = (ageMonths: number, hr: number): number | null => {
  if (ageMonths < 0 || ageMonths >= 24 || hr < 0) return null;
  if (ageMonths < 12) {
    if (hr < 130) return 0;
    if (hr < 150) return 1;
    if (hr <= 170) return 2;
    return 3;
  }
  if (hr < 110) return 0;
  if (hr < 120) return 1;
  if (hr <= 140) return 2;
  return 3;
};

const scoreOxygenation = (
  mode: unknown,
  saturation: number,
  fio2: number | null
): number | null => {
  if (saturation < 0 || saturation > 100) return null;
  if (mode === "room_air") {
    if (saturation >= 95) return 0;
    if (saturation >= 91) return 1;
    return 2;
  }
  if (mode !== "supplemental_oxygen" || fio2 === null || fio2 < 21 || fio2 > 100) {
    return null;
  }

  // Published BROSJOD oxygen categories define these two combinations explicitly.
  // Do not infer a score for oxygen/FiO2 combinations not represented in the table.
  if (saturation > 94 && fio2 <= 40) return 1;
  if (saturation <= 94 && fio2 > 40) return 2;
  return null;
};

export const brosjodCalculator: CalculatorDefinition = {
  toolId: "brosjod",
  calculate: (input): CalculationResult => {
    const tool = getTool("brosjod");

    for (const id of requiredInputIds) {
      if (input[id] === undefined || input[id] === null || input[id] === "") {
        return missingResult(tool.id, requiredInputIds);
      }
    }

    const ageMonths = numberValue(input, "age_months");
    const oxygenSaturation = numberValue(input, "oxygen_saturation");
    const respiratoryRate = numberValue(input, "respiratory_rate");
    const heartRate = numberValue(input, "heart_rate");
    const fio2 = numberValue(input, "fio2");

    if (
      ageMonths === null ||
      oxygenSaturation === null ||
      respiratoryRate === null ||
      heartRate === null ||
      ageMonths < 0 ||
      ageMonths >= 24
    ) {
      return {
        toolId: tool.id,
        warnings: [
          warning(
            "invalid_brosjod_input",
            "BROSJOD requiere valores validos y una edad inferior a 24 meses.",
            "BROSJOD requires valid values and age under 24 months."
          )
        ],
        trace: []
      };
    }

    const clinicalIds = ["wheeze_rales", "indrawing", "air_entry"];
    const trace: CalculationResult["trace"] = [];
    const clinicalScores: number[] = [];

    for (const id of clinicalIds) {
      const score = getNumericScore(tool, input, id);
      if (score === null || score < 0 || score > 3) {
        return {
          toolId: tool.id,
          warnings: [
            warning(
              "invalid_score_input",
              "Seleccion no valida para BROSJOD.",
              "Invalid BROSJOD selection."
            )
          ],
          trace: [{ inputId: id, value: input[id] }]
        };
      }
      clinicalScores.push(score);
      trace.push({ inputId: id, value: input[id], score });
    }

    const oxygenScore = scoreOxygenation(
      input.oxygen_mode,
      oxygenSaturation,
      fio2
    );
    if (oxygenScore === null) {
      return {
        toolId: tool.id,
        warnings: [
          warning(
            "unsupported_oxygen_combination",
            "La combinacion de SpO2, oxigenoterapia y FiO2 no corresponde de forma inequivoca a una categoria publicada de BROSJOD.",
            "The SpO2, oxygen-support, and FiO2 combination does not map unambiguously to a published BROSJOD category."
          )
        ],
        trace: [
          { inputId: "oxygen_mode", value: input.oxygen_mode },
          { inputId: "oxygen_saturation", value: oxygenSaturation },
          { inputId: "fio2", value: fio2 }
        ]
      };
    }

    const rrScore = scoreRespiratoryRate(ageMonths, respiratoryRate);
    const hrScore = scoreHeartRate(ageMonths, heartRate);
    if (rrScore === null || hrScore === null) {
      return {
        toolId: tool.id,
        warnings: [
          warning(
            "invalid_brosjod_vitals",
            "Frecuencia respiratoria o cardiaca no valida para BROSJOD.",
            "Respiratory or heart rate is invalid for BROSJOD."
          )
        ],
        trace: []
      };
    }

    trace.push(
      { inputId: "oxygen_saturation", value: oxygenSaturation, score: oxygenScore },
      { inputId: "respiratory_rate", value: respiratoryRate, score: rrScore },
      { inputId: "heart_rate", value: heartRate, score: hrScore },
      { inputId: "age_months", value: ageMonths },
      ...(input.oxygen_mode === "supplemental_oxygen"
        ? [{ inputId: "fio2", value: fio2 }]
        : [])
    );

    const score =
      clinicalScores.reduce((sum, value) => sum + value, 0) +
      oxygenScore +
      rrScore +
      hrScore;

    const interpretation = findInterpretation(tool.interpretationBands, score);

    return {
      toolId: tool.id,
      score,
      maxScore: 16,
      ...(interpretation ? { interpretation } : {}),
      warnings: [],
      trace
    };
  }
};
