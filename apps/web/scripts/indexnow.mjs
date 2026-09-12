import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
  getCanonicalSeoEntries,
  productionBaseUrl,
  toCanonicalUrl
} from "./seo-routes.mjs";

export const indexNowConfig = {
  endpoint: "https://api.indexnow.org/indexnow",
  host: "peds-core.vercel.app",
  key: "5845ab92b382405cbba356bf63969310",
  keyLocation: `${productionBaseUrl}/5845ab92b382405cbba356bf63969310.txt`
};

export const getCanonicalIndexNowUrls = (tools) =>
  getCanonicalSeoEntries(tools).map((entry) => toCanonicalUrl(entry.path));

export const validateIndexNowUrls = (urls, canonicalUrls) => {
  const canonicalSet = new Set(canonicalUrls);
  const uniqueUrls = [...new Set(urls)];

  for (const value of uniqueUrls) {
    const url = new URL(value);
    if (url.protocol !== "https:" || url.host !== indexNowConfig.host) {
      throw new Error(`IndexNow URL must use the production host: ${value}`);
    }
    if (url.pathname === "/api" || url.pathname.startsWith("/api/")) {
      throw new Error(`IndexNow URL cannot target the API: ${value}`);
    }
    if (!canonicalSet.has(value)) {
      throw new Error(`IndexNow URL is not in the canonical route source: ${value}`);
    }
  }

  if (uniqueUrls.length === 0) {
    throw new Error("IndexNow requires at least one canonical URL");
  }

  return uniqueUrls;
};

export const buildIndexNowPayload = (urls) => ({
  host: indexNowConfig.host,
  key: indexNowConfig.key,
  keyLocation: indexNowConfig.keyLocation,
  urlList: urls
});

export const submitIndexNow = async (urls, fetchImpl = fetch) => {
  let response;
  try {
    response = await fetchImpl(indexNowConfig.endpoint, {
      method: "POST",
      headers: { "content-type": "application/json; charset=utf-8" },
      body: JSON.stringify(buildIndexNowPayload(urls))
    });
  } catch (error) {
    throw new Error(`IndexNow network request failed: ${error instanceof Error ? error.message : String(error)}`);
  }

  const success = response.status === 200 || response.status === 202;
  console.log(`IndexNow HTTP status: ${response.status}`);
  console.log(`IndexNow success: ${success ? "yes" : "no"}`);
  console.log(`IndexNow URL count submitted: ${urls.length}`);

  if (!success) {
    throw new Error(`IndexNow submission failed with HTTP ${response.status}`);
  }

  return { status: response.status, success, urlCount: urls.length };
};

const run = async () => {
  const scriptsDir = dirname(fileURLToPath(import.meta.url));
  const coreModule = resolve(scriptsDir, "../../../packages/core/dist/index.js");
  const { getAllTools } = await import(pathToFileURL(coreModule).href);
  const canonicalUrls = getCanonicalIndexNowUrls(getAllTools());
  const requestedUrls = process.argv.slice(2);
  const urls = validateIndexNowUrls(requestedUrls.length > 0 ? requestedUrls : canonicalUrls, canonicalUrls);
  await submitIndexNow(urls);
};

if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) {
  run().catch((error) => {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  });
}
