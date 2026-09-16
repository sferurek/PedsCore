import { getCategorySeoProfile, getSemanticRelatedTools, getToolSeoProfile, indexableSeoCategories } from "../../../packages/core/dist/index.js";

const baseUrl = "https://peds-core.vercel.app";

const staticSeo = {
  home: {
    es: ["PedsCore — herramientas clínicas pediátricas", "PedsCore reúne herramientas clínicas pediátricas y neonatales de código abierto con trazabilidad de evidencia y sin almacenamiento de datos clínicos."],
    en: ["PedsCore — open-source pediatric and neonatal clinical tools", "PedsCore provides open-source pediatric and neonatal clinical tools with evidence traceability and no clinical data storage."]
  },
  tools: {
    es: ["Herramientas clínicas pediátricas — PedsCore", "Catálogo de herramientas clínicas pediátricas y neonatales de código abierto con búsqueda, estados de validación y referencias."],
    en: ["Pediatric clinical tools — PedsCore", "Open-source pediatric and neonatal clinical tools with search, implementation status and references."]
  },
  evidence: {
    es: ["Evidencia y trazabilidad — PedsCore", "Sistema de evidencia de PedsCore para documentar fuentes, validación, licencias y decisiones antes de activar herramientas clínicas."],
    en: ["Evidence and traceability — PedsCore", "PedsCore documents sources, validation, licensing and implementation decisions before clinical tools are activated."]
  },
  stats: {
    es: ["Uso global de PedsCore", "Estadísticas públicas agregadas de uso de PedsCore por país, con umbrales de privacidad y sin datos clínicos."],
    en: ["Global PedsCore usage", "Public aggregate PedsCore usage statistics by country, with privacy thresholds and no clinical data."]
  },
  about: {
    es: ["Sobre PedsCore", "PedsCore es un proyecto de código abierto con herramientas clínicas pediátricas y neonatales y trazabilidad de evidencia."],
    en: ["About PedsCore", "PedsCore is an open-source pediatric and neonatal clinical tools project with evidence traceability."]
  },
  disclaimer: {
    es: ["Aviso legal — PedsCore", "Información sobre el alcance, las limitaciones, la privacidad y el uso informativo de PedsCore."],
    en: ["Disclaimer — PedsCore", "Information about PedsCore scope, limitations, privacy and informational use."]
  },
  contribute: {
    es: ["Contribuir — PedsCore", "Cómo contribuir a PedsCore aportando evidencia, revisiones, correcciones y mejoras de código abierto."],
    en: ["Contribute — PedsCore", "How to contribute evidence, reviews, corrections and open-source improvements to PedsCore."]
  },
  categories: {
    es: ["Herramientas pediátricas por categoría — PedsCore", "Herramientas pediátricas y neonatales de PedsCore organizadas por categoría clínica."],
    en: ["Pediatric tools by category — PedsCore", "PedsCore pediatric and neonatal tools organized by clinical category."]
  }
};

const indexableCategories = new Set(indexableSeoCategories);

const escapeHtml = (value) => String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");

const localized = (value, language) => value?.[language] || value?.en || value?.es || "";

const internalLink = (href, label) => `<a href="${href}">${escapeHtml(label)}</a>`;

