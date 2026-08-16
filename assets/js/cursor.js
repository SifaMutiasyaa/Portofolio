/**
 * Custom cursor: glowing dot + ring, magnetic hover on interactive elements,
 * and a lightweight particle trail. Skips itself entirely on touch devices.
 */
(function () {
  const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
  if (isTouch) return;

  const dot = document.getElementById("cursor-dot");
  const ring = document.getElementById("cursor-ring");
  if (!dot || !ring) return;

  let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
  let ringX = mouseX, ringY = mouseY;

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
  const magneticEls = document.querySelectorAll("a, button, .magnetic");
  magneticEls.forEach((el) => {
    el.addEventListener("mouseenter", () => ring.classList.add("magnetic"));
    el.addEventListener("mouseleave", () => ring.classList.remove("magnetic"));
    el.addEventListener("mousemove", (e) => {
      if (!el.classList.contains("btn") && !el.classList.contains("magnetic")) return;
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - rect.left - rect.width / 2;
      const relY = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${relX * 0.25}px, ${relY * 0.25}px)`;
    });
    el.addEventListener("mouseleave", () => { el.style.transform = ""; });
  });

  // Particle trail (throttled)
  let lastTrail = 0;
  function spawnTrailDot(x, y) {
    const now = performance.now();
    if (now - lastTrail < 35) return;
    lastTrail = now;
    const p = document.createElement("div");
    p.className = "cursor-trail-dot";
    p.style.left = x + "px";
    p.style.top = y + "px";
    document.body.appendChild(p);
    if (window.gsap) {
      gsap.to(p, {
        opacity: 0, scale: 0.2, duration: 0.6, ease: "power2.out",
        onComplete: () => p.remove()
      });
    } else {
      setTimeout(() => p.remove(), 500);
    }
  }

  // Ripple on click
  document.addEventListener("mousedown", (e) => {
    const ripple = document.createElement("div");
    ripple.style.position = "fixed";
    ripple.style.left = e.clientX + "px";
    ripple.style.top = e.clientY + "px";
    ripple.style.width = "8px";
    ripple.style.height = "8px";
    ripple.style.borderRadius = "50%";
    ripple.style.border = "1px solid var(--accent)";
    ripple.style.transform = "translate(-50%, -50%)";
    ripple.style.pointerEvents = "none";
    ripple.style.zIndex = "9999";
    document.body.appendChild(ripple);
    if (window.gsap) {
      gsap.to(ripple, {
        width: 60, height: 60, opacity: 0, duration: 0.6, ease: "power2.out",
        onComplete: () => ripple.remove()
      });
    } else {
      setTimeout(() => ripple.remove(), 600);
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Tab") document.body.style.cursor = "auto";
  });
})();