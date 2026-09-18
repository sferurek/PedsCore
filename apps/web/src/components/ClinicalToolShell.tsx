import { getToolDiscovery, type ClinicalToolMetadata } from "@peds-core/core";
import type { PropsWithChildren } from "react";
import { categoryLabels, evidenceLabels } from "../i18n/translations";
import { discoveryLabel } from "../utils/discoveryLabels";
import type { Language } from "../utils/language";
import { makePath } from "../utils/routes";

type ClinicalToolShellProps = PropsWithChildren<{
  language: Language;
  tool: ClinicalToolMetadata;
  navigate: (href: string) => void;
  favorite: boolean;
  onFavorite: () => void;
  onShare: () => void;
  relatedTools: ClinicalToolMetadata[];
  title?: string;
  primaryResult?: string;
}>;

export function ClinicalToolShell({
  language,
  tool,
  navigate,
  favorite,
  onFavorite,
  onShare,
  relatedTools,
  title,
  primaryResult,
  children
}: ClinicalToolShellProps) {
  const discovery = getToolDiscovery(tool.id);
  const careSetting = discovery?.careSettings?.[0]
    ? discoveryLabel(discovery.careSettings[0], language)
    : language === "es" ? "Pediatría" : "Pediatrics";

  return (
    <div className="pram-showcase clinical-tool-shell">
      <section className="pram-hero-shell">
        <div className="pram-hero-media" aria-hidden="true" />
        <nav className="pram-breadcrumbs" aria-label={language === "es" ? "Ruta de navegación" : "Breadcrumbs"}>
          <a href={makePath(language, "tools")} onClick={(event) => { event.preventDefault(); navigate(makePath(language, "tools")); }}>
            {language === "es" ? "Herramientas" : "Tools"}
          </a>
          <span>›</span>
          <a href={makePath(language, "categories", tool.category)} onClick={(event) => { event.preventDefault(); navigate(makePath(language, "categories", tool.category)); }}>
            {categoryLabels[tool.category][language]}
          </a>
          <span>›</span>
          <span>{tool.shortName || tool.name[language]}</span>
        </nav>

        <div className="pram-hero-copy">
          <div className="pram-title-row">
            <div>
              <div className="pram-title-line">
                <h1>{title ?? tool.shortName ?? tool.name[language]}</h1>
                <span className="pram-clinical-badge">✓ {language === "es" ? "Herramienta clínica" : "Clinical tool"}</span>
              </div>
              <p>{tool.description[language]}</p>
              <a className="pram-evidence-jump" href="#evidence">
                {language === "es" ? "Evidencia y referencias" : "Evidence and references"} ↓
              </a>
            </div>
            <div className="pram-hero-actions">
              <button className={favorite ? "pram-pill-button is-active" : "pram-pill-button"} onClick={onFavorite} type="button" aria-pressed={favorite}>
                {favorite ? "♥" : "♡"} {language === "es" ? "Favorito" : "Favorite"}
              </button>
              <button className="pram-pill-button" onClick={onShare} type="button">
                ↗ {language === "es" ? "Compartir" : "Share"}
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="pram-summary-stack">
        <div className="pram-trust-chips" aria-label={language === "es" ? "Nivel de evidencia" : "Evidence level"}>
          <span>◆ {language === "es" ? "Basada en evidencia" : "Evidence based"}</span>
          <span>ⓘ {evidenceLabels[tool.evidenceLevel][language]}</span>
        </div>

        <section className="pram-quick-strip" aria-label={language === "es" ? "Resumen clínico" : "Clinical summary"}>
          <div><b>♟</b><span><strong>{language === "es" ? "Población" : "Population"}</strong><small>{tool.population[language]}</small></span></div>
          <div><b>♧</b><span><strong>{language === "es" ? "Uso en" : "Use in"}</strong><small>{careSetting}</small></span></div>
          <div><b>▥</b><span><strong>{language === "es" ? "Resultado principal" : "Primary result"}</strong><small>{primaryResult ?? (language === "es" ? "Resultado clínico de la herramienta" : "Clinical tool result")}</small></span></div>
          <div className="is-caution"><b>▲</b><span><strong>{language === "es" ? "Precaución importante" : "Important caution"}</strong><small>{language === "es" ? "No reemplaza el juicio clínico." : "Does not replace clinical judgment."}</small></span></div>
        </section>
      </div>

      <div className="clinical-tool-shell-body">{children}</div>

      {relatedTools.length > 0 ? (
        <section className="pram-related" id="related">
          <div className="pram-related-heading">
            <h2>⌁ {language === "es" ? "Herramientas relacionadas" : "Related tools"}</h2>
            <p>{language === "es" ? "Otras herramientas pediátricas que pueden ser de interés." : "Other pediatric tools that may be relevant."}</p>
          </div>
          <div className="pram-related-grid">
            {relatedTools.slice(0, 4).map((related) => (
              <a key={related.id} href={makePath(language, "tools", related.slug)} onClick={(event) => { event.preventDefault(); navigate(makePath(language, "tools", related.slug)); }}>
                <span className="pram-related-icon">{related.category === "respiratory" ? "◒" : "▦"}</span>
                <span><strong>{related.shortName || related.name[language]}</strong><small>{related.description[language]}</small></span>
                <b>→</b>
              </a>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}

