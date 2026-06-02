import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { App } from "./App";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("App", () => {
  it("renders without crashing", () => {
    vi.stubGlobal("localStorage", {
      getItem: () => "en",
      setItem: vi.fn()
    });
    vi.stubGlobal("navigator", { language: "en-US" });
    vi.stubGlobal("window", {
      location: { pathname: "/en" },
      history: {
        pushState: vi.fn(),
        replaceState: vi.fn()
      },
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      scrollTo: vi.fn()
    });

    expect(renderToString(<App />)).toContain("PedsCore");
  });
});

