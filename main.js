document.addEventListener("DOMContentLoaded", function() {
    // Sélectionner tous les liens d'onglets et tous les contenus d'onglets
    const tabLinks = document.querySelectorAll(".tab-link");
    const tabContents = document.querySelectorAll(".tab-content");

    // Parcourir chaque lien d'onglet
    tabLinks.forEach(function(link) {
        // Ajouter un écouteur d'événements pour le clic sur chaque lien d'onglet
        link.addEventListener("click", function(event) {
            event.preventDefault(); // Empêcher le comportement par défaut du lien

            // Récupérer l'ID de l'onglet associé à partir de l'attribut data-tab du lien
            const tabId = this.getAttribute("data-tab");

            // Parcourir chaque contenu d'onglet
            tabContents.forEach(function(content) {
                // Si l'ID du contenu correspond à l'ID de l'onglet sélectionné
                if (content.getAttribute("id") === tabId) {
                    content.classList.add("active"); // Ajouter la classe active pour afficher le contenu
                    // Charger dynamiquement le contenu de l'iframe uniquement si c'est nécessaire
                    const iframes = content.querySelectorAll("iframe");
                    iframes.forEach(function(iframe) {
                        if (iframe.getAttribute("src") === "") {
                            iframe.setAttribute("src", iframe.dataset.src);
                        }
                    });
                } else {
                    content.classList.remove("active"); // Retirer la classe active pour masquer le contenu
                }
            });

            // Mettre à jour les classes actives pour les liens d'onglet
            tabLinks.forEach(function(link) {
                if (link.getAttribute("data-tab") === tabId) {
                    link.classList.add("active"); // Ajouter la classe active pour le lien sélectionné
                } else {
                    link.classList.remove("active"); // Retirer la classe active pour les autres liens d'onglet
                }
            });
        });

        // Ajouter un écouteur d'événements pour le survol de la souris sur chaque lien d'onglet
        link.addEventListener("mouseleave", function() {
            this.style.backgroundColor = ""; // Retour à la couleur par défaut
        });
    });

    // Sélectionner la page de destination et la flèche de défilement vers le bas
    const landingPage = document.querySelector(".landing-page");
    const scrollDownArrow = document.querySelector(".scroll-down-arrow");

    // Ajouter un écouteur d'événements pour le défilement de la fenêtre
    window.addEventListener("scroll", function() {
        // Si le défilement dépasse 50 pixels
        if (window.scrollY > 50) {
            landingPage.classList.add("hidden"); // Ajouter la classe cachée pour masquer la page de destination
        } else {
            landingPage.classList.remove("hidden"); // Retirer la classe cachée pour afficher la page de destination
        }
    });

    // Ajouter un écouteur d'événements pour le clic sur la flèche de défilement vers le bas
    scrollDownArrow.addEventListener("click", function() {
        window.scrollBy(0, window.innerHeight); // Faire défiler la fenêtre vers le bas d'une hauteur de fenêtre
    });

    // Ajouter un écouteur d'événements pour le chargement initial de la page
    let lastScrollTop = 0; // Variable pour garder la dernière position de défilement

    window.addEventListener('scroll', () => {
        const currentScrollTop = window.scrollY;
        const projectElems = document.querySelectorAll('.project img, .project .text-content');

        projectElems.forEach(elem => {
            if (currentScrollTop > lastScrollTop) {
                // En défilant vers le bas, ajoutez la classe 'zoom-in'
                elem.classList.add('zoom-in');
                elem.classList.remove('zoom-out');
            } else {
                // En défilant vers le haut, ajoutez la classe 'zoom-out'
                elem.classList.add('zoom-out');
                elem.classList.remove('zoom-in');
            }
        });

        lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop; // Mise à jour de la dernière position de défilement
    });

    // Récupérez les éléments pour la lightbox
    var modal = document.getElementById("myModal");
    var img = document.getElementById("myImg");
    var modalImg = document.getElementById("img01");
    var captionText = document.getElementById("caption");

    // Quand l'utilisateur clique sur l'image, ouvrez la lightbox
    img.onclick = function() {
        modal.style.display = "block";
        modalImg.src = this.src;
        captionText.innerHTML = this.alt;
    }

    // Récupérez l'élément pour fermer la lightbox
    var span = document.getElementsByClassName("close")[0];

    // Quand l'utilisateur clique sur (x), fermez la lightbox
    span.onclick = function() {
        modal.style.display = "none";
    }

    // Nouveau bout de code pour gérer le défilement et afficher certains éléments
    window.addEventListener('scroll', function() {
        var image = document.getElementById('about-image');
        var text = document.getElementById('about-text');
        var icons = document.querySelectorAll('.icons .icon');
        var imagePosition = image.getBoundingClientRect().top;
        var screenPosition = window.innerHeight / 1.3;

        if (imagePosition < screenPosition) {
            image.classList.add('visible');
            text.classList.add('visible');
            icons.forEach(function(icon) {
                icon.classList.add('visible');
            });
        }
    });
});