export const renderStaticBody = (seo, tools) => {
  const { language, tool, category } = seo;
  const isEs = language === "es";
  const homeUrl = `/${language}`;
  const toolsUrl = `/${language}/tools`;

  if (tool) {
    const name = localized(tool.name, language);
    const description = localized(tool.description, language);
    const profile = getToolSeoProfile(tool, language);
    const population = localized(tool.population, language);
    const validation = localized(tool.validationNotes, language);
    const categoryLabel = getCategorySeoProfile(tool.category, language).name;
    const related = getSemanticRelatedTools(tool, 8);
    const references = (tool.references ?? []).slice(0, 5);

    const relatedHtml = related.length
      ? `<ul>${related.map((item) => `<li>${internalLink(`/${language}/tools/${item.slug}`, localized(item.name, language))}</li>`).join("")}</ul>`
      : "";
    const referencesHtml = references.length
      ? `<ul>${references.map((ref) => `<li>${escapeHtml(ref.citation || ref.title || ref.id)}</li>`).join("")}</ul>`
      : `<p>${isEs ? "Consulta la sección de evidencia de la herramienta para revisar sus fuentes y estado de validación." : "See the tool evidence section for its sources and validation status."}</p>`;

    return `<main class="seo-static-fallback">
      <nav aria-label="${isEs ? "Ruta de navegación" : "Breadcrumbs"}">
        ${internalLink(homeUrl, "PedsCore")} › ${internalLink(toolsUrl, isEs ? "Herramientas" : "Tools")} › <span>${escapeHtml(name)}</span>
      </nav>
      <article>
        <h1>${escapeHtml(name)}</h1>
        <p>${escapeHtml(description)}</p>
        <h2>${isEs ? `Qué es ${escapeHtml(profile.primaryTerm)}` : `What is ${escapeHtml(profile.primaryTerm)}?`}</h2>
        <p>${escapeHtml(profile.description)}</p>
        <h3>${isEs ? "Población y ámbito de uso" : "Population and scope"}</h3>
        <p>${escapeHtml(profile.topic)}. ${escapeHtml(population)}</p>
        ${profile.aliases.length > 1 ? `<h3>${isEs ? "También puede encontrarse como" : "Also searched as"}</h3><p>${profile.aliases.map(escapeHtml).join(" · ")}</p>` : ""}
        <h2>${isEs ? "Uso clínico" : "Clinical use"}</h2>
        <p>${isEs
          ? `Esta página de PedsCore reúne la información clínica, el estado de implementación y la evidencia disponible para ${escapeHtml(name)}. Está dirigida a ${escapeHtml(population || "población pediátrica y neonatal según la herramienta")}. La herramienta pertenece al área de ${escapeHtml(categoryLabel)} y debe interpretarse dentro del contexto clínico correspondiente.`
          : `This PedsCore page brings together clinical information, implementation status and available evidence for ${escapeHtml(name)}. It is intended for ${escapeHtml(population || "the pediatric or neonatal population defined for this tool")}. The tool belongs to ${escapeHtml(categoryLabel)} and should be interpreted in the appropriate clinical context.`}</p>
        <h2>${isEs ? "Interpretación y validación" : "Interpretation and validation"}</h2>
        <p>${escapeHtml(validation || (isEs ? "Revisa el estado de validación y las referencias antes de utilizar la herramienta." : "Review validation status and references before using the tool."))}</p>
        <p>${isEs
          ? "PedsCore no sustituye el juicio clínico. Las escalas, reglas y calculadoras se presentan con trazabilidad de evidencia y con su estado de implementación visible."
          : "PedsCore does not replace clinical judgement. Scores, rules and calculators are presented with evidence traceability and a visible implementation status."}</p>
        <h2>${isEs ? "Transparencia editorial" : "Editorial transparency"}</h2>
        <p>${isEs
          ? `Esta ficha forma parte de un proyecto de código abierto. El nivel de evidencia, el estado de implementación, las notas de validación y las fuentes se muestran de forma explícita. Actualmente contiene ${references.length} referencia${references.length === 1 ? "" : "s"} enlazada${references.length === 1 ? "" : "s"} en el catálogo. Los cambios del contenido y de la lógica se revisan mediante el repositorio público, pruebas automatizadas y trazabilidad de versiones.`
          : `This page is part of an open-source project. Evidence level, implementation status, validation notes and sources are shown explicitly. It currently contains ${references.length} catalog reference${references.length === 1 ? "" : "s"}. Content and calculation changes are reviewed through the public repository, automated tests and version traceability.`}</p>
        <p>${isEs
          ? "La ausencia de una calculadora activa no se interpreta como una recomendación clínica: algunas herramientas permanecen solo como referencia cuando la fuente, la licencia, la variante exacta o la validación todavía requieren revisión."
          : "The absence of an active calculator is not a clinical recommendation: some tools remain reference-only while source, licensing, exact variant or validation still require review."}</p>
        <h2>${isEs ? "Referencias" : "References"}</h2>
        ${referencesHtml}
        <h2>${isEs ? "Herramientas relacionadas" : "Related tools"}</h2>
        ${relatedHtml || `<p>${internalLink(toolsUrl, isEs ? "Explorar todas las herramientas pediátricas" : "Browse all pediatric tools")}</p>`}
      </article>
    </main>`;
  }

  if (category) {
    const info = getCategorySeoProfile(category, language);
    const items = seo.categoryTools ?? [];
    return `<main class="seo-static-fallback">
      <nav aria-label="${isEs ? "Ruta de navegación" : "Breadcrumbs"}">${internalLink(homeUrl, "PedsCore")} › <span>${escapeHtml(info.name)}</span></nav>
      <h1>${escapeHtml(info.name)}</h1>
      <p>${escapeHtml(info.description)}</p>
      <p>${isEs
        ? `Esta colección reúne ${items.length} herramientas pediátricas relacionadas con ${escapeHtml(info.name.toLowerCase())}, con acceso a descripciones clínicas, estado de validación, referencias y herramientas de cálculo cuando están activas.`
        : `This collection brings together ${items.length} pediatric tools related to ${escapeHtml(info.name.toLowerCase())}, including clinical descriptions, validation status, references and calculators when active.`}</p>
      <h2>${isEs ? "Herramientas disponibles" : "Available tools"}</h2>
      <ul>${items.map((item) => `<li>${internalLink(`/${language}/tools/${item.slug}`, localized(item.name, language))} — ${escapeHtml(localized(item.description, language))}</li>`).join("")}</ul>
      <p>${internalLink(toolsUrl, isEs ? "Ver todo el catálogo de PedsCore" : "View the full PedsCore catalog")}</p>
    </main>`;
  }

  const segments = new URL(seo.url).pathname.split("/").filter(Boolean);
  const section = segments[1];
  if (!section) {
    const featured = tools.slice(0, 24);
    return `<main class="seo-static-fallback">
      <h1>${isEs ? "Herramientas clínicas pediátricas y neonatales" : "Pediatric and neonatal clinical tools"}</h1>
      <p>${escapeHtml(seo.description)}</p>
      <p>${isEs
        ? "PedsCore es una biblioteca clínica de código abierto orientada a pediatría y neonatología. Reúne escalas, calculadoras, reglas de decisión y recursos clínicos con referencias, trazabilidad de evidencia y estado de validación visible."
        : "PedsCore is an open-source clinical library for pediatrics and neonatology. It brings together scores, calculators, decision rules and clinical resources with references, evidence traceability and visible validation status."}</p>
      <h2>${isEs ? "Cómo se construye PedsCore" : "How PedsCore is built"}</h2>
      <p>${isEs
        ? "Cada ficha separa el contenido clínico de su estado técnico. Una herramienta puede estar implementada, parcialmente disponible, en validación, pendiente de fuente primaria o limitada por condiciones de reutilización. Esa distinción evita presentar como operativa una fórmula, tabla o regla que todavía no ha superado los controles documentales y técnicos del proyecto."
        : "Each page separates clinical content from technical implementation status. A tool may be implemented, partially available, under validation, awaiting a primary source, or limited by reuse conditions. This prevents a formula, table or rule from appearing operational before it has passed the project’s documentary and technical checks."}</p>
      <h2>${isEs ? "Evidencia, seguridad y privacidad" : "Evidence, safety and privacy"}</h2>
      <p>${isEs
        ? "Las referencias, notas de validación y limitaciones se muestran junto a cada herramienta. Los cálculos locales se prueban de forma determinista y el código puede auditarse públicamente. PedsCore no almacena los valores clínicos introducidos en los formularios y no pretende sustituir el juicio clínico, los protocolos locales ni la valoración individual del paciente."
        : "References, validation notes and limitations are displayed alongside each tool. Local calculations are tested deterministically and the code can be audited publicly. PedsCore does not store clinical values entered in forms and is not intended to replace clinical judgment, local protocols or individual patient assessment."}</p>
      <p>${internalLink(toolsUrl, isEs ? "Explorar todas las herramientas clínicas" : "Explore all clinical tools")} · ${internalLink(`/${language}/evidence`, isEs ? "Metodología de evidencia" : "Evidence methodology")} · ${internalLink(`/${language}/about`, isEs ? "Sobre el proyecto" : "About the project")}</p>
      <h2>${isEs ? "Herramientas pediátricas" : "Pediatric tools"}</h2>
      <ul>${featured.map((item) => `<li>${internalLink(`/${language}/tools/${item.slug}`, localized(item.name, language))}</li>`).join("")}</ul>
    </main>`;
  }

  if (section === "tools") {
    const featured = tools.slice(0, 60);
    return `<main class="seo-static-fallback">
      <nav aria-label="${isEs ? "Ruta de navegación" : "Breadcrumbs"}">${internalLink(homeUrl, "PedsCore")} › <span>${isEs ? "Herramientas" : "Tools"}</span></nav>
      <h1>${isEs ? "Herramientas clínicas pediátricas" : "Pediatric clinical tools"}</h1>
      <p>${escapeHtml(seo.description)}</p>
      <p>${isEs
        ? "Consulta escalas, calculadoras, reglas de decisión, cuestionarios y recursos de referencia de pediatría y neonatología. Cada ficha muestra su contexto clínico, estado de implementación y fuentes disponibles."
        : "Browse pediatric and neonatal scores, calculators, decision rules, questionnaires and reference resources. Each page shows clinical context, implementation status and available sources."}</p>
      <ul>${featured.map((item) => `<li>${internalLink(`/${language}/tools/${item.slug}`, localized(item.name, language))} — ${escapeHtml(localized(item.description, language))}</li>`).join("")}</ul>
    </main>`;
  }

  if (section === "about") {
    return `<main class="seo-static-fallback">
      <nav aria-label="${isEs ? "Ruta de navegación" : "Breadcrumbs"}">${internalLink(homeUrl, "PedsCore")} › <span>${isEs ? "Sobre PedsCore" : "About PedsCore"}</span></nav>
      <h1>${isEs ? "Sobre PedsCore" : "About PedsCore"}</h1>
      <p>${escapeHtml(seo.description)}</p>
      <h2>${isEs ? "Proyecto clínico abierto" : "Open clinical project"}</h2>
      <p>${isEs
        ? "PedsCore es un proyecto de código abierto para profesionales sanitarios, docentes y colaboradores. Reúne herramientas pediátricas y neonatales con una separación explícita entre catálogo, evidencia, implementación y disponibilidad clínica."
        : "PedsCore is an open-source project for healthcare professionals, educators and contributors. It brings together pediatric and neonatal tools while explicitly separating catalog status, evidence, implementation and clinical availability."}</p>
      <h2>${isEs ? "Cómo se mantiene" : "How it is maintained"}</h2>
      <p>${isEs
        ? "El código, las referencias, las decisiones de implementación y el historial de cambios son públicos en GitHub. Las contribuciones clínicas deben identificar la fuente, la variante exacta, la fórmula o tabla aplicable, las condiciones de reutilización y un lenguaje de salida seguro. Los cálculos activos se acompañan de pruebas automatizadas."
        : "Code, references, implementation decisions and change history are public on GitHub. Clinical contributions must identify the source, exact variant, applicable formula or table, reuse conditions and safe output wording. Active calculations are accompanied by automated tests."}</p>
      <h2>${isEs ? "Alcance y responsabilidad" : "Scope and responsibility"}</h2>
      <p>${isEs
        ? "PedsCore es un recurso de consulta y apoyo. No diagnostica, no prescribe tratamiento y no sustituye el juicio clínico, los protocolos locales ni la valoración individual. Cuando una herramienta no dispone de evidencia o permisos suficientes, permanece identificada pero no se activa como calculadora."
        : "PedsCore is a reference and support resource. It does not diagnose, prescribe treatment or replace clinical judgment, local protocols or individual assessment. When a tool lacks sufficient evidence or reuse permission, it remains documented but is not activated as a calculator."}</p>
      <p>${internalLink(`/${language}/evidence`, isEs ? "Leer la metodología de evidencia" : "Read the evidence methodology")} · <a href="https://github.com/sferurek/PedsCore">GitHub</a></p>
    </main>`;
  }

  if (section === "evidence") {
    return `<main class="seo-static-fallback">
      <nav aria-label="${isEs ? "Ruta de navegación" : "Breadcrumbs"}">${internalLink(homeUrl, "PedsCore")} › <span>${isEs ? "Evidencia y trazabilidad" : "Evidence and traceability"}</span></nav>
      <h1>${isEs ? "Evidencia y trazabilidad" : "Evidence and traceability"}</h1>
      <p>${escapeHtml(seo.description)}</p>
      <h2>${isEs ? "Política de fuentes" : "Source policy"}</h2>
      <p>${isEs
        ? "PedsCore prioriza estudios originales o de derivación, validaciones externas, guías clínicas oficiales y documentos de consenso. Las fuentes secundarias pueden utilizarse para localizar o contextualizar información, pero no sustituyen una fuente primaria cuando la implementación depende de una fórmula, tabla, punto de corte o definición exacta."
        : "PedsCore prioritizes original or derivation studies, external validations, official clinical guidelines and consensus statements. Secondary sources may help locate or contextualize information, but they do not replace a primary source when implementation depends on an exact formula, table, threshold or definition."}</p>
      <h2>${isEs ? "Criterio de activación" : "Activation criteria"}</h2>
      <p>${isEs
        ? "Una herramienta no se activa solo porque sea conocida o frecuente. Antes de ofrecer cálculo local se revisan la versión, la población, las entradas, la fórmula o tabla, la interpretación, la licencia y las pruebas. Si alguno de esos elementos no está suficientemente cerrado, la ficha puede permanecer como referencia, borrador o contenido limitado."
        : "A tool is not activated simply because it is well known or commonly used. Before local calculation is offered, version, population, inputs, formula or table, interpretation, licensing and tests are reviewed. If any of these remain unresolved, the page can stay reference-only, draft or limited."}</p>
      <h2>${isEs ? "Correcciones y revisión abierta" : "Corrections and open review"}</h2>
      <p>${isEs
        ? "Las referencias y decisiones pueden revisarse públicamente. Los errores, fuentes alternativas y propuestas de actualización pueden comunicarse mediante GitHub Issues, y los cambios quedan vinculados al historial del repositorio."
        : "References and decisions can be reviewed publicly. Errors, alternative sources and update proposals can be reported through GitHub Issues, with changes remaining linked to repository history."}</p>
      <p><a href="https://github.com/sferurek/PedsCore/tree/main/docs/evidence">${isEs ? "Documentación de evidencia" : "Evidence documentation"}</a> · <a href="https://github.com/sferurek/PedsCore/issues/new/choose">${isEs ? "Proponer una corrección" : "Propose a correction"}</a></p>
    </main>`;
  }

  if (section === "contribute") {
    return `<main class="seo-static-fallback">
      <nav aria-label="${isEs ? "Ruta de navegación" : "Breadcrumbs"}">${internalLink(homeUrl, "PedsCore")} › <span>${isEs ? "Contribuir" : "Contribute"}</span></nav>
      <h1>${isEs ? "Contribuir a PedsCore" : "Contribute to PedsCore"}</h1>
      <p>${escapeHtml(seo.description)}</p>
      <h2>${isEs ? "Qué aportaciones son útiles" : "Useful contributions"}</h2>
      <p>${isEs
        ? "Son especialmente útiles las fuentes primarias, validaciones externas, correcciones de fórmulas o tablas, aclaraciones de licencias, mejoras de traducción, accesibilidad, experiencia de uso y pruebas reproducibles."
        : "Primary sources, external validations, formula or table corrections, licensing clarifications, translation and accessibility improvements, usability feedback and reproducible tests are especially useful."}</p>
      <h2>${isEs ? "Cómo documentar una propuesta clínica" : "How to document a clinical proposal"}</h2>
      <p>${isEs
        ? "Incluye DOI, PMID o enlace oficial cuando exista; identifica la versión exacta de la herramienta; describe la población y el contexto; y evita incluir datos reales de pacientes. Las propuestas que cambian lógica clínica deben poder verificarse contra la fuente y acompañarse de pruebas."
        : "Include a DOI, PMID or official link where available; identify the exact tool version; describe population and setting; and never include real patient data. Proposals that change clinical logic must be verifiable against the source and accompanied by tests."}</p>
      <p><a href="https://github.com/sferurek/PedsCore/issues/new/choose">GitHub Issues</a> · <a href="https://github.com/sferurek/PedsCore/blob/main/CONTRIBUTING.md">CONTRIBUTING.md</a></p>
    </main>`;
  }

  return `<main class="seo-static-fallback">
    <nav aria-label="${isEs ? "Ruta de navegación" : "Breadcrumbs"}">${internalLink(homeUrl, "PedsCore")} › <span>${escapeHtml(seo.title.replace(/\s*[—|].*$/, ""))}</span></nav>
    <h1>${escapeHtml(seo.title.replace(/\s*[—|].*$/, ""))}</h1>
    <p>${escapeHtml(seo.description)}</p>
    <p>${internalLink(toolsUrl, isEs ? "Explorar herramientas clínicas pediátricas" : "Explore pediatric clinical tools")} · ${internalLink(`/${language}/evidence`, isEs ? "Evidencia y trazabilidad" : "Evidence and traceability")}</p>
  </main>`;
};

