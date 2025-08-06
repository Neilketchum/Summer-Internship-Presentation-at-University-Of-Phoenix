// Enhanced Presentation JavaScript for 16-slide University of Phoenix presentation
class Presentation {
    constructor() {
        this.currentSlide = 1;
        this.totalSlides = 16; // Updated for 16 slides
        this.slides = document.querySelectorAll('.slide');
        this.indicators = document.querySelectorAll('.indicator');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.progressFill = document.querySelector('.progress-fill');
        
        this.init();
    }

    init() {
        // Ensure DOM elements are available
        if (!this.slides.length || !this.indicators.length || !this.prevBtn || !this.nextBtn) {
            console.error('Required DOM elements not found');
            return;
        }
        
        this.bindEvents();
        this.updateProgress();
        this.animateCurrentSlide();
        this.updateNavigationStates();
        
        // Add touch support for mobile
        this.addTouchSupport();
        
        // Set initial step animation delays
        this.setStepAnimationDelays();
        
        console.log('🎉 University of Phoenix presentation initialized with', this.totalSlides, 'slides');
    }

    bindEvents() {
        // Navigation button events - ensure they're properly bound
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Previous button clicked');
                this.prevSlide();
            });
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Next button clicked');
                this.nextSlide();
            });
        }
        
        // Indicator events - Fixed to ensure proper navigation
        this.indicators.forEach((indicator, index) => {
            if (indicator) {
                indicator.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const slideNumber = index + 1;
                    console.log('Indicator clicked for slide', slideNumber);
                    // Force navigation even if it's the current slide for better UX
                    if (slideNumber !== this.currentSlide) {
                        this.goToSlide(slideNumber);
                    }
                });
            }
        });
        
        // Step item click events for slide 5 - now handled by individual onclick attributes
        
        // Keyboard events - Fixed spacebar handling
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
        
        // Prevent default arrow key scrolling but allow spacebar to work
        window.addEventListener('keydown', (e) => {
            if(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
                e.preventDefault();
            }
            // Don't prevent spacebar default here - handle it in handleKeyboard
        });
        
        console.log('Event listeners bound successfully');
    }

    handleKeyboard(e) {
        // Fixed spacebar handling
        switch(e.code) {
            case 'ArrowLeft':
            case 'ArrowUp':
                e.preventDefault();
                this.prevSlide();
                break;
            case 'ArrowRight':
            case 'ArrowDown':
                e.preventDefault();
                this.nextSlide();
                break;
            case 'Space':
                // Fixed: Prevent default and handle spacebar properly
                e.preventDefault();
                console.log('Spacebar pressed - advancing slide');
                this.nextSlide();
                break;
            case 'Home':
                e.preventDefault();
                this.goToSlide(1);
                break;
            case 'End':
                e.preventDefault();
                this.goToSlide(this.totalSlides);
                break;
        }
    }

    addTouchSupport() {
        let startX = 0;
        let startY = 0;
        let endX = 0;
        let endY = 0;
        const minSwipeDistance = 50;

        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }, { passive: true });

        document.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            endY = e.changedTouches[0].clientY;
            
            const deltaX = endX - startX;
            const deltaY = endY - startY;
            
            // Check if horizontal swipe is more significant than vertical
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
                if (deltaX > 0) {
                    this.prevSlide(); // Swipe right
                } else {
                    this.nextSlide(); // Swipe left
                }
            }
        }, { passive: true });
    }

    setStepAnimationDelays() {
        // Set animation delays for step items
        const stepItems = document.querySelectorAll('.step-item');
        stepItems.forEach((item, index) => {
            item.style.setProperty('--step-index', index + 1);
        });

        // Set animation delays for process steps
        const processSteps = document.querySelectorAll('.process-step');
        processSteps.forEach((step, index) => {
            step.style.setProperty('--step-order', index + 1);
        });

        // Set animation delays for achievement cards
        const achievementCards = document.querySelectorAll('.achievement-card');
        achievementCards.forEach((card, index) => {
            card.style.setProperty('--achievement-index', index + 1);
        });

        // Set animation delays for skill categories
        const skillCategories = document.querySelectorAll('.skill-category');
        skillCategories.forEach((category, index) => {
            category.style.setProperty('--skill-index', index + 1);
        });
    }

    bindStepItemEvents() {
        // Add click event listeners to all step items
        const stepItems = document.querySelectorAll('.step-item');
        stepItems.forEach((stepItem) => {
            stepItem.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const stepNumber = stepItem.getAttribute('data-step');
                console.log(`Event listener called for Step no - ${stepNumber}`);
                
                // You can add additional functionality here if needed
                // For example, show step details or highlight the step
            });
        });
        
        console.log(`Bound click events to ${stepItems.length} step items`);
    }

    prevSlide() {
        if (this.currentSlide > 1) {
            console.log('Going to previous slide:', this.currentSlide - 1);
            this.goToSlide(this.currentSlide - 1);
        } else {
            console.log('Already at first slide');
        }
    }

    nextSlide() {
        if (this.currentSlide < this.totalSlides) {
            console.log('Going to next slide:', this.currentSlide + 1);
            this.goToSlide(this.currentSlide + 1);
        } else {
            console.log('Already at last slide');
        }
    }

    goToSlide(slideNumber) {
        // Fixed: Allow navigation even to current slide and improve validation
        if (slideNumber < 1 || slideNumber > this.totalSlides) {
            console.log('Invalid slide number:', slideNumber);
            return;
        }

        if (slideNumber === this.currentSlide) {
            console.log('Already on slide:', slideNumber);
            // Still allow re-animation of current slide
            this.animateCurrentSlide();
            return;
        }

        console.log('Navigating from slide', this.currentSlide, 'to slide', slideNumber);

        // Remove active class from current slide and indicator
        if (this.slides[this.currentSlide - 1]) {
            this.slides[this.currentSlide - 1].classList.remove('active');
        }
        if (this.indicators[this.currentSlide - 1]) {
            this.indicators[this.currentSlide - 1].classList.remove('active');
        }

        // Add prev class for exit animation
        if (slideNumber < this.currentSlide && this.slides[this.currentSlide - 1]) {
            this.slides[this.currentSlide - 1].classList.add('prev');
        }

        // Update current slide
        this.currentSlide = slideNumber;

        // Add active class to new slide and indicator
        if (this.slides[this.currentSlide - 1]) {
            this.slides[this.currentSlide - 1].classList.add('active');
        }
        if (this.indicators[this.currentSlide - 1]) {
            this.indicators[this.currentSlide - 1].classList.add('active');
        }

        // Remove prev class after animation
        setTimeout(() => {
            this.slides.forEach(slide => slide.classList.remove('prev'));
        }, 600);

        // Update progress bar
        this.updateProgress();

        // Animate new slide content
        setTimeout(() => {
            this.animateCurrentSlide();
        }, 300);

        // Update navigation button states
        this.updateNavigationStates();

        // Log slide transition for debugging
        this.logSlideInfo();
    }

    logSlideInfo() {
        const slideNames = [
            'Title Slide',
            'Team Capital Gains Overview',
            'Internship Achievements',
            'Technical Skills Gained',
            'Projects Overview',
            'EKS Migration Benefits',
            'Migration Process',
            'Kafka Implementation Strategy',
            'Technical Architecture',
            'Return to Lender Workflow',
            'Data Flow & Processing',
            'Thank You'
        ];
        
        console.log(`📍 Now viewing: Slide ${this.currentSlide} - ${slideNames[this.currentSlide - 1]}`);
    }

    updateProgress() {
        const progress = (this.currentSlide / this.totalSlides) * 100;
        if (this.progressFill) {
            this.progressFill.style.width = `${progress}%`;
        }
    }

    updateNavigationStates() {
        // Update previous button
        if (this.prevBtn) {
            if (this.currentSlide === 1) {
                this.prevBtn.style.opacity = '0.5';
                this.prevBtn.style.cursor = 'not-allowed';
                this.prevBtn.disabled = true;
            } else {
                this.prevBtn.style.opacity = '1';
                this.prevBtn.style.cursor = 'pointer';
                this.prevBtn.disabled = false;
            }
        }

        // Update next button
        if (this.nextBtn) {
            if (this.currentSlide === this.totalSlides) {
                this.nextBtn.style.opacity = '0.5';
                this.nextBtn.style.cursor = 'not-allowed';
                this.nextBtn.disabled = true;
            } else {
                this.nextBtn.style.opacity = '1';
                this.nextBtn.style.cursor = 'pointer';
                this.nextBtn.disabled = false;
            }
        }
    }

    animateCurrentSlide() {
        const currentSlideElement = this.slides[this.currentSlide - 1];
        if (!currentSlideElement) return;
        
        // Reset animations by removing and re-adding animation classes
        this.resetAnimations(currentSlideElement);
        
        // Trigger specific animations based on slide content
        setTimeout(() => {
            this.triggerSlideAnimations(currentSlideElement);
        }, 100);
    }

    resetAnimations(slideElement) {
        // Remove animation classes to reset
        const animatedElements = slideElement.querySelectorAll('[class*="fade"], [class*="slide"], .step-item, .benefit-item, .project-card, .achievement-card, .skill-category, .strategy-card, .impact-card, .lesson-card, .recommendation-card');
        animatedElements.forEach(element => {
            element.style.animation = 'none';
            element.offsetHeight; // Trigger reflow
            element.style.animation = null;
        });
    }

    triggerSlideAnimations(slideElement) {
        // Animate step items with staggered delays
        const stepItems = slideElement.querySelectorAll('.step-item');
        stepItems.forEach((item, index) => {
            item.style.animationDelay = `${0.05 * (index + 1)}s`;
        });

        // Animate benefit items
        const benefitItems = slideElement.querySelectorAll('.benefit-item');
        benefitItems.forEach((item, index) => {
            item.style.animationDelay = `${0.1 * (index + 1)}s`;
        });

        // Animate project cards
        const projectCards = slideElement.querySelectorAll('.project-card');
        projectCards.forEach((card, index) => {
            card.style.animationDelay = `${0.1 * (index + 1)}s`;
        });

        // Animate achievement cards
        const achievementCards = slideElement.querySelectorAll('.achievement-card');
        achievementCards.forEach((card, index) => {
            card.style.animationDelay = `${0.1 * (index + 1)}s`;
        });

        // Animate skill categories
        const skillCategories = slideElement.querySelectorAll('.skill-category');
        skillCategories.forEach((category, index) => {
            category.style.animationDelay = `${0.1 * (index + 1)}s`;
        });

        // Animate strategy cards
        const strategyCards = slideElement.querySelectorAll('.strategy-card');
        strategyCards.forEach((card, index) => {
            card.style.animationDelay = `${0.1 * (index + 1)}s`;
        });

        // Animate impact cards
        const impactCards = slideElement.querySelectorAll('.impact-card');
        impactCards.forEach((card, index) => {
            card.style.animationDelay = `${0.1 * (index + 1)}s`;
        });

        // Animate lesson cards
        const lessonCards = slideElement.querySelectorAll('.lesson-card');
        lessonCards.forEach((card, index) => {
            card.style.animationDelay = `${0.1 * (index + 1)}s`;
        });

        // Animate recommendation cards
        const recommendationCards = slideElement.querySelectorAll('.recommendation-card');
        recommendationCards.forEach((card, index) => {
            card.style.animationDelay = `${0.1 * (index + 1)}s`;
        });

        // Animate info cards
        const infoCards = slideElement.querySelectorAll('.info-card');
        infoCards.forEach((card, index) => {
            card.style.animationDelay = `${0.2 * (index + 1)}s`;
        });

        // Animate list items
        const listItems = slideElement.querySelectorAll('.approach-list li, .strategy-card li, .lesson-card li, .recommendation-card li');
        listItems.forEach((item, index) => {
            item.style.animationDelay = `${0.05 * (index + 1)}s`;
        });

        // Animate process steps
        const processSteps = slideElement.querySelectorAll('.process-step');
        processSteps.forEach((step, index) => {
            if (index % 2 === 0) { // Only animate actual steps, not arrows
                step.style.animationDelay = `${0.2 * ((index / 2) + 1)}s`;
            }
        });
    }

    // Auto-advance functionality (optional)
    startAutoAdvance(interval = 15000) {
        this.autoAdvanceInterval = setInterval(() => {
            if (this.currentSlide < this.totalSlides) {
                this.nextSlide();
            } else {
                this.goToSlide(1); // Loop back to first slide
            }
        }, interval);
        console.log('🔄 Auto-advance started (15 seconds per slide)');
    }

    stopAutoAdvance() {
        if (this.autoAdvanceInterval) {
            clearInterval(this.autoAdvanceInterval);
            console.log('⏹️ Auto-advance stopped');
        }
    }

    // Fullscreen functionality
    toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.log(`Error attempting to enable fullscreen: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    }

    // Presentation controls
    jumpToAchievements() {
        this.goToSlide(3);
    }

    jumpToSkills() {
        this.goToSlide(4);
    }

    jumpToProjects() {
        this.goToSlide(5);
    }

    jumpToImpact() {
        this.goToSlide(12);
    }

    jumpToLessons() {
        this.goToSlide(13);
    }

    jumpToRecommendations() {
        this.goToSlide(14);
    }

    // Get current slide info
    getCurrentSlideInfo() {
        const slideInfo = {
            current: this.currentSlide,
            total: this.totalSlides,
            progress: Math.round((this.currentSlide / this.totalSlides) * 100),
            title: this.getSlideTitle()
        };
        return slideInfo;
    }

    getSlideTitle() {
        const currentSlideElement = this.slides[this.currentSlide - 1];
        if (currentSlideElement) {
            const titleElement = currentSlideElement.querySelector('.slide-title, .title-main');
            return titleElement ? titleElement.textContent : `Slide ${this.currentSlide}`;
        }
        return `Slide ${this.currentSlide}`;
    }
}

// Enhanced animations and effects
class PresentationEffects {
    constructor(presentation) {
        this.presentation = presentation;
        this.init();
    }

    init() {
        this.addParallaxEffect();
        this.addHoverEffects();
        this.addClickEffects();
        this.addKeyboardShortcuts();
        this.addPhoenixEffects();
    }

    addParallaxEffect() {
        // Subtle parallax effect for background elements
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            const backgrounds = document.querySelectorAll('.slide-content');
            backgrounds.forEach(bg => {
                const translateX = (mouseX - 0.5) * 3; // Reduced intensity for subtlety
                const translateY = (mouseY - 0.5) * 3; // Reduced intensity for subtlety
                bg.style.transform = `translate(${translateX}px, ${translateY}px)`;
            });
        });
    }

    addHoverEffects() {
        // Enhanced hover effects for interactive elements
        const interactiveElements = document.querySelectorAll('.project-card, .benefit-item, .step-item, .info-card, .achievement-card, .skill-category, .strategy-card, .impact-card, .lesson-card, .recommendation-card');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.transform = 'translateY(-5px) scale(1.02)';
                element.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    addClickEffects() {
        // Ripple effect for buttons
        const buttons = document.querySelectorAll('.nav-btn, .indicator');
        
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                const ripple = document.createElement('span');
                const rect = button.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                `;
                
                button.style.position = 'relative';
                button.style.overflow = 'hidden';
                button.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
        
        // Add ripple animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    addKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Additional keyboard shortcuts
            if (e.ctrlKey || e.metaKey) {
                switch(e.code) {
                    case 'KeyF':
                        e.preventDefault();
                        this.presentation.toggleFullscreen();
                        break;
                    case 'KeyR':
                        e.preventDefault();
                        this.presentation.goToSlide(1);
                        break;
                    case 'KeyA':
                        e.preventDefault();
                        this.presentation.jumpToAchievements();
                        break;
                    case 'KeyS':
                        e.preventDefault();
                        this.presentation.jumpToSkills();
                        break;
                    case 'KeyP':
                        e.preventDefault();
                        this.presentation.jumpToProjects();
                        break;
                    case 'KeyI':
                        e.preventDefault();
                        this.presentation.jumpToImpact();
                        break;
                }
            }
            
            // Number keys for direct slide navigation (1-9, then 0 for slide 10)
            if (e.code.startsWith('Digit')) {
                let slideNumber = parseInt(e.code.replace('Digit', ''));
                if (slideNumber === 0) slideNumber = 10; // Handle 0 key for slide 10
                
                if (slideNumber >= 1 && slideNumber <= this.presentation.totalSlides) {
                    e.preventDefault();
                    this.presentation.goToSlide(slideNumber);
                }
            }
            
            // Function keys for quick access to key slides
            switch(e.code) {
                case 'F1':
                    e.preventDefault();
                    this.presentation.jumpToAchievements();
                    break;
                case 'F2':
                    e.preventDefault();
                    this.presentation.jumpToSkills();
                    break;
                case 'F3':
                    e.preventDefault();
                    this.presentation.jumpToProjects();
                    break;
                case 'F4':
                    e.preventDefault();
                    this.presentation.jumpToImpact();
                    break;
            }
        });
    }

    addPhoenixEffects() {
        // Special phoenix-themed effects
        const phoenixLogo = document.querySelector('.phoenix-logo');
        if (phoenixLogo) {
            phoenixLogo.addEventListener('mouseenter', () => {
                phoenixLogo.style.filter = 'drop-shadow(0 0 20px #CC3333) brightness(1.2)';
                phoenixLogo.style.transform = 'scale(1.05)';
            });
            
            phoenixLogo.addEventListener('mouseleave', () => {
                phoenixLogo.style.filter = 'drop-shadow(0 0 10px #CC3333)';
                phoenixLogo.style.transform = 'scale(1)';
            });
        }

        // Add phoenix red glow effect to important elements
        const importantElements = document.querySelectorAll('.slide-title, .achievement-card h3, .impact-metric');
        importantElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.textShadow = '0 0 10px rgba(204, 51, 51, 0.5)';
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.textShadow = 'none';
            });
        });
    }
}

