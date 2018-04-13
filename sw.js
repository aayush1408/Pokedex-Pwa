const staticAssets = [
    './',
    './style.css',
    './app.js',
    './fallback.json',
    './offline.html'
];

self.addEventListener('install', async e => {
    const cache = await caches.open('static-cache');
    cache.addAll(staticAssets);
});
