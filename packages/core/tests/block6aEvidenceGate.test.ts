import { describe, expect, it } from "vitest";
import {
  calculateTool,
  getToolBySlug,
  implementedCalculatorToolIds
} from "../src/index";

const blockedTools = [
  { slug: "cries", id: "cries", status: "pending_validation", note: "exact 0/1/2 options" },
  { slug: "cheops", id: "cheops", status: "pending_validation", note: "exact score per option" },
  { slug: "visual-analogue-scale", id: "visual_analogue_scale", status: "needs_primary_reference", note: "0-10 versus 0-100 mm" },
  { slug: "thompson-hie-score", id: "thompson_hie", status: "pending_validation", note: "specific ranges" },
  { slug: "wood-downes-ferres", id: "wood_downes_ferres", status: "pending_validation", note: "exact version" },
  { slug: "pediatric-glasgow-coma-scale", id: "pediatric_gcs", status: "pending_validation", note: "pediatric verbal" },
  { slug: "pews", id: "pews", status: "pending_validation", note: "multiple" },
  { slug: "pipp", id: "pipp", status: "pending_validation" },
  { slug: "pipp-r", id: "pipp_r", status: "pending_validation" },
  { slug: "comfortneo", id: "comfortneo", status: "pending_validation" },
  { slug: "modified-finnegan", id: "modified_finnegan", status: "pending_validation" }
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
