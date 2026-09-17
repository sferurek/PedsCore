import type { PropsWithChildren } from "react";
import type { Language } from "../utils/language";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { OssSupportBanner } from "./OssSupportBanner";

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
  const isHomePage = currentPath === `/${language}`;
  const isPramPilot = currentPath === `/${language}/tools/pram`;
  const frameClassName = isHomePage
    ? "app-frame atlas-home-frame"
    : isPramPilot
      ? "app-frame atlas-pram-frame"
      : "app-frame";

  return (
    <div className={frameClassName}>
      <Header
        currentPath={currentPath}
        language={language}
        navigate={navigate}
        onLanguageChange={onLanguageChange}
      />
      {isHomePage || isPramPilot ? null : <OssSupportBanner language={language} />}
      <main id="main-content" tabIndex={-1}>{children}</main>
      <Footer language={language} navigate={navigate} />
    </div>
  );
}