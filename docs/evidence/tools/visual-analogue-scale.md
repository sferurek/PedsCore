# Visual Analogue Scale / EVA

## Current PedsCore status

- id: `visual_analogue_scale`
- slug: `visual-analogue-scale`
- implementationStatus: `implemented`
- calculationStatus: `active`

## Selected variant

PedsCore implements a true Visual Analogue Scale as a **100-mm line** for self-reported pain intensity.

The patient marks a point between the no-pain anchor and the opposite extreme. The score is the measured distance in millimetres from the no-pain end.

PedsCore intentionally does **not** treat a 0-10 Numeric Rating Scale as the same instrument.

## Pediatric scope

The selected pediatric use is for children older than 8 years and adolescents who can understand and complete a self-report VAS.

## Sources

- Huskisson EC. Measurement of pain. Lancet. 1974. DOI: 10.1016/S0140-6736(74)90884-8. PMID: 4139420.
- Evidence-based Assessment of Pediatric Pain: https://pmc.ncbi.nlm.nih.gov/articles/PMC2639489/
- ACTTION pediatric acute-pain trial recommendations: https://pmc.ncbi.nlm.nih.gov/articles/PMC5949239/

## Output

- 0-100 mm.
- Equivalent centimetres are shown for readability.
- No universal mild/moderate/severe classification is applied.

## Safety constraints

- Self-report only.
- Do not substitute observer scoring in children unable to use the scale reliably.
- No treatment recommendation or analgesic dosing is generated.
- No universal severity bands are imposed because thresholds vary by context and population.

## Licensing

VAS is a generic measurement construct. PedsCore reproduces no proprietary artwork, branded form, faces scale, or protected layout.

## Final decision

`implemented / local_active`
