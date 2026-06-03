import { describe, expect, it } from "vitest";
import {
  calculateAgeDaysFromDates,
  calculateAgeDaysFromStructuredAge,
  resolveWhoGrowthAge
} from "./whoGrowthAge";

describe("WHO growth age input", () => {
  it("calculates exact age in days from dates", () => {
    expect(calculateAgeDaysFromDates("2023-01-01", "2024-01-01")).toBe(365);
    expect(
      resolveWhoGrowthAge(
        {
          who_age_input_mode: "dates",
          date_of_birth: "2023-01-01",
          measurement_date: "2024-01-01"
        },
        "es"
      )
    ).toMatchObject({ ageDays: 365, isExact: true, mode: "dates" });
  });

  it("rejects measurement dates before birth", () => {
    const resolved = resolveWhoGrowthAge(
      {
        who_age_input_mode: "dates",
        date_of_birth: "2024-01-01",
        measurement_date: "2023-01-01"
      },
      "en"
    );

    expect(resolved.ageDays).toBeUndefined();
    expect(resolved.warning).toContain("cannot be before");
  });

  it("uses exact age in days for days_0_5 mode", () => {
    expect(
      resolveWhoGrowthAge({ who_age_input_mode: "days_0_5", age_days: 730 }, "en")
    ).toMatchObject({ ageDays: 730, isExact: true, mode: "days_0_5" });
  });

  it("converts structured 0-5 age approximately and returns a warning", () => {
    expect(calculateAgeDaysFromStructuredAge(2, 3, 10)).toBe(832);

    const resolved = resolveWhoGrowthAge(
      {
        who_age_input_mode: "structured_0_5",
        age_years_0_5: 2,
        age_months_0_5: 3,
        age_extra_days_0_5: 10
      },
      "es"
    );

    expect(resolved.ageDays).toBe(832);
    expect(resolved.isExact).toBe(false);
    expect(resolved.warning).toContain("aproximada");
  });

  it("does not resolve structured 0-5 age until years, months and days are all present", () => {
    const resolved = resolveWhoGrowthAge(
      {
        who_age_input_mode: "structured_0_5",
        age_years_0_5: 2,
        age_months_0_5: 3
      },
      "en"
    );

    expect(resolved.ageDays).toBeUndefined();
    expect(resolved.warning).toContain("Enter years");
  });


  it("uses completed months for 5-19 mode", () => {
    expect(
      resolveWhoGrowthAge({ who_age_input_mode: "months_5_19", age_months: 120 }, "en")
    ).toMatchObject({ ageMonths: 120, isExact: true, mode: "months_5_19" });
  });

  it("uses the selected mode and ignores other filled age fields", () => {
    const resolved = resolveWhoGrowthAge(
      {
        who_age_input_mode: "dates",
        date_of_birth: "2023-01-01",
        measurement_date: "2023-01-11",
        age_days: 999,
        age_months: 120
      },
      "en"
    );

    expect(resolved.ageDays).toBe(10);
    expect(resolved.ageMonths).toBeUndefined();
  });

  it("does not resolve when the required age value for the selected mode is missing", () => {
    const resolved = resolveWhoGrowthAge({ who_age_input_mode: "months_5_19" }, "en");

    expect(resolved.ageMonths).toBeUndefined();
    expect(resolved.warning).toContain("Enter completed age");
  });

  it("does not use localStorage or analytics", () => {
    const serialized = `${resolveWhoGrowthAge.toString()} ${calculateAgeDaysFromDates.toString()}`;

    expect(serialized).not.toContain("localStorage");
    expect(serialized.toLowerCase()).not.toContain("analytics");
  });
});
