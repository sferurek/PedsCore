import { describe, expect, it } from "vitest";
import { makePath, parseRoute } from "./routes";

describe("routes", () => {
  it("parses evidence routes", () => {
    expect(parseRoute("/es/evidence").kind).toBe("evidence");
    expect(parseRoute("/en/evidence").kind).toBe("evidence");
    expect(makePath("en", "evidence")).toBe("/en/evidence");
  });
});
