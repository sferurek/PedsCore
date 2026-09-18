import type { CalculationResult } from "../types.js";
import { getNumber, getTool, missingResult, warning } from "./common.js";
import type { CalculatorDefinition } from "./common.js";

const required = [
  "corrected_gestational_age_weeks",
  "baseline_behavioral_state",
  "heart_rate_increase_bpm",
  "oxygen_saturation_decrease_points",
  "oxygen_increase_required",
  "brow_bulge_seconds",
  "eye_squeeze_seconds",
  "nasolabial_furrow_seconds"
] as const;

const scoreGa = (weeks: number) => {
  if (weeks < 28) return 3;
  if (weeks < 32) return 2;
  if (weeks < 36) return 1;
  return 0;
};

const scoreBehavior = (state: string) => {
  if (state === "active_awake") return 0;
  if (state === "quiet_awake") return 1;
  if (state === "active_sleep") return 2;
  if (state === "quiet_sleep") return 3;
  return null;
};

const scoreHeartRate = (increase: number) => {
  if (increase <= 4) return 0;
  if (increase <= 14) return 1;
  if (increase <= 24) return 2;
  return 3;
};

const scoreOxygen = (decrease: number, oxygenIncrease: boolean) => {
  if (oxygenIncrease) return 3;
  if (decrease <= 2) return 0;
  if (decrease <= 5) return 1;
  if (decrease <= 8) return 2;
  return 3;
};

const scoreFacialDuration = (seconds: number) => {
  if (seconds < 3) return 0;
  if (seconds <= 10) return 1;
  if (seconds <= 20) return 2;
  return 3;
};

export const pippRCalculator: CalculatorDefinition = {
  toolId: "pipp_r",
  calculate: (input): CalculationResult => {
    const tool = getTool("pipp-r");

    for (const inputId of required) {
      if (input[inputId] === undefined || input[inputId] === null || input[inputId] === "") {
        return missingResult(tool.id, [...required]);
      }
    }

    const ga = getNumber(input, "corrected_gestational_age_weeks");
    const hrIncrease = getNumber(input, "heart_rate_increase_bpm");
    const spo2Decrease = getNumber(input, "oxygen_saturation_decrease_points");
    const browSeconds = getNumber(input, "brow_bulge_seconds");
    const eyeSeconds = getNumber(input, "eye_squeeze_seconds");
    const nasolabialSeconds = getNumber(input, "nasolabial_furrow_seconds");

    if (
      ga === null || ga < 20 || ga > 50 ||
      hrIncrease === null || hrIncrease < 0 || hrIncrease > 250 ||
      spo2Decrease === null || spo2Decrease < 0 || spo2Decrease > 100 ||
      browSeconds === null || browSeconds < 0 || browSeconds > 30 ||
      eyeSeconds === null || eyeSeconds < 0 || eyeSeconds > 30 ||
      nasolabialSeconds === null || nasolabialSeconds < 0 || nasolabialSeconds > 30
    ) {
      return {
        toolId: tool.id,
        warnings: [
          warning(
            "invalid_pipp_r_input",
            "Revisa edad gestacional corregida, cambios fisiologicos y duraciones faciales.",
            "Check corrected gestational age, physiologic changes, and facial-action durations."
          )
        ],
        trace: []
      };
    }

    const behaviorScore = scoreBehavior(String(input.baseline_behavioral_state));
    if (behaviorScore === null) {
      return {
        toolId: tool.id,
        warnings: [
          warning(
            "invalid_behavioral_state",
            "Estado conductual basal no valido.",
            "Invalid baseline behavioral state."
          )
        ],
        trace: [{ inputId: "baseline_behavioral_state", value: input.baseline_behavioral_state }]
      };
    }

    const oxygenIncrease = input.oxygen_increase_required === true || input.oxygen_increase_required === "yes";
    if (
      ![
        true,
        false,
        "yes",
        "no"
      ].includes(input.oxygen_increase_required as true | false | "yes" | "no")
    ) {
      return {
        toolId: tool.id,
        warnings: [
          warning(
            "invalid_oxygen_increase",
            "Indica si fue necesario aumentar el oxigeno.",
            "Indicate whether supplemental oxygen had to be increased."
          )
        ],
        trace: [{ inputId: "oxygen_increase_required", value: input.oxygen_increase_required }]
      };
    }

    const hrScore = scoreHeartRate(hrIncrease);
    const oxygenScore = scoreOxygen(spo2Decrease, oxygenIncrease);
    const browScore = scoreFacialDuration(browSeconds);
    const eyeScore = scoreFacialDuration(eyeSeconds);
    const nasolabialScore = scoreFacialDuration(nasolabialSeconds);

    const responseSubtotal =
      hrScore + oxygenScore + browScore + eyeScore + nasolabialScore;

    const gaScore = responseSubtotal > 0 ? scoreGa(ga) : 0;
    const contextualBehaviorScore = responseSubtotal > 0 ? behaviorScore : 0;
    const total = responseSubtotal + gaScore + contextualBehaviorScore;

    const classification =
      total === 0
        ? { es: "Sin respuesta dolorosa detectada por PIPP-R", en: "No pain response detected by PIPP-R" }
        : total <= 6
          ? { es: "Dolor bajo", en: "Low pain" }
          : total <= 12
            ? { es: "Dolor moderado", en: "Moderate pain" }
            : { es: "Dolor intenso", en: "Severe pain" };

    const warnings = [];
    if (responseSubtotal === 0) {
      warnings.push(
        warning(
          "contextual_items_not_added",
          "El subtotal fisiologico/conductual es 0; PIPP-R no anade edad gestacional ni estado conductual al total.",
          "The physiologic/behavioral subtotal is 0; PIPP-R does not add gestational age or behavioral state to the total."
        )
      );
    }

    return {
      toolId: tool.id,
      score: total,
      maxScore: 21,
      label: { es: `PIPP-R: ${total}/21`, en: `PIPP-R: ${total}/21` },
      classification,
      warnings,
      trace: [
        { inputId: "heart_rate_increase_bpm", value: hrIncrease, score: hrScore },
        { inputId: "oxygen_saturation_decrease_points", value: spo2Decrease, score: oxygenScore },
        { inputId: "brow_bulge_seconds", value: browSeconds, score: browScore },
        { inputId: "eye_squeeze_seconds", value: eyeSeconds, score: eyeScore },
        { inputId: "nasolabial_furrow_seconds", value: nasolabialSeconds, score: nasolabialScore },
        { inputId: "response_subtotal", value: responseSubtotal, score: responseSubtotal },
        { inputId: "corrected_gestational_age_weeks", value: ga, score: gaScore },
        { inputId: "baseline_behavioral_state", value: input.baseline_behavioral_state, score: contextualBehaviorScore }
      ]
    };
  }
};
