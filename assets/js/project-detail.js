/**
 * Renders a single project's full case-study content into #detail-root
 * based on the ?id= query parameter, matched against PORTFOLIO_DATA.projects.
 */
(function () {
  const D = typeof PORTFOLIO_DATA !== "undefined" ? PORTFOLIO_DATA : null;
  const root = document.getElementById("detail-root");
  if (!D || !root) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const project = D.projects.find((p) => p.id === id) || D.projects[0];

  // Initialize theme from localStorage
  function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    let theme = savedTheme;
    if (!savedTheme) {
      theme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
      localStorage.setItem('theme', theme);
    }
    document.documentElement.setAttribute('data-theme', theme);
    const icon = document.getElementById('theme-icon');
    if (icon) {
      icon.className = theme === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
    }
  }

  // Initialize language
  function initLanguage() {
    const savedLang = localStorage.getItem('language') || 'id';
    document.documentElement.setAttribute('data-lang', savedLang);
    const label = document.getElementById('lang-label');
    if (label) label.textContent = savedLang.toUpperCase();
    return savedLang;
  }

  document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    const lang = initLanguage();
    
    if (!project) {
      renderNotFound(lang);
    } else {
      renderProject(project, lang);
    }
    
    document.getElementById("current-year").textContent = new Date().getFullYear();
    const footerSocial = document.getElementById("footer-social");
    if (footerSocial) {
      footerSocial.innerHTML = `
        <a href="${D.profile.social.github}" target="_blank" rel="noopener" aria-label="GitHub"><i class="fa-brands fa-github"></i></a>
        <a href="${D.profile.social.linkedin}" target="_blank" rel="noopener" aria-label="LinkedIn"><i class="fa-brands fa-linkedin"></i></a>
        <a href="mailto:${D.profile.email}" aria-label="Email"><i class="fa-solid fa-envelope"></i></a>`;
    }
    document.getElementById("back-to-top")?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

    // Theme toggle on detail page
    const toggle = document.getElementById('theme-toggle');
    const icon = document.getElementById('theme-icon');
    if (toggle && icon) {
      toggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        icon.className = newTheme === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
      });
    }

    // Language toggle on detail page
    const langToggle = document.getElementById('lang-toggle');
    const langLabel = document.getElementById('lang-label');
    if (langToggle && langLabel) {
      langToggle.addEventListener('click', () => {
        const newLang = langLabel.textContent === 'ID' ? 'EN' : 'ID';
        langLabel.textContent = newLang;
        localStorage.setItem('language', newLang.toLowerCase());
        document.documentElement.setAttribute('data-lang', newLang.toLowerCase());
        if (project) renderProject(project, newLang.toLowerCase());
      });
    }
  });

  window.dispatchEvent(new CustomEvent("siteReady"));

  function renderNotFound(lang) {
    root.innerHTML = `
      <div class="not-found">
        <h2>${lang === 'id' ? 'Project tidak ditemukan' : 'Project not found'}</h2>
        <p>${lang === 'id' ? 'Project yang Anda cari mungkin sudah dipindahkan atau tautannya salah.' : 'The project you are looking for may have been moved or the link is incorrect.'}</p>
        <a href="index.html#projects" class="btn btn-primary">${lang === 'id' ? 'Kembali ke Daftar Project' : 'Back to Projects'}</a>
      </div>`;
  }

  function renderProject(p, lang) {
    const isId = lang === 'id';
    const d = p.detail;
    const galleryImages = d.gallery || [];
    
    document.title = isId ? `${p.name_id || p.name} — Detail Project` : `${p.name} — Project Detail`;
    document.getElementById("meta-desc")?.setAttribute("content", isId ? p.shortDescription : (p.shortDescription_en || p.shortDescription));
    document.getElementById("og-title")?.setAttribute("content", isId ? p.name_id || p.name : p.name);
    document.getElementById("og-desc")?.setAttribute("content", isId ? p.shortDescription : (p.shortDescription_en || p.shortDescription));

    const statusText = isId ? p.status : (p.status_en || p.status);
    
    root.innerHTML = `
      <div class="detail-banner reveal-in"><i class="fa-solid fa-diagram-project"></i></div>

      <div class="detail-head">
        <div>
          <span class="project-category">${p.category} · ${p.date}</span>
          <h1>${isId ? (p.name_id || p.name) : p.name}</h1>
        </div>
        <span class="project-status">${statusText}</span>
      </div>

      <div class="detail-tech">${p.technologies.map((t) => `<span class="tag">${t}</span>`).join("")}</div>

      <div class="detail-links">
        ${p.links.demo ? `<a href="${p.links.demo}" target="_blank" rel="noopener" class="btn btn-ghost"><i class="fa-solid fa-arrow-up-right-from-square"></i> ${isId ? 'Live Demo' : 'Live Demo'}</a>` : ""}
        ${p.links.github ? `<a href="${p.links.github}" target="_blank" rel="noopener" class="btn btn-ghost"><i class="fa-brands fa-github"></i> ${isId ? 'Repository GitHub' : 'GitHub Repository'}</a>` : ""}
        <a href="index.html#projects" class="btn btn-ghost"><i class="fa-solid fa-arrow-left"></i> ${isId ? 'Kembali' : 'Back'}</a>
      </div>

      <div class="detail-layout">
        <div class="detail-main-col">

          <!-- Galeri Foto -->
          <div class="detail-block" id="gallery-section">
            <h2>${isId ? 'Galeri Project' : 'Project Gallery'}</h2>
            <div class="gallery-container">
              <button class="gallery-nav gallery-prev" aria-label="${isId ? 'Foto sebelumnya' : 'Previous photo'}">
                <i class="fa-solid fa-chevron-left"></i>
              </button>
              <div class="gallery-viewport">
                <div class="gallery-track" id="gallery-track">
                  ${galleryImages.length > 0 ? 
                    galleryImages.map((img, i) => `
                      <div class="gallery-slide">
                        <img src="${img}" alt="${p.name} - ${isId ? 'Foto' : 'Photo'} ${i + 1}" loading="lazy" onerror="this.style.display='none'">
                      </div>
                    `).join('') :
                    `<div class="gallery-slide">
                      <div class="gallery-placeholder">
                        <i class="fa-solid fa-image"></i>
                        <p>${isId ? 'Tidak ada foto galeri' : 'No gallery photos'}</p>
                      </div>
                    </div>`
                  }
                </div>
              </div>
              <button class="gallery-nav gallery-next" aria-label="${isId ? 'Foto berikutnya' : 'Next photo'}">
                <i class="fa-solid fa-chevron-right"></i>
              </button>
            </div>
            <div class="gallery-dots" id="gallery-dots"></div>
          </div>

          <div class="detail-block"><h2>${isId ? 'Ringkasan' : 'Summary'}</h2><p>${isId ? d.summary : (d.summary_en || d.summary)}</p></div>
          <div class="detail-block"><h2>${isId ? 'Latar Belakang' : 'Background'}</h2><p>${isId ? d.background : (d.background_en || d.background)}</p></div>
          <div class="detail-block"><h2>${isId ? 'Permasalahan' : 'Problem'}</h2><p>${isId ? d.problem : (d.problem_en || d.problem)}</p></div>
          <div class="detail-block"><h2>${isId ? 'Tujuan' : 'Goal'}</h2><p>${isId ? d.goal : (d.goal_en || d.goal)}</p></div>

          <div class="detail-block">
            <h2>${isId ? 'Alur Kerja (Workflow)' : 'Workflow'}</h2>
            <ul>${(isId ? d.workflow : (d.workflow_en || d.workflow)).map((w) => `<li>${w}</li>`).join("")}</ul>
          </div>

          ${p.links.video ? `
          <div class="detail-block">
            <h2>${isId ? 'Video Demo' : 'Video Demo'}</h2>
            <div class="video-embed">
              <iframe src="${p.links.video}" title="Video demo ${p.name}" loading="lazy" allowfullscreen></iframe>
            </div>
          </div>` : ""}

          <div class="detail-block">
            <h2>${isId ? 'Fitur Utama' : 'Key Features'}</h2>
            <ul>${(isId ? d.features : (d.features_en || d.features)).map((f) => `<li>${f}</li>`).join("")}</ul>
          </div>

          <div class="detail-block"><h2>${isId ? 'Tantangan' : 'Challenges'}</h2><p>${isId ? d.challenges : (d.challenges_en || d.challenges)}</p></div>
          <div class="detail-block"><h2>${isId ? 'Solusi' : 'Solution'}</h2><p>${isId ? d.solution : (d.solution_en || d.solution)}</p></div>
          <div class="detail-block"><h2>${isId ? 'Hasil' : 'Results'}</h2><p>${isId ? d.results : (d.results_en || d.results)}</p></div>
          <div class="detail-block"><h2>${isId ? 'Insight & Pembelajaran' : 'Insight & Learning'}</h2><p>${isId ? d.insight : (d.insight_en || d.insight)}</p></div>

        </div>

        <aside class="detail-sidebar">
          <div class="glass">
            <h3>${isId ? 'Ringkasan Cepat' : 'Quick Summary'}</h3>
            <div class="detail-sidebar-row"><span>${isId ? 'Kategori' : 'Category'}</span><span>${p.category}</span></div>
            <div class="detail-sidebar-row"><span>${isId ? 'Tahun' : 'Year'}</span><span>${p.date}</span></div>
            <div class="detail-sidebar-row"><span>${isId ? 'Status' : 'Status'}</span><span>${statusText}</span></div>
            <div class="detail-sidebar-row"><span>${isId ? 'Role' : 'Role'}</span><span style="text-align:right;">${isId ? d.role : (d.role_en || d.role)}</span></div>
          </div>
          <div class="glass">
            <h3>${isId ? 'Teknologi' : 'Technologies'}</h3>
            <div class="project-tech">${p.technologies.map((t) => `<span>${t}</span>`).join("")}</div>
          </div>
        </aside>
      </div>
    `;

    initGalleryCarousel();

    if (window.gsap) {
      gsap.from(".detail-block", { opacity: 0, y: 24, duration: 0.7, stagger: 0.08, ease: "power2.out" });
    }
  }

  function initGalleryCarousel() {
    const container = document.querySelector('.gallery-container');
    if (!container) return;

    const track = document.getElementById('gallery-track');
    const slides = track.querySelectorAll('.gallery-slide');
    const prevBtn = container.querySelector('.gallery-prev');
    const nextBtn = container.querySelector('.gallery-next');
    const dots = document.getElementById('gallery-dots');

    if (slides.length <= 1) {
      if (prevBtn) prevBtn.style.display = 'none';
      if (nextBtn) nextBtn.style.display = 'none';
      if (dots) dots.style.display = 'none';
      return;
    }

    let currentIndex = 0;

    function updateGallery() {
      const totalSlides = slides.length;
      const slideWidth = track.parentElement.offsetWidth;
      const offset = currentIndex * slideWidth;
      track.style.transform = `translateX(-${offset}px)`;

      if (dots) {
        dots.innerHTML = Array.from({ length: totalSlides }, (_, i) => 
          `<button class="dot ${i === currentIndex ? 'active' : ''}" data-index="${i}" aria-label="Foto ${i + 1}"></button>`
        ).join('');
        
        dots.querySelectorAll('.dot').forEach(btn => {
          btn.addEventListener('click', () => {
            currentIndex = parseInt(btn.dataset.index);
            updateGallery();
          });
        });
      }

      if (prevBtn) prevBtn.style.display = currentIndex > 0 ? 'flex' : 'none';
      if (nextBtn) nextBtn.style.display = currentIndex < totalSlides - 1 ? 'flex' : 'none';
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
          currentIndex--;
          updateGallery();
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (currentIndex < slides.length - 1) {
          currentIndex++;
          updateGallery();
        }
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft' && prevBtn && prevBtn.style.display !== 'none') {
        prevBtn.click();
      } else if (e.key === 'ArrowRight' && nextBtn && nextBtn.style.display !== 'none') {
        nextBtn.click();
      }
    });

    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        updateGallery();
      }, 200);
    });

    setTimeout(updateGallery, 100);
  }
})();