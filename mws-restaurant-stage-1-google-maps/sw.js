let staticCacheName = "Cache-v2";
var urlToCache = [
    '/',
    './index.html',
    './restaurant.html',
    './css/styles.css',
    './js/main.js',
    './js/dbhelper.js',
    './js/restaurant_info.js',
    './data/restaurants.json',
    './img/1.jpg',
    './img/2.jpg',
    './img/3.jpg',
    './img/4.jpg',
    './img/5.jpg',
    './img/6.jpg',
    './img/7.jpg',
    './img/8.jpg',
    './img/9.jpg',
    './img/10.jpg',
];

//Install the Service Worker and Open a cache and cache files
self.addEventListener('install',function(event) {
//open cache
event.waitUntil(
    caches.open(staticCacheName)
    .then(function(cache) {
        console.log("open cache");
        return cache.addAll(urlToCache);
    } )
);
});

//Intercept requests and utilize the cache
self.addEventListener('fetch', event => {
    console.log(event.request.url);
    event.respondWith(
        caches.match(event.request, {ignoreSearch: true}).then(response => {
            return response || fetch(event.request);
        })
        .catch(err => console.log(err, event.request))
    );
});

//This code Update the Service Worker when files change 
self.addEventListener('activate',  event => {
    event.waitUntil(self.clients.claim());
});
