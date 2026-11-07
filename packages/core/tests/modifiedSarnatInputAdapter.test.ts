import { describe, expect, it } from "vitest";
import { calculateTool, getTool } from "../src/index.js";

const tool = getTool("modified_sarnat_nichd");
const fields = tool.inputs!;
const numeric = (score: number) => Object.fromEntries(fields.map((field) => [field.id, score]));
const descriptors = (id: string) => Object.fromEntries(fields.map((field) => [field.id, id]));

describe("Modified Sarnat declared form-input adapter — local follow-up", () => {
  it("accepts the exact normal and severe IDs produced by the web selects", () => {
    expect(calculateTool(tool.id, descriptors("normal")).score).toBe(0);
    expect(calculateTool(tool.id, descriptors("severe")).score).toBe(18);
  });

  it("preserves existing numeric results for all 4096 complete descriptor combinations", () => {
    for (let code = 0; code < 4096; code++) {
      let remaining = code;
      const names: Record<string, unknown> = {}, points: Record<string, unknown> = {}, strings: Record<string, unknown> = {};
      for (const field of fields) {
        const score = remaining % 4;
        remaining = Math.floor(remaining / 4);
        const option = field.options!.find((item) => item.score === score)!;
        names[field.id] = option.id;
        points[field.id] = score;
        strings[field.id] = String(score);
      }
      const expected = calculateTool(tool.id, points);
      expect(calculateTool(tool.id, names), `descriptor combination ${code}`).toEqual(expected);
      expect(calculateTool(tool.id, strings), `legacy numeric-string combination ${code}`).toEqual(expected);
    }
  });

  it("keeps finite integer numeric strings and integer point values compatible", () => {
    expect(calculateTool(tool.id, Object.fromEntries(fields.map((field) => [field.id, "3.0"]))))
      .toEqual(calculateTool(tool.id, numeric(3)));
  });

  it("does not coerce unknown, fractional, out-of-range or missing categories into normal", () => {
    for (const field of fields) {
      for (const value of ["UNSUPPORTED", 1.5, "1.5", 4, -1, {}, []]) {
        const result = calculateTool(tool.id, { ...numeric(0), [field.id]: value });
        expect(result.score).toBeUndefined();
        expect(result.warnings[0]?.id).toBe("invalid_modified_sarnat_category");
      }
      expect(calculateTool(tool.id, { ...numeric(0), [field.id]: undefined }).warnings[0]?.id).toBe("missing_required_inputs");
    }
  });
});