export const getStaticSeo = (pathname, tools) => {
  const segments = pathname.split("/").filter(Boolean);
  const language = segments[0] === "en" ? "en" : "es";
  const section = segments[1];
  const slug = segments[2];
  const tool = section === "tools" && slug ? tools.find((item) => item.slug === slug) : null;
  const category = section === "categories" && slug && indexableCategories.has(slug) ? slug : null;
  const categoryTools = category ? tools.filter((item) => item.category === category) : [];
  const key = !section ? "home" : section === "stats" ? "stats" : section === "categories" ? "categories" : section;
  const [defaultTitle, description] = staticSeo[key]?.[language] ?? staticSeo.home[language];
  const title = tool
    ? getToolSeoProfile(tool, language).title
    : category
      ? `${getCategorySeoProfile(category, language).name} | ${language === "es" ? "Pediatría" : "Pediatrics"} | PedsCore`
      : defaultTitle;
  const url = `${baseUrl}${pathname || `/${language}`}`;
  const alternatePath = pathname.replace(/^\/(es|en)/, language === "es" ? "/en" : "/es") || `/${language === "es" ? "en" : "es"}`;
  const categoryDescription = category
    ? `${getCategorySeoProfile(category, language).description} ${categoryTools.length} ${language === "es" ? "herramientas disponibles en PedsCore." : "tools available in PedsCore."}`
    : description;
  return { language, title, description: tool ? getToolSeoProfile(tool, language).description : categoryDescription, url, alternateUrl: `${baseUrl}${alternatePath}`, tool, category, categoryTools };
};

