import type { ClinicalToolMetadata } from "@peds-core/core";
import { translations } from "../i18n/translations";
import type { Language } from "../utils/language";

interface InterpretationTableProps {
  language: Language;
  tool: ClinicalToolMetadata;
}

export function InterpretationTable({
  language,
  tool
}: InterpretationTableProps) {
  const t = translations[language];

  return (
    <section className="content-panel">
      <h2>{t.tables.interpretation}</h2>
      {tool.interpretationBands?.length ? (
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>{t.tables.range}</th>
                <th>{t.tables.category}</th>
                <th>{t.tables.description}</th>
              </tr>
            </thead>
            <tbody>
              {tool.interpretationBands.map((band) => (
                <tr key={band.id}>
                  <td>{formatRange(band.min, band.max)}</td>
                  <td>{band.label[language]}</td>
                  <td>{band.description?.[language] ?? t.tables.pending}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="empty-state">{t.tables.interpretationPending}</p>
      )}
    </section>
  );
}

const formatRange = (min?: number, max?: number): string => {
  if (min !== undefined && max !== undefined) {
    return min === max ? String(min) : `${min}-${max}`;
  }

  if (min !== undefined) {
    return `>= ${min}`;
  }

  if (max !== undefined) {
    return `<= ${max}`;
  }

  return "-";
};

