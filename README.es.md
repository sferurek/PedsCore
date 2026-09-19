# PedsCore

**Herramientas clínicas pediátricas y neonatales open source con trazabilidad de evidencia.**

[![Licencia MIT](https://img.shields.io/badge/licencia-MIT-green.svg)](LICENSE)
[![Producción](https://img.shields.io/badge/web-Vercel-blue.svg)](https://peds-core.vercel.app/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6.svg)](https://www.typescriptlang.org/)
[![CI](https://github.com/sferurek/PedsCore/actions/workflows/ci.yml/badge.svg)](https://github.com/sferurek/PedsCore/actions/workflows/ci.yml)
[![Alpha](https://img.shields.io/badge/estado-alpha-orange.svg)](docs/releases/v0.1.0-alpha.md)
[![Sin almacenamiento de datos clínicos](https://img.shields.io/badge/datos%20cl%C3%ADnicos-no%20almacenados-0f766e.svg)](DISCLAIMER.md)

PedsCore es una biblioteca bilingüe en alpha pública de herramientas clínicas pediátricas y neonatales para profesionales sanitarios, docentes y contribuidores. Separa explícitamente disponibilidad clínica, evidencia, derechos de reutilización y disponibilidad de cálculo.

**Producción:** https://peds-core.vercel.app/

## Estado actual · 19 de septiembre de 2026

- **137** herramientas/superficies clínicas catalogadas.
- **134** superficies activas.
- **3** superficies históricas deprecadas.
- **0** superficies activas bloqueadas y **0** entradas `local_planned`.
- **64** herramientas marcadas como producto clínico implementado.
- **61** superficies con cálculo local activo en los metadatos de discovery.
- Las herramientas con derechos limitados permanecen accesibles mediante referencia oficial/original, sin reproducir contenido protegido.
- Crecimiento OMS y CDC operativos.
- Web ES/EN desplegada en Vercel.
- Sin login ni persistencia de datos clínicos.
- Los valores de formularios y resultados clínicos no se envían a analítica.

## Principios del producto

PedsCore prioriza:

- identificación exacta de versión/variante;
- fuentes primarias o autoritativas;
- cálculo determinista cuando la implementación local es apropiada;
- límites de población y seguridad explícitos;
- revisión de licencias y reutilización;
- presentación clínica bilingüe;
- referencias y trazabilidad visibles;
- salidas descriptivas, no instrucciones automáticas de tratamiento, ingreso, alta o pruebas.

Una herramienta protegida puede ser una **referencia externa activa** sin que PedsCore reproduzca formularios, matrices, imágenes o redacción protegida.

## Arquitectura

- `packages/core`: catálogo, discovery, contratos y calculadoras deterministas.
- `apps/web`: aplicación React + TypeScript + Vite.
- `docs`: evidencia, registro de derechos, política editorial, releases y SEO.
- `.github`: CI y plantillas de contribución.

Los cálculos se realizan localmente en el navegador cuando es posible. PedsCore no necesita backend clínico ni cuenta de paciente.

## Gobernanza clínica

Documentos principales:

- [Política editorial](docs/EDITORIAL_POLICY.md)
- [Registro de derechos de herramientas](docs/CLINICAL_TOOL_RIGHTS.md)
- [Aviso legal](DISCLAIMER.md)
- [Guía de contribución](CONTRIBUTING.md)
- [Roadmap](ROADMAP.md)
- [Changelog](CHANGELOG.md)

La activación local exige fuente trazable, lógica completa, variante exacta, redacción segura, tests deterministas y derechos de reutilización compatibles.

## Crecimiento

Actualmente incluye:

- WHO Child Growth Standards 0-5.
- WHO Growth Reference 5-19 para los indicadores implementados, incluido peso/edad 5-10.
- Presets OMS de IMC/edad y perímetro cefálico.
- Percentiles CDC 2000 con Extended BMI.
- Herramientas de crecimiento externas/de referencia cuando la redistribución local no es apropiada.

Los datos OMS mantienen sus condiciones específicas de atribución/licencia y no se relicencian como MIT.

## Seguridad y alcance

PedsCore es un recurso educativo e informativo para profesionales sanitarios cualificados.

- No diagnostica.
- No prescribe tratamiento.
- No sustituye juicio clínico, protocolos locales, políticas institucionales ni valoración especializada.
- Las escalas pronósticas se muestran de forma descriptiva/poblacional cuando corresponde.
- No incluyas información identificable de pacientes en GitHub.

Consulta [DISCLAIMER.md](DISCLAIMER.md).

## Búsqueda, descubrimiento y SEO

La aplicación incluye Finder clínico, navegación por categorías, páginas ES/EN individuales, canonical SEO, sitemap/hreflang, rutas estáticas/prerenderizadas, IndexNow y monitorización con Google Search Console.

Consulta [docs/SEO_CHECKLIST.md](docs/SEO_CHECKLIST.md).

## Cómo contribuir

Son especialmente útiles la revisión de cálculos, verificación de fuentes primarias, revisión lingüística, accesibilidad/UX y actualizaciones de evidencia. Los cambios clínicos deben incluir fuentes reproducibles y tests.

Empieza por [CONTRIBUTING.md](CONTRIBUTING.md).

## Licencia

El código fuente de PedsCore se publica bajo [licencia MIT](LICENSE). Los instrumentos, datos y materiales de terceros no quedan automáticamente cubiertos por esa licencia.
