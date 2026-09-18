import type { CalculationResult, LocalizedText } from "../types.js";
import { calculateLmsZScore, zScoreToPercentile } from "../growth/who/index.js";
import { cdcWeightForAge } from "../growth/cdc/data/cdcWeightForAge.js";
import { cdcStatureForAge } from "../growth/cdc/data/cdcStatureForAge.js";
import { cdcBmiForAge } from "../growth/cdc/data/cdcBmiForAge.js";
import { getNumber, getTool, missingResult, warning } from "./common.js";
import type { CalculatorDefinition } from "./common.js";

type Sex = "male" | "female";
type Lms = { L: number; M: number; S: number };
type BmiLms = Lms & { p95: number; p97: number };

const round = (value: number, digits = 2) =>
  Math.round(value * 10 ** digits) / 10 ** digits;

const linear = (a: number, b: number, fraction: number) =>
  a + (b - a) * fraction;

const interpolateLms = (
  rows: readonly { sex: Sex; ageMonths: number; L: number; M: number; S: number }[],
  sex: Sex,
  ageMonths: number
): Lms | null => {
  const bySex = rows.filter((row) => row.sex === sex);
  if (bySex.length === 0) return null;

  const exact = bySex.find((row) => row.ageMonths === ageMonths);
  if (exact) return { L: exact.L, M: exact.M, S: exact.S };

  let lower: (typeof bySex)[number] | undefined;
  let upper: (typeof bySex)[number] | undefined;

  for (let i = 0; i < bySex.length - 1; i += 1) {
    const a = bySex[i];
    const b = bySex[i + 1];

    if (a && b && a.ageMonths <= ageMonths && b.ageMonths >= ageMonths) {
      lower = a;
      upper = b;
      break;
    }
  }

  if (!lower || !upper) return null;
  const span = upper.ageMonths - lower.ageMonths;
  if (span <= 0) return null;
  const f = (ageMonths - lower.ageMonths) / span;

  return {
    L: linear(lower.L, upper.L, f),
    M: linear(lower.M, upper.M, f),
    S: linear(lower.S, upper.S, f)
  };
};

const interpolateBmiLms = (
  sex: Sex,
  ageMonths: number
): BmiLms | null => {
  const bySex = cdcBmiForAge.filter((row) => row.sex === sex);
  const exact = bySex.find((row) => row.ageMonths === ageMonths);
  if (exact) return {
    L: exact.L,
    M: exact.M,
    S: exact.S,
    p95: exact.p95,
    p97: exact.p97
  };

  let lower: (typeof bySex)[number] | undefined;
  let upper: (typeof bySex)[number] | undefined;

  for (let i = 0; i < bySex.length - 1; i += 1) {
    const a = bySex[i];
    const b = bySex[i + 1];

    if (a && b && a.ageMonths <= ageMonths && b.ageMonths >= ageMonths) {
      lower = a;
      upper = b;
      break;
    }
  }

  if (!lower || !upper) return null;
  const span = upper.ageMonths - lower.ageMonths;
  if (span <= 0) return null;
  const f = (ageMonths - lower.ageMonths) / span;

  return {
    L: linear(lower.L, upper.L, f),
    M: linear(lower.M, upper.M, f),
    S: linear(lower.S, upper.S, f),
    p95: linear(lower.p95, upper.p95, f),
    p97: linear(lower.p97, upper.p97, f)
  };
};

const normalCdfPercent = (z: number) => zScoreToPercentile(z);

const extendedBmiPercentile = (
  bmi: number,
  p95: number,
  sex: Sex,
  ageMonths: number
) => {
  const ageYears = ageMonths / 12;
  const sigma =
    sex === "male"
      ? 0.3728 + 0.5196 * ageYears - 0.0091 * ageYears ** 2
      : 0.8334 + 0.3712 * ageYears - 0.0011 * ageYears ** 2;
  const sigmaRounded = round(sigma, 8);
  const standardized = (bmi - p95) / sigmaRounded;
  return Math.min(99.999999999, 90 + 10 * (normalCdfPercent(standardized) / 100));
};

const formatMetric = (
  labelEs: string,
  labelEn: string,
  value: number,
  unit: string,
  z: number,
  percentile: number
): LocalizedText => ({
  es: `${labelEs}: ${round(value, 2)} ${unit} · z ${round(z, 2)} · P${round(percentile, 1)}`,
  en: `${labelEn}: ${round(value, 2)} ${unit} · z ${round(z, 2)} · P${round(percentile, 1)}`
});

