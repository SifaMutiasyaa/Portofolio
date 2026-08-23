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
  // CUSTOM CURSOR - BUILT IN (FIXED)
  // ============================================================
  function initCustomCursor() {
    // Skip on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      return;
    }

    // Create cursor elements if they don't exist
    let dot = document.getElementById('cursor-dot');
    let ring = document.getElementById('cursor-ring');

    if (!dot) {
      dot = document.createElement('div');
      dot.id = 'cursor-dot';
      dot.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #38BDF8;
        box-shadow: 0 0 16px 4px rgba(56, 189, 248, 0.6);
        pointer-events: none;
        z-index: 999999;
        transform: translate(-50%, -50%);
        will-change: transform;
        display: block;
        opacity: 1;
      `;
      document.body.appendChild(dot);
    }

    if (!ring) {
      ring = document.createElement('div');
      ring.id = 'cursor-ring';
      ring.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 2px solid rgba(56, 189, 248, 0.6);
        pointer-events: none;
        z-index: 999998;
        transform: translate(-50%, -50%);
        will-change: transform;
        display: block;
        opacity: 1;
        transition: width 0.3s ease, height 0.3s ease, border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
      `;
      document.body.appendChild(ring);
    }

    // Pastikan cursor selalu di atas
    dot.style.zIndex = '999999';
    ring.style.zIndex = '999998';

    // Hide default cursor
    document.body.style.cursor = 'none';

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    // Update dot position
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dot) {
        dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
        dot.style.opacity = '1';
      }
      if (ring) {
        ring.style.opacity = '1';
      }
    });

    // Smooth ring animation
    function animateRing() {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      if (ring) {
        ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      }
      requestAnimationFrame(animateRing);
    }
    animateRing();

    // Hover effect for interactive elements
    function applyHoverEffects() {
      const hoverElements = document.querySelectorAll('a, button, .btn, .gallery-item, .link-btn, .filter-btn, .carousel-nav, .project-card, .cert-card, .gallery-modal-close, .gallery-modal-nav');
      
      hoverElements.forEach(el => {
        // Skip if already has listener
        if (el.dataset.cursorHover === 'true') return;
        el.dataset.cursorHover = 'true';
        
        el.addEventListener('mouseenter', () => {
          if (ring) {
            ring.style.width = '70px';
            ring.style.height = '70px';
            ring.style.background = 'rgba(56, 189, 248, 0.12)';
            ring.style.borderColor = '#38BDF8';
            ring.style.boxShadow = '0 0 40px rgba(56, 189, 248, 0.4)';
          }
          if (dot) {
            dot.style.opacity = '0.4';
            dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%) scale(0.6)`;
          }
        });
        
        el.addEventListener('mouseleave', () => {
          if (ring) {
            ring.style.width = '40px';
            ring.style.height = '40px';
            ring.style.background = 'transparent';
            ring.style.borderColor = 'rgba(56, 189, 248, 0.6)';
            ring.style.boxShadow = 'none';
          }
          if (dot) {
            dot.style.opacity = '1';
            dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%) scale(1)`;
          }
        });
      });
    }

    applyHoverEffects();

    // Observer untuk elemen baru
    const observer = new MutationObserver(() => {
      applyHoverEffects();
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
      if (dot) dot.style.opacity = '0';
      if (ring) ring.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
      if (dot) dot.style.opacity = '1';
      if (ring) ring.style.opacity = '1';
    });

    // Show default cursor on Tab key (accessibility)
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.style.cursor = 'auto';
        if (dot) dot.style.display = 'none';
        if (ring) ring.style.display = 'none';
      }
    });

    document.addEventListener('keyup', (e) => {
      if (e.key === 'Tab') {
        setTimeout(() => {
          if (!document.activeElement || document.activeElement.tagName !== 'A') {
            document.body.style.cursor = 'none';
            if (dot) dot.style.display = 'block';
            if (ring) ring.style.display = 'block';
          }
        }, 100);
      }
    });

    console.log('✅ Custom cursor initialized with z-index fix');
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
  // GALLERY LIGHTBOX
  // ============================================================
  let galleryImages = [];
  let currentImageIndex = 0;

  function openGalleryModal(index) {
    const items = document.querySelectorAll('.gallery-item');
    galleryImages = [];
    items.forEach(item => {
      const img = item.querySelector('img');
      if (img && img.src) {
        galleryImages.push(img.src);
      }
    });
    
    if (galleryImages.length === 0) return;
    
    currentImageIndex = index;
    const modal = document.getElementById('gallery-modal');
    const modalImg = document.getElementById('gallery-modal-img');
    const counter = document.getElementById('gallery-modal-counter');
    
    if (modal && modalImg) {
      modalImg.src = galleryImages[currentImageIndex];
      if (counter) {
        counter.textContent = `${currentImageIndex + 1} / ${galleryImages.length}`;
      }
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      
      // PASTIKAN CURSOR TETAP MUNCUL
      const dot = document.getElementById('cursor-dot');
      const ring = document.getElementById('cursor-ring');
      if (dot) {
        dot.style.display = 'block';
        dot.style.opacity = '1';
        dot.style.zIndex = '999999';
      }
      if (ring) {
        ring.style.display = 'block';
        ring.style.opacity = '1';
        ring.style.zIndex = '999998';
      }
    }
  }

  function closeGalleryModal() {
    const modal = document.getElementById('gallery-modal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
      
      // PASTIKAN CURSOR TETAP MUNCUL
      const dot = document.getElementById('cursor-dot');
      const ring = document.getElementById('cursor-ring');
      if (dot) {
        dot.style.display = 'block';
        dot.style.opacity = '1';
      }
      if (ring) {
        ring.style.display = 'block';
        ring.style.opacity = '1';
      }
    }
  }

  function navigateGallery(direction) {
    if (galleryImages.length === 0) return;
    
    currentImageIndex = (currentImageIndex + direction + galleryImages.length) % galleryImages.length;
    const modalImg = document.getElementById('gallery-modal-img');
    const counter = document.getElementById('gallery-modal-counter');
    
    if (modalImg) {
      modalImg.src = galleryImages[currentImageIndex];
    }
    if (counter) {
      counter.textContent = `${currentImageIndex + 1} / ${galleryImages.length}`;
    }
  }

  // Keyboard navigation untuk lightbox
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeGalleryModal();
    }
    if (e.key === 'ArrowLeft') {
      navigateGallery(-1);
    }
    if (e.key === 'ArrowRight') {
      navigateGallery(1);
    }
  });

  // Expose function ke global untuk onclick di HTML
  window.openGalleryModal = openGalleryModal;
  window.closeGalleryModal = closeGalleryModal;
  window.navigateGallery = navigateGallery;

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

    let html = `
      <div class="detail-back">
        <a href="index.html#projects" class="btn btn-ghost">
          <i class="fa-solid fa-arrow-left"></i> ${isId ? 'Kembali ke Project' : 'Back to Projects'}
        </a>
      </div>

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

      <div class="detail-thumbnail glass">
        ${project.thumbnail ? 
          `<img src="${project.thumbnail}" alt="${name}" class="detail-thumb-img" onerror="this.style.display='none';this.parentElement.innerHTML='<div class=\\'detail-thumb-placeholder\\'><i class=\\'fa-solid fa-image\\'></i><p>${isId ? 'Thumbnail tidak tersedia' : 'Thumbnail not available'}</p></div>'">` :
          `<div class="detail-thumb-placeholder"><i class="fa-solid fa-image"></i><p>${isId ? 'Thumbnail tidak tersedia' : 'Thumbnail not available'}</p></div>`
        }
      </div>

      <div class="detail-grid">
        <div class="detail-content">
          <div class="detail-section glass">
            <h2><i class="fa-solid fa-list-check"></i> ${isId ? 'Ringkasan' : 'Summary'}</h2>
            <p>${summary}</p>
          </div>

          <div class="detail-section glass">
            <h2><i class="fa-solid fa-circle-info"></i> ${isId ? 'Latar Belakang & Masalah' : 'Background & Problem'}</h2>
            <p><strong>${isId ? 'Latar Belakang:' : 'Background:'}</strong> ${background}</p>
            <p><strong>${isId ? 'Masalah:' : 'Problem:'}</strong> ${problem}</p>
            <p><strong>${isId ? 'Tujuan:' : 'Goal:'}</strong> ${goal}</p>
          </div>

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

          <div class="detail-section glass">
            <h2><i class="fa-solid fa-star"></i> ${isId ? 'Fitur Utama' : 'Key Features'}</h2>
            <ul class="detail-features">
              ${features.map(f => `<li><i class="fa-solid fa-check-circle"></i> ${f}</li>`).join('')}
            </ul>
          </div>

          <div class="detail-section glass">
            <h2><i class="fa-solid fa-lightbulb"></i> ${isId ? 'Tantangan & Solusi' : 'Challenges & Solution'}</h2>
            <p><strong>${isId ? 'Tantangan:' : 'Challenges:'}</strong> ${challenges}</p>
            <p><strong>${isId ? 'Solusi:' : 'Solution:'}</strong> ${solution}</p>
          </div>

          <div class="detail-section glass">
            <h2><i class="fa-solid fa-user-gear"></i> ${isId ? 'Peran & Hasil' : 'Role & Results'}</h2>
            <p><strong>${isId ? 'Peran:' : 'Role:'}</strong> ${role}</p>
            <p><strong>${isId ? 'Hasil:' : 'Results:'}</strong> ${results}</p>
            <p><strong>${isId ? 'Pelajaran:' : 'Insight:'}</strong> ${insight}</p>
          </div>
        </div>

        <div class="detail-sidebar">
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

          ${project.links ? `
          <div class="detail-sidebar-card glass">
            <h3><i class="fa-solid fa-link"></i> ${isId ? 'Tautan' : 'Links'}</h3>
            ${project.links.demo ? `<a href="${project.links.demo}" target="_blank" rel="noopener" class="link-btn"><i class="fa-solid fa-arrow-up-right-from-square"></i> ${isId ? 'Demo Langsung' : 'Live Demo'}</a>` : ''}
            ${project.links.github ? `<a href="${project.links.github}" target="_blank" rel="noopener" class="link-btn"><i class="fa-brands fa-github"></i> GitHub</a>` : ''}
            ${project.links.video ? `<a href="${project.links.video}" target="_blank" rel="noopener" class="link-btn"><i class="fa-solid fa-video"></i> ${isId ? 'Video' : 'Video'}</a>` : ''}
            ${!project.links.demo && !project.links.github && !project.links.video ? `<p class="no-links">${isId ? 'Tidak ada tautan' : 'No links available'}</p>` : ''}
          </div>
          ` : ''}

          ${gallery.length > 0 ? `
          <div class="detail-sidebar-card glass">
            <h3><i class="fa-solid fa-images"></i> ${isId ? 'Galeri' : 'Gallery'}</h3>
            <div class="detail-gallery-wrapper">
              <div class="detail-gallery" id="detail-gallery-container">
                ${gallery.map((img, index) => `
                  <div class="gallery-item" data-index="${index}" onclick="openGalleryModal(${index})">
                    <img src="${img}" alt="${name} - ${index + 1}" loading="lazy" onerror="this.style.display='none'">
                  </div>
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

      <div id="gallery-modal" class="gallery-modal" onclick="closeGalleryModal()">
        <button class="gallery-modal-close" onclick="event.stopPropagation(); closeGalleryModal();">
          <i class="fa-solid fa-xmark"></i>
        </button>
        <button class="gallery-modal-nav gallery-modal-prev" onclick="event.stopPropagation(); navigateGallery(-1);">
          <i class="fa-solid fa-chevron-left"></i>
        </button>
        <button class="gallery-modal-nav gallery-modal-next" onclick="event.stopPropagation(); navigateGallery(1);">
          <i class="fa-solid fa-chevron-right"></i>
        </button>
        <div class="gallery-modal-content" onclick="event.stopPropagation();">
          <img id="gallery-modal-img" src="" alt="${name}">
          <p class="gallery-modal-counter" id="gallery-modal-counter"></p>
        </div>
      </div>
    `;

    root.innerHTML = html;

    document.title = `${name} — Sifa Mutiasya Hendayana Puteri`;
    const metaDesc = document.getElementById('meta-desc');
    const ogTitle = document.getElementById('og-title');
    const ogDesc = document.getElementById('og-desc');
    if (metaDesc) metaDesc.content = desc;
    if (ogTitle) ogTitle.content = name;
    if (ogDesc) ogDesc.content = desc;

    // Re-init cursor after render (for new elements)
    setTimeout(() => {
      // Re-apply hover effects for new elements
      const newElements = document.querySelectorAll('a, button, .btn, .gallery-item, .link-btn, .filter-btn, .carousel-nav, .project-card, .cert-card, .gallery-modal-close, .gallery-modal-nav');
      const ring = document.getElementById('cursor-ring');
      const dot = document.getElementById('cursor-dot');
      
      newElements.forEach(el => {
        if (el.dataset.cursorHover === 'true') return;
        el.dataset.cursorHover = 'true';
        
        el.addEventListener('mouseenter', () => {
          if (ring) {
            ring.style.width = '70px';
            ring.style.height = '70px';
            ring.style.background = 'rgba(56, 189, 248, 0.12)';
            ring.style.borderColor = '#38BDF8';
            ring.style.boxShadow = '0 0 40px rgba(56, 189, 248, 0.4)';
          }
          if (dot) dot.style.opacity = '0.4';
        });
        
        el.addEventListener('mouseleave', () => {
          if (ring) {
            ring.style.width = '40px';
            ring.style.height = '40px';
            ring.style.background = 'transparent';
            ring.style.borderColor = 'rgba(56, 189, 248, 0.6)';
            ring.style.boxShadow = 'none';
          }
          if (dot) dot.style.opacity = '1';
        });
      });
    }, 100);
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
    // Init cursor FIRST
    initCustomCursor();
    
    initThemeToggle();
    initLanguage();
    renderDetail();
    initBackToTop();
    initFooterYear();

    window.addEventListener('popstate', () => {
      renderDetail();
    });
  });

  window.addEventListener('languageChanged', () => {
    renderDetail();
  });

})();