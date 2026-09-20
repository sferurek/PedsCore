import { getCategorySeoProfile, getReferenceUrl, getSemanticRelatedTools, getToolSeoProfile, indexableSeoCategories } from "../../../packages/core/dist/index.js";

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
    es: ["Sobre PedsCore — proyecto clínico open source", "PedsCore es un proyecto de código abierto con herramientas clínicas pediátricas y neonatales y trazabilidad de evidencia."],
    en: ["About PedsCore", "PedsCore is an open-source pediatric and neonatal clinical tools project with evidence traceability."]
  },
  disclaimer: {
    es: ["Aviso legal — PedsCore", "Información sobre el alcance, las limitaciones, la privacidad y el uso informativo de PedsCore."],
    en: ["Disclaimer — PedsCore", "Information about PedsCore scope, limitations, privacy and informational use."]
  },
  contribute: {
    es: ["Contribuir a PedsCore — evidencia y código abierto", "Cómo contribuir a PedsCore aportando evidencia, revisiones, correcciones y mejoras de código abierto."],
    en: ["Contribute — PedsCore", "How to contribute evidence, reviews, corrections and open-source improvements to PedsCore."]
  },
  categories: {
    es: ["Herramientas pediátricas por categoría — PedsCore", "Herramientas pediátricas y neonatales de PedsCore organizadas por categoría clínica."],
    en: ["Pediatric tools by category — PedsCore", "PedsCore pediatric and neonatal tools organized by clinical category."]
  }
};

const indexableCategories = new Set(indexableSeoCategories);
const topicHubs = {
  "pediatric-head-injury-rules": {
    es: {
      title: "Reglas de TCE pediátrico: PECARN, CATCH y CHALICE | PedsCore",
      description: "Compara PECARN, CATCH y CHALICE para traumatismo craneal pediátrico, con población, evidencia, limitaciones y acceso a cada ficha.",
      intro: "Estas reglas no son intercambiables: fueron derivadas en poblaciones y con desenlaces distintos. Revisa la edad, criterios de inclusión, finalidad y limitaciones de cada una antes de utilizarla."
    },
    en: {
      title: "Pediatric Head Injury Rules: PECARN, CATCH and CHALICE | PedsCore",
      description: "Compare PECARN, CATCH and CHALICE pediatric head injury rules, including population, evidence, limitations and links to each tool.",
      intro: "These rules are not interchangeable: they were derived in different populations and against different outcomes. Review age, inclusion criteria, purpose and limitations before use."
    },
    toolIds: ["pecarn_tbi_under_2", "pecarn_tbi_2_or_more", "catch_tbi", "chalice_tbi"]
  },
  "neonatal-pain-scales": {
    es: {
      title: "Escalas de dolor neonatal: NIPS, CRIES, PIPP y COMFORTneo | PedsCore",
      description: "Guía de escalas de dolor neonatal: NIPS, CRIES, PIPP/PIPP-R y COMFORTneo, con contexto clínico, estado y evidencia.",
      intro: "La elección depende de la edad gestacional, el tipo de dolor, el contexto asistencial y la versión validada. PedsCore muestra qué escalas tienen cálculo local y cuáles permanecen como referencia."
    },
    en: {
      title: "Neonatal Pain Scales: NIPS, CRIES, PIPP and COMFORTneo | PedsCore",
      description: "Guide to neonatal pain scales: NIPS, CRIES, PIPP/PIPP-R and COMFORTneo, with clinical context, status and evidence.",
      intro: "Choice depends on gestational age, pain type, care setting and validated version. PedsCore shows which scales have local calculation and which remain reference-only."
    },
    toolIds: ["nips", "cries", "pipp", "pipp_r", "comfortneo"]
  },
  "neonatal-encephalopathy-scores": {
    es: {
      title: "Escalas de encefalopatía neonatal: Sarnat y Thompson | PedsCore",
      description: "Compara Sarnat clásico, Modified Sarnat/NICHD, Thompson HIE y García-Alix para valoración de encefalopatía neonatal.",
      intro: "Estas escalas describen constructos y momentos de evaluación relacionados pero no idénticos. La puntuación no debe convertirse por sí sola en una decisión terapéutica."
    },
    en: {
      title: "Neonatal Encephalopathy Scores: Sarnat and Thompson | PedsCore",
      description: "Compare Classic Sarnat, Modified Sarnat/NICHD, Thompson HIE and García-Alix approaches to neonatal encephalopathy assessment.",
      intro: "These tools describe related but non-identical constructs and assessment windows. A score alone should not be converted into a treatment decision."
    },
    toolIds: ["sarnat", "modified_sarnat_nichd", "thompson_hie", "garcia_alix_ne_rs"]
  },
  "pediatric-asthma-wheeze-scores": {
    es: {
      title: "Scores de asma y sibilancias pediátricas | PedsCore",
      description: "Compara PRAM, PASS y Wood-Downes-Ferres para gravedad respiratoria pediátrica, con población, contexto, evidencia y disponibilidad.",
      intro: "Estas herramientas no son equivalentes. PRAM está orientado a exacerbación asmática; otras variantes se desarrollaron para contextos respiratorios diferentes."
    },
    en: {
      title: "Pediatric Asthma and Wheeze Scores | PedsCore",
      description: "Compare PRAM, PASS and Wood-Downes-Ferres for pediatric respiratory severity, including population, setting, evidence and availability.",
      intro: "These tools are not equivalent. PRAM targets acute asthma exacerbation, while other variants were developed for different respiratory contexts."
    },
    toolIds: ["pram", "pass", "wood_downes_ferres"]
  }
};

