// Aufräum-Service-Worker für frühere Adressen: /mf-log/ (echte App bis 1.0.0) und /mf-log/test/ (Testkanal bis 1.0.1).
// Ersetzt den alten Service Worker, löscht dessen Caches und meldet sich selbst ab. Kein fetch-Handler: nichts wird abgefangen.
// Nicht löschen: die Caches der aktuellen Kanäle (mflog-app-<Version> unter /mf-log/app/, mflog-test-<Version> unter /mf-test/ ab 1.0.2).
const ALT = ['mflog-app-1.0.0', 'mflog-test-1.0.0', 'mflog-test-1.0.1'];
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', ev => {
  ev.waitUntil((async () => {
    try { await Promise.all(ALT.map(k => caches.delete(k))); } catch (e) {}
    await self.registration.unregister();
  })());
});
