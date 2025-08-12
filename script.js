/* Utilities */
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function onReady(fn){
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
  else fn();
}

/* Typewriter */
function typewriterCycle(element){
  const textsAttr = element.getAttribute('data-texts');
  let texts = [];
  try { texts = JSON.parse(textsAttr); } catch(_) { texts = [element.textContent.trim()]; }
  let index = 0;
  let charIndex = 0;
  let deleting = false;
  const typingSpeed = 38;
  const pauseBetween = 1300;

  function tick(){
    const current = texts[index % texts.length];
    if(!deleting){
      charIndex++;
      element.textContent = current.slice(0, charIndex);
      if(charIndex === current.length){
        deleting = true;
        setTimeout(tick, pauseBetween);
        return;
      }
    } else {
      charIndex--;
      element.textContent = current.slice(0, Math.max(0,charIndex));
      if(charIndex === 0){
        deleting = false;
        index++;
      }
    }
    setTimeout(tick, deleting ? typingSpeed * 0.6 : typingSpeed);
  }

  tick();
}

/* Scroll-triggered reveals */
function setupScrollReveals(){
  if(prefersReduced) return;
  gsap.registerPlugin(ScrollTrigger);
  const elements = gsap.utils.toArray('.reveal');
  elements.forEach((el)=>{
    const mode = el.getAttribute('data-anim') || 'fade-up';
    const base = {opacity:0, ease:'expo.out', duration:1};
    let from = {};
    if(mode === 'fade-up'){ from = {y: 40}; }
    else if(mode === 'slide-in'){ from = {x: 40}; }
    else if(mode === 'zoom-in'){ from = {scale: 0.94}; }

    gsap.from(el, { ...base, ...from, scrollTrigger: { trigger: el, start: 'top 88%', toggleActions:'play none none reverse' }});
  });
}

/* Micro-interactions for hover */
function setupMicroInteractions(){
  const microElements = document.querySelectorAll('.micro');
  microElements.forEach((el)=>{
    el.addEventListener('mousemove', (e)=>{
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left; const y = e.clientY - rect.top;
      el.style.setProperty('--x', x + 'px');
      el.style.setProperty('--y', y + 'px');
    });
    if(prefersReduced) return;
    el.addEventListener('mouseenter', ()=> gsap.to(el, { y: -2, scale: 1.015, duration: .25, ease: 'expo.out' }));
    el.addEventListener('mouseleave', ()=> gsap.to(el, { y: 0, scale: 1, duration: .35, ease: 'expo.out' }));
  });
}

/* Animated background orbs */
function animateOrbs(){
  if(prefersReduced) return;
  gsap.to('.orb-1', { y: 60, x: 20, duration: 10, yoyo:true, repeat:-1, ease:'sine.inOut' });
  gsap.to('.orb-2', { y: -50, x: -30, duration: 12, yoyo:true, repeat:-1, ease:'sine.inOut' });
  gsap.to('.orb-3', { y: 40, x: 10, duration: 14, yoyo:true, repeat:-1, ease:'sine.inOut' });
}

/* Testimonial slider */
function setupSlider(){
  const slider = document.querySelector('.slider');
  if(!slider) return;
  const track = slider.querySelector('.slides');
  const slides = Array.from(track.querySelectorAll('.slide'));
  const prev = slider.querySelector('.prev');
  const next = slider.querySelector('.next');
  const dotsHost = slider.querySelector('.dots');

  let index = 0;
  let autoTimer = null;

  function go(i){
    index = (i + slides.length) % slides.length;
    const offset = -index * slider.clientWidth;
    gsap.to(track, { x: offset, duration: .8, ease: 'expo.out' });
    updateDots();
    resetAuto();
  }

  function createDots(){
    slides.forEach((_, i)=>{
      const b = document.createElement('button');
      b.type = 'button'; b.setAttribute('role','tab'); b.setAttribute('aria-selected', i===0 ? 'true':'false');
      b.addEventListener('click', ()=> go(i));
      dotsHost.appendChild(b);
    });
  }

  function updateDots(){
    dotsHost.querySelectorAll('button').forEach((b, i)=> b.setAttribute('aria-selected', i===index ? 'true':'false'));
  }

  function resetAuto(){
    if(autoTimer) clearInterval(autoTimer);
    autoTimer = setInterval(()=> go(index+1), 5000);
  }

  function onResize(){
    // snap to current index width on resize
    gsap.set(track, { x: -index * slider.clientWidth });
  }

  createDots();
  prev.addEventListener('click', ()=> go(index-1));
  next.addEventListener('click', ()=> go(index+1));
  window.addEventListener('resize', onResize);
  onResize();
  resetAuto();
}

/* Set year */
function setYear(){
  const y = document.getElementById('year');
  if(y) y.textContent = new Date().getFullYear();
}

onReady(()=>{
  const tw = document.getElementById('typewriter');
  if(tw && !prefersReduced){ typewriterCycle(tw); }
  setupScrollReveals();
  setupMicroInteractions();
  animateOrbs();
  setupSlider();
  setYear();
});