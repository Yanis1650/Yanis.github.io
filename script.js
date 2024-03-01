// Function to toggle the mobile navigation menu
function toggleMenu() {
    var navLinks = document.querySelector('.nav-links');
    // Toggle the display style
    if (navLinks.style.display === "flex") {
        navLinks.style.display = "none";
    } else {
        navLinks.style.display = "flex";
    }
}

// Function to handle window resize events
function handleWindowResize() {
    var navLinks = document.querySelector('.nav-links');
    if (window.innerWidth > 768) { // Assumes 768px is the breakpoint for your responsive design
        navLinks.style.display = "flex"; // Default display for wider screens
    } else {
        // Only set to none if the hamburger menu is not visible
        if (!document.querySelector('.hamburger').classList.contains('is-active')) {
            navLinks.style.display = "none"; // Ensure the menu is hidden on smaller screens
        }
    }
}

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

    // Listen for scroll events to trigger animations or transitions
    window.addEventListener('scroll', function() {
        var iconRow = document.querySelector('.icon-row');
        // Trigger the animation when reaching the desired scroll position
        if (window.scrollY > 300) { // Adjust 300 to the desired scroll position
            iconRow.classList.add('visible');
        }
    });

    // Add the resize event listener
    window.addEventListener('resize', handleWindowResize);

    // Initial check in case the page loads on a non-mobile screen
    handleWindowResize();

    // Initially hide all sections and show the main content
    resetTabsAndMainContent();
});
