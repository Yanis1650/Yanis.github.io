/* ===========================================
   FICHIER JAVASCRIPT PRINCIPAL - PORTFOLIO YANIS
   =========================================== */

/**
 * Gestionnaire principal de l'application
 * Coordonne l'initialisation de tous les modules
 */
const PortfolioApp = {
    
    // Configuration globale
    config: {
        debug: true, // Mode debug pour les logs
        version: '2.0.0'
    },

    // Modules disponibles
    modules: {},

    /**
     * Enregistre un module dans l'application
     * @param {string} name - Nom du module
     * @param {Object} module - Module à enregistrer
     */
    registerModule(name, module) {
        if (this.config.debug) {
            console.log(`📦 Enregistrement du module: ${name}`);
        }
        
        this.modules[name] = module;
    },

    /**
     * Initialise tous les modules enregistrés
     */
    initModules() {
        const moduleNames = Object.keys(this.modules);
        
        if (this.config.debug) {
            console.log(`🚀 Initialisation de ${moduleNames.length} modules...`);
        }

        moduleNames.forEach(name => {
            try {
                const module = this.modules[name];
                if (module && typeof module.init === 'function') {
                    module.init();
                } else {
                    console.warn(`⚠️ Module ${name} n'a pas de méthode init()`);
                }
            } catch (error) {
                console.error(`❌ Erreur lors de l'initialisation du module ${name}:`, error);
            }
        });
    },

    /**
     * Vérifie si le DOM est prêt
     * @returns {Promise} Promise résolue quand le DOM est prêt
     */
    waitForDOM() {
        return new Promise((resolve) => {
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', resolve);
            } else {
                resolve();
            }
        });
    },

    /**
     * Affiche les informations de démarrage
     */
    showWelcomeMessage() {
        if (!this.config.debug) return;

        console.log(`
🎨 Portfolio Yanis Lepesant v${this.config.version}
📍 Master SIGAT - Géomatique
🔧 Architecture modulaire initialisée
        `);
    },

    /**
     * Gère les erreurs globales
     */
    setupErrorHandling() {
        window.addEventListener('error', (event) => {
            console.error('💥 Erreur globale capturée:', event.error);
        });

        window.addEventListener('unhandledrejection', (event) => {
            console.error('💥 Promise rejetée non gérée:', event.reason);
        });
    },

    /**
     * Point d'entrée principal de l'application
     */
    async init() {
        try {
            // Attendre que le DOM soit prêt
            await this.waitForDOM();

            // Configuration des erreurs
            this.setupErrorHandling();

            // Message de bienvenue
            this.showWelcomeMessage();

            // Enregistrement des modules (si disponibles)
            if (window.NavigationModule) {
                this.registerModule('navigation', window.NavigationModule);
            }
            
            if (window.TabsModule) {
                this.registerModule('tabs', window.TabsModule);
            }
            
            if (window.AnimationsModule) {
                this.registerModule('animations', window.AnimationsModule);
            }

            // Initialisation des modules
            this.initModules();

            if (this.config.debug) {
                console.log('✅ Portfolio initialisé avec succès !');
            }

        } catch (error) {
            console.error('❌ Erreur lors de l\'initialisation du portfolio:', error);
        }
    }
};

// Auto-initialisation quand le script est chargé
PortfolioApp.init();

// Export global pour utilisation dans la console ou autres scripts
window.PortfolioApp = PortfolioApp; 