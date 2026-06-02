# Contributing · Contribuyendo

## Contributing to PedsCore (English)

We welcome contributions that improve PedsCore’s quality, coverage and usability. Before you start, please read this document carefully to understand our processes and expectations.

### Proposing new tools

1. Open a **New tool request** issue using the corresponding template in `.github/ISSUE_TEMPLATE`.
2. Provide as much information as possible: full name and commonly used acronym, clinical specialty/subspecialty, type (score, scale, calculator, algorithm, percentile, rule), purpose and clinical context, target population, variables with valid ranges, detailed calculation or logic, and **primary references** (e.g. journal articles, guidelines). Secondary references may support but not replace primary sources.
3. Evaluate the level of evidence: high (derived from randomised trials or guidelines), moderate (observational studies), low (expert opinion). Explain your assessment.

### Reporting errors

1. For coding errors or unexpected behaviour, open a **Bug report** issue. Describe the problem, expected versus actual results, steps to reproduce, and your environment (PedsCore version, node/npm versions, browser/OS versions when relevant).
2. For errors in references or documentation, open a **Bibliography correction** issue, specifying the affected tool, the incorrect citation and the correct reference with DOI or other permanent identifier.
3. For clinical content improvements or clarifications, open a **Clinical content review** issue and justify your proposal with evidence.

### Supplying references

When contributing literature, include at least one of the following identifiers: DOI, PubMed ID, or a stable URL to an official guideline. Provide the full citation (authors, year, title, journal/organisation). We prioritise **original studies** and **official guidelines** over secondary summaries and blogs.

### Evidence requirements

PedsCore tools must be founded on peer‑reviewed literature or widely adopted guidelines. Please ensure that your proposal cites primary sources and that the tool has been validated or widely referenced. We avoid including unvalidated or proprietary calculators.

### Coding and documentation style

We use **TypeScript** with strict settings. Please adhere to the project’s ESLint and formatting rules. Write self‑documenting code and include unit tests to validate the logic. For documentation contributions, use clear language and avoid reproducing copyrighted texts. Cite all sources.

## Contribuyendo a PedsCore (Español)

Nos encantan las contribuciones que mejoran la calidad, cobertura y usabilidad de PedsCore. Antes de empezar, lee este documento para comprender nuestros procesos y expectativas.

### Proponer nuevas herramientas

1. Abre un *issue* **New tool request** utilizando la plantilla correspondiente en `.github/ISSUE_TEMPLATE`.
2. Aporta la mayor información posible: nombre completo y acrónimo habitual, especialidad/subespecialidad, tipo (score, escala, calculadora, algoritmo, percentil, regla), utilidad clínica y contexto, población diana, variables con rangos válidos, cálculo o lógica detallada y referencias **primarias** (artículos científicos, guías oficiales). Las referencias secundarias pueden apoyar pero no sustituir a las primarias.
3. Evalúa el nivel de evidencia: alto (ensayos aleatorizados o guías), moderado (estudios observacionales), bajo (opinión de expertos). Explica tu valoración.

### Informar de errores

1. Para errores de código o comportamientos inesperados, abre un *issue* **Bug report**. Describe el problema, el resultado esperado frente al observado, los pasos para reproducirlo y tu entorno (versión de PedsCore, versiones de node/npm, versiones de navegador/SO si corresponde).
2. Para errores en referencias o documentación, abre un *issue* **Bibliography correction**, especificando la herramienta afectada, la cita incorrecta y la referencia correcta con DOI u otro identificador permanente.
3. Para mejoras o aclaraciones de contenido clínico, abre un *issue* **Clinical content review** y justifica tu propuesta con evidencia.

### Aportar referencias

Al contribuir literatura, incluye al menos uno de los siguientes identificadores: DOI, identificador PubMed o una URL estable a una guía oficial. Proporciona la cita completa (autores, año, título, revista/organización). Priorizamos **estudios originales** y **guías oficiales** frente a resúmenes secundarios y blogs.

### Requisitos de evidencia

Las herramientas de PedsCore deben basarse en literatura revisada por pares o guías ampliamente adoptadas. Asegúrate de que tu propuesta cite fuentes primarias y que la herramienta esté validada o ampliamente referenciada. Evitamos incluir calculadoras no validadas o propietarias.

### Estilo de código y documentación

Usamos **TypeScript** con configuraciones estrictas. Adhiérete a las reglas de ESLint y formateo del proyecto. Escribe código autoexplicativo e incluye pruebas unitarias para validar la lógica. Para contribuciones de documentación, utiliza un lenguaje claro y evita reproducir textos con copyright. Cita todas las fuentes.
