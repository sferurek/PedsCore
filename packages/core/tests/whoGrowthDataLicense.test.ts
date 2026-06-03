import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const dataReadmePath = resolve("packages/core/src/growth/who/data/README.md");
const dataLicensePath = resolve("packages/core/src/growth/who/data/LICENSE.md");
const dataAttributionPath = resolve(
  "packages/core/src/growth/who/data/ATTRIBUTION.md"
);

const read = (path: string) => readFileSync(path, "utf8");

describe("WHO growth data licensing policy", () => {
  it("documents that WHO data are not MIT licensed", () => {
    const license = read(dataLicensePath);

    expect(license).toContain("not licensed");
    expect(license).toContain("MIT License");
    expect(license).toContain("CC BY-NC-SA 3.0 IGO");
  });

  it("documents attribution and WHO official links", () => {
    const attribution = read(dataAttributionPath);

    expect(attribution).toContain("World Health Organization");
    expect(attribution).toContain("WHO Child Growth Standards");
    expect(attribution).toContain(
      "https://www.who.int/about/policies/publishing/copyright"
    );
  });

  it("keeps data README explicit about separate WHO terms", () => {
    const readme = read(dataReadmePath);

    expect(readme).toContain("CC BY-NC-SA 3.0 IGO");
    expect(readme).toContain("separate license");
    expect(readme).toContain("no suggestion of WHO endorsement");
  });

  it("prohibits WHO logo use and implied endorsement", () => {
    const combined = [
      read(dataReadmePath),
      read(dataLicensePath),
      read(dataAttributionPath)
    ].join("\n");

    expect(combined).toContain("Do not use the WHO logo");
    expect(combined).toContain("does not imply endorsement by WHO");
    expect(combined).not.toContain("WHO endorses PedsCore");
  });
});
