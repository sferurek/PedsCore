# NeoResus S1 Alpha 0.7 · Entrega y validación

Fecha: 22/09/2026. Rama: `neoresus-s1-alpha` de `sferurek/PedsCore`.

## Estado funcional

S1 es jugable de principio a fin. Se conserva el acceso `/neoresus/` y se sustituye el prototipo monolítico por una aplicación modular React/TypeScript/Vite. Incluye preparación con incidencias y consecuencias, observaciones fechadas, fisiología continua, acciones temporizadas, tres modalidades, tres cierres, debrief por dominios y exportación JSON.

## Comprobaciones ejecutadas

- `npm run lint`: sin errores ni advertencias tras separar la proyección visual del componente SVG.
- `npm run test`: 643 pruebas del repositorio pasaron, incluidas las 33 pruebas iniciales del nuevo motor.
- `npm run test:neoresus`: 34 pruebas tras añadir la regresión del historial de preparación.
- `npm run build`: build completo de core, web, MCP y NeoResus correcto; artefacto NeoResus copiado a `apps/web/dist/neoresus/`.
- `npm run test:e2e -w @neoresus/app`: 12 pruebas Playwright en Chromium, con viewports de escritorio, iPad Mini e iPhone 13. Son emulaciones de viewport/dispositivo, no una validación de Safari ni de hardware real.
- `npm run audit:governance`, `npm run seo:check`, `npm run alexa:validate`: correctos.
- Comprobación con agent-browser: carga, controles y ausencia de errores de ejecución. Inspección visual de capturas de la escena en escritorio y móvil, y capturas automáticas en los tres tamaños.

Los tests E2E usan el reloj controlado de Playwright, no atajos ni exposición del estado interno. Cubren revisión y reparación de todo el material, nacimiento, observaciones ocultas, VPPI inicialmente ineficaz, comprobación torácica, corrección, ECG/SpO₂, recuperación, reevaluación, retirada, endpoint, exportación y nuevo caso. También comprueban finalización manual durante un bloqueo, timeout de ambas fases, foco de teclado y ausencia de desbordamiento horizontal.

El motor cubre latencias de monitores durante otras acciones, variación subsegundo, equivalencia entre frames pequeños y un frame retrasado, decisiones prematuras permitidas, límites físicos, retirada/reinicio, condiciones del endpoint, timeout parametrizado, incidencias por semilla, material inoperativo y conservación de la preparación.

Se corrigió un problema de foco que saltaba el enlace de accesibilidad y desplazaba la página al cargar. Se ajustaron selectores E2E para distinguir la observación de su marca temporal y el resumen de cierre de su entrada en la timeline. Los fallos iniciales de esos tests quedaron resueltos.

## Integración y dependencias

El lockfile previo no incluía el workspace MCP ni la dependencia esbuild ya declarados. `npm install` los reconcilió junto al nuevo workspace y Playwright; no se añadió otra dependencia de producción a NeoResus aparte de React/ReactDOM. El acceso inicial a npm falló por resolución/conectividad; se resolvió en el proceso de instalación, sin cambiar la configuración del sistema ni del repositorio. La CI ejecuta también pruebas de navegador y se activa al enviar esta rama.

El build de PedsCore conserva advertencias sobre chunks grandes preexistentes. NeoResus tiene un bundle JavaScript de aproximadamente 232 kB sin comprimir, unos 73 kB gzip, incluyendo React.

## Pendientes y riesgos

1. Revisión clínica independiente por neonatología/instructor GRN-SENeo: recomendaciones, secuencias, cordón, oxígeno y guion de recuperación. Las fuentes están identificadas; el producto no está clínicamente validado.
2. Modelo simplificado: sin temperatura cuantitativa, fatiga/recidiva tras recuperación, eficacia de compresiones, fármacos ni hipovolemia. No puede representar una reanimación avanzada completa.
3. Vía aérea avanzada simplificada y no validada como entrenamiento técnico; el error de material térmico se registra como riesgo sin una curva térmica inventada.
4. Learning ofrece ayuda opcional; evaluación reduce información de timeline; todavía no hay pausa, persistencia ni gestión de alumnos.
5. Completar selector de escenarios y crear S2; ampliar el contrato si precisa dominios/acciones nuevos.
6. Implementar los minijuegos de ventilación y compresiones sobre los contratos reservados, con métricas técnicas independientes.
7. Verificación adicional de Safari/Firefox, lectores de pantalla reales y pruebas con instructores en tablet.

## Preparación aproximada

Estimaciones de ingeniería, no puntuaciones de calidad clínica ni resultados de validación:

- S1 como alpha docente: **90 %**. El flujo funcional solicitado está cubierto; faltan revisión clínica y pruebas de uso con instructores.
- Motor como base de S2: **80 %**. Escenario, modelo, acciones, adquisición, material y endpoint están separados; falta demostrar la reutilización con un segundo caso real y su selector.

No se publica en producción ni se fusiona a `main`; la entrega se envía a la rama solicitada.
