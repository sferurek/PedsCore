import type { CalculationResult } from "../types.js";
import { getNumericScore, getTool, label, warning } from "./common.js";
import type { CalculatorDefinition } from "./common.js";

export const taussigCroupCalculator: CalculatorDefinition = {
  toolId: "taussig_croup",
  calculate: (input): CalculationResult => {
    const tool = getTool("taussig-croup-score");
    const ids = ["stridor", "air_entry", "color", "retractions", "consciousness"];
    const values = ids.map((id) => getNumericScore(tool, input, id));

    if (values.some((value) => value === null)) {
      return {
        toolId: tool.id,
        warnings: [warning(
          "missing_taussig_inputs",
          "Faltan componentes para calcular la escala de Taussig.",
          "Components are missing for the Taussig Croup Score."
        )],
        trace: []
      };
    }

    const score = (values as number[]).reduce((sum, value) => sum + value, 0);
    return {
      toolId: tool.id,
      score,
      maxScore: 15,
      classification: label(`Taussig ${score}/15`, `Taussig ${score}/15`),
      warnings: [
        warning(
          "taussig_context",
          "Taussig cuantifica la gravedad clínica del crup. PedsCore muestra la puntuación sin imponer bandas terapéuticas no uniformes; la escala de Westley es actualmente la más utilizada.",
          "Taussig quantifies clinical croup severity. PedsCore reports the score without imposing non-uniform treatment bands; the Westley score is currently more widely used."
        )
      ],
      trace: ids.map((id, index) => ({ inputId: id, value: input[id], score: (values as number[])[index] ?? 0 }))
    };
  }
};
