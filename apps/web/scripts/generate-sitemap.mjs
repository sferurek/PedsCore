import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, "../../..");
const coreDist = resolve(repoRoot, "packages/core/dist/index.js");
const publicDir = resolve(repoRoot, "apps/web/public");
const sitemapPath = resolve(publicDir, "sitemap.xml");
const baseUrl = "https://peds-core.vercel.app";

const { getAllTools } = await import(pathToFileURL(coreDist).href);

const staticPaths = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/es", priority: "0.9", changefreq: "weekly" },
  { path: "/en", priority: "0.9", changefreq: "weekly" },
  { path: "/es/tools", priority: "0.9", changefreq: "weekly" },
  { path: "/en/tools", priority: "0.9", changefreq: "weekly" },
  { path: "/es/evidence", priority: "0.8", changefreq: "monthly" },
  { path: "/en/evidence", priority: "0.8", changefreq: "monthly" },
  { path: "/es/stats/global", priority: "0.5", changefreq: "weekly" },
  { path: "/en/stats/global", priority: "0.5", changefreq: "weekly" },
  { path: "/es/about", priority: "0.6", changefreq: "monthly" },
  { path: "/en/about", priority: "0.6", changefreq: "monthly" },
  { path: "/es/disclaimer", priority: "0.5", changefreq: "monthly" },
  { path: "/en/disclaimer", priority: "0.5", changefreq: "monthly" },
  { path: "/es/contribute", priority: "0.6", changefreq: "monthly" },
  { path: "/en/contribute", priority: "0.6", changefreq: "monthly" }
];

const toolPaths = getAllTools().flatMap((tool) => [
  { path: `/es/tools/${tool.slug}`, priority: "0.7", changefreq: "monthly" },
  { path: `/en/tools/${tool.slug}`, priority: "0.7", changefreq: "monthly" }
]);

const indexableCategories = ["cardiology", "emergency", "nephrology", "respiratory"];
const categoryPaths = indexableCategories.flatMap((category) => [
  { path: `/es/categories/${category}`, priority: "0.7", changefreq: "monthly" },
  { path: `/en/categories/${category}`, priority: "0.7", changefreq: "monthly" }
]);

const urls = [...staticPaths, ...categoryPaths, ...toolPaths];
const localizedPath = (path) => path.startsWith("/es") ? path.replace(/^\/es/, "/en") : path.replace(/^\/en/, "/es");
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls
  .map(
    (entry) => {
      const alternateLinks = entry.path.startsWith("/es") || entry.path.startsWith("/en")
        ? `    <xhtml:link rel="alternate" hreflang="${entry.path.startsWith("/es") ? "es" : "en"}" href="${baseUrl}${entry.path}" />\n    <xhtml:link rel="alternate" hreflang="${entry.path.startsWith("/es") ? "en" : "es"}" href="${baseUrl}${localizedPath(entry.path)}" />\n`
        : "";
      return `  <url>\n    <loc>${baseUrl}${entry.path === "/" ? "/" : entry.path}</loc>\n${alternateLinks}    <changefreq>${entry.changefreq}</changefreq>\n    <priority>${entry.priority}</priority>\n  </url>`;
    }
  )
  .join("\n")}
</urlset>
`;

await mkdir(publicDir, { recursive: true });
await writeFile(sitemapPath, xml, "utf8");
console.log(`Generated ${sitemapPath} with ${urls.length} URLs.`);