// Presentation state management
class PresentationState {
    constructor() {
        this.state = {
            currentSlide: 1,
            isFullscreen: false,
            isAutoAdvancing: false,
            startTime: Date.now(),
            slideVisitCount: new Array(16).fill(0)
        };
        
        this.loadState();
    }

    saveState() {
        // Save presentation state
        if (window.presentation) {
            this.state.currentSlide = window.presentation.currentSlide;
            this.state.isFullscreen = !!document.fullscreenElement;
            this.state.slideVisitCount[this.state.currentSlide - 1]++;
        }
    }

    loadState() {
        // Load any saved state if needed
        // This is a placeholder for potential future state management
    }

    updateState(updates) {
        this.state = { ...this.state, ...updates };
        this.saveState();
    }

    getStatistics() {
        const now = Date.now();
        const duration = Math.round((now - this.state.startTime) / 1000);
        
        return {
            totalDuration: duration,
            currentSlide: this.state.currentSlide,
            totalSlides: 19,
            slideVisitCounts: this.state.slideVisitCount,
            averageTimePerSlide: Math.round(duration / this.state.slideVisitCount.reduce((a, b) => a + b, 0))
        };
    }
}

// Initialize presentation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎓 University of Phoenix presentation loading...');
    
    // Wait a brief moment to ensure all elements are rendered
    setTimeout(() => {
        try {
            // Create main presentation instance
            window.presentation = new Presentation();
            
            // Create effects handler
            window.presentationEffects = new PresentationEffects(window.presentation);
            
            // Create state manager
            window.presentationState = new PresentationState();
            
            // Add loading animation
            document.body.classList.add('loaded');
            
            console.log('🎉 University of Phoenix presentation initialized successfully!');
            console.log('🔴 Phoenix Red theme applied');
            console.log('💡 Navigation options:');
            console.log('  → Arrow buttons: Click left/right arrows');
            console.log('  → Slide dots: Click any dot to jump to that slide');
            console.log('  → Arrow keys: Use keyboard arrows or spacebar');
            console.log('  → Number keys 1-9, 0: Direct slide navigation');
            console.log('  → Function keys: F1=Achievements, F2=Skills, F3=Projects, F4=Impact');
            console.log('  → Ctrl+A: Jump to Achievements');
            console.log('  → Ctrl+S: Jump to Skills');
            console.log('  → Ctrl+P: Jump to Projects');
            console.log('  → Ctrl+I: Jump to Impact');
            console.log('  → Ctrl+F: Toggle fullscreen');
            console.log('  → Ctrl+R: Return to title slide');
            
        } catch (error) {
            console.error('❌ Error initializing presentation:', error);
        }
    }, 100);
    
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Recalculate animations if needed
            if (window.presentation) {
                window.presentation.animateCurrentSlide();
            }
        }, 250);
    });
    
    // Handle visibility change (pause animations when tab is not visible)
    document.addEventListener('visibilitychange', () => {
        if (document.hidden && window.presentation) {
            window.presentation.stopAutoAdvance();
        }
    });
    
    // Add focus management for accessibility
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });

    // Log presentation info periodically
    setInterval(() => {
        if (window.presentation && window.presentationState) {
            const info = window.presentation.getCurrentSlideInfo();
            const stats = window.presentationState.getStatistics();
            console.log(`📊 Slide ${info.current}/${info.total} (${info.progress}%) | Duration: ${stats.totalDuration}s`);
        }
    }, 30000); // Log every 30 seconds
});

