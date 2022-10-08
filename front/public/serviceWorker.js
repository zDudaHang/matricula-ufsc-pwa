const CACHE_NAME = 'MATRICULA_UFSC_PWA'

const IMAGES = [
  'images/book-stack-16.png',
  'images/book-stack-24.png',
  'images/book-stack-32.png',
  'images/book-stack-64.png',
  'images/book-stack-128.png',
  'images/book-stack-256.png',
  'images/book-stack-512.png',
]

const PEDIDO_MATRICULA_URL = '/pedidoMatricula'

const OFFLINE_URLS = [PEDIDO_MATRICULA_URL]

const FILES_TO_CACHE = ['/', 'index.html', 'manifest.json', 'favicon.ico', '/static/js/bundle.js', ...IMAGES]

this.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      cache.addAll(FILES_TO_CACHE)
    })
  )
})

// Estrategia "Network first, falling back to cache"
// Ref: https://developer.chrome.com/docs/workbox/caching-strategies-overview/
this.addEventListener('fetch', (event) => {
  // console.log(`[MATRICULA-UFSC-PWA:SW] fetchUrl=${event.request.url}`)
  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      var fetchRequest = event.request.clone()
      return fetch(fetchRequest)
        .then((response) => {
          if (OFFLINE_URLS.some((url) => event.request.url.includes(url))) {
            console.log(`[MATRICULA-UFSC-PWA:SW] Guardando na cache...`)
            cache.put(event.request, response.clone())
          }
          return response
        })
        .catch(() => {
          var fetchRequest = event.request.clone()
          return cache.match(fetchRequest.url)
        })
    })
  )
})
