import type { CalculationResult } from "../types.js";
import { getNumber, getNumericScore, getTool, label, warning } from "./common.js";
import type { CalculatorDefinition } from "./common.js";

const ibdWarning = warning(
  "ibd_activity_context",
  "Índice de actividad clínica. Debe interpretarse junto con la evolución, biomarcadores y valoración especializada; no sustituye decisiones terapéuticas.",
  "Clinical disease-activity index. Interpret with longitudinal course, biomarkers, and specialist assessment; it does not replace treatment decisions."
);

export const wpcdaiCalculator: CalculatorDefinition = {
  toolId:"wpcdai",
  calculate:(input):CalculationResult=>{
    const tool=getTool("wpcdai");
    const pain=getNumericScore(tool,input,"abdominal_pain");
    const wellbeing=getNumericScore(tool,input,"wellbeing");
    const stools=getNumericScore(tool,input,"stools");
    const weight=getNumericScore(tool,input,"weight_change");
    const perirectal=getNumericScore(tool,input,"perirectal_disease");
    const eim=getNumericScore(tool,input,"extraintestinal_manifestations");
    const esr=getNumber(input,"esr_mm_h");
    const albumin=getNumber(input,"albumin_g_dl");
    if([pain,wellbeing,stools,weight,perirectal,eim].some(v=>v===null)||esr===null||albumin===null){
      return {toolId:tool.id,warnings:[warning("missing_wpcdai","Faltan componentes para calcular wPCDAI.","Components are missing for wPCDAI.")],trace:[]};
    }
    const esrPts=esr<20?0:esr<=50?7.5:15;
    const albuminPts=albumin>=3.5?0:albumin>=3.1?10:20;
    const score=(pain??0)+(wellbeing??0)+(stools??0)+(weight??0)+(perirectal??0)+(eim??0)+esrPts+albuminPts;
    return {
      toolId:tool.id,score,maxScore:125,
      classification:
        score<12.5?label("Remisión","Remission"):
        score<=40?label("Actividad leve","Mild activity"):
        score<=57.5?label("Actividad moderada","Moderate activity"):
        label("Actividad grave","Severe activity"),
      warnings:[ibdWarning],
      trace:[
        {inputId:"abdominal_pain",value:input.abdominal_pain,score:pain??0},
        {inputId:"wellbeing",value:input.wellbeing,score:wellbeing??0},
        {inputId:"stools",value:input.stools,score:stools??0},
        {inputId:"esr_mm_h",value:esr,score:esrPts},
        {inputId:"albumin_g_dl",value:albumin,score:albuminPts},
        {inputId:"weight_change",value:input.weight_change,score:weight??0},
        {inputId:"perirectal_disease",value:input.perirectal_disease,score:perirectal??0},
        {inputId:"extraintestinal_manifestations",value:input.extraintestinal_manifestations,score:eim??0}
      ]
    };
  }
};

export const pucaiCalculator: CalculatorDefinition = {
  toolId:"pucai",
  calculate:(input):CalculationResult=>{
    const tool=getTool("pucai");
    const ids=["abdominal_pain","rectal_bleeding","stool_consistency","stool_frequency","nocturnal_stool","activity_level"];
    const vals=ids.map(id=>getNumericScore(tool,input,id));
    if(vals.some(v=>v===null)) return {toolId:tool.id,warnings:[warning("missing_pucai","Faltan componentes para calcular PUCAI.","Components are missing for PUCAI.")],trace:[]};
    const score=(vals as number[]).reduce((a,b)=>a+b,0);
    return {
      toolId:tool.id,score,maxScore:85,
      classification:
        score<10?label("Remisión","Remission"):
        score<=34?label("Actividad leve","Mild activity"):
        score<=64?label("Actividad moderada","Moderate activity"):
        label("Actividad grave","Severe activity"),
      warnings:[ibdWarning],
      trace:ids.map((id,i)=>({inputId:id,value:input[id],score:(vals as number[])[i] ?? 0}))
    };
  }
};
