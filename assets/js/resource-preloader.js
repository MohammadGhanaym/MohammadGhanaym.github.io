/**
 * Resource preloader utility 
 * Helps avoid layout shifts by preloading key resources
 */

document.addEventListener('DOMContentLoaded', function() {
    // Helper function to preload image and return a promise
    function preloadImage(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
            img.src = src;
        });
    }
    
    // Preload high-priority images to avoid layout shifts
    function preloadCriticalImages() {
        // Add critical images that should be loaded before display
        const criticalImages = [
            // Add paths to critical hero/profile images if needed
        ];
        
        // Project images that might be above the fold depending on screen size
        if (window.innerWidth >= 768) {
            criticalImages.push(
                // Add paths to first visible project images
            );
        }
        
        // Preload all critical images
        Promise.all(criticalImages.map(src => preloadImage(src)))
            .then(() => {
                document.body.classList.add('critical-images-loaded');
            })
            .catch(error => {
                console.warn('Some critical images failed to preload:', error);
                // Still mark as loaded to avoid indefinite waiting
                document.body.classList.add('critical-images-loaded');
            });
    }
    
    // Fix for Firefox FOUC (Flash Of Unstyled Content)
    document.documentElement.classList.add('css-loaded');
    
    // Ensure smooth transitions when loading resources
    window.addEventListener('load', function() {
        document.body.classList.add('page-loaded');
    });
    
    // Add support for detecting screen size changes
    let resizeTimer;
    function handleResize() {
        document.body.classList.add('resizing');
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            document.body.classList.remove('resizing');
        }, 250);
    }
    window.addEventListener('resize', handleResize);
    
    // Initialize preloading
    preloadCriticalImages();
});
