import { getTool, sumScoreTool } from "./common.js";
import type { CalculatorDefinition } from "./common.js";

const inputIds = [
  "thoracoabdominal_movement",
  "intercostal_retractions",
  "xiphoid_retraction",
  "nasal_flaring",
  "expiratory_grunt"
];

export const silvermanAndersenCalculator: CalculatorDefinition = {
  toolId: "silverman_andersen",
  calculate: (input) =>
    sumScoreTool(getTool("silverman-andersen"), input, inputIds)
};

