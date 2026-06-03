import { describe, expect, it } from "vitest";
import {
  areWhoGrowthAnthropometryFieldsUnlocked,
  getVisibleWhoGrowthInputIds,
  isWhoGrowthAgeModeUnlocked
} from "./whoGrowthFormFlow";

describe("WHO growth guided form flow", () => {
  it("keeps age mode locked until sex is selected", () => {
    expect(isWhoGrowthAgeModeUnlocked({})).toBe(false);
    expect(getVisibleWhoGrowthInputIds({})).toEqual(["sex"]);
  });

  it("unlocks age mode after sex is selected", () => {
    expect(isWhoGrowthAgeModeUnlocked({ sex: "male" })).toBe(true);
    expect(getVisibleWhoGrowthInputIds({ sex: "male" })).toEqual([
      "sex",
      "who_age_input_mode"
    ]);
  });

  it("shows only date fields for dates mode", () => {
    expect(
      getVisibleWhoGrowthInputIds({
        sex: "female",
        who_age_input_mode: "dates"
      })
    ).toEqual(["sex", "who_age_input_mode", "date_of_birth", "measurement_date"]);
  });

  it("shows only exact days for days_0_5 mode", () => {
    expect(
      getVisibleWhoGrowthInputIds({
        sex: "female",
        who_age_input_mode: "days_0_5"
      })
    ).toEqual(["sex", "who_age_input_mode", "age_days"]);
  });

  it("shows only structured fields for structured_0_5 mode", () => {
    expect(
      getVisibleWhoGrowthInputIds({
        sex: "female",
        who_age_input_mode: "structured_0_5"
      })
    ).toEqual([
      "sex",
      "who_age_input_mode",
      "age_years_0_5",
      "age_months_0_5",
      "age_extra_days_0_5"
    ]);
  });

  it("shows only completed months for months_5_19 mode", () => {
    expect(
      getVisibleWhoGrowthInputIds({
        sex: "female",
        who_age_input_mode: "months_5_19"
      })
    ).toEqual(["sex", "who_age_input_mode", "age_months"]);
  });

  it("unlocks anthropometry after age is resolved", () => {
    expect(
      areWhoGrowthAnthropometryFieldsUnlocked({
        sex: "male",
        who_age_input_mode: "months_5_19",
        age_months: 120
      })
    ).toBe(true);
    expect(
      getVisibleWhoGrowthInputIds({
        sex: "male",
        who_age_input_mode: "months_5_19",
        age_months: 120
      })
    ).toEqual([
      "sex",
      "who_age_input_mode",
      "age_months",
      "weight_kg",
      "stature_cm",
      "measurement_mode",
      "head_circumference_cm"
    ]);
  });

  it("does not unlock anthropometry when selected age mode is incomplete", () => {
    expect(
      areWhoGrowthAnthropometryFieldsUnlocked({
        sex: "male",
        who_age_input_mode: "structured_0_5",
        age_years_0_5: 2,
        age_months_0_5: 3
      })
    ).toBe(false);
  });

  it("does not use localStorage or analytics", () => {
    const serialized = `${getVisibleWhoGrowthInputIds.toString()} ${areWhoGrowthAnthropometryFieldsUnlocked.toString()}`;

    expect(serialized).not.toContain("localStorage");
    expect(serialized.toLowerCase()).not.toContain("analytics");
  });
});
