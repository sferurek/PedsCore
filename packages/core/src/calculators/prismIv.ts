import type { CalculationResult } from "../types.js";
import { getBoolean, getNumber, getTool, label, warning } from "./common.js";
import type { CalculatorDefinition } from "./common.js";

export const prismIvCalculator: CalculatorDefinition = {
  toolId: "prism_iv",
  calculate: (input): CalculationResult => {
    const tool = getTool("prism-iv");
    const ageDays = getNumber(input, "age_days");
    const sourceValue = input["admission_source"];
    const source = typeof sourceValue === "string" ? sourceValue : null;
    const cpr = getBoolean(input, "cpr_within_24h");
    const cancer = getBoolean(input, "cancer");
    const lowRisk = getBoolean(input, "low_risk_primary_system");
    const neuro = getNumber(input, "prism_neurologic_subscore");
    const nonNeuro = getNumber(input, "prism_non_neurologic_subscore");

    if (ageDays === null || source === null || cpr === null || cancer === null || lowRisk === null || neuro === null || nonNeuro === null) {
      return { toolId: tool.id, warnings: [warning("missing_prism_iv_inputs", "Faltan variables para calcular PRISM IV.", "Variables are missing for PRISM IV.")], trace: [] };
    }
    if (ageDays < 0 || neuro < 0 || nonNeuro < 0 || !["or_pacu","other_hospital","inpatient_unit","emergency_department"].includes(source)) {
      return { toolId: tool.id, warnings: [warning("invalid_prism_iv_inputs", "Revisa edad, origen de ingreso y subscores PRISM.", "Review age, admission source, and PRISM subscores.")], trace: [] };
    }

    const ageCoefficient = ageDays < 14 ? 1.311 : ageDays < 30.4375 ? 0.968 : ageDays < 365.25 ? 0.357 : 0;
    const sourceCoefficient = source === "other_hospital" ? 1.012 : source === "inpatient_unit" ? 1.626 : source === "emergency_department" ? 0.693 : 0;
    const logit = -5.776 + ageCoefficient + sourceCoefficient + (cpr ? 1.082 : 0) + (cancer ? 0.766 : 0) + (lowRisk ? -1.697 : 0) + 0.197 * neuro + 0.163 * nonNeuro;
    const probability = 1 / (1 + Math.exp(-logit));

    return {
      toolId: tool.id,
      score: probability * 100,
      classification: label(`Mortalidad hospitalaria estimada ${(probability * 100).toFixed(2)}%`, `Estimated hospital mortality ${(probability * 100).toFixed(2)}%`),
      warnings: [warning("prism_iv_context","PRISM IV es una herramienta de ajuste de riesgo, benchmarking e investigación en UCIP; no está diseñada para decisiones diagnósticas o terapéuticas individuales. Los subscores fisiológicos deben obtenerse con la metodología PRISM en la ventana temporal especificada.","PRISM IV is a PICU risk-adjustment, benchmarking, and research tool; it is not intended for individual diagnostic or therapeutic decisions. Physiologic subscores must be obtained using PRISM methodology within the specified collection window.")],
      trace: [
        {inputId:"age_days",value:ageDays,score:ageCoefficient},{inputId:"admission_source",value:source,score:sourceCoefficient},
        {inputId:"cpr_within_24h",value:cpr,score:cpr?1.082:0},{inputId:"cancer",value:cancer,score:cancer?0.766:0},
        {inputId:"low_risk_primary_system",value:lowRisk,score:lowRisk?-1.697:0},{inputId:"prism_neurologic_subscore",value:neuro,score:0.197*neuro},
        {inputId:"prism_non_neurologic_subscore",value:nonNeuro,score:0.163*nonNeuro},{inputId:"logit",value:logit}
      ]
    };
  }
};
