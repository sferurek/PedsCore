import { useEffect, useMemo, useState } from "react";
import { translations } from "../i18n/translations";
import type { Language } from "../utils/language";
import {
  fetchGlobalUsageStats,
  type CountryUsageStat,
  type GlobalUsageStats
} from "../utils/statsApi";

interface GlobalStatsPageProps {
  language: Language;
}

const fallbackStats: GlobalUsageStats = {
  status: "empty",
  minimumVisits: 5,
  totals: {
    visits: 0,
    pageviews: 0,
    countriesReached: 0,
    last7DaysVisits: 0
  },
  countries: []
};

const countryPositions: Record<string, { x: number; y: number }> = {
  AR: { x: 35, y: 73 },
  AU: { x: 83, y: 76 },
  BR: { x: 39, y: 68 },
  CA: { x: 23, y: 30 },
  CL: { x: 31, y: 78 },
  CN: { x: 73, y: 43 },
  CO: { x: 33, y: 59 },
  DE: { x: 50, y: 36 },
  ES: { x: 47, y: 43 },
  FR: { x: 48, y: 40 },
  GB: { x: 46, y: 34 },
  IN: { x: 67, y: 53 },
  IT: { x: 51, y: 43 },
  JP: { x: 82, y: 45 },
  MA: { x: 47, y: 49 },
  MX: { x: 24, y: 51 },
  PE: { x: 32, y: 66 },
  PT: { x: 45, y: 43 },
  US: { x: 25, y: 42 },
  ZA: { x: 54, y: 78 }
};

const formatNumber = (value: number, language: Language) =>
  new Intl.NumberFormat(language === "es" ? "es-ES" : "en-US").format(value);

const getStatusMessage = (
  stats: GlobalUsageStats,
  loading: boolean,
  language: Language
) => {
  const t = translations[language].stats;

  if (loading) {
    return t.loading;
  }

  if (stats.status === "disabled") {
    return t.disabled;
  }

  if (stats.status === "not_configured") {
    return t.notConfigured;
  }

  if (stats.status === "failed_to_load") {
    return t.failed;
  }

  if (stats.status === "empty" || stats.countries.length === 0) {
    return t.empty;
  }

  return null;
};

function GlobalUsageMap({ countries }: { countries: CountryUsageStat[] }) {
  const maxVisits = Math.max(...countries.map((country) => country.visits), 1);
  const plottedCountries = countries.slice(0, 30);

  return (
    <svg
      aria-hidden="true"
      className="global-usage-map"
      role="img"
      viewBox="0 0 100 54"
    >
      <rect className="map-ocean" height="54" rx="8" width="100" />
      <path
        className="map-land"
        d="M11 21c8-9 19-11 31-8 7 1 12 5 20 2 12-5 22-2 29 6-4 3-9 5-16 4-6-1-11 0-16 5-7 6-15 5-23 1-7-4-14-3-25-10Z"
      />
      <path
        className="map-land secondary"
        d="M21 34c10-2 15 4 21 9-12 5-22 2-27-5 2-2 4-3 6-4Zm39 4c8-5 19-3 25 3-6 5-18 6-28 1 0-2 1-3 3-4Z"
      />
      {plottedCountries.map((country) => {
        const position = countryPositions[country.countryCode] ?? {
          x: 50 + ((country.countryCode.charCodeAt(0) % 40) - 20),
          y: 28 + ((country.countryCode.charCodeAt(1) % 22) - 11)
        };
        const radius = 1.8 + (country.visits / maxVisits) * 5.4;

        return (
          <circle
            className="map-country-dot"
            cx={position.x}
            cy={position.y}
            key={country.countryCode}
            r={radius}
          />
        );
      })}
    </svg>
  );
}

export function GlobalStatsPage({ language }: GlobalStatsPageProps) {
  const t = translations[language];
  const [stats, setStats] = useState<GlobalUsageStats>(fallbackStats);
  const [loading, setLoading] = useState(true);
  const statusMessage = getStatusMessage(stats, loading, language);
  const thresholdMessage = t.stats.thresholdNote.replace(
    "{threshold}",
    formatNumber(stats.minimumVisits, language)
  );
  const topCountries = useMemo(() => stats.countries.slice(0, 20), [stats]);

  useEffect(() => {
    let isMounted = true;

    fetchGlobalUsageStats()
      .then((nextStats) => {
        if (isMounted) {
          setStats(nextStats);
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="page-stack global-stats-page">
      <section className="page-hero stats-hero">
        <p className="eyebrow">PedsCore analytics</p>
        <h1>{t.stats.title}</h1>
        <p>{t.stats.lead}</p>
      </section>

      <section className="stats-metric-grid" aria-label={t.stats.title}>
        <div className="stats-metric-card">
          <span>{t.stats.totalVisits}</span>
          <strong>{formatNumber(stats.totals.visits, language)}</strong>
        </div>
        <div className="stats-metric-card">
          <span>{t.stats.countriesReached}</span>
          <strong>{formatNumber(stats.totals.countriesReached, language)}</strong>
        </div>
        <div className="stats-metric-card">
          <span>{t.stats.last7DaysVisits}</span>
          <strong>{formatNumber(stats.totals.last7DaysVisits, language)}</strong>
        </div>
        <div className="stats-metric-card">
          <span>{t.stats.pageviews}</span>
          <strong>{formatNumber(stats.totals.pageviews, language)}</strong>
        </div>
      </section>

      <section className="content-panel stats-map-panel">
        <div className="section-heading">
          <h2>{t.stats.worldMap}</h2>
          <p>{thresholdMessage}</p>
        </div>
        <GlobalUsageMap countries={stats.countries} />
        {stats.updatedAt ? (
          <p className="muted">
            {t.stats.updated}: {new Date(stats.updatedAt).toLocaleString()}
          </p>
        ) : null}
      </section>

      {statusMessage ? (
        <section className="empty-state-panel">
          <h2>{statusMessage}</h2>
          <p>{thresholdMessage}</p>
        </section>
      ) : null}

      <section className="content-panel">
        <h2>{t.stats.country}</h2>
        {topCountries.length > 0 ? (
          <div className="stats-table-wrap">
            <table className="stats-country-table">
              <thead>
                <tr>
                  <th>{t.stats.country}</th>
                  <th>{t.stats.visits}</th>
                  <th>{t.stats.pageviews}</th>
                </tr>
              </thead>
              <tbody>
                {topCountries.map((country) => (
                  <tr key={country.countryCode}>
                    <td>
                      <strong>{country.countryCode}</strong>
                      <span>{country.countryName}</span>
                    </td>
                    <td>{formatNumber(country.visits, language)}</td>
                    <td>{formatNumber(country.pageviews, language)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="muted">{statusMessage ?? t.stats.empty}</p>
        )}
      </section>
    </div>
  );
}
