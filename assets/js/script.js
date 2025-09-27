// Enhanced JavaScript for AI Presentation with Smooth Animations and Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all features
    initSmoothScrolling();
    initNavbarEffects();
    initTypewriterEffects();
    initScrollAnimations();
    initIntersectionObserver();
    initParallaxEffects();
    initDynamicCounters();
    initInteractiveElements();
    
    // Smooth scrolling for navigation links
    function initSmoothScrolling() {
        const navLinks = document.querySelectorAll('#navbar a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Update active navigation
                    updateActiveNav(targetId);
                }
            });
        });
    }
    
    // Update active navigation state
    function updateActiveNav(activeId) {
        const navLinks = document.querySelectorAll('#navbar a');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${activeId}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Enhanced navbar effects with scroll
    function initNavbarEffects() {
        const navbar = document.getElementById('navbar');
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Add/remove scrolled class
            if (scrollTop > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            // Hide/show navbar on scroll direction
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        });
    }
    
    // Advanced typewriter effect with multiple text options
    function initTypewriterEffects() {
        const typewriterElement = document.getElementById('typewriter-title');
        if (typewriterElement) {
            // Add typewriter animation class after page load
            setTimeout(() => {
                typewriterElement.classList.add('typewriter-animation');
            }, 500);
        }
        
        // Welcome section typewriter
        const welcomeHeading = document.querySelector('.typewriter-text');
        if (welcomeHeading) {
            // Ensure the animation starts properly
            setTimeout(() => {
                welcomeHeading.style.animation = 'typing 4s steps(40) 1s 1 normal both, blinking 1s step-end 5s infinite';
            }, 100);
        }
    }
    
    // Scroll-triggered animations
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.fade-in-text, .concept-card, .project-preview-card');
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Add staggered delay for multiple items
                    if (entry.target.classList.contains('concept-card')) {
                        const cards = document.querySelectorAll('.concept-card');
                        const index = Array.from(cards).indexOf(entry.target);
                        entry.target.style.animationDelay = `${index * 0.1}s`;
                    }
                }
            });
        }, observerOptions);
        
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }
    
    // Enhanced intersection observer for section-based effects
    function initIntersectionObserver() {
        const sections = document.querySelectorAll('section');
        
        const sectionObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    updateActiveNav(sectionId);
                    
                    // Trigger section-specific animations
                    triggerSectionAnimations(entry.target);
                }
            });
        }, {
            threshold: 0.3
        });
        
        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }
    
    // Section-specific animation triggers
    function triggerSectionAnimations(section) {
        const sectionId = section.id;
        
        switch(sectionId) {
            case 'welcome':
                animateWelcomeSection(section);
                break;
            case 'projects':
                animateProjectsSection(section);
                break;
            case 'concepts':
                animateConceptsSection(section);
                break;
        }
    }
    
    // Welcome section animations
    function animateWelcomeSection(section) {
        const floatingElements = section.querySelectorAll('.floating-circle, .floating-square, .floating-triangle');
        floatingElements.forEach((element, index) => {
            element.style.animationDelay = `${index * 0.5}s`;
            element.classList.add('animate-float');
        });
    }
    
    // Projects section animations
    function animateProjectsSection(section) {
        const projectCard = section.querySelector('.project-preview-card');
        if (projectCard) {
            projectCard.classList.add('animate-slide-up');
            
            // Animate highlight items sequentially
            const highlights = section.querySelectorAll('.highlight-item');
            highlights.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('animate-highlight');
                }, index * 100);
            });
        }
    }
    
    // Concepts section animations
    function animateConceptsSection(section) {
        const conceptCards = section.querySelectorAll('.concept-card');
        conceptCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('animate-concept-card');
            }, index * 150);
        });
    }
    
    // Parallax effects for background elements
    function initParallaxEffects() {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            // Parallax for floating elements
            const floatingElements = document.querySelectorAll('.floating-elements');
            floatingElements.forEach(element => {
                element.style.transform = `translateY(${rate}px)`;
            });
            
            // Parallax for side images
            const sideImages = document.querySelectorAll('.image-container');
            sideImages.forEach((image, index) => {
                const speed = (index % 2 === 0) ? 0.3 : -0.3;
                const yPos = scrolled * speed;
                image.style.transform = `translateY(calc(-50% + ${yPos}px))`;
            });
        });
    }
    
    // Dynamic counters for project section
    function initDynamicCounters() {
        const counterElement = document.querySelector('.count-number');
        if (counterElement) {
            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !counterElement.classList.contains('counted')) {
                        animateCounter(counterElement, 0, 15, 2000);
                        counterElement.classList.add('counted');
                    }
                });
            });
            
            observer.observe(counterElement);
        }
    }
    
    // Counter animation function
    function animateCounter(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const currentValue = Math.floor(progress * (end - start) + start);
            element.textContent = currentValue + '+';
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
    
    // Interactive elements enhancements
    function initInteractiveElements() {
        // Enhanced hover effects for project links
        const projectLinks = document.querySelectorAll('.main-project-link');
        projectLinks.forEach(link => {
            link.addEventListener('mouseenter', function() {
                this.classList.add('hover-active');
                // Add ripple effect
                createRippleEffect(this, event);
            });
            
            link.addEventListener('mouseleave', function() {
                this.classList.remove('hover-active');
            });
        });
        
        // Interactive concept cards
        const conceptCards = document.querySelectorAll('.concept-card');
        conceptCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-15px) scale(1.03)';
                this.style.boxShadow = '0 20px 50px rgba(0,0,0,0.25)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
            });
        });
        
        // Note container interaction
        const noteContainer = document.querySelector('.note-container');
        if (noteContainer) {
            noteContainer.addEventListener('click', function() {
                this.classList.add('pulse-effect');
                setTimeout(() => {
                    this.classList.remove('pulse-effect');
                }, 600);
            });
        }
    }
    
    // Create ripple effect for buttons
    function createRippleEffect(element, event) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowDown' || e.key === 'PageDown') {
            scrollToNextSection();
        } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
            scrollToPrevSection();
        }
    });
    
    // Navigate to next section
    function scrollToNextSection() {
        const sections = document.querySelectorAll('section');
        const currentSection = getCurrentSection();
        const currentIndex = Array.from(sections).indexOf(currentSection);
        
        if (currentIndex < sections.length - 1) {
            sections[currentIndex + 1].scrollIntoView({
                behavior: 'smooth'
            });
        }
    }
    
    // Navigate to previous section
    function scrollToPrevSection() {
        const sections = document.querySelectorAll('section');
        const currentSection = getCurrentSection();
        const currentIndex = Array.from(sections).indexOf(currentSection);
        
        if (currentIndex > 0) {
            sections[currentIndex - 1].scrollIntoView({
                behavior: 'smooth'
            });
        }
    }
    
    // Get current section in viewport
    function getCurrentSection() {
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY + window.innerHeight / 2;
        
        for (let section of sections) {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                return section;
            }
        }
        
        return sections[0];
    }
    
    // Performance optimizations
    let ticking = false;
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateAnimations);
            ticking = true;
        }
    }
    
    function updateAnimations() {
        // Update scroll-based animations here
        ticking = false;
    }
    
    // Initialize loading screen fade out
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Start welcome section animations after load
        setTimeout(() => {
            const welcomeSection = document.getElementById('welcome');
            if (welcomeSection) {
                welcomeSection.classList.add('section-loaded');
            }
        }, 500);
    });
    
    // Mobile touch gestures
    let touchStartX = 0;
    let touchStartY = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchend', function(e) {
        if (!touchStartX || !touchStartY) return;
        
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        
        const diffX = touchStartX - touchEndX;
        const diffY = touchStartY - touchEndY;
        
        // Vertical swipe detection
        if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > 50) {
            if (diffY > 0) {
                scrollToNextSection();
            } else {
                scrollToPrevSection();
            }
        }
        
        touchStartX = 0;
        touchStartY = 0;
    });
    
    console.log('✨ Enhanced AI Presentation loaded successfully!');
});
document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section.page");
    const container = document.createElement("div");

    // Wrap sections inside container for horizontal layout
    container.classList.add("scroll-container");
    sections.forEach(sec => container.appendChild(sec));
    document.body.appendChild(container);

    // Apply CSS flex layout for horizontal scrolling
    Object.assign(container.style, {
        display: "flex",
        flexDirection: "row",
        transition: "transform 0.8s ease-in-out",
        width: `${sections.length * 100}vw`,
    });

    let currentIndex = 0;
    let isScrolling = false;

    function goToSection(index) {
        if (index < 0 || index >= sections.length) return;
        isScrolling = true;
        currentIndex = index;
        container.style.transform = `translateX(-${index * 100}vw)`;
        setTimeout(() => { isScrolling = false; }, 900);
    }

    // Listen for wheel events
    window.addEventListener("wheel", (e) => {
        if (isScrolling) return;
        if (e.deltaY > 0) {
            goToSection(currentIndex + 1); // scroll down → right
        } else if (e.deltaY < 0) {
            goToSection(currentIndex - 1); // scroll up → left
        }
    });

    // Optional: allow arrow keys navigation
    window.addEventListener("keydown", (e) => {
        if (isScrolling) return;
        if (e.key === "ArrowDown" || e.key === "ArrowRight") goToSection(currentIndex + 1);
        if (e.key === "ArrowUp" || e.key === "ArrowLeft") goToSection(currentIndex - 1);
    });
});
