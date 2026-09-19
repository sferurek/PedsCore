import type { CalculationResult } from "../types.js";
import { getBoolean, getTool, label, warning } from "./common.js";
import type { CalculatorDefinition } from "./common.js";

const signs = [
  "decreased_skin_elasticity",
  "capillary_refill_over_2s",
  "ill_general_appearance",
  "absent_tears",
  "abnormal_respirations",
  "dry_mucous_membranes",
  "sunken_eyes",
  "abnormal_pulse",
  "tachycardia",
  "decreased_urine_output"
] as const;

export const gorelickDehydrationCalculator: CalculatorDefinition = {
  toolId: "gorelick_dehydration",
  calculate: (input): CalculationResult => {
    const tool = getTool("gorelick-dehydration");
    const values = signs.map((id) => getBoolean(input, id));
    if (values.some((value) => value === null)) {
      return {
        toolId: tool.id,
        warnings: [warning("missing_gorelick_inputs", "Faltan signos para completar la escala de Gorelick de 10 ítems.", "Signs are missing to complete the 10-item Gorelick scale.")],
        trace: []
      };
    }
    const score = (values as boolean[]).filter(Boolean).length;
    const classification =
      score >= 7 ? label("≥10% de deshidratación probable", "Probable ≥10% dehydration") :
      score >= 3 ? label("≥5% de deshidratación probable", "Probable ≥5% dehydration") :
      label("<5% de deshidratación según la escala", "<5% dehydration by the scale");

    return {
      toolId: tool.id,
      score,
      maxScore: 10,
      classification,
      warnings: [warning(
        "gorelick_context",
        "La escala estima deshidratación a partir de signos clínicos y fue derivada en niños de 1 mes a 5 años con diarrea. Los umbrales ≥3 y ≥7 signos corresponden aproximadamente a ≥5% y ≥10% de déficit, respectivamente; debe integrarse con la valoración clínica.",
        "The scale estimates dehydration from clinical signs and was derived in children aged 1 month to 5 years with diarrhea. Thresholds of ≥3 and ≥7 signs correspond approximately to ≥5% and ≥10% deficit, respectively; integrate with clinical assessment."
      )],
      trace: signs.map((id, index) => ({ inputId: id, value: input[id], score: (values as boolean[])[index] ? 1 : 0 }))
    };
  }
};
