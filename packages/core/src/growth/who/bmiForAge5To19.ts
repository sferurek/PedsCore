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
  who5To19BmiForAge,
  who5To19BmiForAgeSource
} from "./data/who_5_19_bmi_for_age.js";

export {
  who5To19BmiForAge,
  who5To19BmiForAgeSource
};

export const whoBmiForAge5To19DataStatus: WhoGrowthDataStatus = {
  officialDataImported: true,
  reason:
    "WHO Growth Reference 2007 BMI-for-age 5-19 years LMS data are normalized and verified. Other WHO indicators remain range-specific.",
  importedIndicators: ["bmi_for_age"],
  allowedSources: [
    "WHO Child Growth Standards",
    "WHO Growth Reference 5-19 years"
  ],
  excludedSources: ["CDC", "Orbegozo"]
} as const;

export const whoBmiForAge5To19LmsRecords: WhoLmsRecord[] = [
  ...who5To19BmiForAge
];

export const findImportedWhoBmiForAge5To19Record = (
  params: FindLmsRecordParams
): WhoLmsRecord | undefined =>
  findLmsRecord(params, whoBmiForAge5To19LmsRecords);

export const calculateWhoGrowthWithBmiForAge5To19Data = (
  input: WhoGrowthInput
) =>
  calculateWhoGrowth(input, {
    dataStatus: whoBmiForAge5To19DataStatus,
    lmsRecords: whoBmiForAge5To19LmsRecords
  });
