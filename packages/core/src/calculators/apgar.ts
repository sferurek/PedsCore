import { getTool, sumScoreTool } from "./common.js";
import type { CalculatorDefinition } from "./common.js";

const inputIds = [
  "heart_rate",
  "respiratory_effort",
  "muscle_tone",
  "reflex_irritability",
  "color"
];

export const apgarCalculator: CalculatorDefinition = {
  toolId: "apgar",
  calculate: (input) => sumScoreTool(getTool("apgar"), input, inputIds)
};

