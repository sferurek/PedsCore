import { getSemanticRelatedTools, type ClinicalToolMetadata } from "@peds-core/core";
import { useEffect, useMemo, useRef, useState } from "react";
import { PramShowcasePage } from "../components/PramShowcasePage";
import { trackUsageEvent } from "../utils/analytics";
import type { FormValues } from "../utils/formState";
import { getInitialFormState } from "../utils/formState";
import type { Language } from "../utils/language";
import { makePath } from "../utils/routes";
import {
  isFavoriteTool,
  recordRecentTool,
  toggleFavoriteTool
} from "../utils/userTools";

interface PramPilotPageProps {
  language: Language;
  navigate: (href: string) => void;
  tool: ClinicalToolMetadata;
}

export function PramPilotPage({ language, navigate, tool }: PramPilotPageProps) {
  const [values, setValues] = useState<FormValues>(() => getInitialFormState(tool));
  const [favorite, setFavorite] = useState(() => isFavoriteTool(tool.id));
  const resultRef = useRef<HTMLElement>(null);
  const completedRef = useRef(false);
  const relatedTools = useMemo(() => getSemanticRelatedTools(tool, 4), [tool]);
  const analyticsPath = makePath(language, "tools", tool.slug);
  const analyticsParams = useMemo(
    () => ({
      toolId: tool.id,
      toolType: tool.type,
      category: tool.category,
      status: tool.implementationStatus
    }),
    [tool.category, tool.id, tool.implementationStatus, tool.type]
  );

  useEffect(() => {
    setValues(getInitialFormState(tool));
    setFavorite(isFavoriteTool(tool.id));
    completedRef.current = false;
    recordRecentTool(tool.id);
    trackUsageEvent("case_opened", analyticsPath, language, analyticsParams);
  }, [analyticsParams, analyticsPath, language, tool]);

  const handleFavorite = () => {
    const next = toggleFavoriteTool(tool.id);
    setFavorite(next);
    if (next) {
      trackUsageEvent("favorite_added", analyticsPath, language, analyticsParams);
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: tool.name[language], url });
      } else {
        await navigator.clipboard.writeText(url);
      }
      trackUsageEvent("share_used", analyticsPath, language, analyticsParams);
    } catch {
      // Native-share cancellation must not affect the calculator.
    }
  };

  const handleComplete = () => {
    resultRef.current?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "nearest"
    });

    if (completedRef.current) return;
    completedRef.current = true;
    trackUsageEvent("case_completed", analyticsPath, language, analyticsParams);
    trackUsageEvent("score_calculated", analyticsPath, language, analyticsParams);
  };

  return (
    <PramShowcasePage
      favorite={favorite}
      language={language}
      navigate={navigate}
      onFavorite={handleFavorite}
      onFormComplete={handleComplete}
      onShare={handleShare}
      relatedTools={relatedTools}
      resultRef={resultRef}
      setValues={setValues}
      tool={tool}
      values={values}
    />
  );
}
