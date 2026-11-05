// Network first, cache as fallback: a new deploy shows up on the next visit,
// and the calculator still opens offline with the last version it loaded.
// Bump CACHE only to drop old caches on purpose.
const CACHE = 'nyang-diet-v2';

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return;
  event.respondWith(
    caches.open(CACHE).then(async (cache) => {
      try {
        const response = await fetch(request, { cache: 'no-cache' });
        if (response.ok) cache.put(request, response.clone());
        return response;
      } catch (error) {
        const cached = (await cache.match(request)) ?? (request.mode === 'navigate' ? await cache.match('./') : undefined);
        if (cached) return cached;
        throw error;
      }
    }),
  );
});