export const cdcGrowthPercentilesCalculator: CalculatorDefinition = {
  toolId: "cdc_growth_percentiles",
  calculate: (input): CalculationResult => {
    const tool = getTool("cdc-growth-percentiles");
    const required = ["sex", "age_months", "weight_kg", "height_cm"];

    for (const inputId of required) {
      if (input[inputId] === undefined || input[inputId] === null || input[inputId] === "") {
        return missingResult(tool.id, required);
      }
    }

    const sex = String(input.sex) as Sex;
    if (!["male", "female"].includes(sex)) {
      return {
        toolId: tool.id,
        warnings: [warning("invalid_sex", "Sexo no valido para las tablas CDC.", "Invalid sex for CDC growth charts.")],
        trace: [{ inputId: "sex", value: input.sex }]
      };
    }

    const ageMonths = getNumber(input, "age_months");
    const weightKg = getNumber(input, "weight_kg");
    const heightCm = getNumber(input, "height_cm");

    if (
      ageMonths === null || ageMonths < 24 || ageMonths >= 240 ||
      weightKg === null || weightKg <= 0 ||
      heightCm === null || heightCm <= 0
    ) {
      return {
        toolId: tool.id,
        warnings: [
          warning(
            "invalid_cdc_growth_input",
            "CDC 2000 se aplica en esta ficha desde 24 hasta menos de 240 meses; peso y talla deben ser positivos.",
            "This CDC 2000 tool applies from 24 to under 240 months; weight and stature must be positive."
          )
        ],
        trace: [
          { inputId: "age_months", value: input.age_months },
          { inputId: "weight_kg", value: input.weight_kg },
          { inputId: "height_cm", value: input.height_cm }
        ]
      };
    }

    const weightLms = interpolateLms(cdcWeightForAge, sex, ageMonths);
    const statureLms = interpolateLms(cdcStatureForAge, sex, ageMonths);
    const bmiLms = interpolateBmiLms(sex, ageMonths);

    if (!weightLms || !statureLms || !bmiLms) {
      return {
        toolId: tool.id,
        warnings: [warning("cdc_reference_unavailable", "No se encontro referencia CDC para esta edad.", "CDC reference data were not found for this age.")],
        trace: [{ inputId: "age_months", value: ageMonths }]
      };
    }

    const bmi = weightKg / (heightCm / 100) ** 2;
    const weightZ = calculateLmsZScore(weightKg, weightLms.L, weightLms.M, weightLms.S);
    const statureZ = calculateLmsZScore(heightCm, statureLms.L, statureLms.M, statureLms.S);
    const originalBmiZ = calculateLmsZScore(bmi, bmiLms.L, bmiLms.M, bmiLms.S);

    const weightPercentile = normalCdfPercent(weightZ);
    const staturePercentile = normalCdfPercent(statureZ);
    const originalBmiPercentile = normalCdfPercent(originalBmiZ);
    const useExtendedBmi = bmi > bmiLms.p95;
    const bmiPercentile = useExtendedBmi
      ? extendedBmiPercentile(bmi, bmiLms.p95, sex, ageMonths)
      : originalBmiPercentile;

    const metrics = [
      formatMetric("Peso/edad", "Weight-for-age", weightKg, "kg", weightZ, weightPercentile),
      formatMetric("Talla/edad", "Stature-for-age", heightCm, "cm", statureZ, staturePercentile),
      {
        es: `IMC/edad: ${round(bmi, 2)} kg/m² · ${useExtendedBmi ? "percentil extendido CDC 2022" : `z ${round(originalBmiZ, 2)}`} · P${round(bmiPercentile, 1)}`,
        en: `BMI-for-age: ${round(bmi, 2)} kg/m² · ${useExtendedBmi ? "CDC 2022 extended percentile" : `z ${round(originalBmiZ, 2)}`} · P${round(bmiPercentile, 1)}`
      }
    ];

    const warnings = [];
    if (useExtendedBmi) {
      warnings.push(
        warning(
          "cdc_extended_bmi_2022_used",
          "El IMC supera el P95 del CDC 2000; el percentil de IMC se calcula con el metodo extendido CDC 2022 para evitar extrapolar el LMS clasico en valores altos.",
          "BMI exceeds the CDC 2000 P95; BMI percentile is calculated with the CDC 2022 extended method to avoid extrapolating the classic LMS method at high values."
        )
      );
    }

    return {
      toolId: tool.id,
      label: { es: "Percentiles CDC", en: "CDC Growth Percentiles" },
      classification: {
        es: `CDC 2000, 2-<20 anos. ${metrics.map((item) => item.es).join(" · ")}`,
        en: `CDC 2000, ages 2-<20 years. ${metrics.map((item) => item.en).join(" · ")}`
      },
      criteriaMatched: metrics,
      warnings,
      trace: [
        { inputId: "sex", value: sex },
        { inputId: "age_months", value: ageMonths },
        { inputId: "weight_kg", value: weightKg },
        { inputId: "height_cm", value: heightCm },
        { inputId: "bmi", value: round(bmi, 4) },
        { inputId: "weight_z", value: round(weightZ, 6) },
        { inputId: "weight_percentile", value: round(weightPercentile, 6) },
        { inputId: "stature_z", value: round(statureZ, 6) },
        { inputId: "stature_percentile", value: round(staturePercentile, 6) },
        { inputId: "bmi_original_z", value: round(originalBmiZ, 6) },
        { inputId: "bmi_percentile", value: round(bmiPercentile, 6) },
        { inputId: "bmi_reference_method", value: useExtendedBmi ? "CDC 2022 extended" : "CDC 2000 LMS" }
      ]
    };
  }
};
