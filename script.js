// Initialize GSAP and ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all animations and functionality
    initAnimations();
    initTestimonialSlider();
    initMobileMenu();
    initScrollAnimations();
    initCounterAnimation();
    initParallaxEffects();
    initButtonInteractions();
});

// Initialize GSAP Animations
function initAnimations() {
    // Hero section animations
    const heroTimeline = gsap.timeline();
    
    heroTimeline
        .from('.hero-title .title-line', {
            duration: 1,
            y: 50,
            opacity: 0,
            stagger: 0.2,
            ease: 'power3.out'
        })
        .from('.hero-subtitle', {
            duration: 1,
            y: 30,
            opacity: 0,
            ease: 'power3.out'
        }, '-=0.5')
        .from('.hero-buttons', {
            duration: 1,
            y: 30,
            opacity: 0,
            ease: 'power3.out'
        }, '-=0.5')
        .from('.floating-card', {
            duration: 1.5,
            scale: 0,
            rotation: 180,
            opacity: 0,
            stagger: 0.3,
            ease: 'back.out(1.7)'
        }, '-=0.5');

    // Gradient orbs animation
    gsap.to('.gradient-orb', {
        y: -20,
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: 'none',
        stagger: {
            each: 2,
            from: 'random'
        }
    });

    // Floating cards continuous animation
    gsap.to('.floating-card', {
        y: -20,
        rotation: 5,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut',
        stagger: {
            each: 1,
            from: 'random'
        }
    });
}

// Initialize Scroll Animations
function initScrollAnimations() {
    // Features section animations
    gsap.utils.toArray('.feature-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            duration: 1,
            y: 100,
            opacity: 0,
            rotation: 5,
            scale: 0.8,
            ease: 'power3.out',
            delay: index * 0.1
        });
    });

    // Section headers animation
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header, {
            scrollTrigger: {
                trigger: header,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power3.out'
        });
    });

    // About section animations
    gsap.from('.about-text', {
        scrollTrigger: {
            trigger: '.about-text',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        duration: 1.5,
        x: -100,
        opacity: 0,
        ease: 'power3.out'
    });

    gsap.from('.tech-sphere', {
        scrollTrigger: {
            trigger: '.tech-sphere',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        duration: 2,
        scale: 0,
        rotation: 720,
        opacity: 0,
        ease: 'back.out(1.7)'
    });

    // Stats animation
    gsap.from('.stat-item', {
        scrollTrigger: {
            trigger: '.stats-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        duration: 1,
        y: 50,
        opacity: 0,
        stagger: 0.2,
        ease: 'power3.out'
    });

    // CTA section animation
    gsap.from('.cta-content', {
        scrollTrigger: {
            trigger: '.cta',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        duration: 1.5,
        y: 100,
        opacity: 0,
        scale: 0.8,
        ease: 'power3.out'
    });

    // Footer animations
    gsap.from('.footer-section', {
        scrollTrigger: {
            trigger: '.footer',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        duration: 1,
        y: 50,
        opacity: 0,
        stagger: 0.2,
        ease: 'power3.out'
    });
}

// Initialize Testimonial Slider
function initTestimonialSlider() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Add active class to current slide and dot
        slides[index].classList.add('active');
        dots[index].classList.add('active');

        // GSAP animation for slide transition
        gsap.fromTo(slides[index], 
            {
                opacity: 0,
                scale: 0.8,
                rotationY: 15
            },
            {
                opacity: 1,
                scale: 1,
                rotationY: 0,
                duration: 0.8,
                ease: 'power3.out'
            }
        );
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    // Dot click events
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
            resetInterval();
        });
    });

    // Auto-advance slides
    function startInterval() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function resetInterval() {
        clearInterval(slideInterval);
        startInterval();
    }

    // Start auto-advance
    startInterval();

    // Pause on hover
    const slider = document.querySelector('.testimonials-slider');
    slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
    slider.addEventListener('mouseleave', startInterval);
}

