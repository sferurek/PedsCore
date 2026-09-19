import {
  getAllTools,
  getClinicalReviewRecord,
  getToolDiscovery
} from "@peds-core/core";
import { categoryLabels, riskLabels } from "../i18n/translations";
import type { Language } from "../utils/language";
import { makePath } from "../utils/routes";

interface ClinicalReviewDashboardProps {
  language: Language;
}

const statusText = (
  language: Language,
  value: "yes" | "pending" | "not_applicable"
) => {
  if (value === "yes") return language === "es" ? "Completada" : "Completed";
  if (value === "pending") return language === "es" ? "Pendiente" : "Pending";
  return language === "es" ? "No aplica" : "Not applicable";
};

export function ClinicalReviewDashboard({
  language
}: ClinicalReviewDashboardProps) {
  const localTools = getAllTools()
    .filter(
      (tool) =>
        getToolDiscovery(tool.id)?.calculationAvailability === "local_active"
    )
    .sort((a, b) => {
      const aReview = getClinicalReviewRecord(a.id);
      const bReview = getClinicalReviewRecord(b.id);
      const tierOrder = { A: 0, B: 1, C: 2, unassigned: 3 } as const;
      return (
        tierOrder[aReview.tier] - tierOrder[bReview.tier] ||
        a.name[language].localeCompare(b.name[language])
      );
    });

  const reviewed = localTools.filter(
    (tool) =>
      getClinicalReviewRecord(tool.id).independentReviewStatus === "completed"
  ).length;
  const technicalAudits = localTools.filter(
    (tool) => getClinicalReviewRecord(tool.id).technicalAudit
  ).length;
  const tierA = localTools.filter(
    (tool) => getClinicalReviewRecord(tool.id).tier === "A"
  ).length;

  return (
    <section
      className="content-panel clinical-review-dashboard"
      id="clinical-review-dashboard"
    >
      <div className="tool-section-heading">
        <p className="eyebrow">
          {language === "es"
            ? "GOBERNANZA CLÍNICA"
            : "CLINICAL GOVERNANCE"}
        </p>
        <h2>
          {language === "es"
            ? "Panel público de revisión clínica"
            : "Public clinical review dashboard"}
        </h2>
      </div>

      <p className="review-dashboard-lead">
        {language === "es"
          ? "Estado reproducible de las superficies con cálculo local. La auditoría clínica-técnica y la revisión clínica externa independiente se muestran por separado para no confundir ambas capas."
          : "Reproducible status for locally calculated surfaces. Clinical technical audit and independent external clinical review are shown separately so the two layers are never conflated."}
      </p>

      <dl className="review-dashboard-summary">
        <div>
          <dt>{language === "es" ? "Cálculos locales" : "Local calculations"}</dt>
          <dd>{localTools.length}</dd>
        </div>
        <div>
          <dt>{language === "es" ? "Tier A" : "Tier A"}</dt>
          <dd>{tierA}</dd>
        </div>
        <div>
          <dt>
            {language === "es"
              ? "Auditoría técnica Tier A"
              : "Tier A technical audit"}
          </dt>
          <dd>{technicalAudits}</dd>
        </div>
        <div>
          <dt>
            {language === "es"
              ? "Revisión independiente"
              : "Independent review"}
          </dt>
          <dd>{reviewed}</dd>
        </div>
      </dl>

      <div className="review-dashboard-legend" aria-label={language === "es" ? "Leyenda" : "Legend"}>
        <span>
          <i className="review-dot completed" aria-hidden="true" />
          {language === "es" ? "Completado/documentado" : "Completed/documented"}
        </span>
        <span>
          <i className="review-dot pending" aria-hidden="true" />
          {language === "es" ? "Pendiente" : "Pending"}
        </span>
      </div>

      <div className="review-dashboard-table-wrap">
        <table className="review-dashboard-table">
          <thead>
            <tr>
              <th>{language === "es" ? "Herramienta" : "Tool"}</th>
              <th>{language === "es" ? "Área" : "Area"}</th>
              <th>Tier</th>
              <th>{language === "es" ? "Riesgo" : "Risk"}</th>
              <th>{language === "es" ? "Auditoría técnica" : "Technical audit"}</th>
              <th>{language === "es" ? "Revisión independiente" : "Independent review"}</th>
              <th>{language === "es" ? "Validación externa citada" : "External validation cited"}</th>
            </tr>
          </thead>
          <tbody>
            {localTools.map((tool) => {
              const discovery = getToolDiscovery(tool.id);
              const review = getClinicalReviewRecord(tool.id);
              const hasExternalValidation = tool.references.some(
                (reference) =>
                  reference.evidenceLevel === "external_validation_study"
              );
              const auditCompleted = Boolean(review.technicalAudit);
              const independentCompleted =
                review.independentReviewStatus === "completed";

              return (
                <tr key={tool.id}>
                  <td>
                    <a href={makePath(language, "tools", tool.slug)}>
                      <strong>{tool.shortName || tool.name[language]}</strong>
                    </a>
                  </td>
                  <td>{categoryLabels[tool.category][language]}</td>
                  <td>{review.tier === "unassigned" ? "—" : review.tier}</td>
                  <td>
                    {discovery
                      ? riskLabels[
                          discovery.clinicalRiskTier === "moderate"
                            ? "medium"
                            : discovery.clinicalRiskTier === "critical"
                              ? "high"
                              : discovery.clinicalRiskTier
                        ][language]
                      : riskLabels[tool.regulatoryRisk][language]}
                  </td>
                  <td>
                    <span
                      className={
                        auditCompleted
                          ? "review-status completed"
                          : "review-status pending"
                      }
                    >
                      {auditCompleted
                        ? statusText(language, "yes")
                        : statusText(language, "pending")}
                    </span>
                  </td>
                  <td>
                    <span
                      className={
                        independentCompleted
                          ? "review-status completed"
                          : "review-status pending"
                      }
                    >
                      {independentCompleted
                        ? statusText(language, "yes")
                        : statusText(language, "pending")}
                    </span>
                  </td>
                  <td>{hasExternalValidation ? "✓" : "—"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="review-dashboard-note">
        {language === "es"
          ? "Una herramienta solo se marca como revisada externamente cuando existe un revisor identificable, una fecha, un commit exacto y un resultado documentado. Los cambios posteriores de lógica requieren nueva revisión de la versión afectada."
          : "A tool is marked externally reviewed only when an identifiable reviewer, date, exact commit and documented outcome exist. Later logic changes require re-review of the affected version."}
      </p>

      <div className="link-row">
        <a
          className="primary-link"
          href="https://github.com/sferurek/PedsCore/blob/main/docs/CLINICAL_REVIEW_PROGRAM.md"
          rel="noreferrer"
          target="_blank"
        >
          {language === "es"
            ? "Programa de revisión clínica"
            : "Clinical Review Program"}
        </a>
        <a
          className="primary-link"
          href="https://github.com/sferurek/PedsCore/issues/85"
          rel="noreferrer"
          target="_blank"
        >
          {language === "es"
            ? "Seguimiento Tier A"
            : "Tier A tracking"}
        </a>
      </div>
    </section>
  );
}
