const CACHE_NAME = 'video-flix-cache-v1';
const urlsToCache = [
  '/',                 // Página principal
  '/index.html',       // Asegúrate de que la ruta sea correcta
  '/sw.js',
  '/css/font-awesome.min.css',
  // Agrega aquí otros recursos locales que necesites cachear,
  // por ejemplo, imágenes, archivos JS externos o CSS adicional.
];

// Instalación: cachea los archivos esenciales
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Intercepta las peticiones y responde con el recurso cacheado si está disponible
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});

// Activación: elimina caches antiguos si es necesario
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
