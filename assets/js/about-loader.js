/**
 * About Section Dynamic Loader
 * Loads about content from JSON configuration
 */

class AboutLoader {
    constructor() {
        this.config = null;
        this.init();
    }

    async init() {
        try {
            await this.loadConfig();
            this.renderAboutSection();
        } catch (error) {
            console.error('Failed to load about configuration:', error);
        }
    }

    async loadConfig() {
        try {
            const response = await fetch('assets/data/projects-config.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            this.config = data.about;
        } catch (error) {
            console.error('Error loading configuration:', error);
            throw error;
        }
    }

    renderAboutSection() {
        if (!this.config) {
            console.warn('About configuration not found');
            return;
        }

        const aboutSection = document.getElementById('about');
        if (!aboutSection) {
            console.warn('About section not found in DOM');
            return;
        }

        // Build paragraphs HTML
        const paragraphsHTML = this.config.paragraphs
            .map(p => `<p>${p}</p>`)
            .join('');

        // Build details HTML
        const detailsHTML = this.config.details
            .map(detail => `
                <div class="detail">
                    <i class="${detail.icon}"></i>
                    <span>${detail.text}</span>
                </div>
            `)
            .join('');

        // Render complete about section
        aboutSection.innerHTML = `
            <div class="container">
                <h2 class="section-title">${this.config.title}</h2>
                <div class="about-content">
                    <div class="about-text">
                        ${paragraphsHTML}
                        <div class="about-details">
                            ${detailsHTML}
                        </div>
                    </div>
                    <div class="about-image">
                        <img src="${this.config.image}" alt="${this.config.imageAlt}" class="profile-image">
                    </div>
                </div>
            </div>
        `;
    }
}

// Initialize about loader when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    window.aboutLoader = new AboutLoader();
});
