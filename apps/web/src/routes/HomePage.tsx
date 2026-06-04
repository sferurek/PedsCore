import { Fragment, useMemo } from "react";
import { getAllTools } from "@peds-core/core";
import type { ToolCategory } from "@peds-core/core";
import { categoryLabels, translations } from "../i18n/translations";
import type { Language } from "../utils/language";
import { makePath } from "../utils/routes";
import { getImplementedCount, getPartialCount } from "../utils/toolStats";

interface HomePageProps {
  language: Language;
  navigate: (href: string) => void;
}

const categoryDetails: Record<
  ToolCategory,
  {
    description: Record<Language, string>;
    examples: string[];
  }
> = {
  adolescent_medicine: {
    description: {
      es: "Riesgo, desarrollo y herramientas para adolescentes.",
      en: "Risk, development and adolescent-focused tools."
    },
    examples: ["Adolescent Depression Risk", "Bayley", "Denver II"]
  },
  cardiology: {
    description: {
      es: "Correcciones QTc y calculadoras cardiovasculares.",
      en: "QTc corrections and cardiovascular calculators."
    },
    examples: ["QTc Bazett", "QTc Fridericia", "QTc Hodges"]
  },
  emergency: {
    description: {
      es: "Reglas de urgencias, trauma, hidratacion y alerta temprana.",
      en: "Emergency rules, trauma, hydration and early warning."
    },
    examples: ["PECARN", "CATCH", "CHALICE", "CDS", "SIPA"]
  },
  growth_nutrition: {
    description: {
      es: "Percentiles, crecimiento OMS y cribado nutricional.",
      en: "Percentiles, WHO growth and nutrition screening."
    },
    examples: ["WHO Growth", "STRONGkids", "PYMS", "STAMP"]
  },
  intensive_care: {
    description: {
      es: "Scores complejos de UCI y disfuncion organica en revision.",
      en: "Complex ICU and organ dysfunction scores under review."
    },
    examples: ["pSOFA", "PELOD-2", "PRISM", "PIM3"]
  },
  neonatology: {
    description: {
      es: "Transicion neonatal, dolor, distrés y edad gestacional.",
      en: "Neonatal transition, pain, distress and gestational age."
    },
    examples: ["Apgar", "Silverman-Andersen", "NIPS", "Ballard"]
  },
  nephrology: {
    description: {
      es: "Funcion renal, filtrado glomerular y lesion renal aguda.",
      en: "Renal function, estimated GFR and acute kidney injury."
    },
    examples: ["Bedside Schwartz", "pRIFLE", "KDIGO Pediatric"]
  },
  neurology: {
    description: {
      es: "Conciencia, neurologia pediatrica y variantes en validacion.",
      en: "Consciousness, pediatric neurology and variants in validation."
    },
    examples: ["Pediatric GCS", "Benes", "Adapted Glasgow"]
  },
  pain: {
    description: {
      es: "Escalas de dolor pediatrico y neonatal.",
      en: "Pediatric and neonatal pain scales."
    },
    examples: ["FLACC", "NIPS", "CRIES", "PIPP-R"]
  },
  respiratory: {
    description: {
      es: "Bronquiolitis, asma, crup y dificultad respiratoria.",
      en: "Bronchiolitis, asthma, croup and respiratory distress."
    },
    examples: ["Westley Croup", "PRAM", "Wood-Downes-Ferres", "BROSJOD"]
  },
  resuscitation: {
    description: {
      es: "Fichas de soporte vital catalogadas para revision futura.",
      en: "Life-support entries cataloged for future review."
    },
    examples: ["Pediatric CPR", "Neonatal CPR", "Bradycardia"]
  }
};

export function HomePage({ language, navigate }: HomePageProps) {
  const t = translations[language];
  const allTools = getAllTools();
  const implementedCount = getImplementedCount(allTools);
  const partialCount = getPartialCount(allTools);
  const categoryCounts = useMemo(() => {
    const counts = new Map<ToolCategory, number>();

    for (const tool of allTools) {
      counts.set(tool.category, (counts.get(tool.category) ?? 0) + 1);
    }

    return counts;
  }, [allTools]);
  const categories = [...categoryCounts.keys()].sort((a, b) =>
    categoryLabels[a][language].localeCompare(categoryLabels[b][language])
  );
  const whoGrowthExamples =
    language === "es"
      ? "BMI-for-age · peso-edad · talla-edad · PC · peso/talla"
      : "BMI-for-age · weight-age · height-age · HC · weight/height";

  return (
    <div className="page-stack home-page">
      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">PedsCore OSS</p>
          <h1>{t.home.title}</h1>
          <p className="hero-subtitle">{t.home.subtitle}</p>
          <p className="hero-lead">{t.home.lead}</p>
          <p className="hero-disclaimer">{t.home.miniDisclaimer}</p>
        </div>
        <div className="hero-metrics-grid" aria-label={t.home.toolsMetric}>
          <div className="hero-metric">
            <strong>{allTools.length}</strong>
            <span>{t.home.cataloguedMetric}</span>
          </div>
          <div className="hero-metric">
            <strong>{implementedCount}</strong>
            <span>{t.home.implementedMetric}</span>
          </div>
          <div className="hero-metric">
            <strong>{partialCount}</strong>
            <span>{t.home.partialMetric}</span>
          </div>
          <div className="hero-metric">
            <strong>0</strong>
            <span>{t.home.clinicalDataMetric}</span>
          </div>
        </div>
      </section>

      <section className="category-strip-section" id="categories">
        <div className="section-heading">
          <h2>{t.home.categoriesTitle}</h2>
        </div>
        <div className="category-card-grid">
          {categories.map((category) => (
            <Fragment key={category}>
              <button
                className={`home-category-card category-${category}`}
                type="button"
                onClick={() =>
                  navigate(makePath(language, "categories", category))
                }
              >
                <span className="category-card-title">
                  {categoryLabels[category][language]}
                </span>
                <span className="category-card-description">
                  {categoryDetails[category].description[language]}
                </span>
                <strong>
                  {categoryCounts.get(category) ?? 0} {t.common.tools}
                </strong>
                <span className="category-card-examples">
                  {categoryDetails[category].examples.join(" · ")}
                  {(categoryCounts.get(category) ?? 0) >
                    categoryDetails[category].examples.length
                    ? "..."
                    : ""}
                </span>
              </button>
              {category === "growth_nutrition" ? (
                <button
                  className="home-category-card category-who-growth"
                  type="button"
                  onClick={() =>
                    navigate(makePath(language, "tools", "who-growth"))
                  }
                >
                  <span className="category-card-title">WHO Growth</span>
                  <span className="category-card-description">
                    {t.home.whoGrowthBody}
                  </span>
                  <strong>{t.home.partialMetric}</strong>
                  <span className="category-card-examples">
                    {whoGrowthExamples}
                  </span>
                  <span className="category-card-cta">{t.home.openModule}</span>
                </button>
              ) : null}
            </Fragment>
          ))}
        </div>
      </section>

      <section className="transparency-band">
        <h2>{t.home.transparencyTitle}</h2>
        <ul>
          {t.home.transparency.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
