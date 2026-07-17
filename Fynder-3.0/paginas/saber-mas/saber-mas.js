// ── saber-mas.js ──

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

function createRipple(e) {
  const btn = e.currentTarget;
  // Evitar duplicar el listener
  const existing = btn.querySelector('.fyl-ripple-el');
  if (existing) existing.remove();

  const rect   = btn.getBoundingClientRect();
  const size   = Math.max(rect.width, rect.height) * 2;
  const x      = e.clientX - rect.left - size / 2;
  const y      = e.clientY - rect.top  - size / 2;

  const ripple = document.createElement('span');
  ripple.className = 'fyl-ripple-el';
  ripple.style.cssText = `
    position:absolute;
    width:${size}px;height:${size}px;
    left:${x}px;top:${y}px;
    border-radius:50%;
    background:rgba(255,255,255,.28);
    transform:scale(0);
    animation:fyl-ripple .55s linear forwards;
    pointer-events:none;
    z-index:0;
  `;
  btn.style.position = btn.style.position || 'relative';
  btn.style.overflow = 'hidden';
  btn.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);
}


// menu movil

function toggleMobileMenu() {
  const drawer  = document.getElementById('mobileMenuDrawer');
  const overlay = document.getElementById('mobileMenuOverlay');
  const burger  = document.getElementById('navHamburger');
  const isOpen  = drawer.classList.contains('open');
  if (isOpen) {
    closeMobileMenu();
  } else {
    drawer.classList.add('open');
    overlay.classList.add('open');
    if (burger) burger.classList.add('open');
    document.body.style.overflow = 'hidden';
    updateMobileMenuActions();
    // Mostrar/ocultar botón Salir según sesión
    const salirBtn = document.getElementById('mobileMenuSalirBtn');
    if (salirBtn) salirBtn.style.display = localStorage.getItem('fynderLogged') ? '' : 'none';
    setTimeout(_applyDrawerAvatarBg, 10);
  }
}

function closeMobileMenu() {
  document.getElementById('mobileMenuDrawer').classList.remove('open');
  document.getElementById('mobileMenuOverlay').classList.remove('open');
  const burger = document.getElementById('navHamburger');
  if (burger) burger.classList.remove('open');
  document.body.style.overflow = '';
  // Cerrar también todos los submenús
  document.querySelectorAll('.mobile-submenu.open').forEach(s => s.classList.remove('open'));
  document.querySelectorAll('.mobile-menu-has-sub.sub-open').forEach(b => b.classList.remove('sub-open'));
}

/** Despliega/colapsa un submenú en el menú móvil */
function toggleMobileSubMenu(id, btn) {
  const sub = document.getElementById(id);
  if (!sub) return;
  const isOpen = sub.classList.contains('open');
  // Cerrar todos los demás
  document.querySelectorAll('.mobile-submenu.open').forEach(s => { if (s !== sub) s.classList.remove('open'); });
  document.querySelectorAll('.mobile-menu-has-sub.sub-open').forEach(b => { if (b !== btn) b.classList.remove('sub-open'); });
  sub.classList.toggle('open', !isOpen);
  if (btn) btn.classList.toggle('sub-open', !isOpen);
}

/** Traducir página (usa Web Share o navigator.language como fallback) */
function mobileTranslate() {
  const url = `https://translate.google.com/translate?hl=es&sl=auto&tl=es&u=${encodeURIComponent(location.href)}`;
  window.open(url, '_blank');
}

/** Compartir página actual */
async function mobileShare() {
  const data = { title: 'Fynder – Descubre Negocios Locales', url: location.href };
  try {
    if (navigator.share) {
      await navigator.share(data);
    } else {
      await navigator.clipboard.writeText(location.href);
      showToast('🔗 Enlace copiado al portapapeles');
    }
  } catch {
    showToast('No se pudo compartir');
  }
}

