const CACHE_NAME = 'x77-dashboard-v1';
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/css/index.css',
    '/js/index.js',
    '/js/core/navigation.js',
    '/js/core/events.js',
    '/js/core/api.js',
    '/js/views/dashboard.js',
    '/js/views/agents.js',
    '/js/views/workflows.js',
    '/js/views/activity.js',
    '/js/views/settings.js',
    '/manifest.json'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
