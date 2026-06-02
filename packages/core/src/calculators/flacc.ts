import { getTool, sumScoreTool } from "./common.js";
import type { CalculatorDefinition } from "./common.js";

const inputIds = ["face", "legs", "activity", "cry", "consolability"];

export const flaccCalculator: CalculatorDefinition = {
  toolId: "flacc",
  calculate: (input) => sumScoreTool(getTool("flacc"), input, inputIds)
};

