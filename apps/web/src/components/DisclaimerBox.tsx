import { translations } from "../i18n/translations";
import type { Language } from "../utils/language";

interface DisclaimerBoxProps {
  language: Language;
}

export function DisclaimerBox({ language }: DisclaimerBoxProps) {
  return (
    <aside className="disclaimer-box">
      <p>{translations[language].tool.disclaimer}</p>
    </aside>
  );
}

