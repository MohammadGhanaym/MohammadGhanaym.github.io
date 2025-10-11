/**
 * Debug Helper for Review Section
 * Helps diagnose image loading issues
 */

function debugReviewSection() {
    console.log('=== Review Section Debug ===');
    
    // Check if review section exists
    const reviewSection = document.getElementById('feedback');
    console.log('Review section found:', !!reviewSection);
    
    // Check all review images
    const reviewImages = document.querySelectorAll('.review-image');
    console.log('Number of review images found:', reviewImages.length);
    
    reviewImages.forEach((img, index) => {
        console.log(`Image ${index + 1}:`);
        console.log('  - Source:', img.src);
        console.log('  - Alt:', img.alt);
        console.log('  - Complete:', img.complete);
        console.log('  - Natural width:', img.naturalWidth);
        console.log('  - Natural height:', img.naturalHeight);
        
        // Test if image can be loaded
        const testImg = new Image();
        testImg.onload = () => console.log(`  - Test load: SUCCESS for ${img.src}`);
        testImg.onerror = () => console.error(`  - Test load: FAILED for ${img.src}`);
        testImg.src = img.src;
    });
    
    // Check CSS animation
    const reviewsScroll = document.querySelector('.reviews-scroll');
    if (reviewsScroll) {
        const computedStyle = window.getComputedStyle(reviewsScroll);
        console.log('Animation name:', computedStyle.animationName);
        console.log('Animation duration:', computedStyle.animationDuration);
        console.log('Animation play state:', computedStyle.animationPlayState);
    }
    
    // Check for JavaScript errors
    window.addEventListener('error', (event) => {
        console.error('JavaScript error detected:', event.error);
    });
    
    // Check network requests
    if (window.fetch) {
        const originalFetch = window.fetch;
        window.fetch = function(...args) {
            console.log('Fetch request:', args[0]);
            return originalFetch.apply(this, args)
                .then(response => {
                    console.log('Fetch response:', response.status, args[0]);
                    return response;
                })
                .catch(error => {
                    console.error('Fetch error:', error, args[0]);
                    throw error;
                });
        };
    }
}

// Run debug on page load
document.addEventListener('DOMContentLoaded', debugReviewSection);

// Also run after a delay to catch dynamic changes
setTimeout(debugReviewSection, 3000);

// Expose function globally for manual debugging
window.debugReviewSection = debugReviewSection;