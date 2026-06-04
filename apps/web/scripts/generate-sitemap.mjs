import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, "../../..");
const coreDist = resolve(repoRoot, "packages/core/dist/index.js");
const publicDir = resolve(repoRoot, "apps/web/public");
const sitemapPath = resolve(publicDir, "sitemap.xml");
const baseUrl = "https://sferurek.github.io/PedsCore";

const { getAllTools } = await import(pathToFileURL(coreDist).href);

const today = new Date().toISOString().slice(0, 10);

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

const urls = [...staticPaths, ...toolPaths];
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (entry) => `  <url>
    <loc>${baseUrl}${entry.path === "/" ? "/" : entry.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

await mkdir(publicDir, { recursive: true });
await writeFile(sitemapPath, xml, "utf8");
console.log(`Generated ${sitemapPath} with ${urls.length} URLs.`);
