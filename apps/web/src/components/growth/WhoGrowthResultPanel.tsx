import {
  calculateWhoGrowth,
  type WhoGrowthApplicableResult,
  type WhoGrowthDataStatus,
  type WhoGrowthIndicator,
  type WhoGrowthMeasurementMode,
  type WhoGrowthSex,
  type WhoLmsRecord
} from "@peds-core/core";
import {
  loadWhoLmsRecords,
  type LoadWhoLmsRecordsOptions
} from "@peds-core/core/growth/who/loaders";
import { forwardRef, useEffect, useMemo, useState } from "react";
import type { FormValues } from "../../utils/formState";
import type { Language } from "../../utils/language";
import { WhoGrowthChart } from "./WhoGrowthChart";

interface WhoGrowthResultPanelProps {
  language: Language;
  values: FormValues;
}

interface LoadedIndicatorRequest {
  indicator: WhoGrowthIndicator;
  options?: LoadWhoLmsRecordsOptions;
}

const loadedIndicatorRequests: ReadonlyArray<LoadedIndicatorRequest> = [
  { indicator: "weight_for_age" },
  { indicator: "length_height_for_age" },
  { indicator: "head_circumference_for_age" },
  { indicator: "weight_for_length" },
  { indicator: "weight_for_height" },
  { indicator: "bmi_for_age" },
  { indicator: "bmi_for_age", options: { ageRange: "5_19" } },
  { indicator: "length_height_for_age", options: { ageRange: "5_19" } }
];

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

const isSex = (value: unknown): value is WhoGrowthSex =>
  value === "male" || value === "female";

const isMeasurementMode = (value: unknown): value is WhoGrowthMeasurementMode =>
  value === "recumbent_length" || value === "standing_height";

interface LoadedWhoData {
  records: readonly WhoLmsRecord[];
  dataStatus: WhoGrowthDataStatus;
}

interface DisplayIndicator {
  indicator: WhoGrowthIndicator;
  label: string;
  yAxisLabel: string;
  xAxisLabel: string;
  xUnit: string;
  getXValue: (params: {
    ageDays?: number;
    ageMonths?: number;
    result: WhoGrowthApplicableResult;
    statureCm?: number;
  }) => number | undefined;
}

interface DisplayResult {
  display: DisplayIndicator;
  result: WhoGrowthApplicableResult;
}

const displayIndicators = {
  es: [
    {
      indicator: "weight_for_age",
      label: "Peso para la edad OMS 0-5",
      yAxisLabel: "Peso (kg)",
      xAxisLabel: "Edad (meses)",
      xUnit: "meses",
      getXValue: ({ ageDays }) => ageDays
    },
    {
      indicator: "length_height_for_age",
      label: "Longitud/talla para la edad OMS",
      yAxisLabel: "Longitud/talla (cm)",
      xAxisLabel: "Edad (meses)",
      xUnit: "meses",
      getXValue: ({ ageDays, ageMonths, result }) =>
        result.source.includes("5-19") ? ageMonths : ageDays
    },
    {
      indicator: "head_circumference_for_age",
      label: "Perímetro cefálico para la edad OMS 0-5",
      yAxisLabel: "Perímetro cefálico (cm)",
      xAxisLabel: "Edad (meses)",
      xUnit: "meses",
      getXValue: ({ ageDays }) => ageDays
    },
    {
      indicator: "weight_for_length",
      label: "Peso para longitud OMS 0-2",
      yAxisLabel: "Peso (kg)",
      xAxisLabel: "Longitud (cm)",
      xUnit: "cm",
      getXValue: ({ statureCm }) => statureCm
    },
    {
      indicator: "weight_for_height",
      label: "Peso para talla OMS 2-5",
      yAxisLabel: "Peso (kg)",
      xAxisLabel: "Talla (cm)",
      xUnit: "cm",
      getXValue: ({ statureCm }) => statureCm
    },
    {
      indicator: "bmi_for_age",
      label: "BMI-for-age OMS",
      yAxisLabel: "BMI kg/m2",
      xAxisLabel: "Edad (meses)",
      xUnit: "meses",
      getXValue: ({ ageDays, ageMonths, result }) =>
        result.source.includes("5-19") ? ageMonths : ageDays
    }
  ],
  en: [
    {
      indicator: "weight_for_age",
      label: "WHO weight-for-age 0-5",
      yAxisLabel: "Weight (kg)",
      xAxisLabel: "Age (months)",
      xUnit: "months",
      getXValue: ({ ageDays }) => ageDays
    },
    {
      indicator: "length_height_for_age",
      label: "WHO length/height-for-age",
      yAxisLabel: "Length/height (cm)",
      xAxisLabel: "Age (months)",
      xUnit: "months",
      getXValue: ({ ageDays, ageMonths, result }) =>
        result.source.includes("5-19") ? ageMonths : ageDays
    },
    {
      indicator: "head_circumference_for_age",
      label: "WHO head circumference-for-age 0-5",
      yAxisLabel: "Head circumference (cm)",
      xAxisLabel: "Age (months)",
      xUnit: "months",
      getXValue: ({ ageDays }) => ageDays
    },
    {
      indicator: "weight_for_length",
      label: "WHO weight-for-length 0-2",
      yAxisLabel: "Weight (kg)",
      xAxisLabel: "Length (cm)",
      xUnit: "cm",
      getXValue: ({ statureCm }) => statureCm
    },
    {
      indicator: "weight_for_height",
      label: "WHO weight-for-height 2-5",
      yAxisLabel: "Weight (kg)",
      xAxisLabel: "Height (cm)",
      xUnit: "cm",
      getXValue: ({ statureCm }) => statureCm
    },
    {
      indicator: "bmi_for_age",
      label: "WHO BMI-for-age",
      yAxisLabel: "BMI kg/m2",
      xAxisLabel: "Age (months)",
      xUnit: "months",
      getXValue: ({ ageDays, ageMonths, result }) =>
        result.source.includes("5-19") ? ageMonths : ageDays
    }
  ]
} satisfies Record<Language, DisplayIndicator[]>;

