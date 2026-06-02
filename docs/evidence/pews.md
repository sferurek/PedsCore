# PEWS

## Estado actual en PedsCore

- implementationStatus actual: `pending_validation`
- Motivo de bloqueo: PEWS tiene múltiples variantes y escalas institucionales; no hay una versión universal.
- Qué falta para implementación: seleccionar variante exacta, separar score de protocolo de escalado, tabla completa y referencias.

## Pregunta de validación

¿PedsCore debe implementar Brighton/Monaghan PEWS, Bedside PEWS, Brighton PEWS separado, u otra variante institucional?

## Fuente primaria

- Título: Detecting and managing deterioration in children
- Autores: A. Monaghan
- Año: 2005
- Revista/editorial: Paediatric Nursing
- DOI: 10.7748/paed2005.02.17.1.32.c964
- PMID: no localizado
- URL directa: no abierta localizada; DOI citado por revisiones
- Acceso: desconocido / probablemente de pago

## Fuentes secundarias relevantes

1. Evaluating PEWS system for admitted PED patients: https://pmc.ncbi.nlm.nih.gov/articles/PMC4300231/
2. Modified PEWS / Brighton discussion: https://pmc.ncbi.nlm.nih.gov/articles/PMC3753259/
3. PEWS systematic review: https://pmc.ncbi.nlm.nih.gov/articles/PMC5353324/
4. Score variation comparison: https://adc.bmj.com/content/102/6/487

## Variables

| variable | descripción ES | descripción EN | tipo | opciones | puntuación | notas |
|---|---|---|---|---|---|---|
| behavior | comportamiento | behavior | single_choice | variante local parcial | 0-3 | versión pendiente |
| cardiovascular | cardiovascular | cardiovascular | single_choice | variante local parcial | 0-3 | edad/FC varían |
| respiratory | respiratorio | respiratory | single_choice | variante local parcial | 0-3 | oxígeno/FR varían |
| nebulizers | nebulizaciones | nebulizers | boolean/number | depende de variante | adicional | protocolo específico |
| vomiting | vómitos persistentes | persistent vomiting | boolean | depende de variante | adicional | protocolo específico |

## Tabla completa de puntuación

Tabla parcial existe en documentación local, pero no se debe implementar porque la versión y la fuente primaria no están cerradas.

## Tabla de interpretación

No hay cutoffs universales. Los protocolos suelen incorporar escalado operativo local, que PedsCore debe evitar convertir en recomendación directa.

## Riesgos de copyright/licencia

- Riesgo medio-alto por variantes institucionales y protocolos de escalado.
- Implementar solo score descriptivo, no acciones clínicas.

## Recomendación para PedsCore

`pending_validation`. Crear ficha de variantes antes de elegir una implementación.

## Casos de test futuros

- mínimo
- máximo por variante seleccionada
- caso intermedio
- input incompleto
- input inválido
- ausencia de recomendaciones de escalado/tratamiento
