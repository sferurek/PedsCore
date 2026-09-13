import { getToolDiscovery } from "@peds-core/core";
import type { ImplementationStatus } from "@peds-core/core";
import { statusLabels, surfaceStatusLabels } from "../i18n/translations";
import type { Language } from "../utils/language";

interface ToolStatusBadgeProps {
  language: Language;
  status: ImplementationStatus;
  toolId?: string;
}

export function ToolStatusBadge({
  language,
  status,
  toolId
}: ToolStatusBadgeProps) {
  const surfaceStatus = toolId ? getToolDiscovery(toolId)?.surfaceStatus : undefined;

  if (surfaceStatus) {
    return (
      <span className={`status-badge surface-status-${surfaceStatus}`}>
        {surfaceStatusLabels[surfaceStatus][language]}
      </span>
    );
  }

  return (
    <span className={`status-badge status-${status}`}>
      {statusLabels[status][language]}
    </span>
  );
}
