/* ══════════════════════════════════════════════════════════════
   PLAYGROUND — Interactive draggable sandbox + tools
   ══════════════════════════════════════════════════════════════ */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';

/* ── Initial seed items ── */
const PLAYGROUND_ITEMS = [
  { type: 'sticky', text: 'Dream big 🌟', color: '', x: 50, y: 40, rotate: -5 },
  { type: 'sticky', text: 'Code is poetry ✨', color: 'pink', x: 300, y: 80, rotate: 3 },
  { type: 'sticky', text: 'Ship it! 🚀', color: 'blue', x: 550, y: 50, rotate: -2 },
  { type: 'sticky', text: 'Stay curious 🔍', color: 'green', x: 180, y: 250, rotate: 6 },
  { type: 'sticky', text: 'Less is more', color: 'orange', x: 700, y: 200, rotate: -4 },
  { type: 'sticker', emoji: '⭐', x: 450, y: 150, rotate: 15 },
  { type: 'sticker', emoji: '🎨', x: 120, y: 350, rotate: -10 },
  { type: 'sticker', emoji: '💡', x: 620, y: 320, rotate: 20 },
  { type: 'sticker', emoji: '🔥', x: 350, y: 380, rotate: -8 },
  { type: 'sticker', emoji: '✏️', x: 800, y: 100, rotate: 5 },
  { type: 'photo', src: '/images/photo_workspace.png', x: 250, y: 160, rotate: -6 },
  { type: 'photo', src: '/images/photo_coffee.png', x: 650, y: 280, rotate: 4 },
  { type: 'scrap', text: 'hello world', x: 80, y: 180, rotate: 8 },
  { type: 'scrap', text: '< / >', x: 500, y: 400, rotate: -3 },
  { type: 'tape', washi: false, x: 400, y: 60, rotate: 12 },
  { type: 'tape', washi: true, x: 150, y: 420, rotate: -15 },
];

/* ── Full emoji set for picker ── */
const EMOJI_LIST = [
  '😀','😂','🥰','😎','🤩','🥳','😇','🤔',
  '🔥','✨','💫','⭐','🌟','💡','🎨','🎭',
  '🎵','🎶','🎸','🎹','🎤','🎬','📸','📷',
  '💻','🖥️','⌨️','🖱️','📱','🕹️','🎮','🤖',
  '🚀','✈️','🌍','🗺️','🏔️','🌊','🌸','🌺',
  '🌈','☀️','🌙','⚡','💎','🏆','🎯','🧩',
  '☕','🧋','🍕','🍔','🎂','🍰','🍩','🧁',
  '❤️','🧡','💛','💚','💙','💜','🖤','🤍',
  '👍','👏','🙌','💪','🤝','✌️','🤞','👋',
  '📝','📌','📎','✂️','🖊️','🖋️','✏️','📐',
  '🐱','🐶','🦊','🐻','🐼','🦋','🐝','🐞',
  '🌻','🌵','🍀','🍁','🍂','🎄','🎃','🎪',
];

let area = null;
let pencilActive = false;

