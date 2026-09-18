import type { CalculationResult } from "../types.js";
import { getBoolean, getNumber, getTool, label, warning } from "./common.js";
import type { CalculatorDefinition } from "./common.js";

const mapScore=(ageMonths:number,map:number):number=>{
  const [one,two] =
    ageMonths < 1 ? [30,17] :
    ageMonths < 12 ? [38,25] :
    ageMonths < 24 ? [43,31] :
    ageMonths < 60 ? [44,32] :
    ageMonths < 144 ? [48,36] :
    [51,38];
  if(map>one) return 0;
  if(map>=two) return 1;
  return 2;
};

export const phoenixSepsisCalculator: CalculatorDefinition = {
  toolId:"phoenix_sepsis",
  calculate:(input):CalculationResult=>{
    const tool=getTool("phoenix-sepsis");
    const ageMonths=getNumber(input,"age_months");
    const suspectedInfection=getBoolean(input,"suspected_infection");
    const fio2=getNumber(input,"fio2_fraction");
    const pao2=getNumber(input,"pao2_mmhg");
    const spo2=getNumber(input,"spo2_percent");
    const anySupport=getBoolean(input,"any_respiratory_support");
    const imv=getBoolean(input,"invasive_mechanical_ventilation");
    const vasoactiveCount=getNumber(input,"vasoactive_count");
    const lactate=getNumber(input,"lactate_mmol_l");
    const map=getNumber(input,"map_mmhg");
    const platelets=getNumber(input,"platelets_10e3_ul");
    const inr=getNumber(input,"inr");
    const dDimer=getNumber(input,"d_dimer_mg_l_feu");
    const fibrinogen=getNumber(input,"fibrinogen_mg_dl");
    const gcs=getNumber(input,"gcs");
    const pupilsFixed=getBoolean(input,"both_pupils_fixed");

    if(
      ageMonths===null || suspectedInfection===null || fio2===null ||
      anySupport===null || imv===null || vasoactiveCount===null ||
      lactate===null || map===null || platelets===null || inr===null ||
      dDimer===null || fibrinogen===null || gcs===null || pupilsFixed===null
    ){
      return {toolId:tool.id,warnings:[warning(
        "missing_phoenix_inputs",
        "Faltan variables necesarias para calcular el Phoenix Sepsis Score.",
        "Required variables are missing for the Phoenix Sepsis Score."
      )],trace:[]};
    }
    if(
      ageMonths<0 || ageMonths>=216 || fio2<=0 || fio2>1 ||
      (pao2===null && spo2===null) ||
      (pao2!==null && pao2<=0) || (spo2!==null && (spo2<=0||spo2>100)) ||
      vasoactiveCount<0 || lactate<0 || map<0 || platelets<0 || inr<0 ||
      dDimer<0 || fibrinogen<0 || gcs<3 || gcs>15
    ){
      return {toolId:tool.id,warnings:[warning(
        "invalid_phoenix_inputs",
        "Revisa edad, unidades y valores fisiológicos; Phoenix se aplica a pacientes pediátricos menores de 18 años.",
        "Review age, units, and physiologic values; Phoenix applies to pediatric patients under 18 years."
      )],trace:[]};
    }

    const pf=pao2===null?null:pao2/fio2;
    const sf=spo2===null?null:spo2/fio2;
    let respiratory=0;
    if(imv && ((pf!==null&&pf<100)||(sf!==null&&sf<148))) respiratory=3;
    else if(imv && ((pf!==null&&pf>=100&&pf<=200)||(sf!==null&&sf>=148&&sf<=220))) respiratory=2;
    else if(anySupport && ((pf!==null&&pf<400)||(sf!==null&&sf<292))) respiratory=1;

    const vaso=vasoactiveCount>=2?2:vasoactiveCount>=1?1:0;
    const lact=lactate>=11?2:lactate>=5?1:0;
    const mapPts=mapScore(ageMonths,map);
    const cardiovascular=vaso+lact+mapPts;

    const coagAbnormal=[
      platelets<100,
      inr>1.3,
      dDimer>2,
      fibrinogen<100
    ].filter(Boolean).length;
    const coagulation=Math.min(2,coagAbnormal);

    const neurologic=pupilsFixed?2:gcs<=10?1:0;
    const score=respiratory+cardiovascular+coagulation+neurologic;
    const sepsis=suspectedInfection && score>=2;
    const shock=sepsis && cardiovascular>=1;

    return {
      toolId:tool.id,
      score,
      maxScore:13,
      classification:
        shock ? label("Cumple criterios Phoenix de shock séptico","Meets Phoenix septic shock criteria") :
        sepsis ? label("Cumple criterios Phoenix de sepsis","Meets Phoenix sepsis criteria") :
        suspectedInfection ? label("No cumple el umbral Phoenix de sepsis","Does not meet the Phoenix sepsis threshold") :
        label("Phoenix Score calculado; sin infección sospechada no define sepsis","Phoenix Score calculated; without suspected infection it does not define sepsis"),
      warnings:[
        warning(
          "phoenix_not_screening",
          "Phoenix cuantifica disfunción orgánica y define criterios de sepsis/shock en infección sospechada o confirmada; no es una herramienta de cribado precoz.",
          "Phoenix quantifies organ dysfunction and defines sepsis/shock criteria in suspected or confirmed infection; it is not an early screening tool."
        ),
        warning(
          "phoenix_first_24h",
          "Los criterios se desarrollaron para identificar sepsis durante las primeras 24 horas del encuentro hospitalario.",
          "The criteria were developed to identify sepsis during the first 24 hours of the hospital encounter."
        )
      ],
      trace:[
        {inputId:"respiratory_subscore",value:respiratory},
        {inputId:"pao2_fio2",value:pf===null?null:Number(pf.toFixed(1))},
        {inputId:"spo2_fio2",value:sf===null?null:Number(sf.toFixed(1))},
        {inputId:"cardiovascular_subscore",value:cardiovascular},
        {inputId:"vasoactive_points",value:vaso},
        {inputId:"lactate_points",value:lact},
        {inputId:"map_points",value:mapPts},
        {inputId:"coagulation_subscore",value:coagulation},
        {inputId:"neurologic_subscore",value:neurologic},
        {inputId:"suspected_infection",value:suspectedInfection},
        {inputId:"phoenix_score",value:score}
      ]
    };
  }
};
