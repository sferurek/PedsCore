import { describe, expect, it } from "vitest";
import {
  calculateTool,
  getToolBySlug,
  implementedCalculatorToolIds
} from "../src/index";

const blockedTools = [
  { slug: "cheops", id: "cheops", status: "not_implemented_due_to_licensing", note: "exact score per option" },
  { slug: "visual-analogue-scale", id: "visual_analogue_scale", status: "needs_primary_reference", note: "0-10 versus 0-100 mm" },
  { slug: "pediatric-glasgow-coma-scale", id: "pediatric_gcs", status: "pending_validation", note: "pediatric verbal" },
  { slug: "brighton-pews", id: "brighton_pews", status: "not_implemented_due_to_licensing", note: "complete table is not available from a traceable reusable source" },
  { slug: "brosjod", id: "brosjod", status: "pending_validation", note: "Original/full table" },
  { slug: "pipp", id: "pipp", status: "not_implemented_due_to_licensing" },
  { slug: "comfortneo", id: "comfortneo", status: "pending_validation" }
] as const;

describe("Block 6A evidence gate", () => {
  it("keeps evidence-enrichment tools out of implemented calculators", () => {
    for (const tool of blockedTools) {
      expect(getToolBySlug(tool.slug)?.implementationStatus).toBe(tool.status);
      expect(implementedCalculatorToolIds).not.toContain(tool.id);
      expect(calculateTool(tool.id, {}).warnings[0]?.id).toBe("calculator_not_implemented");
    }
  });

  it("keeps validation notes for the most sensitive blockers", () => {
    for (const tool of blockedTools.filter((item) => item.note)) {
      expect(getToolBySlug(tool.slug)?.validationNotes.en).toContain(tool.note);
    }
  });

  it("keeps Wong-Baker inactive because of licensing", () => {
    expect(getToolBySlug("wong-baker-faces")?.implementationStatus).toBe(
      "not_implemented_due_to_licensing"
    );
    expect(implementedCalculatorToolIds).not.toContain("wong_baker_faces");
  });
});
