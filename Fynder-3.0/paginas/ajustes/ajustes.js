// ── ajustes.js ──

/* PÁGINA DE AJUSTES */

/** Navega a una sección del panel de ajustes */
function settGoSection(id, btn) {
  document.querySelectorAll('#page-settings .sett-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('#page-settings .sett-nav-item').forEach(b => b.classList.remove('active'));

  const sec = document.getElementById('sett-' + id);
  if (sec) sec.classList.add('active');
  if (btn) btn.classList.add('active');

  // Sync específico al entrar en cada sección
  if (id === 'cuenta')         settSyncAccount();
  if (id === 'apariencia')     settSyncAppearance();
  if (id === 'notificaciones') settSyncNotif();
  if (id === 'privacidad')     settSyncNotif();   // read toggle vive aquí también
  if (id === 'accesibilidad')  settSyncAccessibility();
  if (id === 'datos')          settSyncStorage();
  if (id === 'rendimiento')    settSyncRendimiento();
  if (id === 'sistema')        settSyncSistema();
  if (id === 'herramientas')   settSyncHerramientas();
  if (id === 'idioma')         settSyncIdioma();
  if (id === 'amigos')         settSyncAmigos();
  if (id === 'mensajes')       settSyncMensajesSection();
}

/** Helper para navegar desde dentro del contenido (sin referencia al botón) */
function settGoToSection(id) {
  const btn = document.querySelector(`#page-settings .sett-nav-item[data-section="${id}"]`);
  settGoSection(id, btn);
}

/** Inicializa la página cada vez que se navega a ella */
function initSettingsPage() {
  // Activar sección "cuenta" por defecto
  const firstBtn = document.querySelector('#page-settings .sett-nav-item[data-section="cuenta"]');
  settGoSection('cuenta', firstBtn);
}

// ── CUENTA ─────────────────────────────────────────────────────────────────

function settSyncAccount() {
  const logged = !!localStorage.getItem('fynderLogged');
  const user = logged ? JSON.parse(localStorage.getItem('fynderUser') || '{}') : {};

  const nameEl  = document.getElementById('settUserName');
  const emailEl = document.getElementById('settUserEmail');
  const avaEl   = document.getElementById('settUserAvatar');

  if (nameEl)  nameEl.textContent  = logged ? (user.name  || 'Usuario') : '';
  if (emailEl) emailEl.textContent = logged ? (user.email || '—') : '';

  if (avaEl) {
    if (!logged) {
      avaEl.innerHTML = '';
      avaEl.textContent = '';
    } else {
      const photo  = localStorage.getItem('fynderAvatarPhoto');
      const preset = localStorage.getItem('fynderAvatarPreset');
      if (photo) {
        avaEl.innerHTML = `<img src="${photo}" alt="avatar" style="width:100%;height:100%;object-fit:cover;border-radius:50%">`;
      } else if (preset) {
        avaEl.innerHTML = '';
        avaEl.textContent = preset;
      } else {
        avaEl.innerHTML = '';
        avaEl.textContent = (user.name || 'U')[0].toUpperCase();
        const bg = localStorage.getItem('fynderAvatarInitialBg');
        if (bg) avaEl.style.background = bg;
      }
    }
  }

  const planEl = document.getElementById('settPlanLabel');
  if (planEl) {
    const bizList = JSON.parse(localStorage.getItem('fynderBusinesses') || '[]');
    planEl.textContent = bizList[0]?.plan || 'Free';
  }
  // Sincronizar modo invisible
  _syncInvisibleSetting();
  // Sincronizar conteo de amigos
  _updateFriendCount();
}

/** Cierra sesión correctamente usando la función centralizada */
function settLogout() {
  if (!confirm('¿Cerrar sesión?')) return;
  logout();   // llama a la función completa que limpia todo
}

// ── APARIENCIA ──────────────────────────────────────────────────────────────

function settSyncAppearance() {
  _loadMsgSettings();

  // Modo oscuro
  const darkBtn = document.getElementById('settDarkToggle');
  if (darkBtn) {
    darkBtn.classList.toggle('on', document.documentElement.getAttribute('data-theme') === 'dark');
  }

  // Tamaño de fuente del chat
  const fontBtns = document.querySelectorAll('#sett-apariencia .sett-font-btn');
  const sizes = ['small', 'normal', 'large'];
  const currentSize = _msgSettings.fontSize || 'normal';
  fontBtns.forEach((btn, i) => btn.classList.toggle('active', sizes[i] === currentSize));

  // Color de burbujas
  const currentColor = _msgSettings.bubbleColor || '#1a5c34';
  document.querySelectorAll('#sett-apariencia .sett-color-dot').forEach(dot => {
    dot.classList.toggle('active', dot.dataset.color === currentColor);
  });
}

function settToggleDark() {
  toggleDarkMode();
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const btn = document.getElementById('settDarkToggle');
  if (btn) btn.classList.toggle('on', isDark);
}

// ── NOTIFICACIONES / PRIVACIDAD ─────────────────────────────────────────────

function settSyncNotif() {
  _loadMsgSettings();

  // Estado del permiso nativo del navegador
  const statusEl = document.getElementById('settNotifStatusLabel');
  if (statusEl) {
    if (!('Notification' in window)) {
      statusEl.textContent = '⚠️ No compatible con este navegador';
    } else {
      const map = { granted: '✅ Activadas', denied: '🚫 Bloqueadas por el navegador', default: 'Sin configurar — haz clic en Activar' };
      statusEl.textContent = map[Notification.permission] || 'Sin configurar';
    }
  }

  // Botón "Activar": cambiar texto/estado según permiso
  const activarBtn = document.getElementById('settNotifActivarBtn');
  if (activarBtn) {
    const perm = ('Notification' in window) ? Notification.permission : 'unsupported';
    if (perm === 'granted') {
      activarBtn.textContent = '✓ Activado';
      activarBtn.style.background = '#10B981';
      activarBtn.style.color = '#fff';
      activarBtn.style.borderColor = '#10B981';
      activarBtn.disabled = true;
      activarBtn.onclick = null;
    } else if (perm === 'denied') {
      activarBtn.textContent = '🚫 Bloqueado';
      activarBtn.style.background = '';
      activarBtn.style.color = '#EF4444';
      activarBtn.style.borderColor = '#EF4444';
      activarBtn.disabled = true;
      activarBtn.onclick = null;
    } else if (perm === 'unsupported') {
      activarBtn.style.display = 'none';
    } else {
      activarBtn.textContent = 'Activar';
      activarBtn.style.background = '';
      activarBtn.style.color = '';
      activarBtn.style.borderColor = '';
      activarBtn.disabled = false;
      activarBtn.onclick = () => handleNotifBannerClick(activarBtn).then(() => settSyncNotif());
    }
  }

  // Toggles de notificaciones de chat y sonido
  const chatT  = document.getElementById('settNotifChatToggle');
  const soundT = document.getElementById('settSoundToggle2');
  if (chatT)  chatT.classList.toggle('on', _msgSettings.notif);
  if (soundT) soundT.classList.toggle('on', _msgSettings.sound);

  // Toggle de confirmación de lectura (sección privacidad)
  const readT = document.getElementById('settReadToggle2');
  if (readT) readT.classList.toggle('on', _msgSettings.read);
}

/** Toggle genérico de preferencias de mensajes/ajustes */
function settToggleSetting(key, btnId) {
  // Claves de mensajes (legacy _msgSettings)
  const msgKeys = ['notif', 'sound', 'read'];
  if (msgKeys.includes(key)) {
    _loadMsgSettings();
    _msgSettings[key] = !_msgSettings[key];
    _saveMsgSettings();
    const btn = document.getElementById(btnId);
    if (btn) btn.classList.toggle('on', _msgSettings[key]);
    const mirror = { notif: 'settingNotifToggle', sound: 'settingSoundToggle', read: 'settingReadToggle' };
    const mirrorEl = document.getElementById(mirror[key]);
    if (mirrorEl) mirrorEl.classList.toggle('on', _msgSettings[key]);
    showToast(_msgSettings[key] ? 'Activado' : 'Desactivado');
    return;
  }

  // Claves de ajustes generales (localStorage fynder_key)
  const lsKey = 'fynder_' + key;
  const btn = document.getElementById(btnId);
  const currentVal = btn ? btn.classList.contains('on') : localStorage.getItem(lsKey) === '1';
  const newVal = !currentVal;
  localStorage.setItem(lsKey, newVal ? '1' : '0');
  if (btn) btn.classList.toggle('on', newVal);
  showToast(newVal ? 'Activado' : 'Desactivado');
}

// ── ACCESIBILIDAD ───────────────────────────────────────────────────────────

function settSyncAccessibility() {
  // Tamaño de fuente UI
  const sel = document.getElementById('settUIFontSize');
  if (sel) {
    const saved = localStorage.getItem('fynderUIFontSize') || 'normal';
    sel.value = saved;
  }

  // Reducir animaciones
  const rmBtn = document.getElementById('settReduceMotion');
  if (rmBtn) rmBtn.classList.toggle('on', document.documentElement.hasAttribute('data-reduce-motion'));
}

function settSetUIFontSize(val) {
  const map = { normal: '16px', large: '18px', xlarge: '20px' };
  document.documentElement.style.fontSize = map[val] || '16px';
  localStorage.setItem('fynderUIFontSize', val);
  showToast('Tamaño de fuente actualizado');
}

function settToggleReduceMotion() {
  const btn = document.getElementById('settReduceMotion');
  const active = document.documentElement.hasAttribute('data-reduce-motion');
  if (active) {
    document.documentElement.removeAttribute('data-reduce-motion');
    localStorage.removeItem('fynderReduceMotion');
    if (btn) btn.classList.remove('on');
    showToast('Animaciones activadas');
  } else {
    document.documentElement.setAttribute('data-reduce-motion', '1');
    localStorage.setItem('fynderReduceMotion', '1');
    if (btn) btn.classList.add('on');
    showToast('Animaciones reducidas');
  }
}

// ── DATOS ────────────────────────────────────────────────────────────────────

function settSyncStorage() {
  const el = document.getElementById('settStorageLabel');
  if (!el) return;
  let bytes = 0;
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k && k.startsWith('fynder')) {
      bytes += ((localStorage.getItem(k) || '').length * 2); // UTF-16
    }
  }
  const kb = (bytes / 1024).toFixed(1);
  el.textContent = `${kb} KB usados (localStorage)`;

  // Barra de progreso (localStorage máx ~5MB)
  const bar = document.getElementById('settStorageBar');
  if (bar) {
    const pct = Math.min((bytes / (5 * 1024 * 1024)) * 100, 100).toFixed(1);
    bar.style.width = pct + '%';
  }
}

