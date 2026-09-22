# NeoResus S1 Alpha 0.7 · Arquitectura y gobernanza

## Ubicación y entrega

La indicación posterior del usuario mantiene el trabajo en `sferurek/PedsCore`, rama `neoresus-s1-alpha`. El aislamiento se aplica al código en `apps/neoresus`, no a crear otro repositorio. No hay dependencias de dominio con PedsCore. La única conexión es la copia de los archivos compilados a `/neoresus/` durante el build general.

## Módulos

- `engine/`: tipos, ejecución determinista, bloqueo de acciones, monitores, cierre y proyección pública del estado.
- `scenarios/`: S1 declara estado inicial, acciones, fisiología, reglas de adquisición, preparación, endpoint y debrief.
- `physiology/`: aproximación exponencial continua con paso máximo de 50 ms y retraso de recuperación de saturación respecto a FC.
- `actions/`: duración, dominio, disponibilidad física, repetición, acción única y soporte continuo.
- `preflight/`: catálogo, incidencias reproducibles por semilla, inspección/corrección con duración e historial previo al nacimiento.
- `debrief/`: cronología, hitos internos, decisiones, omisiones, estado de preparación y origen de reglas.
- `sources/`: categorías de fuentes y localizadores.
- `minigames/`: contratos independientes para entradas temporizadas, perfiles y debrief técnico.
- `ui/`: cuna SVG, panel de observaciones, preparación y debrief.
- `app/`: fases y reloj real. No hay backend ni persistencia de pacientes.

## Tres planos de información

1. Estado fisiológico interno: FC, SpO₂, respiración, tono, movimiento torácico.
2. Escena visual: movimiento, coloración, postura y dispositivos, sin cifras ni etiquetas diagnósticas. Solo esta proyección visual recibe señales internas.
3. Información evaluada: muestras manuales con hora, más actualizaciones de ECG y pulsioximetría tras adquisición.

`learnerView` excluye valores internos, instantáneas de eventos, incidencias ocultas e hitos fisiológicos. La timeline durante el caso contiene únicamente acciones y control; evaluación oculta esa timeline. El debrief expone el registro interno solo tras finalizar. Las observaciones manuales pueden quedar antiguas y están fechadas: no se actualizan de forma oculta.

## Tiempo y acciones

`advance(state, scenario, elapsed)` procesa todo el tiempo transcurrido, también tras inactividad de la pestaña, sin aplicar el antiguo recorte de tiempo fisiológico por frame. Divide internamente el intervalo en pasos de ≤50 ms y respeta finalización de acciones y timeout. No depende de React ni del DOM. La UI entrega tiempo monotónico cada 100 ms; no pausa el caso cuando cambia la visibilidad. Un navegador que descarte la pestaña pierde la sesión; no existe reanudación persistente.

Las acciones surten efecto al completarse. Las medidas iniciales duran 30 s en este guion; las demás duraciones, latencias ECG de 4 s y SpO₂ de 8 s, revisión de material de 4 s y reparación de 6 s son supuestos operativos. No hay temporizadores paralelos que sigan modificando un caso finalizado. Se permite finalizar durante cualquier acción y se registra la interrupción.

## Material

Se sortean dos incidencias diferentes entre calentador, circuito, mascarilla, aspiración, sensor, laringoscopio y TET. Nunca se revela una incidencia durante la revisión hasta inspeccionarla. Circuito y mascarilla pueden impedir la ventilación aun tras corregir posición/sellado; se pueden reparar durante el caso. Aspiración, sensor e intubación dependen del material disponible. El acceso supraglótico sigue siendo una alternativa.

Las reparaciones clínicas se guardan separadas de la preparación, para no reescribir la historia de lo que había disponible al nacer. El calentador apagado se recoge como riesgo térmico en el debrief; no se inventa una caída de FC por hipotermia. No se simula temperatura en esta fase.

## Gobernanza clínica

Referencia principal: [Ávila-Álvarez et al., GRN-SENeo 2026](https://doi.org/10.1016/j.anpedi.2026.504143), figura 1 y apartados de briefing, cordón y oxígeno; documento consultado en la web de SENeo. Las tarjetas contienen paráfrasis breves y vínculo, no una reproducción de la guía. No implica aval de SENeo.

- `SENEO_RECOMMENDATION`: recomendaciones clínicas referenciadas en tarjetas; las implementaciones aún requieren revisión por neonatología.
- `EVIDENCE_CONTEXT`: contexto de la calidad/alcance de evidencia, separado de la recomendación.
- `SIMULATION_ASSUMPTION`: curvas, constantes, duraciones, fallos sorteados, eficacia técnica simplificada y endpoint.

La FC inicial 82 y SpO₂ 58 son valores internos de autoría del caso. Las constantes exponenciales, la recuperación respiratoria a 32 s de ventilación efectiva y el color cutáneo esquemático no son predicciones fisiológicas. El modelo no atribuye beneficio a compresiones o aspiración; permite la decisión y la revisa posteriormente. La vía aérea avanzada se resuelve de forma simplificada, sin evaluar habilidad ni eventos adversos.

S1 asume recursos para soporte junto a la madre: no bloquea VPPI únicamente por tener el cordón íntegro. La adecuación de ese contexto, el guion de estimulación, los criterios de escalada y las reglas de cierre deben validarse con un instructor. La anotación de compresiones tras menos de 30 s de ventilación eficaz es una regla de revisión docente y no sustituye el algoritmo completo.

## Endpoint

Finalización manual, timeout configurable (S1: 300 s) o endpoint: ventilación efectiva previa, FC >100, respiración espontánea, FC evaluada tras recuperación, posterior valoración de respiración/tono, retirada de VPPI después de esa reevaluación, FiO₂ 0,21, sin compresiones y 5 s de estabilidad. El requerimiento de aire ambiente y los 5 s son decisiones del guion S1, no recomendaciones universales de retirada de soporte. La respiración recuperada se mantiene en S1; recaídas, fatiga y postreanimación requieren otro modelo/escenario.

## S2 y minijuegos

Para S2, añadir un objeto `Scenario`, modelo inicial/fisiológico y reglas de debrief propios. El motor ya recibe esas funciones y parámetros; no usar los parámetros de S1 como defaults clínicos universales. Todavía falta selector de escenarios y ampliar tipos de observaciones/acciones si S2 necesita nuevos dominios.

`minigames/contracts.ts` preserva eventos de insuflación/compresión/sellado, intervalos, ritmo, pausas, regularidad, relación y fuentes de los perfiles. No hay pulsaciones por insuflación en S1 y ningún minijuego condiciona su finalización.

## Accesibilidad y privacidad

Tipografía de sistema, tamaño mínimo 12 px, controles nativos, foco visible, enlace para saltar al contenido, SVG con descripción neutral y respeto a movimiento reducido. No se emiten anuncios de lector de pantalla por cada cambio de FC. La información clínica evaluable tiene equivalente textual mediante las acciones. No se usan colores de acierto/error durante el caso ni se destaca la siguiente acción esperada. No hay fuentes remotas ni analítica de NeoResus. La exportación JSON se genera localmente.
