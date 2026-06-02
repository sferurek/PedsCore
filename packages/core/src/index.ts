export const pedsCorePackage = {
  name: "@peds-core/core",
  phase: "Phase 1 technical scaffold"
} as const;

export * from "./types.js";
export * from "./catalog/clinicalTools.js";
export * from "./calculators/index.js";
