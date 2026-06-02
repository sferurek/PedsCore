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

export function EvidencePage({ language }: EvidencePageProps) {
  const t = translations[language];

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
