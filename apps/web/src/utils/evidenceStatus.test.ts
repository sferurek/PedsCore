import { describe, expect, it } from "vitest";
import {
  evidenceStatusDescriptions,
  getUnlockActions,
  hasEvidenceBlock,
  isCalculationActive
} from "./evidenceStatus";

describe("evidence status helpers", () => {
  it("describes each implementation status in both languages", () => {
    expect(evidenceStatusDescriptions.implemented.es).toContain("Calculo activo");
    expect(evidenceStatusDescriptions.pending_validation.en).toContain("Pending validation");
    expect(evidenceStatusDescriptions.needs_primary_reference.es).toContain("fuente primaria");
    expect(evidenceStatusDescriptions.not_implemented_due_to_licensing.en).toContain("licensing");
  });

  it("returns unlock actions by status", () => {
    expect(getUnlockActions("pending_validation", "es")).toContain("Aportar fuente primaria.");
    expect(getUnlockActions("needs_primary_reference", "en")).toContain(
      "Provide DOI, PMID, or a stable link to the original source."
    );
    expect(getUnlockActions("not_implemented_due_to_licensing", "es")).toContain(
      "Confirmar licencia de uso."
    );
    expect(getUnlockActions("implemented", "en")).toEqual([]);
  });

  it("distinguishes implemented from non-implemented tools", () => {
    expect(isCalculationActive("implemented")).toBe(true);
    expect(isCalculationActive("pending_validation")).toBe(false);
    expect(hasEvidenceBlock("implemented")).toBe(false);
    expect(hasEvidenceBlock("needs_primary_reference")).toBe(true);
  });
});
