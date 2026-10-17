#!/usr/bin/env node
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const args = process.argv.slice(2);
if (args.some((arg) => !["--with-sim", "--help"].includes(arg))) {
  console.error("Usage: npm run hackathon:local -- [--with-sim]");
  process.exit(2);
}
if (args.includes("--help")) {
  console.log("Build and run the local MCP judge console. --with-sim enables the existing public SIM bridge. No deployment is performed.");
  process.exit(0);
}
const cwd = fileURLToPath(new URL("../", import.meta.url));
const env = { ...process.env, HOST: "127.0.0.1", MCP_AUTH_MODE: "off" };
if (args.includes("--with-sim")) {
  env.SIM_IMV_API_URL ||= "https://pedscore-triage-sim.vercel.app/api/hackathon/sim";
}
const npm = process.platform === "win32" ? "npm.cmd" : "npm";
let child;
let stopping = false;
for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => { stopping = true; child?.kill(signal); });
}
async function run(command, commandArgs) {
  return await new Promise((resolve, reject) => {
    child = spawn(command, commandArgs, { cwd, env, stdio: "inherit" });
    child.once("error", reject);
    child.once("exit", (code) => resolve(code ?? 1));
  });
}
for (const workspace of ["@peds-core/core", "@peds-core/mcp-server"]) {
  const code = await run(npm, ["run", "build", "-w", workspace]);
  if (code !== 0 || stopping) process.exit(code || 1);
}
console.log(`Judge console: http://127.0.0.1:${env.PORT ?? 3001}/judge-demo`);
console.log(env.SIM_IMV_API_URL ? "SIM bridge enabled; simulation calls require its availability." : "Clinical tools are local. SIM is unconfigured; use --with-sim to enable the public bridge.");
process.exitCode = await run(process.execPath, ["apps/mcp-server/dist/server.js"]);