// Initialize Mobile Menu
function initMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animate hamburger menu
        const bars = navToggle.querySelectorAll('.bar');
        if (navMenu.classList.contains('active')) {
            gsap.to(bars[0], { rotation: 45, y: 6, duration: 0.3 });
            gsap.to(bars[1], { opacity: 0, duration: 0.3 });
            gsap.to(bars[2], { rotation: -45, y: -6, duration: 0.3 });
        } else {
            gsap.to(bars[0], { rotation: 0, y: 0, duration: 0.3 });
            gsap.to(bars[1], { opacity: 1, duration: 0.3 });
            gsap.to(bars[2], { rotation: 0, y: 0, duration: 0.3 });
        }
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const bars = navToggle.querySelectorAll('.bar');
            gsap.to(bars[0], { rotation: 0, y: 0, duration: 0.3 });
            gsap.to(bars[1], { opacity: 1, duration: 0.3 });
            gsap.to(bars[2], { rotation: 0, y: 0, duration: 0.3 });
        });
    });
}

// Initialize Counter Animation
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-count'));
        const increment = target / 100;
        let current = 0;

        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = current.toFixed(1);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        // Trigger counter animation when stats come into view
        ScrollTrigger.create({
            trigger: counter,
            start: 'top 80%',
            onEnter: () => updateCounter()
        });
    });
}

// Initialize Parallax Effects
function initParallaxEffects() {
    // Parallax effect for gradient orbs
    gsap.to('.gradient-orb', {
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        },
        y: (i, target) => -ScrollTrigger.maxScroll(window) * target.dataset.speed,
        ease: 'none'
    });

    // Parallax effect for floating cards
    gsap.to('.floating-card', {
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        },
        y: (i, target) => -ScrollTrigger.maxScroll(window) * 0.1,
        ease: 'none'
    });
}

// Initialize Button Interactions
function initButtonInteractions() {
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        // Hover effect with GSAP
        button.addEventListener('mouseenter', () => {
            gsap.to(button, {
                duration: 0.3,
                scale: 1.05,
                ease: 'power2.out'
            });
        });

        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                duration: 0.3,
                scale: 1,
                ease: 'power2.out'
            });
        });

        // Click effect
        button.addEventListener('click', () => {
            gsap.to(button, {
                duration: 0.1,
                scale: 0.95,
                ease: 'power2.out',
                yoyo: true,
                repeat: 1
            });
        });
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            gsap.to(window, {
                duration: 1.5,
                scrollTo: { y: target, offsetY: 80 },
                ease: 'power3.inOut'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for additional scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-card, .about-text, .tech-sphere, .cta-content').forEach(el => {
    observer.observe(el);
});

// Add some interactive cursor effects
document.addEventListener('mousemove', (e) => {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-trail';
    cursor.style.left = e.pageX + 'px';
    cursor.style.top = e.pageY + 'px';
    document.body.appendChild(cursor);

    // Remove cursor trail after animation
    setTimeout(() => {
        cursor.remove();
    }, 1000);
});

// Add cursor trail styles dynamically
const style = document.createElement('style');
style.textContent = `
    .cursor-trail {
        position: fixed;
        width: 4px;
        height: 4px;
        background: linear-gradient(45deg, #6366f1, #8b5cf6);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        animation: cursorTrail 1s ease-out forwards;
    }
    
    @keyframes cursorTrail {
        0% {
            transform: scale(1);
            opacity: 1;
        }
        100% {
            transform: scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Scroll-based animations and effects
}, 16)); // 60fps

// Add loading animation
window.addEventListener('load', () => {
    gsap.to('.hero-background', {
        duration: 2,
        opacity: 1,
        ease: 'power3.out'
    });
});

// Initialize everything when page is fully loaded
window.addEventListener('load', () => {
    // Final initialization
    gsap.set('.hero-background', { opacity: 0 });
    
    // Trigger initial animations
    gsap.to('.hero-background', {
        duration: 2,
        opacity: 1,
        ease: 'power3.out'
    });
});