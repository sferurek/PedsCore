import {
  calculateLmsValueFromZScore,
  type WhoGrowthSex,
  type WhoLmsRecord
} from "@peds-core/core";
import type { Language } from "../../utils/language";
import { whoGrowthChartPercentiles } from "./whoGrowthChartConstants";
import {
  buildWhoGrowthChartTicks,
  getWhoGrowthChartXValue
} from "./whoGrowthChartUtils";

interface WhoGrowthChartProps {
  indicatorLabel: string;
  source: string;
  unit: string;
  value: number;
  percentile: number;
  records: readonly WhoLmsRecord[];
  sex: WhoGrowthSex;
  xAxisLabel: string;
  xUnit: string;
  xValue: number;
  yAxisLabel: string;
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

const createScale = (domainMin: number, domainMax: number, rangeMin: number, rangeMax: number) =>
  (value: number) =>
    rangeMin + ((value - domainMin) / (domainMax - domainMin)) * (rangeMax - rangeMin);

const formatNumber = (value: number, fractionDigits = 1) =>
  new Intl.NumberFormat("es-ES", {
    maximumFractionDigits: fractionDigits,
    minimumFractionDigits: fractionDigits
  }).format(value);

const buildPath = (points: Array<{ x: number; y: number }>) =>
  points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x.toFixed(1)} ${point.y.toFixed(1)}`)
    .join(" ");

export function WhoGrowthChart({
  indicatorLabel,
  percentile,
  records: allRecords,
  sex,
  source,
  unit,
  value,
  xAxisLabel,
  xUnit,
  xValue,
  yAxisLabel,
  zScore,
  language
}: WhoGrowthChartProps) {
  const records = allRecords
    .filter((record) => record.sex === sex)
    .map((record) => ({ record, xValue: getWhoGrowthChartXValue(record) }))
    .filter((item): item is { record: WhoLmsRecord; xValue: number } => item.xValue !== undefined)
    .filter((item) =>
      item.record.measureCm !== undefined
        ? true
        : item.record.ageDays === undefined ||
          item.record.ageDays % 30 === 0 ||
          item.record.ageDays === 1856
    );
  const xValues = records.map((item) => item.xValue);
  const rawXMin = Math.min(...xValues);
  const rawXMax = Math.max(...xValues);
  const xMin = Math.floor(rawXMin * 10) / 10;
  const xMax = Math.ceil(rawXMax * 10) / 10;
  const xScale = createScale(
    xMin,
    xMax,
    margin.left,
    width - margin.right
  );
  const curveValues = records.flatMap(({ record }) =>
    whoGrowthChartPercentiles.map((percentileCurve) =>
      calculateLmsValueFromZScore(
        percentileCurve.zScore,
        record.L,
        record.M,
        record.S
      )
    )
  );
  const rawYMin = Math.min(value, ...curveValues);
  const rawYMax = Math.max(value, ...curveValues);
  const yPadding = Math.max((rawYMax - rawYMin) * 0.08, 0.5);
  const yMin = Math.max(0, Math.floor((rawYMin - yPadding) * 2) / 2);
  const yMax = Math.ceil((rawYMax + yPadding) * 2) / 2;
  const yScale = createScale(
    yMin,
    yMax,
    height - margin.bottom,
    margin.top
  );
  const xTicks = buildWhoGrowthChartTicks(
    xMin,
    xMax,
    xUnit === "cm" ? undefined : [0, 12, 24, 36, 48, 60]
  );
  const yTicks = buildWhoGrowthChartTicks(yMin, yMax);
  const patientX = xScale(Math.min(Math.max(xValue, xMin), xMax));
  const patientY = yScale(Math.min(Math.max(value, yMin), yMax));
  const patientLabel = language === "es" ? "Paciente" : "Patient";

  return (
    <figure className="who-growth-chart">
      <figcaption>
        <strong>{indicatorLabel}</strong>
        <span>{source}</span>
      </figcaption>
      <svg
        aria-label={indicatorLabel}
        className="who-growth-chart-svg"
        role="img"
        viewBox={`0 0 ${width} ${height}`}
      >
        <rect className="chart-bg" height={height} rx="18" width={width} />
        {xTicks.map((tick) => (
          <g key={tick}>
            <line
              className="chart-grid"
              x1={xScale(tick)}
              x2={xScale(tick)}
              y1={margin.top}
              y2={height - margin.bottom}
            />
            <text className="chart-axis-label" textAnchor="middle" x={xScale(tick)} y={height - 24}>
              {formatNumber(tick, xUnit === "cm" ? 1 : 0)}
            </text>
          </g>
        ))}
        {yTicks.map((tick) => (
          <g key={tick}>
            <line
              className="chart-grid"
              x1={margin.left}
              x2={width - margin.right}
              y1={yScale(tick)}
              y2={yScale(tick)}
            />
            <text className="chart-axis-label" textAnchor="end" x={margin.left - 10} y={yScale(tick) + 4}>
              {formatNumber(tick)}
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
          {indicatorLabel}
        </text>
        <text className="chart-axis-title" textAnchor="middle" x={width / 2} y={height - 8}>
          {xAxisLabel}
        </text>
        <text
          className="chart-axis-title"
          textAnchor="middle"
          transform={`translate(16 ${height / 2}) rotate(-90)`}
        >
          {yAxisLabel}
        </text>

        {whoGrowthChartPercentiles.map((percentileCurve) => {
          const points = records.map(({ record, xValue: recordXValue }) => ({
            x: xScale(recordXValue),
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
          {formatNumber(value)} {unit} · P{formatNumber(percentile, 0)} · z {formatNumber(zScore, 2)}
        </text>
      </svg>
    </figure>
  );
}
