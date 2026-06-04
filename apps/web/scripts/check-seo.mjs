import { readFile } from "node:fs/promises";
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

const [indexHtml, sitemap, robots] = await Promise.all([
  read("index.html"),
  read("sitemap.xml"),
  read("robots.txt")
]);

assertIncludes(indexHtml, "PedsCore — Open-source pediatric and neonatal clinical tools", "index.html");
assertIncludes(indexHtml, "Open-source pediatric and neonatal clinical scores", "index.html");
assertIncludes(indexHtml, "https://peds-core.vercel.app/", "index.html canonical/metadata");
assertIncludes(indexHtml, "application/ld+json", "index.html structured data");
assertIncludes(sitemap, "https://peds-core.vercel.app/es/tools/apgar", "sitemap.xml");
assertIncludes(sitemap, "https://peds-core.vercel.app/en/tools/apgar", "sitemap.xml");
assertIncludes(sitemap, "https://peds-core.vercel.app/es/tools/who-growth", "sitemap.xml");
assertIncludes(sitemap, "https://peds-core.vercel.app/es/stats/global", "sitemap.xml");
assertIncludes(sitemap, "https://peds-core.vercel.app/en/stats/global", "sitemap.xml");
assertIncludes(robots, "Sitemap: https://peds-core.vercel.app/sitemap.xml", "robots.txt");

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

const urlCount = (sitemap.match(/<url>/g) ?? []).length;
if (urlCount < 100) {
  throw new Error(`sitemap.xml contains too few URLs: ${urlCount}`);
}

console.log(`SEO check passed. Sitemap URLs: ${urlCount}.`);
