import { describe, expect, it } from "vitest";
import { getAllTools, getTool } from "@peds-core/core";
import { getStaticSeo, renderStaticBody } from "../../scripts/static-seo.mjs";
import { seoTopicHubs, getSeoTopicHub } from "./topicHubs";
import { parseRoute } from "./routes";
import { getCanonicalSeoEntries } from "../../scripts/seo-routes.mjs";

describe("runtime vs generated SEO topic routes", () => {
  const generated = getCanonicalSeoEntries([]);
  const localePaths = (locale) =>
    generated.filter(({ path }) => path.startsWith(`/${locale}/topics/`)).map(({ path }) => path);

  it.each(["es", "en"])("makes every generated %s topic route resolvable", (locale) => {
    const actual = localePaths(locale).sort();
    const expected = seoTopicHubs.map(({ slug }) => `/${locale}/topics/${slug}`).sort();
    expect(actual).toEqual(expected);
    for (const path of actual) {
      const parsed = parseRoute(path);
      expect(parsed.kind, path).toBe("topic");
      expect(parsed.language, path).toBe(locale);
      expect(parsed.topic, path).toBe(path.split("/").at(-1));
      const hub = getSeoTopicHub(parsed.topic);
      expect(hub, path).toBeDefined();
      expect(hub?.title[locale], path).toBeTruthy();
      expect(hub?.description[locale], path).toBeTruthy();
      const alternate = parsed.withLanguage(locale === "es" ? "en" : "es");
      expect(localePaths(locale === "es" ? "en" : "es"), alternate).toContain(alternate);
    }
  });

  it.each(["es", "en"])("keeps every %s static tool link aligned with runtime", (locale) => {
    const tools = getAllTools();
    for (const hub of seoTopicHubs) {
      const body = renderStaticBody(getStaticSeo(`/${locale}/topics/${hub.slug}`, tools), tools);
      for (const id of hub.toolIds) expect(body, `${hub.slug}: ${id}`).toContain(`/${locale}/tools/${getTool(id).slug}`);
    }
  });

  it("does not publish duplicate topic slugs or localized paths", () => {
    const slugs = seoTopicHubs.map(({ slug }) => slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const locale of ["es", "en"]) {
      const paths = localePaths(locale);
      expect(new Set(paths).size).toBe(paths.length);
    }
  });

  it("keeps an unknown topic outside the registered runtime hubs", () => {
    expect(getSeoTopicHub("unknown-topic-for-regression")).toBeUndefined();
  });
});
