const defaultMinimumVisits = 5;
const defaultCacheSeconds = 3600;
const maxCacheSeconds = 21600;
const defaultRangeName = "all_time";

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

const emptyResponse = ({
  configured,
  disabled = false,
  range = defaultRangeName
}) => ({
  configured,
  disabled,
  range,
  totalVisits: 0,
  totalPageviews: 0,
  last7DaysVisits: 0,
  countriesReached: 0,
  countries: []
});

export const getAnalyticsCountriesConfig = (env = process.env) => {
  if (isDisabled(env)) {
    return { enabled: false, disabled: true };
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
    minimumThreshold: clampNumber(
      env.UMAMI_COUNTRY_MIN_THRESHOLD,
      defaultMinimumVisits,
      1,
      1000
    ),
    cacheSeconds: clampNumber(
      env.UMAMI_COUNTRY_CACHE_SECONDS,
      defaultCacheSeconds,
      60,
      maxCacheSeconds
    )
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
      const code = normalizeCountryCode(row?.code ?? row?.countryCode ?? row?.name ?? row?.x);
      const visits = getFirstNumber(row?.visits, row?.visitors, row?.sessions, row?.y);
      const pageviews = getFirstNumber(row?.pageviews, row?.views, visits);

      if (!code || visits < minimumThreshold) {
        return null;
      }

      return {
        code,
        name: getCountryName(code) ?? code,
        visits,
        pageviews
      };
    })
    .filter(Boolean)
    .sort((a, b) => b.visits - a.visits || a.code.localeCompare(b.code));

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
  const totalVisits = getFirstNumber(allTimeStats?.visits, allTimeStats?.visitors);
  const totalPageviews = getFirstNumber(allTimeStats?.pageviews, totalVisits);
  const last7DaysVisits = getFirstNumber(last7Stats?.visits, last7Stats?.visitors);

  return {
    configured: true,
    disabled: false,
    range: defaultRangeName,
    totalVisits,
    totalPageviews,
    last7DaysVisits,
    countriesReached: countries.length,
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
    sendJson(
      res,
      200,
      emptyResponse({
        configured: false,
        disabled: Boolean(config.disabled)
      })
    );
    return;
  }

  try {
    const stats = await buildPublicStats(config);
    sendJson(res, 200, stats, config.cacheSeconds);
  } catch {
    sendJson(
      res,
      502,
      emptyResponse({
        configured: true,
        range: defaultRangeName
      })
    );
  }
}

export const __private__ = {
  normalizeCountryRows
};
