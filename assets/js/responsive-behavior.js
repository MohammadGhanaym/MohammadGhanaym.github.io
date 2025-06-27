/**
 * Responsive Behavior Enhancements
 * Improves interactive functionality across devices
 */

document.addEventListener('DOMContentLoaded', function() {
    // Responsive navigation enhancements
    function enhanceNavigation() {
        const burger = document.querySelector('.burger');
        const nav = document.querySelector('.nav-links');
        const navLinks = document.querySelectorAll('.nav-links li a');
        
        if (burger && nav) {
            // Update ARIA attributes when menu is toggled
            burger.addEventListener('click', function() {
                const expanded = this.getAttribute('aria-expanded') === 'true' || false;
                this.setAttribute('aria-expanded', !expanded);
                
                // Toggle menu
                nav.classList.toggle('nav-active');
                burger.classList.toggle('toggle');
            });
            
            // Close menu when clicking on a link
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    nav.classList.remove('nav-active');
                    burger.classList.remove('toggle');
                    burger.setAttribute('aria-expanded', 'false');
                });
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', function(event) {
                if (nav.classList.contains('nav-active') && 
                    !nav.contains(event.target) && 
                    !burger.contains(event.target)) {
                    nav.classList.remove('nav-active');
                    burger.classList.remove('toggle');
                    burger.setAttribute('aria-expanded', 'false');
                }
            });
        }
    }
    
    // Better handling of project card heights for consistent rows
    function equalizeProjectCardHeights() {
        if (window.innerWidth >= 768) {
            const cards = document.querySelectorAll('.project-card');
            const rows = {};
            
            // Reset heights first
            cards.forEach(card => {
                card.style.height = 'auto';
            });
            
            // Skip if no cards or only one card
            if (cards.length <= 1) return;
            
            // Group cards by their position row
            cards.forEach(card => {
                const rect = card.getBoundingClientRect();
                const row = Math.round(rect.top);
                
                if (!rows[row]) rows[row] = [];
                rows[row].push(card);
            });
            
            // Set all cards in each row to the tallest height
            Object.values(rows).forEach(rowCards => {
                const heights = rowCards.map(card => card.offsetHeight);
                const maxHeight = Math.max(...heights);
                
                rowCards.forEach(card => {
                    card.style.height = maxHeight + 'px';
                });
            });
        }
    }
    
    // Apply smooth scrolling for navigation links
    function applySmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    // Account for fixed header
                    const headerOffset = 70;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // Optimize parallax and animations for device capabilities
    function optimizeEffects() {
        // Check for low-power mode on iOS devices
        const isLowPowerMode = /iPad|iPhone|iPod/.test(navigator.userAgent) && 
                             !window.MSStream && 
                             window.devicePixelRatio === 2;
        
        // Apply simpler animations on low-power devices
        if (isLowPowerMode || 
            window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.documentElement.classList.add('reduced-motion');
        }
    }
    
    // Initialize all responsive enhancements
    enhanceNavigation();
    equalizeProjectCardHeights();
    applySmoothScrolling();
    optimizeEffects();
    
    // Re-run on resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            equalizeProjectCardHeights();
        }, 250);
    });
});
