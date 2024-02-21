document.addEventListener("DOMContentLoaded", function() {
    const tabLinks = document.querySelectorAll(".tab-link");
    const tabContents = document.querySelectorAll(".tab-content");

    tabLinks.forEach(function(link) {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            const tabId = this.getAttribute("data-tab");

            tabContents.forEach(function(content) {
                if (content.getAttribute("id") === tabId) {
                    content.classList.add("active");
                } else {
                    content.classList.remove("active");
                }
            });

            tabLinks.forEach(function(link) {
                if (link.getAttribute("data-tab") === tabId) {
                    link.classList.add("active");
                } else {
                    link.classList.remove("active");
                }
            });
        });

        // Ajouter un écouteur d'événements pour le survol de la souris
        link.addEventListener("mouseenter", function() {
            this.style.backgroundColor = "green"; // Couleur verte au survol
        });

        // Ajouter un écouteur d'événements pour la sortie du survol de la souris
        link.addEventListener("mouseleave", function() {
            this.style.backgroundColor = ""; // Retour à la couleur par défaut
        });
    });

    const landingPage = document.querySelector(".landing-page");
    const scrollDownArrow = document.querySelector(".scroll-down-arrow");

    window.addEventListener("scroll", function() {
        if (window.scrollY > 50) {
            landingPage.classList.add("hidden");
        } else {
            landingPage.classList.remove("hidden");
        }
    });

    scrollDownArrow.addEventListener("click", function() {
        window.scrollBy(0, window.innerHeight);
    });
});
