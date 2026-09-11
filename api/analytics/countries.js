const defaultMinimumVisitors = 5;
const defaultCacheSeconds = 3600;
const defaultVercelCountryRangeDays = 30;
const maxCacheSeconds = 21600;
const totalsRangeName = "since_analytics_enabled";
const vercelApiUrl = "https://api.vercel.com";

const jsonHeaders = {
  "Content-Type": "application/json; charset=utf-8"
};

const clampNumber = (value, fallback, minimum, maximum) => {
  if (typeof value === "string" && value.trim() === "") {
    return fallback;
  }

  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    return fallback;
  }

  return Math.min(Math.max(Math.trunc(parsed), minimum), maximum);
};

const normalizeApiUrl = (value) => value?.replace(/\/+$/, "");

const normalizeIsoDate = (value) => {
  const normalized = typeof value === "string" ? value.trim() : "";
  return /^\d{4}-\d{2}-\d{2}$/.test(normalized) ? normalized : undefined;
};

const isDisabled = (env) =>
  env.ANALYTICS_PUBLIC_STATS_ENABLED === "false" ||
  env.UMAMI_PUBLIC_STATS_ENABLED === "false";

const normalizeStatsProvider = (value) =>
  value === "umami" || value === "vercel" ? value : "auto";

const emptyResponse = ({
  configured,
  disabled = false,
  provider = "vercel",
  minimumThreshold = defaultMinimumVisitors,
  status = configured ? "provider_error" : disabled ? "disabled" : "not_configured"
}) => ({
  status,
  configured,
  disabled,
  provider,
  metric: "visitors",
  totalsRange: totalsRangeName,
  countriesRange: null,
  minimumThreshold,
  totalVisitors: 0,
  totalPageviews: 0,
  last7DaysVisitors: 0,
  countriesReached: 0,
  countries: []
});

export const getAnalyticsCountriesConfig = (env = process.env) => {
  const statsProvider = normalizeStatsProvider(env.ANALYTICS_STATS_PROVIDER);
  const selectedProvider = statsProvider === "umami" ? "umami" : "vercel";

  if (isDisabled(env)) {
    return {
      enabled: false,
      disabled: true,
      provider: selectedProvider
    };
  }

  const commonConfig = {
    minimumThreshold: clampNumber(
      env.ANALYTICS_COUNTRY_MIN_THRESHOLD ?? env.UMAMI_COUNTRY_MIN_THRESHOLD,
      defaultMinimumVisitors,
      1,
      1000
    ),
    cacheSeconds: clampNumber(
      env.ANALYTICS_COUNTRY_CACHE_SECONDS ?? env.UMAMI_COUNTRY_CACHE_SECONDS,
      defaultCacheSeconds,
      60,
      maxCacheSeconds
    )
  };

  const vercelAccessToken = env.VERCEL_ACCESS_TOKEN ?? env.VERCEL_TOKEN;
  const vercelProjectId =
    env.VERCEL_ANALYTICS_PROJECT_ID ?? env.VERCEL_PROJECT_ID;

  if (
    (statsProvider === "vercel" || statsProvider === "auto") &&
    vercelAccessToken &&
    vercelProjectId
  ) {
    return {
      ...commonConfig,
      provider: "vercel",
      apiUrl: vercelApiUrl,
      accessToken: vercelAccessToken,
      projectId: vercelProjectId,
      teamId: env.VERCEL_ANALYTICS_TEAM_ID ?? env.VERCEL_TEAM_ID,
      teamSlug:
        env.VERCEL_ANALYTICS_TEAM_ID || env.VERCEL_TEAM_ID
          ? undefined
          : env.VERCEL_ANALYTICS_TEAM_SLUG,
      countrySince: normalizeIsoDate(env.VERCEL_ANALYTICS_COUNTRY_SINCE),
      enabled: true
    };
  }

  const apiUrl = normalizeApiUrl(env.UMAMI_API_URL);
  const websiteId = env.UMAMI_WEBSITE_ID;
  const apiToken = env.UMAMI_API_TOKEN;

  if (
    (statsProvider === "umami" || statsProvider === "auto") &&
    apiUrl &&
    websiteId &&
    apiToken
  ) {
    return {
      ...commonConfig,
      provider: "umami",
      apiUrl,
      websiteId,
      apiToken,
      enabled: true
    };
  }

  if (!apiUrl || !websiteId || !apiToken) {
    return { enabled: false, provider: selectedProvider };
  }

  return {
    enabled: false,
    provider: selectedProvider
  };
};

