/* ====================================================
   HanziFlow — Service Worker
   ----------------------------------------------------
   - Saját fájlok (HTML/CSS/JS/ikon) → NETWORK-FIRST: online mindig friss,
     offline a tárolt példány (az előtöltés adja az offline-tartalékot).
   - Google Fonts, CDN-könyvtárak → cache-first (első betöltés után offline is megy).
   - A felolvasó (translate.google.com) → csak hálózat, nem tároljuk.

   🔴 A NihonCore ugyanazon a címen (nokedli25ttv.github.io) fut, ezért az
   aktiváláskor CSAK a saját, 'hanziflow-' kezdetű tárakat töröljük — a másik
   app offline-tárához nem nyúlunk.

   Kiadásnál a CACHE_VERSION-t léptetni kell.
   ==================================================== */

const CACHE_PREFIX  = 'hanziflow-';
const CACHE_VERSION = CACHE_PREFIX + 'v41-2026-10-19-hsk5-l71-72';
const APP_SHELL_CACHE = CACHE_VERSION + '-shell';
const RUNTIME_CACHE   = CACHE_VERSION + '-runtime';

const APP_SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './pages/lesson.html',
  './pages/tones.html',
  './pages/pinyin.html',
  './pages/measure.html',
  './pages/sentence.html',
  './pages/numbers.html',
  './pages/exam.html',
  './pages/tests.html',
  './pages/modules.html',
  './pages/stats.html',
  './pages/login.html',
  './pages/register.html',
  './css/style.css',
  './css/auth.css',
  './js/app.js',
  './js/auth.js',
  './js/sync.js',
  './js/pinyin.js',
  './js/data/core.js',
  './js/data/course.js',
  './js/data/tones.js',
  './js/data/measure.js',
  './js/data/sentence.js',
  './js/data/numbers.js',
  './js/data/exam.js',
  './js/data/tests.js',
  './img/icon.svg',
  './img/icon-192.png',
  './img/icon-512.png'
];

const FONT_HOSTS = ['fonts.googleapis.com', 'fonts.gstatic.com'];
const LIB_HOSTS  = ['cdn.jsdelivr.net', 'www.gstatic.com'];
const TTS_HOST   = 'translate.google.com';

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(APP_SHELL_CACHE)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k.startsWith(CACHE_PREFIX) && !k.startsWith(CACHE_VERSION))
          .map(k => caches.delete(k))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.hostname.includes(TTS_HOST)) return;
  if (FONT_HOSTS.some(h => url.hostname.includes(h)) || LIB_HOSTS.some(h => url.hostname.includes(h))) {
    event.respondWith(cacheFirstRuntime(req));
    return;
  }
  if (url.origin === self.location.origin) {
    event.respondWith(networkFirstAppShell(req));
    return;
  }
  event.respondWith(fetch(req).catch(() => caches.match(req)));
});

async function networkFirstAppShell(req) {
  try {
    const fresh = await fetch(req);
    if (fresh && fresh.status === 200 && fresh.type === 'basic') {
      const cache = await caches.open(APP_SHELL_CACHE);
      cache.put(req, fresh.clone());
    }
    return fresh;
  } catch (e) {
    const cached = await caches.match(req);
    return cached || caches.match('./index.html');
  }
}

async function cacheFirstRuntime(req) {
  const cached = await caches.match(req);
  if (cached) return cached;
  try {
    const fresh = await fetch(req);
    if (fresh && fresh.status === 200) {
      const cache = await caches.open(RUNTIME_CACHE);
      cache.put(req, fresh.clone());
    }
    return fresh;
  } catch (e) {
    return cached || Response.error();
  }
}

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});
