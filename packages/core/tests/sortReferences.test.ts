import { describe, expect, it } from "vitest";
import { sortReferences, type Reference } from "../src/index";

const reference = (referenceData: Partial<Reference> & Pick<Reference, "id" | "title" | "evidenceLevel">): Reference => referenceData;

describe("sortReferences", () => {
  it("orders references by evidence level from strongest to weakest", () => {
    const sorted = sortReferences([
      reference({ id: "local", title: "Local note", evidenceLevel: "local_project_documentation" }),
      reference({ id: "validation", title: "Validation", evidenceLevel: "external_validation_study" }),
      reference({ id: "original", title: "Original", evidenceLevel: "original_derivation_study" })
    ]);

    expect(sorted.map((item) => item.id)).toEqual([
      "original",
      "validation",
      "local"
    ]);
  });

  it("uses priority, recent year, and title as tie breakers", () => {
    const sorted = sortReferences([
      reference({ id: "z", title: "Zeta", evidenceLevel: "systematic_review", year: 2020 }),
      reference({ id: "a", title: "Alpha", evidenceLevel: "systematic_review", year: 2020 }),
      reference({ id: "newer", title: "Newer", evidenceLevel: "systematic_review", year: 2024 }),
      reference({ id: "priority", title: "Priority", evidenceLevel: "systematic_review", priority: 1, year: 2010 })
    ]);

    expect(sorted.map((item) => item.id)).toEqual([
      "priority",
      "newer",
      "a",
      "z"
    ]);
  });
});
