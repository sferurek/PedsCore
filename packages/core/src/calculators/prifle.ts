import type { CalculationResult, LocalizedText } from "../types.js";
import { getNumber, getTool, missingResult, warning } from "./common.js";
import type { CalculatorDefinition } from "./common.js";

type AcuteClass = "none" | "risk" | "injury" | "failure";

const severity: Record<AcuteClass, number> = {
  none: 0,
  risk: 1,
  injury: 2,
  failure: 3
};

const labels: Record<AcuteClass, LocalizedText> = {
  none: {
    es: "No cumple criterios agudos pRIFLE",
    en: "No acute pRIFLE category met"
  },
  risk: { es: "Risk", en: "Risk" },
  injury: { es: "Injury", en: "Injury" },
  failure: { es: "Failure", en: "Failure" }
};

const worse = (a: AcuteClass, b: AcuteClass): AcuteClass =>
  severity[a] >= severity[b] ? a : b;

const classifyEccl = (baseline: number, current: number): AcuteClass => {
  const decline = ((baseline - current) / baseline) * 100;

  if (current < 35 || decline >= 75) return "failure";
  if (decline >= 50) return "injury";
  if (decline >= 25) return "risk";
  return "none";
};

const classifyUrine = (
  urineRate: number,
  urineDurationHours: number,
  anuriaHours: number
): AcuteClass => {
  if (anuriaHours >= 12 || (urineRate < 0.3 && urineDurationHours >= 24)) {
    return "failure";
  }
  if (urineRate < 0.5 && urineDurationHours >= 16) return "injury";
  if (urineRate < 0.5 && urineDurationHours >= 8) return "risk";
  return "none";
};

export const prifleCalculator: CalculatorDefinition = {
  toolId: "prifle",
  calculate: (input): CalculationResult => {
    const tool = getTool("prifle");

    const required = [
      "baseline_mode",
      "current_eccl",
      "urine_output_ml_kg_h",
      "urine_duration_hours",
      "anuria_hours",
      "persistence_status"
    ];

    for (const inputId of required) {
      if (input[inputId] === undefined || input[inputId] === null || input[inputId] === "") {
        return missingResult(tool.id, required);
      }
    }

    const baselineMode = String(input.baseline_mode);
    if (!["known", "imputed_120"].includes(baselineMode)) {
      return {
        toolId: tool.id,
        warnings: [warning("invalid_baseline_mode", "Modo basal pRIFLE no valido.", "Invalid pRIFLE baseline mode.")],
        trace: [{ inputId: "baseline_mode", value: input.baseline_mode }]
      };
    }

    let baselineEccl = 120;
    if (baselineMode === "known") {
      const value = getNumber(input, "baseline_eccl");
      if (value === null || value <= 0) {
        return {
          toolId: tool.id,
          warnings: [warning("baseline_eccl_required", "Introduce un eCCl basal valido o selecciona la imputacion explicita de 120.", "Enter a valid baseline eCCl or explicitly select the 120 imputation.")],
          trace: [{ inputId: "baseline_eccl", value: input.baseline_eccl }]
        };
      }
      baselineEccl = value;
    }

    const currentEccl = getNumber(input, "current_eccl");
    const urineRate = getNumber(input, "urine_output_ml_kg_h");
    const urineDuration = getNumber(input, "urine_duration_hours");
    const anuriaHours = getNumber(input, "anuria_hours");

    if (
      currentEccl === null || currentEccl <= 0 ||
      urineRate === null || urineRate < 0 ||
      urineDuration === null || urineDuration < 0 ||
      anuriaHours === null || anuriaHours < 0
    ) {
      return {
        toolId: tool.id,
        warnings: [warning("invalid_numeric_input", "Los valores de eCCl, diuresis y duracion deben ser validos y no negativos.", "eCCl, urine output, and duration values must be valid and non-negative.")],
        trace: []
      };
    }

    const ecclClass = classifyEccl(baselineEccl, currentEccl);
    const urineClass = classifyUrine(urineRate, urineDuration, anuriaHours);
    const acuteClass = worse(ecclClass, urineClass);

    const persistence = String(input.persistence_status);
    if (!["none", "failure_over_4_weeks", "failure_over_3_months"].includes(persistence)) {
      return {
        toolId: tool.id,
        warnings: [warning("invalid_persistence_status", "Estado de persistencia pRIFLE no valido.", "Invalid pRIFLE persistence status.")],
        trace: [{ inputId: "persistence_status", value: input.persistence_status }]
      };
    }

    const warnings = [];
    if (baselineMode === "imputed_120") {
      warnings.push(
        warning(
          "baseline_imputed_120",
          "El eCCl basal se ha imputado como 120 mL/min/1,73 m²; no es una medicion basal real y puede modificar la clasificacion.",
          "Baseline eCCl was imputed as 120 mL/min/1.73 m²; this is not a measured baseline and may change classification."
        )
      );
    }

    if (persistence !== "none" && acuteClass !== "failure") {
      warnings.push(
        warning(
          "persistence_requires_failure_context",
          "Loss/ESKD describen persistencia de fallo renal; revisa que exista contexto clinico de Failure antes de interpretar esa categoria.",
          "Loss/ESKD describe persistent renal failure; confirm a clinical Failure context before interpreting that category."
        )
      );
    }

    const finalLabel =
      persistence === "failure_over_3_months"
        ? { es: "ESKD", en: "ESKD" }
        : persistence === "failure_over_4_weeks"
          ? { es: "Loss", en: "Loss" }
          : labels[acuteClass];

    return {
      toolId: tool.id,
      label: finalLabel,
      classification: {
        es: `eCCl: ${labels[ecclClass].es} · diuresis: ${labels[urineClass].es} · global agudo: ${labels[acuteClass].es}`,
        en: `eCCl: ${labels[ecclClass].en} · urine output: ${labels[urineClass].en} · acute overall: ${labels[acuteClass].en}`
      },
      warnings,
      trace: [
        { inputId: "baseline_mode", value: baselineMode },
        { inputId: "baseline_eccl", value: baselineEccl },
        { inputId: "current_eccl", value: currentEccl },
        { inputId: "urine_output_ml_kg_h", value: urineRate },
        { inputId: "urine_duration_hours", value: urineDuration },
        { inputId: "anuria_hours", value: anuriaHours },
        { inputId: "persistence_status", value: persistence }
      ]
    };
  }
};
