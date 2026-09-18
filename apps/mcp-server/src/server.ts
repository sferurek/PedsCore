import { createPedsCoreMcpApp } from "./app.js";

const app = createPedsCoreMcpApp();
const port = Number(process.env.PORT ?? 3001);

app.listen(port, "0.0.0.0", (error?: Error) => {
  if (error) {
    console.error("Failed to start PedsCore MCP server", error);
    process.exit(1);
  }

  console.log(`PedsCore MCP server listening on port ${port}`);
});
