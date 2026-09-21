import { calculateTool } from "../packages/core/dist/index.js";

globalThis.PedsCoreMobile = Object.freeze({
  calculate(toolId, inputJson) {
    const input = typeof inputJson === "string" ? JSON.parse(inputJson) : inputJson;
    return JSON.stringify(calculateTool(toolId, input));
  }
});