/** Copiar enlace al portapapeles */
async function mobileCopyLink() {
  try {
    await navigator.clipboard.writeText(location.href);
    showToast('🔗 Enlace copiado');
  } catch {
    showToast('No se pudo copiar el enlace');
  }
}

// cerrar menu al navegar
const _origGoPage = goPage;
// se cierra en goPage
function updateMobileMenuActions() {
  const logged = !!localStorage.getItem('fynderLogged');
  const user   = JSON.parse(localStorage.getItem('fynderUser') || 'null');
  const el     = document.getElementById('mobileMenuActions');
  if (!el) return;

  if (logged && user) {
    el.innerHTML = `
      <div class="mobile-menu-user-info" onclick="toggleAccountSwitcher()" style="cursor:pointer">
        <div class="mobile-menu-avatar">${_buildDrawerAvatar(user)}</div>
        <div style="flex:1;min-width:0">
          <strong>${user.name}</strong>
          <span>${user.email || ''}</span>
        </div>
        <i class="fas fa-chevron-down mobile-account-chevron" id="accountChevron" style="font-size:.7rem;color:var(--muted);transition:transform .25s;flex-shrink:0"></i>
      </div>

      <!-- Panel de cuentas guardadas -->
      <div class="mobile-accounts-panel" id="mobileAccountsPanel">
        ${_buildSavedAccountsList()}
        <button class="mobile-add-account-btn" onclick="_openAddAccountFlow()">
          <i class="fas fa-plus-circle"></i> Agregar otra cuenta
        </button>
      </div>

      <button class="mobile-action-btn mobile-action-panel" onclick="closeMobileMenu();goPage('dashboard')">
        <i class="fas fa-chart-line"></i> Mi panel
      </button>
      <button class="mobile-action-btn mobile-action-profile" onclick="closeMobileMenu();goPage('profile')">
        <i class="fas fa-user-circle"></i> Mi perfil
      </button>
      <button class="mobile-action-btn mobile-action-biz" onclick="closeMobileMenu();goPage('business')">
        <i class="fas fa-plus"></i> Registrar negocio
      </button>
      <button class="mobile-action-btn mobile-action-logout" onclick="closeMobileMenu();logout()">
        <i class="fas fa-right-from-bracket"></i> Cerrar sesión
      </button>`;
  } else {
    el.innerHTML = `
      <button class="mobile-action-btn mobile-action-biz" onclick="closeMobileMenu();goPage('business')">
        <i class="fas fa-plus"></i> Registrar negocio
      </button>
      <button class="mobile-action-btn mobile-action-login" onclick="closeMobileMenu();goPage('login')">
        <i class="fas fa-right-to-bracket"></i> Iniciar sesión
      </button>
      <button class="mobile-action-btn mobile-action-register-acc" onclick="closeMobileMenu();goPage('register')">
        <i class="fas fa-user-plus"></i> Crear cuenta
      </button>`;
  }
}

/* ── Construye el HTML del avatar para el drawer (foto / emoji / iniciales) ── */
function _buildDrawerAvatar(user, size) {
  const px = size || 38;
  const stored = localStorage.getItem('fynderAvatarPhoto');
  const preset = localStorage.getItem('fynderAvatarPreset');
  const initBg = localStorage.getItem('fynderAvatarInitialBg');

  if (stored) {
    return `<img src="${stored}" alt="Avatar" style="width:${px}px;height:${px}px;object-fit:cover;border-radius:50%;display:block">`;
  } else if (preset) {
    return `<span style="font-size:${Math.round(px*0.5)}px;line-height:1">${preset}</span>`;
  } else {
    const initials = user?.name ? _getInitials(user.name) : '?';
    const bg = initBg || 'linear-gradient(135deg,#67B8B4,#2F5BB7)';
    return `<span data-avatar-bg="${bg}" style="font-size:${Math.round(px*0.42)}px;font-weight:800;color:#fff;font-family:'Poppins',sans-serif">${initials}</span>`;
  }
}

