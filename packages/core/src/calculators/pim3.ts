import type { CalculationResult } from "../types.js";
import { getBoolean, getNumber, getTool, label, warning } from "./common.js";
import type { CalculatorDefinition } from "./common.js";

export const pim3Calculator: CalculatorDefinition = {
  toolId: "pim3",
  calculate: (input): CalculationResult => {
    const tool=getTool("pim3");
    const sbp=getNumber(input,"sbp_mmhg"), be=getNumber(input,"base_excess_mmol_l"), fio2=getNumber(input,"fio2_fraction"), pao2=getNumber(input,"pao2_mmhg");
    const pupils=getBoolean(input,"fixed_dilated_pupils"), mv=getBoolean(input,"mechanical_ventilation_first_hour"), elective=getBoolean(input,"elective_admission");
    const procedure=input["recovery_procedure"], risk=input["diagnostic_risk"];
    if(sbp===null||be===null||fio2===null||pao2===null||pupils===null||mv===null||elective===null||typeof procedure!=="string"||typeof risk!=="string"){
      return {toolId:tool.id,warnings:[warning("missing_pim3_inputs","Faltan variables para calcular PIM3.","Variables are missing for PIM3.")],trace:[]};
    }
    if(sbp<0||fio2<0||fio2>1||pao2<=0||!["none","bypass_cardiac","non_bypass_cardiac","noncardiac"].includes(procedure)||!["none","low","high","very_high"].includes(risk)){
      return {toolId:tool.id,warnings:[warning("invalid_pim3_inputs","Revisa PAS, FiO₂, PaO₂ y categorías PIM3.","Review SBP, FiO2, PaO2, and PIM3 categories.")],trace:[]};
    }
    const proc=procedure==="bypass_cardiac"?-1.2246:procedure==="non_bypass_cardiac"?-0.8762:procedure==="noncardiac"?-1.5164:0;
    const riskCoef=risk==="very_high"?1.6225:risk==="high"?1.0725:risk==="low"?-2.1766:0;
    const oxygen=(fio2*100)/pao2;
    const logit=3.8233*(pupils?1:0)-0.5378*(elective?1:0)+0.9763*(mv?1:0)+0.0671*Math.abs(be)-0.0431*sbp+0.1716*(sbp*sbp/1000)+0.4214*oxygen+proc+riskCoef-1.7928;
    const p=1/(1+Math.exp(-logit));
    return {toolId:tool.id,score:p*100,classification:label(`Mortalidad estimada ${(p*100).toFixed(2)}%`,`Estimated mortality ${(p*100).toFixed(2)}%`),warnings:[warning("pim3_context","PIM3 es un modelo de ajuste de riesgo para UCIP basado en información disponible en el primer contacto/primera hora. Se diseñó para comparar rendimiento de unidades y poblaciones, no para decisiones terapéuticas individuales.","PIM3 is a PICU risk-adjustment model using information available at first contact/within the first hour. It was designed for unit/population benchmarking, not individual treatment decisions.")],trace:[{inputId:"sbp_mmhg",value:sbp},{inputId:"base_excess_mmol_l",value:be},{inputId:"fio2_pao2_term",value:oxygen},{inputId:"fixed_dilated_pupils",value:pupils},{inputId:"mechanical_ventilation_first_hour",value:mv},{inputId:"elective_admission",value:elective},{inputId:"recovery_procedure",value:procedure,score:proc},{inputId:"diagnostic_risk",value:risk,score:riskCoef},{inputId:"logit",value:logit}]};
  }
};
