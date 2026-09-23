import { readdir, readFile, stat } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, "../../..");
const distDir = resolve(repoRoot, "apps/web/dist");
const { getAllTools } = await import(pathToFileURL(resolve(repoRoot, "packages/core/dist/index.js")).href);
const { getCanonicalSeoEntries } = await import("./seo-routes.mjs");
const expectedSeoEntries = getCanonicalSeoEntries(getAllTools());
const expectedToolRouteCount = getAllTools().length * 2;

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

assertIncludes(indexHtml, "PedsCore — open-source pediatric and neonatal clinical tools", "index.html");
assertIncludes(indexHtml, "PedsCore provides open-source pediatric and neonatal clinical tools", "index.html");
assertIncludes(indexHtml, "https://peds-core.vercel.app/", "index.html canonical/metadata");
assertIncludes(indexHtml, "application/ld+json", "index.html structured data");
assertIncludes(indexHtml, '<link rel="icon" href="/favicon.svg"', "index.html favicon");
assertIncludes(sitemap, "https://peds-core.vercel.app/es/tools/apgar", "sitemap.xml");
assertIncludes(sitemap, "https://peds-core.vercel.app/en/tools/apgar", "sitemap.xml");
assertIncludes(sitemap, "https://peds-core.vercel.app/es/tools/who-growth", "sitemap.xml");
assertIncludes(sitemap, "https://peds-core.vercel.app/es/stats/global", "sitemap.xml");
assertIncludes(sitemap, "https://peds-core.vercel.app/en/stats/global", "sitemap.xml");
assertIncludes(sitemap, "https://peds-core.vercel.app/es/categories/cardiology", "sitemap.xml category");
assertIncludes(sitemap, "https://peds-core.vercel.app/en/categories/cardiology", "sitemap.xml category");
assertIncludes(robots, "Sitemap: https://peds-core.vercel.app/sitemap.xml", "robots.txt");
assertIncludes(robots, "Disallow: /api/", "robots.txt API exclusion");

