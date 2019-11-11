const cacheName = 'demo-0-0-1';
const cacheFiles = [
    './index.html',
    './main.js',
    './main.css'
];

const cacheRequestUrls = [

];

self.addEventListener('install', e => {
    console.log('service worker : install')
    const cacheOpenPromise = caches
        .open(cacheName)
        .then(cache => cache.addAll(cacheFiles))

    e.waitUntil(cacheOpenPromise)
})

self.addEventListener('fetch', function (e) {
    // 如果有cache则直接返回，否则通过fetch请求
    e.respondWith(
        caches.match(e.request).then(function (cache) {
            return cache || fetch(e.request);
        }).catch(function (err) {
            console.log(err);
            return fetch(e.request);
        })
    );
});

// 监听activate事件，激活后通过cache的key来判断是否更新cache中的静态资源
self.addEventListener('activate', function (e) {
    console.log('Service Worker 状态： activate');
    var cachePromise = caches.keys().then(function (keys) {
        return Promise.all(keys.map(function (key) {
            if (key !== cacheName) {
                return caches.delete(key);
            }
        }));
    })
    e.waitUntil(cachePromise);
    return self.clients.claim();
});