import { searchTools } from "@peds-core/core";
import type {
  ClinicalToolMetadata,
  ImplementationStatus,
  Language,
  ToolCategory,
  ToolType
} from "@peds-core/core";

export interface ToolFilters {
  query: string;
  category: ToolCategory | "all";
  type: ToolType | "all";
  status: ImplementationStatus | "all";
}

export const defaultFilters: ToolFilters = {
  query: "",
  category: "all",
  type: "all",
  status: "all"
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
    if (!searchedToolIds.has(tool.id)) {
      return false;
    }

    if (filters.category !== "all" && tool.category !== filters.category) {
      return false;
    }

    if (filters.type !== "all" && tool.type !== filters.type) {
      return false;
    }

    return filters.status === "all" || tool.implementationStatus === filters.status;
  });
};

