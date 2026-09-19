import type { CalculationResult } from "../types.js";
import { getNumericScore, getTool, label, warning } from "./common.js";
import type { CalculatorDefinition } from "./common.js";

export const garciaAlixNersCalculator: CalculatorDefinition = {
  toolId:"garcia_alix_ners",
  calculate:(input):CalculationResult=>{
    const tool=getTool("garcia-alix-ne-rs");
    const ids=["alertness","posture","spontaneous_activity","motor_response","myotatic_reflexes","breathing","clinical_seizures","aeeg_seizures","aeeg_background"];
    const vals=ids.map(id=>getNumericScore(tool,input,id));
    if(vals.some(v=>v===null)) return {toolId:tool.id,warnings:[warning("missing_ners","Faltan ítems para completar la NE-RS de García-Alix.","Items are missing to complete the García-Alix NE-RS.")],trace:[]};
    const score=(vals as number[]).reduce((a,b)=>a+b,0);
    return {
      toolId:tool.id,score,maxScore:70,
      classification:score<8?label("Encefalopatía leve por NE-RS","Mild encephalopathy by NE-RS"):score<30?label("Encefalopatía moderada por NE-RS","Moderate encephalopathy by NE-RS"):label("Encefalopatía grave por NE-RS","Severe encephalopathy by NE-RS"),
      warnings:[
        warning("ners_window","La NE-RS fue validada para graduar encefalopatía neonatal dentro de las primeras 6 horas de vida en recién nacidos ≥34 semanas y ≥1800 g.","NE-RS was validated to grade neonatal encephalopathy within the first 6 hours after birth in infants ≥34 weeks and ≥1800 g."),
        warning("ners_context","Los cortes 8 y 30 discriminan leve/moderada y moderada/grave en la cohorte de validación; la escala no sustituye la valoración integral para hipotermia terapéutica.","Cutoffs 8 and 30 separated mild/moderate and moderate/severe disease in the validation cohort; the scale does not replace comprehensive therapeutic-hypothermia assessment.")
      ],
      trace:ids.map((id,i)=>({inputId:id,value:input[id],score:(vals as number[])[i] ?? 0}))
    };
  }
};
