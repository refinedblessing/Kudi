importScripts("js/precache-manifest.8b66b9f7dd8cf04e32df0f62c3257516.js", "https://storage.googleapis.com/workbox-cdn/releases/3.3.1/workbox-sw.js");

const CACHE_NAME = 'currency-convert-cache';

const urlsToCache = self.__precacheManifest.map(({ url }) => url);

// Cache Application
self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)));
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
