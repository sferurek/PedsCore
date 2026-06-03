import {
  calculateWhoGrowth,
  findLmsRecord
} from "./index.js";
import type {
  FindLmsRecordParams,
  WhoGrowthInput,
  WhoLmsRecord
} from "./types.js";
import {
  who0To5BmiForAge,
  who0To5BmiForAgeSource,
  whoGrowthDataStatus,
  whoLmsRecords
} from "./data/index.js";

export {
  who0To5BmiForAge,
  who0To5BmiForAgeSource,
  whoGrowthDataStatus,
  whoLmsRecords
};

export const findImportedWhoLmsRecord = (
  params: FindLmsRecordParams
): WhoLmsRecord | undefined => findLmsRecord(params, whoLmsRecords);

export const calculateWhoGrowthWithImportedData = (input: WhoGrowthInput) =>
  calculateWhoGrowth(input, {
    dataStatus: whoGrowthDataStatus,
    lmsRecords: whoLmsRecords
  });