function settClearData() {
  if (!confirm('¿Limpiar caché y preferencias locales?\n\nSe perderán: conversaciones, favoritos guardados y ajustes de la app.\nTu cuenta (nombre y contraseña) se mantendrá.')) return;

  const keep = ['fynderUser', 'fynderLogged', 'fynderTheme'];
  const toRemove = [];
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k && k.startsWith('fynder') && !keep.includes(k)) toRemove.push(k);
  }
  toRemove.forEach(k => localStorage.removeItem(k));

  // Reinicializar estado en memoria
  favorites.clear();
  updateNav();

  showToast('✅ Datos limpiados correctamente');
  settSyncStorage();
}

// ── HELPERS ──────────────────────────────────────────────────────────────────

/** Sincroniza los controles de apariencia del panel de mensajes cuando se cambian desde Ajustes */
function settSyncMsgUI() {
  _loadMsgSettings();
  
  // Sincronizar dots de color (panel de mensajes)
  document.querySelectorAll('.msg-color-dot').forEach(d => {
    d.classList.toggle('active', d.dataset.color === _msgSettings.bubbleColor);
  });
  
  // Sincronizar dots de color (página de ajustes)
  document.querySelectorAll('.sett-color-dot').forEach(d => {
    d.classList.toggle('active', d.dataset.color === _msgSettings.bubbleColor);
  });
  
  // Sincronizar botones de fuente (panel de mensajes)
  document.querySelectorAll('.msg-font-btn').forEach((btn, i) => {
    const sizes = ['small', 'normal', 'large'];
    btn.classList.toggle('active', sizes[i] === (_msgSettings.fontSize || 'normal'));
  });
  
  // Sincronizar botones de fuente (página de ajustes)
  document.querySelectorAll('.sett-font-btn').forEach((btn, i) => {
    const sizes = ['small', 'normal', 'large'];
    btn.classList.toggle('active', sizes[i] === (_msgSettings.fontSize || 'normal'));
  });
}

/** Sincroniza los toggles y labels de la sección de ajustes de Mensajes */
function settSyncMensajesSection() {
  // Restringir chat
  const restBtn = document.getElementById('settRestringirToggle');
  if (restBtn) restBtn.classList.toggle('on', localStorage.getItem('fynder_restringirChat') === '1');

  // Privacidad avanzada
  const privBtn = document.getElementById('settPrivAdvToggle');
  const privVal = localStorage.getItem('fynder_privAvanzada') === '1';
  if (privBtn) privBtn.classList.toggle('on', privVal);
  const privLabel = document.getElementById('settPrivAdvLabel');
  if (privLabel) privLabel.textContent = privVal ? 'Activada' : 'Desactivada';

  // Traducir mensajes
  const tradBtn = document.getElementById('settTraducirToggle');
  if (tradBtn) tradBtn.classList.toggle('on', localStorage.getItem('fynder_traducirMensajes') === '1');

  // Idioma de transcripciones
  const transcLabel = document.getElementById('settTranscripcionLabel');
  if (transcLabel) {
    const lang = localStorage.getItem('fynder_transcripcionLang') || 'Español';
    transcLabel.textContent = lang;
  }
}

/** Toggle especial para privacidad avanzada (actualiza el label) */
function settToggleMsgPriv() {
  const currentVal = localStorage.getItem('fynder_privAvanzada') === '1';
  const newVal = !currentVal;
  localStorage.setItem('fynder_privAvanzada', newVal ? '1' : '0');
  const btn = document.getElementById('settPrivAdvToggle');
  if (btn) btn.classList.toggle('on', newVal);
  const label = document.getElementById('settPrivAdvLabel');
  if (label) label.textContent = newVal ? 'Activada' : 'Desactivada';
  showToast(newVal ? 'Privacidad avanzada activada' : 'Privacidad avanzada desactivada');
}

