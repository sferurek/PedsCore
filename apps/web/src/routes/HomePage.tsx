import { Fragment, useEffect, useMemo, useState } from "react";
import { atlas } from "../i18n/atlas";
import { SearchCommand } from "../components/atlas/SearchCommand";
import { HomeStories } from "../components/atlas/HomeStories";
import { Icon } from "../components/atlas/Icon";
import { PedsCoreFinder } from "../components/PedsCoreFinder";
import { getAllTools, getToolBySlug } from "@peds-core/core";
import type { ToolCategory } from "@peds-core/core";
import { categoryLabels, translations } from "../i18n/translations";
import type { Language } from "../utils/language";
import { makePath } from "../utils/routes";
import { getClinicalSurfaceStats } from "../utils/toolStats";
import { fetchPopularTools } from "../utils/popularTools";
import { PEDSCORE_SIM_URL } from "../utils/externalLinks";
import {
  getFavoriteToolIds,
  getRecentToolIds,
  userToolsStorageDescription
} from "../utils/userTools";

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
  behavioral_health: {
    description: {
      es: "Cribado y evaluación psicosocial pediátrica.",
      en: "Pediatric screening and psychosocial assessment."
    },
    examples: ["SCARED", "PSC", "PHQ-9"]
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
  gastroenterology: {
    description: {
      es: "Actividad y seguimiento de enfermedad gastrointestinal pediátrica.",
      en: "Pediatric gastrointestinal disease activity and follow-up."
    },
    examples: ["PUCAI", "PCDAI", "wPCDAI"]
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
  rheumatology: {
    description: {
      es: "Función, actividad y exploración musculoesquelética pediátrica.",
      en: "Pediatric function, disease activity and musculoskeletal examination."
    },
    examples: ["CMAS", "MMT8", "pGALS", "CHAQ"]
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
      es: "Algoritmos y referencias de soporte vital pediátrico con acceso a fuentes oficiales.",
      en: "Pediatric life-support algorithms and references with access to official sources."
    },
    examples: ["Pediatric CPR", "Neonatal CPR", "Bradycardia"]
  }
};