const featuredCategoryToolIds = {
  intensive_care: ["pim2", "pim3", "prism_iv", "pelod_2", "psofa", "phoenix_sepsis"],
  neonatology: ["comfortneo", "garcia_alix_ners", "sarnat", "modified_sarnat_nichd", "who_growth_percentiles"],
  neurology: ["pedmidas", "pediatric_glasgow_coma_scale"],
  respiratory: ["wood_downes_ferres", "pram", "pass"],
  growth_nutrition: ["who_growth_percentiles", "bmi_percentile", "cdc_growth_percentiles", "who_growth_module"],
  emergency: ["pecarn_tbi_under_2", "pecarn_tbi_2_or_more", "catch_tbi", "chalice_tbi", "step_by_step"]
};

const categoryIntentCopy = {
  intensive_care: {
    es: "Incluye scores pronósticos y de disfunción orgánica como PIM2, PIM3, PRISM IV, PELOD-2, pSOFA y Phoenix. Cada ficha mantiene por separado finalidad, población, momento de recogida y limitaciones.",
    en: "Includes prognostic and organ-dysfunction tools such as PIM2, PIM3, PRISM IV, PELOD-2, pSOFA and Phoenix. Each page keeps purpose, population, sampling window and limitations explicit."
  },
  neonatology: {
    es: "Reúne escalas de transición, encefalopatía, dolor/sedación, ictericia y crecimiento neonatal. Sarnat, García-Alix y COMFORTneo se enlazan con su variante y evidencia para evitar tratar instrumentos distintos como equivalentes.",
    en: "Covers transition, encephalopathy, pain/sedation, jaundice and neonatal growth. Sarnat, García-Alix and COMFORTneo are linked with exact variant and evidence so distinct instruments are not treated as equivalent."
  },
  neurology: {
    es: "Incluye valoración de conciencia, ictus y discapacidad por migraña. PedMIDAS se presenta como instrumento específico de discapacidad relacionada con migraña, diferenciado de escalas de intensidad o diagnóstico.",
    en: "Includes consciousness, stroke and migraine-disability assessment. PedMIDAS is presented specifically as a migraine-disability instrument, distinct from headache-intensity or diagnostic tools."
  },
  respiratory: {
    es: "Agrupa escalas de asma, bronquiolitis, sibilancias, crup y dificultad respiratoria. PRAM, PASS y Wood-Downes-Ferrés se muestran con su población y contexto para evitar intercambiar escalas no equivalentes.",
    en: "Groups asthma, bronchiolitis, wheeze, croup and respiratory-distress tools. PRAM, PASS and Wood-Downes-Ferres are shown with population and setting so non-equivalent scores are not interchanged."
  },
  growth_nutrition: {
    es: "Distingue el módulo general de percentiles OMS de herramientas específicas como IMC-para-la-edad. Esta separación ayuda a resolver búsquedas de percentiles de peso/talla frente a búsquedas específicas de IMC pediátrico.",
    en: "Separates the broad WHO growth-percentile module from focused tools such as BMI-for-age. This distinguishes weight/height percentile intent from pediatric BMI percentile intent."
  },
  emergency: {
    es: "Reúne reglas para TCE, lactante febril, deshidratación, apendicitis, shock y triaje. PECARN, CATCH y CHALICE conservan criterios de entrada y exclusión propios y no se presentan como reglas intercambiables.",
    en: "Covers head injury, febrile infants, dehydration, appendicitis, shock and triage. PECARN, CATCH and CHALICE retain their own entry and exclusion criteria and are not presented as interchangeable rules."
  }
};



