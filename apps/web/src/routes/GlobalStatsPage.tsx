import { useEffect, useMemo, useState } from "react";
import { translations } from "../i18n/translations";
import type { Language } from "../utils/language";
import {
  fetchGlobalUsageStats,
  type CountryUsageStat,
  type GlobalUsageStats
} from "../utils/statsApi";
import { naturalEarthCountries } from "../data/naturalEarth50m";
import { getCountryGeometry } from "../utils/globalMap";

interface GlobalStatsPageProps {
  language: Language;
}

const fallbackStats: GlobalUsageStats = {
  status: "not_configured",
  configured: false,
  disabled: false,
  metric: "visitors",
  totalsRange: "since_analytics_enabled",
  countriesRange: null,
  minimumThreshold: 5,
  totals: {
    visitors: 0,
    pageviews: 0,
    countriesReached: 0,
    last7DaysVisitors: 0
  },
  countries: []
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

  if (stats.status === "ok" && stats.countries.length === 0) {
    return t.empty;
  }

  return null;
};

function GlobalUsageMap({ countries, language }: { countries: CountryUsageStat[]; language: Language }) {
  const activeCountries = countries.filter((country) => getCountryGeometry(country.code)).slice(0, 30);
  const maxVisitors = Math.max(...activeCountries.map((country) => country.visitors), 1);
  const formatVisitors = (country: CountryUsageStat) =>
    `${country.name} — ${formatNumber(country.visitors, language)} ${language === "es" ? "visitantes" : "visitors"}`;

  return (
    <svg
      aria-label={language === "es" ? "Mapa mundial de países con visitas" : "World map of countries with visitors"}
      className="global-usage-map"
      role="img"
      viewBox="0 0 960 520"
    >
      <rect className="map-ocean" height="520" rx="16" width="960" />
      <g className="map-country-layer">
        {naturalEarthCountries.map((country, index) => {
          const active = countries.find((item) => item.code === country.code);
          return (
            <path className={`map-country ${active ? "is-active" : ""}`} d={country.path} key={`${country.code}-${index}`}>
              {active ? <title>{formatVisitors(active)}</title> : null}
            </path>
          );
        })}
      </g>
      {activeCountries.map((country) => {
        const geometry = getCountryGeometry(country.code);
        if (!geometry) return null;
        const radius = 3 + (country.visitors / maxVisitors) * 5;
        return (
          <g className="map-country-marker" key={`marker-${country.code}`}>
            <circle className="map-country-dot" cx={geometry.x} cy={geometry.y} r={radius}>
              <title>{formatVisitors(country)}</title>
            </circle>
            <circle className="map-country-core" cx={geometry.x} cy={geometry.y} r="2" />
          </g>
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
    formatNumber(stats.minimumThreshold, language)
  );
  const countryRangeMessage =
    stats.countriesRange?.kind === "reporting_window" &&
    stats.countriesRange.since &&
    stats.countriesRange.until
      ? t.stats.countryRange
          .replace("{since}", stats.countriesRange.since)
          .replace("{until}", stats.countriesRange.until)
      : null;
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
        <p className="eyebrow">{t.stats.eyebrow}</p>
        <h1>{t.stats.title}</h1>
        <p>{t.stats.lead}</p>
      </section>

      <section className="stats-metric-grid" aria-label={t.stats.title}>
        <div className="stats-metric-card">
          <span>{t.stats.totalVisitors}</span>
          <strong>{formatNumber(stats.totals.visitors, language)}</strong>
        </div>
        <div className="stats-metric-card">
          <span>{t.stats.countriesReached}</span>
          <strong>{formatNumber(stats.totals.countriesReached, language)}</strong>
        </div>
        <div className="stats-metric-card">
          <span>{t.stats.last7DaysVisitors}</span>
          <strong>{formatNumber(stats.totals.last7DaysVisitors, language)}</strong>
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
          {countryRangeMessage ? <p>{countryRangeMessage}</p> : null}
        </div>
        <GlobalUsageMap countries={stats.countries} language={language} />
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
                  <th>{t.stats.visitors}</th>
                  <th>{t.stats.pageviews}</th>
                </tr>
              </thead>
              <tbody>
                {topCountries.map((country) => (
                  <tr key={country.code}>
                    <td>
                      <strong>{country.code}</strong>
                      <span>{country.name}</span>
                    </td>
                    <td>{formatNumber(country.visitors, language)}</td>
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
