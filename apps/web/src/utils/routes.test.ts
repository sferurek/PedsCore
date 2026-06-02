import { describe, expect, it } from "vitest";
import { makePath, parseRoute, toAppPath, toBrowserPath } from "./routes";

describe("routes", () => {
  it("parses evidence routes", () => {
    expect(parseRoute("/es/evidence").kind).toBe("evidence");
    expect(parseRoute("/PedsCore/es/evidence").kind).toBe("evidence");
    expect(parseRoute("/en/evidence").kind).toBe("evidence");
    expect(makePath("en", "evidence")).toBe("/en/evidence");
  });

  it("maps browser paths to app paths for GitHub Pages", () => {
    expect(toAppPath("/PedsCore")).toBe("/");
    expect(toAppPath("/PedsCore/en/tools")).toBe("/en/tools");
    expect(toBrowserPath("/en/tools")).toBe("/PedsCore/en/tools");
    expect(toBrowserPath("/")).toBe("/PedsCore");
  });
});
