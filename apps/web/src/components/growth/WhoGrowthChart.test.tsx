import { describe, expect, it } from "vitest";
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
});
