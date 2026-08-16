/**
 * Loading screen controller.
 * 1. Simulates asset loading with a progress bar + percentage + status ticks.
 * 2. On completion, plays a short "digital tunnel" canvas animation
 *    (rushing lines toward the viewer) to simulate flying into the site.
 * 3. Reveals the main content and kicks off the hero entrance timeline.
 */
(function () {
  const loader = document.getElementById("loader");
  const barFill = document.getElementById("loader-bar-fill");
  const percentEl = document.getElementById("loader-percent");
  const statusEl = document.getElementById("loader-status");
  const tunnelCanvas = document.getElementById("tunnel-canvas");

  const statuses = [
    "Menginisialisasi antarmuka…",
    "Memuat aset visual…",
    "Menghubungkan modul data…",
    "Menyusun antarmuka 3D…",
    "Siap."
  ];

  let progress = 0;
  let statusIndex = 0;
  statusEl.textContent = statuses[0];

  const progressInterval = setInterval(() => {
    // Non-linear increment for a more organic loading feel
    const increment = progress < 70 ? Math.random() * 9 + 3 : Math.random() * 3 + 1;
    progress = Math.min(100, progress + increment);
    barFill.style.width = progress + "%";
    percentEl.textContent = Math.floor(progress) + "%";

    const newStatusIndex = Math.min(statuses.length - 1, Math.floor((progress / 100) * statuses.length));
    if (newStatusIndex !== statusIndex) {
      statusIndex = newStatusIndex;
      statusEl.textContent = statuses[statusIndex];
    }

    if (progress >= 100) {
      clearInterval(progressInterval);
      setTimeout(playTunnelAndReveal, 350);
    }
  }, 140);

  function playTunnelAndReveal() {
    document.body.style.overflow = "hidden";
    runTunnelAnimation(() => {
      if (window.gsap) {
        gsap.to(loader, {
          opacity: 0, duration: 0.6, ease: "power2.out",
          onComplete: finishReveal
        });
      } else {
        loader.style.transition = "opacity 0.5s";
        loader.style.opacity = "0";
        setTimeout(finishReveal, 500);
      }
    });
  }

  function finishReveal() {
    loader.style.display = "none";
    tunnelCanvas.style.display = "none";
    document.body.style.overflow = "";
    document.body.classList.add("loaded");
    window.dispatchEvent(new CustomEvent("siteReady"));
  }

  function runTunnelAnimation(onDone) {
    tunnelCanvas.style.display = "block";
    const ctx = tunnelCanvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    function resize() {
      tunnelCanvas.width = window.innerWidth * dpr;
      tunnelCanvas.height = window.innerHeight * dpr;
      tunnelCanvas.style.width = window.innerWidth + "px";
      tunnelCanvas.style.height = window.innerHeight + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();

    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const lineCount = 90;
    const lines = Array.from({ length: lineCount }, (_, i) => ({
      angle: (i / lineCount) * Math.PI * 2,
      z: Math.random() * 1
    }));

    const duration = 900;
    const start = performance.now();

    function frame(now) {
      const t = Math.min(1, (now - start) / duration);
      const speed = 1 + t * t * 14;
      ctx.fillStyle = "rgba(5, 8, 22, " + (0.35 - t * 0.15) + ")";
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      lines.forEach((line) => {
        line.z += 0.015 * speed;
        if (line.z > 1) line.z -= 1;
        const depth = line.z;
        const radiusStart = depth * Math.max(cx, cy) * 1.4;
        const radiusEnd = radiusStart + 40 + depth * 60;
        const x1 = cx + Math.cos(line.angle) * radiusStart;
        const y1 = cy + Math.sin(line.angle) * radiusStart;
        const x2 = cx + Math.cos(line.angle) * radiusEnd;
        const y2 = cy + Math.sin(line.angle) * radiusEnd;
        const alpha = Math.min(1, depth * 1.4) * (1 - t * 0.3);
        const hue = depth > 0.5 ? "56,189,248" : "124,58,237";
        ctx.strokeStyle = `rgba(${hue}, ${alpha})`;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      });

      if (t < 1) {
        requestAnimationFrame(frame);
      } else {
        onDone();
      }
    }
    requestAnimationFrame(frame);
  }

  // Safety net: never trap the user behind the loader
  window.addEventListener("load", () => {
    setTimeout(() => {
      if (progress < 100) {
        progress = 100;
        barFill.style.width = "100%";
        percentEl.textContent = "100%";
      }
    }, 6000);
  });
})();
