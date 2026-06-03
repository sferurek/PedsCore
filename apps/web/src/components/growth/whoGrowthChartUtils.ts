import type { WhoLmsRecord } from "@peds-core/core";

export const getWhoGrowthChartXValue = (record: WhoLmsRecord) => {
  if (record.measureCm !== undefined) {
    return record.measureCm;
  }

  if (record.ageDays !== undefined) {
    return record.ageDays / 30.4375;
  }

  if (record.ageMonths !== undefined) {
    return record.ageMonths;
  }

  return undefined;
};

export const buildWhoGrowthChartTicks = (
  min: number,
  max: number,
  preferred?: number[]
) => {
  if (preferred) {
    const filtered = preferred.filter((tick) => tick >= min && tick <= max);

    if (filtered.length >= 2) {
      return filtered;
    }
  }

  return Array.from({ length: 6 }, (_, index) => min + ((max - min) / 5) * index);
};
