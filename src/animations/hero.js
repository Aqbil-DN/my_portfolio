/* ══════════════════════════════════════════════════════════════
   HERO — SplitText, parallax, floating elements, doodle reveals
   ══════════════════════════════════════════════════════════════ */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { SplitText } from 'gsap/SplitText';

export function initHero() {
  const hero = document.querySelector('.hero-section');
  if (!hero) return;

  const masterTL = gsap.timeline({ delay: 0.2 });

  // ── Paper background layers float in ──
  masterTL.to('.hero-paper-layer', {
    opacity: 0.6,
    y: 0,
    duration: 1,
    stagger: 0.15,
    ease: 'power3.out',
    onStart: () => {
      gsap.set('.hero-paper-layer', { y: 40 });
    }
  });

  // ── Tag line reveal ──
  masterTL.fromTo('.hero-tag-line line',
    { drawSVG: '0%' },
    { drawSVG: '100%', duration: 0.6, ease: 'power2.inOut' },
    0.3
  );

  const tagSplit = new SplitText('.hero-tag-text', { type: 'chars' });
  masterTL.from(tagSplit.chars, {
    y: 20,
    opacity: 0,
    duration: 0.5,
    stagger: 0.02,
    ease: 'power3.out'
  }, 0.5);

  // ── Giant headline SplitText ──
  const headlineSplits = [];
  document.querySelectorAll('.headline-line').forEach(line => {
    const split = new SplitText(line, { type: 'chars, words' });
    headlineSplits.push(split);
  });

  headlineSplits.forEach((split, i) => {
    masterTL.from(split.chars, {
      y: 80,
      rotateX: -60,
      opacity: 0,
      duration: 0.9,
      stagger: 0.025,
      ease: 'back.out(1.2)'
    }, 0.6 + i * 0.2);
  });

  // ── Subtitle ──
  const subtitleSplit = new SplitText('.hero-subtitle', { type: 'words' });
  masterTL.from(subtitleSplit.words, {
    y: 30,
    opacity: 0,
    duration: 0.6,
    stagger: 0.05,
    ease: 'power3.out'
  }, 1.4);

  const bylineSplit = new SplitText('.hero-byline', { type: 'chars' });
  masterTL.from(bylineSplit.chars, {
    y: 20,
    opacity: 0,
    duration: 0.5,
    stagger: 0.03,
    ease: 'power3.out'
  }, 1.6);

  // ── CTA button ──
  masterTL.from('.hero-cta', {
    y: 30,
    opacity: 0,
    duration: 0.7,
    ease: 'power3.out'
  }, 1.8);

  // ── Floating photos ──
  masterTL.to('.hero-photo', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power3.out',
    onStart: () => {
      gsap.set('.hero-photo', { y: 30 });
    }
  }, 1.0);

  // ── Tape elements ──
  masterTL.from('.tape', {
    scaleX: 0,
    opacity: 0,
    duration: 0.5,
    stagger: 0.1,
    ease: 'power3.out'
  }, 1.2);

  // ── Sticky note ──
  masterTL.to('.sticky-note', {
    opacity: 1,
    y: 0,
    duration: 0.6,
    ease: 'power3.out',
    onStart: () => { gsap.set('.sticky-note', { y: 20 }); }
  }, 1.5);

  // ── Scroll indicator ──
  // It is now static and always visible, so we just let it sit below the button.

  // Scroll indicator bounce
  gsap.to('.scroll-dot', {
    y: 18,
    duration: 1.2,
    repeat: -1,
    yoyo: true,
    ease: 'power2.inOut'
  });

  // ── DrawSVG doodles ──
  gsap.utils.toArray('.hero-doodle path, .hero-doodle circle').forEach((path, i) => {
    gsap.fromTo(path,
      { drawSVG: '0%' },
      {
        drawSVG: '100%',
        duration: 1.5,
        delay: 1.5 + i * 0.2,
        ease: 'power2.inOut'
      }
    );
  });

  // ── Continuous floating animations ──
  gsap.utils.toArray('.hero-photo').forEach((photo, i) => {
    gsap.to(photo, {
      y: '+=15',
      rotation: `+=${i % 2 === 0 ? 2 : -2}`,
      duration: 3 + i * 0.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: i * 0.3
    });
  });

  gsap.to('.sticky-note', {
    y: '+=10',
    rotation: '-=2',
    duration: 4,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });

  // ── Scroll parallax ──
  gsap.utils.toArray('.parallax-element').forEach(el => {
    const depth = parseFloat(el.dataset.depth) || 0.2;
    gsap.to(el, {
      y: () => ScrollTrigger.maxScroll(window) * depth * -0.1,
      ease: 'none',
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5
      }
    });
  });

  // ── Hero content parallax on scroll ──
  gsap.to('.hero-content', {
    y: -80,
    opacity: 0.3,
    scrollTrigger: {
      trigger: hero,
      start: 'top top',
      end: 'bottom top',
      scrub: 1
    }
  });

  // ── Mouse-reactive parallax for doodles ──
  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to('.hero-doodle', {
      x: x * 20,
      y: y * 15,
      duration: 1.2,
      ease: 'power2.out',
      stagger: 0.05
    });

    gsap.to('.hero-photo', {
      x: x * -12,
      y: y * -8,
      duration: 1.5,
      ease: 'power2.out',
      stagger: 0.1
    });
  });

  // ── Scroll indicator is always visible and static now ──
}
