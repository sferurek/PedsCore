import { describe, expect, it } from "vitest";
import { prismIvCalculator } from "../src/calculators/prismIv.js";
const base={age_days:400,admission_source:"or_pacu",cpr_within_24h:false,cancer:false,low_risk_primary_system:false,prism_neurologic_subscore:0,prism_non_neurologic_subscore:0};
const expected=(logit:number)=>100/(1+Math.exp(-logit));
describe("PRISM IV",()=>{
 it("reproduces the published intercept",()=>expect(prismIvCalculator.calculate(base).score).toBeCloseTo(expected(-5.776),10));
 it("applies published age coefficients",()=>{
  expect(prismIvCalculator.calculate({...base,age_days:0}).score).toBeCloseTo(expected(-5.776+1.311),10);
  expect(prismIvCalculator.calculate({...base,age_days:14}).score).toBeCloseTo(expected(-5.776+0.968),10);
  expect(prismIvCalculator.calculate({...base,age_days:31}).score).toBeCloseTo(expected(-5.776+0.357),10);
 });
 it("applies admission and clinical coefficients",()=>{
  const r=prismIvCalculator.calculate({...base,admission_source:"inpatient_unit",cpr_within_24h:true,cancer:true,low_risk_primary_system:true,prism_neurologic_subscore:5,prism_non_neurologic_subscore:10});
  const logit=-5.776+1.626+1.082+0.766-1.697+0.197*5+0.163*10;
  expect(r.score).toBeCloseTo(expected(logit),10);
 });
 it("supports the other published admission-source coefficients",()=>{
  expect(prismIvCalculator.calculate({...base,admission_source:"other_hospital"}).score).toBeCloseTo(expected(-5.776+1.012),10);
  expect(prismIvCalculator.calculate({...base,admission_source:"emergency_department"}).score).toBeCloseTo(expected(-5.776+0.693),10);
 });
});
