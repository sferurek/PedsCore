import { Fragment, useMemo } from "react";
import { atlas } from "../i18n/atlas";
import { SearchCommand } from "../components/atlas/SearchCommand";
import { UsageStrip } from "../components/atlas/UsageStrip";
import { HomeStories } from "../components/atlas/HomeStories";
import { Icon } from "../components/atlas/Icon";
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
    examples: ["M-CHAT-R/F", "PHQ-9", "HEADSSS"]
  },
  cardiology: {
    description: {
      es: "Correcciones QTc y calculadoras cardiovasculares.",
      en: "QTc corrections and cardiovascular calculators."
    },
    examples: ["QTc Bazett", "QTc Fridericia", "QTc Hodges"]
  },
  behavioral_health: {
    description: {
      es: "Cribado y evaluación psicosocial pediátrica.",
      en: "Pediatric screening and psychosocial assessment."
    },
    examples: ["SCARED", "PSC", "PHQ-9"]
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
  gastroenterology: {
    description: {
      es: "Actividad y seguimiento de enfermedad gastrointestinal pediátrica.",
      en: "Pediatric gastrointestinal disease activity and follow-up."
    },
    examples: ["PUCAI", "PCDAI", "wPCDAI"]
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
    examples: ["Pediatric GCS", "CAPD", "PedMIDAS"]
  },
  rheumatology: {
    description: {
      es: "Función, actividad y exploración musculoesquelética pediátrica.",
      en: "Pediatric function, disease activity and musculoskeletal examination."
    },
    examples: ["CMAS", "MMT8", "pGALS", "CHAQ"]
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
  const a = atlas[language];
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
      <section className="atlas-hero">
        <picture className="atlas-hero-media"><source type="image/webp" srcSet={`${import.meta.env.BASE_URL}media/clinical-hero-768.webp 768w, ${import.meta.env.BASE_URL}media/clinical-hero.webp 1536w`} sizes="100vw" /><img src={`${import.meta.env.BASE_URL}media/clinical-hero.webp`} alt="" width="1536" height="1024" fetchPriority="high" /></picture>
        <div className="atlas-hero-inner"><div className="atlas-hero-copy"><p className="eyebrow">{a.eyebrow}</p><h1>{a.title}<br /><span>{a.future}</span></h1><p>{a.lead}</p><SearchCommand language={language} navigate={navigate} /><small>PRAM · Westley · PECARN · WHO Growth</small></div><p className="atlas-hero-note">{a.note}</p>
        <div className="atlas-gateways">{(["tools", "learn", "sim", "live"] as const).map((product, i) => <a className={`atlas-gateway atlas-${product}`} key={product} href={`#${product}`}><div><span className="atlas-product-icon"><Icon name={product} /></span><strong>{product[0].toUpperCase() + product.slice(1)}</strong><Icon name="arrow" /></div><p>{a.capabilities[i][0]}</p><small>{product === "tools" ? <><b>{implementedCount}</b> {t.home.implementedMetric} · <b>{allTools.length}</b> {t.home.cataloguedMetric}</> : a.soon}</small></a>)}</div></div>
      </section>
      <UsageStrip language={language} navigate={navigate} />
      <HomeStories language={language} navigate={navigate} />
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

      <section className="atlas-trust"><p className="eyebrow">{a.openEyebrow}</p><h2>{a.open}</h2><p>{a.openBody}</p><div className="atlas-catalog-facts"><span><b>{allTools.length}</b> {t.home.cataloguedMetric}</span><span><b>{implementedCount}</b> {t.home.implementedMetric}</span><span><b>{partialCount}</b> {t.home.partialMetric}</span><span><b>0</b> {t.home.clinicalDataMetric}</span></div><p>{t.home.subtitle}</p></section>
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
