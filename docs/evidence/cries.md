# CRIES

## Estado actual en PedsCore

- implementationStatus actual: `pending_validation`
- Motivo de bloqueo: falta tabla exacta de opciones 0/1/2 por variable en documentación local abierta.
- Qué falta para implementación: score sheet completo, interpretación validada, fuente primaria completa y revisión de derechos de reproducción.

## Pregunta de validación

¿Puede PedsCore reproducir con seguridad la tabla CRIES completa, con opciones exactas por variable, sin infringir copyright y sin transformar el score en recomendación terapéutica?

## Fuente primaria

- Título: CRIES: a new neonatal postoperative pain measurement score. Initial testing of validity and reliability
- Autores: S. W. Krechel; J. Bildner
- Año: 1995
- Revista/editorial: Paediatric Anaesthesia
- DOI: 10.1111/j.1460-9592.1995.tb00242.x
- PMID: 8521311
- URL directa: https://pubmed.ncbi.nlm.nih.gov/8521311/
- Acceso: desconocido / probablemente de pago para texto completo

## Fuentes secundarias relevantes

1. Revisiones de dolor neonatal que mencionan CRIES como escala postoperatoria: https://pubmed.ncbi.nlm.nih.gov/36962062/
2. COVERS validation article uses CRIES as established comparator: https://pmc.ncbi.nlm.nih.gov/articles/PMC2952799/

## Variables

| variable | descripción ES | descripción EN | tipo | opciones | puntuación | notas |
|---|---|---|---|---|---|---|
| crying | llanto | crying | single_choice | tabla completa no localizada | 0-2 documentado globalmente | requiere opciones exactas |
| requires_oxygen | necesidad de oxígeno | oxygen requirement | single_choice | tabla completa no localizada | 0-2 documentado globalmente | requiere umbrales exactos |
| increased_vital_signs | incremento de constantes vitales | increased vital signs | single_choice | tabla completa no localizada | 0-2 documentado globalmente | requiere definición exacta |
| expression | expresión facial | facial expression | single_choice | tabla completa no localizada | 0-2 documentado globalmente | requiere opciones exactas |
| sleeplessness | alteración del sueño | sleeplessness | single_choice | tabla completa no localizada | 0-2 documentado globalmente | requiere opciones exactas |

## Tabla completa de puntuación

Tabla completa no localizada en fuente abierta verificable dentro de este bloque. No reconstruir desde memoria.

## Tabla de interpretación

| rango | categoría | interpretación bibliográfica | fuente |
|---|---|---|---|
| >=4 | posible dolor significativo | Punto de corte citado en documentación local; requiere confirmación con fuente primaria completa. | PedsCore KB / PubMed primary source |

## Riesgos de copyright/licencia

- Riesgo: no determinado.
- La fórmula general es pública en resúmenes, pero la tabla exacta del instrumento puede estar protegida por copyright editorial.

## Recomendación para PedsCore

`pending_validation`. No activar hasta disponer de tabla completa y permiso/licencia clara para reproducir opciones.

## Casos de test futuros

- mínimo 0
- máximo 10
- caso intermedio alrededor del umbral
- input incompleto
- input inválido
- ausencia de recomendaciones terapéuticas