const toUrl = (config, path, params) => {
  const url = new URL(`${config.apiUrl}${path}`);

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) {
      url.searchParams.set(key, String(value));
    }
  }

  return url;
};

const getCountryName = (countryCode) => {
  try {
    return new Intl.DisplayNames(["en"], { type: "region" }).of(countryCode);
  } catch {
    return countryCode;
  }
};

const normalizeCountryCode = (value) => {
  if (typeof value !== "string") {
    return null;
  }

  const normalized = value.trim().toUpperCase();

  return /^[A-Z]{2}$/.test(normalized) ? normalized : null;
};

const getFirstNumber = (...values) => {
  for (const value of values) {
    const parsed = Number(value);

    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return 0;
};

export const normalizeCountryRows = (rows, minimumThreshold) =>
  (Array.isArray(rows) ? rows : [])
    .map((row) => {
      const code = normalizeCountryCode(
        row?.code ?? row?.countryCode ?? row?.country ?? row?.name ?? row?.x
      );
      const visitors = getFirstNumber(
        row?.visitors,
        row?.visits,
        row?.sessions,
        row?.y
      );
      const pageviews = getFirstNumber(row?.pageviews, row?.views, visitors);

      if (!code || visitors < minimumThreshold) {
        return null;
      }

      return {
        code,
        name: getCountryName(code) ?? code,
        visitors,
        pageviews
      };
    })
    .filter(Boolean)
    .sort((a, b) => b.visitors - a.visitors || a.code.localeCompare(b.code));

const fetchUmamiJson = async (url, apiToken) => {
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${apiToken}`
    }
  });

  if (!response.ok) {
    throw new Error(`Umami request failed: ${response.status}`);
  }

  return response.json();
};

const buildUmamiPublicStats = async (config) => {
  const endAt = Date.now();
  const last7StartAt = endAt - 7 * 24 * 60 * 60 * 1000;
  const allTimeStartAt = 0;
  const websitePath = `/api/websites/${encodeURIComponent(config.websiteId)}`;

  const [countryRows, allTimeStats, last7Stats] = await Promise.all([
    fetchUmamiJson(
      toUrl(config, `${websitePath}/metrics/expanded`, {
        startAt: allTimeStartAt,
        endAt,
        type: "country",
        limit: 500
      }),
      config.apiToken
    ),
    fetchUmamiJson(
      toUrl(config, `${websitePath}/stats`, {
        startAt: allTimeStartAt,
        endAt
      }),
      config.apiToken
    ),
    fetchUmamiJson(
      toUrl(config, `${websitePath}/stats`, {
        startAt: last7StartAt,
        endAt
      }),
      config.apiToken
    )
  ]);

  const countries = normalizeCountryRows(countryRows, config.minimumThreshold);
  const countriesReached = normalizeCountryRows(countryRows, 1).length;
  const totalVisitors = getFirstNumber(allTimeStats?.visitors, allTimeStats?.visits);
  const totalPageviews = getFirstNumber(allTimeStats?.pageviews, totalVisitors);
  const last7DaysVisitors = getFirstNumber(last7Stats?.visitors, last7Stats?.visits);

  return {
    status: "ok",
    configured: true,
    disabled: false,
    provider: "umami",
    metric: "visitors",
    totalsRange: totalsRangeName,
    countriesRange: { kind: "all_time" },
    minimumThreshold: config.minimumThreshold,
    totalVisitors,
    totalPageviews,
    last7DaysVisitors,
    countriesReached,
    updatedAt: new Date(endAt).toISOString(),
    countries
  };
};

const toIsoDate = (timestamp) => new Date(timestamp).toISOString().slice(0, 10);

const toVercelUrl = (config, path, params) => {
  const url = new URL(`${config.apiUrl}${path}`);

  url.searchParams.set("projectId", config.projectId);

  if (config.teamId) {
    url.searchParams.set("teamId", config.teamId);
  }

  if (config.teamSlug) {
    url.searchParams.set("slug", config.teamSlug);
  }

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) {
      url.searchParams.set(key, String(value));
    }
  }

  return url;
};

const fetchVercelJson = async (url, accessToken) => {
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`
    }
  });

  if (!response.ok) {
    throw new Error(`Vercel Web Analytics request failed: ${response.status}`);
  }

  return response.json();
};

