/**
 * Theme handler script
 * Ensures correct theme is applied and overrides if needed
 */

(function() {
    // Force light mode for now (can be changed later to be user-togglable)
    document.documentElement.classList.remove('dark-mode');
    document.body.classList.remove('dark-mode');
    
    // Always add force-light class to ensure consistent rendering
    document.documentElement.classList.add('force-light');
    document.body.classList.add('force-light');
    
    // Set CSS variables to light mode values
    document.documentElement.style.setProperty('--card-background', '#ffffff');
    document.documentElement.style.setProperty('--tag-background', '#ffffff');
    document.documentElement.style.setProperty('--project-card-bg', '#ffffff');
    document.documentElement.style.setProperty('--project-tag-bg', '#ffffff');
    document.documentElement.style.setProperty('--text-primary-color', '#333333');
    document.documentElement.style.setProperty('--text-secondary-color', '#555555');
    
    // Override system color scheme preferences by directly setting colors
    document.documentElement.style.setProperty('color-scheme', 'light');
    
    // Force white background on project sections
    const projectInfoElements = document.querySelectorAll('.project-info');
    if (projectInfoElements) {
        projectInfoElements.forEach(el => {
            el.style.backgroundColor = '#ffffff';
        });
    }
})();
