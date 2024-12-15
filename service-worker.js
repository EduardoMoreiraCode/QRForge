self.addEventListener("install", event => {
    console.log("Service Worker instalado com sucesso.");
    self.skipWaiting(); // Força o Service Worker a ser ativado imediatamente
});

self.addEventListener("activate", event => {
    console.log("Service Worker ativado.");
});

self.addEventListener("fetch", event => {
    console.log("Interceptando requisição:", event.request.url);
});
