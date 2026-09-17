import { describe, expect, it } from "vitest";
import {
  getAllTools,
  getCategorySeoProfile,
  getSemanticRelatedTools,
  getToolSeoProfile,
  indexableSeoCategories
} from "../src/index.js";

describe("SEO profiles", () => {
  it("covers every tool in both languages with specific compact metadata", () => {
    const tools = getAllTools();
    expect(tools).toHaveLength(134);

    for (const language of ["es", "en"] as const) {
      const titles = new Set<string>();

      for (const tool of tools) {
        const profile = getToolSeoProfile(tool, language);
        expect(profile.title.length).toBeGreaterThan(8);
        expect(profile.title.length).toBeLessThanOrEqual(60);
        expect(profile.title).toContain("PedsCore");
        expect(profile.description.length).toBeGreaterThan(40);
        expect(profile.description.length).toBeLessThanOrEqual(158);
        expect(profile.primaryTerm.length).toBeGreaterThan(0);
        expect(profile.topic.length).toBeGreaterThan(0);
        expect(titles.has(profile.title)).toBe(false);
        titles.add(profile.title);
      }
    }
  });

  it("uses search-intent titles for key active tools", () => {
    const bySlug = new Map(getAllTools().map((tool) => [tool.slug, tool]));
    expect(getToolSeoProfile(bySlug.get("pediatric-appendicitis-score")!, "en").title).toContain("Pediatric Appendicitis Score");
    expect(getToolSeoProfile(bySlug.get("pecarn-tbi-under-2")!, "en").title).toContain("Head Injury Rule");
    expect(getToolSeoProfile(bySlug.get("qtc-bazett")!, "en").title).toContain("Calculator");
    expect(getToolSeoProfile(bySlug.get("bedside-schwartz")!, "es").title).toContain("eGFR");
    expect(getToolSeoProfile(bySlug.get("cries")!, "es").description).toContain("Cálculo activo");
  });

  it("provides semantic related tools without self-links or duplicates", () => {
    for (const tool of getAllTools()) {
      const related = getSemanticRelatedTools(tool, 8);
      expect(related.length).toBeLessThanOrEqual(8);
      expect(related.some((candidate) => candidate.id === tool.id)).toBe(false);
      expect(new Set(related.map((candidate) => candidate.id)).size).toBe(related.length);
    }
  });

  it("exposes substantive category SEO pages for the complete taxonomy", () => {
    expect(indexableSeoCategories).toHaveLength(14);
    for (const category of indexableSeoCategories) {
      for (const language of ["es", "en"] as const) {
        const profile = getCategorySeoProfile(category, language);
        expect(profile.name.length).toBeGreaterThan(2);
        expect(profile.description.length).toBeGreaterThan(40);
      }
    }
  });
});
