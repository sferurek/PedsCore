import type { CalculationResult } from "../types.js";
import {
  getBoolean,
  getNumber,
  getTool,
  label,
  warning
} from "./common.js";
import type { CalculatorDefinition } from "./common.js";

const renalContextWarning = warning(
  "renal_context_required",
  "Resultado educativo y de apoyo clinico. Confirmar unidades, cronologia, metodo de laboratorio y contexto del paciente antes de interpretar.",
  "Educational clinical-support result. Confirm units, timing, laboratory method, and patient context before interpretation."
);

const getCkidCreatinineK = (age: number, sex: "female" | "male"): number => {
  if (age < 12) {
    return (sex === "female" ? 36.1 : 39.0) * Math.pow(1.008, age - 12);
  }
  if (age < 18) {
    return (sex === "female" ? 36.1 : 39.0) *
      Math.pow(sex === "female" ? 1.023 : 1.045, age - 12);
  }
  return sex === "female" ? 41.4 : 50.8;
};

const getCkidCystatinK = (age: number, sex: "female" | "male"): number => {
  if (sex === "female") {
    if (age < 12) return 79.9 * Math.pow(1.004, age - 12);
    if (age < 18) return 79.9 * Math.pow(0.974, age - 12);
    return 68.3;
  }

  if (age < 15) return 87.2 * Math.pow(1.011, age - 15);
  if (age < 18) return 87.2 * Math.pow(0.960, age - 15);
  return 77.1;
};

export const ckidU25Calculator: CalculatorDefinition = {
  toolId: "ckid_u25",
  calculate: (input): CalculationResult => {
    const tool = getTool("ckid-u25");
    const age = getNumber(input, "age_years");
    const sex = input.sex;
    const heightCm = getNumber(input, "height_cm");
    const creatinine = getNumber(input, "serum_creatinine");
    const creatinineUnit = input.creatinine_unit;
    const cystatinC = getNumber(input, "cystatin_c_mg_l");

    if (age === null || (sex !== "female" && sex !== "male")) {
      return {
        toolId: tool.id,
        warnings: [warning(
          "missing_ckid_demographics",
          "Faltan edad o sexo para aplicar CKiD U25.",
          "Age or sex is missing for CKiD U25."
        )],
        trace: [
          { inputId: "age_years", value: input.age_years },
          { inputId: "sex", value: input.sex }
        ]
      };
    }

    if (age < 1 || age > 25) {
      return {
        toolId: tool.id,
        warnings: [warning(
          "ckid_age_out_of_range",
          "CKiD U25 esta publicada para edades de 1 a 25 anos.",
          "CKiD U25 is published for ages 1 through 25 years."
        )],
        trace: [{ inputId: "age_years", value: age }]
      };
    }

    let egfrCr: number | null = null;
    let egfrCys: number | null = null;
    const trace: CalculationResult["trace"] = [
      { inputId: "age_years", value: age },
      { inputId: "sex", value: sex }
    ];

    if (creatinine !== null) {
      if (heightCm === null || heightCm <= 0 || creatinine <= 0) {
        return {
          toolId: tool.id,
          warnings: [warning(
            "invalid_ckid_creatinine_inputs",
            "Para la ecuacion con creatinina se requieren talla y creatinina validas.",
            "The creatinine equation requires valid height and creatinine."
          )],
          trace
        };
      }

      const creatinineMgDl =
        creatinineUnit === "umol_l" ? creatinine / 88.4 :
        creatinineUnit === "mg_dl" ? creatinine : null;

      if (creatinineMgDl === null) {
        return {
          toolId: tool.id,
          warnings: [warning(
            "invalid_ckid_creatinine_unit",
            "Selecciona una unidad valida de creatinina.",
            "Select a valid creatinine unit."
          )],
          trace
        };
      }

      const kCr = getCkidCreatinineK(age, sex);
      egfrCr = kCr * ((heightCm / 100) / creatinineMgDl);
      trace.push(
        { inputId: "height_cm", value: heightCm },
        { inputId: "serum_creatinine", value: creatinine },
        { inputId: "creatinine_unit", value: creatinineUnit },
        { inputId: "ckid_u25_k_creatinine", value: Number(kCr.toFixed(4)) },
        { inputId: "egfr_creatinine", value: Number(egfrCr.toFixed(1)) }
      );
    }

    if (cystatinC !== null) {
      if (cystatinC <= 0) {
        return {
          toolId: tool.id,
          warnings: [warning(
            "invalid_ckid_cystatin_input",
            "La cistatina C debe ser mayor que cero.",
            "Cystatin C must be greater than zero."
          )],
          trace
        };
      }
      const kCys = getCkidCystatinK(age, sex);
      egfrCys = kCys / cystatinC;
      trace.push(
        { inputId: "cystatin_c_mg_l", value: cystatinC },
        { inputId: "ckid_u25_k_cystatin", value: Number(kCys.toFixed(4)) },
        { inputId: "egfr_cystatin", value: Number(egfrCys.toFixed(1)) }
      );
    }

    if (egfrCr === null && egfrCys === null) {
      return {
        toolId: tool.id,
        warnings: [warning(
          "missing_ckid_filtration_marker",
          "Introduce creatinina con talla, cistatina C, o ambos marcadores.",
          "Enter creatinine with height, cystatin C, or both filtration markers."
        )],
        trace
      };
    }

    const egfr =
      egfrCr !== null && egfrCys !== null ? (egfrCr + egfrCys) / 2 :
      egfrCr ?? egfrCys as number;
    const method =
      egfrCr !== null && egfrCys !== null ? label("Creatinina + cistatina C (promedio U25)", "Creatinine + cystatin C (U25 average)") :
      egfrCr !== null ? label("CKiD U25 creatinina", "CKiD U25 creatinine") :
      label("CKiD U25 cistatina C", "CKiD U25 cystatin C");

    return {
      toolId: tool.id,
      value: Number(egfr.toFixed(1)),
      unit: "mL/min/1.73 m2",
      label: method,
      warnings: [renalContextWarning],
      trace
    };
  }
};

