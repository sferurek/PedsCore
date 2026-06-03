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
  who0To5HeadCircumferenceForAge,
  who0To5HeadCircumferenceForAgeSource
} from "./data/who_0_5_head_circumference_for_age.js";

export {
  who0To5HeadCircumferenceForAge,
  who0To5HeadCircumferenceForAgeSource
};

export const whoHeadCircumferenceForAgeDataStatus: WhoGrowthDataStatus = {
  officialDataImported: true,
  reason:
    "WHO head circumference-for-age 0-5 years LMS data are normalized and verified. Other WHO indicators remain pending.",
  importedIndicators: ["head_circumference_for_age"],
  allowedSources: [
    "WHO Child Growth Standards",
    "WHO Growth Reference 5-19 years"
  ],
  excludedSources: ["CDC", "Orbegozo"]
} as const;

export const whoHeadCircumferenceForAgeLmsRecords: WhoLmsRecord[] = [
  ...who0To5HeadCircumferenceForAge
];

export const findImportedWhoHeadCircumferenceForAgeRecord = (
  params: FindLmsRecordParams
): WhoLmsRecord | undefined =>
  findLmsRecord(params, whoHeadCircumferenceForAgeLmsRecords);

export const calculateWhoGrowthWithHeadCircumferenceForAgeData = (
  input: WhoGrowthInput
) =>
  calculateWhoGrowth(input, {
    dataStatus: whoHeadCircumferenceForAgeDataStatus,
    lmsRecords: whoHeadCircumferenceForAgeLmsRecords
  });
