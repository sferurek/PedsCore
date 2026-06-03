import type {
  WhoGrowthDataStatus,
  WhoGrowthIndicator,
  WhoLmsRecord
} from "./types.js";

export interface LoadedWhoLmsRecords {
  indicator: WhoGrowthIndicator;
  records: readonly WhoLmsRecord[];
  dataStatus: WhoGrowthDataStatus;
}

const unloadedStatus = (indicator: WhoGrowthIndicator): WhoGrowthDataStatus => ({
  officialDataImported: false,
  reason: `WHO LMS data for ${indicator} are not imported in PedsCore yet.`,
  importedIndicators: [],
  allowedSources: [
    "WHO Child Growth Standards",
    "WHO Growth Reference 5-19 years"
  ],
  excludedSources: ["CDC", "Orbegozo"]
});

export const loadWhoLmsRecords = async (
  indicator: WhoGrowthIndicator
): Promise<LoadedWhoLmsRecords> => {
  if (indicator === "bmi_for_age") {
    const module = await import("./bmiForAge.js");

    return {
      indicator,
      records: module.whoLmsRecords,
      dataStatus: module.whoGrowthDataStatus
    };
  }

  return {
    indicator,
    records: [],
    dataStatus: unloadedStatus(indicator)
  };
};
