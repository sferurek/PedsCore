const defaultCacheSeconds = 1800;
const maxCacheSeconds = 21600;
const vercelApiUrl = "https://api.vercel.com";

const toIsoDate = (timestamp) => new Date(timestamp).toISOString().slice(0, 10);

const getConfig = (env = process.env) => {
  const accessToken = env.VERCEL_ACCESS_TOKEN ?? env.VERCEL_TOKEN;
  const projectId = env.VERCEL_ANALYTICS_PROJECT_ID ?? env.VERCEL_PROJECT_ID;

  if (!accessToken || !projectId) {
    return { enabled: false };
  }

  return {
    enabled: true,
    accessToken,
    projectId,
    teamId: env.VERCEL_ANALYTICS_TEAM_ID ?? env.VERCEL_TEAM_ID,
    teamSlug:
      env.VERCEL_ANALYTICS_TEAM_ID || env.VERCEL_TEAM_ID
        ? undefined
        : env.VERCEL_ANALYTICS_TEAM_SLUG,
    cacheSeconds: defaultCacheSeconds
  };
};

const toVercelUrl = (config, path, params) => {
  const url = new URL(`${vercelApiUrl}${path}`);
  url.searchParams.set("projectId", config.projectId);

  if (config.teamId) url.searchParams.set("teamId", config.teamId);
  if (config.teamSlug) url.searchParams.set("slug", config.teamSlug);

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) url.searchParams.set(key, String(value));
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

const normalizePath = (row) =>
  [row?.path, row?.key, row?.name, row?.x].find(
    (value) => typeof value === "string" && value.startsWith("/")
  );

const normalizeCount = (row) => {
  const candidates = [row?.pageviews, row?.views, row?.visitors, row?.visits, row?.y];

  for (const value of candidates) {
    const parsed = Number(value);
    if (Number.isFinite(parsed) && parsed >= 0) return parsed;
  }

  return 0;
};

export const normalizePopularToolRows = (rows, limit = 5) => {
  const totals = new Map();

  for (const row of Array.isArray(rows) ? rows : []) {
    const path = normalizePath(row);
    if (!path) continue;

    const match = path.match(/^\/(?:es|en)\/tools\/([^/?#]+)\/?$/);
    if (!match) continue;

    const slug = decodeURIComponent(match[1]);
    totals.set(slug, (totals.get(slug) ?? 0) + normalizeCount(row));
  }

  return [...totals.entries()]
    .map(([slug, count]) => ({ slug, count }))
    .filter((item) => item.count > 0)
    .sort((a, b) => b.count - a.count || a.slug.localeCompare(b.slug))
    .slice(0, limit);
};

const sendJson = (req, res, statusCode, body, cacheSeconds = 0) => {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");

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
    sendJson(req, res, 405, { status: "method_not_allowed", tools: [] });
    return;
  }

  const config = getConfig();

  if (!config.enabled) {
    sendJson(req, res, 200, {
      status: "not_configured",
      configured: false,
      rangeDays: 30,
      tools: []
    });
    return;
  }

  const until = toIsoDate(Date.now());
  const since = toIsoDate(Date.now() - 30 * 24 * 60 * 60 * 1000);

  try {
    const payload = await fetchVercelJson(
      toVercelUrl(config, "/v1/query/web-analytics/visits/aggregate", {
        since,
        until,
        by: "path",
        limit: 500
      }),
      config.accessToken
    );

    sendJson(
      req,
      res,
      200,
      {
        status: "ok",
        configured: true,
        rangeDays: 30,
        updatedAt: new Date().toISOString(),
        tools: normalizePopularToolRows(payload?.data, 5)
      },
      config.cacheSeconds
    );
  } catch (error) {
    console.error(
      "Popular-tools analytics request failed",
      error instanceof Error ? error.message : "unknown error"
    );

    sendJson(req, res, 502, {
      status: "provider_error",
      configured: true,
      rangeDays: 30,
      tools: []
    });
  }
}
