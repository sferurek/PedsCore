import type { CalculationResult } from "../types.js";
import {
  getBoolean,
  getNumber,
  getTool,
  label,
  warning
} from "./common.js";
import type { CalculatorDefinition } from "./common.js";

const prognosticWarning = warning(
  "population_level_prognosis",
  "La probabilidad estimada procede de un modelo pronóstico poblacional de UCI pediátrica y no debe interpretarse como predicción individual ni utilizarse de forma aislada para decisiones terapéuticas o limitación de soporte.",
  "The estimated probability comes from a population-level PICU prognostic model and must not be interpreted as an individual prediction or used alone for treatment or limitation-of-support decisions."
);

const logisticPercent = (logit: number): number =>
  Number((100 * (Math.exp(logit) / (1 + Math.exp(logit)))).toFixed(2));

const pelodMapScore = (ageMonths: number, map: number): number => {
  const rows: [number, number, number] = ageMonths < 1
    ? [46, 31, 17]
    : ageMonths < 12
      ? [55, 39, 25]
      : ageMonths < 24
        ? [60, 44, 31]
        : ageMonths < 60
          ? [62, 46, 32]
          : ageMonths < 144
            ? [65, 49, 36]
            : [67, 52, 38];

  if (map >= rows[0]) return 0;
  if (map >= rows[1]) return 2;
  if (map >= rows[2]) return 3;
  return 6;
};

const pelodCreatinineScore = (ageMonths: number, creatinineUmolL: number): number => {
  const threshold =
    ageMonths < 1 ? 70 :
    ageMonths < 12 ? 23 :
    ageMonths < 24 ? 35 :
    ageMonths < 60 ? 51 :
    ageMonths < 144 ? 59 : 93;
  return creatinineUmolL >= threshold ? 2 : 0;
};

