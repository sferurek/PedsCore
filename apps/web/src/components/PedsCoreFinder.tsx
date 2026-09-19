import { useMemo, useState } from "react";
import {
  getToolDiscovery
} from "@peds-core/core";
import type { ClinicalToolMetadata } from "@peds-core/core";
import { makePath } from "../utils/routes";
import type { Language } from "../utils/language";
import { runPedsCoreFinder } from "../utils/pedsCoreFinder";
import { discoveryLabel } from "../utils/discoveryLabels";
import { trackUsageEvent } from "../utils/analytics";

interface Props {
  tools: ClinicalToolMetadata[];
  language: Language;
  navigate: (href: string) => void;
}

export function PedsCoreFinder({ tools, language, navigate }: Props) {
  const [draft, setDraft] = useState("");
  const [query, setQuery] = useState("");
  const [showCompare, setShowCompare] = useState(false);
  const response = useMemo(
    () => runPedsCoreFinder(tools, query, language),
    [tools, query, language]
  );
  const es = language === "es";
  const examples = es
    ? [
        "Lactante con fiebre",
        "Prematuro con dificultad respiratoria",
        "Dolor neonatal",
        "TCE en niño de 3 años"
      ]
    : [
        "Young infant with fever",
        "Preterm infant with respiratory distress",
        "Neonatal pain",
        "Head injury in a 3-year-old"
      ];

  const applyClarification = (option: string) => {
    if (/añadir edad|add age/i.test(option)) {
      return;
    }
    const next = [query || draft, option].filter(Boolean).join(". ");
    setDraft(next);
    setQuery(next);
  };

  const topTwo = response.matches.slice(0, 2);

  const submitFinderQuery = (nextQuery: string) => {
    const normalized = nextQuery.trim();
    setShowCompare(false);
    setQuery(normalized);
    if (normalized) {
      const result = runPedsCoreFinder(tools, normalized, language);
      trackUsageEvent("finder_used", makePath(language), language, {
        searchScope: "clinical_finder",
        hasQuery: true,
        status: result.matches.length > 0 ? "matches" : "empty"
      });
    }
  };

  const openFinderResult = (tool: ClinicalToolMetadata) => {
    trackUsageEvent("finder_result_opened", makePath(language), language, {
      searchScope: "clinical_finder",
      toolId: tool.id,
      toolType: tool.type,
      category: tool.category
    });
    navigate(makePath(language, "tools", tool.slug));
  };

  return (
    <section className="finder-shell" aria-labelledby="finder-title">
      <div className="finder-header">
        <div>
          <p className="finder-eyebrow">PedsCore Finder</p>
          <h2 id="finder-title">
            {es ? "¿Qué quieres valorar?" : "What would you like to assess?"}
          </h2>
          <p>
            {es
              ? "Cuéntame el caso en una frase, como se lo contarías a un compañero. Finder cruza edad, problema clínico y contexto para proponerte herramientas relevantes."
              : "Describe the case in one sentence, as you would to a colleague. Finder combines age, clinical problem and context to suggest relevant tools."}
          </p>
        </div>
      </div>

      <div className="finder-chat">
        <div className="finder-message finder-message-assistant">
          <p>
            {es
              ? "Puedes incluir edad, motivo de consulta y qué necesitas estimar, clasificar o seguir."
              : "You can include age, the clinical problem and what you need to estimate, classify or follow."}
          </p>
        </div>

        {query ? (
          <>
            <div className="finder-message finder-message-user">
              <p>{query}</p>
            </div>
            <div className="finder-message finder-message-assistant">
              <p>{response.intro}</p>
            </div>
          </>
        ) : null}

        {response.clarification ? (
          <div className="finder-clarification">
            <strong>{response.clarification.prompt}</strong>
            <div className="finder-option-row">
              {response.clarification.options.map((option) => (
                <button
                  className="quick-filter-chip"
                  type="button"
                  key={option}
                  onClick={() => applyClarification(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {query && response.matches.length > 0 ? (
          <div className="finder-results" aria-live="polite">
            {response.matches.map((match) => (
              <article className="finder-result-card" key={match.tool.id}>
                <div className="finder-result-heading">
                  <div>
                    <strong>{match.tool.name[language]}</strong>
                    <span>{match.tool.population[language]}</span>
                  </div>
                  <button
                    type="button"
                    className="secondary-action"
                    onClick={() => openFinderResult(match.tool)}
                  >
                    {es ? "Abrir" : "Open"}
                  </button>
                </div>

                {match.reasons.length ? (
                  <details>
                    <summary>
                      {es ? "Por qué puede encajar" : "Why it may fit"}
                    </summary>
                    <ul>
                      {match.reasons.map((reason) => (
                        <li key={reason}>{reason}</li>
                      ))}
                    </ul>
                  </details>
                ) : null}

                {match.caveats.length ? (
                  <div className="finder-caveats">
                    <strong>{es ? "Antes de usarla" : "Before you use it"}</strong>
                    <ul>
                      {match.caveats.map((caveat) => (
                        <li key={caveat}>{caveat}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        ) : null}

        {response.excluded.length ? (
          <details className="finder-excluded">
            <summary>
              {es
                ? "Relacionadas, pero menos adecuadas para este caso"
                : "Related tools that are a poorer fit for this case"}
            </summary>
            <ul>
              {response.excluded.map((item) => (
                <li key={item.tool.id}>
                  <strong>{item.tool.name[language]}:</strong> {item.reason}
                </li>
              ))}
            </ul>
          </details>
        ) : null}

        {topTwo.length === 2 ? (
          <div className="finder-compare-actions">
            <button
              className="secondary-action"
              type="button"
              onClick={() => {
                setShowCompare((value) => !value);
                trackUsageEvent("finder_compare_used", makePath(language), language, {
                  searchScope: "clinical_finder",
                  status: showCompare ? "closed" : "opened"
                });
              }}
            >
              {showCompare
                ? es
                  ? "Ocultar comparación"
                  : "Hide comparison"
                : es
                  ? "Comparar las dos opciones principales"
                  : "Compare the top two options"}
            </button>
          </div>
        ) : null}

        {showCompare && topTwo.length === 2 ? (
          <div className="finder-compare-grid">
            {topTwo.map((match) => {
              const discovery = getToolDiscovery(match.tool.id);
              return (
                <article key={match.tool.id}>
                  <h3>{match.tool.name[language]}</h3>
                  <dl>
                    <div>
                      <dt>{es ? "Población" : "Population"}</dt>
                      <dd>{match.tool.population[language]}</dd>
                    </div>
                    <div>
                      <dt>{es ? "Función" : "Function"}</dt>
                      <dd>{discovery?.clinicalFunctions.map((value) => discoveryLabel(value, language)).join(" · ")}</dd>
                    </div>
                    <div>
                      <dt>{es ? "Entorno" : "Setting"}</dt>
                      <dd>{discovery?.careSettings.map((value) => discoveryLabel(value, language)).join(" · ")}</dd>
                    </div>
                    <div>
                      <dt>{es ? "Modalidad" : "Mode"}</dt>
                      <dd>{discovery?.interactionModes.map((value) => discoveryLabel(value, language)).join(" · ")}</dd>
                    </div>
                    <div>
                      <dt>{es ? "Cálculo" : "Calculation"}</dt>
                      <dd>{discovery?.calculationAvailability === "local_active"
                        ? (es ? "Cálculo activo en PedsCore" : "Active calculation in PedsCore")
                        : discovery?.calculationAvailability === "external_official"
                          ? (es ? "Uso mediante fuente oficial externa" : "Use via official external source")
                          : discovery?.calculationAvailability === "blocked_by_rights"
                            ? (es ? "Referencia disponible · reproducción limitada" : "Reference available · reproduction limited")
                            : discovery?.calculationAvailability === "blocked_by_evidence"
                              ? (es ? "Referencia disponible · implementación en revisión" : "Reference available · implementation under review")
                              : discovery?.calculationAvailability === "local_planned"
                                ? (es ? "Cálculo local previsto" : "Local calculation planned")
                                : (es ? "No requiere cálculo" : "No calculation required")}</dd>
                    </div>
                  </dl>
                </article>
              );
            })}
          </div>
        ) : null}
      </div>

      <form
        className="finder-composer"
        onSubmit={(event) => {
          event.preventDefault();
          submitFinderQuery(draft);
        }}
      >
        <label className="sr-only" htmlFor="peds-core-finder-query">
          {es ? "Describe el contexto clínico para buscar herramientas" : "Describe the clinical context to find tools"}
        </label>
        <textarea
          id="peds-core-finder-query"
          aria-describedby="finder-privacy-note"
          rows={2}
          value={draft}
          placeholder={
            es
              ? "Ej.: niño de 8 años con crisis asmática; quiero valorar la gravedad"
              : "E.g. 8-year-old with an asthma exacerbation; assess severity"
          }
          onChange={(event) => setDraft(event.target.value)}
        />
        <button
          className="primary-action"
          type="submit"
          disabled={!draft.trim()}
        >
          {es ? "Buscar herramientas" : "Find tools"}
        </button>
        <p className="finder-privacy-note" id="finder-privacy-note">
          {es
            ? "No incluyas nombres, fechas de nacimiento, números de historia ni otros datos identificables. PedsCore no envía el texto de esta consulta a la analítica."
            : "Do not include names, dates of birth, medical-record numbers or other identifying data. PedsCore does not send this query text to analytics."}
        </p>
      </form>

      <div className="finder-example-row">
        {examples.map((example) => (
          <button
            className="quick-filter-chip"
            type="button"
            key={example}
            onClick={() => {
              setDraft(example);
              submitFinderQuery(example);
            }}
          >
            {example}
          </button>
        ))}
      </div>
    </section>
  );
}
