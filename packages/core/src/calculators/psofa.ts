import type { CalculationResult } from "../types.js";
import { getBoolean, getNumber, getTool, label, warning } from "./common.js";
import type { CalculatorDefinition } from "./common.js";

const contextWarning = warning(
  "psofa_context",
  "pSOFA cuantifica disfunción orgánica pediátrica usando el peor valor de cada sistema en una ventana de 24 horas. No es una recomendación terapéutica.",
  "pSOFA quantifies pediatric organ dysfunction using the worst value for each system in a 24-hour window. It is not a treatment recommendation."
);

const mapThreshold = (ageMonths: number): number =>
  ageMonths < 1 ? 46 :
  ageMonths < 12 ? 55 :
  ageMonths < 24 ? 60 :
  ageMonths < 60 ? 62 :
  ageMonths < 144 ? 65 :
  ageMonths <= 216 ? 67 : 70;

const renalScore = (ageMonths: number, creatinine: number): number => {
  const cuts =
    ageMonths < 1 ? [0.8, 1.0, 1.2, 1.6] :
    ageMonths < 12 ? [0.3, 0.5, 0.8, 1.2] :
    ageMonths < 24 ? [0.4, 0.6, 1.1, 1.5] :
    ageMonths < 60 ? [0.6, 0.9, 1.6, 2.3] :
    ageMonths < 144 ? [0.7, 1.1, 1.8, 2.6] :
    ageMonths <= 216 ? [1.0, 1.7, 2.9, 4.2] :
    [1.2, 2.0, 3.5, 5.0];

  if (creatinine < cuts[0]) return 0;
  if (creatinine < cuts[1]) return 1;
  if (creatinine < cuts[2]) return 2;
  if (creatinine < cuts[3]) return 3;
  return 4;
};

const ratioScore = (
  ratio: number,
  respiratorySupport: boolean,
  type: "pf" | "sf"
): number => {
  const [normal, mild, moderate, severe] =
    type === "pf" ? [400, 300, 200, 100] : [292, 264, 221, 148];

  if (ratio >= normal) return 0;
  if (ratio >= mild) return 1;
  if (ratio >= moderate) return 2;
  if (!respiratorySupport) return 2;
  if (ratio >= severe) return 3;
  return 4;
};

