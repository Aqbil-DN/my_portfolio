# ✨ Paper Universe — Immersive Handcrafted Portfolio

[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=flat-square&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
[![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=flat-square&logo=greensock&logoColor=white)](https://greensock.com/)
[![Three.js](https://img.shields.io/badge/Three.js-000000?style=flat-square&logo=three.js&logoColor=white)](https://threejs.org/)
[![Lenis](https://img.shields.io/badge/Lenis-FF5D01?style=flat-square)](https://github.com/darkroomengineering/lenis)

Welcome to **Paper Universe**, a premium creative frontend portfolio designed and engineered by **Aqbil Dzaky Nauval**. 

This project represents a unique design philosophy: bridging the gap between raw, tactile analog artistry (handmade sketches, crumpled papers, ink splats) and ultra-smooth, high-performance digital motion engineering. 

---

## 🌌 Conceptual Foundations

The core concept behind **Paper Universe** is a "living scrapbook." The portfolio isn't treated as a flat digital document, but as a physical 3D space constructed from layered papers, scotch tape, polaroid snapshots, and hand-drawn sketches.

### ✨ High-Fidelity User Journey:
1. **Scene 0: The Cinematic Introduction**: A dynamic shuffler sweeps scattered polaroid snapshots containing actual technology logos up and down across the viewport, revealing the handmade textures beneath.
2. **Scene 1: The Ink & Canvas Bloom**: Organic SVG ink splats bleed out behind custom typography, transitioning the viewer from the loader to the active viewport.
3. **Scene 2: Inertial Fluid Browsing**: The page adopts physical gravity and momentum using Lenis smooth scroll, creating a buttery, premium, and highly tactile scrolling feedback.
4. **Scene 3: Physical Micro-Interactions**: Grabbing sticky notes, erasing physical chalkboards, and hovering over scrapbook snapshots to reveal dynamic interactive doodles.

---

## 🛠️ Technical Architecture

Built purely using **Vanilla Javascript** (ES Modules), **Vite**, and high-performance animation libraries to maintain raw rendering performance while offering maximum aesthetic complexity.

### Key Technologies:
*   **GSAP (GreenSock Animation Platform)**: Drives 100% of the core timeline orchestrations, scroll triggers, and physical draggable dynamics.
    *   `ScrollTrigger`: Handles parallax effects, canvas transitions, and reveal animations.
    *   `Draggable` + `InertiaPlugin`: Facilitates grabbing and throwing sticky notes inside the Playground.
    *   `SplitText`: Generates pixel-perfect cinematic typographical introductions.
*   **Three.js**: Operates cosmic 3D rendering integrations for immersive project visualizations.
*   **Lenis Scroll**: An ultra-lightweight inertial scroll engine integrated with GSAP's ticker for consistent framerates.
*   **Modern Vanilla CSS**: Tailored modular stylesheets exploiting CSS custom properties (`var(--...)`), flexbox, and high-performance hardware-accelerated transforms.

---

## 📂 Project Structure

The codebase employs a highly modular architecture separating animation controllers, styling hooks, and asset layers.

```bash
my_portfolio/
├── index.html                 # Core HTML structure & semantic layout
├── package.json               # Project manifest and build scripts
├── vite.config.js             # Vite compiler configuration
├── public/                    # Statically served root assets (favicon, etc.)
└── src/
    ├── main.js                # Global entrypoint, GSAP registrar, & Lenis config
    ├── assets/                # Bundled binary production assets
    │   ├── logo/              # Skill iconography (GSAP, Framer, Vite)
    │   ├── project/           # Dynamic case study mockups (My Universe, S.Brain)
    │   └── profile/           # Developer portrait and primary images
    ├── styles/                # Highly modular Vanilla CSS styling sheets
    │   ├── base.css           # Global tokens, typography, & custom cursor
    │   ├── loading.css        # Cinematic loader canvas and ink aesthetics
    │   ├── hero.css           # Scattered paper headers and CTA layout
    │   ├── about.css          # Ruled notebook and floating polaroid grid
    │   ├── skills.css         # Physical chalkboard layout & badge tilting
    │   ├── projects.css       # Clickable scrapbook framing & dynamic tapes
    │   └── playground.css     # Draggable paper canvas dynamics
    └── animations/            # Dynamic Javascript ES modules & controllers
        ├── loader.js          # Fisher-Yates polaroid shuffler & ink sequence
        ├── cursor.js          # Dynamic SVG ring custom cursor behaviors
        ├── hero.js            # Parallax doodle reveals and headlines
        ├── about.js           # Notebook typography staggered entry
        ├── skills.js          # Draggable sticky notes & Chalk Eraser algorithms
        ├── projects.js        # Aspect-wrapper image reveals & click bindings
        ├── playground.js      # Drag-and-throw sticky note sandbox
        └── transitions.js     # Complex SVG section morphs and torn edges
```

---

## ✨ Key Technical Innovations

### 🧑‍🏫 The Chalkboard Physical Erasure Engine
Within the **Skills Section**, a custom canvas-based erasure simulation utilizes mathematical `clip-path` recalculations on mouse/touch drag. Using the physical chalkboard eraser element, it "wipes away" chalked content, dynamically generating a realistic chalk dusting trail behind it.

### 🔀 Fisher-Yates Polaroid Shuffler
The Intro Loader dynamically pulls from 24 unique technology definitions, executing a dedicated Fisher-Yates shuffle per vertical track. This guarantees **100% visual uniqueness** (zero vertical duplicates) at startup, preventing clumping and maximizing visual excitement.

### 🚀 ES Modules Production Bridging
To ensure absolute stability in production environments like Vercel, all assets under `/src/assets/` are resolved using explicit **ES Modules imports** (`import logo from './assets...'`), allowing Vite to generate perfect static build hashes and mitigating 404 resource failures entirely.

---

## 💻 Getting Started Locally

To run this universe locally, ensure you have Node.js installed, then execute:

```bash
# 1. Clone the repository
git clone https://github.com/Aqbil-DN/my_portfolio.git

# 2. Enter the directory
cd my_portfolio

# 3. Install dependencies
npm install

# 4. Run development server
npm run dev
```

Open `http://localhost:5173` to enter the Paper Universe! 🚀

---
Developed with 🧡 by **Aqbil Dzaky Nauval**. All visual assets, code, and motion mechanics are handcrafted.
