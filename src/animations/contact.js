/* ══════════════════════════════════════════════════════════════
   CONTACT — Letter unfold, DrawSVG signature, paper particles
   ══════════════════════════════════════════════════════════════ */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { SplitText } from 'gsap/SplitText';

export function initContact() {
  const section = document.querySelector('.contact-section');
  if (!section) return;

  // ── Generate paper particles ──
  const particlesContainer = document.getElementById('paper-particles');
  if (particlesContainer) {
    const colors = ['var(--cream)', 'var(--warm-beige)', 'var(--tape-yellow)', 'var(--dusty-blue)', 'var(--muted-orange)'];
    for (let i = 0; i < 25; i++) {
      const particle = document.createElement('div');
      particle.className = 'paper-particle';
      particle.style.setProperty('--size', `${4 + Math.random() * 10}px`);
      particle.style.setProperty('--color', colors[Math.floor(Math.random() * colors.length)]);
      particle.style.setProperty('--duration', `${6 + Math.random() * 10}s`);
      particle.style.setProperty('--delay', `${Math.random() * 8}s`);
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.transform = `rotate(${Math.random() * 360}deg)`;
      particlesContainer.appendChild(particle);
    }
  }

  // ── Letter entrance timeline ──
  const letterTL = gsap.timeline({
    scrollTrigger: {
      trigger: '.contact-letter',
      start: 'top 75%',
      toggleActions: 'play none none reverse'
    }
  });

  // Flap opens
  letterTL.from('.letter-flap', {
    rotateX: 180,
    transformOrigin: 'bottom center',
    duration: 0.8,
    ease: 'power3.out'
  });

  // Body slides up
  letterTL.from('.letter-body', {
    y: 40,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  }, 0.3);

  // ── Headline SplitText ──
  const headlineSplit = new SplitText('.contact-headline', { type: 'chars, words' });
  letterTL.from(headlineSplit.chars, {
    y: 40,
    opacity: 0,
    rotateX: -60,
    duration: 0.7,
    stagger: 0.02,
    ease: 'back.out(1.5)'
  }, 0.6);

  // ── Subtext ──
  const textSplit = new SplitText('.contact-text', { type: 'words' });
  letterTL.from(textSplit.words, {
    y: 20,
    opacity: 0,
    duration: 0.5,
    stagger: 0.03,
    ease: 'power3.out'
  }, 1.0);

  // ── Signature DrawSVG ──
  letterTL.to('.contact-signature', { opacity: 1, duration: 0.3 }, 1.3);
  letterTL.fromTo('.signature-path',
    { drawSVG: '0%' },
    {
      drawSVG: '100%',
      duration: 1.5,
      ease: 'power2.inOut'
    },
    1.4
  );

  // ── Buttons stagger ──
  letterTL.from('.contact-btn', {
    y: 20,
    opacity: 0,
    duration: 0.5,
    stagger: 0.1,
    ease: 'back.out(1.5)'
  }, 1.8);

  // ── Button hover effects ──
  document.querySelectorAll('.contact-btn').forEach(btn => {
    const span = btn.querySelector('span');
    
    btn.addEventListener('mouseenter', () => {
      gsap.to(btn, {
        scale: 1.05,
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        scale: 1,
        duration: 0.4,
        ease: 'elastic.out(1, 0.5)'
      });
    });
  });

  // ── Footer SplitText ──
  const footerText = document.querySelector('.site-footer p');
  if (footerText) {
    const footerSplit = new SplitText(footerText, { type: 'chars' });
    gsap.from(footerSplit.chars, {
      y: 15,
      opacity: 0,
      duration: 0.4,
      stagger: 0.01,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.site-footer',
        start: 'top 95%',
        toggleActions: 'play none none reverse'
      }
    });
  }
}
