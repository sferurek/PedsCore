import { getToolBySlug, getToolsByCategory } from "@peds-core/core";
import type { ClinicalToolMetadata } from "@peds-core/core";
import type { Language } from "./language";
import type { ParsedRoute, RouteKind } from "./routes";
import { toBrowserPath } from "./routes";
import { categoryDescriptions, categoryLabels } from "../i18n/translations";

const siteUrl = "https://peds-core.vercel.app";

interface SeoMetadata {
  title: string;
  description: string;
  url: string;
  language: Language;
}

const homeSeo = {
  es: {
    title: "PedsCore — herramientas clínicas pediátricas y neonatales de código abierto",
    description:
      "PedsCore es una biblioteca de código abierto con herramientas clínicas pediátricas y neonatales, trazabilidad de evidencia, gráficas WHO Growth y sin almacenamiento de datos clínicos."
  },
  en: {
    title: "PedsCore — open-source pediatric and neonatal clinical tools",
    description:
      "PedsCore is an open-source pediatric and neonatal clinical tools library with evidence traceability, WHO Growth charts and no clinical data storage."
  }
} satisfies Record<Language, { title: string; description: string }>;

const routeSeo: Partial<Record<RouteKind, Record<Language, { title: string; description: string }>>> = {
  tools: {
    es: {
      title: "Herramientas clínicas pediátricas — PedsCore",
      description:
        "Catálogo de herramientas clínicas pediátricas y neonatales de código abierto con búsqueda, estados de validación y referencias."
    },
    en: {
      title: "Pediatric clinical tools — PedsCore",
      description:
        "Open-source pediatric and neonatal clinical tools with search, implementation status and references."
    }
  },
  evidence: {
    es: {
      title: "Evidencia y trazabilidad — PedsCore",
      description:
        "Sistema de evidencia de PedsCore para documentar fuentes, validación, licencias y decisiones antes de activar herramientas clínicas."
    },
    en: {
      title: "Evidence and traceability — PedsCore",
      description:
        "PedsCore evidence system documenting sources, validation, licensing and implementation decisions before clinical tools are activated."
    }
  },
  stats: {
    es: {
      title: "Uso global de PedsCore",
      description:
        "Estadisticas publicas agregadas de uso de PedsCore por pais, con umbrales de privacidad y sin datos clinicos."
    },
    en: {
      title: "Global PedsCore usage",
      description:
        "Public aggregate PedsCore usage statistics by country, with privacy thresholds and no clinical data."
    }
  },
  about: {
    es: {
      title: "Acerca de PedsCore",
      description:
        "PedsCore es un proyecto de código abierto con herramientas clínicas pediátricas y neonatales y trazabilidad de evidencia."
    },
    en: {
      title: "About PedsCore",
      description:
        "PedsCore is an open-source pediatric and neonatal clinical tools project with evidence traceability."
    }
  },
  disclaimer: {
    es: {
      title: "Descargo de responsabilidad — PedsCore",
      description:
        "Información sobre alcance, limitaciones, privacidad y uso informativo de PedsCore."
    },
    en: {
      title: "Disclaimer — PedsCore",
      description:
        "Information about PedsCore scope, limitations, privacy and informational use."
    }
  },
  contribute: {
    es: {
      title: "Contribuir — PedsCore",
      description:
        "Cómo contribuir a PedsCore aportando evidencia, revisiones, correcciones y mejoras de código abierto."
    },
    en: {
      title: "Contribute — PedsCore",
      description:
        "How to contribute evidence, reviews, corrections and open-source improvements to PedsCore."
    }
  },
  category: {
    es: {
      title: "Categoría clínica — PedsCore",
      description:
        "Herramientas de PedsCore agrupadas por categoría clínica pediátrica o neonatal."
    },
    en: {
      title: "Clinical category — PedsCore",
      description:
        "PedsCore tools grouped by pediatric or neonatal clinical category."
    }
  },
  not_found: {
    es: {
      title: "Página no encontrada — PedsCore",
      description: "La página solicitada no existe en PedsCore."
    },
    en: {
      title: "Page not found — PedsCore",
      description: "The requested page does not exist in PedsCore."
    }
  }
};

