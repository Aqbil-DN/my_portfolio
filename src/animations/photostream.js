/* ══════════════════════════════════════════════════════════════
   PHOTO STREAM — Infinite scrolling photo columns
   ══════════════════════════════════════════════════════════════ */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';

const PHOTOS = [
  { src: '/images/photo_workspace.png', note: 'creative vibes ✨' },
  { src: '/images/photo_coffee.png', note: 'fuel for coding ☕' },
  { src: '/images/photo_nature.png', note: 'inspiration 🌿' },
  { src: '/images/photo_architecture.png', note: 'clean lines 📐' },
  { src: '/images/photo_design.png', note: 'color studies 🎨' },
  { src: '/images/photo_travel.png', note: 'wanderlust 🌍' },
  { src: '/images/photo_ocean.png', note: 'serenity 🌊' },
  { src: '/images/photo_creative.png', note: 'the process ✏️' },
];

function createPhotoItem(photo) {
  const item = document.createElement('div');
  item.className = 'photo-item';
  // Store the rotation so we can use it without conflicting with GSAP
  const rot = (Math.random() - 0.5) * 6;
  item.dataset.rotation = rot;

  const img = document.createElement('img');
  img.src = photo.src;
  img.alt = photo.note;
  // No lazy loading — we need all images visible immediately for the loop
  img.loading = 'eager';

  const note = document.createElement('span');
  note.className = 'photo-note handwritten';
  note.textContent = photo.note;

  item.appendChild(img);
  item.appendChild(note);
  return item;
}

