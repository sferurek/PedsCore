import { Fragment, useMemo } from "react";
import { atlas } from "../i18n/atlas";
import { SearchCommand } from "../components/atlas/SearchCommand";
import { HomeStories } from "../components/atlas/HomeStories";
import { Icon } from "../components/atlas/Icon";
import { getAllTools } from "@peds-core/core";
import type { ToolCategory } from "@peds-core/core";
import { categoryLabels, translations } from "../i18n/translations";
import type { Language } from "../utils/language";
import { makePath } from "../utils/routes";
import { getClinicalSurfaceStats } from "../utils/toolStats";

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
      es: "Cribado, salud mental y valoración clínica en la adolescencia.",
      en: "Screening, mental health and clinical assessment in adolescence."
    },
    examples: ["PHQ-9", "GAD-7", "CRAFFT 2.1"]
  },
  cardiology: {
    description: {
      es: "Intervalo QT corregido y herramientas de valoración cardiovascular.",
      en: "Corrected QT interval and cardiovascular assessment tools."
    },
    examples: ["QTc Bazett", "QTc Fridericia", "QTc Hodges"]
  },
  emergency: {
    description: {
      es: "Decisión clínica en urgencias: trauma, hidratación, infección y estratificación de riesgo.",
      en: "Clinical decision support for trauma, hydration, infection and risk stratification."
    },
    examples: ["PECARN", "CATCH", "CHALICE", "CDS", "SIPA"]
  },
  growth_nutrition: {
    description: {
      es: "Crecimiento, percentiles y valoración nutricional a lo largo de la infancia.",
      en: "Growth, percentiles and nutritional assessment throughout childhood."
    },
    examples: ["WHO Growth", "Fenton 2013", "STRONGkids", "CDC Growth"]
  },
  intensive_care: {
    description: {
      es: "Disfunción orgánica, gravedad y seguimiento del paciente crítico pediátrico.",
      en: "Organ dysfunction, severity and monitoring in pediatric critical care."
    },
    examples: ["pSOFA", "PELOD-2", "PRISM", "PIM3"]
  },
  neonatology: {
    description: {
      es: "Transición neonatal, dolor, dificultad respiratoria y valoración del recién nacido.",
      en: "Neonatal transition, pain, respiratory distress and newborn assessment."
    },
    examples: ["Apgar", "Silverman-Andersen", "NIPS", "Ballard"]
  },
  nephrology: {
    description: {
      es: "Función renal, estimación del filtrado glomerular y lesión renal aguda.",
      en: "Renal function, estimated GFR and acute kidney injury."
    },
    examples: ["Bedside Schwartz", "pRIFLE", "KDIGO Pediatric"]
  },
  neurology: {
    description: {
      es: "Conciencia, encefalopatía y valoración neurológica pediátrica.",
      en: "Consciousness, encephalopathy and pediatric neurologic assessment."
    },
    examples: ["Pediatric GCS", "Sarnat", "PedNIHSS"]
  },
  pain: {
    description: {
      es: "Valoración del dolor desde el recién nacido hasta el adolescente.",
      en: "Pain assessment from the newborn period through adolescence."
    },
    examples: ["NIPS", "PIPP-R", "N-PASS", "EDIN"]
  },
  respiratory: {
    description: {
      es: "Asma, bronquiolitis, crup y dificultad respiratoria pediátrica.",
      en: "Asthma, bronchiolitis, croup and pediatric respiratory distress."
    },
    examples: ["Westley Croup", "PRAM", "Wood-Downes-Ferres", "BROSJOD"]
  },
  resuscitation: {
    description: {
      es: "Algoritmos y referencias de soporte vital pediátrico en revisión editorial.",
      en: "Pediatric life-support algorithms and references under editorial review."
    },
    examples: ["Pediatric CPR", "Neonatal CPR", "Bradycardia"]
  }
};

export function HomePage({ language, navigate }: HomePageProps) {
  const t = translations[language];
  const a = atlas[language];
  const allTools = getAllTools();
  const surfaceStats = getClinicalSurfaceStats(allTools);
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
        <div className="atlas-hero-inner"><div className="atlas-hero-copy"><p className="eyebrow">{a.eyebrow}</p><h1>{a.title}<br /><span>{a.future}</span></h1><p>{a.lead}</p><SearchCommand language={language} navigate={navigate} /><small>PRAM · Westley · PECARN · WHO Growth</small></div><p className="atlas-hero-note">{a.note.split(". ").map((part, index) => <span key={part}>{part}{index === 0 ? "." : ""}</span>)}</p>
        <div className="atlas-gateways">{(["tools", "learn", "sim", "live"] as const).map((product, i) => <a className={`atlas-gateway atlas-${product}`} key={product} href={`#${product}`}><div><span className="atlas-product-icon"><Icon name={product} /></span><strong>{product[0].toUpperCase() + product.slice(1)}</strong><Icon name="arrow" /></div><p>{a.capabilities[i][0]}</p><small>{product === "tools" ? <><b>{surfaceStats.available}</b> {t.home.availableMetric} · <b>{surfaceStats.localCalculations}</b> {t.home.implementedMetric}</> : a.soon}</small></a>)}</div></div>
      </section>
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

      <section className="atlas-trust"><p className="eyebrow">{a.openEyebrow}</p><h2>{a.open}</h2><p>{a.openBody}</p><div className="atlas-catalog-facts"><span><b>{surfaceStats.catalogued}</b> {t.home.cataloguedMetric}</span><span><b>{surfaceStats.available}</b> {t.home.availableMetric}</span><span><b>{surfaceStats.localCalculations}</b> {t.home.implementedMetric}</span><span><b>{surfaceStats.blocked}</b> {t.home.blockedMetric}</span><span><b>0</b> {t.home.clinicalDataMetric}</span></div><p>{t.home.subtitle}</p></section>
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
