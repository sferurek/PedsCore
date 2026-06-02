import type { EvidenceLevel, Reference } from "../types.js";

export const evidenceLevelRank: Record<EvidenceLevel, number> = {
  original_derivation_study: 1,
  external_validation_study: 2,
  clinical_practice_guideline: 3,
  systematic_review: 4,
  consensus_statement: 5,
  official_manual_or_institutional_protocol: 6,
  peer_reviewed_review: 7,
  secondary_source: 8,
  local_project_documentation: 9,
  pending_primary_source: 10,
  high: 3,
  moderate: 7,
  low: 8,
  primary_reference_needed: 10,
  pending_verification: 10
};

export const sortReferences = (references: Reference[]): Reference[] =>
  [...references].sort((left, right) => {
    const evidenceDifference =
      evidenceLevelRank[left.evidenceLevel] - evidenceLevelRank[right.evidenceLevel];

    if (evidenceDifference !== 0) {
      return evidenceDifference;
    }

    const priorityDifference =
      (left.priority ?? Number.MAX_SAFE_INTEGER) -
      (right.priority ?? Number.MAX_SAFE_INTEGER);

    if (priorityDifference !== 0) {
      return priorityDifference;
    }

    const yearDifference = (right.year ?? 0) - (left.year ?? 0);

    if (yearDifference !== 0) {
      return yearDifference;
    }

    return left.title.localeCompare(right.title, "en", { sensitivity: "base" });
  });
