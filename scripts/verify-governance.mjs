import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

const core = await import(pathToFileURL(resolve("packages/core/dist/index.js")).href);
const { clinicalTools, toolDiscoveryById, implementedCalculatorToolIds } = core;

const failures = [];
const catalogIds = new Set(clinicalTools.map((tool) => tool.id));
const registryIds = new Set(implementedCalculatorToolIds);
const specializedLocalIds = new Set([
  "who_growth_module",
  "who_growth_percentiles",
  "bmi_percentile",
  "head_circumference_percentile"
]);

const fail = (message) => failures.push(message);

for (const tool of clinicalTools) {
  const discovery = toolDiscoveryById[tool.id];
  if (!discovery) {
    fail(`Missing discovery metadata: ${tool.id}`);
    continue;
  }

  if (discovery.surfaceStatus === "active") {
    if (["blocked", "local_planned", "blocked_by_rights"].includes(discovery.calculationAvailability)) {
      fail(`Active dead-end surface: ${tool.id} -> ${discovery.calculationAvailability}`);
    }
  }

  if (discovery.calculationAvailability === "local_active") {
    if (tool.implementationStatus !== "implemented") {
      fail(`Local-active tool is not implemented: ${tool.id}`);
    }
    if (tool.calculationStatus !== "active") {
      fail(`Local-active tool has non-active calculation status: ${tool.id}`);
    }
    if (!registryIds.has(tool.id) && !specializedLocalIds.has(tool.id)) {
      fail(`Local-active tool has no calculator engine: ${tool.id}`);
    }
  }

  if (["permission_required", "external_only"].includes(discovery.reuseStatus) && registryIds.has(tool.id)) {
    fail(`Rights-limited tool is present in calculator registry: ${tool.id}`);
  }

  if (discovery.calculationAvailability === "external_official") {
    const hasExternalUrl = (tool.references ?? []).some((reference) => Boolean(reference.url || reference.doi || reference.pmid));
    if (!hasExternalUrl) {
      fail(`External-official tool has no resolvable source: ${tool.id}`);
    }
  }
}

for (const id of Object.keys(toolDiscoveryById)) {
  if (!catalogIds.has(id)) fail(`Discovery entry without catalog tool: ${id}`);
}

for (const id of implementedCalculatorToolIds) {
  const discovery = toolDiscoveryById[id];
  if (!discovery) {
    fail(`Registered calculator missing discovery metadata: ${id}`);
    continue;
  }
  if (discovery.surfaceStatus !== "active" || discovery.calculationAvailability !== "local_active") {
    fail(`Registered calculator is not an active local surface: ${id}`);
  }
}

if (failures.length) {
  console.error("Governance audit failed:");
  for (const message of failures) console.error(`- ${message}`);
  process.exit(1);
}

const counts = {
  catalog: clinicalTools.length,
  active: Object.values(toolDiscoveryById).filter((x) => x.surfaceStatus === "active").length,
  deprecated: Object.values(toolDiscoveryById).filter((x) => x.surfaceStatus === "deprecated").length,
  localActive: Object.values(toolDiscoveryById).filter((x) => x.calculationAvailability === "local_active").length,
  genericRegistry: implementedCalculatorToolIds.length,
  externalOfficial: Object.values(toolDiscoveryById).filter((x) => x.calculationAvailability === "external_official").length
};

console.log("Governance audit passed.", counts);
