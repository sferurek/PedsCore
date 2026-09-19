import type { CalculationResult } from "../types.js";
import { getBoolean, getNumber, getTool, label, warning } from "./common.js";
import type { CalculatorDefinition } from "./common.js";

const contextWarning = warning(
  "psofa_context",
  "pSOFA cuantifica disfunción orgánica y se validó para estratificación/pronóstico en pacientes pediátricos críticos. No debe utilizarse por sí solo para diagnosticar sepsis ni indicar tratamiento.",
  "pSOFA quantifies organ dysfunction and was validated for stratification/prognosis in critically ill children. It must not be used alone to diagnose sepsis or direct treatment."
);

const mapThreshold = (ageMonths: number): number =>
  ageMonths < 1 ? 46 :
  ageMonths <= 11 ? 55 :
  ageMonths <= 23 ? 60 :
  ageMonths <= 59 ? 62 :
  ageMonths <= 143 ? 65 :
  ageMonths <= 216 ? 67 : 70;

const renalScore = (ageMonths: number, creatinine: number): number => {
  const bands: [number, number, number, number] =
    ageMonths < 1 ? [0.8, 1.0, 1.2, 1.6] :
    ageMonths <= 11 ? [0.3, 0.5, 0.8, 1.2] :
    ageMonths <= 23 ? [0.4, 0.6, 1.1, 1.5] :
    ageMonths <= 59 ? [0.6, 0.9, 1.6, 2.3] :
    ageMonths <= 143 ? [0.7, 1.1, 1.8, 2.6] :
    ageMonths <= 216 ? [1.0, 1.7, 2.9, 4.2] :
    [1.2, 2.0, 3.5, 5.0];
  if (creatinine < bands[0]) return 0;
  if (creatinine < bands[1]) return 1;
  if (creatinine < bands[2]) return 2;
  if (creatinine < bands[3]) return 3;
  return 4;
};

const respiratoryScore = (
  mode: "pf" | "sf",
  ratio: number,
  support: boolean
): number => {
  if (mode === "pf") {
    if (ratio >= 400) return 0;
    if (ratio >= 300) return 1;
    if (ratio >= 200) return 2;
    if (!support) return 2;
    return ratio >= 100 ? 3 : 4;
  }
  if (ratio >= 292) return 0;
  if (ratio >= 264) return 1;
  if (ratio >= 221) return 2;
  if (!support) return 2;
  return ratio >= 148 ? 3 : 4;
};

export const psofaCalculator: CalculatorDefinition = {
  toolId: "psofa",
  calculate: (input): CalculationResult => {
    const tool = getTool("psofa");
    const ageMonths = getNumber(input, "age_months");
    const mode = input.oxygenation_mode;
    const ratio = getNumber(input, "oxygenation_ratio");
    const support = getBoolean(input, "respiratory_support");
    const platelets = getNumber(input, "platelets_10e3_ul");
    const bilirubin = getNumber(input, "bilirubin_mg_dl");
    const map = getNumber(input, "map_mmhg");
    const vaso = input.vasoactive_level;
    const gcs = getNumber(input, "gcs");
    const creatinine = getNumber(input, "creatinine_mg_dl");

    if (
      ageMonths === null || (mode !== "pf" && mode !== "sf") || ratio === null ||
      support === null || platelets === null || bilirubin === null || map === null ||
      typeof vaso !== "string" || gcs === null || creatinine === null
    ) {
      return { toolId: tool.id, warnings:[warning(
        "missing_psofa_inputs",
        "Completa las seis funciones orgánicas necesarias para pSOFA.",
        "Complete the six organ-system inputs required for pSOFA."
      )], trace:[] };
    }
    if (
      ageMonths < 0 || ratio < 0 || platelets < 0 || bilirubin < 0 ||
      map < 0 || gcs < 3 || gcs > 15 || creatinine < 0
    ) {
      return { toolId: tool.id, warnings:[warning(
        "invalid_psofa_inputs",
        "Revisa edad, unidades y valores fisiológicos antes de calcular pSOFA.",
        "Review age, units, and physiologic values before calculating pSOFA."
      )], trace:[] };
    }

    const respiratory = respiratoryScore(mode, ratio, support);
    const coagulation = platelets >= 150 ? 0 : platelets >= 100 ? 1 : platelets >= 50 ? 2 : platelets >= 20 ? 3 : 4;
    const hepatic = bilirubin < 1.2 ? 0 : bilirubin < 2 ? 1 : bilirubin < 6 ? 2 : bilirubin < 12 ? 3 : 4;
    const mapScore = map < mapThreshold(ageMonths) ? 1 : 0;
    const vasoScore = vaso === "high" ? 4 : vaso === "moderate" ? 3 : vaso === "low" ? 2 : 0;
    const cardiovascular = Math.max(mapScore, vasoScore);
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
          "psofa_current_context",
          "PedsCore muestra pSOFA como score histórico de disfunción orgánica/pronóstico. Para definiciones actuales de sepsis pediátrica, consultar criterios contemporáneos como Phoenix cuando sean aplicables.",
          "PedsCore presents pSOFA as a historical organ-dysfunction/prognostic score. For current pediatric sepsis definitions, use contemporary criteria such as Phoenix when applicable."
        )
      ],
      trace: [
        { inputId:"respiratory", value:{ mode, ratio, support }, score:respiratory },
        { inputId:"platelets_10e3_ul", value:platelets, score:coagulation },
        { inputId:"bilirubin_mg_dl", value:bilirubin, score:hepatic },
        { inputId:"cardiovascular", value:{ map, vaso }, score:cardiovascular },
        { inputId:"gcs", value:gcs, score:neurologic },
        { inputId:"creatinine_mg_dl", value:creatinine, score:renal }
      ]
    };
  }
};
