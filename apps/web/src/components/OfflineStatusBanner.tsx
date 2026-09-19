import { useEffect, useState } from "react";
import type { Language } from "../utils/language";

interface OfflineStatusBannerProps {
  language: Language;
}

export function OfflineStatusBanner({ language }: OfflineStatusBannerProps) {
  const [offline, setOffline] = useState(
    () => typeof navigator !== "undefined" && navigator.onLine === false
  );

  useEffect(() => {
    const sync = () => setOffline(navigator.onLine === false);
    window.addEventListener("online", sync);
    window.addEventListener("offline", sync);
    return () => {
      window.removeEventListener("online", sync);
      window.removeEventListener("offline", sync);
    };
  }, []);

  if (!offline) return null;

  return (
    <div className="offline-status-banner" role="status" aria-live="polite">
      <strong>{language === "es" ? "Modo sin conexión" : "Offline mode"}</strong>
      <span>
        {language === "es"
          ? "PedsCore puede mostrar la aplicación y páginas previamente cargadas. Verifica fuentes y actualizaciones cuando recuperes la conexión."
          : "PedsCore can show the app and previously loaded pages. Recheck sources and updates once you are back online."}
      </span>
    </div>
  );
}
