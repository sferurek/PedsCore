import type { CalculationResult } from "../types.js";
import { getBoolean, getNumber, getTool, label, warning } from "./common.js";
import type { CalculatorDefinition } from "./common.js";

export const parcCalculator: CalculatorDefinition = {
  toolId:"parc",
  calculate:(input):CalculationResult=>{
    const tool=getTool("parc");
    const age=getNumber(input,"age_years");
    const sex=input.sex;
    const duration=input.pain_duration;
    const walk=getBoolean(input,"pain_with_walking");
    const migration=getBoolean(input,"migration_to_rlq");
    const rlq=getBoolean(input,"maximal_rlq_tenderness");
    const guarding=getBoolean(input,"abdominal_guarding");
    const anc=getNumber(input,"anc_10e3_ul");
    if(age===null||typeof sex!=="string"||typeof duration!=="string"||walk===null||migration===null||rlq===null||guarding===null||anc===null){
      return {toolId:tool.id,warnings:[warning("missing_parc","Faltan variables necesarias para calcular pARC.","Required variables for pARC are missing.")],trace:[]};
    }
    if(age<5||age>18||anc<0){
      return {toolId:tool.id,warnings:[warning("parc_scope","pARC fue derivado y validado en pacientes de 5 a 18 años con dolor abdominal <96 h evaluados por posible apendicitis.","pARC was derived and validated in patients aged 5 to 18 years with <96 hours of abdominal pain undergoing evaluation for possible appendicitis.")],trace:[]};
    }
    const male=sex==="male"?1:0;
    let ageSex=0;
    if(age<8){ageSex+=0.38;if(male)ageSex-=1.05;}
    else if((male&&age<14)||(!male&&age<12)) ageSex-=0.72;
    const durationCoef=duration==="24_48"?0.47:duration==="48_96"?0.10:0;
    const ancTerm=anc<14?1.77*Math.sqrt(anc):6.62;
    const logit=-8.7+1.28*male+ageSex+durationCoef+1.05*(walk?1:0)+0.46*(migration?1:0)+1.14*(rlq?1:0)+0.67*(guarding?1:0)+ancTerm;
    const probability=100/(1+Math.exp(-logit));
    return {
      toolId:tool.id,value:Number(probability.toFixed(1)),unit:"%",
      label:label("Riesgo estimado de apendicitis pARC","Estimated pARC appendicitis risk"),
      classification:label(`pARC ${probability.toFixed(1)}%`,`pARC ${probability.toFixed(1)}%`),
      warnings:[warning("parc_not_management","pARC estima probabilidad; no constituye por sí solo una indicación de imagen, cirugía, alta o ingreso.","pARC estimates probability; it is not by itself an imaging, surgery, discharge, or admission order.")],
      trace:[{inputId:"logit",value:Number(logit.toFixed(4))},{inputId:"anc_term",value:Number(ancTerm.toFixed(4))}]
    };
  }
};
