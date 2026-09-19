import type { CalculationResult } from "../types.js";
import { getBoolean, getNumber, getNumericScore, getTool, label, warning } from "./common.js";
import type { CalculatorDefinition } from "./common.js";

const contextWarning = warning(
  "clinical_context_required",
  "Herramienta de apoyo clínico. Aplicar únicamente en la población y contexto validados; no sustituye la valoración clínica.",
  "Clinical-support tool. Apply only in the validated population and setting; it does not replace clinical assessment."
);

export const rdaiCalculator: CalculatorDefinition = {
  toolId: "rdai",
  calculate: (input): CalculationResult => {
    const tool = getTool("rdai");
    const ids = ["wheeze_expiration","wheeze_inspiration","wheeze_location","retraction_supraclavicular","retraction_intercostal","retraction_subcostal"] as const;
    const values = ids.map((id)=>getNumericScore(tool,input,id));
    if(values.some((v)=>v===null)){
      return {toolId:tool.id,warnings:[warning("missing_rdai_inputs","Faltan dominios para completar RDAI.","RDAI domains are missing.")],trace:[]};
    }
    const score=(values as number[]).reduce((a,b)=>a+b,0);
    return {
      toolId:tool.id,
      score,
      maxScore:17,
      classification:label(`RDAI ${score}/17`,`RDAI ${score}/17`),
      warnings:[
        contextWarning,
        warning(
          "rdai_no_universal_bands",
          "RDAI cuantifica sibilancias y retracciones. PedsCore no impone bandas terapéuticas universales.",
          "RDAI quantifies wheezing and retractions. PedsCore does not impose universal treatment bands."
        )
      ],
      trace:ids.map((inputId,i)=>({inputId,value:input[inputId],score:(values as number[])[i] ?? 0}))
    };
  }
};

export const snappeIiCalculator: CalculatorDefinition = {
  toolId:"snappii",
  calculate:(input):CalculationResult=>{
    const tool=getTool("snappe-ii");
    const map=getNumber(input,"mean_bp_mmhg");
    const temp=getNumber(input,"lowest_temp_c");
    const pf=getNumber(input,"pao2_fio2_ratio");
    const ph=getNumber(input,"lowest_ph");
    const multipleSeizures=getBoolean(input,"multiple_seizures");
    const urine=getNumber(input,"urine_output_ml_kg_h");
    const apgar=getNumber(input,"apgar_5min");
    const birthWeight=getNumber(input,"birth_weight_g");
    const sga=getBoolean(input,"sga_below_3rd_percentile");
    if([map,temp,pf,ph,urine,apgar,birthWeight].some(v=>v===null)||multipleSeizures===null||sga===null){
      return {toolId:tool.id,warnings:[warning("missing_snappe2_inputs","Faltan variables para completar SNAPPE-II.","SNAPPE-II variables are missing.")],trace:[]};
    }
    if((map as number)<0||(pf as number)<0||(ph as number)<=0||(urine as number)<0||(apgar as number)<0||(apgar as number)>10||(birthWeight as number)<=0){
      return {toolId:tool.id,warnings:[warning("invalid_snappe2_inputs","Revisa unidades y valores antes de calcular SNAPPE-II.","Review units and values before calculating SNAPPE-II.")],trace:[]};
    }
    const mapScore=(map as number)<20?19:(map as number)<30?9:0;
    const tempScore=(temp as number)<35?15:(temp as number)<=35.6?8:0;
    const pfScore=(pf as number)<0.3?28:(pf as number)<1?16:(pf as number)<2.5?5:0;
    const phScore=(ph as number)<7.1?16:(ph as number)<7.2?7:0;
    const seizureScore=multipleSeizures?19:0;
    const urineScore=(urine as number)<0.1?18:(urine as number)<1?5:0;
    const apgarScore=(apgar as number)<7?18:0;
    const weightScore=(birthWeight as number)<750?17:(birthWeight as number)<1000?10:0;
    const sgaScore=sga?12:0;
    const score=mapScore+tempScore+pfScore+phScore+seizureScore+urineScore+apgarScore+weightScore+sgaScore;
    return {
      toolId:tool.id,
      score,
      maxScore:162,
      classification:label(`SNAPPE-II ${score}`,`SNAPPE-II ${score}`),
      warnings:[
        contextWarning,
        warning(
          "snappe2_population_level",
          "SNAPPE-II es un score de gravedad/riesgo neonatal poblacional. No debe interpretarse como una probabilidad individual ni usarse aisladamente para limitar soporte.",
          "SNAPPE-II is a population-level neonatal severity/risk score. It must not be interpreted as an individual probability or used alone to limit support."
        ),
        warning(
          "snappe2_first_12h",
          "Utiliza los peores valores de las primeras 12 horas según la definición publicada.",
          "Use the worst values from the first 12 hours according to the published definition."
        )
      ],
      trace:[
        {inputId:"mean_bp_mmhg",value:map,score:mapScore},
        {inputId:"lowest_temp_c",value:temp,score:tempScore},
        {inputId:"pao2_fio2_ratio",value:pf,score:pfScore},
        {inputId:"lowest_ph",value:ph,score:phScore},
        {inputId:"multiple_seizures",value:multipleSeizures,score:seizureScore},
        {inputId:"urine_output_ml_kg_h",value:urine,score:urineScore},
        {inputId:"apgar_5min",value:apgar,score:apgarScore},
        {inputId:"birth_weight_g",value:birthWeight,score:weightScore},
        {inputId:"sga_below_3rd_percentile",value:sga,score:sgaScore}
      ]
    };
  }
};
