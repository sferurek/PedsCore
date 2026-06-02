import type { PropsWithChildren } from "react";
import type { Language } from "../utils/language";
import { Footer } from "./Footer";
import { Header } from "./Header";

interface LayoutProps extends PropsWithChildren {
  currentPath: string;
  language: Language;
  navigate: (href: string) => void;
  onLanguageChange: (language: Language) => void;
}

export function Layout({
  children,
  currentPath,
  language,
  navigate,
  onLanguageChange
}: LayoutProps) {
  return (
    <div className="app-frame">
      <Header
        currentPath={currentPath}
        language={language}
        navigate={navigate}
        onLanguageChange={onLanguageChange}
      />
      <main>{children}</main>
      <Footer language={language} />
    </div>
  );
}

