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

  if (indicator === "weight_for_age") {
    const module = await import("./weightForAge.js");

    return {
      indicator,
      records: module.whoWeightForAgeLmsRecords,
      dataStatus: module.whoWeightForAgeDataStatus
    };
  }

  if (indicator === "length_height_for_age") {
    const module = await import("./lengthHeightForAge.js");

    return {
      indicator,
      records: module.whoLengthHeightForAgeLmsRecords,
      dataStatus: module.whoLengthHeightForAgeDataStatus
    };
  }

  if (indicator === "head_circumference_for_age") {
    const module = await import("./headCircumferenceForAge.js");

    return {
      indicator,
      records: module.whoHeadCircumferenceForAgeLmsRecords,
      dataStatus: module.whoHeadCircumferenceForAgeDataStatus
    };
  }

  if (indicator === "weight_for_length") {
    const module = await import("./weightForLengthHeight.js");

    return {
      indicator,
      records: module.whoWeightForLengthLmsRecords,
      dataStatus: module.whoWeightForLengthDataStatus
    };
  }

  if (indicator === "weight_for_height") {
    const module = await import("./weightForLengthHeight.js");

    return {
      indicator,
      records: module.whoWeightForHeightLmsRecords,
      dataStatus: module.whoWeightForHeightDataStatus
    };
  }

  return {
    indicator,
    records: [],
    dataStatus: unloadedStatus(indicator)
  };
};
