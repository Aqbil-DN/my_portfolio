/* ══════════════════════════════════════════════════════════════
   PAPER UNIVERSE — Main Entry Point
   ══════════════════════════════════════════════════════════════ */

import './styles/index.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable';
import { Flip } from 'gsap/Flip';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { SplitText } from 'gsap/SplitText';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
import Lenis from 'lenis';

// Register all GSAP plugins
gsap.registerPlugin(
  ScrollTrigger,
  Draggable,
  Flip,
  DrawSVGPlugin,
  SplitText,
  InertiaPlugin,
  MorphSVGPlugin
);

// Import animation modules
import { initLoader } from './animations/loader.js';
import { initHero } from './animations/hero.js';
import { initPhotoStream } from './animations/photostream.js';
import { initAbout } from './animations/about.js';
import { initSkills } from './animations/skills.js';
import { initProjects } from './animations/projects.js';
import { initPlayground } from './animations/playground.js';
import { initContact } from './animations/contact.js';
import { initCursor } from './animations/cursor.js';
import { initTransitions } from './animations/transitions.js';
import { initFloatingBackground } from './animations/floatingBackground.js';

// ─── LENIS SMOOTH SCROLL ───────────────────────────────
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  gestureOrientation: 'vertical',
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 2,
});

// Connect Lenis to GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// ─── INITIALIZE ────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  // Stop scroll during loading
  lenis.stop();

  // Init cursor and build floating backgrounds immediately behind loader
  initCursor();
  initFloatingBackground();

  // Start the loading sequence, then init everything else
  initLoader(() => {
    // Reveal main content (was hidden via CSS to prevent flash)
    document.body.classList.add('content-ready');

    // Resume scrolling
    lenis.start();

    // Show nav
    document.querySelector('.main-nav').classList.add('visible');

    // Init all sections
    initHero();
    initPhotoStream();
    initAbout();
    initSkills();
    initProjects();
    initPlayground();
    initContact();
    initTransitions();


    // Refresh ScrollTrigger after everything is set up
    ScrollTrigger.refresh();
  });
});


// Updated at 2026-05-15 21:00:07 - Commit #1

// Updated at 2026-05-15 21:02:08 - Commit #2

// Updated at 2026-05-15 21:04:08 - Commit #3

// Updated at 2026-05-15 21:06:08 - Commit #4

// Updated at 2026-05-15 21:08:08 - Commit #5

// Updated at 2026-05-15 21:10:09 - Commit #6

// Updated at 2026-05-15 21:42:29 - Commit #7

// Updated at 2026-05-15 21:44:29 - Commit #8

// Updated at 2026-05-15 21:46:29 - Commit #9

// Updated at 2026-05-15 21:56:29 - Commit #10

// Updated at 2026-05-15 21:58:43 - Commit #11

// Updated at 2026-05-15 22:00:43 - Commit #12

// Updated at 2026-05-15 22:02:43 - Commit #13
