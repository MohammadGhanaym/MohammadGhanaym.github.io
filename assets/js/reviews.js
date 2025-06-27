/**
 * Reviews section enhancements
 * Handles the horizontal scrolling tape-like format
 * Ensures compatibility with GitHub Pages
 */

// When DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const reviewsSection = document.getElementById('feedback');
    const reviewsScroll = document.querySelector('.reviews-scroll');
    
    if (!reviewsScroll) return;
    
    // Temporarily pause animation when hovering over a card to read it
    const reviewCards = document.querySelectorAll('.review-card');
    reviewCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (reviewsScroll) {
                reviewsScroll.style.animationPlayState = 'paused';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (reviewsScroll) {
                reviewsScroll.style.animationPlayState = 'running';
            }
        });
    });
    
    // Handle image loading issues
    document.querySelectorAll('.review-image').forEach(img => {
        // Set crossorigin attribute for GitHub Pages
        img.setAttribute('crossorigin', 'anonymous');
        
        img.addEventListener('error', function() {
            this.classList.add('image-error');
            this.parentElement.classList.add('image-container-error');
        });
        
        // Show a loading state
        img.addEventListener('load', function() {
            this.classList.add('image-loaded');
        });
    });
    
    // If the user has reduced motion preferences, stop animation
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        reviewsScroll.style.animationPlayState = 'paused';
    }
});
