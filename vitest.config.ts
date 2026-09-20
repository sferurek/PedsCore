import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: [
      "packages/core/tests/**/*.test.ts",
      "apps/web/src/**/*.test.{ts,tsx}",
      "apps/mcp-server/src/**/*.test.ts",
      "api/**/*.test.js"
    ],
    globals: false
  }
});
