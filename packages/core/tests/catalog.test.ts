import { describe, expect, it } from "vitest";
import {
  clinicalTools,
  getAllTools,
  getImplementedTools,
  getToolBySlug,
  getToolsByCategory,
  getToolsByStatus,
  searchTools
} from "../src/index";

const uniqueCount = (values: string[]) => new Set(values).size;

describe("clinical tools catalog", () => {
  it("loads the catalog without errors", () => {
    expect(getAllTools().length).toBeGreaterThan(50);
  });

  it("uses unique IDs and slugs", () => {
    expect(uniqueCount(clinicalTools.map((tool) => tool.id))).toBe(
      clinicalTools.length
    );
    expect(uniqueCount(clinicalTools.map((tool) => tool.slug))).toBe(
      clinicalTools.length
    );
  });

  it("requires disclaimers and implementation status for every tool", () => {
    expect(
      clinicalTools.every(
        (tool) => tool.disclaimerRequired === true && tool.implementationStatus
      )
    ).toBe(true);
  });

  it("assigns every tool to a category", () => {
    expect(clinicalTools.every((tool) => tool.category.length > 0)).toBe(true);
  });

  it("finds tools by slug, category, status, and implemented status", () => {
    expect(getToolBySlug("apgar")?.id).toBe("apgar");
    expect(getToolsByCategory("neonatology").length).toBeGreaterThan(5);
    expect(getToolsByStatus("pending_validation").length).toBeGreaterThan(5);
    expect(getImplementedTools()).toHaveLength(15);
  });

  it("searches by name, acronym, and category", () => {
    expect(searchTools("apgar", "en").some((tool) => tool.id === "apgar")).toBe(
      true
    );
    expect(searchTools("PRAM", "en").some((tool) => tool.id === "pram")).toBe(
      true
    );
    expect(
      searchTools("neonatology", "en").some(
        (tool) => tool.category === "neonatology"
      )
    ).toBe(true);
  });

  it("keeps PEWS pending validation", () => {
    expect(getToolBySlug("pews")?.implementationStatus).toBe(
      "pending_validation"
    );
  });

  it("does not include toxicology in the catalog", () => {
    const serializedCatalog = JSON.stringify(clinicalTools).toLocaleLowerCase(
      "en"
    );

    expect(serializedCatalog).not.toContain("toxic");
    expect(serializedCatalog).not.toContain("toxicol");
  });

  it("keeps input IDs unique within tools that define forms", () => {
    for (const tool of clinicalTools.filter((item) => item.inputs?.length)) {
      const inputIds = tool.inputs?.map((input) => input.id) ?? [];
      expect(uniqueCount(inputIds)).toBe(inputIds.length);
    }
  });

  it("requires labels for required inputs and single-choice options", () => {
    for (const tool of clinicalTools.filter((item) => item.inputs?.length)) {
      for (const input of tool.inputs ?? []) {
        if (input.required) {
          expect(input.label.es.length).toBeGreaterThan(0);
          expect(input.label.en.length).toBeGreaterThan(0);
        }

        if (input.type === "single_choice") {
          expect(input.options?.length).toBeGreaterThan(0);
          for (const option of input.options ?? []) {
            expect(option.label.es.length).toBeGreaterThan(0);
            expect(option.label.en.length).toBeGreaterThan(0);
          }
        }
      }
    }
  });

  it("keeps prioritized ready tools prepared or explicitly noted", () => {
    const prioritizedSlugs = [
      "apgar",
      "silverman-andersen",
      "flacc",
      "qtc-bazett",
      "qtc-fridericia",
      "qtc-framingham",
      "qtc-hodges",
      "bedside-schwartz",
      "pram",
      "westley-croup-score",
      "clinical-dehydration-scale",
      "pecarn-tbi-under-2",
      "pecarn-tbi-2-or-more",
      "sipa",
      "nips"
    ];

    for (const slug of prioritizedSlugs) {
      const tool = getToolBySlug(slug);
      expect(tool).toBeDefined();
      expect(
        Boolean(tool?.inputs?.length) || tool?.validationNotes.en.length
      ).toBe(true);
    }
  });
});
