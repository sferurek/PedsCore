import { readdir, readFile, stat } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, "../../..");
const distDir = resolve(repoRoot, "apps/web/dist");

const read = (file) => readFile(resolve(distDir, file), "utf8");
const assertIncludes = (value, expected, label) => {
  if (!value.includes(expected)) {
    throw new Error(`${label} missing expected content: ${expected}`);
  }
};

const [indexHtml, sitemap, robots, indexNowKey] = await Promise.all([
  read("index.html"),
  read("sitemap.xml"),
  read("robots.txt"),
  read("5845ab92b382405cbba356bf63969310.txt")
]);

if (indexNowKey !== "5845ab92b382405cbba356bf63969310") {
  throw new Error("IndexNow key file content is invalid");
}

assertIncludes(indexHtml, "PedsCore — Open-source pediatric and neonatal clinical tools", "index.html");
assertIncludes(indexHtml, "Open-source pediatric and neonatal clinical scores", "index.html");
assertIncludes(indexHtml, "https://peds-core.vercel.app/", "index.html canonical/metadata");
assertIncludes(indexHtml, "application/ld+json", "index.html structured data");
assertIncludes(sitemap, "https://peds-core.vercel.app/es/tools/apgar", "sitemap.xml");
assertIncludes(sitemap, "https://peds-core.vercel.app/en/tools/apgar", "sitemap.xml");
assertIncludes(sitemap, "https://peds-core.vercel.app/es/tools/who-growth", "sitemap.xml");
assertIncludes(sitemap, "https://peds-core.vercel.app/es/stats/global", "sitemap.xml");
assertIncludes(sitemap, "https://peds-core.vercel.app/en/stats/global", "sitemap.xml");
assertIncludes(sitemap, "https://peds-core.vercel.app/es/categories/cardiology", "sitemap.xml category");
assertIncludes(sitemap, "https://peds-core.vercel.app/en/categories/cardiology", "sitemap.xml category");
assertIncludes(robots, "Sitemap: https://peds-core.vercel.app/sitemap.xml", "robots.txt");
assertIncludes(robots, "Disallow: /api/", "robots.txt API exclusion");

const routeFiles = [
  "es/tools/who-growth/index.html",
  "en/tools/who-growth/index.html",
  "es/tools/index.html",
  "en/tools/index.html",
  "es/stats/global/index.html",
  "en/stats/global/index.html"
];

for (const routeFile of routeFiles) {
  await read(routeFile);
}

const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const canonicalUrls = new Set();
const indexableCategories = ["cardiology", "emergency", "nephrology", "respiratory"];
const categoryTitles = new Set();
const categoryDescriptions = new Set();
for (const url of sitemapUrls) {
  const route = new URL(url).pathname.replace(/^\/+|\/+$/g, "") || "index";
  const routeHtml = await read(route === "index" ? "index.html" : `${route}/index.html`);
  if (!/<title>[^<]+<\/title>/.test(routeHtml)) throw new Error(`Missing title: ${url}`);
  const description = routeHtml.match(/<meta\s+name="description"\s+content="([^"]+)"/);
  if (!description) throw new Error(`Missing description: ${url}`);
  if (!routeHtml.includes(`<link rel="canonical" href="${url}"`)) throw new Error(`Canonical mismatch: ${url}`);
  if (!routeHtml.includes("hreflang=\"es\"") || !routeHtml.includes("hreflang=\"en\"")) throw new Error(`Missing reciprocal hreflang: ${url}`);
  if (!/<h1>[^<]+<\/h1>/.test(routeHtml)) throw new Error(`Missing crawlable H1: ${url}`);
  if (!routeHtml.includes('class="seo-static-fallback"')) throw new Error(`Missing static SEO body: ${url}`);
  const bodyMatch = routeHtml.match(/<div id="root">([\s\S]*?)<\/div>\s*<script/);
  const bodyText = (bodyMatch?.[1] ?? "").replace(/<[^>]+>/g, " ").replace(/&[^;]+;/g, " ").replace(/\s+/g, " ").trim();
  const bodyWordCount = bodyText ? bodyText.split(" ").length : 0;
  if (bodyWordCount < 20) throw new Error(`Static SEO body too thin (${bodyWordCount} words): ${url}`);
  if (!/<a\s+href="\/(?:es|en)\//.test(bodyMatch?.[1] ?? "")) throw new Error(`Missing crawlable internal links: ${url}`);
  const canonical = routeHtml.match(/<link rel="canonical" href="([^"]+)"/);
  if (canonical) canonicalUrls.add(canonical[1]);
  if (routeHtml.includes("vercel.app/preview") || routeHtml.includes("vercel.app-") ) throw new Error(`Preview URL in metadata: ${url}`);
  const categoryMatch = new URL(url).pathname.match(/^\/(?:es|en)\/categories\/([^/]+)$/);
  if (categoryMatch) {
    if (!indexableCategories.includes(categoryMatch[1])) throw new Error(`Unapproved category indexed: ${url}`);
    categoryTitles.add(routeHtml.match(/<title>([^<]+)<\/title>/)[1]);
    categoryDescriptions.add(description[1]);
    if (!routeHtml.includes('"@type":"CollectionPage"') || !routeHtml.includes('"@type":"ItemList"')) throw new Error(`Missing category schema: ${url}`);
  }
}
if (canonicalUrls.size !== sitemapUrls.length) throw new Error("Duplicate canonical URLs detected");
if ((sitemap.match(/xhtml:link rel="alternate"/g) ?? []).length < sitemapUrls.length) throw new Error("Sitemap alternates are incomplete");
if (categoryTitles.size !== indexableCategories.length * 2 || categoryDescriptions.size !== indexableCategories.length * 2) throw new Error("Category metadata is not unique across language routes");

const assetNames = await readdir(resolve(distDir, "assets"));
const mainAsset = assetNames.find((name) => /^index-[^/]+\.js$/.test(name));
const statsAsset = assetNames.find((name) => /^GlobalUsageMap-[^/]+\.js$/.test(name));
if (!mainAsset || !statsAsset) throw new Error("Expected route-split JavaScript chunks are missing");
const [mainSize, statsSize] = await Promise.all([
  stat(resolve(distDir, "assets", mainAsset)),
  stat(resolve(distDir, "assets", statsAsset))
]);
if (mainSize.size > 600_000) throw new Error(`Initial JS remains too large: ${mainSize.size} bytes`);
if (statsSize.size < 1_000_000) throw new Error(`Global stats chunk unexpectedly small: ${statsSize.size} bytes`);

const urlCount = (sitemap.match(/<url>/g) ?? []).length;
if (urlCount < 100) {
  throw new Error(`sitemap.xml contains too few URLs: ${urlCount}`);
}

const pim2Es = await read("es/tools/pim2/index.html");
const pippEs = await read("es/tools/pipp/index.html");
const nipsEn = await read("en/tools/nips/index.html");
assertIncludes(pim2Es, "<title>Calculadora PIM2 — Mortalidad pediátrica | PedsCore</title>", "PIM2 intent title");
assertIncludes(pippEs, "<title>Escala PIPP — Dolor en prematuros | PedsCore</title>", "PIPP intent title");
assertIncludes(nipsEn, "<title>NIPS Pain Scale — Neonatal Pain Assessment | PedsCore</title>", "NIPS intent title");

console.log(`SEO check passed. Sitemap URLs: ${urlCount}. Crawlable H1/content/internal-link checks passed for every sitemap route.`);
