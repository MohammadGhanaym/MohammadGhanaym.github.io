document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle with enhanced touch support
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    
    // Ensure burger menu works on all devices including touch devices
    if (burger && nav) {
        // Use both click and touchstart for better mobile response
        ['click', 'touchstart'].forEach(eventType => {
            burger.addEventListener(eventType, function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Toggle Nav
                nav.classList.toggle('nav-active');
                
                // Update ARIA attributes
                const expanded = burger.getAttribute('aria-expanded') === 'true' || false;
                burger.setAttribute('aria-expanded', !expanded);
                
                // Animate Links
                navLinks.forEach((link, index) => {
                    if (link.style.animation) {
                        link.style.animation = '';
                    } else {
                        link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                    }
                });
                
                // Burger Animation
                burger.classList.toggle('toggle');
            }, { passive: false });
        });
        
        // Close menu when clicking elsewhere on the page
        document.addEventListener('click', function(e) {
            if (nav.classList.contains('nav-active') && 
                !nav.contains(e.target) && 
                !burger.contains(e.target)) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
                burger.setAttribute('aria-expanded', 'false');
                
                // Reset animations
                navLinks.forEach(link => {
                    link.style.animation = '';
                });
            }
        });
        
        // Close menu when a link is clicked
        navLinks.forEach(link => {
            if (link.querySelector('a')) {
                link.querySelector('a').addEventListener('click', function() {
                    // Only perform this action on mobile
                    if (window.innerWidth <= 768) {
                        nav.classList.remove('nav-active');
                        burger.classList.remove('toggle');
                        burger.setAttribute('aria-expanded', 'false');
                        
                        // Reset animations
                        navLinks.forEach(link => {
                            link.style.animation = '';
                        });
                    }
                });
            }
        });
    }
    
    // Project Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    // Helper function to scroll active filter button into view (for mobile)
    function scrollActiveFilterIntoView() {
        const activeFilter = document.querySelector('.filter-btn.active');
        const filterContainer = document.querySelector('.project-filters');
        
        if (activeFilter && filterContainer && window.innerWidth <= 768) {
            // Calculate position to center the button in the scroll area
            const containerWidth = filterContainer.offsetWidth;
            const buttonLeft = activeFilter.offsetLeft;
            const buttonWidth = activeFilter.offsetWidth;
            
            // Scroll to position the button in center
            filterContainer.scrollLeft = buttonLeft - (containerWidth / 2) + (buttonWidth / 2);
            
            // Hide scroll hint after user interaction
            const scrollHint = document.querySelector('.scroll-hint');
            if (scrollHint) {
                setTimeout(() => {
                    scrollHint.style.display = 'none';
                }, 1000);
            }
        }
    }
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            // Scroll active filter into view (for mobile)
            scrollActiveFilterIntoView();
            
            projectCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                    // Add a nice fade-in animation
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else if (card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    // Add a nice fade-in animation
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Add initial animation and hover effects for project cards
    projectCards.forEach(card => {
        // Set initial state for animation
        card.style.transition = 'all 0.3s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
        
        // Hover effects
        card.addEventListener('mouseenter', () => {
            card.classList.add('hovered');
        });
        
        card.addEventListener('mouseleave', () => {
            card.classList.remove('hovered');
        });
    });
    
    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // Close mobile nav if open
                if (nav.classList.contains('nav-active')) {
                    nav.classList.remove('nav-active');
                    burger.classList.remove('toggle');
                    
                    navLinks.forEach(link => {
                        link.style.animation = '';
                    });
                }
            }
        });
    });
    
    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you would normally send the form data to a server
            // Since this is a GitHub Pages site without a backend,
            // we'll just show a thank you message
            
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            
            // Replace form with thank you message
            contactForm.innerHTML = `
                <div class="thank-you-message">
                    <h3>Thank you, ${name}!</h3>
                    <p>Your message has been received. I'll get back to you as soon as possible.</p>
                    <p>(Note: This is a static GitHub Pages site, so the form doesn't actually send data. In a real portfolio, you'd connect this to a form service like Formspree or Netlify Forms.)</p>
                </div>
            `;
        });
    }
    
    // Add active class to navbar links based on scroll position
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector('.nav-links a[href*=' + sectionId + ']')?.classList.add('active');
            } else {
                document.querySelector('.nav-links a[href*=' + sectionId + ']')?.classList.remove('active');
            }
        });
    });
    
    // Testimonial interactions
    const testimonials = document.querySelectorAll('.testimonial');
    
    testimonials.forEach(testimonial => {
        testimonial.addEventListener('mouseenter', function() {
            this.style.transform = 'rotate(0) scale(1.05)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
            this.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            this.style.zIndex = '10';
        });
        
        testimonial.addEventListener('mouseleave', function() {
            // Reset to original rotation based on index
            if ([...testimonials].indexOf(this) % 2 === 0) {
                this.style.transform = 'rotate(-1.5deg)';
            } else {
                this.style.transform = 'rotate(1.5deg)';
            }
            this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.12)';
            this.style.zIndex = '1';
        });
        
        // Add a slight random rotation variation to each testimonial for a more natural look
        const randomAngle = Math.random() * 0.5 - 0.25; // Small random angle between -0.25 and 0.25 degrees
        const baseAngle = [...testimonials].indexOf(testimonial) % 2 === 0 ? -1.5 : 1.5;
        testimonial.style.transform = `rotate(${baseAngle + randomAngle}deg)`;
    });
    
    // Tape Item Interactions
    const tapeItems = document.querySelectorAll('.tape-item');
    
    tapeItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'rotate(0) scale(1.05)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
            this.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            this.style.zIndex = '10';
            
            // Pause the animation when hovering
            document.querySelector('.feedback-tape').style.animationPlayState = 'paused';
        });
        
        item.addEventListener('mouseleave', function() {
            // Reset to original rotation based on index
            const isEven = [...tapeItems].indexOf(this) % 2 === 0;
            const baseAngle = isEven ? -1.5 : 1.5;
            this.style.transform = `rotate(${baseAngle}deg)`;
            this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.12)';
            this.style.zIndex = '1';
            
            // Resume the animation when not hovering
            document.querySelector('.feedback-tape').style.animationPlayState = 'running';
        });
        
        // Add a slight random rotation variation for a more natural look
        const randomAngle = Math.random() * 1 - 0.5; // Random angle between -0.5 and 0.5 degrees
        const isEven = [...tapeItems].indexOf(item) % 2 === 0;
        const baseAngle = isEven ? -1.5 : 1.5;
        item.style.transform = `rotate(${baseAngle + randomAngle}deg)`;
    });
    
    // Add animation for feedback items
    const feedbackItems = document.querySelectorAll('.tape-item');
    
    feedbackItems.forEach((item, index) => {
        // Apply rotation immediately
        item.style.transform = `rotate(${index % 2 === 0 ? '-1deg' : '1deg'})`;
    });
    
    // Review cards animation
    const reviewCards = document.querySelectorAll('.review-card');
    
    reviewCards.forEach((card, index) => {
        // Set initial state
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        // Apply animation with delay based on index
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 300 + (index * 150));
        
        // Add hover effect
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
    
    // Add animation for review cards when they scroll into view
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const reviewObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    reviewCards.forEach(card => {
        reviewObserver.observe(card);
    });
    
    // Control buttons for the reviews scroll
    const pauseButton = document.querySelector('.pause-btn');
    const playButton = document.querySelector('.play-btn');
    const reviewsScroll = document.querySelector('.reviews-scroll');
    
    if (pauseButton && playButton && reviewsScroll) {
        // Initially hide the play button since animation is playing by default
        playButton.style.display = 'none';
        
        pauseButton.addEventListener('click', function() {
            reviewsScroll.style.animationPlayState = 'paused';
            pauseButton.style.display = 'none';
            playButton.style.display = 'flex';
        });
        
        playButton.addEventListener('click', function() {
            reviewsScroll.style.animationPlayState = 'running';
            playButton.style.display = 'none';
            pauseButton.style.display = 'flex';
        });
        
        // Duplicate the reviews-scroll content for endless looping
        const createClone = () => {
            // We already have duplicates in the HTML for the simple approach
            // This is just for GitHub Pages compatibility
            const reviewCards = document.querySelectorAll('.review-card');
            const firstFourCards = Array.from(reviewCards).slice(0, 4);
        };
        
        createClone();
        
        // Fix for ensuring review images load properly
        document.querySelectorAll('.review-image').forEach(img => {
            img.addEventListener('error', function() {
                console.log('Image failed to load:', this.src);
                // If image fails to load, add a class for styling
                this.classList.add('image-error');
                this.parentElement.classList.add('image-container-error');
            });
        });
    }
    
    // Fix for ensuring review images load properly
    document.querySelectorAll('.review-image').forEach(img => {
        img.addEventListener('error', function() {
            this.src = 'assets/images/placeholder-review.jpg';
            this.alt = 'Review image could not be loaded';
        });
    });
    
    // Call the function on page load to ensure the active filter is visible
    window.addEventListener('load', scrollActiveFilterIntoView);
    window.addEventListener('resize', scrollActiveFilterIntoView);
});
