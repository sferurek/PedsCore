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

  it("does not assign Tier A audit status to unrelated tools", () => {
    expect(getTechnicalClinicalAudit("apgar")).toBeNull();
    expect(getClinicalReviewRecord("apgar").tier).toBe("unassigned");
  });
});