type AkiStage = 0 | 1 | 2 | 3;

const akiStageLabel = (stage: AkiStage) =>
  stage === 0
    ? label("Sin criterio KDIGO de LRA con los datos introducidos", "No KDIGO AKI criterion with entered data")
    : label(`KDIGO estadio ${stage}`, `KDIGO stage ${stage}`);

export const kdigoPediatricCalculator: CalculatorDefinition = {
  toolId: "kdigo_pediatric",
  calculate: (input): CalculationResult => {
    const tool = getTool("kdigo-pediatric");
    const baselineScr = getNumber(input, "baseline_creatinine_mg_dl");
    const currentScr = getNumber(input, "current_creatinine_mg_dl");
    const ageYears = getNumber(input, "age_years");
    const currentEgfr = getNumber(input, "current_egfr");
    const urineOutput = getNumber(input, "urine_output_ml_kg_h");
    const urineDuration = getNumber(input, "urine_duration_hours");
    const anuriaHours = getNumber(input, "anuria_hours") ?? 0;
    const rrt = getBoolean(input, "renal_replacement_therapy");
    const baselineWithin7Days = getBoolean(input, "baseline_within_7_days");
    const riseWithin48Hours = getBoolean(input, "rise_within_48_hours");

    if (
      baselineScr === null || currentScr === null || ageYears === null ||
      urineOutput === null || urineDuration === null || rrt === null ||
      baselineWithin7Days === null || riseWithin48Hours === null
    ) {
      return {
        toolId: tool.id,
        warnings: [warning(
          "missing_kdigo_inputs",
          "Faltan creatinina basal/actual, edad, diuresis, duracion o estado de terapia renal sustitutiva.",
          "Baseline/current creatinine, age, urine output, duration, or kidney replacement therapy status is missing."
        )],
        trace: []
      };
    }

    if (baselineScr <= 0 || currentScr <= 0 || ageYears < 0 || urineOutput < 0 || urineDuration < 0 || anuriaHours < 0) {
      return {
        toolId: tool.id,
        warnings: [warning(
          "invalid_kdigo_inputs",
          "Los valores numericos KDIGO deben ser fisiologicamente validos y no negativos.",
          "KDIGO numeric values must be physiologically valid and non-negative."
        )],
        trace: []
      };
    }

    const ratio = currentScr / baselineScr;
    const delta = currentScr - baselineScr;
    let creatinineStage: AkiStage = 0;
    if (
      (baselineWithin7Days && ratio >= 3) || currentScr >= 4 || rrt ||
      (ageYears < 18 && currentEgfr !== null && currentEgfr < 35)
    ) creatinineStage = 3;
    else if (baselineWithin7Days && ratio >= 2) creatinineStage = 2;
    else if ((baselineWithin7Days && ratio >= 1.5) || (riseWithin48Hours && delta >= 0.3)) creatinineStage = 1;

    let urineStage: AkiStage = 0;
    if ((urineOutput < 0.3 && urineDuration >= 24) || anuriaHours >= 12) urineStage = 3;
    else if (urineOutput < 0.5 && urineDuration >= 12) urineStage = 2;
    else if (urineOutput < 0.5 && urineDuration >= 6) urineStage = 1;

    const stage = Math.max(creatinineStage, urineStage) as AkiStage;
    const warnings = [renalContextWarning];
    warnings.push(warning(
      "kdigo_2012_version",
      "Se aplica la clasificacion KDIGO 2012 publicada. La actualizacion KDIGO 2026 permanece en borrador publico hasta su publicacion final.",
      "The published KDIGO 2012 classification is applied. The KDIGO 2026 update remains a public draft until final publication."
    ));

    return {
      toolId: tool.id,
      score: stage,
      maxScore: 3,
      classification: akiStageLabel(stage),
      warnings,
      trace: [
        { inputId: "baseline_creatinine_mg_dl", value: baselineScr },
        { inputId: "current_creatinine_mg_dl", value: currentScr },
        { inputId: "creatinine_ratio", value: Number(ratio.toFixed(3)), score: creatinineStage },
        { inputId: "creatinine_delta_mg_dl", value: Number(delta.toFixed(3)) },
        { inputId: "age_years", value: ageYears },
        { inputId: "current_egfr", value: currentEgfr },
        { inputId: "baseline_within_7_days", value: baselineWithin7Days },
        { inputId: "rise_within_48_hours", value: riseWithin48Hours },
        { inputId: "renal_replacement_therapy", value: rrt },
        { inputId: "urine_output_ml_kg_h", value: urineOutput },
        { inputId: "urine_duration_hours", value: urineDuration, score: urineStage },
        { inputId: "anuria_hours", value: anuriaHours }
      ]
    };
  }
};

