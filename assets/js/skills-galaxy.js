/**
 * Renders PORTFOLIO_DATA.skills as a floating galaxy of glowing nodes on
 * a 2D canvas (chosen over a heavier Three.js scene for this many labels —
 * crisp text at any zoom, and much cheaper to render continuously).
 */
(function () {
  const CATEGORY_COLORS = {
    core: "#38BDF8",
    analytics: "#06B6D4",
    ml: "#7C3AED",
    dev: "#B794F6",
    tools: "#F472B6"
  };
  const CATEGORY_LABELS = {
    core: "Data Core",
    analytics: "Analytics & BI",
    ml: "Machine Learning",
    dev: "Development",
    tools: "Tools & Infra"
  };

  function init() {
    const wrap = document.querySelector(".galaxy-wrap");
    const canvas = document.getElementById("galaxy-canvas");
    const tooltip = document.getElementById("galaxy-tooltip");
    const legend = document.getElementById("galaxy-legend");
    if (!wrap || !canvas || typeof PORTFOLIO_DATA === "undefined") return;

    const ctx = canvas.getContext("2d");
    const skills = PORTFOLIO_DATA.skills;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Build legend
    const usedCategories = [...new Set(skills.map((s) => s.category))];
    legend.innerHTML = usedCategories.map((c) =>
      `<div class="galaxy-legend-item"><span class="galaxy-legend-dot" style="background:${CATEGORY_COLORS[c]}"></span>${CATEGORY_LABELS[c] || c}</div>`
    ).join("");

    let width, height, dpr;
    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = wrap.clientWidth;
      height = wrap.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    // Cluster centers per category, arranged in a loose ring
    const clusterCenters = {};
    usedCategories.forEach((cat, i) => {
      const angle = (i / usedCategories.length) * Math.PI * 2;
      clusterCenters[cat] = {
        x: 0.5 + Math.cos(angle) * 0.3,
        y: 0.5 + Math.sin(angle) * 0.3
      };
    });

    const nodes = skills.map((skill) => {
      const center = clusterCenters[skill.category] || { x: 0.5, y: 0.5 };
      const jitterR = 0.16 + Math.random() * 0.12;
      const jitterA = Math.random() * Math.PI * 2;
      return {
        skill,
        baseX: (center.x + Math.cos(jitterA) * jitterR) * width,
        baseY: (center.y + Math.sin(jitterA) * jitterR) * height,
        x: 0, y: 0,
        radius: 4 + (skill.level / 100) * 6,
        phase: Math.random() * Math.PI * 2,
        speed: 0.4 + Math.random() * 0.4,
        hover: 0
      };
    });
    nodes.forEach((n) => { n.x = n.baseX; n.y = n.baseY; });

    let mouseX = -9999, mouseY = -9999;
    let hoveredNode = null;

    canvas.addEventListener("mousemove", (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    });
    canvas.addEventListener("mouseleave", () => {
      mouseX = -9999; mouseY = -9999;
      hoveredNode = null;
      tooltip.style.opacity = 0;
    });

    function drawConnections() {
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          if (a.skill.category !== b.skill.category) continue;
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 90) {
            ctx.strokeStyle = CATEGORY_COLORS[a.skill.category] + "22";
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
    }

    function draw(t) {
      ctx.clearRect(0, 0, width, height);
      drawConnections();

      hoveredNode = null;
      let closestDist = 26;

      nodes.forEach((n) => {
        if (!reducedMotion) {
          n.x = n.baseX + Math.sin(t * n.speed + n.phase) * 8;
          n.y = n.baseY + Math.cos(t * n.speed * 0.8 + n.phase) * 8;
        } else {
          n.x = n.baseX; n.y = n.baseY;
        }

        const dx = n.x - mouseX, dy = n.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < closestDist) { closestDist = dist; hoveredNode = n; }
      });

      nodes.forEach((n) => {
        const isHover = n === hoveredNode;
        n.hover += ((isHover ? 1 : 0) - n.hover) * 0.15;
        const r = n.radius + n.hover * 5;
        const color = CATEGORY_COLORS[n.skill.category] || "#38BDF8";

        const glowR = r * (3 + n.hover * 1.5);
        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, glowR);
        grad.addColorStop(0, color + "aa");
        grad.addColorStop(1, color + "00");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(n.x, n.y, glowR, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fill();

        if (n.hover > 0.4) {
          ctx.font = "600 11px Inter, sans-serif";
          ctx.fillStyle = "rgba(255,255,255," + n.hover + ")";
          ctx.textAlign = "center";
          ctx.fillText(n.skill.name, n.x, n.y - r - 10);
        }
      });

      if (hoveredNode) {
        tooltip.style.opacity = 1;
        tooltip.style.left = hoveredNode.x + "px";
        tooltip.style.top = hoveredNode.y + "px";
        tooltip.textContent = `${hoveredNode.skill.name} — ${hoveredNode.skill.level}%`;
      } else {
        tooltip.style.opacity = 0;
      }

      requestAnimationFrame(draw);
    }
    requestAnimationFrame(draw);
  }

  window.addEventListener("siteReady", init, { once: true });
})();
