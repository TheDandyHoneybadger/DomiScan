 Nome do cache para a nossa aplicação
const CACHE_NAME = 'sistema-vendas-cache-v1';
 Lista de arquivos para guardar em cache. No nosso caso, apenas a página principal.
const urlsToCache = [
  '.app_esqueleto.html' 
];

 Evento de Instalação é acionado quando o service worker é instalado pela primeira vez.
self.addEventListener('install', event = {
   Espera até que o cache seja aberto e todos os nossos arquivos sejam adicionados a ele.
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache = {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      })
  );
});

 Evento de Fetch é acionado sempre que a página tenta buscar um recurso (como a própria página, uma imagem, etc.).
self.addEventListener('fetch', event = {
  event.respondWith(
     Tenta encontrar o recurso no cache primeiro.
    caches.match(event.request)
      .then(response = {
         Se encontrar no cache, retorna a versão em cache.
        if (response) {
          return response;
        }
         Se não encontrar no cache, busca na rede.
        return fetch(event.request);
      })
  );
});
