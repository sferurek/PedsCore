import { describe, expect, it } from "vitest";
import { getToolBySlug, pramCalculator } from "../src/index";

const baseInput = {
  age_years: 6,
  suprasternal_retractions: "absent",
  scalene_muscle_contraction: "absent",
  air_entry: "normal",
  wheezing: "absent",
  oxygen_measurement_condition: "stable_room_air_one_minute",
  oxygen_saturation: 98
};

const forbiddenRecommendations =
  /tratamiento|tratar|administrar|broncodilatador|corticoide|ingresar|ingreso|alta|escal(ar|ado)|derivar|medicaci[oó]n|medication|treat|administer|bronchodilator|steroid|admission|admit|discharge|escalation|refer/i;

const resultText = (result: ReturnType<typeof pramCalculator.calculate>) =>
  [
    result.interpretation?.label.es,
    result.interpretation?.label.en,
    result.interpretation?.description?.es,
    result.interpretation?.description?.en,
    ...result.warnings.flatMap((item) => [item.message.es, item.message.en])
  ]
    .filter(Boolean)
    .join(" ");

describe("PRAM calculator", () => {
  it("STRUCTURAL TEST: calculates the canonical minimum and maximum scores", () => {
    expect(pramCalculator.calculate(baseInput).score).toBe(0);
    expect(
      pramCalculator.calculate({
        ...baseInput,
        suprasternal_retractions: "present",
        scalene_muscle_contraction: "present",
        air_entry: "absent_minimal",
        wheezing: "audible_or_silent_chest",
        oxygen_saturation: 90
      }).score
    ).toBe(12);
  });

  it.each([
    ["absent", 0],
    ["present", 2]
  ])("DOMAIN TEST: suprasternal retractions %s score %i", (value, score) => {
    expect(
      pramCalculator.calculate({ ...baseInput, suprasternal_retractions: value }).trace
        .find((entry) => entry.inputId === "suprasternal_retractions")?.score
    ).toBe(score);
  });

  it.each([
    ["absent", 0],
    ["present", 2]
  ])("DOMAIN TEST: scalene muscle contraction %s scores %i", (value, score) => {
    expect(
      pramCalculator.calculate({ ...baseInput, scalene_muscle_contraction: value }).trace
        .find((entry) => entry.inputId === "scalene_muscle_contraction")?.score
    ).toBe(score);
  });

  it.each([
    ["normal", 0],
    ["decreased_bases", 1],
    ["widespread_decrease", 2],
    ["absent_minimal", 3]
  ])("DOMAIN TEST: air entry %s scores %i", (value, score) => {
    expect(
      pramCalculator.calculate({ ...baseInput, air_entry: value }).trace
        .find((entry) => entry.inputId === "air_entry")?.score
    ).toBe(score);
  });

  it.each([
    ["absent", 0],
    ["expiratory_only", 1],
    ["inspiratory_and_expiratory", 2],
    ["audible_or_silent_chest", 3]
  ])("DOMAIN TEST: wheezing %s scores %i", (value, score) => {
    expect(
      pramCalculator.calculate({ ...baseInput, wheezing: value }).trace
        .find((entry) => entry.inputId === "wheezing")?.score
    ).toBe(score);
  });

  it.each([
    [95.1, 0],
    [95, 0],
    [94.9, 1],
    [92, 1],
    [91.9, 2],
    [0, 2]
  ])("BOUNDARY TEST: stable room-air SpO2 %s scores %i", (value, score) => {
    expect(
      pramCalculator.calculate({ ...baseInput, oxygen_saturation: value }).trace
        .find((entry) => entry.inputId === "oxygen_saturation")?.score
    ).toBe(score);
  });

  it.each([
    [2, true],
    [17.99, true],
    [1.99, false],
    [18, false]
  ])("BOUNDARY TEST: age %s support is %s", (age, supported) => {
    const result = pramCalculator.calculate({ ...baseInput, age_years: age });

    expect(result.score !== undefined).toBe(supported);
    expect(result.warnings[0]?.id).toBe(supported ? undefined : "unsupported_age");
  });

  it.each([
    [2, "mild"],
    [3, "mild"],
    [4, "moderate"],
    [6, "moderate"],
    [7, "moderate"],
    [8, "severe"]
  ])("BOUNDARY TEST: total %i maps to %s", (expectedScore, band) => {
    const vectors = {
      2: { suprasternal_retractions: "present" },
      3: { air_entry: "absent_minimal" },
      4: {
        suprasternal_retractions: "present",
        scalene_muscle_contraction: "present"
      },
      6: {
        suprasternal_retractions: "present",
        scalene_muscle_contraction: "present",
        air_entry: "widespread_decrease"
      },
      7: {
        suprasternal_retractions: "present",
        scalene_muscle_contraction: "present",
        air_entry: "absent_minimal"
      },
      8: {
        suprasternal_retractions: "present",
        scalene_muscle_contraction: "present",
        air_entry: "absent_minimal",
        wheezing: "expiratory_only"
      }
    } as const;
    const result = pramCalculator.calculate({
      ...baseInput,
      ...vectors[expectedScore as keyof typeof vectors]
    });

    expect(result.score).toBe(expectedScore);
    expect(result.interpretation?.id).toBe(band);
  });

  it("requires explicit confirmation of a stable room-air reading", () => {
    const unconfirmed = pramCalculator.calculate({
      ...baseInput,
      oxygen_measurement_condition: "unconfirmed_or_supplemental_oxygen"
    });

    expect(unconfirmed.score).toBeUndefined();
    expect(unconfirmed.interpretation).toBeUndefined();
    expect(unconfirmed.warnings[0]?.id).toBe("invalid_oxygen_measurement_condition");
  });

  it.each([-1, 100.1, 101])("rejects invalid SpO2 %s", (oxygenSaturation) => {
    const result = pramCalculator.calculate({
      ...baseInput,
      oxygen_saturation: oxygenSaturation
    });

    expect(result.score).toBeUndefined();
    expect(result.warnings[0]?.id).toBe("invalid_oxygen_saturation");
  });

  it.each([NaN, Infinity, -Infinity])(
    "rejects non-finite SpO2 %s without scoring",
    (oxygenSaturation) => {
      const result = pramCalculator.calculate({
        ...baseInput,
        oxygen_saturation: oxygenSaturation
      });

      expect(result.score).toBeUndefined();
      expect(result.warnings[0]?.id).toBe("missing_required_inputs");
    }
  );

  it("rejects missing measurement, missing confirmation, and invalid options", () => {
    expect(
      pramCalculator.calculate({ ...baseInput, oxygen_saturation: "" }).warnings[0]?.id
    ).toBe("missing_required_inputs");
    expect(
      pramCalculator.calculate({
        ...baseInput,
        oxygen_measurement_condition: ""
      }).warnings[0]?.id
    ).toBe("missing_required_inputs");
    expect(
      pramCalculator.calculate({ ...baseInput, wheezing: "bad" }).warnings[0]?.id
    ).toBe("invalid_score_input");
  });

  it("traces age, measurement condition, SpO2, and all four clinical domains", () => {
    const traceIds = pramCalculator.calculate(baseInput).trace.map((entry) => entry.inputId);

    expect(traceIds).toEqual([
      "age_years",
      "oxygen_measurement_condition",
      "oxygen_saturation",
      "suprasternal_retractions",
      "scalene_muscle_contraction",
      "air_entry",
      "wheezing"
    ]);
  });

  it("maps the displayed canonical descriptors to their published point values", () => {
    const tool = getToolBySlug("pram");
    const airEntry = tool?.inputs?.find((input) => input.id === "air_entry");
    const wheezing = tool?.inputs?.find((input) => input.id === "wheezing");

    expect(airEntry?.options?.map(({ id, score }) => [id, score])).toEqual([
      ["normal", 0],
      ["decreased_bases", 1],
      ["widespread_decrease", 2],
      ["absent_minimal", 3]
    ]);
    expect(wheezing?.options?.map(({ id, score }) => [id, score])).toEqual([
      ["absent", 0],
      ["expiratory_only", 1],
      ["inspiratory_and_expiratory", 2],
      ["audible_or_silent_chest", 3]
    ]);
  });

  it("does not return therapeutic or disposition recommendations", () => {
    const result = pramCalculator.calculate({
      ...baseInput,
      suprasternal_retractions: "present",
      scalene_muscle_contraction: "present",
      air_entry: "absent_minimal",
      wheezing: "audible_or_silent_chest",
      oxygen_saturation: 90
    });

    expect(resultText(result)).not.toMatch(forbiddenRecommendations);
  });
});
