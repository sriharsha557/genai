// Enhanced JavaScript for AI Presentation with Horizontal Scroll Animation

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all features
    initHorizontalScroll();
    initNavbarEffects();
    initTypewriterEffects();
    initScrollAnimations();
    initIntersectionObserver();
    initParallaxEffects();
    initDynamicCounters();
    initInteractiveElements();
    
    // Horizontal scroll variables
    let currentSection = 0;
    const totalSections = 10;
    let isScrolling = false;
    const scrollCooldown = 800; // Milliseconds between scroll events
    let touchStartX = 0;
    let touchStartY = 0;
    
    // Section mapping for navigation
    const sectionMap = {
        'welcome': 0,
        'intro': 1,
        'genai-intro': 2,
        'agent': 3,
        'basicagent': 4,
        'responsible-ai': 5,
        'presentation': 6,
        'projects': 7,
        'techstack': 8,
        'thankyou': 9
    };
    
    const sectionNames = Object.keys(sectionMap);
    
    // Initialize horizontal scroll functionality
    function initHorizontalScroll() {
        const container = document.getElementById('horizontal-container');
        
        // Smooth scrolling for navigation links
        const navLinks = document.querySelectorAll('#navbar a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetIndex = sectionMap[targetId];
                
                if (targetIndex !== undefined) {
                    navigateToSection(targetIndex);
                    updateActiveNav(targetId);
                }
            });
        });
        
        // Handle mouse wheel events
        document.addEventListener('wheel', function(e) {
            if (isScrolling) return;
            
            e.preventDefault();
            
            // Determine scroll direction (prioritize horizontal scroll)
            const deltaY = e.deltaY;
            const deltaX = e.deltaX;
            
            // Use horizontal scroll if available, otherwise use vertical
            const scrollDirection = Math.abs(deltaX) > Math.abs(deltaY) ? deltaX : deltaY;
            
            if (scrollDirection > 0) {
                // Scroll right (next section)
                navigateToSection(currentSection + 1);
            } else {
                // Scroll left (previous section)
                navigateToSection(currentSection - 1);
            }
        }, { passive: false });
        
        // Handle keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (isScrolling) return;
            
            switch(e.key) {
                case 'ArrowRight':
                case 'ArrowDown':
                case 'PageDown':
                case ' ': // Spacebar
                    e.preventDefault();
                    navigateToSection(currentSection + 1);
                    break;
                case 'ArrowLeft':
                case 'ArrowUp':
                case 'PageUp':
                    e.preventDefault();
                    navigateToSection(currentSection - 1);
                    break;
                case 'Home':
                    e.preventDefault();
                    navigateToSection(0);
                    break;
                case 'End':
                    e.preventDefault();
                    navigateToSection(totalSections - 1);
                    break;
            }
        });
        
        // Handle touch events for mobile
        document.addEventListener('touchstart', function(e) {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        }, { passive: true });
        
        document.addEventListener('touchend', function(e) {
            if (isScrolling) return;
            
            const touchEndX = e.changedTouches[0].clientX;
            const touchEndY = e.changedTouches[0].clientY;
            
            const diffX = touchStartX - touchEndX;
            const diffY = touchStartY - touchEndY;
            
            // Minimum swipe distance
            const minSwipeDistance = 50;
            
            // Horizontal swipe detection
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > minSwipeDistance) {
                if (diffX > 0) {
                    // Swipe left → next section
                    navigateToSection(currentSection + 1);
                } else {
                    // Swipe right → previous section
                    navigateToSection(currentSection - 1);
                }
            }
            // Vertical swipe detection (fallback)
            else if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > minSwipeDistance) {
                if (diffY > 0) {
                    // Swipe up → next section
                    navigateToSection(currentSection + 1);
                } else {
                    // Swipe down → previous section
                    navigateToSection(currentSection - 1);
                }
            }
            
            touchStartX = 0;
            touchStartY = 0;
        }, { passive: true });
    }
    
    // Navigate to specific section
    function navigateToSection(index) {
        // Boundary checks
        if (index < 0) index = 0;
        if (index >= totalSections) index = totalSections - 1;
        if (index === currentSection) return;
        
        isScrolling = true;
        currentSection = index;
        
        const container = document.getElementById('horizontal-container');
        const translateX = -index * 100; // Each section is 100vw wide
        
        container.style.transform = `translateX(${translateX}vw)`;
        
        // Update navigation
        const sectionId = sectionNames[index];
        updateActiveNav(sectionId);
        
        // Update URL hash without triggering scroll
        history.replaceState(null, null, `#${sectionId}`);
        
        // Trigger section-specific animations
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            setTimeout(() => {
                triggerSectionAnimations(targetSection);
            }, 400);
        }
        
        // Reset scrolling flag
        setTimeout(() => {
            isScrolling = false;
        }, scrollCooldown);
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
        
        // Add scrolled class based on current section
        function updateNavbarStyle() {
            if (currentSection > 0) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
        
        // Update navbar style initially and on section change
        updateNavbarStyle();
        
        // Create observer to update navbar on section change
        const observer = new MutationObserver(updateNavbarStyle);
        observer.observe(document.getElementById('horizontal-container'), {
            attributes: true,
            attributeFilter: ['style']
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
    
    // Scroll-triggered animations (adapted for horizontal scroll)
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.fade-in-text, .concept-card, .project-preview-card');
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px'
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
                if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                    const sectionId = entry.target.id;
                    const newIndex = sectionMap[sectionId];
                    
                    if (newIndex !== undefined && newIndex !== currentSection) {
                        currentSection = newIndex;
                        updateActiveNav(sectionId);
                    }
                }
            });
        }, {
            threshold: [0.5],
            rootMargin: '0px'
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
            case 'genai-intro':
            case 'agent':
            case 'basicagent':
            case 'responsible-ai':
            case 'techstack':
                animateConceptsSection(section);
                break;
            case 'presentation':
                animatePresentationSection(section);
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
        
        // Animate fade-in text elements
        const fadeInElements = section.querySelectorAll('.fade-in-text');
        fadeInElements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('animate-in');
            }, 1000 + (index * 500));
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
        const conceptCards = section.querySelectorAll('.concept-card, .genai-capability-card, .genai-usecase-card, .key-point');
        conceptCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('animate-concept-card');
            }, index * 150);
        });
        
        // Animate leverage items if present
        const leverageItems = section.querySelectorAll('.leverage-item');
        leverageItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('animate-slide-up');
            }, index * 200);
        });
    }
    
    // Presentation section animations
    function animatePresentationSection(section) {
        const presentationWrapper = section.querySelector('.presentation-wrapper');
        if (presentationWrapper) {
            setTimeout(() => {
                presentationWrapper.style.opacity = '0';
                presentationWrapper.style.transform = 'scale(0.9)';
                presentationWrapper.style.transition = 'all 0.6s ease';
                
                setTimeout(() => {
                    presentationWrapper.style.opacity = '1';
                    presentationWrapper.style.transform = 'scale(1)';
                }, 100);
            }, 300);
        }
    }
    
    // Parallax effects for background elements
    function initParallaxEffects() {
        // Light beam parallax effect based on section
        function updateParallaxEffects() {
            const lightBeam1 = document.querySelector('.light-beam');
            const lightBeam2 = document.querySelector('.light-beam-2');
            const floatingElements = document.querySelectorAll('.floating-elements');
            
            if (lightBeam1) {
                const offset1 = currentSection * 10;
                lightBeam1.style.transform = `rotate(${15 + offset1}deg) translateX(${-20 + offset1}px)`;
            }
            
            if (lightBeam2) {
                const offset2 = currentSection * -8;
                lightBeam2.style.transform = `rotate(${-20 + offset2}deg) translateX(${15 + offset2}px)`;
            }
            
            // Floating elements parallax
            floatingElements.forEach((element, index) => {
                const rate = (currentSection * 5) + (index * 2);
                element.style.transform = `translateX(${-rate}px)`;
            });
        }
        
        // Create observer for parallax updates
        const observer = new MutationObserver(updateParallaxEffects);
        observer.observe(document.getElementById('horizontal-container'), {
            attributes: true,
            attributeFilter: ['style']
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
            }, { threshold: 0.5 });
            
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
            link.addEventListener('mouseenter', function(e) {
                this.classList.add('hover-active');
                createRippleEffect(this, e);
            });
            
            link.addEventListener('mouseleave', function() {
                this.classList.remove('hover-active');
            });
            
            link.addEventListener('click', function(e) {
                createRippleEffect(this, e);
            });
        });
        
        // Interactive concept cards
        const conceptCards = document.querySelectorAll('.concept-card, .genai-capability-card, .genai-usecase-card');
        conceptCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-15px) scale(1.03)';
                this.style.transition = 'all 0.3s ease';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
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
        
        // Leverage items interaction
        const leverageItems = document.querySelectorAll('.leverage-item');
        leverageItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateX(20px) translateY(-8px) scale(1.02)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateX(0) translateY(0) scale(1)';
            });
        });
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
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.pointerEvents = 'none';
        ripple.classList.add('ripple');
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.remove();
            }
        }, 600);
    }
    
    // Initialize on hash change
    window.addEventListener('hashchange', function() {
        const hash = location.hash.substring(1);
        const targetIndex = sectionMap[hash];
        if (targetIndex !== undefined) {
            navigateToSection(targetIndex);
        }
    });
    
    // Initialize based on current URL hash
    function initializeFromHash() {
        const hash = location.hash.substring(1);
        if (hash && sectionMap[hash] !== undefined) {
            navigateToSection(sectionMap[hash]);
        } else {
            navigateToSection(0);
        }
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
                triggerSectionAnimations(welcomeSection);
            }
            
            // Initialize from hash after load
            initializeFromHash();
        }, 500);
    });
    
    // Add CSS animation styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .animate-slide-up {
            animation: slideUp 0.8s ease-out forwards;
        }
        
        .animate-highlight {
            transform: translateX(10px);
            color: rgba(102, 126, 234, 0.9);
            transition: all 0.3s ease;
        }
        
        .animate-concept-card {
            animation: cardPop 0.6s ease-out forwards;
        }
        
        .pulse-effect {
            animation: pulseOnce 0.6s ease-out;
        }
        
        .hover-active {
            transform: translateY(-5px) scale(1.05);
        }
        
        @keyframes slideUp {
            from { opacity: 0; transform: translateY(50px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes cardPop {
            0% { opacity: 0; transform: scale(0.8) translateY(20px); }
            100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        
        @keyframes pulseOnce {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
    `;
    document.head.appendChild(style);
    
    // Accessibility: Focus management
    function manageFocus() {
        const currentSectionElement = document.getElementById(sectionNames[currentSection]);
        if (currentSectionElement) {
            const focusableElement = currentSectionElement.querySelector('h1, h2, [tabindex], button, a');
            if (focusableElement) {
                setTimeout(() => {
                    focusableElement.focus();
                }, 500);
            }
        }
    }
    
    // Add focus management to navigation
    const originalNavigateToSection = navigateToSection;
    navigateToSection = function(index) {
        originalNavigateToSection(index);
        manageFocus();
    };
    
    // Debug mode for development
    window.presentationDebug = {
        currentSection: () => currentSection,
        navigateTo: (index) => navigateToSection(index),
        getSectionName: () => sectionNames[currentSection],
        totalSections: totalSections
    };
    
    // Error handling for failed animations
    window.addEventListener('error', function(e) {
        console.warn('Animation error caught:', e.error);
        // Fallback: ensure navigation still works
        isScrolling = false;
    });
    
    // Resize handler for responsive behavior
    window.addEventListener('resize', debounce(function() {
        // Recalculate positions on resize
        const container = document.getElementById('horizontal-container');
        const translateX = -currentSection * 100;
        container.style.transform = `translateX(${translateX}vw)`;
    }, 250));
    
    // Debounce utility function
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Visibility change handler (pause animations when tab is hidden)
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            // Pause animations
            const animatedElements = document.querySelectorAll('.floating-circle, .floating-square, .floating-triangle, .light-beam, .light-beam-2');
            animatedElements.forEach(el => {
                el.style.animationPlayState = 'paused';
            });
        } else {
            // Resume animations
            const animatedElements = document.querySelectorAll('.floating-circle, .floating-square, .floating-triangle, .light-beam, .light-beam-2');
            animatedElements.forEach(el => {
                el.style.animationPlayState = 'running';
            });
        }
    });
    
    // Preload images for smooth transitions
    function preloadImages() {
        const images = [
            'assets/images/picture32.png',
            'assets/images/picture23.png',
            'assets/images/picture2.png',
            'assets/images/DHS.jpg',
            'assets/images/vinod.png',
            'assets/images/harsha.png',
            'assets/images/Ai_agent.gif',
            'assets/images/Basic Agent.gif',
            'assets/images/Picture5.png',
            'assets/images/picture4.png',
            'assets/images/thanku.png'
        ];
        
        images.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }
    
    // Initialize image preloading
    preloadImages();
    
    // Smooth scroll behavior for any remaining vertical elements
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Prevent default scroll behavior on body
    document.body.style.overflow = 'hidden';
    
    // Add loading indicator
    function showLoadingIndicator() {
        const indicator = document.createElement('div');
        indicator.id = 'loading-indicator';
        indicator.innerHTML = `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(102, 126, 234, 0.9);
                color: white;
                padding: 1rem 2rem;
                border-radius: 10px;
                font-family: Inter, sans-serif;
                font-size: 0.9rem;
                z-index: 10000;
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.2);
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            ">
                Loading presentation...
            </div>
        `;
        document.body.appendChild(indicator);
        
        // Remove loading indicator after 2 seconds
        setTimeout(() => {
            if (document.getElementById('loading-indicator')) {
                document.getElementById('loading-indicator').remove();
            }
        }, 2000);
    }
    
    // Show loading indicator initially
    showLoadingIndicator();
    
    // Analytics/tracking helper (optional)
    function trackSectionView(sectionName) {
        // Add your analytics tracking here if needed
        console.log(`Viewed section: ${sectionName}`);
    }
    
    // Update section tracking
    const originalUpdateActiveNav = updateActiveNav;
    updateActiveNav = function(activeId) {
        originalUpdateActiveNav(activeId);
        trackSectionView(activeId);
    };
    
    // Initialize section indicators (optional progress dots)
    function createSectionIndicators() {
        const indicatorContainer = document.createElement('div');
        indicatorContainer.id = 'section-indicators';
        indicatorContainer.style.cssText = `
            position: fixed;
            right: 2rem;
            top: 50%;
            transform: translateY(-50%);
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            z-index: 999;
        `;
        
        for (let i = 0; i < totalSections; i++) {
            const dot = document.createElement('div');
            dot.className = 'section-dot';
            dot.style.cssText = `
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                cursor: pointer;
                transition: all 0.3s ease;
                border: 1px solid rgba(255, 255, 255, 0.1);
            `;
            
            if (i === 0) {
                dot.style.background = 'rgba(102, 126, 234, 0.8)';
                dot.style.transform = 'scale(1.3)';
            }
            
            dot.addEventListener('click', () => navigateToSection(i));
            indicatorContainer.appendChild(dot);
        }
        
        document.body.appendChild(indicatorContainer);
        
        // Update dots on section change
        const originalUpdateActiveNavWithDots = updateActiveNav;
        updateActiveNav = function(activeId) {
            originalUpdateActiveNavWithDots(activeId);
            
            const dots = document.querySelectorAll('.section-dot');
            dots.forEach((dot, index) => {
                if (index === currentSection) {
                    dot.style.background = 'rgba(102, 126, 234, 0.8)';
                    dot.style.transform = 'scale(1.3)';
                    dot.style.boxShadow = '0 0 15px rgba(102, 126, 234, 0.5)';
                } else {
                    dot.style.background = 'rgba(255, 255, 255, 0.3)';
                    dot.style.transform = 'scale(1)';
                    dot.style.boxShadow = 'none';
                }
            });
        };
    }
    
    // Create section indicators
    setTimeout(createSectionIndicators, 1000);
    
    console.log('✨ Enhanced AI Presentation with Horizontal Scroll loaded successfully!');
});
