export const pedsCorePackage = {
  name: "@peds-core/core",
  phase: "Phase 1 technical scaffold"
} as const;

export * from "./types.js";
export * from "./catalog/clinicalTools.js";
export * from "./calculators/index.js";
export * from "./evidence/referenceLinks.js";
export * from "./evidence/sortReferences.js";
export * from "./growth/who/index.js";

export * from "./discovery/toolDiscovery.js";

export * from "./seo/toolSeo.js";

export * from "./review/clinicalReview.js";

export * from "./mcp/index.js";

export * from "./mobile/clinicalBundle.js";