export const pelod2Calculator: CalculatorDefinition = {
  toolId: "pelod_2",
  calculate: (input): CalculationResult => {
    const tool = getTool("pelod-2");
    const ageMonths = getNumber(input, "age_months");
    const gcs = getNumber(input, "gcs");
    const pupilsFixed = getBoolean(input, "both_pupils_fixed");
    const lactate = getNumber(input, "lactate_mmol_l");
    const map = getNumber(input, "map_mmhg");
    const creatinine = getNumber(input, "creatinine_umol_l");
    const pao2 = getNumber(input, "pao2_mmhg");
    const fio2 = getNumber(input, "fio2_fraction");
    const paco2 = getNumber(input, "paco2_mmhg");
    const invasiveVentilation = getBoolean(input, "invasive_ventilation");
    const wbc = getNumber(input, "wbc_10e9_l");
    const platelets = getNumber(input, "platelets_10e9_l");

    if (
      ageMonths === null || gcs === null || pupilsFixed === null ||
      lactate === null || map === null || creatinine === null ||
      pao2 === null || fio2 === null || paco2 === null ||
      invasiveVentilation === null || wbc === null || platelets === null
    ) {
      return {
        toolId: tool.id,
        warnings: [warning(
          "missing_pelod2_inputs",
          "Faltan variables necesarias para calcular PELOD-2.",
          "Required PELOD-2 variables are missing."
        )],
        trace: []
      };
    }

    if (
      ageMonths < 0 || gcs < 3 || gcs > 15 || lactate < 0 || map < 0 ||
      creatinine < 0 || pao2 <= 0 || fio2 <= 0 || fio2 > 1 ||
      paco2 < 0 || wbc < 0 || platelets < 0
    ) {
      return {
        toolId: tool.id,
        warnings: [warning(
          "invalid_pelod2_inputs",
          "Revisa edad, GCS, unidades y valores fisiológicos antes de calcular PELOD-2.",
          "Review age, GCS, units, and physiologic values before calculating PELOD-2."
        )],
        trace: []
      };
    }

    const gcsScore = gcs >= 11 ? 0 : gcs >= 5 ? 1 : 4;
    const pupilScore = pupilsFixed ? 5 : 0;
    const lactateScore = lactate < 5 ? 0 : lactate < 11 ? 1 : 4;
    const mapScore = pelodMapScore(ageMonths, map);
    const creatinineScore = pelodCreatinineScore(ageMonths, creatinine);
    const pfRatio = pao2 / fio2;
    const pfScore = pfRatio <= 60 ? 2 : 0;
    const paco2Score = paco2 <= 58 ? 0 : paco2 < 95 ? 1 : 3;
    const ventilationScore = invasiveVentilation ? 3 : 0;
    const wbcScore = wbc <= 2 ? 2 : 0;
    const plateletScore = platelets >= 142 ? 0 : platelets >= 77 ? 1 : 2;
    const score =
      gcsScore + pupilScore + lactateScore + mapScore + creatinineScore +
      pfScore + paco2Score + ventilationScore + wbcScore + plateletScore;

    const logit = -6.61 + 0.47 * score;

    return {
      toolId: tool.id,
      score,
      maxScore: 33,
      value: logisticPercent(logit),
      unit: "%",
      label: label("Mortalidad estimada por modelo PELOD-2", "Estimated mortality from PELOD-2 model"),
      classification: label(`PELOD-2 ${score}`, `PELOD-2 ${score}`),
      warnings: [
        prognosticWarning,
        warning(
          "pelod2_worst_values",
          "PELOD-2 debe calcularse con los valores más patológicos de la ventana temporal definida para la evaluación.",
          "PELOD-2 should be calculated using the most abnormal values within the defined assessment window."
        )
      ],
      trace: [
        { inputId: "gcs", value: gcs, score: gcsScore },
        { inputId: "both_pupils_fixed", value: pupilsFixed, score: pupilScore },
        { inputId: "lactate_mmol_l", value: lactate, score: lactateScore },
        { inputId: "map_mmhg", value: map, score: mapScore },
        { inputId: "creatinine_umol_l", value: creatinine, score: creatinineScore },
        { inputId: "pao2_fio2_ratio", value: Number(pfRatio.toFixed(1)), score: pfScore },
        { inputId: "paco2_mmhg", value: paco2, score: paco2Score },
        { inputId: "invasive_ventilation", value: invasiveVentilation, score: ventilationScore },
        { inputId: "wbc_10e9_l", value: wbc, score: wbcScore },
        { inputId: "platelets_10e9_l", value: platelets, score: plateletScore },
        { inputId: "mortality_logit", value: Number(logit.toFixed(4)) }
      ]
    };
  }
};

