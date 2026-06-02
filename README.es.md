# PedsCore

**Herramientas clínicas pediátricas y neonatales de código abierto**

## Descripción

PedsCore es una iniciativa de código abierto que recopila y pone a disposición de la comunidad científica **scores, escalas, calculadoras, algoritmos, percentiles y reglas clínicas** utilizadas en Pediatría y Neonatología. Nace con el objetivo de ofrecer herramientas basadas en evidencia que faciliten la práctica clínica diaria, la investigación y la docencia.

## Misión

Promover el acceso libre y transparente a herramientas clínicas pediátricas y neonatales, proporcionando implementaciones reproducibles, revisadas y con referencias bibliográficas sólidas. PedsCore está pensado para profesionales sanitarios, estudiantes y desarrolladores interesados en integrar estas herramientas en sus propias aplicaciones o flujos de trabajo.

## Alcance

- **Incluye**: scores, escalas, calculadoras, algoritmos, nomogramas y percentiles aplicados en neonatología, urgencias pediátricas, cardiología, neumología, nefrología, endocrinología, gastroenterología, neurología, infectología, crecimiento y nutrición, desarrollo y neurodesarrollo, cuidados intensivos y paliativos, así como medicina del adolescente.
- **Excluye**: toxicología y bases de datos farmacológicas en esta fase inicial.
- **Público objetivo**: profesionales sanitarios y estudiantes de ciencias de la salud. No está dirigido a pacientes ni a cuidadores para autodiagnóstico o automanejo.

## Arquitectura prevista

El proyecto se estructura en dos grandes componentes:

1. **Motor (`packages/core`)** – Una librería en TypeScript que implementa las fórmulas, lógicas de puntuación y validaciones de cada herramienta. Está diseñada para ser reutilizada en diferentes contextos (web, móvil o API).
2. **Aplicación web (`apps/web`)** – Una interfaz estática (React + Vite) servida mediante GitHub Pages. Ofrece búsqueda, formularios dinámicos y resultados legibles en español e inglés. Esta fase aún no está implementada.

## Estado actual

En este momento el repositorio contiene únicamente documentación y la base de conocimiento. El motor de cálculo y la interfaz web se implementarán en las siguientes fases según el [roadmap](ROADMAP.md).

## Descargo de responsabilidad (resumen)

PedsCore es una herramienta **educativa e informativa** destinada a profesionales sanitarios. **No sustituye el juicio clínico ni las guías locales**. Los resultados obtenidos no deben usarse como única base para la toma de decisiones clínicas. No se almacenan datos clínicos introducidos en las calculadoras.

## Cómo contribuir

Las contribuciones son bienvenidas. Si deseas proponer un nuevo score, reportar un error o aportar referencias, consulta el documento [`CONTRIBUTING.md`](CONTRIBUTING.md). También disponemos de plantillas de *issues* para facilitar la colaboración.

## Licencia

El código se distribuye bajo la licencia **MIT**, y la documentación bajo **CC BY 4.0** salvo que se indique lo contrario. Consulta el archivo [`LICENSE`](LICENSE) para más detalles.

## Roadmap breve

1. **Fase 0 – Documentación**: recopilación y validación de la base de conocimiento (en curso).
2. **Fase 1 – Motor TypeScript**: implementación del núcleo de cálculo con tests unitarios.
3. **Fase 2 – Web GitHub Pages**: desarrollo de la interfaz estática bilingüe (ES/EN).
4. **Fase 3 – Internacionalización (i18n)**: soporte multilingüe completo y validación de traducciones.
5. **Fase 4 – Analítica anónima agregada**: recopilación de estadísticas de uso sin almacenar datos clínicos.
6. **Fase 5 – Aplicación móvil**: desarrollo de apps para iOS/Android reutilizando el motor.
7. **Fase 6 – API pública**: exposición de una API REST/GraphQL para integradores.
