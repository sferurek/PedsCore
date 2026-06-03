import { describe, expect, it } from "vitest";
import {
  calculateAgeInDays,
  calculateAgeInMonths,
  calculateBmi,
  calculateLmsValueFromZScore,
  calculateLmsZScore,
  calculateWhoGrowth,
  clinicalTools,
  findLmsRecord,
  whoGrowthDataStatus,
  zScoreToPercentile
} from "../src/index";
import {
  calculateWhoGrowthWithImportedData,
  findImportedWhoLmsRecord,
  who0To5BmiForAge,
  who0To5BmiForAgeSource,
  whoGrowthDataStatus as importedWhoGrowthDataStatus
} from "../src/growth/who/bmiForAge";
import { loadWhoLmsRecords } from "../src/growth/who/loaders";
import {
  calculateWhoGrowthWithWeightForAgeData,
  findImportedWhoWeightForAgeRecord,
  who0To5WeightForAge,
  who0To5WeightForAgeSource,
  whoWeightForAgeDataStatus
} from "../src/growth/who/weightForAge";

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
    expect(calculateLmsValueFromZScore(0, 1, 10, 0.1)).toBeCloseTo(10, 6);
  });

  it("converts z-score to percentile", () => {
    expect(zScoreToPercentile(0)).toBeCloseTo(50, 2);
    expect(zScoreToPercentile(1.8808)).toBeCloseTo(97, 0);
  });

  it("loads official WHO BMI-for-age data for both sexes", () => {
    expect(whoGrowthDataStatus.officialDataImported).toBe(false);
    expect(importedWhoGrowthDataStatus.officialDataImported).toBe(true);
    expect(importedWhoGrowthDataStatus.importedIndicators).toEqual(["bmi_for_age"]);
    expect(importedWhoGrowthDataStatus.excludedSources).toEqual(["CDC", "Orbegozo"]);
    expect(who0To5BmiForAge).toHaveLength(3714);
    expect(who0To5BmiForAgeSource.boysUrl).toContain("cdn.who.int");
    expect(who0To5BmiForAgeSource.girlsUrl).toContain("cdn.who.int");
    expect(who0To5BmiForAge.some((record) => record.sex === "male")).toBe(
      true
    );
    expect(who0To5BmiForAge.some((record) => record.sex === "female")).toBe(
      true
    );
  });

  it("loads BMI-for-age records through the WHO indicator loader", async () => {
    const loaded = await loadWhoLmsRecords("bmi_for_age");

    expect(loaded.indicator).toBe("bmi_for_age");
    expect(loaded.records).toHaveLength(3714);
    expect(loaded.dataStatus.officialDataImported).toBe(true);
    expect(loaded.dataStatus.excludedSources).toEqual(["CDC", "Orbegozo"]);
  });

  it("loads official WHO weight-for-age data for both sexes", () => {
    expect(whoWeightForAgeDataStatus.officialDataImported).toBe(true);
    expect(whoWeightForAgeDataStatus.importedIndicators).toEqual([
      "weight_for_age"
    ]);
    expect(whoWeightForAgeDataStatus.excludedSources).toEqual([
      "CDC",
      "Orbegozo"
    ]);
    expect(who0To5WeightForAge).toHaveLength(3714);
    expect(who0To5WeightForAgeSource.boysUrl).toContain("cdn.who.int");
    expect(who0To5WeightForAgeSource.girlsUrl).toContain("cdn.who.int");
    expect(who0To5WeightForAge.some((record) => record.sex === "male")).toBe(
      true
    );
    expect(who0To5WeightForAge.some((record) => record.sex === "female")).toBe(
      true
    );
  });

  it("loads weight-for-age records through the WHO indicator loader", async () => {
    const loaded = await loadWhoLmsRecords("weight_for_age");

    expect(loaded.indicator).toBe("weight_for_age");
    expect(loaded.records).toHaveLength(3714);
    expect(loaded.dataStatus.officialDataImported).toBe(true);
    expect(loaded.dataStatus.excludedSources).toEqual(["CDC", "Orbegozo"]);
  });

  it("returns an unloaded state for WHO indicators that are not imported yet", async () => {
    const loaded = await loadWhoLmsRecords("weight_for_age");

    const unloaded = await loadWhoLmsRecords("length_height_for_age");

    expect(loaded.records).toHaveLength(3714);
    expect(unloaded.records).toHaveLength(0);
    expect(unloaded.dataStatus.officialDataImported).toBe(false);
    expect(unloaded.dataStatus.reason).toContain("length_height_for_age");
  });

  it("resolves official BMI-for-age LMS records by sex and day", () => {
    expect(
      findImportedWhoLmsRecord({
        indicator: "bmi_for_age",
        sex: "male",
        ageDays: 0
      })
    ).toMatchObject({ L: -0.3053, M: 13.4069, S: 0.0956 });
    expect(
      findImportedWhoLmsRecord({
        indicator: "bmi_for_age",
        sex: "female",
        ageDays: 730
      })
    ).toMatchObject({ indicator: "bmi_for_age", sex: "female", ageDays: 730 });
  });

  it("calculates WHO BMI-for-age z-score and percentile with complete input", () => {
    const result = calculateWhoGrowthWithImportedData({
      sex: "male",
      ageDays: 730,
      weightKg: 12,
      heightCm: 86,
      headCircumferenceCm: 48,
      measurementMode: "standing_height"
    });
    const bmiForAge = result.applicableResults.find(
      (item) => item.indicator === "bmi_for_age"
    );

    expect(result.warnings).toContain(
      "Only WHO bmi_for_age data are imported. Other WHO indicators remain pending."
    );
    expect(result.applicableResults).toHaveLength(6);
    expect(bmiForAge?.isApplicable).toBe(true);
    expect(bmiForAge?.value).toBeCloseTo(16.22, 2);
    expect(bmiForAge?.zScore).toBeTypeOf("number");
    expect(bmiForAge?.percentile).toBeTypeOf("number");
  });

  it("resolves official weight-for-age LMS records by sex and day", () => {
    expect(
      findImportedWhoWeightForAgeRecord({
        indicator: "weight_for_age",
        sex: "male",
        ageDays: 0
      })
    ).toMatchObject({ L: 0.3487, M: 3.3464, S: 0.14602 });
    expect(
      findImportedWhoWeightForAgeRecord({
        indicator: "weight_for_age",
        sex: "female",
        ageDays: 730
      })
    ).toMatchObject({
      indicator: "weight_for_age",
      sex: "female",
      ageDays: 730
    });
  });

  it("calculates WHO weight-for-age z-score and percentile with complete input", () => {
    const result = calculateWhoGrowthWithWeightForAgeData({
      sex: "male",
      ageDays: 730,
      weightKg: 12
    });
    const weightForAge = result.applicableResults.find(
      (item) => item.indicator === "weight_for_age"
    );

    expect(result.warnings).toContain(
      "Only WHO weight_for_age data are imported. Other WHO indicators remain pending."
    );
    expect(weightForAge?.isApplicable).toBe(true);
    expect(weightForAge?.value).toBe(12);
    expect(weightForAge?.zScore).toBeTypeOf("number");
    expect(weightForAge?.percentile).toBeTypeOf("number");
  });

  it("does not calculate BMI-for-age without weight or stature", () => {
    const result = calculateWhoGrowthWithImportedData({
      sex: "male",
      dateOfBirth: "2020-01-01",
      measurementDate: "2022-01-01"
    });
    const bmiForAge = result.applicableResults.find(
      (item) => item.indicator === "bmi_for_age"
    );

    expect(bmiForAge?.isApplicable).toBe(false);
    expect(bmiForAge?.warning).toBe("Required measurement is missing.");
  });

  it("does not calculate BMI-for-age outside the official imported range", () => {
    const result = calculateWhoGrowthWithImportedData({
      sex: "female",
      ageDays: 2200,
      weightKg: 20,
      heightCm: 110
    });
    const bmiForAge = result.applicableResults.find(
      (item) => item.indicator === "bmi_for_age"
    );

    expect(bmiForAge?.isApplicable).toBe(false);
    expect(bmiForAge?.zScore).toBeUndefined();
    expect(bmiForAge?.percentile).toBeUndefined();
  });

  it("keeps the root WHO module data-light unless records are passed explicitly", () => {
    const directRecord = findLmsRecord({
      indicator: "bmi_for_age",
      sex: "male",
      ageDays: 730
    });
    const result = calculateWhoGrowth({
      sex: "male",
      ageDays: 730,
      weightKg: 12,
      heightCm: 86
    });
    const bmiForAge = result.applicableResults.find(
      (item) => item.indicator === "bmi_for_age"
    );

    expect(directRecord).toBeUndefined();
    expect(bmiForAge?.isApplicable).toBe(false);
    expect(result.warnings).toContain(
      "Official WHO LMS data are not yet imported and verified in PedsCore."
    );
  });

  it("keeps unified WHO growth catalog entry pending validation", () => {
    const tool = clinicalTools.find((item) => item.id === "who_growth_module");

    expect(tool?.slug).toBe("who-growth");
    expect(tool?.implementationStatus).toBe("pending_validation");
    expect(tool?.calculationStatus).not.toBe("active");
    expect(tool?.inputs?.map((input) => input.id)).toEqual([
      "sex",
      "age_days",
      "weight_kg",
      "stature_cm"
    ]);
    expect(tool?.validationNotes.en).toContain("BMI-for-age 0-5 years");
    expect(tool?.validationNotes.en).toContain("weight-for-age 0-5 years");
    expect(tool?.validationNotes.en).toContain("separate data license");
  });
});
