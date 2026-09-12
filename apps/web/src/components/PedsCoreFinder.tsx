import { useMemo, useState } from "react";
import {
  getToolDiscovery
} from "@peds-core/core";
import type { ClinicalToolMetadata } from "@peds-core/core";
import { makePath } from "../utils/routes";
import type { Language } from "../utils/language";
import { runPedsCoreFinder } from "../utils/pedsCoreFinder";

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

  return (
    <section className="finder-shell" aria-labelledby="finder-title">
      <div className="finder-header">
        <div>
          <p className="finder-eyebrow">PedsCore Finder</p>
          <h2 id="finder-title">
            {es ? "¿Qué necesitas valorar?" : "What do you need to assess?"}
          </h2>
          <p>
            {es
              ? "Descríbelo como lo harías a un compañero. El motor es determinista y funciona localmente en tu navegador."
              : "Describe it as you would to a colleague. The deterministic engine runs locally in your browser."}
          </p>
        </div>
        <span className="finder-local-badge">
          {es ? "0 € · local · sin API" : "€0 · local · no API"}
        </span>
      </div>

      <div className="finder-chat">
        <div className="finder-message finder-message-assistant">
          <p>
            {es
              ? "Cuéntame la edad, el problema clínico o qué quieres medir."
              : "Tell me the age, clinical problem, or what you want to measure."}
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
          <div className="finder-results">
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
                    onClick={() =>
                      navigate(makePath(language, "tools", match.tool.slug))
                    }
                  >
                    {es ? "Abrir" : "Open"}
                  </button>
                </div>

                {match.reasons.length ? (
                  <details>
                    <summary>
                      {es ? "¿Por qué aparece?" : "Why is this shown?"}
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
                    <strong>{es ? "A tener en cuenta" : "Keep in mind"}</strong>
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
                ? "Herramientas relacionadas que no encajan"
                : "Related tools that do not fit"}
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
              onClick={() => setShowCompare((value) => !value)}
            >
              {showCompare
                ? es
                  ? "Ocultar comparación"
                  : "Hide comparison"
                : es
                  ? "Comparar las dos primeras"
                  : "Compare top two"}
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
                      <dd>{discovery?.clinicalFunctions.join(" · ")}</dd>
                    </div>
                    <div>
                      <dt>{es ? "Entorno" : "Setting"}</dt>
                      <dd>{discovery?.careSettings.join(" · ")}</dd>
                    </div>
                    <div>
                      <dt>{es ? "Modalidad" : "Mode"}</dt>
                      <dd>{discovery?.interactionModes.join(" · ")}</dd>
                    </div>
                    <div>
                      <dt>{es ? "Cálculo" : "Calculation"}</dt>
                      <dd>{discovery?.calculationAvailability}</dd>
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
          setShowCompare(false);
          setQuery(draft.trim());
        }}
      >
        <textarea
          rows={2}
          value={draft}
          placeholder={
            es
              ? "Ej.: niño de 8 años con crisis de asma, quiero valorar gravedad"
              : "E.g. 8-year-old with acute asthma, assess severity"
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
      </form>

      <div className="finder-example-row">
        {examples.map((example) => (
          <button
            className="quick-filter-chip"
            type="button"
            key={example}
            onClick={() => {
              setDraft(example);
              setQuery(example);
              setShowCompare(false);
            }}
          >
            {example}
          </button>
        ))}
      </div>
    </section>
  );
}