const seoTitleOverrides: Record<string, Record<Language, string>> = {
  pim2: { es: "Calculadora PIM2 — Mortalidad pediátrica | PedsCore", en: "PIM2 Calculator — Pediatric Mortality Risk | PedsCore" },
  pim3: { es: "Calculadora PIM3 — Mortalidad pediátrica | PedsCore", en: "PIM3 Calculator — Pediatric Mortality Risk | PedsCore" },
  nips: { es: "Escala NIPS — Dolor neonatal | PedsCore", en: "NIPS Pain Scale — Neonatal Pain Assessment | PedsCore" },
  pipp: { es: "Escala PIPP — Dolor en prematuros | PedsCore", en: "PIPP Scale — Premature Infant Pain Profile | PedsCore" },
  "pipp-r": { es: "Escala PIPP-R — Dolor en prematuros | PedsCore", en: "PIPP-R Scale — Premature Infant Pain Profile | PedsCore" },
  dubowitz: { es: "Escala de Dubowitz — Edad gestacional | PedsCore", en: "Dubowitz Score — Gestational Age Assessment | PedsCore" },
  "asthma-control-questionnaire": { es: "ACQ — Cuestionario de control del asma | PedsCore", en: "Asthma Control Questionnaire (ACQ) | PedsCore" },
  headsss: { es: "HEADSSS — Entrevista del adolescente | PedsCore", en: "HEADSSS Adolescent Interview | PedsCore" },
  pedmidas: { es: "PedMIDAS — Discapacidad por migraña pediátrica | PedsCore", en: "PedMIDAS Score — Pediatric Migraine Disability | PedsCore" },
  "orbegozo-growth-percentiles": { es: "Tablas Orbegozo — Percentiles de crecimiento | PedsCore", en: "Orbegozo Growth Charts — Pediatric Percentiles | PedsCore" }
};

