import type { CalculationResult } from "../types.js";
import { getNumber, getTool, label, warning } from "./common.js";
import type { CalculatorDefinition } from "./common.js";
import {
  cdcBmiLms,
  cdcStatureLms,
  cdcWeightLms,
  type CdcLmsRow
} from "../data/cdcGrowthLms.js";

type SexCode = 1 | 2;
type Lms = { L: number; M: number; S: number };

const normalCdf = (z: number): number => {
  const sign = z < 0 ? -1 : 1;
  const x = Math.abs(z) / Math.sqrt(2);
  const t = 1 / (1 + 0.3275911 * x);
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const erf =
    1 -
    (((((a5 * t + a4) * t + a3) * t + a2) * t + a1) *
      t *
      Math.exp(-x * x));
  return 0.5 * (1 + sign * erf);
};

// Peter J. Acklam inverse-normal approximation; sufficient for growth-chart display.
const inverseNormalCdf = (p: number): number => {
  if (p <= 0) return Number.NEGATIVE_INFINITY;
  if (p >= 1) return Number.POSITIVE_INFINITY;

  const a = [
    -3.969683028665376e1,
    2.209460984245205e2,
    -2.759285104469687e2,
    1.38357751867269e2,
    -3.066479806614716e1,
    2.506628277459239
  ];
  const b = [
    -5.447609879822406e1,
    1.615858368580409e2,
    -1.556989798598866e2,
    6.680131188771972e1,
    -1.328068155288572e1
  ];
  const c = [
    -7.784894002430293e-3,
    -3.223964580411365e-1,
    -2.400758277161838,
    -2.549732539343734,
    4.374664141464968,
    2.938163982698783
  ];
  const d = [
    7.784695709041462e-3,
    3.224671290700398e-1,
    2.445134137142996,
    3.754408661907416
  ];

  const plow = 0.02425;
  const phigh = 1 - plow;

  if (p < plow) {
    const q = Math.sqrt(-2 * Math.log(p));
    return (
      (((((c[0]! * q + c[1]!) * q + c[2]!) * q + c[3]!) * q + c[4]!) * q +
        c[5]!) /
      ((((d[0]! * q + d[1]!) * q + d[2]!) * q + d[3]!) * q + 1)
    );
  }

  if (p > phigh) {
    const q = Math.sqrt(-2 * Math.log(1 - p));
    return -(
      (((((c[0]! * q + c[1]!) * q + c[2]!) * q + c[3]!) * q + c[4]!) * q +
        c[5]!) /
      ((((d[0]! * q + d[1]!) * q + d[2]!) * q + d[3]!) * q + 1)
    );
  }

  const q = p - 0.5;
  const r = q * q;
  return (
    (((((a[0]! * r + a[1]!) * r + a[2]!) * r + a[3]!) * r + a[4]!) * r +
      a[5]!) *
    q /
    (((((b[0]! * r + b[1]!) * r + b[2]!) * r + b[3]!) * r + b[4]!) * r +
      1)
  );
};

const lmsZ = (x: number, { L, M, S }: Lms): number =>
  Math.abs(L) < 1e-12
    ? Math.log(x / M) / S
    : (Math.pow(x / M, L) - 1) / (L * S);

const lmsValue = (z: number, { L, M, S }: Lms): number =>
  Math.abs(L) < 1e-12 ? M * Math.exp(S * z) : M * Math.pow(1 + L * S * z, 1 / L);

export const interpolateCdcLms = (
  rows: CdcLmsRow[],
  sex: SexCode,
  ageMonths: number
): Lms | null => {
  const subset = rows.filter((row) => row[0] === sex);
  if (
    !subset.length ||
    ageMonths < subset[0]![1] ||
    ageMonths > subset[subset.length - 1]![1]
  ) {
    return null;
  }

  let lo = subset[0]!;
  let hi = subset[subset.length - 1]!;

  for (let i = 0; i < subset.length; i += 1) {
    const row = subset[i]!;
    if (row[1] === ageMonths) {
      lo = row;
      hi = row;
      break;
    }
    if (row[1] < ageMonths) lo = row;
    if (row[1] > ageMonths) {
      hi = row;
      break;
    }
  }

  if (lo[1] === hi[1]) {
    return { L: lo[2], M: lo[3], S: lo[4] };
  }

  const t = (ageMonths - lo[1]) / (hi[1] - lo[1]);
  return {
    L: lo[2] + (hi[2] - lo[2]) * t,
    M: lo[3] + (hi[3] - lo[3]) * t,
    S: lo[4] + (hi[4] - lo[4]) * t
  };
};

