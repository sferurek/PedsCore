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
  who0To5LengthHeightForAge,
  who0To5LengthHeightForAgeSource
} from "./data/who_0_5_length_height_for_age.js";

export {
  who0To5LengthHeightForAge,
  who0To5LengthHeightForAgeSource
};

export const whoLengthHeightForAgeDataStatus: WhoGrowthDataStatus = {
  officialDataImported: true,
  reason:
    "WHO length/height-for-age 0-5 years LMS data are normalized and verified. Other WHO indicators remain pending.",
  importedIndicators: ["length_height_for_age"],
  allowedSources: [
    "WHO Child Growth Standards",
    "WHO Growth Reference 5-19 years"
  ],
  excludedSources: ["CDC", "Orbegozo"]
} as const;

export const whoLengthHeightForAgeLmsRecords: WhoLmsRecord[] = [
  ...who0To5LengthHeightForAge
];

export const findImportedWhoLengthHeightForAgeRecord = (
  params: FindLmsRecordParams
): WhoLmsRecord | undefined =>
  findLmsRecord(params, whoLengthHeightForAgeLmsRecords);

export const calculateWhoGrowthWithLengthHeightForAgeData = (
  input: WhoGrowthInput
) =>
  calculateWhoGrowth(input, {
    dataStatus: whoLengthHeightForAgeDataStatus,
    lmsRecords: whoLengthHeightForAgeLmsRecords
  });
