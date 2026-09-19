import { describe, expect, it } from "vitest";
import { calculateTool, fnast21Calculator } from "../src/index.js";

const zero = {
  crying:"none",
  sleep_after_feeding:"normal",
  moro_reflex:"normal",
  tremors_disturbed:"none",
  tremors_undisturbed:"none",
  muscle_tone:"no",
  excoriation:"no",
  myoclonic_jerks:"no",
  generalized_convulsions:"no",
  sweating:"no",
  temperature:"normal",
  yawning:"no",
  mottling:"no",
  nasal_stuffiness:"no",
  sneezing:"no",
  nasal_flaring:"no",
  respiratory_rate:"normal",
  excessive_sucking:"no",
  feeding:"normal",
  vomiting:"none",
  stools:"normal"
};

describe("21-item Finnegan/FNAST", () => {
  it("scores zero when no withdrawal signs are selected", () => {
    const result=fnast21Calculator.calculate(zero);
    expect(result.score).toBe(0);
    expect(result.maxScore).toBe(46);
  });

  it("reaches the maximum published item total", () => {
    const result=fnast21Calculator.calculate({
      crying:"continuous",
      sleep_after_feeding:"lt1",
      moro_reflex:"marked",
      tremors_disturbed:"moderate_severe",
      tremors_undisturbed:"moderate_severe",
      muscle_tone:"yes",
      excoriation:"yes",
      myoclonic_jerks:"yes",
      generalized_convulsions:"yes",
      sweating:"yes",
      temperature:"ge38_4",
      yawning:"yes",
      mottling:"yes",
      nasal_stuffiness:"yes",
      sneezing:"yes",
      nasal_flaring:"yes",
      respiratory_rate:"gt60_retractions",
      excessive_sucking:"yes",
      feeding:"poor",
      vomiting:"projectile",
      stools:"watery"
    });
    expect(result.score).toBe(46);
  });

  it("requires all 21 symptoms", () => {
    const result=fnast21Calculator.calculate({crying:"none"});
    expect(result.score).toBeUndefined();
    expect(result.warnings.some((w)=>w.id==="missing_fnast_inputs")).toBe(true);
  });

  it("is available through the dispatcher", () => {
    const result=calculateTool("fnass_21",zero);
    expect(result.score).toBe(0);
    expect(result.warnings.some((w)=>w.id==="calculator_not_implemented")).toBe(false);
  });
});
