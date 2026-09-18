import type {
  CalculationResult,
  ClinicalToolDiscoveryMetadata,
  ClinicalToolMetadata,
  Language,
  ToolInput
} from "../types.js";
import { clinicalTools, getToolBySlug } from "../catalog/clinicalTools.js";
import { calculateTool, implementedCalculatorToolIds } from "../calculators/registry.js";
import { getToolDiscovery } from "../discovery/toolDiscovery.js";

export interface AgentToolSummary {
  id: string;
  slug: string;
  name: string;
  shortName?: string;
  description: string;
  population: string;
  category: string;
  type: string;
  implementationStatus: string;
  calculationAvailable: boolean;
  discovery?: Pick<
    ClinicalToolDiscoveryMetadata,
    | "surfaceStatus"
    | "specialties"
    | "clinicalProblems"
    | "ageGroups"
    | "careSettings"
    | "clinicalFunctions"
    | "interactionModes"
    | "calculationAvailability"
    | "clinicalRiskTier"
  >;
}

export interface AgentToolInput {
  id: string;
  label: string;
  description?: string;
  type: ToolInput["type"];
  required: boolean;
  unit?: string;
  min?: number;
  max?: number;
  step?: number;
  options?: Array<{
    id: string;
    label: string;
    description?: string;
    score?: number;
    value?: string | number | boolean;
  }>;
}

export interface AgentToolDetail extends AgentToolSummary {
  inputs: AgentToolInput[];
  disclaimerRequired: boolean;
  evidenceLevel: string;
  regulatoryRisk: string;
  validationNotes: string;
  references: Array<{
    id: string;
    title: string;
    year?: number;
    doi?: string;
    pmid?: string;
    url?: string;
    evidenceLevel: string;
  }>;
}

export interface SearchClinicalToolsOptions {
  query: string;
  language?: Language;
  limit?: number;
  activeOnly?: boolean;
  calculableOnly?: boolean;
}

const localize = (
  text: { es: string; en: string } | undefined,
  language: Language
): string | undefined => text?.[language];

const normalize = (value: string): string =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

const discoveryFor = (tool: ClinicalToolMetadata): ClinicalToolDiscoveryMetadata | undefined =>
  getToolDiscovery(tool.id);

const hasLocalCalculator = (toolId: string): boolean =>
  implementedCalculatorToolIds.includes(toolId);

const toSummary = (
  tool: ClinicalToolMetadata,
  language: Language
): AgentToolSummary => {
  const discovery = discoveryFor(tool);

  return {
    id: tool.id,
    slug: tool.slug,
    name: tool.name[language],
    ...(tool.shortName ? { shortName: tool.shortName } : {}),
    description: tool.description[language],
    population: tool.population[language],
    category: tool.category,
    type: tool.type,
    implementationStatus: tool.implementationStatus,
    calculationAvailable: hasLocalCalculator(tool.id),
    ...(discovery
      ? {
          discovery: {
            surfaceStatus: discovery.surfaceStatus,
            specialties: discovery.specialties,
            clinicalProblems: discovery.clinicalProblems,
            ageGroups: discovery.ageGroups,
            careSettings: discovery.careSettings,
            clinicalFunctions: discovery.clinicalFunctions,
            interactionModes: discovery.interactionModes,
            calculationAvailability: discovery.calculationAvailability,
            clinicalRiskTier: discovery.clinicalRiskTier
          }
        }
      : {})
  };
};

const toInput = (input: ToolInput, language: Language): AgentToolInput => {
  const description = localize(input.description, language);

  return {
    id: input.id,
    label: input.label[language],
    ...(description !== undefined ? { description } : {}),
    type: input.type,
    required: input.required,
    ...(input.unit ? { unit: input.unit } : {}),
    ...(input.min !== undefined ? { min: input.min } : {}),
    ...(input.max !== undefined ? { max: input.max } : {}),
    ...(input.step !== undefined ? { step: input.step } : {}),
    ...(input.options
      ? {
          options: input.options.map((option) => {
            const optionDescription = localize(option.description, language);

            return {
              id: option.id,
              label: option.label[language],
              ...(optionDescription !== undefined
                ? { description: optionDescription }
                : {}),
              ...(option.score !== undefined ? { score: option.score } : {}),
              ...(option.value !== undefined ? { value: option.value } : {})
            };
          })
        }
      : {})
  };
};

