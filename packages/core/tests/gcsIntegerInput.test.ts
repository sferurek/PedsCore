import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { calculateTool, type CalculationResult } from "../src/index.js";

const baseline = JSON.parse(readFileSync(new URL("./fixtures/gcs-valid-baseline-20261107.json", import.meta.url), "utf8")) as {
  tools: Array<{ toolId: string; input: Record<string, unknown>; outputs: Array<Record<string, unknown> & { gcs: number }> }>;
};
const invalidIds: Record<string, string> = {
  pelod_2: "invalid_pelod2_inputs", prism_iv: "invalid_prism4_inputs",
  psofa: "invalid_psofa_inputs", phoenix_sepsis: "invalid_phoenix_inputs"
};
const output = (result: CalculationResult) => ({
  score: result.score ?? null, value: result.value ?? null, maxScore: result.maxScore ?? null,
  classification: result.classification ?? null, interpretationId: result.interpretation?.id ?? null,
  warningIds: result.warnings.map((item) => item.id)
});

describe("priority-tool GCS integer input contract — local follow-up", () => {
  it.each(baseline.tools)("rejects fractional GCS without rounding in $toolId", ({ toolId, input }) => {
    for (const gcs of [3.5, 7.5, 10.5, 14.5, "10.5"]) {
      const result = calculateTool(toolId, { ...input, gcs });
      expect(result.score, `${toolId} GCS=${gcs}`).toBeUndefined();
      expect(result.value).toBeUndefined();
      expect(result.classification).toBeUndefined();
      expect(result.warnings[0]?.id).toBe(invalidIds[toolId]);
    }
  });

  it.each(baseline.tools)("preserves all 13 recorded integer outputs in $toolId", ({ toolId, input, outputs }) => {
    expect(outputs).toHaveLength(13);
    for (const { gcs, ...expected } of outputs) {
      expect(output(calculateTool(toolId, { ...input, gcs })), `${toolId} GCS=${gcs}`).toEqual(expected);
    }
  });

  it("preserves finite whole-number string encodings", () => {
    for (const { toolId, input } of baseline.tools) {
      expect(output(calculateTool(toolId, { ...input, gcs: "10.0" })))
        .toEqual(output(calculateTool(toolId, { ...input, gcs: 10 })));
    }
  });

  it("preserves existing out-of-range guards and does not turn NT into a number", () => {
    for (const { toolId, input } of baseline.tools) {
      for (const gcs of [2, 16, "NT"]) {
        const result = calculateTool(toolId, { ...input, gcs });
        expect(result.score).toBeUndefined();
        expect(result.value).toBeUndefined();
      }
    }
  });

  it("preserves optional unmeasured Phoenix GCS and required missing inputs in the other tools", () => {
    for (const { toolId, input } of baseline.tools) {
      const result = calculateTool(toolId, { ...input, gcs: undefined });
      if (toolId === "phoenix_sepsis") {
        expect(result.score).toBe(0);
        expect(result.warnings.some((item) => item.id === "phoenix_partial_data")).toBe(true);
      } else expect(result.score).toBeUndefined();
    }
  });
});
