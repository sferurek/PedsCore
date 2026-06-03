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
import {
  calculateWhoGrowthWithHeadCircumferenceForAgeData,
  findImportedWhoHeadCircumferenceForAgeRecord,
  who0To5HeadCircumferenceForAge,
  who0To5HeadCircumferenceForAgeSource,
  whoHeadCircumferenceForAgeDataStatus
} from "../src/growth/who/headCircumferenceForAge";
import {
  calculateWhoGrowthWithLengthHeightForAgeData,
  findImportedWhoLengthHeightForAgeRecord,
  who0To5LengthHeightForAge,
  who0To5LengthHeightForAgeSource,
  whoLengthHeightForAgeDataStatus
} from "../src/growth/who/lengthHeightForAge";
import {
  calculateWhoGrowthWithWeightForHeightData,
  calculateWhoGrowthWithWeightForLengthData,
  findImportedWhoWeightForHeightRecord,
  findImportedWhoWeightForLengthRecord,
  who0To5WeightForHeight,
  who0To5WeightForHeightSource,
  who0To5WeightForLength,
  who0To5WeightForLengthSource,
  whoWeightForHeightDataStatus,
  whoWeightForLengthDataStatus
} from "../src/growth/who/weightForLengthHeight";

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

  it("loads official WHO length/height-for-age data for both sexes", async () => {
    const loaded = await loadWhoLmsRecords("length_height_for_age");

    expect(whoLengthHeightForAgeDataStatus.officialDataImported).toBe(true);
    expect(whoLengthHeightForAgeDataStatus.importedIndicators).toEqual([
      "length_height_for_age"
    ]);
    expect(who0To5LengthHeightForAge).toHaveLength(3714);
    expect(loaded.records).toHaveLength(3714);
    expect(who0To5LengthHeightForAgeSource.boysUrl).toContain("cdn.who.int");
    expect(who0To5LengthHeightForAgeSource.girlsUrl).toContain("cdn.who.int");
    expect(whoLengthHeightForAgeDataStatus.excludedSources).toEqual([
      "CDC",
      "Orbegozo"
    ]);
  });

  it("loads official WHO head circumference-for-age data for both sexes", async () => {
    const loaded = await loadWhoLmsRecords("head_circumference_for_age");

    expect(whoHeadCircumferenceForAgeDataStatus.officialDataImported).toBe(true);
    expect(whoHeadCircumferenceForAgeDataStatus.importedIndicators).toEqual([
      "head_circumference_for_age"
    ]);
    expect(who0To5HeadCircumferenceForAge).toHaveLength(3714);
    expect(loaded.records).toHaveLength(3714);
    expect(who0To5HeadCircumferenceForAgeSource.boysUrl).toContain("cdn.who.int");
    expect(who0To5HeadCircumferenceForAgeSource.girlsUrl).toContain("cdn.who.int");
    expect(whoHeadCircumferenceForAgeDataStatus.excludedSources).toEqual([
      "CDC",
      "Orbegozo"
    ]);
  });

  it("loads official WHO weight-for-length and weight-for-height data", async () => {
    const weightForLength = await loadWhoLmsRecords("weight_for_length");
    const weightForHeight = await loadWhoLmsRecords("weight_for_height");

    expect(whoWeightForLengthDataStatus.officialDataImported).toBe(true);
    expect(whoWeightForHeightDataStatus.officialDataImported).toBe(true);
    expect(whoWeightForLengthDataStatus.importedIndicators).toEqual([
      "weight_for_length"
    ]);
    expect(whoWeightForHeightDataStatus.importedIndicators).toEqual([
      "weight_for_height"
    ]);
    expect(who0To5WeightForLength).toHaveLength(1302);
    expect(who0To5WeightForHeight).toHaveLength(1102);
    expect(weightForLength.records).toHaveLength(1302);
    expect(weightForHeight.records).toHaveLength(1102);
    expect(who0To5WeightForLengthSource.boysUrl).toContain("cdn.who.int");
    expect(who0To5WeightForHeightSource.girlsUrl).toContain("cdn.who.int");
    expect(whoWeightForLengthDataStatus.excludedSources).toEqual([
      "CDC",
      "Orbegozo"
    ]);
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

  it("resolves official LMS fixtures for the new WHO 0-5 indicators", () => {
    expect(
      findImportedWhoLengthHeightForAgeRecord({
        indicator: "length_height_for_age",
        sex: "male",
        ageDays: 0
      })
    ).toMatchObject({ L: 1, M: 49.8842, S: 0.03795 });
    expect(
      findImportedWhoHeadCircumferenceForAgeRecord({
        indicator: "head_circumference_for_age",
        sex: "male",
        ageDays: 0
      })
    ).toMatchObject({ L: 1, M: 34.4618, S: 0.03686 });
    expect(
      findImportedWhoWeightForLengthRecord({
        indicator: "weight_for_length",
        sex: "male",
        measureCm: 45
      })
    ).toMatchObject({ L: -0.3521, M: 2.441, S: 0.09182 });
    expect(
      findImportedWhoWeightForHeightRecord({
        indicator: "weight_for_height",
        sex: "male",
        measureCm: 65
      })
    ).toMatchObject({ L: -0.3521, M: 7.4327, S: 0.08217 });
  });

  it("calculates WHO length/height-for-age and head circumference-for-age with complete input", () => {
    const lengthResult = calculateWhoGrowthWithLengthHeightForAgeData({
      sex: "male",
      ageDays: 0,
      lengthCm: 49.8842
    });
    const headResult = calculateWhoGrowthWithHeadCircumferenceForAgeData({
      sex: "male",
      ageDays: 0,
      headCircumferenceCm: 34.4618
    });
    const lengthHeightForAge = lengthResult.applicableResults.find(
      (item) => item.indicator === "length_height_for_age"
    );
    const headCircumferenceForAge = headResult.applicableResults.find(
      (item) => item.indicator === "head_circumference_for_age"
    );

    expect(lengthHeightForAge?.isApplicable).toBe(true);
    expect(lengthHeightForAge?.zScore).toBeCloseTo(0, 4);
    expect(lengthHeightForAge?.percentile).toBeCloseTo(50, 1);
    expect(headCircumferenceForAge?.isApplicable).toBe(true);
    expect(headCircumferenceForAge?.zScore).toBeCloseTo(0, 4);
    expect(headCircumferenceForAge?.percentile).toBeCloseTo(50, 1);
  });

  it("calculates WHO weight-for-length and weight-for-height with complete input", () => {
    const lengthResult = calculateWhoGrowthWithWeightForLengthData({
      sex: "male",
      weightKg: 2.441,
      lengthCm: 45
    });
    const heightResult = calculateWhoGrowthWithWeightForHeightData({
      sex: "male",
      weightKg: 7.4327,
      heightCm: 65
    });
    const weightForLength = lengthResult.applicableResults.find(
      (item) => item.indicator === "weight_for_length"
    );
    const weightForHeight = heightResult.applicableResults.find(
      (item) => item.indicator === "weight_for_height"
    );

    expect(weightForLength?.isApplicable).toBe(true);
    expect(weightForLength?.zScore).toBeCloseTo(0, 4);
    expect(weightForLength?.percentile).toBeCloseTo(50, 1);
    expect(weightForHeight?.isApplicable).toBe(true);
    expect(weightForHeight?.zScore).toBeCloseTo(0, 4);
    expect(weightForHeight?.percentile).toBeCloseTo(50, 1);
  });

  it("calculates all applicable WHO 0-5 indicators when all official records are passed", async () => {
    const loaded = await Promise.all([
      loadWhoLmsRecords("weight_for_age"),
      loadWhoLmsRecords("length_height_for_age"),
      loadWhoLmsRecords("head_circumference_for_age"),
      loadWhoLmsRecords("weight_for_length"),
      loadWhoLmsRecords("weight_for_height"),
      loadWhoLmsRecords("bmi_for_age")
    ]);
    const result = calculateWhoGrowth(
      {
        sex: "male",
        ageDays: 0,
        weightKg: 3.3464,
        lengthCm: 50,
        headCircumferenceCm: 34.4618,
        measurementMode: "recumbent_length"
      },
      {
        dataStatus: {
          officialDataImported: true,
          reason: "All WHO 0-5 core indicators imported for test.",
          importedIndicators: loaded.flatMap(
            (item) => item.dataStatus.importedIndicators
          ),
          allowedSources: loaded[0].dataStatus.allowedSources,
          excludedSources: loaded[0].dataStatus.excludedSources
        },
        lmsRecords: loaded.flatMap((item) => [...item.records])
      }
    );
    const byIndicator = Object.fromEntries(
      result.applicableResults.map((item) => [item.indicator, item])
    );

    expect(result.warnings).toEqual([]);
    expect(byIndicator.weight_for_age.isApplicable).toBe(true);
    expect(byIndicator.length_height_for_age.isApplicable).toBe(true);
    expect(byIndicator.head_circumference_for_age.isApplicable).toBe(true);
    expect(byIndicator.weight_for_length.isApplicable).toBe(true);
    expect(byIndicator.weight_for_height.isApplicable).toBe(false);
    expect(byIndicator.bmi_for_age.isApplicable).toBe(true);
  });

  it("keeps head circumference not applicable when the measurement is missing", async () => {
    const loaded = await loadWhoLmsRecords("head_circumference_for_age");
    const result = calculateWhoGrowth(
      {
        sex: "female",
        ageDays: 365
      },
      {
        dataStatus: loaded.dataStatus,
        lmsRecords: loaded.records
      }
    );
    const headCircumferenceForAge = result.applicableResults.find(
      (item) => item.indicator === "head_circumference_for_age"
    );

    expect(headCircumferenceForAge?.isApplicable).toBe(false);
    expect(headCircumferenceForAge?.warning).toBe(
      "Required measurement is missing."
    );
  });

  it("keeps weight-for-height not applicable when recumbent length is provided", async () => {
    const loaded = await loadWhoLmsRecords("weight_for_height");
    const result = calculateWhoGrowth(
      {
        sex: "male",
        weightKg: 10,
        lengthCm: 80,
        measurementMode: "recumbent_length"
      },
      {
        dataStatus: loaded.dataStatus,
        lmsRecords: loaded.records
      }
    );
    const weightForHeight = result.applicableResults.find(
      (item) => item.indicator === "weight_for_height"
    );

    expect(weightForHeight?.isApplicable).toBe(false);
    expect(weightForHeight?.warning).toBe("Required measurement is missing.");
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
      "stature_cm",
      "measurement_mode",
      "head_circumference_cm"
    ]);
    expect(tool?.validationNotes.en).toContain("Core WHO 0-5 indicators");
    expect(tool?.validationNotes.en).toContain("separate data license");
  });
});
