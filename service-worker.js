const CACHE_NAME = "adsumus-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/style.css",
  "/script.js",
  "/img/logo.png",
  "/img/adsumus1.png",
  "/img/adsumus2.png",
  "/img/adsumus3.png",
  "/img/adsumus4.jpg"
];

// Instala o service worker e faz cache dos recursos necessários
self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log("Cache aberto");
        return cache.addAll(urlsToCache);
      })
  );
});

// Intercepta as requisições e retorna os recursos do cache, se disponíveis
self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response; // Retorna o cache se disponível
        }
        return fetch(event.request); // Faz uma requisição normal se não houver no cache
      })
  );
});

// Atualiza o cache quando houver modificações no service worker
self.addEventListener("activate", function(event) {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName); // Remove caches antigos
          }
        })
      );
    })
  );
});
