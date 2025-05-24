/* ===========================================
   SERVICE WORKER - PORTFOLIO YANIS LEPESANT
   PWA avec cache intelligent et offline support
   =========================================== */

const CACHE_NAME = 'yanis-portfolio-v1.0.0';
const OFFLINE_URL = '/offline.html';

// Ressources critiques à mettre en cache
const CRITICAL_ASSETS = [
    '/',
    '/index.html',
    '/css/modern-base.css',
    '/css/modern-navbar.css',
    '/css/modern-hero.css',
    '/css/modern-skills.css',
    '/css/project-styles-fix.css',
    '/css/responsive-optimized.css',
    '/js/navigation.js',
    '/js/tabs.js',
    '/js/animations.js',
    '/js/main.js',
    '/DATA/DSCF0440.jpg',
    '/manifest.json',
    OFFLINE_URL
];

// Ressources à mettre en cache au runtime
const RUNTIME_CACHE = [
    '/DATA/qgis-icon128.png',
    '/DATA/python.png',
    '/DATA/RStudio_Logo.png',
    '/DATA/adobe-illustrator.png',
    '/DATA/postgre.png',
    '/DATA/script-java.png'
];

// Installation du Service Worker
self.addEventListener('install', event => {
    console.log('Service Worker: Installation en cours...');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            console.log('Service Worker: Cache des ressources critiques');
            return cache.addAll(CRITICAL_ASSETS);
        })
        .then(() => {
            console.log('Service Worker: Installation terminée');
            return self.skipWaiting(); // Active immédiatement le nouveau SW
        })
        .catch(error => {
            console.error('Service Worker: Erreur lors de l\'installation', error);
        })
    );
});

// Activation du Service Worker
self.addEventListener('activate', event => {
    console.log('Service Worker: Activation en cours...');
    
    event.waitUntil(
        caches.keys()
        .then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    // Supprimer les anciens caches
                    if (cacheName !== CACHE_NAME) {
                        console.log('Service Worker: Suppression ancien cache', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
        .then(() => {
            console.log('Service Worker: Activation terminée');
            return self.clients.claim(); // Prend le contrôle des pages ouvertes
        })
    );
});

// Stratégie de cache : Cache First pour les assets, Network First pour les pages
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Ignorer les requêtes non-GET
    if (request.method !== 'GET') return;
    
    // Ignorer les requêtes externes (Analytics, etc.)
    if (!url.origin === location.origin) return;
    
    // Stratégie différente selon le type de ressource
    if (isStaticAsset(request)) {
        // Cache First pour les assets statiques
        event.respondWith(cacheFirstStrategy(request));
    } else if (isHTMLRequest(request)) {
        // Network First pour les pages HTML
        event.respondWith(networkFirstStrategy(request));
    } else {
        // Stratégie par défaut
        event.respondWith(networkFirstStrategy(request));
    }
});

// Détection des assets statiques
function isStaticAsset(request) {
    const url = new URL(request.url);
    return url.pathname.match(/\.(css|js|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$/);
}

// Détection des requêtes HTML
function isHTMLRequest(request) {
    return request.headers.get('accept').includes('text/html');
}

// Stratégie Cache First (pour les assets)
async function cacheFirstStrategy(request) {
    try {
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            const cache = await caches.open(CACHE_NAME);
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
        
    } catch (error) {
        console.log('Service Worker: Erreur cache first', error);
        // Retourner une réponse de fallback si nécessaire
        return new Response('Asset non disponible hors ligne', { 
            status: 404, 
            statusText: 'Not Found' 
        });
    }
}

// Stratégie Network First (pour les pages)
async function networkFirstStrategy(request) {
    try {
        const networkResponse = await fetch(request);
        
        if (networkResponse.ok) {
            const cache = await caches.open(CACHE_NAME);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
        
    } catch (error) {
        console.log('Service Worker: Network indisponible, utilisation du cache');
        
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        
        // Page hors ligne pour les requêtes HTML
        if (isHTMLRequest(request)) {
            const offlineResponse = await caches.match(OFFLINE_URL);
            if (offlineResponse) {
                return offlineResponse;
            }
        }
        
        return new Response('Contenu non disponible hors ligne', { 
            status: 404, 
            statusText: 'Not Found' 
        });
    }
}

// Gestion des messages du client
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'GET_VERSION') {
        event.ports[0].postMessage({ version: CACHE_NAME });
    }
});

// Notification de mise à jour disponible
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'CHECK_UPDATE') {
        // Vérifier s'il y a une mise à jour
        event.ports[0].postMessage({ 
            hasUpdate: false, // À implémenter selon vos besoins
            version: CACHE_NAME 
        });
    }
});

// Background Sync pour les actions hors ligne (si supporté)
self.addEventListener('sync', event => {
    if (event.tag === 'background-sync') {
        console.log('Service Worker: Background sync déclenché');
        event.waitUntil(doBackgroundSync());
    }
});

async function doBackgroundSync() {
    // Implémenter la synchronisation en arrière-plan
    // Par exemple, envoyer des formulaires de contact mis en file
    try {
        console.log('Background sync effectué');
    } catch (error) {
        console.error('Erreur background sync:', error);
    }
}

// Push notifications (optionnel)
self.addEventListener('push', event => {
    if (event.data) {
        const data = event.data.json();
        const options = {
            body: data.body,
            icon: '/DATA/icon-192x192.png',
            badge: '/DATA/icon-72x72.png',
            vibrate: [100, 50, 100],
            data: {
                dateOfArrival: Date.now(),
                primaryKey: 1
            },
            actions: [
                {
                    action: 'explore',
                    title: 'Voir le portfolio',
                    icon: '/DATA/icon-96x96.png'
                },
                {
                    action: 'close',
                    title: 'Fermer',
                    icon: '/DATA/icon-96x96.png'
                }
            ]
        };
        
        event.waitUntil(
            self.registration.showNotification(data.title, options)
        );
    }
});

// Gestion des clics sur les notifications
self.addEventListener('notificationclick', event => {
    event.notification.close();
    
    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
}); 