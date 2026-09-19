import type { CalculationResult } from "../types.js";
import { getNumericScore, getTool, label, warning } from "./common.js";
import type { CalculatorDefinition } from "./common.js";

export const passCalculator: CalculatorDefinition = {
  toolId: "pass",
  calculate: (input): CalculationResult => {
    const tool = getTool("pass");
    const ids = ["wheezing", "work_of_breathing", "prolonged_expiration"];
    const values = ids.map((id) => getNumericScore(tool, input, id));

    if (values.some((value) => value === null)) {
      return {
        toolId: tool.id,
        warnings: [warning("missing_pass_inputs", "Faltan componentes para calcular PASS.", "Components are missing for PASS.")],
        trace: []
      };
    }

    const score = (values as number[]).reduce((sum, value) => sum + value, 0);
    return {
      toolId: tool.id,
      score,
      maxScore: 6,
      classification: label(`PASS ${score}/6`, `PASS ${score}/6`),
      warnings: [
        warning(
          "pass_context",
          "PASS fue validado en niños de 1 a 18 años con exacerbación aguda de asma. Es una medida descriptiva de gravedad y respuesta; no sustituye la valoración clínica ni determina por sí sola ingreso o tratamiento.",
          "PASS was validated in children aged 1 to 18 years with acute asthma exacerbations. It is a descriptive measure of severity and response; it does not replace clinical assessment or independently determine admission or treatment."
        )
      ],
      trace: ids.map((id, index) => ({ inputId: id, value: input[id], score: (values as number[])[index] ?? 0 }))
    };
  }
};
