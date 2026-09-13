import { getToolDiscovery } from "@peds-core/core";
import type { ClinicalToolMetadata } from "@peds-core/core";
import type { Language } from "../utils/language";
import { discoveryLabel } from "../utils/discoveryLabels";

interface ToolClinicalGuideProps {
  language: Language;
  tool: ClinicalToolMetadata;
}

const availabilityLabel = (
  value: ReturnType<typeof getToolDiscovery> extends infer T
    ? T extends { calculationAvailability: infer V }
      ? V
      : never
    : never,
  language: Language
) => {
  const labels: Record<string, { es: string; en: string }> = {
    local_active: {
      es: "Cálculo disponible en PedsCore",
      en: "Calculation available in PedsCore"
    },
    local_planned: {
      es: "Referencia activa; cálculo local previsto",
      en: "Active reference; local calculation planned"
    },
    external_official: {
      es: "Referencia en PedsCore; uso operativo mediante fuente oficial",
      en: "Reference in PedsCore; operational use via official source"
    },
    not_applicable: {
      es: "No requiere cálculo local",
      en: "No local calculation required"
    },
    blocked_by_rights: {
      es: "Referencia disponible; reproducción limitada por condiciones de uso",
      en: "Reference available; reproduction limited by reuse conditions"
    },
    blocked_by_evidence: {
      es: "Referencia disponible; implementación operativa en revisión",
      en: "Reference available; operational implementation under review"
    }
  };

  return labels[String(value)]?.[language] ?? String(value);
};

export function ToolClinicalGuide({
  language,
  tool
}: ToolClinicalGuideProps) {
  const discovery = getToolDiscovery(tool.id);

  if (!discovery) {
    return (
      <section className="content-panel tool-clinical-guide" id="clinical-context">
        <div className="clinical-guide-heading">
          <p className="eyebrow">{language === "es" ? "EN CONTEXTO" : "IN CONTEXT"}</p>
          <h2>{language === "es" ? "Resumen clínico" : "Clinical summary"}</h2>
        </div>
        <p>{tool.description[language]}</p>
      </section>
    );
  }

  const settings = discovery.careSettings.map((item) =>
    discoveryLabel(item, language)
  );
  const functions = discovery.clinicalFunctions.map((item) =>
    discoveryLabel(item, language)
  );
  const modes = discovery.interactionModes.map((item) =>
    discoveryLabel(item, language)
  );
  const problems = discovery.clinicalProblems.map((item) =>
    discoveryLabel(item, language)
  );

  return (
    <section className="content-panel tool-clinical-guide" id="clinical-context">
      <div className="clinical-guide-heading">
        <p className="eyebrow">{language === "es" ? "EN CONTEXTO" : "IN CONTEXT"}</p>
        <h2>{language === "es" ? "Resumen clínico" : "Clinical summary"}</h2>
        <p>
          {language === "es"
            ? "Una vista rápida del propósito, la población y el alcance de esta herramienta."
            : "A quick view of this tool’s purpose, population and scope."}
        </p>
      </div>

      <div className="clinical-guide-grid">
        <article>
          <span className="clinical-guide-index">01</span>
          <h3>{language === "es" ? "Población y contexto" : "Population and setting"}</h3>
          <p>{tool.population[language]}</p>
          {settings.length > 0 ? (
            <div className="clinical-guide-tags">
              {settings.map((item) => <span key={item}>{item}</span>)}
            </div>
          ) : null}
        </article>

        <article>
          <span className="clinical-guide-index">02</span>
          <h3>{language === "es" ? "Qué evalúa" : "What it assesses"}</h3>
          <p>{tool.description[language]}</p>
          <div className="clinical-guide-tags">
            {[...problems, ...functions].slice(0, 6).map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </article>

        <article>
          <span className="clinical-guide-index">03</span>
          <h3>{language === "es" ? "Cómo se usa aquí" : "How it works here"}</h3>
          <p>{availabilityLabel(discovery.calculationAvailability, language)}</p>
          {modes.length > 0 ? (
            <div className="clinical-guide-tags">
              {modes.map((item) => <span key={item}>{item}</span>)}
            </div>
          ) : null}
        </article>

        <article>
          <span className="clinical-guide-index">04</span>
          <h3>{language === "es" ? "Límites y cautelas" : "Limits and cautions"}</h3>
          <p>{tool.validationNotes[language]}</p>
          {discovery.exclusions.length > 0 ? (
            <ul className="clinical-guide-exclusions">
              {discovery.exclusions.map((item, index) => (
                <li key={index}>{item.reason[language]}</li>
              ))}
            </ul>
          ) : null}
        </article>
      </div>
    </section>
  );
}