/** Filtro de búsqueda en el sidebar */
function settFilterSections(q) {
  const query = q.toLowerCase().trim();
  document.querySelectorAll('#page-settings .sett-nav-item').forEach(btn => {
    const text = btn.textContent.toLowerCase();
    btn.style.display = (!query || text.includes(query)) ? '' : 'none';
  });
  document.querySelectorAll('#page-settings .sett-nav-divider').forEach(d => {
    d.style.display = query ? 'none' : '';
  });
}

// ── HERRAMIENTAS ─────────────────────────────────────────────────────────────

function settSyncHerramientas() {
  // Cerrar todos los expandibles al entrar a la sección
  document.querySelectorAll('#sett-herramientas .sett-expandable').forEach(e => e.classList.remove('open'));
  document.querySelectorAll('#sett-herramientas .sett-row-expandable').forEach(r => r.classList.remove('expanded'));
}

/** Abre/cierra un bloque expandible dentro de ajustes */
function settToggleExpand(id, row) {
  const panel = document.getElementById(id);
  if (!panel) return;
  const isOpen = panel.classList.contains('open');

  // Cerrar los demás del mismo grupo
  const parentSection = row.closest('.sett-section');
  if (parentSection) {
    parentSection.querySelectorAll('.sett-expandable.open').forEach(p => {
      if (p !== panel) {
        p.classList.remove('open');
        const sibRow = p.previousElementSibling;
        if (sibRow) sibRow.classList.remove('expanded');
      }
    });
  }

  panel.classList.toggle('open', !isOpen);
  row.classList.toggle('expanded', !isOpen);
}

// ── RENDIMIENTO ───────────────────────────────────────────────────────────────

function settSyncRendimiento() {
  // Sincronizar toggles de rendimiento desde localStorage
  const toggleMap = {
    perfAlerts:  'settPerfAlertsToggle',
    inactiveTabs:'settInactiveTabsToggle',
    memSaver:    'settMemSaverToggle',
    preload:     'settPreloadToggle',
  };
  Object.entries(toggleMap).forEach(([key, id]) => {
    const el = document.getElementById(id);
    if (el) {
      const saved = localStorage.getItem('fynder_' + key);
      // Default: activado excepto memSaver
      const defaultOn = key !== 'memSaver';
      const isOn = saved !== null ? saved === '1' : defaultOn;
      el.classList.toggle('on', isOn);
    }
  });

  // Ahorro de energía
  const energyBtn = document.getElementById('settEnergySaverToggle');
  if (energyBtn) energyBtn.classList.toggle('on', localStorage.getItem('fynderEnergySaver') === '1');

  // Modo de energía
  const eMode = parseInt(localStorage.getItem('fynderEnergyMode') || '1');
  settSelectEnergyMode(eMode);

  // Modo de precarga
  const pMode = parseInt(localStorage.getItem('fynderPreloadMode') || '2');
  settSelectPreloadMode(pMode);
}

function settSyncSistema() {
  const sysToggles = {
    bgRun:    'settBgRunToggle',
    hwAccel:  'settHwAccelToggle',
    sysNotif: 'settSysNotifToggle',
    localAI:  'settLocalAIToggle',
  };
  Object.entries(sysToggles).forEach(([key, id]) => {
    const el = document.getElementById(id);
    if (el) {
      const saved = localStorage.getItem('fynder_' + key);
      const isOn = saved !== null ? saved === '1' : true; // todos on por defecto
      el.classList.toggle('on', isOn);
    }
  });
}

function settToggleEnergySaver() {
  const btn = document.getElementById('settEnergySaverToggle');
  const isOn = btn && btn.classList.contains('on');
  if (btn) btn.classList.toggle('on', !isOn);
  localStorage.setItem('fynderEnergySaver', !isOn ? '1' : '');
  showToast(!isOn ? 'Ahorro de energía activado' : 'Ahorro de energía desactivado');
}

function settSelectEnergyMode(mode) {
  const d1 = document.getElementById('settEnergyOpt1');
  const d2 = document.getElementById('settEnergyOpt2');
  if (d1) d1.classList.toggle('active', mode === 1);
  if (d2) d2.classList.toggle('active', mode === 2);
  localStorage.setItem('fynderEnergyMode', mode);
}

function settSelectPreloadMode(mode) {
  const d1 = document.getElementById('settPreloadOpt1');
  const d2 = document.getElementById('settPreloadOpt2');
  if (d1) d1.classList.toggle('active', mode === 1);
  if (d2) d2.classList.toggle('active', mode === 2);
  localStorage.setItem('fynderPreloadMode', mode);
  showToast(mode === 1 ? 'Precarga ampliada activada' : 'Precarga estándar activada');
}

// ── RESTABLECER ───────────────────────────────────────────────────────────────

function settResetConfig() {
  if (!confirm('¿Restaurar todos los ajustes a sus valores predeterminados?\n\nTus datos de cuenta y negocios no se verán afectados.')) return;

  // Eliminar solo claves de ajustes (no datos de cuenta)
  const keepKeys = ['fynderUser', 'fynderLogged', 'fynderBusinesses', 'fynderChats'];
  const toRemove = [];
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k && k.startsWith('fynder') && !keepKeys.includes(k)) toRemove.push(k);
  }
  toRemove.forEach(k => localStorage.removeItem(k));

  // Restaurar tema claro
  document.documentElement.removeAttribute('data-theme');
  document.documentElement.style.fontSize = '16px';
  document.documentElement.removeAttribute('data-reduce-motion');

  showToast('✅ Ajustes restablecidos a valores predeterminados');
  // Recargar la sección actual
  const btn = document.querySelector('#page-settings .sett-nav-item.active');
  if (btn) settGoSection(btn.dataset.section, btn);
}


// ── INICIALIZACIÓN ────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  // Restaurar tamaño de fuente UI
  const savedFont = localStorage.getItem('fynderUIFontSize');
  if (savedFont) {
    const map = { normal: '16px', large: '18px', xlarge: '20px' };
    document.documentElement.style.fontSize = map[savedFont] || '16px';
  }
  // Restaurar reducción de animaciones
  if (localStorage.getItem('fynderReduceMotion')) {
    document.documentElement.setAttribute('data-reduce-motion', '1');
  }
  // Auto-traducción al iniciar
  _initAutoTranslate();
});

// ══════════════════════════════════════════════════════════════════════════════
// MODO INVISIBLE
// ══════════════════════════════════════════════════════════════════════════════

function settToggleInvisible() {
  const isOn = localStorage.getItem('fynderInvisible') === '1';
  const newVal = !isOn;
  localStorage.setItem('fynderInvisible', newVal ? '1' : '0');

  const btn = document.getElementById('settInvisibleToggle');
  const sub = document.getElementById('settInvisibleSub');
  if (btn) btn.classList.toggle('on', newVal);
  if (sub) sub.textContent = newVal
    ? 'Estás invisible — nadie ve que estás en línea'
    : 'Los demás ven que estás en línea';
  showToast(newVal ? '🕵️ Modo invisible activado' : '👁️ Modo invisible desactivado');

  // Aplicar indicador visual de estado
  _applyInvisibleMode(newVal);
}

