import type { CalculationResult } from "../types.js";
import { getBoolean, getNumber, getTool, label, warning } from "./common.js";
import type { CalculatorDefinition } from "./common.js";

const mapPoints = (age: number, map: number): number => {
  const bands: [number, number, number] = age < 1 ? [46,31,17] : age < 12 ? [55,39,25] : age < 24 ? [60,44,31] : age < 60 ? [62,46,32] : age < 144 ? [65,49,36] : [67,52,38];
  return map >= bands[0] ? 0 : map >= bands[1] ? 2 : map >= bands[2] ? 3 : 6;
};
const creatininePoints = (age: number, cr: number): number => {
  const limit = age < 1 ? 70 : age < 12 ? 23 : age < 24 ? 35 : age < 60 ? 51 : age < 144 ? 59 : 93;
  return cr >= limit ? 2 : 0;
};

export const pelod2Calculator: CalculatorDefinition = {
  toolId: "pelod_2",
  calculate: (input): CalculationResult => {
    const tool = getTool("pelod-2");
    const age = getNumber(input, "age_months"), gcs = getNumber(input, "gcs"), fixed = getBoolean(input, "both_pupils_fixed"),
      lactate = getNumber(input, "lactate_mmol_l"), map = getNumber(input, "map_mmhg"), cr = getNumber(input, "creatinine_umol_l"),
      pf = getNumber(input, "pao2_fio2"), pco2 = getNumber(input, "paco2_mmhg"), imv = getBoolean(input, "invasive_ventilation"),
      wbc = getNumber(input, "wbc_10e9_l"), platelets = getNumber(input, "platelets_10e9_l");
    if ([age,gcs,lactate,map,cr,pf,pco2,wbc,platelets].some(v=>v===null) || fixed===null || imv===null) {
      return {toolId:tool.id,warnings:[warning("missing_pelod2_inputs","Faltan variables para calcular PELOD-2.","Variables are missing for PELOD-2.")],trace:[]};
    }
    const a=age as number, G=gcs as number, L=lactate as number, M=map as number, C=cr as number, PF=pf as number, CO2=pco2 as number, W=wbc as number, P=platelets as number;
    const points = {
      gcs: G>=11?0:G>=5?1:4, pupils: fixed?5:0, lactate:L<5?0:L<11?1:4, map:mapPoints(a,M), creatinine:creatininePoints(a,C),
      pf:PF<=60?2:0, pco2:CO2<=58?0:CO2<=94?1:3, imv:imv?3:0, wbc:W<=2?2:0, platelets:P>=142?0:P>=77?1:2
    };
    const score=Object.values(points).reduce((s,v)=>s+v,0);
    return {toolId:tool.id,score,maxScore:33,classification:label(`PELOD-2 ${score}`,`PELOD-2 ${score}`),warnings:[warning("pelod2_context","PELOD-2 cuantifica disfunción orgánica en UCI pediátrica. Deben utilizarse los valores más anormales del periodo de evaluación según el protocolo; no debe interpretarse como una decisión terapéutica individual.","PELOD-2 quantifies organ dysfunction in the PICU. Use the most abnormal values in the assessment period according to protocol; it is not an individual treatment decision.")],trace:Object.entries(points).map(([inputId,score])=>({inputId,value:input[inputId],score}))};
  }
};
