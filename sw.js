// Sofía offline cache: the app, lessons and dictionary all open without a signal.
// Page, lessons and dictionary are network-first (new versions show up when you're online)
// and fall back to the saved copy offline. Bump CACHE whenever files change.
const CACHE = "sofia-v4";
const SHELL = ["./", "./index.html", "./lessons.js", "./dictionary.js", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png",
  "https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700;800&family=Nunito+Sans:opsz,wght@6..12,400;6..12,600;6..12,700&family=DM+Mono:wght@400;500&display=swap"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => Promise.all(SHELL.map(u => c.add(u).catch(() => null)))).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  const url = new URL(e.request.url);
  const mine = url.origin === location.origin;
  const networkFirst = mine && /(\/|index\.html|lessons\.js|dictionary\.js)$/.test(url.pathname);
  const put = r => { if (r && r.ok && (mine || url.hostname.endsWith("gstatic.com") || url.hostname.endsWith("googleapis.com"))) { const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); } return r; };
  if (networkFirst) {
    e.respondWith(fetch(e.request).then(put).catch(() => caches.match(e.request, {ignoreSearch: true})));
  } else {
    e.respondWith(caches.match(e.request).then(hit => hit || fetch(e.request).then(put)));
  }
});
// tapping a "two misses in a row" alert opens Sofía (or brings it to the front)
self.addEventListener("notificationclick", e => {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({type: "window", includeUncontrolled: true}).then(list => {
    for (const c of list) if ("focus" in c) return c.focus();
    return self.clients.openWindow("./");
  }));
});
