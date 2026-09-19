import type { CalculationResult } from "../types.js";
import { getNumber, getNumericScore, getTool, label, warning } from "./common.js";
import type { CalculatorDefinition } from "./common.js";

const respiratoryRatePoints = (ageMonths: number, rr: number): number => {
  if (ageMonths < 6) {
    if (rr <= 40) return 0;
    if (rr <= 55) return 1;
    if (rr <= 70) return 2;
    return 3;
  }
  if (rr <= 30) return 0;
  if (rr <= 45) return 1;
  if (rr <= 60) return 2;
  return 3;
};

const oxygenPoints = (spo2: number): number =>
  spo2 >= 95 ? 0 : spo2 >= 92 ? 1 : spo2 >= 90 ? 2 : 3;

export const modifiedTalCalculator: CalculatorDefinition = {
  toolId: "modified_tal",
  calculate: (input): CalculationResult => {
    const tool = getTool("modified-tal");
    const ageMonths = getNumber(input, "age_months");
    const respiratoryRate = getNumber(input, "respiratory_rate");
    const spo2 = getNumber(input, "spo2_percent");
    const wheeze = getNumericScore(tool, input, "wheeze_crackles");
    const retractions = getNumericScore(tool, input, "retractions");

    if (ageMonths === null || respiratoryRate === null || spo2 === null || wheeze === null || retractions === null) {
      return { toolId: tool.id, warnings: [warning("missing_modified_tal_inputs", "Faltan variables para calcular la escala de Tal modificada.", "Variables are missing for the Modified Tal Score.")], trace: [] };
    }
    if (ageMonths < 0 || respiratoryRate < 0 || spo2 <= 0 || spo2 > 100) {
      return { toolId: tool.id, warnings: [warning("invalid_modified_tal_inputs", "Revisa edad, frecuencia respiratoria y saturación de oxígeno.", "Review age, respiratory rate, and oxygen saturation.")], trace: [] };
    }

    const rrPoints = respiratoryRatePoints(ageMonths, respiratoryRate);
    const spo2Points = oxygenPoints(spo2);
    const score = rrPoints + wheeze + retractions + spo2Points;

    const classification =
      score <= 5 ? label("Bronquiolitis leve", "Mild bronchiolitis") :
      score <= 8 ? label("Bronquiolitis moderada", "Moderate bronchiolitis") :
      label("Bronquiolitis grave", "Severe bronchiolitis");

    return {
      toolId: tool.id,
      score,
      maxScore: 12,
      classification,
      warnings: [warning("modified_tal_context", "Interpretar junto con la valoración clínica. La saturación debe medirse en aire ambiente y el paciente debe estar tranquilo durante la valoración.", "Interpret alongside clinical assessment. Oxygen saturation should be measured in room air and the patient should be calm during assessment.")],
      trace: [
        { inputId: "age_months", value: ageMonths },
        { inputId: "respiratory_rate", value: respiratoryRate, score: rrPoints },
        { inputId: "wheeze_crackles", value: input.wheeze_crackles, score: wheeze },
        { inputId: "retractions", value: input.retractions, score: retractions },
        { inputId: "spo2_percent", value: spo2, score: spo2Points }
      ]
    };
  }
};
