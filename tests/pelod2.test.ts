import { describe, expect, it } from "vitest";
import { pelod2Calculator } from "../packages/core/src/calculators/pelod2.js";
const base={age_months:24,gcs:15,both_pupils_fixed:false,lactate_mmol_l:1,map_mmhg:70,creatinine_umol_l:40,pao2_fio2:100,paco2_mmhg:40,invasive_ventilation:false,wbc_10e9_l:10,platelets_10e9_l:200};
describe("PELOD-2",()=>{
 it("scores zero for normal values",()=>expect(pelod2Calculator.calculate(base).score).toBe(0));
 it("scores published individual thresholds",()=>{
  expect(pelod2Calculator.calculate({...base,gcs:10}).score).toBe(1);
  expect(pelod2Calculator.calculate({...base,gcs:4}).score).toBe(4);
  expect(pelod2Calculator.calculate({...base,both_pupils_fixed:true}).score).toBe(5);
  expect(pelod2Calculator.calculate({...base,lactate_mmol_l:11}).score).toBe(4);
  expect(pelod2Calculator.calculate({...base,pao2_fio2:60}).score).toBe(2);
  expect(pelod2Calculator.calculate({...base,paco2_mmhg:95}).score).toBe(3);
  expect(pelod2Calculator.calculate({...base,invasive_ventilation:true}).score).toBe(3);
  expect(pelod2Calculator.calculate({...base,wbc_10e9_l:2}).score).toBe(2);
  expect(pelod2Calculator.calculate({...base,platelets_10e9_l:76}).score).toBe(2);
 });
 it("uses age-specific MAP and creatinine cutoffs",()=>{
  expect(pelod2Calculator.calculate({...base,age_months:0.5,map_mmhg:16}).score).toBe(6);
  expect(pelod2Calculator.calculate({...base,age_months:144,map_mmhg:37}).score).toBe(6);
  expect(pelod2Calculator.calculate({...base,age_months:1,creatinine_umol_l:23}).score).toBe(2);
 });
 it("reaches the theoretical maximum of 33",()=>{
  const r=pelod2Calculator.calculate({...base,gcs:3,both_pupils_fixed:true,lactate_mmol_l:11,map_mmhg:20,creatinine_umol_l:60,pao2_fio2:60,paco2_mmhg:95,invasive_ventilation:true,wbc_10e9_l:2,platelets_10e9_l:76});
  expect(r.score).toBe(33); expect(r.maxScore).toBe(33);
 });
});
