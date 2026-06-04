import { describe, expect, it } from "vitest";
import { woodDownesFerresCalculator } from "../src/index";

const minInput = {
  wheezing: "none",
  retractions: "none",
  air_entry: "good_symmetric",
  respiratory_rate: "under_30",
  heart_rate: "under_120",
  cyanosis: "absent"
};

const forbidden =
  /tratamiento|ingreso|alta|ox[ií]geno|adrenalina|salbutamol|broncodilatador|UCI|derivaci[oó]n|antibi[oó]tico|corticoide|treatment|admission|discharge|oxygen|epinephrine|bronchodilator|antibiotic|corticosteroid|ICU|referral/i;

const resultText = (result: ReturnType<typeof woodDownesFerresCalculator.calculate>) =>
  JSON.stringify({
    classification: result.classification,
    criteriaMatched: result.criteriaMatched,
    interpretation: result.interpretation,
    warnings: result.warnings
  });

describe("Wood-Downes-Ferres calculator", () => {
  it("calculates minimum and maximum scores", () => {
    expect(woodDownesFerresCalculator.calculate(minInput).score).toBe(0);
    expect(
      woodDownesFerresCalculator.calculate({
        wheezing: "inspiration_and_expiration",
        retractions: "nasal_flaring",
        air_entry: "silent_chest",
        respiratory_rate: "over_60",
        heart_rate: "over_120",
        cyanosis: "present"
      }).score
    ).toBe(14);
  });

  it("classifies an intermediate score", () => {
    const result = woodDownesFerresCalculator.calculate({
      ...minInput,
      wheezing: "all_expiration",
      retractions: "subcostal",
      respiratory_rate: "31_to_45"
    });

    expect(result.score).toBe(4);
    expect(result.interpretation?.id).toBe("moderate");
  });

  it("warns on incomplete and invalid input", () => {
    expect(woodDownesFerresCalculator.calculate({}).warnings[0]?.id).toBe(
      "missing_required_inputs"
    );
    expect(
      woodDownesFerresCalculator.calculate({ ...minInput, wheezing: "bad" }).warnings[0]?.id
    ).toBe("invalid_score_input");
  });

  it("returns trace and matched criteria", () => {
    const result = woodDownesFerresCalculator.calculate({
      ...minInput,
      air_entry: "regular_symmetric",
      cyanosis: "present"
    });

    expect(result.trace).toHaveLength(6);
    expect(result.criteriaMatched).toHaveLength(2);
    expect(result.criteriaMatched?.map((criterion) => criterion.en)).toEqual([
      "Air entry",
      "Cyanosis"
    ]);
  });

  it("does not return prohibited clinical conduct wording", () => {
    const result = woodDownesFerresCalculator.calculate({
      ...minInput,
      wheezing: "inspiration_and_expiration",
      retractions: "nasal_flaring",
      air_entry: "silent_chest",
      respiratory_rate: "over_60",
      heart_rate: "over_120",
      cyanosis: "present"
    });

    expect(resultText(result)).not.toMatch(forbidden);
  });

  it("keeps scoring reproducible with the traced table", () => {
    const result = woodDownesFerresCalculator.calculate({
      wheezing: "end_expiration",
      retractions: "subcostal_intercostal",
      air_entry: "markedly_decreased",
      respiratory_rate: "46_to_60",
      heart_rate: "over_120",
      cyanosis: "absent"
    });

    expect(result.score).toBe(8);
    expect(result.maxScore).toBe(14);
    expect(result.interpretation?.id).toBe("severe");
  });
});
