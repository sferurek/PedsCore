const defaultMinimumVisits = 5;
const defaultCacheSeconds = 3600;
const maxCacheSeconds = 21600;

const jsonHeaders = {
  "Content-Type": "application/json; charset=utf-8"
};

const clampNumber = (value, fallback, minimum, maximum) => {
  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    return fallback;
  }

  return Math.min(Math.max(Math.trunc(parsed), minimum), maximum);
};

const normalizeApiUrl = (value) => value?.replace(/\/+$/, "");

const isDisabled = (env) => env.UMAMI_PUBLIC_STATS_ENABLED === "false";

export const getAnalyticsCountriesConfig = (env = process.env) => {
  if (isDisabled(env)) {
    return { enabled: false };
  }

  const apiUrl = normalizeApiUrl(env.UMAMI_API_URL);
  const websiteId = env.UMAMI_WEBSITE_ID;
  const apiToken = env.UMAMI_API_TOKEN;

  if (!apiUrl || !websiteId || !apiToken) {
    return { enabled: false };
  }

  return {
    apiUrl,
    websiteId,
    apiToken,
    enabled: true,
    minimumVisits: clampNumber(
      env.UMAMI_COUNTRY_MIN_VISITS,
      defaultMinimumVisits,
      1,
      1000
    ),
    cacheSeconds: clampNumber(
      env.UMAMI_STATS_CACHE_SECONDS,
      defaultCacheSeconds,
      60,
      maxCacheSeconds
    ),
    startAt: Number.isFinite(Number(env.UMAMI_STATS_START_AT))
      ? Number(env.UMAMI_STATS_START_AT)
      : undefined
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

const sumSeries = (series) =>
  Array.isArray(series)
    ? series.reduce((total, item) => total + (Number(item?.y) || 0), 0)
    : 0;

export const normalizeCountryRows = (rows, minimumVisits) =>
  (Array.isArray(rows) ? rows : [])
    .map((row) => {
      const countryCode = normalizeCountryCode(row?.name ?? row?.x);
      const visits = Number(row?.visits ?? row?.y ?? 0) || 0;
      const pageviews = Number(row?.pageviews ?? visits) || 0;

      if (!countryCode || visits < minimumVisits) {
        return null;
      }

      return {
        countryCode,
        countryName: getCountryName(countryCode) ?? countryCode,
        visits,
        pageviews
      };
    })
    .filter(Boolean)
    .sort((a, b) => b.visits - a.visits || a.countryCode.localeCompare(b.countryCode));

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

const buildPublicStats = async (config) => {
  const endAt = Date.now();
  const last7StartAt = endAt - 7 * 24 * 60 * 60 * 1000;
  const allTimeStartAt = config.startAt ?? 0;
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

  const countries = normalizeCountryRows(countryRows, config.minimumVisits);
  const totalVisits = Number(allTimeStats?.visits ?? 0) || 0;
  const totalPageviews = Number(allTimeStats?.pageviews ?? 0) || 0;
  const last7DaysVisits = Number(last7Stats?.visits ?? 0) || 0;

  return {
    status: countries.length > 0 ? "ok" : "empty",
    updatedAt: new Date(endAt).toISOString(),
    minimumVisits: config.minimumVisits,
    totals: {
      visits: totalVisits,
      pageviews: totalPageviews,
      countriesReached: countries.length,
      last7DaysVisits
    },
    countries
  };
};

const sendJson = (res, statusCode, body, cacheSeconds = 0) => {
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

  res.end(JSON.stringify(body));
};

export default async function handler(req, res) {
  if (req.method && req.method !== "GET" && req.method !== "HEAD") {
    sendJson(res, 405, { status: "method_not_allowed" });
    return;
  }

  const config = getAnalyticsCountriesConfig();

  if (!config.enabled) {
    sendJson(res, 503, {
      status: "not_configured",
      minimumVisits: defaultMinimumVisits,
      totals: {
        visits: 0,
        pageviews: 0,
        countriesReached: 0,
        last7DaysVisits: 0
      },
      countries: []
    });
    return;
  }

  try {
    const stats = await buildPublicStats(config);
    sendJson(res, 200, stats, config.cacheSeconds);
  } catch {
    sendJson(res, 502, {
      status: "failed_to_load",
      minimumVisits: config.minimumVisits,
      totals: {
        visits: 0,
        pageviews: 0,
        countriesReached: 0,
        last7DaysVisits: 0
      },
      countries: []
    });
  }
}

export const __private__ = {
  normalizeCountryRows,
  sumSeries
};
