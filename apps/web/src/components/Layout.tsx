import type { PropsWithChildren } from "react";
import type { Language } from "../utils/language";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { OssSupportBanner } from "./OssSupportBanner";
import { OfflineStatusBanner } from "./OfflineStatusBanner";

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
  const isToolDetailPage = currentPath.startsWith(`/${language}/tools/`);
  const frameClassName = isHomePage
    ? "app-frame atlas-home-frame"
    : isToolDetailPage
      ? "app-frame atlas-pram-frame atlas-tool-v3-frame"
      : "app-frame";

  return (
    <div className={frameClassName}>
      <a className="skip-link" href="#main-content">{language === "es" ? "Saltar al contenido principal" : "Skip to main content"}</a>
      <Header
        currentPath={currentPath}
        language={language}
        navigate={navigate}
        onLanguageChange={onLanguageChange}
      />
      <OfflineStatusBanner language={language} />
      {isHomePage || isToolDetailPage ? null : <OssSupportBanner language={language} />}
      <main id="main-content" tabIndex={-1}>{children}</main>
      <Footer language={language} navigate={navigate} minimal={isToolDetailPage} />
    </div>
  );
}