function _applyInvisibleMode(invisible) {
  // Oculta o muestra el indicador verde de "en línea" en el avatar del navbar
  const onlineDots = document.querySelectorAll('.online-dot, .user-online-badge');
  onlineDots.forEach(d => d.style.display = invisible ? 'none' : '');
}

function _syncInvisibleSetting() {
  const isOn = localStorage.getItem('fynderInvisible') === '1';
  const btn = document.getElementById('settInvisibleToggle');
  const sub = document.getElementById('settInvisibleSub');
  if (btn) btn.classList.toggle('on', isOn);
  if (sub) sub.textContent = isOn
    ? 'Estás invisible — nadie ve que estás en línea'
    : 'Los demás ven que estás en línea';
  _applyInvisibleMode(isOn);
}

// ══════════════════════════════════════════════════════════════════════════════
// AMIGOS
// ══════════════════════════════════════════════════════════════════════════════

function _getFriends()        { return JSON.parse(localStorage.getItem('fynderFriends')  || '[]'); }
function _getFriendRequests() { return JSON.parse(localStorage.getItem('fynderFriendReqs') || '[]'); }
function _saveFriends(arr)    { localStorage.setItem('fynderFriends', JSON.stringify(arr)); }
function _saveFriendReqs(arr) { localStorage.setItem('fynderFriendReqs', JSON.stringify(arr)); }

/** Inicializa datos de demo para amigos si no hay ninguno */
function _seedFriendsDemo() {
  if (_getFriends().length > 0) return;
  const demo = [
    { id:'f1', name:'Ana García',    email:'ana@ejemplo.com',    online:true  },
    { id:'f2', name:'Carlos López',  email:'carlos@ejemplo.com', online:false },
    { id:'f3', name:'María Pérez',   email:'maria@ejemplo.com',  online:true  },
  ];
  _saveFriends(demo);
  const req = [
    { id:'r1', name:'Juan Rodríguez', email:'juan@ejemplo.com' },
  ];
  _saveFriendReqs(req);
}

function settSyncAmigos() {
  _seedFriendsDemo();
  _renderFriendRequests();
  _renderFriendList();
  _updateFriendCount();
}

function _updateFriendCount() {
  const friends = _getFriends();
  const reqs    = _getFriendRequests();
  const total   = document.getElementById('settFriendTotal');
  if (total) total.textContent = `(${friends.length})`;

  const badge = document.getElementById('settFriendReqBadge');
  if (badge) {
    badge.textContent = reqs.length;
    badge.style.display = reqs.length > 0 ? 'inline-flex' : 'none';
  }

  // Actualizar sub en "Tú y Fynder"
  const sub = document.getElementById('settFriendCountSub');
  if (sub) sub.textContent = friends.length > 0 ? `${friends.length} amigo${friends.length !== 1 ? 's' : ''}` : 'Ver lista de amigos';
}

function _renderFriendRequests() {
  const cont = document.getElementById('settFriendRequests');
  if (!cont) return;
  const reqs = _getFriendRequests();
  if (reqs.length === 0) {
    cont.innerHTML = '<div class="sett-empty-state"><i class="fas fa-user-check"></i><span>Sin solicitudes pendientes</span></div>';
    return;
  }
  cont.innerHTML = reqs.map(r => `
    <div class="sett-req-row" id="req-${r.id}">
      <div class="sett-friend-avatar" style="background:#2F5BB7">${r.name[0].toUpperCase()}</div>
      <div class="sett-friend-info">
        <span class="sett-friend-name">${r.name}</span>
        <span class="sett-friend-email">${r.email}</span>
      </div>
      <div class="sett-friend-actions">
        <button class="sett-req-accept" onclick="acceptFriendReq('${r.id}')"><i class="fas fa-check"></i> Aceptar</button>
        <button class="sett-req-decline" onclick="declineFriendReq('${r.id}')"><i class="fas fa-xmark"></i></button>
      </div>
    </div>`).join('');
}

function _renderFriendList(filter) {
  const cont = document.getElementById('settFriendList');
  if (!cont) return;
  let friends = _getFriends();
  if (filter) friends = friends.filter(f =>
    f.name.toLowerCase().includes(filter) || (f.email || '').toLowerCase().includes(filter));

  if (friends.length === 0) {
    cont.innerHTML = filter
      ? '<div class="sett-empty-state"><i class="fas fa-magnifying-glass"></i><span>Sin resultados</span></div>'
      : '<div class="sett-empty-state"><i class="fas fa-user-group"></i><span>Aún no tienes amigos agregados</span></div>';
    return;
  }
  cont.innerHTML = friends.map(f => `
    <div class="sett-friend-row" id="fr-${f.id}">
      <div class="sett-friend-avatar">${f.name[0].toUpperCase()}</div>
      <div class="sett-friend-status ${f.online ? '' : 'offline'}"></div>
      <div class="sett-friend-info">
        <span class="sett-friend-name">${f.name}</span>
        <span class="sett-friend-email">${f.online ? '🟢 En línea' : '⚫ Desconectado'} · ${f.email}</span>
      </div>
      <div class="sett-friend-actions">
        <button class="sett-friend-btn" onclick="msgFriend('${f.id}','${f.name}')"><i class="fas fa-comment-dots"></i> Mensaje</button>
        <button class="sett-friend-btn danger" onclick="removeFriend('${f.id}')"><i class="fas fa-user-minus"></i></button>
      </div>
    </div>`).join('');
}

function settSearchFriends(q) {
  _renderFriendList(q.toLowerCase().trim() || undefined);
}

function acceptFriendReq(id) {
  const reqs    = _getFriendRequests();
  const idx     = reqs.findIndex(r => r.id === id);
  if (idx === -1) return;
  const [req]   = reqs.splice(idx, 1);
  _saveFriendReqs(reqs);
  const friends = _getFriends();
  friends.push({ id: req.id, name: req.name, email: req.email, online: false });
  _saveFriends(friends);
  _renderFriendRequests();
  _renderFriendList();
  _updateFriendCount();
  showToast(`✅ ¡Ahora eres amigo de ${req.name}!`);
}

function declineFriendReq(id) {
  const reqs = _getFriendRequests().filter(r => r.id !== id);
  _saveFriendReqs(reqs);
  _renderFriendRequests();
  _updateFriendCount();
  showToast('Solicitud rechazada');
}

function removeFriend(id) {
  const friends = _getFriends();
  const f = friends.find(x => x.id === id);
  if (!f) return;
  if (!confirm(`¿Eliminar a ${f.name} de tus amigos?`)) return;
  _saveFriends(friends.filter(x => x.id !== id));
  _renderFriendList();
  _updateFriendCount();
  showToast(`${f.name} eliminado de tus amigos`);
}

function msgFriend(id, name) {
  showToast(`💬 Abriendo chat con ${name}...`);
  setTimeout(() => goPage('messages'), 600);
}

