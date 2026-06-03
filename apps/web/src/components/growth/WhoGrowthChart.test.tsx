import { describe, expect, it } from "vitest";
import type { WhoLmsRecord } from "@peds-core/core";
import {
  buildWhoGrowthChartTicks,
  getWhoGrowthChartXValue
} from "./whoGrowthChartUtils";
import { whoGrowthChartPercentiles } from "./whoGrowthChartConstants";

describe("WHO growth chart", () => {
  it("uses written percentile labels for the printable BMI-for-age chart", () => {
    expect(whoGrowthChartPercentiles.map((percentile) => percentile.label)).toEqual([
      "P3",
      "P15",
      "P50",
      "P85",
      "P97"
    ]);
  });

  it("uses percentile z-scores without CDC or Orbegozo data", () => {
    const serialized = JSON.stringify(whoGrowthChartPercentiles).toLowerCase();

    expect(serialized).not.toContain("cdc");
    expect(serialized).not.toContain("orbegozo");
    expect(whoGrowthChartPercentiles.find((percentile) => percentile.label === "P50")?.zScore).toBe(0);
  });

  it("uses age in months for age-based WHO growth charts", () => {
    const record: WhoLmsRecord = {
      indicator: "weight_for_age",
      sex: "male",
      ageDays: 365,
      L: 1,
      M: 10,
      S: 0.1,
      source: "WHO test fixture"
    };

    expect(getWhoGrowthChartXValue(record)).toBeCloseTo(11.99, 2);
  });

  it("uses measureCm directly for weight-for-length and weight-for-height charts", () => {
    const record: WhoLmsRecord = {
      indicator: "weight_for_length",
      sex: "female",
      measureCm: 65.5,
      L: 1,
      M: 8,
      S: 0.1,
      source: "WHO test fixture"
    };

    expect(getWhoGrowthChartXValue(record)).toBe(65.5);
  });

  it("keeps preferred age ticks and falls back for cm-based charts", () => {
    expect(buildWhoGrowthChartTicks(0, 60, [0, 12, 24, 36, 48, 60])).toEqual([
      0,
      12,
      24,
      36,
      48,
      60
    ]);
    expect(buildWhoGrowthChartTicks(45, 110)).toHaveLength(6);
  });
});
