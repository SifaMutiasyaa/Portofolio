// ============================================================
// SLIDER — Projects & Certificates
// ============================================================

class Slider {
  constructor(config) {
    this.track = config.track;
    this.prevBtn = config.prevBtn;
    this.nextBtn = config.nextBtn;
    this.dotsContainer = config.dotsContainer;
    this.itemsPerView = config.itemsPerView || 2;
    this.gap = config.gap || 24;
    this.currentIndex = 0;
    this.totalItems = 0;
    this.items = [];
    this.isAnimating = false;
    this.touchStartX = 0;
    this.touchDeltaX = 0;
    this.isDragging = false;

    this.init();
  }

  init() {
    this.items = this.track.querySelectorAll('.project-card, .cert-card');
    this.totalItems = this.items.length;

    if (this.totalItems === 0) return;

    // Set initial items per view based on screen
    this.updateItemsPerView();

    // Create dots
    this.createDots();

    // Set initial position
    this.updateSlider();

    // Events
    this.prevBtn.addEventListener('click', () => this.prev());
    this.nextBtn.addEventListener('click', () => this.next());

    // Touch events for mobile swipe
    this.track.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: true });
    this.track.addEventListener('touchmove', (e) => this.handleTouchMove(e), { passive: true });
    this.track.addEventListener('touchend', (e) => this.handleTouchEnd(e), { passive: true });

    // Mouse drag for desktop
    this.track.addEventListener('mousedown', (e) => this.handleMouseDown(e));
    this.track.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    this.track.addEventListener('mouseup', (e) => this.handleMouseUp(e));
    this.track.addEventListener('mouseleave', (e) => this.handleMouseUp(e));

    // Resize
    window.addEventListener('resize', () => {
      this.updateItemsPerView();
      this.updateSlider();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.prev();
      if (e.key === 'ArrowRight') this.next();
    });

    // Update dots on load
    this.updateDots();
  }

  updateItemsPerView() {
    const width = window.innerWidth;
    if (width < 600) {
      this.itemsPerView = 1;
    } else if (width < 900) {
      this.itemsPerView = 1.5;
    } else {
      this.itemsPerView = 2;
    }
    // Clamp
    this.itemsPerView = Math.min(this.itemsPerView, this.totalItems || 1);
  }

  createDots() {
    if (!this.dotsContainer) return;
    const numDots = Math.ceil(this.totalItems / this.itemsPerView);
    this.dotsContainer.innerHTML = '';
    for (let i = 0; i < numDots; i++) {
      const dot = document.createElement('button');
      dot.className = 'slider-dot';
      dot.dataset.index = i;
      dot.addEventListener('click', () => this.goTo(i));
      this.dotsContainer.appendChild(dot);
    }
  }

  updateDots() {
    if (!this.dotsContainer) return;
    const dots = this.dotsContainer.querySelectorAll('.slider-dot');
    const activeIndex = Math.round(this.currentIndex / this.itemsPerView);
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === activeIndex);
    });
  }

  getMaxIndex() {
    return Math.max(0, Math.ceil(this.totalItems / this.itemsPerView) - 1);
  }

  updateSlider() {
    if (this.isAnimating) return;
    const maxIndex = this.getMaxIndex();
    this.currentIndex = Math.min(Math.max(this.currentIndex, 0), maxIndex);

    const itemWidth = this.items.length > 0 
      ? this.items[0].offsetWidth + this.gap 
      : 0;
    const offset = this.currentIndex * (itemWidth * this.itemsPerView);
    this.track.style.transform = `translateX(-${offset}px)`;

    // Update button states
    this.prevBtn.disabled = this.currentIndex === 0;
    this.nextBtn.disabled = this.currentIndex >= maxIndex;

    this.updateDots();
  }

  goTo(index) {
    if (this.isAnimating) return;
    const maxIndex = this.getMaxIndex();
    index = Math.min(Math.max(index, 0), maxIndex);
    if (index === this.currentIndex) return;
    this.currentIndex = index;
    this.updateSlider();
  }

  prev() {
    if (this.isAnimating || this.currentIndex === 0) return;
    this.currentIndex--;
    this.updateSlider();
  }

  next() {
    if (this.isAnimating || this.currentIndex >= this.getMaxIndex()) return;
    this.currentIndex++;
    this.updateSlider();
  }

  // Touch handlers
  handleTouchStart(e) {
    this.touchStartX = e.touches[0].clientX;
    this.isDragging = false;
  }

  handleTouchMove(e) {
    if (!this.touchStartX) return;
    const deltaX = this.touchStartX - e.touches[0].clientX;
    if (Math.abs(deltaX) > 10) {
      this.isDragging = true;
    }
    this.touchDeltaX = deltaX;
  }

  handleTouchEnd(e) {
    if (!this.isDragging) {
      // It's a tap, not a swipe
      this.touchStartX = 0;
      this.touchDeltaX = 0;
      this.isDragging = false;
      return;
    }

    const threshold = 50;
    if (this.touchDeltaX > threshold) {
      this.next();
    } else if (this.touchDeltaX < -threshold) {
      this.prev();
    }

    this.touchStartX = 0;
    this.touchDeltaX = 0;
    this.isDragging = false;
  }

  // Mouse drag handlers (desktop swipe)
  handleMouseDown(e) {
    this.touchStartX = e.clientX;
    this.isDragging = false;
  }

  handleMouseMove(e) {
    if (!this.touchStartX) return;
    const deltaX = this.touchStartX - e.clientX;
    if (Math.abs(deltaX) > 10) {
      this.isDragging = true;
    }
    this.touchDeltaX = deltaX;
  }

  handleMouseUp(e) {
    if (!this.isDragging) {
      this.touchStartX = 0;
      this.touchDeltaX = 0;
      this.isDragging = false;
      return;
    }

    const threshold = 50;
    if (this.touchDeltaX > threshold) {
      this.next();
    } else if (this.touchDeltaX < -threshold) {
      this.prev();
    }

    this.touchStartX = 0;
    this.touchDeltaX = 0;
    this.isDragging = false;
  }
}

// ============================================================
// INITIALIZE SLIDERS
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
  // Projects Slider
  const projectsTrack = document.getElementById('projects-track');
  const projectsPrev = document.getElementById('projects-prev');
  const projectsNext = document.getElementById('projects-next');
  const projectsDots = document.getElementById('projects-dots');

  if (projectsTrack && projectsPrev && projectsNext) {
    new Slider({
      track: projectsTrack,
      prevBtn: projectsPrev,
      nextBtn: projectsNext,
      dotsContainer: projectsDots,
      itemsPerView: 2,
      gap: 24
    });
  }

  // Certificates Slider
  const certTrack = document.getElementById('cert-track');
  const certPrev = document.getElementById('cert-prev');
  const certNext = document.getElementById('cert-next');
  const certDots = document.getElementById('cert-dots');

  if (certTrack && certPrev && certNext) {
    new Slider({
      track: certTrack,
      prevBtn: certPrev,
      nextBtn: certNext,
      dotsContainer: certDots,
      itemsPerView: 3,
      gap: 24
    });
  }
});