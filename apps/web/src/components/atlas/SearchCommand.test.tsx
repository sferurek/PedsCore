import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { SearchCommand } from "./SearchCommand";

const noop = () => {};
const searchIds = (html: string) => [...html.matchAll(/<input[^>]*id="([^"]+)"[^>]*type="search"/g)].map((match) => match[1]);

describe("search dialog label associations", () => {
  for (const language of ["es", "en"] as const) {
    it.each([false, true])(`keeps unique labeled fields in ${language} with scrolled header=%s`, (scrolled) => {
      const html = renderToStaticMarkup(<>
        <SearchCommand language={language} navigate={noop} compact={!scrolled} nav={scrolled} />
        <SearchCommand language={language} navigate={noop} />
      </>);
      const ids = searchIds(html);
      expect(ids).toHaveLength(2);
      expect(new Set(ids).size).toBe(2);
      for (const id of ids) expect(html).toContain(`for="${id}"`);
    });

    it(`keeps the ${language} input ID independent of header presentation`, () => {
      const compact = renderToStaticMarkup(<SearchCommand language={language} navigate={noop} compact />);
      const scrolled = renderToStaticMarkup(<SearchCommand language={language} navigate={noop} nav />);
      expect(searchIds(compact)).toEqual(searchIds(scrolled));
    });
  }
});
