/* ══════════════════════════════════════════════════════════════
   CURSOR — Paper-themed custom cursor
   ══════════════════════════════════════════════════════════════ */
import gsap from 'gsap';

export function initCursor() {
  const cursor = document.getElementById('custom-cursor');
  if (!cursor) return;

  // Hide on touch devices
  if ('ontouchstart' in window) {
    cursor.style.display = 'none';
    return;
  }

  const dot = cursor.querySelector('.cursor-dot');
  const ring = cursor.querySelector('.cursor-ring');

  let mouseX = 0;
  let mouseY = 0;

  // Track mouse position
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Smooth follow with GSAP ticker
  gsap.ticker.add(() => {
    gsap.to(cursor, {
      x: mouseX,
      y: mouseY,
      duration: 0.15,
      ease: 'power2.out',
      overwrite: 'auto'
    });
  });

  // ── Hover state on interactive elements ──
  const interactiveSelectors = [
    'a', 'button', '.btn-paper', '.nav-link',
    '.photo-item', '.skill-badge', '.playground-item',
    '.project-card', '.contact-btn'
  ];

  interactiveSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-hover');
        gsap.to(dot, { scale: 0.5, duration: 0.3 });
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-hover');
        gsap.to(dot, { scale: 1, duration: 0.3 });
      });
    });
  });

  // Re-bind on new elements (MutationObserver for dynamically generated content)
  const observer = new MutationObserver(() => {
    interactiveSelectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => {
        if (!el.dataset.cursorBound) {
          el.dataset.cursorBound = 'true';
          el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
            gsap.to(dot, { scale: 0.5, duration: 0.3 });
          });
          el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
            gsap.to(dot, { scale: 1, duration: 0.3 });
          });
        }
      });
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });

  // ── Hide cursor when leaving window ──
  document.addEventListener('mouseleave', () => {
    gsap.to(cursor, { opacity: 0, duration: 0.2 });
  });
  document.addEventListener('mouseenter', () => {
    gsap.to(cursor, { opacity: 1, duration: 0.2 });
  });
}
