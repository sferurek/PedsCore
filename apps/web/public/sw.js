/* global self, caches, fetch, URL */
const CACHE_NAME = "pedscore-shell-v1";
const PRECACHE_URLS = [
  "/",
  "/en",
  "/es",
  "/favicon.svg",
  "/manifest.webmanifest"
];

const canCache = (request) => {
  if (request.method !== "GET") return false;
  const url = new URL(request.url);
  return url.origin === self.location.origin && !url.search;
};

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys
          .filter((key) => key.startsWith("pedscore-shell-") && key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (!canCache(request)) return;

  if (request.mode === "navigate") {
    const url = new URL(request.url);
    const languageFallback = url.pathname.startsWith("/es") ? "/es" : "/en";
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            const copy = response.clone();
            void caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(async () => {
          return (
            await caches.match(request) ||
            await caches.match(languageFallback) ||
            await caches.match("/")
          );
        })
    );
    return;
  }

  const destination = request.destination;
  if (!["script", "style", "image", "font", "manifest"].includes(destination)) {
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      const network = fetch(request)
        .then((response) => {
          if (response.ok) {
            const copy = response.clone();
            void caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => cached);

      return cached || network;
    })
  );
});
