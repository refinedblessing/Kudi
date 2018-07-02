const CACHE_NAME = 'currency-convert-cache';

const urlsToCache = self.__precacheManifest.map(({ url }) => url);

// Cache Application
self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME)
    .then(cache => cache.addAll([...urlsToCache, 'https://free.currencyconverterapi.com/api/v5/countries']))
    // Force waiting ServiceWorker to become active ServiceWorker
    .then(() => self.skipWaiting()));
});

// Serve from Cache or fallback to Network
self.addEventListener('fetch', (event) => {
  event.respondWith(caches.match(event.request).then(resp => resp || fetch(event.request)));
});

// Remove outdated caches
self.addEventListener('activate', (event) => {
  const currCache = [CACHE_NAME];
  event.waitUntil(caches.keys()
    .then((keyList) => {
      Promise.all(keyList.map((key) => {
        if (!currCache.includes(key)) {
          return caches.delete(key);
        }
      }));
    }));
});
