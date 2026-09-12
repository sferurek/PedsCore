# PRAM - Pediatric Respiratory Assessment Measure

Date: 2026-09-12

## Current PedsCore status

- id/slug: `pram`
- category: `respiratory`
- type: `score`
- implementation/calculation status: `implemented` / `active`
- forensic status: `verified` in Batch 0B1; production release requires owner approval

## Clinical purpose and population

PRAM is a 0-12 clinical score for descriptive measurement of acute asthma exacerbation severity and change across serial assessments. PedsCore supports children aged 2 to under 18 years, matching the direct 2008 validation in ages 2-17. It is not presented for bronchiolitis, undifferentiated first-time wheeze, adults, or as a diagnostic or treatment rule.

## Selected canonical version

The canonical five-domain PRAM reproduced in the 2008 pediatric validation:

| Domain | Points |
|---|---|
| Stable room-air SpO2 | `>=95%` 0; `92-94%` 1; `<92%` 2 |
| Suprasternal retractions | absent 0; present 2 |
| Palpable scalene contraction | absent 0; present 2 |
| Air entry | normal 0; decreased at bases 1; widespread decrease 2; absent/minimal 3 |
| Wheezing | absent 0; expiratory only 1; inspiratory and expiratory 2; audible without stethoscope or silent chest with minimal air entry 3 |

If auscultatory findings are asymmetric, the more severely affected side/areas determine the rating. All five domains are required.

## SpO2 operational rule

The BC Children's Hospital implementation based on the Sainte-Justine teaching module requires SpO2 measured while breathing ambient air and stable for at least 1 minute. A reading obtained on supplemental oxygen is not scored as though it were a room-air value. PedsCore requires explicit confirmation; otherwise it returns no total or severity classification. It does not direct a clinician to interrupt oxygen.

The 2008 study recorded PRAM at triage, after initial bronchodilation, and at disposition, so the instrument is not restricted to pretreatment assessment. The room-air/stability condition still applies to each oxygen component.

## Total and descriptive bands

- total: 0-12
- mild: 0-3
- moderate: 4-7
- severe: 8-12

The 2008 validation proposed the same partitions as low/moderate/high admission-risk strata; PedsCore retains only descriptive severity labels and does not predict an individual disposition or produce management advice.

## Sources

1. Chalut DS, Ducharme FM, Davis GM. *The Preschool Respiratory Assessment Measure (PRAM): a responsive index of acute asthma severity.* J Pediatr. 2000;137(6):762-768. DOI `10.1067/mpd.2000.110121`; PMID `11113831`.
2. Ducharme FM et al. *The Pediatric Respiratory Assessment Measure: a valid clinical score for assessing acute asthma severity from toddlers to teenagers.* J Pediatr. 2008;152(4):476-480.e1. DOI `10.1016/j.jpeds.2007.08.034`; PMID `18346499`.
3. Gouin S et al. *Prospective evaluation of two clinical scores for acute asthma in children 18 months to 7 years of age.* Acad Emerg Med. 2010;17(6):598-603. DOI `10.1111/j.1553-2712.2010.00775.x`; PMID `20624139`.
4. Lehr AR et al. *Development and pretesting of an electronic learning module to train health care professionals on the use of the Pediatric Respiratory Assessment Measure to assess acute asthma severity.* Can Respir J. 2013;20(6):435-441. DOI `10.1155/2013/148645`; PMID `24046819`; PMCID `PMC3917818`.
5. BC Children's Hospital. *PRAM: Score Assessment for Asthma.* Child and Youth Health Policy Manual CC.09.27, effective 2015.

Full forensic rationale: `docs/clinical-audit/PRAM_FORENSIC_REVIEW.md`.

## Variant and reuse controls

Do not mix altitude-adjusted SpO2 cutoffs, 0-4/5-8/9-12 bands, local treatment pathways, PASS, or AAIRS into this definition. PedsCore independently represents the algorithm and concise functional observations; it does not reproduce the copyrighted journal figure, institutional form, tutorial media, logo, or branding. No instrument-specific electronic implementation restriction was located.

## Test coverage

- all valid options in every domain;
- minimum, maximum, intermediate totals;
- age boundaries 2 and 18;
- SpO2 exact thresholds, adjacent decimals, 0, invalid values, missing and non-finite inputs;
- room-air confirmation and supplemental-oxygen/unconfirmed behavior;
- severity boundaries 3/4 and 7/8;
- trace completeness and descriptor-to-score mapping;
- forbidden therapeutic/disposition wording.
