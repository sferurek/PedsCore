import type {
  AccessType,
  EvidenceLevel,
  ImplementationStatus,
  RegulatoryRisk,
  SourceType,
  ToolCategory,
  ToolType
} from "@peds-core/core";
import type { Language } from "../utils/language";

export const translations = {
  es: {
    nav: {
      tools: "Herramientas",
      categories: "Categorias",
      evidence: "Evidencia",
      stats: "Uso global",
      about: "Sobre PedsCore",
      contribute: "Contribuir",
      disclaimer: "Aviso legal"
    },
    ossSupport: {
      message:
        "PedsCore es un proyecto open source sin ánimo de lucro. Si te resulta útil, puedes apoyar su desarrollo dejando una estrella o un comentario en GitHub.",
      starButton: "Star on GitHub",
      feedbackButton: "Feedback / Issues",
      viewSourceButton: "View source"
    },
    home: {
      title: "Herramientas clinicas pediatricas y neonatales open source",
      subtitle:
        "Scores, escalas, calculadoras, percentiles y reglas clinicas con trazabilidad de evidencia, sin almacenamiento de datos clinicos.",
      lead:
        "Alpha publica OSS para profesionales sanitarios que separa lo implementado, lo parcial y lo pendiente de validacion.",
      searchPlaceholder: "Buscar score, escala o calculadora...",
      transparencyTitle: "Transparencia desde el inicio",
      featuredTitle: "Herramientas destacadas",
      categoriesTitle: "Categorias",
      allToolsCta: "Explorar herramientas",
      evidenceCta: "Ver evidencia",
      githubSupportCta: "Apoya el proyecto en GitHub",
      toolsMetric: "herramientas catalogadas",
      cataloguedMetric: "catalogadas",
      implementedMetric: "implementadas",
      partialMetric: "implementacion parcial",
      clinicalDataMetric: "datos clinicos almacenados",
      miniDisclaimer:
        "Uso educativo/profesional. No sustituye juicio clinico ni protocolos locales.",
      availableTitle: "Disponible ahora",
      fullyImplementedTitle: "Fully implemented",
      fullyImplementedBody:
        "Herramientas con calculo o salida activa, tests y referencias visibles.",
      partiallyImplementedTitle: "Partially implemented",
      partiallyImplementedBody:
        "WHO Growth: OMS 0-5 + BMI/talla 5-19, graficas imprimibles, pendiente revision/interpolacion final.",
      cataloguedValidationTitle: "Catalogued / in validation",
      cataloguedValidationBody:
        "No se activan hasta validar fuente, tabla, variante y licencia.",
      whoGrowthTitle: "Modulo WHO Growth",
      whoGrowthBody:
        "Percentiles OMS 0-5 y soporte parcial 5-19 con graficas imprimibles.",
      whoGrowthFeatures: [
        "OMS 0-5",
        "OMS 5-19 parcial",
        "Datos oficiales OMS",
        "Graficas SVG imprimibles",
        "Percentiles P3/P15/P50/P85/P97 escritos",
        "Punto paciente",
        "Sin almacenamiento de datos"
      ],
      openWhoGrowth: "Abrir WHO Growth",
      openModule: "Abrir modulo",
      ossTitle: "Apoyo open source",
      transparency: [
        "Sin login",
        "Sin almacenamiento de datos clinicos",
        "Codigo abierto",
        "Referencias visibles",
        "Resultados trazables"
      ]
    },
    tools: {
      title: "Todas las herramientas",
      found: "herramientas encontradas",
      category: "Categoria",
      type: "Tipo",
      status: "Estado",
      all: "Todas",
      empty:
        "No hay herramientas que coincidan con los filtros actuales. Prueba otra busqueda o limpia los filtros para volver al catalogo completo.",
      emptyTitle: "Sin resultados con esos filtros",
      clearFilters: "Limpiar filtros",
      statusCounts: "Contadores por estado",
      quickFilters: "Filtros rapidos",
      quickImplemented: "Implemented",
      quickEmergency: "Emergency",
      quickNeonatology: "Neonatology",
      quickGrowth: "Growth",
      quickPain: "Pain",
      quickRespiratory: "Respiratory"
    },
    evidence: {
      title: "Matriz de evidencia",
      lead: "PedsCore no activa calculadoras clinicas hasta confirmar fuente primaria, tabla completa, variante exacta, puntos de corte y riesgos de licencia.",
      whyTitle: "Por que existe esta matriz",
      whyBody:
        "La matriz de evidencia documenta por que una herramienta esta implementada, pendiente de validacion o bloqueada por fuente/licencia. Esto evita formulas dudosas y mantiene trazabilidad publica.",
      statusTitle: "Estados de implementacion",
      contributeTitle: "Como contribuir evidencia",
      contributeBody:
        "Puedes aportar DOI, PMID, enlaces estables, tablas completas, variantes exactas, puntos de corte publicados y notas de licencia mediante GitHub Issues.",
      docsLink: "Ver docs/evidence en GitHub",
      submitEvidence: "Proponer evidencia en GitHub",
      unlockTitle: "Como ayudar a desbloquear esta herramienta",
      hierarchyTitle: "Jerarquia de evidencia",
      hierarchyBody:
        "Las referencias se clasifican desde estudios originales y validaciones externas hasta documentacion local o fuentes primarias pendientes.",
      sortingTitle: "Orden de las fuentes",
      sortingBody:
        "PedsCore ordena las fuentes por nivel de evidencia, prioridad editorial, ano mas reciente dentro del mismo nivel y titulo como desempate.",
      summaryTitle: "Resumen por estado",
      whyNotEverythingTitle: "Why not everything is implemented?",
      whyNotEverythingBody:
        "En salud digital, no implementar algo dudoso tambien es una decision de seguridad."
    },
    stats: {
      title: "Uso global de PedsCore",
      lead:
        "Estadisticas publicas agregadas por pais. No incluyen IPs, identificadores, datos clinicos, valores de formularios ni texto libre.",
      totalVisits: "Visitas totales",
      countriesReached: "Paises alcanzados",
      last7DaysVisits: "Visitas en los ultimos 7 dias",
      pageviews: "Paginas vistas",
      worldMap: "Mapa mundial",
      country: "Pais",
      visits: "Visitas",
      thresholdNote:
        "Solo se muestran paises con al menos {threshold} visitas para evitar exposicion de grupos pequenos.",
      loading: "Cargando estadisticas agregadas...",
      notConfigured:
        "La analitica publica no esta configurada todavia para este despliegue.",
      disabled:
        "La pagina publica de estadisticas esta desactivada por configuracion.",
      empty:
        "Aun no hay estadisticas publicas suficientes para mostrar.",
      failed:
        "No se pudieron cargar las estadisticas publicas.",
      updated: "Actualizado"
    },
    tool: {
      metadata: "Ficha tecnica",
      description: "Descripcion",
      status: "Estado de implementacion",
      references: "Referencias",
      sourcesAndEvidence: "Fuentes y evidencia",
      openSource: "Abrir fuente",
      pendingLink: "Enlace pendiente",
      doi: "DOI",
      pmid: "PMID",
      sourceType: "Tipo de fuente",
      accessType: "Acceso",
      validationNotes: "Notas de validacion",
      notActiveTitle: "Herramienta no activa todavia",
      automaticCalculationInactive:
        "El calculo automatico aun no esta activo para esta herramienta. La ficha se muestra para revision, trazabilidad y preparacion de implementacion.",
      disclaimer:
        "Aviso: PedsCore es una fuente de consulta educativa e informativa para profesionales sanitarios. No sustituye el juicio clinico, los protocolos locales ni la valoracion individual del paciente. No debe utilizarse como unica base para tomar decisiones clinicas.",
      feedbackQuestion:
        "Has encontrado un error o quieres proponer una mejora?",
      feedbackLink: "Abrir issue en GitHub",
      noReferences:
        "Esta herramienta requiere revision de fuente primaria antes de activar calculo."
    },
    form: {
      title: "Formulario",
      noActiveForm: "Esta herramienta aun no tiene formulario activo.",
      privacyNote:
        "Los valores introducidos permanecen en esta pagina. No se almacenan ni se envian a ningun backend.",
      required: "Campo requerido",
      requiredMessage: "Completa este campo requerido.",
      completed: "Completado",
      pending: "Pendiente",
      continue: "Continuar",
      selectPlaceholder: "Selecciona una opcion"
    },
    result: {
      title: "Resultado",
      calculationStatus: "Estado de calculo",
      inactiveCalculation:
        "El calculo automatico aun no esta activo para esta herramienta.",
      completeRequired:
        "Pendiente de cumplimentar el formulario para obtener el resultado del calculo.",
      value: "Valor",
      interpretation: "Interpretacion",
      warnings: "Advertencias",
      trace: "Trazabilidad",
      noInterpretation:
        "No hay banda de interpretacion automatica para este resultado.",
      score: "Puntuacion",
      maxScore: "Maximo",
      classification: "Clasificacion",
      criteriaMatched: "Criterios identificados",
      noCriteriaMatched: "No se identifican criterios positivos.",
      clinicalRuleNote:
        "Esta regla se muestra solo como apoyo informativo y de trazabilidad. No sustituye la valoracion clinica, los protocolos locales ni la decision medica."
    },
    tables: {
      interpretation: "Tabla de interpretacion",
      scoring: "Tabla de variables y puntuacion",
      range: "Rango",
      category: "Categoria",
      variable: "Variable",
      scoreOrValue: "Puntuacion / valor",
      description: "Descripcion",
      pending: "Pendiente de validacion",
      interpretationPending:
        "La tabla de interpretacion esta pendiente de validacion.",
      scoringPending:
        "La tabla de variables y puntuacion esta pendiente de validacion."
    },
    pages: {
      aboutTitle: "Sobre PedsCore",
      aboutBody:
        "PedsCore es una biblioteca open source de herramientas clinicas pediatricas y neonatales para profesionales sanitarios. El proyecto prioriza transparencia, trazabilidad, referencias visibles y ausencia de almacenamiento de datos clinicos.",
      disclaimerTitle: "Aviso legal",
      disclaimerBody:
        "PedsCore es un recurso educativo e informativo. No proporciona consejo medico ni recomendaciones terapeuticas y no sustituye el juicio clinico, los protocolos locales ni los requisitos institucionales.",
      analyticsPrivacy:
        "PedsCore puede utilizar analitica agregada y respetuosa con la privacidad para conocer el uso general de la web. No se almacenan direcciones IP, no se usan cookies de seguimiento, no se crean perfiles de usuario y no se recogen datos clinicos ni valores introducidos en los formularios.",
      contributeTitle: "Contribuir",
      contributeBody:
        "Las contribuciones deben aportar referencias primarias, describir variables y rangos, e indicar el nivel de evidencia. Usa GitHub Issues para proponer herramientas, corregir referencias o solicitar revision clinica.",
      notFoundTitle: "Pagina no encontrada",
      notFoundBody: "La ruta solicitada no existe en PedsCore."
    },
    common: {
      language: "Idioma",
      openTool: "Abrir ficha",
      category: "Categoria",
      subcategory: "Subcategoria",
      type: "Tipo",
      population: "Poblacion",
      status: "Estado",
      risk: "Riesgo regulatorio",
      evidence: "Evidencia",
      references: "Referencias",
      tools: "herramientas",
      github: "GitHub",
      sourceReview: "Fuente pendiente de revision"
    },
    footer: {
      alpha: "version alpha",
      mit: "Codigo MIT",
      whoLicense: "Datos OMS con licencia separada",
      noClinicalStorage: "Sin almacenamiento de datos clinicos",
      usageSummary:
        "PedsCore ha recibido {last7DaysVisits} visitas esta semana y {totalVisits} desde su publicación.",
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
      message:
        "PedsCore is a non-profit open-source project. If you find it useful, you can support its development by starring the repository or leaving feedback on GitHub.",
      starButton: "Star on GitHub",
      feedbackButton: "Feedback / Issues",
      viewSourceButton: "View source"
    },
    home: {
      title: "Open-source pediatric and neonatal clinical tools",
      subtitle:
        "Scores, scales, calculators, percentiles and clinical rules with evidence traceability and no clinical data storage.",
      lead:
        "A public-alpha OSS catalog for healthcare professionals that separates implemented, partial and pending-validation tools.",
      searchPlaceholder: "Search score, scale or calculator...",
      transparencyTitle: "Transparent by design",
      featuredTitle: "Featured tools",
      categoriesTitle: "Categories",
      allToolsCta: "Explore tools",
      evidenceCta: "View evidence",
      githubSupportCta: "Support the project on GitHub",
      toolsMetric: "cataloged tools",
      cataloguedMetric: "cataloged",
      implementedMetric: "implemented",
      partialMetric: "partial implementation",
      clinicalDataMetric: "clinical data stored",
      miniDisclaimer:
        "Educational/professional use. Does not replace clinical judgment or local protocols.",
      availableTitle: "Available now",
      fullyImplementedTitle: "Fully implemented",
      fullyImplementedBody:
        "Tools with active calculation or output, tests and visible references.",
      partiallyImplementedTitle: "Partially implemented",
      partiallyImplementedBody:
        "WHO Growth: WHO 0-5 + BMI/height 5-19, printable charts, pending final review/interpolation.",
      cataloguedValidationTitle: "Catalogued / in validation",
      cataloguedValidationBody:
        "Tools are not activated until source, table, variant and license are validated.",
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
      title: "All tools",
      found: "tools found",
      category: "Category",
      type: "Type",
      status: "Implementation status",
      all: "All",
      empty:
        "No tools match the current filters. Try a different search or clear filters to return to the full catalog.",
      emptyTitle: "No results for those filters",
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
      title: "Evidence matrix",
      lead: "PedsCore does not activate clinical calculators until primary source, complete table, exact variant, cut-offs, and licensing risks are confirmed.",
      whyTitle: "Why this matrix exists",
      whyBody:
        "The evidence matrix documents why a tool is implemented, pending validation, or blocked by source/licensing gaps. This prevents doubtful formulas and keeps public traceability.",
      statusTitle: "Implementation statuses",
      contributeTitle: "How to contribute evidence",
      contributeBody:
        "You can provide DOI, PMID, stable links, complete tables, exact variants, published cut-offs, and licensing notes through GitHub Issues.",
      docsLink: "View docs/evidence on GitHub",
      submitEvidence: "Submit evidence on GitHub",
      unlockTitle: "How to help unlock this tool",
      hierarchyTitle: "Evidence hierarchy",
      hierarchyBody:
        "References are classified from original studies and external validations through local documentation or pending primary sources.",
      sortingTitle: "Source ordering",
      sortingBody:
        "PedsCore sorts sources by evidence level, editorial priority, most recent year within the same level, and title as final tie-breaker.",
      summaryTitle: "Status summary",
      whyNotEverythingTitle: "Why not everything is implemented?",
      whyNotEverythingBody:
        "In digital health, not implementing doubtful content is also a safety decision."
    },
    stats: {
      title: "Global PedsCore usage",
      lead:
        "Public aggregate statistics by country. They do not include IPs, identifiers, clinical data, form values or free text.",
      totalVisits: "Total visits",
      countriesReached: "Countries reached",
      last7DaysVisits: "Last 7 days visits",
      pageviews: "Pageviews",
      worldMap: "World map",
      country: "Country",
      visits: "Visits",
      thresholdNote:
        "Only countries with at least {threshold} visits are shown to avoid exposing small groups.",
      loading: "Loading aggregate statistics...",
      notConfigured:
        "Public analytics are not configured for this deployment yet.",
      disabled:
        "The public stats page is disabled by configuration.",
      empty:
        "There are not enough public statistics to show yet.",
      failed:
        "Public statistics could not be loaded.",
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
      notActiveTitle: "Tool not active yet",
      automaticCalculationInactive:
        "Automatic calculation is not active for this tool yet. This page is shown for review, traceability and implementation preparation.",
      disclaimer:
        "Disclaimer: PedsCore is an educational and informational reference for healthcare professionals. It does not replace clinical judgment, local protocols or individual patient assessment. It must not be used as the sole basis for clinical decision-making.",
      feedbackQuestion: "Found an error or want to suggest an improvement?",
      feedbackLink: "Open an issue on GitHub",
      noReferences:
        "This tool requires primary source review before calculation is activated."
    },
    form: {
      title: "Form",
      noActiveForm: "This tool does not have an active form yet.",
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
        "PedsCore is an open-source library of pediatric and neonatal clinical tools for healthcare professionals. The project prioritizes transparency, traceability, visible references and no clinical data storage.",
      disclaimerTitle: "Disclaimer",
      disclaimerBody:
        "PedsCore is an educational and informational resource. It does not provide medical advice or therapeutic recommendations and does not replace clinical judgment, local protocols or institutional requirements.",
      analyticsPrivacy:
        "PedsCore may use privacy-preserving aggregate analytics to understand general website usage. IP addresses are not stored, tracking cookies are not used, user profiles are not created, and clinical data or form values are never collected.",
      contributeTitle: "Contribute",
      contributeBody:
        "Contributions should include primary references, variables and ranges, and evidence level. Use GitHub Issues to propose tools, correct references or request clinical review.",
      notFoundTitle: "Page not found",
      notFoundBody: "The requested route does not exist in PedsCore."
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
        "PedsCore has received {last7DaysVisits} visits this week and {totalVisits} since launch.",
      usageSummaryLink: "View global stats →"
    }
  }
} as const;

