import { useEffect, useState, type MouseEvent } from "react";
import { translations } from "../i18n/translations";
import { atlas } from "../i18n/atlas";
import type { Language } from "../utils/language";
import { makePath } from "../utils/routes";
import {
  fetchGlobalUsageStats,
  type GlobalUsageStats
} from "../utils/statsApi";

interface FooterProps {
  language: Language;
  navigate?: (href: string) => void;
  minimal?: boolean;
}

const formatUsageCount = (value: number, language: Language): string =>
  new Intl.NumberFormat(language === "es" ? "es-ES" : "en-US").format(value);

const shouldShowUsageSummary = (stats: GlobalUsageStats): boolean =>
  stats.status === "ok" && stats.configured && !stats.disabled;

const clinicalReviewLabel = (language: Language): string =>
  language === "es"
    ? "Última revisión clínica: 18 de septiembre de 2026"
    : "Last clinical review: September 18, 2026";

interface FooterUsageSummaryContentProps {
  language: Language;
  navigate?: (href: string) => void;
  stats: GlobalUsageStats;
}

export function FooterUsageSummaryContent({
  language,
  navigate,
  stats
}: FooterUsageSummaryContentProps) {
  if (!shouldShowUsageSummary(stats)) return null;

  const t = translations[language].footer;
  const href = makePath(language, "stats", "global");
  const summary = t.usageSummary
    .replace("{last7DaysVisitors}", formatUsageCount(stats.totals.last7DaysVisitors, language))
    .replace("{totalVisitors}", formatUsageCount(stats.totals.visitors, language));

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!navigate) return;
    event.preventDefault();
    navigate(href);
  };

  return (
    <div className="footer-usage-summary">
      <span className="eyebrow">{atlas[language].usageEyebrow}</span>
      <p><span>{summary}</span>{" "}<a href={href} onClick={handleClick}>{t.usageSummaryLink}</a></p>
    </div>
  );
}

function FooterUsageSummary({ language, navigate }: Pick<FooterProps, "language" | "navigate">) {
  const [stats, setStats] = useState<GlobalUsageStats | null>(null);

  useEffect(() => {
    let isMounted = true;
    fetchGlobalUsageStats().then((nextStats) => {
      if (isMounted && shouldShowUsageSummary(nextStats)) setStats(nextStats);
    });
    return () => { isMounted = false; };
  }, []);

  if (!stats) return null;
  return <FooterUsageSummaryContent language={language} navigate={navigate} stats={stats} />;
}

export function Footer({ language, navigate, minimal = false }: FooterProps) {
  const t = translations[language];

  if (minimal) {
    return (
      <footer className="site-footer pram-minimal-footer">
        <span>© 2026 PedsCore · {clinicalReviewLabel(language)}</span>
        <nav aria-label={language === "es" ? "Enlaces legales y de transparencia" : "Legal and transparency links"}>
          {navigate ? (
            <>
              <button className="text-link" type="button" onClick={() => navigate(makePath(language, "disclaimer"))}>{t.nav.disclaimer}</button>
              <button className="text-link" type="button" onClick={() => navigate(makePath(language, "evidence"))}>{t.nav.evidence}</button>
            </>
          ) : null}
          <a href="https://github.com/sferurek/PedsCore" rel="noreferrer" target="_blank">GitHub</a>
        </nav>
      </footer>
    );
  }

  return (
    <footer className="site-footer">
      <div>
        <p className="footer-brand">PedsCore · 2026 · {t.footer.alpha}</p>
        <p>{t.pages.disclaimerBody}</p>
      </div>
      <FooterUsageSummary language={language} navigate={navigate} />
      <div className="footer-notes">
        <span>{t.footer.mit}</span>
        <span>{t.footer.whoLicense}</span>
        <span>{t.footer.noClinicalStorage}</span>
        <span>{clinicalReviewLabel(language)}</span>
      </div>
      <div className="footer-links">
        {navigate ? (
          <>
            <button className="text-link" type="button" onClick={() => navigate(makePath(language, "evidence"))}>{t.nav.evidence}</button>
            <button className="text-link" type="button" onClick={() => navigate(makePath(language, "stats", "global"))}>{t.nav.stats}</button>
            <button className="text-link" type="button" onClick={() => navigate(makePath(language, "disclaimer"))}>{t.nav.disclaimer}</button>
          </>
        ) : null}
        <a href="https://github.com/sferurek/PedsCore" rel="noreferrer" target="_blank">{t.common.github}</a>
        <a href="https://github.com/sferurek/PedsCore" rel="noreferrer" target="_blank">{t.ossSupport.viewSourceButton}</a>
      </div>
    </footer>
  );
}
