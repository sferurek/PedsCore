import type { FormValues } from "./formState";
import {
  resolveWhoGrowthAge,
  type WhoGrowthAgeInputMode
} from "./whoGrowthAge";

export const WHO_GROWTH_SEX_FIELD = "sex";
export const WHO_GROWTH_AGE_MODE_FIELD = "who_age_input_mode";

export const WHO_GROWTH_AGE_FIELDS_BY_MODE: Record<
  WhoGrowthAgeInputMode,
  readonly string[]
> = {
  dates: ["date_of_birth", "measurement_date"],
  days_0_5: ["age_days"],
  structured_0_5: [
    "age_years_0_5",
    "age_months_0_5",
    "age_extra_days_0_5"
  ],
  months_5_19: ["age_months"]
};

export const WHO_GROWTH_ANTHROPOMETRY_FIELDS = [
  "weight_kg",
  "stature_cm",
  "measurement_mode",
  "head_circumference_cm"
] as const;

const isSelectedAgeMode = (value: unknown): value is WhoGrowthAgeInputMode =>
  value === "dates" ||
  value === "days_0_5" ||
  value === "structured_0_5" ||
  value === "months_5_19";

const hasValue = (value: unknown) =>
  !(value === undefined || value === null || value === "");

export const hasWhoGrowthSex = (values: FormValues) => hasValue(values.sex);

export const getWhoGrowthAgeMode = (
  values: FormValues
): WhoGrowthAgeInputMode | null =>
  isSelectedAgeMode(values.who_age_input_mode)
    ? values.who_age_input_mode
    : null;

export const isWhoGrowthAgeResolved = (values: FormValues) => {
  const resolved = resolveWhoGrowthAge(values);
  return resolved.ageDays !== undefined || resolved.ageMonths !== undefined;
};

export const getVisibleWhoGrowthInputIds = (values: FormValues): string[] => {
  const visibleIds = [WHO_GROWTH_SEX_FIELD];

  if (!hasWhoGrowthSex(values)) {
    return visibleIds;
  }

  visibleIds.push(WHO_GROWTH_AGE_MODE_FIELD);

  const ageMode = getWhoGrowthAgeMode(values);
  if (!ageMode) {
    return visibleIds;
  }

  visibleIds.push(...WHO_GROWTH_AGE_FIELDS_BY_MODE[ageMode]);

  if (isWhoGrowthAgeResolved(values)) {
    visibleIds.push(...WHO_GROWTH_ANTHROPOMETRY_FIELDS);
  }

  return visibleIds;
};

export const isWhoGrowthInputVisible = (
  values: FormValues,
  inputId: string
) => getVisibleWhoGrowthInputIds(values).includes(inputId);

export const isWhoGrowthAgeModeUnlocked = (values: FormValues) =>
  hasWhoGrowthSex(values);

export const areWhoGrowthAnthropometryFieldsUnlocked = (values: FormValues) =>
  isWhoGrowthAgeResolved(values);

export const getNextWhoGrowthSection = (values: FormValues) => {
  if (!hasWhoGrowthSex(values)) {
    return "sex";
  }

  if (!getWhoGrowthAgeMode(values)) {
    return "age_mode";
  }

  if (!isWhoGrowthAgeResolved(values)) {
    return "age";
  }

  return "anthropometry";
};
