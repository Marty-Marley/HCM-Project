const CACHE_NAME = 'simple-cache-v1';
const urlsToCache = ['/', 'my_profile', 'record_time', 'my_team', 'permissions'];

self.addEventListener('install', (event) => {
  const preLoaded = caches.open(CACHE_NAME)
    .then(cache => cache.addAll(urlsToCache))
  event.waitUntil(preLoaded);
});

self.addEventListener('fetch', (event) => {
  const response = caches.match(event.request)
    .then(match => match || fetch(event.request));
  event.respondWith(response);
});
