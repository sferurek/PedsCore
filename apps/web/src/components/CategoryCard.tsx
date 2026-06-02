import type { ToolCategory } from "@peds-core/core";
import { categoryDescriptions, categoryLabels } from "../i18n/translations";
import type { Language } from "../utils/language";
import { makePath } from "../utils/routes";

interface CategoryCardProps {
  category: ToolCategory;
  count: number;
  language: Language;
  navigate: (href: string) => void;
}

export function CategoryCard({
  category,
  count,
  language,
  navigate
}: CategoryCardProps) {
  return (
    <button
      className="category-card"
      type="button"
      onClick={() => navigate(makePath(language, "categories", category))}
    >
      <span>{categoryLabels[category][language]}</span>
      <strong>{count}</strong>
      <p>{categoryDescriptions[category][language]}</p>
    </button>
  );
}

