import { copyFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = fileURLToPath(new URL(".", import.meta.url));
const webRoot = join(scriptDir, "..");
const indexPath = join(webRoot, "dist", "index.html");
const notFoundPath = join(webRoot, "dist", "404.html");

if (!existsSync(indexPath)) {
  throw new Error("Cannot create 404.html because dist/index.html does not exist.");
}

copyFileSync(indexPath, notFoundPath);
console.log("Created apps/web/dist/404.html for GitHub Pages SPA fallback.");
