const CACHE_NAME = 'simple-cache-v1';
const urlsToCache = ['/login', '/', '/my_profile', '/record_time', '/my_team', '/permissions'];

// self.addEventListener('install', (event) => {
//   const preLoaded = caches.open(CACHE_NAME)
//     .then(cache => cache.addAll(urlsToCache))
//   event.waitUntil(preLoaded);
// });

// self.addEventListener('fetch', (event) => {
//   const response = caches.match(event.request)
//     .then(match => match || fetch(event.request));
//   event.respondWith(response);
// });

// Tried credentials: include - no diff

self.addEventListener('install', (event) => {
  event.waitUntil(preLoad());
});

var preLoad = function () {
  console.log('Installing web app');
  return caches.open('offline').then((cache) => {
    console.log("caching index and important routes");
    return cache.addAll(urlsToCache);
  });
};

self.addEventListener('fetch', (event) => {
  event.respondWith(checkResponse(event.request).catch(function() {
    return returnFromCache(event.request);
  }));
  event.waitUntil(addToCache(event.request));
});

var checkResponse = function (request) {
  return new Promise(((fulfill, reject) => {
    fetch(request).then(function(response){
      if(response.status !== 404) {
        fulfill(response);
      } else {
        reject();
      }
    }, reject);
  }));
};

var addToCache = function (request) {
  return caches.open('offline').then((cache) => {
    return fetch(request).then(function (response) {
      console.log(response.url + " was cached");
      return cache.put(request, response);
    });
  });
};

var returnFromCache = function (request) {
  return caches.open('offline').then((cache) => {
    return cache.match(request).then(function (matching) {
     if(!matching || matching.status == 404) {
       return cache.match("offline.html");
     } else {
       return matching;
     }
    });
  });
};
