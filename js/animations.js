/* ===========================================
   MODULE ANIMATIONS - PORTFOLIO YANIS
   =========================================== */

/**
 * Module de gestion des animations
 * Contrôle les effets visuels et animations du portfolio
 */
const AnimationsModule = {
    
    // Configuration
    config: {
        iconScrollTrigger: 300, // Position de déclenchement pour les icônes
        scrollThrottle: 100     // Délai de limitation pour les événements de scroll
    },

    // État
    isScrolling: false,

    /**
     * Animation d'apparition des icônes au scroll
     */
    handleIconAnimation() {
        const iconRow = document.querySelector('.icon-row');
        
        if (!iconRow) return;

        if (window.scrollY > this.config.iconScrollTrigger) {
            iconRow.classList.add('visible');
        } else {
            iconRow.classList.remove('visible');
        }
    },

    /**
     * Gestion optimisée du scroll avec throttling
     */
    handleScroll() {
        if (this.isScrolling) return;
        
        this.isScrolling = true;
        
        requestAnimationFrame(() => {
            this.handleIconAnimation();
            this.isScrolling = false;
        });
    },

    /**
     * Animation de survol pour les éléments interactifs
     * @param {HTMLElement} element - Élément à animer
     * @param {string} animationType - Type d'animation
     */
    addHoverAnimation(element, animationType = 'scale') {
        if (!element) return;

        const animations = {
            scale: {
                enter: 'transform: scale(1.05); transition: transform 0.3s ease;',
                leave: 'transform: scale(1); transition: transform 0.3s ease;'
            },
            shadow: {
                enter: 'box-shadow: 0 8px 16px rgba(0,0,0,0.3); transition: box-shadow 0.3s ease;',
                leave: 'box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: box-shadow 0.3s ease;'
            }
        };

        const animation = animations[animationType];
        if (!animation) return;

        element.addEventListener('mouseenter', () => {
            element.style.cssText += animation.enter;
        });

        element.addEventListener('mouseleave', () => {
            element.style.cssText += animation.leave;
        });
    },

    /**
     * Animation de fade-in pour les éléments
     * @param {HTMLElement} element - Élément à animer
     * @param {number} delay - Délai avant l'animation (en ms)
     */
    fadeIn(element, delay = 0) {
        if (!element) return;

        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, delay);
    },

    /**
     * Applique les animations de base aux éléments
     */
    initBasicAnimations() {
        // Animation des projets
        const projects = document.querySelectorAll('.project');
        projects.forEach((project, index) => {
            this.fadeIn(project, index * 200);
            this.addHoverAnimation(project, 'shadow');
        });

        // Animation des icônes
        const icons = document.querySelectorAll('.icon');
        icons.forEach(icon => {
            this.addHoverAnimation(icon, 'scale');
        });

        // Animation des boutons
        const buttons = document.querySelectorAll('.download-cv-button, .adresse-mail');
        buttons.forEach(button => {
            this.addHoverAnimation(button, 'scale');
        });
    },

    /**
     * Observe les éléments pour les animations au scroll
     */
    initScrollAnimations() {
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            // Observer les sections de contenu
            const sections = document.querySelectorAll('.content-container, .project');
            sections.forEach(section => observer.observe(section));
        }
    },

    /**
     * Initialise toutes les animations
     */
    init() {
        // Événements de scroll
        window.addEventListener('scroll', this.handleScroll.bind(this));

        // Animations de base
        this.initBasicAnimations();

        // Animations au scroll
        this.initScrollAnimations();

        // Animation initiale pour les icônes
        this.handleIconAnimation();

        console.log('✨ Module Animations initialisé');
    }
};

// Export du module
window.AnimationsModule = AnimationsModule; 