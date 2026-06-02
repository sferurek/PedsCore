import type { Reference } from "@peds-core/core";
import { evidenceLabels, translations } from "../i18n/translations";
import type { Language } from "../utils/language";

interface ReferenceListProps {
  language: Language;
  references: Reference[];
}

export function ReferenceList({ language, references }: ReferenceListProps) {
  const t = translations[language];

  if (references.length === 0) {
    return <p className="muted">{t.tool.noReferences}</p>;
  }

  return (
    <ol className="reference-list">
      {references.map((reference) => (
        <li key={reference.id}>
          <strong>{reference.title}</strong>
          <span>{evidenceLabels[reference.evidenceLevel][language]}</span>
          {reference.citation ? <p>{reference.citation}</p> : null}
          {reference.url ? (
            <a href={reference.url} rel="noreferrer" target="_blank">
              {reference.url}
            </a>
          ) : null}
        </li>
      ))}
    </ol>
  );
}

