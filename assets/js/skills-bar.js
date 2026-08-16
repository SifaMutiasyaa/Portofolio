// ============================================================
// SKILLS — Horizontal Bar Chart
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
  const container = document.getElementById('skills-bars');
  if (!container) return;

  const skills = DATA.skills || [];

  if (skills.length === 0) {
    container.innerHTML = '<p style="color:var(--text-dim);text-align:center;">Tidak ada data skill.</p>';
    return;
  }

  // Kelompokkan berdasarkan kategori
  const categories = {};
  skills.forEach(skill => {
    const cat = skill.category || 'Lainnya';
    if (!categories[cat]) categories[cat] = [];
    categories[cat].push(skill);
  });

  let html = '';
  Object.keys(categories).forEach(cat => {
    html += `<div class="skill-bar-category">${cat}</div>`;
    categories[cat].forEach(skill => {
      const level = Math.min(Math.max(skill.level || 0, 0), 100);
      html += `
        <div class="skill-bar-item" data-skill="${skill.name}">
          <span class="skill-bar-label">${skill.name}</span>
          <div class="skill-bar-track">
            <div class="skill-bar-fill" data-level="${level}" style="width:0%;"></div>
          </div>
          <span class="skill-bar-percent">${level}%</span>
        </div>
      `;
    });
  });

  container.innerHTML = html;

  // Animasi muncul dengan Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fills = entry.target.querySelectorAll('.skill-bar-fill');
        fills.forEach((fill, index) => {
          const level = parseInt(fill.dataset.level) || 0;
          setTimeout(() => {
            fill.style.width = level + '%';
          }, 200 + index * 80);
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  observer.observe(container);
});