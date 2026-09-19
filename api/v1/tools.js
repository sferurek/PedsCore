import {
  getAllTools,
  getClinicalReviewRecord,
  getToolDiscovery
} from "@peds-core/core";

const apiVersion = "v1";
const catalogVersion = "0.1.0";
const defaultLimit = 50;
const maxLimit = 200;
const cacheSeconds = 3600;
const maxCacheSeconds = 21600;

const queryValue = (value) =>
  Array.isArray(value) ? value[0] : typeof value === "string" ? value : undefined;

const clampInteger = (value, fallback, min, max) => {
  const parsed = Number.parseInt(String(value ?? ""), 10);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(max, Math.max(min, parsed));
};

const normalized = (value) =>
  String(value ?? "")
    .toLocaleLowerCase("en")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");

export const serializeReference = (reference) => ({
  id: reference.id,
  title: reference.title,
  evidenceLevel: reference.evidenceLevel,
  authors: reference.authors ?? null,
  year: reference.year ?? null,
  journalOrPublisher: reference.journalOrPublisher ?? null,
  doi: reference.doi ?? null,
  pmid: reference.pmid ?? null,
  url: reference.url ?? null,
  sourceType: reference.sourceType ?? null,
  accessType: reference.accessType ?? null
});

const serializeInput = (input) => ({
  id: input.id,
  label: input.label,
  description: input.description ?? input.helperText ?? null,
  type: input.type,
  required: input.required,
  unit: input.unit ?? null,
  min: input.min ?? null,
  max: input.max ?? null,
  step: input.step ?? null,
  placeholder: input.placeholder ?? null,
  visibleWhen: input.visibleWhen ?? [],
  options: (input.options ?? []).map((option) => ({
    id: option.id,
    label: option.label,
    description: option.description ?? null
  }))
});

export const serializeToolForApi = (tool, detail = false) => {
  const discovery = getToolDiscovery(tool.id);
  const review = getClinicalReviewRecord(tool.id);
  const localActive = discovery?.calculationAvailability === "local_active";

  const base = {
    id: tool.id,
    slug: tool.slug,
    name: tool.name,
    shortName: tool.shortName ?? null,
    category: tool.category,
    subcategory: tool.subcategory,
    type: tool.type,
    population: tool.population,
    description: tool.description,
    implementationStatus: tool.implementationStatus,
    calculationStatus: tool.calculationStatus ?? null,
    evidenceLevel: tool.evidenceLevel,
    regulatoryRisk: tool.regulatoryRisk,
    discovery: discovery
      ? {
          surfaceStatus: discovery.surfaceStatus,
          calculationAvailability: discovery.calculationAvailability,
          reuseStatus: discovery.reuseStatus,
          clinicalRiskTier: discovery.clinicalRiskTier,
          specialties: discovery.specialties,
          ageGroups: discovery.ageGroups,
          careSettings: discovery.careSettings,
          clinicalFunctions: discovery.clinicalFunctions,
          interactionModes: discovery.interactionModes,
          longitudinalUse: discovery.longitudinalUse
        }
      : null,
    review: {
      tier: review.tier,
      technicalAudit: review.technicalAudit
        ? {
            status: review.technicalAudit.status,
            auditDate: review.technicalAudit.auditDate,
            verificationSha: review.technicalAudit.verificationSha,
            reportPath: review.technicalAudit.reportPath
          }
        : null,
      independentReviewStatus: review.independentReviewStatus,
      independentReview: review.independentReview
    },
    links: {
      es: `https://peds-core.vercel.app/es/tools/${tool.slug}`,
      en: `https://peds-core.vercel.app/en/tools/${tool.slug}`
    }
  };

  if (!detail) {
    return {
      ...base,
      referenceCount: tool.references.length,
      inputSchemaAvailable: localActive
    };
  }

  return {
    ...base,
    validationNotes: tool.validationNotes,
    calculationNotes: tool.calculationNotes ?? null,
    references: tool.references.map(serializeReference),
    inputSchemaAvailable: localActive,
    inputs: localActive ? (tool.inputs ?? []).map(serializeInput) : null,
    interpretationBands: localActive
      ? (tool.interpretationBands ?? []).map((band) => ({
          id: band.id,
          label: band.label,
          min: band.min ?? null,
          max: band.max ?? null,
          description: band.description ?? null
        }))
      : null
  };
};

const findTool = (idOrSlug) =>
  getAllTools().find(
    (tool) => tool.id === idOrSlug || tool.slug === idOrSlug
  );

const filterTools = (tools, query) => {
  const q = normalized(query).trim();
  if (!q) return tools;

  return tools.filter((tool) =>
    normalized(
      [
        tool.id,
        tool.slug,
        tool.shortName,
        tool.name.es,
        tool.name.en,
        tool.category,
        tool.subcategory
      ]
        .filter(Boolean)
        .join(" ")
    ).includes(q)
  );
};

const sendJson = (req, res, statusCode, body) => {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Accept, Content-Type");
  res.setHeader(
    "Cache-Control",
    statusCode === 200
      ? `public, s-maxage=${cacheSeconds}, stale-while-revalidate=${maxCacheSeconds}`
      : "no-store"
  );
  res.end(req.method === "HEAD" ? undefined : JSON.stringify(body));
};

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Accept, Content-Type");
    res.setHeader("Cache-Control", "public, max-age=86400");
    res.end();
    return;
  }

  if (req.method && !["GET", "HEAD"].includes(req.method)) {
    sendJson(req, res, 405, {
      apiVersion,
      status: "method_not_allowed"
    });
    return;
  }

  const id = queryValue(req.query?.id);
  if (id) {
    const tool = findTool(id);
    if (!tool) {
      sendJson(req, res, 404, {
        apiVersion,
        status: "not_found",
        id
      });
      return;
    }

    sendJson(req, res, 200, {
      apiVersion,
      catalogVersion,
      scope: "metadata_only",
      tool: serializeToolForApi(tool, true)
    });
    return;
  }

  const query = queryValue(req.query?.q) ?? "";
  const all = filterTools(getAllTools(), query);
  const offset = clampInteger(queryValue(req.query?.offset), 0, 0, Math.max(0, all.length));
  const limit = clampInteger(queryValue(req.query?.limit), defaultLimit, 1, maxLimit);
  const page = all.slice(offset, offset + limit);

  sendJson(req, res, 200, {
    apiVersion,
    catalogVersion,
    scope: "metadata_only",
    total: all.length,
    offset,
    limit,
    hasMore: offset + page.length < all.length,
    tools: page.map((tool) => serializeToolForApi(tool, false))
  });
}
