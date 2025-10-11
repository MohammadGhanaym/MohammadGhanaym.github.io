// Dynamic Project Loader
class ProjectManager {
    constructor() {
        this.projects = [];
        this.categories = [];
        this.currentFilter = 'all';
    }

    async loadProjects() {
        try {
            const response = await fetch('assets/data/projects-config.json');
            const data = await response.json();
            this.projects = data.projects;
            this.categories = data.categories;
            this.renderFilters();
            this.renderProjects();
            this.initializeFiltering();
        } catch (error) {
            console.error('Error loading projects:', error);
            // Fallback to existing static content if JSON fails to load
        }
    }

    renderFilters() {
        const filtersContainer = document.querySelector('.project-filters');
        if (!filtersContainer) return;

        let filtersHTML = '';
        this.categories.forEach((category, index) => {
            const filterValue = category === 'All Projects' ? 'all' : category;
            const activeClass = index === 0 ? 'active' : '';
            filtersHTML += `<button class="filter-btn ${activeClass}" data-filter="${filterValue}">${category}</button>`;
        });

        filtersContainer.innerHTML = filtersHTML;
    }

    renderProjects() {
        const projectsGrid = document.querySelector('.projects-grid');
        if (!projectsGrid) return;

        let projectsHTML = '';
        this.projects.forEach(project => {
            const skillsHTML = project.skills.map(skill => 
                `<span><i class="${skill.icon}"></i>${skill.name}</span>`
            ).join('');

            projectsHTML += `
                <div class="project-card" data-category="${project.category}">
                    <div class="project-image">
                        <img src="${project.image}" alt="${project.alt}" class="project-bg-img">
                    </div>
                    <div class="project-info">
                        <h3>${project.title}</h3>
                        <div class="project-tags">
                            ${skillsHTML}
                        </div>
                        <div class="project-links">
                            <a href="${project.githubUrl}" target="_blank" class="view-details-link">
                                <i class="fab fa-github"></i> View Details
                            </a>
                        </div>
                    </div>
                </div>
            `;
        });

        projectsGrid.innerHTML = projectsHTML;
    }

    initializeFiltering() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');

        // Helper function to scroll active filter button into view (for mobile)
        const scrollActiveFilterIntoView = () => {
            const activeFilter = document.querySelector('.filter-btn.active');
            const filterContainer = document.querySelector('.project-filters');
            
            if (activeFilter && filterContainer && window.innerWidth <= 768) {
                const containerWidth = filterContainer.offsetWidth;
                const buttonLeft = activeFilter.offsetLeft;
                const buttonWidth = activeFilter.offsetWidth;
                
                filterContainer.scrollLeft = buttonLeft - (containerWidth / 2) + (buttonWidth / 2);
                
                const scrollHint = document.querySelector('.scroll-hint');
                if (scrollHint) {
                    setTimeout(() => {
                        scrollHint.style.display = 'none';
                    }, 1000);
                }
            }
        };

        // Call the function on page load and resize
        window.addEventListener('load', scrollActiveFilterIntoView);
        window.addEventListener('resize', scrollActiveFilterIntoView);

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                btn.classList.add('active');
                
                const filter = btn.getAttribute('data-filter');
                this.currentFilter = filter;
                
                // Scroll active filter into view (for mobile)
                scrollActiveFilterIntoView();
                
                projectCards.forEach(card => {
                    if (filter === 'all') {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 100);
                    } else {
                        const category = card.getAttribute('data-category');
                        if (category === filter) {
                            card.style.display = 'block';
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'scale(1)';
                            }, 100);
                        } else {
                            card.style.opacity = '0';
                            card.style.transform = 'scale(0.8)';
                            setTimeout(() => {
                                card.style.display = 'none';
                            }, 300);
                        }
                    }
                });
            });
        });
    }
}

// Initialize project manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const projectManager = new ProjectManager();
    projectManager.loadProjects();
});