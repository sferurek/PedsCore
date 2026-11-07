import { describe, expect, it } from "vitest";
import { calculateTool, getTool } from "../src/index.js";

function baseline(toolId: string, maximum = false) {
  const input: Record<string, unknown> = { esr_mm_h: maximum ? 60 : 10, albumin_g_dl: maximum ? 3 : 4 };
  for (const field of getTool(toolId).inputs ?? []) {
    if (!field.options?.length) continue;
    const options = [...field.options].sort((a, b) => (a.score ?? 0) - (b.score ?? 0));
    input[field.id] = (maximum ? options.at(-1) : options[0])!.id;
  }
  return input;
}

describe.each(["pcdai", "wpcdai"])("%s non-negative laboratory contract — local follow-up", (toolId) => {
  it.each(["esr_mm_h", "albumin_g_dl"])("rejects negative %s before returning a score", (field) => {
    for (const value of [-1, "-1"]) {
      const result = calculateTool(toolId, { ...baseline(toolId), [field]: value });
      expect(result.score).toBeUndefined();
      expect(result.classification).toBeUndefined();
      expect(result.warnings[0]?.id).toBe(`invalid_${toolId}_inputs`);
      expect(result.trace).toContainEqual({ inputId: field, value: -1 });
    }
  });
  it("preserves zero, finite decimals and numeric strings without adding upper bounds", () => {
    for (const [esr, albumin] of [[0, 0], [20.5, 3.25], [250, 7]]) {
      const input = { ...baseline(toolId), esr_mm_h: esr, albumin_g_dl: albumin };
      const result = calculateTool(toolId, input);
      expect(result.score).toBeDefined();
      expect(calculateTool(toolId, { ...input, esr_mm_h: String(esr), albumin_g_dl: String(albumin) })).toEqual(result);
    }
  });
  it("preserves the existing missing-input response", () => {
    expect(calculateTool(toolId, { ...baseline(toolId), esr_mm_h: undefined }).warnings[0]?.id).toBe(`missing_${toolId}`);
  });
  it("preserves the existing maximum score", () => {
    expect(calculateTool(toolId, baseline(toolId, true)).score).toBe(toolId === "pcdai" ? 100 : 125);
  });
});