export const categoryLabels: Record<ToolCategory, Record<Language, string>> = {
  neonatology: { es: "Neonatologia", en: "Neonatology" },
  respiratory: { es: "Respiratorio", en: "Respiratory" },
  emergency: { es: "Urgencias pediatricas", en: "Pediatric emergency" },
  cardiology: { es: "Cardiologia", en: "Cardiology" },
  nephrology: { es: "Nefrologia", en: "Nephrology" },
  intensive_care: { es: "Cuidados intensivos", en: "Intensive care" },
  growth_nutrition: {
    es: "Crecimiento y nutricion",
    en: "Growth and nutrition"
  },
  pain: { es: "Dolor", en: "Pain" },
  neurology: { es: "Neurologia", en: "Neurology" },
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
    es: "Adaptacion neonatal, edad gestacional, dolor, ictericia y cuidados neonatales.",
    en: "Newborn transition, gestational age, pain, jaundice and neonatal care."
  },
  respiratory: {
    es: "Bronquiolitis, asma, crup y dificultad respiratoria pediatrica.",
    en: "Bronchiolitis, asthma, croup and pediatric respiratory distress."
  },
  emergency: {
    es: "Reglas de urgencias, trauma, deshidratacion, shock y deterioro clinico.",
    en: "Emergency rules, trauma, dehydration, shock and clinical deterioration."
  },
  cardiology: {
    es: "Calculadoras cardiologicas pediatricas y electrocardiografia.",
    en: "Pediatric cardiology calculators and electrocardiography."
  },
  nephrology: {
    es: "Filtrado glomerular y lesion renal aguda pediatrica.",
    en: "Pediatric glomerular filtration and acute kidney injury."
  },
  intensive_care: {
    es: "Disfuncion organica, gravedad y riesgo en cuidados intensivos.",
    en: "Organ dysfunction, severity and risk in intensive care."
  },
  growth_nutrition: {
    es: "Percentiles, antropometria y riesgo nutricional.",
    en: "Percentiles, anthropometry and nutritional risk."
  },
  pain: {
    es: "Escalas de dolor neonatal y pediatrico.",
    en: "Neonatal and pediatric pain scales."
  },
  neurology: {
    es: "Valoracion neurologica y nivel de conciencia.",
    en: "Neurologic assessment and level of consciousness."
  },
  resuscitation: {
    es: "Algoritmos y calculos de reanimacion previstos para revision.",
    en: "Resuscitation algorithms and calculations planned for review."
  },
  adolescent_medicine: {
    es: "Herramientas futuras de desarrollo, salud mental y conductas de riesgo.",
    en: "Future tools for development, mental health and risk behaviors."
  }
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
    es: "Pendiente de validacion",
    en: "Pending validation"
  },
  needs_primary_reference: {
    es: "Necesita fuente primaria",
    en: "Needs primary reference"
  },
  coming_soon: { es: "Proximamente", en: "Coming soon" },
  not_implemented_due_to_licensing: {
    es: "Revision de licencia",
    en: "Licensing review"
  }
};

