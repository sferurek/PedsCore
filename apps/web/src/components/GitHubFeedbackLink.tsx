import { translations } from "../i18n/translations";
import type { Language } from "../utils/language";

interface GitHubFeedbackLinkProps {
  language: Language;
}

export function GitHubFeedbackLink({ language }: GitHubFeedbackLinkProps) {
  const t = translations[language];

  return (
    <section className="feedback-box">
      <p>{t.tool.feedbackQuestion}</p>
      <div className="link-row">
        <a
          href="https://github.com/sferurek/PedsCore/issues/new/choose"
          rel="noreferrer"
          target="_blank"
        >
          {t.tool.feedbackLink}
        </a>
        <a
          href="https://github.com/sferurek/PedsCore"
          rel="noreferrer"
          target="_blank"
        >
          {t.ossSupport.viewSourceButton}
        </a>
      </div>
    </section>
  );
}
