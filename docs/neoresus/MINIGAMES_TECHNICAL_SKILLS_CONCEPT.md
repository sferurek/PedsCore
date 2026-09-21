# NeoResus — Concepto de minijuegos técnicos

Estado: **reservado para iteraciones posteriores**.  
Origen: concepto desarrollado durante S1 Alpha 0.1–0.3 y retirado del flujo principal en Alpha 0.4 para reducir carga motora y priorizar razonamiento clínico.

## Principio de producto

El caso clínico principal evalúa:
- reconocimiento del estado del RN;
- secuencia de decisiones;
- tiempos clínicos;
- monitorización;
- eficacia de las intervenciones;
- escalada correcta;
- debriefing basado en evidencia.

Las habilidades motoras/técnicas se entrenarán en **minijuegos independientes**, accesibles desde NeoResus y reutilizables entre escenarios.

## Minijuego 1 — Ventilación neonatal

Objetivo:
entrenar la ejecución temporal de VPPI sin mezclarla con la carga cognitiva de un caso completo.

Concepto ya diseñado:
- clic / tap / tecla = una insuflación;
- timestamp de cada insuflación;
- frecuencia en ventana móvil;
- mediana de frecuencia;
- intervalos entre insuflaciones;
- regularidad;
- pausas;
- tiempo total ventilando;
- posibilidad de fuga/sellado inadecuado;
- comprobación de expansión torácica;
- corrección de posición/sellado;
- diferenciación entre **ritmo técnico** y **eficacia clínica**;
- feedback posterior, no necesariamente durante el ejercicio;
- soporte ratón, teclado y táctil.

Regla importante:
el minijuego no debe convertir una cifra de frecuencia no verificada en “rango SeNeo”. El perfil de frecuencia debe ser configurable y etiquetado por fuente.

## Minijuego 2 — Compresiones torácicas neonatales

Objetivo:
entrenar coordinación compresión:ventilación y regularidad.

Concepto:
- secuencia 3:1;
- interacción separada para compresión y ventilación o modo coordinado;
- análisis de ritmo, relación 3:1, pausas y ciclos;
- debrief técnico;
- no mezclar destreza motora con puntuación de decisión clínica del caso principal.

## Minijuego 3 — Preparación de la cuna de reanimación

Objetivo:
entrenar preparación sistemática antes del nacimiento.

Posibles mecánicas:
- drag & drop de material;
- seleccionar equipo según edad gestacional/contexto;
- comprobar fuente de calor;
- dispositivo de ventilación;
- mascarillas;
- aspiración cuando corresponda;
- monitorización;
- vía aérea avanzada;
- acceso vascular;
- medicación/material adicional según escenario;
- detectar material ausente, incorrecto o duplicado;
- modo contrarreloj opcional.

Puede integrarse con el briefing de cada escenario:
el caso genera una lista de necesidades y el alumno prepara la cuna antes de iniciar el nacimiento.

## Arquitectura recomendada

```
NeoResus
├── Casos clínicos
│   ├── S1...
│   ├── S2...
│   └── ...
└── Entrenamiento técnico
    ├── Ventilación
    ├── Compresiones
    └── Preparación de cuna
```

Los minijuegos deben reutilizar las mismas fuentes clínicas y sistema de debriefing, pero mantener separado:
- **Clinical decision score**
- **Technical skill metrics**

## Decisión actual

En S1 Alpha 0.4:
- se elimina la obligación de realizar cada insuflación manualmente;
- la VPPI pasa a una acción clínica simplificada;
- sigue siendo necesario detectar ausencia de expansión y corregir la ventilación;
- se conservan tiempos de inicio, ineficacia, corrección y recuperación;
- el concepto manual queda preservado en este documento para retomarlo más adelante.
