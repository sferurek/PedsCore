import type { ClinicalToolMetadata } from "@peds-core/core";
import { translations } from "../i18n/translations";
import type { Language } from "../utils/language";

interface ScoringTableProps {
  language: Language;
  tool: ClinicalToolMetadata;
}

export function ScoringTable({ language, tool }: ScoringTableProps) {
  const t = translations[language];

  return (
    <section className="content-panel">
      <h2>{t.tables.scoring}</h2>
      {tool.scoringTable?.length ? (
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>{t.tables.variable}</th>
                <th>{t.tables.scoreOrValue}</th>
                <th>{t.tables.description}</th>
              </tr>
            </thead>
            <tbody>
              {tool.scoringTable.map((row) => (
                <tr key={row.id}>
                  <td>{row.variable[language]}</td>
                  <td>{row.score ?? row.value ?? "-"}</td>
                  <td>{row.description[language]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="empty-state">{t.tables.scoringPending}</p>
      )}
    </section>
  );
}

