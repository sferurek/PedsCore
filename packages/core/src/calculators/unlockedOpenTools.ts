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
    const pao2=getNumber(input,"pao2_mmhg");
    const fio2Percent=getNumber(input,"fio2_percent");
    const legacyPf=getNumber(input,"pao2_fio2_ratio");
    const ph=getNumber(input,"lowest_ph");
    const multipleSeizures=getBoolean(input,"multiple_seizures");
    const urine=getNumber(input,"urine_output_ml_kg_h");
    const apgar=getNumber(input,"apgar_5min");
    const birthWeight=getNumber(input,"birth_weight_g");
    const sga=getBoolean(input,"sga_below_3rd_percentile");

    if(apgar===null||birthWeight===null||sga===null){
      return {toolId:tool.id,warnings:[warning(
        "missing_snappe2_perinatal_inputs",
        "Faltan Apgar a los 5 minutos, peso al nacer o estado P<3 para completar SNAPPE-II.",
        "5-minute Apgar, birth weight, or <3rd-percentile status is missing for SNAPPE-II."
      )],trace:[]};
    }

    if(
      (map!==null&&map<0) ||
      (temp!==null&&(temp<20||temp>45)) ||
      (pao2!==null&&pao2<=0) ||
      (fio2Percent!==null&&(fio2Percent<=0||fio2Percent>100)) ||
      (legacyPf!==null&&legacyPf<0) ||
      (ph!==null&&ph<=0) ||
      (urine!==null&&urine<0) ||
      apgar<0||apgar>10||birthWeight<=0
    ){
      return {toolId:tool.id,warnings:[warning(
        "invalid_snappe2_inputs",
        "Revisa unidades y valores antes de calcular SNAPPE-II.",
        "Review units and values before calculating SNAPPE-II."
      )],trace:[]};
    }

    if((pao2===null)!==(fio2Percent===null)){
      return {toolId:tool.id,warnings:[warning(
        "incomplete_snappe2_oxygenation",
        "Para calcular la variable de oxigenación introduce PaO₂ y FiO₂ (%) conjuntamente, o deja ambas sin medir.",
        "To calculate the oxygenation variable, enter PaO₂ and FiO₂ (%) together, or leave both unmeasured."
      )],trace:[]};
    }

    // Original SNAPPE-II convention divides PaO2 (mmHg) by FiO2 entered as percent (21-100),
    // hence published cut-offs 0.3, 1.0 and 2.5 rather than modern P/F values 30, 100 and 250.
    const pf = pao2!==null && fio2Percent!==null ? pao2/fio2Percent : legacyPf;

    const mapScore=map===null?0:map<20?19:map<30?9:0;
    const tempScore=temp===null?0:temp<35?15:temp<=35.6?8:0;
    const pfScore=pf===null?0:pf<0.3?28:pf<1?16:pf<2.5?5:0;
    const phScore=ph===null?0:ph<7.1?16:ph<7.2?7:0;
    const seizureScore=multipleSeizures===true?19:0;
    const urineScore=urine===null?0:urine<0.1?18:urine<1?5:0;
    const apgarScore=apgar<7?18:0;
    const weightScore=birthWeight<750?17:birthWeight<1000?10:0;
    const sgaScore=sga?12:0;
    const score=mapScore+tempScore+pfScore+phScore+seizureScore+urineScore+apgarScore+weightScore+sgaScore;

    const missingPhysiology = [
      map===null ? "mean_bp" : null,
      temp===null ? "temperature" : null,
      pf===null ? "oxygenation" : null,
      ph===null ? "ph" : null,
      multipleSeizures===null ? "seizures" : null,
      urine===null ? "urine_output" : null
    ].filter(Boolean);

    const warnings=[
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
      ),
      warning(
        "snappe2_oxygenation_convention",
        "La oxigenación se calcula como PaO₂ (mmHg) / FiO₂ expresada en porcentaje (21-100), que es la convención publicada de SNAPPE-II.",
        "Oxygenation is calculated as PaO₂ (mmHg) / FiO₂ expressed as percent (21-100), the published SNAPPE-II convention."
      )
    ];
    if(missingPhysiology.length){
      warnings.push(warning(
        "snappe2_unmeasured_zero",
        "Las variables fisiológicas/no analizadas que no se obtuvieron aportan 0 puntos, conforme a la implementación publicada; el resultado debe interpretarse con esa limitación.",
        "Physiologic/unordered variables that were not obtained contribute 0 points, consistent with published implementation; interpret the result with that limitation."
      ));
    }

    return {
      toolId:tool.id,
      score,
      maxScore:162,
      classification:label(`SNAPPE-II ${score}`,`SNAPPE-II ${score}`),
      warnings,
      trace:[
        {inputId:"mean_bp_mmhg",value:map,score:mapScore},
        {inputId:"lowest_temp_c",value:temp,score:tempScore},
        {inputId:"pao2_mmhg",value:pao2},
        {inputId:"fio2_percent",value:fio2Percent},
        {inputId:"snappe2_pao2_fio2_ratio",value:pf===null?null:Number(pf.toFixed(3)),score:pfScore},
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
