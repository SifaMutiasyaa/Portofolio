/**
 * Custom cursor: glowing dot + ring, magnetic hover on interactive elements,
 * and a lightweight particle trail. Skips itself entirely on touch devices.
 */
(function () {
  const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
  if (isTouch) return;

  // Cari elemen cursor, jika tidak ada buat secara dinamis
  let dot = document.getElementById("cursor-dot");
  let ring = document.getElementById("cursor-ring");

  if (!dot || !ring) {
    // Buat elemen cursor secara dinamis
    const createCursor = () => {
      const dotEl = document.createElement('div');
      dotEl.id = 'cursor-dot';
      dotEl.setAttribute('aria-hidden', 'true');
      dotEl.style.cssText = `
        position: fixed; top: 0; left: 0;
        width: 8px; height: 8px;
        border-radius: 50%;
        background: #38BDF8;
        box-shadow: 0 0 12px 2px #38BDF8;
        pointer-events: none;
        z-index: 10000;
        transform: translate(-50%, -50%);
        will-change: transform;
        display: block !important;
      `;
      
      const ringEl = document.createElement('div');
      ringEl.id = 'cursor-ring';
      ringEl.setAttribute('aria-hidden', 'true');
      ringEl.style.cssText = `
        position: fixed; top: 0; left: 0;
        width: 36px; height: 36px;
        border-radius: 50%;
        border: 1px solid rgba(56, 189, 248, 0.5);
        pointer-events: none;
        z-index: 10000;
        transform: translate(-50%, -50%);
        will-change: transform;
        display: block !important;
        transition: width 0.25s cubic-bezier(0.16, 1, 0.3, 1),
                    height 0.25s cubic-bezier(0.16, 1, 0.3, 1),
                    border-color 0.25s,
                    background 0.25s,
                    box-shadow 0.25s;
      `;
      
      document.body.appendChild(dotEl);
      document.body.appendChild(ringEl);
      
      return { dot: dotEl, ring: ringEl };
    };
    
    const els = createCursor();
    dot = els.dot;
    ring = els.ring;
  }

  if (!dot || !ring) return;

  let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
  let ringX = mouseX, ringY = mouseY;
  let isVisible = true;

  // Sembunyikan cursor default
  document.body.style.cursor = 'none';

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    spawnTrailDot(mouseX, mouseY);
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Magnetic effect on interactive elements
  const magneticEls = document.querySelectorAll("a, button, .magnetic, .btn, .gallery-item, .link-btn, .filter-btn, .carousel-nav, .project-card, .cert-card, .gallery-modal-close, .gallery-modal-nav");
  
  magneticEls.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      if (ring) {
        ring.classList.add("magnetic");
        ring.style.width = '64px';
        ring.style.height = '64px';
        ring.style.background = 'rgba(56, 189, 248, 0.08)';
        ring.style.borderColor = '#38BDF8';
        ring.style.boxShadow = '0 0 24px rgba(56, 189, 248, 0.35)';
      }
      if (dot) {
        dot.style.opacity = '0.5';
      }
    });
    
    el.addEventListener("mouseleave", () => {
      if (ring) {
        ring.classList.remove("magnetic");
        ring.style.width = '36px';
        ring.style.height = '36px';
        ring.style.background = 'transparent';
        ring.style.borderColor = 'rgba(56, 189, 248, 0.5)';
        ring.style.boxShadow = 'none';
      }
      if (dot) {
        dot.style.opacity = '1';
      }
      el.style.transform = "";
    });

    // Magnetic movement
    el.addEventListener("mousemove", (e) => {
      if (!el.classList.contains("btn") && !el.classList.contains("magnetic") && !el.matches('.gallery-item, .link-btn, .filter-btn')) return;
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - rect.left - rect.width / 2;
      const relY = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${relX * 0.25}px, ${relY * 0.25}px)`;
    });
  });

  // Particle trail (throttled)
  let lastTrail = 0;
  const trailDots = [];
  
  function spawnTrailDot(x, y) {
    const now = performance.now();
    if (now - lastTrail < 35) return;
    lastTrail = now;
    
    const p = document.createElement("div");
    p.className = "cursor-trail-dot";
    p.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: rgba(56, 189, 248, 0.4);
      pointer-events: none;
      z-index: 9999;
      transform: translate(-50%, -50%);
      will-change: transform, opacity;
    `;
    document.body.appendChild(p);
    
    // Limit trail dots
    trailDots.push(p);
    if (trailDots.length > 30) {
      const old = trailDots.shift();
      if (old && old.parentNode) old.remove();
    }
    
    // Animate fade out
    let opacity = 0.4;
    const fadeInterval = setInterval(() => {
      opacity -= 0.02;
      p.style.opacity = Math.max(0, opacity);
      if (opacity <= 0) {
        clearInterval(fadeInterval);
        if (p.parentNode) p.remove();
        const idx = trailDots.indexOf(p);
        if (idx > -1) trailDots.splice(idx, 1);
      }
    }, 16);
  }

  // Ripple on click
  document.addEventListener("mousedown", (e) => {
    const ripple = document.createElement("div");
    ripple.style.cssText = `
      position: fixed;
      left: ${e.clientX}px;
      top: ${e.clientY}px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      border: 1px solid #38BDF8;
      transform: translate(-50%, -50%);
      pointer-events: none;
      z-index: 9999;
      will-change: transform, opacity;
      box-shadow: 0 0 20px rgba(56, 189, 248, 0.2);
    `;
    document.body.appendChild(ripple);
    
    let size = 8;
    let opacity = 1;
    const expandInterval = setInterval(() => {
      size += 4;
      opacity -= 0.02;
      ripple.style.width = size + 'px';
      ripple.style.height = size + 'px';
      ripple.style.opacity = Math.max(0, opacity);
      if (opacity <= 0) {
        clearInterval(expandInterval);
        if (ripple.parentNode) ripple.remove();
      }
    }, 10);
  });

  // Sembunyikan cursor saat keluar window
  document.addEventListener("mouseleave", () => {
    if (dot) dot.style.opacity = '0';
    if (ring) ring.style.opacity = '0';
    isVisible = false;
  });

  document.addEventListener("mouseenter", () => {
    if (dot) dot.style.opacity = '1';
    if (ring) ring.style.opacity = '1';
    isVisible = true;
  });

  // Keyboard navigation - tampilkan cursor default saat Tab
  document.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      document.body.style.cursor = "auto";
      if (dot) dot.style.display = 'none';
      if (ring) ring.style.display = 'none';
    }
  });

  document.addEventListener("keyup", (e) => {
    if (e.key === "Tab") {
      // Delay agar cursor default tetap terlihat saat navigasi keyboard
      setTimeout(() => {
        if (!document.activeElement || document.activeElement.tagName !== 'A') {
          document.body.style.cursor = "none";
          if (dot) dot.style.display = 'block';
          if (ring) ring.style.display = 'block';
        }
      }, 100);
    }
  });

  // Jika ada elemen yang di-focus via keyboard, tampilkan cursor default
  document.addEventListener("focusin", (e) => {
    if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('a, button')) {
      document.body.style.cursor = "auto";
      if (dot) dot.style.display = 'none';
      if (ring) ring.style.display = 'none';
    }
  });

  document.addEventListener("focusout", (e) => {
    setTimeout(() => {
      if (!document.activeElement || document.activeElement.tagName !== 'A') {
        document.body.style.cursor = "none";
        if (dot) dot.style.display = 'block';
        if (ring) ring.style.display = 'block';
      }
    }, 50);
  });

  // MutationObserver untuk mendeteksi elemen baru yang perlu efek magnetic
  const observer = new MutationObserver(() => {
    const newMagneticEls = document.querySelectorAll("a, button, .magnetic, .btn, .gallery-item, .link-btn, .filter-btn, .carousel-nav, .project-card, .cert-card, .gallery-modal-close, .gallery-modal-nav:not([data-cursor-initialized])");
    newMagneticEls.forEach((el) => {
      el.setAttribute('data-cursor-initialized', 'true');
      
      el.addEventListener("mouseenter", () => {
        if (ring) {
          ring.style.width = '64px';
          ring.style.height = '64px';
          ring.style.background = 'rgba(56, 189, 248, 0.08)';
          ring.style.borderColor = '#38BDF8';
          ring.style.boxShadow = '0 0 24px rgba(56, 189, 248, 0.35)';
        }
        if (dot) dot.style.opacity = '0.5';
      });
      
      el.addEventListener("mouseleave", () => {
        if (ring) {
          ring.style.width = '36px';
          ring.style.height = '36px';
          ring.style.background = 'transparent';
          ring.style.borderColor = 'rgba(56, 189, 248, 0.5)';
          ring.style.boxShadow = 'none';
        }
        if (dot) dot.style.opacity = '1';
        el.style.transform = "";
      });

      el.addEventListener("mousemove", (e) => {
        if (!el.classList.contains("btn") && !el.classList.contains("magnetic") && !el.matches('.gallery-item, .link-btn, .filter-btn')) return;
        const rect = el.getBoundingClientRect();
        const relX = e.clientX - rect.left - rect.width / 2;
        const relY = e.clientY - rect.top - rect.height / 2;
        el.style.transform = `translate(${relX * 0.25}px, ${relY * 0.25}px)`;
      });
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  console.log('✅ Custom cursor initialized');
})();