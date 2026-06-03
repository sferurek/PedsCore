import {
  calculateWhoGrowth,
  findLmsRecord
} from "./index.js";
import type {
  FindLmsRecordParams,
  WhoGrowthDataStatus,
  WhoGrowthInput,
  WhoLmsRecord
} from "./types.js";
import {
  who5To19HeightForAge,
  who5To19HeightForAgeSource
} from "./data/who_5_19_height_for_age.js";

export {
  who5To19HeightForAge,
  who5To19HeightForAgeSource
};

export const whoHeightForAge5To19DataStatus: WhoGrowthDataStatus = {
  officialDataImported: true,
  reason:
    "WHO Growth Reference 2007 height-for-age 5-19 years LMS data are normalized and verified. Other WHO indicators remain range-specific.",
  importedIndicators: ["length_height_for_age"],
  allowedSources: [
    "WHO Child Growth Standards",
    "WHO Growth Reference 5-19 years"
  ],
  excludedSources: ["CDC", "Orbegozo"]
} as const;

export const whoHeightForAge5To19LmsRecords: WhoLmsRecord[] = [
  ...who5To19HeightForAge
];

export const findImportedWhoHeightForAge5To19Record = (
  params: FindLmsRecordParams
): WhoLmsRecord | undefined =>
  findLmsRecord(params, whoHeightForAge5To19LmsRecords);

export const calculateWhoGrowthWithHeightForAge5To19Data = (
  input: WhoGrowthInput
) =>
  calculateWhoGrowth(input, {
    dataStatus: whoHeightForAge5To19DataStatus,
    lmsRecords: whoHeightForAge5To19LmsRecords
  });
