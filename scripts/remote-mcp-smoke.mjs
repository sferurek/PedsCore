#!/usr/bin/env node

// M3 contract deployment verification: simulation tool contracts must be publicly listed.

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

const pngDimensions = (bytes) => {
  if (bytes.length < 24) throw new Error("PNG too small to contain IHDR dimensions");
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  return {
    width: view.getUint32(16, false),
    height: view.getUint32(20, false)
  };
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

const compliancePaths = ["/privacy", "/terms", "/judge-demo"];
const assetPaths = [
  "/store-assets/icon-72x72.png",
  "/store-assets/icon-64x64.png",
  "/store-assets/icon-88x88.png",
  "/store-assets/icon-126x126.png",
  "/store-assets/icon-180x180.png",
  "/store-assets/icon-241x241.png",
  "/store-assets/carousel-1.png"
];

let compliance = {};
let assets = {};
let storeSurfaceReady = false;

for (let attempt = 1; attempt <= 30; attempt += 1) {
  try {
    const nextCompliance = {};
    const nextAssets = {};

    for (const path of compliancePaths) {
      const result = await timedFetch(`${baseUrl}${path}`);
      const contentType = result.response.headers.get("content-type");
      if (!result.response.ok || !contentType?.includes("text/html")) {
        throw new Error(`Compliance endpoint not ready: ${path} HTTP ${result.response.status}`);
      }
      const html = await result.response.text();
      if (
        path === "/judge-demo" &&
        (!html.includes("Judge Console") ||
          !html.includes("search_clinical_tools") ||
          !html.includes("calculate_clinical_score") ||
          !html.includes("start_simulation_case"))
      ) {
        throw new Error("Judge demo is missing required live MCP verification content");
      }
      nextCompliance[path] = {
        status: result.response.status,
        contentType,
        durationMs: result.durationMs,
        ...(path === "/judge-demo" ? { judgeDemoVerified: true } : {})
      };
    }

    for (const path of assetPaths) {
      const result = await timedFetch(`${baseUrl}${path}`);
      const bytes = new Uint8Array(await result.response.arrayBuffer());
      const contentType = result.response.headers.get("content-type");
      const signature = Array.from(bytes.slice(0, 8)).join(",");
      if (!result.response.ok || !contentType?.includes("image/png") || signature !== "137,80,78,71,13,10,26,10") {
        throw new Error(`Store asset not ready: ${path} HTTP ${result.response.status}`);
      }
      const dimensions = pngDimensions(bytes);
      const iconMatch = /icon-(\d+)x(\d+)\.png$/.exec(path);
      if (iconMatch) {
        const expectedWidth = Number(iconMatch[1]);
        const expectedHeight = Number(iconMatch[2]);
        if (dimensions.width !== expectedWidth || dimensions.height !== expectedHeight) {
          throw new Error(
            `Store icon dimensions mismatch: ${path} expected ${expectedWidth}x${expectedHeight}, got ${dimensions.width}x${dimensions.height}`
          );
        }
      } else if (
        path.endsWith("/carousel-1.png") &&
        (dimensions.width !== 600 || dimensions.height !== 900)
      ) {
        throw new Error(
          `Carousel dimensions mismatch: expected 600x900, got ${dimensions.width}x${dimensions.height}`
        );
      }

      nextAssets[path] = {
        status: result.response.status,
        contentType,
        bytes: bytes.length,
        width: dimensions.width,
        height: dimensions.height,
        durationMs: result.durationMs
      };
    }

    compliance = nextCompliance;
    assets = nextAssets;
    storeSurfaceReady = true;
    break;
  } catch (error) {
    if (attempt === 30) throw error;
    await sleep(10_000);
  }
}

if (!storeSurfaceReady) {
  throw new Error("Alexa+ store surface did not become ready within five minutes.");
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

const simulationContract = await rpc(5, "tools/call", {
  name: "start_simulation_case",
  arguments: {
    scenarioId: "school-bus",
    algorithmId: "jumpstart"
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
  },
  simulationContract: {
    durationMs: simulationContract.durationMs,
    isError: simulationContract.payload.result?.isError === true,
    scenarioId:
      simulationContract.payload.result?.structuredContent?.result?.scenario?.id,
    text: simulationContract.payload.result?.content?.[0]?.text
  }
};

const assertions = [
  [report.initialize.protocolVersion === "2025-11-25", "protocol version"],
  [report.initialize.serverName === "pedscore-ai", "server name"],
  [report.toolsList.tools.includes("search_clinical_tools"), "search tool"],
  [report.toolsList.tools.includes("get_clinical_tool"), "detail tool"],
  [report.toolsList.tools.includes("calculate_clinical_score"), "calculation tool"],
  [report.toolsList.tools.includes("start_simulation_case"), "simulation start tool"],
  [report.toolsList.tools.includes("get_patient_findings"), "simulation findings tool"],
  [report.toolsList.tools.includes("submit_triage_decision"), "simulation decision tool"],
  [report.search.firstToolId === "apgar", "Apgar discovery"],
  [report.calculation.toolId === "apgar", "Apgar calculation tool"],
  [report.calculation.score === 9, "Apgar score"],
  [report.calculation.maxScore === 10, "Apgar max score"],
  [
    report.simulationContract.scenarioId === "school-bus" ||
      (report.simulationContract.isError &&
        report.simulationContract.text?.includes("SIM IMV unavailable")),
    "simulation contract response"
  ]
];

const failed = assertions.filter(([ok]) => !ok).map(([, label]) => label);
report.assertionsPassed = failed.length === 0;
report.failedAssertions = failed;

console.log(JSON.stringify(report, null, 2));

if (failed.length > 0) {
  process.exit(1);
}
