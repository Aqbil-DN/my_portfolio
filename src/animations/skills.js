/* ══════════════════════════════════════════════════════════════
   SKILLS — Immersive Chalkboard with Physical Clip-Path Erasing
   ══════════════════════════════════════════════════════════════ */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { Draggable } from 'gsap/Draggable';

// ─── IMPORT LOCAL ASSETS SO VITE BUNDLES THEM FOR PRODUCTION ───
import gsapLogo from '../assets/logo/gsap.png';
import framerLogo from '../assets/logo/framer_motion.png';
import viteLogo from '../assets/logo/vite.png';

// Complete Skills definition with high-quality Devicon CDN icons
export const SKILLS = [
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg', rotate: 0 },
  { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg', rotate: 0 },
  { name: 'GSAP', icon: gsapLogo, rotate: 0 },
  { name: 'Three.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/threejs/threejs-original.svg', rotate: 0 },
  { name: 'Framer Motion', icon: framerLogo, rotate: 0 },
  { name: 'TailwindCSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg', rotate: 0 },
  { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg', rotate: 0 },
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg', rotate: 0 },
  { name: 'HTML', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg', rotate: 0 },
  { name: 'CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg', rotate: 0 },
  { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg', rotate: 0 },
  { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg', rotate: 0 },
  { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg', rotate: 0 },
  { name: 'PHP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg', rotate: 0 },
  { name: 'Laravel', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg', rotate: 0 },
  { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg', rotate: 0 },
  { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg', rotate: 0 },
  { name: 'Supabase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg', rotate: 0 },
  { name: 'Vercel', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg', rotate: 0 },
  { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg', rotate: 0 },
  { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg', rotate: 0 },
  { name: 'GitLab', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/gitlab/gitlab-original.svg', rotate: 0 },
  { name: 'Vite', icon: viteLogo, rotate: 0 },
  { name: 'GoLang', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg', rotate: 0 },
];

// Vibrant Sticky Note Pastel Colors
const PAPER_COLORS = [
  '#FFF9C4', // Soft Yellow
  '#FCE4EC', // Pale Pink
  '#E3F2FD', // Ice Blue
  '#E8F5E9', // Mint Green
  '#FFFFFF', // Plain White Scrap
  '#FFF3E0'  // Warm Orange
];

export function initSkills() {
  const grid = document.getElementById('skills-grid');
  const board = document.querySelector('.chalkboard');
  if (!grid || !board) return;

  // ── Pagination State ──
  let currentPage = 0;
  const itemsPerPage = 8;
  const totalPages = Math.ceil(SKILLS.length / itemsPerPage);
  let isAnimating = false;

  // ── Render Function ──
  function renderPage(pageIndex, animateIn = false) {
    grid.innerHTML = ''; // Clear old badges

    const startIdx = pageIndex * itemsPerPage;
    const endIdx = Math.min(startIdx + itemsPerPage, SKILLS.length);
    const pageSkills = SKILLS.slice(startIdx, endIdx);

    pageSkills.forEach((skill, i) => {
      // Outer wrapper used to handle standard visual flows & physically clip the badge
      const wrapper = document.createElement('div');
      wrapper.className = 'skill-badge-wrapper';

      // Badge proper
      const badge = document.createElement('div');
      badge.className = 'skill-badge';

      // Assign a distinct paper note background color
      const paperBg = PAPER_COLORS[i % PAPER_COLORS.length];
      badge.style.setProperty('--paper-note-bg', paperBg);

      // Assign a unique slight tilt to the paper note
      const tilt = (Math.random() * 10 - 5).toFixed(1);
      badge.style.setProperty('--badge-tilt', `${tilt}deg`);

      // Masking Tape Detail
      const tape = document.createElement('div');
      tape.className = 'skill-tape';
      const tapeRotate = (Math.random() * 8 - 4).toFixed(1);
      tape.style.setProperty('--tape-rotate', `${tapeRotate}deg`);
      badge.appendChild(tape);

      // Icon
      const iconDiv = document.createElement('div');
      iconDiv.className = 'skill-icon';
      iconDiv.innerHTML = `<img src="${skill.icon}" alt="${skill.name} logo" onerror="this.style.display='none'; this.parentNode.innerText='💻'">`;
      badge.appendChild(iconDiv);

      // Name
      const nameSpan = document.createElement('span');
      nameSpan.className = 'skill-name';
      nameSpan.textContent = skill.name;
      badge.appendChild(nameSpan);

      // Construct structure
      badge.appendChild(nameSpan);
      wrapper.appendChild(badge);
      grid.appendChild(wrapper);

      // --- HOVER BOUNCE EFFECT ---
      badge.addEventListener('mouseenter', () => {
        gsap.to(iconDiv, {
          scale: 1.25,
          rotation: 12,
          duration: 0.4,
          ease: 'back.out(2)'
        });
      });
      badge.addEventListener('mouseleave', () => {
        gsap.to(iconDiv, {
          scale: 1,
          rotation: 0,
          duration: 0.4,
          ease: 'power2.out'
        });
      });

      // --- DRAGGABLE BINDING (Target child to preserve wrapper flow) ---
      Draggable.create(badge, {
        type: 'x,y',
        inertia: true,
        bounds: board,
        edgeResistance: 0.8,
        onPress: function () {
          gsap.to(this.target, {
            scale: 1.15,
            zIndex: 100,
            boxShadow: '5px 10px 25px rgba(0, 0, 0, 0.55)',
            duration: 0.25,
            ease: 'power2.out'
          });
        },
        onRelease: function () {
          gsap.to(this.target, {
            scale: 1,
            zIndex: 5,
            boxShadow: '2px 4px 10px rgba(0, 0, 0, 0.35)',
            duration: 0.5,
            ease: 'elastic.out(1, 0.5)'
          });
        }
      });
    });

    // Manage pagination controls UI
    updatePaginationUI();

    // Trigger entry animation for subsequent page turns
    if (animateIn) {
      const wrappers = grid.querySelectorAll('.skill-badge-wrapper');

      // Explicitly setup active clipPath for transition
      gsap.set(wrappers, { clipPath: 'inset(0% 0% 0% 0%)' });

      gsap.fromTo(wrappers,
        { opacity: 0, y: -60, scale: 0.4, rotation: 'random(-10, 10)' },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotation: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'back.out(1.5)',
          onComplete: () => {
            // Release clipPath constraints after load to avoid layout clippings during dynamic dragging
            gsap.set(wrappers, { clipPath: 'none' });
          }
        }
      );
    }
  }

  // ── Pagination Controls Injector ──
  let controlsContainer = document.querySelector('.chalk-pagination');
  if (!controlsContainer && totalPages > 1) {
    controlsContainer = document.createElement('div');
    controlsContainer.className = 'chalk-pagination';

    controlsContainer.innerHTML = `
      <button class="chalk-btn chalk-prev" aria-label="Previous Skills">
        <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
          <path d="M15 19l-7-7 7-7"/>
        </svg>
      </button>
      <div class="chalk-indicator">1 / ${totalPages}</div>
      <button class="chalk-btn chalk-next" aria-label="Next Skills">
        <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 5l7 7-7 7"/>
        </svg>
      </button>
    `;
    board.appendChild(controlsContainer);

    // Event listeners
    controlsContainer.querySelector('.chalk-prev').addEventListener('click', () => {
      if (currentPage > 0) switchPage(currentPage - 1);
    });
    controlsContainer.querySelector('.chalk-next').addEventListener('click', () => {
      if (currentPage < totalPages - 1) switchPage(currentPage + 1);
    });
  }

  function updatePaginationUI() {
    const container = document.querySelector('.chalk-pagination');
    if (!container) return;

    const prevBtn = container.querySelector('.chalk-prev');
    const nextBtn = container.querySelector('.chalk-next');
    const indicator = container.querySelector('.chalk-indicator');

    prevBtn.disabled = currentPage === 0;
    nextBtn.disabled = currentPage === totalPages - 1;
    indicator.textContent = `${currentPage + 1} / ${totalPages}`;
  }

  // ── Eraser Wipe Transitions ──
  function spawnDust(eraser) {
    const eraserRect = eraser.getBoundingClientRect();
    const boardRect = board.getBoundingClientRect();

    const x = eraserRect.left - boardRect.left + eraserRect.width / 2;
    const y = eraserRect.top - boardRect.top + eraserRect.height / 2;

    for (let i = 0; i < 4; i++) {
      const dust = document.createElement('div');
      dust.className = 'chalk-dust';
      dust.style.left = `${x + (Math.random() * 40 - 20)}px`;
      dust.style.top = `${y + (Math.random() * 20 - 10)}px`;
      board.appendChild(dust);

      gsap.to(dust, {
        x: '+=random(-40, 40)',
        y: '+=random(15, 40)',
        scale: 'random(0.5, 2)',
        opacity: 0,
        duration: 'random(0.4, 0.8)',
        ease: 'power1.out',
        onComplete: () => dust.remove()
      });
    }
  }

  function switchPage(nextIdx) {
    if (isAnimating) return;
    isAnimating = true;

    const eraser = document.querySelector('.chalkboard-eraser');
    const oldWrappers = Array.from(grid.querySelectorAll('.skill-badge-wrapper'));

    if (!eraser || oldWrappers.length === 0) {
      currentPage = nextIdx;
      renderPage(currentPage, true);
      isAnimating = false;
      return;
    }

    // Prepare the wrappers for transition
    gsap.set(oldWrappers, { clipPath: 'inset(0% 0% 0% 0%)' });

    const gridRect = grid.getBoundingClientRect();
    const eraserRect = eraser.getBoundingClientRect();

    const startX = gridRect.left - eraserRect.left;
    const endX = gridRect.right - eraserRect.left;
    const topY = gridRect.top - eraserRect.top - 20;
    const bottomY = gridRect.bottom - eraserRect.top + 20;

    const eraseTL = gsap.timeline({
      onComplete: () => {
        isAnimating = false;
      }
    });

    // 1. Position eraser at TOP-LEFT
    eraseTL.to(eraser, {
      x: startX - 40,
      y: topY,
      scale: 1.4,
      rotation: -10,
      duration: 0.5,
      ease: 'power2.out'
    });

    // 2. Dense Zigzag Sweeping Path (Diagonal Atas-Bawah)
    const zigzagSteps = 14; // More steps = more "friction"
    for (let i = 0; i <= zigzagSteps; i++) {
      const progress = i / zigzagSteps;
      const x = startX + (endX - startX) * progress;
      const y = (i % 2 === 0) ? topY : bottomY;

      eraseTL.to(eraser, {
        x: x,
        y: y,
        rotation: (i % 2 === 0) ? 15 : -15,
        duration: 0.12, // Fast, aggressive rubbing
        ease: 'sine.inOut',
        onUpdate: () => {
          if (Math.random() > 0.3) spawnDust(eraser);
        }
      });
    }

    // 3. Sync badge disappearance (Synchronized with zigzag path: Top-Bottom, Left-Right)
    const zigzagSequence = [];
    const numCols = 4;
    for (let col = 0; col < numCols; col++) {
      if (oldWrappers[col]) zigzagSequence.push(oldWrappers[col]); // Top row
      if (oldWrappers[col + numCols]) zigzagSequence.push(oldWrappers[col + numCols]); // Bottom row
    }

    eraseTL.to(zigzagSequence, {
      opacity: 0,
      scale: 0.5,
      y: 40,
      filter: 'blur(12px)',
      rotation: 'random(-25, 25)',
      duration: 0.4,
      stagger: {
        amount: 1.5, // Sync with zigzag total time
        from: 'start'
      },
      ease: 'power1.in'
    }, '-=1.65'); // Start shortly after eraser starts its first move

    // 4. Halfway point: Swap the data and prepare for new page
    eraseTL.add(() => {
      currentPage = nextIdx;
      renderPage(currentPage, true);
    }, '-=0.2');

    // 5. Neatly put eraser back on shelf
    eraseTL.to(eraser, {
      x: 0,
      y: 0,
      scale: 1,
      rotation: -2,
      duration: 0.7,
      ease: 'back.inOut(1.2)'
    });
  }

  // ── Initialize First View ──
  renderPage(0, false);

  // ── ScrollTrigger Entrance Animation (Preserved & Adaptive for wrappers) ──
  const initialWrappers = grid.querySelectorAll('.skill-badge-wrapper');
  gsap.to(initialWrappers, {
    opacity: 1,
    y: 0,
    duration: 0.7,
    stagger: {
      each: 0.08,
      from: 'random'
    },
    ease: 'back.out(1.5)',
    scrollTrigger: {
      trigger: '.chalkboard-container',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    onStart: () => {
      gsap.set(initialWrappers, { y: 40, opacity: 0, clipPath: 'inset(0% 0% 0% 0%)' });
    },
    onComplete: () => {
      // Release clip paths
      gsap.set(initialWrappers, { clipPath: 'none' });
    }
  });

  // ── Header Animation (Preserved) ──
  const titleSplit = new SplitText('.skills-header .section-title', { type: 'chars' });
  gsap.from(titleSplit.chars, {
    y: 50,
    opacity: 0,
    rotateX: -45,
    duration: 0.8,
    stagger: 0.03,
    ease: 'back.out(1.5)',
    scrollTrigger: {
      trigger: '.skills-header',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    }
  });

  // Squiggle Animation (Preserved)
  gsap.fromTo('.skills-header .section-squiggle path',
    { drawSVG: '0%' },
    {
      drawSVG: '100%',
      duration: 1.2,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: '.skills-header',
        start: 'top 75%',
        toggleActions: 'play none none reverse'
      }
    }
  );
}
