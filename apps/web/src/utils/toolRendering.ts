import type { ClinicalToolMetadata } from "@peds-core/core";

export const hasInterpretationTable = (tool: ClinicalToolMetadata): boolean =>
  Boolean(tool.interpretationBands?.length);

export const hasScoringTable = (tool: ClinicalToolMetadata): boolean =>
  Boolean(tool.scoringTable?.length);

export const hasInactiveCalculation = (tool: ClinicalToolMetadata): boolean =>
  tool.implementationStatus !== "implemented";