export function initPlayground() {
  area = document.getElementById('playground-area');
  if (!area) return;

  // ── Header SplitText ──
  const headerTitle = document.querySelector('.playground-header .section-title');
  if (headerTitle) {
    const titleSplit = new SplitText(headerTitle, { type: 'chars' });
    gsap.from(titleSplit.chars, {
      y: 50,
      opacity: 0,
      rotateX: -45,
      duration: 0.8,
      stagger: 0.03,
      ease: 'back.out(1.5)',
      scrollTrigger: {
        trigger: '.playground-header',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });
  }

  // ── Generate seed items ──
  PLAYGROUND_ITEMS.forEach(item => {
    const el = createPlaygroundElement(item);
    area.appendChild(el);
  });

  // ── Stagger entrance ──
  const items = area.querySelectorAll('.playground-item');
  gsap.from(items, {
    scale: 0,
    opacity: 0,
    rotation: () => `${(Math.random() - 0.5) * 40}`,
    duration: 0.6,
    stagger: { each: 0.05, from: 'random' },
    ease: 'back.out(2)',
    scrollTrigger: {
      trigger: area,
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    }
  });

  // ── Make seed items draggable ──
  items.forEach(item => makeDraggable(item));

  // ── Idle floating ──
  items.forEach((item, i) => startIdleFloat(item, i));

  // ── Toolbar setup ──
  setupToolbar();

  // ── Pencil drawing setup ──
  setupPencilDrawing();

  // ── Emoji picker setup ──
  setupEmojiPicker();

  // ── Paper note modal setup ──
  setupPaperModal();
}

/* ══════════════════════════════════════════════════════════════
   ELEMENT CREATION
   ══════════════════════════════════════════════════════════════ */
function createPlaygroundElement(item) {
  const el = document.createElement('div');
  el.className = `playground-item pg-${item.type}`;
  if (item.color) el.classList.add(item.color);
  if (item.washi) el.classList.add('washi');

  el.style.left = `${Math.min(item.x, (area.offsetWidth || 900) - 160)}px`;
  el.style.top = `${Math.min(item.y, 450)}px`;
  el.style.transform = `rotate(${item.rotate || 0}deg)`;

  // Wrap main visual content in inner HTML to keep delete button isolated
  switch (item.type) {
    case 'sticky':
    case 'scrap':
      el.innerHTML = `<span>${item.text}</span>`;
      break;
    case 'sticker':
      el.innerHTML = `<span>${item.emoji}</span>`;
      break;
    case 'photo':
      el.innerHTML = `<img src="${item.src}" alt="playground photo" />`;
      break;
    case 'tape':
      break;
  }

  // ── Injected Delete Button ──
  const delBtn = document.createElement('button');
  delBtn.className = 'pg-item-delete';
  delBtn.innerHTML = '&times;';
  delBtn.setAttribute('title', 'Delete Element');
  
  // Prevent Draggable from hijacking deletion clicks
  delBtn.addEventListener('mousedown', (e) => e.stopPropagation());
  delBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    
    // Cool shrinking pop-out GSAP deletion
    gsap.to(el, {
      scale: 0,
      opacity: 0,
      rotation: '+=20',
      duration: 0.35,
      ease: 'back.in(1.5)',
      onComplete: () => el.remove()
    });
  });

  el.appendChild(delBtn);

  return el;
}

/* ══════════════════════════════════════════════════════════════
   DRAGGABLE HELPER
   ══════════════════════════════════════════════════════════════ */
function makeDraggable(el) {
  Draggable.create(el, {
    type: 'x,y',
    inertia: true,
    bounds: area,
    edgeResistance: 0.65,
    onPress: function() {
      gsap.to(this.target, {
        scale: 1.1,
        zIndex: 200,
        duration: 0.2,
        ease: 'power2.out'
      });
      this.target.style.filter = 'drop-shadow(0 8px 16px rgba(0,0,0,0.2))';
    },
    onDrag: function() {
      const vx = this.getDirection('velocity').split('')[0];
      gsap.to(this.target, {
        rotation: vx === 'l' ? -5 : vx === 'r' ? 5 : 0,
        duration: 0.3,
        overwrite: 'auto'
      });
    },
    onRelease: function() {
      gsap.to(this.target, {
        scale: 1,
        zIndex: 5,
        rotation: (Math.random() - 0.5) * 10,
        duration: 0.6,
        ease: 'elastic.out(1, 0.4)'
      });
      this.target.style.filter = '';
    }
  });
}

function startIdleFloat(el, i) {
  gsap.to(el, {
    y: `+=${3 + Math.random() * 5}`,
    rotation: `+=${(Math.random() - 0.5) * 3}`,
    duration: 3 + Math.random() * 3,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    delay: i * 0.15
  });
}

/* Add item to board with pop-up animation */
function addToBoard(el) {
  area.appendChild(el);

  // Pop-up animation
  gsap.fromTo(el,
    { scale: 0, opacity: 0, rotation: (Math.random() - 0.5) * 30 },
    {
      scale: 1,
      opacity: 1,
      rotation: (Math.random() - 0.5) * 8,
      duration: 0.6,
      ease: 'back.out(2.5)',
      onComplete: () => {
        makeDraggable(el);
        startIdleFloat(el, Math.random() * 10);
      }
    }
  );

  // Sparkle effect 🎉
  spawnSparkles(el);
}

