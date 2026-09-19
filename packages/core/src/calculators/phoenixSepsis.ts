import type { CalculationResult } from "../types.js";
import { getBoolean, getNumber, getTool, label, warning } from "./common.js";
import type { CalculatorDefinition } from "./common.js";

const mapScore = (ageMonths: number, map: number): number => {
  const [one, two] =
    ageMonths < 1 ? [30, 17] :
    ageMonths < 12 ? [38, 25] :
    ageMonths < 24 ? [43, 31] :
    ageMonths < 60 ? [44, 32] :
    ageMonths < 144 ? [48, 36] :
    [51, 38];
  if (map > one) return 0;
  if (map >= two) return 1;
  return 2;
};

export const phoenixSepsisCalculator: CalculatorDefinition = {
  toolId: "phoenix_sepsis",
  calculate: (input): CalculationResult => {
    const tool = getTool("phoenix-sepsis");
    const ageMonths = getNumber(input, "age_months");
    const suspectedInfection = getBoolean(input, "suspected_infection");
    const birthHospitalization = getBoolean(input, "birth_hospitalization_before_discharge");
    const postconceptionalAgeWeeks = getNumber(input, "postconceptional_age_weeks");
    const fio2 = getNumber(input, "fio2_fraction");
    const pao2 = getNumber(input, "pao2_mmhg");
    const spo2 = getNumber(input, "spo2_percent");
    const anySupportEntered = getBoolean(input, "any_respiratory_support");
    const imv = getBoolean(input, "invasive_mechanical_ventilation");
    const vasoactiveCount = getNumber(input, "vasoactive_count");
    const lactate = getNumber(input, "lactate_mmol_l");
    const map = getNumber(input, "map_mmhg");
    const platelets = getNumber(input, "platelets_10e3_ul");
    const inr = getNumber(input, "inr");
    const dDimer = getNumber(input, "d_dimer_mg_l_feu");
    const fibrinogen = getNumber(input, "fibrinogen_mg_dl");
    const gcs = getNumber(input, "gcs");
    const pupilsFixed = getBoolean(input, "both_pupils_fixed");

    if (
      ageMonths === null || suspectedInfection === null ||
      birthHospitalization === null || postconceptionalAgeWeeks === null ||
      anySupportEntered === null || imv === null
    ) {
      return {
        toolId: tool.id,
        warnings: [warning(
          "missing_phoenix_eligibility",
          "Faltan datos de elegibilidad o soporte respiratorio para aplicar los criterios Phoenix.",
          "Eligibility or respiratory-support data are missing for the Phoenix criteria."
        )],
        trace: []
      };
    }

    if (
      ageMonths < 0 || ageMonths >= 216 || postconceptionalAgeWeeks < 0 ||
      (fio2 !== null && (fio2 <= 0 || fio2 > 1)) ||
      (pao2 !== null && pao2 <= 0) ||
      (spo2 !== null && (spo2 <= 0 || spo2 > 100)) ||
      (vasoactiveCount !== null && vasoactiveCount < 0) ||
      (lactate !== null && lactate < 0) ||
      (map !== null && map < 0) ||
      (platelets !== null && platelets < 0) ||
      (inr !== null && inr < 0) ||
      (dDimer !== null && dDimer < 0) ||
      (fibrinogen !== null && fibrinogen < 0) ||
      (gcs !== null && (gcs < 3 || gcs > 15))
    ) {
      return {
        toolId: tool.id,
        warnings: [warning(
          "invalid_phoenix_inputs",
          "Revisa edad, unidades y valores fisiológicos; Phoenix se aplica a pacientes pediátricos menores de 18 años.",
          "Review age, units, and physiologic values; Phoenix applies to pediatric patients under 18 years."
        )],
        trace: []
      };
    }

    if (birthHospitalization || postconceptionalAgeWeeks < 37) {
      return {
        toolId: tool.id,
        warnings: [warning(
          "phoenix_outside_validated_population",
          "Los criterios Phoenix excluyeron hospitalizaciones desde el nacimiento antes del alta y edad postconcepcional <37 semanas.",
          "The Phoenix criteria excluded birth hospitalizations before discharge and postconceptional age <37 weeks."
        )],
        trace: [
          { inputId: "birth_hospitalization_before_discharge", value: birthHospitalization },
          { inputId: "postconceptional_age_weeks", value: postconceptionalAgeWeeks }
        ]
      };
    }

    const anySupport = anySupportEntered || imv;
    const pf = pao2 !== null && fio2 !== null ? pao2 / fio2 : null;
    // Phoenix permits S/F scoring only when SpO2 is <=97%.
    const sf = spo2 !== null && spo2 <= 97 && fio2 !== null ? spo2 / fio2 : null;

    let respiratory = 0;
    if (imv && ((pf !== null && pf < 100) || (sf !== null && sf < 148))) respiratory = 3;
    else if (imv && ((pf !== null && pf >= 100 && pf <= 200) || (sf !== null && sf >= 148 && sf <= 220))) respiratory = 2;
    else if (anySupport && ((pf !== null && pf < 400) || (sf !== null && sf < 292))) respiratory = 1;

    const vaso = vasoactiveCount === null ? 0 : vasoactiveCount >= 2 ? 2 : vasoactiveCount >= 1 ? 1 : 0;
    const lact = lactate === null ? 0 : lactate >= 11 ? 2 : lactate >= 5 ? 1 : 0;
    const mapPts = map === null ? 0 : mapScore(ageMonths, map);
    const cardiovascular = vaso + lact + mapPts;

    const coagAbnormal = [
      platelets !== null && platelets < 100,
      inr !== null && inr > 1.3,
      dDimer !== null && dDimer > 2,
      fibrinogen !== null && fibrinogen < 100
    ].filter(Boolean).length;
    const coagulation = Math.min(2, coagAbnormal);

    const neurologic = pupilsFixed === true ? 2 : gcs !== null && gcs <= 10 ? 1 : 0;
    const score = respiratory + cardiovascular + coagulation + neurologic;
    const sepsis = suspectedInfection && score >= 2;
    const shock = sepsis && cardiovascular >= 1;

    const missingOptional = [
      ["oxygenation", pf === null && sf === null],
      ["vasoactive_count", vasoactiveCount === null],
      ["lactate", lactate === null],
      ["map", map === null],
      ["platelets", platelets === null],
      ["inr", inr === null],
      ["d_dimer", dDimer === null],
      ["fibrinogen", fibrinogen === null],
      ["gcs", gcs === null],
      ["pupils", pupilsFixed === null]
    ].filter(([, missing]) => missing).map(([name]) => name);

    const warnings = [
      warning(
        "phoenix_not_screening",
        "Phoenix cuantifica disfunción orgánica y define criterios de sepsis/shock en infección sospechada o confirmada; no es una herramienta de cribado precoz.",
        "Phoenix quantifies organ dysfunction and defines sepsis/shock criteria in suspected or confirmed infection; it is not an early screening tool."
      ),
      warning(
        "phoenix_first_24h",
        "Los criterios se desarrollaron para identificar sepsis durante las primeras 24 horas del encuentro hospitalario.",
        "The criteria were developed to identify sepsis during the first 24 hours of the hospital encounter."
      )
    ];

    if (spo2 !== null && spo2 > 97 && pao2 === null) {
      warnings.push(warning(
        "phoenix_sf_not_valid_above_97",
        "SpO₂ >97%: el cociente SpO₂/FiO₂ no se utiliza para puntuar Phoenix. Sin PaO₂ disponible, el componente respiratorio puede quedar infravalorado.",
        "SpO₂ >97%: the SpO₂/FiO₂ ratio is not used for Phoenix scoring. Without PaO₂, the respiratory component may be underestimated."
      ));
    }
    if (imv && !anySupportEntered) {
      warnings.push(warning(
        "phoenix_support_derived_from_imv",
        "Se ha considerado soporte respiratorio presente porque se indicó ventilación mecánica invasiva.",
        "Respiratory support was treated as present because invasive mechanical ventilation was selected."
      ));
    }
    if (missingOptional.length) {
      warnings.push(warning(
        "phoenix_partial_data",
        "Phoenix puede calcularse con variables no disponibles; las variables no medidas no aportan puntos. Interpreta el resultado como un mínimo con los datos disponibles.",
        "Phoenix can be calculated when some variables are unavailable; unmeasured variables contribute no points. Interpret the result as a minimum based on available data."
      ));
    }

    return {
      toolId: tool.id,
      score,
      maxScore: 13,
      classification:
        shock ? label("Cumple criterios Phoenix de shock séptico", "Meets Phoenix septic shock criteria") :
        sepsis ? label("Cumple criterios Phoenix de sepsis", "Meets Phoenix sepsis criteria") :
        suspectedInfection ? label("No cumple el umbral Phoenix de sepsis con los datos disponibles", "Does not meet the Phoenix sepsis threshold with available data") :
        label("Phoenix Score calculado; sin infección sospechada no define sepsis", "Phoenix Score calculated; without suspected infection it does not define sepsis"),
      warnings,
      trace: [
        { inputId: "respiratory_subscore", value: respiratory },
        { inputId: "pao2_fio2", value: pf === null ? null : Number(pf.toFixed(1)) },
        { inputId: "spo2_fio2", value: sf === null ? null : Number(sf.toFixed(1)) },
        { inputId: "spo2_fio2_eligible", value: spo2 === null ? null : spo2 <= 97 },
        { inputId: "cardiovascular_subscore", value: cardiovascular },
        { inputId: "vasoactive_points", value: vaso },
        { inputId: "lactate_points", value: lact },
        { inputId: "map_points", value: mapPts },
        { inputId: "coagulation_subscore", value: coagulation },
        { inputId: "neurologic_subscore", value: neurologic },
        { inputId: "suspected_infection", value: suspectedInfection },
        { inputId: "phoenix_score", value: score }
      ]
    };
  }
};
