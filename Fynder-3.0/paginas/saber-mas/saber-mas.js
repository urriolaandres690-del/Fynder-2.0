function initFynderAnimations() {
  const page = document.getElementById('page-fynder');
  if (!page) return;

  // Marcar elementos animables
  const animTargets = [
    { sel: '.fyl-what-card',    parent: '.fyl-what-grid' },
    { sel: '.fyl-feature',      parent: '.fyl-features-grid' },
    { sel: '.fyl-step',         parent: '.fyl-steps' },
    { sel: '.fyl-impact-card',  parent: '.fyl-impact-grid' },
    { sel: '.fyl-testi',        parent: '.fyl-testimonials' },
    { sel: '.fyl-for-card',     parent: '.fyl-for-grid' },
    { sel: '.fyl-cat',          parent: '.fyl-cats' },
  ];

  animTargets.forEach(({ sel }) => {
    page.querySelectorAll(sel).forEach(el => {
      el.classList.add('fyl-animate-child');
    });
  });

  // Secciones completas
  page.querySelectorAll('.fyl-section-label, .fyl-section-title, .fyl-section-lead, .fyl-steps, .fyl-compare, .fyl-faq, .fyl-impact-grid, .fyl-cta, .fyl-what-grid, .fyl-features-grid, .fyl-cats, .fyl-testimonials, .fyl-for-grid').forEach(el => {
    if (!el.classList.contains('fyl-animate-child')) {
      el.classList.add('fyl-animate');
    }
  });

  // Disconnect observer anterior si existe
  if (fynderObserver) fynderObserver.disconnect();

  fynderObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fyl-visible');
        // Una vez visible no necesitamos seguir observando
        fynderObserver.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  });

  // Observar todos los elementos animables
  page.querySelectorAll('.fyl-animate, .fyl-animate-child').forEach(el => {
    fynderObserver.observe(el);
  });

  // Hero visible inmediatamente
  page.querySelectorAll('.fyl-hero-content > *, .fyl-hero-visual, .fyl-hero-badge').forEach((el, i) => {
    el.style.animation = `fyl-fade-up .5s cubic-bezier(.22,1,.36,1) ${i * 0.1}s both`;
  });

  // Añadir efecto ripple a botones de categoría al click
  page.querySelectorAll('.fyl-cat').forEach(btn => {
    btn.addEventListener('click', createRipple, { once: false });
  });

  // Ripple en botones principales también
  page.querySelectorAll('.fyl-btn-primary, .fyl-for-btn-teal, .fyl-for-btn-purple, .fyl-cta-btn').forEach(btn => {
    btn.addEventListener('click', createRipple);
  });
}