const buildVercelPublicStats = async (config) => {
  const endAt = Date.now();
  const last7StartAt = endAt - 7 * 24 * 60 * 60 * 1000;
  const defaultCountrySince = toIsoDate(
    endAt - defaultVercelCountryRangeDays * 24 * 60 * 60 * 1000
  );
  const countrySince = config.countrySince ?? defaultCountrySince;
  const countryUntil = toIsoDate(endAt);

  const [countryMetrics, allTimeStats, last7Stats] = await Promise.all([
    fetchVercelJson(
      toVercelUrl(config, "/v1/query/web-analytics/visits/aggregate", {
        since: countrySince,
        until: countryUntil,
        by: "country",
        limit: 100
      }),
      config.accessToken
    ),
    fetchVercelJson(
      toVercelUrl(config, "/v1/query/web-analytics/visits/count", {}),
      config.accessToken
    ),
    fetchVercelJson(
      toVercelUrl(config, "/v1/query/web-analytics/visits/count", {
        since: toIsoDate(last7StartAt),
        until: countryUntil
      }),
      config.accessToken
    )
  ]);

  const countries = normalizeCountryRows(countryMetrics?.data, config.minimumThreshold);
  const countriesReached = normalizeCountryRows(countryMetrics?.data, 1).length;
  const totalVisitors = getFirstNumber(allTimeStats?.data?.visitors);
  const totalPageviews = getFirstNumber(allTimeStats?.data?.pageviews, totalVisitors);
  const last7DaysVisitors = getFirstNumber(last7Stats?.data?.visitors);

  return {
    status: "ok",
    configured: true,
    disabled: false,
    provider: "vercel",
    metric: "visitors",
    totalsRange: totalsRangeName,
    countriesRange: {
      kind: "reporting_window",
      since: countrySince,
      until: countryUntil
    },
    minimumThreshold: config.minimumThreshold,
    totalVisitors,
    totalPageviews,
    last7DaysVisitors,
    countriesReached,
    updatedAt: new Date(endAt).toISOString(),
    countries
  };
};

const sendJson = (req, res, statusCode, body, cacheSeconds = 0) => {
  res.statusCode = statusCode;

  for (const [key, value] of Object.entries(jsonHeaders)) {
    res.setHeader(key, value);
  }

  if (cacheSeconds > 0) {
    res.setHeader(
      "Cache-Control",
      `public, s-maxage=${cacheSeconds}, stale-while-revalidate=${maxCacheSeconds}`
    );
  } else {
    res.setHeader("Cache-Control", "no-store");
  }

  res.end(req.method === "HEAD" ? undefined : JSON.stringify(body));
};

export default async function handler(req, res) {
  if (req.method && req.method !== "GET" && req.method !== "HEAD") {
    sendJson(req, res, 405, { status: "method_not_allowed" });
    return;
  }

  const config = getAnalyticsCountriesConfig();

  if (!config.enabled) {
    sendJson(
      req,
      res,
      200,
      emptyResponse({
        configured: false,
        disabled: Boolean(config.disabled),
        provider: config.provider
      })
    );
    return;
  }

  try {
    const stats =
      config.provider === "vercel"
        ? await buildVercelPublicStats(config)
        : await buildUmamiPublicStats(config);
    sendJson(req, res, 200, stats, config.cacheSeconds);
  } catch (error) {
    console.error(
      "Analytics provider request failed",
      error instanceof Error ? error.message : "unknown error"
    );
    sendJson(
      req,
      res,
      502,
      emptyResponse({
        configured: true,
        provider: config.provider,
        minimumThreshold: config.minimumThreshold
      })
    );
  }
}

export const __private__ = {
  normalizeCountryRows
};
