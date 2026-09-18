import type { CalculationResult } from "../types.js";
import { warning } from "./common.js";
import type { CalculatorDefinition, CalculatorInput } from "./common.js";
import { apgarCalculator } from "./apgar.js";
import { flaccCalculator } from "./flacc.js";
import { woodDownesFerresCalculator } from "./woodDownesFerres.js";
import {
  qtcBazettCalculator,
  qtcFraminghamCalculator,
  qtcFridericiaCalculator,
  qtcHodgesCalculator
} from "./qtc.js";
import {
  bedsideSchwartzCalculator,
  revisedSchwartzCalculator
} from "./schwartz.js";
import { silvermanAndersenCalculator } from "./silvermanAndersen.js";
import { ballardCalculator } from "./ballard.js";
import { dubowitzCalculator } from "./dubowitz.js";
import { modifiedSarnatNichdCalculator } from "./modifiedSarnatNichd.js";
import { thompsonHieCalculator } from "./thompsonHie.js";
import { criesCalculator } from "./cries.js";
import { clinicalDehydrationScaleCalculator } from "./clinicalDehydrationScale.js";
import { bedsidePewsCalculator } from "./bedsidePews.js";
import {
  pecarn2OrMoreCalculator,
  pecarnUnder2Calculator
} from "./pecarn.js";
import { catchCalculator } from "./catch.js";
import { chaliceCalculator } from "./chalice.js";
import { nipsCalculator } from "./nips.js";
import { pediatricAppendicitisScoreCalculator } from "./pediatricAppendicitisScore.js";
import { pediatricBurnTbsaCalculator } from "./burnTbsa.js";
import { pramCalculator } from "./pram.js";
import { sipaCalculator } from "./sipa.js";
import { westleyCroupCalculator } from "./westleyCroup.js";
import {
  ckidU25Calculator,
  kdigoPediatricCalculator,
  prifleCalculator
} from "./renalOpen.js";
import {
  modifiedTalCalculator,
  taussigCroupCalculator
} from "./respiratoryScores.js";
import {
  stepByStepFebrileInfantCalculator,
  strongKidsCalculator
} from "./openScreening.js";
import {
  passAsthmaCalculator,
  riscCalculator
} from "./respiratoryRisk.js";
import {
  pelod2Calculator,
  pim3Calculator,
  prism4Calculator
} from "./criticalCareScores.js";
import {
  gorelickDehydrationCalculator,
  mriscCalculator,
  visualAnalogueScaleCalculator
} from "./additionalOpenTools.js";

const calculators = [
  apgarCalculator,
  silvermanAndersenCalculator,
  ballardCalculator,
  dubowitzCalculator,
  modifiedSarnatNichdCalculator,
  thompsonHieCalculator,
  criesCalculator,
  woodDownesFerresCalculator,
  flaccCalculator,
  qtcBazettCalculator,
  qtcFridericiaCalculator,
  qtcFraminghamCalculator,
  qtcHodgesCalculator,
  bedsideSchwartzCalculator,
  revisedSchwartzCalculator,
  westleyCroupCalculator,
  pramCalculator,
  clinicalDehydrationScaleCalculator,
  bedsidePewsCalculator,
  pediatricAppendicitisScoreCalculator,
  pecarnUnder2Calculator,
  pecarn2OrMoreCalculator,
  catchCalculator,
  chaliceCalculator,
  sipaCalculator,
  nipsCalculator,
  pediatricBurnTbsaCalculator,
  ckidU25Calculator,
  prifleCalculator,
  kdigoPediatricCalculator,
  modifiedTalCalculator,
  taussigCroupCalculator,
  strongKidsCalculator,
  stepByStepFebrileInfantCalculator,
  passAsthmaCalculator,
  riscCalculator,
  pelod2Calculator,
  pim3Calculator,
  prism4Calculator,
  mriscCalculator,
  gorelickDehydrationCalculator,
  visualAnalogueScaleCalculator
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
