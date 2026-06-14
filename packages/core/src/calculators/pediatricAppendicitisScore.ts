import { getTool, sumScoreTool } from "./common.js";
import type { CalculatorDefinition } from "./common.js";

const inputIds = [
  "right_iliac_fossa_tenderness",
  "cough_percussion_hopping_tenderness",
  "anorexia",
  "fever",
  "nausea_or_vomiting",
  "pain_migration",
  "leukocytosis",
  "neutrophilia"
];

export const pediatricAppendicitisScoreCalculator: CalculatorDefinition = {
  toolId: "pediatric_appendicitis_score",
  calculate: (input) => ({
    ...sumScoreTool(getTool("pediatric-appendicitis-score"), input, inputIds),
    maxScore: 10
  })
};
