import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
  getCanonicalSeoEntries,
  productionBaseUrl,
  seoContentLastmod,
  toCanonicalUrl
} from "./seo-routes.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, "../../..");
const coreDist = resolve(repoRoot, "packages/core/dist/index.js");
const publicDir = resolve(repoRoot, "apps/web/public");
const sitemapPath = resolve(publicDir, "sitemap.xml");
const baseUrl = productionBaseUrl;

const { getAllTools } = await import(pathToFileURL(coreDist).href);

const urls = getCanonicalSeoEntries(getAllTools());
const localizedPath = (path) => path.startsWith("/es") ? path.replace(/^\/es/, "/en") : path.replace(/^\/en/, "/es");
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls
  .map(
    (entry) => {
      const alternateLinks = entry.path.startsWith("/es") || entry.path.startsWith("/en")
        ? `    <xhtml:link rel="alternate" hreflang="${entry.path.startsWith("/es") ? "es" : "en"}" href="${baseUrl}${entry.path}" />\n    <xhtml:link rel="alternate" hreflang="${entry.path.startsWith("/es") ? "en" : "es"}" href="${baseUrl}${localizedPath(entry.path)}" />\n    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/" />\n`
        : `    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/" />\n`;
      return `  <url>\n    <loc>${toCanonicalUrl(entry.path)}</loc>\n${alternateLinks}    <lastmod>${seoContentLastmod}</lastmod>\n    <changefreq>${entry.changefreq}</changefreq>\n    <priority>${entry.priority}</priority>\n  </url>`;
    }
  )
  .join("\n")}
</urlset>
`;

await mkdir(publicDir, { recursive: true });
await writeFile(sitemapPath, xml, "utf8");
console.log(`Generated ${sitemapPath} with ${urls.length} URLs.`);