// ══════════════════════════════════════════════════════════════════════════════
// IDIOMA / TRADUCCIÓN — Sistema propio con diccionario
// ══════════════════════════════════════════════════════════════════════════════

const LANG_NAMES = {
  es:'Español', en:'English', fr:'Français', pt:'Português',
  de:'Deutsch', it:'Italiano', zh:'中文', ja:'日本語', ko:'한국어',
  ar:'العربية', ru:'Русский'
};

function _detectBrowserLang() {
  const lang = (navigator.language || navigator.userLanguage || 'es').slice(0,2).toLowerCase();
  return LANG_NAMES[lang] ? lang : 'es';
}
function _langFlag(code) {
  const f = {es:'🇪🇸',en:'🇺🇸',fr:'🇫🇷',pt:'🇧🇷',de:'🇩🇪',it:'🇮🇹',zh:'🇨🇳',ja:'🇯🇵',ko:'🇰🇷',ar:'🇸🇦',ru:'🇷🇺'};
  return f[code] || '🌐';
}

// ── Diccionario de traducciones ──────────────────────────────────────────────
const I18N = {
  // Nav
  'nav.home':        { es:'Inicio',      en:'Home',       fr:'Accueil',    pt:'Início',    de:'Startseite' },
  'nav.directory':   { es:'Directorio',  en:'Directory',  fr:'Annuaire',   pt:'Diretório', de:'Verzeichnis' },
  'nav.saved':       { es:'Guardados',   en:'Saved',      fr:'Enregistrés',pt:'Salvos',    de:'Gespeichert' },
  'nav.messages':    { es:'Mensajes',    en:'Messages',   fr:'Messages',   pt:'Mensagens', de:'Nachrichten' },
  'nav.login':       { es:'Iniciar sesión', en:'Sign in', fr:'Connexion',  pt:'Entrar',    de:'Anmelden' },
  'nav.register':    { es:'Registrar negocio', en:'Register business', fr:'Enregistrer entreprise', pt:'Registrar negócio', de:'Unternehmen registrieren' },
  // Hero
  'hero.pill':       { es:'Descubre negocios cerca de ti', en:'Discover businesses near you', fr:'Découvrez les entreprises près de vous', pt:'Descubra negócios perto de você', de:'Entdecke Unternehmen in deiner Nähe' },
  'hero.title1':     { es:'Encuentra los mejores', en:'Find the best', fr:'Trouvez les meilleurs', pt:'Encontre os melhores', de:'Finde die besten' },
  'hero.title2':     { es:'negocios locales', en:'local businesses', fr:'commerces locaux', pt:'negócios locais', de:'lokalen Unternehmen' },
  'hero.desc':       { es:'FYNDER conecta personas con emprendedores y comercios de su comunidad. Descubre, explora y apoya a los negocios que hacen grande tu ciudad.', en:'FYNDER connects people with entrepreneurs and businesses in their community. Discover, explore and support the businesses that make your city great.', fr:'FYNDER connecte les personnes avec les entrepreneurs et les commerces de leur communauté.', pt:'FYNDER conecta pessoas com empreendedores e comércios de sua comunidade.', de:'FYNDER verbindet Menschen mit Unternehmern und Betrieben in ihrer Gemeinde.' },
  'hero.search.ph':  { es:'Ej: "Pasteles", "Peluquería"...', en:'E.g. "Cakes", "Barbershop"...', fr:'Ex: "Gâteaux", "Coiffeur"...', pt:'Ex: "Bolos", "Barbearia"...', de:'Z.B. "Kuchen", "Friseur"...' },
  'hero.search.btn': { es:'Buscar', en:'Search', fr:'Rechercher', pt:'Buscar', de:'Suchen' },
  'hero.popular':    { es:'Popular:', en:'Popular:', fr:'Populaire:', pt:'Popular:', de:'Beliebt:' },
  // Sections
  'sec.categories.label': { es:'Explorar por categoría', en:'Browse by category', fr:'Parcourir par catégorie', pt:'Explorar por categoria', de:'Nach Kategorie durchsuchen' },
  'sec.categories.title': { es:'¿Qué estás buscando?', en:'What are you looking for?', fr:'Que cherchez-vous?', pt:'O que você está procurando?', de:'Was suchst du?' },
  'sec.categories.all':   { es:'Ver todas', en:'See all', fr:'Voir tout', pt:'Ver todas', de:'Alle anzeigen' },
  'sec.featured.label':   { es:'Selección destacada', en:'Featured selection', fr:'Sélection vedette', pt:'Seleção em destaque', de:'Empfohlene Auswahl' },
  'sec.featured.title':   { es:'Negocios Destacados', en:'Featured Businesses', fr:'Entreprises en vedette', pt:'Negócios em Destaque', de:'Empfohlene Unternehmen' },
  'sec.featured.all':     { es:'Ver todos', en:'See all', fr:'Voir tout', pt:'Ver todos', de:'Alle anzeigen' },
  'sec.popular.title':    { es:'Más Populares', en:'Most Popular', fr:'Les Plus Populaires', pt:'Mais Populares', de:'Am Beliebtesten' },
  // How it works
  'how.label':  { es:'Simple y rápido', en:'Simple and fast', fr:'Simple et rapide', pt:'Simples e rápido', de:'Einfach und schnell' },
  'how.title':  { es:'¿Cómo funciona FYNDER?', en:'How does FYNDER work?', fr:'Comment fonctionne FYNDER?', pt:'Como funciona o FYNDER?', de:'Wie funktioniert FYNDER?' },
  'how.sub':    { es:'En tres simples pasos conectas con los mejores negocios de tu comunidad.', en:'In three simple steps you connect with the best businesses in your community.', fr:'En trois étapes simples, connectez-vous avec les meilleures entreprises.', pt:'Em três etapas simples você se conecta com os melhores negócios.', de:'In drei einfachen Schritten verbindest du dich mit den besten Unternehmen.' },
  'how.step1.title': { es:'Busca lo que necesitas', en:'Search what you need', fr:'Recherchez ce dont vous avez besoin', pt:'Busque o que você precisa', de:'Suche was du brauchst' },
  'how.step1.desc':  { es:'Ingresa el producto, servicio o categoría que estás buscando en nuestro buscador inteligente.', en:'Enter the product, service or category you are looking for in our smart search.', fr:'Entrez le produit, service ou catégorie que vous recherchez.', pt:'Insira o produto, serviço ou categoria que está procurando.', de:'Gib das Produkt, die Dienstleistung oder Kategorie in unsere intelligente Suche ein.' },
  'how.step2.title': { es:'Descubre negocios cercanos', en:'Discover nearby businesses', fr:'Découvrez les entreprises à proximité', pt:'Descubra negócios próximos', de:'Entdecke nahegelegene Unternehmen' },
  'how.step2.desc':  { es:'Explora el directorio de negocios locales con información completa: horarios, contacto y ubicación.', en:'Explore the local business directory with complete information: hours, contact and location.', fr:'Explorez le répertoire des entreprises locales avec des informations complètes.', pt:'Explore o diretório de negócios locais com informações completas.', de:'Erkunde das Verzeichnis lokaler Unternehmen mit vollständigen Informationen.' },
  'how.step3.title': { es:'Conecta y apoya', en:'Connect and support', fr:'Connectez et soutenez', pt:'Conecte e apoie', de:'Verbinden und unterstützen' },
  'how.step3.desc':  { es:'Contacta directamente al negocio, guárdalo en favoritos y comparte con amigos y familia.', en:'Contact the business directly, save it to favorites and share with friends and family.', fr:'Contactez directement l\'entreprise, enregistrez-la et partagez.', pt:'Contate diretamente o negócio, salve nos favoritos e compartilhe.', de:'Kontaktiere das Unternehmen direkt, speichere es und teile es.' },
  // CTA
  'cta.title1':  { es:'¿Tienes un negocio?', en:'Do you have a business?', fr:'Vous avez une entreprise?', pt:'Você tem um negócio?', de:'Haben Sie ein Unternehmen?' },
  'cta.title2':  { es:'Únete a Fynder gratis', en:'Join Fynder for free', fr:'Rejoignez Fynder gratuitement', pt:'Junte-se ao Fynder gratuitamente', de:'Trete Fynder kostenlos bei' },
  'cta.desc':    { es:'Registra tu negocio hoy y llega a miles de clientes potenciales en tu comunidad. Sin comisiones, sin costos ocultos.', en:'Register your business today and reach thousands of potential customers in your community. No commissions, no hidden costs.', fr:'Enregistrez votre entreprise aujourd\'hui et atteignez des milliers de clients potentiels.', pt:'Registre seu negócio hoje e alcance milhares de clientes potenciais.', de:'Registriere dein Unternehmen heute und erreiche Tausende potenzieller Kunden.' },
  'cta.btn1':    { es:'Registrar mi negocio', en:'Register my business', fr:'Enregistrer mon entreprise', pt:'Registrar meu negócio', de:'Mein Unternehmen registrieren' },
  'cta.btn2':    { es:'Saber más', en:'Learn more', fr:'En savoir plus', pt:'Saiba mais', de:'Mehr erfahren' },
  'cta.perk1':   { es:'100% gratuito', en:'100% free', fr:'100% gratuit', pt:'100% gratuito', de:'100% kostenlos' },
  'cta.perk2':   { es:'Activación inmediata', en:'Instant activation', fr:'Activation immédiate', pt:'Ativação imediata', de:'Sofortige Aktivierung' },
  'cta.perk3':   { es:'Miles de usuarios', en:'Thousands of users', fr:'Des milliers d\'utilisateurs', pt:'Milhares de usuários', de:'Tausende von Nutzern' },
  // Directory
  'dir.title':       { es:'Directorio de Negocios', en:'Business Directory', fr:'Annuaire des entreprises', pt:'Diretório de Negócios', de:'Unternehmensverzeichnis' },
  'dir.search.ph':   { es:'Buscar negocios...', en:'Search businesses...', fr:'Rechercher des entreprises...', pt:'Buscar negócios...', de:'Unternehmen suchen...' },
  'dir.all':         { es:'Todos', en:'All', fr:'Tous', pt:'Todos', de:'Alle' },
  'dir.sort.recent': { es:'Más recientes', en:'Most recent', fr:'Plus récents', pt:'Mais recentes', de:'Neueste' },
  'dir.sort.rating': { es:'Mejor valorados', en:'Top rated', fr:'Mieux notés', pt:'Melhor avaliados', de:'Bestbewertet' },
  'dir.sort.popular':{ es:'Más populares', en:'Most popular', fr:'Plus populaires', pt:'Mais populares', de:'Beliebteste' },
  // Business card
  'biz.reviews': { es:'reseñas', en:'reviews', fr:'avis', pt:'avaliações', de:'Bewertungen' },
  'biz.open':    { es:'Abierto', en:'Open', fr:'Ouvert', pt:'Aberto', de:'Geöffnet' },
  'biz.closed':  { es:'Cerrado', en:'Closed', fr:'Fermé', pt:'Fechado', de:'Geschlossen' },
  'biz.new':     { es:'Nuevo', en:'New', fr:'Nouveau', pt:'Novo', de:'Neu' },
  'biz.featured':{ es:'Destacado', en:'Featured', fr:'Vedette', pt:'Destaque', de:'Empfohlen' },
  'biz.viewprofile': { es:'Ver perfil', en:'View profile', fr:'Voir le profil', pt:'Ver perfil', de:'Profil anzeigen' },
  'biz.contact': { es:'Contactar', en:'Contact', fr:'Contacter', pt:'Contatar', de:'Kontaktieren' },
  'biz.save':    { es:'Guardar', en:'Save', fr:'Enregistrer', pt:'Salvar', de:'Speichern' },
  // Settings
  'sett.title':     { es:'Ajustes', en:'Settings', fr:'Paramètres', pt:'Configurações', de:'Einstellungen' },
  'sett.lang.title':{ es:'Idioma', en:'Language', fr:'Langue', pt:'Idioma', de:'Sprache' },
  'sett.lang.label':{ es:'Idioma de la interfaz', en:'Interface language', fr:'Langue de l\'interface', pt:'Idioma da interface', de:'Oberflächensprache' },
  // Misc
  'search.placeholder': { es:'Buscar un chat...', en:'Search a chat...', fr:'Rechercher un chat...', pt:'Buscar um chat...', de:'Chat suchen...' },
  'msg.new':   { es:'Nuevo mensaje', en:'New message', fr:'Nouveau message', pt:'Nova mensagem', de:'Neue Nachricht' },
  'empty.fav': { es:'Sin favoritos', en:'No favorites', fr:'Pas de favoris', pt:'Sem favoritos', de:'Keine Favoriten' },
  'empty.fav.sub': { es:'Guarda tus chats favoritos aquí.', en:'Save your favorite chats here.', fr:'Enregistrez vos chats favoris ici.', pt:'Salve seus chats favoritos aqui.', de:'Speichere deine Lieblingschats hier.' },
  'chat.write': { es:'Escribe un mensaje...', en:'Write a message...', fr:'Écrivez un message...', pt:'Escreva uma mensagem...', de:'Nachricht schreiben...' },
  'notif.title': { es:'Notificaciones', en:'Notifications', fr:'Notifications', pt:'Notificações', de:'Benachrichtigungen' },
  'tab.all':     { es:'Todos', en:'All', fr:'Tous', pt:'Todos', de:'Alle' },
  'tab.fav':     { es:'Favoritos', en:'Favorites', fr:'Favoris', pt:'Favoritos', de:'Favoriten' },
};

