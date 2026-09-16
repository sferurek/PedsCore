import type { ClinicalToolMetadata } from "@peds-core/core";
import type { Language } from "../utils/language";

interface ToolReviewPanelProps {
  language: Language;
  tool: ClinicalToolMetadata;
}

const latestReferenceYear = (tool: ClinicalToolMetadata): number | null => {
  const years = tool.references
    .map((reference) => reference.year)
    .filter((value): value is number => typeof value === "number");
  return years.length ? Math.max(...years) : null;
};

export function ToolReviewPanel({ language, tool }: ToolReviewPanelProps) {
  const latestYear = latestReferenceYear(tool);
  const implementationReviewed = tool.implementationStatus === "implemented";

  return (
    <section className="content-panel tool-review-panel" id="clinical-review">
      <div className="tool-section-heading">
        <p className="eyebrow">{language === "es" ? "REVISIÓN CLÍNICA" : "CLINICAL REVIEW"}</p>
        <h2>{language === "es" ? "Quién y qué se ha revisado" : "Who and what has been reviewed"}</h2>
      </div>

      <dl className="review-profile-grid">
        <div>
          <dt>{language === "es" ? "Responsable editorial" : "Editorial maintainer"}</dt>
          <dd>PedsCore maintainers</dd>
        </div>
        <div>
          <dt>{language === "es" ? "Revisión de implementación" : "Implementation review"}</dt>
          <dd>
            {implementationReviewed
              ? (language === "es" ? "Documentada en el repositorio" : "Documented in the repository")
              : (language === "es" ? "Aún no cerrada" : "Not yet closed")}
          </dd>
        </div>
        <div>
          <dt>{language === "es" ? "Revisor clínico nominal" : "Named clinical reviewer"}</dt>
          <dd>{language === "es" ? "No documentado todavía" : "Not yet documented"}</dd>
        </div>
        <div>
          <dt>{language === "es" ? "Revisión independiente" : "Independent review"}</dt>
          <dd>{language === "es" ? "No afirmada sin documentación" : "Not claimed without documentation"}</dd>
        </div>
        <div>
          <dt>{language === "es" ? "Fuente citada más reciente" : "Latest cited source"}</dt>
          <dd>{latestYear ?? (language === "es" ? "Sin año registrado" : "No year recorded")}</dd>
        </div>
        <div>
          <dt>{language === "es" ? "Trazabilidad" : "Traceability"}</dt>
          <dd>
            <a
              href="https://github.com/sferurek/PedsCore"
              rel="noreferrer"
              target="_blank"
            >
              GitHub
            </a>
          </dd>
        </div>
      </dl>

      <p className="review-profile-note">
        {language === "es"
          ? "PedsCore separa la revisión documental y técnica de una revisión clínica independiente. No se atribuye una revisión nominal hasta que exista un registro público que la respalde."
          : "PedsCore separates documentary/technical review from independent clinical review. A named reviewer is not attributed until a public record supports that claim."}
      </p>
    </section>
  );
}
