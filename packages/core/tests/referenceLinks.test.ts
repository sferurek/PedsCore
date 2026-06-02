import { describe, expect, it } from "vitest";
import {
  getReferenceUrl,
  isLikelyGenericReferenceUrl,
  isValidReferenceUrl,
  type Reference
} from "../src/index";

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

  it("does not return invalid direct URLs", () => {
    expect(getReferenceUrl({ ...baseReference, url: "not-a-url" })).toBeUndefined();
    expect(getReferenceUrl({ ...baseReference, url: "ftp://example.test/source" })).toBeUndefined();
  });

  it("does not return generic journal homepages or search URLs", () => {
    expect(
      getReferenceUrl({ ...baseReference, url: "https://journals.lww.com/" })
    ).toBeUndefined();
    expect(
      getReferenceUrl({
        ...baseReference,
        url: "https://pubmed.ncbi.nlm.nih.gov/?term=Apgar"
      })
    ).toBeUndefined();
  });

  it("recognizes concrete article and bibliographic URLs as valid", () => {
    expect(
      isValidReferenceUrl("https://pubmed.ncbi.nlm.nih.gov/13083014/")
    ).toBe(true);
    expect(
      isValidReferenceUrl(
        "https://publications.aap.org/pediatrics/article/17/1/1/39942/A-CONTROLLED-CLINICAL-TRIAL-OF-EFFECTS-OF-WATER"
      )
    ).toBe(true);
    expect(
      isLikelyGenericReferenceUrl("https://pubmed.ncbi.nlm.nih.gov/?term=Apgar")
    ).toBe(true);
  });
});
