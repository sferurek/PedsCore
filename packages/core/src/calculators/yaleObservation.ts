import type { CalculationResult } from "../types.js";
import { getNumericScore, getTool, label, warning } from "./common.js";
import type { CalculatorDefinition } from "./common.js";

export const yaleObservationScaleCalculator: CalculatorDefinition = {
  toolId:"yos",
  calculate:(input):CalculationResult=>{
    const tool=getTool("yale-observation-scale");
    const ids=["cry","parent_reaction","state_variation","color","hydration","social_response"];
    const vals=ids.map(id=>getNumericScore(tool,input,id));
    if(vals.some(v=>v===null)) return {toolId:tool.id,warnings:[warning("missing_yos","Faltan dominios para completar YOS.","Domains are missing for YOS.")],trace:[]};
    const score=(vals as number[]).reduce((a,b)=>a+b,0);
    return {
      toolId:tool.id,score,maxScore:30,
      classification:
        score<=10?label("YOS normal (≤10)","Normal YOS (≤10)"):
        score>=16?label("YOS marcadamente alterado (≥16)","Markedly abnormal YOS (≥16)"):
        label("YOS intermedio (11-15)","Intermediate YOS (11-15)"),
      warnings:[warning(
        "yos_scope",
        "YOS describe apariencia clínica y no excluye por sí sola infección bacteriana grave; su rendimiento es limitado en lactantes muy pequeños.",
        "YOS describes clinical appearance and does not by itself exclude serious bacterial infection; performance is limited in very young infants."
      )],
      trace:ids.map((id,i)=>({inputId:id,value:input[id],score:(vals as number[])[i]}))
    };
  }
};
