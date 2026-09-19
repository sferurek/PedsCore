import { describe, expect, it } from "vitest";
import {
  clinicalReviewTierAToolIds,
  getClinicalReviewRecord,
  getTechnicalClinicalAudit
} from "../src/index.js";

describe("clinical review registry", () => {
  it("keeps the complete Tier A set frozen at 15 tools", () => {
    expect(clinicalReviewTierAToolIds).toHaveLength(15);
    expect(clinicalReviewTierAToolIds).toEqual(expect.arrayContaining([
      "prism_iv",
      "phoenix_sepsis",
      "pecarn_tbi_under_2",
      "pecarn_tbi_2_or_more",
      "kdigo_pediatric",
      "snappii"
    ]));
  });

  it("separates technical audit from independent review", () => {
    const phoenix = getClinicalReviewRecord("phoenix_sepsis");
    expect(phoenix.tier).toBe("A");
    expect(phoenix.technicalAudit?.status).toBe("remediated_and_verified");
    expect(phoenix.independentReviewStatus).toBe("not_started");
    expect(phoenix.independentReview).toBeNull();
  });

  it("tracks the adaptive-flow re-audit only for affected Tier A tools", () => {
    expect(getTechnicalClinicalAudit("step_by_step")?.verificationSha).toBe(
      "a9d2bfcb569600a5e0c9be681b729cc2bf4ba661"
    );
    expect(getTechnicalClinicalAudit("pim3")?.reportPath).toBe(
      "docs/TIER_A_ADAPTIVE_FLOW_REAUDIT_2026-09-19.md"
    );
    expect(getTechnicalClinicalAudit("phoenix_sepsis")?.verificationSha).toBe(
      "64b0dbc4cc0c7ae695536ae02006a049eb1bd059"
    );
  });

  it("does not assign Tier A audit status to unrelated tools", () => {
    expect(getTechnicalClinicalAudit("apgar")).toBeNull();
    expect(getClinicalReviewRecord("apgar").tier).toBe("unassigned");
  });
});
