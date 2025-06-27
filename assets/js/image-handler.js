/**
 * Image handler for optimized loading
 * Ensures images load smoothly with proper fade-in
 */

document.addEventListener('DOMContentLoaded', function() {
    // Handle project images loading
    const projectImages = document.querySelectorAll('.project-bg-img');
    
    projectImages.forEach(img => {
        // Add loading class
        img.classList.add('loading');
        
        // When image loads
        img.addEventListener('load', function() {
            // Remove loading class and add loaded class for fade in
            img.classList.remove('loading');
            img.classList.add('loaded');
        });
        
        // If image fails to load, handle it gracefully
        img.addEventListener('error', function() {
            console.log('Failed to load image: ' + img.src);
            // Set a fallback background color
            img.parentElement.style.backgroundColor = '#f0f0f0';
        });
        
        // Force load check in case the image is already cached
        if (img.complete) {
            img.classList.remove('loading');
            img.classList.add('loaded');
        }
    });

    // Image optimization for different devices
    function optimizeImagesForDevice() {
        const isMobile = window.innerWidth <= 768;
        
        projectImages.forEach(img => {
            // Adjust object-position based on device
            if (isMobile) {
                img.style.objectPosition = 'center center';
            } else {
                img.style.objectPosition = 'center top';
            }
        });
    }
    
    // Run on page load
    optimizeImagesForDevice();
    
    // Run when window resizes
    window.addEventListener('resize', debounce(optimizeImagesForDevice, 200));
    
    // Simple debounce function
    function debounce(func, wait) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), wait);
        };
    }
});