export const statusDescriptions: Record<
  ImplementationStatus,
  Record<Language, string>
> = {
  implemented: {
    es: "Calculo disponible.",
    en: "Calculation available."
  },
  partially_implemented: {
    es: "Funcionalidad calculada y testeada disponible para parte del alcance; el modulo completo sigue pendiente.",
    en: "Calculated and tested functionality is available for part of the scope; the full module is still pending."
  },
  ready_for_implementation: {
    es: "Formula o criterios identificados, pendiente de implementacion tecnica.",
    en: "Formula or criteria identified, pending technical implementation."
  },
  pending_validation: {
    es: "Requiere validacion de version, puntos de corte o fuente.",
    en: "Requires validation of version, cut-offs or source."
  },
  needs_primary_reference: {
    es: "Necesita fuente primaria antes de activar calculo.",
    en: "Needs a primary source before calculation is activated."
  },
  coming_soon: {
    es: "Planificada para fases posteriores.",
    en: "Planned for later phases."
  },
  not_implemented_due_to_licensing: {
    es: "Requiere revision de licencia o copyright.",
    en: "Requires licensing or copyright review."
  }
};

export const typeLabels: Record<ToolType, Record<Language, string>> = {
  score: { es: "Score", en: "Score" },
  scale: { es: "Escala", en: "Scale" },
  calculator: { es: "Calculadora", en: "Calculator" },
  clinical_rule: { es: "Regla clinica", en: "Clinical rule" },
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
    es: "Pendiente de verificacion",
    en: "Pending verification"
  },
  original_derivation_study: {
    es: "Estudio original / derivacion",
    en: "Original / derivation study"
  },
  external_validation_study: {
    es: "Validacion externa",
    en: "External validation"
  },
  clinical_practice_guideline: {
    es: "Guia clinica",
    en: "Clinical practice guideline"
  },
  systematic_review: {
    es: "Revision sistematica",
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
    es: "Revision revisada por pares",
    en: "Peer-reviewed review"
  },
  secondary_source: {
    es: "Fuente secundaria",
    en: "Secondary source"
  },
  local_project_documentation: {
    es: "Documentacion local",
    en: "Local project documentation"
  },
  pending_primary_source: {
    es: "Fuente primaria pendiente",
    en: "Pending primary source"
  }
};

export const sourceTypeLabels: Record<SourceType, Record<Language, string>> = {
  journal_article: { es: "Articulo cientifico", en: "Journal article" },
  guideline: { es: "Guia", en: "Guideline" },
  society_statement: { es: "Declaracion de sociedad", en: "Society statement" },
  textbook: { es: "Libro", en: "Textbook" },
  institutional_protocol: {
    es: "Protocolo institucional",
    en: "Institutional protocol"
  },
  documentation: { es: "Documentacion", en: "Documentation" },
  website: { es: "Sitio web", en: "Website" },
  other: { es: "Otra", en: "Other" }
};

export const accessTypeLabels: Record<AccessType, Record<Language, string>> = {
  open_access: { es: "Abierto", en: "Open access" },
  paywalled: { es: "De pago", en: "Paywalled" },
  abstract_only: { es: "Solo resumen", en: "Abstract only" },
  unknown: { es: "Desconocido", en: "Unknown" }
};
