import { clinicalTools, getToolDiscovery } from "@peds-core/core";
import { statusLabels, surfaceStatusLabels, translations } from "../i18n/translations";
import { evidenceStatusDescriptions } from "../utils/evidenceStatus";
import type { Language } from "../utils/language";
import { ClinicalReviewDashboard } from "../components/ClinicalReviewDashboard";

interface EvidencePageProps {
  language: Language;
}

const statuses = [
  "implemented",
  "partially_implemented",
  "ready_for_implementation",
  "pending_validation",
  "needs_primary_reference",
  "coming_soon",
  "not_implemented_due_to_licensing"
] as const;

const evidenceHierarchy = [
  {
    id: "original_derivation_study",
    es: "Estudio original o de derivación",
    en: "Original or derivation study"
  },
  {
    id: "external_validation_study",
    es: "Validación externa",
    en: "External validation study"
  },
  {
    id: "clinical_practice_guideline",
    es: "Guía clínica oficial",
    en: "Official clinical practice guideline"
  },
  {
    id: "systematic_review",
    es: "Revisión sistemática",
    en: "Systematic review"
  },
  {
    id: "consensus_statement",
    es: "Documento de consenso",
    en: "Consensus statement"
  },
  {
    id: "official_manual_or_institutional_protocol",
    es: "Manual oficial o protocolo institucional",
    en: "Official manual or institutional protocol"
  },
  {
    id: "peer_reviewed_review",
    es: "Revisión por pares",
    en: "Peer-reviewed review"
  },
  {
    id: "secondary_source",
    es: "Fuente secundaria",
    en: "Secondary source"
  },
  {
    id: "local_project_documentation",
    es: "Documentación local de PedsCore",
    en: "PedsCore local documentation"
  },
  {
    id: "pending_primary_source",
    es: "Fuente primaria pendiente",
    en: "Pending primary source"
  }
] as const;

const summaryStatuses = ["active", "draft", "blocked", "deprecated"] as const;

export function EvidencePage({ language }: EvidencePageProps) {
  const t = translations[language];
  const statusCounts = summaryStatuses.map((status) => ({
    status,
    count: clinicalTools.filter(
      (tool) => getToolDiscovery(tool.id)?.surfaceStatus === status
    ).length
  }));

  return (
    <article className="info-page evidence-page">
      <p className="eyebrow">{t.evidence.eyebrow}</p>
      <h1>{t.evidence.title}</h1>
      <p>{t.evidence.lead}</p>

      <section className="content-panel subtle-panel">
        <h2>{t.evidence.whyTitle}</h2>
        <p>{t.evidence.whyBody}</p>
      </section>

      <section className="content-panel evidence-principle-panel">
        <h2>{t.evidence.whyNotEverythingTitle}</h2>
        <p>{t.evidence.whyNotEverythingBody}</p>
      </section>

      <section className="content-panel subtle-panel">
        <h2>{t.evidence.hierarchyTitle}</h2>
        <p>{t.evidence.hierarchyBody}</p>
        <ol className="evidence-hierarchy">
          {evidenceHierarchy.map((level) => (
            <li key={level.id}>{level[language]}</li>
          ))}
        </ol>
      </section>

      <section className="content-panel subtle-panel">
        <h2>{t.evidence.sortingTitle}</h2>
        <p>{t.evidence.sortingBody}</p>
      </section>

      <section className="content-panel subtle-panel">
        <h2>{language === "es" ? "Política editorial" : "Editorial policy"}</h2>
        <p>
          {language === "es"
            ? "La implementación clínica se separa de la mera presencia en el catálogo. Antes de activar cálculo local se revisan la versión, la población, las entradas, la fórmula o tabla, la interpretación, la licencia y las pruebas. Si alguno de esos elementos sigue abierto, la superficie permanece como referencia, borrador o contenido limitado."
            : "Clinical implementation is separated from simple catalog presence. Before local calculation is activated, version, population, inputs, formula or table, interpretation, licensing and tests are reviewed. If any of these remain unresolved, the surface stays reference-only, draft or limited."}
        </p>
        <p>
          {language === "es"
            ? "Las correcciones y cambios de criterio quedan vinculados al historial público del repositorio. No se afirma revisión experta independiente cuando no existe documentación que la respalde."
            : "Corrections and changes in editorial judgment remain linked to the public repository history. Independent expert review is not claimed unless it is documented."}
        </p>
        <a className="primary-link" href="https://github.com/sferurek/PedsCore/blob/main/docs/EDITORIAL_POLICY.md" rel="noreferrer" target="_blank">
          {language === "es" ? "Ver política editorial" : "View editorial policy"}
        </a>
      </section>

      <section className="content-panel subtle-panel">
        <h2>{t.evidence.summaryTitle}</h2>
        <dl className="evidence-summary-grid">
          {statusCounts.map((item) => (
            <div key={item.status}>
              <dt>{surfaceStatusLabels[item.status][language]}</dt>
              <dd>{item.count}</dd>
            </div>
          ))}
        </dl>
      </section>

      <ClinicalReviewDashboard language={language} />

      <section className="content-panel subtle-panel">
        <h2>{t.evidence.statusTitle}</h2>
        <div className="status-explainer-grid">
          {statuses.map((status) => (
            <div className="status-explainer" key={status}>
              <strong>{statusLabels[status][language]}</strong>
              <p>{evidenceStatusDescriptions[status][language]}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="content-panel subtle-panel">
        <h2>{t.evidence.contributeTitle}</h2>
        <p>{t.evidence.contributeBody}</p>
        <div className="link-row">
          <a
            className="primary-link"
            href="https://github.com/sferurek/PedsCore/tree/main/docs/evidence"
            rel="noreferrer"
            target="_blank"
          >
            {t.evidence.docsLink}
          </a>
          <a
            className="primary-link"
            href="https://github.com/sferurek/PedsCore/issues/new/choose"
            rel="noreferrer"
            target="_blank"
          >
            {t.evidence.submitEvidence}
          </a>
        </div>
      </section>
    </article>
  );
}