const seoTopicLabels: Record<string, Record<Language, string>> = {
  abdominal_pain: { es: "Dolor abdominal", en: "Abdominal Pain" },
  acute_kidney_injury: { es: "Lesión renal aguda", en: "Acute Kidney Injury" },
  adhd: { es: "TDAH", en: "ADHD" },
  anxiety: { es: "Ansiedad", en: "Anxiety" },
  appendicitis: { es: "Apendicitis pediátrica", en: "Pediatric Appendicitis" },
  asthma: { es: "Asma pediátrica", en: "Pediatric Asthma" },
  asthma_control: { es: "Control del asma", en: "Asthma Control" },
  asthma_wheezing: { es: "Asma y sibilancias", en: "Asthma & Wheeze" },
  bone_age: { es: "Edad ósea", en: "Bone Age" },
  bronchiolitis: { es: "Bronquiolitis", en: "Bronchiolitis" },
  bronchiolitis_wheezing: { es: "Bronquiolitis y sibilancias", en: "Bronchiolitis & Wheeze" },
  burns: { es: "Quemaduras pediátricas", en: "Pediatric Burns" },
  consciousness: { es: "Nivel de conciencia", en: "Consciousness" },
  croup: { es: "Crup", en: "Croup" },
  dehydration: { es: "Deshidratación", en: "Dehydration" },
  delirium: { es: "Delirium pediátrico", en: "Pediatric Delirium" },
  depression: { es: "Depresión adolescente", en: "Adolescent Depression" },
  developmental_screening: { es: "Cribado del desarrollo", en: "Developmental Screening" },
  diabetic_ketoacidosis: { es: "Cetoacidosis diabética", en: "Diabetic Ketoacidosis" },
  early_warning: { es: "Deterioro clínico", en: "Clinical Deterioration" },
  eating_disorder: { es: "Trastornos alimentarios", en: "Eating Disorders" },
  egfr: { es: "Filtrado glomerular", en: "eGFR" },
  electrocardiography: { es: "QT corregido pediátrico", en: "Pediatric QTc" },
  febrile_infant: { es: "Lactante febril", en: "Febrile Infant" },
  functional_status: { es: "Función pediátrica", en: "Pediatric Function" },
  gestational_age: { es: "Edad gestacional", en: "Gestational Age" },
  growth: { es: "Crecimiento y percentiles", en: "Growth & Percentiles" },
  head_trauma: { es: "Traumatismo craneal", en: "Head Trauma" },
  headache: { es: "Migraña pediátrica", en: "Pediatric Migraine" },
  heart_failure: { es: "Insuficiencia cardiaca", en: "Heart Failure" },
  hemophilic_arthropathy: { es: "Artropatía hemofílica", en: "Hemophilic Arthropathy" },
  hypoxic_ischemic_encephalopathy: { es: "Encefalopatía hipóxico-isquémica", en: "Hypoxic-Ischemic Encephalopathy" },
  inflammatory_bowel_disease: { es: "Enfermedad inflamatoria intestinal", en: "Inflammatory Bowel Disease" },
  jaundice_bilirubin: { es: "Ictericia neonatal", en: "Neonatal Jaundice" },
  juvenile_dermatomyositis: { es: "Dermatomiositis juvenil", en: "Juvenile Dermatomyositis" },
  juvenile_idiopathic_arthritis: { es: "Artritis idiopática juvenil", en: "Juvenile Idiopathic Arthritis" },
  juvenile_systemic_sclerosis: { es: "Esclerosis sistémica juvenil", en: "Juvenile Systemic Sclerosis" },
  kidney_function: { es: "Función renal pediátrica", en: "Pediatric Kidney Function" },
  liver_failure: { es: "Enfermedad hepática pediátrica", en: "Pediatric Liver Disease" },
  malnutrition_risk: { es: "Riesgo nutricional", en: "Nutrition Risk" },
  mass_casualty: { es: "Triaje pediátrico IMV", en: "Pediatric MCI Triage" },
  meningitis: { es: "Meningitis pediátrica", en: "Pediatric Meningitis" },
  mortality_risk: { es: "Riesgo de mortalidad", en: "Mortality Risk" },
  musculoskeletal_examination: { es: "Exploración musculoesquelética", en: "Musculoskeletal Exam" },
  myositis: { es: "Miositis pediátrica", en: "Pediatric Myositis" },
  necrotizing_enterocolitis: { es: "Enterocolitis necrosante", en: "Necrotizing Enterocolitis" },
  neonatal_abstinence: { es: "Abstinencia neonatal", en: "Neonatal Withdrawal" },
  neonatal_encephalopathy: { es: "Encefalopatía neonatal", en: "Neonatal Encephalopathy" },
  neonatal_life_support: { es: "Reanimación neonatal", en: "Neonatal Resuscitation" },
  neonatal_pain: { es: "Dolor neonatal", en: "Neonatal Pain" },
  neonatal_sepsis: { es: "Sepsis neonatal", en: "Neonatal Sepsis" },
  neonatal_severity: { es: "Gravedad neonatal", en: "Neonatal Severity" },
  neonatal_withdrawal: { es: "Abstinencia neonatal", en: "Neonatal Withdrawal" },
  newborn_transition: { es: "Valoración del recién nacido", en: "Newborn Assessment" },
  organ_dysfunction: { es: "Disfunción orgánica", en: "Organ Dysfunction" },
  pain_sedation: { es: "Dolor y sedación neonatal", en: "Neonatal Pain & Sedation" },
  patient_safety: { es: "Seguridad del paciente", en: "Patient Safety" },
  pediatric_life_support: { es: "Reanimación pediátrica", en: "Pediatric Resuscitation" },
  pediatric_pain: { es: "Dolor pediátrico", en: "Pediatric Pain" },
  pneumonia: { es: "Neumonía pediátrica", en: "Pediatric Pneumonia" },
  prolonged_pain: { es: "Dolor neonatal prolongado", en: "Prolonged Neonatal Pain" },
  psychosocial_risk: { es: "Riesgo psicosocial adolescente", en: "Adolescent Psychosocial Risk" },
  psychosocial_screening: { es: "Cribado psicosocial", en: "Psychosocial Screening" },
  pubertal_development: { es: "Desarrollo puberal", en: "Pubertal Development" },
  regional_musculoskeletal_examination: { es: "Exploración musculoesquelética", en: "Musculoskeletal Exam" },
  respiratory_distress: { es: "Dificultad respiratoria neonatal", en: "Neonatal Respiratory Distress" },
  sedation: { es: "Sedación pediátrica", en: "Pediatric Sedation" },
  sedation_pain: { es: "Dolor y sedación neonatal", en: "Neonatal Pain & Sedation" },
  sepsis: { es: "Sepsis pediátrica", en: "Pediatric Sepsis" },
  shock: { es: "Shock pediátrico", en: "Pediatric Shock" },
  stroke: { es: "Ictus pediátrico", en: "Pediatric Stroke" },
  substance_use: { es: "Consumo de sustancias", en: "Substance Use" },
  suicide_risk: { es: "Riesgo suicida", en: "Suicide Risk" },
  systemic_vasculitis: { es: "Vasculitis pediátrica", en: "Pediatric Vasculitis" },
  withdrawal: { es: "Abstinencia pediátrica", en: "Pediatric Withdrawal" }
};

