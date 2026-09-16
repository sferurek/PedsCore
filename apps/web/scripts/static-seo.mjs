const baseUrl = "https://peds-core.vercel.app";

const staticSeo = {
  home: {
    es: ["PedsCore — herramientas clínicas pediátricas y neonatales de código abierto", "PedsCore reúne herramientas clínicas pediátricas y neonatales de código abierto con trazabilidad de evidencia y sin almacenamiento de datos clínicos."],
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

const indexableCategories = {
  cardiology: {
    es: { name: "Cardiología", description: "Calculadoras cardiologicas pediatricas y electrocardiografia." },
    en: { name: "Cardiology", description: "Pediatric cardiology calculators and electrocardiography." }
  },
  emergency: {
    es: { name: "Urgencias pediátricas", description: "Reglas de urgencias, trauma, deshidratacion, shock y deterioro clinico." },
    en: { name: "Pediatric emergency", description: "Emergency rules, trauma, dehydration, shock and clinical deterioration." }
  },
  nephrology: {
    es: { name: "Nefrología", description: "Filtrado glomerular y lesion renal aguda pediatrica." },
    en: { name: "Nephrology", description: "Pediatric glomerular filtration and acute kidney injury." }
  },
  respiratory: {
    es: { name: "Respiratorio", description: "Bronquiolitis, asma, crup y dificultad respiratoria pediátrica." },
    en: { name: "Respiratory", description: "Bronchiolitis, asthma, croup and pediatric respiratory distress." }
  }
};

const escapeHtml = (value) => String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");

const seoTitleOverrides = {
  pim2: {
    es: "Calculadora PIM2 — Mortalidad pediátrica | PedsCore",
    en: "PIM2 Calculator — Pediatric Mortality Risk | PedsCore"
  },
  pim3: {
    es: "Calculadora PIM3 — Mortalidad pediátrica | PedsCore",
    en: "PIM3 Calculator — Pediatric Mortality Risk | PedsCore"
  },
  nips: {
    es: "Escala NIPS — Dolor neonatal | PedsCore",
    en: "NIPS Pain Scale — Neonatal Pain Assessment | PedsCore"
  },
  pipp: {
    es: "Escala PIPP — Dolor en prematuros | PedsCore",
    en: "PIPP Scale — Premature Infant Pain Profile | PedsCore"
  },
  "pipp-r": {
    es: "Escala PIPP-R — Dolor en prematuros | PedsCore",
    en: "PIPP-R Scale — Premature Infant Pain Profile | PedsCore"
  },
  dubowitz: {
    es: "Escala de Dubowitz — Edad gestacional | PedsCore",
    en: "Dubowitz Score — Gestational Age Assessment | PedsCore"
  },
  "asthma-control-questionnaire": {
    es: "ACQ — Cuestionario de control del asma | PedsCore",
    en: "Asthma Control Questionnaire (ACQ) | PedsCore"
  },
  headsss: {
    es: "HEADSSS — Entrevista del adolescente | PedsCore",
    en: "HEADSSS Adolescent Interview | PedsCore"
  },
  pedmidas: {
    es: "PedMIDAS — Discapacidad por migraña pediátrica | PedsCore",
    en: "PedMIDAS Score — Pediatric Migraine Disability | PedsCore"
  },
  "orbegozo-growth-percentiles": {
    es: "Tablas Orbegozo — Percentiles de crecimiento | PedsCore",
    en: "Orbegozo Growth Charts — Pediatric Percentiles | PedsCore"
  }
};

const toolKindLabel = (tool, language) => {
  const labels = {
    scale: { es: "Escala", en: "Scale" },
    score: { es: "Escala", en: "Score" },
    calculator: { es: "Calculadora", en: "Calculator" },
    rule: { es: "Regla clínica", en: "Clinical Rule" },
    algorithm: { es: "Algoritmo", en: "Algorithm" },
    questionnaire: { es: "Cuestionario", en: "Questionnaire" },
    chart: { es: "Tabla", en: "Chart" }
  };
  return labels[tool.type]?.[language] ?? (language === "es" ? "Herramienta" : "Tool");
};

const makeToolTitle = (tool, language) => {
  const override = seoTitleOverrides[tool.slug]?.[language];
  if (override) return override;

  const shortName = (tool.shortName || tool.name[language] || tool.name.en).trim();
  const kind = toolKindLabel(tool, language);
  const candidate = `${kind} ${shortName} | PedsCore`;
  if (candidate.length <= 60) return candidate;

  const plain = `${shortName} | PedsCore`;
  return plain.length <= 60 ? plain : `${plain.slice(0, 57).trim()}…`;
};

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
    const population = localized(tool.population, language);
    const validation = localized(tool.validationNotes, language);
    const categoryLabel = indexableCategories[tool.category]?.[language]?.name || tool.category;
    const related = tools.filter((item) => item.id !== tool.id && item.category === tool.category).slice(0, 6);
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
        <h2>${isEs ? "Uso clínico" : "Clinical use"}</h2>
        <p>${isEs
          ? `Esta página de PedsCore reúne la información clínica, el estado de implementación y la evidencia disponible para ${escapeHtml(name)}. Está dirigida a ${escapeHtml(population || "población pediátrica y neonatal según la herramienta")}. La herramienta pertenece al área de ${escapeHtml(categoryLabel)} y debe interpretarse dentro del contexto clínico correspondiente.`
          : `This PedsCore page brings together clinical information, implementation status and available evidence for ${escapeHtml(name)}. It is intended for ${escapeHtml(population || "the pediatric or neonatal population defined for this tool")}. The tool belongs to ${escapeHtml(categoryLabel)} and should be interpreted in the appropriate clinical context.`}</p>
        <h2>${isEs ? "Interpretación y validación" : "Interpretation and validation"}</h2>
        <p>${escapeHtml(validation || (isEs ? "Revisa el estado de validación y las referencias antes de utilizar la herramienta." : "Review validation status and references before using the tool."))}</p>
        <p>${isEs
          ? "PedsCore no sustituye el juicio clínico. Las escalas, reglas y calculadoras se presentan con trazabilidad de evidencia y con su estado de implementación visible."
          : "PedsCore does not replace clinical judgement. Scores, rules and calculators are presented with evidence traceability and a visible implementation status."}</p>
        <h2>${isEs ? "Referencias" : "References"}</h2>
        ${referencesHtml}
        <h2>${isEs ? "Herramientas relacionadas" : "Related tools"}</h2>
        ${relatedHtml || `<p>${internalLink(toolsUrl, isEs ? "Explorar todas las herramientas pediátricas" : "Browse all pediatric tools")}</p>`}
      </article>
    </main>`;
  }

  if (category) {
    const info = indexableCategories[category][language];
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
      <p>${internalLink(toolsUrl, isEs ? "Explorar todas las herramientas clínicas" : "Explore all clinical tools")} · ${internalLink(`/${language}/evidence`, isEs ? "Metodología de evidencia" : "Evidence methodology")}</p>
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
  const category = section === "categories" && slug && indexableCategories[slug] ? slug : null;
  const categoryTools = category ? tools.filter((item) => item.category === category) : [];
  const key = !section ? "home" : section === "stats" ? "stats" : section === "categories" ? "categories" : section;
  const [defaultTitle, description] = staticSeo[key]?.[language] ?? staticSeo.home[language];
  const title = tool
    ? makeToolTitle(tool, language)
    : category
      ? `${indexableCategories[category][language].name} | ${language === "es" ? "Pediatría" : "Pediatrics"} | PedsCore`
      : defaultTitle;
  const url = `${baseUrl}${pathname || `/${language}`}`;
  const alternatePath = pathname.replace(/^\/(es|en)/, language === "es" ? "/en" : "/es") || `/${language === "es" ? "en" : "es"}`;
  const categoryDescription = category
    ? `${indexableCategories[category][language].description} ${categoryTools.length} ${language === "es" ? "herramientas disponibles en PedsCore." : "tools available in PedsCore."}`
    : description;
  return { language, title, description: tool ? `${tool.description[language] || tool.description.en} ${language === "es" ? "Consulta uso, interpretación, validación y referencias en PedsCore." : "Review use, interpretation, validation and references in PedsCore."}` : categoryDescription, url, alternateUrl: `${baseUrl}${alternatePath}`, tool, category, categoryTools };
};

export const renderSeoHead = (template, seo) => {
  const alternateLanguage = seo.language === "es" ? "en" : "es";
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": seo.category ? "CollectionPage" : "WebPage",
        name: seo.title,
        description: seo.description,
        url: seo.url,
        inLanguage: seo.language,
        isPartOf: { "@type": "WebSite", name: "PedsCore", url: `${baseUrl}/` }
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
              ? [{ "@type": "ListItem", position: 2, name: seo.language === "es" ? "Categorías" : "Categories", item: `${baseUrl}/${seo.language}/#categories` }, { "@type": "ListItem", position: 3, name: indexableCategories[seo.category][seo.language].name, item: seo.url }]
              : [])
        ]
      },
      ...(seo.category
        ? [{
            "@type": "ItemList",
            name: indexableCategories[seo.category][seo.language].name,
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
