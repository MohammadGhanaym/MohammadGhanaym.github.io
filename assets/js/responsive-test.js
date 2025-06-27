/**
 * Responsive Testing Utility
 * For development purposes only - can be removed in production
 */
document.addEventListener('DOMContentLoaded', function() {
    // Create responsive testing tool (only visible in dev mode by adding ?debug=true to URL)
    function initResponsiveTestingTool() {
        const urlParams = new URLSearchParams(window.location.search);
        const debugMode = urlParams.get('debug') === 'true';
        
        if (!debugMode) return;
        
        // Create the responsive info display
        const responsiveInfo = document.createElement('div');
        responsiveInfo.className = 'responsive-info';
        responsiveInfo.style.cssText = `
            position: fixed;
            bottom: 10px;
            left: 10px;
            background-color: rgba(0, 0, 0, 0.7);
            color: white;
            padding: 5px 10px;
            border-radius: 5px;
            font-size: 12px;
            z-index: 10000;
        `;
        document.body.appendChild(responsiveInfo);
        
        // Update the display with current dimensions
        function updateInfo() {
            const width = window.innerWidth;
            const height = window.innerHeight;
            const orientation = width > height ? 'landscape' : 'portrait';
            const breakpoint = getBreakpointName(width);
            
            responsiveInfo.innerHTML = `
                Width: ${width}px | Height: ${height}px | 
                Orientation: ${orientation} | Breakpoint: ${breakpoint}
            `;
        }
        
        // Get the current breakpoint name
        function getBreakpointName(width) {
            if (width < 480) return 'xs (mobile)';
            if (width < 576) return 'sm (mobile)';
            if (width < 768) return 'md (tablet)';
            if (width < 992) return 'lg (tablet/laptop)';
            if (width < 1200) return 'xl (desktop)';
            return 'xxl (large desktop)';
        }
        
        // Update on resize
        window.addEventListener('resize', updateInfo);
        updateInfo();
    }
    
    // Initialize the testing tool
    initResponsiveTestingTool();
});
