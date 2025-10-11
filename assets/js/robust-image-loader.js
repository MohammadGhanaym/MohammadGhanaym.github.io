/**
 * Robust Image Loader for Review Section
 * Handles different path formats and provides comprehensive fallbacks
 */

class RobustImageLoader {
    constructor() {
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.loadReviewImages();
        });
    }

    loadReviewImages() {
        const reviewImages = document.querySelectorAll('.review-image');
        
        reviewImages.forEach((img, index) => {
            this.setupImageWithFallbacks(img, index);
        });
    }

    setupImageWithFallbacks(img, index) {
        const imageNumber = (index % 4) + 1;
        
        // Multiple path formats to try
        const pathVariations = [
            `assets/data/Clients%20Feedback/feedback${imageNumber}.PNG`,
            `assets/data/Clients Feedback/feedback${imageNumber}.PNG`,
            `./assets/data/Clients%20Feedback/feedback${imageNumber}.PNG`,
            `./assets/data/Clients Feedback/feedback${imageNumber}.PNG`,
            `assets\\data\\Clients Feedback\\feedback${imageNumber}.PNG`,
            `assets/data/Clients%2520Feedback/feedback${imageNumber}.PNG` // Double encoded
        ];

        let currentAttempt = 0;
        
        const tryNextPath = () => {
            if (currentAttempt >= pathVariations.length) {
                this.handleFinalFailure(img, imageNumber);
                return;
            }

            const currentPath = pathVariations[currentAttempt];
            console.log(`Attempting to load: ${currentPath}`);
            
            // Create a new image to test loading
            const testImg = new Image();
            
            testImg.onload = () => {
                console.log(`Successfully loaded: ${currentPath}`);
                img.src = currentPath;
                img.classList.add('image-loaded');
            };
            
            testImg.onerror = () => {
                console.warn(`Failed to load: ${currentPath}`);
                currentAttempt++;
                tryNextPath();
            };
            
            testImg.src = currentPath;
        };

        // Start the loading process
        tryNextPath();
    }

    handleFinalFailure(img, imageNumber) {
        console.error(`All attempts failed for feedback image ${imageNumber}`);
        
        // Hide the broken image
        img.style.display = 'none';
        
        // Create a placeholder
        const placeholder = document.createElement('div');
        placeholder.className = 'review-image-placeholder';
        placeholder.innerHTML = `
            <div class="placeholder-content">
                <i class="fas fa-image"></i>
                <p>Client Review ${imageNumber}</p>
                <small>Image unavailable</small>
            </div>
        `;
        
        // Insert placeholder
        img.parentElement.appendChild(placeholder);

        // Add some styling
        this.addPlaceholderStyles();
    }

    addPlaceholderStyles() {
        // Check if styles already added
        if (document.getElementById('placeholder-styles')) return;

        const styles = document.createElement('style');
        styles.id = 'placeholder-styles';
        styles.textContent = `
            .review-image-placeholder {
                width: 100%;
                min-height: 200px;
                background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
                border: 2px dashed #adb5bd;
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #6c757d;
                text-align: center;
            }
            
            .placeholder-content i {
                font-size: 2rem;
                margin-bottom: 10px;
                opacity: 0.5;
            }
            
            .placeholder-content p {
                margin: 5px 0;
                font-weight: 600;
            }
            
            .placeholder-content small {
                opacity: 0.7;
            }
        `;
        
        document.head.appendChild(styles);
    }

    // Public method to manually retry loading
    retryLoading() {
        this.loadReviewImages();
    }
}

// Initialize the robust image loader
const robustImageLoader = new RobustImageLoader();

// Expose for debugging
window.robustImageLoader = robustImageLoader;