const vercelConfig = JSON.parse(await readFile(resolve(repoRoot, "vercel.json"), "utf8"));
if (vercelConfig.cleanUrls !== true) throw new Error("Vercel cleanUrls must remain enabled to collapse .html duplicates");
if (vercelConfig.trailingSlash !== false) throw new Error("Vercel trailingSlash must remain disabled to collapse slash duplicates");
const canonicalRedirects = vercelConfig.redirects ?? [];
if (!canonicalRedirects.some((rule) => rule.source === "/PedsCore" && rule.destination === "/" && rule.permanent === true)) {
  throw new Error("Missing permanent redirect from legacy /PedsCore root");
}
if (!canonicalRedirects.some((rule) => rule.source === "/PedsCore/:path*" && rule.destination === "/:path*" && rule.permanent === true)) {
  throw new Error("Missing permanent redirect from legacy /PedsCore paths");
}

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
const indexableCategories = ["neonatology", "respiratory", "emergency", "cardiology", "nephrology", "intensive_care", "growth_nutrition", "pain", "neurology", "rheumatology", "gastroenterology", "behavioral_health", "resuscitation", "adolescent_medicine"];
const categoryTitles = new Set();
const categoryDescriptions = new Set();
const toolTitlesByLanguage = { es: new Set(), en: new Set() };
let toolRouteCount = 0;
for (const url of sitemapUrls) {
  const route = new URL(url).pathname.replace(/^\/+|\/+$/g, "") || "index";
  const routeHtml = await read(route === "index" ? "index.html" : `${route}/index.html`);
  if (!/<title>[^<]+<\/title>/.test(routeHtml)) throw new Error(`Missing title: ${url}`);
  const description = routeHtml.match(/<meta\s+name="description"\s+content="([^"]+)"/);
  if (!description) throw new Error(`Missing description: ${url}`);
  if (description[1].length > 160) throw new Error(`Meta description too long (${description[1].length}): ${url}`);
  if (!routeHtml.includes(`<link rel="canonical" href="${url}"`)) throw new Error(`Canonical mismatch: ${url}`);
  if (!routeHtml.includes("hreflang=\"es\"") || !routeHtml.includes("hreflang=\"en\"")) throw new Error(`Missing reciprocal hreflang: ${url}`);
  if (!/<h1>[^<]+<\/h1>/.test(routeHtml)) throw new Error(`Missing crawlable H1: ${url}`);
  if (!routeHtml.includes('"logo":"https://peds-core.vercel.app/favicon.svg"')) throw new Error(`Missing Organization logo schema: ${url}`);
  if (!routeHtml.includes('class="seo-static-fallback"')) throw new Error(`Missing static SEO body: ${url}`);
  const bodyMatch = routeHtml.match(/<div id="root">([\s\S]*?)<\/body>/);
  const bodyText = (bodyMatch?.[1] ?? "").replace(/<[^>]+>/g, " ").replace(/&[^;]+;/g, " ").replace(/\s+/g, " ").trim();
  const bodyWordCount = bodyText ? bodyText.split(" ").length : 0;
  if (bodyWordCount < 20) throw new Error(`Static SEO body too thin (${bodyWordCount} words): ${url}`);
  if (!/<a\s+href="\/(?:es|en)(?:\/|")/.test(bodyMatch?.[1] ?? "")) throw new Error(`Missing crawlable internal links: ${url}`);
  const canonical = routeHtml.match(/<link rel="canonical" href="([^"]+)"/);
  if (canonical) canonicalUrls.add(canonical[1]);
  if (routeHtml.includes("vercel.app/preview") || routeHtml.includes("vercel.app-") ) throw new Error(`Preview URL in metadata: ${url}`);
  const toolMatch = new URL(url).pathname.match(/^\/(es|en)\/tools\/([^/]+)$/);
  if (toolMatch) {
    toolRouteCount++;
    if (bodyWordCount < 220) throw new Error(`Tool editorial content too thin (${bodyWordCount} words): ${url}`);
    if (!routeHtml.includes('"@type":"MedicalWebPage"')) throw new Error(`Missing MedicalWebPage schema: ${url}`);
    if (!routeHtml.includes('"@id":"https://peds-core.vercel.app/#organization"')) throw new Error(`Missing publisher organization schema: ${url}`);
    const encodedTitle = routeHtml.match(/<title>([^<]+)<\/title>/)?.[1] ?? "";
    const title = encodedTitle
      .replaceAll("&amp;", "&")
      .replaceAll("&lt;", "<")
      .replaceAll("&gt;", ">")
      .replaceAll("&quot;", '"')
      .replaceAll("&#39;", "'");
    const language = toolMatch[1];
    if (!title.includes("PedsCore")) throw new Error(`Tool title missing brand: ${url}`);
    if (title.length > 60) throw new Error(`Tool title too long (${title.length}): ${url} -> ${title}`);
    if (/Herramienta clínica pediátrica|Pediatric clinical tool/i.test(title)) throw new Error(`Generic tool title remains: ${url} -> ${title}`);
    if (toolTitlesByLanguage[language].has(title)) throw new Error(`Duplicate ${language} tool title: ${title}`);
    toolTitlesByLanguage[language].add(title);
  }
  const categoryMatch = new URL(url).pathname.match(/^\/(?:es|en)\/categories\/([^/]+)$/);
  if (categoryMatch) {
    if (!indexableCategories.includes(categoryMatch[1])) throw new Error(`Unapproved category indexed: ${url}`);
    if (bodyWordCount < 220) throw new Error(`Category hub content too thin (${bodyWordCount} words): ${url}`);
    categoryTitles.add(routeHtml.match(/<title>([^<]+)<\/title>/)[1]);
    categoryDescriptions.add(description[1]);
    if (!routeHtml.includes('"@type":"CollectionPage"') || !routeHtml.includes('"@type":"ItemList"')) throw new Error(`Missing category schema: ${url}`);
  }
}
if (canonicalUrls.size !== sitemapUrls.length) throw new Error("Duplicate canonical URLs detected");
if ((sitemap.match(/xhtml:link rel="alternate"/g) ?? []).length < sitemapUrls.length) throw new Error("Sitemap alternates are incomplete");
if ((sitemap.match(/hreflang="x-default"/g) ?? []).length !== sitemapUrls.length) throw new Error("Every sitemap URL must expose x-default");
if ((sitemap.match(/<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/g) ?? []).length !== sitemapUrls.length) throw new Error("Every sitemap URL must expose a valid lastmod");
if (categoryTitles.size !== indexableCategories.length * 2 || categoryDescriptions.size !== indexableCategories.length * 2) throw new Error("Category metadata is not unique across language routes");
if (toolRouteCount !== expectedToolRouteCount) throw new Error(`Expected ${expectedToolRouteCount} localized tool routes, found: ${toolRouteCount}`);
if (toolTitlesByLanguage.es.size !== toolRouteCount / 2 || toolTitlesByLanguage.en.size !== toolRouteCount / 2) throw new Error("Tool SEO titles are not unique within each language");

const assetNames = await readdir(resolve(distDir, "assets"));
const mainAsset = assetNames.find((name) => /^index-[^/]+\.js$/.test(name));
const statsAsset = assetNames.find((name) => /^GlobalUsageMap-[^/]+\.js$/.test(name));
if (!mainAsset || !statsAsset) throw new Error("Expected route-split JavaScript chunks are missing");
const [mainSize, statsSize] = await Promise.all([
  stat(resolve(distDir, "assets", mainAsset)),
  stat(resolve(distDir, "assets", statsAsset))
]);
if (mainSize.size > 1_000_000) throw new Error(`Initial JS remains too large: ${mainSize.size} bytes`);
if (statsSize.size < 1_000_000) throw new Error(`Global stats chunk unexpectedly small: ${statsSize.size} bytes`);

