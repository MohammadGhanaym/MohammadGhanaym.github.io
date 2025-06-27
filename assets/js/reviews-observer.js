/**
 * Review section animation observer
 * Ensures animation starts immediately when the section is visible
 */

// Create intersection observer for the reviews section
document.addEventListener("DOMContentLoaded", function() {
    const reviewsSection = document.getElementById('feedback');
    const reviewsScroll = document.querySelector('.reviews-scroll');
    
    if (!reviewsSection || !reviewsScroll) return;
    
    // Function to ensure animation is running
    function ensureAnimationIsRunning() {
        reviewsScroll.style.animationPlayState = 'running';
        
        // Force a repaint to ensure animation starts
        void reviewsScroll.offsetWidth;
        
        // Make sure visibility is not an issue
        reviewsScroll.style.visibility = 'visible';
        reviewsSection.style.visibility = 'visible';
    }
    
    // Call immediately on load
    ensureAnimationIsRunning();
    
    // Also set up an observer to ensure it runs when scrolled into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                ensureAnimationIsRunning();
            }
        });
    }, { threshold: 0.1 });
    
    observer.observe(reviewsSection);
    
    // Also run when window is fully loaded
    window.addEventListener('load', ensureAnimationIsRunning);
    
    // Run again after a short delay to handle any edge cases
    setTimeout(ensureAnimationIsRunning, 500);
});
