// Initialize GSAP and ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Global variables
let testimonialIndex = 0;
const totalTestimonials = 3;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    setupEventListeners();
    setupScrollTriggers();
    initTypewriter();
    initTestimonialSlider();
    initCounters();
    setupMobileMenu();
    setupParallax();
});

// Initialize all animations
function initializeAnimations() {
    // Set initial states for animations
    gsap.set('.title-line', { opacity: 0, y: 50 });
    gsap.set('.hero-subtitle', { opacity: 0, y: 30 });
    gsap.set('.cta-primary', { opacity: 0, y: 30 });
    gsap.set('.cta-secondary', { opacity: 0, y: 30 });
    gsap.set('.stat-item', { opacity: 0, y: 30 });
    gsap.set('.section-title', { opacity: 0, y: 30 });
    gsap.set('.section-subtitle', { opacity: 0, y: 20 });
    gsap.set('.feature-card', { opacity: 0, y: 50 });
    
    // Hero entrance animation
    const heroTL = gsap.timeline({ delay: 0.5 });
    
    heroTL.to('.title-line', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
    })
    .to('.hero-subtitle', {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
    }, "-=0.3")
    .to('.cta-primary', {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "back.out(1.7)"
    }, "-=0.2")
    .to('.cta-secondary', {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "back.out(1.7)"
    }, "-=0.3")
    .to('.stat-item', {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out"
    }, "-=0.2");
}

// Typewriter Effect
function initTypewriter() {
    const typewriterElement = document.getElementById('typewriter');
    const text = 'Technology';
    let index = 0;
    
    // Clear initial text
    typewriterElement.textContent = '';
    
    function typeChar() {
        if (index < text.length) {
            typewriterElement.textContent += text.charAt(index);
            index++;
            setTimeout(typeChar, 150);
        } else {
            // Add blinking cursor effect
            setTimeout(() => {
                typewriterElement.classList.add('cursor-blink');
            }, 500);
        }
    }
    
    // Start typewriter after hero animations
    setTimeout(typeChar, 1800);
}

// Setup Event Listeners
function setupEventListeners() {
    // Navbar scroll effect
    window.addEventListener('scroll', handleNavbarScroll);
    
    // CTA button interactions
    setupCTAInteractions();
    
    // Feature card interactions
    setupFeatureCardInteractions();
    
    // Social link interactions
    setupSocialInteractions();
    
    // Smooth scrolling for navigation links
    setupSmoothScrolling();
}

// Navbar scroll effect
function handleNavbarScroll() {
    const navbar = document.getElementById('navbar');
    const scrolled = window.scrollY > 50;
    
    navbar.classList.toggle('scrolled', scrolled);
}

// CTA Button Interactions
function setupCTAInteractions() {
    const primaryCTA = document.getElementById('primaryCta');
    const secondaryCTA = document.getElementById('secondaryCta');
    
    // Primary CTA hover effect
    primaryCTA.addEventListener('mouseenter', function() {
        gsap.to(this, {
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out"
        });
        
        // Icon animation
        gsap.to(this.querySelector('i'), {
            x: 5,
            duration: 0.3,
            ease: "power2.out"
        });
    });
    
    primaryCTA.addEventListener('mouseleave', function() {
        gsap.to(this, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
        });
        
        gsap.to(this.querySelector('i'), {
            x: 0,
            duration: 0.3,
            ease: "power2.out"
        });
    });
    
    // Secondary CTA hover effect
    secondaryCTA.addEventListener('mouseenter', function() {
        gsap.to(this, {
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out"
        });
        
        // Icon pulse animation
        gsap.to(this.querySelector('i'), {
            scale: 1.2,
            duration: 0.3,
            ease: "power2.out"
        });
    });
    
    secondaryCTA.addEventListener('mouseleave', function() {
        gsap.to(this, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
        });
        
        gsap.to(this.querySelector('i'), {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
        });
    });
    
    // Click ripple effect
    [primaryCTA, secondaryCTA].forEach(button => {
        button.addEventListener('click', function(e) {
            createRippleEffect(e, this);
        });
    });
}