/** Obtiene la traducción de una clave para el idioma activo */
function t(key) {
  const lang = localStorage.getItem('fynderLang') || 'es';
  const entry = I18N[key];
  if (!entry) return key;
  return entry[lang] || entry['es'] || key;
}

/** Aplica todas las traducciones con data-i18n al DOM */
function _applyI18N() {
  const lang = localStorage.getItem('fynderLang') || 'es';
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const translation = I18N[key]?.[lang] || I18N[key]?.['es'];
    if (!translation) return;
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = translation;
    } else {
      el.textContent = translation;
    }
  });
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const key = el.getAttribute('data-i18n-ph');
    const translation = I18N[key]?.[lang] || I18N[key]?.['es'];
    if (translation) el.placeholder = translation;
  });
  // Cambiar lang del html
  document.documentElement.lang = lang;
}

/** Aplica el idioma: guarda, actualiza UI, traduce con Google Translate */
function settApplyLanguage(langCode) {
  localStorage.setItem('fynderLang', langCode);

  const sel = document.getElementById('settLangSelect');
  if (sel) sel.value = langCode;

  const nowRow = document.getElementById('settTranslateNowRow');
  const nowSub = document.getElementById('settTranslateNowSub');
  if (nowRow) nowRow.style.display = langCode !== 'es' ? '' : 'none';
  if (nowSub) nowSub.textContent = `Idioma activo: ${LANG_NAMES[langCode] || 'Español'}`;

  _renderPreferredLangs(langCode);
  _applyI18N();

  // Intentar usar el combo de Google Translate primero (sin recargar)
  const combo = document.querySelector('.goog-te-combo');
  if (combo) {
    combo.value = langCode;
    combo.dispatchEvent(new Event('change'));
    showToast(`${_langFlag(langCode)} Idioma cambiado a ${LANG_NAMES[langCode] || langCode}`);
    return;
  }

  // Si no hay combo disponible: usar cookie + recarga (funciona con servidor web)
  if (langCode !== 'es') {
    _gtApplyViaCookie(langCode);
  } else {
    _gtRemoveTranslation();
    showToast(`🇪🇸 Idioma restaurado a Español`);
  }
}