const toolKindLabel = (tool: ClinicalToolMetadata, language: Language) => {
  const labels: Record<string, Record<Language, string>> = {
    scale: { es: "Escala", en: "Scale" },
    score: { es: "Score", en: "Score" },
    calculator: { es: "Calculadora", en: "Calculator" },
    clinical_rule: { es: "Regla", en: "Rule" },
    algorithm: { es: "Algoritmo", en: "Algorithm" },
    questionnaire: { es: "Cuestionario", en: "Questionnaire" },
    chart: { es: "Tabla", en: "Chart" },
    percentile: { es: "Percentiles", en: "Percentiles" },
    nomogram: { es: "Nomograma", en: "Nomogram" }
  };
  return labels[tool.type]?.[language] ?? (language === "es" ? "Herramienta" : "Tool");
};

const makeToolSeoTitle = (tool: ClinicalToolMetadata, language: Language) => {
  const override = seoTitleOverrides[tool.slug]?.[language];
  if (override) return override;

  const shortName = (tool.shortName || tool.name[language] || tool.name.en).trim();
  const topic = seoTopicLabels[tool.subcategory]?.[language];
  const kind = toolKindLabel(tool, language);

  const candidates = [
    topic ? `${shortName} — ${topic} | PedsCore` : null,
    topic ? `${kind} ${shortName} — ${topic} | PedsCore` : null,
    `${kind} ${shortName} | PedsCore`,
    `${shortName} | PedsCore`
  ].filter((value): value is string => Boolean(value));

  return candidates.find((candidate) => candidate.length <= 60) ??
    `${shortName.slice(0, 46).trim()} | PedsCore`;
};

const getLocalizedText = (
  value: ClinicalToolMetadata["name"] | ClinicalToolMetadata["description"],
  language: Language
) => value[language] || value.en || value.es;

const toolDescription = (tool: ClinicalToolMetadata, language: Language) => {
  if (tool.id === "who_growth_module") {
    return language === "es"
      ? "Modulo WHO Growth con datos oficiales OMS, graficas SVG imprimibles, percentiles escritos y punto del paciente."
      : "WHO Growth module with official WHO growth data, printable SVG charts, written percentiles and patient point.";
  }

  const description = getLocalizedText(tool.description, language);
  const status = tool.implementationStatus.replaceAll("_", " ");

  return language === "es"
    ? `${description} Categoría: ${tool.category}. Tipo: ${tool.type}. Estado de validación: ${status}.`
    : `${description} Category: ${tool.category}. Type: ${tool.type}. Validation status: ${status}.`;
};

export const getSeoForRoute = (
  route: ParsedRoute,
  language: Language
): SeoMetadata => {
  const path = route.kind === "home" ? `/${language}` : route.withLanguage(language);
  const url = `${siteUrl}${toBrowserPath(path).replace("/PedsCore", "")}`;

  if (route.kind === "tool" && route.slug) {
    const tool = getToolBySlug(route.slug);

    if (tool) {
      return {
        title: makeToolSeoTitle(tool, language),
        description: toolDescription(tool, language),
        url,
        language
      };
    }
  }

  if (route.kind === "home") {
    return { ...homeSeo[language], url, language };
  }

  if (route.kind === "category" && route.category && route.category in categoryLabels) {
    const category = route.category as keyof typeof categoryLabels;
    const categoryTools = getToolsByCategory(category);
    return {
      title: `${categoryLabels[category][language]} | ${language === "es" ? "Herramientas clínicas pediátricas" : "Pediatric clinical tools"} | PedsCore`,
      description: `${categoryDescriptions[category][language]} ${categoryTools.length} ${language === "es" ? "herramientas disponibles en PedsCore." : "tools available in PedsCore."}`,
      url,
      language
    };
  }

  const fallback =
    routeSeo[route.kind]?.[language] ?? routeSeo.not_found?.[language] ?? homeSeo[language];

  return {
    ...fallback,
    url,
    language
  };
};