export const pim3Calculator: CalculatorDefinition = {
  toolId: "pim3",
  calculate: (input): CalculationResult => {
    const tool = getTool("pim3");
    const pupilsFixed = getBoolean(input, "both_pupils_fixed");
    const electiveAdmission = getBoolean(input, "elective_admission");
    const mechanicalVentilation = getBoolean(input, "mechanical_ventilation_first_hour");
    const baseExcessUnknown = getBoolean(input, "base_excess_unknown");
    const sbpUnknown = getBoolean(input, "sbp_unknown");
    const oxygenationUnknown = getBoolean(input, "oxygenation_unknown");
    const baseExcessEntered = getNumber(input, "base_excess_mmol_l");
    const sbpEntered = getNumber(input, "systolic_bp_mmhg");
    const fio2Entered = getNumber(input, "fio2_fraction");
    const pao2Entered = getNumber(input, "pao2_mmhg");
    const procedure = input.procedure_category;
    const riskGroup = input.diagnosis_risk_group;

    if (
      pupilsFixed === null || electiveAdmission === null ||
      mechanicalVentilation === null || baseExcessUnknown === null ||
      sbpUnknown === null || oxygenationUnknown === null ||
      typeof procedure !== "string" || typeof riskGroup !== "string"
    ) {
      return {
        toolId: tool.id,
        warnings: [warning(
          "missing_pim3_inputs",
          "Faltan variables necesarias para calcular PIM3.",
          "Required PIM3 variables are missing."
        )],
        trace: []
      };
    }

    const baseExcess = baseExcessUnknown ? 0 : baseExcessEntered;
    const sbp = sbpUnknown ? 120 : sbpEntered;
    const oxygenTerm =
      oxygenationUnknown ? 0.23 :
      fio2Entered !== null && pao2Entered !== null && fio2Entered > 0 && fio2Entered <= 1 && pao2Entered > 0
        ? (fio2Entered * 100) / pao2Entered
        : null;

    if (baseExcess === null || sbp === null || oxygenTerm === null || sbp < 0) {
      return {
        toolId: tool.id,
        warnings: [warning(
          "invalid_pim3_inputs",
          "Revisa PAS, FiO₂ y PaO₂ antes de calcular PIM3.",
          "Review SBP, FiO₂, and PaO₂ before calculating PIM3."
        )],
        trace: []
      };
    }

    const procedureCoefficient =
      procedure === "cardiac_bypass" ? -1.2246 :
      procedure === "cardiac_no_bypass" ? -0.8762 :
      procedure === "noncardiac" ? -1.5164 : 0;
    const riskCoefficient =
      riskGroup === "very_high" ? 1.6225 :
      riskGroup === "high" ? 1.0725 :
      riskGroup === "low" ? -2.1766 : 0;

    const logit =
      -1.7928 +
      3.8233 * (pupilsFixed ? 1 : 0) -
      0.5378 * (electiveAdmission ? 1 : 0) +
      0.9763 * (mechanicalVentilation ? 1 : 0) +
      0.0671 * Math.abs(baseExcess) -
      0.0431 * sbp +
      0.1716 * ((sbp * sbp) / 1000) +
      0.4214 * oxygenTerm +
      procedureCoefficient +
      riskCoefficient;

    return {
      toolId: tool.id,
      value: logisticPercent(logit),
      unit: "%",
      label: label("Mortalidad estimada PIM3", "Estimated PIM3 mortality"),
      classification: label("PIM3", "PIM3"),
      warnings: [
        prognosticWarning,
        warning(
          "pim3_admission_window",
          "PIM3 utiliza variables disponibles en el momento del primer contacto con UCI y dentro de la primera hora según la definición del modelo.",
          "PIM3 uses variables available at first PICU contact and within the first hour according to the model definition."
        )
      ],
      trace: [
        { inputId: "both_pupils_fixed", value: pupilsFixed },
        { inputId: "elective_admission", value: electiveAdmission },
        { inputId: "mechanical_ventilation_first_hour", value: mechanicalVentilation },
        { inputId: "base_excess_unknown", value: baseExcessUnknown },
        { inputId: "base_excess_mmol_l", value: baseExcess },
        { inputId: "sbp_unknown", value: sbpUnknown },
        { inputId: "systolic_bp_mmhg", value: sbp },
        { inputId: "oxygenation_unknown", value: oxygenationUnknown },
        { inputId: "oxygen_term", value: Number(oxygenTerm.toFixed(4)) },
        { inputId: "procedure_category", value: procedure },
        { inputId: "diagnosis_risk_group", value: riskGroup },
        { inputId: "pim3_logit", value: Number(logit.toFixed(5)) }
      ]
    };
  }
};

type PrismAgeGroup = "neonate" | "infant" | "child" | "adolescent";

const prismAgeGroup = (ageDays: number): PrismAgeGroup =>
  ageDays < 30.4375 ? "neonate" :
  ageDays < 365.25 ? "infant" :
  ageDays < 4383 ? "child" : "adolescent";

const prismSbpScore = (group: PrismAgeGroup, sbp: number): number => {
  const limits: Record<PrismAgeGroup, [number, number]> = {
    neonate: [40, 55],
    infant: [45, 65],
    child: [55, 75],
    adolescent: [65, 85]
  };
  const [critical, moderate] = limits[group];
  return sbp < critical ? 7 : sbp <= moderate ? 3 : 0;
};

const prismHrScore = (group: PrismAgeGroup, hr: number): number => {
  const limits: Record<PrismAgeGroup, [number, number]> = {
    neonate: [215, 225],
    infant: [215, 225],
    child: [185, 205],
    adolescent: [145, 155]
  };
  const [moderate, severe] = limits[group];
  return hr > severe ? 4 : hr >= moderate ? 3 : 0;
};

