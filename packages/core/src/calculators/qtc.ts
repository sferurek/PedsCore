import type { CalculationResult } from "../types.js";
import {
  getNumber,
  getTool,
  label,
  warning
} from "./common.js";
import type { CalculatorDefinition, CalculatorInput } from "./common.js";

type QtcFormula = "bazett" | "fridericia" | "framingham" | "hodges";

const toolByFormula: Record<QtcFormula, string> = {
  bazett: "qtc-bazett",
  fridericia: "qtc-fridericia",
  framingham: "qtc-framingham",
  hodges: "qtc-hodges"
};

const caution = warning(
  "qtc_context_required",
  "Interpretar segun edad, sexo, contexto clinico, calidad del ECG y protocolo local.",
  "Interpret according to age, sex, clinical context, ECG quality and local protocol."
);

const calculateQtcValue = (
  formula: QtcFormula,
  qtMs: number,
  heartRateBpm: number
): number => {
  const rrSeconds = 60 / heartRateBpm;

  if (formula === "bazett") {
    return qtMs / Math.sqrt(rrSeconds);
  }

  if (formula === "fridericia") {
    return qtMs / Math.cbrt(rrSeconds);
  }

  if (formula === "framingham") {
    return qtMs + 154 * (1 - rrSeconds);
  }

  return qtMs + 1.75 * (heartRateBpm - 60);
};

export const calculateQtc = (
  formula: QtcFormula,
  input: CalculatorInput
): CalculationResult => {
  const tool = getTool(toolByFormula[formula]);
  const qtMs = getNumber(input, "qt_ms") ?? getNumber(input, "qt_interval");
  const heartRateBpm =
    getNumber(input, "heart_rate_bpm") ?? getNumber(input, "heart_rate");

  if (qtMs === null || heartRateBpm === null) {
    return {
      toolId: tool.id,
      warnings: [
        warning(
          "missing_required_inputs",
          "Faltan QT y/o frecuencia cardiaca para calcular QTc.",
          "QT and/or heart rate are missing before QTc can be calculated."
        )
      ],
      trace: [
        { inputId: "qt_ms", value: input.qt_ms },
        { inputId: "heart_rate_bpm", value: input.heart_rate_bpm }
      ]
    };
  }

  if (qtMs <= 0 || heartRateBpm <= 0) {
    return {
      toolId: tool.id,
      warnings: [
        warning(
          "invalid_qtc_inputs",
          "QT y frecuencia cardiaca deben ser mayores que cero.",
          "QT and heart rate must be greater than zero."
        )
      ],
      trace: [
        { inputId: "qt_ms", value: qtMs },
        { inputId: "heart_rate_bpm", value: heartRateBpm }
      ]
    };
  }

  const warnings = [caution];

  if (qtMs > 700 || heartRateBpm > 250 || heartRateBpm < 30) {
    warnings.push(
      warning(
        "extreme_qtc_input",
        "Valor extremo detectado; revisar medicion y contexto antes de interpretar.",
        "Extreme value detected; review measurement and context before interpretation."
      )
    );
  }

  return {
    toolId: tool.id,
    value: Number(calculateQtcValue(formula, qtMs, heartRateBpm).toFixed(1)),
    unit: "ms",
    label: label("QTc estimado", "Estimated QTc"),
    warnings,
    trace: [
      { inputId: "qt_ms", value: qtMs },
      { inputId: "heart_rate_bpm", value: heartRateBpm }
    ]
  };
};

export const qtcBazettCalculator: CalculatorDefinition = {
  toolId: "qtc_bazett",
  calculate: (input) => calculateQtc("bazett", input)
};

export const qtcFridericiaCalculator: CalculatorDefinition = {
  toolId: "qtc_fridericia",
  calculate: (input) => calculateQtc("fridericia", input)
};

export const qtcFraminghamCalculator: CalculatorDefinition = {
  toolId: "qtc_framingham",
  calculate: (input) => calculateQtc("framingham", input)
};

export const qtcHodgesCalculator: CalculatorDefinition = {
  toolId: "qtc_hodges",
  calculate: (input) => calculateQtc("hodges", input)
};

