const CACHE_VERSION = "v1";
const STATIC_CACHE = `static-${CACHE_VERSION}`;
const RUNTIME_CACHE = `runtime-${CACHE_VERSION}`;
const OFFLINE_URL = "/offline";
const PRECACHE_URLS = [
  "/",
  OFFLINE_URL,
  "/manifest.json",
  "/icon-192.svg",
  "/icon-512.svg",
  "/maskable-icon.svg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => cache.addAll(PRECACHE_URLS)),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => ![STATIC_CACHE, RUNTIME_CACHE].includes(key))
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method !== "GET") {
    return;
  }

  const url = new URL(request.url);

  if (url.origin !== self.location.origin) {
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(handleNavigationRequest(request));
    return;
  }

  if (
    url.pathname.startsWith("/_next/static/") ||
    /\.(?:js|css|png|jpg|jpeg|svg|gif|webp|woff2?)$/i.test(url.pathname)
  ) {
    event.respondWith(staleWhileRevalidate(request));
    return;
  }

  event.respondWith(networkFirst(request));
});

async function handleNavigationRequest(request) {
  try {
    const response = await fetch(request);
    await putInRuntimeCache(request, response);
    return response;
  } catch {
    const cachedResponse = await caches.match(request);

    if (cachedResponse) {
      return cachedResponse;
    }

    return caches.match(OFFLINE_URL);
  }
}

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    await putInRuntimeCache(request, response);
    return response;
  } catch (error) {
    const cachedResponse = await caches.match(request);

    if (cachedResponse) {
      return cachedResponse;
    }

    throw error;
  }
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(RUNTIME_CACHE);
  const cachedResponse = await cache.match(request);

  const networkResponsePromise = fetch(request)
    .then((response) => {
      if (response && response.ok) {
        cache.put(request, response.clone());
      }

      return response;
    })
    .catch(() => cachedResponse);

  return cachedResponse || networkResponsePromise;
}

async function putInRuntimeCache(request, response) {
  if (!response || !response.ok) {
    return;
  }

  const cache = await caches.open(RUNTIME_CACHE);
  await cache.put(request, response.clone());
}
