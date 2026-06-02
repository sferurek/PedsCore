import type {
  EvidenceLevel,
  ImplementationStatus,
  RegulatoryRisk,
  ToolCategory,
  ToolType
} from "@peds-core/core";
import type { Language } from "../utils/language";

export const translations = {
  es: {
    nav: {
      tools: "Herramientas",
      categories: "Categorias",
      about: "Sobre PedsCore",
      contribute: "Contribuir",
      disclaimer: "Aviso legal"
    },
    home: {
      title: "PedsCore",
      subtitle: "Herramientas clinicas pediatricas y neonatales open source.",
      lead: "Scores, escalas, calculadoras y reglas clinicas transparentes, trazables y basadas en fuentes.",
      searchPlaceholder: "Buscar score, escala o calculadora...",
      transparencyTitle: "Transparencia desde el inicio",
      featuredTitle: "Herramientas destacadas",
      categoriesTitle: "Categorias",
      allToolsCta: "Ver todas las herramientas",
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
      empty: "No hay herramientas que coincidan con los filtros."
    },
    tool: {
      metadata: "Ficha tecnica",
      description: "Descripcion",
      status: "Estado de implementacion",
      references: "Referencias",
      validationNotes: "Notas de validacion",
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
      selectPlaceholder: "Selecciona una opcion"
    },
    result: {
      title: "Resultado",
      calculationStatus: "Estado de calculo",
      inactiveCalculation:
        "El calculo automatico aun no esta activo para esta herramienta.",
      completeRequired:
        "Completa los campos requeridos para preparar el resultado."
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
    }
  },
  en: {
    nav: {
      tools: "Tools",
      categories: "Categories",
      about: "About",
      contribute: "Contribute",
      disclaimer: "Disclaimer"
    },
    home: {
      title: "PedsCore",
      subtitle: "Open-source pediatric and neonatal clinical tools.",
      lead: "Transparent, traceable and evidence-linked scores, scales, calculators and clinical rules.",
      searchPlaceholder: "Search score, scale or calculator...",
      transparencyTitle: "Transparent by design",
      featuredTitle: "Featured tools",
      categoriesTitle: "Categories",
      allToolsCta: "View all tools",
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
      empty: "No tools match the current filters."
    },
    tool: {
      metadata: "Metadata",
      description: "Description",
      status: "Implementation status",
      references: "References",
      validationNotes: "Validation notes",
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
      selectPlaceholder: "Select an option"
    },
    result: {
      title: "Result",
      calculationStatus: "Calculation status",
      inactiveCalculation:
        "Automatic calculation is not active for this tool yet.",
      completeRequired:
        "Complete the required fields to prepare the result."
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
  implemented: { es: "Calculo disponible", en: "Calculation available" },
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
  coming_soon: { es: "Planificada", en: "Coming soon" },
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
  }
};
