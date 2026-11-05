import { describe, expect, it } from "vitest";
import { seoTopicHubs, getSeoTopicHub } from "./topicHubs";
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
      expect(getSeoTopicHub(path.split("/").at(-1))).toBeDefined();
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
});
