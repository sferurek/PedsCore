# NeoResus · S1 Alpha 0.7

Aplicación React/TypeScript de entrenamiento en estabilización neonatal. Vive en `PedsCore`, rama `neoresus-s1-alpha`, por indicación expresa del propietario. No importa código de `@peds-core/core`, no requiere backend y se puede extraer como aplicación independiente.

## Ejecutar

Desde la raíz del repositorio, con Node 22 o posterior:

```sh
npm ci
npm run dev:neoresus
```

Abrir `http://127.0.0.1:5174/neoresus/`.

```sh
npm run lint
npm run test:neoresus
npm run build:neoresus
npx playwright install chromium
npm run test:e2e -w @neoresus/app
```

El build general de PedsCore incorpora el resultado en `apps/web/dist/neoresus/`. El build individual queda en `apps/neoresus/dist/`, preparado para alojarse bajo `/neoresus/`. El HTML monolítico 0.6 fue reemplazado; su historia permanece en Git.

## Recorrido

1. Seleccionar aprendizaje, simulación o evaluación.
2. Revisar y corregir el material. El reloj de preparación comienza al entrar; transcurridos 120 s nace el RN. Se puede adelantar el nacimiento.
3. Valorar e intervenir. Las duraciones de las acciones bloquean otras intervenciones, pero no el reloj, la fisiología, la adquisición de monitores ni la finalización manual.
4. Finalizar manualmente, alcanzar 300 s o completar el endpoint docente.
5. Revisar preparación, timeline, tarjetas por dominios y reflexiones. Exportación JSON local; ningún dato se envía a un servidor.

La auscultación y las valoraciones clínicas conservan valor y hora. Para reevaluar la recuperación, obtener una FC posterior a la recuperación (auscultación o ECG) y volver a valorar respiración/tono. El endpoint de S1 exige después retirar VPPI, aire ambiente y estabilidad sin compresiones. Estas condiciones de cierre pertenecen al guion docente, no son criterios asistenciales.

## Límites

Modelo docente no validado; no usar para atención de pacientes. La referencia es GRN-SENeo 2026, con revisión clínica independiente pendiente. No se modelan farmacología, hipovolemia, termorregulación cuantitativa ni eficacia de compresiones. Se registran intervenciones innecesarias y riesgos de preparación. Los minijuegos técnicos tienen contratos de extensión, pero aún no interfaz jugable.

Véanse [arquitectura y gobernanza](../../docs/neoresus/ARCHITECTURE_0_7.md) y [validación](../../docs/neoresus/VALIDATION_0_7.md).
