const CACHE_NAME = 'MY_WORKOUT_PWA_APP'

const IMAGES = [
  'images/book-stack-16.png',
  'images/book-stack-24.png',
  'images/book-stack-32.png',
  'images/book-stack-64.png',
  'images/book-stack-128.png',
  'images/book-stack-256.png',
  'images/book-stack-512.png',
]

const OFFLINE_URLS = ['/my-saved-workouts']

const FILES_TO_CACHE = ['/', 'index.html', 'manifest.json', 'favicon.ico', '/static/js/bundle.js', ...IMAGES]

this.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      cache.addAll(FILES_TO_CACHE)
    })
  )
})

this.addEventListener('fetch', (event) => {
  console.log(event.request.url)
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) return response
      // IMPORTANT: Clone the request. A request is a stream and
      // can only be consumed once. Since we are consuming this
      // once by cache and once by the browser for fetch, we need
      // to clone the response.
      var fetchRequest = event.request.clone()

      return fetch(fetchRequest).then(function (response) {
        // Check if we received a valid response
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response
        }

        // IMPORTANT: Clone the response. A response is a stream
        // and because we want the browser to consume the response
        // as well as the cache consuming the response, we need
        // to clone it so we have two streams.
        var responseToCache = response.clone()
        console.log(response)
        // if (OFFLINE_URLS.some((url) => event.request.url.includes(url)))
        caches.open(CACHE_NAME).then(function (cache) {
          cache.put(event.request, responseToCache)
        })

        return response
      })
    })
  )
})
