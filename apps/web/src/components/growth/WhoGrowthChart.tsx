import {
  calculateLmsValueFromZScore,
  type WhoGrowthSex,
  who0To5BmiForAge
} from "@peds-core/core";
import type { Language } from "../../utils/language";
import { whoGrowthChartPercentiles } from "./whoGrowthChartConstants";

interface WhoGrowthChartProps {
  ageDays: number;
  bmi: number;
  percentile: number;
  sex: WhoGrowthSex;
  zScore: number;
  language: Language;
}

const width = 760;
const height = 430;
const margin = {
  top: 26,
  right: 78,
  bottom: 58,
  left: 58
};
const xMin = 0;
const xMax = 60;
const yMin = 9;
const yMax = 22;

const xScale = (ageMonths: number) =>
  margin.left +
  ((ageMonths - xMin) / (xMax - xMin)) * (width - margin.left - margin.right);

const yScale = (bmi: number) =>
  height -
  margin.bottom -
  ((bmi - yMin) / (yMax - yMin)) * (height - margin.top - margin.bottom);

const formatNumber = (value: number, fractionDigits = 1) =>
  new Intl.NumberFormat("es-ES", {
    maximumFractionDigits: fractionDigits,
    minimumFractionDigits: fractionDigits
  }).format(value);

const buildPath = (points: Array<{ x: number; y: number }>) =>
  points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x.toFixed(1)} ${point.y.toFixed(1)}`).join(" ");

export function WhoGrowthChart({
  ageDays,
  bmi,
  percentile,
  sex,
  zScore,
  language
}: WhoGrowthChartProps) {
  const records = who0To5BmiForAge
    .filter((record) => record.sex === sex && record.ageDays !== undefined)
    .filter((record) => record.ageDays! % 30 === 0 || record.ageDays === 1856);
  const patientAgeMonths = ageDays / 30.4375;
  const patientX = xScale(Math.min(Math.max(patientAgeMonths, xMin), xMax));
  const patientY = yScale(Math.min(Math.max(bmi, yMin), yMax));
  const patientLabel = language === "es" ? "Paciente" : "Patient";
  const title =
    language === "es"
      ? "BMI-for-age OMS 0-5 años"
      : "WHO BMI-for-age 0-5 years";
  const source =
    language === "es"
      ? "Fuente: WHO Child Growth Standards BMI-for-age 0-5 years. Datos OMS con licencia separada."
      : "Source: WHO Child Growth Standards BMI-for-age 0-5 years. WHO data under separate license.";

  return (
    <figure className="who-growth-chart">
      <figcaption>
        <strong>{title}</strong>
        <span>{source}</span>
      </figcaption>
      <svg
        aria-label={title}
        className="who-growth-chart-svg"
        role="img"
        viewBox={`0 0 ${width} ${height}`}
      >
        <rect className="chart-bg" height={height} rx="18" width={width} />
        {[0, 12, 24, 36, 48, 60].map((month) => (
          <g key={month}>
            <line
              className="chart-grid"
              x1={xScale(month)}
              x2={xScale(month)}
              y1={margin.top}
              y2={height - margin.bottom}
            />
            <text className="chart-axis-label" textAnchor="middle" x={xScale(month)} y={height - 24}>
              {month}
            </text>
          </g>
        ))}
        {[10, 12, 14, 16, 18, 20, 22].map((value) => (
          <g key={value}>
            <line
              className="chart-grid"
              x1={margin.left}
              x2={width - margin.right}
              y1={yScale(value)}
              y2={yScale(value)}
            />
            <text className="chart-axis-label" textAnchor="end" x={margin.left - 10} y={yScale(value) + 4}>
              {value}
            </text>
          </g>
        ))}
        <line
          className="chart-axis"
          x1={margin.left}
          x2={width - margin.right}
          y1={height - margin.bottom}
          y2={height - margin.bottom}
        />
        <line
          className="chart-axis"
          x1={margin.left}
          x2={margin.left}
          y1={margin.top}
          y2={height - margin.bottom}
        />
        <text className="chart-title" x={margin.left} y={20}>
          {title}
        </text>
        <text className="chart-axis-title" textAnchor="middle" x={width / 2} y={height - 8}>
          {language === "es" ? "Edad (meses)" : "Age (months)"}
        </text>
        <text
          className="chart-axis-title"
          textAnchor="middle"
          transform={`translate(16 ${height / 2}) rotate(-90)`}
        >
          BMI kg/m2
        </text>

        {whoGrowthChartPercentiles.map((percentileCurve) => {
          const points = records.map((record) => ({
            x: xScale((record.ageDays ?? 0) / 30.4375),
            y: yScale(
              calculateLmsValueFromZScore(
                percentileCurve.zScore,
                record.L,
                record.M,
                record.S
              )
            )
          }));
          const lastPoint = points.at(-1);

          return (
            <g key={percentileCurve.label}>
              <path
                className={`percentile-line percentile-${percentileCurve.label.toLowerCase()}`}
                d={buildPath(points)}
              />
              {lastPoint ? (
                <text
                  className="percentile-label"
                  x={lastPoint.x + 8}
                  y={lastPoint.y + 4}
                >
                  {percentileCurve.label}
                </text>
              ) : null}
            </g>
          );
        })}

        <circle className="patient-point" cx={patientX} cy={patientY} r="7" />
        <text className="patient-label" x={patientX + 12} y={patientY - 12}>
          {patientLabel}
        </text>
        <text className="patient-label secondary" x={patientX + 12} y={patientY + 6}>
          BMI {formatNumber(bmi)} · P{formatNumber(percentile, 0)} · z {formatNumber(zScore, 2)}
        </text>
      </svg>
    </figure>
  );
}
