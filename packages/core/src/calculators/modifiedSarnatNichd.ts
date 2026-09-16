import { getNumber, getTool, missingResult, warning } from "./common.js";
import type { CalculatorDefinition } from "./common.js";

const categoryIds = [
  "level_of_consciousness",
  "spontaneous_activity",
  "posture",
  "tone",
  "primitive_reflexes",
  "autonomic_system"
] as const;

const severityLabel = (severity: number) => {
  if (severity === 0) return { es: "Normal", en: "Normal" };
  if (severity === 1) return { es: "Predominio leve", en: "Predominantly mild" };
  if (severity === 2) return { es: "Predominio moderado", en: "Predominantly moderate" };
  return { es: "Predominio grave", en: "Predominantly severe" };
};

export const modifiedSarnatNichdCalculator: CalculatorDefinition = {
  toolId: "modified_sarnat_nichd",
  calculate: (input) => {
    const tool = getTool("modified-sarnat-nichd");

    if (categoryIds.some((id) => input[id] === undefined || input[id] === null || input[id] === "")) {
      return missingResult(tool.id, [...categoryIds]);
    }

    const values: Record<string, number> = {};
    const trace = [];

    for (const inputId of categoryIds) {
      const value = getNumber(input, inputId);
      if (value === null || !Number.isInteger(value) || value < 0 || value > 3) {
        return {
          toolId: tool.id,
          warnings: [
            warning(
              "invalid_modified_sarnat_category",
              `La categoria ${inputId} debe codificarse con un entero entre 0 y 3.`,
              `The ${inputId} category must be coded with an integer from 0 to 3.`
            )
          ],
          trace: [{ inputId, value: input[inputId] }]
        };
      }

      values[inputId] = value;
      trace.push({ inputId, value, score: value });
    }

    const score = categoryIds.reduce((sum, id) => sum + (values[id] ?? 0), 0);

    if (score === 0) {
      return {
        toolId: tool.id,
        score,
        maxScore: 18,
        classification: { es: "Exploracion sin anormalidades codificadas", en: "No coded abnormalities on examination" },
        warnings: [],
        trace
      };
    }

    const counts = [0, 0, 0, 0];
    for (const id of categoryIds) {
      const value = values[id] ?? 0;
      counts[value] = (counts[value] ?? 0) + 1;
    }

    const abnormalCounts = [1, 2, 3].map((severity) => ({
      severity,
      count: counts[severity] ?? 0
    }));
    const maxCount = Math.max(...abnormalCounts.map((item) => item.count));
    const tied = abnormalCounts.filter((item) => item.count === maxCount && item.count > 0);
    let predominantSeverity: number | null = null;

    if (tied.length === 1) {
      predominantSeverity = tied[0]?.severity ?? null;
    } else {
      const consciousness = values.level_of_consciousness ?? 0;
      if (consciousness > 0 && tied.some((item) => item.severity === consciousness)) {
        predominantSeverity = consciousness;
      }
    }

    const classification =
      predominantSeverity === null
        ? {
            es: "Patron mixto sin categoria predominante; requiere integracion clinica",
            en: "Mixed pattern without a predominant category; clinical integration required"
          }
        : severityLabel(predominantSeverity);

    return {
      toolId: tool.id,
      score,
      maxScore: 18,
      classification,
      warnings: [],
      trace
    };
  }
};
