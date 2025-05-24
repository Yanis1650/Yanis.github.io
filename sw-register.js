/* ===========================================
   ENREGISTREMENT SERVICE WORKER
   =========================================== */

// Vérification du support des Service Workers
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        registerServiceWorker();
    });
} else {
    console.warn('Service Workers non supportés par ce navigateur');
}

async function registerServiceWorker() {
    try {
        const registration = await navigator.serviceWorker.register('/sw.js', {
            scope: '/'
        });

        console.log('Service Worker enregistré avec succès:', registration.scope);

        // Gestion des mises à jour
        registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            
            newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed') {
                    if (navigator.serviceWorker.controller) {
                        // Nouvelle version disponible
                        showUpdateNotification();
                    } else {
                        // Premier cache terminé
                        showOfflineReadyNotification();
                    }
                }
            });
        });

        // Écouter les messages du Service Worker
        navigator.serviceWorker.addEventListener('message', event => {
            const { data } = event;
            
            if (data.type === 'CACHE_UPDATED') {
                console.log('Cache mis à jour:', data.url);
            }
        });

    } catch (error) {
        console.error('Erreur lors de l\'enregistrement du Service Worker:', error);
    }
}

// Notification de mise à jour disponible
function showUpdateNotification() {
    const notification = document.createElement('div');
    notification.className = 'update-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <span>🚀 Nouvelle version disponible !</span>
            <button onclick="updateApp()" class="update-btn">Mettre à jour</button>
            <button onclick="dismissUpdate()" class="dismiss-btn">Plus tard</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-hide après 10 secondes
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 10000);
}

// Notification app prête hors ligne
function showOfflineReadyNotification() {
    console.log('🎉 Portfolio prêt pour une utilisation hors ligne !');
    
    // Optionnel : afficher une notification discrète
    if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Portfolio prêt hors ligne', {
            body: 'Vous pouvez maintenant consulter le portfolio sans connexion internet',
            icon: '/DATA/icon-192x192.png'
        });
    }
}

// Mettre à jour l'application
async function updateApp() {
    const registration = await navigator.serviceWorker.getRegistration();
    
    if (registration && registration.waiting) {
        registration.waiting.postMessage({ type: 'SKIP_WAITING' });
        
        // Recharger la page après activation du nouveau SW
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            window.location.reload();
        });
    }
    
    dismissUpdate();
}

// Fermer la notification de mise à jour
function dismissUpdate() {
    const notification = document.querySelector('.update-notification');
    if (notification) {
        notification.remove();
    }
}

// Installer prompt PWA
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    console.log('PWA: Install prompt disponible');
    
    // Empêcher l'affichage automatique
    e.preventDefault();
    deferredPrompt = e;
    
    // Afficher le bouton d'installation
    showInstallButton();
});

// Afficher le bouton d'installation PWA
function showInstallButton() {
    const installBtn = document.createElement('button');
    installBtn.className = 'install-pwa-btn';
    installBtn.innerHTML = '📱 Installer l\'app';
    installBtn.onclick = installPWA;
    
    // Ajouter le bouton dans la navbar ou hero section
    const heroActions = document.querySelector('.hero-actions');
    if (heroActions) {
        heroActions.appendChild(installBtn);
    }
}

// Installer la PWA
async function installPWA() {
    if (!deferredPrompt) return;
    
    try {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        
        console.log('PWA Install:', outcome);
        
        if (outcome === 'accepted') {
            gtag('event', 'pwa_install', {
                'event_category': 'PWA',
                'event_label': 'User Installed'
            });
        }
        
        deferredPrompt = null;
        
        // Masquer le bouton d'installation
        const installBtn = document.querySelector('.install-pwa-btn');
        if (installBtn) {
            installBtn.remove();
        }
        
    } catch (error) {
        console.error('Erreur installation PWA:', error);
    }
}

// Détecter si l'app est déjà installée
window.addEventListener('appinstalled', () => {
    console.log('PWA installée avec succès!');
    
    gtag('event', 'pwa_installed', {
        'event_category': 'PWA',
        'event_label': 'Successfully Installed'
    });
    
    // Masquer le bouton d'installation
    const installBtn = document.querySelector('.install-pwa-btn');
    if (installBtn) {
        installBtn.remove();
    }
});

// Vérifier l'état de connexion
function checkOnlineStatus() {
    const status = navigator.onLine ? 'online' : 'offline';
    console.log('Statut connexion:', status);
    
    // Optionnel : afficher un indicateur de connexion
    updateConnectionIndicator(status);
}

function updateConnectionIndicator(status) {
    let indicator = document.querySelector('.connection-indicator');
    
    if (!indicator) {
        indicator = document.createElement('div');
        indicator.className = 'connection-indicator';
        document.body.appendChild(indicator);
    }
    
    indicator.className = `connection-indicator ${status}`;
    indicator.textContent = status === 'online' ? '🟢 En ligne' : '🔴 Hors ligne';
    
    // Auto-hide si en ligne
    if (status === 'online') {
        setTimeout(() => {
            if (indicator.parentNode) {
                indicator.remove();
            }
        }, 3000);
    }
}

// Écouter les changements de connexion
window.addEventListener('online', checkOnlineStatus);
window.addEventListener('offline', checkOnlineStatus);

// CSS pour les notifications
const style = document.createElement('style');
style.textContent = `
    .update-notification {
        position: fixed;
        top: 80px;
        right: 20px;
        background: rgba(46, 134, 171, 0.95);
        backdrop-filter: blur(10px);
        color: white;
        padding: 1rem;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    
    .update-btn, .dismiss-btn {
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 600;
        font-size: 0.875rem;
        transition: all 0.2s;
    }
    
    .update-btn {
        background: white;
        color: #2E86AB;
    }
    
    .dismiss-btn {
        background: transparent;
        color: white;
        border: 1px solid rgba(255,255,255,0.3);
    }
    
    .install-pwa-btn {
        padding: 0.75rem 1.5rem;
        background: linear-gradient(135deg, #64FFDA, #2E86AB);
        color: white;
        border: none;
        border-radius: 25px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s;
        margin-left: 1rem;
    }
    
    .install-pwa-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(100, 255, 218, 0.3);
    }
    
    .connection-indicator {
        position: fixed;
        bottom: 20px;
        left: 20px;
        padding: 0.5rem 1rem;
        border-radius: 20px;
        font-size: 0.875rem;
        font-weight: 600;
        z-index: 10000;
        transition: all 0.3s;
    }
    
    .connection-indicator.online {
        background: rgba(76, 175, 80, 0.9);
        color: white;
    }
    
    .connection-indicator.offline {
        background: rgba(244, 67, 54, 0.9);
        color: white;
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @media (max-width: 768px) {
        .update-notification {
            right: 10px;
            left: 10px;
            top: 70px;
        }
        
        .notification-content {
            flex-direction: column;
            text-align: center;
            gap: 0.75rem;
        }
        
        .install-pwa-btn {
            margin-left: 0;
            margin-top: 0.5rem;
            width: 100%;
        }
    }
`;

document.head.appendChild(style); 