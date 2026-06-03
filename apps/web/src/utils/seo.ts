import { getToolBySlug } from "@peds-core/core";
import type { ClinicalToolMetadata } from "@peds-core/core";
import type { Language } from "./language";
import type { ParsedRoute, RouteKind } from "./routes";
import { toBrowserPath } from "./routes";

const siteUrl = "https://sferurek.github.io/PedsCore";

interface SeoMetadata {
  title: string;
  description: string;
  url: string;
  language: Language;
}

const homeSeo = {
  es: {
    title: "PedsCore — herramientas clínicas pediátricas y neonatales open source",
    description:
      "PedsCore es una biblioteca open source de herramientas clínicas pediátricas y neonatales con trazabilidad de evidencia, gráficas WHO Growth y sin almacenamiento de datos clínicos."
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
        "Catálogo de herramientas clínicas pediátricas y neonatales open source con búsqueda, estados de validación y referencias."
    },
    en: {
      title: "Pediatric clinical tools — PedsCore",
      description:
        "Catalog of open-source pediatric and neonatal clinical tools with search, validation status and references."
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
  about: {
    es: {
      title: "Acerca de PedsCore",
      description:
        "PedsCore es un proyecto open source de herramientas clínicas pediátricas y neonatales con trazabilidad de evidencia."
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
        "Cómo contribuir a PedsCore aportando evidencia, revisiones, correcciones y mejoras open source."
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
      const toolName = getLocalizedText(tool.name, language);

      return {
        title: `${toolName} — PedsCore`,
        description: toolDescription(tool, language),
        url,
        language
      };
    }
  }

  if (route.kind === "home") {
    return { ...homeSeo[language], url, language };
  }

  const fallback =
    routeSeo[route.kind]?.[language] ?? routeSeo.not_found?.[language] ?? homeSeo[language];

  return {
    ...fallback,
    url,
    language
  };
};

const ensureMeta = (selector: string, create: () => HTMLMetaElement | HTMLLinkElement) => {
  const existing = document.head.querySelector<HTMLMetaElement | HTMLLinkElement>(selector);

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
};
