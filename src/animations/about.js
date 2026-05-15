/* ══════════════════════════════════════════════════════════════
   ABOUT — Diary page, DrawSVG, SplitText reveal
   ══════════════════════════════════════════════════════════════ */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { SplitText } from 'gsap/SplitText';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';

export function initAbout() {
  const section = document.querySelector('.about-section');
  if (!section) return;

  // ── Paper entrance ──
  gsap.from('.about-paper', {
    y: 60,
    rotateX: 5,
    opacity: 0,
    duration: 1.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: section,
      start: 'top 70%',
      toggleActions: 'play none none reverse'
    }
  });

  // ── Coffee stain fade in ──
  gsap.to('.about-coffee-stain', {
    opacity: 1,
    scale: 1.1,
    duration: 1.5,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.about-paper',
      start: 'top 60%',
      toggleActions: 'play none none reverse'
    }
  });

  // ── Title SplitText ──
  const titleSplit = new SplitText('.about-header .section-title', { type: 'chars' });
  gsap.from(titleSplit.chars, {
    y: 40,
    opacity: 0,
    rotateX: -45,
    duration: 0.7,
    stagger: 0.03,
    ease: 'back.out(1.5)',
    scrollTrigger: {
      trigger: '.about-header',
      start: 'top 75%',
      toggleActions: 'play none none reverse'
    }
  });

  // ── Underline DrawSVG ──
  gsap.fromTo('.about-underline path',
    { drawSVG: '0%' },
    {
      drawSVG: '100%',
      duration: 1,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: '.about-header',
        start: 'top 70%',
        toggleActions: 'play none none reverse'
      }
    }
  );

  // ── Polaroid entrance ──
  gsap.from('.about-polaroid', {
    x: 80,
    rotation: 15,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.about-polaroid',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    }
  });

  // ── Paragraph line-by-line SplitText reveal ──
  document.querySelectorAll('.about-paragraph').forEach((p, i) => {
    const split = new SplitText(p, { type: 'lines' });
    gsap.fromTo(p, { opacity: 0 }, { opacity: 1, duration: 0.01, scrollTrigger: {
      trigger: p,
      start: 'top 85%',
    }});
    gsap.from(split.lines, {
      y: 30,
      opacity: 0,
      duration: 0.7,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: p,
        start: 'top 82%',
        toggleActions: 'play none none reverse'
      }
    });
  });

  // ── Sticky note entrance ──
  gsap.to('.about-sticky', {
    opacity: 1,
    y: 0,
    rotation: 4,
    duration: 0.8,
    ease: 'back.out(1.5)',
    scrollTrigger: {
      trigger: '.about-sticky',
      start: 'top 90%',
      toggleActions: 'play none none reverse'
    }
  });

  // ── Ink blob MorphSVG animation ──
  gsap.to('.about-ink-blob', {
    opacity: 1,
    duration: 1,
    scrollTrigger: {
      trigger: '.about-ink-blob',
      start: 'top 85%',
      toggleActions: 'play none none reverse'
    }
  });

  // Continuous ink morph
  const inkPath = document.querySelector('.ink-morph-path');
  if (inkPath) {
    const morphShapes = [
      "M100,20 Q150,10 170,50 Q190,90 160,130 Q130,170 90,165 Q50,160 35,120 Q20,80 40,45 Q60,10 100,20 Z",
      "M100,25 Q140,15 165,55 Q185,95 155,135 Q125,175 85,160 Q45,145 30,110 Q15,75 45,40 Q75,5 100,25 Z",
      "M100,15 Q145,20 168,48 Q188,78 175,125 Q162,165 115,172 Q70,178 40,145 Q10,112 25,70 Q40,30 80,18 Z"
    ];

    let morphIndex = 0;
    function morphInk() {
      morphIndex = (morphIndex + 1) % morphShapes.length;
      gsap.to(inkPath, {
        morphSVG: morphShapes[morphIndex],
        duration: 3,
        ease: 'sine.inOut',
        onComplete: morphInk
      });
    }
    morphInk();
  }
}

