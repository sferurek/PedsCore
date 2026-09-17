import { getTool, getToolDiscovery, getToolSeoProfile } from "@peds-core/core";
import type { Language } from "../utils/language";
import type { SeoTopicHub } from "../utils/topicHubs";

interface TopicHubPageProps {
  hub: SeoTopicHub;
  language: Language;
  navigate: (href: string) => void;
}

export function TopicHubPage({ hub, language, navigate }: TopicHubPageProps) {
  const tools = hub.toolIds.map((id) => getTool(id)).filter(Boolean);

  return (
    <article className="info-page">
      <p className="eyebrow">{language === "es" ? "COMPARAR HERRAMIENTAS" : "COMPARE TOOLS"}</p>
      <h1>{hub.title[language]}</h1>
      <p>{hub.description[language]}</p>

      <section className="content-panel subtle-panel">
        <h2>{language === "es" ? "Antes de comparar" : "Before comparing"}</h2>
        <p>{hub.intro[language]}</p>
      </section>

      <section className="content-panel">
        <h2>{language === "es" ? "Herramientas incluidas" : "Included tools"}</h2>
        <div className="tool-grid">
          {tools.map((tool) => {
            if (!tool) return null;
            const discovery = getToolDiscovery(tool.id);
            const seo = getToolSeoProfile(tool, language);
            const status =
              discovery?.calculationAvailability === "local_active"
                ? language === "es" ? "Cálculo local activo" : "Active local calculation"
                : discovery?.calculationAvailability === "external_official"
                  ? language === "es" ? "Herramienta externa" : "External tool"
                  : language === "es" ? "Referencia clínica" : "Clinical reference";

            return (
              <article className="tool-card" key={tool.id}>
                <p className="eyebrow">{status}</p>
                <h3>{tool.name[language] || tool.name.en}</h3>
                <p>{seo.description}</p>
                <p>
                  <strong>{language === "es" ? "Población:" : "Population:"}</strong>{" "}
                  {tool.population[language] || tool.population.en}
                </p>
                <a
                  className="primary-link"
                  href={`/${language}/tools/${tool.slug}`}
                  onClick={(event) => {
                    event.preventDefault();
                    navigate(`/${language}/tools/${tool.slug}`);
                  }}
                >
                  {language === "es" ? "Abrir ficha clínica →" : "Open clinical page →"}
                </a>
              </article>
            );
          })}
        </div>
      </section>

      <section className="content-panel">
        <h2>{language === "es" ? "Comparación rápida" : "Quick comparison"}</h2>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>{language === "es" ? "Herramienta" : "Tool"}</th>
                <th>{language === "es" ? "Población" : "Population"}</th>
                <th>{language === "es" ? "Disponibilidad" : "Availability"}</th>
                <th>{language === "es" ? "Evidencia" : "Evidence"}</th>
              </tr>
            </thead>
            <tbody>
              {tools.map((tool) => {
                if (!tool) return null;
                const discovery = getToolDiscovery(tool.id);
                const availability =
                  discovery?.calculationAvailability === "local_active"
                    ? (language === "es" ? "Cálculo local" : "Local calculation")
                    : discovery?.calculationAvailability === "external_official"
                      ? (language === "es" ? "Herramienta externa" : "External tool")
                      : discovery?.surfaceStatus === "active"
                        ? (language === "es" ? "Referencia activa" : "Active reference")
                        : (language === "es" ? "En revisión" : "Under review");
                return (
                  <tr key={tool.id}>
                    <td>
                      <a
                        href={`/${language}/tools/${tool.slug}`}
                        onClick={(event) => {
                          event.preventDefault();
                          navigate(`/${language}/tools/${tool.slug}`);
                        }}
                      >
                        {tool.name[language] || tool.name.en}
                      </a>
                    </td>
                    <td>{tool.population[language] || tool.population.en}</td>
                    <td>{availability}</td>
                    <td>{tool.evidenceLevel.replaceAll("_", " ")}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="content-panel subtle-panel">
        <h2>{language === "es" ? "Cómo interpreta PedsCore estas comparaciones" : "How PedsCore handles comparisons"}</h2>
        <p>
          {language === "es"
            ? "La presencia conjunta de varias herramientas no implica equivalencia ni una recomendación de una sobre otra. Cada ficha conserva población, variante, fuente primaria, estado de implementación, limitaciones y condiciones de reutilización."
            : "Listing tools together does not imply equivalence or recommend one over another. Each page retains its population, variant, primary source, implementation status, limitations and reuse conditions."}
        </p>
      </section>
    </article>
  );
}
