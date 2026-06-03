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
  who0To5WeightForAge,
  who0To5WeightForAgeSource
} from "./data/who_0_5_weight_for_age.js";

export {
  who0To5WeightForAge,
  who0To5WeightForAgeSource
};

export const whoWeightForAgeDataStatus: WhoGrowthDataStatus = {
  officialDataImported: true,
  reason:
    "WHO weight-for-age 0-5 years LMS data are normalized and verified. Other WHO indicators remain pending.",
  importedIndicators: ["weight_for_age"],
  allowedSources: [
    "WHO Child Growth Standards",
    "WHO Growth Reference 5-19 years"
  ],
  excludedSources: ["CDC", "Orbegozo"]
} as const;

export const whoWeightForAgeLmsRecords: WhoLmsRecord[] = [
  ...who0To5WeightForAge
];

export const findImportedWhoWeightForAgeRecord = (
  params: FindLmsRecordParams
): WhoLmsRecord | undefined => findLmsRecord(params, whoWeightForAgeLmsRecords);

export const calculateWhoGrowthWithWeightForAgeData = (input: WhoGrowthInput) =>
  calculateWhoGrowth(input, {
    dataStatus: whoWeightForAgeDataStatus,
    lmsRecords: whoWeightForAgeLmsRecords
  });
