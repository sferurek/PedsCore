import type { Language } from "./language";

// Translate words only. Never convert the numeric value or its physical unit.
export const localizeInputUnit = (unit: string | undefined, language: Language): string | undefined => {
  if (!unit) return unit;
  const ageUnits: Record<string, Record<Language, string>> = {
    meses: { es: "meses", en: "months" }, months: { es: "meses", en: "months" },
    años: { es: "años", en: "years" }, years: { es: "años", en: "years" },
    días: { es: "días", en: "days" }, days: { es: "días", en: "days" },
    semanas: { es: "semanas", en: "weeks" }, weeks: { es: "semanas", en: "weeks" }
  };
  return ageUnits[unit]?.[language] ?? unit;
};
