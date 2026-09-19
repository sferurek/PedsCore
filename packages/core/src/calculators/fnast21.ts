import type { CalculationResult } from "../types.js";
import { getNumericScore, getTool, label, warning } from "./common.js";
import type { CalculatorDefinition } from "./common.js";

const itemIds = [
  "crying",
  "sleep_after_feeding",
  "moro_reflex",
  "tremors_disturbed",
  "tremors_undisturbed",
  "muscle_tone",
  "excoriation",
  "myoclonic_jerks",
  "generalized_convulsions",
  "sweating",
  "temperature",
  "yawning",
  "mottling",
  "nasal_stuffiness",
  "sneezing",
  "nasal_flaring",
  "respiratory_rate",
  "excessive_sucking",
  "feeding",
  "vomiting",
  "stools"
] as const;

export const fnast21Calculator: CalculatorDefinition = {
  toolId: "fnass_21",
  calculate: (input): CalculationResult => {
    const tool = getTool("fnass-21");
    const scores = itemIds.map((id) => getNumericScore(tool, input, id));

    if (scores.some((value) => value === null)) {
      return {
        toolId: tool.id,
        warnings: [warning(
          "missing_fnast_inputs",
          "Completa los 21 dominios del FNAST antes de calcular.",
          "Complete all 21 FNAST domains before calculating."
        )],
        trace: []
      };
    }

    const numericScores = scores as number[];
    const score = numericScores.reduce((sum, value) => sum + value, 0);

    return {
      toolId: tool.id,
      score,
      maxScore: 46,
      classification: label(`FNAST ${score}`, `FNAST ${score}`),
      warnings: [
        warning(
          "fnast_population",
          "FNAST fue diseñado para recién nacidos a término expuestos intraútero a sustancias psicoactivas, especialmente opioides; la interpretación en prematuros puede requerir modificación.",
          "FNAST was designed for term newborns exposed in utero to psychoactive substances, particularly opioids; interpretation in preterm infants may require modification."
        ),
        warning(
          "fnast_training",
          "La administración requiere personal clínicamente entrenado y control periódico de concordancia entre observadores.",
          "Administration requires clinically trained staff and periodic assessment of inter-observer reliability."
        ),
        warning(
          "fnast_no_treatment_instruction",
          "PedsCore muestra únicamente la puntuación. No traduce puntos de corte históricos en una orden de iniciar, ajustar o suspender tratamiento farmacológico.",
          "PedsCore reports the score only. It does not translate historical thresholds into an instruction to start, adjust, or stop pharmacologic treatment."
        )
      ],
      trace: itemIds.map((inputId, index) => ({
        inputId,
        value: input[inputId],
        score: numericScores[index] ?? 0
      }))
    };
  }
};
