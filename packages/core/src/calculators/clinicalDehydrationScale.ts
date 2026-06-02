import { getTool, sumScoreTool } from "./common.js";
import type { CalculatorDefinition } from "./common.js";

const inputIds = [
  "general_appearance",
  "eyes",
  "mucous_membranes",
  "tears"
];

export const clinicalDehydrationScaleCalculator: CalculatorDefinition = {
  toolId: "clinical_dehydration_scale",
  calculate: (input) => ({
    ...sumScoreTool(getTool("clinical-dehydration-scale"), input, inputIds),
    maxScore: 8
  })
};

