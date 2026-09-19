import { afterEach, describe, expect, it, vi } from "vitest";
import {
  getPreferredSpecialty,
  setPreferredSpecialty
} from "./userTools";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("local clinician personalization", () => {
  it("stores a supported specialty locally and clears it", () => {
    const storage = new Map<string, string>();
    vi.stubGlobal("window", {
      localStorage: {
        getItem: (key: string) => storage.get(key) ?? null,
        setItem: (key: string, value: string) => storage.set(key, value),
        removeItem: (key: string) => storage.delete(key)
      },
      dispatchEvent: vi.fn()
    });

    expect(getPreferredSpecialty()).toBeNull();

    setPreferredSpecialty("emergency_medicine");
    expect(getPreferredSpecialty()).toBe("emergency_medicine");

    setPreferredSpecialty(null);
    expect(getPreferredSpecialty()).toBeNull();
  });

  it("ignores corrupt or unsupported stored values", () => {
    vi.stubGlobal("window", {
      localStorage: {
        getItem: () => "not-a-clinical-specialty",
        setItem: vi.fn(),
        removeItem: vi.fn()
      },
      dispatchEvent: vi.fn()
    });

    expect(getPreferredSpecialty()).toBeNull();
  });
});
