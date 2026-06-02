import {
  getReferenceUrl,
  sortReferences,
  type Reference
} from "@peds-core/core";
import {
  accessTypeLabels,
  evidenceLabels,
  sourceTypeLabels,
  translations
} from "../i18n/translations";
import type { Language } from "../utils/language";

interface ReferenceListProps {
  language: Language;
  references: Reference[];
}

export function ReferenceList({ language, references }: ReferenceListProps) {
  const t = translations[language];
  const sortedReferences = sortReferences(references);

  if (references.length === 0) {
    return <p className="muted">{t.tool.noReferences}</p>;
  }

  return (
    <ol className="reference-list">
      {sortedReferences.map((reference, index) => {
        const referenceUrl = getReferenceUrl(reference);

        return (
          <li className="reference-card" key={reference.id}>
            <div className="reference-card-header">
              <span className="reference-number">{index + 1}</span>
              <span className="reference-badge">
                {evidenceLabels[reference.evidenceLevel][language]}
              </span>
            </div>
            <h3>{reference.title}</h3>
            <dl className="reference-details">
              {reference.authors ? (
                <div>
                  <dt>{language === "es" ? "Autores" : "Authors"}</dt>
                  <dd>{reference.authors}</dd>
                </div>
              ) : null}
              {reference.year ? (
                <div>
                  <dt>{language === "es" ? "Ano" : "Year"}</dt>
                  <dd>{reference.year}</dd>
                </div>
              ) : null}
              {reference.journalOrPublisher ? (
                <div>
                  <dt>{language === "es" ? "Revista/editorial" : "Journal/publisher"}</dt>
                  <dd>{reference.journalOrPublisher}</dd>
                </div>
              ) : null}
              {reference.sourceType ? (
                <div>
                  <dt>{t.tool.sourceType}</dt>
                  <dd>{sourceTypeLabels[reference.sourceType][language]}</dd>
                </div>
              ) : null}
              {reference.accessType ? (
                <div>
                  <dt>{t.tool.accessType}</dt>
                  <dd>{accessTypeLabels[reference.accessType][language]}</dd>
                </div>
              ) : null}
              {reference.doi ? (
                <div>
                  <dt>{t.tool.doi}</dt>
                  <dd>{reference.doi}</dd>
                </div>
              ) : null}
              {reference.pmid ? (
                <div>
                  <dt>{t.tool.pmid}</dt>
                  <dd>{reference.pmid}</dd>
                </div>
              ) : null}
            </dl>
            {reference.citation ? <p>{reference.citation}</p> : null}
            {reference.notes ? <p className="reference-notes">{reference.notes}</p> : null}
            {referenceUrl ? (
              <a className="primary-link" href={referenceUrl} rel="noreferrer" target="_blank">
                {t.tool.openSource}
              </a>
            ) : (
              <p className="muted">{t.tool.pendingLink}</p>
            )}
          </li>
        );
      })}
    </ol>
  );
}
