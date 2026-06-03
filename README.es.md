# PedsCore

**Herramientas clínicas pediátricas y neonatales open source con trazabilidad de evidencia.**

[![Licencia MIT](https://img.shields.io/badge/licencia-MIT-green.svg)](LICENSE)
[![GitHub Pages](https://img.shields.io/badge/web-GitHub%20Pages-blue.svg)](https://sferurek.github.io/PedsCore/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6.svg)](https://www.typescriptlang.org/)
[![CI](https://github.com/sferurek/PedsCore/actions/workflows/ci.yml/badge.svg)](https://github.com/sferurek/PedsCore/actions/workflows/ci.yml)
[![Alpha](https://img.shields.io/badge/estado-alpha-orange.svg)](docs/releases/v0.1.0-alpha.md)
[![Sin almacenamiento de datos clínicos](https://img.shields.io/badge/datos%20cl%C3%ADnicos-no%20almacenados-0f766e.svg)](DISCLAIMER.md)

PedsCore es una biblioteca open source en alpha pública para profesionales sanitarios, docentes y contribuidores. El proyecto prioriza estado de implementación transparente, referencias visibles, trazabilidad de evidencia y mensajes de seguridad prudentes.

Aplicación web pública:

https://sferurek.github.io/PedsCore/

## Estado Alpha Actual

- 79 herramientas pediátricas y neonatales catalogadas.
- 17 herramientas completamente implementadas con cálculo activo o salida informativa de regla clínica.
- 1 módulo parcialmente implementado: WHO Growth.
- Web estática ES/EN desplegada en GitHub Pages.
- Sin backend.
- Sin login.
- Sin almacenamiento de datos clínicos.
- Sin envío de valores de formularios clínicos ni resultados a analítica.

PedsCore es deliberadamente conservador: una herramienta catalogada no se activa hasta superar puertas de fuente, fórmula/tabla, variante exacta, tests, redacción segura y licencia.

## Qué Incluye

- Scores pediátricos y neonatales.
- Calculadoras clínicas y paneles de resultado trazables.
- Reglas informativas de traumatismo craneoencefálico pediátrico.
- Módulo WHO Growth con datos oficiales OMS.
- Estado de evidencia para herramientas implementadas, parcialmente implementadas, pendientes y sensibles a licencia.
- Documentación pública de roadmap, revisión de evidencia y notas de release.
- Monorepo TypeScript con web React/Vite y paquete core testeado.

Términos útiles de descubrimiento: pediatric scores, neonatal scores, clinical calculators, WHO Growth, evidence-based medicine, open-source healthcare, clinical decision support, medical education.

## Módulo WHO Growth

El módulo WHO Growth está disponible como flujo de crecimiento parcialmente implementado.

Alcance actual:

- Indicadores oficiales WHO Child Growth Standards 0-5.
- Indicadores parciales WHO Growth Reference 2007 5-19: IMC para la edad y talla para la edad.
- Datos LMS oficiales OMS bajo licencia OMS separada.
- Gráficas SVG imprimibles generadas por PedsCore.
- Percentiles escritos: P3, P15, P50, P85 y P97.
- Punto del paciente visible en las gráficas.
- Entrada guiada de edad.
- Sin almacenamiento de datos clínicos introducidos.

WHO Growth sigue como `partially_implemented` mientras se completan revisión final del maintainer, política de interpolación y alcance restante 5-19. No proporciona diagnósticos nutricionales ni recomendaciones terapéuticas.

## Seguridad Y Alcance

PedsCore es un recurso educativo e informativo para uso profesional.

- No diagnostica.
- No recomienda tratamientos.
- No sustituye el juicio clínico, protocolos locales, políticas institucionales ni valoración especializada.
- No almacena datos identificativos de pacientes.
- No incluyas datos reales de pacientes en issues, pull requests o ejemplos.

Consulta [DISCLAIMER.md](DISCLAIMER.md) para el aviso legal completo.

## Herramientas Implementadas

Las 17 herramientas completamente implementadas son:

- Apgar.
- Silverman-Andersen.
- FLACC.
- QTc Bazett.
- QTc Fridericia.
- QTc Framingham.
- QTc Hodges.
- Bedside Schwartz.
- Westley Croup Score.
- PRAM.
- Clinical Dehydration Scale.
- PECARN TCE menor de 2 años.
- PECARN TCE 2 años o más.
- CATCH.
- CHALICE.
- SIPA.
- NIPS.

Muchas herramientas adicionales permanecen catalogadas pero bloqueadas por fuente, tabla, variante, licencia o revisión experta. Esto es una decisión de seguridad, no una omisión.

## Estructura Del Repositorio

- `packages/core`: catálogo, contratos y lógica determinista en TypeScript.
- `apps/web`: aplicación web estática React + TypeScript + Vite.
- `docs/`: documentación pública, evidencia, notas de release y checklist de lanzamiento.
- `.github/`: workflows, plantillas de issues y plantilla de pull request.

## Cómo Contribuir

Formas útiles de apoyar PedsCore:

- Dejar una estrella en el repositorio.
- Abrir feedback o bugs en GitHub Issues.
- Proponer evidencia con DOI, PMID o URLs oficiales.
- Sugerir mejoras de UX, traducción o documentación.
- Revisar cálculos solo con fuentes trazables y tests.

Empieza por [CONTRIBUTING.md](CONTRIBUTING.md). Las contribuciones clínicas deben incluir fuente, versión/variante exacta, fórmula o tabla reutilizable, notas de licencia y redacción segura de salida.

## Notas De Lanzamiento Público

- Release notes: [docs/releases/v0.1.0-alpha.md](docs/releases/v0.1.0-alpha.md)
- Changelog: [CHANGELOG.md](CHANGELOG.md)
- Roadmap: [ROADMAP.md](ROADMAP.md)
- Checklist de lanzamiento: [docs/PUBLIC_LAUNCH_CHECKLIST.md](docs/PUBLIC_LAUNCH_CHECKLIST.md)
- Checklist SEO: [docs/SEO_CHECKLIST.md](docs/SEO_CHECKLIST.md)

## Licencia

El código fuente de PedsCore se publica bajo [licencia MIT](LICENSE).

La documentación es documentación pública del proyecto salvo que un archivo indique otra cosa.

Los datos y materiales de terceros no quedan automáticamente cubiertos por la licencia MIT. Los datos de crecimiento OMS se mantienen bajo licencia y atribución OMS separadas.