const formatNumber = (value: number, fractionDigits = 2) =>
  new Intl.NumberFormat("es-ES", {
    maximumFractionDigits: fractionDigits,
    minimumFractionDigits: fractionDigits
  }).format(value);

export const WhoGrowthResultPanel = forwardRef<HTMLElement, WhoGrowthResultPanelProps>(
  function WhoGrowthResultPanel({ language, values }, ref) {
    const [loadedData, setLoadedData] = useState<LoadedWhoData | null>(null);
    const [loadingFailed, setLoadingFailed] = useState(false);
    const sex = values.sex;
    const resolvedSex = isSex(sex) ? sex : null;
    const ageDays = asNumber(values.age_days);
    const ageMonths = asNumber(values.age_months);
    const weightKg = asNumber(values.weight_kg);
    const statureCm = asNumber(values.stature_cm);
    const headCircumferenceCm = asNumber(values.head_circumference_cm);
    const measurementMode = isMeasurementMode(values.measurement_mode)
      ? values.measurement_mode
      : undefined;
    const lengthCm = measurementMode === "recumbent_length" ? statureCm : undefined;
    const heightCm = measurementMode === "standing_height" ? statureCm : undefined;
    const canCalculate =
      resolvedSex !== null &&
      (ageDays !== undefined || ageMonths !== undefined) &&
      weightKg !== undefined;

    useEffect(() => {
      let isActive = true;

      Promise.all(
        loadedIndicatorRequests.map(({ indicator, options }) =>
          loadWhoLmsRecords(indicator, options)
        )
      )
        .then((loadedIndicatorData) => {
          if (!isActive) {
            return;
          }

          const importedIndicators = [
            ...new Set(
              loadedIndicatorData.flatMap(
                (item) => item.dataStatus.importedIndicators
              )
            )
          ] as WhoGrowthIndicator[];
          const firstStatus = loadedIndicatorData[0].dataStatus;

          setLoadedData({
            records: loadedIndicatorData.flatMap((item) => [...item.records]),
            dataStatus: {
              officialDataImported: loadedIndicatorData.every(
                (item) => item.dataStatus.officialDataImported
              ),
              reason:
                "WHO 0-5 core LMS data and WHO Growth Reference 2007 BMI-for-age and height-for-age 5-19 LMS data are normalized and verified. Remaining WHO 5-19 indicators remain pending.",
              importedIndicators,
              allowedSources: firstStatus.allowedSources,
              excludedSources: firstStatus.excludedSources
            }
          });
          setLoadingFailed(false);
        })
        .catch(() => {
          if (isActive) {
            setLoadingFailed(true);
          }
        });

      return () => {
        isActive = false;
      };
    }, []);

    const result = useMemo(() => {
      if (!canCalculate || !loadedData) {
        return null;
      }

      return calculateWhoGrowth(
        {
          sex: resolvedSex,
          ageDays,
          ageMonths,
          weightKg,
          heightCm,
          lengthCm,
          headCircumferenceCm,
          measurementMode
        },
        {
          dataStatus: loadedData.dataStatus,
          lmsRecords: loadedData.records
        }
      );
    }, [
      ageDays,
      ageMonths,
      canCalculate,
      headCircumferenceCm,
      heightCm,
      lengthCm,
      loadedData,
      measurementMode,
      resolvedSex,
      weightKg
    ]);
    const copy = {
      es: {
        title: "Crecimiento OMS",
        pending:
          "Pendiente de cumplimentar sexo, una edad exacta OMS y peso para obtener resultados OMS. La longitud/talla y el perímetro cefálico activan indicadores adicionales.",
        unavailable:
          "No hay indicadores OMS disponibles para estos datos. Revisa que la edad 0-5 esté en días, que la edad 5-19 esté en meses cumplidos y que las medidas estén dentro del rango de la tabla OMS.",
        loading: "Cargando datos oficiales OMS...",
        loadError: "No se pudieron cargar los datos OMS.",
        print: "Imprimir gráficas",
        notApplicable: "No aplicable",
        percentile: "Percentil",
        zScore: "z-score",
        source:
          "Fuente: WHO Child Growth Standards 0-5 years y WHO Growth Reference 2007 5-19 years. Datos OMS con licencia separada.",
        note:
          "Estos resultados son informativos y deben interpretarse junto con la valoración clínica, la evolución longitudinal y los protocolos locales."
      },
      en: {
        title: "WHO growth",
        pending:
          "Complete sex, one exact WHO age and weight to obtain WHO results. Length/height and head circumference enable additional indicators.",
        unavailable:
          "No WHO indicators are available for these data. Check 0-5 age is entered in days, 5-19 age is entered in completed months and measurements are within the WHO table range.",
        loading: "Loading official WHO data...",
        loadError: "WHO data could not be loaded.",
        print: "Print charts",
        notApplicable: "Not applicable",
        percentile: "Percentile",
        zScore: "z-score",
        source:
          "Source: WHO Child Growth Standards 0-5 years and WHO Growth Reference 2007 5-19 years. WHO data under separate license.",
        note:
          "These results are informational and should be interpreted together with clinical assessment, longitudinal growth pattern and local protocols."
      }
    }[language];
    const displayResults: DisplayResult[] = displayIndicators[language].map(
      (display) => ({
        display,
        result:
          result?.applicableResults.find(
            (item) => item.indicator === display.indicator
          ) ?? {
            indicator: display.indicator,
            label: display.label,
            unit: "",
            ageRange: "WHO indicator-specific range",
            source: "WHO official data pending",
            isApplicable: false,
            warning: copy.pending
          }
      })
    );
    const applicableDisplayResults = displayResults.filter(
      ({ result: itemResult }) =>
        itemResult.isApplicable &&
        itemResult.value !== undefined &&
        itemResult.zScore !== undefined &&
        itemResult.percentile !== undefined
    );
    const hasResult =
      loadedData !== null &&
      applicableDisplayResults.length > 0 &&
      resolvedSex !== null &&
      (ageDays !== undefined || ageMonths !== undefined);

    return (
      <section className="content-panel result-panel who-growth-result-panel" ref={ref}>
        <div className="who-growth-result-header">
          <div>
            <h2>{copy.title}</h2>
            <p>{copy.source}</p>
          </div>
          {hasResult ? (
            <button className="print-chart-button no-print" type="button" onClick={() => window.print()}>
              {copy.print}
            </button>
          ) : null}
        </div>

        {!canCalculate ? <p className="inactive-calculation">{copy.pending}</p> : null}
        {canCalculate && !loadedData && !loadingFailed ? (
          <p className="inactive-calculation">{copy.loading}</p>
        ) : null}
        {canCalculate && loadingFailed ? (
          <p className="inactive-calculation">{copy.loadError}</p>
        ) : null}
        {canCalculate && loadedData && !hasResult ? (
          <p className="inactive-calculation">{copy.unavailable}</p>
        ) : null}

        {canCalculate && loadedData ? (
          <div className="who-growth-output">
            <div className="who-growth-metrics">
              {displayResults.map(({ display, result: displayResult }) => (
                <div
                  className={displayResult.isApplicable ? undefined : "who-growth-metric-inactive"}
                  key={display.indicator}
                >
                  <span>{display.label}</span>
                  {displayResult.isApplicable &&
                  displayResult.value !== undefined &&
                  displayResult.percentile !== undefined &&
                  displayResult.zScore !== undefined ? (
                    <strong>
                      {formatNumber(displayResult.value)} {displayResult.unit} · P
                      {formatNumber(displayResult.percentile, 1)} · z{" "}
                      {formatNumber(displayResult.zScore, 2)}
                    </strong>
                  ) : (
                    <strong>{copy.notApplicable}</strong>
                  )}
                  {displayResult.warning ? <small>{displayResult.warning}</small> : null}
                </div>
              ))}
            </div>
            <p className="who-growth-safe-note">{copy.note}</p>
            {applicableDisplayResults.map(({ display, result: displayResult }) => {
              const xValue = display.getXValue({
                ageDays,
                ageMonths,
                result: displayResult,
                statureCm
              });

              if (xValue === undefined) {
                return null;
              }

              return (
                <WhoGrowthChart
                  indicatorLabel={display.label}
                  key={display.indicator}
                  language={language}
                  percentile={displayResult.percentile!}
                  records={loadedData.records.filter(
                    (record) => record.indicator === display.indicator
                  )}
                  sex={resolvedSex!}
                  source={
                    language === "es"
                      ? `Fuente: ${displayResult.source}. Datos OMS con licencia separada.`
                      : `Source: ${displayResult.source}. WHO data under separate license.`
                  }
                  unit={displayResult.unit}
                  value={displayResult.value!}
                  xAxisLabel={display.xAxisLabel}
                  xUnit={display.xUnit}
                  xValue={xValue}
                  yAxisLabel={display.yAxisLabel}
                  zScore={displayResult.zScore!}
                />
              );
            })}
          </div>
        ) : null}
      </section>
    );
  }
);
