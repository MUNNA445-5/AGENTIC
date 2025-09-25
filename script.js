// Initialize GSAP and ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeTestimonialSlider();
    initializeMobileMenu();
    initializeFormHandling();
    initializeScrollEffects();
});

// Initialize all animations
function initializeAnimations() {
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
            duration: 0.8,
            y: 30,
            opacity: 0,
            ease: 'power3.out'
        }, '-=0.4')
        .from('.hero-buttons', {
            duration: 0.8,
            y: 30,
            opacity: 0,
            ease: 'power3.out'
        }, '-=0.4')
        .from('.floating-card', {
            duration: 1,
            scale: 0,
            rotation: 180,
            opacity: 0,
            stagger: 0.2,
            ease: 'back.out(1.7)'
        }, '-=0.6');

    // Floating cards continuous animation
    gsap.to('.floating-card', {
        y: -20,
        rotation: 5,
        duration: 2,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.5
    });

    // Gradient orbs animation
    gsap.to('.gradient-orb', {
        rotation: 360,
        duration: 20,
        ease: 'none',
        repeat: -1,
        stagger: 5
    });

    // Tech sphere rings animation
    gsap.to('.sphere-ring', {
        rotation: 360,
        duration: 20,
        ease: 'none',
        repeat: -1,
        stagger: 5
    });

    // Button hover effects
    initializeButtonEffects();
}

// Initialize scroll-triggered animations
function initializeScrollEffects() {
    // Features section animations
    gsap.utils.toArray('.feature-card').forEach((card, index) => {
        gsap.fromTo(card, {
            y: 100,
            opacity: 0,
            rotation: 5
        }, {
            y: 0,
            opacity: 1,
            rotation: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            delay: index * 0.1
        });
    });

    // About section animations
    gsap.fromTo('.about-text', {
        x: -100,
        opacity: 0
    }, {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.about',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        }
    });

    gsap.fromTo('.tech-sphere', {
        scale: 0,
        rotation: 180
    }, {
        scale: 1,
        rotation: 0,
        duration: 1.2,
        ease: 'back.out(1.7)',
        scrollTrigger: {
            trigger: '.about',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        }
    });

    // Stats counter animation
    const statsSection = document.querySelector('.stats-grid');
    if (statsSection) {
        ScrollTrigger.create({
            trigger: statsSection,
            start: 'top 80%',
            onEnter: () => animateCounters()
        });
    }

    // Contact form animations
    gsap.fromTo('.contact-form', {
        x: -100,
        opacity: 0
    }, {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.contact',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        }
    });

    gsap.fromTo('.contact-info', {
        x: 100,
        opacity: 0
    }, {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.contact',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        }
    });

    // Footer animations
    gsap.fromTo('.footer-content', {
        y: 50,
        opacity: 0
    }, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.footer',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });
}

// Initialize button effects
function initializeButtonEffects() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        // Magnetic effect
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(button, {
                duration: 0.3,
                x: x * 0.1,
                y: y * 0.1,
                ease: 'power2.out'
            });
        });

        // Reset position
        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                duration: 0.3,
                x: 0,
                y: 0,
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

// Initialize testimonial slider
function initializeTestimonialSlider() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        // Hide all slides
        testimonialCards.forEach(card => {
            card.classList.remove('active');
            gsap.to(card, {
                opacity: 0,
                x: 100,
                duration: 0.5,
                ease: 'power2.inOut'
            });
        });

        // Remove active class from all dots
        dots.forEach(dot => dot.classList.remove('active'));

        // Show current slide
        testimonialCards[index].classList.add('active');
        gsap.to(testimonialCards[index], {
            opacity: 1,
            x: 0,
            duration: 0.5,
            ease: 'power2.out'
        });

        // Activate current dot
        dots[index].classList.add('active');
        currentSlide = index;
    }

    function nextSlide() {
        const nextIndex = (currentSlide + 1) % testimonialCards.length;
        showSlide(nextIndex);
    }

    // Auto-advance slides
    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoSlide() {
        clearInterval(slideInterval);
    }

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            stopAutoSlide();
            startAutoSlide();
        });
    });

    // Pause auto-advance on hover
    const slider = document.querySelector('.testimonials-slider');
    if (slider) {
        slider.addEventListener('mouseenter', stopAutoSlide);
        slider.addEventListener('mouseleave', startAutoSlide);
    }

    // Start auto-advance
    startAutoSlide();
}

// Initialize mobile menu
function initializeMobileMenu() {
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

// Initialize form handling
function initializeFormHandling() {
    const form = document.querySelector('.form');
    const inputs = document.querySelectorAll('.form-input');

    // Input focus effects
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            gsap.to(input, {
                duration: 0.3,
                scale: 1.02,
                ease: 'power2.out'
            });
        });

        input.addEventListener('blur', () => {
            gsap.to(input, {
                duration: 0.3,
                scale: 1,
                ease: 'power2.out'
            });
        });
    });

    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const name = formData.get('name') || 'User';
        
        // Success animation
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        gsap.to(submitBtn, {
            duration: 0.3,
            scale: 0.95,
            ease: 'power2.out',
            yoyo: true,
            repeat: 1,
            onComplete: () => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                submitBtn.style.background = 'var(--accent-color)';
                
                // Reset form
                setTimeout(() => {
                    form.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                }, 3000);
            }
        });
    });
}

// Animate counters
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/\D/g, ''));
        const suffix = counter.textContent.replace(/\d/g, '');
        
        gsap.to(counter, {
            duration: 2,
            textContent: 0,
            ease: 'power2.out',
            snap: { textContent: 1 },
            onUpdate: function() {
                counter.textContent = Math.ceil(counter.textContent) + suffix;
            },
            onComplete: function() {
                counter.textContent = target + suffix;
            }
        });
    });
}

// Parallax effect for hero background
function initializeParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.gradient-orb');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            gsap.set(element, { y: yPos });
        });
    });
}

// Smooth scroll for navigation links
function initializeSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                gsap.to(window, {
                    duration: 1,
                    scrollTo: { y: offsetTop, autoKill: false },
                    ease: 'power3.inOut'
                });
            }
        });
    });
}

// Initialize additional effects
document.addEventListener('DOMContentLoaded', function() {
    initializeParallax();
    initializeSmoothScroll();
    
    // Add intersection observer for AOS-like effects
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);

    // Observe all elements with data-aos attribute
    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });
});

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
    };
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Scroll-based animations can go here
}, 16)); // 60fps

// Add loading animation
window.addEventListener('load', () => {
    gsap.to('body', {
        duration: 0.5,
        opacity: 1,
        ease: 'power2.out'
    });
});

// Initialize everything when page is fully loaded
window.addEventListener('load', function() {
    // Additional initialization if needed
    console.log('TechVision Pro - Landing page loaded successfully!');
});