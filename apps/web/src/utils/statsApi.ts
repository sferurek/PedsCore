export type GlobalStatsStatus =
  | "ok"
  | "empty"
  | "not_configured"
  | "disabled"
  | "failed_to_load";

export interface CountryUsageStat {
  countryCode: string;
  countryName: string;
  visits: number;
  pageviews: number;
}

export interface GlobalUsageStats {
  status: GlobalStatsStatus;
  updatedAt?: string;
  minimumVisits: number;
  totals: {
    visits: number;
    pageviews: number;
    countriesReached: number;
    last7DaysVisits: number;
  };
  countries: CountryUsageStat[];
}

const emptyStats = (status: GlobalStatsStatus): GlobalUsageStats => ({
  status,
  minimumVisits: 5,
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
    typeof item.countryCode === "string" &&
    /^[A-Z]{2}$/.test(item.countryCode) &&
    typeof item.countryName === "string" &&
    typeof item.visits === "number" &&
    typeof item.pageviews === "number"
  );
};

export const normalizeGlobalUsageStats = (value: unknown): GlobalUsageStats => {
  const payload = value as Partial<GlobalUsageStats>;
  const countries = Array.isArray(payload.countries)
    ? payload.countries.filter(isCountryStat)
        .map((country) => ({
          countryCode: country.countryCode,
          countryName: country.countryName,
          visits: country.visits,
          pageviews: country.pageviews
        }))
    : [];
  const totals = payload.totals ?? emptyStats("empty").totals;

  return {
    status: payload.status ?? (countries.length > 0 ? "ok" : "empty"),
    updatedAt: typeof payload.updatedAt === "string" ? payload.updatedAt : undefined,
    minimumVisits:
      typeof payload.minimumVisits === "number" ? payload.minimumVisits : 5,
    totals: {
      visits: Number(totals.visits) || 0,
      pageviews: Number(totals.pageviews) || 0,
      countriesReached: Number(totals.countriesReached) || countries.length,
      last7DaysVisits: Number(totals.last7DaysVisits) || 0
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

    if (response.status === 503) {
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
