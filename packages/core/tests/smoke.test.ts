import { describe, expect, it } from "vitest";
import { pedsCorePackage } from "../src/index";

describe("@peds-core/core", () => {
  it("loads the package scaffold", () => {
    expect(pedsCorePackage.name).toBe("@peds-core/core");
  });
});
