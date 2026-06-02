import type { Language } from "./language";
import { isSupportedLanguage } from "./language";

export type RouteKind =
  | "home"
  | "tools"
  | "tool"
  | "category"
  | "evidence"
  | "about"
  | "disclaimer"
  | "contribute"
  | "not_found";

export interface ParsedRoute {
  kind: RouteKind;
  language: Language | null;
  slug?: string;
  category?: string;
  withLanguage: (language: Language) => string;
}

export const makePath = (
  language: Language,
  section?: string,
  value?: string
): string => {
  const parts = [language, section, value].filter(Boolean);
  return `/${parts.join("/")}`;
};

export const parseRoute = (path: string): ParsedRoute => {
  const segments = path.split("/").filter(Boolean);
  const firstSegment = segments[0];
  const language = firstSegment && isSupportedLanguage(firstSegment)
    ? firstSegment
    : null;
  const section = language ? segments[1] : undefined;
  const value = language ? segments[2] : undefined;

  const base = {
    language,
    withLanguage: (nextLanguage: Language) => {
      if (!section) {
        return makePath(nextLanguage);
      }

      return makePath(nextLanguage, section, value);
    }
  };

  if (!language) {
    return { ...base, kind: "home" };
  }

  if (!section) {
    return { ...base, kind: "home" };
  }

  if (section === "tools" && value) {
    return { ...base, kind: "tool", slug: value };
  }

  if (section === "tools") {
    return { ...base, kind: "tools" };
  }

  if (section === "categories" && value) {
    return { ...base, kind: "category", category: value };
  }

  if (section === "evidence") {
    return { ...base, kind: "evidence" };
  }

  if (section === "about") {
    return { ...base, kind: "about" };
  }

  if (section === "disclaimer") {
    return { ...base, kind: "disclaimer" };
  }

  if (section === "contribute") {
    return { ...base, kind: "contribute" };
  }

  return { ...base, kind: "not_found" };
};
