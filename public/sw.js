/**
 * Service Worker for Savanna Marketplace PWA
 * Implements offline-first architecture for African markets
 */

const CACHE_NAME = "savanna-marketplace-v1.0.0";
const STATIC_CACHE_NAME = "savanna-static-v1.0.0";
const DYNAMIC_CACHE_NAME = "savanna-dynamic-v1.0.0";

// Resources to cache immediately
const STATIC_ASSETS = [
  "/",
  "/manifest.json",
  "/offline.html",
  // Core CSS and JS will be added by build process
];

// API endpoints to cache with specific strategies
const API_CACHE_PATTERNS = [
  {
    pattern: /\/api\/v1\/products/,
    strategy: "cacheFirst",
    maxAge: 24 * 60 * 60 * 1000,
  },
  {
    pattern: /\/api\/v1\/categories/,
    strategy: "cacheFirst",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  },
  {
    pattern: /\/api\/v1\/user/,
    strategy: "networkFirst",
    maxAge: 60 * 60 * 1000,
  },
  {
    pattern: /\/api\/v1\/orders/,
    strategy: "networkFirst",
    maxAge: 5 * 60 * 1000,
  },
  {
    pattern: /\/api\/v1\/cart/,
    strategy: "networkFirst",
    maxAge: 1 * 60 * 1000,
  },
];

// Network quality detection
let networkQuality = "unknown";
let isOnline = navigator.onLine;

// Install event - cache static assets
self.addEventListener("install", (event) => {
  console.log("Service Worker: Installing...");

  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE_NAME).then((cache) => {
        console.log("Service Worker: Caching static assets");
        return cache.addAll(STATIC_ASSETS);
      }),
      // Skip waiting to activate immediately
      self.skipWaiting(),
    ]),
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  console.log("Service Worker: Activating...");

  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (
              cacheName !== STATIC_CACHE_NAME &&
              cacheName !== DYNAMIC_CACHE_NAME &&
              cacheName !== CACHE_NAME
            ) {
              console.log("Service Worker: Deleting old cache:", cacheName);
              return caches.delete(cacheName);
            }
          }),
        );
      }),
      // Claim all clients
      self.clients.claim(),
    ]),
  );
});

// Fetch event - implement caching strategies
self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== "GET") {
    return;
  }

  // Skip chrome-extension requests
  if (url.protocol === "chrome-extension:") {
    return;
  }

  // Handle API requests with specific strategies
  if (url.pathname.startsWith("/api/")) {
    event.respondWith(handleApiRequest(request));
    return;
  }

  // Handle static assets
  if (url.origin === location.origin) {
    event.respondWith(handleStaticRequest(request));
    return;
  }

  // Handle external resources (images, fonts, etc.)
  if (request.destination === "image" || request.destination === "font") {
    event.respondWith(handleResourceRequest(request));
    return;
  }
});

// Handle API requests with intelligent caching
async function handleApiRequest(request) {
  const url = new URL(request.url);
  const cachePattern = API_CACHE_PATTERNS.find((p) =>
    p.pattern.test(url.pathname),
  );

  if (!cachePattern) {
    // Default to network-first for unknown API endpoints
    return handleNetworkFirst(request, DYNAMIC_CACHE_NAME);
  }

  switch (cachePattern.strategy) {
    case "cacheFirst":
      return handleCacheFirst(request, DYNAMIC_CACHE_NAME, cachePattern.maxAge);
    case "networkFirst":
      return handleNetworkFirst(
        request,
        DYNAMIC_CACHE_NAME,
        cachePattern.maxAge,
      );
    case "staleWhileRevalidate":
      return handleStaleWhileRevalidate(request, DYNAMIC_CACHE_NAME);
    default:
      return handleNetworkFirst(request, DYNAMIC_CACHE_NAME);
  }
}

// Handle static requests (HTML, CSS, JS)
async function handleStaticRequest(request) {
  const url = new URL(request.url);

  // For navigation requests, implement app shell pattern
  if (request.mode === "navigate") {
    return handleNavigationRequest(request);
  }

  // For static assets, use cache-first strategy
  return handleCacheFirst(request, STATIC_CACHE_NAME);
}

// Handle navigation requests with app shell pattern
async function handleNavigationRequest(request) {
  try {
    // Try network first for navigation
    const networkResponse = await fetch(request);

    // Cache successful responses
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    // Fall back to cache
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    // Fall back to offline page
    const offlineResponse = await caches.match("/offline.html");
    if (offlineResponse) {
      return offlineResponse;
    }

    // Ultimate fallback
    return new Response(
      `<!DOCTYPE html>
       <html>
         <head><title>Offline - Savanna Marketplace</title></head>
         <body>
           <h1>🦁 You're Offline</h1>
           <p>Savanna Marketplace is not available offline. Please check your connection.</p>
         </body>
       </html>`,
      { headers: { "Content-Type": "text/html" } },
    );
  }
}

