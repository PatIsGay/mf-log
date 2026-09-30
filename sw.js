// Aufräum-Service-Worker für die alte Adresse /mf-log/ (bis 30.09.2026 lag die echte App dort).
// Ersetzt den alten Service Worker, löscht dessen Cache und meldet sich selbst ab. Kein fetch-Handler: nichts wird abgefangen.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', ev => {
  ev.waitUntil((async () => {
    try { await caches.delete('mflog-app-1.0.0'); } catch (e) {}
    await self.registration.unregister();
  })());
});
