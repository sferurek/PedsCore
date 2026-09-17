import type { CalculatorDefinition, CalculatorInput } from "./common.js";
import {
  findInterpretation,
  getNumber,
  getNumericScore,
  getTool,
  missingResult,
  warning
} from "./common.js";

type VitalThresholds = {
  normalLow: number;
  normalHigh: number;
  score2Low: number;
  score2High: number;
  score4Low: number;
  score4High: number;
};

type AgeBand = "lt3m" | "3to12m" | "1to4y" | "5to12y" | "gt12y";

const inputIds = [
  "age_months",
  "heart_rate",
  "systolic_bp",
  "capillary_refill",
  "respiratory_rate",
  "respiratory_effort",
  "oxygen_saturation",
  "oxygen_therapy"
];

const ageBand = (ageMonths: number): AgeBand => {
  if (ageMonths < 3) return "lt3m";
  if (ageMonths < 12) return "3to12m";
  if (ageMonths < 60) return "1to4y";
  if (ageMonths <= 144) return "5to12y";
  return "gt12y";
};

const heartRateThresholds: Record<AgeBand, VitalThresholds> = {
  lt3m:   { normalLow: 110, normalHigh: 150, score2Low: 90, score2High: 180, score4Low: 80, score4High: 190 },
  "3to12m": { normalLow: 100, normalHigh: 150, score2Low: 80, score2High: 170, score4Low: 70, score4High: 180 },
  "1to4y":  { normalLow: 90, normalHigh: 120, score2Low: 70, score2High: 150, score4Low: 60, score4High: 170 },
  "5to12y": { normalLow: 70, normalHigh: 110, score2Low: 60, score2High: 130, score4Low: 50, score4High: 150 },
  gt12y:  { normalLow: 60, normalHigh: 100, score2Low: 50, score2High: 120, score4Low: 40, score4High: 140 }
};

const systolicBpThresholds: Record<AgeBand, VitalThresholds> = {
  lt3m:   { normalLow: 60, normalHigh: 80, score2Low: 50, score2High: 100, score4Low: 45, score4High: 130 },
  "3to12m": { normalLow: 80, normalHigh: 100, score2Low: 70, score2High: 120, score4Low: 60, score4High: 150 },
  "1to4y":  { normalLow: 90, normalHigh: 110, score2Low: 75, score2High: 125, score4Low: 65, score4High: 160 },
  "5to12y": { normalLow: 90, normalHigh: 120, score2Low: 80, score2High: 140, score4Low: 70, score4High: 170 },
  gt12y:  { normalLow: 100, normalHigh: 130, score2Low: 85, score2High: 150, score4Low: 75, score4High: 190 }
};

const respiratoryRateThresholds: Record<AgeBand, VitalThresholds> = {
  lt3m:   { normalLow: 29, normalHigh: 61, score2Low: 19, score2High: 81, score4Low: 15, score4High: 91 },
  "3to12m": { normalLow: 24, normalHigh: 51, score2Low: 19, score2High: 71, score4Low: 15, score4High: 81 },
  "1to4y":  { normalLow: 19, normalHigh: 41, score2Low: 15, score2High: 61, score4Low: 12, score4High: 71 },
  "5to12y": { normalLow: 19, normalHigh: 31, score2Low: 14, score2High: 41, score4Low: 10, score4High: 51 },
  gt12y:  { normalLow: 11, normalHigh: 17, score2Low: 10, score2High: 23, score4Low: 9, score4High: 30 }
};

const scoreVital = (value: number, thresholds: VitalThresholds): number => {
  if (value >= thresholds.score4High || value <= thresholds.score4Low) return 4;
  if (value >= thresholds.score2High || value <= thresholds.score2Low) return 2;
  if (value >= thresholds.normalHigh || value <= thresholds.normalLow) return 1;
  return 0;
};

const scoreSaturation = (value: number): number => {
  if (value <= 90) return 2;
  if (value <= 94) return 1;
  return 0;
};

export const bedsidePewsCalculator: CalculatorDefinition = {
  toolId: "bedside_pews",
  calculate: (input: CalculatorInput) => {
    const tool = getTool("bedside-pews");

    for (const inputId of inputIds) {
      if (input[inputId] === undefined || input[inputId] === null || input[inputId] === "") {
        return missingResult(tool.id, inputIds);
      }
    }

    const ageMonths = getNumber(input, "age_months");
    const heartRate = getNumber(input, "heart_rate");
    const systolicBp = getNumber(input, "systolic_bp");
    const respiratoryRate = getNumber(input, "respiratory_rate");
    const oxygenSaturation = getNumber(input, "oxygen_saturation");
    const capillaryRefill = getNumericScore(tool, input, "capillary_refill");
    const respiratoryEffort = getNumericScore(tool, input, "respiratory_effort");
    const oxygenTherapy = getNumericScore(tool, input, "oxygen_therapy");

    if (
      ageMonths === null ||
      heartRate === null ||
      systolicBp === null ||
      respiratoryRate === null ||
      oxygenSaturation === null ||
      capillaryRefill === null ||
      respiratoryEffort === null ||
      oxygenTherapy === null
    ) {
      return missingResult(tool.id, inputIds);
    }

    if (ageMonths < 0 || ageMonths > 216 || oxygenSaturation < 0 || oxygenSaturation > 100) {
      return {
        toolId: tool.id,
        warnings: [
          warning(
            "input_out_of_range",
            "La edad debe estar entre 0 y 216 meses y la SpO2 entre 0% y 100%.",
            "Age must be between 0 and 216 months and SpO2 between 0% and 100%."
          )
        ],
        trace: []
      };
    }

    const band = ageBand(ageMonths);
    const heartRateScore = scoreVital(heartRate, heartRateThresholds[band]);
    const systolicBpScore = scoreVital(systolicBp, systolicBpThresholds[band]);
    const respiratoryRateScore = scoreVital(respiratoryRate, respiratoryRateThresholds[band]);
    const saturationScore = scoreSaturation(oxygenSaturation);

    const scores = {
      heart_rate: heartRateScore,
      systolic_bp: systolicBpScore,
      capillary_refill: capillaryRefill,
      respiratory_rate: respiratoryRateScore,
      respiratory_effort: respiratoryEffort,
      oxygen_saturation: saturationScore,
      oxygen_therapy: oxygenTherapy
    };

    const score = Object.values(scores).reduce((total, value) => total + value, 0);
    const interpretation = findInterpretation(tool.interpretationBands, score);

    return {
      toolId: tool.id,
      score,
      maxScore: 26,
      ...(interpretation ? { interpretation } : {}),
      warnings: [],
      trace: [
        { inputId: "age_months", value: ageMonths },
        { inputId: "heart_rate", value: heartRate, score: heartRateScore },
        { inputId: "systolic_bp", value: systolicBp, score: systolicBpScore },
        { inputId: "capillary_refill", value: input.capillary_refill, score: capillaryRefill },
        { inputId: "respiratory_rate", value: respiratoryRate, score: respiratoryRateScore },
        { inputId: "respiratory_effort", value: input.respiratory_effort, score: respiratoryEffort },
        { inputId: "oxygen_saturation", value: oxygenSaturation, score: saturationScore },
        { inputId: "oxygen_therapy", value: input.oxygen_therapy, score: oxygenTherapy }
      ]
    };
  }
};
