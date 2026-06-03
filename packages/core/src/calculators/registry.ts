import type { CalculationResult } from "../types.js";
import { warning } from "./common.js";
import type { CalculatorDefinition, CalculatorInput } from "./common.js";
import { apgarCalculator } from "./apgar.js";
import { flaccCalculator } from "./flacc.js";
import {
  qtcBazettCalculator,
  qtcFraminghamCalculator,
  qtcFridericiaCalculator,
  qtcHodgesCalculator
} from "./qtc.js";
import { bedsideSchwartzCalculator } from "./schwartz.js";
import { silvermanAndersenCalculator } from "./silvermanAndersen.js";
import { clinicalDehydrationScaleCalculator } from "./clinicalDehydrationScale.js";
import {
  pecarn2OrMoreCalculator,
  pecarnUnder2Calculator
} from "./pecarn.js";
import { catchCalculator } from "./catch.js";
import { chaliceCalculator } from "./chalice.js";
import { nipsCalculator } from "./nips.js";
import { pramCalculator } from "./pram.js";
import { sipaCalculator } from "./sipa.js";
import { westleyCroupCalculator } from "./westleyCroup.js";

const calculators = [
  apgarCalculator,
  silvermanAndersenCalculator,
  flaccCalculator,
  qtcBazettCalculator,
  qtcFridericiaCalculator,
  qtcFraminghamCalculator,
  qtcHodgesCalculator,
  bedsideSchwartzCalculator,
  westleyCroupCalculator,
  pramCalculator,
  clinicalDehydrationScaleCalculator,
  pecarnUnder2Calculator,
  pecarn2OrMoreCalculator,
  catchCalculator,
  chaliceCalculator,
  sipaCalculator,
  nipsCalculator
] satisfies CalculatorDefinition[];

const calculatorByToolId = new Map(
  calculators.map((calculator) => [calculator.toolId, calculator])
);

export const implementedCalculatorToolIds = calculators.map(
  (calculator) => calculator.toolId
);

export const calculateTool = (
  toolId: string,
  input: CalculatorInput
): CalculationResult => {
  const calculator = calculatorByToolId.get(toolId);

  if (!calculator) {
    return {
      toolId,
      warnings: [
        warning(
          "calculator_not_implemented",
          "El calculo automatico no esta implementado para esta herramienta.",
          "Automatic calculation is not implemented for this tool."
        )
      ],
      trace: []
    };
  }

  return calculator.calculate(input);
};
