/* ══════════════════════════════════════════════════════════════
   PROJECTS — Cinematic scrapbook case studies
   ══════════════════════════════════════════════════════════════ */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';

// ─── IMPORT LOCAL PROJECT IMAGES FOR VITE COMPATIBILITY ───
import pixelTodolistImg from '../assets/project/pixel_todolist.png';
import myUniverseImg from '../assets/project/my_universe.png';

const PROJECTS = [
  {
    num: '01',
    category: 'To Do List ',
    title: 'S.BRAIN - The Gamified <br/> Digital Second Brain',
    description: 'A pixel-art style mobile application that turns daily tasks into a nostalgic, game-like experience. Users can collect coins, unlock achievements, and visualize their productivity in a retro 8-bit world. Built with React Native and Framer Motion for smooth, tactile animations.',
    tags: ['Next.js', 'GSAP', 'TypeScript', 'UI/UX'],
    image: pixelTodolistImg,
    link: 'https://todolistpixel.vercel.app/',
    sticker: true,
    hoverDoodle: '*Fun Productivity'
  },
  {
    num: '02',
    category: 'Web Immersive 3D Design',
    title: 'Awen Universe',
    description: 'Web for my love named Awen. Awen Universe is a fully interactive, immersive 3D web experience designed as a digital tribute. It transforms a simple photo gallery into a breathtaking cosmic journey. Users can explore a dynamically generated galaxy where every "star" is a cherished memory (photo) orbiting around a glowing, beating galactic core.',
    tags: ['Three.js', 'ReactJS', 'Tailwind CSS', 'GSAP', 'Vite'],
    image: myUniverseImg,
    link: 'https://my-universe-six.vercel.app/',
    sticker: false,
    hoverDoodle: '*Cinematic'
  },
  {
    num: '03',
    category: 'Personal Branding',
    title: 'Lumina Studio',
    description: 'A premium creative agency website with cinematic scroll animations, dynamic typography, and immersive visual storytelling.',
    tags: ['React', 'GSAP', 'Three.js', 'WebGL'],
    image: '/images/project_1.png', // Retain locally optimized asset
    link: '#',
    sticker: true,
    hoverDoodle: '*Handcrafted'
  }
];

export function initProjects() {
  const container = document.getElementById('projects-container');
  if (!container) return;

  // ── Generate project cards ──
  PROJECTS.forEach((project, i) => {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.innerHTML = `
      <!-- Scrapbook Image Container -->
      <div class="project-image-container">
        <!-- Decorative back paper -->
        <div class="project-back-paper"></div>
        
        <div class="project-image-wrapper">
          <div class="project-aspect-wrapper">
            <a href="${project.link}" ${project.link.startsWith('http') ? 'target="_blank" rel="noopener noreferrer"' : ''} class="project-image-anchor" style="display: block; width: 100%; height: 100%;">
              <img src="${project.image}" alt="${project.title}" loading="lazy" />
            </a>
          </div>
          <div class="project-tape"></div>
          
          ${project.sticker ? `
          <!-- Wow Sticker -->
          <svg class="project-sticker" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="#FFD700" />
              <text x="50" y="55" font-family="Caveat, cursive" font-size="28" font-weight="bold" fill="#1A1A1A" text-anchor="middle">Wow!</text>
              <path d="M 10 50 L 0 50 M 90 50 L 100 50 M 50 10 L 50 0 M 50 90 L 50 100 M 20 20 L 10 10 M 80 80 L 90 90 M 80 20 L 90 10 M 20 80 L 10 90" stroke="#FFD700" stroke-width="4"/>
          </svg>
          ` : ''}
        </div>
      </div>
      
      <!-- Details -->
      <div class="project-info">
        <div class="project-category handwritten">${project.num} / ${project.category}</div>
        <h3 class="project-title" data-split>${project.title}</h3>
        <p class="project-description">${project.description}</p>
        
        <!-- Language / Framework Tags -->
        <div class="project-tags">
          ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
        </div>
        
        <a href="${project.link}" class="project-link-premium">
          <span>View Case Study</span>
          <svg class="link-arrow" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
          </svg>
        </a>
        
        <!-- Hover Doodle -->
        <div class="project-hover-doodle handwritten">${project.hoverDoodle}</div>
      </div>
    `;

    container.appendChild(card);
  });

  // ── Header SplitText ──
  const titleSplit = new SplitText('.projects-header .section-title', { type: 'chars' });
  gsap.from(titleSplit.chars, {
    y: 50,
    opacity: 0,
    rotateX: -45,
    duration: 0.8,
    stagger: 0.03,
    ease: 'back.out(1.5)',
    scrollTrigger: {
      trigger: '.projects-header',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    }
  });

  gsap.fromTo('.projects-header .section-squiggle path',
    { drawSVG: '0%' },
    {
      drawSVG: '100%',
      duration: 1.2,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: '.projects-header',
        start: 'top 75%',
        toggleActions: 'play none none reverse'
      }
    }
  );

  // ── Card entrance animations ──
  const cards = container.querySelectorAll('.project-card');
  cards.forEach((card, i) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: card,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });

    // Card fades in from side
    tl.fromTo(card,
      { opacity: 0, x: i % 2 === 0 ? -60 : 60, y: 30 },
      { opacity: 1, x: 0, y: 0, duration: 1, ease: 'power3.out' }
    );

    // Image reveals & Recalculation
    const imgAnchor = card.querySelector('.project-image-anchor');
    const img = card.querySelector('.project-aspect-wrapper img');

    if (imgAnchor) {
      tl.from(imgAnchor, {
        scale: 1.2,
        duration: 1.2,
        ease: 'power3.out'
      }, 0);
    }

    // Ensure ScrollTrigger recalculates everything if dynamic lazy images load delayed
    if (img) {
      img.addEventListener('load', () => {
        ScrollTrigger.refresh();
      });
    }

    // Title SplitText
    const title = card.querySelector('.project-title');
    const titleChars = new SplitText(title, { type: 'chars' });
    tl.from(titleChars.chars, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.03,
      ease: 'back.out(1.5)'
    }, 0.3);

    // Description
    tl.from(card.querySelector('.project-description'), {
      y: 20,
      opacity: 0,
      duration: 0.6,
      ease: 'power3.out'
    }, 0.5);

    // Tags stagger
    tl.from(card.querySelectorAll('.project-tag'), {
      scale: 0,
      opacity: 0,
      duration: 0.4,
      stagger: 0.06,
      ease: 'back.out(2)'
    }, 0.6);

    // Link
    tl.from(card.querySelector('.project-link-premium'), {
      y: 10,
      opacity: 0,
      duration: 0.5,
      ease: 'power3.out'
    }, 0.7);
  });

  // ── Image parallax within cards ──
  cards.forEach(card => {
    const img = card.querySelector('.project-aspect-wrapper img');
    gsap.to(img, {
      y: -25,
      ease: 'none',
      scrollTrigger: {
        trigger: card,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5
      }
    });
  });
}

