/* ══════════════════════════════════════════════════════════════
   LOADER — Cinematic loading sequence for Paper Universe
   ══════════════════════════════════════════════════════════════ */
import gsap from 'gsap';
import { SKILLS } from './skills.js';

export function initLoader(onComplete) {
  const loader = document.getElementById('loading-screen');
  if (!loader) {
    onComplete();
    return;
  }

  // ─── HELPERS FROM THE USER'S SOURCE ───

  // Custom Text Splitter for centering
  function splitText(selector) {
    const el = document.querySelector(selector);
    if (!el) return [];
    const text = el.innerText.trim();
    el.innerHTML = '';
    el.style.opacity = 1;

    // Use custom CSS classes defined in loading.css
    el.classList.add('flex-parent');

    const words = text.split(/\s+/);
    const charsArray = [];

    words.forEach((word) => {
      const wordSpan = document.createElement('span');
      wordSpan.className = 'word flex-word';

      word.split('').forEach(char => {
        const charSpan = document.createElement('span');
        charSpan.className = 'char split-char';
        charSpan.innerText = char;
        wordSpan.appendChild(charSpan);
        charsArray.push(charSpan);
      });

      el.appendChild(wordSpan);
    });
    return charsArray;
  }

  // Set up initial draw path lengths
  function initDrawPaths() {
    const paths = document.querySelectorAll('.draw-path');
    paths.forEach(path => {
      const length = path.getTotalLength();
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;
    });
  }

  // Create dust particles
  function createDust() {
    const container = document.getElementById('dust-container');
    if (!container) return;
    for (let i = 0; i < 40; i++) {
      const dust = document.createElement('div');
      dust.className = 'dust';
      const size = Math.random() * 4 + 1;
      dust.style.width = size + 'px';
      dust.style.height = size + 'px';
      dust.style.left = Math.random() * 100 + '%';
      dust.style.top = Math.random() * 100 + '%';
      container.appendChild(dust);

      gsap.to(dust, {
        y: `-=${Math.random() * 100 + 50}`,
        x: `+=${Math.random() * 50 - 25}`,
        rotation: Math.random() * 360,
        opacity: Math.random() * 0.5 + 0.1,
        duration: Math.random() * 10 + 10,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }
  }

  // Helper to shuffle array elements safely (Fisher-Yates)
  function shuffleArray(array) {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  // Build collage using dynamic skill logos with maximum diversity distribution
  function buildCollage() {
    const tracks = document.querySelectorAll('.col-track');

    tracks.forEach((track, index) => {
      const dir = parseInt(track.dataset.dir) || 1;
      // Shuffle the array uniquely for EACH vertical track to ensure ZERO duplicates in the same column
      const trackSkills = shuffleArray(SKILLS);

      for (let i = 0; i < 6; i++) {
        // Pull unique index safely; each of the 6 is guaranteed 100% unique in its track
        const skill = trackSkills[i];
        const el = document.createElement('div');
        el.className = 'polaroid parallax-el';
        el.dataset.speed = (Math.random() * 0.05 + 0.02) * dir;

        const rot = Math.random() * 10 - 5;
        el.style.transform = `rotate(${rot}deg)`;

        el.innerHTML = `
            <div class="tape-collage"></div>
            <img src="${skill.icon}" alt="${skill.name}" style="object-fit: contain; height: 140px; width: 100%;">
            <div class="polaroid-caption-new">${skill.name}</div>
        `;

        el.addEventListener('mouseenter', () => {
          gsap.to(el, { scale: 1.05, rotation: 0, duration: 0.4, ease: 'back.out(1.5)', zIndex: 50 });
          const cap = el.querySelector('.polaroid-caption-new');
          if (cap) cap.style.opacity = 1;
          // Add active class to body to trigger ring expand (handled by our existing cursor system ideally, but keeping compatible with local hook)
          document.body.classList.add('hover-active');
        });
        el.addEventListener('mouseleave', () => {
          gsap.to(el, { scale: 1, rotation: rot, duration: 0.4, ease: 'power2.out', zIndex: 1 });
          const cap = el.querySelector('.polaroid-caption-new');
          if (cap) cap.style.opacity = 0;
          document.body.classList.remove('hover-active');
        });

        track.appendChild(el);
      }

      gsap.to(track, {
        y: dir === 1 ? '-50%' : '50%',
        ease: 'none',
        duration: 30 + Math.random() * 10,
        repeat: -1,
        modifiers: {
          y: gsap.utils.unitize(y => parseFloat(y) % 1000)
        }
      });
    });
  }

  // ─── INTIALIZATION ───
  const chars = splitText('#name-reveal');
  initDrawPaths();
  createDust();
  buildCollage();

  // ─── MOUSE PARALLAX BEHAVIOR ───
  const handleMouseMoveParallax = (e) => {
    const normX = (e.clientX / window.innerWidth - 0.5) * 2;
    const normY = (e.clientY / window.innerHeight - 0.5) * 2;

    document.querySelectorAll('.parallax-el').forEach(el => {
      const speed = parseFloat(el.dataset.speed || 0.05);
      gsap.to(el, {
        x: normX * 100 * speed,
        y: normY * 100 * speed,
        duration: 1,
        ease: 'power2.out'
      });
    });

    gsap.to('#text-container', {
      rotationX: -normY * 5,
      rotationY: normX * 5,
      transformPerspective: 1000,
      duration: 1,
      ease: 'power2.out'
    });
  };

  window.addEventListener('mousemove', handleMouseMoveParallax);

  // ─── TIMELINE SEQUENCING ───
  const tl = gsap.timeline({
    onComplete: () => {
      // Clean up the mousemove parallax to improve runtime performance
      window.removeEventListener('mousemove', handleMouseMoveParallax);
      
      // Ensure no interaction interference
      gsap.set(loader, { display: 'none', pointerEvents: 'none' });
      
      // Fire original callback to launch normal site lifecycle
      onComplete();
    }
  });

  // SCENE 0: Darkness to Paper
  tl.to(['#paper-surface', '.paper-texture-layer'], {
    opacity: 1,
    duration: 2.5,
    ease: 'power2.inOut'
  })
  .to('#dust-container', { opacity: 1, duration: 2 }, '-=1');

  // SCENE 1: Ink Drop & Splash
  tl.to('#ink-splat', {
    opacity: 1,
    scale: 1,
    duration: 1.5,
    ease: 'elastic.out(1, 0.5)'
  }, '-=0.5')
  .to('#ink-splat', {
    scale: 25,
    opacity: 0,
    rotation: 90,
    duration: 2.5,
    ease: 'power4.inOut'
  }, '+=0.5');

  // SCENE 2: Doodles Draw In & Collage Fade In
  tl.to('.doodle', {
    strokeDashoffset: 0,
    duration: 2,
    stagger: 0.2,
    ease: 'power2.out'
  }, '-=1.5')
  .to('#collage-container', {
    opacity: 0.3,
    scale: 1,
    duration: 3,
    ease: 'power3.out'
  }, '-=2');

  // SCENE 3: Name Reveal
  tl.to(chars, {
    opacity: 1,
    y: 0,
    rotation: 0,
    duration: 1.2,
    stagger: 0.05,
    ease: 'back.out(1.7)'
  }, '-=1.5')
  .to('#text-bg-stroke', {
    strokeDashoffset: 0,
    duration: 1.5,
    ease: 'power2.inOut'
  }, '-=1');

  // SCENE 6: Handwritten Message
  tl.to('#subtitle-wrapper', { opacity: 1, duration: 0.5 }, '-=0.5')
  .to('#subtitle-path', {
    strokeDashoffset: 0,
    duration: 3,
    ease: 'sine.inOut'
  }, '-=0.5');

  // SCENE 7: Progress Transformation
  const progressState = { val: 0 };
  const linePath = document.getElementById('progress-line');
  if (linePath) {
    const lineLength = linePath.getTotalLength();
    linePath.style.strokeDasharray = lineLength;
    linePath.style.strokeDashoffset = lineLength;

    tl.to('#progress-text', { opacity: 1, duration: 0.5 })
      .to(progressState, {
        val: 100,
        duration: 4,
        ease: 'power1.inOut',
        onUpdate: function () {
          const text = document.getElementById('progress-text');
          if (text) {
            text.innerText = `Loading Universe... ${Math.round(progressState.val)}%`;
          }
          const offset = lineLength - (progressState.val / 100) * lineLength;
          linePath.style.strokeDashoffset = offset;

          const dot = document.getElementById('progress-dot');
          if (dot) {
            const point = linePath.getPointAtLength((progressState.val / 100) * lineLength);
            gsap.set(dot, { x: point.x, y: point.y });
          }
        }
      });
  }

  // SCENE 8: CINEMATIC EXIT SEQUENCE
  tl.add('exit')
    // 1. Fade out and scale down text elements
    .to(['#name-reveal', '#subtitle-wrapper', '#progress-container'], {
      y: -50,
      opacity: 0,
      scale: 0.8,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power2.inOut'
    }, 'exit')
    
    // 2. Shrink and fade out collage images
    .to('.polaroid', {
      scale: 0,
      opacity: 0,
      duration: 0.6,
      stagger: {
        amount: 0.4,
        from: 'random'
      },
      ease: 'back.in(1.4)'
    }, 'exit+=0.2')
    
    // 3. Final slide up of the entire loading screen
    .to(loader, {
      yPercent: -100,
      duration: 1,
      ease: 'power4.inOut'
    }, 'exit+=0.8');
}