type PrifleStage = 0 | 1 | 2 | 3 | 4 | 5;

const prifleLabel = (stage: PrifleStage) => {
  switch (stage) {
    case 1: return label("R · Risk", "R · Risk");
    case 2: return label("I · Injury", "I · Injury");
    case 3: return label("F · Failure", "F · Failure");
    case 4: return label("L · Loss", "L · Loss");
    case 5: return label("E · End-stage", "E · End-stage");
    default: return label("Sin criterio pRIFLE", "No pRIFLE criterion");
  }
};

export const prifleCalculator: CalculatorDefinition = {
  toolId: "prifle",
  calculate: (input): CalculationResult => {
    const tool = getTool("prifle");
    const baselineEccl = getNumber(input, "baseline_eccl");
    const currentEccl = getNumber(input, "current_eccl");
    const urineOutput = getNumber(input, "urine_output_ml_kg_h");
    const urineDuration = getNumber(input, "urine_duration_hours");
    const anuriaHours = getNumber(input, "anuria_hours") ?? 0;
    const persistentFailureWeeks = getNumber(input, "persistent_failure_weeks") ?? 0;

    if (baselineEccl === null || currentEccl === null || urineOutput === null || urineDuration === null) {
      return {
        toolId: tool.id,
        warnings: [warning(
          "missing_prifle_inputs",
          "Faltan eCCl basal/actual o datos de diuresis.",
          "Baseline/current eCCl or urine-output data is missing."
        )],
        trace: []
      };
    }

    if (
      baselineEccl <= 0 || currentEccl < 0 || urineOutput < 0 ||
      urineDuration < 0 || anuriaHours < 0 || persistentFailureWeeks < 0
    ) {
      return {
        toolId: tool.id,
        warnings: [warning(
          "invalid_prifle_inputs",
          "Los valores pRIFLE deben ser validos y no negativos.",
          "pRIFLE values must be valid and non-negative."
        )],
        trace: []
      };
    }

    const declinePct = Math.max(0, ((baselineEccl - currentEccl) / baselineEccl) * 100);
    let renalStage: PrifleStage = 0;
    if (declinePct >= 75 || currentEccl < 35) renalStage = 3;
    else if (declinePct >= 50) renalStage = 2;
    else if (declinePct >= 25) renalStage = 1;

    let urineStage: PrifleStage = 0;
    if ((urineOutput < 0.3 && urineDuration >= 24) || anuriaHours >= 12) urineStage = 3;
    else if (urineOutput < 0.5 && urineDuration >= 16) urineStage = 2;
    else if (urineOutput < 0.5 && urineDuration >= 8) urineStage = 1;

    let stage = Math.max(renalStage, urineStage) as PrifleStage;
    if (persistentFailureWeeks >= 12) stage = 5;
    else if (persistentFailureWeeks >= 4) stage = Math.max(stage, 4) as PrifleStage;

    return {
      toolId: tool.id,
      score: stage,
      maxScore: 5,
      classification: prifleLabel(stage),
      warnings: [
        renalContextWarning,
        warning(
          "prifle_baseline_dependency",
          "pRIFLE depende del eCCl basal y del metodo usado para estimarlo. Si el basal no es fiable, la categoria puede cambiar.",
          "pRIFLE depends on baseline eCCl and the method used to estimate it. If baseline is unreliable, classification may change."
        )
      ],
      trace: [
        { inputId: "baseline_eccl", value: baselineEccl },
        { inputId: "current_eccl", value: currentEccl },
        { inputId: "eccl_decline_percent", value: Number(declinePct.toFixed(1)), score: renalStage },
        { inputId: "urine_output_ml_kg_h", value: urineOutput },
        { inputId: "urine_duration_hours", value: urineDuration, score: urineStage },
        { inputId: "anuria_hours", value: anuriaHours },
        { inputId: "persistent_failure_weeks", value: persistentFailureWeeks }
      ]
    };
  }
};
