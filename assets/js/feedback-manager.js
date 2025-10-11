/**
 * Enhanced Feedback Section Manager
 * Ensures client feedback images load properly and animation works
 */

class FeedbackManager {
    constructor() {
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.setupFeedbackSection();
            this.preloadImages();
            this.ensureAnimation();
        });
    }

    setupFeedbackSection() {
        const feedbackSection = document.getElementById('feedback');
        const reviewsScroll = document.querySelector('.reviews-scroll');
        
        if (!feedbackSection || !reviewsScroll) {
            console.warn('Feedback section elements not found');
            return;
        }

        // Ensure visibility
        feedbackSection.style.visibility = 'visible';
        reviewsScroll.style.visibility = 'visible';

        // Set up proper animation
        this.initializeAnimation(reviewsScroll);
        
        // Handle image loading
        this.handleImageLoading();
        
        // Add intersection observer
        this.setupIntersectionObserver(feedbackSection, reviewsScroll);
    }

    preloadImages() {
        const imageUrls = [
            'assets/data/Clients%20Feedback/feedback1.PNG',
            'assets/data/Clients%20Feedback/feedback2.PNG',
            'assets/data/Clients%20Feedback/feedback3.PNG',
            'assets/data/Clients%20Feedback/feedback4.PNG'
        ];

        imageUrls.forEach(url => {
            const img = new Image();
            img.src = url;
            img.onerror = () => console.warn(`Failed to preload image: ${url}`);
        });
    }

    initializeAnimation(reviewsScroll) {
        // Force animation restart
        reviewsScroll.style.animation = 'none';
        requestAnimationFrame(() => {
            reviewsScroll.style.animation = 'scrollTape 60s linear infinite';
            reviewsScroll.style.animationPlayState = 'running';
        });

        // Add hover pause functionality
        this.setupHoverControls(reviewsScroll);
    }

    setupHoverControls(reviewsScroll) {
        const reviewCards = document.querySelectorAll('.review-card');
        
        reviewCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                reviewsScroll.style.animationPlayState = 'paused';
            });
            
            card.addEventListener('mouseleave', () => {
                reviewsScroll.style.animationPlayState = 'running';
            });
        });
    }

    handleImageLoading() {
        const reviewImages = document.querySelectorAll('.review-image');
        
        reviewImages.forEach((img, index) => {
            img.addEventListener('load', () => {
                img.classList.add('image-loaded');
            });
            
            img.addEventListener('error', () => {
                console.error(`Failed to load review image: ${img.src}`);
                img.classList.add('image-error');
                // Set a fallback or retry loading
                this.handleImageError(img, index);
            });
        });
    }

    handleImageError(img, index) {
        console.error(`Failed to load review image: ${img.src}`);
        
        // Try different URL encoding approaches
        const originalSrc = img.src;
        const alternatives = [
            originalSrc.replace('Clients%20Feedback', 'Clients Feedback'),
            originalSrc.replace('Clients Feedback', 'Clients%20Feedback'),
            originalSrc.replace(/\s/g, '%20')
        ];
        
        let attemptIndex = 0;
        const tryAlternative = () => {
            if (attemptIndex < alternatives.length) {
                setTimeout(() => {
                    img.src = alternatives[attemptIndex];
                    attemptIndex++;
                    img.onerror = tryAlternative;
                }, 500);
            } else {
                // All attempts failed, show error placeholder
                img.style.display = 'none';
                const errorDiv = document.createElement('div');
                errorDiv.className = 'image-error-placeholder';
                errorDiv.innerHTML = `<p>Review image ${index + 1} could not be loaded</p>`;
                img.parentElement.appendChild(errorDiv);
            }
        };
        
        tryAlternative();
    }

    setupIntersectionObserver(feedbackSection, reviewsScroll) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Ensure animation starts when section is visible
                    reviewsScroll.style.animationPlayState = 'running';
                    reviewsScroll.style.visibility = 'visible';
                }
            });
        }, { 
            threshold: 0.1,
            rootMargin: '50px'
        });
        
        observer.observe(feedbackSection);
    }

    ensureAnimation() {
        // Additional check after a delay to ensure animation is working
        setTimeout(() => {
            const reviewsScroll = document.querySelector('.reviews-scroll');
            if (reviewsScroll) {
                const computedStyle = window.getComputedStyle(reviewsScroll);
                const animationName = computedStyle.animationName;
                
                if (animationName === 'none') {
                    console.warn('Animation not running, attempting to restart...');
                    this.initializeAnimation(reviewsScroll);
                }
            }
        }, 2000);
    }

    // Public method to manually restart animation
    restartAnimation() {
        const reviewsScroll = document.querySelector('.reviews-scroll');
        if (reviewsScroll) {
            this.initializeAnimation(reviewsScroll);
        }
    }
}

// Initialize feedback manager
const feedbackManager = new FeedbackManager();

// Expose for debugging
window.feedbackManager = feedbackManager;