# Thompson HIE Score

## Estado actual en PedsCore

- implementationStatus actual: `pending_validation`
- Motivo de bloqueo: la documentación local confirma rango e interpretación, pero no detalla todos los rangos por ítem.
- Qué falta para implementación: tabla completa por variable, fuente primaria verificable, DOI/PMID si existe, y revisión de reproducción de tabla.

## Pregunta de validación

¿La tabla original del Thompson HIE Score puede incorporarse con puntuación exacta por ítem, rango 0-22 e interpretación validada sin copiar material protegido?

## Fuente primaria

- Título: The value of a scoring system for hypoxic ischaemic encephalopathy in predicting neurodevelopmental outcome
- Autores: C. M. Thompson et al.
- Año: 1997
- Revista/editorial: Acta Paediatrica
- DOI: no confirmado en este bloque
- PMID: no confirmado en este bloque
- URL directa localizada: https://www.saludinfantil.org/guiasn/Guias_PMontt_2015/Neurologia/Encefalopatia.Neonatal.2017/Score_Thompson_HIE/ScoreThompson_ActaPediatrica_1997.pdf
- Acceso: PDF localizado; derechos/copyright no determinados

## Fuentes secundarias relevantes

1. Sarnat score review mentioning Thompson et al. 1997: https://www.nature.com/articles/s41390-020-01143-5
2. Predictive value of Thompson score: https://pubmed.ncbi.nlm.nih.gov/35908094/

## Variables

| variable | descripción ES | descripción EN | tipo | opciones | puntuación | notas |
|---|---|---|---|---|---|---|
| tone | tono | tone | single_choice | tabla completa no localizada | rangos por ítem no verificados | bloquear |
| level_of_consciousness | nivel de conciencia | level of consciousness | single_choice | tabla completa no localizada | rangos por ítem no verificados | bloquear |
| seizures | convulsiones | seizures | single_choice | tabla completa no localizada | rangos por ítem no verificados | bloquear |
| posture | postura | posture | single_choice | tabla completa no localizada | rangos por ítem no verificados | bloquear |
| moro_reflex | reflejo de Moro | Moro reflex | single_choice | tabla completa no localizada | rangos por ítem no verificados | bloquear |
| grasp | prensión | grasp | single_choice | tabla completa no localizada | rangos por ítem no verificados | bloquear |
| suck | succión | suck | single_choice | tabla completa no localizada | rangos por ítem no verificados | bloquear |
| respiration | respiración | respiration | single_choice | tabla completa no localizada | rangos por ítem no verificados | bloquear |
| fontanelle | fontanela | fontanelle | single_choice | tabla completa no localizada | rangos por ítem no verificados | bloquear |

## Tabla completa de puntuación

Tabla completa no incorporada. La documentación local dice que algunos ítems tienen rangos específicos; por tanto, no se puede asumir 0-3 universal.

## Tabla de interpretación

| rango | categoría | interpretación bibliográfica | fuente |
|---|---|---|---|
| 0-10 | leve | Interpretación citada en documentación local; requiere fuente primaria completa. | PedsCore KB / Thompson source |
| 11-14 | moderada | Interpretación citada en documentación local; requiere fuente primaria completa. | PedsCore KB / Thompson source |
| >=15 | severa | Interpretación citada en documentación local; requiere fuente primaria completa. | PedsCore KB / Thompson source |

## Riesgos de copyright/licencia

- Riesgo: posible tabla protegida por publicación original.
- No copiar tabla oficial hasta revisar derechos.

## Recomendación para PedsCore

`pending_validation`. No implementar hasta validar tabla completa y derechos.

## Casos de test futuros

- mínimo 0
- máximo 22
- leve
- moderada
- severa
- input incompleto
- input inválido
- ausencia de recomendaciones terapéuticas
