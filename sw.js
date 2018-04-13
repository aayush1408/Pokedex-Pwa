const staticAssets = [
    './',
    './style.css',
    './app.js',
    './fallback.json'
];

self.addEventListener('install', async e => {
    const cache = await caches.open('static-cache');
    cache.addAll(staticAssets);
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.open('mysite-dynamic').then(function (cache) {
            return cache.match(event.request).then(function (response) {
                console.log(response);
                console.log('Cached check');
                return response || fetch(event.request).then(function (response) {
                    console.log('Network');
                    cache.put(event.request, response.clone());
                    return response;
                }).catch(() => {
                    console.log('Network not there')
                    return caches.match('./fallback.json');
                });
            });
        })
    );
});
