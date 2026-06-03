import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, "../../..");
const webRoot = resolve(repoRoot, "apps/web");
const distIndexPath = resolve(webRoot, "dist", "index.html");
const publicSitemapPath = resolve(webRoot, "public", "sitemap.xml");
const distRoot = resolve(webRoot, "dist");

const distTemplate = await readFile(distIndexPath, "utf8");
const sitemap = await readFile(publicSitemapPath, "utf8");

const baseUrl = "https://sferurek.github.io/PedsCore";
const urlEntries = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map((match) => match[1])
  .filter((loc) => loc.startsWith(baseUrl));

const routes = new Set(
  urlEntries
    .map((loc) => {
      const path = new URL(loc).pathname;
      if (!path.startsWith("/PedsCore")) {
        return null;
      }

      const normalized = path.replace(/^\/PedsCore\/?/, "").replace(/\/+$/, "");
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
  await writeFile(resolve(outputDir, "index.html"), distTemplate, "utf8");
  count++;
}

console.log(`Generated ${count} static route index.html files in dist/.`);
