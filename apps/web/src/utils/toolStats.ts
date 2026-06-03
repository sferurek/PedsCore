import type { ClinicalToolMetadata, ImplementationStatus } from "@peds-core/core";

export const getToolStatusCounts = (tools: ClinicalToolMetadata[]) => {
  const counts = new Map<ImplementationStatus, number>();

  for (const tool of tools) {
    counts.set(
      tool.implementationStatus,
      (counts.get(tool.implementationStatus) ?? 0) + 1
    );
  }

  return counts;
};

export const getImplementedCount = (tools: ClinicalToolMetadata[]) =>
  getToolStatusCounts(tools).get("implemented") ?? 0;

export const getPartialCount = (tools: ClinicalToolMetadata[]) =>
  getToolStatusCounts(tools).get("partially_implemented") ?? 0;
