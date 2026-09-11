import { useEffect, useState } from "react";
import { fetchGlobalUsageStats, type GlobalUsageStats } from "../../utils/statsApi";
import { translations } from "../../i18n/translations";
import { atlas } from "../../i18n/atlas";
import type { Language } from "../../utils/language";
import { makePath } from "../../utils/routes";
export function UsageStrip({ language, navigate }: { language: Language; navigate: (path: string) => void }) {
  const [stats, setStats] = useState<GlobalUsageStats | null>(null);
  useEffect(() => { let active = true; fetchGlobalUsageStats().then(data => { if (active) setStats(data); }); return () => { active = false; }; }, []);
  const t = translations[language].stats;
  const ready = stats?.status === "ok" && stats.configured && !stats.disabled;
  const message = !stats ? t.loading : stats.status === "disabled" ? t.disabled : stats.status === "not_configured" ? t.notConfigured : t.failed;
  return <section className="atlas-usage" aria-label={t.title}><div><span className="eyebrow">PEDSCORE / GLOBAL</span><strong>{atlas[language].usage}</strong></div>{ready ? <><div><strong>{stats.totals.visitors.toLocaleString(language)}</strong><span>{t.totalVisitors}</span></div><div><strong>{stats.totals.last7DaysVisitors.toLocaleString(language)}</strong><span>{t.last7DaysVisitors}</span></div></> : <p role="status">{message}</p>}<button className="atlas-text-link" type="button" onClick={() => navigate(makePath(language, "stats", "global"))}>{translations[language].nav.stats} →</button></section>;
}
