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
} from "./renalOpen.js";
import {
  modifiedTalCalculator,
  taussigCroupCalculator
} from "./respiratoryScores.js";
import {
  stepByStepFebrileInfantCalculator,
} from "./openScreening.js";
import {
  riscCalculator
} from "./respiratoryRisk.js";
import {
} from "./criticalCareScores.js";
import {
  mriscCalculator,
} from "./additionalOpenTools.js";
import { phoenixSepsisCalculator } from "./phoenixSepsis.js";
import { pucaiCalculator, wpcdaiCalculator } from "./ibdActivity.js";
import { nSofaCalculator } from "./nSofa.js";
import { yaleObservationScaleCalculator } from "./yaleObservation.js";
import {
  bacterialMeningitisScoreCalculator,
  pecarnFebrileInfantCalculator
} from "./infectionOpen.js";
import { garciaAlixNersCalculator } from "./garciaAlixNers.js";
import { parcCalculator } from "./parc.js";
import { pcdaiCalculator } from "./pcdai.js";
import { modifiedBellNecCalculator } from "./modifiedBellNec.js";

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
  visualAnalogueScaleCalculator,
  phoenixSepsisCalculator,
  wpcdaiCalculator,
  pucaiCalculator,
  nSofaCalculator,
  yaleObservationScaleCalculator,
  bacterialMeningitisScoreCalculator,
  pecarnFebrileInfantCalculator,
  garciaAlixNersCalculator,
  parcCalculator,
  pcdaiCalculator,
  modifiedBellNecCalculator
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