function _initAutoTranslate() {
  const autoOn = localStorage.getItem('fynderAutoTranslate') === '1';
  const saved  = localStorage.getItem('fynderLang') || (autoOn ? _detectBrowserLang() : 'es');
  _applyI18N();
  if (autoOn && saved !== 'es') {
    localStorage.setItem('fynderLang', saved);
  }
}

function settSyncIdioma() {
  const browserLang = _detectBrowserLang();
  const saved  = localStorage.getItem('fynderLang') || browserLang;
  const autoOn = localStorage.getItem('fynderAutoTranslate') === '1';

  const sel = document.getElementById('settLangSelect');
  if (sel) sel.value = LANG_NAMES[saved] ? saved : 'es';

  const sub = document.getElementById('settLangDetectedSub');
  if (sub) sub.textContent = `Idioma del sistema: ${LANG_NAMES[browserLang] || 'Español'}`;

  const toggle = document.getElementById('settAutoTranslateToggle');
  if (toggle) toggle.classList.toggle('on', autoOn);

  const nowRow = document.getElementById('settTranslateNowRow');
  const nowSub = document.getElementById('settTranslateNowSub');
  if (nowRow) nowRow.style.display = saved !== 'es' ? '' : 'none';
  if (nowSub) nowSub.textContent = `Idioma activo: ${LANG_NAMES[saved] || 'Español'}`;

  _renderPreferredLangs(saved);
}

function _renderPreferredLangs(current) {
  const cont = document.getElementById('settPreferredLangs');
  if (!cont) return;
  const browserLang = _detectBrowserLang();
  const langs = [...new Set([current, browserLang, 'es'])].slice(0, 3);
  cont.innerHTML = langs.map((l, i) => `
    <div class="sett-row" onclick="settApplyLanguage('${l}')" style="cursor:pointer">
      <div class="sett-row-left">
        <div class="sett-row-icon" style="background:#F8FAFC;color:var(--fg);font-size:1.1rem">${_langFlag(l)}</div>
        <div>
          <span class="sett-row-label">${LANG_NAMES[l] || l}</span>
          <span class="sett-row-sub">${i===0?'Idioma activo':i===1?'Idioma del sistema':'Predeterminado'}</span>
        </div>
      </div>
      ${l===current?'<i class="fas fa-check" style="color:var(--primary)"></i>':'<i class="fas fa-chevron-right sett-row-arrow"></i>'}
    </div>`).join('');
}

function settToggleAutoTranslate() {
  const isOn   = localStorage.getItem('fynderAutoTranslate') === '1';
  const newVal = !isOn;
  localStorage.setItem('fynderAutoTranslate', newVal ? '1' : '0');
  const btn = document.getElementById('settAutoTranslateToggle');
  if (btn) btn.classList.toggle('on', newVal);
  if (newVal) {
    const detected = _detectBrowserLang();
    if (detected !== 'es') settApplyLanguage(detected);
    else showToast(`✅ Traducción automática activada`);
  } else {
    showToast('Traducción automática desactivada');
  }
}

/**
 * Aplica traducción usando la cookie de Google Translate.
 * Esto traduce la página in-place igual que el botón "Traducir" de Chrome,
 * sin redirigir al usuario a otra URL.
 */
function settApplyLanguage(langCode) {
  localStorage.setItem('fynderLang', langCode);

  // Actualizar selector en UI
  const sel = document.getElementById('settLangSelect');
  if (sel) sel.value = langCode;

  const nowRow = document.getElementById('settTranslateNowRow');
  const nowSub = document.getElementById('settTranslateNowSub');
  if (nowRow) nowRow.style.display = langCode !== 'es' ? '' : 'none';
  if (nowSub) nowSub.textContent = `Idioma activo: ${LANG_NAMES[langCode] || 'Español'}`;

  _renderPreferredLangs(langCode);

  if (langCode === 'es') {
    // Quitar traducción — restaurar original
    _gtRemoveTranslation();
    showToast('🇪🇸 Idioma restaurado a Español');
    return;
  }

  // Intentar primero con el widget embebido (más limpio)
  const combo = document.querySelector('.goog-te-combo');
  if (combo) {
    combo.value = langCode;
    combo.dispatchEvent(new Event('change'));
    showToast(`${_langFlag(langCode)} Traduciendo a ${LANG_NAMES[langCode]}...`);
    return;
  }

  // Fallback: inyectar el widget si no está listo e intentar de nuevo
  showToast(`${_langFlag(langCode)} Cargando traducción...`);
  _gtLoadAndTranslate(langCode);
}

/** Carga el widget de Google Translate si no está y aplica el idioma */
function _gtLoadAndTranslate(langCode) {
  // Asegurarse de que el elemento contenedor existe
  let el = document.getElementById('google_translate_element');
  if (!el) {
    el = document.createElement('div');
    el.id = 'google_translate_element';
    el.style.display = 'none';
    document.body.appendChild(el);
  }

  // Reinicializar el widget
  if (window.google && window.google.translate) {
    try {
      new window.google.translate.TranslateElement({
        pageLanguage: 'es',
        autoDisplay: false
      }, 'google_translate_element');
    } catch(e) {}
  }

  // Esperar hasta que el combo esté disponible (máx 4s)
  let attempts = 0;
  const poll = setInterval(() => {
    const combo = document.querySelector('.goog-te-combo');
    if (combo) {
      clearInterval(poll);
      combo.value = langCode;
      combo.dispatchEvent(new Event('change'));
      showToast(`${_langFlag(langCode)} ${LANG_NAMES[langCode]} activado ✓`);
    } else if (++attempts > 20) {
      clearInterval(poll);
      // Último recurso: iframe de traducción de Google en la misma pestaña
      _gtApplyViaCookie(langCode);
    }
  }, 200);
}

