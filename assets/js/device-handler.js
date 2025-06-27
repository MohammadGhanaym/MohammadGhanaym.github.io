/**
 * Device and Orientation Handler
 * Helps with smooth transitions during device rotation and size changes
 */

document.addEventListener('DOMContentLoaded', function() {
    // Add a class to the HTML element to indicate the device type
    function detectDeviceType() {
        const html = document.documentElement;
        
        // Reset classes
        html.classList.remove('is-mobile', 'is-tablet', 'is-desktop', 'is-touch', 'is-landscape', 'is-portrait');
        
        // Set orientation class
        if (window.innerWidth > window.innerHeight) {
            html.classList.add('is-landscape');
        } else {
            html.classList.add('is-portrait');
        }
        
        // Set device class
        if (window.innerWidth < 576) {
            html.classList.add('is-mobile');
        } else if (window.innerWidth < 992) {
            html.classList.add('is-tablet');
        } else {
            html.classList.add('is-desktop');
        }
        
        // Detect touch capability
        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
            html.classList.add('is-touch');
        }
    }
    
    // Handle orientation changes
    function handleOrientationChange() {
        const html = document.documentElement;
        
        if (window.innerWidth > window.innerHeight) {
            html.classList.remove('is-portrait');
            html.classList.add('is-landscape');
        } else {
            html.classList.remove('is-landscape');
            html.classList.add('is-portrait');
        }
        
        // Fix for iOS Safari 100vh issue in orientation change
        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
            const hero = document.querySelector('.hero');
            if (hero) {
                // Temporarily set to auto height during transition
                hero.style.height = 'auto';
                
                // Reset after transition
                setTimeout(() => {
                    hero.style.height = '';
                }, 100);
            }
        }
        
        // Re-equalize project card heights after orientation change
        if (typeof equalizeProjectCardHeights === 'function') {
            setTimeout(equalizeProjectCardHeights, 300);
        }
    }
    
    // Fix issues with iOS virtual keyboard
    function setupIOSKeyboardFix() {
        // Only apply on iOS devices
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        
        if (isIOS) {
            document.addEventListener('focus', function(e) {
                if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                    // Add padding to prevent content being hidden behind keyboard
                    document.body.classList.add('keyboard-open');
                }
            }, true);
            
            document.addEventListener('blur', function(e) {
                if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                    // Remove padding when keyboard closes
                    document.body.classList.remove('keyboard-open');
                }
            }, true);
        }
    }
    
    // Add responsive content loading - only load certain resources on larger screens
    function setupResponsiveLoading() {
        const loadThreshold = 768; // Only load certain resources above this width
        
        function checkLoadingState() {
            const shouldLoad = window.innerWidth >= loadThreshold;
            const enhancementElements = document.querySelectorAll('[data-responsive-load]');
            
            enhancementElements.forEach(element => {
                if (shouldLoad && !element.getAttribute('src') && element.getAttribute('data-src')) {
                    element.setAttribute('src', element.getAttribute('data-src'));
                    element.removeAttribute('data-responsive-load');
                }
            });
        }
        
        // Check initial state
        checkLoadingState();
        
        // Re-check on resize
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(checkLoadingState, 200);
        });
    }
    
    // Initialize functions
    detectDeviceType();
    setupIOSKeyboardFix();
    setupResponsiveLoading();
    
    // Set up event listeners
    window.addEventListener('resize', detectDeviceType);
    window.addEventListener('orientationchange', handleOrientationChange);
    window.addEventListener('resize', handleOrientationChange);
});
