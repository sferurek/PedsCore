# Wood-Downes-Ferres

## Current PedsCore status

- id: `wood_downes_ferres`
- slug: `wood-downes-ferres`
- category: `respiratory`
- type: `score`
- current implementationStatus: `implemented`
- current calculationStatus: `active`
- current evidenceLevel: `secondary_source`

## Evidence validation status

- final evidence status: `implemented_after_maintainer_variant_selection`
- maintainer decision: classic six-domain Wood-Downes-Ferres for pediatric bronchiolitis / lower respiratory distress.
- implementation scope: descriptive score, matched criteria, severity band, and trace only.
- safety scope: no clinical conduct, care disposition, medication, oxygen-support, or escalation wording.

## Clinical purpose

ES: valoracion descriptiva de gravedad respiratoria obstructiva en bronquiolitis/dificultad respiratoria baja pediatrica.

EN: descriptive assessment of obstructive respiratory distress severity in pediatric bronchiolitis/lower respiratory distress.

## Target population

Infants and children with bronchiolitis or lower obstructive respiratory distress where this local/historical score variant is used.

## Version / variant

- exact version: classic six-domain Wood-Downes-Ferres table.
- selected version for PedsCore: maintainer-selected six-domain variant.
- domains: wheezing, retractions, air entry, respiratory rate, heart rate, cyanosis.
- total range implemented: 0-14.
- variant risk: medium; other WDF tables may use different descriptors or ranges.

## Source trail

### Source anchor

- citation: Wood DW, Downes JJ, Lecks HI. A clinical scoring system for the diagnosis of respiratory failure: preliminary report on childhood status asthmaticus. Am J Dis Child. 1972;123(3):227-228.
- DOI: `10.1001/archpedi.1972.02110090097011`
- URL: https://jamanetwork.com/journals/jamapediatrics/fullarticle/504416
- access: `paywalled`
- role: historical Wood-Downes source anchor.

### Table source used for implementation

- citation: Crimer N. Broncodilatadores en pacientes con bronquiolitis. Evidencia Actualizacion en la Practica Ambulatoria. 2017;20(1). Table 1.
- URL: https://www.evidencia.org/index.php/Evidencia/article/view/4207/1697
- PDF: https://www.evidencia.org/index.php/Evidencia/article/download/4207/1698/
- access: `open_access`
- role: complete visible six-domain Wood-Downes-Ferres bronchiolitis table and descriptive bands.

### Cross-check source

- source: SAMIUC calculator page.
- URL: https://www.samiuc.es/escala-de-wood-downes-ferres-bronquiolitis2/
- role: corroborates the same six-domain option structure and cites Wood/Downes/Lecks plus an emergency-medicine chapter.
- note: SAMIUC page includes clinical conduct prose; PedsCore does not implement that prose.

## Complete scoring table

| variable | option | score | implementation id |
|---|---:|---:|---|
| Wheezing | No | 0 | `none` |
| Wheezing | End of expiration | 1 | `end_expiration` |
| Wheezing | Throughout expiration | 2 | `all_expiration` |
| Wheezing | Inspiration and expiration | 3 | `inspiration_and_expiration` |
| Retractions | No | 0 | `none` |
| Retractions | Subcostal | 1 | `subcostal` |
| Retractions | Subcostal and intercostal | 2 | `subcostal_intercostal` |
| Retractions | Nasal flaring | 3 | `nasal_flaring` |
| Air entry | Good and symmetric | 0 | `good_symmetric` |
| Air entry | Regular and symmetric | 1 | `regular_symmetric` |
| Air entry | Markedly decreased | 2 | `markedly_decreased` |
| Air entry | Silent chest | 3 | `silent_chest` |
| Respiratory rate | Under 30 rpm | 0 | `under_30` |
| Respiratory rate | 31 to 45 rpm | 1 | `31_to_45` |
| Respiratory rate | 46 to 60 rpm | 2 | `46_to_60` |
| Respiratory rate | Over 60 rpm | 3 | `over_60` |
| Heart rate | Under 120 bpm | 0 | `under_120` |
| Heart rate | Over 120 bpm | 1 | `over_120` |
| Cyanosis | No | 0 | `absent` |
| Cyanosis | Yes | 1 | `present` |

## Interpretation bands

| range | category | use in PedsCore |
|---|---|---|
| 0-3 | Mild | descriptive only |
| 4-7 | Moderate | descriptive only |
| 8-14 | Severe | descriptive only |

## Formula / algorithm

Add all six selected domain scores. No age interpolation or derived formula is used.

## Safety and regulatory notes

- risk level: medium.
- output is descriptive and traceable only.
- result includes an informational warning.
- no conduct, destination, medication, oxygen-support, or escalation language is returned.
- does not replace clinical assessment or local protocols.

## Licensing / copyright

- appears implementable: yes for PedsCore-authored option labels and score mapping traced to open visible table.
- license-sensitive: medium because the score has historical variants and non-open primary source access.
- future action: replace/augment with a more definitive Ferres primary source if found.

## Tests

- `packages/core/tests/woodDownesFerres.test.ts`
- `packages/core/tests/catalog.test.ts`
- `packages/core/tests/calculatorRegistry.test.ts`
- `packages/core/tests/sprint50Safety.test.ts`

## Direct links

- https://jamanetwork.com/journals/jamapediatrics/fullarticle/504416
- https://www.evidencia.org/index.php/Evidencia/article/view/4207/1697
- https://www.evidencia.org/index.php/Evidencia/article/download/4207/1698/
- https://www.samiuc.es/escala-de-wood-downes-ferres-bronquiolitis2/