const escapeHtml = (value) => String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");

const localized = (value, language) => value?.[language] || value?.en || value?.es || "";

const internalLink = (href, label) => `<a href="${href}">${escapeHtml(label)}</a>`;

export const renderStaticBody = (seo, tools) => {
  const { language, tool, category, topic } = seo;
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
      ? `<ul>${references.map((ref) => {
          const label = escapeHtml(ref.citation || ref.title || ref.id);
          const url = getReferenceUrl(ref);
          return `<li>${url ? `<a href="${escapeHtml(url)}" rel="noreferrer">${label}</a>` : label}</li>`;
        }).join("")}</ul>`
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
        ${tool.calculationStatus === "active"
          ? `<section>
              <h2>${isEs ? "Calculadora disponible" : "Calculator available"}</h2>
              <p>${isEs
                ? "Esta ficha dispone de cálculo local activo en PedsCore. Los valores introducidos se procesan en el navegador y la página muestra referencias, límites e interpretación junto al resultado."
                : "This page has an active local calculator in PedsCore. Entered values are processed in the browser, with references, limits and interpretation shown alongside the result."}</p>
              <p><a href="#calculator">${isEs ? "Ir a la calculadora" : "Open calculator"}</a></p>
            </section>`
          : ""}
        <h2>${isEs ? "Uso clínico" : "Clinical use"}</h2>
        <p>${isEs
          ? `Esta página de PedsCore reúne la información clínica, el estado de implementación y la evidencia disponible para ${escapeHtml(name)}. Está dirigida a ${escapeHtml(population || "población pediátrica y neonatal según la herramienta")}. La herramienta pertenece al área de ${escapeHtml(categoryLabel)} y debe interpretarse dentro del contexto clínico correspondiente.`
          : `This PedsCore page brings together clinical information, implementation status and available evidence for ${escapeHtml(name)}. It is intended for ${escapeHtml(population || "the pediatric or neonatal population defined for this tool")}. The tool belongs to ${escapeHtml(categoryLabel)} and should be interpreted in the appropriate clinical context.`}</p>
        <h2>${isEs ? "Interpretación y validación" : "Interpretation and validation"}</h2>
        <p>${escapeHtml(validation || (isEs ? "Revisa el estado de validación y las referencias antes de utilizar la herramienta." : "Review validation status and references before using the tool."))}</p>
        <p>${isEs
          ? "PedsCore no sustituye el juicio clínico. Las escalas, reglas y calculadoras se presentan con trazabilidad de evidencia y con su estado de implementación visible."
          : "PedsCore does not replace clinical judgement. Scores, rules and calculators are presented with evidence traceability and a visible implementation status."}</p>
        <h2>${isEs ? "Revisión clínica y mantenimiento" : "Clinical review and maintenance"}</h2>
        <p>${isEs
          ? "La revisión de implementación y la revisión clínica independiente se muestran por separado. PedsCore no atribuye revisores nominales ni avales externos cuando no existe un registro público que los respalde. El repositorio conserva el historial de fuentes, cambios y pruebas."
          : "Implementation review and independent clinical review are shown separately. PedsCore does not attribute named reviewers or external endorsement without a public record supporting the claim. The repository preserves source, change and test history."}</p>
        <h2>${isEs ? "Transparencia editorial" : "Editorial transparency"}</h2>
        <p>${isEs
          ? `Esta ficha forma parte de un proyecto de código abierto. El nivel de evidencia, el estado de implementación, las notas de validación y las fuentes se muestran de forma explícita. Actualmente contiene ${references.length} referencia${references.length === 1 ? "" : "s"} enlazada${references.length === 1 ? "" : "s"} en el catálogo. Los cambios del contenido y de la lógica se revisan mediante el repositorio público, pruebas automatizadas y trazabilidad de versiones.`
          : `This page is part of an open-source project. Evidence level, implementation status, validation notes and sources are shown explicitly. It currently contains ${references.length} catalog reference${references.length === 1 ? "" : "s"}. Content and calculation changes are reviewed through the public repository, automated tests and version traceability.`}</p>
        <p>${isEs
          ? "La ausencia de una calculadora activa no se interpreta como una recomendación clínica: algunas herramientas permanecen solo como referencia cuando la fuente, la licencia, la variante exacta o la validación todavía requieren revisión."
          : "The absence of an active calculator is not a clinical recommendation: some tools remain reference-only while source, licensing, exact variant or validation still require review."}</p>
        <p>${isEs
          ? "En cada ficha puedes comprobar qué se está evaluando, para qué población se describe la herramienta, si existe cálculo local, qué limitaciones siguen abiertas y qué referencias sostienen la implementación. Ese contexto es especialmente importante cuando distintas publicaciones, versiones o adaptaciones comparten un nombre parecido pero no son intercambiables."
          : "Each page lets you verify what is being assessed, which population the tool describes, whether local calculation is available, which limitations remain open and which references support implementation. This context matters when different publications, versions or adaptations share a similar name but are not interchangeable."}</p>
        <h2>${isEs ? "Referencias" : "References"}</h2>
        ${referencesHtml}
        <h2>${isEs ? "Herramientas relacionadas" : "Related tools"}</h2>
        ${relatedHtml || `<p>${internalLink(toolsUrl, isEs ? "Explorar todas las herramientas pediátricas" : "Browse all pediatric tools")}</p>`}
      </article>
    </main>`;
  }

  if (topic) {
    const hub = topicHubs[topic];
    const items = hub.toolIds.map((id) => tools.find((item) => item.id === id)).filter(Boolean);
    return `<main class="seo-static-fallback">
      <nav aria-label="${isEs ? "Ruta de navegación" : "Breadcrumbs"}">${internalLink(homeUrl, "PedsCore")} › <span>${escapeHtml(hub[language].title.replace(/\s*\|\s*PedsCore$/, ""))}</span></nav>
      <h1>${escapeHtml(hub[language].title.replace(/\s*\|\s*PedsCore$/, ""))}</h1>
      <p>${escapeHtml(hub[language].description)}</p>
      <h2>${isEs ? "Antes de comparar" : "Before comparing"}</h2>
      <p>${escapeHtml(hub[language].intro)}</p>
      <h2>${isEs ? "Herramientas incluidas" : "Included tools"}</h2>
      <ul>${items.map((item) => `<li>${internalLink(`/${language}/tools/${item.slug}`, localized(item.name, language))} — ${escapeHtml(localized(item.description, language))}</li>`).join("")}</ul>
      <h2>${isEs ? "Evidencia y contexto" : "Evidence and context"}</h2>
      <p>${isEs
        ? "La comparación sirve para entender diferencias de población, finalidad, variante y disponibilidad. No implica equivalencia entre escalas ni una recomendación de una herramienta sobre otra."
        : "The comparison is intended to clarify differences in population, purpose, variant and availability. It does not imply equivalence between scores or recommend one tool over another."}</p>
      <p>${internalLink(toolsUrl, isEs ? "Explorar todas las herramientas" : "Browse all tools")} · ${internalLink(`/${language}/evidence`, isEs ? "Metodología de evidencia" : "Evidence methodology")}</p>
    </main>`;
  }

  if (category) {
    const info = getCategorySeoProfile(category, language);
    const items = seo.categoryTools ?? [];
    const featuredIds = featuredCategoryToolIds[category] ?? [];
    const featuredItems = featuredIds.map((id) => tools.find((item) => item.id === id)).filter(Boolean);
    const intentCopy = categoryIntentCopy[category]?.[language];
    return `<main class="seo-static-fallback">
      <nav aria-label="${isEs ? "Ruta de navegación" : "Breadcrumbs"}">${internalLink(homeUrl, "PedsCore")} › <span>${escapeHtml(info.name)}</span></nav>
      <h1>${escapeHtml(info.name)}</h1>
      <p>${escapeHtml(info.description)}</p>
      <p>${isEs
        ? `Esta colección reúne ${items.length} herramientas pediátricas relacionadas con ${escapeHtml(info.name.toLowerCase())}, con acceso a descripciones clínicas, estado de validación, referencias y herramientas de cálculo cuando están activas.`
        : `This collection brings together ${items.length} pediatric tools related to ${escapeHtml(info.name.toLowerCase())}, including clinical descriptions, validation status, references and calculators when active.`}</p>
      ${intentCopy ? `<p>${escapeHtml(intentCopy)}</p>` : ""}
      ${featuredItems.length ? `<h2>${isEs ? "Herramientas destacadas" : "Featured tools"}</h2><ul>${featuredItems.map((item) => `<li>${internalLink(`/${language}/tools/${item.slug}`, localized(item.name, language))}</li>`).join("")}</ul>` : ""}
      <h2>${isEs ? "Cómo utilizar esta categoría" : "How to use this category"}</h2>
      <p>${isEs
        ? "Las herramientas se agrupan por área clínica para facilitar su descubrimiento, pero cada ficha conserva su propia población, finalidad, nivel de evidencia y limitaciones. Antes de aplicar una escala o calculadora, revisa la variante exacta, el contexto asistencial y el estado de implementación que aparece en su página."
        : "Tools are grouped by clinical area to make them easier to discover, while each page retains its own population, purpose, evidence level and limitations. Before using a score or calculator, review the exact variant, care setting and implementation status shown on its page."}</p>
      <h2>${isEs ? "Evidencia y disponibilidad" : "Evidence and availability"}</h2>
      <p>${isEs
        ? "PedsCore distingue entre herramientas activas, referencias clínicas, borradores y contenidos limitados por evidencia o licencia. Esa información es visible para evitar que la presencia de una herramienta en el catálogo se confunda con una recomendación de uso."
        : "PedsCore distinguishes active tools, clinical references, drafts and content limited by evidence or licensing. This is shown explicitly so that inclusion in the catalog is not mistaken for a recommendation to use the tool."}</p>
      <h2>${isEs ? "Alcance y mantenimiento" : "Scope and maintenance"}</h2>
      <p>${isEs
        ? "Las fichas de esta categoría se mantienen de forma individual: una actualización de evidencia, una nueva versión de una escala o un cambio en las condiciones de reutilización puede modificar la disponibilidad de una herramienta sin afectar necesariamente al resto de la categoría. PedsCore conserva referencias, notas de validación y trazabilidad de cambios para que cada resultado pueda revisarse en su contexto."
        : "Pages in this category are maintained individually: new evidence, a revised score version or a change in reuse conditions can alter one tool's availability without changing the rest of the category. PedsCore keeps references, validation notes and change traceability so that each result can be reviewed in its own clinical and documentary context."}</p>
      <h2>${isEs ? "Lectura clínica responsable" : "Responsible clinical reading"}</h2>
      <p>${isEs
        ? "Las páginas de categoría facilitan el acceso, pero no sustituyen las instrucciones del instrumento ni las guías de práctica clínica. Las herramientas de mayor riesgo deben revisarse junto con su fuente, población de validación, fecha y contexto asistencial. Cuando PedsCore enlaza una fuente externa oficial, ese enlace forma parte del diseño de seguridad y evita reproducir contenido que requiere autorización."
        : "Category pages are discovery aids, not substitutes for instrument instructions or clinical practice guidelines. Higher-risk tools should be reviewed alongside their source, validation population, date and care setting. When PedsCore links to an official external source, that link is part of the safety design and avoids reproducing material that requires authorization. Review source dates and local context."}</p>
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
      <h2>${isEs ? "Un catálogo pensado para encontrar y comparar" : "A catalog designed for discovery and comparison"}</h2>
      <p>${isEs
        ? "Las herramientas se organizan por especialidad, problema clínico y relaciones semánticas para que sea posible pasar de una escala a alternativas o herramientas relacionadas. El objetivo no es acumular calculadoras aisladas, sino ofrecer un mapa clínico navegable donde cada recurso conserve su evidencia, alcance y estado técnico."
        : "Tools are organized by specialty, clinical problem and semantic relationships so users can move from one score to alternatives or related tools. The goal is not to accumulate isolated calculators, but to provide a navigable clinical map where each resource keeps its own evidence, scope and technical status. This also makes differences between similarly named tools easier to inspect before use."}</p>
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
      <h2>${isEs ? "Qué puede auditarse públicamente" : "What can be audited publicly"}</h2>
      <p>${isEs
        ? "El repositorio permite revisar el catálogo clínico, los metadatos de descubrimiento, las referencias, las notas de validación, la lógica determinista de los cálculos y las pruebas asociadas. Esto no convierte al proyecto en una guía clínica oficial, pero sí permite comprobar de dónde procede una implementación y qué incertidumbres siguen abiertas."
        : "The repository exposes the clinical catalog, discovery metadata, references, validation notes, deterministic calculation logic and associated tests. This does not make the project an official clinical guideline, but it does make it possible to verify where an implementation comes from and which uncertainties remain open."}</p>
      <h2>${isEs ? "Responsabilidad editorial" : "Editorial responsibility"}</h2>
      <p>${isEs
        ? "PedsCore evita presentar como hecho aquello que el repositorio no puede documentar. No se atribuyen revisiones externas, avales institucionales ni validaciones que no estén expresamente respaldadas por una fuente o por la documentación pública del proyecto."
        : "PedsCore avoids presenting undocumented claims as fact. External review, institutional endorsement or validation is not attributed unless it is explicitly supported by a source or by the project’s public documentation."}</p>
      <h2>${isEs ? "Citación y reutilización" : "Citation and reuse"}</h2>
      <p>${isEs
        ? "El código fuente se publica con licencia MIT, mientras que los datos, tablas o materiales de terceros conservan sus propias condiciones de uso. PedsCore incluye metadatos de citación para facilitar referencias académicas, docentes y técnicas al proyecto sin atribuir al proyecto la propiedad de fuentes externas."
        : "Source code is released under the MIT license, while third-party data, tables or source materials retain their own reuse conditions. PedsCore includes citation metadata to support academic, educational and technical references without implying ownership of external sources."}</p>
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
      <h2>${isEs ? "Qué se considera evidencia suficiente" : "What counts as sufficient evidence"}</h2>
      <p>${isEs
        ? "La suficiencia depende de lo que vaya a hacer la herramienta. Una ficha descriptiva puede requerir menos elementos que una calculadora operativa. Para implementar lógica clínica se necesita poder reconstruir de forma trazable los criterios, entradas, fórmula o tabla, unidades, límites y salida esperada, además de confirmar que la reutilización es compatible con el proyecto."
        : "Sufficiency depends on what the tool is expected to do. A descriptive reference may require fewer elements than an operational calculator. Implementing clinical logic requires traceably reconstructing criteria, inputs, formula or table, units, boundaries and expected output, while also confirming that reuse is compatible with the project."}</p>
      <h2>${isEs ? "Qué ocurre cuando hay incertidumbre" : "What happens when uncertainty remains"}</h2>
      <p>${isEs
        ? "La incertidumbre se conserva visible en lugar de ocultarse. Una variante dudosa, una tabla incompleta, una licencia no aclarada o una validación insuficiente pueden bloquear el cálculo local aunque la herramienta permanezca en el catálogo. El objetivo es que el estado técnico refleje la confianza documental disponible."
        : "Uncertainty remains visible rather than being hidden. An unclear variant, incomplete table, unresolved license or insufficient validation can block local calculation even while the tool remains in the catalog. The goal is for technical status to reflect the documentary confidence available."}</p>
      <h2>${isEs ? "Separar evidencia de implementación" : "Separating evidence from implementation"}</h2>
      <p>${isEs
        ? "Que una escala exista en la literatura no significa que su implementación local esté completa. PedsCore trata por separado la calidad de la fuente, la disponibilidad de una definición reproducible y la preparación técnica del cálculo. Esa separación permite mantener una referencia útil sin ocultar que la automatización todavía no debe utilizarse."
        : "A score being described in the literature does not mean its local implementation is complete. PedsCore treats source quality, reproducible definition and technical calculator readiness as separate questions. This makes it possible to keep a useful reference visible without hiding that automation is not yet ready for use."}</p>
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
      <h2>${isEs ? "Qué ocurre después de una propuesta" : "What happens after a proposal"}</h2>
      <p>${isEs
        ? "Las propuestas se revisan contra el catálogo y la evidencia existente. Si afectan a un cálculo, se comprueba la fórmula o tabla, los límites, las unidades y los casos de prueba. Si afectan a contenido, se revisa que el lenguaje distinga hechos documentados, limitaciones y decisiones editoriales. Una contribución puede aceptarse parcialmente si la evidencia permite mejorar la ficha pero todavía no activar la lógica."
        : "Proposals are checked against the catalog and existing evidence. If they affect a calculation, formula or table, boundaries, units and test cases are reviewed. If they affect content, wording is checked so documented facts, limitations and editorial decisions remain distinct. A contribution can be accepted partially when evidence supports improving the page but not yet activating the logic."}</p>
      <h2>${isEs ? "Privacidad y ejemplos" : "Privacy and examples"}</h2>
      <p>${isEs
        ? "No envíes nombres, fechas de nacimiento, historias clínicas, imágenes identificables ni ningún otro dato real de pacientes. Los ejemplos deben ser ficticios o estar completamente anonimizados y ser innecesarios para identificar a una persona."
        : "Do not submit names, dates of birth, medical records, identifiable images or any other real patient data. Examples should be fictional or fully anonymized and unnecessary for identifying any person."}</p>
      <h2>${isEs ? "Revisión clínica independiente" : "Independent clinical review"}</h2>
      <p>${isEs
        ? "Los pediatras y otros profesionales con experiencia relevante pueden revisar una implementación concreta contra su fuente primaria. PedsCore separa esa revisión humana de la auditoría técnica y conserva el commit, fecha, fuentes y resultado para que la revisión sea reproducible."
        : "Pediatricians and other relevant clinicians can review a specific implementation against its primary source. PedsCore keeps that human review separate from technical audit and records commit, date, sources and outcome so the review remains reproducible."}</p>
      <p><a href="https://github.com/sferurek/PedsCore/blob/main/docs/TIER_A_EXTERNAL_REVIEW_PACK.md">${isEs ? "Paquete de revisión clínica Tier A" : "Tier A clinical review pack"}</a></p>
      <h2>${isEs ? "También puedes ayudar sin escribir código" : "You can also help without writing code"}</h2>
      <p>${isEs
        ? "Son útiles los avisos sobre enlaces rotos, traducciones ambiguas, problemas de accesibilidad, diferencias entre versiones de una escala, fuentes que faltan o situaciones en las que una ficha podría inducir a interpretar demasiado el resultado."
        : "Reports about broken links, ambiguous translations, accessibility problems, version differences, missing sources or wording that could encourage over-interpretation are all useful."}</p>
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
  const topic = section === "topics" && slug && topicHubs[slug] ? slug : null;
  const categoryTools = category ? tools.filter((item) => item.category === category) : [];
  const topicTools = topic ? topicHubs[topic].toolIds.map((id) => tools.find((item) => item.id === id)).filter(Boolean) : [];
  const key = !section ? "home" : section === "stats" ? "stats" : section === "categories" ? "categories" : section;
  const [defaultTitle, description] = staticSeo[key]?.[language] ?? staticSeo.home[language];
  const title = tool
    ? getToolSeoProfile(tool, language).title
    : category
      ? `${getCategorySeoProfile(category, language).name} | ${language === "es" ? "Pediatría" : "Pediatrics"} | PedsCore`
      : topic
        ? topicHubs[topic][language].title
        : defaultTitle;
  const url = `${baseUrl}${pathname || `/${language}`}`;
  const alternatePath = pathname.replace(/^\/(es|en)/, language === "es" ? "/en" : "/es") || `/${language === "es" ? "en" : "es"}`;
  const categoryDescription = category
    ? `${getCategorySeoProfile(category, language).description} ${categoryTools.length} ${language === "es" ? "herramientas disponibles en PedsCore." : "tools available in PedsCore."}`
    : description;
  const finalDescription = tool
    ? getToolSeoProfile(tool, language).description
    : topic
      ? topicHubs[topic][language].description
      : categoryDescription;
  return { language, title, description: finalDescription, url, alternateUrl: `${baseUrl}${alternatePath}`, tool, category, categoryTools, topic, topicTools };
};

