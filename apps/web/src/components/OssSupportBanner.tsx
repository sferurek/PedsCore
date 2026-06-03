import { translations } from "../i18n/translations";
import type { Language } from "../utils/language";

interface OssSupportBannerProps {
  language: Language;
}

export function OssSupportBanner({ language }: OssSupportBannerProps) {
  const t = translations[language];

  return (
    <section className="oss-support-banner" aria-label="Open source support">
      <p className="oss-support-message">{t.ossSupport.message}</p>
      <div className="oss-support-actions">
        <a
          className="oss-support-link"
          href="https://github.com/sferurek/PedsCore"
          rel="noreferrer"
          target="_blank"
        >
          {t.ossSupport.starButton}
        </a>
        <a
          className="oss-support-link subtle"
          href="https://github.com/sferurek/PedsCore/issues/new/choose"
          rel="noreferrer"
          target="_blank"
        >
          {t.ossSupport.feedbackButton}
        </a>
      </div>
    </section>
  );
}
