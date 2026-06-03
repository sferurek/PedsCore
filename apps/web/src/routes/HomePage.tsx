import { useMemo } from "react";
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

export function HomePage({ language, navigate }: HomePageProps) {
  const t = translations[language];
  const allTools = getAllTools();
  const implementedCount = getImplementedCount(allTools);
  const partialCount = getPartialCount(allTools);
  const cataloguedValidationCount =
    allTools.length - implementedCount - partialCount;
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

  return (
    <div className="page-stack home-page">
      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">PedsCore OSS</p>
          <h1>{t.home.title}</h1>
          <p className="hero-subtitle">{t.home.subtitle}</p>
          <p className="hero-lead">{t.home.lead}</p>
          <div className="hero-actions">
            <button
              className="primary-action"
              type="button"
              onClick={() => navigate(makePath(language, "tools"))}
            >
              {t.home.allToolsCta}
            </button>
            <button
              className="secondary-action"
              type="button"
              onClick={() => navigate(makePath(language, "evidence"))}
            >
              {t.home.evidenceCta}
            </button>
            <a
              className="secondary-action"
              href="https://github.com/sferurek/PedsCore"
              rel="noreferrer"
              target="_blank"
            >
              {t.common.github}
            </a>
            <button
              className="secondary-action"
              type="button"
              onClick={() =>
                navigate(makePath(language, "tools", "who-growth"))
              }
            >
              WHO Growth
            </button>
          </div>
          <p className="hero-disclaimer">{t.home.miniDisclaimer}</p>
        </div>
        <div className="hero-metrics-grid">
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

      <section className="availability-section">
        <div className="section-heading">
          <h2>{t.home.availableTitle}</h2>
        </div>
        <div className="availability-grid">
          <article className="availability-card">
            <strong>{implementedCount}</strong>
            <h3>{t.home.fullyImplementedTitle}</h3>
            <p>{t.home.fullyImplementedBody}</p>
          </article>
          <article className="availability-card accent">
            <strong>{partialCount}</strong>
            <h3>{t.home.partiallyImplementedTitle}</h3>
            <p>{t.home.partiallyImplementedBody}</p>
          </article>
          <article className="availability-card">
            <strong>{cataloguedValidationCount}</strong>
            <h3>{t.home.cataloguedValidationTitle}</h3>
            <p>{t.home.cataloguedValidationBody}</p>
          </article>
        </div>
      </section>

      <section className="who-growth-feature">
        <div>
          <p className="eyebrow">WHO Growth</p>
          <h2>{t.home.whoGrowthTitle}</h2>
          <p>{t.home.whoGrowthBody}</p>
          <ul>
            {t.home.whoGrowthFeatures.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
          <button
            className="primary-action"
            type="button"
            onClick={() => navigate(makePath(language, "tools", "who-growth"))}
          >
            {t.home.openWhoGrowth}
          </button>
        </div>
        <div className="who-growth-panel" aria-hidden="true">
          <span>P3</span>
          <span>P15</span>
          <span>P50</span>
          <span>P85</span>
          <span>P97</span>
          <strong>SVG</strong>
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

      <section className="category-strip-section" id="categories">
        <div className="section-heading">
          <h2>{t.home.categoriesTitle}</h2>
        </div>
        <div className="category-strip">
          {categories.map((category) => (
            <button
              className="category-chip"
              key={category}
              type="button"
              onClick={() =>
                navigate(makePath(language, "categories", category))
              }
            >
              <span>{categoryLabels[category][language]}</span>
              <strong>{categoryCounts.get(category) ?? 0}</strong>
            </button>
          ))}
        </div>
      </section>

      <section className="home-oss-section">
        <div>
          <h2>{t.home.ossTitle}</h2>
          <p>{t.ossSupport.message}</p>
        </div>
        <div className="oss-support-actions">
          <a
            className="oss-support-link"
            href="https://github.com/sferurek/PedsCore"
            rel="noreferrer"
            target="_blank"
          >
            {t.ossSupport.starButton}
          </a>
          <a
            className="oss-support-link subtle"
            href="https://github.com/sferurek/PedsCore/issues/new/choose"
            rel="noreferrer"
            target="_blank"
          >
            {t.ossSupport.feedbackButton}
          </a>
        </div>
      </section>
    </div>
  );
}
