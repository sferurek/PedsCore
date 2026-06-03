export type WhoGrowthSex = "male" | "female";

export type WhoGrowthMeasurementMode =
  | "recumbent_length"
  | "standing_height";

export type WhoGrowthIndicator =
  | "weight_for_age"
  | "length_height_for_age"
  | "head_circumference_for_age"
  | "weight_for_length"
  | "weight_for_height"
  | "bmi_for_age";

export interface WhoGrowthInput {
  sex: WhoGrowthSex;
  dateOfBirth?: string;
  ageMonths?: number;
  measurementDate?: string;
  weightKg?: number;
  heightCm?: number;
  lengthCm?: number;
  headCircumferenceCm?: number;
  measurementMode?: WhoGrowthMeasurementMode;
}

export interface WhoLmsRecord {
  indicator: WhoGrowthIndicator;
  sex: WhoGrowthSex;
  ageDays?: number;
  ageMonths?: number;
  measureCm?: number;
  L: number;
  M: number;
  S: number;
  source: string;
}

export interface WhoGrowthApplicableResult {
  indicator: WhoGrowthIndicator;
  label: string;
  value?: number;
  unit: string;
  zScore?: number;
  percentile?: number;
  ageRange: string;
  source: string;
  isApplicable: boolean;
  warning?: string;
}

export interface WhoGrowthResult {
  applicableResults: WhoGrowthApplicableResult[];
  warnings: string[];
  trace: Array<{
    inputId: string;
    value: unknown;
  }>;
}

export interface FindLmsRecordParams {
  indicator: WhoGrowthIndicator;
  sex: WhoGrowthSex;
  ageDays?: number | undefined;
  ageMonths?: number | undefined;
  measureCm?: number | undefined;
}