function spawnSparkles(target) {
  const rect = target.getBoundingClientRect();
  const areaRect = area.getBoundingClientRect();
  const cx = rect.left - areaRect.left + rect.width / 2;
  const cy = rect.top - areaRect.top + rect.height / 2;

  for (let i = 0; i < 8; i++) {
    const spark = document.createElement('div');
    spark.style.cssText = `
      position: absolute;
      left: ${cx}px;
      top: ${cy}px;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: ${['#FFD700','#FF6B6B','#4FC3F7','#81C784','#FFB74D','#BA68C8'][i % 6]};
      z-index: 999;
      pointer-events: none;
    `;
    area.appendChild(spark);

    const angle = (i / 8) * Math.PI * 2;
    const dist = 40 + Math.random() * 40;
    gsap.to(spark, {
      x: Math.cos(angle) * dist,
      y: Math.sin(angle) * dist,
      opacity: 0,
      scale: 0,
      duration: 0.6 + Math.random() * 0.3,
      ease: 'power3.out',
      onComplete: () => spark.remove()
    });
  }
}

/* ══════════════════════════════════════════════════════════════
   TOOLBAR
   ══════════════════════════════════════════════════════════════ */
function setupToolbar() {
  const addPaperBtn = document.getElementById('pg-add-paper');
  const addEmojiBtn = document.getElementById('pg-add-emoji');
  const pencilBtn = document.getElementById('pg-pencil-toggle');

  addPaperBtn?.addEventListener('click', () => {
    showModal('pg-paper-modal');
  });

  addEmojiBtn?.addEventListener('click', () => {
    showModal('pg-emoji-modal');
  });

  pencilBtn?.addEventListener('click', () => {
    pencilActive = !pencilActive;
    pencilBtn.classList.toggle('active', pencilActive);

    const canvas = document.getElementById('playground-canvas');
    const pencilOpts = document.getElementById('pg-pencil-options');

    if (pencilActive) {
      canvas.classList.add('drawing-active');
      pencilOpts.style.display = 'flex';
      gsap.fromTo(pencilOpts, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.3, ease: 'back.out(1.5)' });
    } else {
      canvas.classList.remove('drawing-active');
      gsap.to(pencilOpts, { opacity: 0, y: -10, duration: 0.2, onComplete: () => { pencilOpts.style.display = 'none'; } });
    }
  });
}

/* ══════════════════════════════════════════════════════════════
   MODALS
   ══════════════════════════════════════════════════════════════ */
function showModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.style.display = 'flex';
  gsap.fromTo(modal, { opacity: 0 }, { opacity: 1, duration: 0.3 });
  gsap.fromTo(modal.querySelector('.pg-modal-content'),
    { scale: 0.85, y: 20, opacity: 0 }, // Ensure opacity resets from zero
    { scale: 1, y: 0, opacity: 1, duration: 0.4, ease: 'back.out(1.5)' } // Reset to full opacity!
  );
}

function hideModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  gsap.to(modal.querySelector('.pg-modal-content'), {
    scale: 0.9, y: 10, opacity: 0, duration: 0.25, ease: 'power2.in'
  });
  gsap.to(modal, {
    opacity: 0, duration: 0.25, delay: 0.1,
    onComplete: () => { modal.style.display = 'none'; }
  });
}

/* ══════════════════════════════════════════════════════════════
   PAPER NOTE MODAL
   ══════════════════════════════════════════════════════════════ */
function setupPaperModal() {
  let selectedColor = '';

  // Color swatch click
  const swatches = document.querySelectorAll('#pg-color-options .pg-color-swatch');
  swatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      swatches.forEach(s => s.classList.remove('active'));
      swatch.classList.add('active');
      selectedColor = swatch.dataset.color;

      // Update textarea preview color
      const textarea = document.getElementById('pg-paper-text');
      const colors = {
        '': '#FFF9C4',
        pink: '#FCE4EC',
        blue: '#E3F2FD',
        green: '#E8F5E9',
        orange: '#FFF3E0',
        purple: '#F3E5F5',
        white: '#FFFFFF'
      };
      textarea.style.background = colors[selectedColor] || '#FFF9C4';
    });
  });

  // Cancel
  document.getElementById('pg-paper-cancel')?.addEventListener('click', () => {
    hideModal('pg-paper-modal');
  });

  // Add note
  document.getElementById('pg-paper-add')?.addEventListener('click', () => {
    const text = document.getElementById('pg-paper-text')?.value.trim();
    if (!text) {
      // Shake effect if empty
      const input = document.getElementById('pg-paper-text');
      gsap.fromTo(input, { x: -5 }, { x: 5, duration: 0.08, repeat: 5, yoyo: true, onComplete: () => gsap.set(input, { x: 0 }) });
      return;
    }

    // Random position within visible bounds
    const areaW = area.offsetWidth - 180;
    const areaH = area.offsetHeight - 100;

    const el = createPlaygroundElement({
      type: 'sticky',
      text: text,
      color: selectedColor,
      x: 60 + Math.random() * Math.max(areaW, 100),
      y: 40 + Math.random() * Math.max(areaH, 100),
      rotate: (Math.random() - 0.5) * 10
    });

    addToBoard(el);

    // Reset & close
    document.getElementById('pg-paper-text').value = '';
    hideModal('pg-paper-modal');
  });

  // Close on backdrop click
  document.getElementById('pg-paper-modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'pg-paper-modal') hideModal('pg-paper-modal');
  });
}

