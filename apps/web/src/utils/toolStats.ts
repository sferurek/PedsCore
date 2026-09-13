import { getToolDiscovery } from "@peds-core/core";
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

export const getClinicalSurfaceStats = (tools: ClinicalToolMetadata[]) => {
  let available = 0;
  let draft = 0;
  let blocked = 0;
  let deprecated = 0;
  let localCalculations = 0;
  let externalOfficial = 0;

  for (const tool of tools) {
    const discovery = getToolDiscovery(tool.id);
    if (!discovery) continue;

    if (discovery.surfaceStatus === "active") available += 1;
    if (discovery.surfaceStatus === "draft") draft += 1;
    if (discovery.surfaceStatus === "blocked") blocked += 1;
    if (discovery.surfaceStatus === "deprecated") deprecated += 1;

    if (discovery.calculationAvailability === "local_active") {
      localCalculations += 1;
    }
    if (discovery.calculationAvailability === "external_official") {
      externalOfficial += 1;
    }
  }

  return {
    catalogued: tools.length,
    available,
    draft,
    blocked,
    deprecated,
    localCalculations,
    externalOfficial
  };
};
