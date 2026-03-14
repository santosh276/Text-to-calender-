const CACHE_NAME = 'offline-ml-cache-v2';
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/app.js',
    '/worker.js',
    // Cache the external libraries used by the worker for true offline capability
    'https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.1',
    'https://cdn.jsdelivr.net/npm/localforage@1.10.0/+esm'
];

// Install Event - Cache assets
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(ASSETS_TO_CACHE);
            })
    );
    self.skipWaiting();
});

// Activate Event - Clean up old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Fetch Event - Serve from Cache, fallback to Network
self.addEventListener('fetch', event => {
    // Only handle GET requests
    if (event.request.method !== 'GET') return;

    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Return cached response if found
                if (response) {
                    return response;
                }

                // Otherwise fetch from network
                return fetch(event.request).then(
                    function(response) {
                        // Check if we received a valid response.
                        // We remove the strict check `response.type !== 'basic'` to allow caching CORS requests
                        // (like CDNs) providing opaque responses.
                        if(!response || response.status !== 200) {
                             if(response.type !== 'opaque') {
                                 return response;
                             }
                        }

                        // Clone the response because it's a stream and can only be consumed once
                        var responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                            .then(function(cache) {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    }
                );
            }).catch(() => {
                // If both cache and network fail (offline), you can return a fallback page here
                // if (event.request.mode === 'navigate') {
                //     return caches.match('/offline.html');
                // }
            })
    );
});
