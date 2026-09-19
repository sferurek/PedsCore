import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { getStaticSeo, renderSeoHead, renderStaticBody } from "./static-seo.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, "../../..");
const webRoot = resolve(repoRoot, "apps/web");
const distIndexPath = resolve(webRoot, "dist", "index.html");
const publicSitemapPath = resolve(webRoot, "public", "sitemap.xml");
const distRoot = resolve(webRoot, "dist");

const distTemplate = await readFile(distIndexPath, "utf8");
const sitemap = await readFile(publicSitemapPath, "utf8");
const { getAllTools } = await import(pathToFileURL(resolve(repoRoot, "packages/core/dist/index.js")).href);

const baseUrl = "https://peds-core.vercel.app";
const urlEntries = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map((match) => match[1])
  .filter((loc) => loc.startsWith(baseUrl));

const tools = getAllTools();

const withStaticBody = (html, seo) =>
  html.replace('<div id="root"></div>', `<div id="root">${renderStaticBody(seo, tools)}</div>`);

const routes = new Set(
  urlEntries
    .map((loc) => {
      const path = new URL(loc).pathname;
      if (!path.startsWith("/")) {
        return null;
      }

      const normalized = path.replace(/^\/+/, "").replace(/\/+$/, "");
      return normalized || "index";
    })
    .filter(Boolean)
);

let count = 0;

for (const route of routes) {
  if (route === "index") {
    continue;
  }

  const outputDir = resolve(distRoot, route);
  await mkdir(outputDir, { recursive: true });
  const seo = getStaticSeo(`/${route === "index" ? "" : route}`, tools);
  const html = withStaticBody(renderSeoHead(distTemplate, seo), seo);
  await writeFile(resolve(outputDir, "index.html"), html, "utf8");
  count++;
}

const rootSeo = getStaticSeo("/en", tools);
const rootHtml = withStaticBody(renderSeoHead(distTemplate, rootSeo), rootSeo);
await writeFile(distIndexPath, rootHtml, "utf8");

console.log(`Generated ${count} static route index.html files plus crawlable root fallback in dist/.`);
