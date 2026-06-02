# Finnegan / Modified Finnegan

## Estado actual en PedsCore

- implementationStatus actual: `pending_validation`
- Motivo de bloqueo: múltiples versiones, tabla extensa, criterios de tratamiento incluidos en muchas fuentes y riesgo de convertir score en recomendación.
- Qué falta para implementación: escoger versión, tabla completa verificable, fuente primaria, licencia y redacción estrictamente descriptiva.

## Pregunta de validación

¿Debe PedsCore implementar original Finnegan, Modified Finnegan, o una versión simplificada como fichas separadas?

## Fuente primaria

- Título: Neonatal abstinence syndrome: assessment and management / Finnegan scoring system family
- Autores: L. P. Finnegan et al. (bibliografía original requiere confirmación)
- Año: 1970s-1980s según versiones
- Revista/editorial: no cerrado en este bloque
- DOI: no localizado
- PMID: no localizado para fuente original exacta
- URL directa: NCBI Bookshelf annex with Modified Finnegan chart: https://www.ncbi.nlm.nih.gov/books/NBK143183/bin/annex10-fm4.pdf
- Acceso: abierto para annex; origen/licencia de tabla requiere revisión

## Fuentes secundarias relevantes

1. Evaluation and analysis of Modified Finnegan: https://pubmed.ncbi.nlm.nih.gov/32421839/
2. Simplification of Finnegan scoring system: https://pubmed.ncbi.nlm.nih.gov/28963285/
3. Simplified FNAST association study: https://pmc.ncbi.nlm.nih.gov/articles/PMC7142377/

## Variables

| variable | descripción ES | descripción EN | tipo | opciones | puntuación | notas |
|---|---|---|---|---|---|---|
| central_nervous_system | signos neurológicos | CNS signs | multi_section | tabla extensa | variable | version-sensitive |
| metabolic_vasomotor_respiratory | signos metabólicos/vasomotores/respiratorios | metabolic/vasomotor/respiratory signs | multi_section | tabla extensa | variable | version-sensitive |
| gastrointestinal | signos gastrointestinales | gastrointestinal signs | multi_section | tabla extensa | variable | version-sensitive |

## Tabla completa de puntuación

Existe una tabla extensa en anexo NCBI Bookshelf, pero PedsCore no debe copiarla ni implementarla hasta decidir versión y licencia.

## Tabla de interpretación

Criterios de intervención farmacológica aparecen en fuentes, pero PedsCore no debe incorporarlos como recomendación directa. Si se implementa en el futuro, mostrar solo score y trazabilidad.

## Riesgos de copyright/licencia

- Riesgo medio-alto por formularios/tablas reproducidas y variantes.
- Riesgo clínico alto de generar recomendaciones terapéuticas si se copian umbrales de tratamiento.

## Recomendación para PedsCore

`pending_validation`. Dividir en fichas: original Finnegan, Modified Finnegan, simplified Finnegan si se decide avanzar.

## Casos de test futuros

- mínimo
- máximo por versión
- caso intermedio
- input incompleto
- input inválido
- ausencia de recomendaciones terapéuticas o farmacológicas
