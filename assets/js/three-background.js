/**
 * Ambient Three.js background rendered behind the entire page.
 * Lazily initialized after the loader finishes so first paint stays light.
 * Respects prefers-reduced-motion by rendering a single static frame.
 */
(function () {
  let initialized = false;
  function init() {
    if (initialized) return;
    if (typeof THREE === "undefined") return;
    const canvas = document.getElementById("bg-canvas");
    if (!canvas) return;
    initialized = true;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050816, 0.055);

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 12;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    // ---------------- Lighting ----------------
    const ambient = new THREE.AmbientLight(0x7c3aed, 0.6);
    scene.add(ambient);
    const point1 = new THREE.PointLight(0x38bdf8, 2, 25);
    point1.position.set(6, 4, 4);
    scene.add(point1);
    const point2 = new THREE.PointLight(0x7c3aed, 1.5, 25);
    point2.position.set(-6, -3, 2);
    scene.add(point2);

    // ---------------- Starfield ----------------
    const starGeo = new THREE.BufferGeometry();
    const starCount = 900;
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 60;
      starPos[i * 3 + 1] = (Math.random() - 0.5) * 60;
      starPos[i * 3 + 2] = (Math.random() - 0.5) * 60;
    }
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.045, transparent: true, opacity: 0.7 });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // ---------------- Floating particles (closer, colored) ----------------
    const particleGeo = new THREE.BufferGeometry();
    const particleCount = 220;
    const particlePos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      particlePos[i * 3] = (Math.random() - 0.5) * 24;
      particlePos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      particlePos[i * 3 + 2] = (Math.random() - 0.5) * 16;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({ color: 0x38bdf8, size: 0.05, transparent: true, opacity: 0.85 });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // ---------------- Wireframe sphere ----------------
    const sphereGeo = new THREE.IcosahedronGeometry(3.2, 2);
    const sphereMat = new THREE.MeshBasicMaterial({ color: 0x7c3aed, wireframe: true, transparent: true, opacity: 0.35 });
    const sphere = new THREE.Mesh(sphereGeo, sphereMat);
    sphere.position.set(6, 1.5, -6);
    scene.add(sphere);

    // ---------------- Floating cubes ----------------
    const cubes = [];
    for (let i = 0; i < 5; i++) {
      const size = 0.3 + Math.random() * 0.5;
      const cubeGeo = new THREE.BoxGeometry(size, size, size);
      const cubeMat = new THREE.MeshBasicMaterial({ color: 0x06b6d4, wireframe: true, transparent: true, opacity: 0.5 });
      const cube = new THREE.Mesh(cubeGeo, cubeMat);
      cube.position.set((Math.random() - 0.5) * 16, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10 - 4);
      cube.userData.speed = 0.2 + Math.random() * 0.3;
      cube.userData.offset = Math.random() * Math.PI * 2;
      scene.add(cube);
      cubes.push(cube);
    }

    // ---------------- Digital network (connected nodes) ----------------
    const nodeCount = 26;
    const nodes = [];
    const networkGroup = new THREE.Group();
    for (let i = 0; i < nodeCount; i++) {
      nodes.push(new THREE.Vector3((Math.random() - 0.5) * 14, (Math.random() - 0.5) * 8, (Math.random() - 0.5) * 8 - 8));
    }
    const nodeGeo = new THREE.BufferGeometry().setFromPoints(nodes);
    const nodeMat = new THREE.PointsMaterial({ color: 0x38bdf8, size: 0.07 });
    networkGroup.add(new THREE.Points(nodeGeo, nodeMat));

    const lineMat = new THREE.LineBasicMaterial({ color: 0x7c3aed, transparent: true, opacity: 0.18 });
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (nodes[i].distanceTo(nodes[j]) < 3.4) {
          const geo = new THREE.BufferGeometry().setFromPoints([nodes[i], nodes[j]]);
          networkGroup.add(new THREE.Line(geo, lineMat));
        }
      }
    }
    scene.add(networkGroup);

    // ---------------- Mouse parallax ----------------
    let targetX = 0, targetY = 0, curX = 0, curY = 0;
    window.addEventListener("mousemove", (e) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    const clock = new THREE.Clock();

    function renderStatic() {
      renderer.render(scene, camera);
    }

    if (reducedMotion) {
      renderStatic();
      return;
    }

    function animate() {
      requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      curX += (targetX - curX) * 0.03;
      curY += (targetY - curY) * 0.03;
      camera.position.x = curX * 1.4;
      camera.position.y = -curY * 1.0;
      camera.lookAt(0, 0, 0);

      stars.rotation.y = t * 0.01;
      particles.rotation.y = t * 0.015;
      particles.rotation.x = t * 0.008;

      sphere.rotation.y = t * 0.08;
      sphere.rotation.x = t * 0.05;

      cubes.forEach((cube) => {
        cube.rotation.x = t * cube.userData.speed;
        cube.rotation.y = t * cube.userData.speed * 0.7;
        cube.position.y += Math.sin(t + cube.userData.offset) * 0.002;
      });

      networkGroup.rotation.y = t * 0.02;

      point1.position.x = Math.sin(t * 0.3) * 6;
      point2.position.x = Math.cos(t * 0.3) * -6;

      renderer.render(scene, camera);
    }
    animate();
  }

  window.addEventListener("siteReady", init, { once: true });
  // Fallback in case siteReady never fires (e.g. loader skipped)
  window.addEventListener("load", () => setTimeout(init, 4000));
})();
