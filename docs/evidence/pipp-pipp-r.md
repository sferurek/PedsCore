# PIPP / PIPP-R

## Estado actual en PedsCore

- implementationStatus actual: `pending_validation`
- Motivo de bloqueo: PIPP/PIPP-R están catalogadas, pero PedsCore no tiene tabla completa validada ni revisión de licencia.
- Qué falta para implementación: seleccionar PIPP original vs PIPP-R, tabla completa, adaptación por edad gestacional, interpretación y derechos de reproducción.

## Pregunta de validación

¿Debe PedsCore implementar PIPP-R como versión preferida y dejar PIPP original como ficha histórica, o soportar ambas variantes?

## Fuente primaria

### PIPP original

- Título: Premature Infant Pain Profile: Development and Initial Validation
- Autores: Bonnie Stevens; Celeste Johnston; Patricia Petryshen; Anna Taddio
- Año: 1996
- Revista/editorial: The Clinical Journal of Pain
- DOI: 10.1097/00002508-199603000-00004
- PMID: no confirmado en este bloque
- URL directa: https://journals.lww.com/clinicalpain/fulltext/1996/03000/premature_infant_pain_profile__development_and.4.aspx
- Acceso: editorial / posible paywall

### PIPP-R

- Título: The premature infant pain profile-revised (PIPP-R): initial validation and feasibility
- Autores: Bonnie J. Stevens et al.
- Año: 2014
- Revista/editorial: The Clinical Journal of Pain
- DOI: 10.1097/AJP.0b013e3182906aed
- PMID: 24503979
- URL directa: https://pubmed.ncbi.nlm.nih.gov/24503979/
- Acceso: desconocido / editorial

## Fuentes secundarias relevantes

1. PIPP evaluation 13 years after development: https://pubmed.ncbi.nlm.nih.gov/20717010/
2. Practice update on preterm infant pain: https://pmc.ncbi.nlm.nih.gov/articles/PMC8869922/
3. PIPP-R protocol/adaptation literature: https://www.mdpi.com/1660-4601/19/19/12338

## Variables

| variable | descripción ES | descripción EN | tipo | opciones | puntuación | notas |
|---|---|---|---|---|---|---|
| gestational_age | edad gestacional | gestational age | number/derived | tabla no incorporada | requiere tabla | PIPP/PIPP-R difieren |
| behavioral_state | estado conductual | behavioral state | single_choice | tabla no incorporada | requiere tabla | pendiente |
| heart_rate_change | cambio FC | heart rate change | derived | tabla no incorporada | requiere tabla | pendiente |
| oxygen_saturation_change | cambio SpO2 | oxygen saturation change | derived | tabla no incorporada | requiere tabla | pendiente |
| brow_bulge | ceño fruncido | brow bulge | single_choice | tabla no incorporada | requiere tabla | facial action |
| eye_squeeze | ojos cerrados/apretados | eye squeeze | single_choice | tabla no incorporada | requiere tabla | facial action |
| nasolabial_furrow | surco nasolabial | nasolabial furrow | single_choice | tabla no incorporada | requiere tabla | facial action |

## Tabla completa de puntuación

Tabla completa no incorporada por posible copyright y necesidad de escoger variante exacta.

## Tabla de interpretación

Puntos de corte no localizados en documentación local para PIPP/PIPP-R. No inventar.

## Riesgos de copyright/licencia

- Riesgo: posible tabla protegida por editorial/instrumento.
- Requiere revisión antes de reproducir score sheet.

## Recomendación para PedsCore

`pending_validation`. Priorizar PIPP-R si se confirma tabla/licencia, manteniendo PIPP como variante separada.

## Casos de test futuros

- mínimo
- máximo
- caso pretermino extremo
- caso termino
- input incompleto
- input inválido
- ausencia de recomendaciones terapéuticas
