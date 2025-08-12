// Year in footer
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// GSAP Entrance Animations
window.addEventListener('load', () => {
  const headlineText = document.querySelector('.headline-text');
  if (headlineText) {
    // Split text into letters for animation
    const chars = headlineText.textContent.split('');
    headlineText.innerHTML = chars
      .map((c) => `<span class="char">${c}</span>`) // Wrap each char
      .join('');

    gsap.fromTo(
      '.char',
      { opacity: 0, y: '100%' },
      {
        y: '0%',
        opacity: 1,
        ease: 'power3.out',
        stagger: 0.05,
        duration: 1.2,
      }
    );
  }

  // Scroll-triggered animations for sections
  gsap.utils.toArray('.section').forEach((section) => {
    const children = section.querySelectorAll('.section-title, .feature-card, .testimonial-slide');
    gsap.from(children, {
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
      },
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: 'power3.out',
    });
  });

  // Feature icons subtle animation
  gsap.to('.icon-wrapper i', {
    y: -6,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    duration: 1.5,
    stagger: 0.2,
  });

  // Testimonial slider logic
  const slides = document.querySelectorAll('.testimonial-slide');
  if (slides.length > 1) {
    let current = 0;

    const switchSlide = () => {
      const prev = slides[current];
      prev.classList.remove('active');
      current = (current + 1) % slides.length;
      const next = slides[current];
      next.classList.add('active');
    };

    setInterval(switchSlide, 5000); // 5 seconds per slide
  }

  // Social icons hover animation (micro-interaction)
  const socialLinks = document.querySelectorAll('.social-link');
  socialLinks.forEach((link) => {
    const icon = link.querySelector('i');
    link.addEventListener('mouseenter', () => {
      gsap.to(icon, { rotation: 20, duration: 0.3, ease: 'power2.out' });
    });
    link.addEventListener('mouseleave', () => {
      gsap.to(icon, { rotation: 0, duration: 0.4, ease: 'power2.out' });
    });
  });
});