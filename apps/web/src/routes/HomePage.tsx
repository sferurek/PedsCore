import { useMemo, useState } from "react";
import { getAllTools, searchTools } from "@peds-core/core";
import type { ToolCategory } from "@peds-core/core";
import { CategoryCard } from "../components/CategoryCard";
import { SearchBar } from "../components/SearchBar";
import { ToolsList } from "../components/ToolsList";
import {
  categoryLabels,
  translations
} from "../i18n/translations";
import type { Language } from "../utils/language";
import { makePath } from "../utils/routes";

interface HomePageProps {
  language: Language;
  navigate: (href: string) => void;
}

const featuredSlugs = [
  "apgar",
  "silverman-andersen",
  "flacc",
  "qtc-bazett",
  "bedside-schwartz",
  "pecarn-tbi-under-2",
  "pecarn-tbi-2-or-more",
  "pram",
  "westley-croup-score",
  "clinical-dehydration-scale"
];

export function HomePage({ language, navigate }: HomePageProps) {
  const t = translations[language];
  const [query, setQuery] = useState("");
  const allTools = getAllTools();
  const featuredTools = allTools.filter((tool) =>
    featuredSlugs.includes(tool.slug)
  );
  const categoryCounts = useMemo(() => {
    const counts = new Map<ToolCategory, number>();
    allTools.forEach((tool) => {
      counts.set(tool.category, (counts.get(tool.category) ?? 0) + 1);
    });

    return counts;
  }, [allTools]);
  const categories = [...categoryCounts.keys()].sort((a, b) =>
    categoryLabels[a][language].localeCompare(categoryLabels[b][language])
  );
  const searchResults = query.trim() ? searchTools(query, language) : [];

  return (
    <div className="page-stack">
      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">Phase 1 library shell</p>
          <h1>{t.home.title}</h1>
          <p className="hero-subtitle">{t.home.subtitle}</p>
          <p className="hero-lead">{t.home.lead}</p>
        </div>
        <div className="hero-search-panel">
          <SearchBar
            label={t.nav.tools}
            placeholder={t.home.searchPlaceholder}
            value={query}
            onChange={setQuery}
          />
          <p className="catalog-count">
            {allTools.length} {t.common.tools}
          </p>
        </div>
      </section>

      {query.trim() ? (
        <section className="content-section">
          <div className="section-heading">
            <h2>{`${searchResults.length} ${t.tools.found}`}</h2>
          </div>
          <ToolsList
            language={language}
            navigate={navigate}
            tools={searchResults}
          />
        </section>
      ) : null}

      <section className="transparency-band">
        <h2>{t.home.transparencyTitle}</h2>
        <ul>
          {t.home.transparency.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="content-section" id="categories">
        <div className="section-heading">
          <h2>{t.home.categoriesTitle}</h2>
        </div>
        <div className="category-grid">
          {categories.map((category) => (
            <CategoryCard
              category={category}
              count={categoryCounts.get(category) ?? 0}
              key={category}
              language={language}
              navigate={navigate}
            />
          ))}
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <h2>{t.home.featuredTitle}</h2>
          <button
            className="text-link"
            type="button"
            onClick={() => navigate(makePath(language, "tools"))}
          >
            {t.home.allToolsCta}
          </button>
        </div>
        <ToolsList
          language={language}
          navigate={navigate}
          tools={featuredTools}
        />
      </section>
    </div>
  );
}

