export type GlobalStatsStatus =
  | "ok"
  | "not_configured"
  | "disabled"
  | "failed_to_load";

export type StatsProvider = "vercel" | "umami";

export interface CountryUsageStat {
  code: string;
  name: string;
  visitors: number;
  pageviews: number;
}

export interface CountryStatsRange {
  kind: "all_time" | "reporting_window";
  since?: string;
  until?: string;
}

export interface GlobalUsageStats {
  status: GlobalStatsStatus;
  configured: boolean;
  disabled: boolean;
  provider?: StatsProvider;
  metric: "visitors";
  totalsRange: "since_analytics_enabled";
  countriesRange: CountryStatsRange | null;
  updatedAt?: string;
  minimumThreshold: number;
  totals: {
    visitors: number;
    pageviews: number;
    countriesReached: number;
    last7DaysVisitors: number;
  };
  countries: CountryUsageStat[];
}

interface RawCountryUsageStat {
  code?: string;
  name?: string;
  countryCode?: string;
  countryName?: string;
  visitors?: number;
  visits?: number;
  pageviews?: number;
}

interface RawGlobalUsageStats {
  status?: string;
  configured?: boolean;
  disabled?: boolean;
  provider?: string;
  countriesRange?: CountryStatsRange | null;
  updatedAt?: string;
  minimumThreshold?: number;
  minimumVisits?: number;
  totalVisitors?: number;
  totalVisits?: number;
  totalPageviews?: number;
  last7DaysVisitors?: number;
  last7DaysVisits?: number;
  countriesReached?: number;
  totals?: {
    visitors?: number;
    visits?: number;
    pageviews?: number;
    countriesReached?: number;
    last7DaysVisitors?: number;
    last7DaysVisits?: number;
  };
  countries?: RawCountryUsageStat[];
}

const defaultStatsEndpoint = "/api/analytics/countries";

const emptyStats = (status: GlobalStatsStatus): GlobalUsageStats => ({
  status,
  configured: false,
  disabled: status === "disabled",
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
});

export const isPublicStatsEnabled = (): boolean =>
  import.meta.env.VITE_PUBLIC_STATS_ENABLED !== "false";

export const getPublicStatsEndpoint = (): string =>
  import.meta.env.VITE_PUBLIC_STATS_ENDPOINT?.trim() || defaultStatsEndpoint;

const isCountryStat = (value: unknown): value is CountryUsageStat => {
  const item = value as Partial<CountryUsageStat>;

  return (
    typeof item.code === "string" &&
    /^[A-Z]{2}$/.test(item.code) &&
    typeof item.name === "string" &&
    typeof item.visitors === "number" &&
    Number.isFinite(item.visitors) &&
    typeof item.pageviews === "number" &&
    Number.isFinite(item.pageviews)
  );
};

const normalizeProvider = (value: unknown): StatsProvider | undefined =>
  value === "vercel" || value === "umami" ? value : undefined;

const normalizeCountryRange = (value: unknown): CountryStatsRange | null => {
  const range = value as Partial<CountryStatsRange> | null;

  if (!range || (range.kind !== "all_time" && range.kind !== "reporting_window")) {
    return null;
  }

  if (range.kind === "all_time") {
    return { kind: "all_time" };
  }

  return typeof range.since === "string" && typeof range.until === "string"
    ? { kind: "reporting_window", since: range.since, until: range.until }
    : null;
};

const toFiniteCount = (value: unknown): number => {
  const count = Number(value);
  return Number.isFinite(count) && count >= 0 ? count : 0;
};

export const normalizeGlobalUsageStats = (value: unknown): GlobalUsageStats => {
  const payload = (value ?? {}) as RawGlobalUsageStats;
  const countryRows = Array.isArray(payload.countries)
    ? payload.countries.map((country) => ({
        code: country.code ?? country.countryCode,
        name: country.name ?? country.countryName,
        visitors: country.visitors ?? country.visits,
        pageviews: country.pageviews
      }))
    : [];
  const countries = countryRows.filter(isCountryStat).map((country) => ({
    code: country.code,
    name: country.name,
    visitors: country.visitors,
    pageviews: country.pageviews
  }));
  const totals = payload.totals ?? {};
  const configured = payload.configured === true;
  const disabled = payload.disabled === true;
  const status: GlobalStatsStatus = disabled
    ? "disabled"
    : !configured
      ? "not_configured"
      : payload.status === "provider_error"
        ? "failed_to_load"
        : "ok";

  return {
    status,
    configured,
    disabled,
    provider: normalizeProvider(payload.provider),
    metric: "visitors",
    totalsRange: "since_analytics_enabled",
    countriesRange: normalizeCountryRange(payload.countriesRange),
    updatedAt: typeof payload.updatedAt === "string" ? payload.updatedAt : undefined,
    minimumThreshold:
      typeof payload.minimumThreshold === "number"
        ? payload.minimumThreshold
        : typeof payload.minimumVisits === "number"
          ? payload.minimumVisits
          : 5,
    totals: {
      visitors: toFiniteCount(
        payload.totalVisitors ?? payload.totalVisits ?? totals.visitors ?? totals.visits
      ),
      pageviews: toFiniteCount(payload.totalPageviews ?? totals.pageviews),
      countriesReached: toFiniteCount(
        payload.countriesReached ?? totals.countriesReached ?? countries.length
      ),
      last7DaysVisitors: toFiniteCount(
        payload.last7DaysVisitors ??
          payload.last7DaysVisits ??
          totals.last7DaysVisitors ??
          totals.last7DaysVisits
      )
    },
    countries
  };
};

export const fetchGlobalUsageStats = async (): Promise<GlobalUsageStats> => {
  if (!isPublicStatsEnabled()) {
    return emptyStats("disabled");
  }

  try {
    const response = await fetch(getPublicStatsEndpoint(), {
      headers: { Accept: "application/json" }
    });
    const payload = await response.json().catch(() => null);
    const stats = normalizeGlobalUsageStats(payload);

    if (!response.ok) {
      return { ...stats, status: "failed_to_load" };
    }

    return stats;
  } catch {
    return emptyStats("failed_to_load");
  }
};
