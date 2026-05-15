/* ══════════════════════════════════════════════════════════════
   FLOATING BACKGROUND — Global skeuomorphic element injector
   ══════════════════════════════════════════════════════════════ */
import gsap from 'gsap';

// Import all assets statically for production-ready Vite mapping
import book from '../assets/book.png';
import book2 from '../assets/book2.png';
import bread from '../assets/bread.png';
import cloud from '../assets/cloud.png';
import coffee from '../assets/coffee.png';
import flower1 from '../assets/flower1.png';
import flower2 from '../assets/flower2.png';
import flower3 from '../assets/flower3.png';
import laptop from '../assets/laptop.png';
import love1 from '../assets/love1.png';
import melody from '../assets/melody.png';
import pc from '../assets/pc.png';
import spiralBlue from '../assets/spiral_blue.png';
import star1 from '../assets/star1.png';
import star2 from '../assets/star2.png';
import star3 from '../assets/star3.png';
import star4 from '../assets/star4.png';
import star5 from '../assets/star5.png';
import star6 from '../assets/star6.png';
import star7 from '../assets/star7.png';
import star8 from '../assets/star8.png';
import star9 from '../assets/star9.png';
import star10 from '../assets/star10.png';
import star11 from '../assets/star11.png';
import star12 from '../assets/star12.png';
import star13 from '../assets/star13.png';
import star14 from '../assets/star14.png';
import sun from '../assets/sun.png';
import sunSpiral from '../assets/sun_spiral1.png';
import tea from '../assets/tea.png';
import threeStar from '../assets/three star.png';
import vas from '../assets/vas.png';

// Array of all background assets
const ALL_ASSETS = [
  book, book2, bread, cloud, coffee, flower1, flower2, flower3, 
  laptop, love1, melody, pc, spiralBlue, sun, sunSpiral, tea, 
  threeStar, vas, star1, star2, star3, star4, star5, star6, 
  star7, star8, star9, star10, star11, star12, star13, star14
];

// Neat base zones to ensure balanced, non-overlapping side alignment
const ZONES = [
  { top: '15%', left: '5%' },
  { top: '20%', right: '6%' },
  { top: '48%', left: '4%' },
  { top: '52%', right: '5%' },
  { bottom: '18%', left: '7%' },
  { bottom: '22%', right: '6%' }
];

// Utility to add organic +/- 4% offset to base coordinates to balance randomness ("rata gk jomplang")
function jitterCoord(coordStr) {
  if (!coordStr || coordStr === 'auto') return 'auto';
  const val = parseFloat(coordStr);
  const jitter = (Math.random() - 0.5) * 8; // Offset +/- 4%
  return `${(val + jitter).toFixed(1)}%`;
}

// Modern Durstenfeld array shuffle
function shuffleArray(array) {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

export function initFloatingBackground() {
  // Target all primary sections that represent the pages (excluding photos stream loop!)
  const sections = [
    document.getElementById('home'),
    document.getElementById('about'),
    document.getElementById('skills'),
    document.getElementById('projects'),
    document.getElementById('playground'),
    document.getElementById('contact')
  ].filter(Boolean);

  sections.forEach((section, secIdx) => {
    // Ensure the section is positioned to host absolute children
    const computedStyle = window.getComputedStyle(section);
    if (computedStyle.position === 'static') {
      section.style.position = 'relative';
    }

    // Create isolated background container layer
    const layer = document.createElement('div');
    layer.className = 'bg-floating-container';
    
    // Add styling in JS to ensure absolute background segregation
    Object.assign(layer.style, {
      position: 'absolute',
      inset: '0',
      pointerEvents: 'none',
      zIndex: '0', // CRITICAL: Explicit 0 index placed strictly behind content
      overflow: 'hidden'
    });


    // Shuffle the assets array for THIS specific section to guarantee ZERO DUPLICATES in proximity!
    const shuffledSectionAssets = shuffleArray(ALL_ASSETS);
    
    const activeZones = [...ZONES];
    const itemsCount = section.id === 'home' ? 4 : 6; // Fewer on home to not overwhelm initial fold
    
    for (let i = 0; i < itemsCount; i++) {
      const zone = activeZones[i % activeZones.length];
      if (!zone) continue;

      // Select unique item from shuffled selection
      const randomImgSrc = shuffledSectionAssets[i % shuffledSectionAssets.length];
      
      const img = document.createElement('img');
      img.src = randomImgSrc;
      img.className = 'bg-floating-element';
      
      // Apply dynamic jitter for organic visual flow while preserving structural balance
      const parsedTop = jitterCoord(zone.top);
      const parsedBottom = jitterCoord(zone.bottom);
      const parsedLeft = jitterCoord(zone.left);
      const parsedRight = jitterCoord(zone.right);

      // Injected styles
      Object.assign(img.style, {
        position: 'absolute',
        width: randomImgSrc.includes('star') ? '45px' : '75px', 
        height: 'auto',
        opacity: '1',
        mixBlendMode: 'multiply',
        // Balanced random positioning
        top: parsedTop,
        bottom: parsedBottom,
        left: parsedLeft,
        right: parsedRight,
        transform: 'none'
      });

      layer.appendChild(img);
      
      // ── Apply continuous slow-motion floating GSAP tween ──
      gsap.to(img, {
        y: `-=${20 + Math.random() * 20}`,
        x: `+=${(Math.random() - 0.5) * 15}`,
        duration: 5 + Math.random() * 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: (secIdx * 0.5) + (i * 0.3)
      });
    }

    // Prepend layer to ensure it physically sits under the active content divs
    section.prepend(layer);
  });
}