export const psofaCalculator: CalculatorDefinition = {
  toolId: "psofa",
  calculate: (input): CalculationResult => {
    const tool = getTool("psofa");
    const ageMonths = getNumber(input, "age_months");
    const pf = getNumber(input, "pao2_fio2_ratio");
    const sf = getNumber(input, "spo2_fio2_ratio");
    const spo2 = getNumber(input, "spo2_percent");
    const respiratorySupport = getBoolean(input, "respiratory_support");
    const platelets = getNumber(input, "platelets_10e9_l");
    const bilirubin = getNumber(input, "bilirubin_mg_dl");
    const map = getNumber(input, "map_mmhg");
    const gcs = getNumber(input, "gcs");
    const creatinine = getNumber(input, "creatinine_mg_dl");

    if (
      ageMonths === null || respiratorySupport === null ||
      platelets === null || bilirubin === null || map === null ||
      gcs === null || creatinine === null || (pf === null && sf === null)
    ) {
      return {
        toolId: tool.id,
        warnings: [warning(
          "missing_psofa_inputs",
          "Faltan variables necesarias para calcular pSOFA.",
          "Required variables for pSOFA are missing."
        )],
        trace: []
      };
    }

    if (
      ageMonths < 0 || platelets < 0 || bilirubin < 0 || map < 0 ||
      gcs < 3 || gcs > 15 || creatinine < 0 ||
      (pf !== null && pf < 0) || (sf !== null && sf < 0) ||
      (spo2 !== null && (spo2 < 0 || spo2 > 100))
    ) {
      return {
        toolId: tool.id,
        warnings: [warning("invalid_psofa_inputs", "Revisa los valores introducidos.", "Review entered values.")],
        trace: []
      };
    }

    if (sf !== null && pf === null && (spo2 === null || spo2 > 97)) {
      return {
        toolId: tool.id,
        warnings: [warning(
          "invalid_psofa_sf_ratio",
          "El cociente SpO₂/FiO₂ solo debe usarse con SpO₂ ≤97%; introduce también la SpO₂ o utiliza PaO₂/FiO₂.",
          "The SpO₂/FiO₂ ratio should only be used with SpO₂ ≤97%; enter SpO₂ or use PaO₂/FiO₂."
        )],
        trace: []
      };
    }

    const respiratoryCandidates: number[] = [];
    if (pf !== null) respiratoryCandidates.push(ratioScore(pf, respiratorySupport, "pf"));
    if (sf !== null && spo2 !== null && spo2 <= 97) respiratoryCandidates.push(ratioScore(sf, respiratorySupport, "sf"));
    const respiratory = Math.max(...respiratoryCandidates);

    const coagulation =
      platelets >= 150 ? 0 :
      platelets >= 100 ? 1 :
      platelets >= 50 ? 2 :
      platelets >= 20 ? 3 : 4;

    const hepatic =
      bilirubin < 1.2 ? 0 :
      bilirubin < 2 ? 1 :
      bilirubin < 6 ? 2 :
      bilirubin < 12 ? 3 : 4;

    const dopamine = getNumber(input, "dopamine_mcg_kg_min") ?? 0;
    const dobutamine = getNumber(input, "dobutamine_mcg_kg_min") ?? 0;
    const epinephrine = getNumber(input, "epinephrine_mcg_kg_min") ?? 0;
    const norepinephrine = getNumber(input, "norepinephrine_mcg_kg_min") ?? 0;

    if ([dopamine, dobutamine, epinephrine, norepinephrine].some((value) => value < 0)) {
      return {
        toolId: tool.id,
        warnings: [warning("invalid_psofa_vasoactive", "Las dosis vasoactivas no pueden ser negativas.", "Vasoactive doses cannot be negative.")],
        trace: []
      };
    }

    let cardiovascular = map < mapThreshold(ageMonths) ? 1 : 0;
    if (dopamine > 15 || epinephrine > 0.1 || norepinephrine > 0.1) cardiovascular = 4;
    else if (dopamine > 5 || (epinephrine > 0 && epinephrine <= 0.1) || (norepinephrine > 0 && norepinephrine <= 0.1)) cardiovascular = Math.max(cardiovascular, 3);
    else if ((dopamine > 0 && dopamine <= 5) || dobutamine > 0) cardiovascular = Math.max(cardiovascular, 2);

    const neurologic = gcs === 15 ? 0 : gcs >= 13 ? 1 : gcs >= 10 ? 2 : gcs >= 6 ? 3 : 4;
    const renal = renalScore(ageMonths, creatinine);
    const score = respiratory + coagulation + hepatic + cardiovascular + neurologic + renal;

    return {
      toolId: tool.id,
      score,
      maxScore: 24,
      classification: label(`pSOFA ${score}/24`, `pSOFA ${score}/24`),
      warnings: [
        contextWarning,
        warning(
          "psofa_not_current_sepsis_definition",
          "pSOFA puede describir disfunción orgánica, pero no debe sustituir los criterios pediátricos de sepsis vigentes ni convertirse en una predicción individual de mortalidad.",
          "pSOFA may describe organ dysfunction, but it should not replace current pediatric sepsis criteria or be converted into an individual mortality prediction."
        )
      ],
      trace: [
        { inputId: "respiratory", value: pf ?? sf, score: respiratory },
        { inputId: "platelets_10e9_l", value: platelets, score: coagulation },
        { inputId: "bilirubin_mg_dl", value: bilirubin, score: hepatic },
        { inputId: "map_mmhg", value: map, score: cardiovascular },
        { inputId: "gcs", value: gcs, score: neurologic },
        { inputId: "creatinine_mg_dl", value: creatinine, score: renal }
      ]
    };
  }
};
