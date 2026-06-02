# COMFORTneo

## Estado actual en PedsCore

- implementationStatus actual: `pending_validation`
- Motivo de bloqueo: falta tabla oficial completa y decisión sobre ventilado/no ventilado.
- Qué falta para implementación: score sheet oficial, ítems por subgrupo, interpretación, licencia y tests.

## Pregunta de validación

¿Puede PedsCore implementar COMFORTneo como herramienta de dolor/sedación neonatal sin copiar tabla protegida y distinguiendo correctamente pacientes ventilados y no ventilados?

## Fuente primaria

- Título: COMFORTneo scale: a reliable and valid instrument to measure prolonged pain in neonates?
- Autores: no completado en este bloque
- Año: 2023
- Revista/editorial: Journal of Pediatrics / source PubMed indexed
- DOI: no confirmado en este bloque
- PMID: 36746985
- URL directa: https://pubmed.ncbi.nlm.nih.gov/36746985/
- Acceso: desconocido

## Fuentes secundarias relevantes

1. Critical evaluation of COMFORTneo validity/applicability in preterm infants: https://pmc.ncbi.nlm.nih.gov/articles/PMC12224991/
2. Recent COMFORTneo-Brazil validation: https://www.nature.com/articles/s41372-025-02430-x

## Variables

| variable | descripción ES | descripción EN | tipo | opciones | puntuación | notas |
|---|---|---|---|---|---|---|
| alertness | alerta | alertness | single_choice | tabla completa no incorporada | escala ordinal | pendiente |
| respiratory_response | respuesta respiratoria | respiratory response | single_choice | ventilados | escala ordinal | depende de ventilación |
| crying | llanto | crying | single_choice | no ventilados | escala ordinal | alternativa a respiratorio |
| movement | movimiento | movement | single_choice | tabla completa no incorporada | escala ordinal | pendiente |
| facial_tension | tensión facial | facial tension | single_choice | tabla completa no incorporada | escala ordinal | pendiente |
| muscle_tension | tono/tensión muscular | muscle tension | single_choice | tabla completa no incorporada | escala ordinal | pendiente |

## Tabla completa de puntuación

Tabla completa no localizada en documentación local. No copiar desde artículos si no hay licencia clara.

## Tabla de interpretación

Puntos de corte no localizados en PedsCore. La herramienta puede medir dolor prolongado/sedación, pero la interpretación requiere fuente oficial.

## Riesgos de copyright/licencia

- Riesgo: posible score sheet protegida.
- Riesgo clínico: requiere diferenciar ventilado/no ventilado.

## Recomendación para PedsCore

`pending_validation`. No implementar hasta score sheet oficial y licensing review.

## Casos de test futuros

- mínimo
- máximo
- ventilado
- no ventilado
- input incompleto
- input inválido
- ausencia de recomendaciones terapéuticas
