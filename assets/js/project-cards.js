/**
 * Project cards enhancement script
 * Ensures consistent card heights and appearance
 */

document.addEventListener('DOMContentLoaded', function() {
    // Get all project cards
    const projectCards = document.querySelectorAll('.project-card');
    
    // Normalize card heights for consistent appearance
    function normalizeCardHeights() {
        // Reset heights first
        projectCards.forEach(card => {
            const infoSection = card.querySelector('.project-info');
            infoSection.style.height = 'auto';
        });
        
        // Only normalize on larger screens
        if (window.innerWidth >= 768) {
            // Group cards by row
            const cardPositions = Array.from(projectCards).map(card => {
                return {
                    card: card,
                    top: card.getBoundingClientRect().top
                };
            });
            
            // Group cards by row (same top position)
            const rows = {};
            cardPositions.forEach(item => {
                if (!rows[item.top]) {
                    rows[item.top] = [];
                }
                rows[item.top].push(item.card);
            });
            
            // Normalize heights for each row
            Object.values(rows).forEach(cardsInRow => {
                if (cardsInRow.length > 1) {
                    // Find the maximum info section height
                    let maxInfoHeight = 0;
                    cardsInRow.forEach(card => {
                        const infoSection = card.querySelector('.project-info');
                        maxInfoHeight = Math.max(maxInfoHeight, infoSection.offsetHeight);
                    });
                    
                    // Apply the maximum height to all cards in this row
                    cardsInRow.forEach(card => {
                        const infoSection = card.querySelector('.project-info');
                        infoSection.style.height = maxInfoHeight + 'px';
                    });
                }
            });
        }
    }
    
    // Run on page load with a slight delay to ensure images are loaded
    setTimeout(normalizeCardHeights, 500);
    
    // Run when window resizes
    window.addEventListener('resize', debounce(normalizeCardHeights, 200));
    
    // Simple debounce function
    function debounce(func, wait) {
        let timeout;
        return function() {
            clearTimeout(timeout);
            timeout = setTimeout(func, wait);
        };
    }
});
