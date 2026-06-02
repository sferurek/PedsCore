# Pediatric Glasgow Coma Scale

## Estado actual en PedsCore

- implementationStatus actual: `pending_validation`
- Motivo de bloqueo: falta selección de versión pediátrica y tabla verbal por edad/desarrollo.
- Qué falta para implementación: fuente primaria pediatric/Adelaide GCS, tabla para lactantes/preverbales, tabla para niños verbales y reglas de no evaluable.

## Pregunta de validación

¿Qué versión pediátrica debe usar PedsCore: Adelaide pediatric GCS, una adaptación EMS, o una variante institucional?

## Fuente primaria

- Título: Assessing the conscious level in infants and young children: a paediatric version of the Glasgow Coma Scale
- Autores: no confirmados en este bloque
- Año: no confirmado en este bloque
- Revista/editorial: Child's Nervous System según FAQ oficial GCS
- DOI: no confirmado
- PMID: no confirmado
- URL directa: https://www.glasgowcomascale.org/faq/
- Acceso: desconocido

## Fuentes secundarias relevantes

1. Official Glasgow Coma Scale FAQ: https://www.glasgowcomascale.org/faq/
2. StatPearls GCS overview with pediatric notes: https://www.ncbi.nlm.nih.gov/books/NBK513298/
3. Neurotrauma pediatric scales review: https://pmc.ncbi.nlm.nih.gov/articles/PMC5654209/

## Variables

| variable | descripción ES | descripción EN | tipo | opciones | puntuación | notas |
|---|---|---|---|---|---|---|
| eye_response | respuesta ocular | eye response | single_choice | tabla parcial localizada | 1-4 | confirmar versión |
| verbal_response_pediatric | respuesta verbal pediátrica | pediatric verbal response | single_choice | tabla por edad no seleccionada | 1-5 | principal bloqueo |
| motor_response | respuesta motora | motor response | single_choice | tabla parcial localizada | 1-6 | confirmar versión |

## Tabla completa de puntuación

Tabla completa no incorporada. Existen múltiples adaptaciones para lactantes, preverbales y niños verbales.

## Tabla de interpretación

Puntos de corte no localizados para una versión pediátrica única en PedsCore. Evitar categorías clínicas fuertes hasta seleccionar fuente.

## Riesgos de copyright/licencia

- Riesgo bajo-medio.
- La escala GCS está ampliamente difundida, pero la tabla pediátrica/adaptada exacta debe citarse y revisarse.

## Recomendación para PedsCore

`pending_validation`. Implementar solo tras seleccionar variante y fuente.

## Casos de test futuros

- mínimo 3
- máximo 15
- verbal lactante/preverbal
- verbal niño verbal
- input incompleto
- input inválido
- ausencia de recomendaciones terapéuticas
