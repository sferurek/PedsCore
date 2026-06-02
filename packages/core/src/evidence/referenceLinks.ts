import type { Reference } from "../types.js";

export const getReferenceUrl = (reference: Reference): string | undefined => {
  if (reference.doi) {
    return `https://doi.org/${reference.doi}`;
  }

  if (reference.pmid) {
    return `https://pubmed.ncbi.nlm.nih.gov/${reference.pmid}/`;
  }

  return reference.url;
};
