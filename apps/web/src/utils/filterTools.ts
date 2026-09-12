import {
  getToolDiscovery,
  searchTools
} from "@peds-core/core";
import type {
  AgeGroupTag,
  CareSettingTag,
  ClinicalFunctionTag,
  ClinicalSpecialty,
  ClinicalToolMetadata,
  ImplementationStatus,
  InteractionMode,
  Language,
  ToolCategory,
  ToolType
} from "@peds-core/core";

export interface ToolFilters {
  query: string;
  category: ToolCategory | "all";
  type: ToolType | "all";
  status: ImplementationStatus | "all";
  specialty: ClinicalSpecialty | "all";
  ageGroup: AgeGroupTag | "all";
  setting: CareSettingTag | "all";
  clinicalFunction: ClinicalFunctionTag | "all";
  interactionMode: InteractionMode | "all";
  localCalculationOnly: boolean;
  longitudinalOnly: boolean;
}

export const defaultFilters: ToolFilters = {
  query: "",
  category: "all",
  type: "all",
  status: "all",
  specialty: "all",
  ageGroup: "all",
  setting: "all",
  clinicalFunction: "all",
  interactionMode: "all",
  localCalculationOnly: false,
  longitudinalOnly: false
};

export const filterTools = (
  tools: ClinicalToolMetadata[],
  filters: ToolFilters,
  language: Language
): ClinicalToolMetadata[] => {
  const searchedTools = filters.query.trim()
    ? searchTools(filters.query, language)
    : tools;
  const searchedToolIds = new Set(searchedTools.map((tool) => tool.id));

  return tools.filter((tool) => {
    if (!searchedToolIds.has(tool.id)) return false;
    if (filters.category !== "all" && tool.category !== filters.category) return false;
    if (filters.type !== "all" && tool.type !== filters.type) return false;
    if (filters.status !== "all" && tool.implementationStatus !== filters.status) return false;

    const discovery = getToolDiscovery(tool.id);
    if (!discovery) return false;

    if (filters.specialty !== "all" && !discovery.specialties.includes(filters.specialty)) return false;
    if (filters.ageGroup !== "all" && !discovery.ageGroups.includes(filters.ageGroup)) return false;
    if (filters.setting !== "all" && !discovery.careSettings.includes(filters.setting)) return false;
    if (filters.clinicalFunction !== "all" && !discovery.clinicalFunctions.includes(filters.clinicalFunction)) return false;
    if (filters.interactionMode !== "all" && !discovery.interactionModes.includes(filters.interactionMode)) return false;

    if (filters.localCalculationOnly && discovery.calculationAvailability !== "local_active") return false;
    if (
      filters.longitudinalOnly &&
      !["primary","supported"].includes(discovery.longitudinalUse)
    ) return false;

    return true;
  });
};
