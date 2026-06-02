import { describe, expect, it } from "vitest";
import { getReferenceUrl, type Reference } from "../src/index";

const baseReference: Reference = {
  id: "reference",
  title: "Reference",
  evidenceLevel: "original_derivation_study"
};

describe("getReferenceUrl", () => {
  it("prefers DOI links over PMID and direct URLs", () => {
    expect(
      getReferenceUrl({
        ...baseReference,
        doi: "10.1000/example",
        pmid: "12345",
        url: "https://example.test/source"
      })
    ).toBe("https://doi.org/10.1000/example");
  });

  it("uses PubMed links when PMID exists without DOI", () => {
    expect(getReferenceUrl({ ...baseReference, pmid: "12345" })).toBe(
      "https://pubmed.ncbi.nlm.nih.gov/12345/"
    );
  });

  it("uses direct URLs only when DOI and PMID are absent", () => {
    expect(getReferenceUrl({ ...baseReference, url: "https://example.test/source" })).toBe(
      "https://example.test/source"
    );
  });

  it("does not create fake links for references without identifiers", () => {
    expect(getReferenceUrl(baseReference)).toBeUndefined();
  });
});
