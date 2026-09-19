import { calculateWhoGrowth, findLmsRecord } from "./index.js";
import type { FindLmsRecordParams, WhoGrowthDataStatus, WhoGrowthInput, WhoLmsRecord } from "./types.js";
import { who5To10WeightForAge, who5To10WeightForAgeSource } from "./data/who_5_10_weight_for_age.js";

export { who5To10WeightForAge, who5To10WeightForAgeSource };

export const whoWeightForAge5To10DataStatus: WhoGrowthDataStatus = {
  officialDataImported: true,
  reason: "WHO Growth Reference 2007 weight-for-age 5-10 years LMS data are normalized and verified.",
  importedIndicators: ["weight_for_age"],
  allowedSources: ["WHO Child Growth Standards", "WHO Growth Reference 5-19 years"],
  excludedSources: ["CDC", "Orbegozo"]
} as const;

export const whoWeightForAge5To10LmsRecords: WhoLmsRecord[] = [...who5To10WeightForAge];

export const findImportedWhoWeightForAge5To10Record = (params: FindLmsRecordParams) =>
  findLmsRecord(params, whoWeightForAge5To10LmsRecords);

export const calculateWhoGrowthWithWeightForAge5To10Data = (input: WhoGrowthInput) =>
  calculateWhoGrowth(input, { dataStatus: whoWeightForAge5To10DataStatus, lmsRecords: whoWeightForAge5To10LmsRecords });
