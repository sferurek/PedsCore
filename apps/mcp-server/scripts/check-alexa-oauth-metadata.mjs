#!/usr/bin/env node

const base = process.argv[2] ?? process.env.COGNITO_AUTHORIZATION_SERVER;

if (!base) {
  console.error("Usage: node check-alexa-oauth-metadata.mjs <authorization-server-base-url>");
  process.exit(2);
}

const normalized = base.replace(/\/$/, "");
const candidates = [
  `${normalized}/.well-known/oauth-authorization-server`,
  `${normalized}/.well-known/openid-configuration`
];

let metadata;
let source;

for (const url of candidates) {
  try {
    const response = await fetch(url, {
      headers: { accept: "application/json" },
      redirect: "follow"
    });

    if (!response.ok) continue;

    metadata = await response.json();
    source = url;
    break;
  } catch {
    // Try the next discovery endpoint.
  }
}

if (!metadata) {
  console.error("FAIL: no OAuth/OIDC discovery metadata could be retrieved.");
  process.exit(1);
}

const failures = [];

if (!metadata.authorization_endpoint) failures.push("authorization_endpoint missing");
if (!metadata.token_endpoint) failures.push("token_endpoint missing");

const pkce = Array.isArray(metadata.code_challenge_methods_supported)
  ? metadata.code_challenge_methods_supported
  : [];

if (!pkce.includes("S256")) {
  failures.push("code_challenge_methods_supported does not include S256");
}

console.log(JSON.stringify({
  source,
  issuer: metadata.issuer ?? null,
  authorization_endpoint: metadata.authorization_endpoint ?? null,
  token_endpoint: metadata.token_endpoint ?? null,
  code_challenge_methods_supported: pkce,
  alexaCompatibleDiscovery: failures.length === 0
}, null, 2));

if (failures.length > 0) {
  console.error(`FAIL: ${failures.join("; ")}`);
  process.exit(1);
}

console.log("PASS: authorization-server discovery exposes the Alexa+ pre-flight fields.");