// Feature Card Interactions
function setupFeatureCardInteractions() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            gsap.to(this.querySelector('.feature-icon'), {
                rotation: 360,
                scale: 1.1,
                duration: 0.6,
                ease: "power2.out"
            });
            
            gsap.to(this.querySelector('.feature-overlay'), {
                opacity: 0.05,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        card.addEventListener('mouseleave', function() {
            gsap.to(this.querySelector('.feature-icon'), {
                rotation: 0,
                scale: 1,
                duration: 0.6,
                ease: "power2.out"
            });
            
            gsap.to(this.querySelector('.feature-overlay'), {
                opacity: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
}

// Social Media Interactions
function setupSocialInteractions() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            
            gsap.to(this, {
                rotation: 360,
                duration: 0.6,
                ease: "power2.out"
            });
            
            gsap.to(icon, {
                scale: 1.2,
                duration: 0.3,
                ease: "back.out(1.7)"
            });
        });
        
        link.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            
            gsap.to(this, {
                rotation: 0,
                duration: 0.6,
                ease: "power2.out"
            });
            
            gsap.to(icon, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
}

// Smooth Scrolling
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: {
                        y: targetSection,
                        offsetY: 80
                    },
                    ease: "power2.inOut"
                });
            }
        });
    });
}

// Setup ScrollTrigger Animations
function setupScrollTriggers() {
    // Section titles and subtitles
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.fromTo(title, 
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: title,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });
    
    gsap.utils.toArray('.section-subtitle').forEach(subtitle => {
        gsap.fromTo(subtitle,
            { opacity: 0, y: 20 },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: subtitle,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });
    
    // Feature cards staggered animation
    gsap.fromTo('.feature-card',
        { opacity: 0, y: 50 },
        {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: '.features-grid',
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        }
    );
    
    // Testimonials section
    gsap.fromTo('.testimonials-slider',
        { opacity: 0, scale: 0.9 },
        {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
                trigger: '.testimonials',
                start: "top 70%",
                end: "bottom 30%",
                toggleActions: "play none none reverse"
            }
        }
    );
    
    // Footer content
    gsap.fromTo('.footer-content',
        { opacity: 0, y: 30 },
        {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '.footer',
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        }
    );
    
    // Parallax effect for floating shapes
    gsap.utils.toArray('.shape').forEach(shape => {
        gsap.to(shape, {
            y: -100,
            ease: "none",
            scrollTrigger: {
                trigger: '.hero',
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    });
}

// Testimonial Slider
function initTestimonialSlider() {
    const track = document.getElementById('testimonialTrack');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    function updateSlider() {
        const translateX = -testimonialIndex * (100 / totalTestimonials);
        
        gsap.to(track, {
            x: `${translateX}%`,
            duration: 0.6,
            ease: "power2.inOut"
        });
        
        // Update active states
        document.querySelectorAll('.testimonial-card').forEach((card, index) => {
            card.classList.toggle('active', index === testimonialIndex);
        });
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === testimonialIndex);
        });
        
        // Add micro-interaction to active testimonial
        const activeCard = document.querySelectorAll('.testimonial-card')[testimonialIndex];
        if (activeCard) {
            gsap.fromTo(activeCard,
                { scale: 0.95 },
                { scale: 1, duration: 0.4, ease: "back.out(1.7)" }
            );
        }
    }
    
    // Next button
    nextBtn.addEventListener('click', function() {
        testimonialIndex = (testimonialIndex + 1) % totalTestimonials;
        updateSlider();
        addButtonInteraction(this);
    });
    
    // Previous button
    prevBtn.addEventListener('click', function() {
        testimonialIndex = (testimonialIndex - 1 + totalTestimonials) % totalTestimonials;
        updateSlider();
        addButtonInteraction(this);
    });
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            testimonialIndex = index;
            updateSlider();
            addDotInteraction(this);
        });
    });
    
    // Auto-play testimonials
    setInterval(() => {
        testimonialIndex = (testimonialIndex + 1) % totalTestimonials;
        updateSlider();
    }, 5000);
}

