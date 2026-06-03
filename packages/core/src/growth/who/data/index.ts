import type { WhoLmsRecord } from "../types.js";

export const whoGrowthDataStatus = {
  officialDataImported: false,
  reason:
    "Official WHO LMS tables have not yet been normalized and verified in this repository.",
  allowedSources: [
    "WHO Child Growth Standards",
    "WHO Growth Reference 5-19 years"
  ],
  excludedSources: ["CDC", "Orbegozo"]
} as const;

export const whoLmsRecords: WhoLmsRecord[] = [];
