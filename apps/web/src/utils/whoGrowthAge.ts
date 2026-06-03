import type { FormValues } from "./formState";
import type { Language } from "./language";

export type WhoGrowthAgeInputMode =
  | "dates"
  | "days_0_5"
  | "structured_0_5"
  | "months_5_19";

export interface ResolvedWhoGrowthAge {
  ageDays?: number;
  ageMonths?: number;
  isExact: boolean;
  label: string;
  mode: WhoGrowthAgeInputMode | "none";
  warning?: string;
}

const daysPerYear = 365.25;
const daysPerMonth = 365.25 / 12;
const maxWhoZeroToFiveDays = 1856;
const minWhoFiveToNineteenMonths = 61;
const maxWhoFiveToNineteenMonths = 228;

const asNumber = (value: unknown): number | undefined => {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : undefined;
  }

  return undefined;
};

const asString = (value: unknown): string | undefined =>
  typeof value === "string" && value.trim() ? value.trim() : undefined;

const isMode = (value: unknown): value is WhoGrowthAgeInputMode =>
  value === "dates" ||
  value === "days_0_5" ||
  value === "structured_0_5" ||
  value === "months_5_19";

const parseIsoDate = (value: string) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return null;
  }

  const date = new Date(`${value}T00:00:00.000Z`);
  return Number.isFinite(date.getTime()) ? date : null;
};

const copy = {
  es: {
    datesMissing: "Introduce fecha de nacimiento y fecha de medición.",
    invalidDate: "Las fechas deben usar formato YYYY-MM-DD.",
    measurementBeforeBirth:
      "La fecha de medición no puede ser anterior a la fecha de nacimiento.",
    datesOutOfRange:
      "La edad calculada por fechas supera 0-5 años. Para OMS 5-19 usa meses cumplidos.",
    daysMissing: "Introduce edad exacta en días para 0-5 años.",
    daysOutOfRange: "La edad en días debe estar entre 0 y 1856.",
    structuredMissing: "Introduce años, meses o días para edad estructurada 0-5.",
    structuredOutOfRange: "La edad estructurada convertida debe estar entre 0 y 1856 días.",
    structuredApprox:
      "La edad estructurada se convierte a días de forma aproximada. Para máxima precisión usa fechas.",
    monthsMissing: "Introduce edad en meses cumplidos para 5-19 años.",
    monthsOutOfRange: "La edad en meses cumplidos debe estar entre 61 y 228.",
    noMode: "Selecciona el modo de entrada de edad.",
    labels: {
      dates: (days: number) => `Fechas: ${days} días calculados`,
      days: (days: number) => `Edad exacta: ${days} días`,
      structured: (days: number) => `Edad estructurada: ${days} días calculados`,
      months: (months: number) => `Edad OMS 5-19: ${months} meses cumplidos`
    }
  },
  en: {
    datesMissing: "Enter date of birth and measurement date.",
    invalidDate: "Dates must use YYYY-MM-DD format.",
    measurementBeforeBirth:
      "Measurement date cannot be before date of birth.",
    datesOutOfRange:
      "Age calculated from dates is above 0-5 years. For WHO 5-19, use completed months.",
    daysMissing: "Enter exact age in days for 0-5 years.",
    daysOutOfRange: "Age in days must be between 0 and 1856.",
    structuredMissing: "Enter years, months or days for structured 0-5 age.",
    structuredOutOfRange: "Converted structured age must be between 0 and 1856 days.",
    structuredApprox:
      "Structured age is converted to days approximately. For maximum precision, use dates.",
    monthsMissing: "Enter completed age in months for 5-19 years.",
    monthsOutOfRange: "Completed months must be between 61 and 228.",
    noMode: "Select the age input mode.",
    labels: {
      dates: (days: number) => `Dates: ${days} calculated days`,
      days: (days: number) => `Exact age: ${days} days`,
      structured: (days: number) => `Structured age: ${days} calculated days`,
      months: (months: number) => `WHO 5-19 age: ${months} completed months`
    }
  }
} as const;

