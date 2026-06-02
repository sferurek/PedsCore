import { useEffect, useMemo, useState } from "react";
import { getAllTools, getToolBySlug } from "@peds-core/core";
import type { ToolCategory } from "@peds-core/core";
import { Layout } from "./components/Layout";
import { AboutPage } from "./routes/AboutPage";
import { CategoryPage } from "./routes/CategoryPage";
import { ContributePage } from "./routes/ContributePage";
import { DisclaimerPage } from "./routes/DisclaimerPage";
import { EvidencePage } from "./routes/EvidencePage";
import { HomePage } from "./routes/HomePage";
import { NotFoundPage } from "./routes/NotFoundPage";
import { ToolPage } from "./routes/ToolPage";
import { ToolsPage } from "./routes/ToolsPage";
import {
  isSupportedLanguage,
  languageStorageKey,
  resolveInitialLanguage
} from "./utils/language";
import { parseRoute, toAppPath, toBrowserPath } from "./utils/routes";

export function App() {
  const [path, setPath] = useState(() => toAppPath(window.location.pathname));
  const route = useMemo(() => parseRoute(path), [path]);
  const [language, setLanguage] = useState(() =>
    route.language ?? resolveInitialLanguage()
  );

  useEffect(() => {
    if (route.language && route.language !== language) {
      setLanguage(route.language);
    }
  }, [language, route.language]);

  useEffect(() => {
    if (path !== "/" || route.language) {
      return;
    }

    const nextPath = `/${language}`;
    window.history.replaceState(null, "", toBrowserPath(nextPath));
    setPath(nextPath);
  }, [language, path, route.language]);

  useEffect(() => {
    const handlePopState = () => setPath(toAppPath(window.location.pathname));
    window.addEventListener("popstate", handlePopState);

    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = (href: string) => {
    window.history.pushState(null, "", toBrowserPath(href));
    setPath(href);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const changeLanguage = (nextLanguage: "es" | "en") => {
    localStorage.setItem(languageStorageKey, nextLanguage);
    const nextPath = route.withLanguage(nextLanguage);
    window.history.pushState(null, "", toBrowserPath(nextPath));
    setLanguage(nextLanguage);
    setPath(nextPath);
  };

  if (!isSupportedLanguage(language)) {
    return <NotFoundPage language="en" navigate={navigate} />;
  }

  if (!route.language) {
    return null;
  }

  const content = (() => {
    if (route.kind === "home") {
      return <HomePage language={language} navigate={navigate} />;
    }

    if (route.kind === "tools") {
      return <ToolsPage language={language} navigate={navigate} />;
    }

    if (route.kind === "tool" && route.slug) {
      const tool = getToolBySlug(route.slug);
      return tool ? (
        <ToolPage language={language} navigate={navigate} tool={tool} />
      ) : (
        <NotFoundPage language={language} navigate={navigate} />
      );
    }

    if (route.kind === "category" && route.category) {
      const knownCategory = getAllTools().some(
        (tool) => tool.category === route.category
      );

      return knownCategory ? (
        <CategoryPage
          category={route.category as ToolCategory}
          language={language}
          navigate={navigate}
        />
      ) : (
        <NotFoundPage language={language} navigate={navigate} />
      );
    }

    if (route.kind === "about") {
      return <AboutPage language={language} />;
    }

    if (route.kind === "evidence") {
      return <EvidencePage language={language} />;
    }

    if (route.kind === "disclaimer") {
      return <DisclaimerPage language={language} />;
    }

    if (route.kind === "contribute") {
      return <ContributePage language={language} />;
    }

    return <NotFoundPage language={language} navigate={navigate} />;
  })();

  return (
    <Layout
      currentPath={path}
      language={language}
      navigate={navigate}
      onLanguageChange={changeLanguage}
    >
      {content}
    </Layout>
  );
}
