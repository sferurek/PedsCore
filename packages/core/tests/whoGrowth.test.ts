import { describe, expect, it } from "vitest";
import {
  calculateAgeInDays,
  calculateAgeInMonths,
  calculateBmi,
  calculateLmsZScore,
  calculateWhoGrowth,
  clinicalTools,
  findLmsRecord,
  whoGrowthDataStatus,
  zScoreToPercentile
} from "../src/index";

describe("WHO growth scaffold", () => {
  it("calculates BMI from metric inputs", () => {
    expect(calculateBmi(20, 100)).toBeCloseTo(20, 6);
  });

  it("calculates age in days and months", () => {
    expect(calculateAgeInDays("2020-01-01", "2020-01-31")).toBe(30);
    expect(calculateAgeInMonths("2020-01-01", "2020-01-31")).toBeCloseTo(
      0.986,
      2
    );
  });

  it("calculates LMS z-scores including the L=0 branch", () => {
    expect(calculateLmsZScore(11, 1, 10, 0.1)).toBeCloseTo(1, 6);
    expect(calculateLmsZScore(10, 0, 10, 0.1)).toBeCloseTo(0, 6);
  });

  it("converts z-score to percentile", () => {
    expect(zScoreToPercentile(0)).toBeCloseTo(50, 2);
    expect(zScoreToPercentile(1.8808)).toBeCloseTo(97, 0);
  });

  it("does not pretend official WHO data are imported", () => {
    expect(whoGrowthDataStatus.officialDataImported).toBe(false);
    expect(whoGrowthDataStatus.reason).toContain("not yet");
    expect(whoGrowthDataStatus.excludedSources).toEqual(["CDC", "Orbegozo"]);
    expect(
      findLmsRecord({
        indicator: "bmi_for_age",
        sex: "female",
        ageMonths: 24
      })
    ).toBeUndefined();
  });

  it("returns pending-data warnings instead of invented percentiles", () => {
    const result = calculateWhoGrowth({
      sex: "male",
      dateOfBirth: "2020-01-01",
      measurementDate: "2022-01-01",
      weightKg: 12,
      heightCm: 86,
      headCircumferenceCm: 48,
      measurementMode: "standing_height"
    });

    expect(result.warnings).toContain(
      "Official WHO LMS data are not yet imported and verified in PedsCore."
    );
    expect(result.applicableResults).toHaveLength(6);
    expect(result.applicableResults.every((item) => !item.isApplicable)).toBe(
      true
    );
    expect(
      result.applicableResults.every(
        (item) => item.zScore === undefined && item.percentile === undefined
      )
    ).toBe(true);
  });

  it("keeps unified WHO growth catalog entry pending validation", () => {
    const tool = clinicalTools.find((item) => item.id === "who_growth_module");

    expect(tool?.slug).toBe("who-growth");
    expect(tool?.implementationStatus).toBe("pending_validation");
    expect(tool?.calculationStatus).not.toBe("active");
    expect(tool?.validationNotes.en).toContain("scaffold");
    expect(tool?.validationNotes.en).toContain("GPL-3");
  });
});
