import type {
  AccessType,
  EvidenceLevel,
  ImplementationStatus,
  RegulatoryRisk,
  SourceType,
  ToolCategory,
  ToolType,
  SurfaceStatus
} from "@peds-core/core";
import type { Language } from "../utils/language";

export const translations = {
  es: {
    nav: {
      tools: "Herramientas",
      categories: "Categorías",
      evidence: "Evidencia",
      stats: "Uso global",
      about: "Sobre PedsCore",
      contribute: "Contribuir",
      disclaimer: "Aviso legal"
    },
    ossSupport: {
      ariaLabel: "Apoya el proyecto PedsCore",
      message:
        "PedsCore es un proyecto de código abierto y sin ánimo de lucro. Si te resulta útil, puedes apoyar su desarrollo dejando una estrella o un comentario en GitHub.",
      starButton: "Dar una estrella en GitHub",
      feedbackButton: "Comentarios e incidencias",
      viewSourceButton: "Ver código fuente"
    },
    home: {
      title: "Herramientas clínicas para pediatría y neonatología",
      subtitle:
        "Escalas, reglas, calculadoras y referencias clínicas con fuentes visibles, funcionamiento transparente y sin almacenar datos clínicos.",
      lead:
        "Un catálogo abierto para profesionales sanitarios, pensado para encontrar rápido lo útil y saber siempre qué está activo, qué sigue en revisión y en qué evidencia se apoya.",
      searchPlaceholder: "Buscar escala, regla o calculadora...",
      transparencyTitle: "Transparencia, de principio a fin",
      featuredTitle: "Herramientas para empezar",
      categoriesTitle: "Categorías",
      allToolsCta: "Explorar herramientas",
      evidenceCta: "Ver evidencia",
      githubSupportCta: "Apoya el proyecto en GitHub",
      toolsMetric: "herramientas catalogadas",
      cataloguedMetric: "catalogadas",
      implementedMetric: "cálculos locales",
      availableMetric: "disponibles",
      blockedMetric: "con acceso limitado",
      partialMetric: "implementación parcial",
      clinicalDataMetric: "datos clínicos almacenados",
      miniDisclaimer:
        "Para uso profesional y educativo. PedsCore acompaña la decisión clínica; no sustituye el juicio profesional ni los protocolos locales.",
      availableTitle: "Disponible ahora",
      fullyImplementedTitle: "Implementadas",
      fullyImplementedBody:
        "Herramientas listas para usar, con lógica comprobada, referencias visibles y una salida clínica claramente explicada.",
      partiallyImplementedTitle: "Implementación parcial",
      partiallyImplementedBody:
        "WHO Growth ya cubre el núcleo de crecimiento OMS disponible en PedsCore; parte del alcance 5–19 años sigue en revisión.",
      cataloguedValidationTitle: "Catalogadas y en validación",
      cataloguedValidationBody:
        "Una herramienta no se activa hasta que su fuente, versión, tabla y condiciones de uso estén suficientemente claras.",
      whoGrowthTitle: "Módulo WHO Growth",
      whoGrowthBody:
        "Percentiles OMS de 0–5 años y soporte parcial de 5–19, con gráficas imprimibles.",
      whoGrowthFeatures: [
        "OMS 0-5",
        "OMS 5-19 parcial",
        "Datos oficiales OMS",
        "Gráficas SVG imprimibles",
        "Percentiles P3/P15/P50/P85/P97 escritos",
        "Punto paciente",
        "Sin almacenamiento de datos"
      ],
      openWhoGrowth: "Abrir WHO Growth",
      openModule: "Abrir módulo",
      ossTitle: "Apoyo al código abierto",
      transparency: [
        "Sin login",
        "Sin almacenamiento de datos clínicos",
        "Código abierto",
        "Referencias visibles",
        "Resultados trazables"
      ]
    },
    tools: {
      title: "Herramientas clínicas",
      found: "herramientas encontradas",
      category: "Categoría",
      type: "Tipo",
      status: "Estado",
      all: "Todas",
      empty:
        "No encontramos una herramienta que encaje con esos filtros. Prueba a simplificar la búsqueda o vuelve al catálogo completo.",
      emptyTitle: "No encontramos coincidencias",
      clearFilters: "Limpiar filtros",
      statusCounts: "Contadores por estado",
      quickFilters: "Filtros rápidos",
      quickImplemented: "Implementadas",
      quickEmergency: "Urgencias",
      quickNeonatology: "Neonatología",
      quickGrowth: "Crecimiento",
      quickPain: "Dolor",
      quickRespiratory: "Respiratorio"
    },
    evidence: {
      eyebrow: "PedsCore / evidencia",
      title: "Matriz de evidencia",
      lead: "Antes de activar una herramienta clínica, PedsCore comprueba la fuente primaria, la versión exacta, las tablas necesarias, los puntos de corte y las condiciones de uso.",
      whyTitle: "Por qué existe esta matriz",
      whyBody:
        "Esta matriz deja a la vista por qué una herramienta está activa, en revisión o limitada por evidencia o licencia. Así puedes distinguir con rapidez qué está cerrado y qué todavía exige cautela.",
      statusTitle: "Estado técnico de implementación",
      contributeTitle: "Cómo aportar evidencia",
      contributeBody:
        "Si conoces una fuente primaria, una validación relevante o una referencia que falta, puedes compartir DOI, PMID, enlaces estables y notas de licencia a través de GitHub Issues.",
      docsLink: "Ver docs/evidence en GitHub",
      submitEvidence: "Proponer evidencia en GitHub",
      unlockTitle: "Qué falta para completar esta herramienta",
      hierarchyTitle: "Jerarquía de la evidencia",
      hierarchyBody:
        "Las referencias se ordenan según su solidez y cercanía a la fuente original, desde estudios primarios y validaciones externas hasta documentación secundaria o fuentes aún pendientes.",
      sortingTitle: "Cómo ordenamos las fuentes",
      sortingBody:
        "Dentro de cada herramienta, las fuentes se presentan por nivel de evidencia y prioridad editorial, favoreciendo las referencias más recientes cuando son comparables.",
      summaryTitle: "Disponibilidad clínica del catálogo",
      whyNotEverythingTitle: "¿Por qué no está todo implementado?",
      whyNotEverythingBody:
        "En una herramienta clínica, dejar algo sin activar hasta tenerlo claro también es una decisión de seguridad."
    },
    stats: {
      eyebrow: "PedsCore / analítica",
      title: "Uso global de PedsCore",
      lead:
        "Una vista agregada del alcance de PedsCore por país. No recoge IP, identificadores, datos clínicos, valores introducidos en formularios ni texto libre.",
      totalVisitors: "Visitantes desde la activación de la analítica",
      countriesReached: "Países alcanzados",
      last7DaysVisitors: "Visitantes en los últimos 7 días",
      pageviews: "Páginas vistas",
      worldMap: "Mapa mundial",
      country: "País",
      visitors: "Visitantes",
      thresholdNote:
        "Solo se muestran países con al menos {threshold} visitantes para evitar exponer grupos pequeños.",
      countryRange:
        "Países agregados durante el periodo de datos del proveedor: {since} a {until}.",
      loading: "Cargando estadísticas agregadas…",
      notConfigured:
        "Las estadísticas de uso aún no están disponibles en esta versión.",
      disabled:
        "Las estadísticas públicas están temporalmente desactivadas.",
      empty:
        "Todavía no hay suficientes datos agregados para mostrar esta vista.",
      failed:
        "No hemos podido cargar las estadísticas en este momento.",
      updated: "Actualizado"
    },
    tool: {
      metadata: "Detalles de la herramienta",
      description: "Descripción",
      status: "Estado de implementación",
      references: "Referencias",
      sourcesAndEvidence: "Fuentes y evidencia",
      openSource: "Abrir fuente",
      pendingLink: "Enlace pendiente",
      doi: "DOI",
      pmid: "PMID",
      sourceType: "Tipo de fuente",
      accessType: "Acceso",
      validationNotes: "Notas de validación",
      notActiveTitle: "Esta herramienta aún no está activa",
      referenceTitle: "Referencia clínica disponible",
      referenceBody: "Esta superficie está activa como referencia clínica. Puedes consultar su finalidad, población, limitaciones y fuentes aunque no exista un cálculo local.",
      limitedTitle: "Acceso clínico limitado",
      limitedBody: "La herramienta permanece identificada y documentada, pero su uso operativo local está limitado por evidencia, definición o condiciones de reutilización.",
      preparationTitle: "En preparación",
      automaticCalculationInactive:
        "El cálculo automático todavía no está disponible. Conservamos esta ficha para que puedas consultar su propósito, su estado y las fuentes que guían su revisión.",
      partialActiveTitle: "Módulo parcialmente disponible",
      partialActiveBody:
        "Este módulo ya calcula el alcance OMS disponible en PedsCore. Parte del tramo de 5–19 años y algunos detalles de interpolación siguen en revisión antes de cerrar el módulo completo.",
      disclaimer:
        "PedsCore es una herramienta de apoyo para profesionales sanitarios. La información debe interpretarse junto con la valoración individual del paciente, el juicio clínico y los protocolos aplicables.",
      feedbackQuestion:
        "¿Has visto algo que podamos mejorar?",
      feedbackLink: "Proponer una corrección o mejora",
      noReferences:
        "Aún falta cerrar la revisión de la fuente primaria antes de activar el cálculo."
    },
    form: {
      title: "Datos para el cálculo",
      noActiveForm: "Esta herramienta todavía no tiene un formulario activo.",
      privacyNote:
        "Los datos que introduzcas se procesan en esta página y no se almacenan ni se envían a un servidor.",
      required: "Campo requerido",
      requiredMessage: "Completa este campo requerido.",
      completed: "Completado",
      pending: "Pendiente",
      continue: "Continuar",
      selectPlaceholder: "Selecciona una opción"
    },
    result: {
      title: "Resultado",
      calculationStatus: "Estado del cálculo",
      inactiveCalculation:
        "El cálculo automático aún no está disponible para esta herramienta.",
      completeRequired:
        "Completa los datos necesarios para obtener el resultado.",
      value: "Valor",
      interpretation: "Interpretación",
      warnings: "Advertencias",
      trace: "Trazabilidad",
      noInterpretation:
        "Este resultado no tiene una banda de interpretación automática validada.",
      score: "Puntuación",
      maxScore: "Máximo",
      classification: "Clasificación",
      criteriaMatched: "Criterios identificados",
      noCriteriaMatched: "No se identifican criterios positivos.",
      clinicalRuleNote:
        "Esta regla ofrece contexto y trazabilidad. Debe interpretarse junto con la valoración clínica y los protocolos aplicables."
    },
    tables: {
      interpretation: "Tabla de interpretación",
      scoring: "Tabla de variables y puntuación",
      range: "Rango",
      category: "Categoría",
      variable: "Variable",
      scoreOrValue: "Puntuación / valor",
      description: "Descripción",
      pending: "Pendiente de validación",
      interpretationPending:
        "La tabla de interpretación está pendiente de validación.",
      scoringPending:
        "La tabla de variables y puntuación está pendiente de validación."
    },
    pages: {
      aboutTitle: "Sobre PedsCore",
      aboutBody:
        "PedsCore es un proyecto abierto de herramientas clínicas para pediatría y neonatología. Nace con una idea sencilla: que encontrar una escala o una regla útil sea fácil, y que entender de dónde sale sea todavía más fácil.",
      coreTitle: "Cómo funciona",
      coreBody: "Cada herramienta combina lógica determinista, metadatos clínicos y fuentes trazables para que el funcionamiento sea comprensible y auditable.",
      webTitle: "Una experiencia abierta",
      webBody: "La web es bilingüe, abierta y pensada para consultar o utilizar herramientas sin crear una cuenta ni enviar datos clínicos a un servidor.",
      disclaimerTitle: "Aviso legal",
      disclaimerBody:
        "PedsCore es un recurso profesional de consulta y apoyo. No sustituye la valoración individual del paciente, el juicio clínico, los protocolos locales ni los requisitos de cada institución.",
      analyticsPrivacy:
        "Para entender cómo se utiliza el proyecto, PedsCore puede mostrar analítica agregada y respetuosa con la privacidad. No se crean perfiles de usuario ni se recogen datos clínicos, texto libre o valores introducidos en los formularios.",
      contributeTitle: "Contribuir",
      contributeBody:
        "PedsCore mejora cuando alguien detecta una referencia que falta, una herramienta que merece estar o una explicación que puede ser más clara. GitHub Issues es el punto de entrada para proponer cambios y revisión clínica.",
      notFoundTitle: "Página no encontrada",
      notFoundBody: "Esa página no está disponible. Puedes volver al catálogo y seguir explorando desde allí."
    },
    common: {
      language: "Idioma",
      openTool: "Ver herramienta",
      category: "Categoría",
      subcategory: "Subcategoría",
      type: "Tipo",
      population: "Población",
      status: "Estado",
      risk: "Riesgo regulatorio",
      evidence: "Evidencia",
      references: "Referencias",
      tools: "herramientas",
      github: "GitHub",
      sourceReview: "Fuente pendiente de revisión"
    },
    footer: {
      alpha: "versión alfa",
      mit: "Código MIT",
      whoLicense: "Datos OMS con licencia separada",
      noClinicalStorage: "Sin almacenamiento de datos clínicos",
      usageSummary:
        "PedsCore ha recibido {last7DaysVisitors} visitantes esta semana y {totalVisitors} desde que se activó la analítica.",
      usageSummaryLink: "Ver estadísticas globales →"
    }
  },
  en: {
    nav: {
      tools: "Tools",
      categories: "Categories",
      evidence: "Evidence",
      stats: "Global usage",
      about: "About",
      contribute: "Contribute",
      disclaimer: "Disclaimer"
    },
    ossSupport: {
      ariaLabel: "Open-source support",
      message:
        "PedsCore is a non-profit open-source project. If you find it useful, you can support its development by starring the repository or leaving feedback on GitHub.",
      starButton: "Star on GitHub",
      feedbackButton: "Feedback / Issues",
      viewSourceButton: "View source"
    },
    home: {
      title: "Clinical tools for pediatrics and neonatology",
      subtitle:
        "Scores, rules, calculators and clinical references with visible sources, transparent logic and no clinical data storage.",
      lead:
        "An open catalog for healthcare professionals, designed to make useful tools easy to find and their evidence and implementation status easy to understand.",
      searchPlaceholder: "Search score, scale or calculator...",
      transparencyTitle: "Transparency, end to end",
      featuredTitle: "A good place to start",
      categoriesTitle: "Categories",
      allToolsCta: "Explore tools",
      evidenceCta: "View evidence",
      githubSupportCta: "Support the project on GitHub",
      toolsMetric: "cataloged tools",
      cataloguedMetric: "cataloged",
      implementedMetric: "local calculations",
      availableMetric: "available",
      blockedMetric: "limited access",
      partialMetric: "partial implementation",
      clinicalDataMetric: "clinical data stored",
      miniDisclaimer:
        "For professional and educational use. PedsCore supports clinical decisions; it does not replace clinical judgment or local protocols.",
      availableTitle: "Available now",
      fullyImplementedTitle: "Fully implemented",
      fullyImplementedBody:
        "Tools ready to use, with tested logic, visible references and clearly explained outputs.",
      partiallyImplementedTitle: "Partially implemented",
      partiallyImplementedBody:
        "WHO Growth: WHO 0-5 + BMI/height 5-19, printable charts, pending final review/interpolation.",
      cataloguedValidationTitle: "Catalogued / in validation",
      cataloguedValidationBody:
        "A tool is not activated until its source, version, required tables and conditions of use are sufficiently clear.",
      whoGrowthTitle: "WHO Growth module",
      whoGrowthBody:
        "WHO 0-5 percentiles and partial 5-19 support with printable charts.",
      whoGrowthFeatures: [
        "WHO 0-5",
        "WHO 5-19 partial",
        "Official WHO data",
        "Printable SVG charts",
        "Written P3/P15/P50/P85/P97 percentiles",
        "Patient point",
        "No data storage"
      ],
      openWhoGrowth: "Open WHO Growth",
      openModule: "Open module",
      ossTitle: "Open-source support",
      transparency: [
        "No login",
        "No clinical data storage",
        "Open source",
        "Visible references",
        "Traceable outputs"
      ]
    },
    tools: {
      title: "Clinical tools",
      found: "tools found",
      category: "Category",
      type: "Type",
      status: "Implementation status",
      all: "All",
      empty:
        "We could not find a tool that fits those filters. Try simplifying the search or return to the full catalog.",
      emptyTitle: "No matching tools",
      clearFilters: "Clear filters",
      statusCounts: "Status counts",
      quickFilters: "Quick filters",
      quickImplemented: "Implemented",
      quickEmergency: "Emergency",
      quickNeonatology: "Neonatology",
      quickGrowth: "Growth",
      quickPain: "Pain",
      quickRespiratory: "Respiratory"
    },
    evidence: {
      eyebrow: "PedsCore / evidence",
      title: "Evidence matrix",
      lead: "Before a clinical tool goes live, PedsCore checks the primary source, exact version, required tables, cut-offs and conditions of use.",
      whyTitle: "Why this evidence matrix exists",
      whyBody:
        "This matrix makes it clear why a tool is active, under review or limited by evidence or licensing. It lets you see quickly what is settled and what still requires caution.",
      statusTitle: "Implementation statuses",
      contributeTitle: "Contribute evidence",
      contributeBody:
        "If you know a primary source, relevant validation or missing reference, you can share DOI, PMID, stable links and licensing notes through GitHub Issues.",
      docsLink: "View docs/evidence on GitHub",
      submitEvidence: "Submit evidence on GitHub",
      unlockTitle: "What is still needed for this tool",
      hierarchyTitle: "Evidence hierarchy",
      hierarchyBody:
        "References are ordered by strength and proximity to the original source, from primary studies and external validations to secondary documentation or sources still being confirmed.",
      sortingTitle: "How sources are ordered",
      sortingBody:
        "Within each tool, sources are presented by evidence level and editorial priority, favouring more recent references when they are otherwise comparable.",
      summaryTitle: "Clinical catalog availability",
      whyNotEverythingTitle: "Why not everything is implemented?",
      whyNotEverythingBody:
        "In a clinical tool, leaving something inactive until it is clear enough is also a safety decision."
    },
    stats: {
      eyebrow: "PedsCore / analytics",
      title: "Global PedsCore usage",
      lead:
        "An aggregate view of PedsCore's reach by country. It does not collect IPs, identifiers, clinical data, form values or free text.",
      totalVisitors: "Visitors since analytics was enabled",
      countriesReached: "Countries reached",
      last7DaysVisitors: "Visitors in the last 7 days",
      pageviews: "Pageviews",
      worldMap: "World map",
      country: "Country",
      visitors: "Visitors",
      thresholdNote:
        "Only countries with at least {threshold} visitors are shown to avoid exposing small groups.",
      countryRange:
        "Countries aggregated within the provider reporting window: {since} to {until}.",
      loading: "Loading aggregate statistics...",
      notConfigured:
        "Usage statistics are not available in this version yet.",
      disabled:
        "Public usage statistics are temporarily unavailable.",
      empty:
        "There are not enough aggregate data to show this view yet.",
      failed:
        "We could not load the usage statistics right now.",
      updated: "Updated"
    },
    tool: {
      metadata: "Metadata",
      description: "Description",
      status: "Implementation status",
      references: "References",
      sourcesAndEvidence: "Sources and evidence",
      openSource: "Open source",
      pendingLink: "Link pending",
      doi: "DOI",
      pmid: "PMID",
      sourceType: "Source type",
      accessType: "Access",
      validationNotes: "Validation notes",
      notActiveTitle: "This tool is not active yet",
      referenceTitle: "Clinical reference available",
      referenceBody: "This surface is active as a clinical reference. You can review its purpose, population, limitations and sources even when no local calculation is available.",
      limitedTitle: "Limited clinical access",
      limitedBody: "The tool remains identified and documented, but local operational use is limited by evidence, definition or reuse conditions.",
      preparationTitle: "In preparation",
      automaticCalculationInactive:
        "Automatic calculation is not active for this tool yet. This page is shown for review, traceability and implementation preparation.",
      partialActiveTitle: "Active partial module",
      partialActiveBody:
        "This module already calculates the WHO scope currently available in PedsCore. It remains marked as partially implemented while the remaining 5-19 scope, interpolation policy, and final review are pending.",
      disclaimer:
        "Disclaimer: PedsCore is an educational and informational reference for healthcare professionals. It does not replace clinical judgment, local protocols or individual patient assessment. It must not be used as the sole basis for clinical decision-making.",
      feedbackQuestion: "Found an error or want to suggest an improvement?",
      feedbackLink: "Suggest a correction or improvement",
      noReferences:
        "This tool requires primary source review before calculation is activated."
    },
    form: {
      title: "Calculation inputs",
      noActiveForm: "This tool does not have an active input form yet.",
      privacyNote:
        "Values entered here remain on this page. They are not stored or sent to any backend.",
      required: "Required field",
      requiredMessage: "Complete this required field.",
      completed: "Completed",
      pending: "Pending",
      continue: "Continue",
      selectPlaceholder: "Select an option"
    },
    result: {
      title: "Result",
      calculationStatus: "Calculation status",
      inactiveCalculation:
        "Automatic calculation is not active for this tool yet.",
      completeRequired:
        "Complete the required form fields to obtain the calculation result.",
      value: "Value",
      interpretation: "Interpretation",
      warnings: "Warnings",
      trace: "Traceability",
      noInterpretation:
        "No automatic interpretation band is available for this result.",
      score: "Score",
      maxScore: "Maximum",
      classification: "Classification",
      criteriaMatched: "Criteria identified",
      noCriteriaMatched: "No positive criteria identified.",
      clinicalRuleNote:
        "This rule is shown only for informational and traceability purposes. It does not replace clinical assessment, local protocols or medical decision-making."
    },
    tables: {
      interpretation: "Interpretation table",
      scoring: "Variables and scoring table",
      range: "Range",
      category: "Category",
      variable: "Variable",
      scoreOrValue: "Score / value",
      description: "Description",
      pending: "Pending validation",
      interpretationPending:
        "The interpretation table is pending validation.",
      scoringPending:
        "The variables and scoring table is pending validation."
    },
    pages: {
      aboutTitle: "About PedsCore",
      aboutBody:
        "PedsCore is an open project for pediatric and neonatal clinical tools. It is built around a simple idea: finding a useful score or rule should be easy, and understanding where it comes from should be even easier.",
      coreTitle: "How it works",
      coreBody: "TypeScript contracts, metadata, and future deterministic engines.",
      webTitle: "Una experiencia abierta",
      webBody: "The bilingual web experience is open by design: explore and use tools without creating an account or sending clinical data to a server.",
      disclaimerTitle: "Disclaimer",
      disclaimerBody:
        "PedsCore is an educational and informational resource. It does not provide medical advice or therapeutic recommendations and does not replace clinical judgment, local protocols or institutional requirements.",
      analyticsPrivacy:
        "PedsCore may use privacy-preserving aggregate analytics to understand general website usage. IP addresses are not stored, tracking cookies are not used, user profiles are not created, and clinical data or form values are never collected.",
      contributeTitle: "Contribute",
      contributeBody:
        "Contributions should include primary references, variables and ranges, and evidence level. Use GitHub Issues to propose tools, correct references or request clinical review.",
      notFoundTitle: "Page not found",
      notFoundBody: "That page is not available. You can return to the catalog and continue exploring from there."
    },
    common: {
      language: "Language",
      openTool: "Open page",
      category: "Category",
      subcategory: "Subcategory",
      type: "Type",
      population: "Population",
      status: "Status",
      risk: "Regulatory risk",
      evidence: "Evidence",
      references: "References",
      tools: "tools",
      github: "GitHub",
      sourceReview: "Source review pending"
    },
    footer: {
      alpha: "alpha version",
      mit: "MIT code license",
      whoLicense: "WHO data under separate license",
      noClinicalStorage: "No clinical data storage",
      usageSummary:
        "PedsCore has received {last7DaysVisitors} visitors this week and {totalVisitors} since analytics was enabled.",
      usageSummaryLink: "View global stats →"
    }
  }
} as const;

