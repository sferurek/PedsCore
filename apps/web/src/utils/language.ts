export type Language = "es" | "en";

const supportedLanguages: Language[] = ["es", "en"];
export const languageStorageKey = "peds-core-language";

export const isSupportedLanguage = (value: string): value is Language =>
  supportedLanguages.includes(value as Language);

export const getStoredLanguage = (): Language | null => {
  const storedLanguage = localStorage.getItem(languageStorageKey);
  return storedLanguage && isSupportedLanguage(storedLanguage)
    ? storedLanguage
    : null;
};

export const getBrowserLanguage = (): Language => {
  const browserLanguage = navigator.language.toLocaleLowerCase("en");
  return browserLanguage.startsWith("es") ? "es" : "en";
};

export const resolveInitialLanguage = (): Language =>
  getStoredLanguage() ?? getBrowserLanguage();
