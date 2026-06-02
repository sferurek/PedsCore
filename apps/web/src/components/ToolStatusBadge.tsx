import type { ImplementationStatus } from "@peds-core/core";
import { statusLabels } from "../i18n/translations";
import type { Language } from "../utils/language";

interface ToolStatusBadgeProps {
  language: Language;
  status: ImplementationStatus;
}

export function ToolStatusBadge({ language, status }: ToolStatusBadgeProps) {
  return (
    <span className={`status-badge status-${status}`}>
      {statusLabels[status][language]}
    </span>
  );
}

