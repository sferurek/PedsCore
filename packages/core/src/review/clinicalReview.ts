export type ClinicalReviewTier = "A" | "B" | "C" | "unassigned";
export type IndependentReviewStatus = "not_started" | "in_progress" | "completed";

export interface TechnicalAuditRecord {
  auditDate: string;
  auditSha: string;
  verificationSha: string;
  reportPath: string;
  status: "remediated_and_verified";
}

export interface IndependentClinicalReviewRecord {
  reviewer: string;
  reviewerRole: string;
  reviewDate: string;
  reviewedSha: string;
  outcome:
    | "reviewed_no_change"
    | "reviewed_minor_correction"
    | "reviewed_logic_change"
    | "review_blocked_source"
    | "review_blocked_rights";
  issueUrl?: string;
}

export interface ClinicalReviewRecord {
  toolId: string;
  tier: ClinicalReviewTier;
  technicalAudit: TechnicalAuditRecord | null;
  independentReviewStatus: IndependentReviewStatus;
  independentReview: IndependentClinicalReviewRecord | null;
}

const tierAToolIds = new Set([
  "prism_iv",
  "pelod_2",
  "pim3",
  "psofa",
  "phoenix_sepsis",
  "step_by_step",
  "pecarn_febrile_infant",
  "pecarn_tbi_under_2",
  "pecarn_tbi_2_or_more",
  "catch_tbi",
  "chalice_tbi",
  "prifle",
  "kdigo_pediatric",
  "nsofa",
  "snappii"
]);

const tierBToolIds = new Set([
  "modified_sarnat_nichd",
  "thompson_hie",
  "garcia_alix_ners",
  "modified_bell_nec",
  "ckid_u25",
  "revised_schwartz",
  "bedside_schwartz",
  "bacterial_meningitis_score",
  "parc",
  "sipa",
  "pediatric_appendicitis_score",
  "gorelick_dehydration",
  "clinical_dehydration_scale"
]);

const tierARecord: TechnicalAuditRecord = {
  auditDate: "2026-09-19",
  auditSha: "0fdc57f223b66222a6e373c409ba79745fabae83",
  verificationSha: "64b0dbc4cc0c7ae695536ae02006a049eb1bd059",
  reportPath: "docs/TIER_A_AI_CLINICAL_AUDIT_2026-09-19.md",
  status: "remediated_and_verified"
};

// Independent reviews must only be added after an identifiable reviewer has
// completed the documented Clinical Review Program against an exact commit.
const independentReviewByToolId: Record<string, IndependentClinicalReviewRecord> = {};

export const getClinicalReviewTier = (toolId: string): ClinicalReviewTier => {
  if (tierAToolIds.has(toolId)) return "A";
  if (tierBToolIds.has(toolId)) return "B";
  return "unassigned";
};

export const getTechnicalClinicalAudit = (
  toolId: string
): TechnicalAuditRecord | null =>
  tierAToolIds.has(toolId) ? tierARecord : null;

export const getIndependentClinicalReview = (
  toolId: string
): IndependentClinicalReviewRecord | null =>
  independentReviewByToolId[toolId] ?? null;

export const getClinicalReviewRecord = (toolId: string): ClinicalReviewRecord => {
  const independentReview = getIndependentClinicalReview(toolId);

  return {
    toolId,
    tier: getClinicalReviewTier(toolId),
    technicalAudit: getTechnicalClinicalAudit(toolId),
    independentReviewStatus: independentReview ? "completed" : "not_started",
    independentReview
  };
};

export const clinicalReviewTierAToolIds = [...tierAToolIds];
export const clinicalReviewTierBToolIds = [...tierBToolIds];
