/**
 * Small, self-contained Three.js scene for the hero's right-hand visual:
 * a rotating "AI core" — layered wireframe icosahedron with orbiting rings.
 */
(function () {
  function init() {
    if (typeof THREE === "undefined") return;
    const canvas = document.getElementById("hero-canvas");
    if (!canvas) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    const width = canvas.clientWidth || 460;
    const height = canvas.clientHeight || 460;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);

    const group = new THREE.Group();
    scene.add(group);

    const coreGeo = new THREE.IcosahedronGeometry(1.7, 1);
    const coreMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true, transparent: true, opacity: 0.85 });
    const core = new THREE.Mesh(coreGeo, coreMat);
    group.add(core);

    const innerGeo = new THREE.IcosahedronGeometry(1.1, 0);
    const innerMat = new THREE.MeshBasicMaterial({ color: 0x7c3aed, wireframe: true, transparent: true, opacity: 0.6 });
    const inner = new THREE.Mesh(innerGeo, innerMat);
    group.add(inner);

    const rings = [];
    [2.4, 2.9, 3.4].forEach((r, i) => {
      const ringGeo = new THREE.TorusGeometry(r, 0.006, 8, 120);
      const ringMat = new THREE.MeshBasicMaterial({ color: i % 2 === 0 ? 0x06b6d4 : 0x7c3aed, transparent: true, opacity: 0.5 });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2 + i * 0.4;
      ring.rotation.y = i * 0.6;
      group.add(ring);
      rings.push(ring);
    });

    const particleGeo = new THREE.BufferGeometry();
    const count = 80;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 3.8 + Math.random() * 1.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const particleMat = new THREE.PointsMaterial({ color: 0x38bdf8, size: 0.035, transparent: true, opacity: 0.8 });
    group.add(new THREE.Points(particleGeo, particleMat));

    const light = new THREE.PointLight(0x38bdf8, 2, 20);
    light.position.set(3, 3, 5);
    scene.add(light);

    let targetX = 0, targetY = 0;
    canvas.parentElement.addEventListener("mousemove", (e) => {
      const rect = canvas.getBoundingClientRect();
      targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 0.6;
      targetY = ((e.clientY - rect.top) / rect.height - 0.5) * 0.6;
    });

    function resize() {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      if (!w || !h) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
    window.addEventListener("resize", resize);

    if (reducedMotion) {
      renderer.render(scene, camera);
      return;
    }

    const clock = new THREE.Clock();
    function animate() {
      requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      core.rotation.y = t * 0.35;
      core.rotation.x = t * 0.2;
      inner.rotation.y = -t * 0.5;
      rings.forEach((ring, i) => { ring.rotation.z = t * (0.15 + i * 0.07); });
      group.rotation.y += (targetX - group.rotation.y * 0.3) * 0.01;
      group.rotation.x += (targetY - group.rotation.x * 0.3) * 0.01;
      renderer.render(scene, camera);
    }
    animate();
  }

  window.addEventListener("siteReady", init, { once: true });
})();
