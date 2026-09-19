/**
 * Service Worker for x77 Executive Dashboard
 */
const CACHE_NAME = 'x77-dashboard-v1';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './css/index.css',
    './js/index.js',
    './js/core/events.js',
    './js/views/settings.js',
    './manifest.json'
];

// インストール時に静的ファイルをキャッシュ
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

// リソース取得時のキャッシュファースト制御
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
