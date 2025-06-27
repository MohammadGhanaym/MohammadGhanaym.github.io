/**
 * Image handler for optimized loading
 * Ensures project images load smoothly with consistent sizing and proportions
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
            
            // Ensure proper aspect ratio
            ensureProperAspectRatio(img);
        });
        
        // If image fails to load, handle it gracefully
        img.addEventListener('error', function() {
            console.log('Failed to load image: ' + img.src);
            // Set a fallback background color
            img.parentElement.style.backgroundColor = '#f0f0f0';
            
            // Add placeholder for missing image
            const placeholder = document.createElement('div');
            placeholder.classList.add('image-placeholder');
            placeholder.innerHTML = '<i class="fas fa-image"></i><p>Image unavailable</p>';
            img.parentElement.appendChild(placeholder);
        });
        
        // Force load check in case the image is already cached
        if (img.complete) {
            img.classList.remove('loading');
            img.classList.add('loaded');
            ensureProperAspectRatio(img);
        }
    });

    // Ensure consistent image sizing
    function ensureProperAspectRatio(img) {
        const imageWidth = img.naturalWidth;
        const imageHeight = img.naturalHeight;
        const aspectRatio = imageWidth / imageHeight;
        
        // Apply specific object-position based on aspect ratio
        if (aspectRatio > 1.5) {
            // Landscape images - center horizontally, bias toward top
            img.style.objectPosition = 'center 15%';
        } else if (aspectRatio < 0.75) {
            // Portrait images - center
            img.style.objectPosition = 'center center';
        } else {
            // Standard images
            img.style.objectPosition = 'center center';
        }
        
        // Force aspect ratio for container
        const container = img.parentElement;
        container.style.position = 'relative';
    }

    // Optimize images for different devices
    function optimizeImagesForDevice() {
        const isMobile = window.innerWidth <= 768;
        const isTablet = window.innerWidth > 768 && window.innerWidth < 1024;
        
        projectImages.forEach(img => {
            // Ensure all images have loaded properly
            if (img.complete) {
                ensureProperAspectRatio(img);
            }
            
            // Additional optimizations for mobile/tablet
            if (isMobile) {
                // Ensure touch device optimizations
                img.parentElement.style.height = '200px';
            } else if (isTablet) {
                img.parentElement.style.height = '180px';
            } else {
                img.parentElement.style.height = '220px';
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
