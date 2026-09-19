import type { CalculationResult } from "../types.js";
import { getNumericScore, getNumber, getTool, label, warning } from "./common.js";
import type { CalculatorDefinition } from "./common.js";

export const pcdaiCalculator: CalculatorDefinition = {
  toolId:"pcdai",
  calculate:(input):CalculationResult=>{
    const tool=getTool("pcdai");
    const categorical=["abdominal_pain","stools","wellbeing","hematocrit_category","weight","height","abdomen","perirectal","extraintestinal"];
    const vals=categorical.map(id=>getNumericScore(tool,input,id));
    const esr=getNumber(input,"esr_mm_h");
    const albumin=getNumber(input,"albumin_g_dl");
    if(vals.some(v=>v===null)||esr===null||albumin===null){
      return {toolId:tool.id,warnings:[warning("missing_pcdai","Faltan componentes para calcular PCDAI.","Components are missing for PCDAI.")],trace:[]};
    }
    const esrPts=esr<20?0:esr<=50?2.5:5;
    const albuminPts=albumin>=3.5?0:albumin>=3.1?5:10;
    const score=(vals as number[]).reduce((a,b)=>a+b,0)+esrPts+albuminPts;
    return {
      toolId:tool.id,score,maxScore:100,
      classification:label(`PCDAI ${score}/100`,`PCDAI ${score}/100`),
      warnings:[warning("pcdai_bands","El artículo original de 1991 validó el puntaje continuo pero no definió bandas universales de actividad; PedsCore no impone cortes posteriores como si fueran originales.","The 1991 derivation validated the continuous score but did not define universal activity bands; PedsCore does not present later cutoffs as original.")],
      trace:[...categorical.map((id,i)=>({inputId:id,value:input[id],score:(vals as number[])[i] ?? 0})),{inputId:"esr_mm_h",value:esr,score:esrPts},{inputId:"albumin_g_dl",value:albumin,score:albuminPts}]
    };
  }
};
