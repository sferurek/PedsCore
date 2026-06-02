# CHEOPS

## Estado actual en PedsCore

- implementationStatus actual: `pending_validation`
- Motivo de bloqueo: variables y rango están identificados, pero falta puntuación exacta por opción.
- Qué falta para implementación: tabla completa del Children’s Hospital of Eastern Ontario Pain Scale, interpretación validada y revisión de licencia.

## Pregunta de validación

¿La tabla CHEOPS original puede reproducirse en PedsCore con puntuación exacta por opción y licencia clara?

## Fuente primaria

- Título: The development and validation of a behavioral pain scale for children: The Children’s Hospital of Eastern Ontario Pain Scale (CHEOPS)
- Autores: McGrath et al. (según fuentes secundarias)
- Año: 1984
- Revista/editorial: Pain
- DOI: no confirmado en este bloque
- PMID: no confirmado en este bloque
- URL directa: https://journals.lww.com/pain/citation/1984/01001/the_development_and_validation_of_a_behavioral.34.aspx
- Acceso: desconocido / probablemente de pago

## Fuentes secundarias relevantes

1. Evidence-based Assessment of Pediatric Pain: https://pmc.ncbi.nlm.nih.gov/articles/PMC2639489/
2. Pain in Children review: https://pmc.ncbi.nlm.nih.gov/articles/PMC2913812/
3. Physiopedia summary, secondary only: https://www.physio-pedia.com/Children%27s_Hospital_of_Eastern_Ontario_Pain_Scale

## Variables

| variable | descripción ES | descripción EN | tipo | opciones | puntuación | notas |
|---|---|---|---|---|---|---|
| cry | llanto | cry | single_choice | opciones parciales localizadas | tabla completa no localizada | no implementar |
| facial_expression | expresión facial | facial expression | single_choice | opciones parciales localizadas | tabla completa no localizada | no implementar |
| verbalization | verbalización | verbalization | single_choice | opciones parciales localizadas | tabla completa no localizada | no implementar |
| torso | torso/tono/postura | torso/body posture | single_choice | no definido de forma inequívoca | tabla completa no localizada | variable exacta requiere revisión |
| touch | respuesta al tacto | touch | single_choice | no localizado | tabla completa no localizada | documentar desde primaria |
| legs | piernas | legs | single_choice | opciones parciales localizadas | tabla completa no localizada | no implementar |

## Tabla completa de puntuación

Tabla completa no localizada con fuente primaria abierta. No reconstruir desde memoria ni desde PDFs no oficiales.

## Tabla de interpretación

| rango | categoría | interpretación bibliográfica | fuente |
|---|---|---|---|
| 4-13 | rango total | Rango citado en documentación local y fuentes secundarias. | PedsCore KB |
| >4 | posible dolor | Umbral citado localmente; requiere confirmación primaria. | PedsCore KB |

## Riesgos de copyright/licencia

- Riesgo: no determinado / posible tabla protegida.
- CHEOPS es un instrumento publicado; reproducir tabla exacta requiere revisión de derechos.

## Recomendación para PedsCore

`pending_validation`. No activar cálculo hasta obtener tabla completa y licencia clara.

## Casos de test futuros

- mínimo 4
- máximo 13
- caso intermedio
- input incompleto
- input inválido
- ausencia de recomendaciones terapéuticas