/* Aplica el fondo al avatar si es de tipo iniciales (necesita el span con data-avatar-bg) */
function _applyDrawerAvatarBg() {
  document.querySelectorAll('[data-avatar-bg]').forEach(span => {
    const bg = span.getAttribute('data-avatar-bg');
    if (span.parentElement) span.parentElement.style.background = bg;
  });
}

/* ── Cuentas guardadas ── */
function _getSavedAccounts() {
  return JSON.parse(localStorage.getItem('fynderSavedAccounts') || '[]');
}
function _setSavedAccounts(arr) {
  localStorage.setItem('fynderSavedAccounts', JSON.stringify(arr));
}

/* Guarda la cuenta actual en la lista de cuentas guardadas */
function _saveCurrentAccount() {
  const user = JSON.parse(localStorage.getItem('fynderUser') || 'null');
  if (!user) return;
  const accounts = _getSavedAccounts();
  const idx = accounts.findIndex(a => a.email === user.email);
  const entry = {
    name:         user.name,
    email:        user.email,
    pass:         user.pass,
    city:         user.city  || '',
    bio:          user.bio   || '',
    phone:        user.phone || '',
    avatarPhoto:  localStorage.getItem('fynderAvatarPhoto')     || null,
    avatarPreset: localStorage.getItem('fynderAvatarPreset')    || null,
    avatarInitBg: localStorage.getItem('fynderAvatarInitialBg') || null,
    coverPhoto:   localStorage.getItem('fynderCoverPhoto')      || null,
    favorites:    JSON.stringify([...favorites])
  };
  if (idx >= 0) accounts[idx] = entry;
  else accounts.push(entry);
  _setSavedAccounts(accounts);
}

function _buildSavedAccountsList() {
  const accounts = _getSavedAccounts();
  const currentEmail = JSON.parse(localStorage.getItem('fynderUser') || '{}').email;
  if (accounts.length === 0) return '';

  return accounts.map(acc => {
    const isActive = acc.email === currentEmail;
    const avatarHtml = acc.avatarPhoto
      ? `<img src="${acc.avatarPhoto}" style="width:32px;height:32px;object-fit:cover;border-radius:50%;display:block">`
      : acc.avatarPreset
        ? `<span style="font-size:16px;line-height:1">${acc.avatarPreset}</span>`
        : `<span style="font-size:13px;font-weight:800;color:#fff;font-family:'Poppins',sans-serif">${_getInitials(acc.name)}</span>`;
    const bg = acc.avatarPhoto || acc.avatarPreset ? 'transparent' : (acc.avatarInitBg || 'linear-gradient(135deg,#67B8B4,#2F5BB7)');

    return `
      <button class="mobile-saved-account ${isActive ? 'active' : ''}" onclick="_switchToAccount('${acc.email}')" ${isActive ? 'disabled' : ''}>
        <div class="mobile-saved-account-avatar" style="background:${bg}">${avatarHtml}</div>
        <div style="flex:1;min-width:0;text-align:left">
          <strong>${acc.name}</strong>
          <span>${acc.email}</span>
        </div>
        ${isActive ? '<i class="fas fa-check" style="color:var(--primary);font-size:.75rem;flex-shrink:0"></i>' : '<i class="fas fa-arrow-right-to-bracket" style="color:var(--muted);font-size:.7rem;flex-shrink:0"></i>'}
      </button>`;
  }).join('');
}

function toggleAccountSwitcher() {
  const panel   = document.getElementById('mobileAccountsPanel');
  const chevron = document.getElementById('accountChevron');
  if (!panel) return;
  const open = panel.classList.toggle('open');
  if (chevron) chevron.style.transform = open ? 'rotate(180deg)' : '';
  // Aplicar fondo a avatares de iniciales tras abrir
  if (open) setTimeout(_applyDrawerAvatarBg, 10);
}