/* ══════════════════════════════════════════════════════════════
   EMOJI PICKER
   ══════════════════════════════════════════════════════════════ */
function setupEmojiPicker() {
  const grid = document.getElementById('pg-emoji-grid');
  if (!grid) return;

  // Populate emoji grid
  EMOJI_LIST.forEach(emoji => {
    const btn = document.createElement('button');
    btn.className = 'pg-emoji-btn';
    btn.textContent = emoji;
    btn.addEventListener('click', () => {
      // Random position
      const areaW = area.offsetWidth - 80;
      const areaH = area.offsetHeight - 80;

      const el = createPlaygroundElement({
        type: 'sticker',
        emoji: emoji,
        x: 40 + Math.random() * Math.max(areaW, 100),
        y: 40 + Math.random() * Math.max(areaH, 100),
        rotate: (Math.random() - 0.5) * 20
      });

      addToBoard(el);
      hideModal('pg-emoji-modal');
    });
    grid.appendChild(btn);
  });

  // Cancel
  document.getElementById('pg-emoji-cancel')?.addEventListener('click', () => {
    hideModal('pg-emoji-modal');
  });

  // Close on backdrop
  document.getElementById('pg-emoji-modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'pg-emoji-modal') hideModal('pg-emoji-modal');
  });
}

/* ══════════════════════════════════════════════════════════════
   PENCIL DRAWING CANVAS
   ══════════════════════════════════════════════════════════════ */
function setupPencilDrawing() {
  const canvas = document.getElementById('playground-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let drawing = false;
  let lastX = 0;
  let lastY = 0;

  function resizeCanvas() {
    const rect = area.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    // Save existing drawing
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    ctx.scale(dpr, dpr);
    // Restore drawing (best effort)
    ctx.putImageData(imgData, 0, 0);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    if (e.touches && e.touches.length > 0) {
      return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
    }
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  function startDraw(e) {
    if (!pencilActive) return;
    drawing = true;
    const pos = getPos(e);
    lastX = pos.x;
    lastY = pos.y;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    e.preventDefault();
  }

  function draw(e) {
    if (!drawing || !pencilActive) return;
    e.preventDefault();

    const colorInput = document.getElementById('pg-pencil-color');
    const sizeInput = document.getElementById('pg-pencil-size');

    ctx.strokeStyle = colorInput?.value || '#2C2C2C';
    ctx.lineWidth = parseFloat(sizeInput?.value || 3);
    ctx.globalAlpha = 0.85;

    const pos = getPos(e);

    // Smooth line with quadratic curve
    const midX = (lastX + pos.x) / 2;
    const midY = (lastY + pos.y) / 2;

    ctx.quadraticCurveTo(lastX, lastY, midX, midY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(midX, midY);

    lastX = pos.x;
    lastY = pos.y;
  }

  function stopDraw() {
    if (drawing) {
      ctx.stroke();
      drawing = false;
    }
  }

  // Mouse events
  canvas.addEventListener('mousedown', startDraw);
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseup', stopDraw);
  canvas.addEventListener('mouseleave', stopDraw);

  // Touch events
  canvas.addEventListener('touchstart', startDraw, { passive: false });
  canvas.addEventListener('touchmove', draw, { passive: false });
  canvas.addEventListener('touchend', stopDraw);

  // Clear button
  document.getElementById('pg-pencil-clear')?.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Flash effect
    gsap.fromTo(canvas,
      { opacity: 0.3 },
      { opacity: 1, duration: 0.4, ease: 'power2.out' }
    );
  });
}
