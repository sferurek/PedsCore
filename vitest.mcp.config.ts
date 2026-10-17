import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["apps/mcp-server/tests/**/*.test.ts"],
    globals: false
  }
});
