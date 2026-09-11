import { atlas } from "../../i18n/atlas";
import type { Language } from "../../utils/language";
import { Icon } from "./Icon";
/** Static, explicitly unfinished design specimen. No clinical case or engine. */
export function LearnTemplate({ language }: { language: Language }) {
  const t = atlas[language];
  return <div className="atlas-learn-template"><p className="atlas-specimen-label">{t.preview}</p><div className="atlas-template-header"><Icon name="learn" /><strong>{t.template}</strong></div><p>{t.journey}</p><div className="atlas-template-body"><div><h3>{t.patient}</h3><div className="atlas-skeleton" aria-hidden="true"><i /><i /><i /></div>{["A", "B", "C"].map(letter => <div className="atlas-choice" key={letter}><span>{letter}</span>{t.choice}<span>→</span></div>)}</div><aside><h3>{t.objectives}</h3><div className="atlas-skeleton" aria-hidden="true"><i /><i /></div><h3>{t.resources}</h3><div className="atlas-skeleton" aria-hidden="true"><i /></div></aside></div><div className="atlas-debrief">{t.feedback}</div></div>;
}
