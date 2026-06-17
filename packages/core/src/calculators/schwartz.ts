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

const revisedCkidCaution = warning(
  "egfr_estimate_only",
  "Resultado estimado con ecuacion CKiD 2009. No sustituye la valoracion clinica, el metodo de laboratorio ni los protocolos locales.",
  "Estimated result using the 2009 CKiD equation. It does not replace clinical assessment, the laboratory method, or local protocols."
);

const convertCreatinineToMgDl = (
  value: number,
  unit: unknown
): number | null => {
  if (unit === "mg_dl") {
    return value;
  }

  if (unit === "umol_l") {
    return value / 88.4;
  }

  return null;
};

export const revisedSchwartzCalculator: CalculatorDefinition = {
  toolId: "revised_schwartz",
  calculate: (input): CalculationResult => {
    const tool = getTool("revised-schwartz");
    const heightCm = getNumber(input, "height_cm") ?? getNumber(input, "height");
    const serumCreatinine =
      getNumber(input, "serum_creatinine") ?? getNumber(input, "creatinine");
    const cystatinCMgL =
      getNumber(input, "cystatin_c_mg_l") ?? getNumber(input, "cystatin_c");
    const bunMgDl = getNumber(input, "bun_mg_dl") ?? getNumber(input, "bun");
    const sex = input.sex;
    const creatinineUnit = input.creatinine_unit;

    if (
      heightCm === null ||
      serumCreatinine === null ||
      cystatinCMgL === null ||
      bunMgDl === null ||
      !creatinineUnit ||
      (sex !== "female" && sex !== "male")
    ) {
      return {
        toolId: tool.id,
        warnings: [
          warning(
            "missing_required_inputs",
            "Faltan talla, creatinina, unidad de creatinina, cistatina C, BUN o sexo.",
            "Height, creatinine, creatinine unit, cystatin C, BUN, or sex is missing."
          )
        ],
        trace: [
          { inputId: "height_cm", value: input.height_cm },
          { inputId: "serum_creatinine", value: input.serum_creatinine },
          { inputId: "creatinine_unit", value: input.creatinine_unit },
          { inputId: "cystatin_c_mg_l", value: input.cystatin_c_mg_l },
          { inputId: "bun_mg_dl", value: input.bun_mg_dl },
          { inputId: "sex", value: input.sex }
        ]
      };
    }

    const creatinineMgDl = convertCreatinineToMgDl(
      serumCreatinine,
      creatinineUnit
    );

    if (
      heightCm <= 0 ||
      serumCreatinine <= 0 ||
      cystatinCMgL <= 0 ||
      bunMgDl <= 0 ||
      creatinineMgDl === null
    ) {
      return {
        toolId: tool.id,
        warnings: [
          warning(
            "invalid_revised_schwartz_inputs",
            "Talla, creatinina, cistatina C y BUN deben ser mayores que cero, con unidades validas.",
            "Height, creatinine, cystatin C, and BUN must be greater than zero, with valid units."
          )
        ],
        trace: [
          { inputId: "height_cm", value: heightCm },
          { inputId: "serum_creatinine", value: serumCreatinine },
          { inputId: "creatinine_unit", value: creatinineUnit },
          { inputId: "cystatin_c_mg_l", value: cystatinCMgL },
          { inputId: "bun_mg_dl", value: bunMgDl },
          { inputId: "sex", value: sex }
        ]
      };
    }

    const heightM = heightCm / 100;
    const sexFactor = sex === "male" ? 1.099 : 1;
    const egfr =
      39.1 *
      Math.pow(heightM / creatinineMgDl, 0.516) *
      Math.pow(1.8 / cystatinCMgL, 0.294) *
      Math.pow(30 / bunMgDl, 0.169) *
      sexFactor *
      Math.pow(heightM / 1.4, 0.188);
    const warnings = [revisedCkidCaution];

    if (
      heightCm > 220 ||
      creatinineMgDl < 0.1 ||
      creatinineMgDl > 15 ||
      cystatinCMgL < 0.2 ||
      cystatinCMgL > 10 ||
      bunMgDl > 150
    ) {
      warnings.push(
        warning(
          "extreme_revised_schwartz_input",
          "Valor extremo detectado; revisar unidades y mediciones antes de interpretar.",
          "Extreme value detected; review units and measurements before interpretation."
        )
      );
    }

    return {
      toolId: tool.id,
      value: Number(egfr.toFixed(1)),
      unit: "mL/min/1.73 m2",
      label: label("eGFR estimado CKiD 2009", "Estimated CKiD 2009 eGFR"),
      warnings,
      trace: [
        { inputId: "height_cm", value: heightCm },
        { inputId: "height_m", value: heightM },
        { inputId: "serum_creatinine", value: serumCreatinine },
        { inputId: "creatinine_unit", value: creatinineUnit },
        { inputId: "serum_creatinine_mg_dl", value: creatinineMgDl },
        { inputId: "cystatin_c_mg_l", value: cystatinCMgL },
        { inputId: "bun_mg_dl", value: bunMgDl },
        { inputId: "sex", value: sex },
        { inputId: "sex_factor", value: sexFactor }
      ]
    };
  }
};
