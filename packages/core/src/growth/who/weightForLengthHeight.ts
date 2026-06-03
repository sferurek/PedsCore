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
  who0To5WeightForLength,
  who0To5WeightForLengthSource
} from "./data/who_0_5_weight_for_length.js";
import {
  who0To5WeightForHeight,
  who0To5WeightForHeightSource
} from "./data/who_0_5_weight_for_height.js";

export {
  who0To5WeightForLength,
  who0To5WeightForLengthSource,
  who0To5WeightForHeight,
  who0To5WeightForHeightSource
};

export const whoWeightForLengthDataStatus: WhoGrowthDataStatus = {
  officialDataImported: true,
  reason:
    "WHO weight-for-length 0-2 years LMS data are normalized and verified. Other WHO indicators remain pending.",
  importedIndicators: ["weight_for_length"],
  allowedSources: [
    "WHO Child Growth Standards",
    "WHO Growth Reference 5-19 years"
  ],
  excludedSources: ["CDC", "Orbegozo"]
} as const;

export const whoWeightForHeightDataStatus: WhoGrowthDataStatus = {
  officialDataImported: true,
  reason:
    "WHO weight-for-height 2-5 years LMS data are normalized and verified. Other WHO indicators remain pending.",
  importedIndicators: ["weight_for_height"],
  allowedSources: [
    "WHO Child Growth Standards",
    "WHO Growth Reference 5-19 years"
  ],
  excludedSources: ["CDC", "Orbegozo"]
} as const;

export const whoWeightForLengthLmsRecords: WhoLmsRecord[] = [
  ...who0To5WeightForLength
];

export const whoWeightForHeightLmsRecords: WhoLmsRecord[] = [
  ...who0To5WeightForHeight
];

export const findImportedWhoWeightForLengthRecord = (
  params: FindLmsRecordParams
): WhoLmsRecord | undefined =>
  findLmsRecord(params, whoWeightForLengthLmsRecords);

export const findImportedWhoWeightForHeightRecord = (
  params: FindLmsRecordParams
): WhoLmsRecord | undefined =>
  findLmsRecord(params, whoWeightForHeightLmsRecords);

export const calculateWhoGrowthWithWeightForLengthData = (
  input: WhoGrowthInput
) =>
  calculateWhoGrowth(input, {
    dataStatus: whoWeightForLengthDataStatus,
    lmsRecords: whoWeightForLengthLmsRecords
  });

export const calculateWhoGrowthWithWeightForHeightData = (
  input: WhoGrowthInput
) =>
  calculateWhoGrowth(input, {
    dataStatus: whoWeightForHeightDataStatus,
    lmsRecords: whoWeightForHeightLmsRecords
  });
