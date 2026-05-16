/* ══════════════════════════════════════════════════════════════
   MUSIC MODULE — Handling Background Score & Vinyl Animation
   ══════════════════════════════════════════════════════════════ */
import gsap from 'gsap';

export function initMusic() {
  const music = document.getElementById('bg-music');
  const playerBtn = document.getElementById('music-toggle');
  const disc = playerBtn?.querySelector('.vinyl-disc');
  const statusIcon = document.getElementById('music-status');
  const playerContainer = document.querySelector('.music-player');

  if (!music || !playerBtn || !disc) return;

  let isPlaying = false;

  // Initial volume
  music.volume = 0.4;

  const toggleMusic = () => {
    if (isPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
  };

  const playMusic = () => {
    music.play().then(() => {
      isPlaying = true;
      disc.classList.add('playing');
      disc.classList.remove('paused');
      statusIcon.innerHTML = 'Ⅱ'; // Pause icon

      // Animate entry of player if not visible
      playerContainer.classList.add('visible');
    }).catch(err => {
      console.warn("Autoplay blocked or music failed:", err);
    });
  };

  const pauseMusic = () => {
    music.pause();
    isPlaying = false;
    disc.classList.add('paused');
    statusIcon.innerHTML = '▶'; // Play icon
  };

  playerBtn.addEventListener('click', toggleMusic);

  // Auto-play attempt on first interaction with the page
  const startOnInteraction = () => {
    if (!isPlaying) {
      playMusic();
    }
    window.removeEventListener('click', startOnInteraction);
    window.removeEventListener('keydown', startOnInteraction);
    window.removeEventListener('touchstart', startOnInteraction);
  };

  window.addEventListener('click', startOnInteraction);
  window.addEventListener('keydown', startOnInteraction);
  window.addEventListener('touchstart', startOnInteraction);

  // Aggressive Autoplay Attempt
  playMusic();

  // Reveal player after loader finishes (called from main.js)
  window.revealMusicPlayer = () => {
    playerContainer.classList.add('visible');
    // Try again when loader finishes
    if (!isPlaying) playMusic();
  };

  // Optional: Floating music notes animation when playing
  setInterval(() => {
    if (isPlaying) {
      createMusicNote();
    }
  }, 1000);

  function createMusicNote() {
    const notes = ['♪', '♫', '♬', '♩'];
    const note = document.createElement('div');
    note.className = 'music-note';
    note.textContent = notes[Math.floor(Math.random() * notes.length)];

    const rect = playerBtn.getBoundingClientRect();
    note.style.left = `${rect.left + rect.width / 2}px`;
    note.style.top = `${rect.top}px`;

    document.body.appendChild(note);

    gsap.to(note, {
      y: -100 - Math.random() * 50,
      x: (Math.random() - 0.5) * 60,
      rotation: Math.random() * 45,
      opacity: 0.8,
      duration: 1.5,
      ease: 'power1.out'
    }).then(() => {
      gsap.to(note, {
        opacity: 0,
        y: '-=50',
        duration: 1.5,
        ease: 'power1.in'
      }).then(() => note.remove());
    });
  }
}
