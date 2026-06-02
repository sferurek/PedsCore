import { describe, expect, it } from "vitest";
import { pedscoreCorePackage } from "../src/index";

describe("@pedscore/core", () => {
  it("loads the package scaffold", () => {
    expect(pedscoreCorePackage.name).toBe("@pedscore/core");
  });
});

