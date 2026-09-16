import { getCategorySeoProfile, getToolBySlug, getToolSeoProfile, getToolsByCategory } from "@peds-core/core";
import type { ClinicalToolMetadata } from "@peds-core/core";
import type { Language } from "./language";
import type { ParsedRoute, RouteKind } from "./routes";
import { toBrowserPath } from "./routes";
import { categoryLabels } from "../i18n/translations";
import { getSeoTopicHub } from "./topicHubs";

const siteUrl = "https://peds-core.vercel.app";

interface SeoMetadata {
  title: string;
  description: string;
  url: string;
  language: Language;
  schemaType?: "WebPage" | "MedicalWebPage" | "CollectionPage";
  entityName?: string;
}

const homeSeo = {
  es: {
    title: "PedsCore — herramientas clínicas pediátricas",
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
      title: "Acerca de PedsCore — proyecto clínico open source",
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
      title: "Contribuir a PedsCore — evidencia y código abierto",
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

const toolDescription = (tool: ClinicalToolMetadata, language: Language) =>
  getToolSeoProfile(tool, language).description;

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
        title: getToolSeoProfile(tool, language).title,
        description: toolDescription(tool, language),
        url,
        language,
        schemaType: "MedicalWebPage",
        entityName: tool.name[language] || tool.name.en
      };
    }
  }

  if (route.kind === "home") {
    return { ...homeSeo[language], url, language };
  }

  if (route.kind === "category" && route.category && route.category in categoryLabels) {
    const category = route.category as keyof typeof categoryLabels;
    const categoryTools = getToolsByCategory(category);
    const categorySeo = getCategorySeoProfile(category, language);
    return {
      title: `${categorySeo.name} | ${language === "es" ? "Pediatría" : "Pediatrics"} | PedsCore`,
      description: `${categorySeo.description} ${categoryTools.length} ${language === "es" ? "herramientas disponibles." : "tools available."}`,
      url,
      language,
      schemaType: "CollectionPage"
    };
  }

  if (route.kind === "topic" && route.topic) {
    const hub = getSeoTopicHub(route.topic);
    if (hub) {
      return {
        title: `${hub.title[language]} | PedsCore`,
        description: hub.description[language],
        url,
        language,
        schemaType: "CollectionPage"
      };
    }
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
    "@graph": [
      {
        "@type": seo.schemaType ?? "WebPage",
        "@id": `${seo.url}#webpage`,
        name: seo.title,
        description: seo.description,
        url: seo.url,
        inLanguage: seo.language,
        isPartOf: { "@id": `${siteUrl}/#website` },
        publisher: { "@id": `${siteUrl}/#organization` },
        ...(seo.schemaType === "MedicalWebPage" && seo.entityName
          ? { mainEntity: { "@type": "MedicalEntity", name: seo.entityName } }
          : {})
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: "PedsCore",
        url: `${siteUrl}/`,
        publisher: { "@id": `${siteUrl}/#organization` },
        inLanguage: ["es", "en"]
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "PedsCore",
        url: `${siteUrl}/`,
        logo: `${siteUrl}/favicon.svg`,
        sameAs: ["https://github.com/sferurek/PedsCore"]
      }
    ]
  });
};
