import { whoGrowthDataStatus, whoLmsRecords } from "./data/index.js";
import type {
  FindLmsRecordParams,
  WhoGrowthApplicableResult,
  WhoGrowthIndicator,
  WhoGrowthInput,
  WhoGrowthResult,
  WhoLmsRecord
} from "./types.js";

export * from "./types.js";
export {
  who0To5BmiForAge,
  who0To5BmiForAgeSource,
  whoGrowthDataStatus,
  whoLmsRecords
} from "./data/index.js";

const millisecondsPerDay = 24 * 60 * 60 * 1000;
const averageDaysPerMonth = 365.25 / 12;
const officialDataPendingWarning =
  "Official WHO LMS data are not yet imported and verified in PedsCore.";

const parseDate = (value: string, fieldName: string): Date => {
  const date = new Date(`${value}T00:00:00.000Z`);

  if (!Number.isFinite(date.getTime())) {
    throw new Error(`${fieldName} must be a valid ISO date.`);
  }

  return date;
};

const assertPositiveNumber = (value: number, fieldName: string) => {
  if (!Number.isFinite(value) || value <= 0) {
    throw new Error(`${fieldName} must be a positive number.`);
  }
};

export const calculateAgeInDays = (
  dateOfBirth: string,
  measurementDate: string
) => {
  const birth = parseDate(dateOfBirth, "dateOfBirth");
  const measurement = parseDate(measurementDate, "measurementDate");
  const ageDays = Math.floor(
    (measurement.getTime() - birth.getTime()) / millisecondsPerDay
  );

  if (ageDays < 0) {
    throw new Error("measurementDate must be on or after dateOfBirth.");
  }

  return ageDays;
};

export const calculateAgeInMonths = (
  dateOfBirth: string,
  measurementDate: string
) => calculateAgeInDays(dateOfBirth, measurementDate) / averageDaysPerMonth;

export const calculateBmi = (weightKg: number, heightCm: number) => {
  assertPositiveNumber(weightKg, "weightKg");
  assertPositiveNumber(heightCm, "heightCm");

  const heightMeters = heightCm / 100;
  return weightKg / heightMeters ** 2;
};

export const calculateLmsZScore = (
  value: number,
  L: number,
  M: number,
  S: number
) => {
  assertPositiveNumber(value, "value");
  assertPositiveNumber(M, "M");
  assertPositiveNumber(S, "S");

  if (L === 0) {
    return Math.log(value / M) / S;
  }

  return ((value / M) ** L - 1) / (L * S);
};

const erf = (x: number) => {
  const sign = x < 0 ? -1 : 1;
  const absX = Math.abs(x);
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;
  const t = 1 / (1 + p * absX);
  const y =
    1 -
    (((((a5 * t + a4) * t + a3) * t + a2) * t + a1) *
      t *
      Math.exp(-absX * absX));

  return sign * y;
};

export const zScoreToPercentile = (z: number) => {
  if (!Number.isFinite(z)) {
    throw new Error("z must be a finite number.");
  }

  return 0.5 * (1 + erf(z / Math.SQRT2)) * 100;
};

export const findLmsRecord = ({
  indicator,
  sex,
  ageDays,
  ageMonths,
  measureCm
}: FindLmsRecordParams): WhoLmsRecord | undefined =>
  whoLmsRecords.find((record) => {
    if (record.indicator !== indicator || record.sex !== sex) {
      return false;
    }

    if (ageDays !== undefined && record.ageDays !== undefined) {
      return record.ageDays === ageDays;
    }

    if (ageMonths !== undefined && record.ageMonths !== undefined) {
      return record.ageMonths === ageMonths;
    }

    if (measureCm !== undefined && record.measureCm !== undefined) {
      return record.measureCm === measureCm;
    }

    return false;
  });

const buildResult = (
  indicator: WhoGrowthIndicator,
  label: string,
  value: number | undefined,
  unit: string,
  ageRange: string,
  record: WhoLmsRecord | undefined
): WhoGrowthApplicableResult => {
  if (value === undefined) {
    return {
      indicator,
      label,
      unit,
      ageRange,
      source: "WHO official data pending",
      isApplicable: false,
      warning: "Required measurement is missing."
    };
  }

  if (!record) {
    return {
      indicator,
      label,
      value,
      unit,
      ageRange,
      source: "WHO official data pending",
      isApplicable: false,
      warning: officialDataPendingWarning
    };
  }

  const zScore = calculateLmsZScore(value, record.L, record.M, record.S);

  return {
    indicator,
    label,
    value,
    unit,
    zScore,
    percentile: zScoreToPercentile(zScore),
    ageRange,
    source: record.source,
    isApplicable: true
  };
};

export const calculateWhoGrowth = (input: WhoGrowthInput): WhoGrowthResult => {
  const warnings: string[] = [];
  const trace = Object.entries(input).map(([inputId, value]) => ({
    inputId,
    value
  }));
  const ageDays =
    input.dateOfBirth && input.measurementDate
      ? calculateAgeInDays(input.dateOfBirth, input.measurementDate)
      : undefined;
  const ageMonths =
    input.dateOfBirth && input.measurementDate
      ? calculateAgeInMonths(input.dateOfBirth, input.measurementDate)
      : input.ageMonths;
  const statureCm = input.lengthCm ?? input.heightCm;
  const bmi =
    input.weightKg !== undefined && statureCm !== undefined
      ? calculateBmi(input.weightKg, statureCm)
      : undefined;

  if (!whoGrowthDataStatus.officialDataImported) {
    warnings.push(officialDataPendingWarning);
  } else if (whoGrowthDataStatus.importedIndicators.length < 6) {
    warnings.push(
      "Only WHO BMI-for-age 0-5 years data are imported. Other WHO indicators remain pending."
    );
  }

  const applicableResults = [
    buildResult(
      "weight_for_age",
      "Weight-for-age",
      input.weightKg,
      "kg",
      "WHO indicator-specific range",
      findLmsRecord({
        indicator: "weight_for_age",
        sex: input.sex,
        ageDays,
        ageMonths
      })
    ),
    buildResult(
      "length_height_for_age",
      "Length/height-for-age",
      statureCm,
      "cm",
      "WHO indicator-specific range",
      findLmsRecord({
        indicator: "length_height_for_age",
        sex: input.sex,
        ageDays,
        ageMonths
      })
    ),
    buildResult(
      "head_circumference_for_age",
      "Head circumference-for-age",
      input.headCircumferenceCm,
      "cm",
      "WHO indicator-specific range",
      findLmsRecord({
        indicator: "head_circumference_for_age",
        sex: input.sex,
        ageDays,
        ageMonths
      })
    ),
    buildResult(
      "weight_for_length",
      "Weight-for-length",
      input.weightKg,
      "kg",
      "WHO 0-5 years indicator-specific range",
      findLmsRecord({
        indicator: "weight_for_length",
        sex: input.sex,
        measureCm: input.lengthCm
      })
    ),
    buildResult(
      "weight_for_height",
      "Weight-for-height",
      input.weightKg,
      "kg",
      "WHO 0-5 years indicator-specific range",
      findLmsRecord({
        indicator: "weight_for_height",
        sex: input.sex,
        measureCm: input.heightCm
      })
    ),
    buildResult(
      "bmi_for_age",
      "BMI-for-age",
      bmi,
      "kg/m2",
      "WHO indicator-specific range",
      findLmsRecord({
        indicator: "bmi_for_age",
        sex: input.sex,
        ageDays,
        ageMonths
      })
    )
  ];

  return {
    applicableResults,
    warnings,
    trace
  };
};
