import {
  getAllTools,
  getClinicalReviewRecord,
  getToolDiscovery
} from "@peds-core/core";

export const apiVersion = "v1";

const firstAuthoritativeReference = (tool) =>
  tool.references.find((reference) =>
    ["original_derivation_study", "clinical_practice_guideline"].includes(reference.evidenceLevel)
  ) ?? tool.references[0] ?? null;

const publicReference = (reference) => {
  if (!reference) return null;
  return {
    title: reference.title,
    year: reference.year ?? null,
    doi: reference.doi ?? null,
    pmid: reference.pmid ?? null,
    url: reference.url ?? null,
    evidenceLevel: reference.evidenceLevel ?? null
  };
};

export const serializeTool = (tool) => {
  const discovery = getToolDiscovery(tool.id);
  const review = getClinicalReviewRecord(tool.id);
  const primaryReference = firstAuthoritativeReference(tool);

  return {
    id: tool.id,
    slug: tool.slug,
    shortName: tool.shortName ?? null,
    name: tool.name,
    description: tool.description,
    category: tool.category,
    subcategory: tool.subcategory,
    type: tool.type,
    targetPopulation: tool.targetPopulation,
    implementationStatus: tool.implementationStatus,
    calculationStatus: tool.calculationStatus ?? null,
    calculationAvailability: discovery?.calculationAvailability ?? null,
    surfaceStatus: discovery?.surfaceStatus ?? null,
    reuseStatus: discovery?.reuseStatus ?? null,
    clinicalRiskTier: discovery?.clinicalRiskTier ?? tool.regulatoryRisk,
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
    primaryReference: publicReference(primaryReference),
    references: tool.references.map(publicReference),
    routes: {
      es: `/es/tools/${tool.slug}`,
      en: `/en/tools/${tool.slug}`
    }
  };
};

export const getPublicTools = () =>
  getAllTools()
    .map(serializeTool)
    .sort((a, b) => a.id.localeCompare(b.id));

export const getPublicTool = (idOrSlug) => {
  const value = String(idOrSlug ?? "").trim();
  if (!value) return null;
  const tool = getAllTools().find(
    (candidate) => candidate.id === value || candidate.slug === value
  );
  return tool ? serializeTool(tool) : null;
};

export const sendApiJson = (req, res, statusCode, body, cacheSeconds = 900) => {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("X-PedsCore-API-Version", apiVersion);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, HEAD");
  res.setHeader("Access-Control-Allow-Headers", "Accept");
  res.setHeader(
    "Cache-Control",
    statusCode === 200
      ? `public, s-maxage=${cacheSeconds}, stale-while-revalidate=3600`
      : "no-store"
  );
  res.end(req.method === "HEAD" ? undefined : JSON.stringify(body));
};
