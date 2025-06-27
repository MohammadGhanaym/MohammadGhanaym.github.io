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
    const pauseBtn = document.querySelector('.pause-btn');
    const playBtn = document.querySelector('.play-btn');
    
    if (!reviewsScroll) return;
    
    // Control animation
    if (pauseBtn && playBtn) {
        pauseBtn.addEventListener('click', function() {
            reviewsScroll.style.animationPlayState = 'paused';
            pauseBtn.style.display = 'none';
            playBtn.style.display = 'flex';
        });
        
        playBtn.addEventListener('click', function() {
            reviewsScroll.style.animationPlayState = 'running';
            playBtn.style.display = 'none';
            pauseBtn.style.display = 'flex';
        });
    }
    
    // On mobile, slow down the animation
    if (window.innerWidth < 768) {
        reviewsScroll.style.animationDuration = '40s';
    }
    
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
        if (pauseBtn) pauseBtn.style.display = 'none';
        if (playBtn) playBtn.style.display = 'flex';
    }
});
