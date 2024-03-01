document.addEventListener('DOMContentLoaded', function() {
    const mainContent = document.querySelector('main#home');
    const tabs = document.querySelectorAll('.tab-link');
    const sections = document.querySelectorAll('.tab-content');
    const logo = document.querySelector('.logo');

    // Function to hide all sections
    function hideAllSections() {
        sections.forEach(section => {
            section.style.display = 'none';
        });
    }

    // Function to reset the tabs and main content display
    function resetTabsAndMainContent() {
        hideAllSections();
        tabs.forEach(tab => tab.classList.remove('active'));
        mainContent.style.display = 'block'; // Show main content
    }

    // Event listener for the logo to reset the view to the homepage
    logo.addEventListener('click', function(e) {
        e.preventDefault();
        resetTabsAndMainContent();
    });

    // Event listeners for tabs
    tabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();

            // Hide all sections and remove 'active' class from all tabs
            hideAllSections();
            tabs.forEach(tab => tab.classList.remove('active'));

            // Show the selected section
            const sectionId = this.getAttribute('data-tab');
            document.querySelector('#' + sectionId).style.display = 'block';
            this.classList.add('active');

            // Hide the main content
            mainContent.style.display = 'none';
        });
    });
    window.addEventListener('scroll', function() {
        var iconRow = document.querySelector('.icon-row');
        // Déclencher l'animation quand on atteint la position souhaitée
        if (window.scrollY > 300) { // 300 est la position de défilement, à ajuster selon le besoin
          iconRow.classList.add('visible');
        }
      });
    // Initially hide all sections and show main content
    resetTabsAndMainContent();
});