const searchText = (tool: ClinicalToolMetadata, language: Language): string => {
  const discovery = discoveryFor(tool);
  const values = [
    tool.id,
    tool.slug,
    tool.name[language],
    tool.shortName ?? "",
    tool.description[language],
    tool.population[language],
    tool.category,
    tool.subcategory,
    ...(discovery?.aliases[language] ?? []),
    ...(discovery?.clinicalProblems ?? []),
    ...(discovery?.specialties ?? []),
    ...(discovery?.clinicalFunctions ?? []),
    ...(discovery?.careSettings ?? [])
  ];

  return normalize(values.join(" "));
};

const scoreMatch = (
  tool: ClinicalToolMetadata,
  normalizedQuery: string,
  language: Language
): number => {
  if (!normalizedQuery) {
    return 1;
  }

  const discovery = discoveryFor(tool);
  const exactCandidates = [
    tool.id,
    tool.slug,
    tool.name[language],
    tool.shortName ?? "",
    ...(discovery?.aliases[language] ?? [])
  ].map(normalize);

  if (exactCandidates.includes(normalizedQuery)) {
    return 100;
  }

  const queryTerms = normalizedQuery.split(/\s+/).filter(Boolean);
  const haystack = searchText(tool, language);

  if (haystack.includes(normalizedQuery)) {
    return 50 + queryTerms.length;
  }

  const matchedTerms = queryTerms.filter((term) => haystack.includes(term)).length;
  return matchedTerms === queryTerms.length ? 20 + matchedTerms : matchedTerms;
};

export const searchClinicalToolsForAgent = ({
  query,
  language = "en",
  limit = 5,
  activeOnly = true,
  calculableOnly = false
}: SearchClinicalToolsOptions): AgentToolSummary[] => {
  const normalizedQuery = normalize(query);
  const safeLimit = Math.max(1, Math.min(limit, 20));

  return clinicalTools
    .map((tool) => ({
      tool,
      discovery: discoveryFor(tool),
      score: scoreMatch(tool, normalizedQuery, language)
    }))
    .filter(({ tool, discovery, score }) => {
      if (score <= 0) return false;
      if (activeOnly && discovery?.surfaceStatus && discovery.surfaceStatus !== "active") {
        return false;
      }
      if (calculableOnly && !hasLocalCalculator(tool.id)) {
        return false;
      }
      return true;
    })
    .sort((a, b) => b.score - a.score || a.tool.slug.localeCompare(b.tool.slug))
    .slice(0, safeLimit)
    .map(({ tool }) => toSummary(tool, language));
};

export const getClinicalToolForAgent = (
  slugOrId: string,
  language: Language = "en"
): AgentToolDetail | undefined => {
  const tool =
    getToolBySlug(slugOrId) ??
    clinicalTools.find((candidate) => candidate.id === slugOrId);

  if (!tool) {
    return undefined;
  }

  return {
    ...toSummary(tool, language),
    inputs: (tool.inputs ?? []).map((input) => toInput(input, language)),
    disclaimerRequired: tool.disclaimerRequired,
    evidenceLevel: tool.evidenceLevel,
    regulatoryRisk: tool.regulatoryRisk,
    validationNotes: tool.validationNotes[language],
    references: tool.references.map((reference) => ({
      id: reference.id,
      title: reference.title,
      ...(reference.year !== undefined ? { year: reference.year } : {}),
      ...(reference.doi ? { doi: reference.doi } : {}),
      ...(reference.pmid ? { pmid: reference.pmid } : {}),
      ...(reference.url ? { url: reference.url } : {}),
      evidenceLevel: reference.evidenceLevel
    }))
  };
};

export const calculateClinicalToolForAgent = (
  toolId: string,
  input: Record<string, unknown>
): CalculationResult => calculateTool(toolId, input);
