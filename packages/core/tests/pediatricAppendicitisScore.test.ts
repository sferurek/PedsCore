import { describe, expect, it } from "vitest";
import { pediatricAppendicitisScoreCalculator } from "../src/index";

const absentInput = {
  right_iliac_fossa_tenderness: "absent",
  cough_percussion_hopping_tenderness: "absent",
  anorexia: "absent",
  fever: "absent",
  nausea_or_vomiting: "absent",
  pain_migration: "absent",
  leukocytosis: "absent",
  neutrophilia: "absent"
};

const calculateScore = (score: number) => {
  const input = { ...absentInput };

  if (score >= 2) {
    input.right_iliac_fossa_tenderness = "present";
    score -= 2;
  }

  if (score >= 2) {
    input.cough_percussion_hopping_tenderness = "present";
    score -= 2;
  }

  const onePointInputs = [
    "anorexia",
    "fever",
    "nausea_or_vomiting",
    "pain_migration",
    "leukocytosis",
    "neutrophilia"
  ] as const;

  for (const inputId of onePointInputs) {
    if (score <= 0) {
      break;
    }

    input[inputId] = "present";
    score -= 1;
  }

  return pediatricAppendicitisScoreCalculator.calculate(input);
};

describe("Pediatric Appendicitis Score calculator", () => {
  it.each([
    [0, "low_risk"],
    [3, "low_risk"],
    [4, "intermediate_risk"],
    [6, "intermediate_risk"],
    [7, "high_risk"],
    [10, "high_risk"]
  ])("classifies %i points as %s", (score, expectedBand) => {
    const result = calculateScore(score);

    expect(result.score).toBe(score);
    expect(result.maxScore).toBe(10);
    expect(result.interpretation?.id).toBe(expectedBand);
  });

  it("warns on incomplete and invalid input", () => {
    expect(
      pediatricAppendicitisScoreCalculator.calculate({}).warnings[0]?.id
    ).toBe("missing_required_inputs");
    expect(
      pediatricAppendicitisScoreCalculator.calculate({
        ...absentInput,
        fever: "unexpected"
      }).warnings[0]?.id
    ).toBe("invalid_score_input");
  });
});
