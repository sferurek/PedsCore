# Visual Analogue Scale / EVA

## Estado actual en PedsCore

- implementationStatus actual: `needs_primary_reference`
- Motivo de bloqueo: el catálogo no define formato operativo 0-10 frente a 0-100 mm ni población aplicable.
- Qué falta para implementación: decidir formato, edad mínima, instrucciones de uso, fuente pediátrica y tabla de interpretación si se usa.

## Pregunta de validación

¿PedsCore debe implementar EVA como línea 100 mm, escala 0-10, o ambos como variantes separadas?

## Fuente primaria

- Título: Measurement of pain
- Autores: E. C. Huskisson
- Año: 1974
- Revista/editorial: Lancet
- DOI: 10.1016/S0140-6736(74)90884-8
- PMID: 4139420
- URL directa: https://pubmed.ncbi.nlm.nih.gov/4139420/
- Acceso: desconocido

## Fuentes secundarias relevantes

1. Children’s self-reports of pain intensity: scale selection, limitations and interpretation: https://pmc.ncbi.nlm.nih.gov/articles/PMC2539005/
2. Validation of self-report pain scales in children: https://pmc.ncbi.nlm.nih.gov/articles/PMC3784298/
3. Vertical or horizontal visual analogue scales: https://pmc.ncbi.nlm.nih.gov/articles/PMC1000420/

## Variables

| variable | descripción ES | descripción EN | tipo | opciones | puntuación | notas |
|---|---|---|---|---|---|---|
| pain_intensity | intensidad autorreportada | self-reported pain intensity | number/slider | pendiente de formato | 0-10 o 0-100 mm | no activar hasta decidir formato |

## Tabla completa de puntuación

No aplica como score por ítems; el formato operativo no está definido en PedsCore.

## Tabla de interpretación

Puntos de corte no localizados para una variante pediátrica concreta en la documentación local. No inventar categorías.

## Riesgos de copyright/licencia

- Riesgo bajo para el concepto general de VAS.
- Riesgo de implementación: formato, instrucciones, edad mínima y validación pediátrica deben citarse de forma específica.

## Recomendación para PedsCore

`needs_primary_reference`. Crear variantes separadas si se decide soportar 0-10 y 0-100 mm.

## Casos de test futuros

- mínimo 0
- máximo según formato
- caso intermedio
- input incompleto
- input inválido fuera de rango
- ausencia de recomendaciones terapéuticas
