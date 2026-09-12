import { naturalEarthCountries } from "../data/naturalEarth50m";
import { getCountryGeometry } from "../utils/globalMap";
import type { CountryUsageStat } from "../utils/statsApi";
import type { Language } from "../utils/language";

const formatNumber = (value: number, language: Language) =>
  new Intl.NumberFormat(language === "es" ? "es-ES" : "en-US").format(value);

export default function GlobalUsageMap({ countries, language }: { countries: CountryUsageStat[]; language: Language }) {
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
