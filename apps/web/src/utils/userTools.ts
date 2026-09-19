import type { ClinicalSpecialty } from "@peds-core/core";

const favoritesKey = "pedscore:favorites:v1";
const recentsKey = "pedscore:recents:v1";
const maxRecents = 8;
const preferredSpecialtyKey = "pedscore:preferred-specialty:v1";

const clinicalSpecialties: ClinicalSpecialty[] = [
  "neonatology","emergency_medicine","intensive_care","respiratory","cardiology","nephrology",
  "gastroenterology","inflammatory_bowel_disease","hepatology","rheumatology","neurology","endocrinology",
  "growth_development","pain_medicine","sedation","infectious_disease","hematology","oncology",
  "adolescent_medicine","behavioral_health","developmental_pediatrics","nutrition","trauma","burns",
  "patient_safety","disaster_medicine","transplant_medicine","general_pediatrics"
];

const readIds = (key: string): string[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(key);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed)
      ? parsed.filter((value): value is string => typeof value === "string")
      : [];
  } catch {
    return [];
  }
};

const writeIds = (key: string, ids: string[]) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(ids));
    window.dispatchEvent(new CustomEvent("pedscore:user-tools-changed"));
  } catch {
    // Personal shortcuts must never affect clinical rendering.
  }
};

export const getFavoriteToolIds = (): string[] => readIds(favoritesKey);

export const isFavoriteTool = (toolId: string): boolean =>
  getFavoriteToolIds().includes(toolId);

export const toggleFavoriteTool = (toolId: string): boolean => {
  const current = getFavoriteToolIds();
  const next = current.includes(toolId)
    ? current.filter((id) => id !== toolId)
    : [toolId, ...current];
  writeIds(favoritesKey, next);
  return next.includes(toolId);
};

export const getRecentToolIds = (): string[] => readIds(recentsKey);

export const recordRecentTool = (toolId: string): void => {
  const next = [toolId, ...getRecentToolIds().filter((id) => id !== toolId)].slice(0, maxRecents);
  writeIds(recentsKey, next);
};

export const getPreferredSpecialty = (): ClinicalSpecialty | null => {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(preferredSpecialtyKey);
    return clinicalSpecialties.includes(value as ClinicalSpecialty)
      ? (value as ClinicalSpecialty)
      : null;
  } catch {
    return null;
  }
};

export const setPreferredSpecialty = (specialty: ClinicalSpecialty | null): void => {
  if (typeof window === "undefined") return;
  try {
    if (specialty) {
      window.localStorage.setItem(preferredSpecialtyKey, specialty);
    } else {
      window.localStorage.removeItem(preferredSpecialtyKey);
    }
    window.dispatchEvent(new CustomEvent("pedscore:user-tools-changed"));
  } catch {
    // Personal preferences must never affect clinical rendering.
  }
};

export const userToolsStorageDescription = {
  es: "Favoritos y recientes se guardan solo en este dispositivo. No incluyen datos clínicos ni resultados.",
  en: "Favorites and recent tools are stored only on this device. They do not include clinical data or results."
} as const;