export const calculateAgeDaysFromDates = (
  dateOfBirth: string,
  measurementDate: string
) => {
  const birth = parseIsoDate(dateOfBirth);
  const measurement = parseIsoDate(measurementDate);

  if (!birth || !measurement) {
    throw new Error("invalid_date");
  }

  const ageDays = Math.floor(
    (measurement.getTime() - birth.getTime()) / (24 * 60 * 60 * 1000)
  );

  if (ageDays < 0) {
    throw new Error("measurement_before_birth");
  }

  return ageDays;
};

export const calculateAgeDaysFromStructuredAge = (
  years = 0,
  months = 0,
  days = 0
) => Math.round(years * daysPerYear + months * daysPerMonth + days);

export const resolveWhoGrowthAge = (
  values: FormValues,
  language: Language = "es"
): ResolvedWhoGrowthAge => {
  const t = copy[language];
  const selectedMode = values.who_age_input_mode;
  const mode = isMode(selectedMode) ? selectedMode : "none";

  if (mode === "none") {
    return {
      isExact: false,
      label: t.noMode,
      mode,
      warning: t.noMode
    };
  }

  if (mode === "dates") {
    const dateOfBirth = asString(values.date_of_birth);
    const measurementDate = asString(values.measurement_date);

    if (!dateOfBirth || !measurementDate) {
      return { isExact: true, label: t.datesMissing, mode, warning: t.datesMissing };
    }

    try {
      const ageDays = calculateAgeDaysFromDates(dateOfBirth, measurementDate);

      if (ageDays > maxWhoZeroToFiveDays) {
        return {
          isExact: true,
          label: t.labels.dates(ageDays),
          mode,
          warning: t.datesOutOfRange
        };
      }

      return {
        ageDays,
        isExact: true,
        label: t.labels.dates(ageDays),
        mode
      };
    } catch (error) {
      const warning = error instanceof Error && error.message === "measurement_before_birth"
        ? t.measurementBeforeBirth
        : t.invalidDate;

      return { isExact: true, label: warning, mode, warning };
    }
  }

  if (mode === "days_0_5") {
    const ageDays = asNumber(values.age_days);

    if (ageDays === undefined) {
      return { isExact: true, label: t.daysMissing, mode, warning: t.daysMissing };
    }

    if (ageDays < 0 || ageDays > maxWhoZeroToFiveDays) {
      return { isExact: true, label: t.labels.days(ageDays), mode, warning: t.daysOutOfRange };
    }

    return { ageDays, isExact: true, label: t.labels.days(ageDays), mode };
  }

  if (mode === "structured_0_5") {
    const years = asNumber(values.age_years_0_5) ?? 0;
    const months = asNumber(values.age_months_0_5) ?? 0;
    const days = asNumber(values.age_extra_days_0_5) ?? 0;
    const hasAnyValue =
      asNumber(values.age_years_0_5) !== undefined ||
      asNumber(values.age_months_0_5) !== undefined ||
      asNumber(values.age_extra_days_0_5) !== undefined;

    if (!hasAnyValue) {
      return {
        isExact: false,
        label: t.structuredMissing,
        mode,
        warning: t.structuredMissing
      };
    }

    const ageDays = calculateAgeDaysFromStructuredAge(years, months, days);

    if (ageDays < 0 || ageDays > maxWhoZeroToFiveDays) {
      return {
        isExact: false,
        label: t.labels.structured(ageDays),
        mode,
        warning: t.structuredOutOfRange
      };
    }

    return {
      ageDays,
      isExact: false,
      label: t.labels.structured(ageDays),
      mode,
      warning: t.structuredApprox
    };
  }

  const ageMonths = asNumber(values.age_months);

  if (ageMonths === undefined) {
    return { isExact: true, label: t.monthsMissing, mode, warning: t.monthsMissing };
  }

  if (
    ageMonths < minWhoFiveToNineteenMonths ||
    ageMonths > maxWhoFiveToNineteenMonths
  ) {
    return {
      isExact: true,
      label: t.labels.months(ageMonths),
      mode,
      warning: t.monthsOutOfRange
    };
  }

  return {
    ageMonths,
    isExact: true,
    label: t.labels.months(ageMonths),
    mode
  };
};

export const resolveWhoGrowthAgeSummary = (
  values: FormValues,
  language: Language = "es"
) => resolveWhoGrowthAge(values, language).label;
