# PedsCore

**Herramientas clínicas pediátricas y neonatales de código abierto**

**Open-source pediatric clinical tools, pediatric scores, neonatal scores, clinical calculators y clinical decision support con trazabilidad de evidencia.**

**Versión:** `v0.1.0-alpha`

Web pública alpha:

https://sferurek.github.io/PedsCore/

## Aplicación web pública

https://sferurek.github.io/PedsCore/

## Descripción

PedsCore es una iniciativa de código abierto que recopila y pone a disposición de la comunidad científica **scores pediátricos, scores neonatales, escalas, calculadoras clínicas, algoritmos, percentiles y reglas de apoyo a la decisión clínica** utilizadas en Pediatría y Neonatología. Nace con el objetivo de ofrecer herramientas basadas en evidencia que faciliten la práctica clínica diaria, la investigación y la docencia. El código fuente se distribuye bajo licencia MIT.

## Keywords

pediatrics, neonatology, pediatric emergency medicine, pediatric scores, neonatal scores, clinical calculators, open source healthcare, clinical decision support, medical education, evidence-based medicine, digital health.

## Misión

Promover el acceso libre y transparente a herramientas clínicas pediátricas y neonatales, proporcionando implementaciones reproducibles, revisadas y con referencias bibliográficas sólidas. PedsCore está pensado para profesionales sanitarios, estudiantes y desarrolladores interesados en integrar estas herramientas en sus propias aplicaciones o flujos de trabajo.

## Alcance

- **Incluye**: scores, escalas, calculadoras, algoritmos, nomogramas y percentiles aplicados en neonatología, urgencias pediátricas, cardiología, neumología, nefrología, endocrinología, gastroenterología, neurología, infectología, crecimiento y nutrición, desarrollo y neurodesarrollo, cuidados intensivos y paliativos, así como medicina del adolescente.
- **Excluye**: toxicología y bases de datos farmacológicas en esta fase inicial.
- **Público objetivo**: profesionales sanitarios y estudiantes de ciencias de la salud. No está dirigido a pacientes ni a cuidadores para autodiagnóstico o automanejo.

## Alcance alpha actual

- 79 herramientas catalogadas.
- 17 herramientas implementadas con cálculo activo o salida informativa de regla clínica.
- Aplicación web estática ES/EN.
- Formularios dinámicos y paneles de resultado trazables.
- Referencias evidence-first y estado de validación visible.
- Módulo WHO Growth con indicadores OMS 0-5 oficiales, indicadores parciales
  OMS 5-19 de IMC/talla, gráficas SVG imprimibles y entrada guiada de edad.
- Despliegue en GitHub Pages.
- Sin backend, login, analítica ni almacenamiento de datos clínicos.

SPRINT-50 auditó el catálogo para buscar implementaciones adicionales seguras.
El contador se mantiene intencionadamente en 17 porque ninguna herramienta
pendiente cumplía todas las puertas de fuente, tabla/fórmula, variante, inputs,
tests, salida segura y licencia. Consulta
[docs/evidence/SPRINT_50_IMPLEMENTATION_PLAN.md](docs/evidence/SPRINT_50_IMPLEMENTATION_PLAN.md).

## Analítica privacy-first

La analítica está desactivada por defecto. Si se activa mediante configuración pública de build, PedsCore puede utilizar analítica agregada y respetuosa con la privacidad para conocer el uso general de la web. No se almacenan direcciones IP, no se usan cookies de seguimiento, no se crean perfiles de usuario y nunca se recogen datos clínicos, valores de formularios ni resultados de cálculos.

Consulta [docs/ANALYTICS.md](docs/ANALYTICS.md).

## Herramientas implementadas

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

## Módulo WHO Growth

PedsCore incluye un flujo unificado WHO Growth para revisión de crecimiento y
nutrición.

Alcance actual:

- WHO Child Growth Standards 0-5: IMC para la edad, peso para la edad,
  longitud/talla para la edad, perímetro cefálico para la edad, peso para
  longitud y peso para talla.
