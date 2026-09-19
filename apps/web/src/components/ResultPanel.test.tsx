import { describe, expect, it } from "vitest";
import { getToolBySlug, type CalculationResult } from "@peds-core/core";
import { formatClinicalResultForClipboard } from "./ResultPanel";

describe("clinical result copy", () => {
  it("copies result context without reproducing input trace", () => {
    const tool = getToolBySlug("apgar");
    expect(tool).toBeDefined();

    const result: CalculationResult = {
      toolId: "apgar",
      score: 8,
      maxScore: 10,
      classification: { es: "Apgar 8/10", en: "Apgar 8/10" },
      warnings: [],
      trace: [{ inputId: "example_input", value: 42, score: 2 }]
    };

    const text = formatClinicalResultForClipboard("es", tool!, result);
    expect(text).toContain("Puntuación: 8 / 10");
    expect(text).toContain("Clasificación: Apgar 8/10");
    expect(text).toContain("Fuente:");
    expect(text).toContain("PedsCore");
    expect(text).not.toContain("example_input");
    expect(text).not.toContain("42");
  });
});
