const CACHE_NAME = 'mi-pwa-cache-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './style.css',
  './imagenes/16.jpg',
  './imagenes/32.jpg',
  './imagenes/64.jpg',
  './imagenes/96.jpg',
  './imagenes/128.jpg',
  './imagenes/192.jpg',
  './imagenes/256.jpg',
  './imagenes/384.jpg',
  './imagenes/512.jpg',
  './imagenes/1024.jpg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(res => res || fetch(event.request))
  );
});