const percentile = (z: number): number =>
  Number((normalCdf(z) * 100).toFixed(1));

const roundedZ = (z: number): number => Number(z.toFixed(2));

const extendedBmiSigma = (sex: SexCode, ageMonths: number): number => {
  const ageYears = ageMonths / 12;
  return sex === 1
    ? 0.3728 + 0.5196 * ageYears - 0.0091 * ageYears ** 2
    : 0.8334 + 0.3712 * ageYears - 0.0011 * ageYears ** 2;
};

const extendedBmiMetrics = (
  bmi: number,
  bmiLms: Lms,
  sex: SexCode,
  ageMonths: number
) => {
  const originalZ = lmsZ(bmi, bmiLms);
  const originalPercentile = normalCdf(originalZ) * 100;
  const z95 = 1.6448536269514722;
  const p95 = lmsValue(z95, bmiLms);

  if (bmi <= p95) {
    return {
      z: originalZ,
      percentile: originalPercentile,
      originalZ,
      originalPercentile,
      p95,
      sigma: undefined,
      extended: false
    };
  }

  const sigma = extendedBmiSigma(sex, ageMonths);
  const extendedPercentile =
    90 + 10 * normalCdf((bmi - p95) / sigma);
  const boundedProbability = Math.min(
    0.9999999999999999,
    Math.max(1e-12, extendedPercentile / 100)
  );

  return {
    z: inverseNormalCdf(boundedProbability),
    percentile: extendedPercentile,
    originalZ,
    originalPercentile,
    p95,
    sigma,
    extended: true
  };
};