export function HomePage({ language, navigate }: HomePageProps) {
  const t = translations[language];
  const a = atlas[language];
  const allTools = getAllTools();
  const surfaceStats = getClinicalSurfaceStats(allTools);
  const fallbackPopularSlugs = [
    "pram",
    "westley-croup",
    "pecarn-tbi-under-2",
    "who-growth",
    "pediatric-appendicitis-score"
  ];
  const [popularSlugs, setPopularSlugs] = useState<string[]>(fallbackPopularSlugs);
  const [popularIsLive, setPopularIsLive] = useState(false);
  const [personalizedVersion, setPersonalizedVersion] = useState(0);

  useEffect(() => {
    const sync = () => setPersonalizedVersion((value) => value + 1);
    window.addEventListener("pedscore:user-tools-changed", sync);
    return () => window.removeEventListener("pedscore:user-tools-changed", sync);
  }, []);

  useEffect(() => {
    let active = true;

    void fetchPopularTools().then((response) => {
      if (!active || response.tools.length === 0) return;
      const known = response.tools
        .map((item) => item.slug)
        .filter((slug) => Boolean(getToolBySlug(slug)));

      if (known.length > 0) {
        setPopularSlugs(known.slice(0, 5));
        setPopularIsLive(response.status === "ok");
      }
    });

    return () => {
      active = false;
    };
  }, []);

  const popularTools = popularSlugs
    .map((slug) => getToolBySlug(slug))
    .filter((tool): tool is NonNullable<typeof tool> => Boolean(tool));
  const byId = useMemo(() => new Map(allTools.map((tool) => [tool.id, tool])), [allTools]);
  const favoriteTools = useMemo(
    () => getFavoriteToolIds().map((id) => byId.get(id)).filter((tool): tool is NonNullable<typeof tool> => Boolean(tool)),
    [byId, personalizedVersion]
  );
  const recentTools = useMemo(
    () => getRecentToolIds().map((id) => byId.get(id)).filter((tool): tool is NonNullable<typeof tool> => Boolean(tool)),
    [byId, personalizedVersion]
  );
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
        <div className="atlas-hero-inner"><div className="atlas-hero-copy"><p className="eyebrow">{a.eyebrow}</p><h1>{a.title}<br /><span>{a.future}</span></h1><p>{a.lead}</p><SearchCommand language={language} navigate={navigate} />
          <div className="atlas-popular-chips" aria-label={language === "es" ? "Accesos rápidos a herramientas" : "Quick tool access"}>
            {popularTools.map((tool) => (
              <button
                type="button"
                key={tool.id}
                onClick={() => navigate(makePath(language, "tools", tool.slug))}
              >
                {tool.shortName || tool.name[language]}
              </button>
            ))}
          </div></div><p className="atlas-hero-note">{a.note.split(". ").map((part, index) => <span key={part}>{part}{index === 0 ? "." : ""}</span>)}</p>
        <div className="atlas-gateways">{(["tools", "learn", "sim", "live"] as const).map((product, i) => <a className={`atlas-gateway atlas-${product}`} key={product} href={product === "sim" ? PEDSCORE_SIM_URL : `#${product}`}><div><span className="atlas-product-icon"><Icon name={product} /></span><strong>{a.productLabels[product]}</strong><Icon name="arrow" /></div><p>{a.capabilities[i][0]}</p><small>{product === "tools" ? <><b>{surfaceStats.available}</b> {t.home.availableMetric} · <b>{surfaceStats.localCalculations}</b> {t.home.implementedMetric}</> : product === "sim" ? a.openSim : a.soon}</small></a>)}</div></div>
      </section>
      <section className="home-discovery-hub" aria-labelledby="home-discovery-title">
        <div className="home-discovery-intro">
          <p className="eyebrow">{language === "es" ? "EXPLORA PEDScore" : "EXPLORE PEDSCORE"}</p>
          <h2 id="home-discovery-title">
            {language === "es" ? "Encuentra la herramienta adecuada." : "Find the right clinical tool."}
          </h2>
          <p>
            {language === "es"
              ? "Entra por especialidad o accede directamente a las herramientas que más se están utilizando."
              : "Browse by specialty or go straight to the tools clinicians are using most."}
          </p>
        </div>

        <div className="home-finder-stage">
          <PedsCoreFinder tools={allTools} language={language} navigate={navigate} />
        </div>

        {(favoriteTools.length > 0 || recentTools.length > 0) ? (
          <section className="home-personal-tools" aria-labelledby="home-personal-tools-title">
            <div>
              <p className="eyebrow">{language === "es" ? "TU PEDSCORE" : "YOUR PEDSCORE"}</p>
              <h3 id="home-personal-tools-title">{language === "es" ? "Tus herramientas" : "Your tools"}</h3>
              <p>{userToolsStorageDescription[language]}</p>
            </div>
            <div className="home-personal-tool-groups">
              {favoriteTools.length > 0 ? (
                <div>
                  <strong>{language === "es" ? "Favoritos" : "Favorites"}</strong>
                  <div className="personal-tool-links">
                    {favoriteTools.slice(0, 6).map((tool) => (
                      <a
                        href={makePath(language, "tools", tool.slug)}
                        key={tool.id}
                        onClick={(event) => {
                          event.preventDefault();
                          navigate(makePath(language, "tools", tool.slug));
                        }}
                      >
                        ★ {tool.shortName || tool.name[language]}
                      </a>
                    ))}
                  </div>
                </div>
              ) : null}
              {recentTools.length > 0 ? (
                <div>
                  <strong>{language === "es" ? "Recientes" : "Recent"}</strong>
                  <div className="personal-tool-links">
                    {recentTools.slice(0, 6).map((tool) => (
                      <a
                        href={makePath(language, "tools", tool.slug)}
                        key={tool.id}
                        onClick={(event) => {
                          event.preventDefault();
                          navigate(makePath(language, "tools", tool.slug));
                        }}
                      >
                        {tool.shortName || tool.name[language]}
                      </a>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </section>
        ) : null}

        <div className="home-discovery-grid">
          <article className="home-discovery-card home-specialties-card">
            <div>
              <span className="home-discovery-kicker">
                {language === "es" ? "Por especialidad" : "By specialty"}
              </span>
              <h3>{language === "es" ? "Explora por área clínica" : "Browse by clinical area"}</h3>
              <p>
                {language === "es"
                  ? "Urgencias, neonatología, respiratorio, cuidados intensivos y el resto del catálogo pediátrico."
                  : "Emergency medicine, neonatology, respiratory care, intensive care and the rest of the pediatric catalog."}
              </p>
            </div>
            <div className="home-specialty-links">
              {categories.slice(0, 6).map((category) => (
                <button
                  type="button"
                  key={category}
                  onClick={() => navigate(makePath(language, "categories", category))}
                >
                  <span>{categoryLabels[category][language]}</span>
                  <small>{categoryCounts.get(category) ?? 0}</small>
                </button>
              ))}
            </div>
            <button
              className="home-discovery-cta"
              type="button"
              onClick={() => document.getElementById("categories")?.scrollIntoView({ behavior: "smooth" })}
            >
              {language === "es" ? "Ver todas las especialidades" : "View all specialties"} →
            </button>
          </article>

          <article className="home-discovery-card home-popular-card">
            <div>
              <span className="home-discovery-kicker">
                {popularIsLive
                  ? language === "es" ? "Más utilizadas · últimos 30 días" : "Most used · last 30 days"
                  : language === "es" ? "Herramientas destacadas" : "Featured tools"}
              </span>
              <h3>{language === "es" ? "Acceso directo" : "Direct access"}</h3>
              <p>
                {popularIsLive
                  ? language === "es"
                    ? "Las herramientas con más visitas recientes en PedsCore."
                    : "The tools receiving the most recent visits in PedsCore."
                  : language === "es"
                    ? "Una selección rápida mientras reunimos suficiente uso agregado para ordenar el listado automáticamente."
                    : "A quick selection while enough aggregate usage data is collected to rank this list automatically."}
              </p>
            </div>
            <div className="home-popular-list">
              {popularTools.map((tool, index) => (
                <button
                  type="button"
                  key={tool.id}
                  onClick={() => navigate(makePath(language, "tools", tool.slug))}
                >
                  <span className="home-popular-rank">{String(index + 1).padStart(2, "0")}</span>
                  <span>
                    <strong>{tool.shortName || tool.name[language]}</strong>
                    <small>{tool.description[language]}</small>
                  </span>
                  <span aria-hidden="true">→</span>
                </button>
              ))}
            </div>
            <button
              className="home-discovery-cta"
              type="button"
              onClick={() => navigate(makePath(language, "tools"))}
            >
              {language === "es" ? "Ver todo el catálogo" : "View full catalog"} →
            </button>
          </article>
        </div>
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
                  <strong>{t.home.activeModuleMetric}</strong>
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

      <section className="atlas-trust">
        <div className="atlas-trust-copy">
          <p className="eyebrow">{a.openEyebrow}</p>
          <h2>{a.open.split(". ").map((part, index) => <span key={part}>{part}{index === 0 ? "." : ""}</span>)}</h2>
          <p>{a.openBody}</p>
        </div>
        <div className="atlas-catalog-facts">
          <span><b>{surfaceStats.catalogued}</b>{t.home.cataloguedMetric}</span>
          <span><b>{surfaceStats.available}</b>{t.home.availableMetric}</span>
          <span><b>{surfaceStats.localCalculations}</b>{t.home.implementedMetric}</span>
          <span><b>{surfaceStats.blocked}</b>{t.home.blockedMetric}</span>
          <span><b>0</b>{t.home.clinicalDataMetric}</span>
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
