import type { CalculationResult } from "../types.js";
import { getBoolean, getNumber, getNumericScore, getTool, label, warning } from "./common.js";
import type { CalculatorDefinition } from "./common.js";

export const yaleObservationScaleCalculator: CalculatorDefinition = {
  toolId:"yos",
  calculate:(input):CalculationResult=>{
    const tool=getTool("yale-observation-scale");
    const ageMonths=getNumber(input,"age_months");
    const febrileIllness=getBoolean(input,"febrile_illness");

    if(ageMonths===null || febrileIllness===null) {
      return {toolId:tool.id,warnings:[warning(
        "missing_yos_eligibility",
        "Introduce la edad y confirma que se trata de una enfermedad febril.",
        "Enter age and confirm that this is a febrile illness."
      )],trace:[]};
    }

    if(ageMonths<3 || ageMonths>24 || !febrileIllness) {
      return {
        toolId:tool.id,
        classification:label(
          "Fuera de la población clínica principal seleccionada para YOS",
          "Outside the selected primary clinical population for YOS"
        ),
        warnings:[warning(
          "yos_population_scope",
          "PedsCore limita el uso operativo principal de YOS a niños de 3-24 meses con enfermedad febril. La escala ha mostrado un rendimiento insuficiente para descartar infección bacteriana grave en lactantes más pequeños.",
          "PedsCore limits primary operational YOS use to children aged 3-24 months with febrile illness. The scale has shown insufficient performance to rule out serious bacterial infection in younger infants."
        )],
        trace:[
          {inputId:"age_months",value:ageMonths},
          {inputId:"febrile_illness",value:febrileIllness}
        ]
      };
    }

    const ids=["cry","parent_reaction","state_variation","color","hydration","social_response"];
    const vals=ids.map(id=>getNumericScore(tool,input,id));
    if(vals.some(v=>v===null)) return {toolId:tool.id,warnings:[warning("missing_yos","Faltan dominios para completar YOS.","Domains are missing for YOS.")],trace:[]};
    const score=(vals as number[]).reduce((a,b)=>a+b,0);
    return {
      toolId:tool.id,
      score,
      maxScore:30,
      classification:
        score<=10?label("YOS normal (≤10)","Normal YOS (≤10)"):
        score>=16?label("YOS marcadamente alterado (≥16)","Markedly abnormal YOS (≥16)"):
        label("YOS intermedio (11-15)","Intermediate YOS (11-15)"),
      warnings:[
        warning(
          "yos_scope",
          "YOS mide apariencia clínica en niños febriles y complementa la historia y la exploración. No excluye por sí sola enfermedad grave ni infección bacteriana invasiva.",
          "YOS measures clinical appearance in febrile children and complements history and physical examination. It does not by itself exclude serious illness or invasive bacterial infection."
        ),
        warning(
          "yos_infant_limitation",
          "No usar un YOS bajo como criterio de seguridad en lactantes pequeños; estudios en ≤60 días mostraron sensibilidad insuficiente para infección bacteriana grave.",
          "Do not use a low YOS score as a safety criterion in young infants; studies in infants ≤60 days showed insufficient sensitivity for serious bacterial infection."
        )
      ],
      trace:[
        {inputId:"age_months",value:ageMonths},
        {inputId:"febrile_illness",value:febrileIllness},
        ...ids.map((id,i)=>({inputId:id,value:input[id],score:(vals as number[])[i] ?? 0}))
      ]
    };
  }
};
