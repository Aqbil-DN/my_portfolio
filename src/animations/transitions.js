/* ══════════════════════════════════════════════════════════════
   TRANSITIONS — Section transition animations
   ══════════════════════════════════════════════════════════════ */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';

export function initTransitions() {
  // ── Animate torn paper SVG paths on scroll ──
  gsap.utils.toArray('.section-transition').forEach(transition => {
    const svg = transition.querySelector('svg');
    const paths = transition.querySelectorAll('path');

    gsap.from(paths, {
      scaleY: 0,
      transformOrigin: 'top center',
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: transition,
        start: 'top 90%',
        toggleActions: 'play none none reverse'
      }
    });
  });

  // ── Section-level scroll animations ──
  // Each section fades in slightly as it enters
  gsap.utils.toArray('.section').forEach(section => {
    gsap.from(section, {
      opacity: 0.7,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    });
  });

  // ── Parallax on transition SVGs ──
  gsap.utils.toArray('.section-transition svg').forEach(svg => {
    gsap.to(svg, {
      y: -15,
      ease: 'none',
      scrollTrigger: {
        trigger: svg,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 2
      }
    });
  });

  // ── Parallax on new torn paper dividers ──
  gsap.utils.toArray('.torn-edge-bottom').forEach(divider => {
    gsap.to(divider, {
      y: -30, // Dramatically shifts the divider upwards for rich 3D depth
      ease: 'none',
      scrollTrigger: {
        trigger: divider,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5
      }
    });
  });

  // ── All section squiggles DrawSVG ──
  gsap.utils.toArray('.section-squiggle path').forEach(path => {
    gsap.fromTo(path,
      { drawSVG: '0%' },
      {
        drawSVG: '100%',
        duration: 1.2,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: path.closest('.section-squiggle'),
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });

  // ── Nav scroll behavior ──
  let lastScroll = 0;
  const nav = document.querySelector('.main-nav');

  ScrollTrigger.create({
    start: 'top -100',
    end: 'max',
    onUpdate: (self) => {
      const currentScroll = self.scroll();
      if (currentScroll > 300) {
        if (currentScroll < lastScroll) {
          nav.classList.add('visible');
        } else {
          nav.classList.remove('visible');
        }
      }
      lastScroll = currentScroll;
    }
  });

  // ── Nav link smooth scroll ──
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        gsap.to(window, {
          scrollTo: { y: target, offsetY: 80 },
          duration: 1.2,
          ease: 'power3.inOut'
        });
      }
    });
  });
}
