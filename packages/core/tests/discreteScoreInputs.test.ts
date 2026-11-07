import { describe, expect, it } from "vitest";
import { calculateTool, getAllTools, getTool } from "../src/index.js";
import { getNumericScore } from "../src/calculators/common.js";

const fixtures = [
  { id: "apgar", field: "heart_rate", value: 0.5 },
  { id: "pediatric_appendicitis_score", field: "anorexia", value: 2 },
  { id: "pediatric_appendicitis_score", field: "right_iliac_fossa_tenderness", value: 1 },
  { id: "silverman_andersen", field: "nasal_flaring", value: 0.5 },
  { id: "clinical_dehydration_scale", field: "eyes", value: 0.5 }
];

const firstChoices = (id: string) => Object.fromEntries(
  getTool(id).inputs!.map((field) => [field.id, field.options?.[0]?.id ?? ""])
);

const combinations = <T>(lists: T[][]): T[][] => lists.reduce<T[][]>(
  (rows, list) => rows.flatMap((row) => list.map((item) => [...row, item])), [[]]
);

describe("discrete numeric score input contract", () => {
  it.each(fixtures)("rejects unsupported numeric points in $id.$field", ({ id, field, value }) => {
    const result = calculateTool(id, { ...firstChoices(id), [field]: value });
    expect(result.score).toBeUndefined();
    expect(result.classification).toBeUndefined();
    expect(result.interpretation).toBeUndefined();
    expect(result.warnings.some((warning) => warning.id === "invalid_score_input")).toBe(true);
  });

  it("does not return PAS 16/10 from eight unsupported two-point inputs", () => {
    const input = Object.fromEntries(getTool("pediatric_appendicitis_score").inputs!.map((field) => [field.id, 2]));
    const result = calculateTool("pediatric_appendicitis_score", input);
    expect(result.score).toBeUndefined();
    expect(result.warnings[0]?.id).toBe("invalid_score_input");
  });

  it("preserves every catalog option's numeric equivalent, including supported fractional points", () => {
    let optionCount = 0;
    for (const tool of getAllTools()) {
      for (const field of tool.inputs ?? []) {
        for (const option of field.options ?? []) {
          if (typeof option.score !== "number") continue;
          const context = `${tool.id}.${field.id}.${option.id}`;
          expect(getNumericScore(tool, { [field.id]: option.id }, field.id), context).toBe(option.score);
          expect(getNumericScore(tool, { [field.id]: option.score }, field.id), context).toBe(option.score);
          optionCount++;
        }
      }
    }
    expect(optionCount).toBeGreaterThan(100);
    expect(getNumericScore(getTool("pcdai"), { hematocrit_category: 2.5 }, "hematocrit_category")).toBe(2.5);
  });

  it("rejects numeric points outside each catalog option set", () => {
    for (const tool of getAllTools()) {
      for (const field of tool.inputs ?? []) {
        const scores = field.options?.map((option) => option.score).filter((score): score is number => typeof score === "number");
        if (!scores?.length) continue;
        const unsupported = Math.max(...scores) + 0.25;
        expect(getNumericScore(tool, { [field.id]: unsupported }, field.id), `${tool.id}.${field.id}`).toBeNull();
      }
    }
  });

  it.each(["apgar", "silverman_andersen", "clinical_dehydration_scale", "pediatric_appendicitis_score"])(
    "preserves descriptor/numeric results for every supported combination in %s", (id) => {
      const tool = getTool(id);
      const scored = tool.inputs!.filter((field) => field.options?.some((option) => typeof option.score === "number"));
      const times = id === "apgar" ? ["one_minute", "five_minutes"] : [undefined];
      for (const options of combinations(scored.map((field) => field.options!))) {
        const descriptors = Object.fromEntries(scored.map((field, index) => [field.id, options[index].id]));
        const numbers = Object.fromEntries(scored.map((field, index) => [field.id, options[index].score]));
        for (const time of times) {
          const extra = time ? { assessment_time: time } : {};
          const byDescriptor = calculateTool(id, { ...extra, ...descriptors });
          const byNumber = calculateTool(id, { ...extra, ...numbers });
          expect(byNumber.score).toBeDefined();
          expect({ ...byNumber, trace: [] }).toEqual({ ...byDescriptor, trace: [] });
        }
      }
    }
  );

  it("retains finite continuous inputs when no discrete option set is defined", () => {
    const tool = getTool("bedside_schwartz");
    expect(getNumericScore(tool, { height_cm: 123.45 }, "height_cm")).toBe(123.45);
    expect(getNumericScore(tool, { height_cm: Infinity }, "height_cm")).toBeNull();
  });
});
