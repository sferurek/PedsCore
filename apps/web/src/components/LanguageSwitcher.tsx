import type { Language } from "../utils/language";
import { translations } from "../i18n/translations";

interface LanguageSwitcherProps {
  language: Language;
  onLanguageChange: (language: Language) => void;
}

export function LanguageSwitcher({
  language,
  onLanguageChange
}: LanguageSwitcherProps) {
  const t = translations[language];

  return (
    <label className="language-switcher">
      <span>{t.common.language}</span>
      <select
        aria-label={t.common.language}
        value={language}
        onChange={(event) => onLanguageChange(event.target.value as Language)}
      >
        <option value="es">ES</option>
        <option value="en">EN</option>
      </select>
    </label>
  );
}

