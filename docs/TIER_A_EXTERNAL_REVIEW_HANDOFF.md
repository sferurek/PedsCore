# Giving PedsCore Tier A to an external reviewer

Send the reviewer these three items:

1. Production site: https://peds-core.vercel.app/
2. Review pack: `docs/TIER_A_EXTERNAL_REVIEW_PACK.md`
3. GitHub Clinical review issue template: `.github/ISSUE_TEMPLATE/clinical-review.yml`
4. Frozen clinical implementation SHA: `a9d2bfcb569600a5e0c9be681b729cc2bf4ba661`

Recommended message:

> I am asking you to independently verify the clinical fidelity of 15 high-risk pediatric tools in PedsCore. You do not need to review the code. Please compare each visible implementation with its primary/authoritative source, use the checklist in the review pack, and record any discrepancy. Please do not enter identifiable patient data. The clinical implementation is frozen at commit `a9d2bfcb569600a5e0c9be681b729cc2bf4ba661` so your review remains reproducible.

## Definition of completion

Tier A external review is complete only when all 15 tools have a documented outcome against the agreed frozen commit, and every correction classified as minor or logic-changing has been resolved and rechecked.

Until that point, public UI must continue to distinguish the completed technical/AI-assisted audit from independent external clinical review.
