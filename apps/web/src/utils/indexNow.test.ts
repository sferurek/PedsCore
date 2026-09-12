import { getAllTools } from "@peds-core/core";
import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it, vi } from "vitest";
import {
  buildIndexNowPayload,
  getCanonicalIndexNowUrls,
  indexNowConfig,
  submitIndexNow,
  validateIndexNowUrls
} from "../../scripts/indexnow.mjs";

const tools = [{ slug: "pram" }, { slug: "apgar" }];
const testDir = dirname(fileURLToPath(import.meta.url));

describe("IndexNow submission", () => {
  it("uses the production host and key location", () => {
    expect(indexNowConfig.host).toBe("peds-core.vercel.app");
    expect(indexNowConfig.keyLocation).toBe(
      "https://peds-core.vercel.app/5845ab92b382405cbba356bf63969310.txt"
    );
  });

  it("derives URLs from the canonical SEO route source", () => {
    const urls = getCanonicalIndexNowUrls(tools);
    expect(urls).toContain("https://peds-core.vercel.app/es/tools/pram");
    expect(urls).toContain("https://peds-core.vercel.app/en/categories/cardiology");
    expect(urls.every((url: string) => url.startsWith("https://peds-core.vercel.app/"))).toBe(true);
  });

  it("matches every URL currently generated in the sitemap", async () => {
    const sitemap = await readFile(resolve(testDir, "../../public/sitemap.xml"), "utf8");
    const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
    expect(getCanonicalIndexNowUrls(getAllTools())).toEqual(sitemapUrls);
    expect(sitemapUrls).toHaveLength(185);
  });

  it("rejects preview, API and non-canonical URLs", () => {
    const canonicalUrls = getCanonicalIndexNowUrls(tools);
    expect(() => validateIndexNowUrls(["https://peds-core-preview.vercel.app/es"], canonicalUrls)).toThrow();
    expect(() => validateIndexNowUrls(["https://peds-core.vercel.app/api/stats"], canonicalUrls)).toThrow();
    expect(() => validateIndexNowUrls(["https://peds-core.vercel.app/assets/app.js"], canonicalUrls)).toThrow();
  });

  it("builds one batch payload", () => {
    const urls = ["https://peds-core.vercel.app/es", "https://peds-core.vercel.app/en"];
    expect(buildIndexNowPayload(urls)).toEqual({
      host: indexNowConfig.host,
      key: indexNowConfig.key,
      keyLocation: indexNowConfig.keyLocation,
      urlList: urls
    });
  });

  it("reports accepted responses without calling the real API", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ status: 202 });
    await expect(submitIndexNow(["https://peds-core.vercel.app/es"], fetchMock)).resolves.toEqual({
      status: 202,
      success: true,
      urlCount: 1
    });
    expect(fetchMock).toHaveBeenCalledOnce();
  });
});
