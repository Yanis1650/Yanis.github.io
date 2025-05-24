/* ===========================================
   MODULE NAVIGATION - PORTFOLIO YANIS
   =========================================== */

/**
 * Module de gestion de la navigation
 * Gère le menu hamburger et les événements de redimensionnement
 */
const NavigationModule = {
    
    /**
     * Bascule l'affichage du menu mobile
     */
    toggleMenu() {
        const navLinks = document.querySelector('.nav-links');
        
        if (navLinks.style.display === "flex") {
            navLinks.style.display = "none";
        } else {
            navLinks.style.display = "flex";
        }
    },

    /**
     * Gère le redimensionnement de la fenêtre
     * Ajuste l'affichage du menu selon la taille de l'écran
     */
    handleWindowResize() {
        const navLinks = document.querySelector('.nav-links');
        const hamburger = document.querySelector('.hamburger');
        
        if (window.innerWidth > 768) {
            // Écrans larges : afficher le menu en mode desktop
            navLinks.style.display = "flex";
        } else {
            // Écrans étroits : masquer le menu si hamburger pas actif
            if (!hamburger.classList.contains('is-active')) {
                navLinks.style.display = "none";
            }
        }
    },

    /**
     * Initialise les événements de navigation
     */
    init() {
        // Écouter les redimensionnements de fenêtre
        window.addEventListener('resize', this.handleWindowResize.bind(this));
        
        // Configuration initiale
        this.handleWindowResize();
        
        console.log('🔄 Module Navigation initialisé');
    }
};

// Fonction globale pour le menu hamburger (compatibilité avec HTML existant)
function toggleMenu() {
    NavigationModule.toggleMenu();
}

// Export du module pour utilisation dans d'autres fichiers
window.NavigationModule = NavigationModule; 