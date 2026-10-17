import { createPedsCoreMcpApp } from "./app.js";

const app = createPedsCoreMcpApp();
const port = Number(process.env.PORT ?? 3001);

const host = process.env.HOST ?? "0.0.0.0";

app.listen(port, host, (error?: Error) => {
  if (error) {
    console.error("Failed to start PedsCore MCP server", error);
    process.exit(1);
  }

  console.log(`PedsCore MCP server listening on port ${port}`);
});
