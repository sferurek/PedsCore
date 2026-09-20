#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const manifestPath = path.resolve("alexa-addon/addon-package/addon.json");
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

const fail = (message) => {
  console.error(`Alexa manifest validation failed: ${message}`);
  process.exit(1);
};

if (manifest.manifestVersion !== "1.0") fail("manifestVersion must be 1.0");

const listing = manifest.storeListing?.locales?.["en-US"];
if (!listing) fail("en-US store listing is required");

if (!listing.name?.value || listing.name.value.length > 30) fail("name.value must be 1-30 characters");
if (!listing.shortDescription || listing.shortDescription.length > 123) fail("shortDescription must be 1-123 characters");
if (!listing.fullDescription || listing.fullDescription.length > 4000) fail("fullDescription must be 1-4000 characters");

if (!Array.isArray(listing.examplePhrases) || listing.examplePhrases.length < 3 || listing.examplePhrases.length > 4) {
  fail("examplePhrases must contain 3-4 items");
}
for (const phrase of listing.examplePhrases) {
  if (typeof phrase !== "string" || phrase.length === 0 || phrase.length > 200) {
    fail("each example phrase must be 1-200 characters");
  }
}

const requireHttps = (value, label) => {
  if (typeof value !== "string" || !value.startsWith("https://")) fail(`${label} must be HTTPS`);
};

requireHttps(listing.privacyAndCompliance?.privacyPolicyUrl, "privacyPolicyUrl");
requireHttps(listing.privacyAndCompliance?.termsOfUseUrl, "termsOfUseUrl");

const requiredIconSizes = ["72x72", "64x64", "88x88", "126x126", "180x180", "241x241"];
const lightIcons = listing.mediaAssets?.icons?.light;
if (!Array.isArray(lightIcons)) fail("mediaAssets.icons.light is required");

for (const size of requiredIconSizes) {
  const icon = lightIcons.find((candidate) => candidate.size === size);
  if (!icon) fail(`missing light icon ${size}`);
  requireHttps(icon.uri, `light icon ${size}`);
  if (!/\.(png|jpe?g|webp)(?:\?.*)?$/i.test(icon.uri)) fail(`light icon ${size} must be PNG/JPG/JPEG/WEBP`);
}

const carousel = listing.mediaAssets?.carouselImages;
if (!Array.isArray(carousel) || carousel.length < 1 || carousel.length > 5) {
  fail("carouselImages must contain 1-5 images");
}
for (const image of carousel) {
  if (image.size !== "600x900") fail("carousel image size must be 600x900");
  if (!image.altText || image.altText.length > 250) fail("carousel altText must be 1-250 characters");
  requireHttps(image.uri, "carousel image");
}

const integration = manifest.integrations?.find((candidate) => candidate.type === "MCP");
if (!integration) fail("MCP integration is required");
const endpoint = integration.config?.endpoints?.default;
if (endpoint?.type !== "HTTPS") fail("MCP endpoint type must be HTTPS");
requireHttps(endpoint?.uri, "MCP endpoint URI");

console.log("Alexa+ addon.json static validation passed.");
