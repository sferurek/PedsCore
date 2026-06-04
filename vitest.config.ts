import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: [
      "packages/core/tests/**/*.test.ts",
      "apps/web/src/**/*.test.{ts,tsx}",
      "api/**/*.test.js"
    ],
    globals: false
  }
});