const prismCreatinineScore = (group: PrismAgeGroup, creatinineMgDl: number): number => {
  const threshold: Record<PrismAgeGroup, number> = {
    neonate: 0.85,
    infant: 0.9,
    child: 0.9,
    adolescent: 1.3
  };
  return creatinineMgDl > threshold[group] ? 2 : 0;
};

export const prism4Calculator: CalculatorDefinition = {
  toolId: "prism_iv",
  calculate: (input): CalculationResult => {
    const tool = getTool("prism-iv");
    const ageDays = getNumber(input, "age_days");
    const admissionSource = input.admission_source;
    const cpr = getBoolean(input, "cpr_within_24h");
    const cancer = getBoolean(input, "cancer");
    const lowRiskSystem = getBoolean(input, "low_risk_primary_system");
    const sbp = getNumber(input, "systolic_bp_mmhg");
    const hr = getNumber(input, "heart_rate");
    const temperature = getNumber(input, "temperature_c");
    const gcs = getNumber(input, "gcs");
    const pupilStatus = input.pupil_status;
    const phLowest = getNumber(input, "ph_lowest");
    const phHighest = getNumber(input, "ph_highest");
    const totalCo2Lowest = getNumber(input, "total_co2_lowest_mmol_l");
    const totalCo2Highest = getNumber(input, "total_co2_highest_mmol_l");
    const paco2 = getNumber(input, "paco2_mmhg");
    const pao2 = getNumber(input, "pao2_mmhg");
    const glucose = getNumber(input, "glucose_mg_dl");
    const potassium = getNumber(input, "potassium_mmol_l");
    const creatinine = getNumber(input, "creatinine_mg_dl");
    const bun = getNumber(input, "bun_mg_dl");
    const wbc = getNumber(input, "wbc_per_mm3");
    const platelets = getNumber(input, "platelets_per_mm3");
    const pt = getNumber(input, "pt_seconds");
    const ptt = getNumber(input, "ptt_seconds");

    if (
      ageDays === null || typeof admissionSource !== "string" ||
      cpr === null || cancer === null || lowRiskSystem === null ||
      sbp === null || hr === null || temperature === null || gcs === null ||
      typeof pupilStatus !== "string" || phLowest === null || phHighest === null ||
      totalCo2Lowest === null || totalCo2Highest === null ||
      paco2 === null || pao2 === null || glucose === null || potassium === null ||
      creatinine === null || bun === null || wbc === null || platelets === null ||
      pt === null || ptt === null
    ) {
      return {
        toolId: tool.id,
        warnings: [warning(
          "missing_prism4_inputs",
          "Faltan variables necesarias para calcular PRISM IV.",
          "Required PRISM IV variables are missing."
        )],
        trace: []
      };
    }

    if (
      ageDays < 0 || sbp < 0 || hr < 0 || gcs < 3 || gcs > 15 ||
      phLowest <= 0 || phHighest <= 0 || phLowest > phHighest ||
      totalCo2Lowest < 0 || totalCo2Highest < 0 || totalCo2Lowest > totalCo2Highest ||
      paco2 < 0 || pao2 < 0 ||
      glucose < 0 || potassium < 0 || creatinine < 0 || bun < 0 ||
      wbc < 0 || platelets < 0 || pt < 0 || ptt < 0
    ) {
      return {
        toolId: tool.id,
        warnings: [warning(
          "invalid_prism4_inputs",
          "Revisa edad, GCS, unidades y valores fisiológicos antes de calcular PRISM IV.",
          "Review age, GCS, units, and physiologic values before calculating PRISM IV."
        )],
        trace: []
      };
    }

    const group = prismAgeGroup(ageDays);
    const sbpScore = prismSbpScore(group, sbp);
    const hrScore = prismHrScore(group, hr);
    const temperatureScore = temperature < 33 || temperature > 40 ? 3 : 0;
    const gcsScore = gcs < 8 ? 5 : 0;
    const pupilScore = pupilStatus === "both_fixed" ? 11 : pupilStatus === "one_fixed" ? 7 : 0;

    const acidosisFromPh = phLowest < 7 ? 6 : phLowest <= 7.28 ? 2 : 0;
    const acidosisFromCo2 = totalCo2Lowest < 5 ? 6 : totalCo2Lowest <= 16.9 ? 2 : 0;
    const acidosisScore = Math.max(acidosisFromPh, acidosisFromCo2);
    const alkalemiaScore = phHighest > 7.55 ? 3 : phHighest >= 7.48 ? 2 : 0;
    const paco2Score = paco2 > 75 ? 3 : paco2 >= 50 ? 1 : 0;
    const highTotalCo2Score = totalCo2Highest > 34 ? 4 : 0;
    const pao2Score = pao2 < 42 ? 6 : pao2 < 50 ? 3 : 0;
    const glucoseScore = glucose > 200 ? 2 : 0;
    const potassiumScore = potassium > 6.9 ? 3 : 0;
    const creatinineScore = prismCreatinineScore(group, creatinine);
    const bunScore = bun > (group === "neonate" ? 11.9 : 14.9) ? 3 : 0;
    const wbcScore = wbc < 3000 ? 4 : 0;
    const coagScore = pt > 22 || ptt > (group === "neonate" ? 85 : 57) ? 3 : 0;
    const plateletScore = platelets < 50000 ? 5 : platelets < 100000 ? 4 : platelets <= 200000 ? 2 : 0;

    const neurologicScore = gcsScore + pupilScore;
    const nonNeurologicScore =
      sbpScore + hrScore + temperatureScore +
      acidosisScore + alkalemiaScore + paco2Score + highTotalCo2Score + pao2Score +
      glucoseScore + potassiumScore + creatinineScore + bunScore +
      wbcScore + coagScore + plateletScore;

    const ageCoefficient =
      ageDays < 14 ? 1.311 :
      ageDays < 30.4375 ? 0.968 :
      ageDays < 365.25 ? 0.357 : 0;
    const sourceCoefficient =
      admissionSource === "other_hospital" ? 1.012 :
      admissionSource === "inpatient_unit" ? 1.626 :
      admissionSource === "emergency_department" ? 0.693 : 0;

    const logit =
      -5.776 +
      ageCoefficient +
      sourceCoefficient +
      1.082 * (cpr ? 1 : 0) +
      0.766 * (cancer ? 1 : 0) -
      1.697 * (lowRiskSystem ? 1 : 0) +
      0.197 * neurologicScore +
      0.163 * nonNeurologicScore;

    return {
      toolId: tool.id,
      score: neurologicScore + nonNeurologicScore,
      value: logisticPercent(logit),
      unit: "%",
      label: label("Mortalidad hospitalaria estimada PRISM IV", "Estimated PRISM IV hospital mortality"),
      classification: label("PRISM IV", "PRISM IV"),
      warnings: [
        prognosticWarning,
        warning(
          "prism4_collection_window",
          "PRISM IV requiere los peores valores dentro de sus ventanas de recogida definidas (habitualmente 2 h antes a 4 h después del ingreso para laboratorio y primeras 4 h para otras variables), con reglas especiales para determinados pacientes cardiacos.",
          "PRISM IV requires the worst values within its defined collection windows (generally 2 h before to 4 h after admission for laboratory data and the first 4 h for other variables), with special timing rules for selected cardiac patients."
        )
      ],
      trace: [
        { inputId: "prism_neurologic_score", value: neurologicScore },
        { inputId: "prism_non_neurologic_score", value: nonNeurologicScore },
        { inputId: "age_coefficient", value: ageCoefficient },
        { inputId: "admission_source_coefficient", value: sourceCoefficient },
        { inputId: "cpr_within_24h", value: cpr },
        { inputId: "cancer", value: cancer },
        { inputId: "low_risk_primary_system", value: lowRiskSystem },
        { inputId: "prism4_logit", value: Number(logit.toFixed(5)) }
      ]
    };
  }
};