export const renderSeoHead = (template, seo) => {
  const alternateLanguage = seo.language === "es" ? "en" : "es";
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": seo.tool ? "MedicalWebPage" : seo.category ? "CollectionPage" : "WebPage",
        "@id": `${seo.url}#webpage`,
        name: seo.title,
        description: seo.description,
        url: seo.url,
        inLanguage: seo.language,
        isPartOf: { "@id": `${baseUrl}/#website` },
        publisher: { "@id": `${baseUrl}/#organization` },
        ...(seo.tool ? { mainEntity: { "@type": "MedicalEntity", name: seo.tool.name[seo.language] || seo.tool.name.en } } : {})
      },
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        name: "PedsCore",
        url: `${baseUrl}/`,
        publisher: { "@id": `${baseUrl}/#organization` },
        inLanguage: ["es", "en"]
      },
      {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        name: "PedsCore",
        url: `${baseUrl}/`,
        sameAs: ["https://github.com/sferurek/PedsCore"]
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "PedsCore", item: `${baseUrl}/${seo.language}` },
          ...(seo.tool
            ? [
                { "@type": "ListItem", position: 2, name: seo.language === "es" ? "Herramientas" : "Tools", item: `${baseUrl}/${seo.language}/tools` },
                { "@type": "ListItem", position: 3, name: seo.tool.name[seo.language] || seo.tool.name.en, item: seo.url }
              ]
            : seo.category
              ? [{ "@type": "ListItem", position: 2, name: seo.language === "es" ? "Categorías" : "Categories", item: `${baseUrl}/${seo.language}/#categories` }, { "@type": "ListItem", position: 3, name: getCategorySeoProfile(seo.category, seo.language).name, item: seo.url }]
              : [])
        ]
      },
      ...(seo.category
        ? [{
            "@type": "ItemList",
            name: getCategorySeoProfile(seo.category, seo.language).name,
            numberOfItems: seo.categoryTools.length,
            itemListElement: seo.categoryTools.map((item, index) => ({
              "@type": "ListItem",
              position: index + 1,
              url: `${baseUrl}/${seo.language}/tools/${item.slug}`,
              name: item.name[seo.language] || item.name.en
            }))
          }]
        : [])
    ]
  };
  return template
    .replace(/<html lang="[^"]+">/, `<html lang="${seo.language}">`)
    .replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(seo.title)}</title>`)
    .replace(/(<meta\s+name="description"\s+content=")[^"]*(")/, `$1${escapeHtml(seo.description)}$2`)
    .replace(/(<link\s+rel="canonical"\s+href=")[^"]*(")/, `$1${seo.url}$2`)
    .replace(/(<meta\s+property="og:title"\s+content=")[^"]*(")/, `$1${escapeHtml(seo.title)}$2`)
    .replace(/(<meta\s+property="og:description"\s+content=")[^"]*(")/, `$1${escapeHtml(seo.description)}$2`)
    .replace(/(<meta\s+property="og:url"\s+content=")[^"]*(")/, `$1${seo.url}$2`)
    .replace(/(<meta\s+property="og:locale"\s+content=")[^"]*(")/, `$1${seo.language === "es" ? "es_ES" : "en_US"}$2`)
    .replace(/(<meta\s+property="og:locale:alternate"\s+content=")[^"]*(")/, `$1${seo.language === "es" ? "en_US" : "es_ES"}$2`)
    .replace(/(<meta\s+name="twitter:title"\s+content=")[^"]*(")/, `$1${escapeHtml(seo.title)}$2`)
    .replace(/(<meta\s+name="twitter:description"\s+content=")[^"]*(")/, `$1${escapeHtml(seo.description)}$2`)
    .replace(/<script type="application\/ld\+json">\s*\{[\s\S]*?\}\s*<\/script>/, `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`)
    .replace(/\s*<link rel="alternate" hreflang="[^"]+" href="[^"]+" \/>/g, "")
    .replace("</head>", `  <link rel="alternate" hreflang="${seo.language}" href="${seo.url}" />\n    <link rel="alternate" hreflang="${alternateLanguage}" href="${seo.alternateUrl}" />\n    <link rel="alternate" hreflang="x-default" href="${baseUrl}/" />\n  </head>`);
};