// Add CSS for loading state and accessibility
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
    body:not(.loaded) .slide-content {
        opacity: 0;
        transform: translateY(50px);
    }
    
    body.loaded .slide-content {
        opacity: 1;
        transform: translateY(0);
        transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    }
    
    body.keyboard-navigation *:focus {
        outline: 2px solid #CC3333;
        outline-offset: 2px;
    }
    
    .presentation-container {
        opacity: 0;
        animation: presentationFadeIn 1s ease-out forwards;
    }
    
    @keyframes presentationFadeIn {
        to {
            opacity: 1;
        }
    }
    
    /* Ensure buttons are clickable with proper z-index */
    .nav-btn {
        z-index: 1000;
        position: relative;
    }
    
    .indicator {
        z-index: 1000;
        position: relative;
        cursor: pointer;
    }
    
    /* Fix indicator interaction */
    .slide-indicators {
        pointer-events: all;
    }
    
    .slide-indicators .indicator {
        pointer-events: all;
    }
    
    /* University of Phoenix branding enhancements */
    .slide-content {
        position: relative;
    }
    
    .slide-content::before {
        content: '';
        position: absolute;
        top: -50px;
        right: -50px;
        width: 100px;
        height: 100px;
        background: radial-gradient(circle, rgba(204, 51, 51, 0.1) 0%, transparent 70%);
        pointer-events: none;
    }
    
    /* Phoenix animation for logo */
    @keyframes phoenixPulse {
        0%, 100% {
            filter: drop-shadow(0 0 5px #CC3333);
        }
        50% {
            filter: drop-shadow(0 0 15px #CC3333) brightness(1.1);
        }
    }
    
    .phoenix-logo {
        animation: phoenixPulse 3s ease-in-out infinite;
    }
`;
document.head.appendChild(loadingStyle);

// Expose presentation control functions globally for easy access
window.presentationControls = {
    next: () => window.presentation?.nextSlide(),
    prev: () => window.presentation?.prevSlide(),
    goTo: (slide) => window.presentation?.goToSlide(slide),
    toggleFullscreen: () => window.presentation?.toggleFullscreen(),
    startAuto: () => window.presentation?.startAutoAdvance(),
    stopAuto: () => window.presentation?.stopAutoAdvance(),
    getInfo: () => window.presentation?.getCurrentSlideInfo(),
    getStats: () => window.presentationState?.getStatistics()
};

console.log('🎓 University of Phoenix presentation script loaded successfully!');

// Step toggle function for collapsible steps
function toggleStep(stepElement) {
    // Toggle the expanded class
    stepElement.classList.toggle('expanded');
    
    // Update the toggle button text
    const toggleButton = stepElement.querySelector('.step-toggle');
    if (stepElement.classList.contains('expanded')) {
        toggleButton.textContent = '▲';
    } else {
        toggleButton.textContent = '▼';
    }
}

// Make the function globally available
window.toggleStep = toggleStep;

// Debug function for slide 5
function debugSlide5() {
    console.log('🔧 DEBUG: Slide 5 - Migration Process');
    console.log('📊 Total steps found:', document.querySelectorAll('.step-item').length);
    console.log('📋 Expanded steps:', document.querySelectorAll('.step-item.expanded').length);
    console.log('🎯 Current slide:', document.querySelector('.slide.active')?.getAttribute('data-slide'));
    
    // Log all step titles
    const steps = document.querySelectorAll('.step-item h4');
    steps.forEach((step, index) => {
        console.log(`Step ${index + 1}:`, step.textContent);
    });
    
    // Check scrollbar functionality
    const descriptions = document.querySelectorAll('.step-description');
    descriptions.forEach((desc, index) => {
        const hasScroll = desc.scrollHeight > desc.clientHeight;
        console.log(`Step ${index + 1} description scrollable:`, hasScroll);
    });
}

// Make debug function globally available
window.debugSlide5 = debugSlide5;

// Auto-debug when slide 5 is active
document.addEventListener('DOMContentLoaded', function() {
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const slide5 = document.querySelector('[data-slide="5"]');
                if (slide5 && slide5.classList.contains('active')) {
                    console.log('🎯 Slide 5 is now active - Debug mode enabled');
                    setTimeout(debugSlide5, 1000); // Run debug after slide loads
                }
            }
        });
    });
    
    observer.observe(document.body, {
        attributes: true,
        subtree: true
    });
});

// Step details toggle function
function toggleStepDetails(stepElement) {
    // Toggle the expanded class
    stepElement.classList.toggle('expanded');
    
    // Update the toggle button text
    const toggleButton = stepElement.querySelector('.step-toggle');
    if (stepElement.classList.contains('expanded')) {
        toggleButton.textContent = '−';
    } else {
        toggleButton.textContent = '+';
    }
    
    // Add smooth animation for the details section
    const detailsSection = stepElement.querySelector('.step-details');
    if (stepElement.classList.contains('expanded')) {
        detailsSection.style.maxHeight = detailsSection.scrollHeight + 'px';
    } else {
        detailsSection.style.maxHeight = '0';
    }
}

// Make the function globally available
window.toggleStepDetails = toggleStepDetails;

// Bootstrap-style collapsible functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize collapsible functionality
    initCollapsible();
});

function initCollapsible() {
    // Add click event listeners to all step buttons
    const stepButtons = document.querySelectorAll('.step-btn[data-toggle="collapse"]');
    
    stepButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('data-target');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Toggle the collapse
                const isExpanded = this.getAttribute('aria-expanded') === 'true';
                
                // Update button state
                this.setAttribute('aria-expanded', !isExpanded);
                
                // Toggle the collapse class
                if (isExpanded) {
                    targetElement.classList.remove('show');
                } else {
                    targetElement.classList.add('show');
                }
                
                // Add smooth animation
                if (!isExpanded) {
                    targetElement.style.display = 'block';
                    setTimeout(() => {
                        targetElement.style.maxHeight = targetElement.scrollHeight + 'px';
                    }, 10);
                } else {
                    targetElement.style.maxHeight = '0';
                    setTimeout(() => {
                        targetElement.style.display = 'none';
                    }, 300);
                }
            }
        });
    });
}

// Make collapsible functions globally available
window.initCollapsible = initCollapsible;

// Image Modal Functions
function openImageModal(imageSrc, description) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalDescription = document.getElementById('modalDescription');
    
    if (modal && modalImage && modalDescription) {
        modalImage.src = imageSrc;
        modalDescription.textContent = description;
        modal.style.display = 'block';
        
        // Prevent body scrolling when modal is open
        document.body.style.overflow = 'hidden';
        
        // Add escape key listener
        document.addEventListener('keydown', handleModalEscape);
        
        // Add click outside modal to close
        modal.addEventListener('click', handleModalOutsideClick);
    }
}

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    
    if (modal) {
        modal.style.display = 'none';
        
        // Restore body scrolling
        document.body.style.overflow = 'auto';
        
        // Remove event listeners
        document.removeEventListener('keydown', handleModalEscape);
        modal.removeEventListener('click', handleModalOutsideClick);
    }
}

function handleModalEscape(e) {
    if (e.key === 'Escape') {
        closeImageModal();
    }
}

function handleModalOutsideClick(e) {
    const modal = document.getElementById('imageModal');
    const modalContent = document.querySelector('.modal-content');
    
    if (e.target === modal && !modalContent.contains(e.target)) {
        closeImageModal();
    }
}

// Make modal functions globally available
window.openImageModal = openImageModal;
window.closeImageModal = closeImageModal;
window.openMSKImageModal = openMSKImageModal;
window.closeMSKImageModal = closeMSKImageModal;

// MSK Image Modal Functions
function openMSKImageModal(imageSrc, description) {
    const modal = document.getElementById('mskImageModal');
    const modalImage = document.getElementById('mskModalImage');
    const modalDescription = document.getElementById('mskModalDescription');
    
    if (modal && modalImage && modalDescription) {
        modalImage.src = imageSrc;
        modalDescription.textContent = description;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Add event listeners
        document.addEventListener('keydown', handleMSKModalEscape);
        modal.addEventListener('click', handleMSKModalOutsideClick);
    }
}

function closeMSKImageModal() {
    const modal = document.getElementById('mskImageModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Remove event listeners
        document.removeEventListener('keydown', handleMSKModalEscape);
        modal.removeEventListener('click', handleMSKModalOutsideClick);
    }
}

function handleMSKModalEscape(e) {
    if (e.key === 'Escape') {
        closeMSKImageModal();
    }
}

function handleMSKModalOutsideClick(e) {
    const modal = document.getElementById('mskImageModal');
    if (e.target === modal) {
        closeMSKImageModal();
    }
}