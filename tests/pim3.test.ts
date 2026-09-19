import { describe, expect, it } from "vitest";
import { pim3Calculator } from "../packages/core/src/calculators/pim3.js";
const base={sbp_mmhg:120,base_excess_mmol_l:0,fio2_fraction:0.21,pao2_mmhg:91.3043478261,fixed_dilated_pupils:false,mechanical_ventilation_first_hour:false,elective_admission:false,recovery_procedure:"none",diagnostic_risk:"none"};
const pct=(x:number)=>100/(1+Math.exp(-x));
describe("PIM3",()=>{
 it("reproduces the published equation",()=>{
  const oxygen=.23; const logit=-.0431*120+.1716*(120*120/1000)+.4214*oxygen-1.7928;
  expect(pim3Calculator.calculate(base).score).toBeCloseTo(pct(logit),8);
 });
 it("applies binary and categorical coefficients",()=>{
  const r=pim3Calculator.calculate({...base,fixed_dilated_pupils:true,mechanical_ventilation_first_hour:true,elective_admission:true,recovery_procedure:"bypass_cardiac",diagnostic_risk:"very_high"});
  const oxygen=.23; const logit=3.8233-.5378+.9763-.0431*120+.1716*14.4+.4214*oxygen-1.2246+1.6225-1.7928;
  expect(r.score).toBeCloseTo(pct(logit),8);
 });
 it("uses absolute base excess",()=>{
  expect(pim3Calculator.calculate({...base,base_excess_mmol_l:-10}).score).toBeCloseTo(pim3Calculator.calculate({...base,base_excess_mmol_l:10}).score as number,10);
 });
 it("distinguishes procedure and diagnostic-risk groups",()=>{
  expect(pim3Calculator.calculate({...base,recovery_procedure:"noncardiac"}).score).not.toBe(pim3Calculator.calculate({...base,recovery_procedure:"none"}).score);
  expect(pim3Calculator.calculate({...base,diagnostic_risk:"low"}).score).not.toBe(pim3Calculator.calculate({...base,diagnostic_risk:"high"}).score);
 });
});
