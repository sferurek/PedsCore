import type { WhoLmsRecord } from "../types.js";
import {
  who0To5BmiForAge,
  who0To5BmiForAgeSource
} from "./who_0_5_bmi_for_age.js";

export { who0To5BmiForAge, who0To5BmiForAgeSource };

export const whoGrowthDataStatus = {
  officialDataImported: true,
  reason:
    "WHO BMI-for-age 0-5 years LMS data are normalized and verified. Other WHO indicators remain pending.",
  importedIndicators: ["bmi_for_age"],
  allowedSources: [
    "WHO Child Growth Standards",
    "WHO Growth Reference 5-19 years"
  ],
  excludedSources: ["CDC", "Orbegozo"]
} as const;

export const whoLmsRecords: WhoLmsRecord[] = [...who0To5BmiForAge];
