import {
  calculateWhoGrowth,
  type WhoGrowthDataStatus,
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
  const ageDays = asNumber(values.age_days);
  const weightKg = asNumber(values.weight_kg);
  const statureCm = asNumber(values.stature_cm);
  const canCalculate =
    isSex(sex) &&
    ageDays !== undefined &&
    weightKg !== undefined &&
    statureCm !== undefined;

  useEffect(() => {
    let isActive = true;

    loadWhoLmsRecords("bmi_for_age")
      .then((data) => {
        if (isActive) {
          setLoadedData({
            records: data.records,
            dataStatus: data.dataStatus
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
        sex,
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
  }, [ageDays, canCalculate, loadedData, sex, statureCm, weightKg]);

  const bmiForAge = result?.applicableResults.find(
    (item) => item.indicator === "bmi_for_age"
  );
  const hasResult =
    loadedData !== null &&
    bmiForAge?.isApplicable &&
    bmiForAge.value !== undefined &&
    bmiForAge.zScore !== undefined &&
    bmiForAge.percentile !== undefined &&
    isSex(sex) &&
    ageDays !== undefined;
  const copy = {
    es: {
      title: "BMI-for-age OMS 0-5",
      pending: "Pendiente de cumplimentar sexo, edad exacta, peso y longitud/talla para obtener el resultado BMI-for-age.",
      unavailable:
        "BMI-for-age no está disponible para estos datos. Revisa que la edad esté entre 0 y 1856 días y que peso/talla sean válidos.",
      loading: "Cargando datos oficiales OMS BMI-for-age...",
      loadError: "No se pudieron cargar los datos OMS BMI-for-age.",
      print: "Imprimir gráfica",
      bmi: "IMC",
      percentile: "Percentil",
      zScore: "z-score",
      source:
        "Fuente: WHO Child Growth Standards BMI-for-age 0-5 years. Datos OMS con licencia separada.",
      note:
        "Estos resultados son informativos y deben interpretarse junto con la valoración clínica, la evolución longitudinal y los protocolos locales."
    },
    en: {
      title: "WHO BMI-for-age 0-5",
      pending: "Complete sex, exact age, weight and length/height to obtain the BMI-for-age result.",
      unavailable:
        "BMI-for-age is not available for these data. Check age is between 0 and 1856 days and weight/height are valid.",
      loading: "Loading official WHO BMI-for-age data...",
      loadError: "WHO BMI-for-age data could not be loaded.",
      print: "Print chart",
      bmi: "BMI",
      percentile: "Percentile",
      zScore: "z-score",
      source:
        "Source: WHO Child Growth Standards BMI-for-age 0-5 years. WHO data under separate license.",
      note:
        "These results are informational and should be interpreted together with clinical assessment, longitudinal growth pattern and local protocols."
    }
  }[language];

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
            <div>
              <span>{copy.bmi}</span>
              <strong>{formatNumber(bmiForAge.value!)} kg/m2</strong>
            </div>
            <div>
              <span>{copy.percentile}</span>
              <strong>P{formatNumber(bmiForAge.percentile!, 1)}</strong>
            </div>
            <div>
              <span>{copy.zScore}</span>
              <strong>{formatNumber(bmiForAge.zScore!, 2)}</strong>
            </div>
          </div>
          <p className="who-growth-safe-note">{copy.note}</p>
          <WhoGrowthChart
            ageDays={ageDays}
            bmi={bmiForAge.value!}
            language={language}
            percentile={bmiForAge.percentile!}
            records={loadedData.records}
            sex={sex}
            zScore={bmiForAge.zScore!}
          />
        </div>
      ) : null}
    </section>
  );
});
