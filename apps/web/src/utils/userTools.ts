const favoritesKey = "pedscore:favorites:v1";
const recentsKey = "pedscore:recents:v1";
const maxRecents = 8;

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

export const userToolsStorageDescription = {
  es: "Favoritos y recientes se guardan solo en este dispositivo. No incluyen datos clínicos ni resultados.",
  en: "Favorites and recent tools are stored only on this device. They do not include clinical data or results."
} as const;