export const categoryLabels: Record<ToolCategory, Record<Language, string>> = {
  neonatology: { es: "Neonatología", en: "Neonatology" },
  respiratory: { es: "Respiratorio", en: "Respiratory" },
  emergency: { es: "Urgencias pediátricas", en: "Pediatric emergency" },
  cardiology: { es: "Cardiología", en: "Cardiology" },
  nephrology: { es: "Nefrología", en: "Nephrology" },
  intensive_care: { es: "Cuidados intensivos", en: "Intensive care" },
  growth_nutrition: {
    es: "Crecimiento y nutrición",
    en: "Growth and nutrition"
  },
  pain: { es: "Dolor", en: "Pain" },
  neurology: { es: "Neurología", en: "Neurology" },
  resuscitation: { es: "RCP y algoritmos", en: "CPR and algorithms" },
  adolescent_medicine: {
    es: "Medicina del adolescente",
    en: "Adolescent medicine"
  }
};

export const categoryDescriptions: Record<
  ToolCategory,
  Record<Language, string>
> = {
  neonatology: {
    es: "Adaptación neonatal, edad gestacional, dolor, ictericia y cuidados del recién nacido.",
    en: "Newborn transition, gestational age, pain, jaundice and neonatal care."
  },
  respiratory: {
    es: "Bronquiolitis, asma, crup y dificultad respiratoria pediátrica.",
    en: "Bronchiolitis, asthma, croup and pediatric respiratory distress."
  },
  emergency: {
    es: "Trauma, deshidratación, shock, infección y deterioro clínico en urgencias pediátricas.",
    en: "Emergency rules, trauma, dehydration, shock and clinical deterioration."
  },
  cardiology: {
    es: "Intervalo QT, electrocardiografía y herramientas de valoración cardiovascular pediátrica.",
    en: "Pediatric cardiology calculators and electrocardiography."
  },
  nephrology: {
    es: "Función renal, estimación del filtrado glomerular y lesión renal aguda.",
    en: "Pediatric glomerular filtration and acute kidney injury."
  },
  intensive_care: {
    es: "Disfunción orgánica, gravedad y estratificación de riesgo en cuidados intensivos.",
    en: "Organ dysfunction, severity and risk in intensive care."
  },
  growth_nutrition: {
    es: "Percentiles, antropometría, crecimiento y riesgo nutricional.",
    en: "Percentiles, anthropometry and nutritional risk."
  },
  pain: {
    es: "Valoración del dolor neonatal y pediátrico.",
    en: "Neonatal and pediatric pain scales."
  },
  neurology: {
    es: "Valoración neurológica, encefalopatía y nivel de conciencia.",
    en: "Neurologic assessment and level of consciousness."
  },
  resuscitation: {
    es: "Algoritmos y referencias de reanimación pediátrica en revisión editorial.",
    en: "Resuscitation algorithms and calculations planned for review."
  },
  adolescent_medicine: {
    es: "Cribado, salud mental, desarrollo y conductas de riesgo en la adolescencia.",
    en: "Future tools for development, mental health and risk behaviors."
  }
};

