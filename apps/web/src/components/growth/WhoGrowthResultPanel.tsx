import {
  calculateWhoGrowth,
  type WhoGrowthDataStatus,
  type WhoGrowthApplicableResult,
  type WhoGrowthIndicator,
  type WhoGrowthSex,
  type WhoLmsRecord
} from "@peds-core/core";
import { loadWhoLmsRecords } from "@peds-core/core/growth/who/loaders";
import { forwardRef, useEffect, useMemo, useState } from "react";
import type { FormValues } from "../../utils/formState";
import type { Language } from "../../utils/language";
import { WhoGrowthChart } from "./WhoGrowthChart";

interface WhoGrowthResultPanelProps {
  language: Language;
  values: FormValues;
}

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

interface LoadedWhoBmiData {
  records: readonly WhoLmsRecord[];
  dataStatus: WhoGrowthDataStatus;
}

interface DisplayIndicator {
  indicator: "weight_for_age" | "bmi_for_age";
  label: string;
  yAxisLabel: string;
}

interface ApplicableDisplayResult {
  display: DisplayIndicator;
  result: WhoGrowthApplicableResult & {
    percentile: number;
    value: number;
    zScore: number;
  };
}

const displayIndicators = {
  es: [
    {
      indicator: "weight_for_age",
      label: "Peso para la edad OMS 0-5",
      yAxisLabel: "Peso (kg)"
    },
    {
      indicator: "bmi_for_age",
      label: "BMI-for-age OMS 0-5",
      yAxisLabel: "BMI kg/m2"
    }
  ],
  en: [
    {
      indicator: "weight_for_age",
      label: "WHO weight-for-age 0-5",
      yAxisLabel: "Weight (kg)"
    },
    {
      indicator: "bmi_for_age",
      label: "WHO BMI-for-age 0-5",
      yAxisLabel: "BMI kg/m2"
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
  const [loadedData, setLoadedData] = useState<LoadedWhoBmiData | null>(null);
  const [loadingFailed, setLoadingFailed] = useState(false);
  const sex = values.sex;
  const resolvedSex = isSex(sex) ? sex : null;
  const ageDays = asNumber(values.age_days);
  const weightKg = asNumber(values.weight_kg);
  const statureCm = asNumber(values.stature_cm);
  const canCalculate =
    resolvedSex !== null &&
    ageDays !== undefined &&
    weightKg !== undefined;

  useEffect(() => {
    let isActive = true;

    Promise.all([
      loadWhoLmsRecords("bmi_for_age"),
      loadWhoLmsRecords("weight_for_age")
    ])
      .then(([bmiData, weightData]) => {
        if (isActive) {
          const importedIndicators = [
            ...new Set([
              ...bmiData.dataStatus.importedIndicators,
              ...weightData.dataStatus.importedIndicators
            ])
          ] as WhoGrowthIndicator[];

          setLoadedData({
            records: [...bmiData.records, ...weightData.records],
            dataStatus: {
              officialDataImported:
                bmiData.dataStatus.officialDataImported &&
                weightData.dataStatus.officialDataImported,
              reason:
                "WHO BMI-for-age and weight-for-age 0-5 years LMS data are normalized and verified. Other WHO indicators remain pending.",
              importedIndicators,
              allowedSources: bmiData.dataStatus.allowedSources,
              excludedSources: bmiData.dataStatus.excludedSources
            }
          });
          setLoadingFailed(false);
        }
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
        weightKg,
        heightCm: statureCm,
        measurementMode: "standing_height"
      },
      {
        dataStatus: loadedData.dataStatus,
        lmsRecords: loadedData.records
      }
    );
  }, [ageDays, canCalculate, loadedData, resolvedSex, statureCm, weightKg]);
  const copy = {
    es: {
      title: "Crecimiento OMS 0-5",
      pending: "Pendiente de cumplimentar sexo, edad exacta y peso para obtener resultados OMS. La talla/longitud permite calcular también BMI-for-age.",
      unavailable:
        "No hay indicadores OMS disponibles para estos datos. Revisa que la edad esté entre 0 y 1856 días y que las medidas sean válidas.",
      loading: "Cargando datos oficiales OMS...",
      loadError: "No se pudieron cargar los datos OMS.",
      print: "Imprimir gráfica",
      bmi: "IMC",
      weight: "Peso",
      percentile: "Percentil",
      zScore: "z-score",
      source:
        "Fuente: WHO Child Growth Standards 0-5 years. Datos OMS con licencia separada.",
      note:
        "Estos resultados son informativos y deben interpretarse junto con la valoración clínica, la evolución longitudinal y los protocolos locales."
    },
    en: {
      title: "WHO growth 0-5",
      pending: "Complete sex, exact age and weight to obtain WHO results. Length/height also enables BMI-for-age.",
      unavailable:
        "No WHO indicators are available for these data. Check age is between 0 and 1856 days and measurements are valid.",
      loading: "Loading official WHO data...",
      loadError: "WHO data could not be loaded.",
      print: "Print chart",
      bmi: "BMI",
      weight: "Weight",
      percentile: "Percentile",
      zScore: "z-score",
      source:
        "Source: WHO Child Growth Standards 0-5 years. WHO data under separate license.",
      note:
        "These results are informational and should be interpreted together with clinical assessment, longitudinal growth pattern and local protocols."
    }
  }[language];
  const applicableDisplayResults = displayIndicators[language]
    .map((display) => ({
      display,
      result: result?.applicableResults.find(
        (item): item is WhoGrowthApplicableResult =>
          item.indicator === display.indicator
      )
    }))
    .filter((item): item is ApplicableDisplayResult => {
      const itemResult = item.result;

      return Boolean(
        itemResult?.isApplicable &&
          itemResult.value !== undefined &&
          itemResult.zScore !== undefined &&
          itemResult.percentile !== undefined
      );
    });
  const hasResult =
    loadedData !== null &&
    applicableDisplayResults.length > 0 &&
    resolvedSex !== null &&
    ageDays !== undefined;

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

      {hasResult ? (
        <div className="who-growth-output">
          <div className="who-growth-metrics">
            {applicableDisplayResults.map(({ display, result: displayResult }) => (
              <div key={display.indicator}>
                <span>{display.label}</span>
                <strong>
                  {formatNumber(displayResult.value!)} {displayResult.unit} · P
                  {formatNumber(displayResult.percentile!, 1)} · z{" "}
                  {formatNumber(displayResult.zScore!, 2)}
                </strong>
              </div>
            ))}
          </div>
          <p className="who-growth-safe-note">{copy.note}</p>
          {applicableDisplayResults.map(({ display, result: displayResult }) => (
            <WhoGrowthChart
              ageDays={ageDays}
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
              yAxisLabel={display.yAxisLabel}
              zScore={displayResult.zScore!}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
});