function _switchToAccount(email) {
  // Guardar estado de la cuenta actual antes de cambiar
  _saveCurrentAccount();

  const accounts = _getSavedAccounts();
  const acc = accounts.find(a => a.email === email);
  if (!acc) return;

  // Restaurar usuario
  const userObj = { name: acc.name, email: acc.email, pass: acc.pass, city: acc.city, bio: acc.bio, phone: acc.phone };
  localStorage.setItem('fynderUser', JSON.stringify(userObj));
  localStorage.setItem('fynderLogged', 'true');
  localStorage.setItem('fynderUserStatus', 'active');

  // Restaurar avatar
  if (acc.avatarPhoto)  localStorage.setItem('fynderAvatarPhoto',      acc.avatarPhoto);
  else                  localStorage.removeItem('fynderAvatarPhoto');
  if (acc.avatarPreset) localStorage.setItem('fynderAvatarPreset',     acc.avatarPreset);
  else                  localStorage.removeItem('fynderAvatarPreset');
  if (acc.avatarInitBg) localStorage.setItem('fynderAvatarInitialBg',  acc.avatarInitBg);
  else                  localStorage.removeItem('fynderAvatarInitialBg');
  // Restaurar portada
  if (acc.coverPhoto)   localStorage.setItem('fynderCoverPhoto',       acc.coverPhoto);
  else                  localStorage.removeItem('fynderCoverPhoto');

  // Restaurar favoritos
  if (acc.favorites) {
    const favArr = JSON.parse(acc.favorites || '[]');
    favorites.clear();
    favArr.forEach(id => favorites.add(id));
    localStorage.setItem('fynderFavorites', acc.favorites);
  }

  document.getElementById('userName').textContent = 'Hola, ' + acc.name;
  updateNav();
  closeMobileMenu();
  showToast(`Cambiado a ${acc.name} ✓`);
}

function _openAddAccountFlow() {
  // Guardar cuenta actual antes de salir
  _saveCurrentAccount();
  // Cerrar sesión temporalmente y llevar al login con flag
  localStorage.setItem('fynderAddingAccount', '1');
  closeMobileMenu();
  logout(true); // true = silencioso, no mostrar toast ni redirigir
  goPage('login');
  showToast('Inicia sesión con la nueva cuenta');
}

/* Sobrescribir logout para soportar modo silencioso */
const _origLogout = typeof logout === 'function' ? logout : null;
function logout(silent) {
  // Guardar estado de la cuenta antes de limpiar
  _saveCurrentAccount();
  localStorage.setItem('fynderUserStatus', 'offline');
  localStorage.removeItem('fynderLogged');
  // Limpiar datos visuales del perfil (no pertenecen a ninguna sesión activa)
  _clearProfileVisualData();
  document.getElementById('userName').textContent = '';
  favorites.clear();
  localStorage.removeItem('fynderFavorites');
  // Al cerrar sesión, volver siempre a modo claro
  document.documentElement.setAttribute('data-theme', 'light');
  localStorage.setItem('fynderTheme', 'light');
  updateNav();
  if (!silent) {
    showToast('Sesión cerrada. ¡Hasta pronto!');
    goPage('home');
  }
}

/* Elimina las claves de perfil visual de la sesión activa */
function _clearProfileVisualData() {
  localStorage.removeItem('fynderAvatarPhoto');
  localStorage.removeItem('fynderAvatarPreset');
  localStorage.removeItem('fynderAvatarInitialBg');
  localStorage.removeItem('fynderCoverPhoto');
  localStorage.removeItem('fynderUserStatus');
}

// cerrar al hacer click
document.addEventListener('click', e => {
  const drawer = document.getElementById('mobileMenuDrawer');
  if (drawer && drawer.classList.contains('open')) {
    // Si el click fue en un botón de navegación dentro del drawer, ya se cierra por closeMobileMenu()
  }
});

// cerrar con tecla escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeMobileMenu();
});


// animaciones pagina about
