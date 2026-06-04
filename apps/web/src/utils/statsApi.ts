export type GlobalStatsStatus =
  | "ok"
  | "empty"
  | "not_configured"
  | "disabled"
  | "failed_to_load";

export interface CountryUsageStat {
  code: string;
  name: string;
  visits: number;
  pageviews: number;
}

export interface GlobalUsageStats {
  status: GlobalStatsStatus;
  configured: boolean;
  disabled: boolean;
  range: string;
  updatedAt?: string;
  minimumThreshold: number;
  totals: {
    visits: number;
    pageviews: number;
    countriesReached: number;
    last7DaysVisits: number;
  };
  countries: CountryUsageStat[];
}

interface RawCountryUsageStat {
  code?: string;
  name?: string;
  countryCode?: string;
  countryName?: string;
  visits?: number;
  pageviews?: number;
}

interface RawGlobalUsageStats {
  status?: GlobalStatsStatus;
  configured?: boolean;
  disabled?: boolean;
  range?: string;
  updatedAt?: string;
  minimumThreshold?: number;
  minimumVisits?: number;
  totalVisits?: number;
  totalPageviews?: number;
  last7DaysVisits?: number;
  countriesReached?: number;
  totals?: Partial<GlobalUsageStats["totals"]>;
  countries?: RawCountryUsageStat[];
}

const emptyStats = (status: GlobalStatsStatus): GlobalUsageStats => ({
  status,
  configured: false,
  disabled: status === "disabled",
  range: "all_time",
  minimumThreshold: 5,
  totals: {
    visits: 0,
    pageviews: 0,
    countriesReached: 0,
    last7DaysVisits: 0
  },
  countries: []
});

export const isPublicStatsEnabled = (): boolean =>
  import.meta.env.VITE_PUBLIC_STATS_ENABLED !== "false";

export const getPublicStatsEndpoint = (): string =>
  import.meta.env.VITE_PUBLIC_STATS_ENDPOINT ?? "/api/analytics/countries";

const isCountryStat = (value: unknown): value is CountryUsageStat => {
  const item = value as Partial<CountryUsageStat>;

  return (
    typeof item.code === "string" &&
    /^[A-Z]{2}$/.test(item.code) &&
    typeof item.name === "string" &&
    typeof item.visits === "number" &&
    typeof item.pageviews === "number"
  );
};

export const normalizeGlobalUsageStats = (value: unknown): GlobalUsageStats => {
  const payload = value as RawGlobalUsageStats;
  const countryRows = Array.isArray(payload.countries)
    ? payload.countries.map((country) => ({
        code: country.code ?? country.countryCode,
        name: country.name ?? country.countryName,
        visits: country.visits,
        pageviews: country.pageviews
      }))
    : [];
  const countries = countryRows.filter(isCountryStat)
        .map((country) => ({
          code: country.code,
          name: country.name,
          visits: country.visits,
          pageviews: country.pageviews
        }));
  const totals = payload.totals ?? emptyStats("empty").totals;
  const configured = payload.configured === true;
  const disabled = payload.disabled === true;
  const status: GlobalStatsStatus = disabled
    ? "disabled"
    : configured
      ? countries.length > 0
        ? "ok"
        : "empty"
      : "not_configured";

  return {
    status: payload.status ?? status,
    configured,
    disabled,
    range: typeof payload.range === "string" ? payload.range : "all_time",
    updatedAt: typeof payload.updatedAt === "string" ? payload.updatedAt : undefined,
    minimumThreshold:
      typeof payload.minimumThreshold === "number"
        ? payload.minimumThreshold
        : typeof payload.minimumVisits === "number"
          ? payload.minimumVisits
          : 5,
    totals: {
      visits: Number(payload.totalVisits ?? totals.visits) || 0,
      pageviews: Number(payload.totalPageviews ?? totals.pageviews) || 0,
      countriesReached:
        Number(payload.countriesReached ?? totals.countriesReached) || countries.length,
      last7DaysVisits:
        Number(payload.last7DaysVisits ?? totals.last7DaysVisits) || 0
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

    if (!stats.configured && !stats.disabled) {
      return { ...stats, status: "not_configured" };
    }

    if (!response.ok) {
      return { ...stats, status: "failed_to_load" };
    }

    return stats;
  } catch {
    return emptyStats("failed_to_load");
  }
};