const ensureMeta = <T extends HTMLElement>(selector: string, create: () => T): T => {
  const existing = document.head.querySelector<T>(selector);

  if (existing) {
    return existing;
  }

  const element = create();
  document.head.appendChild(element);
  return element;
};

const setMetaContent = (selector: string, content: string, create: () => HTMLMetaElement) => {
  const element = ensureMeta(selector, create) as HTMLMetaElement;
  element.setAttribute("content", content);
};

export const updateDocumentSeo = (seo: SeoMetadata) => {
  if (typeof document === "undefined") {
    return;
  }

  document.documentElement.lang = seo.language;
  document.title = seo.title;

  setMetaContent('meta[name="description"]', seo.description, () => {
    const meta = document.createElement("meta");
    meta.setAttribute("name", "description");
    return meta;
  });

  const canonical = ensureMeta('link[rel="canonical"]', () => {
    const link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    return link;
  }) as HTMLLinkElement;
  canonical.setAttribute("href", seo.url);

  const alternateLanguage: Language = seo.language === "es" ? "en" : "es";
  const alternateUrl = seo.url.replace(`/${seo.language}`, `/${alternateLanguage}`);
  const setAlternate = (language: Language, href: string) => {
    const link = ensureMeta(`link[rel="alternate"][hreflang="${language}"]`, () => {
      const alternate = document.createElement("link");
      alternate.setAttribute("rel", "alternate");
      alternate.setAttribute("hreflang", language);
      return alternate;
    }) as HTMLLinkElement;
    link.setAttribute("href", href);
  };
  setAlternate(seo.language, seo.url);
  setAlternate(alternateLanguage, alternateUrl);
  setAlternate("es", seo.language === "es" ? seo.url : alternateUrl);
  setAlternate("en", seo.language === "en" ? seo.url : alternateUrl);
  const xDefault = ensureMeta('link[rel="alternate"][hreflang="x-default"]', () => {
    const link = document.createElement("link");
    link.setAttribute("rel", "alternate");
    link.setAttribute("hreflang", "x-default");
    return link;
  }) as HTMLLinkElement;
  xDefault.setAttribute("href", `${siteUrl}/`);

  const setProperty = (property: string, content: string) => {
    setMetaContent(`meta[property="${property}"]`, content, () => {
      const meta = document.createElement("meta");
      meta.setAttribute("property", property);
      return meta;
    });
  };

  setProperty("og:title", seo.title);
  setProperty("og:description", seo.description);
  setProperty("og:url", seo.url);
  setProperty("og:locale", seo.language === "es" ? "es_ES" : "en_US");
  setProperty("og:locale:alternate", seo.language === "es" ? "en_US" : "es_ES");
  setProperty("og:image", `${siteUrl}/media/clinical-hero.webp`);
  setProperty("og:image:width", "1536");
  setProperty("og:image:height", "1024");

  setMetaContent('meta[name="twitter:title"]', seo.title, () => {
    const meta = document.createElement("meta");
    meta.setAttribute("name", "twitter:title");
    return meta;
  });
  setMetaContent('meta[name="twitter:description"]', seo.description, () => {
    const meta = document.createElement("meta");
    meta.setAttribute("name", "twitter:description");
    return meta;
  });
  setMetaContent('meta[name="twitter:image"]', `${siteUrl}/media/clinical-hero.webp`, () => {
    const meta = document.createElement("meta");
    meta.setAttribute("name", "twitter:image");
    return meta;
  });

  const structuredData = ensureMeta('script[data-peds-seo]', () => {
    const script = document.createElement("script");
    script.setAttribute("type", "application/ld+json");
    script.setAttribute("data-peds-seo", "true");
    return script;
  }) as HTMLScriptElement;
  structuredData.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: seo.title,
    description: seo.description,
    url: seo.url,
    inLanguage: seo.language,
    isPartOf: { "@type": "WebSite", name: "PedsCore", url: `${siteUrl}/` }
  });
};
