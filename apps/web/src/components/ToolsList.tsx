import type { ClinicalToolMetadata } from "@peds-core/core";
import type { Language } from "../utils/language";
import { ToolCard } from "./ToolCard";

interface ToolsListProps {
  language: Language;
  navigate: (href: string) => void;
  tools: ClinicalToolMetadata[];
}

export function ToolsList({ language, navigate, tools }: ToolsListProps) {
  return (
    <div className="tool-grid">
      {tools.map((tool) => (
        <ToolCard
          key={tool.id}
          language={language}
          navigate={navigate}
          tool={tool}
        />
      ))}
    </div>
  );
}