export function initPhotoStream() {
  const wall = document.getElementById('photo-wall');
  if (!wall) return;

  const NUM_COLS = 5;
  const GAP = 20;
  const columnTweens = [];

  // Create columns
  for (let col = 0; col < NUM_COLS; col++) {
    const column = document.createElement('div');
    column.className = 'photo-column';

    const inner = document.createElement('div');
    inner.className = 'photo-column-inner';

    // Shuffle photos differently for each column
    const shuffled = [...PHOTOS].sort(() => Math.random() - 0.5);

    // Create a set of photos, then clone the ENTIRE set for seamless wrapping
    // We need enough photos to fill more than 2x the visible height
    const photoSet = [...shuffled, ...shuffled.slice(0, 4)]; // 12 photos per column

    photoSet.forEach(photo => {
      inner.appendChild(createPhotoItem(photo));
    });

    column.appendChild(inner);
    wall.appendChild(column);
  }

  // Wait for images to load so we can measure heights properly
  const allImages = wall.querySelectorAll('img');
  let loaded = 0;
  const totalImages = allImages.length;

  function onImageReady() {
    loaded++;
    if (loaded >= totalImages) {
      startColumnAnimations();
    }
  }

  allImages.forEach(img => {
    if (img.complete) {
      onImageReady();
    } else {
      img.addEventListener('load', onImageReady);
      img.addEventListener('error', onImageReady);
    }
  });

  // Fallback: start anyway after 2s
  setTimeout(() => {
    if (loaded < totalImages) startColumnAnimations();
  }, 2000);

  let animationsStarted = false;

  function startColumnAnimations() {
    if (animationsStarted) return;
    animationsStarted = true;

    const columns = wall.querySelectorAll('.photo-column');

    columns.forEach((column, i) => {
      const inner = column.querySelector('.photo-column-inner');
      const items = inner.querySelectorAll('.photo-item');

      // Measure the height of the first batch (half the items = one "set")
      const halfCount = Math.ceil(items.length / 2);
      let oneSetHeight = 0;
      for (let j = 0; j < halfCount; j++) {
        oneSetHeight += items[j].offsetHeight + GAP;
      }

      // Clone the entire inner content and append it for seamless wrap
      const clone = inner.cloneNode(true);
      const cloneItems = clone.querySelectorAll('.photo-item');
      cloneItems.forEach(ci => inner.appendChild(ci));

      // Apply initial rotation to all items via GSAP (not inline styles)
      inner.querySelectorAll('.photo-item').forEach(item => {
        const rot = parseFloat(item.dataset.rotation) || 0;
        gsap.set(item, { rotation: rot });
      });

      // Direction: even columns go UP (negative), odd go DOWN (positive then reset)
      const goesUp = i % 2 === 0;

      // Position: columns going up start at 0 and go to -oneSetHeight
      // columns going down start at -oneSetHeight and go to 0
      if (goesUp) {
        gsap.set(inner, { y: 0 });
      } else {
        gsap.set(inner, { y: -oneSetHeight });
      }

      const speed = 30 + i * 5; // seconds for one full cycle

      const tween = gsap.to(inner, {
        y: goesUp ? -oneSetHeight : 0,
        duration: speed,
        ease: 'none',
        repeat: -1,
        onRepeat: function() {
          // Reset position seamlessly
          if (goesUp) {
            gsap.set(inner, { y: 0 });
          } else {
            gsap.set(inner, { y: -oneSetHeight });
          }
        }
      });

      columnTweens.push(tween);
    });

    // ── Hover effects (no CSS transition conflicts!) ──
    wall.querySelectorAll('.photo-item').forEach(item => {
      item.addEventListener('mouseenter', () => {
        gsap.to(item, {
          y: -8,
          scale: 1.04,
          zIndex: 50,
          boxShadow: '0 12px 32px rgba(44,44,44,0.18), 0 20px 48px rgba(44,44,44,0.1)',
          duration: 0.4,
          ease: 'power2.out',
          overwrite: 'auto'
        });
        // Show note
        const note = item.querySelector('.photo-note');
        if (note) {
          gsap.to(note, { opacity: 1, y: -5, duration: 0.3, ease: 'power2.out' });
        }
      });

      item.addEventListener('mouseleave', () => {
        gsap.to(item, {
          y: 0,
          scale: 1,
          zIndex: 1,
          boxShadow: '0 2px 8px rgba(44,44,44,0.08), 0 6px 16px rgba(44,44,44,0.08)',
          duration: 0.5,
          ease: 'power2.out',
          overwrite: 'auto'
        });
        const note = item.querySelector('.photo-note');
        if (note) {
          gsap.to(note, { opacity: 0, y: 0, duration: 0.3, ease: 'power2.out' });
        }
      });
    });
  }

  // ── Scroll-linked speed boost ──
  ScrollTrigger.create({
    trigger: '.photos-section',
    start: 'top bottom',
    end: 'bottom top',
    onUpdate: (self) => {
      const velocity = Math.abs(self.getVelocity()) / 1000;
      const boost = gsap.utils.clamp(0.8, 2.5, 1 + velocity * 0.2);
      columnTweens.forEach(tween => {
        gsap.to(tween, { timeScale: boost, duration: 0.5, overwrite: 'auto' });
      });
    }
  });

  // ── Header animations ──
  const titleSplit = new SplitText('.photos-header .section-title', { type: 'chars' });
  gsap.from(titleSplit.chars, {
    y: 50,
    opacity: 0,
    rotateX: -45,
    duration: 0.8,
    stagger: 0.03,
    ease: 'back.out(1.5)',
    scrollTrigger: {
      trigger: '.photos-header',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    }
  });

  // Section squiggle DrawSVG
  gsap.fromTo('.photos-header .section-squiggle path',
    { drawSVG: '0%' },
    {
      drawSVG: '100%',
      duration: 1.2,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: '.photos-header',
        start: 'top 75%',
        toggleActions: 'play none none reverse'
      }
    }
  );

  // ── Photo doodles DrawSVG ──
  gsap.utils.toArray('.photo-doodle path').forEach(path => {
    gsap.fromTo(path,
      { drawSVG: '0%' },
      {
        drawSVG: '100%',
        duration: 1.5,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: '.photos-section',
          start: 'top 60%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });
}