/**
 * Traduce la página al idioma especificado usando Google Translate
 */
function _gtTranslateTo(langCode) {
  if (langCode === 'es') {
    _gtRemoveTranslation();
    return;
  }
  _gtApplyViaCookie(langCode);
}

/**
 * Aplica la traducción inyectando la cookie de Google Translate
 * y recargando la página (método más compatible con archivos locales)
 */
function _gtApplyViaCookie(langCode) {
  try {
    if (!langCode || langCode === 'es') {
      _gtRemoveTranslation();
      return;
    }

    // Establecer cookie de Google Translate
    const domain = location.hostname || 'localhost';
    document.cookie = `googtrans=/es/${langCode}; path=/; domain=${domain}`;
    document.cookie = `googtrans=/es/${langCode}; path=/`;
    
    // También establecer googtrans (sin barra) que usa GT en algunos navegadores
    document.cookie = `googtrans=es|${langCode}; path=/`;
    
    showToast(`${_langFlag(langCode)} Aplicando ${LANG_NAMES[langCode]}... La página se recargará.`);
    
    // Recargar para que la cookie surta efecto
    setTimeout(() => location.reload(), 800);
  } catch(e) {
    console.error('Error aplicando traducción:', e);
    showToast('No se pudo cargar el traductor. Verifica tu conexión a internet.');
  }
}

/** Quita la traducción restaurando el idioma original */
function _gtRemoveTranslation() {
  // Limpiar cookies de Google Translate
  const domain = location.hostname || 'localhost';
  document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domain}`;
  document.cookie = 'googtrans=es|es; path=/';

  const combo = document.querySelector('.goog-te-combo');
  if (combo) {
    combo.value = 'es';
    combo.dispatchEvent(new Event('change'));
    showToast('🇪🇸 Idioma restaurado a Español');
    return;
  }

  // Si no hay combo disponible, recargar para quitar traducción
  showToast('🇪🇸 Restaurando idioma español...');
  setTimeout(() => location.reload(), 600);
}

/** Inicializa la traducción automática al cargar si está activada */
function _initAutoTranslate() {
  const autoOn = localStorage.getItem('fynderAutoTranslate') === '1';
  if (!autoOn) return;
  const saved = localStorage.getItem('fynderLang') || _detectBrowserLang();
  if (saved !== 'es') {
    // Esperar a que Google Translate esté listo
    let attempts = 0;
    const poll = setInterval(() => {
      const combo = document.querySelector('.goog-te-combo');
      if (combo) {
        clearInterval(poll);
        combo.value = saved;
        combo.dispatchEvent(new Event('change'));
      } else if (++attempts > 25) {
        clearInterval(poll);
        _gtLoadAndTranslate(saved);
      }
    }, 300);
  }
}

function settSyncIdioma() {
  const browserLang = _detectBrowserLang();
  const saved = localStorage.getItem('fynderLang') || browserLang;
  const autoOn = localStorage.getItem('fynderAutoTranslate') === '1';

  const sel = document.getElementById('settLangSelect');
  if (sel) sel.value = LANG_NAMES[saved] ? saved : 'es';

  const sub = document.getElementById('settLangDetectedSub');
  if (sub) sub.textContent = `Idioma del sistema: ${LANG_NAMES[browserLang] || 'Español'}`;

  const toggle = document.getElementById('settAutoTranslateToggle');
  if (toggle) toggle.classList.toggle('on', autoOn);

  const nowRow = document.getElementById('settTranslateNowRow');
  const nowSub = document.getElementById('settTranslateNowSub');
  if (nowRow) nowRow.style.display = saved !== 'es' ? '' : 'none';
  if (nowSub) nowSub.textContent = `Idioma activo: ${LANG_NAMES[saved] || 'Español'}`;

  _renderPreferredLangs(saved);
}

function _renderPreferredLangs(current) {
  const cont = document.getElementById('settPreferredLangs');
  if (!cont) return;
  const browserLang = _detectBrowserLang();
  const langs = [...new Set([current, browserLang, 'es'])].slice(0, 3);
  cont.innerHTML = langs.map((l, i) => `
    <div class="sett-row" onclick="settApplyLanguage('${l}')" style="cursor:pointer">
      <div class="sett-row-left">
        <div class="sett-row-icon" style="background:#F8FAFC;color:var(--fg);font-size:1.1rem;font-family:serif">${_langFlag(l)}</div>
        <div>
          <span class="sett-row-label">${LANG_NAMES[l] || l}</span>
          <span class="sett-row-sub">${i === 0 ? 'Idioma activo' : i === 1 ? 'Idioma del sistema' : 'Predeterminado'}</span>
        </div>
      </div>
      ${l === current ? '<i class="fas fa-check" style="color:var(--primary)"></i>' : '<i class="fas fa-chevron-right sett-row-arrow"></i>'}
    </div>`).join('');
}

function settToggleAutoTranslate() {
  const isOn = localStorage.getItem('fynderAutoTranslate') === '1';
  const newVal = !isOn;
  localStorage.setItem('fynderAutoTranslate', newVal ? '1' : '0');

  const btn = document.getElementById('settAutoTranslateToggle');
  if (btn) btn.classList.toggle('on', newVal);

  if (newVal) {
    const detected = _detectBrowserLang();
    const saved = localStorage.getItem('fynderLang') || detected;
    showToast(`✅ Traducción automática activada — ${LANG_NAMES[detected] || 'Español'}`);
    if (saved !== 'es') settApplyLanguage(saved);
  } else {
    showToast('Traducción automática desactivada');
  }
}

function settTranslateNow() {
  const lang = localStorage.getItem('fynderLang') || _detectBrowserLang();
  settApplyLanguage(lang);
}

// ── FEEDBACK MODAL ───────────────────────────────────────────────────────────

let _feedbackStar = 0;

function openFeedbackModal() {
  _feedbackStar = 0;
  const txt = document.getElementById('feedbackText');
  if (txt) txt.value = '';
  document.querySelectorAll('.feedback-star-btn').forEach(b => b.classList.remove('selected'));
  const m = document.getElementById('feedbackModal');
  if (m) m.classList.add('open');
}

function closeFeedbackModal() {
  const m = document.getElementById('feedbackModal');
  if (m) m.classList.remove('open');
}

function setFeedbackStar(n) {
  _feedbackStar = n;
  document.querySelectorAll('.feedback-star-btn').forEach((b, i) => {
    b.classList.toggle('selected', i < n);
  });
}

function submitFeedback() {
  const txt = (document.getElementById('feedbackText')?.value || '').trim();
  if (!_feedbackStar) { showToast('Elige una valoración primero 😊'); return; }
  // Guardamos localmente (en un proyecto real iría a un servidor)
  const entry = { stars: _feedbackStar, text: txt, date: new Date().toLocaleDateString('es') };
  const prev = JSON.parse(localStorage.getItem('fynderFeedback') || '[]');
  prev.push(entry);
  localStorage.setItem('fynderFeedback', JSON.stringify(prev));
  closeFeedbackModal();
  showToast('¡Gracias por tu opinión! 🙌');
}
