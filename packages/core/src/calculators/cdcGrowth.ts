import type { CalculationResult } from "../types.js";
import { getNumber, getTool, label, warning } from "./common.js";
import type { CalculatorDefinition } from "./common.js";
import {
  cdcBmiLms,
  cdcStatureLms,
  cdcWeightLms,
  type CdcLmsRow
} from "../data/cdcGrowthLms.js";

type SexCode = 1 | 2;
type Lms = { L:number; M:number; S:number };

const normalCdf = (z:number): number => {
  const sign = z < 0 ? -1 : 1;
  const x = Math.abs(z) / Math.sqrt(2);
  const t = 1 / (1 + 0.3275911 * x);
  const a1=0.254829592, a2=-0.284496736, a3=1.421413741, a4=-1.453152027, a5=1.061405429;
  const erf = 1 - (((((a5*t+a4)*t)+a3)*t+a2)*t+a1)*t*Math.exp(-x*x);
  return 0.5 * (1 + sign * erf);
};

const lmsZ = (x:number,{L,M,S}:Lms): number =>
  Math.abs(L) < 1e-12 ? Math.log(x/M)/S : (Math.pow(x/M,L)-1)/(L*S);

const interpolateLms = (rows:CdcLmsRow[], sex:SexCode, ageMonths:number): Lms | null => {
  const subset = rows.filter((r)=>r[0]===sex);
  if (!subset.length || ageMonths < subset[0]![1] || ageMonths > subset[subset.length-1]![1]) return null;
  let lo=subset[0]!, hi=subset[subset.length-1]!;
  for (let i=0;i<subset.length;i++) {
    const row=subset[i]!;
    if (row[1]===ageMonths) { lo=row; hi=row; break; }
    if (row[1] < ageMonths) lo=row;
    if (row[1] > ageMonths) { hi=row; break; }
  }
  if (lo[1]===hi[1]) return {L:lo[2],M:lo[3],S:lo[4]};
  const t=(ageMonths-lo[1])/(hi[1]-lo[1]);
  return {
    L:lo[2]+(hi[2]-lo[2])*t,
    M:lo[3]+(hi[3]-lo[3])*t,
    S:lo[4]+(hi[4]-lo[4])*t
  };
};

const pct = (z:number): number => Number((normalCdf(z)*100).toFixed(1));
const zr = (z:number): number => Number(z.toFixed(2));

export const cdcGrowthPercentilesCalculator: CalculatorDefinition = {
  toolId:"cdc_growth_percentiles",
  calculate:(input):CalculationResult=>{
    const tool=getTool("cdc-growth-percentiles");
    const ageMonths=getNumber(input,"age_months");
    const weightKg=getNumber(input,"weight_kg");
    const statureCm=getNumber(input,"stature_cm");
    const sexRaw=input.sex;

    if (ageMonths===null || weightKg===null || statureCm===null || (sexRaw!=="male" && sexRaw!=="female")) {
      return {toolId:tool.id,warnings:[warning(
        "missing_cdc_inputs",
        "Introduce sexo, edad, peso y talla para calcular percentiles CDC.",
        "Enter sex, age, weight, and stature to calculate CDC percentiles."
      )],trace:[]};
    }
    if (ageMonths<24 || ageMonths>240 || weightKg<=0 || statureCm<=0) {
      return {toolId:tool.id,warnings:[warning(
        "cdc_scope",
        "Las curvas CDC 2000 de peso, talla e IMC de esta herramienta se aplican de 2 a 20 años.",
        "The CDC 2000 weight, stature, and BMI curves in this tool apply from 2 to 20 years."
      )],trace:[]};
    }

    const sex:SexCode=sexRaw==="male"?1:2;
    const wLms=interpolateLms(cdcWeightLms,sex,ageMonths);
    const hLms=interpolateLms(cdcStatureLms,sex,ageMonths);
    const bLms=interpolateLms(cdcBmiLms,sex,ageMonths);
    if(!wLms||!hLms||!bLms){
      return {toolId:tool.id,warnings:[warning(
        "cdc_reference_missing",
        "No se pudo resolver el punto LMS oficial para esta edad.",
        "The official LMS reference point could not be resolved for this age."
      )],trace:[]};
    }

    const bmi=weightKg/Math.pow(statureCm/100,2);
    const wz=lmsZ(weightKg,wLms), hz=lmsZ(statureCm,hLms), bz=lmsZ(bmi,bLms);
    const wp=pct(wz), hp=pct(hz), bp=pct(bz);

    const bmiClass =
      bp < 5 ? label("Bajo peso por IMC/edad (<P5)","Underweight by BMI-for-age (<P5)") :
      bp < 85 ? label("IMC/edad entre P5 y <P85","BMI-for-age P5 to <P85") :
      bp < 95 ? label("Sobrepeso por IMC/edad (P85 a <P95)","Overweight by BMI-for-age (P85 to <P95)") :
      label("Obesidad por IMC/edad (≥P95)","Obesity by BMI-for-age (≥P95)");

    return {
      toolId:tool.id,
      value:bp,
      unit:"percentil",
      label:label("Percentil CDC de IMC para la edad","CDC BMI-for-age percentile"),
      classification:bmiClass,
      criteriaMatched:[
        label(`Peso/edad: P${wp} (z ${zr(wz)})`,`Weight-for-age: P${wp} (z ${zr(wz)})`),
        label(`Talla/edad: P${hp} (z ${zr(hz)})`,`Stature-for-age: P${hp} (z ${zr(hz)})`),
        label(`IMC/edad: P${bp} (z ${zr(bz)}), IMC ${bmi.toFixed(1)} kg/m²`,`BMI-for-age: P${bp} (z ${zr(bz)}), BMI ${bmi.toFixed(1)} kg/m²`)
      ],
      warnings:[
        warning(
          "cdc_reference_context",
          "Referencia CDC 2000 para población pediátrica de EE. UU.; no debe usarse como único criterio diagnóstico.",
          "CDC 2000 U.S. pediatric reference; growth charts should not be used as the sole diagnostic criterion."
        ),
        ...(bp>=95?[warning(
          "cdc_extended_bmi",
          "Para IMC ≥P95, CDC recomienda las curvas BMI-for-age extendidas para cuantificar mejor valores muy altos.",
          "For BMI ≥P95, CDC recommends the Extended BMI-for-age charts for better quantification of very high BMI."
        )]:[])
      ],
      trace:[
        {inputId:"age_months",value:ageMonths},
        {inputId:"sex",value:sexRaw},
        {inputId:"weight_kg",value:weightKg},
        {inputId:"stature_cm",value:statureCm},
        {inputId:"weight_z",value:zr(wz)},
        {inputId:"weight_percentile",value:wp},
        {inputId:"stature_z",value:zr(hz)},
        {inputId:"stature_percentile",value:hp},
        {inputId:"bmi",value:Number(bmi.toFixed(2))},
        {inputId:"bmi_z",value:zr(bz)},
        {inputId:"bmi_percentile",value:bp}
      ]
    };
  }
};
