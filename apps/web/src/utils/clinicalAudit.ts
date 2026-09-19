export interface TechnicalClinicalAuditRecord {
  auditDate: string;
  auditSha: string;
  verificationSha: string;
  reportPath: string;
  status: "remediated_and_verified";
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

const tierARecord: TechnicalClinicalAuditRecord = {
  auditDate: "2026-09-19",
  auditSha: "0fdc57f223b66222a6e373c409ba79745fabae83",
  verificationSha: "64b0dbc4cc0c7ae695536ae02006a049eb1bd059",
  reportPath: "docs/TIER_A_AI_CLINICAL_AUDIT_2026-09-19.md",
  status: "remediated_and_verified"
};

export const getTechnicalClinicalAudit = (
  toolId: string
): TechnicalClinicalAuditRecord | null =>
  tierAToolIds.has(toolId) ? tierARecord : null;
