import type { CalculationResult } from "../types.js";
import { getNumericScore, getTool, missingResult, warning } from "./common.js";
import type { CalculatorDefinition } from "./common.js";

const inputIds = [
  "respiratory_domain",
  "circulation_domain",
  "disability_domain",
  "continuous_inhalation_or_cpap",
  "persistent_postoperative_vomiting"
] as const;

export const modifiedBrightonPewsCalculator: CalculatorDefinition = {
  toolId: "modified_brighton_pews",
  calculate: (input): CalculationResult => {
    const tool = getTool("modified-brighton-pews");

    for (const inputId of inputIds) {
      if (input[inputId] === undefined || input[inputId] === null || input[inputId] === "") {
        return missingResult(tool.id, [...inputIds]);
      }
    }

    const respiratory = getNumericScore(tool, input, "respiratory_domain");
    const circulation = getNumericScore(tool, input, "circulation_domain");
    const disability = getNumericScore(tool, input, "disability_domain");
    const respiratoryAddon = getNumericScore(tool, input, "continuous_inhalation_or_cpap");
    const vomitingAddon = getNumericScore(tool, input, "persistent_postoperative_vomiting");

    const values = [respiratory, circulation, disability, respiratoryAddon, vomitingAddon];
    if (values.some((value) => value === null)) {
      return {
        toolId: tool.id,
        warnings: [
          warning(
            "invalid_modified_brighton_pews_input",
            "Seleccion no valida para Modified Brighton PEWS.",
            "Invalid Modified Brighton PEWS selection."
          )
        ],
        trace: []
      };
    }

    const [r, c, d, a, v] = values as number[];
    const total = r + c + d + a + v;

    const classification =
      total >= 3
        ? {
            es: "PEWS ≥3 en la cohorte de validacion",
            en: "PEWS ≥3 in the validation cohort"
          }
        : {
            es: "PEWS 0-2 en la cohorte de validacion",
            en: "PEWS 0-2 in the validation cohort"
          };

    return {
      toolId: tool.id,
      score: total,
      maxScore: 13,
      label: {
        es: `Modified Brighton PEWS: ${total}/13`,
        en: `Modified Brighton PEWS: ${total}/13`
      },
      classification,
      warnings: [],
      trace: [
        { inputId: "respiratory_domain", value: input.respiratory_domain, score: r },
        { inputId: "circulation_domain", value: input.circulation_domain, score: c },
        { inputId: "disability_domain", value: input.disability_domain, score: d },
        { inputId: "continuous_inhalation_or_cpap", value: input.continuous_inhalation_or_cpap, score: a },
        { inputId: "persistent_postoperative_vomiting", value: input.persistent_postoperative_vomiting, score: v }
      ]
    };
  }
};
