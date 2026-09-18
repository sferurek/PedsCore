# Friction log

Amazon's submission form explicitly rewards useful friction logs. Record concrete problems encountered while building the Alexa+, MCP, and AWS integrations.

## Entry template

### YYYY-MM-DD — Short title
- **Task attempted:**
- **Steps taken:**
- **Expected result:**
- **Actual result:**
- **Severity:** Critical / Important / Minor
- **Workaround:**
- **Actionable suggestion:**
- **Affected tool / API / SDK:**
- **Evidence:** logs, screenshots, issue links, or commit/PR links where appropriate

---

No friction entries recorded yet.

### 2026-09-18 — TypeScript exact optional property compatibility in MCP transport
- **Task attempted:** Compile the official MCP TypeScript SDK Streamable HTTP transport inside a strict TypeScript workspace.
- **Steps taken:** Added `@modelcontextprotocol/sdk` v1.30.x, created a stateless `StreamableHTTPServerTransport`, and compiled with `exactOptionalPropertyTypes: true`.
- **Expected result:** The documented stateless transport pattern should compile in a strict NodeNext TypeScript project.
- **Actual result:** TypeScript reported incompatibilities around `sessionIdGenerator: undefined` and the SDK transport's optional `onclose` member when passed as the base `Transport` type.
- **Severity:** Important
- **Workaround:** Keep strict mode enabled but disable `exactOptionalPropertyTypes` only for the isolated MCP server workspace; PedsCore core retains its stricter setting.
- **Actionable suggestion:** Ensure SDK transport interfaces compile cleanly with `exactOptionalPropertyTypes: true`, and document the expected stateless constructor form for strict TypeScript configurations.
- **Affected tool / API / SDK:** MCP TypeScript SDK v1 Streamable HTTP transport.
- **Evidence:** GitHub Actions CI run #341 failed at the MCP server build; run #342 passed after the isolated compatibility adjustment.