const urlCount = (sitemap.match(/<url>/g) ?? []).length;
if (urlCount !== expectedSeoEntries.length) {
  throw new Error(`sitemap.xml expected ${expectedSeoEntries.length} URLs from the current catalog, found: ${urlCount}`);
}

const headInjuryHubEs = await read("es/topics/pediatric-head-injury-rules/index.html");
const neonatalPainHubEn = await read("en/topics/neonatal-pain-scales/index.html");
const febrileHubEs = await read("es/topics/pediatric-febrile-infant-tools/index.html");
const picuHubEn = await read("en/topics/pediatric-intensive-care-scores/index.html");
const renalHubEs = await read("es/topics/pediatric-kidney-function-aki-tools/index.html");
const growthHubEn = await read("en/topics/preterm-pediatric-growth-tools/index.html");
const croupHubEs = await read("es/topics/pediatric-croup-scores/index.html");
assertIncludes(headInjuryHubEs, '"@type":"CollectionPage"', "head injury topic schema");
assertIncludes(headInjuryHubEs, "PECARN", "head injury topic content");
assertIncludes(neonatalPainHubEn, '"@type":"ItemList"', "neonatal pain topic item list");
assertIncludes(neonatalPainHubEn, "NIPS", "neonatal pain topic content");
assertIncludes(febrileHubEs, "Step-by-Step", "febrile infant topic content");
assertIncludes(picuHubEn, "PRISM", "PICU topic content");
assertIncludes(renalHubEs, "pRIFLE", "kidney/AKI topic content");
assertIncludes(growthHubEn, "Fenton", "growth topic content");
assertIncludes(croupHubEs, "Taussig", "croup topic content");

const pim2Es = await read("es/tools/pim2/index.html");
const pippEs = await read("es/tools/pipp/index.html");
const nipsEn = await read("en/tools/nips/index.html");
const dubowitzEs = await read("es/tools/dubowitz/index.html");
const taussigEs = await read("es/tools/taussig-croup-score/index.html");
const fentonEn = await read("en/tools/fenton-2025-preterm-growth/index.html");
const modifiedTalEs = await read("es/tools/modified-tal/index.html");
const woodDownesEn = await read("en/tools/wood-downes-ferres/index.html");
const homeEs = await read("es/index.html");
const aboutEs = await read("es/about/index.html");
const evidenceEn = await read("en/evidence/index.html");
assertIncludes(pim2Es, "<title>Calculadora PIM2 — Mortalidad pediátrica | PedsCore</title>", "PIM2 intent title");
assertIncludes(pippEs, "<title>Escala PIPP — Dolor en prematuros | PedsCore</title>", "PIPP intent title");
assertIncludes(nipsEn, "<title>NIPS Pain Scale — Neonatal Pain Assessment | PedsCore</title>", "NIPS intent title");
assertIncludes(dubowitzEs, "<title>Escala de Dubowitz — Edad gestacional neonatal | PedsCore</title>", "Dubowitz query-led title");
assertIncludes(taussigEs, "<title>Taussig Croup Score — Escala de crup pediátrico | PedsCore</title>", "Taussig query-led title");
assertIncludes(fentonEn, "<title>Fenton 2025 — Preterm Growth Percentiles | PedsCore</title>", "Fenton 2025 query-led title");
assertIncludes(modifiedTalEs, "<title>Escala TAL modificada — Bronquiolitis pediátrica | PedsCore</title>", "Modified TAL query-led title");
assertIncludes(woodDownesEn, "<title>Wood-Downes-Ferres Score — Respiratory Severity | PedsCore</title>", "Wood-Downes query-led title");
assertIncludes(homeEs, "<title>PedsCore — herramientas clínicas pediátricas</title>", "Spanish home title");
assertIncludes(homeEs, "Cómo se construye PedsCore", "home trust content");
assertIncludes(aboutEs, "Qué puede auditarse públicamente", "about trust content");
assertIncludes(evidenceEn, "Source policy", "evidence trust content");
assertIncludes(pim2Es, '"@type":"MedicalWebPage"', "tool medical schema");
assertIncludes(pim2Es, '"@type":"Organization"', "organization schema");
assertIncludes(pim2Es, '"author":{"@id":"https://peds-core.vercel.app/#organization"}', "organization author schema");
assertIncludes(pim2Es, '"dateModified":"2026-09-22"', "dateModified schema");

console.log(`Advanced SEO check passed. ${urlCount} sitemap URLs; ${toolRouteCount} localized tool routes; ${indexableCategories.length * 2} category hubs; expanded topic clusters, lastmod, x-default, query-led metadata and medical schema validated.`);
