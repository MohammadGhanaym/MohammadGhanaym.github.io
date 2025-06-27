/**
 * Browser Compatibility Polyfills
 * Ensures the site works even on older browsers
 */

// Intersection Observer polyfill for older browsers
if (!('IntersectionObserver' in window) || 
    !('IntersectionObserverEntry' in window) || 
    !('isIntersecting' in window.IntersectionObserverEntry.prototype)) {
    
    // Load polyfill if needed
    const polyfillScript = document.createElement('script');
    polyfillScript.src = 'https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver';
    polyfillScript.async = true;
    document.head.appendChild(polyfillScript);
}

// Object.values polyfill for IE
if (!Object.values) {
    Object.values = function(obj) {
        return Object.keys(obj).map(function(key) {
            return obj[key];
        });
    };
}

// Element.closest polyfill for IE
if (!Element.prototype.closest) {
    Element.prototype.closest = function(s) {
        var el = this;
        
        do {
            if (el.matches(s)) return el;
            el = el.parentElement || el.parentNode;
        } while (el !== null && el.nodeType === 1);
        
        return null;
    };
}

// NodeList.forEach polyfill for IE
if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
}

// Add passive listeners support
let passiveSupported = false;

try {
    const options = {
        get passive() {
            passiveSupported = true;
            return false;
        }
    };
    
    window.addEventListener("test", null, options);
    window.removeEventListener("test", null, options);
} catch(err) {
    passiveSupported = false;
}

// Expose passive support to other scripts
window.passiveSupported = passiveSupported;
