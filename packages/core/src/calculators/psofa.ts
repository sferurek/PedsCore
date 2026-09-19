import type { CalculationResult } from "../types.js";
import { getBoolean, getNumber, getTool, label, warning } from "./common.js";
import type { CalculatorDefinition } from "./common.js";

const contextWarning = warning(
  "psofa_context",
  "pSOFA cuantifica disfunción orgánica en pacientes pediátricos críticos. No sustituye la valoración clínica ni determina por sí sola tratamiento o pronóstico individual.",
  "pSOFA quantifies organ dysfunction in critically ill pediatric patients. It does not replace clinical assessment or by itself determine treatment or individual prognosis."
);

const mapThreshold = (ageMonths: number): number =>
  ageMonths < 1 ? 46 :
  ageMonths < 12 ? 55 :
  ageMonths < 24 ? 60 :
  ageMonths < 60 ? 62 :
  ageMonths < 144 ? 65 :
  ageMonths <= 216 ? 67 : 70;

const creatinineScore = (ageMonths: number, cr: number): number => {
  const bands =
    ageMonths < 1 ? [0.8,1.0,1.2,1.6] :
    ageMonths < 12 ? [0.3,0.5,0.8,1.2] :
    ageMonths < 24 ? [0.4,0.6,1.1,1.5] :
    ageMonths < 60 ? [0.6,0.9,1.6,2.3] :
    ageMonths < 144 ? [0.7,1.1,1.8,2.6] :
    ageMonths <= 216 ? [1.0,1.7,2.9,4.2] :
    [1.2,2.0,3.5,5.0];
  return cr >= bands[3]! ? 4 : cr >= bands[2]! ? 3 : cr >= bands[1]! ? 2 : cr >= bands[0]! ? 1 : 0;
};

export const psofaCalculator: CalculatorDefinition = {
  toolId:"psofa",
  calculate:(input):CalculationResult=>{
    const tool=getTool("psofa");
    const ageMonths=getNumber(input,"age_months");
    const pf=getNumber(input,"pao2_fio2_ratio");
    const sf=getNumber(input,"spo2_fio2_ratio");
    const support=getBoolean(input,"respiratory_support");
    const platelets=getNumber(input,"platelets_10e3_ul");
    const bilirubin=getNumber(input,"bilirubin_mg_dl");
    const map=getNumber(input,"map_mmhg");
    const dopamine=getNumber(input,"dopamine_mcg_kg_min");
    const dobutamine=getBoolean(input,"dobutamine_any_dose");
    const epinephrine=getNumber(input,"epinephrine_mcg_kg_min");
    const norepinephrine=getNumber(input,"norepinephrine_mcg_kg_min");
    const gcs=getNumber(input,"gcs");
    const creatinine=getNumber(input,"creatinine_mg_dl");

    if(ageMonths===null || support===null || platelets===null || bilirubin===null || map===null ||
      dopamine===null || dobutamine===null || epinephrine===null || norepinephrine===null ||
      gcs===null || creatinine===null || (pf===null && sf===null)){
      return {toolId:tool.id,warnings:[warning("missing_psofa_inputs","Faltan variables necesarias para calcular pSOFA.","Required variables for pSOFA are missing.")],trace:[]};
    }
    if(ageMonths<0 || platelets<0 || bilirubin<0 || map<0 || dopamine<0 || epinephrine<0 || norepinephrine<0 ||
      gcs<3 || gcs>15 || creatinine<0 || (pf!==null && pf<0) || (sf!==null && sf<0)){
      return {toolId:tool.id,warnings:[warning("invalid_psofa_inputs","Revisa unidades y valores antes de calcular pSOFA.","Review units and values before calculating pSOFA.")],trace:[]};
    }

    const oxygenRatio = pf ?? sf as number;
    const usingPf = pf !== null;
    const respiratory = usingPf
      ? support && oxygenRatio < 100 ? 4 : support && oxygenRatio < 200 ? 3 : oxygenRatio < 300 ? 2 : oxygenRatio < 400 ? 1 : 0
      : support && oxygenRatio < 148 ? 4 : support && oxygenRatio < 221 ? 3 : oxygenRatio < 264 ? 2 : oxygenRatio < 292 ? 1 : 0;

    const coagulation = platelets < 20 ? 4 : platelets < 50 ? 3 : platelets < 100 ? 2 : platelets < 150 ? 1 : 0;
    const hepatic = bilirubin >= 12 ? 4 : bilirubin >= 6 ? 3 : bilirubin >= 2 ? 2 : bilirubin >= 1.2 ? 1 : 0;
    const mapScore = map < mapThreshold(ageMonths) ? 1 : 0;
    const vasoactive =
      dopamine > 15 || epinephrine > 0.1 || norepinephrine > 0.1 ? 4 :
      dopamine > 5 || epinephrine > 0 || norepinephrine > 0 ? 3 :
      dopamine > 0 || dobutamine ? 2 : 0;
    const cardiovascular=Math.max(mapScore,vasoactive);
    const neurologic = gcs < 6 ? 4 : gcs <= 9 ? 3 : gcs <= 12 ? 2 : gcs <= 14 ? 1 : 0;
    const renal=creatinineScore(ageMonths,creatinine);
    const score=respiratory+coagulation+hepatic+cardiovascular+neurologic+renal;

    return {
      toolId:tool.id,
      score,
      maxScore:24,
      classification:label(`pSOFA ${score}/24`,`pSOFA ${score}/24`),
      warnings:[contextWarning],
      trace:[
        {inputId:usingPf?"pao2_fio2_ratio":"spo2_fio2_ratio",value:oxygenRatio,score:respiratory},
        {inputId:"platelets_10e3_ul",value:platelets,score:coagulation},
        {inputId:"bilirubin_mg_dl",value:bilirubin,score:hepatic},
        {inputId:"cardiovascular",value:{map,dopamine,dobutamine,epinephrine,norepinephrine},score:cardiovascular},
        {inputId:"gcs",value:gcs,score:neurologic},
        {inputId:"creatinine_mg_dl",value:creatinine,score:renal}
      ]
    };
  }
};
