/**
 * Project Detail Page
 * Menampilkan detail project berdasarkan ID dari URL
 */
(function () {
  const D = typeof PORTFOLIO_DATA !== "undefined" ? PORTFOLIO_DATA : null;
  if (!D) {
    document.getElementById('detail-root').innerHTML = '<div class="detail-error">❌ Data portfolio tidak ditemukan.</div>';
    return;
  }

  // ============================================================
  // GET PROJECT ID FROM URL
  // ============================================================
  function getProjectId() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
  }

  // ============================================================
  // LANGUAGE SUPPORT
  // ============================================================
  let currentLang = 'id';

  function getLang() {
    return currentLang;
  }

  function setLang(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);
    document.documentElement.setAttribute('data-lang', lang);
    const langLabel = document.getElementById('lang-label');
    if (langLabel) langLabel.textContent = lang.toUpperCase();
    renderDetail();
  }

  function initLanguage() {
    const savedLang = localStorage.getItem('language') || 'id';
    currentLang = savedLang;
    document.documentElement.setAttribute('data-lang', savedLang);
    const langLabel = document.getElementById('lang-label');
    if (langLabel) langLabel.textContent = savedLang.toUpperCase();
    
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
      langToggle.addEventListener('click', () => {
        const newLang = currentLang === 'id' ? 'en' : 'id';
        setLang(newLang);
      });
    }
  }

  // ============================================================
  // RENDER DETAIL
  // ============================================================
  function renderDetail() {
    const root = document.getElementById('detail-root');
    const projectId = getProjectId();
    
    if (!projectId) {
      root.innerHTML = `
        <div class="detail-error">
          <i class="fa-solid fa-triangle-exclamation"></i>
          <h2>ID Project tidak ditemukan</h2>
          <p>Silakan kembali ke halaman utama dan pilih project.</p>
          <a href="index.html#projects" class="btn btn-primary">Kembali ke Project</a>
        </div>
      `;
      return;
    }

    const project = D.projects.find(p => p.id === projectId);
    
    if (!project) {
      root.innerHTML = `
        <div class="detail-error">
          <i class="fa-solid fa-circle-xmark"></i>
          <h2>Project tidak ditemukan</h2>
          <p>Project dengan ID "${projectId}" tidak tersedia.</p>
          <a href="index.html#projects" class="btn btn-primary">Kembali ke Project</a>
        </div>
      `;
      return;
    }

    const lang = getLang();
    const isId = lang === 'id';
    
    // Data dengan bahasa
    const name = isId ? (project.name_id || project.name) : project.name;
    const desc = isId ? project.shortDescription : (project.shortDescription_en || project.shortDescription);
    const status = isId ? project.status : (project.status_en || project.status);
    const summary = isId ? project.detail.summary : project.detail.summary_en;
    const background = isId ? project.detail.background : project.detail.background_en;
    const problem = isId ? project.detail.problem : project.detail.problem_en;
    const goal = isId ? project.detail.goal : project.detail.goal_en;
    const workflow = isId ? project.detail.workflow : project.detail.workflow_en;
    const features = isId ? project.detail.features : project.detail.features_en;
    const challenges = isId ? project.detail.challenges : project.detail.challenges_en;
    const solution = isId ? project.detail.solution : project.detail.solution_en;
    const role = isId ? project.detail.role : project.detail.role_en;
    const results = isId ? project.detail.results : project.detail.results_en;
    const insight = isId ? project.detail.insight : project.detail.insight_en;
    const gallery = project.detail.gallery || [];

    // ============================================================
    // BUILD HTML
    // ============================================================
    let html = `
      <!-- Back Button -->
      <div class="detail-back">
        <a href="index.html#projects" class="btn btn-ghost">
          <i class="fa-solid fa-arrow-left"></i> ${isId ? 'Kembali ke Project' : 'Back to Projects'}
        </a>
      </div>

      <!-- Header -->
      <div class="detail-header glass">
        <div class="detail-header-content">
          <div class="detail-meta">
            <span class="project-category">${project.category}</span>
            <span class="project-status">${status}</span>
            <span class="project-date">${project.date}</span>
          </div>
          <h1 class="detail-title">${name}</h1>
          <p class="detail-desc">${desc}</p>
          <div class="detail-tech">
            ${project.technologies.map(t => `<span class="tag">${t}</span>`).join('')}
          </div>
        </div>
      </div>

      <!-- ====== THUMBNAIL - LEBIH KECIL ====== -->
      <div class="detail-thumbnail glass">
        ${project.thumbnail ? 
          `<img src="${project.thumbnail}" alt="${name}" class="detail-thumb-img" onerror="this.style.display='none';this.parentElement.innerHTML='<div class=\\'detail-thumb-placeholder\\'><i class=\\'fa-solid fa-image\\'></i><p>${isId ? 'Thumbnail tidak tersedia' : 'Thumbnail not available'}</p></div>'">` :
          `<div class="detail-thumb-placeholder"><i class="fa-solid fa-image"></i><p>${isId ? 'Thumbnail tidak tersedia' : 'Thumbnail not available'}</p></div>`
        }
      </div>

      <!-- Content Grid -->
      <div class="detail-grid">
        <!-- Main Content -->
        <div class="detail-content">
          <!-- Summary -->
          <div class="detail-section glass">
            <h2><i class="fa-solid fa-list-check"></i> ${isId ? 'Ringkasan' : 'Summary'}</h2>
            <p>${summary}</p>
          </div>

          <!-- Background & Problem -->
          <div class="detail-section glass">
            <h2><i class="fa-solid fa-circle-info"></i> ${isId ? 'Latar Belakang & Masalah' : 'Background & Problem'}</h2>
            <p><strong>${isId ? 'Latar Belakang:' : 'Background:'}</strong> ${background}</p>
            <p><strong>${isId ? 'Masalah:' : 'Problem:'}</strong> ${problem}</p>
            <p><strong>${isId ? 'Tujuan:' : 'Goal:'}</strong> ${goal}</p>
          </div>

          <!-- Workflow -->
          <div class="detail-section glass">
            <h2><i class="fa-solid fa-diagram-project"></i> ${isId ? 'Alur Kerja' : 'Workflow'}</h2>
            <ul class="detail-list">
              ${workflow.map((item, i) => `
                <li>
                  <span class="step-number">${String(i + 1).padStart(2, '0')}</span>
                  <span>${item}</span>
                </li>
              `).join('')}
            </ul>
          </div>

          <!-- Features -->
          <div class="detail-section glass">
            <h2><i class="fa-solid fa-star"></i> ${isId ? 'Fitur Utama' : 'Key Features'}</h2>
            <ul class="detail-features">
              ${features.map(f => `<li><i class="fa-solid fa-check-circle"></i> ${f}</li>`).join('')}
            </ul>
          </div>

          <!-- Challenges & Solution -->
          <div class="detail-section glass">
            <h2><i class="fa-solid fa-lightbulb"></i> ${isId ? 'Tantangan & Solusi' : 'Challenges & Solution'}</h2>
            <p><strong>${isId ? 'Tantangan:' : 'Challenges:'}</strong> ${challenges}</p>
            <p><strong>${isId ? 'Solusi:' : 'Solution:'}</strong> ${solution}</p>
          </div>

          <!-- Role & Results -->
          <div class="detail-section glass">
            <h2><i class="fa-solid fa-user-gear"></i> ${isId ? 'Peran & Hasil' : 'Role & Results'}</h2>
            <p><strong>${isId ? 'Peran:' : 'Role:'}</strong> ${role}</p>
            <p><strong>${isId ? 'Hasil:' : 'Results:'}</strong> ${results}</p>
            <p><strong>${isId ? 'Pelajaran:' : 'Insight:'}</strong> ${insight}</p>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="detail-sidebar">
          <!-- Quick Info -->
          <div class="detail-sidebar-card glass">
            <h3><i class="fa-solid fa-circle-info"></i> ${isId ? 'Informasi Cepat' : 'Quick Info'}</h3>
            <div class="info-row">
              <span class="info-label">${isId ? 'Kategori' : 'Category'}</span>
              <span class="info-value">${project.category}</span>
            </div>
            <div class="info-row">
              <span class="info-label">${isId ? 'Status' : 'Status'}</span>
              <span class="info-value">${status}</span>
            </div>
            <div class="info-row">
              <span class="info-label">${isId ? 'Tanggal' : 'Date'}</span>
              <span class="info-value">${project.date}</span>
            </div>
            <div class="info-row">
              <span class="info-label">${isId ? 'Teknologi' : 'Technologies'}</span>
              <span class="info-value">${project.technologies.length}</span>
            </div>
          </div>

          <!-- Links -->
          ${project.links ? `
          <div class="detail-sidebar-card glass">
            <h3><i class="fa-solid fa-link"></i> ${isId ? 'Tautan' : 'Links'}</h3>
            ${project.links.demo ? `<a href="${project.links.demo}" target="_blank" rel="noopener" class="link-btn"><i class="fa-solid fa-arrow-up-right-from-square"></i> ${isId ? 'Demo Langsung' : 'Live Demo'}</a>` : ''}
            ${project.links.github ? `<a href="${project.links.github}" target="_blank" rel="noopener" class="link-btn"><i class="fa-brands fa-github"></i> GitHub</a>` : ''}
            ${project.links.video ? `<a href="${project.links.video}" target="_blank" rel="noopener" class="link-btn"><i class="fa-solid fa-video"></i> ${isId ? 'Video' : 'Video'}</a>` : ''}
            ${!project.links.demo && !project.links.github && !project.links.video ? `<p class="no-links">${isId ? 'Tidak ada tautan' : 'No links available'}</p>` : ''}
          </div>
          ` : ''}

          <!-- ====== GALLERY - HORIZONTAL SCROLL ====== -->
          ${gallery.length > 0 ? `
          <div class="detail-sidebar-card glass">
            <h3><i class="fa-solid fa-images"></i> ${isId ? 'Galeri' : 'Gallery'}</h3>
            <div class="detail-gallery-wrapper">
              <div class="detail-gallery">
                ${gallery.map(img => `
                  <a href="${img}" target="_blank" class="gallery-item" title="${isId ? 'Klik untuk perbesar' : 'Click to enlarge'}">
                    <img src="${img}" alt="${name}" loading="lazy" onerror="this.style.display='none'">
                  </a>
                `).join('')}
              </div>
              ${gallery.length > 3 ? `
                <div class="gallery-scroll-hint">
                  <i class="fa-solid fa-chevron-left"></i>
                  <span>${isId ? 'Geser untuk melihat lebih banyak' : 'Scroll to see more'}</span>
                  <i class="fa-solid fa-chevron-right"></i>
                </div>
              ` : ''}
            </div>
          </div>
          ` : ''}
        </div>
      </div>
    `;

    root.innerHTML = html;

    // Update title & meta
    document.title = `${name} — Sifa Mutiasya Hendayana Puteri`;
    const metaDesc = document.getElementById('meta-desc');
    const ogTitle = document.getElementById('og-title');
    const ogDesc = document.getElementById('og-desc');
    if (metaDesc) metaDesc.content = desc;
    if (ogTitle) ogTitle.content = name;
    if (ogDesc) ogDesc.content = desc;
  }

  // ============================================================
  // THEME TOGGLE
  // ============================================================
  function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    if (!themeToggle || !themeIcon) return;

    const savedTheme = localStorage.getItem('theme');
    let theme = savedTheme || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    document.documentElement.setAttribute('data-theme', theme);
    themeIcon.className = theme === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
    
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      themeIcon.className = next === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
    });
  }

  // ============================================================
  // BACK TO TOP
  // ============================================================
  function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;
    
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ============================================================
  // FOOTER YEAR
  // ============================================================
  function initFooterYear() {
    const el = document.getElementById('current-year');
    if (el) el.textContent = new Date().getFullYear();
  }

  // ============================================================
  // INIT
  // ============================================================
  document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initLanguage();
    renderDetail();
    initBackToTop();
    initFooterYear();

    // Handle back button from browser
    window.addEventListener('popstate', () => {
      renderDetail();
    });
  });

  // Re-render when language changes via URL (if needed)
  window.addEventListener('languageChanged', () => {
    renderDetail();
  });

})();