/**
 * CV Configuration Loader
 * Dynamically loads CV and feedback paths from JSON configuration
 */

class CVConfigManager {
    constructor() {
        this.config = null;
        this.init();
    }

    async init() {
        try {
            await this.loadConfig();
            this.updateCVLinks();
            this.updateFeedbackImages();
        } catch (error) {
            console.error('Failed to initialize CV configuration:', error);
        }
    }

    async loadConfig() {
        try {
            const response = await fetch('assets/data/projects-config.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.config = await response.json();
        } catch (error) {
            console.error('Error loading configuration:', error);
            throw error;
        }
    }

    updateCVLinks() {
        if (!this.config || !this.config.cv) {
            console.warn('CV configuration not found');
            return;
        }

        const { downloadPath, googleDriveUrl, coverLetterPath } = this.config.cv;

        // Update download CV button
        const downloadBtn = document.querySelector('a[href*="Mohamed_Ghanaym_Data_Analyst_CV.pdf"]');
        if (downloadBtn && downloadPath) {
            downloadBtn.href = downloadPath;
            downloadBtn.setAttribute('download', '');
        }

        // Update Google Drive button
        const googleDriveBtn = document.querySelector('a[href*="drive.google.com"]');
        if (googleDriveBtn && googleDriveUrl) {
            googleDriveBtn.href = googleDriveUrl;
            googleDriveBtn.setAttribute('target', '_blank');
        }

        // Update cover letter link if exists
        const coverLetterBtn = document.querySelector('a[href*="Cover Letter.txt"]');
        if (coverLetterBtn && coverLetterPath) {
            coverLetterBtn.href = coverLetterPath;
        }
    }

    updateFeedbackImages() {
        if (!this.config || !this.config.feedback || !this.config.feedback.images) {
            console.warn('Feedback configuration not found');
            return;
        }

        const feedbackImages = this.config.feedback.images;
        const reviewImages = document.querySelectorAll('.review-image');

        // Update existing images with configuration data
        reviewImages.forEach((img, index) => {
            const imageIndex = index % feedbackImages.length;
            const imageConfig = feedbackImages[imageIndex];
            
            if (imageConfig) {
                img.src = imageConfig.path;
                img.alt = imageConfig.alt;
                img.loading = imageConfig.loading;
            }
        });
    }

    // Public method to get configuration
    getConfig() {
        return this.config;
    }

    // Public method to get CV paths
    getCVPaths() {
        return this.config?.cv || null;
    }

    // Public method to get feedback images
    getFeedbackImages() {
        return this.config?.feedback?.images || [];
    }
}

// Initialize CV configuration when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.cvConfigManager = new CVConfigManager();
});

// Also expose the class for external use
window.CVConfigManager = CVConfigManager;