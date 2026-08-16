/**
 * Main site controller.
 * Renders all dynamic sections from PORTFOLIO_DATA, then wires up
 * Lenis smooth scroll, GSAP scroll-triggered reveals, nav behavior,
 * counters, timelines, project filtering, certificate modal, and the
 * contact world-map canvas.
 */
(function () {
  const D = typeof PORTFOLIO_DATA !== "undefined" ? PORTFOLIO_DATA : null;
  if (!D) return;

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
    
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    document.querySelectorAll('.lang-btn-mobile').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    
    updateLanguageOnly();
  }

  function initLanguageSelector() {
    const savedLang = localStorage.getItem('language') || 'id';
    currentLang = savedLang;
    document.documentElement.setAttribute('data-lang', savedLang);
    
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === savedLang);
      btn.addEventListener('click', () => {
        setLang(btn.dataset.lang);
      });
    });
    
    document.querySelectorAll('.lang-btn-mobile').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === savedLang);
      btn.addEventListener('click', () => {
        setLang(btn.dataset.lang);
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu) mobileMenu.classList.remove('open');
      });
    });
  }

  function updateLanguageOnly() {
    const lang = getLang();
    
    const taglineEl = document.querySelector('[data-tagline]');
    if (taglineEl) taglineEl.textContent = lang === 'id' ? D.profile.tagline : D.profile.tagline_en;
    
    const summaryEl = document.querySelector('[data-summary]');
    if (summaryEl) summaryEl.textContent = lang === 'id' ? D.profile.summary_id : D.profile.summary;
    
    const aboutItems = document.querySelectorAll('.about-list-item');
    if (aboutItems.length >= 2) {
      const goalP = aboutItems[0]?.querySelector('p');
      const visionP = aboutItems[1]?.querySelector('p');
      if (goalP) goalP.textContent = lang === 'id' ? D.profile.careerGoal : D.profile.careerGoal_en;
      if (visionP) visionP.textContent = lang === 'id' ? D.profile.vision : D.profile.vision_en;
      
      const goalH4 = aboutItems[0]?.querySelector('h4');
      const visionH4 = aboutItems[1]?.querySelector('h4');
      if (goalH4) goalH4.textContent = lang === 'id' ? 'Tujuan Karier' : 'Career Goal';
      if (visionH4) visionH4.textContent = lang === 'id' ? 'Visi' : 'Vision';
    }

    renderAchievements();

    const eduCards = document.querySelectorAll('#education-timeline .timeline-card');
    eduCards.forEach((card, i) => {
      const edu = D.education[i];
      if (!edu) return;
      const roleEl = card.querySelector('.timeline-role');
      if (roleEl) roleEl.textContent = lang === 'id' ? edu.major : edu.major_en;
      
      const gpaLabel = card.querySelector('.timeline-body p strong');
      if (gpaLabel) gpaLabel.textContent = lang === 'id' ? 'IPK:' : 'GPA:';
      
      const orgLabel = card.querySelectorAll('.timeline-body p')[1]?.querySelector('strong');
      if (orgLabel) orgLabel.textContent = lang === 'id' ? 'Organisasi:' : 'Organizations:';
      
      const toggle = card.querySelector('.timeline-toggle');
      if (toggle) toggle.innerHTML = `${lang === 'id' ? 'Lihat detail' : 'View details'} <i class="fa-solid fa-chevron-down"></i>`;
    });

    const expCards = document.querySelectorAll('#experience-timeline .timeline-card');
    expCards.forEach((card, i) => {
      const exp = D.experience[i];
      if (!exp) return;
      const descP = card.querySelector('.timeline-body > p');
      if (descP) descP.textContent = lang === 'id' ? exp.description : exp.description_en;
      
      const toggle = card.querySelector('.timeline-toggle');
      if (toggle) toggle.innerHTML = `${lang === 'id' ? 'Lihat detail' : 'View details'} <i class="fa-solid fa-chevron-down"></i>`;
    });

    const navTranslations = {
      nav_home: { id: 'Home', en: 'Home' },
      nav_about: { id: 'Tentang Saya', en: 'About Me' },
      nav_education: { id: 'Pendidikan', en: 'Education' },
      nav_experience: { id: 'Pengalaman', en: 'Experience' },
      nav_skills: { id: 'Keahlian', en: 'Skills' },
      nav_projects: { id: 'Project', en: 'Projects' },
      nav_certificates: { id: 'Sertifikat', en: 'Certificates' },
      nav_contact: { id: 'Kontak', en: 'Contact' },
      nav_cta: { id: 'Hubungi Saya', en: 'Contact Me' }
    };
    
    document.querySelectorAll('[data-key]').forEach(el => {
      const key = el.dataset.key;
      if (navTranslations[key]) {
        el.textContent = navTranslations[key][lang];
      }
    });

    document.querySelectorAll('.section-title').forEach(el => {
      const parent = el.closest('section');
      if (parent) {
        const id = parent.id;
        const titleMap = {
          'about': { id: 'Di balik setiap dataset, ada keputusan yang menunggu', en: 'Behind every dataset, a decision awaits' },
          'education': { id: 'Pendidikan', en: 'Education' },
          'experience': { id: 'Pengalaman Kerja', en: 'Work Experience' },
          'skills': { id: 'Keahlian', en: 'Skills' },
          'projects': { id: 'Project', en: 'Projects' },
          'certificates': { id: 'Sertifikat', en: 'Certificates' },
          'contact': { id: 'Kontak', en: 'Contact' }
        };
        if (titleMap[id]) {
          el.textContent = titleMap[id][lang];
        }
      }
    });

    const subMap = {
      'education': { id: 'Perjalanan akademik yang membentuk dasar berpikir analitis dan teknis saya.', en: 'The academic journey that shaped my analytical and technical thinking.' },
      'experience': { id: 'Peran nyata di industri, dari riset hingga produk yang digunakan pengguna sesungguhnya.', en: 'Real roles in the industry, from research to products used by real users.' },
      'skills': { id: 'Tingkat penguasaan setiap teknologi dan alat yang saya kuasai.', en: 'Proficiency level of each technology and tool I master.' },
      'projects': { id: 'Studi kasus nyata: dari eksplorasi data hingga aplikasi yang benar-benar berjalan.', en: 'Real case studies: from data exploration to applications that actually run.' },
      'certificates': { id: 'Bukti pembelajaran berkelanjutan di bidang data dan pengembangan perangkat lunak.', en: 'Evidence of continuous learning in data and software development.' },
      'contact': { id: 'Terbuka untuk peluang kerja, kolaborasi riset, maupun proyek freelance.', en: 'Open to job opportunities, research collaborations, and freelance projects.' }
    };
    document.querySelectorAll('.section-sub').forEach(el => {
      const parent = el.closest('section');
      if (parent && subMap[parent.id]) {
        el.textContent = subMap[parent.id][lang];
      }
    });

    const eyebrowMap = {
      'about': { id: 'Tentang Saya', en: 'About Me' },
      'education': { id: 'Riwayat Akademik', en: 'Academic History' },
      'experience': { id: 'Rekam Jejak', en: 'Track Record' },
      'skills': { id: 'Peta Kemampuan', en: 'Skills Map' },
      'projects': { id: 'Karya Terpilih', en: 'Selected Works' },
      'certificates': { id: 'Kredensial', en: 'Credentials' },
      'contact': { id: 'Mari Terhubung', en: 'Let\'s Connect' }
    };
    document.querySelectorAll('.eyebrow').forEach(el => {
      const parent = el.closest('section');
      if (parent && eyebrowMap[parent.id]) {
        el.textContent = eyebrowMap[parent.id][lang];
      }
    });

    const heroActions = document.querySelector('.hero-actions');
    if (heroActions) {
      const btns = heroActions.querySelectorAll('.btn');
      const btnTexts = lang === 'id' 
        ? ['Lihat Portfolio', 'Unduh CV', 'Hubungi Saya']
        : ['View Portfolio', 'Download CV', 'Contact Me'];
      btns.forEach((btn, i) => {
        if (i < btnTexts.length) {
          const icon = btn.querySelector('i');
          if (icon) {
            btn.innerHTML = `${icon.outerHTML} ${btnTexts[i]}`;
          } else {
            btn.textContent = btnTexts[i];
          }
        }
      });
    }

    document.querySelectorAll('.stat-label').forEach((el, i) => {
      const stats = D.profile.stats;
      if (stats[i]) {
        const labelMap = {
          'Proyek Selesai': { id: 'Proyek Selesai', en: 'Projects Completed' },
          'Sertifikat': { id: 'Sertifikat', en: 'Certificates' },
          'Teknologi Dikuasai': { id: 'Teknologi Dikuasai', en: 'Technologies Mastered' },
          'Pengalaman': { id: 'Pengalaman', en: 'Experience' }
        };
        if (labelMap[stats[i].label]) {
          el.textContent = labelMap[stats[i].label][lang];
        }
      }
    });

    document.querySelectorAll('.project-card').forEach(card => {
      const id = card.querySelector('.project-links a')?.getAttribute('href')?.split('=')[1];
      const project = D.projects.find(p => p.id === id);
      if (project) {
        const nameEl = card.querySelector('h3');
        const descEl = card.querySelector('.desc');
        const statusEl = card.querySelector('.project-status');
        const detailLink = card.querySelector('.project-links a');
        
        if (nameEl) nameEl.textContent = lang === 'id' ? (project.name_id || project.name) : project.name;
        if (descEl) descEl.textContent = lang === 'id' ? project.shortDescription : (project.shortDescription_en || project.shortDescription);
        if (statusEl) statusEl.textContent = lang === 'id' ? project.status : (project.status_en || project.status);
        if (detailLink) detailLink.innerHTML = `<i class="fa-solid fa-circle-info"></i> ${lang === 'id' ? 'Detail Project' : 'Project Details'}`;
      }
    });
  }

  // ------------------------------------------------------------ DOM READY
  document.addEventListener("DOMContentLoaded", () => {
    renderIdentity();
    renderAbout();
    renderEducation();
    renderExperience();
    renderSkills();
    renderProjects();
    renderCertificates();
    renderContact();
    renderFooter();
    document.getElementById("current-year").textContent = new Date().getFullYear();
    initThemeToggle();
    initLanguageSelector();
    setTimeout(() => {
      updateLanguageOnly();
    }, 100);
  });

  window.addEventListener("siteReady", () => {
    initLenis();
    initNav();
    initTypingAnimation();
    initCounters();
    initTimelineToggles();
    initProjectFilter();
    initTilt();
    initCertModal();
    initWorldMap();
    initScrollReveals();
    initProjectSearch();
    initProjectCarousel();
    initCertificateCarousel();
    animateSkillBars();
    
    let resizeTimeout;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        rebuildProjectCarousel();
        rebuildCertCarousel();
      }, 300);
    });
  }, { once: true });

  // ------------------------------------------------------------ Identity
  function renderIdentity() {
    document.querySelectorAll("[data-name]").forEach((el) => (el.textContent = D.profile.name));
    document.querySelectorAll("[data-name-initial]").forEach((el) => (el.textContent = D.profile.name.charAt(0)));
    document.querySelectorAll("[data-tagline]").forEach((el) => (el.textContent = D.profile.tagline));
    document.querySelectorAll("[data-summary]").forEach((el) => (el.textContent = D.profile.summary));
    document.querySelectorAll("[data-email]").forEach((el) => { el.textContent = D.profile.email; el.href = "mailto:" + D.profile.email; });
    document.querySelectorAll("[data-cv-link]").forEach((el) => (el.href = D.profile.cvFile));
    document.querySelectorAll("[data-github]").forEach((el) => (el.href = D.profile.social.github));
    document.querySelectorAll("[data-linkedin]").forEach((el) => (el.href = D.profile.social.linkedin));
    document.querySelectorAll("[data-instagram]").forEach((el) => (el.href = D.profile.social.instagram));
    document.querySelectorAll("[data-whatsapp]").forEach((el) => (el.href = D.profile.whatsapp));
  }

  // ------------------------------------------------------------ About with Achievements
  function renderAbout() {
    const listEl = document.getElementById("about-list");
    if (listEl) {
      const lang = getLang();
      listEl.innerHTML = `
        <div class="about-list-item"><i class="fa-solid fa-bullseye"></i><div><h4>${lang === 'id' ? 'Tujuan Karier' : 'Career Goal'}</h4><p>${lang === 'id' ? D.profile.careerGoal : D.profile.careerGoal_en}</p></div></div>
        <div class="about-list-item"><i class="fa-solid fa-compass"></i><div><h4>${lang === 'id' ? 'Visi' : 'Vision'}</h4><p>${lang === 'id' ? D.profile.vision : D.profile.vision_en}</p></div></div>
      `;
    }
    
    renderAchievements();
    
    const tagsEl = document.getElementById("about-tags");
    if (tagsEl) tagsEl.innerHTML = D.profile.interests.map((i) => `<span class="tag">${i}</span>`).join("");

    const statsEl = document.getElementById("about-stats");
    if (statsEl) {
      statsEl.innerHTML = D.profile.stats.map((s) => `
        <div class="stat-card glass">
          <div class="stat-value" data-count="${s.value}" data-suffix="${s.suffix}">0</div>
          <div class="stat-label">${s.label}</div>
        </div>`).join("");
    }
  }

  function renderAchievements() {
    const achievementsContainer = document.getElementById('about-achievements');
    if (!achievementsContainer || !D.achievements) return;
    
    const lang = getLang();
    
    const competitions = D.achievements.filter(a => a.type === 'competition');
    const publications = D.achievements.filter(a => a.type === 'publication');
    const thesis = D.achievements.filter(a => a.type === 'thesis');
    
    let html = `
      <h4 style="margin-top: 20px; margin-bottom: 12px; color: var(--accent);">
        <i class="fa-solid fa-trophy"></i> ${lang === 'id' ? 'Prestasi & Publikasi' : 'Achievements & Publications'}
      </h4>
    `;
    
    if (competitions.length > 0) {
      html += `<div class="achievement-group-label">🏆 ${lang === 'id' ? 'Kompetisi' : 'Competitions'}</div>`;
      competitions.forEach(a => {
        html += `
          <div class="about-list-item achievement-item">
            <i class="${a.icon}" style="color: ${a.title === 'Silver Medal' ? '#c0a050' : '#f59e0b'}; font-size: 1.2rem; margin-top: 4px;"></i>
            <div>
              <strong>${lang === 'id' ? a.title : a.title_en}</strong>
              <span style="color: var(--text-faint); font-size: 0.85rem;"> - ${a.year}</span>
              <p style="font-size: 0.9rem; color: var(--text-dim);">${lang === 'id' ? a.event : a.event_en}</p>
              <p style="font-size: 0.85rem; color: var(--text-faint);">${lang === 'id' ? a.description : a.description_en}</p>
            </div>
          </div>
        `;
      });
    }
    
    if (publications.length > 0) {
      html += `<div class="achievement-group-label">📄 ${lang === 'id' ? 'Publikasi Ilmiah' : 'Scientific Publications'}</div>`;
      publications.forEach(a => {
        html += `
          <div class="about-list-item achievement-item">
            <i class="${a.icon}" style="color: var(--accent); font-size: 1.2rem; margin-top: 4px;"></i>
            <div>
              <strong>${lang === 'id' ? a.title : a.title_en}</strong>
              <span style="color: var(--text-faint); font-size: 0.85rem;"> - ${a.year}</span>
              <p style="font-size: 0.9rem; color: var(--text-dim);">${lang === 'id' ? a.event : a.event_en}</p>
              <p style="font-size: 0.85rem; color: var(--text-faint);">${lang === 'id' ? a.description : a.description_en}</p>
              ${a.link ? `<a href="${a.link}" target="_blank" rel="noopener" class="achievement-link"><i class="fa-solid fa-arrow-up-right-from-square"></i> ${lang === 'id' ? 'Lihat di ResearchGate' : 'View on ResearchGate'}</a>` : ''}
            </div>
          </div>
        `;
      });
    }
    
    if (thesis.length > 0) {
      html += `<div class="achievement-group-label">🎓 ${lang === 'id' ? 'Karya Tulis Ilmiah' : 'Scientific Paper'}</div>`;
      thesis.forEach(a => {
        html += `
          <div class="about-list-item achievement-item">
            <i class="${a.icon}" style="color: var(--accent); font-size: 1.2rem; margin-top: 4px;"></i>
            <div>
              <strong>${lang === 'id' ? a.title : a.title_en}</strong>
              <span style="color: var(--text-faint); font-size: 0.85rem;"> - ${a.year}</span>
              <p style="font-size: 0.9rem; color: var(--text-dim);">${lang === 'id' ? a.event : a.event_en}</p>
              <p style="font-size: 0.85rem; color: var(--text-faint);">${lang === 'id' ? a.description : a.description_en}</p>
              ${a.link ? `<a href="${a.link}" target="_blank" rel="noopener" class="achievement-link"><i class="fa-solid fa-arrow-up-right-from-square"></i> ${lang === 'id' ? 'Lihat di Digilib' : 'View on Digilib'}</a>` : ''}
            </div>
          </div>
        `;
      });
    }
    
    achievementsContainer.innerHTML = html;
  }

  // ------------------------------------------------------------ Education
  function renderEducation() {
    const el = document.getElementById("education-timeline");
    if (!el) return;
    const lang = getLang();
    el.innerHTML = D.education.map((edu, i) => {
      const eduAchievements = lang === 'id' ? edu.achievements : edu.achievements.map(a => a.replace(/Fresh Graduate dengan predikat cum laude/, 'Fresh Graduate with cum laude predicate'));
      return `
      <div class="timeline-item">
        <span class="timeline-dot"></span>
        <div class="timeline-card glass" data-index="${i}">
          <div class="timeline-head">
            <div>
              <h3>${edu.institution}</h3>
              <div class="timeline-role">${lang === 'id' ? edu.major : edu.major_en}</div>
            </div>
            <span class="period">${edu.period}</span>
          </div>
          <div class="timeline-body">
            <p><strong>${lang === 'id' ? 'IPK' : 'GPA'}:</strong> ${edu.gpa}</p>
            <ul>${eduAchievements.map((a) => `<li>${a}</li>`).join("")}</ul>
            <p><strong>${lang === 'id' ? 'Organisasi' : 'Organizations'}:</strong> ${edu.organizations.join(", ")}</p>
          </div>
          <div class="timeline-toggle">${lang === 'id' ? 'Lihat detail' : 'View details'} <i class="fa-solid fa-chevron-down"></i></div>
        </div>
      </div>`;
    }).join("");
  }

  // ------------------------------------------------------------ Experience
  function renderExperience() {
    const el = document.getElementById("experience-timeline");
    if (!el) return;
    const lang = getLang();
    el.innerHTML = D.experience.map((exp, i) => `
      <div class="timeline-item">
        <span class="timeline-dot"></span>
        <div class="timeline-card glass" data-index="${i}">
          <div class="timeline-head">
            <div>
              <h3>${exp.position}</h3>
              <div class="timeline-role">${exp.company}</div>
            </div>
            <span class="period">${exp.period}</span>
          </div>
          <div class="timeline-body">
            <p>${lang === 'id' ? exp.description : exp.description_en}</p>
            <ul>${(lang === 'id' ? exp.achievements : exp.achievements_en).map((a) => `<li>${a}</li>`).join("")}</ul>
            <div class="project-tech">${exp.technologies.map((t) => `<span>${t}</span>`).join("")}</div>
          </div>
          <div class="timeline-toggle">${lang === 'id' ? 'Lihat detail' : 'View details'} <i class="fa-solid fa-chevron-down"></i></div>
        </div>
      </div>`).join("");
  }

  function initTimelineToggles() {
    document.querySelectorAll(".timeline-card").forEach((card) => {
      card.addEventListener("click", () => card.classList.toggle("open"));
    });
  }

  // ------------------------------------------------------------ Skills
  function renderSkills() {
    const container = document.getElementById("skills-container");
    if (!container) return;
    
    container.innerHTML = D.skills.map((skill) => `
      <div class="skill-item reveal">
        <div class="skill-info">
          <span class="skill-name">${skill.name}</span>
          <span class="skill-percent">${skill.level}%</span>
        </div>
        <div class="skill-bar-track">
          <div class="skill-bar-fill" data-level="${skill.level}" style="width: 0;"></div>
        </div>
      </div>
    `).join("");
  }

  function animateSkillBars() {
    const skillItems = document.querySelectorAll('.skill-item');
    if (!skillItems.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const fill = entry.target.querySelector('.skill-bar-fill');
          if (fill) {
            const level = fill.dataset.level;
            setTimeout(() => {
              fill.style.width = level + '%';
              fill.classList.add('animated');
            }, 200);
          }
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    skillItems.forEach(item => observer.observe(item));
  }

  // ------------------------------------------------------------ Projects
  function renderProjects() {
    const grid = document.getElementById("projects-grid");
    const filterBar = document.getElementById("project-filters");
    if (!grid) return;

    const lang = getLang();
    const categories = ["Semua", ...new Set(D.projects.map((p) => p.category))];
    const allText = lang === 'id' ? 'Semua' : 'All';
    
    if (filterBar) {
      filterBar.innerHTML = categories.map((c, i) =>
        `<button class="filter-btn ${i === 0 ? "active" : ""}" data-filter="${c}">${c === 'Semua' ? allText : c}</button>`
      ).join("");
    }

    grid.innerHTML = D.projects.map((p) => {
      const name = lang === 'id' ? (p.name_id || p.name) : p.name;
      const desc = lang === 'id' ? p.shortDescription : (p.shortDescription_en || p.shortDescription);
      const status = lang === 'id' ? p.status : (p.status_en || p.status);
      const detailText = lang === 'id' ? 'Detail Project' : 'Project Details';
      return `
      <article class="project-card glass-border-gradient" data-category="${p.category}" data-project-id="${p.id}">
        <div class="project-card-inner">
          <div class="project-thumb">
            ${p.thumbnail ? 
              `<img src="${p.thumbnail}" alt="${name}" class="project-thumb-img" loading="lazy" onerror="this.style.display='none';this.parentElement.innerHTML='<i class=\\'fa-solid fa-diagram-project\\'></i>'">` :
              `<i class="fa-solid fa-diagram-project"></i>`
            }
          </div>
          <div class="project-meta">
            <span class="project-category">${p.category}</span>
            <span class="project-status">${status}</span>
          </div>
          <h3>${name}</h3>
          <p class="desc">${desc}</p>
          <div class="project-tech">${p.technologies.map((t) => `<span>${t}</span>`).join("")}</div>
          <div class="project-links">
            <a href="project-detail.html?id=${p.id}"><i class="fa-solid fa-circle-info"></i> ${detailText}</a>
            ${p.links.demo ? `<a href="${p.links.demo}" target="_blank" rel="noopener"><i class="fa-solid fa-arrow-up-right-from-square"></i> Live Demo</a>` : ""}
            ${p.links.github ? `<a href="${p.links.github}" target="_blank" rel="noopener"><i class="fa-brands fa-github"></i> Repository</a>` : ""}
          </div>
        </div>
      </article>`;
    }).join("");
  }

  // ------------------------------------------------------------ PROJECT SEARCH & FILTER
  function initProjectSearch() {
    const searchInput = document.getElementById('project-search');
    if (!searchInput) return;

    const newSearchInput = searchInput.cloneNode(true);
    searchInput.parentNode.replaceChild(newSearchInput, searchInput);

    newSearchInput.addEventListener('input', function(e) {
      const query = this.value.toLowerCase().trim();
      const cards = document.querySelectorAll('#projects-grid .project-card');
      const filterBtns = document.querySelectorAll('#project-filters .filter-btn');
      let activeFilter = 'Semua';
      
      filterBtns.forEach(btn => {
        if (btn.classList.contains('active')) {
          activeFilter = btn.dataset.filter;
        }
      });

      cards.forEach(card => {
        const name = card.querySelector('h3')?.textContent?.toLowerCase() || '';
        const tech = card.querySelectorAll('.project-tech span');
        let techText = '';
        tech.forEach(t => techText += t.textContent.toLowerCase() + ' ');
        const desc = card.querySelector('.desc')?.textContent?.toLowerCase() || '';
        
        const matchesSearch = name.includes(query) || techText.includes(query) || desc.includes(query);
        const matchesFilter = activeFilter === 'Semua' || card.dataset.category === activeFilter;
        
        card.style.display = (matchesSearch && matchesFilter) ? '' : 'none';
      });

      rebuildProjectCarousel();
    });
  }

  function initProjectFilter() {
    const filterBar = document.getElementById('project-filters');
    if (!filterBar) return;
    
    const newFilterBar = filterBar.cloneNode(true);
    filterBar.parentNode.replaceChild(newFilterBar, filterBar);
    
    newFilterBar.addEventListener('click', function(e) {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;
      
      this.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const filter = btn.dataset.filter;
      const cards = document.querySelectorAll('#projects-grid .project-card');
      const searchInput = document.getElementById('project-search');
      const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
      
      cards.forEach(card => {
        const name = card.querySelector('h3')?.textContent?.toLowerCase() || '';
        const tech = card.querySelectorAll('.project-tech span');
        let techText = '';
        tech.forEach(t => techText += t.textContent.toLowerCase() + ' ');
        const desc = card.querySelector('.desc')?.textContent?.toLowerCase() || '';
        
        const matchesSearch = !query || name.includes(query) || techText.includes(query) || desc.includes(query);
        const matchesFilter = filter === 'Semua' || card.dataset.category === filter;
        
        card.style.display = (matchesSearch && matchesFilter) ? '' : 'none';
      });

      rebuildProjectCarousel();
    });
  }

  // ------------------------------------------------------------ PROJECT CAROUSEL
  let projectCarouselState = {
    currentIndex: 0,
    slidesPerView: 3,
    initialized: false
  };

  function rebuildProjectCarousel() {
    projectCarouselState.currentIndex = 0;
    projectCarouselState.initialized = false;
    setTimeout(() => {
      initProjectCarousel();
    }, 50);
  }

  function initProjectCarousel() {
    const container = document.querySelector('.projects-carousel-container');
    if (!container) return;

    const track = container.querySelector('.projects-carousel-track');
    const prevBtn = container.querySelector('.carousel-prev');
    const nextBtn = container.querySelector('.carousel-next');
    const dots = container.querySelector('#project-dots');

    const allSlides = track.querySelectorAll('.project-card');
    const visibleSlides = Array.from(allSlides).filter(card => card.style.display !== 'none');
    
    const totalSlides = visibleSlides.length;
    if (totalSlides === 0) {
      track.style.transform = 'translateX(0)';
      if (dots) dots.innerHTML = '';
      if (prevBtn) prevBtn.style.display = 'none';
      if (nextBtn) nextBtn.style.display = 'none';
      return;
    }

    let slidesPerView = 3;
    if (window.innerWidth < 600) slidesPerView = 1;
    else if (window.innerWidth < 1024) slidesPerView = 2;
    
    slidesPerView = Math.min(slidesPerView, totalSlides);
    
    if (!projectCarouselState.initialized || projectCarouselState.slidesPerView !== slidesPerView) {
      projectCarouselState.currentIndex = 0;
      projectCarouselState.slidesPerView = slidesPerView;
      projectCarouselState.initialized = true;
    }

    const maxIndex = Math.max(0, totalSlides - slidesPerView);
    if (projectCarouselState.currentIndex > maxIndex) {
      projectCarouselState.currentIndex = maxIndex;
    }

    const gap = 24;
    const containerWidth = track.parentElement.offsetWidth;
    const slideWidth = (containerWidth - (gap * (slidesPerView - 1))) / slidesPerView;
    
    allSlides.forEach(slide => {
      if (slide.style.display !== 'none') {
        slide.style.width = slideWidth + 'px';
        slide.style.marginRight = gap + 'px';
        slide.style.flex = '0 0 auto';
      }
    });

    const offset = projectCarouselState.currentIndex * (slideWidth + gap);
    track.style.transform = `translateX(-${offset}px)`;

    if (dots) {
      const totalDots = Math.max(1, totalSlides - slidesPerView + 1);
      dots.innerHTML = Array.from({ length: totalDots }, (_, i) => 
        `<button class="dot ${i === projectCarouselState.currentIndex ? 'active' : ''}" data-index="${i}" aria-label="Slide ${i + 1}"></button>`
      ).join('');
      
      dots.querySelectorAll('.dot').forEach(btn => {
        btn.addEventListener('click', function() {
          projectCarouselState.currentIndex = parseInt(this.dataset.index);
          initProjectCarousel();
        });
      });
    }

    if (prevBtn) {
      prevBtn.style.display = projectCarouselState.currentIndex > 0 ? 'flex' : 'none';
      const newPrev = prevBtn.cloneNode(true);
      prevBtn.parentNode.replaceChild(newPrev, prevBtn);
      newPrev.addEventListener('click', function(e) {
        e.stopPropagation();
        if (projectCarouselState.currentIndex > 0) {
          projectCarouselState.currentIndex--;
          initProjectCarousel();
        }
      });
    }

    if (nextBtn) {
      const maxIdx = Math.max(0, totalSlides - slidesPerView);
      nextBtn.style.display = projectCarouselState.currentIndex < maxIdx ? 'flex' : 'none';
      const newNext = nextBtn.cloneNode(true);
      nextBtn.parentNode.replaceChild(newNext, nextBtn);
      newNext.addEventListener('click', function(e) {
        e.stopPropagation();
        const maxIdx2 = Math.max(0, totalSlides - slidesPerView);
        if (projectCarouselState.currentIndex < maxIdx2) {
          projectCarouselState.currentIndex++;
          initProjectCarousel();
        }
      });
    }
  }

  function initTilt() {
    document.querySelectorAll(".project-card").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
      });
      card.addEventListener("mouseleave", () => { card.style.transform = ""; });
    });
  }

    // ------------------------------------------------------------ CERTIFICATE CAROUSEL
  let certCarouselState = {
    currentIndex: 0,
    slidesPerView: 3,
    initialized: false
  };

  function rebuildCertCarousel() {
    certCarouselState.currentIndex = 0;
    certCarouselState.initialized = false;
    setTimeout(() => {
      initCertificateCarousel();
    }, 50);
  }

  function initCertificateCarousel() {
    const container = document.querySelector('.cert-carousel-container');
    if (!container) return;

    const track = container.querySelector('.cert-carousel-track');
    const prevBtn = container.querySelector('.carousel-prev');
    const nextBtn = container.querySelector('.carousel-next');
    const dots = container.querySelector('#cert-dots');

    const allSlides = track.querySelectorAll('.cert-card');
    const visibleSlides = Array.from(allSlides).filter(card => card.style.display !== 'none');
    
    const totalSlides = visibleSlides.length;
    if (totalSlides === 0) {
      track.style.transform = 'translateX(0)';
      if (dots) dots.innerHTML = '';
      if (prevBtn) prevBtn.style.display = 'none';
      if (nextBtn) nextBtn.style.display = 'none';
      return;
    }

    let slidesPerView = 3;
    if (window.innerWidth < 600) slidesPerView = 1;
    else if (window.innerWidth < 1024) slidesPerView = 2;
    
    slidesPerView = Math.min(slidesPerView, totalSlides);
    
    if (!certCarouselState.initialized || certCarouselState.slidesPerView !== slidesPerView) {
      certCarouselState.currentIndex = 0;
      certCarouselState.slidesPerView = slidesPerView;
      certCarouselState.initialized = true;
    }

    const maxIndex = Math.max(0, totalSlides - slidesPerView);
    if (certCarouselState.currentIndex > maxIndex) {
      certCarouselState.currentIndex = maxIndex;
    }

    const gap = 24;
    const containerWidth = track.parentElement.offsetWidth;
    const slideWidth = (containerWidth - (gap * (slidesPerView - 1))) / slidesPerView;
    
    allSlides.forEach(slide => {
      if (slide.style.display !== 'none') {
        slide.style.width = slideWidth + 'px';
        slide.style.marginRight = gap + 'px';
        slide.style.flex = '0 0 auto';
      }
    });

    const offset = certCarouselState.currentIndex * (slideWidth + gap);
    track.style.transform = `translateX(-${offset}px)`;

    if (dots) {
      const totalDots = Math.max(1, totalSlides - slidesPerView + 1);
      dots.innerHTML = Array.from({ length: totalDots }, (_, i) => 
        `<button class="dot ${i === certCarouselState.currentIndex ? 'active' : ''}" data-index="${i}" aria-label="Slide ${i + 1}"></button>`
      ).join('');
      
      dots.querySelectorAll('.dot').forEach(btn => {
        btn.addEventListener('click', function() {
          certCarouselState.currentIndex = parseInt(this.dataset.index);
          initCertificateCarousel();
        });
      });
    }

    if (prevBtn) {
      prevBtn.style.display = certCarouselState.currentIndex > 0 ? 'flex' : 'none';
      const newPrev = prevBtn.cloneNode(true);
      prevBtn.parentNode.replaceChild(newPrev, prevBtn);
      newPrev.addEventListener('click', function(e) {
        e.stopPropagation();
        if (certCarouselState.currentIndex > 0) {
          certCarouselState.currentIndex--;
          initCertificateCarousel();
        }
      });
    }

    if (nextBtn) {
      const maxIdx = Math.max(0, totalSlides - slidesPerView);
      nextBtn.style.display = certCarouselState.currentIndex < maxIdx ? 'flex' : 'none';
      const newNext = nextBtn.cloneNode(true);
      nextBtn.parentNode.replaceChild(newNext, nextBtn);
      newNext.addEventListener('click', function(e) {
        e.stopPropagation();
        const maxIdx2 = Math.max(0, totalSlides - slidesPerView);
        if (certCarouselState.currentIndex < maxIdx2) {
          certCarouselState.currentIndex++;
          initCertificateCarousel();
        }
      });
    }
  }

  // ============================================================
  // RENDER CERTIFICATES (Dengan Fallback Icon per Kategori)
  // ============================================================
  function renderCertificates() {
    const grid = document.getElementById("cert-grid");
    const filterBar = document.getElementById("cert-filters");
    if (!grid) return;

    const lang = getLang();
    const categories = ["Semua", ...new Set(D.certificates.map((c) => c.category))];
    const allText = lang === 'id' ? 'Semua' : 'All';
    
    if (filterBar) {
      filterBar.innerHTML = categories.map((c, i) =>
        `<button class="filter-btn ${i === 0 ? "active" : ""}" data-cert-filter="${c}">${c === 'Semua' ? allText : c}</button>`
      ).join("");
    }

    // Category icons mapping
    const categoryIcons = {
      'BNSP': { icon: 'fa-solid fa-certificate', color: '#7C3AED' },
      'Dicoding': { icon: 'fa-solid fa-code', color: '#06B6D4' },
      'Cisco': { icon: 'fa-solid fa-network-wired', color: '#1BA0E2' },
      'Oracle': { icon: 'fa-solid fa-database', color: '#EA1E2D' },
      'Coding Studio': { icon: 'fa-solid fa-laptop-code', color: '#38BDF8' }
    };
    const defaultIcon = { icon: 'fa-solid fa-award', color: '#6B7394' };

    grid.innerHTML = D.certificates.map((c, i) => {
      const iconData = categoryIcons[c.category] || defaultIcon;
      return `
        <div class="cert-card glass" data-index="${i}" data-category="${c.category}">
          ${c.image ? 
            `<img src="${c.image}" alt="${c.name}" class="cert-image" loading="lazy" onerror="this.style.display='none';this.parentElement.innerHTML+='<div class=\\'cert-icon\\' style=\\'background:${iconData.color};\\'><i class=\\'${iconData.icon}\\'></i></div>'">` : 
            `<div class="cert-icon" style="background:${iconData.color};"><i class="${iconData.icon}"></i></div>`
          }
          <h4>${c.name}</h4>
          <div class="issuer">${c.issuer}</div>
          <div class="year">${c.year}</div>
          <span class="cert-category-tag">${c.category}</span>
        </div>
      `;
    }).join("");

    initCertFilter();
    setTimeout(initCertificateCarousel, 200);
  }

  // ============================================================
  // CERTIFICATE FILTER
  // ============================================================
  function initCertFilter() {
    const filterBar = document.getElementById("cert-filters");
    if (!filterBar) return;

    const newFilterBar = filterBar.cloneNode(true);
    filterBar.parentNode.replaceChild(newFilterBar, filterBar);

    newFilterBar.addEventListener("click", (e) => {
      const btn = e.target.closest(".filter-btn");
      if (!btn) return;

      newFilterBar.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.certFilter;
      const cards = document.querySelectorAll("#cert-grid .cert-card");

      cards.forEach((card) => {
        const show = filter === "Semua" || card.dataset.category === filter;
        card.style.display = show ? "" : "none";
      });

      rebuildCertCarousel();
    });
  }

  // ============================================================
  // CERTIFICATE MODAL (Dengan Tampilan Gambar)
  // ============================================================
  function initCertModal() {
    const overlay = document.getElementById("cert-modal");
    if (!overlay) return;
    const box = overlay.querySelector(".modal-box");
    const iconContainer = box.querySelector(".modal-icon-lg");
    const titleEl = box.querySelector("h3");
    const detailEl = box.querySelector(".issuer-detail");

    // Category icons for modal fallback
    const categoryIcons = {
      'BNSP': 'fa-solid fa-certificate',
      'Dicoding': 'fa-solid fa-code',
      'Cisco': 'fa-solid fa-network-wired',
      'Oracle': 'fa-solid fa-database',
      'Coding Studio': 'fa-solid fa-laptop-code'
    };

    document.getElementById("cert-grid").addEventListener("click", (e) => {
      const card = e.target.closest(".cert-card");
      if (!card) return;
      const idx = parseInt(card.dataset.index);
      const cert = D.certificates[idx];
      if (!cert) return;

      // Cari gambar di card
      const img = card.querySelector('.cert-image');
      
      // Tampilkan di modal
      if (img && img.src && img.style.display !== 'none' && img.src !== '') {
        iconContainer.innerHTML = `<img src="${img.src}" alt="${cert.name}" style="width:100%;height:auto;max-height:280px;object-fit:contain;border-radius:12px;background:rgba(255,255,255,0.03);">`;
        iconContainer.style.background = 'transparent';
        iconContainer.style.boxShadow = 'none';
      } else {
        // Fallback ke icon berdasarkan kategori
        const iconClass = categoryIcons[cert.category] || 'fa-solid fa-award';
        iconContainer.innerHTML = `<i class="${iconClass}"></i>`;
        iconContainer.style.background = 'var(--gradient-main)';
        iconContainer.style.boxShadow = 'var(--glow-primary)';
      }

      titleEl.textContent = cert.name;
      detailEl.textContent = `${cert.issuer} · ${cert.year}`;
      overlay.classList.add("open");
    });

    overlay.addEventListener("click", (e) => {
      if (e.target === overlay || e.target.closest(".modal-close")) {
        overlay.classList.remove("open");
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") overlay.classList.remove("open");
    });
  }

  // ------------------------------------------------------------ Contact
  function renderContact() {
    const el = document.getElementById("contact-details");
    if (!el) return;
    const lang = getLang();
    el.innerHTML = `
      <div class="contact-row"><i class="fa-solid fa-envelope"></i><a href="mailto:${D.profile.email}">${D.profile.email}</a></div>
      <div class="contact-row"><i class="fa-brands fa-github"></i><a href="${D.profile.social.github}" target="_blank" rel="noopener">GitHub</a></div>
      <div class="contact-row"><i class="fa-brands fa-linkedin"></i><a href="${D.profile.social.linkedin}" target="_blank" rel="noopener">LinkedIn</a></div>
      <div class="contact-row"><i class="fa-brands fa-instagram"></i><a href="${D.profile.social.instagram}" target="_blank" rel="noopener">Instagram</a></div>
      <div class="contact-row"><i class="fa-brands fa-whatsapp"></i><a href="${D.profile.whatsapp}" target="_blank" rel="noopener">WhatsApp</a></div>
      <div class="contact-row"><i class="fa-solid fa-location-dot"></i><span>${D.profile.location}</span></div>
    `;
  }

  function renderFooter() {
    const el = document.getElementById("footer-social");
    if (!el) return;
    el.innerHTML = `
      <a href="${D.profile.social.github}" target="_blank" rel="noopener" aria-label="GitHub"><i class="fa-brands fa-github"></i></a>
      <a href="${D.profile.social.linkedin}" target="_blank" rel="noopener" aria-label="LinkedIn"><i class="fa-brands fa-linkedin"></i></a>
      <a href="${D.profile.social.instagram}" target="_blank" rel="noopener" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
      <a href="mailto:${D.profile.email}" aria-label="Email"><i class="fa-solid fa-envelope"></i></a>
    `;
  }

  // ------------------------------------------------------------ Theme Toggle
  function initThemeToggle() {
    const toggle = document.getElementById('theme-toggle');
    const icon = document.getElementById('theme-icon');
    if (!toggle || !icon) return;

    const savedTheme = localStorage.getItem('theme');
    let theme = savedTheme;
    
    if (!savedTheme) {
      theme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
      localStorage.setItem('theme', theme);
    }
    
    document.documentElement.setAttribute('data-theme', theme);
    updateThemeIcon(theme);

    toggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme);
      
      window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme: newTheme } }));
    });

    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        const newTheme = e.matches ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        updateThemeIcon(newTheme);
      }
    });

    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'd' || e.key === 'D')) {
        e.preventDefault();
        toggle.click();
      }
    });

    function updateThemeIcon(theme) {
      icon.className = theme === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
    }
  }

  // ------------------------------------------------------------ Lenis
  function initLenis() {
    if (typeof Lenis === "undefined") return;
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    if (window.ScrollTrigger) {
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    }
    window.__lenis = lenis;
  }

  // ------------------------------------------------------------ Nav
  function initNav() {
    const navbar = document.getElementById("navbar");
    const links = document.querySelectorAll(".nav-links a");
    const sections = document.querySelectorAll("section[id]");
    const toggle = document.getElementById("nav-toggle");
    const mobileMenu = document.getElementById("mobile-menu");

    window.addEventListener("scroll", () => {
      navbar.classList.toggle("scrolled", window.scrollY > 40);
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          links.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === "#" + entry.target.id));
        }
      });
    }, { rootMargin: "-45% 0px -45% 0px" });
    sections.forEach((s) => observer.observe(s));

    if (toggle && mobileMenu) {
      toggle.addEventListener("click", () => mobileMenu.classList.toggle("open"));
      mobileMenu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => mobileMenu.classList.remove("open")));
    }

    document.getElementById("back-to-top")?.addEventListener("click", () => {
      if (window.__lenis) window.__lenis.scrollTo(0);
      else window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ------------------------------------------------------------ Typing animation
  function initTypingAnimation() {
    const el = document.getElementById("typed-role");
    if (!el) return;
    const roles = D.profile.roles;
    let roleIndex = 0, charIndex = 0, deleting = false;

    function tick() {
      const current = roles[roleIndex];
      if (!deleting) {
        charIndex++;
        el.textContent = current.slice(0, charIndex);
        if (charIndex === current.length) {
          deleting = true;
          setTimeout(tick, 1600);
          return;
        }
      } else {
        charIndex--;
        el.textContent = current.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
        }
      }
      setTimeout(tick, deleting ? 40 : 70);
    }
    tick();
  }

  // ------------------------------------------------------------ Counters
  function initCounters() {
    const counters = document.querySelectorAll("[data-count]");
    if (!counters.length) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseFloat(el.dataset.count);
        const suffix = el.dataset.suffix || "";
        const obj = { val: 0 };
        if (window.gsap) {
          gsap.to(obj, {
            val: target, duration: 1.6, ease: "power2.out",
            onUpdate: () => (el.textContent = Math.floor(obj.val) + suffix)
          });
        } else {
          el.textContent = target + suffix;
        }
        observer.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach((c) => observer.observe(c));
  }

  // ------------------------------------------------------------ Scroll reveals
  function initScrollReveals() {
    if (!window.gsap || !window.ScrollTrigger) return;
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray(".reveal").forEach((el) => {
      gsap.to(el, {
        opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%" }
      });
    });

    gsap.timeline()
      .to(".hero-name", { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" })
      .to(".hero-role-wrap", { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.5")
      .to(".hero-desc", { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.4")
      .to(".hero-actions", { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.4")
      .to(".hero-visual", { opacity: 1, duration: 1, ease: "power2.out" }, "-=0.8");
  }

  // ------------------------------------------------------------ World map
  function initWorldMap() {
    const canvas = document.getElementById("map-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    const w = () => canvas.clientWidth;
    const h = () => canvas.clientHeight;

    const landBands = [
      { yMin: 0.15, yMax: 0.55, xMin: 0.05, xMax: 0.28 },
      { yMin: 0.5, yMax: 0.85, xMin: 0.18, xMax: 0.34 },
      { yMin: 0.1, yMax: 0.45, xMin: 0.42, xMax: 0.58 },
      { yMin: 0.3, yMax: 0.85, xMin: 0.44, xMax: 0.62 },
      { yMin: 0.12, yMax: 0.6, xMin: 0.6, xMax: 0.95 },
      { yMin: 0.62, yMax: 0.82, xMin: 0.78, xMax: 0.95 }
    ];

    const marker = { x: 0.83, y: 0.52 };

    let t = 0;
    function draw() {
      ctx.clearRect(0, 0, w(), h());
      for (let i = 0; i < 70; i++) {
        for (let j = 0; j < 34; j++) {
          const nx = i / 70, ny = j / 34;
          const onLand = landBands.some((b) => nx >= b.xMin && nx <= b.xMax && ny >= b.yMin && ny <= b.yMax);
          if (!onLand) continue;
          if (Math.random() < 0.08) continue;
          ctx.fillStyle = "rgba(56, 189, 248, 0.35)";
          ctx.beginPath();
          ctx.arc(nx * w(), ny * h(), 1.4, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      const pulse = (Math.sin(t) + 1) / 2;
      const mx = marker.x * w(), my = marker.y * h();
      ctx.strokeStyle = "rgba(124, 58, 237," + (0.6 - pulse * 0.5) + ")";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(mx, my, 6 + pulse * 14, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = "#7C3AED";
      ctx.beginPath();
      ctx.arc(mx, my, 5, 0, Math.PI * 2);
      ctx.fill();

      t += 0.04;
      requestAnimationFrame(draw);
    }
    draw();
  }
})();