// Counter Animation
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        
        gsap.fromTo(counter, 
            { textContent: 0 },
            {
                textContent: target,
                duration: 2,
                ease: "power2.out",
                snap: { textContent: 1 },
                scrollTrigger: {
                    trigger: counter,
                    start: "top 80%",
                    toggleActions: "play none none restart"
                },
                onUpdate: function() {
                    counter.textContent = Math.ceil(counter.textContent);
                }
            }
        );
    });
}

// Mobile Menu
function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Animate hamburger bars
        if (this.classList.contains('active')) {
            gsap.to(this.querySelectorAll('.bar'), {
                duration: 0.3,
                stagger: 0.1,
                ease: "power2.out"
            });
        }
    });
    
    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Parallax Effects
function setupParallax() {
    // Hero background parallax
    gsap.to('.hero-bg', {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
            trigger: '.hero',
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });
    
    // Footer shapes parallax
    gsap.utils.toArray('.footer-shape').forEach(shape => {
        gsap.to(shape, {
            y: -50,
            rotation: 180,
            ease: "none",
            scrollTrigger: {
                trigger: '.footer',
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    });
}

// Utility Functions
function createRippleEffect(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        pointer-events: none;
        transform: scale(0);
    `;
    
    element.appendChild(ripple);
    
    gsap.to(ripple, {
        scale: 2,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        onComplete: () => ripple.remove()
    });
}

function addButtonInteraction(button) {
    gsap.to(button, {
        scale: 0.9,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
    });
}

function addDotInteraction(dot) {
    gsap.to(dot, {
        scale: 1.5,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: "back.out(1.7)"
    });
}

// Intersection Observer for performance optimization
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe all animatable elements
document.addEventListener('DOMContentLoaded', () => {
    const animatableElements = document.querySelectorAll('.feature-card, .testimonial-card, .footer-section');
    animatableElements.forEach(el => observer.observe(el));
});

// Page visibility API for performance
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when page is not visible
        gsap.globalTimeline.pause();
    } else {
        // Resume animations when page becomes visible
        gsap.globalTimeline.resume();
    }
});

// Resize handler for responsive animations
window.addEventListener('resize', debounce(() => {
    ScrollTrigger.refresh();
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

// Custom cursor effect (optional enhancement)
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: var(--primary-gradient);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        transition: transform 0.1s ease;
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1,
            ease: "power2.out"
        });
    });
    
    // Hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('button, a, .feature-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            gsap.to(cursor, { scale: 1.5, duration: 0.2 });
        });
        el.addEventListener('mouseleave', () => {
            gsap.to(cursor, { scale: 1, duration: 0.2 });
        });
    });
}

// Initialize custom cursor on desktop only
if (window.innerWidth > 768) {
    initCustomCursor();
}

// Preloader animation (optional)
function initPreloader() {
    const preloader = document.createElement('div');
    preloader.innerHTML = `
        <div class="preloader-content">
            <div class="loader"></div>
            <p>Loading...</p>
        </div>
    `;
    preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--dark-gradient);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;
    
    document.body.appendChild(preloader);
    
    // Remove preloader after page load
    window.addEventListener('load', () => {
        gsap.to(preloader, {
            opacity: 0,
            duration: 0.5,
            ease: "power2.out",
            onComplete: () => preloader.remove()
        });
    });
}

// Performance monitoring
function measurePerformance() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page Load Time:', perfData.loadEventEnd - perfData.loadEventStart);
        });
    }
}

// Initialize performance monitoring in development
if (window.location.hostname === 'localhost') {
    measurePerformance();
}

// Add CSS for typewriter cursor
const style = document.createElement('style');
style.textContent = `
    .cursor-blink::after {
        content: '|';
        animation: blink 1s infinite;
        color: var(--text-primary);
    }
    
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
`;
document.head.appendChild(style);