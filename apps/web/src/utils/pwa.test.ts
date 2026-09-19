import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("PWA/offline baseline", () => {
  it("ships an installable manifest with PedsCore identity", () => {
    const manifest = JSON.parse(
      readFileSync("apps/web/public/manifest.webmanifest", "utf8")
    ) as {
      name: string;
      short_name: string;
      start_url: string;
      display: string;
      icons: Array<{ src: string }>;
    };

    expect(manifest.name).toBe("PedsCore");
    expect(manifest.short_name).toBe("PedsCore");
    expect(manifest.start_url).toBe("/");
    expect(manifest.display).toBe("standalone");
    expect(manifest.icons.some((icon) => icon.src === "/favicon.svg")).toBe(true);
  });

  it("never caches same-origin requests that contain query parameters", () => {
    const serviceWorker = readFileSync("apps/web/public/sw.js", "utf8");

    expect(serviceWorker).toContain("!url.search");
    expect(serviceWorker).toContain('request.method !== "GET"');
    expect(serviceWorker).toContain('request.mode === "navigate"');
  });

  it("pre-caches both language entry points", () => {
    const serviceWorker = readFileSync("apps/web/public/sw.js", "utf8");

    expect(serviceWorker).toContain('"/en"');
    expect(serviceWorker).toContain('"/es"');
  });
});
