import type { CalculationResult } from "../types.js";
import {
  getNumber,
  getTool,
  label,
  warning
} from "./common.js";
import type { CalculatorDefinition } from "./common.js";

const caution = warning(
  "egfr_context_required",
  "Resultado estimado. Interpretar con metodo de creatinina, edad, contexto clinico y protocolos locales.",
  "Estimated result. Interpret with creatinine method, age, clinical context and local protocols."
);

export const bedsideSchwartzCalculator: CalculatorDefinition = {
  toolId: "bedside_schwartz",
  calculate: (input): CalculationResult => {
    const tool = getTool("bedside-schwartz");
    const heightCm = getNumber(input, "height_cm") ?? getNumber(input, "height");
    const serumCreatinine =
      getNumber(input, "serum_creatinine") ?? getNumber(input, "creatinine");
    const creatinineUnit = input.creatinine_unit;

    if (heightCm === null || serumCreatinine === null || !creatinineUnit) {
      return {
        toolId: tool.id,
        warnings: [
          warning(
            "missing_required_inputs",
            "Faltan talla, creatinina o unidad de creatinina.",
            "Height, creatinine or creatinine unit is missing."
          )
        ],
        trace: [
          { inputId: "height_cm", value: input.height_cm },
          { inputId: "serum_creatinine", value: input.serum_creatinine },
          { inputId: "creatinine_unit", value: input.creatinine_unit }
        ]
      };
    }

    if (heightCm <= 0 || serumCreatinine <= 0) {
      return {
        toolId: tool.id,
        warnings: [
          warning(
            "invalid_schwartz_inputs",
            "Talla y creatinina deben ser mayores que cero.",
            "Height and creatinine must be greater than zero."
          )
        ],
        trace: [
          { inputId: "height_cm", value: heightCm },
          { inputId: "serum_creatinine", value: serumCreatinine },
          { inputId: "creatinine_unit", value: creatinineUnit }
        ]
      };
    }

    const creatinineMgDl =
      creatinineUnit === "umol_l" ? serumCreatinine / 88.4 : serumCreatinine;
    const warnings = [caution];

    if (heightCm > 220 || creatinineMgDl > 15 || creatinineMgDl < 0.1) {
      warnings.push(
        warning(
          "extreme_schwartz_input",
          "Valor extremo detectado; revisar unidades y medicion antes de interpretar.",
          "Extreme value detected; review units and measurement before interpretation."
        )
      );
    }

    return {
      toolId: tool.id,
      value: Number(((0.413 * heightCm) / creatinineMgDl).toFixed(1)),
      unit: "mL/min/1.73 m2",
      label: label("eGFR estimado", "Estimated eGFR"),
      warnings,
      trace: [
        { inputId: "height_cm", value: heightCm },
        { inputId: "serum_creatinine", value: serumCreatinine },
        { inputId: "creatinine_unit", value: creatinineUnit },
        { inputId: "serum_creatinine_mg_dl", value: creatinineMgDl }
      ]
    };
  }
};

