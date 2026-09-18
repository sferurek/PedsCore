#!/usr/bin/env node

const baseUrl = (process.env.MCP_REMOTE_BASE_URL ?? process.argv[2] ?? "").replace(/\/$/, "");
if (!baseUrl) {
  console.error("Set MCP_REMOTE_BASE_URL or pass a base URL.");
  process.exit(2);
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const parseRpcResponse = async (response) => {
  const text = await response.text();
  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    return JSON.parse(text);
  }

  const dataLines = text
    .split(/\r?\n/)
    .filter((line) => line.startsWith("data:"))
    .map((line) => line.slice(5).trim())
    .filter(Boolean);

  if (dataLines.length === 0) {
    throw new Error(`No JSON-RPC payload in response: ${text.slice(0, 300)}`);
  }

  return JSON.parse(dataLines.at(-1));
};

const timedFetch = async (url, init) => {
  const started = performance.now();
  const response = await fetch(url, init);
  const durationMs = Math.round((performance.now() - started) * 10) / 10;
  return { response, durationMs };
};

const rpc = async (id, method, params = {}) => {
  const { response, durationMs } = await timedFetch(`${baseUrl}/mcp`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      accept: "application/json, text/event-stream"
    },
    body: JSON.stringify({ jsonrpc: "2.0", id, method, params })
  });

  const payload = await parseRpcResponse(response);

  if (!response.ok || payload.error) {
    throw new Error(
      `${method} failed: HTTP ${response.status} ${JSON.stringify(payload.error ?? payload)}`
    );
  }

  return { payload, durationMs };
};

let health;
for (let attempt = 1; attempt <= 30; attempt += 1) {
  try {
    const result = await timedFetch(`${baseUrl}/health`);
    if (result.response.ok) {
      health = {
        status: result.response.status,
        body: await result.response.json(),
        durationMs: result.durationMs,
        attempt
      };
      break;
    }
  } catch {
    // Railway may still be switching deployments; retry.
  }

  if (attempt < 30) await sleep(10_000);
}

if (!health) {
  throw new Error("Remote health endpoint did not become ready within five minutes.");
}

const compliance = {};
for (const path of ["/privacy", "/terms"]) {
  const result = await timedFetch(`${baseUrl}${path}`);
  compliance[path] = {
    status: result.response.status,
    contentType: result.response.headers.get("content-type"),
    durationMs: result.durationMs
  };
  if (!result.response.ok || !compliance[path].contentType?.includes("text/html")) {
    throw new Error(`Compliance endpoint failed: ${path}`);
  }
  await result.response.arrayBuffer();
}

const assetPaths = [
  "/store-assets/icon-72x72.png",
  "/store-assets/icon-64x64.png",
  "/store-assets/icon-88x88.png",
  "/store-assets/icon-126x126.png",
  "/store-assets/icon-180x180.png",
  "/store-assets/icon-241x241.png",
  "/store-assets/carousel-1.png"
];
const assets = {};
for (const path of assetPaths) {
  const result = await timedFetch(`${baseUrl}${path}`);
  const bytes = new Uint8Array(await result.response.arrayBuffer());
  assets[path] = {
    status: result.response.status,
    contentType: result.response.headers.get("content-type"),
    bytes: bytes.length,
    durationMs: result.durationMs
  };
  const signature = Array.from(bytes.slice(0, 8)).join(",");
  if (!result.response.ok || !assets[path].contentType?.includes("image/png") || signature !== "137,80,78,71,13,10,26,10") {
    throw new Error(`Store asset failed: ${path}`);
  }
}

const initialize = await rpc(1, "initialize", {
  protocolVersion: "2025-11-25",
  capabilities: {},
  clientInfo: { name: "pedscore-remote-ci", version: "0.1.0" }
});

const toolsList = await rpc(2, "tools/list", {});

const search = await rpc(3, "tools/call", {
  name: "search_clinical_tools",
  arguments: {
    query: "newborn apgar score",
    language: "en",
    calculableOnly: true
  }
});

const calculation = await rpc(4, "tools/call", {
  name: "calculate_clinical_score",
  arguments: {
    toolId: "apgar",
    input: {
      assessment_time: "five_minutes",
      heart_rate: 2,
      respiratory_effort: 2,
      muscle_tone: 2,
      reflex_irritability: 2,
      color: 1
    }
  }
});

const report = {
  baseUrl,
  health,
  compliance,
  assets,
  initialize: {
    durationMs: initialize.durationMs,
    protocolVersion: initialize.payload.result?.protocolVersion,
    serverName: initialize.payload.result?.serverInfo?.name
  },
  toolsList: {
    durationMs: toolsList.durationMs,
    tools: (toolsList.payload.result?.tools ?? []).map((tool) => tool.name)
  },
  search: {
    durationMs: search.durationMs,
    firstToolId: search.payload.result?.structuredContent?.tools?.[0]?.id
  },
  calculation: {
    durationMs: calculation.durationMs,
    toolId: calculation.payload.result?.structuredContent?.result?.toolId,
    score: calculation.payload.result?.structuredContent?.result?.score,
    maxScore: calculation.payload.result?.structuredContent?.result?.maxScore
  }
};

const assertions = [
  [report.initialize.protocolVersion === "2025-11-25", "protocol version"],
  [report.initialize.serverName === "pedscore-ai", "server name"],
  [report.toolsList.tools.includes("search_clinical_tools"), "search tool"],
  [report.toolsList.tools.includes("get_clinical_tool"), "detail tool"],
  [report.toolsList.tools.includes("calculate_clinical_score"), "calculation tool"],
  [report.search.firstToolId === "apgar", "Apgar discovery"],
  [report.calculation.toolId === "apgar", "Apgar calculation tool"],
  [report.calculation.score === 9, "Apgar score"],
  [report.calculation.maxScore === 10, "Apgar max score"]
];

const failed = assertions.filter(([ok]) => !ok).map(([, label]) => label);
report.assertionsPassed = failed.length === 0;
report.failedAssertions = failed;

console.log(JSON.stringify(report, null, 2));

if (failed.length > 0) {
  process.exit(1);
}
