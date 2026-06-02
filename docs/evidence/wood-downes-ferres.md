# Wood-Downes-Ferres

## Estado actual en PedsCore

- implementationStatus actual: `pending_validation`
- Motivo de bloqueo: variantes Downes / Wood-Downes / Wood-Downes-Ferres y tabla exacta no están inequívocamente definidas.
- Qué falta para implementación: versión exacta, población, umbrales de frecuencia respiratoria/cardiaca, tabla completa y fuente primaria.

## Pregunta de validación

¿Qué variante exacta debe implementar PedsCore para bronquiolitis/sibilancias y cuál es la fuente primaria reproducible?

## Fuente primaria

- Título: no localizado de forma definitiva en este bloque
- Autores: no localizado de forma definitiva
- Año: no localizado
- Revista/editorial: no localizado
- DOI: no localizado
- PMID: no localizado
- URL directa: no localizada
- Acceso: desconocido

## Fuentes secundarias relevantes

1. MDPI bronchiolitis paper includes a modified Wood-Downes-Ferres table as secondary source: https://www.mdpi.com/2075-4426/13/12/1624
2. PedsCore KB cites Wood-Downes-Ferres lines but not primary bibliographic details.

## Variables

| variable | descripción ES | descripción EN | tipo | opciones | puntuación | notas |
|---|---|---|---|---|---|---|
| wheezing | sibilancias | wheezing | single_choice | tabla exacta no validada | 0-3 citado localmente | variante pendiente |
| retractions | tiraje/retracciones | retractions | single_choice | tabla exacta no validada | 0-3 citado localmente | variante pendiente |
| air_entry | entrada de aire | air entry | single_choice | tabla exacta no validada | 0-3 citado localmente | variante pendiente |
| cyanosis | cianosis | cyanosis | single_choice | ausente/presente citado | 0-1 citado localmente | confirmar variante |
| respiratory_rate | frecuencia respiratoria | respiratory rate | number/derived | puntos de corte no localizados | 0-2 citado localmente | requiere edad/umbral |
| heart_rate | frecuencia cardiaca | heart rate | number/derived | puntos de corte no localizados | 0-2 citado localmente | requiere edad/umbral |

## Tabla completa de puntuación

Tabla completa no localizada desde fuente primaria. No implementar.

## Tabla de interpretación

| rango | categoría | interpretación bibliográfica | fuente |
|---|---|---|---|
| 0-3 | leve | Citado localmente. | PedsCore KB |
| 4-6 | moderado | Citado localmente. | PedsCore KB |
| 7-10 | severo | Citado localmente. | PedsCore KB |
| >10 | insuficiencia respiratoria | Citado localmente; redacción debe evitar recomendación. | PedsCore KB |

## Riesgos de copyright/licencia

- Riesgo: variante y tabla no determinadas.
- Riesgo adicional: algunas tablas circulan en protocolos institucionales sin fuente primaria clara.

## Recomendación para PedsCore

`pending_validation`. Priorizar búsqueda bibliográfica primaria antes de cualquier cálculo.

## Casos de test futuros

- mínimo
- máximo
- leve/moderado/severo
- input incompleto
- input inválido
- variante exacta documentada
- ausencia de recomendaciones terapéuticas