- WHO Growth Reference 2007 5-19: IMC para la edad y talla para la edad.
- Datos LMS oficiales OMS mantenidos bajo licencia OMS separada, no bajo la
  licencia MIT del código fuente.
- Gráficas SVG generadas por PedsCore con percentiles escritos
  P3/P15/P50/P85/P97 y punto del paciente visible.
- Impresión nativa del navegador.
- Entrada guiada de edad por fechas, días exactos, años/meses/días
  estructurados y meses cumplidos para 5-19.
- Sin almacenamiento de datos clínicos introducidos y sin analítica clínica.

El módulo WHO Growth unificado sigue en `pending_validation` mientras se
completan la revisión final del maintainer, la política de interpolación y el
alcance restante 5-19. No proporciona diagnósticos nutricionales ni
recomendaciones terapéuticas.

## Arquitectura

El proyecto se estructura en dos grandes componentes:

1. **Motor (`packages/core`)** – Una librería en TypeScript que implementa las fórmulas, lógicas de puntuación y validaciones de cada herramienta. Está diseñada para ser reutilizada en diferentes contextos (web, móvil o API).
2. **Aplicación web (`apps/web`)** – Una interfaz estática (React + Vite) servida mediante GitHub Pages. Ofrece búsqueda, formularios dinámicos y resultados legibles en español e inglés.

## Estado actual

PedsCore está en alpha pública. El catálogo, la web, la matriz de evidencia, las calculadoras iniciales, las reglas informativas de traumatismo craneal pediátrico y el flujo WHO Growth ya están disponibles. Muchas herramientas catalogadas siguen pendientes de validación, revisión de fuente, revisión de licencia o decisión del maintainer antes de activar cálculo.

Consulta [CHANGELOG.md](CHANGELOG.md), [ROADMAP.md](ROADMAP.md) y [docs/releases/v0.1.0-alpha.md](docs/releases/v0.1.0-alpha.md).

## Descargo de responsabilidad (resumen)

PedsCore es una herramienta **educativa e informativa** destinada a profesionales sanitarios. **No sustituye el juicio clínico ni las guías locales**. Los resultados obtenidos no deben usarse como única base para la toma de decisiones clínicas. No se almacenan datos clínicos introducidos en las calculadoras.

## Cómo contribuir

Las contribuciones son bienvenidas. Si deseas proponer un nuevo score, reportar un error o aportar referencias, consulta el documento [`CONTRIBUTING.md`](CONTRIBUTING.md). También disponemos de plantillas de *issues* para facilitar la colaboración.

## Despliegue en GitHub Pages

URL pública esperada:

https://sferurek.github.io/PedsCore/

Para activar GitHub Pages:

1. Ir a **Settings → Pages** en el repositorio de GitHub.
2. En **Build and deployment**, seleccionar **GitHub Actions**.
3. Hacer push a `main`.
4. La web se publicará en la URL de GitHub Pages del repositorio.

El primer despliegue puede tardar unos minutos tras activar GitHub Pages.

## Licencia

El código se distribuye bajo la licencia **MIT**, y la documentación bajo **CC BY 4.0** salvo que se indique lo contrario. Consulta el archivo [`LICENSE`](LICENSE) para más detalles.

Algunas fuentes de datos de terceros, incluidos los datos de crecimiento OMS si se incorporan, pueden distribuirse bajo sus propias licencias y no quedan cubiertas por la licencia MIT del código fuente de PedsCore.

## Roadmap breve

Hitos alpha completados: monorepo, catálogo, web, GitHub Pages, matriz de evidencia, formularios dinámicos, calculadoras iniciales, reglas informativas de TCE pediátrico y flujo WHO Growth 0-5/5-19 parcial.

Próximos pasos: decisiones maintainer, auditoría de frases literales en castellano de España, revisión experta, QA visual de WHO Growth, política de interpolación, posible WHO peso-edad 5-10 si aplica y nuevas calculadoras solo tras superar las puertas de evidencia.