// Handle resource requests (images, fonts)
async function handleResourceRequest(request) {
  return handleCacheFirst(
    request,
    DYNAMIC_CACHE_NAME,
    30 * 24 * 60 * 60 * 1000,
  ); // 30 days
}

// Cache-first strategy
async function handleCacheFirst(
  request,
  cacheName,
  maxAge = 24 * 60 * 60 * 1000,
) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);

  if (cachedResponse) {
    const cacheDate = new Date(
      cachedResponse.headers.get("sw-cache-date") || 0,
    );
    const isExpired = Date.now() - cacheDate.getTime() > maxAge;

    if (!isExpired) {
      // Background update for freshness
      updateInBackground(request, cache);
      return cachedResponse;
    }
  }

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const responseToCache = networkResponse.clone();
      responseToCache.headers.set("sw-cache-date", new Date().toISOString());
      cache.put(request, responseToCache);
    }
    return networkResponse;
  } catch (error) {
    if (cachedResponse) {
      return cachedResponse;
    }
    throw error;
  }
}

// Network-first strategy
async function handleNetworkFirst(request, cacheName, maxAge = 5 * 60 * 1000) {
  const cache = await caches.open(cacheName);

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const responseToCache = networkResponse.clone();
      responseToCache.headers.set("sw-cache-date", new Date().toISOString());
      cache.put(request, responseToCache);
    }
    return networkResponse;
  } catch (error) {
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      const cacheDate = new Date(
        cachedResponse.headers.get("sw-cache-date") || 0,
      );
      const isExpired = Date.now() - cacheDate.getTime() > maxAge;

      if (!isExpired || !navigator.onLine) {
        return cachedResponse;
      }
    }
    throw error;
  }
}

// Stale-while-revalidate strategy
async function handleStaleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);

  const networkPromise = fetch(request)
    .then((response) => {
      if (response.ok) {
        const responseToCache = response.clone();
        responseToCache.headers.set("sw-cache-date", new Date().toISOString());
        cache.put(request, responseToCache);
      }
      return response;
    })
    .catch(() => cachedResponse);

  return cachedResponse || networkPromise;
}

// Background update function
function updateInBackground(request, cache) {
  fetch(request)
    .then((response) => {
      if (response.ok) {
        const responseToCache = response.clone();
        responseToCache.headers.set("sw-cache-date", new Date().toISOString());
        cache.put(request, responseToCache);
      }
    })
    .catch(() => {
      // Silently fail background updates
    });
}

// Listen for network status changes
self.addEventListener("online", () => {
  isOnline = true;
  console.log("Service Worker: Network online");
});

self.addEventListener("offline", () => {
  isOnline = false;
  console.log("Service Worker: Network offline");
});

// Listen for messages from the main thread
self.addEventListener("message", (event) => {
  const { type, data } = event.data;

  switch (type) {
    case "SKIP_WAITING":
      self.skipWaiting();
      break;
    case "CACHE_URLS":
      cacheUrls(data.urls);
      break;
    case "CLEAR_CACHE":
      clearCache(data.cacheName);
      break;
    case "GET_CACHE_STATUS":
      getCacheStatus().then((status) => {
        event.ports[0].postMessage(status);
      });
      break;
  }
});

// Cache specific URLs
async function cacheUrls(urls) {
  const cache = await caches.open(DYNAMIC_CACHE_NAME);
  return Promise.all(
    urls.map((url) =>
      fetch(url)
        .then((response) => (response.ok ? cache.put(url, response) : null))
        .catch(() => null),
    ),
  );
}

// Clear specific cache
async function clearCache(cacheName) {
  return caches.delete(cacheName || DYNAMIC_CACHE_NAME);
}

// Get cache status
async function getCacheStatus() {
  const cacheNames = await caches.keys();
  const status = {};

  for (const cacheName of cacheNames) {
    const cache = await caches.open(cacheName);
    const keys = await cache.keys();
    status[cacheName] = keys.length;
  }

  return {
    isOnline,
    networkQuality,
    caches: status,
    timestamp: Date.now(),
  };
}

// Periodic background sync (if supported)
if ("sync" in self.registration) {
  self.addEventListener("sync", (event) => {
    if (event.tag === "background-sync") {
      event.waitUntil(performBackgroundSync());
    }
  });
}

// Perform background sync
async function performBackgroundSync() {
  try {
    // Notify main thread about sync
    const clients = await self.clients.matchAll();
    clients.forEach((client) => {
      client.postMessage({
        type: "BACKGROUND_SYNC",
        data: { status: "started" },
      });
    });

    // Perform sync operations here
    // This would typically sync offline actions

    clients.forEach((client) => {
      client.postMessage({
        type: "BACKGROUND_SYNC",
        data: { status: "completed" },
      });
    });
  } catch (error) {
    console.error("Background sync failed:", error);
  }
}

console.log("Service Worker: Loaded and ready for African markets! 🦁");
