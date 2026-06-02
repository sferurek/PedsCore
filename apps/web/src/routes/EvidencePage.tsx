import { clinicalTools } from "@peds-core/core";
import { statusLabels, translations } from "../i18n/translations";
import { evidenceStatusDescriptions } from "../utils/evidenceStatus";
import type { Language } from "../utils/language";

interface EvidencePageProps {
  language: Language;
}

const statuses = [
  "implemented",
  "ready_for_implementation",
  "pending_validation",
  "needs_primary_reference",
  "coming_soon",
  "not_implemented_due_to_licensing"
] as const;

const evidenceHierarchy = [
  {
    id: "original_derivation_study",
    es: "Estudio original o de derivacion",
    en: "Original or derivation study"
  },
  {
    id: "external_validation_study",
    es: "Validacion externa",
    en: "External validation study"
  },
  {
    id: "clinical_practice_guideline",
    es: "Guia clinica oficial",
    en: "Official clinical practice guideline"
  },
  {
    id: "systematic_review",
    es: "Revision sistematica",
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
    es: "Revision revisada por pares",
    en: "Peer-reviewed review"
  },
  {
    id: "secondary_source",
    es: "Fuente secundaria",
    en: "Secondary source"
  },
  {
    id: "local_project_documentation",
    es: "Documentacion local de PedsCore",
    en: "PedsCore local documentation"
  },
  {
    id: "pending_primary_source",
    es: "Fuente primaria pendiente",
    en: "Pending primary source"
  }
] as const;

const summaryStatuses = [
  "implemented",
  "pending_validation",
  "needs_primary_reference",
  "not_implemented_due_to_licensing"
] as const;

export function EvidencePage({ language }: EvidencePageProps) {
  const t = translations[language];
  const statusCounts = summaryStatuses.map((status) => ({
    status,
    count: clinicalTools.filter((tool) => tool.implementationStatus === status).length
  }));

  return (
    <article className="info-page evidence-page">
      <p className="eyebrow">PedsCore evidence</p>
      <h1>{t.evidence.title}</h1>
      <p>{t.evidence.lead}</p>

      <section className="content-panel subtle-panel">
        <h2>{t.evidence.whyTitle}</h2>
        <p>{t.evidence.whyBody}</p>
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
        <h2>{t.evidence.summaryTitle}</h2>
        <dl className="evidence-summary-grid">
          {statusCounts.map((item) => (
            <div key={item.status}>
              <dt>{statusLabels[item.status][language]}</dt>
              <dd>{item.count}</dd>
            </div>
          ))}
        </dl>
      </section>

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