export const renderSeoHead = (template, seo) => {
  const alternateLanguage = seo.language === "es" ? "en" : "es";
  const normalizedTitle = String(seo.title ?? "")
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'");
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": seo.tool ? "MedicalWebPage" : (seo.category || seo.topic) ? "CollectionPage" : "WebPage",
        "@id": `${seo.url}#webpage`,
        name: normalizedTitle,
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
        logo: `${baseUrl}/favicon.svg`,
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
              : seo.topic
                ? [{ "@type": "ListItem", position: 2, name: seo.language === "es" ? "Comparar herramientas" : "Compare tools", item: `${baseUrl}/${seo.language}/tools` }, { "@type": "ListItem", position: 3, name: topicHubs[seo.topic][seo.language].title.replace(/\s*\|\s*PedsCore$/, ""), item: seo.url }]
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
        : seo.topic
          ? [{
              "@type": "ItemList",
              name: topicHubs[seo.topic][seo.language].title.replace(/\s*\|\s*PedsCore$/, ""),
              numberOfItems: seo.topicTools.length,
              itemListElement: seo.topicTools.map((item, index) => ({
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
    .replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(normalizedTitle)}</title>`)
    .replace(/(<meta\s+name="description"\s+content=")[^"]*(")/, `$1${escapeHtml(seo.description)}$2`)
    .replace(/(<link\s+rel="canonical"\s+href=")[^"]*(")/, `$1${seo.url}$2`)
    .replace(/(<meta\s+property="og:title"\s+content=")[^"]*(")/, `$1${escapeHtml(normalizedTitle)}$2`)
    .replace(/(<meta\s+property="og:description"\s+content=")[^"]*(")/, `$1${escapeHtml(seo.description)}$2`)
    .replace(/(<meta\s+property="og:url"\s+content=")[^"]*(")/, `$1${seo.url}$2`)
    .replace(/(<meta\s+property="og:locale"\s+content=")[^"]*(")/, `$1${seo.language === "es" ? "es_ES" : "en_US"}$2`)
    .replace(/(<meta\s+property="og:locale:alternate"\s+content=")[^"]*(")/, `$1${seo.language === "es" ? "en_US" : "es_ES"}$2`)
    .replace(/(<meta\s+name="twitter:title"\s+content=")[^"]*(")/, `$1${escapeHtml(normalizedTitle)}$2`)
    .replace(/(<meta\s+name="twitter:description"\s+content=")[^"]*(")/, `$1${escapeHtml(seo.description)}$2`)
    .replace(/<script type="application\/ld\+json">\s*\{[\s\S]*?\}\s*<\/script>/, `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`)
    .replace(/\s*<link rel="alternate" hreflang="[^"]+" href="[^"]+" \/>/g, "")
    .replace("</head>", `  <link rel="alternate" hreflang="${seo.language}" href="${seo.url}" />\n    <link rel="alternate" hreflang="${alternateLanguage}" href="${seo.alternateUrl}" />\n    <link rel="alternate" hreflang="x-default" href="${baseUrl}/" />\n  </head>`);
};
