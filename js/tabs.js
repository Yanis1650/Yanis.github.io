/* ===========================================
   MODULE ONGLETS - PORTFOLIO YANIS
   =========================================== */

/**
 * Module de gestion des onglets
 * Contrôle l'affichage des différentes sections du portfolio
 */
const TabsModule = {
    
    // Éléments DOM
    mainContent: null,
    tabs: null,
    sections: null,
    logo: null,

    /**
     * Cache toutes les sections
     */
    hideAllSections() {
        this.sections.forEach(section => {
            section.style.display = 'none';
        });
    },

    /**
     * Réinitialise les onglets et affiche le contenu principal
     */
    resetTabsAndMainContent() {
        this.hideAllSections();
        this.tabs.forEach(tab => tab.classList.remove('active'));
        this.mainContent.style.display = 'block';
        
        // Réinitialiser les classes active sur tous les liens de navigation
        const allNavLinks = document.querySelectorAll('.modern-nav-link, .mobile-nav-link');
        allNavLinks.forEach(link => link.classList.remove('active'));
    },

    /**
     * Affiche une section spécifique
     * @param {string} sectionId - ID de la section à afficher
     */
    showSection(sectionId) {
        // Masquer toutes les sections et désactiver tous les onglets
        this.hideAllSections();
        this.tabs.forEach(tab => tab.classList.remove('active'));

        // Afficher la section sélectionnée
        const targetSection = document.querySelector('#' + sectionId);
        if (targetSection) {
            targetSection.style.display = 'block';
        }

        // Masquer le contenu principal
        this.mainContent.style.display = 'none';
        
        // Fermer le menu mobile si ouvert
        const mobileMenu = document.getElementById('mobileMenu');
        const hamburger = document.getElementById('hamburger');
        if (mobileMenu && hamburger) {
            mobileMenu.classList.remove('active');
            hamburger.classList.remove('active');
            // Rétablir le scroll du body
            document.body.style.overflow = '';
        }
    },

    /**
     * Gère le clic sur un onglet
     * @param {Event} e - Événement de clic
     * @param {HTMLElement} tabElement - Élément onglet cliqué
     */
    handleTabClick(e, tabElement) {
        e.preventDefault();

        const sectionId = tabElement.getAttribute('data-tab');
        this.showSection(sectionId);
        
        // Activer l'onglet cliqué
        tabElement.classList.add('active');
        
        console.log(`📄 Section ${sectionId} affichée`);
    },

    /**
     * Gère le clic sur le logo (retour à l'accueil)
     * @param {Event} e - Événement de clic
     */
    handleLogoClick(e) {
        e.preventDefault();
        this.resetTabsAndMainContent();
        
        // Scroll vers le haut de la page
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        console.log('🏠 Retour à l\'accueil');
    },

    /**
     * Initialise les événements des onglets
     */
    bindEvents() {
        // Événement pour le logo (compatible avec les deux versions)
        if (this.logo) {
            this.logo.addEventListener('click', (e) => {
                this.handleLogoClick(e);
            });
        }

        // Événements pour les onglets
        this.tabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                this.handleTabClick(e, tab);
            });
        });
    },

    /**
     * Initialise le module des onglets
     */
    init() {
        // Récupération des éléments DOM (compatible avec les deux versions)
        this.mainContent = document.querySelector('main#home');
        this.tabs = document.querySelectorAll('.tab-link');
        this.sections = document.querySelectorAll('.tab-content');
        
        // Chercher le logo dans les deux versions (ancienne et moderne)
        this.logo = document.querySelector('.logo') || document.querySelector('.modern-logo');

        // Vérifications
        if (!this.mainContent || !this.tabs.length || !this.sections.length) {
            console.error('❌ Éléments DOM manquants pour le module Tabs');
            return;
        }

        // Liaison des événements
        this.bindEvents();

        // État initial
        this.resetTabsAndMainContent();

        console.log('📑 Module Tabs initialisé');
        if (this.logo) {
            console.log('🎯 Logo détecté et événement de retour à l\'accueil configuré');
        }
    }
};

// Export du module
window.TabsModule = TabsModule; 