export const cdcGrowthPercentilesCalculator: CalculatorDefinition = {
  toolId: "cdc_growth_percentiles",
  calculate: (input): CalculationResult => {
    const tool = getTool("cdc-growth-percentiles");
    const ageMonths = getNumber(input, "age_months");
    const weightKg = getNumber(input, "weight_kg");
    const statureCm = getNumber(input, "stature_cm");
    const sexRaw = input.sex;

    if (
      ageMonths === null ||
      weightKg === null ||
      statureCm === null ||
      (sexRaw !== "male" && sexRaw !== "female")
    ) {
      return {
        toolId: tool.id,
        warnings: [
          warning(
            "missing_cdc_inputs",
            "Introduce sexo, edad exacta en meses, peso y talla para calcular percentiles CDC.",
            "Enter sex, exact age in months, weight, and stature to calculate CDC percentiles."
          )
        ],
        trace: []
      };
    }

    if (
      ageMonths < 24 ||
      ageMonths > 240 ||
      weightKg <= 0 ||
      statureCm <= 0
    ) {
      return {
        toolId: tool.id,
        warnings: [
          warning(
            "cdc_scope",
            "Esta implementación usa las curvas CDC recomendadas para 2-20 años. Para menores de 2 años, CDC recomienda las curvas OMS.",
            "This implementation uses the CDC charts recommended for ages 2-20 years. For children under 2 years, CDC recommends WHO growth charts."
          )
        ],
        trace: []
      };
    }

    const sex: SexCode = sexRaw === "male" ? 1 : 2;
    const weightLms = interpolateCdcLms(cdcWeightLms, sex, ageMonths);
    const statureLms = interpolateCdcLms(cdcStatureLms, sex, ageMonths);
    const bmiLms = interpolateCdcLms(cdcBmiLms, sex, ageMonths);

    if (!weightLms || !statureLms || !bmiLms) {
      return {
        toolId: tool.id,
        warnings: [
          warning(
            "cdc_reference_missing",
            "No se pudo resolver el punto LMS oficial para esta edad.",
            "The official LMS reference point could not be resolved for this age."
          )
        ],
        trace: []
      };
    }

    const bmi = weightKg / Math.pow(statureCm / 100, 2);
    const weightZ = lmsZ(weightKg, weightLms);
    const statureZ = lmsZ(statureCm, statureLms);
    const bmiMetrics = extendedBmiMetrics(bmi, bmiLms, sex, ageMonths);

    const weightPercentile = percentile(weightZ);
    const staturePercentile = percentile(statureZ);
    const bmiPercentile = Number(bmiMetrics.percentile.toFixed(1));
    const bmiZ = roundedZ(bmiMetrics.z);
    const percentOfP95 = (bmi / bmiMetrics.p95) * 100;
    const severeObesity = bmi >= 35 || percentOfP95 >= 120;

    const bmiClass =
      bmiPercentile < 5
        ? label(
            "Bajo peso por IMC/edad (<P5)",
            "Underweight by BMI-for-age (<P5)"
          )
        : bmiPercentile < 85
          ? label(
              "Peso saludable por IMC/edad (P5 a <P85)",
              "Healthy weight by BMI-for-age (P5 to <P85)"
            )
          : bmiPercentile < 95
            ? label(
                "Sobrepeso por IMC/edad (P85 a <P95)",
                "Overweight by BMI-for-age (P85 to <P95)"
              )
            : severeObesity
              ? label(
                  "Obesidad grave por criterios CDC",
                  "Severe obesity by CDC criteria"
                )
              : label(
                  "Obesidad por IMC/edad (>=P95)",
                  "Obesity by BMI-for-age (>=P95)"
                );

    return {
      toolId: tool.id,
      value: bmiPercentile,
      unit: "percentil",
      label: label(
        bmiMetrics.extended
          ? "Percentil CDC Extended de IMC para la edad"
          : "Percentil CDC de IMC para la edad",
        bmiMetrics.extended
          ? "CDC Extended BMI-for-age percentile"
          : "CDC BMI-for-age percentile"
      ),
      classification: bmiClass,
      criteriaMatched: [
        label(
          `Peso/edad: P${weightPercentile} (z ${roundedZ(weightZ)})`,
          `Weight-for-age: P${weightPercentile} (z ${roundedZ(weightZ)})`
        ),
        label(
          `Talla/edad: P${staturePercentile} (z ${roundedZ(statureZ)})`,
          `Stature-for-age: P${staturePercentile} (z ${roundedZ(statureZ)})`
        ),
        label(
          `${bmiMetrics.extended ? "IMC/edad CDC Extended" : "IMC/edad"}: P${bmiPercentile} (z ${bmiZ}), IMC ${bmi.toFixed(1)} kg/m²`,
          `${bmiMetrics.extended ? "CDC Extended BMI-for-age" : "BMI-for-age"}: P${bmiPercentile} (z ${bmiZ}), BMI ${bmi.toFixed(1)} kg/m²`
        ),
        ...(bmiPercentile >= 95
          ? [
              label(
                `IMC = ${percentOfP95.toFixed(0)}% del P95 CDC`,
                `BMI = ${percentOfP95.toFixed(0)}% of the CDC 95th percentile`
              )
            ]
          : [])
      ],
      warnings: [
        warning(
          "cdc_reference_context",
          "Referencia CDC para población pediátrica de EE. UU.; no debe usarse como único criterio diagnóstico. CDC recomienda OMS por debajo de 2 años.",
          "CDC reference for the U.S. pediatric population; growth charts should not be used as the sole diagnostic criterion. CDC recommends WHO charts under age 2."
        ),
        ...(bmiMetrics.extended
          ? [
              warning(
                "cdc_extended_bmi_used",
                "El IMC supera el P95 y se ha aplicado el método CDC Extended BMI 2022 para el percentil y z-score de IMC.",
                "BMI is above the 95th percentile, so the 2022 CDC Extended BMI method was used for BMI percentile and z-score."
              )
            ]
          : [])
      ],
      trace: [
        { inputId: "age_months", value: ageMonths },
        { inputId: "sex", value: sexRaw },
        { inputId: "weight_kg", value: weightKg },
        { inputId: "stature_cm", value: statureCm },
        { inputId: "weight_z", value: roundedZ(weightZ) },
        { inputId: "weight_percentile", value: weightPercentile },
        { inputId: "stature_z", value: roundedZ(statureZ) },
        { inputId: "stature_percentile", value: staturePercentile },
        { inputId: "bmi", value: Number(bmi.toFixed(2)) },
        { inputId: "bmi_p95", value: Number(bmiMetrics.p95.toFixed(4)) },
        { inputId: "bmi_percent_of_p95", value: Number(percentOfP95.toFixed(1)) },
        { inputId: "bmi_z", value: bmiZ },
        { inputId: "bmi_percentile", value: bmiPercentile },
        { inputId: "bmi_method", value: bmiMetrics.extended ? "cdc_extended_2022" : "cdc_2000_lms" },
        ...(bmiMetrics.sigma !== undefined
          ? [{ inputId: "extended_bmi_sigma", value: Number(bmiMetrics.sigma.toFixed(4)) }]
          : [])
      ]
    };
  }
};