export const surfaceStatusLabels: Record<SurfaceStatus, Record<Language, string>> = {
  active: { es: "Disponible", en: "Available" },
  draft: { es: "En preparación", en: "In preparation" },
  blocked: { es: "Acceso limitado", en: "Limited access" },
  deprecated: { es: "Histórica", en: "Historical" }
};

export const statusLabels: Record<
  ImplementationStatus,
  Record<Language, string>
> = {
  implemented: { es: "Implementada", en: "Implemented" },
  partially_implemented: {
    es: "Implementación parcial",
    en: "Partially implemented"
  },
  ready_for_implementation: {
    es: "Lista para implementar",
    en: "Ready for implementation"
  },
  pending_validation: {
    es: "Pendiente de validación",
    en: "Pending validation"
  },
  needs_primary_reference: {
    es: "Necesita fuente primaria",
    en: "Needs primary reference"
  },
  coming_soon: { es: "Próximamente", en: "Coming soon" },
  not_implemented_due_to_licensing: {
    es: "Revisión de licencia",
    en: "Licensing review"
  }
};

export const statusDescriptions: Record<
  ImplementationStatus,
  Record<Language, string>
> = {
  implemented: {
    es: "Cálculo disponible.",
    en: "Calculation available."
  },
  partially_implemented: {
    es: "Parte de la funcionalidad está disponible y comprobada; el módulo completo sigue en revisión.",
    en: "Part of the functionality is available and tested; the full module remains under review."
  },
  ready_for_implementation: {
    es: "Fórmula o criterios definidos; falta la implementación técnica.",
    en: "Formula or criteria are defined; technical implementation is still pending."
  },
  pending_validation: {
    es: "Requiere cerrar la versión exacta, los puntos de corte o la fuente.",
    en: "The exact version, cut-offs or source still need to be confirmed."
  },
  needs_primary_reference: {
    es: "Falta confirmar la fuente primaria antes de activar el cálculo.",
    en: "The primary source still needs to be confirmed before calculation is activated."
  },
  coming_soon: {
    es: "Planificada para fases posteriores.",
    en: "Planned for a later phase."
  },
  not_implemented_due_to_licensing: {
    es: "Requiere aclarar las condiciones de licencia o reutilización.",
    en: "Licensing and reuse conditions still need to be clarified."
  }
};

