import type { CalculationResult, LocalizedText } from "../types.js";
import { getNumber, getTool, missingResult, warning } from "./common.js";
import type { CalculatorDefinition } from "./common.js";

type Stage = 0 | 1 | 2 | 3;

const stageLabel: Record<Stage, LocalizedText> = {
  0: { es: "Sin estadio KDIGO", en: "No KDIGO stage" },
  1: { es: "KDIGO estadio 1", en: "KDIGO stage 1" },
  2: { es: "KDIGO estadio 2", en: "KDIGO stage 2" },
  3: { es: "KDIGO estadio 3", en: "KDIGO stage 3" }
};

const toMgDl = (value: number, unit: string): number =>
  unit === "umol_l" ? value / 88.4 : value;

const maxStage = (...stages: Stage[]): Stage =>
  Math.max(...stages) as Stage;

const classifyUrine = (
  rate: number,
  durationHours: number,
  anuriaHours: number
): Stage => {
  if (anuriaHours >= 12 || (rate < 0.3 && durationHours >= 24)) return 3;
  if (rate < 0.5 && durationHours >= 12) return 2;
  if (rate < 0.5 && durationHours >= 6) return 1;
  return 0;
};

export const kdigoPediatricCalculator: CalculatorDefinition = {
  toolId: "kdigo_pediatric",
  calculate: (input): CalculationResult => {
    const tool = getTool("kdigo-pediatric");
    const required = [
      "age_scope",
      "creatinine_unit",
      "current_creatinine",
      "baseline_status",
      "urine_data_status",
      "rrt_started"
    ];

    for (const inputId of required) {
      if (input[inputId] === undefined || input[inputId] === null || input[inputId] === "") {
        return missingResult(tool.id, required);
      }
    }

    if (input.age_scope === "neonate_under_28_days") {
      return {
        toolId: tool.id,
        warnings: [
          warning(
            "neonatal_kdigo_out_of_scope",
            "Esta ficha implementa KDIGO pediatrico no neonatal. En menores de 28 dias debe utilizarse una definicion neonatal especifica.",
            "This tool implements non-neonatal pediatric KDIGO. Infants under 28 days require a neonatal-specific definition."
          )
        ],
        trace: [{ inputId: "age_scope", value: input.age_scope }]
      };
    }

    if (input.age_scope !== "child_28_days_to_under_18_years") {
      return {
        toolId: tool.id,
        warnings: [warning("invalid_age_scope", "Grupo de edad no valido.", "Invalid age group.")],
        trace: [{ inputId: "age_scope", value: input.age_scope }]
      };
    }

    const unit = String(input.creatinine_unit);
    if (!["mg_dl", "umol_l"].includes(unit)) {
      return {
        toolId: tool.id,
        warnings: [warning("invalid_creatinine_unit", "Unidad de creatinina no valida.", "Invalid creatinine unit.")],
        trace: [{ inputId: "creatinine_unit", value: input.creatinine_unit }]
      };
    }

    const currentRaw = getNumber(input, "current_creatinine");
    if (currentRaw === null || currentRaw <= 0) {
      return {
        toolId: tool.id,
        warnings: [warning("invalid_current_creatinine", "Introduce una creatinina actual valida.", "Enter a valid current creatinine.")],
        trace: [{ inputId: "current_creatinine", value: input.current_creatinine }]
      };
    }
    const current = toMgDl(currentRaw, unit);

    const baselineStatus = String(input.baseline_status);
    if (!["known_or_estimated", "unknown"].includes(baselineStatus)) {
      return {
        toolId: tool.id,
        warnings: [warning("invalid_baseline_status", "Estado basal no valido.", "Invalid baseline status.")],
        trace: [{ inputId: "baseline_status", value: input.baseline_status }]
      };
    }

    let baseline: number | null = null;
    if (baselineStatus === "known_or_estimated") {
      const baselineRaw = getNumber(input, "baseline_creatinine_7d");
      if (baselineRaw === null || baselineRaw <= 0) {
        return {
          toolId: tool.id,
          warnings: [
            warning(
              "baseline_creatinine_required",
              "Introduce la creatinina basal/de referencia de los 7 dias previos o selecciona basal desconocido.",
              "Enter the baseline/reference creatinine from the previous 7 days or select unknown baseline."
            )
          ],
          trace: [{ inputId: "baseline_creatinine_7d", value: input.baseline_creatinine_7d }]
        };
      }
      baseline = toMgDl(baselineRaw, unit);
    }

    let previous48: number | null = null;
    const previous48Raw = getNumber(input, "previous_creatinine_48h");
    if (previous48Raw !== null) {
      if (previous48Raw <= 0) {
        return {
          toolId: tool.id,
          warnings: [warning("invalid_previous_creatinine", "La creatinina previa debe ser mayor que cero.", "Previous creatinine must be greater than zero.")],
          trace: [{ inputId: "previous_creatinine_48h", value: input.previous_creatinine_48h }]
        };
      }
      previous48 = toMgDl(previous48Raw, unit);
    }

    let creatinineStage: Stage = 0;
    let akiByCreatinine = false;

    if (previous48 !== null && current - previous48 >= 0.3) {
      creatinineStage = maxStage(creatinineStage, 1);
      akiByCreatinine = true;
    }

    if (baseline !== null) {
      const ratio = current / baseline;
      if (ratio >= 3) creatinineStage = maxStage(creatinineStage, 3);
      else if (ratio >= 2) creatinineStage = maxStage(creatinineStage, 2);
      else if (ratio >= 1.5) creatinineStage = maxStage(creatinineStage, 1);

      if (ratio >= 1.5) akiByCreatinine = true;
    }

    if (current >= 4) {
      creatinineStage = maxStage(creatinineStage, 3);
    }

    const egfr = getNumber(input, "current_egfr");
    if (egfr !== null) {
      if (egfr <= 0) {
        return {
          toolId: tool.id,
          warnings: [warning("invalid_egfr", "El eGFR debe ser mayor que cero.", "eGFR must be greater than zero.")],
          trace: [{ inputId: "current_egfr", value: input.current_egfr }]
        };
      }
      if (egfr < 35) creatinineStage = maxStage(creatinineStage, 3);
    }

    const rrtStarted = String(input.rrt_started);
    if (!["yes", "no"].includes(rrtStarted)) {
      return {
        toolId: tool.id,
        warnings: [warning("invalid_rrt_status", "Estado de terapia renal sustitutiva no valido.", "Invalid renal replacement therapy status.")],
        trace: [{ inputId: "rrt_started", value: input.rrt_started }]
      };
    }
    if (rrtStarted === "yes") creatinineStage = maxStage(creatinineStage, 3);

    const urineStatus = String(input.urine_data_status);
    if (!["available", "unavailable"].includes(urineStatus)) {
      return {
        toolId: tool.id,
        warnings: [warning("invalid_urine_status", "Estado de datos de diuresis no valido.", "Invalid urine-data status.")],
        trace: [{ inputId: "urine_data_status", value: input.urine_data_status }]
      };
    }

    let urineStage: Stage = 0;
    let akiByUrine = false;
    let urineRate: number | null = null;
    let urineDuration: number | null = null;
    let anuriaHours: number | null = null;

    if (urineStatus === "available") {
      urineRate = getNumber(input, "urine_output_ml_kg_h");
      urineDuration = getNumber(input, "urine_duration_hours");
      anuriaHours = getNumber(input, "anuria_hours");

      if (
        urineRate === null || urineRate < 0 ||
        urineDuration === null || urineDuration < 0 ||
        anuriaHours === null || anuriaHours < 0
      ) {
        return {
          toolId: tool.id,
          warnings: [warning("invalid_urine_data", "Introduce diuresis, duracion y anuria con valores validos no negativos.", "Enter urine output, duration, and anuria with valid non-negative values.")],
          trace: []
        };
      }

      urineStage = classifyUrine(urineRate, urineDuration, anuriaHours);
      akiByUrine = urineStage > 0;
    }

    const overallStage = maxStage(creatinineStage, urineStage);
    const warnings = [];

    if (baselineStatus === "unknown") {
      warnings.push(
        warning(
          "baseline_unknown",
          "No se ha imputado una creatinina basal. Los criterios por multiplicador basal pueden quedar sin evaluar.",
          "No baseline creatinine was imputed. Baseline-multiplier criteria may remain unevaluable."
        )
      );
    }

    if (urineStatus === "unavailable") {
      warnings.push(
        warning(
          "urine_output_unavailable",
          "No se ha evaluado el componente de diuresis; el estadio global puede estar infraestimado.",
          "The urine-output component was not assessed; the overall stage may be underestimated."
        )
      );
    }

    const diagnosticCriteria: string[] = [];
    if (previous48 !== null && current - previous48 >= 0.3) diagnosticCriteria.push("ΔSCr >=0.3 mg/dL/48 h");
    if (baseline !== null && current / baseline >= 1.5) diagnosticCriteria.push("SCr >=1.5x baseline/7 d");
    if (akiByUrine) diagnosticCriteria.push("urine-output criterion");

    const akiDetected = diagnosticCriteria.length > 0 || rrtStarted === "yes" || (egfr !== null && egfr < 35) || current >= 4;

    return {
      toolId: tool.id,
      score: overallStage,
      maxScore: 3,
      label: stageLabel[overallStage],
      classification: {
        es: `Creatinina/eGFR: estadio ${creatinineStage} · diuresis: ${urineStatus === "available" ? `estadio ${urineStage}` : "no evaluada"} · global: estadio ${overallStage} · criterio diagnostico de AKI: ${akiDetected ? "cumplido" : "no demostrado con los datos introducidos"}`,
        en: `Creatinine/eGFR: stage ${creatinineStage} · urine output: ${urineStatus === "available" ? `stage ${urineStage}` : "not assessed"} · overall: stage ${overallStage} · AKI diagnostic criterion: ${akiDetected ? "met" : "not demonstrated by entered data"}`
      },
      warnings,
      trace: [
        { inputId: "age_scope", value: input.age_scope },
        { inputId: "creatinine_unit", value: unit },
        { inputId: "current_creatinine", value: currentRaw },
        { inputId: "previous_creatinine_48h", value: input.previous_creatinine_48h },
        { inputId: "baseline_status", value: baselineStatus },
        { inputId: "baseline_creatinine_7d", value: input.baseline_creatinine_7d },
        { inputId: "current_egfr", value: input.current_egfr },
        { inputId: "urine_data_status", value: urineStatus },
        { inputId: "urine_output_ml_kg_h", value: urineRate },
        { inputId: "urine_duration_hours", value: urineDuration },
        { inputId: "anuria_hours", value: anuriaHours },
        { inputId: "rrt_started", value: rrtStarted },
        { inputId: "diagnostic_criteria", value: diagnosticCriteria.join("; ") }
      ]
    };
  }
};
