import type { CalculationResult } from "../types.js";
import { getBoolean, getNumber, getTool, label, warning } from "./common.js";
import type { CalculatorDefinition } from "./common.js";

export const nSofaCalculator: CalculatorDefinition = {
  toolId:"nsofa",
  calculate:(input):CalculationResult=>{
    const tool=getTool("nsofa");
    const intubated=getBoolean(input,"intubated");
    const spo2=getNumber(input,"spo2_percent");
    const fio2=getNumber(input,"fio2_fraction");
    const inotropes=getNumber(input,"inotrope_count");
    const steroids=getBoolean(input,"systemic_steroids");
    const platelets=getNumber(input,"platelets_10e3_ul");
    if(intubated===null||spo2===null||fio2===null||inotropes===null||steroids===null||platelets===null){
      return {toolId:tool.id,warnings:[warning("missing_nsofa","Faltan variables para calcular nSOFA.","Variables are missing for nSOFA.")],trace:[]};
    }
    if(spo2<=0||spo2>100||fio2<=0||fio2>1||inotropes<0||platelets<0){
      return {toolId:tool.id,warnings:[warning("invalid_nsofa","Revisa SpO₂, FiO₂, inotrópicos y plaquetas.","Review SpO₂, FiO₂, inotropes, and platelets.")],trace:[]};
    }
    const sf=spo2/fio2;
    const resp=!intubated||sf>=300?0:sf>=200?2:sf>=150?4:sf>=100?6:8;
    const cv =
      inotropes===0&&!steroids?0:
      inotropes===0&&steroids?1:
      inotropes===1&&!steroids?2:
      inotropes>=2&&steroids?4:3;
    const heme=platelets>=150?0:platelets>=100?1:platelets>=50?2:3;
    const score=resp+cv+heme;
    return {
      toolId:tool.id,score,maxScore:15,classification:label(`nSOFA ${score}/15`,`nSOFA ${score}/15`),
      warnings:[warning(
        "nsofa_context",
        "nSOFA cuantifica disfunción orgánica neonatal, originalmente en el contexto de sepsis tardía y especialmente en prematuros de muy bajo peso. No es una herramienta aislada de diagnóstico de sepsis.",
        "nSOFA quantifies neonatal organ dysfunction, originally in late-onset sepsis and especially very-low-birth-weight preterm infants. It is not a stand-alone sepsis diagnostic tool."
      )],
      trace:[
        {inputId:"spo2_fio2",value:Number(sf.toFixed(1)),score:resp},
        {inputId:"inotrope_count",value:inotropes,score:cv},
        {inputId:"systemic_steroids",value:steroids},
        {inputId:"platelets_10e3_ul",value:platelets,score:heme}
      ]
    };
  }
};