export const typeLabels: Record<ToolType, Record<Language, string>> = {
  score: { es: "Score", en: "Score" },
  scale: { es: "Escala", en: "Scale" },
  calculator: { es: "Calculadora", en: "Calculator" },
  clinical_rule: { es: "Regla clínica", en: "Clinical rule" },
  algorithm: { es: "Algoritmo", en: "Algorithm" },
  percentile: { es: "Percentil", en: "Percentile" },
  nomogram: { es: "Nomograma", en: "Nomogram" }
};

export const riskLabels: Record<RegulatoryRisk, Record<Language, string>> = {
  low: { es: "Bajo", en: "Low" },
  medium: { es: "Medio", en: "Medium" },
  high: { es: "Alto", en: "High" }
};

export const evidenceLabels: Record<EvidenceLevel, Record<Language, string>> = {
  high: { es: "Alta", en: "High" },
  moderate: { es: "Moderada", en: "Moderate" },
  low: { es: "Baja", en: "Low" },
  primary_reference_needed: {
    es: "Fuente primaria necesaria",
    en: "Primary reference needed"
  },
  pending_verification: {
    es: "Pendiente de verificación",
    en: "Pending verification"
  },
  original_derivation_study: {
    es: "Estudio original / derivación",
    en: "Original / derivation study"
  },
  external_validation_study: {
    es: "Validación externa",
    en: "External validation"
  },
  clinical_practice_guideline: {
    es: "Guía clínica",
    en: "Clinical practice guideline"
  },
  systematic_review: {
    es: "Revisión sistemática",
    en: "Systematic review"
  },
  consensus_statement: {
    es: "Consenso",
    en: "Consensus statement"
  },
  official_manual_or_institutional_protocol: {
    es: "Manual oficial / protocolo",
    en: "Official manual / protocol"
  },
  peer_reviewed_review: {
    es: "Revisión por pares",
    en: "Peer-reviewed review"
  },
  secondary_source: {
    es: "Fuente secundaria",
    en: "Secondary source"
  },
  local_project_documentation: {
    es: "Documentación local",
    en: "Local project documentation"
  },
  pending_primary_source: {
    es: "Fuente primaria pendiente",
    en: "Pending primary source"
  }
};

export const sourceTypeLabels: Record<SourceType, Record<Language, string>> = {
  journal_article: { es: "Artículo científico", en: "Journal article" },
  guideline: { es: "Guía", en: "Guideline" },
  society_statement: { es: "Declaración de sociedad", en: "Society statement" },
  textbook: { es: "Libro", en: "Textbook" },
  institutional_protocol: {
    es: "Protocolo institucional",
    en: "Institutional protocol"
  },
  documentation: { es: "Documentación", en: "Documentation" },
  website: { es: "Sitio web", en: "Website" },
  other: { es: "Otra", en: "Other" }
};

export const accessTypeLabels: Record<AccessType, Record<Language, string>> = {
  open_access: { es: "Abierto", en: "Open access" },
  paywalled: { es: "De pago", en: "Paywalled" },
  abstract_only: { es: "Solo resumen", en: "Abstract only" },
  unknown: { es: "Desconocido", en: "Unknown" }
};
