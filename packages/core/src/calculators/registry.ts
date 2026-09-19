import type { CalculationResult } from "../types.js";
import { warning } from "./common.js";
import type { CalculatorDefinition, CalculatorInput } from "./common.js";
import { apgarCalculator } from "./apgar.js";
import { flaccCalculator } from "./flacc.js";
import { woodDownesFerresCalculator } from "./woodDownesFerres.js";
import { qtcBazettCalculator, qtcFraminghamCalculator, qtcFridericiaCalculator, qtcHodgesCalculator } from "./qtc.js";
import { bedsideSchwartzCalculator, revisedSchwartzCalculator } from "./schwartz.js";
import { silvermanAndersenCalculator } from "./silvermanAndersen.js";
import { ballardCalculator } from "./ballard.js";
import { dubowitzCalculator } from "./dubowitz.js";
import { modifiedSarnatNichdCalculator } from "./modifiedSarnatNichd.js";
import { thompsonHieCalculator } from "./thompsonHie.js";
import { criesCalculator } from "./cries.js";
import { clinicalDehydrationScaleCalculator } from "./clinicalDehydrationScale.js";
import { bedsidePewsCalculator } from "./bedsidePews.js";
import { pecarn2OrMoreCalculator, pecarnUnder2Calculator } from "./pecarn.js";
import { catchCalculator } from "./catch.js";
import { chaliceCalculator } from "./chalice.js";
import { nipsCalculator } from "./nips.js";
import { pediatricAppendicitisScoreCalculator } from "./pediatricAppendicitisScore.js";
import { pediatricBurnTbsaCalculator } from "./burnTbsa.js";
import { pramCalculator } from "./pram.js";
import { sipaCalculator } from "./sipa.js";
import { westleyCroupCalculator } from "./westleyCroup.js";
import { garciaAlixNersCalculator } from "./garciaAlixNers.js";
import { cdcGrowthPercentilesCalculator } from "./cdcGrowth.js";
import { strongkidsCalculator } from "./strongkids.js";
import { visualAnalogueScaleCalculator } from "./additionalOpenTools.js";
import { stepByStepCalculator } from "./stepByStep.js";
import { pecarnFebrileInfantCalculator } from "./infectionOpen.js";
import { yaleObservationScaleCalculator } from "./yaleObservation.js";
import { pucaiCalculator } from "./ibdActivity.js";
import { pcdaiCalculator } from "./pcdai.js";
import { modifiedTalCalculator, taussigCroupCalculator } from "./respiratoryScores.js";
import { passAsthmaCalculator, riscCalculator } from "./respiratoryRisk.js";
import { gorelickDehydrationCalculator, mriscCalculator } from "./additionalOpenTools.js";
import { ckidU25Calculator, kdigoPediatricCalculator, prifleCalculator } from "./renalOpen.js";
import { phoenixSepsisCalculator } from "./phoenixSepsis.js";
import { parcCalculator } from "./parc.js";
import { bacterialMeningitisScoreCalculator } from "./infectionOpen.js";
import { modifiedBellNecCalculator } from "./modifiedBellNec.js";
import { nSofaCalculator } from "./nSofa.js";
import { wpcdaiCalculator } from "./ibdActivity.js";
import { pelod2Calculator, pim3Calculator, prism4Calculator } from "./criticalCareScores.js";
import { psofaCalculator } from "./psofa.js";
import { snappeIiCalculator } from "./snappeII.js";
import { pymsCalculator } from "./pyms.js";

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
  garciaAlixNersCalculator,
  cdcGrowthPercentilesCalculator,
  strongkidsCalculator,
  visualAnalogueScaleCalculator,
  stepByStepCalculator,
  pecarnFebrileInfantCalculator,
  yaleObservationScaleCalculator,
  pucaiCalculator,
  pcdaiCalculator,
  modifiedTalCalculator,
  taussigCroupCalculator,
  riscCalculator,
  mriscCalculator,
  kdigoPediatricCalculator,
  phoenixSepsisCalculator,
  parcCalculator,
  bacterialMeningitisScoreCalculator,
  ckidU25Calculator,
  modifiedBellNecCalculator,
  nSofaCalculator,
  wpcdaiCalculator,
  passAsthmaCalculator,
  gorelickDehydrationCalculator,
  prifleCalculator,
  pelod2Calculator,
  prism4Calculator,
  pim3Calculator,
  psofaCalculator,
  snappeIiCalculator,
  pymsCalculator
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
