// ── mensajes.js ──

/* SISTEMA DE MENSAJES – FYNDER */

// ---- Storage helpers ----
function _getMsgs(bizId) {
  try { return JSON.parse(localStorage.getItem('fynderChat_' + bizId) || '[]'); }
  catch(e) { return []; }
}
function _saveMsgs(bizId, msgs) {
  localStorage.setItem('fynderChat_' + bizId, JSON.stringify(msgs));
}
function _getConversations() {
  try { return JSON.parse(localStorage.getItem('fynderConversations') || '[]'); }
  catch(e) { return []; }
}
function _saveConversations(list) {
  localStorage.setItem('fynderConversations', JSON.stringify(list));
}
function _getBookmarks() {
  try { return JSON.parse(localStorage.getItem('fynderMsgBookmarks') || '[]'); }
  catch(e) { return []; }
}
function _saveBookmarks(list) {
  localStorage.setItem('fynderMsgBookmarks', JSON.stringify(list));
}

// ---- Estado activo del chat ----
let _activeChatBizId = null;

// ---- Abrir chat desde el modal del negocio ----
function openChatFromModal() {
  const logged = !!localStorage.getItem('fynderLogged');
  if (!logged) { showToast('Inicia sesión para enviar mensajes'); closeModalDirect(); goPage('login'); return; }
  const id = modalBusinessId; // variable global del modal existente
  if (!id) return;
  const biz = BUSINESSES.find(b => String(b.id) === String(id));
  if (!biz) return;
  closeModalDirect();
  openChat(id, biz);
}

// ---- Abrir chat con un negocio ----
function openChat(bizId, biz) {
  _activeChatBizId = String(bizId);

  // Cerrar el panel de info si estaba abierto (nuevo chat seleccionado)
  closeWaChatInfoPanel();

  // Asegurar que la conversación existe
  let convs = _getConversations();
  if (!convs.find(c => String(c.id) === String(bizId))) {
    convs.unshift({ id: String(bizId), name: biz.name, cat: biz.category, image: biz.image || null, unread: 0, lastMsg: '', lastTime: '' });
    _saveConversations(convs);
  }

  // Helper: rellena los elementos de header por ID
  function _fillHeader(nameId, subId, avaId, onlineId) {
    const nameEl   = document.getElementById(nameId);
    const subEl    = document.getElementById(subId);
    const avaEl    = document.getElementById(avaId);
    const onlineEl = document.getElementById(onlineId);
    if (nameEl) nameEl.textContent = biz.name;
    if (subEl)  { subEl.textContent = 'en línea'; subEl.classList.add('online'); }
    if (onlineEl) onlineEl.classList.add('visible');
    if (avaEl) {
      if (biz.image) {
        avaEl.innerHTML = `<img src="${biz.image}" alt="${biz.name}" loading="lazy">`;
        avaEl.style.background = '';
      } else {
        avaEl.innerHTML = '';
        avaEl.textContent = (biz.name || '?')[0].toUpperCase();
        avaEl.style.background = _avatarColor(biz.name);
      }
    }
  }

  // Rellena header del área desktop (wa-chat-area) y del page-chat móvil
  _fillHeader('chatHeaderName','chatHeaderSub','chatHeaderAvatar','chatHeaderOnline');
  _fillHeader('chatHeaderNameMobile','chatHeaderSubMobile','chatHeaderAvatarMobile','chatHeaderOnlineMobile');

  // Botón llamar desktop
  const callBtn = document.getElementById('waChatCallBtn');
  if (callBtn) {
    callBtn.onclick = biz.phone
      ? () => { window.location.href = 'tel:' + biz.phone.replace(/\s/g,''); }
      : () => showToast('Teléfono no disponible');
  }

  // Si no tiene mensajes, agregar mensaje de bienvenida
  let msgs = _getMsgs(bizId);
  if (msgs.length === 0) {
    const welcomeMsg = {
      id: Date.now(), from: 'biz',
      text: `¡Hola! 👋 Bienvenido a ${biz.name}. ¿En qué podemos ayudarte?`,
      time: _fmtTime(new Date()), date: _fmtDate(new Date())
    };
    msgs = [welcomeMsg];
    _saveMsgs(bizId, msgs);
    _updateConvLastMsg(bizId, welcomeMsg.text, welcomeMsg.time);
    pushNotification({ type:'chat', title:biz.name,
      body: welcomeMsg.text.slice(0,80)+(welcomeMsg.text.length>80?'…':''),
      bizId:biz.id, image:biz.image||null });
  }

  const isDesktop = window.innerWidth >= 769;
  if (isDesktop) {
    // Layout WA Web: mostrar wa-chat-area dentro de page-messages
    const welcome  = document.getElementById('waWelcome');
    const chatArea = document.getElementById('waChatArea');
    if (welcome)  welcome.style.display  = 'none';
    if (chatArea) chatArea.style.display = 'flex';
    goPage('messages'); renderConversations();
    renderChatMessages(bizId);   // renderiza en #chatMessages (desktop)
    // Marcar activo en la lista
    document.querySelectorAll('.msg-chat-item').forEach(el => el.classList.remove('wa-active'));
    const activeItem = document.querySelector(`.msg-chat-item[data-biz-id="${bizId}"]`);
    if (activeItem) activeItem.classList.add('wa-active');
  } else {
    // Móvil: renderiza en #chatMessagesMobile y navega a page-chat
    renderChatMessagesMobile(bizId);
    goPage('chat');
  }

  // Simular que el negocio lee los mensajes al abrir el chat
  setTimeout(() => {
    const allMsgs = _getMsgs(bizId);
    let changed = false;
    allMsgs.forEach(m => {
      if (m.from === 'user' && m.status !== 'read') {
        m.status = 'read';
        m.read   = true;
        changed  = true;
      }
    });
    if (changed) {
      _saveMsgs(bizId, allMsgs);
      if (_activeChatBizId === bizId) {
        if (window.innerWidth >= 769) renderChatMessages(bizId);
        else renderChatMessagesMobile(bizId);
      }
    }
  }, 1200);

  // Aplicar ajustes guardados
  _loadMsgSettings();
  if (_msgSettings.bubbleColor) _applyChatBubbleColor(_msgSettings.bubbleColor);
  if (_msgSettings.fontSize)    _applyChatFontSize(_msgSettings.fontSize);

  // Resetear input y mostrar botón mic (en caso de que quedara texto de un chat anterior)
  const chatInput = document.getElementById('chatInput');
  if (chatInput) { chatInput.value = ''; }
  chatInputChange();
}

// ---- Renderizar mensajes (desktop: #chatMessages) ----
function renderChatMessages(bizId) {
  const container = document.getElementById('chatMessages');
  _renderMsgsInto(container, bizId);
}

// ---- Renderizar mensajes (móvil: #chatMessagesMobile) ----
function renderChatMessagesMobile(bizId) {
  const container = document.getElementById('chatMessagesMobile');
  _renderMsgsInto(container, bizId);
}

// ---- Renderizador compartido ----
function _renderMsgsInto(container, bizId) {
  if (!container) return;
  const msgs = _getMsgs(bizId);

  let html = '';
  let prevDate = '';
  let prevFrom = '';

  msgs.forEach((msg, i) => {
    const isOut = (msg.from === 'user');
    const isIn  = !isOut;

    if (msg.date && msg.date !== prevDate) {
      html += `<div class="chat-date-sep">${msg.date}</div>`;
      prevDate = msg.date;
    }

    const nextMsg  = msgs[i + 1];
    const isLastInGroup  = !nextMsg  || nextMsg.from  !== msg.from;
    const isFirstInGroup = prevFrom !== msg.from;

    const biz = BUSINESSES.find(b => String(b.id) === String(bizId));
    const bizInitial = biz ? (biz.name || '?')[0].toUpperCase() : '?';
    const bizAvaHtml = biz && biz.image ? `<img src="${biz.image}" alt="">` : bizInitial;
    const bizAvaBg   = biz ? _avatarColor(biz.name) : '#4a4d55';

    let avaHtml = '';
    if (isIn) {
      avaHtml = isFirstInGroup
        ? `<div class="chat-msg-ava" style="${biz && !biz.image ? 'background:'+bizAvaBg : ''}">${bizAvaHtml}</div>`
        : `<div class="chat-msg-ava" style="visibility:hidden"></div>`;
    }

    let bubbleClass = 'chat-bubble';
    if (isIn  && isLastInGroup) bubbleClass += ' chat-bubble-tail-in';
    if (!isIn && isLastInGroup) bubbleClass += ' chat-bubble-tail-out';

    const ticks = isOut ? _buildTickHtml(msg) : '';

    html += `
      <div class="${isIn ? 'chat-msg-row in' : 'chat-msg-row out'}">
        ${isIn ? avaHtml : ''}
        <div>
          <div class="${bubbleClass}">
            ${escapeHtml(msg.text)}
            <div class="chat-bubble-meta">
              <span class="chat-bubble-time">${msg.time || ''}</span>
              ${ticks}
            </div>
          </div>
        </div>
      </div>`;
    prevFrom = msg.from;
  });

  container.innerHTML = html;
  requestAnimationFrame(() => { container.scrollTop = container.scrollHeight; });
}

// ---- Enviar mensaje (desktop: #chatInput) ----
function sendChatMessage() {
  _doSendMessage('chatInput', _activeChatBizId, renderChatMessages);
}

// ---- Enviar mensaje (móvil: #chatInputMobile) ----
function sendChatMessageMobile() {
  _doSendMessage('chatInputMobile', _activeChatBizId, renderChatMessagesMobile);
}

function _doSendMessage(inputId, bizId, renderFn) {
  const input = document.getElementById(inputId);
  if (!input || !bizId) return;
  const text = input.value.trim();
  if (!text) return;

  if (!localStorage.getItem('fynderLogged')) {
    showToast('Inicia sesión para enviar mensajes'); return;
  }

  const now = new Date();
  // status: 'pending' → 'sent' → 'delivered' → 'read'
  const msg = { id: Date.now(), from: 'user', text,
    time: _fmtTime(now), date: _fmtDate(now), read: false, status: 'pending' };

  const msgs = _getMsgs(bizId);
  msgs.push(msg);
  _saveMsgs(bizId, msgs);
  _updateConvLastMsg(bizId, text, msg.time);
  renderConversations();

  input.value = '';
  chatInputChange(); // restaurar botón mic después de enviar
  renderFn(bizId);

  // Simular progresión de estados: pending → sent → delivered → read
  setTimeout(() => _advanceMsgStatus(bizId, msg.id, 'sent',      renderFn), 400);
  setTimeout(() => _advanceMsgStatus(bizId, msg.id, 'delivered', renderFn), 900);
  setTimeout(() => _advanceMsgStatus(bizId, msg.id, 'read',      renderFn), 2200);
  setTimeout(() => _bizAutoReply(bizId, renderFn), 1400);
}

/** Avanza el estado de un mensaje y re-renderiza */
function _advanceMsgStatus(bizId, msgId, newStatus, renderFn) {
  const msgs = _getMsgs(bizId);
  const m = msgs.find(x => x.id === msgId);
  if (!m) return;
  m.status = newStatus;
  if (newStatus === 'read') m.read = true;
  _saveMsgs(bizId, msgs);
  if (_activeChatBizId === bizId && renderFn) renderFn(bizId);
}

// ---- Respuesta automática del negocio ----
function _bizAutoReply(bizId, renderFn) {
  if (_activeChatBizId !== bizId) return;

  // Marcar todos los mensajes del usuario como 'read' (el negocio los leyó)
  const msgs = _getMsgs(bizId);
  let changed = false;
  msgs.forEach(m => {
    if (m.from === 'user' && m.status !== 'read') {
      m.status = 'read';
      m.read   = true;
      changed  = true;
    }
  });

  // Obtener el último mensaje del usuario para responder con contexto
  const userMsgs = msgs.filter(m => m.from === 'user');
  const lastUserText = userMsgs.length > 0
    ? (userMsgs[userMsgs.length - 1].text || '').toLowerCase()
    : '';

  // Obtener el último mensaje del bot para entender el contexto
  const bizMsgs = msgs.filter(m => m.from === 'biz');
  const lastBizText = bizMsgs.length > 0
    ? (bizMsgs[bizMsgs.length - 1].text || '').toLowerCase()
    : '';

  const biz = BUSINESSES.find(b => String(b.id) === String(bizId));
  const cat = biz ? (biz.categoryId || biz.category || '').toLowerCase() : '';
  const bizName = biz ? biz.name : 'nosotros';

  const text = _getSmartReply(lastUserText, cat, bizName, biz, lastBizText);
  const now  = new Date();
  const reply = { id: Date.now(), from: 'biz', text, time: _fmtTime(now), date: _fmtDate(now) };
  msgs.push(reply);
  _saveMsgs(bizId, msgs);
  _updateConvLastMsg(bizId, text, reply.time);
  renderConversations();
  // Usa la función de render pasada, o detecta cuál aplica
  if (renderFn) {
    renderFn(bizId);
  } else {
    if (window.innerWidth >= 769) renderChatMessages(bizId);
    else renderChatMessagesMobile(bizId);
  }
}

// ---- Renderizar lista de conversaciones ----
function renderConversations() {
  const convs = _getConversations();
  const list  = document.getElementById('msgChatList');
  const empty = document.getElementById('msgEmptyChats');
  if (!list) return;

  if (convs.length === 0) {
    list.innerHTML = '';
    if (empty) empty.classList.remove('hide');
    return;
  }
  if (empty) empty.classList.add('hide');

  list.innerHTML = convs.map(c => {
    const initial = (c.name || '?')[0].toUpperCase();
    const bg      = _avatarColor(c.name);
    const avatar  = c.image
      ? `<img src="${c.image}" alt="${c.name}" loading="lazy">`
      : `<span style="color:#fff;font-size:1.1rem;font-weight:700;font-family:'Poppins',sans-serif">${initial}</span>`;
    const unread  = c.unread > 0 ? `<span class="msg-chat-unread">${c.unread}</span>` : '';
    const isActive = String(c.id) === String(_activeChatBizId);
    return `
      <div class="msg-chat-item${isActive ? ' wa-active' : ''}" data-biz-id="${c.id}" onclick="openChatById('${c.id}')">
        <div class="msg-chat-avatar-wrap">
          <div class="msg-chat-avatar" style="background:${bg}">${avatar}</div>
          <span class="msg-chat-online"></span>
        </div>
        <div class="msg-chat-body">
          <div class="msg-chat-top">
            <span class="msg-chat-name">${escapeHtml(c.name)}</span>
            <span class="msg-chat-time">${c.lastTime || ''}</span>
          </div>
          <span class="msg-chat-preview">${escapeHtml(c.lastMsg || 'Toca para ver el chat')}</span>
        </div>
        <div class="msg-chat-actions">
          ${unread}
          <button class="msg-chat-menu" onclick="event.stopPropagation();msgConvMenu('${c.id}')" title="Más opciones">
            <i class="fas fa-ellipsis-vertical"></i>
          </button>
        </div>
      </div>`;
  }).join('');
}

// ---- Abrir chat por ID ----
function openChatById(bizId) {
  const biz = BUSINESSES.find(b => String(b.id) === String(bizId));
  let convs = _getConversations();
  const conv = convs.find(c => String(c.id) === String(bizId));
  if (conv) { conv.unread = 0; _saveConversations(convs); }
  updateMsgBadge();
  // Limpiar notificaciones de este negocio al abrir el chat
  clearNotifsByBizId(bizId);

  if (biz) {
    openChat(bizId, biz);
  } else {
    // Negocio no encontrado — mostrar igualmente
    _activeChatBizId = String(bizId);
    const isDesktop = window.innerWidth >= 769;

    function _fill(nameId, subId, avaId) {
      const nameEl = document.getElementById(nameId);
      const subEl  = document.getElementById(subId);
      const avaEl  = document.getElementById(avaId);
      if (nameEl) nameEl.textContent = conv ? conv.name : 'Negocio';
      if (subEl)  subEl.textContent  = conv ? (conv.cat || 'Negocio local') : 'Negocio local';
      if (avaEl)  {
        avaEl.innerHTML = '';
        avaEl.textContent = (conv ? conv.name : 'N')[0].toUpperCase();
        avaEl.style.background = _avatarColor(conv ? conv.name : 'N');
      }
    }

    if (isDesktop) {
      _fill('chatHeaderName','chatHeaderSub','chatHeaderAvatar');
      const welcome  = document.getElementById('waWelcome');
      const chatArea = document.getElementById('waChatArea');
      if (welcome)  welcome.style.display  = 'none';
      if (chatArea) chatArea.style.display = 'flex';
      renderChatMessages(bizId);
      document.querySelectorAll('.msg-chat-item').forEach(el => el.classList.remove('wa-active'));
      const activeItem = document.querySelector(`.msg-chat-item[data-biz-id="${bizId}"]`);
      if (activeItem) activeItem.classList.add('wa-active');
    } else {
      _fill('chatHeaderNameMobile','chatHeaderSubMobile','chatHeaderAvatarMobile');
      renderChatMessagesMobile(bizId);
      goPage('chat');
    }
  }
}

// ---- Menú contextual de conversación ----
function msgConvMenu(bizId) {
  const bmarks = _getBookmarks();
  const isBookmarked = bmarks.includes(String(bizId));
  const action1 = isBookmarked ? 'Quitar de marcadores' : 'Añadir a marcadores';
  const icon1   = isBookmarked ? 'fa-bookmark-slash' : 'fa-bookmark';
  showToast(`${action1}… (próximamente)`);
}

// ---- Tab switch ----
function msgSwitchTab(tab) {
  // Limpiar búsqueda al cambiar de tab
  _convSearchQuery = '';
  const searchInput = document.getElementById('msgSearchInput');
  if (searchInput) searchInput.value = '';

  // Actualizar botones
  document.getElementById('msgTabChats')    .classList.toggle('active', tab === 'chats');
  document.getElementById('msgTabBookmarks').classList.toggle('active', tab === 'bookmarks');
  const tabNotif = document.getElementById('msgTabNotif');
  if (tabNotif) tabNotif.classList.remove('active');

  // Mostrar panel
  document.getElementById('msgPanelChats')    .classList.toggle('active', tab === 'chats');
  document.getElementById('msgPanelBookmarks').classList.toggle('active', tab === 'bookmarks');
  document.getElementById('msgPanelNotif')    .classList.remove('active');

  if (tab === 'chats')     renderConversations();
  if (tab === 'bookmarks') renderBookmarks();
}

function msgSwitchSection(section) {
  // Botón "Notificaciones" en el header
  document.getElementById('msgPanelChats')    .classList.remove('active');
  document.getElementById('msgPanelBookmarks').classList.remove('active');
  document.getElementById('msgPanelNotif')    .classList.toggle('active', section === 'notif');
  document.getElementById('msgTabChats')    .classList.remove('active');
  document.getElementById('msgTabBookmarks').classList.remove('active');
  const tabNotif = document.getElementById('msgTabNotif');
  if (tabNotif) tabNotif.classList.toggle('active', section === 'notif');
  if (section === 'notif') renderNotifications();
}

// ---- Marcadores ----
function renderBookmarks() {
  const bmarks = _getBookmarks();
  const list   = document.getElementById('msgBookmarkList');
  const empty  = document.getElementById('msgEmptyBookmarks');
  if (!list) return;

  if (bmarks.length === 0) {
    list.innerHTML = '';
    if (empty) empty.style.display = 'flex';
    return;
  }
  if (empty) empty.style.display = 'none';

  const convs = _getConversations();
  list.innerHTML = bmarks.map(id => {
    const c = convs.find(x => String(x.id) === String(id));
    if (!c) return '';
    const initial = (c.name || '?')[0].toUpperCase();
    const bg      = _avatarColor(c.name);
    const avatar  = c.image
      ? `<img src="${c.image}" alt="${c.name}" loading="lazy">`
      : `<span style="color:#fff;font-size:1.1rem;font-weight:700">${initial}</span>`;
    return `
      <div class="msg-chat-item" onclick="openChatById('${c.id}')">
        <div class="msg-chat-avatar-wrap">
          <div class="msg-chat-avatar" style="background:${bg}">${avatar}</div>
        </div>
        <div class="msg-chat-body">
          <div class="msg-chat-top">
            <span class="msg-chat-name">${escapeHtml(c.name)}</span>
            <span class="msg-chat-time">${c.lastTime || ''}</span>
          </div>
          <span class="msg-chat-preview">${escapeHtml(c.lastMsg || '')}</span>
        </div>
      </div>`;
  }).join('');
}

// ---- Notificaciones — sistema real ----

const NOTIF_KEY = 'fynderNotifications';

/** Carga todas las notificaciones guardadas en localStorage */
function _getNotifications() {
  try { return JSON.parse(localStorage.getItem(NOTIF_KEY)) || []; }
  catch { return []; }
}

/** Guarda la lista de notificaciones */
function _saveNotifications(list) {
  localStorage.setItem(NOTIF_KEY, JSON.stringify(list));
}

/**
 * Agrega una nueva notificación al almacén.
 * @param {Object} opts - { type, title, body, icon, bizId, image }
 */
function pushNotification({ type = 'info', title, body, icon = '🔔', bizId = null, image = null } = {}) {
  const notifs = _getNotifications();
  notifs.unshift({
    id:    Date.now() + Math.random(),
    type,          // 'welcome'|'fav'|'chat'|'promo'|'info'
    title,
    body,
    icon,
    bizId,
    image,
    ts:    Date.now(),
    read:  false
  });
  // Máximo 50 notificaciones
  if (notifs.length > 50) notifs.length = 50;
  _saveNotifications(notifs);
  updateNotifBadge();

  // Dispara notificación nativa del navegador si el permiso está concedido
  if (Notification.permission === 'granted' && _msgSettings.notif) {
    try {
      new Notification(title, {
        body,
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        tag: String(bizId || type)
      });
    } catch (e) { /* Safari puede lanzar en algunos contextos */ }
  }
}

/** Elimina todas las notificaciones de un negocio específico */
function clearNotifsByBizId(bizId) {
  const notifs = _getNotifications().filter(n => String(n.bizId) !== String(bizId));
  _saveNotifications(notifs);
  updateNotifBadge();
  // Si el tab de notificaciones está visible, re-renderizar
  const tabNotif = document.getElementById('msgTabNotif');
  if (tabNotif && tabNotif.classList.contains('active')) renderNotifications();
}

/** Marca todas las notificaciones como leídas */
function markAllNotifsRead() {
  const notifs = _getNotifications().map(n => ({ ...n, read: true }));
  _saveNotifications(notifs);
  updateNotifBadge();
}

/** Marca una notificación individual como leída */
function markNotifRead(id) {
  const notifs = _getNotifications().map(n => n.id === id ? { ...n, read: true } : n);
  _saveNotifications(notifs);
  updateNotifBadge();
}

/** Elimina una notificación */
function deleteNotif(id) {
  const notifs = _getNotifications().filter(n => n.id !== id);
  _saveNotifications(notifs);
  renderNotifications();
  updateNotifBadge();
}

/** Actualiza el badge del botón "Notificaciones" en el header de mensajes */
function updateNotifBadge() {
  const unread = _getNotifications().filter(n => !n.read).length;
  // Badge en el tab del header
  const tabBtn = document.getElementById('msgTabNotif');
  if (tabBtn) {
    let dot = tabBtn.querySelector('.msg-notif-dot');
    if (unread > 0) {
      if (!dot) {
        dot = document.createElement('span');
        dot.className = 'msg-notif-dot';
        tabBtn.appendChild(dot);
      }
      dot.textContent = unread > 9 ? '9+' : unread;
    } else {
      if (dot) dot.remove();
    }
  }
}

/** Solicita permiso de notificaciones al navegador */
async function requestNotifPermission() {
  if (!('Notification' in window)) {
    showToast('Tu navegador no soporta notificaciones');
    return;
  }
  if (Notification.permission === 'granted') {
    showToast('¡Las notificaciones ya están activadas!');
    _hideNotifBanner();
    _setNotifBtnActivated();
    return;
  }
  if (Notification.permission === 'denied') {
    showToast('Notificaciones bloqueadas. Actívalas desde la configuración del navegador.');
    return;
  }
  const perm = await Notification.requestPermission();
  if (perm === 'granted') {
    _setNotifBtnActivated();
    showToast('✅ ¡Notificaciones activadas!');
    setTimeout(() => _hideNotifBanner(), 1200);
    pushNotification({
      type: 'welcome',
      title: '¡Bienvenido a Fynder!',
      body: 'Ahora recibirás actualizaciones sobre negocios y ofertas.',
      icon: '🎉'
    });
    renderNotifications();
    settSyncNotif(); // actualiza el estado en ajustes también
  } else {
    showToast('Notificaciones no activadas');
  }
}

/** Marca el botón del banner como "Activado" visualmente */
function _setNotifBtnActivated() {
  const btn = document.getElementById('notifBannerBtn');
  if (btn) {
    btn.innerHTML = '<i class="fas fa-bell"></i> Activado';
    btn.classList.add('activated');
  }
  // Ajustes: actualizar el botón y estado
  const settBtn = document.getElementById('settNotifActivarBtn');
  if (settBtn) {
    settBtn.textContent = '✓ Activado';
    settBtn.style.background = '#10B981';
    settBtn.style.color = '#fff';
    settBtn.style.borderColor = '#10B981';
    settBtn.disabled = true;
  }
}

/** Manejador del botón "Activar" del banner — actualiza UI antes de la promesa */
async function handleNotifBannerClick(btn) {
  if (!('Notification' in window)) {
    showToast('Tu navegador no soporta notificaciones');
    return;
  }
  if (Notification.permission === 'granted') {
    btn.innerHTML = '<i class="fas fa-bell"></i> Activado';
    btn.classList.add('activated');
    showToast('¡Las notificaciones ya están activadas!');
    setTimeout(() => _hideNotifBanner(), 1200);
    return;
  }
  if (Notification.permission === 'denied') {
    showToast('Notificaciones bloqueadas. Actívalas desde la configuración del navegador.');
    return;
  }
  // Mostrar estado de carga
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Activando...';
  btn.disabled = true;
  const perm = await Notification.requestPermission();
  if (perm === 'granted') {
    btn.innerHTML = '<i class="fas fa-bell"></i> Activado';
    btn.classList.add('activated');
    btn.disabled = false;
    showToast('✅ ¡Notificaciones activadas!');
    setTimeout(() => _hideNotifBanner(), 1500);
    pushNotification({
      type: 'welcome',
      title: '¡Bienvenido a Fynder!',
      body: 'Ahora recibirás actualizaciones sobre negocios y ofertas.',
      icon: '🎉'
    });
    renderNotifications();
    settSyncNotif();
  } else {
    btn.innerHTML = '<i class="fas fa-bell-slash"></i> Bloqueado';
    btn.style.background = '#EF4444';
    btn.disabled = false;
    showToast('Notificaciones no activadas');
  }
}

function _hideNotifBanner() {
  const banner = document.querySelector('.msg-notif-banner');
  if (banner) banner.style.display = 'none';
}

/* ── Modal de ajustes administrados por la organización ── */
function showOrgInfoModal() {
  const modal = document.getElementById('orgInfoModal');
  if (modal) modal.classList.add('open');
}
function closeOrgInfoModal() {
  const modal = document.getElementById('orgInfoModal');
  if (modal) modal.classList.remove('open');
}
// Cerrar con Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeOrgInfoModal();
});

/** Formatea una fecha para las notificaciones (relativa al presente real) */
function _fmtNotifDate(ts) {
  const diff = Date.now() - ts;
  const min  = Math.floor(diff / 60000);
  const hrs  = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (min < 1)   return 'Ahora mismo';
  if (min < 60)  return `Hace ${min} min`;
  if (hrs < 24)  return `Hace ${hrs} h`;
  if (days < 7)  return `Hace ${days} día${days > 1 ? 's' : ''}`;
  return new Date(ts).toLocaleDateString('es', { day: 'numeric', month: 'short' });
}

/** Ícono por tipo de notificación */
function _notifTypeIcon(type) {
  const map = {
    welcome: '🎉',
    fav:     '❤️',
    chat:    '💬',
    promo:   '🏷️',
    info:    '📢'
  };
  return map[type] || '🔔';
}

function renderNotifications() {
  const list = document.getElementById('msgNotifList');
  if (!list) return;

  // Actualizar visibilidad del banner según permiso
  const banner = document.querySelector('.msg-notif-banner');
  if (banner) {
    const shouldShow = !('Notification' in window) || Notification.permission !== 'granted';
    banner.style.display = shouldShow ? 'flex' : 'none';
  }

  const notifs = _getNotifications();

  if (notifs.length === 0) {
    list.innerHTML = `
      <div class="msg-empty" style="display:flex">
        <div class="msg-empty-icon"><i class="fas fa-bell-slash"></i></div>
        <p class="msg-empty-title">Sin notificaciones</p>
        <p class="msg-empty-sub">Cuando haya novedades de negocios o tus actividades, aparecerán aquí.</p>
      </div>`;
    return;
  }

  // Cabecera con "Marcar todas como leídas"
  const unread = notifs.filter(n => !n.read).length;
  const header = unread > 0
    ? `<div class="msg-notif-actions-row">
         <span class="msg-notif-count">${unread} sin leer</span>
         <button class="msg-notif-markall" onclick="markAllNotifsRead();renderNotifications()">
           <i class="fas fa-check-double"></i> Marcar todas
         </button>
       </div>`
    : '';

  list.innerHTML = header + notifs.map(n => {
    const icon = n.image
      ? `<img class="msg-notif-card-img" src="${n.image}" alt="${n.title}" loading="lazy">`
      : `<div class="msg-notif-card-emoji">${_notifTypeIcon(n.type)}</div>`;

    const action = n.bizId
      ? `<button class="msg-notif-card-btn"
           onclick="event.stopPropagation();deleteNotif(${n.id});openChatById('${n.bizId}')">
           Ver más
         </button>`
      : '';

    return `
      <div class="msg-notif-card${n.read ? ' msg-notif-card--read' : ''}"
           onclick="deleteNotif(${n.id})${n.bizId ? `;openChatById('${n.bizId}')` : ''}">
        ${icon}
        <div class="msg-notif-card-body">
          <div class="msg-notif-card-header">
            <p class="msg-notif-card-title">${escapeHtml(n.title)}</p>
            <button class="msg-notif-card-del" title="Eliminar"
              onclick="event.stopPropagation();deleteNotif(${n.id})">
              <i class="fas fa-xmark"></i>
            </button>
          </div>
          <p class="msg-notif-card-date">${_fmtNotifDate(n.ts)}</p>
          <p class="msg-notif-card-desc">${escapeHtml(n.body)}</p>
          ${action}
        </div>
      </div>`;
  }).join('');
}

// ---- Badge de mensajes no leídos ----
function updateMsgBadge() {
  const convs  = _getConversations();
  const unread = convs.reduce((s, c) => s + (c.unread || 0), 0);

  // Badge en el nuevo nav-link "Mensajes"
  const badge = document.getElementById('navMsgBadge');
  if (badge) {
    badge.textContent = unread > 9 ? '9+' : unread;
    badge.style.display = unread > 0 ? 'flex' : 'none';
  }

  // Badge en el bottom-nav de la página de mensajes
  const bnavBadge = document.getElementById('msgBnavBadge');
  if (bnavBadge) {
    bnavBadge.textContent = unread > 9 ? '9+' : unread;
    bnavBadge.style.display = unread > 0 ? 'flex' : 'none';
  }
}

// ---- Helpers ----
function _updateConvLastMsg(bizId, text, time) {
  let convs = _getConversations();
  const idx = convs.findIndex(c => String(c.id) === String(bizId));
  if (idx > -1) {
    convs[idx].lastMsg  = text;
    convs[idx].lastTime = time;
    // Mover al principio
    const [conv] = convs.splice(idx, 1);
    convs.unshift(conv);
    _saveConversations(convs);
  }
}
function _fmtTime(d) {
  return d.toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit', hour12: true });
}
function _fmtDate(d) {
  const today = new Date();
  const isToday = d.toDateString() === today.toDateString();
  if (isToday) return 'Hoy';
  const yesterday = new Date(today); yesterday.setDate(today.getDate() - 1);
  if (d.toDateString() === yesterday.toDateString()) return 'Ayer';
  return d.toLocaleDateString('es', { day: 'numeric', month: 'short' });
}
function _fmtRelativeDate() {
  const now = new Date();
  const d   = new Date(now.getFullYear(), now.getMonth(), now.getDate() - Math.floor(Math.random() * 7));
  return _fmtDate(d);
}
function _avatarColor(name) {
  const colors = ['#67B8B4','#2F5BB7','#F97316','#8B5CF6','#EC4899','#10B981','#EF4444','#F4D35E'];
  let hash = 0;
  for (let i = 0; i < (name||'').length; i++) hash = (name||'').charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
}
function escapeHtml(str) {
  if (!str) return '';
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ---- Hook en goPage para inicializar mensajes ----
// La inicialización se hace directamente desde el goPage original modificado arriba
// y desde el DOMContentLoaded abajo.

// ---- Inicialización al cargar ----
document.addEventListener('DOMContentLoaded', () => {
  updateMsgBadge();
  updateNotifBadge();

  // Genera notificaciones de bienvenida la primera vez que el usuario abre la app
  const SEED_KEY = 'fynderNotifSeeded';
  if (!localStorage.getItem(SEED_KEY)) {
    localStorage.setItem(SEED_KEY, '1');
    const promos = BUSINESSES.filter(b => b.isFeatured).slice(0, 3);
    promos.forEach((b, i) => {
      setTimeout(() => {
        pushNotification({
          type:  'promo',
          title: `Novedad de ${b.name}`,
          body:  b.description ? b.description.slice(0, 90) + (b.description.length > 90 ? '…' : '') : '¡Visita su perfil!',
          bizId: b.id,
          image: b.image || null
        });
      }, i * 50); // ligero stagger para timestamps distintos
    });
    // Notificación de bienvenida a Fynder
    setTimeout(() => {
      pushNotification({
        type:  'welcome',
        title: '¡Bienvenido a Fynder!',
        body:  'Descubre negocios locales, guarda tus favoritos y chatea directamente con ellos.',
        icon:  '🎉'
      });
    }, 200);
  }
});


/* PERFIL DEL NEGOCIO DESDE CHAT */

function openChatProfile() {
  if (!_activeChatBizId) return;
  const biz = BUSINESSES.find(b => String(b.id) === String(_activeChatBizId));
  const isDesktop = window.innerWidth >= 769;

  if (isDesktop) {
    // ── Desktop: abrir panel lateral de info ──
    _populateChatInfoPanel(biz);
    const panel = document.getElementById('waChatInfoPanel');
    if (panel) panel.classList.add('open');
    return;
  }

  // ── Móvil: navegar a la página chat-profile ──
  _populateChatProfilePage(biz);
  goPage('chat-profile');
}

/* Rellena el panel lateral de info (desktop) */
function _populateChatInfoPanel(biz) {
  // Avatar
  const avaEl = document.getElementById('waCproAvatar');
  if (avaEl) {
    if (biz && (biz.logo || biz.image)) {
      avaEl.innerHTML = `<img src="${biz.logo || biz.image}" alt="${biz ? biz.name : ''}">`;
      avaEl.style.background = '';
    } else {
      avaEl.innerHTML = '';
      const initial = biz ? (biz.name || '?')[0].toUpperCase() : '?';
      avaEl.textContent = initial;
      avaEl.style.background = _avatarColor(biz ? biz.name : '');
    }
  }
  // Nombre y teléfono
  const nameEl  = document.getElementById('waCproName');
  const phoneEl = document.getElementById('waCproPhone');
  if (nameEl)  nameEl.textContent  = biz ? biz.name  : '—';
  if (phoneEl) phoneEl.textContent = biz && biz.phone ? biz.phone : '';

  // Botón llamar
  const callBtn = document.getElementById('waCproCallBtn');
  if (callBtn) {
    if (biz && biz.phone) {
      callBtn.onclick = () => { window.location.href = 'tel:' + biz.phone.replace(/\s/g,''); };
    } else {
      callBtn.onclick = () => showToast('Teléfono no disponible');
    }
  }

  // Media strip
  const strip   = document.getElementById('waCproMediaStrip');
  const countEl = document.getElementById('waCproMediaCount');
  if (strip) {
    const imgs = [];
    if (biz && biz.logo)  imgs.push(biz.logo);
    if (biz && biz.image) imgs.push(biz.image);
    strip.innerHTML = imgs.map(url =>
      `<img class="cpro-media-thumb" src="${url}" alt="" loading="lazy">`
    ).join('');
    if (countEl) {
      countEl.textContent = imgs.length + ' ›';
      countEl.onclick = openPhotoLightbox;
      countEl.style.cursor = 'pointer';
    }
  }

  // Lista de info
  const infoList = document.getElementById('waCproInfoList');
  if (infoList && biz) {
    infoList.innerHTML = _buildCproInfoRows(biz);
  }
}

/* Rellena la página de perfil (móvil) */
function _populateChatProfilePage(biz) {
  // Título del header
  const titleEl = document.getElementById('cproHeaderTitle');
  if (titleEl) titleEl.textContent = biz ? biz.name : 'Información';

  // Avatar grande
  const avaEl = document.getElementById('cproAvatar');
  if (avaEl) {
    if (biz && (biz.logo || biz.image)) {
      avaEl.innerHTML = `<img src="${biz.logo || biz.image}" alt="${biz ? biz.name : ''}">`;
      avaEl.style.background = '';
    } else {
      avaEl.innerHTML = '';
      const initial = biz ? (biz.name || '?')[0].toUpperCase() : '?';
      avaEl.textContent = initial;
      avaEl.style.background = _avatarColor(biz ? biz.name : '');
    }
  }

  // Nombre y teléfono
  const nameEl  = document.getElementById('cproName');
  const phoneEl = document.getElementById('cproPhone');
  if (nameEl)  nameEl.textContent  = biz ? biz.name  : '—';
  if (phoneEl) phoneEl.textContent = biz && biz.phone ? biz.phone : '';

  // Botón llamar
  const callBtn = document.getElementById('cproCallBtn');
  if (callBtn && biz && biz.phone) {
    callBtn.onclick = () => { window.location.href = 'tel:' + biz.phone.replace(/\s/g,''); };
  } else if (callBtn) {
    callBtn.onclick = () => showToast('Teléfono no disponible');
  }

  // Media strip
  const strip   = document.getElementById('cproMediaStrip');
  const countEl = document.getElementById('cproMediaCount');
  if (strip) {
    const imgs = [];
    if (biz && biz.logo)  imgs.push(biz.logo);
    if (biz && biz.image) imgs.push(biz.image);
    strip.innerHTML = imgs.map(url =>
      `<img class="cpro-media-thumb" src="${url}" alt="" loading="lazy">`
    ).join('');
    if (countEl) {
      countEl.textContent = imgs.length + ' ›';
      countEl.onclick = openPhotoLightbox;
      countEl.style.cursor = 'pointer';
    }
  }

  // Lista de info
  const infoList = document.getElementById('cproInfoList');
  if (infoList && biz) {
    infoList.innerHTML = _buildCproInfoRows(biz);
  }
}

/* Construye las filas de info comunes a ambos destinos */
function _buildCproInfoRows(biz) {
  const rows = [];
  
  // Dirección - hace click para abrir en mapa
  if (biz.address) rows.push({ 
    icon: 'fa-location-dot', 
    title: biz.address, 
    sub: biz.category || '',
    action: `onclick="openChatProfileMap()" style="cursor:pointer"`
  });
  
  // Horario - solo informativo
  if (biz.hours) rows.push({ 
    icon: 'fa-clock', 
    title: biz.hours, 
    sub: 'Horario',
    action: ''
  });
  
  // Teléfono - hace click para llamar
  if (biz.phone) rows.push({ 
    icon: 'fa-phone', 
    title: biz.phone, 
    sub: 'Teléfono',
    action: `onclick="window.location.href='tel:${biz.phone.replace(/\\s/g,'')}'" style="cursor:pointer"`
  });
  
  // Sitio web - hace click para abrir
  if (biz.website) rows.push({ 
    icon: 'fa-globe', 
    title: biz.website, 
    sub: 'Sitio web',
    action: `onclick="window.open('${biz.website.startsWith('http') ? biz.website : 'https://' + biz.website}','_blank')" style="cursor:pointer"`
  });
  
  // Instagram - hace click para abrir
  if (biz.instagram) rows.push({ 
    icon: 'fa-instagram', 
    title: biz.instagram, 
    sub: 'Instagram',
    action: `onclick="window.open('https://instagram.com/${biz.instagram.replace('@','')}','_blank')" style="cursor:pointer"`
  });
  
  // Facebook - hace click para abrir
  if (biz.facebook) rows.push({ 
    icon: 'fa-facebook', 
    title: biz.facebook, 
    sub: 'Facebook',
    action: `onclick="window.open('${biz.facebook.startsWith('http') ? biz.facebook : 'https://facebook.com/' + biz.facebook}','_blank')" style="cursor:pointer"`
  });
  
  // Descripción - solo informativo
  if (biz.description) rows.push({ 
    icon: 'fa-circle-info', 
    title: biz.description, 
    sub: 'Descripción',
    action: ''
  });
  
  // Valoración - hace click para abrir el modal con reseñas
  if (biz.rating) rows.push({ 
    icon: 'fa-star', 
    title: `${biz.rating} ⭐  (${biz.reviews || 0} reseñas)`, 
    sub: 'Valoración',
    action: `onclick="openModal('${biz.id}');setTimeout(()=>document.getElementById('modalTabReviews')?.click(),100)" style="cursor:pointer"`
  });

  return rows.map(r => `
    <div class="cpro-settings-item" ${r.action}>
      <div class="cpro-settings-icon"><i class="fas ${r.icon}"></i></div>
      <div class="cpro-settings-text">
        <span class="cpro-settings-title">${escapeHtml(r.title)}</span>
        ${r.sub ? `<span class="cpro-settings-sub">${escapeHtml(r.sub)}</span>` : ''}
      </div>
      ${r.action ? '<i class="fas fa-chevron-right cpro-settings-arrow"></i>' : ''}
    </div>`).join('');
}

/* Cierra el panel lateral de info */
function closeWaChatInfoPanel() {
  const panel = document.getElementById('waChatInfoPanel');
  if (panel) panel.classList.remove('open');
  closeWaCproMenu(); // Cerrar menú si estaba abierto
}

/* Abre/Cierra el menú contextual del panel lateral */
let _waCproMenuOpen = false;
function toggleWaCproMenu(btn) {
  const menu = document.getElementById('waCproCtxMenu');
  if (!menu) return;
  _waCproMenuOpen = !_waCproMenuOpen;
  menu.style.display = _waCproMenuOpen ? 'flex' : 'none';
}

function closeWaCproMenu() {
  const menu = document.getElementById('waCproCtxMenu');
  if (menu) menu.style.display = 'none';
  _waCproMenuOpen = false;
}

// Cerrar el menú del panel de info al hacer click fuera
document.addEventListener('click', (e) => {
  const menu = document.getElementById('waCproCtxMenu');
  const btn  = document.getElementById('waCproMenuBtn');
  if (!menu || menu.style.display === 'none') return;
  if (btn && btn.contains(e.target)) return;
  if (!menu.contains(e.target)) closeWaCproMenu();
});

function openChatProfileMap() {
  if (!_activeChatBizId) return;
  const biz = BUSINESSES.find(b => String(b.id) === String(_activeChatBizId));
  if (biz && biz.mapQuery) {
    window.open('https://maps.google.com/?q=' + encodeURIComponent(biz.mapQuery), '_blank');
  } else {
    showToast('Ubicación no disponible');
  }
}

function deleteChatHistory() {
  if (!_activeChatBizId) return;
  if (!confirm('¿Borrar todo el historial de este chat?')) return;
  
  localStorage.removeItem('fynderChat_' + _activeChatBizId);
  
  // Actualizar conversación
  let convs = _getConversations();
  const idx = convs.findIndex(c => String(c.id) === String(_activeChatBizId));
  if (idx > -1) { 
    convs[idx].lastMsg = ''; 
    convs[idx].lastTime = ''; 
    _saveConversations(convs); 
  }
  
  showToast('Historial borrado');
  
  // En desktop: recargar mensajes del chat activo
  const isDesktop = window.innerWidth >= 769;
  if (isDesktop) {
    closeWaChatInfoPanel();
    renderChatMessages();
    renderConversations();
  } else {
    goPage('chat');
  }
}

function blockBiz() {
  if (!_activeChatBizId) return;
  
  if (!confirm('¿Bloquear este negocio? Ya no recibirás mensajes.')) return;
  
  // Aquí iría la lógica real de bloqueo (localStorage, etc.)
  let blocked = JSON.parse(localStorage.getItem('fynderBlocked') || '[]');
  if (!blocked.includes(_activeChatBizId)) {
    blocked.push(_activeChatBizId);
    localStorage.setItem('fynderBlocked', JSON.stringify(blocked));
  }
  
  showToast('Negocio bloqueado');
  
  // En desktop: cerrar panel y chat
  const isDesktop = window.innerWidth >= 769;
  if (isDesktop) {
    closeWaChatInfoPanel();
    waCloseChat();
    renderConversations();
  } else {
    goPage('messages');
  }
}


/* MENÚ CONTEXTUAL DE CHAT (⋮) */

let _ctxMenuBizId = null;

function openMsgCtxMenu(bizId, event) {
  if (event) event.stopPropagation();
  _ctxMenuBizId = String(bizId);

  const convs = _getConversations();
  const conv  = convs.find(c => String(c.id) === String(bizId));
  const biz   = BUSINESSES.find(b => String(b.id) === String(bizId));

  // Header del menú
  const ava  = document.getElementById('msgCtxAva');
  const name = document.getElementById('msgCtxName');
  if (ava) {
    const src = (conv && conv.image) || (biz && biz.image) || '';
    const lbl = conv ? conv.name : (biz ? biz.name : '?');
    if (src) {
      ava.innerHTML = `<img src="${src}" alt="">`;
    } else {
      ava.innerHTML = '';
      ava.textContent = lbl[0].toUpperCase();
      ava.style.background = _avatarColor(lbl);
    }
  }
  if (name) name.textContent = conv ? conv.name : (biz ? biz.name : '');

  // Estado de marcador
  const bmarks = _getBookmarks();
  const isBookmarked = bmarks.includes(String(bizId));
  const icon  = document.getElementById('msgCtxBookmarkIcon');
  const label = document.getElementById('msgCtxBookmarkLabel');
  if (icon)  icon.className  = isBookmarked ? 'fas fa-bookmark-slash' : 'fas fa-bookmark';
  if (label) label.textContent = isBookmarked ? 'Quitar de marcadores' : 'Añadir a marcadores';

  document.getElementById('msgCtxOverlay').classList.add('open');
  document.getElementById('msgCtxMenu').classList.add('open');
}

function closeMsgCtxMenu() {
  document.getElementById('msgCtxOverlay').classList.remove('open');
  document.getElementById('msgCtxMenu').classList.remove('open');
}

function toggleMsgBookmark() {
  if (!_ctxMenuBizId) return;
  let bmarks = _getBookmarks();
  const id   = String(_ctxMenuBizId);
  const idx  = bmarks.indexOf(id);
  if (idx > -1) {
    bmarks.splice(idx, 1);
    showToast('Eliminado de marcadores');
  } else {
    bmarks.unshift(id);
    showToast('Añadido a marcadores ⭐');
  }
  _saveBookmarks(bmarks);
  closeMsgCtxMenu();
  renderConversations(); // refrescar lista
}

function msgCtxOpenChat() {
  closeMsgCtxMenu();
  if (_ctxMenuBizId) openChatById(_ctxMenuBizId);
}

function msgCtxViewProfile() {
  closeMsgCtxMenu();
  if (!_ctxMenuBizId) return;
  _activeChatBizId = _ctxMenuBizId;
  openChatProfile();
}

function msgCtxMarkRead() {
  if (!_ctxMenuBizId) return;
  let convs = _getConversations();
  const conv = convs.find(c => String(c.id) === String(_ctxMenuBizId));
  if (conv) { conv.unread = 0; _saveConversations(convs); }
  updateMsgBadge();
  renderConversations();
  showToast('Marcado como leído');
  closeMsgCtxMenu();
}

function msgCtxDeleteChat() {
  if (!_ctxMenuBizId) return;
  closeMsgCtxMenu();
  if (!confirm('¿Eliminar esta conversación?')) return;
  // Borrar mensajes
  localStorage.removeItem('fynderChat_' + _ctxMenuBizId);
  // Quitar de lista de conversaciones
  let convs = _getConversations();
  convs = convs.filter(c => String(c.id) !== String(_ctxMenuBizId));
  _saveConversations(convs);
  // Quitar de marcadores
  let bmarks = _getBookmarks();
  bmarks = bmarks.filter(id => id !== String(_ctxMenuBizId));
  _saveBookmarks(bmarks);
  updateMsgBadge();
  renderConversations();
  showToast('Conversación eliminada');
}

/* Actualizar renderConversations para usar openMsgCtxMenu */
// (Sobreescribe la función anterior con la nueva que pasa bizId al menú)

/** Query activo del buscador de chats — se mantiene entre renders */
let _convSearchQuery = '';

function renderConversations() {
  let convs = _getConversations();
  const list  = document.getElementById('msgChatList');
  const empty = document.getElementById('msgEmptyChats');
  if (!list) return;

  // Aplicar filtro de búsqueda
  if (_convSearchQuery) {
    const q = _convSearchQuery;
    convs = convs.filter(c =>
      (c.name    || '').toLowerCase().includes(q) ||
      (c.lastMsg || '').toLowerCase().includes(q)
    );
  }

  if (convs.length === 0) {
    list.innerHTML = _convSearchQuery
      ? `<div class="msg-search-empty"><i class="fas fa-magnifying-glass"></i><p>Sin resultados para "<b>${escapeHtml(_convSearchQuery)}</b>"</p></div>`
      : '';
    if (empty) {
      if (_convSearchQuery) empty.classList.add('hide');
      else empty.classList.remove('hide');
    }
    return;
  }
  if (empty) empty.classList.add('hide');

  list.innerHTML = convs.map(c => {
    const initial = (c.name || '?')[0].toUpperCase();
    const bg      = _avatarColor(c.name);
    const avatar  = c.image
      ? `<img src="${c.image}" alt="${escapeHtml(c.name)}" loading="lazy">`
      : `<span style="color:#fff;font-size:1rem;font-weight:700;font-family:'Poppins',sans-serif">${initial}</span>`;
    const unread  = c.unread > 0 ? `<span class="msg-chat-unread">${c.unread}</span>` : '';

    // Punto de marcador
    const bmarks = _getBookmarks();
    const starBadge = bmarks.includes(String(c.id))
      ? `<span class="msg-chat-bookmark-dot" title="Marcado"><i class="fas fa-bookmark" style="font-size:.6rem;color:#F4D35E"></i></span>`
      : '';

    // Preview: resaltar término buscado
    let preview = escapeHtml(c.lastMsg || 'Toca para ver el chat');
    if (_convSearchQuery && c.lastMsg) {
      const idx = c.lastMsg.toLowerCase().indexOf(_convSearchQuery);
      if (idx > -1) {
        const raw = escapeHtml(c.lastMsg);
        const esc = escapeHtml(_convSearchQuery);
        preview = raw.replace(new RegExp(esc, 'gi'), m => `<mark class="msg-search-mark">${m}</mark>`);
      }
    }

    return `
      <div class="msg-chat-item" onclick="openChatById('${c.id}')">
        <div class="msg-chat-avatar-wrap">
          <div class="msg-chat-avatar" style="background:${bg}">${avatar}</div>
          <span class="msg-chat-online"></span>
        </div>
        <div class="msg-chat-body">
          <div class="msg-chat-top">
            <span class="msg-chat-name">${escapeHtml(c.name)}${starBadge}</span>
            <span class="msg-chat-time">${c.lastTime || ''}</span>
          </div>
          <span class="msg-chat-preview">${preview}</span>
        </div>
        <div class="msg-chat-actions">
          ${unread}
          <button class="msg-chat-menu" onclick="openMsgCtxMenu('${c.id}', event)" title="Más opciones">
            <i class="fas fa-ellipsis-vertical"></i>
          </button>
        </div>
      </div>`;
  }).join('');
}

/* EMOJI PICKER */

const EMOJI_SKIN_TONES = ['','\uD83C\uDFFB','\uD83C\uDFFC','\uD83C\uDFFD','\uD83C\uDFFE','\uD83C\uDFFF'];
const EMOJI_SKIN_BASE = ['👋','🤚','🖐','✋','🖖','👌','🤏','✌','🤞','🤟','🤘','🤙','👈','👉','👆','🖕','👇','☝','👍','👎','✊','👊','🤛','🤜','�','🦵','🦶','👂','🦻','👃','💅','🤳','👶','🧒','👦','👧','🧑','👱','👨','🧔','👩','🧓','👴','👵','🙍','🙎','🙅','🙆','💁','🙋','🧏','🙇','🤦','🤷','💆','💇','🚶','🧍','🧍','🏃'];
let _emojiSkinTone = 0;
const EMOJI_CATS = [
  { id:'recent',  icon:'🕐', label:'Recientes',  emojis:[] },
  { id:'faces',   icon:'😀', label:'Emoticonos', emojis:['😀','😃','😄','😁','😆','😅','🤣','😂','🙂','🙃','😉','😊','😇','🥰','😍','🤩','😘','😗','☺','😚','😙','🥲','😋','😛','😜','🤪','😝','🤑','🤗','🤭','🤫','🤔','🤐','🤨','😐','😑','😶','😏','😒','🙄','😬','🤥','😌','😔','😪','🤤','😴','😷','🤒','🤕','🤢','🤮','🤧','🥵','🥶','🥴','😵','🤯','🤠','🥳','🥸','😎','🤓','🧐','😕','😟','🙁','☹','😮','😯','😲','😳','🥺','😦','😧','😨','😰','😥','😢','😭','😱','😖','😣','😞','😓','😩','😫','🥱','😤','😡','😠','🤬','😈','👿','💀','☠','💩','🤡','👹','👺','👻','👽','👾','🤖','😺','😸','😹','😻','😼','😽','🙀','😿','😾','🫠','🫡','🫢','🫣','🫤','🫥'] },
  { id:'people',  icon:'🧑', label:'Personas',   emojis:['👋','🤚','🖐','✋','🖖','🫱','🫲','🫳','🫴','👌','🤌','🤏','✌','🤞','🫰','🤟','🤘','🤙','👈','👉','👆','🖕','👇','☝','🫵','👍','👎','✊','👊','🤛','🤜','👏','🙌','🫶','🤲','🤝','🙏','✍','💅','🤳','💪','🦾','🦿','🦵','🦶','👂','🦻','👃','🧠','🫀','🫁','🦷','🦴','👀','👁','👅','👄','🫦','🫂','👶','🧒','👦','👧','🧑','👱','👨','🧔','👩','🧓','👴','👵','🙍','🙍‍♂️','🙍‍♀️','🙎','🙎‍♂️','🙎‍♀️','🙅','🙅‍♂️','🙅‍♀️','🙆','🙆‍♂️','🙆‍♀️','💁','💁‍♂️','💁‍♀️','🙋','🙋‍♂️','🙋‍♀️','🧏','🧏‍♂️','🧏‍♀️','🙇','🙇‍♂️','🙇‍♀️','🤦','🤦‍♂️','🤦‍♀️','🤷','🤷‍♂️','🤷‍♀️','🧑‍⚕️','👨‍⚕️','👩‍⚕️','🧑‍🎓','👨‍🎓','👩‍🎓','🧑‍🏫','👨‍🏫','👩‍🏫','🧑‍⚖️','👨‍⚖️','👩‍⚖️','🧑‍🌾','👨‍🌾','👩‍🌾','🧑‍🍳','👨‍🍳','👩‍🍳','🧑‍🔧','👨‍🔧','👩‍🔧','🧑‍🏭','👨‍🏭','👩‍🏭','🧑‍💼','👨‍💼','👩‍💼','🧑‍🔬','👨‍🔬','👩‍🔬','🧑‍🎨','👨‍🎨','👩‍🎨','🧑‍🚒','👨‍🚒','👩‍🚒','🧑‍✈️','👨‍✈️','👩‍✈️','🧑‍🚀','👨‍🚀','👩‍🚀','🧑‍💻','👨‍💻','👩‍💻','👮','👮‍♂️','👮‍♀️','🕵️','💂','💂‍♂️','💂‍♀️','🥷','👷','👷‍♂️','👷‍♀️','🤴','👸','👰','👰‍♂️','👰‍♀️','🤵','🤵‍♂️','🤵‍♀️','🦸','🦸‍♂️','🦸‍♀️','🦹','🦹‍♂️','🦹‍♀️','🧙','🧙‍♂️','🧙‍♀️','🧝','🧝‍♂️','🧝‍♀️','🧛','🧛‍♂️','🧛‍♀️','🧟','🧟‍♂️','🧟‍♀️','🧞','🧞‍♂️','🧞‍♀️','🧜','🧜‍♂️','🧜‍♀️','🧚','🧚‍♂️','🧚‍♀️','🧌','👼','🎅','🤶','🧑‍🎄','💆','💆‍♂️','💆‍♀️','💇','💇‍♂️','💇‍♀️','🚶','🚶‍♂️','🚶‍♀️','🧍','🧍‍♂️','🧍‍♀️','🧎','🧎‍♂️','🧎‍♀️','🏃','🏃‍♂️','🏃‍♀️','💃','🕺','🕴','👯','👯‍♂️','👯‍♀️','🧖','🧖‍♂️','🧖‍♀️','🧗','🧗‍♂️','🧗‍♀️','🤸','🤸‍♂️','🤸‍♀️','⛹️','⛹️‍♂️','⛹️‍♀️','🤺','🏊','🏊‍♂️','🏊‍♀️','🚴','🚴‍♂️','🚴‍♀️','🏋️','🏋️‍♂️','🏋️‍♀️','🤼','🤼‍♂️','🤼‍♀️','🤽','🤽‍♂️','🤽‍♀️','🤾','🤾‍♂️','🤾‍♀️','🤹','🧘','🧘‍♂️','🧘‍♀️','🛀','🧑‍🤝‍🧑','👫','👬','👭','💑','💏','👨‍👩‍👦','👨‍👩‍👧','👨‍👩‍👧‍👦','👨‍👩‍👦‍👦','👨‍👩‍👧‍👧','👨‍👨‍👦','👩‍👩‍👦','👨‍👧','👨‍👦','👩‍👧','👩‍👦'] },
  { id:'nature',  icon:'🐶', label:'Animales',   emojis:['🐶','🐱','🐭','🐹','🐰','🦊','🐻','🐼','🐨','🐯','🦁','🐮','🐷','🐸','🐵','🙈','🙉','🙊','🐒','🐔','🐧','🐦','🐤','🐣','🐥','🦆','🦅','🦉','🦇','🐺','🐗','🐴','🦄','🐝','🪱','🐛','🦋','🐌','🐞','🐜','🪲','🦟','🦗','🪳','🕷','🦂','🐢','🐍','🦎','🦖','🦕','🐙','🦑','🦐','🦞','🦀','🐡','🐠','🐟','🐬','🐳','🐋','🦈','🐊','🐅','🐆','🦓','🦍','🦧','🦣','🐘','🦛','🦏','🐪','🐫','🦒','🦘','🦬','🐃','🐂','🐄','🐎','🐖','🐏','🐑','🦙','🐐','🦌','🐕','🐩','🦮','🐕‍🦺','🐈','🐈‍⬛','🪶','🐓','🦃','🦤','🦚','🦜','🦢','🦩','🕊','🐇','🦝','🦨','🦡','🦫','🦦','🦥','🐁','🐀','🐿','🦔','🌵','🎄','🌲','🌳','🌴','🪵','🌱','🌿','☘','🍀','🎍','🪴','🎋','🍃','🍂','🍁','🍄','🐚','🌾','💐','🌷','🌹','🥀','🪷','🌺','🌸','🌼','🌻','🌞','🌝','🌛','🌜','🌚','🌕','🌖','🌗','🌘','🌑','🌒','🌓','🌔','🌙','🌟','⭐','🌠','🌌','☀','🌤','⛅','🌥','☁','🌦','🌧','⛈','🌩','🌨','❄','☃','⛄','🌬','💨','💧','💦','🫧','🌊','🌫'] },
  { id:'food',    icon:'🍕', label:'Comida',     emojis:['🍕','🍔','🍟','🌭','🍿','🧂','🥓','🥚','🍳','🧇','🥞','🧈','🍞','🥐','🥖','🫓','🥨','🥯','🧀','🥗','🥙','🥪','🌮','🌯','🫔','🧆','🍱','🍘','🍙','🍚','🍛','🍜','🍝','🍠','🍢','🍣','🍤','🍥','🥮','🍡','🥟','🥠','🥡','🦀','🦞','🦐','🦑','🦪','🍦','🍧','🍨','🍩','🍪','🎂','🍰','🧁','🥧','🍫','🍬','🍭','🍮','🍯','🍼','🥛','☕','🫖','🍵','🍶','🍾','🍷','🍸','🍹','🍺','🍻','🥂','🥃','🫗','🥤','🧋','🧃','🧉','🧊','🫙','🍽','🍴','🥄','🔪','🫕','🥘','🍲','🫚','🫛','🌽','🥕','🥦','🥬','🥒','🌶','🫑','🧄','🧅','🥔','🍠','🥐','🥯','🍞','🥖','🫓','🥨','🧀','🥚','🍳','🧇','🥞','🧈','🥓','🥩','🍗','🍖','🌭','🍔','🍟','🍕','🫓','🥪','🥙','🧆','🌮','🌯','🫔','🥗','🥘','🫕','🍲','🍛','🍜','🍝','🍠','🍣','🍱','🥟','🦪','🍤','🍙','🍚','🍘','🍥','🥮','🍢','🧆','🥡'] },
  { id:'travel',  icon:'✈', label:'Viajes',     emojis:['🚗','🚕','🚙','🚌','🚎','🏎','🚓','🚑','🚒','🚐','🛻','🚚','🚛','🚜','🏍','🛵','🛺','🚲','🛴','🛹','🛼','🚏','🛣','🛤','⛽','🚨','🚥','🚦','🛑','🚧','⚓','🛟','⛵','🛶','🚤','🛳','⛴','🛥','🚢','✈','🛩','🛫','🛬','🪂','💺','🚁','🚟','🚠','🚡','🛸','🚀','🛰','🪐','🌍','🌎','🌏','🌐','🗺','🧭','🏔','⛰','🌋','🗻','🏕','🏖','🏜','🏝','🏟','🏛','🏗','🧱','🪨','🪵','🛖','🏘','🏚','🏠','🏡','🏢','🏣','🏤','🏥','🏦','🏨','🏩','🏪','🏫','🏬','🏭','🏯','🏰','💒','🗼','🗽','⛪','🕌','🛕','⛩','🕋','⛲','⛺','🌁','🌃','🌄','🌅','🌆','🌇','🌉','🎠','🎡','🎢','💈','🎪','🎭','🎨','🎬','🎤','🎧','🎼','🎹','🎸','🎺','🎻','🥁','🪘','🪗','🎷','🥁','🎯','⛳','🎣','🤿','🎽','🎿','🛷','🥌','🎱','🎳','🏸','🥊','🥋','🎮','🕹','🎲','🧩','🪀','🪁','🀄','🃏','🎴','🏆','🥇','🥈','🥉','🏅','🎖','🏵','🎗','🎫','🎟'] },
  { id:'objects', icon:'💡', label:'Objetos',    emojis:['⌚','📱','📲','💻','⌨','🖥','🖨','🖱','🖲','💽','💾','💿','📀','🧮','📷','📸','📹','🎥','📽','🎞','📞','☎','📟','📠','📺','📻','🧭','⏱','⏲','⏰','🕰','⌛','⏳','📡','🔋','🪫','🔌','💡','🔦','🕯','🪔','🧯','💰','🪙','💴','💵','💶','💷','💸','💳','📧','📨','📩','📤','📥','📦','📫','📪','📬','📭','📮','🗳','✏','✒','🖋','🖊','📝','📁','📂','🗂','📅','📆','🗒','🗓','📇','📈','📉','📊','📋','📌','📍','🗃','🗄','🗑','🔒','🔓','🔏','🔐','🔑','🗝','🔨','🪓','⛏','⚒','🛠','🗡','⚔','🛡','🪚','🔧','🪛','🔩','⚙','🗜','⚖','🦯','🔗','⛓','🪝','🧲','🪜','⚗','🔭','🔬','🩺','💊','🩹','🩼','🩻','🌡','🪤','🧰','🪣','🧹','🧺','🧻','🧼','🫧','🪥','🧽','🛒','🚪','🛗','🪞','🪟','🛏','🛋','🚽','🪠','🚿','🛁','🪒','🧴','🧷','🧸','🪆','🖼','🪅','🎀','🎊','🎉','🎈','🧧','🎁','🎗','🎟','🎫','🎖','📿','💎','🔮','🪬','🧿','💈','🔭','🔬','🩺','🩻','💉','🩸','💊','🩹','🩼','🌡','🧬','🦠','🧫','🧪','🌡','⚗','🔭','🔬','🕳','💣','🪤','🔫','🗡','⚔','🛡','🪃','🏹','🪚','🔧','🪛','🔩','⚙','🗜','🔗','⛓','🪝','🧲','🪜','🧰','🪤','🪣'] },
  { id:'symbols', icon:'❤', label:'Símbolos',   emojis:['❤','🧡','💛','💚','💙','💜','🖤','🤍','🤎','💔','❣','💕','💞','💓','💗','💖','💘','💝','💟','☮','✝','☪','🪯','🕉','☸','✡','🔯','🕎','☯','☦','🛐','⛎','♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓','🆔','⚛','🉑','☢','☣','📴','📳','🈶','🈚','🈸','🈺','🈷','✴','🆚','💮','🉐','㊙','㊗','🈴','🈵','🈹','🈲','🅰','🅱','🆎','🆑','🅾','🆘','❌','⭕','🛑','⛔','📛','🚫','💯','💢','♨','🚷','🚯','🚳','🚱','🔞','📵','🔇','🔈','🔉','🔊','📣','📢','🔔','🔕','🎵','🎶','⚠','🚸','🔱','⚜','🔰','♻','✅','🆗','🆙','🆒','🆕','🆓','🔟','🔂','🔁','🔀','▶','⏩','⏭','⏯','◀','⏪','⏮','🔼','⏫','🔽','⏬','⏸','⏹','⏺','🔅','🔆','📶','🔣','🔤','🔡','🔢','🔠','💱','💲','⁉','⚡','🌈','🔥','💥','✨','💫','🕳','💤','💢','💬','💭','🗨','🗯','💯'] },
];

let _emojiActiveCat = 0;
let _emojiOpen = false;

function toggleEmojiPicker() {
  _emojiOpen ? closeEmojiPicker() : openEmojiPicker();
}

function openEmojiPicker() {
  _emojiOpen = true;
  // Construir tabs
  const tabsEl = document.getElementById('emojiPickerTabs');
  if (tabsEl && !tabsEl.children.length) {
    tabsEl.innerHTML = EMOJI_CATS.map((cat, i) =>
      `<button class="emoji-tab-btn${i === 0 ? ' active' : ''}" onclick="emojiSelectCat(${i})" title="${cat.label}">${cat.icon}</button>`
    ).join('');
  }
  // Renderizar primera categoría
  renderEmojiCat(_emojiActiveCat);

  document.getElementById('emojiOverlay').classList.add('open');
  document.getElementById('emojiPicker').classList.add('open');
  document.getElementById('emojiSearch').value = '';
  document.getElementById('emojiSearch').focus();
}

function closeEmojiPicker() {
  _emojiOpen = false;
  document.getElementById('emojiOverlay').classList.remove('open');
  document.getElementById('emojiPicker').classList.remove('open');
}

function emojiSelectCat(idx) {
  _emojiActiveCat = idx;
  document.querySelectorAll('.emoji-tab-btn').forEach((b, i) => b.classList.toggle('active', i === idx));
  document.getElementById('emojiSearch').value = '';
  renderEmojiCat(idx);
}

function renderEmojiCat(idx) {
  const grid = document.getElementById('emojiGrid');
  if (!grid) return;
  grid.innerHTML = EMOJI_CATS[idx].emojis.map(e =>
    `<button class="emoji-btn" onclick="insertEmoji('${e}')">${e}</button>`
  ).join('');
}

function filterEmojis() {
  const q    = document.getElementById('emojiSearch').value.toLowerCase().trim();
  const grid = document.getElementById('emojiGrid');
  if (!grid) return;
  if (!q) { renderEmojiCat(_emojiActiveCat); return; }

  // Buscar en todas las categorías
  const allEmojis = EMOJI_CATS.flatMap(cat => cat.emojis);
  const filtered  = allEmojis.filter((e, i, arr) => arr.indexOf(e) === i); // deduplicate
  grid.innerHTML = filtered.map(e =>
    `<button class="emoji-btn" onclick="insertEmoji('${e}')">${e}</button>`
  ).join('');
}

function insertEmoji(emoji) {
  const input = document.getElementById('chatInput');
  if (!input) return;
  const start = input.selectionStart;
  const end   = input.selectionEnd;
  const val   = input.value;
  input.value = val.slice(0, start) + emoji + val.slice(end);
  input.setSelectionRange(start + emoji.length, start + emoji.length);
  input.focus();
  closeEmojiPicker();
}

/* AJUSTES DE MENSAJES */

const _msgSettings = {
  notif:       true,
  sound:       false,
  read:        true,
  online:      true,
  bubbleColor: '#1a5c34',
  fontSize:    'normal',
  wallpaper:   'default'
};

function _loadMsgSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem('fynderMsgSettings') || '{}');
    Object.assign(_msgSettings, saved);
  } catch(e) {}
}
function _saveMsgSettings() {
  localStorage.setItem('fynderMsgSettings', JSON.stringify(_msgSettings));
}

function openMsgSettings() {
  _loadMsgSettings();

  // Sync toggles de notif / sonido / leído
  ['notif','sound','read'].forEach(k => {
    const el = document.getElementById('setting' + k.charAt(0).toUpperCase() + k.slice(1) + 'Toggle');
    if (el) el.classList.toggle('on', _msgSettings[k] !== false);
  });

  // Sync toggle de "en línea"
  const onlineToggle = document.getElementById('settingOnlineToggle');
  if (onlineToggle) onlineToggle.classList.toggle('on', _msgSettings.online !== false);

  // Sync toggle de tema oscuro
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const themeToggle = document.getElementById('settingThemeToggle');
  const themeIcon   = document.getElementById('settingThemeIcon');
  const themeSub    = document.getElementById('settingThemeSub');
  if (themeToggle) themeToggle.classList.toggle('on', isDark);
  if (themeIcon) themeIcon.innerHTML = isDark ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
  if (themeSub) themeSub.textContent = isDark ? 'Tema actual: oscuro' : 'Tema actual: claro';

  // Sync color dots
  document.querySelectorAll('.msg-color-dot').forEach(dot => {
    dot.classList.toggle('active', dot.dataset.color === _msgSettings.bubbleColor);
  });

  // Sync font sub
  const fontLabels = { small:'Pequeño', normal:'Normal', large:'Grande' };
  const fontSubEl = document.getElementById('settingFontSub');
  if (fontSubEl) fontSubEl.textContent = fontLabels[_msgSettings.fontSize] || 'Normal';

  // Sync font buttons
  document.querySelectorAll('.msg-font-btn').forEach((btn, i) => {
    const sizes = ['small','normal','large'];
    btn.classList.toggle('active', sizes[i] === (_msgSettings.fontSize || 'normal'));
  });

  // Sync color sub
  const colorNames = {
    '#67B8B4':'Teal Fynder',
    '#7b3838':'Rojo oscuro',
    '#1e4d7b':'Azul oscuro',
    '#1a5c34':'Verde oscuro',
    '#5b2d82':'Morado',
    '#7a4a1a':'Naranja',
    '#2b5c5c':'Verde azulado'
  };
  const colorSubEl = document.getElementById('settingColorSub');
  if (colorSubEl) colorSubEl.textContent = colorNames[_msgSettings.bubbleColor] || 'Personalizado';

  // Sync wallpaper dots
  const wpNames = {
    default: 'Por defecto',
    dots: 'Patrón de puntos',
    gradient: 'Gradiente',
    dark: 'Oscuro total',
    nature: 'Verde natural'
  };
  document.querySelectorAll('.msg-wallpaper-dot').forEach(dot => {
    dot.classList.toggle('active', dot.dataset.wp === (_msgSettings.wallpaper || 'default'));
  });
  const wpSubEl = document.getElementById('settingWallpaperSub');
  if (wpSubEl) wpSubEl.textContent = wpNames[_msgSettings.wallpaper || 'default'] || 'Por defecto';

  document.getElementById('msgSettingsOverlay').classList.add('open');
  document.getElementById('msgSettingsPanel').classList.add('open');
}

function closeMsgSettings() {
  document.getElementById('msgSettingsOverlay').classList.remove('open');
  document.getElementById('msgSettingsPanel').classList.remove('open');
}

function toggleMsgSetting(key) {
  _loadMsgSettings();
  _msgSettings[key] = !_msgSettings[key];
  _saveMsgSettings();
  const idMap = { notif:'settingNotifToggle', sound:'settingSoundToggle', read:'settingReadToggle', online:'settingOnlineToggle' };
  const el = document.getElementById(idMap[key]);
  if (el) el.classList.toggle('on', _msgSettings[key]);
  showToast(_msgSettings[key] ? 'Activado' : 'Desactivado');
}

function msgToggleSetting(key, toggleId) {
  toggleMsgSetting(key);
}

function msgToggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', current);
  localStorage.setItem('fynderTheme', current);
  
  const icon = document.getElementById('settingThemeIcon');
  const sub = document.getElementById('settingThemeSub');
  const toggle = document.getElementById('settingThemeToggle');
  
  if (current === 'dark') {
    if (icon) icon.innerHTML = '<i class="fas fa-moon"></i>';
    if (sub) sub.textContent = 'Tema actual: oscuro';
    if (toggle) toggle.classList.add('on');
  } else {
    if (icon) icon.innerHTML = '<i class="fas fa-sun"></i>';
    if (sub) sub.textContent = 'Tema actual: claro';
    if (toggle) toggle.classList.remove('on');
  }
  
  showToast(`Tema ${current === 'dark' ? 'oscuro' : 'claro'} activado`);
}

function setChatWallpaper(wp, btn) {
  _loadMsgSettings();
  _msgSettings.wallpaper = wp;
  _saveMsgSettings();
  _applyChatWallpaper(wp);
  
  // Actualizar UI
  document.querySelectorAll('.msg-wallpaper-dot').forEach(d => d.classList.remove('active'));
  if (btn) btn.classList.add('active');
  
  const names = { 
    default: 'Por defecto', 
    dots: 'Patrón de puntos', 
    gradient: 'Gradiente', 
    dark: 'Oscuro total', 
    nature: 'Verde natural' 
  };
  
  const subEl = document.getElementById('settingWallpaperSub');
  if (subEl) subEl.textContent = names[wp] || 'Por defecto';
  
  showToast('Fondo actualizado');
}

function _applyChatWallpaper(wp) {
  const msgs = document.querySelector('.wa-chat-area .chat-messages');
  if (!msgs) return;
  
  ['wp-default', 'wp-dots', 'wp-gradient', 'wp-dark', 'wp-nature'].forEach(c => msgs.classList.remove(c));
  msgs.classList.add('wp-' + wp);
}

function clearAllChats() {
  if (!confirm('¿Borrar TODOS los chats y conversaciones? Esta acción no se puede deshacer.')) return;
  
  // Borrar todos los chats del localStorage
  const keys = Object.keys(localStorage);
  keys.forEach(key => {
    if (key.startsWith('fynderChat_')) {
      localStorage.removeItem(key);
    }
  });
  
  // Limpiar conversaciones
  _saveConversations([]);
  
  showToast('Todos los chats han sido borrados');
  closeMsgSettings();
  
  // Actualizar UI
  renderConversations();
  
  // Si estaba en un chat, cerrar
  const isDesktop = window.innerWidth >= 769;
  if (isDesktop) {
    waCloseChat();
  } else {
    goPage('messages');
  }
}

function setChatBubbleColor(color, name, btn) {
  _loadMsgSettings();
  _msgSettings.bubbleColor = color;
  _saveMsgSettings();
  
  // Actualizar CSS en tiempo real
  _applyChatBubbleColor(color);
  
  // Actualizar TODOS los dots de color (panel de mensajes Y página de ajustes)
  document.querySelectorAll('.msg-color-dot, .sett-color-dot').forEach(d => {
    d.classList.toggle('active', d.dataset.color === color);
  });
  
  // Actualizar label en el panel de mensajes
  const colorSubEl = document.getElementById('settingColorSub');
  if (colorSubEl) colorSubEl.textContent = name;
  
  showToast('Color actualizado');
}

function _applyChatBubbleColor(color) {
  let styleEl = document.getElementById('chatBubbleColorStyle');
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = 'chatBubbleColorStyle';
    document.head.appendChild(styleEl);
  }
  styleEl.textContent = `.chat-msg-row.out .chat-bubble { background: ${color} !important; }`;
}

function setChatFontSize(size, label) {
  _loadMsgSettings();
  _msgSettings.fontSize = size;
  _saveMsgSettings();
  
  // Aplicar tamaño
  _applyChatFontSize(size);
  
  // Actualizar label en el panel de mensajes
  const fontSubEl = document.getElementById('settingFontSub');
  if (fontSubEl) fontSubEl.textContent = label;
  
  // Actualizar TODOS los botones de tamaño (panel de mensajes Y página de ajustes)
  document.querySelectorAll('.msg-font-btn, .sett-font-btn').forEach((btn, i) => {
    const sizes = ['small','normal','large'];
    btn.classList.toggle('active', sizes[i] === size);
  });
  
  showToast('Tamaño actualizado');
}

function _applyChatFontSize(size) {
  const msgs = document.getElementById('chatMessages');
  if (!msgs) return;
  ['font-small','font-normal','font-large'].forEach(c => msgs.classList.remove(c));
  msgs.classList.add('font-' + size);
}

function exportChats() {
  const convs = _getConversations();
  if (convs.length === 0) { showToast('No hay conversaciones para exportar'); return; }
  let txt = 'Conversaciones de Fynder\n' + '='.repeat(40) + '\n\n';
  convs.forEach(c => {
    const msgs = _getMsgs(c.id);
    txt += `=== ${c.name} ===\n`;
    msgs.forEach(m => { txt += `[${m.date} ${m.time}] ${m.from === 'user' ? 'Yo' : c.name}: ${m.text}\n`; });
    txt += '\n';
  });
  const blob = new Blob([txt], { type: 'text/plain;charset=utf-8' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url; a.download = 'fynder-chats.txt'; a.click();
  URL.revokeObjectURL(url);
  showToast('Conversaciones exportadas');
}

function clearAllChats() {
  if (!confirm('¿Borrar TODOS los chats? Esta acción no se puede deshacer.')) return;
  const convs = _getConversations();
  convs.forEach(c => localStorage.removeItem('fynderChat_' + c.id));
  _saveConversations([]);
  _saveBookmarks([]);
  updateMsgBadge();
  renderConversations();
  closeMsgSettings();
  showToast('Todos los chats eliminados');
}

// ---- Aplicar ajustes al iniciar ----
document.addEventListener('DOMContentLoaded', () => {
  _loadMsgSettings();
  if (_msgSettings.bubbleColor) _applyChatBubbleColor(_msgSettings.bubbleColor);
  if (_msgSettings.fontSize)    _applyChatFontSize(_msgSettings.fontSize);
});

/* PHOTO LIGHTBOX – abre galería de fotos del negocio */

function openPhotoLightbox() {
  if (!_activeChatBizId) return;
  const biz = BUSINESSES.find(b => String(b.id) === String(_activeChatBizId));
  if (!biz) return;
  const imgs = [];
  if (biz.logo)  imgs.push({ src: biz.logo,  caption: 'Logo' });
  if (biz.image) imgs.push({ src: biz.image, caption: biz.name });

  if (!imgs.length) { showToast('Sin fotos disponibles'); return; }

  let currentIdx = 0;
  const overlay = document.createElement('div');
  overlay.id = 'photoLightbox';
  overlay.style.cssText = 'position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.92);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;';

  function render() {
    const img = imgs[currentIdx];
    overlay.innerHTML = `
      <button onclick="document.getElementById('photoLightbox').remove()" style="position:absolute;top:16px;right:16px;background:rgba(255,255,255,.15);border:none;color:#fff;width:40px;height:40px;border-radius:50%;font-size:1.2rem;cursor:pointer;display:flex;align-items:center;justify-content:center;"><i class="fas fa-xmark"></i></button>
      <img src="${img.src}" style="max-width:90vw;max-height:70dvh;border-radius:16px;object-fit:contain;box-shadow:0 8px 40px rgba(0,0,0,.6);" loading="lazy">
      <p style="color:rgba(255,255,255,.7);font-size:.875rem;font-family:'Inter',sans-serif;margin:0;">${escapeHtml(img.caption)} · ${currentIdx+1}/${imgs.length}</p>
      ${imgs.length > 1 ? `
      <div style="display:flex;gap:12px;">
        <button onclick="lightboxNav(-1)" style="background:rgba(255,255,255,.15);border:none;color:#fff;padding:10px 20px;border-radius:10px;cursor:pointer;font-size:.875rem;">‹ Anterior</button>
        <button onclick="lightboxNav(1)"  style="background:rgba(255,255,255,.15);border:none;color:#fff;padding:10px 20px;border-radius:10px;cursor:pointer;font-size:.875rem;">Siguiente ›</button>
      </div>` : ''}
    `;
  }
  window.lightboxNav = (dir) => {
    currentIdx = (currentIdx + dir + imgs.length) % imgs.length;
    render();
  };
  render();
  document.body.appendChild(overlay);
}


// ── LAYOUT WHATSAPP WEB ──────────────────────────────────────────────────────

/** Cierra el chat en desktop y muestra la pantalla de bienvenida */
function waCloseChat() {
  if (window.innerWidth >= 769) {
    _activeChatBizId = null;
    closeWaChatInfoPanel(); // Cerrar panel de info si estaba abierto
    const welcome  = document.getElementById('waWelcome');
    const chatArea = document.getElementById('waChatArea');
    if (welcome)  welcome.style.display  = 'flex';
    if (chatArea) chatArea.style.display = 'none';
    document.querySelectorAll('.msg-chat-item').forEach(el => el.classList.remove('wa-active'));
  } else {
    goPage('messages');
  }
}

/** Filtra la lista de conversaciones por texto */
function filterConversations(q) {
  // Guardar el query activo y re-renderizar respetándolo
  _convSearchQuery = (q || '').trim().toLowerCase();
  renderConversations();
}

/** Toggle emoji picker para el input móvil */
function toggleEmojiPickerMobile() {
  // Redirigir al mismo picker, pero al cerrar insertar en chatInputMobile
  const picker  = document.getElementById('emojiPicker');
  const overlay = document.getElementById('emojiOverlay');
  if (!picker) return;
  const isOpen = picker.classList.contains('open');
  if (isOpen) {
    picker.classList.remove('open');
    overlay.classList.remove('open');
    _emojiTargetId = 'chatInput';
  } else {
    _emojiTargetId = 'chatInputMobile';
    picker.classList.add('open');
    overlay.classList.add('open');
    buildEmojiPicker();
  }
}


/* CHAT: DIVISOR REDIMENSIONABLE (sidebar ↔ área principal) */
(function initWaResizer() {
  document.addEventListener('DOMContentLoaded', () => {
    const handle  = document.getElementById('waResizeHandle');
    const sidebar = document.querySelector('.wa-sidebar');
    if (!handle || !sidebar) return;

    let startX = 0, startW = 0, dragging = false;

    function onMouseMove(e) {
      if (!dragging) return;
      const delta = e.clientX - startX;
      const newW  = Math.max(260, Math.min(560, startW + delta));
      sidebar.style.width = newW + 'px';
    }

    function onMouseUp() {
      if (!dragging) return;
      dragging = false;
      handle.classList.remove('resizing');
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    handle.addEventListener('mousedown', (e) => {
      if (window.innerWidth < 769) return;
      dragging = true;
      startX   = e.clientX;
      startW   = sidebar.offsetWidth;
      handle.classList.add('resizing');
      document.body.style.cursor    = 'col-resize';
      document.body.style.userSelect = 'none';
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
      e.preventDefault();
    });
  });
})();

/* CHAT: BOTÓN ENVIAR / MICRÓFONO (toggle según haya texto) */
function chatInputChange() {
  const input   = document.getElementById('chatInput');
  const sendBtn = document.getElementById('chatSendBtn');
  const micBtn  = document.getElementById('chatMicBtn');
  if (!input || !sendBtn || !micBtn) return;
  const hasText = input.value.trim().length > 0;
  sendBtn.style.display = hasText ? '' : 'none';
  micBtn.style.display  = hasText ? 'none' : '';
}

// Inicializar el estado del botón al abrir un chat
(function patchChatOpen() {
  document.addEventListener('DOMContentLoaded', () => {
    // Esconder send, mostrar mic al inicio (sin texto)
    const sendBtn = document.getElementById('chatSendBtn');
    const micBtn  = document.getElementById('chatMicBtn');
    if (sendBtn) sendBtn.style.display = 'none';
    if (micBtn)  micBtn.style.display  = '';
  });
})();

/* CHAT: MENÚ DE ADJUNTAR */
let _attachMenuOpen = false;

function toggleAttachMenu() {
  const menu = document.getElementById('chatAttachMenu');
  if (!menu) return;
  _attachMenuOpen = !_attachMenuOpen;
  menu.classList.toggle('open', _attachMenuOpen);
}

// Cerrar al hacer click fuera
document.addEventListener('click', (e) => {
  const wrap = document.getElementById('chatAttachWrap');
  if (wrap && !wrap.contains(e.target)) {
    const menu = document.getElementById('chatAttachMenu');
    if (menu) menu.classList.remove('open');
    _attachMenuOpen = false;
  }
});

/* CHAT: ENVIAR ARCHIVOS ADJUNTOS */

/** Enviar ubicación actual como mensaje */
function sendChatLocation() {
  if (!_activeChatBizId) { showToast('Selecciona un chat primero'); return; }
  if (!localStorage.getItem('fynderLogged')) { showToast('Inicia sesión para enviar tu ubicación'); return; }
  if (!navigator.geolocation) { showToast('Tu dispositivo no soporta geolocalización'); return; }

  showToast('Obteniendo ubicación… 📍');
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const { latitude: lat, longitude: lng } = pos.coords;
      const mapUrl = `https://www.google.com/maps?q=${lat},${lng}`;
      const thumb  = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=15&size=300x150&markers=${lat},${lng}&key=`;
      const now    = new Date();
      const msg = {
        id: Date.now() + Math.random(), from: 'user', text: '',
        time: _fmtTime(now), date: _fmtDate(now), read: false,
        attach: { type: 'location', lat, lng, mapUrl, thumb }
      };
      const msgs = _getMsgs(_activeChatBizId);
      msgs.push(msg);
      _saveMsgs(_activeChatBizId, msgs);
      _updateConvLastMsg(_activeChatBizId, '📍 Ubicación compartida', msg.time);
      renderConversations();
      if (window.innerWidth >= 769) renderChatMessages(_activeChatBizId);
      else renderChatMessagesMobile(_activeChatBizId);
    },
    () => showToast('No se pudo obtener la ubicación', 'error')
  );
}

/** Enviar tarjeta de contacto del usuario */
function sendChatContact() {
  if (!_activeChatBizId) { showToast('Selecciona un chat primero'); return; }
  if (!localStorage.getItem('fynderLogged')) { showToast('Inicia sesión para enviar tu contacto'); return; }
  const user = JSON.parse(localStorage.getItem('fynderUser') || 'null');
  if (!user) { showToast('No hay información de perfil', 'error'); return; }
  const name  = user.name  || 'Usuario Fynder';
  const email = user.email || '';
  const now   = new Date();
  const msg = {
    id: Date.now() + Math.random(), from: 'user', text: '',
    time: _fmtTime(now), date: _fmtDate(now), read: false,
    attach: { type: 'contact', name, email }
  };
  const msgs = _getMsgs(_activeChatBizId);
  msgs.push(msg);
  _saveMsgs(_activeChatBizId, msgs);
  _updateConvLastMsg(_activeChatBizId, '👤 Contacto compartido', msg.time);
  renderConversations();
  if (window.innerWidth >= 769) renderChatMessages(_activeChatBizId);
  else renderChatMessagesMobile(_activeChatBizId);
  showToast('Contacto enviado 👤');
}

function handleFileAttach(input, type) {
  if (!input.files || !input.files.length) return;
  if (!_activeChatBizId) { showToast('Selecciona un chat primero'); return; }
  if (!localStorage.getItem('fynderLogged')) { showToast('Inicia sesión para enviar archivos'); return; }

  // Cerrar menú
  const menu = document.getElementById('chatAttachMenu');
  if (menu) menu.classList.remove('open');
  _attachMenuOpen = false;

  Array.from(input.files).forEach(file => {
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target.result;
      const now = new Date();
      const msg = {
        id:      Date.now() + Math.random(),
        from:    'user',
        text:    '',
        time:    _fmtTime(now),
        date:    _fmtDate(now),
        read:    false,
        attach:  {
          type:  type,
          name:  file.name,
          size:  file.size,
          mime:  file.type,
          data:  dataUrl
        }
      };
      const msgs = _getMsgs(_activeChatBizId);
      msgs.push(msg);
      _saveMsgs(_activeChatBizId, msgs);
      _updateConvLastMsg(_activeChatBizId,
        type === 'media'  ? '📷 Imagen/Video' :
        type === 'audio'  ? '🎵 Audio' : '📄 Documento',
        msg.time
      );
      renderConversations();
      renderChatMessages(_activeChatBizId);
    };
    reader.readAsDataURL(file);
  });

  // Limpiar el input para permitir volver a seleccionar el mismo archivo
  input.value = '';
}

// Parchear _renderMsgsInto para mostrar archivos adjuntos
(function patchRenderMsgsInto() {
  const _orig = window._renderMsgsInto;
  // Sobreescribir directamente en el renderizador existente inyectando HTML de adjunto
  // Lo hacemos reemplazando la función global
  const _origRender = _renderMsgsInto;
  window._renderMsgsInto = function(container, bizId) {
    if (!container) return;
    const msgs = _getMsgs(bizId);
    let html = '';
    let prevDate = '';
    let prevFrom = '';

    msgs.forEach((msg, i) => {
      const isOut = (msg.from === 'user');
      const isIn  = !isOut;

      if (msg.date && msg.date !== prevDate) {
        html += `<div class="chat-date-sep">${msg.date}</div>`;
        prevDate = msg.date;
      }

      const nextMsg         = msgs[i + 1];
      const isLastInGroup   = !nextMsg  || nextMsg.from  !== msg.from;
      const isFirstInGroup  = prevFrom !== msg.from;

      const biz = BUSINESSES.find(b => String(b.id) === String(bizId));
      const bizInitial  = biz ? (biz.name || '?')[0].toUpperCase() : '?';
      const bizAvaHtml  = biz && biz.image ? `<img src="${biz.image}" alt="">` : bizInitial;
      const bizAvaBg    = biz ? _avatarColor(biz.name) : '#4a4d55';

      let avaHtml = '';
      if (isIn) {
        avaHtml = isFirstInGroup
          ? `<div class="chat-msg-ava" style="${biz && !biz.image ? 'background:'+bizAvaBg : ''}">${bizAvaHtml}</div>`
          : `<div class="chat-msg-ava" style="visibility:hidden"></div>`;
      }

      let bubbleClass = 'chat-bubble';
      if (isIn  && isLastInGroup) bubbleClass += ' chat-bubble-tail-in';
      if (!isIn && isLastInGroup) bubbleClass += ' chat-bubble-tail-out';

      const ticks = isOut ? _buildTickHtml(msg) : '';

      // Contenido del bubble (texto o adjunto)
      let content = '';
      if (msg.attach) {
        const a = msg.attach;
        if (a.type === 'media') {
          if (a.mime && a.mime.startsWith('video/')) {
            content = `<video class="chat-bubble-video" controls src="${a.data}"></video>`;
          } else {
            // imagen
            content = `<img class="chat-bubble-img" src="${a.data}" alt="${escapeHtml(a.name)}" onclick="_openImgLightbox('${a.data}','${escapeHtml(a.name)}')">`;
          }
        } else if (a.type === 'audio') {
          const uid = 'aud_' + Date.now() + '_' + i;
          content = `
            <div class="chat-bubble-audio">
              <button class="chat-bubble-audio-play" onclick="_playBubbleAudio('${uid}',this)" id="playBtn_${uid}">
                <i class="fas fa-play"></i>
              </button>
              <audio id="${uid}" src="${a.data}" onended="_audioBubbleEnded('${uid}')"></audio>
              <div class="chat-bubble-audio-bar" onclick="_seekBubbleAudio(event,'${uid}')">
                <div class="chat-bubble-audio-progress" id="prog_${uid}"></div>
              </div>
              <span class="chat-bubble-audio-dur" id="dur_${uid}">0:00</span>
            </div>`;
        } else if (a.type === 'location') {
          content = `
            <div class="chat-bubble-location" onclick="window.open('${a.mapUrl}','_blank')">
              <div class="chat-bubble-location-map">
                <i class="fas fa-location-dot"></i>
              </div>
              <div class="chat-bubble-location-label">
                <span>📍 Ubicación compartida</span>
                <span style="font-size:.7rem;opacity:.7">Toca para ver en el mapa</span>
              </div>
            </div>`;
        } else if (a.type === 'contact') {
          const initLetter = (a.name || '?')[0].toUpperCase();
          content = `
            <div class="chat-bubble-contact">
              <div class="chat-bubble-contact-av">${initLetter}</div>
              <div class="chat-bubble-contact-info">
                <span class="chat-bubble-contact-name">${escapeHtml(a.name)}</span>
                ${a.email ? `<span class="chat-bubble-contact-sub">${escapeHtml(a.email)}</span>` : ''}
              </div>
              <i class="fas fa-user-plus" style="font-size:.9rem;opacity:.6"></i>
            </div>`;
        } else {
          // documento
          const sizeKb = a.size ? Math.round(a.size / 1024) + ' KB' : '';
          const icon = _docIcon(a.mime);
          content = `
            <div class="chat-bubble-file">
              <div class="chat-bubble-file-icon"><i class="${icon}"></i></div>
              <div class="chat-bubble-file-info">
                <div class="chat-bubble-file-name">${escapeHtml(a.name)}</div>
                <div class="chat-bubble-file-size">${sizeKb}</div>
              </div>
              <a href="${a.data}" download="${escapeHtml(a.name)}" style="color:inherit;font-size:.85rem;" title="Descargar"><i class="fas fa-download"></i></a>
            </div>`;
        }
      } else {
        content = escapeHtml(msg.text);
      }

      html += `
        <div class="${isIn ? 'chat-msg-row in' : 'chat-msg-row out'}">
          ${isIn ? avaHtml : ''}
          <div>
            <div class="${bubbleClass}">
              ${content}
              <div class="chat-bubble-meta">
                <span class="chat-bubble-time">${msg.time || ''}</span>
                ${ticks}
              </div>
            </div>
          </div>
        </div>`;
      prevFrom = msg.from;
    });

    container.innerHTML = html;
    requestAnimationFrame(() => { container.scrollTop = container.scrollHeight; });

    // Iniciar duración de audios
    container.querySelectorAll('.chat-bubble-audio audio').forEach(audio => {
      const id = audio.id;
      audio.addEventListener('loadedmetadata', () => {
        const dur = document.getElementById('dur_' + id);
        if (dur) dur.textContent = _fmtAudioTime(audio.duration);
      });
      audio.addEventListener('timeupdate', () => {
        const prog = document.getElementById('prog_' + id);
        const dur  = document.getElementById('dur_' + id);
        if (prog && audio.duration) prog.style.width = (audio.currentTime / audio.duration * 100) + '%';
        if (dur) dur.textContent = _fmtAudioTime(audio.currentTime);
      });
    });
  };
})();

function _docIcon(mime) {
  if (!mime) return 'fas fa-file';
  if (mime.includes('pdf'))   return 'fas fa-file-pdf';
  if (mime.includes('word') || mime.includes('document')) return 'fas fa-file-word';
  if (mime.includes('sheet') || mime.includes('excel'))   return 'fas fa-file-excel';
  if (mime.includes('presentation') || mime.includes('powerpoint')) return 'fas fa-file-powerpoint';
  if (mime.includes('zip') || mime.includes('rar'))       return 'fas fa-file-zipper';
  if (mime.includes('text')) return 'fas fa-file-lines';
  return 'fas fa-file';
}

function _fmtAudioTime(secs) {
  if (!isFinite(secs)) return '0:00';
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return m + ':' + String(s).padStart(2, '0');
}

function _playBubbleAudio(id, btn) {
  const audio = document.getElementById(id);
  if (!audio) return;
  if (audio.paused) {
    // Pausar cualquier otro audio en reproducción
    document.querySelectorAll('.chat-bubble-audio audio').forEach(a => {
      if (a !== audio && !a.paused) {
        a.pause();
        const b = document.getElementById('playBtn_' + a.id);
        if (b) b.innerHTML = '<i class="fas fa-play"></i>';
      }
    });
    audio.play();
    btn.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    audio.pause();
    btn.innerHTML = '<i class="fas fa-play"></i>';
  }
}

function _audioBubbleEnded(id) {
  const btn = document.getElementById('playBtn_' + id);
  if (btn) btn.innerHTML = '<i class="fas fa-play"></i>';
  const prog = document.getElementById('prog_' + id);
  if (prog) prog.style.width = '0%';
}

function _seekBubbleAudio(event, id) {
  const audio = document.getElementById(id);
  const bar   = event.currentTarget;
  if (!audio || !bar) return;
  const rect = bar.getBoundingClientRect();
  const ratio = (event.clientX - rect.left) / rect.width;
  audio.currentTime = ratio * audio.duration;
}

function _openImgLightbox(src, caption) {
  const overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.9);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;cursor:zoom-out;';
  overlay.onclick = () => overlay.remove();
  overlay.innerHTML = `
    <img src="${src}" style="max-width:92vw;max-height:82dvh;border-radius:12px;object-fit:contain;box-shadow:0 8px 40px rgba(0,0,0,.6);" loading="lazy" onclick="event.stopPropagation()">
    <p style="color:rgba(255,255,255,.6);font-size:.8rem;font-family:'Inter',sans-serif;margin:0;">${caption} · Clic para cerrar</p>`;
  document.body.appendChild(overlay);
}

/* CHAT: GRABACIÓN DE AUDIO (micrófono) */
let _mediaRecorder  = null;
let _audioChunks    = [];
let _recordTimer    = null;
let _recordSeconds  = 0;
let _isRecording    = false;

function toggleAudioRecord() {
  if (_isRecording) {
    stopAndSendAudio();
  } else {
    startAudioRecord();
  }
}

async function startAudioRecord() {
  if (!_activeChatBizId) { showToast('Selecciona un chat primero'); return; }
  if (!localStorage.getItem('fynderLogged')) { showToast('Inicia sesión para enviar audios'); return; }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    _audioChunks = [];
    _mediaRecorder = new MediaRecorder(stream);
    _mediaRecorder.ondataavailable = (e) => { if (e.data.size > 0) _audioChunks.push(e.data); };
    _mediaRecorder.onstop = _onRecordStop;
    _mediaRecorder.start();
    _isRecording = true;

    // Mostrar barra de grabación
    const micBtn    = document.getElementById('chatMicBtn');
    const inputBar  = document.querySelector('.chat-input-bar.wa-input-bar');
    const recordBar = document.getElementById('chatRecordBar');
    if (micBtn)   micBtn.classList.add('chat-mic-recording');
    if (inputBar) inputBar.style.display = 'none';
    if (recordBar) recordBar.style.display = 'flex';

    // Temporizador
    _recordSeconds = 0;
    _updateRecordTime();
    _recordTimer = setInterval(() => {
      _recordSeconds++;
      _updateRecordTime();
      // Límite de 5 minutos
      if (_recordSeconds >= 300) stopAndSendAudio();
    }, 1000);

  } catch (err) {
    if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
      showToast('Permiso de micrófono denegado. Actívalo en la configuración del navegador.');
    } else {
      showToast('No se pudo acceder al micrófono: ' + err.message);
    }
  }
}

function stopAndSendAudio() {
  if (!_mediaRecorder || !_isRecording) return;
  _isRecording = false;
  clearInterval(_recordTimer);
  _mediaRecorder.stop();
  // Detener pistas del stream
  if (_mediaRecorder.stream) {
    _mediaRecorder.stream.getTracks().forEach(t => t.stop());
  }
  _hideRecordBar();
}

function cancelAudioRecord() {
  if (_mediaRecorder && _isRecording) {
    _isRecording = false;
    clearInterval(_recordTimer);
    _mediaRecorder.onstop = null; // no enviar
    _mediaRecorder.stop();
    if (_mediaRecorder.stream) {
      _mediaRecorder.stream.getTracks().forEach(t => t.stop());
    }
  }
  _audioChunks = [];
  _hideRecordBar();
  showToast('Grabación cancelada');
}

function _hideRecordBar() {
  const micBtn    = document.getElementById('chatMicBtn');
  const inputBar  = document.querySelector('.chat-input-bar.wa-input-bar');
  const recordBar = document.getElementById('chatRecordBar');
  if (micBtn)   micBtn.classList.remove('chat-mic-recording');
  if (inputBar) inputBar.style.display = '';
  if (recordBar) recordBar.style.display = 'none';
  _updateRecordTime();
}

function _updateRecordTime() {
  const el = document.getElementById('chatRecordTime');
  if (el) el.textContent = _fmtAudioTime(_recordSeconds);
}

function _onRecordStop() {
  if (!_isRecording && _audioChunks.length === 0) return; // cancelado
  const blob  = new Blob(_audioChunks, { type: 'audio/webm' });
  const reader = new FileReader();
  reader.onload = (ev) => {
    const dataUrl = ev.target.result;
    const now = new Date();
    const msg = {
      id:   Date.now(),
      from: 'user',
      text: '',
      time: _fmtTime(now),
      date: _fmtDate(now),
      read: false,
      attach: {
        type: 'audio',
        name: 'Audio_' + _fmtTime(now).replace(':','') + '.webm',
        size: blob.size,
        mime: 'audio/webm',
        data: dataUrl
      }
    };
    const msgs = _getMsgs(_activeChatBizId);
    msgs.push(msg);
    _saveMsgs(_activeChatBizId, msgs);
    _updateConvLastMsg(_activeChatBizId, '🎤 Audio', msg.time);
    renderConversations();
    renderChatMessages(_activeChatBizId);
  };
  reader.readAsDataURL(blob);
  _audioChunks = [];
}

/* CHAT: ESTADO DE MENSAJES — TICKS ESTILO WHATSAPP — pending → reloj, sent → ✓ gris, delivered → ✓✓ gris, read → ✓✓ azul */
function _buildTickHtml(msg) {
  // Compatibilidad con mensajes anteriores que usan msg.read
  const status = msg.status || (msg.read ? 'read' : 'delivered');

  if (status === 'pending') {
    return `<span class="chat-bubble-tick tick-pending" title="Enviando...">
      <i class="fas fa-clock"></i>
    </span>`;
  }
  if (status === 'sent') {
    return `<span class="chat-bubble-tick tick-sent" title="Enviado">
      <i class="fas fa-check"></i>
    </span>`;
  }
  if (status === 'delivered') {
    return `<span class="chat-bubble-tick tick-delivered" title="Entregado">
      <i class="fas fa-check-double"></i>
    </span>`;
  }
  // read
  return `<span class="chat-bubble-tick tick-read" title="Leído">
    <i class="fas fa-check-double"></i>
  </span>`;
}

/* CHAT: DIVISOR REDIMENSIONABLE — RANGO AMPLIADO — Min: 200px | Max: 65% del viewport */
// Parchar el resizer existente para ampliar los límites
(function patchWaResizer() {
  document.addEventListener('DOMContentLoaded', () => {
    const handle  = document.getElementById('waResizeHandle');
    const sidebar = document.querySelector('.wa-sidebar');
    if (!handle || !sidebar) return;

    // Eliminar listeners anteriores clonando el nodo
    const newHandle = handle.cloneNode(true);
    handle.parentNode.replaceChild(newHandle, handle);

    let startX = 0, startW = 0, dragging = false;

    function clamp(val) {
      const min = 200;
      const max = Math.round(window.innerWidth * 0.65);
      return Math.max(min, Math.min(max, val));
    }

    function onMouseMove(e) {
      if (!dragging) return;
      const newW = clamp(startW + (e.clientX - startX));
      sidebar.style.width    = newW + 'px';
      sidebar.style.minWidth = newW + 'px';
      sidebar.style.maxWidth = newW + 'px';
    }

    function onMouseUp() {
      if (!dragging) return;
      dragging = false;
      newHandle.classList.remove('resizing');
      document.body.style.cursor     = '';
      document.body.style.userSelect = '';
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup',   onMouseUp);
    }

    newHandle.addEventListener('mousedown', (e) => {
      if (window.innerWidth < 769) return;
      dragging = true;
      startX   = e.clientX;
      startW   = sidebar.offsetWidth;
      newHandle.classList.add('resizing');
      document.body.style.cursor     = 'col-resize';
      document.body.style.userSelect = 'none';
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup',   onMouseUp);
      e.preventDefault();
    });
  });
})();

/* CHAT HEADER: funciones de los botones */

/** Llamar al teléfono del negocio si está disponible */
function waChatCall() {
  if (!_activeChatBizId) return;
  const biz = BUSINESSES.find(b => String(b.id) === String(_activeChatBizId));
  if (!biz) return;
  const phone = biz.phone || biz.whatsapp || biz.contact;
  if (phone) {
    const clean = String(phone).replace(/\D/g, '');
    window.open('tel:+' + clean, '_self');
  } else {
    showToast('Este negocio no tiene número de teléfono registrado 📵');
  }
}

/** Abrir/cerrar el menú contextual del header del chat */
let _waChatCtxOpen = false;
function toggleWaChatMenu(btn) {
  const menu = document.getElementById('waChatCtxMenu');
  if (!menu) return;
  _waChatCtxOpen = !_waChatCtxOpen;
  menu.style.display = _waChatCtxOpen ? 'flex' : 'none';
  // Actualizar label de silencio según estado actual
  if (_waChatCtxOpen && _activeChatBizId) {
    const muted = JSON.parse(localStorage.getItem('fynderMutedChats') || '[]');
    const isMuted = muted.includes(String(_activeChatBizId));
    const muteBtn = document.getElementById('waChatMuteBtn');
    if (muteBtn) muteBtn.innerHTML = `<i class="fas fa-bell${isMuted ? '' : '-slash'}"></i> ${isMuted ? 'Activar notificaciones' : 'Silenciar notificaciones'}`;
  }
}
function closeWaChatMenu() {
  const menu = document.getElementById('waChatCtxMenu');
  if (menu) menu.style.display = 'none';
  _waChatCtxOpen = false;
}
// Cerrar al hacer click fuera
document.addEventListener('click', (e) => {
  const menu = document.getElementById('waChatCtxMenu');
  if (!menu || menu.style.display === 'none') return;
  const area = document.getElementById('waChatArea');
  if (area && !area.querySelector('.wa-chat-header-actions').contains(e.target) && !menu.contains(e.target)) {
    closeWaChatMenu();
  }
});

/** Búsqueda dentro del chat (resalta mensajes que contienen el texto) */
function waChatSearch() {
  const q = prompt('Buscar en el chat:');
  if (!q || !q.trim()) return;
  const term = q.trim().toLowerCase();
  const bubbles = document.querySelectorAll('#chatMessages .chat-bubble');
  let found = 0;
  bubbles.forEach(b => {
    const txt = b.textContent.toLowerCase();
    b.style.outline = txt.includes(term) ? '2px solid var(--msg-accent)' : '';
    if (txt.includes(term)) found++;
  });
  if (found === 0) {
    showToast('No se encontraron mensajes con "' + q + '"');
  } else {
    showToast(`${found} mensaje${found > 1 ? 's' : ''} encontrado${found > 1 ? 's' : ''}`);
    // Scroll al primero encontrado
    const first = document.querySelector('#chatMessages .chat-bubble[style*="outline"]');
    if (first) first.scrollIntoView({ behavior: 'smooth', block: 'center' });
    // Limpiar resaltado después de 3 segundos
    setTimeout(() => {
      document.querySelectorAll('#chatMessages .chat-bubble').forEach(b => b.style.outline = '');
    }, 3000);
  }
}

/** Exportar solo el chat activo */
function exportThisChat() {
  if (!_activeChatBizId) return;
  const biz  = BUSINESSES.find(b => String(b.id) === String(_activeChatBizId));
  const name = biz ? biz.name : 'Negocio';
  const msgs = _getMsgs(_activeChatBizId);
  if (!msgs.length) { showToast('No hay mensajes para exportar'); return; }
  let txt = `Chat con ${name} — Fynder\n${'='.repeat(40)}\n\n`;
  msgs.forEach(m => {
    const who = m.from === 'user' ? 'Yo' : name;
    txt += `[${m.date} ${m.time}] ${who}: ${m.text || (m.attach ? '[Archivo adjunto]' : '')}\n`;
  });
  const blob = new Blob([txt], { type: 'text/plain;charset=utf-8' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url; a.download = `chat-${name.replace(/\s+/g,'-')}.txt`; a.click();
  URL.revokeObjectURL(url);
  showToast('Chat exportado ✅');
}

/** Borrar mensajes del chat activo */
function clearThisChat() {
  if (!_activeChatBizId) return;
  const biz  = BUSINESSES.find(b => String(b.id) === String(_activeChatBizId));
  const name = biz ? biz.name : 'este negocio';
  if (!confirm(`¿Vaciar todos los mensajes con ${name}?`)) return;
  _saveMsgs(_activeChatBizId, []);
  const convs = _getConversations();
  const idx   = convs.findIndex(c => String(c.id) === String(_activeChatBizId));
  if (idx > -1) { convs[idx].lastMsg = ''; convs[idx].lastTime = ''; _saveConversations(convs); }
  renderConversations();
  renderChatMessages(_activeChatBizId);
  showToast('Chat vaciado');
}

/** Eliminar la conversación completa (quita de la lista) */
function deleteThisConversation() {
  if (!_activeChatBizId) return;
  const biz  = BUSINESSES.find(b => String(b.id) === String(_activeChatBizId));
  const name = biz ? biz.name : 'este negocio';
  if (!confirm(`¿Eliminar el chat con ${name}? Se borrarán todos los mensajes.`)) return;
  // Borrar mensajes y conversación
  _saveMsgs(_activeChatBizId, []);
  const convs = _getConversations().filter(c => String(c.id) !== String(_activeChatBizId));
  _saveConversations(convs);
  _activeChatBizId = null;
  // Volver a la pantalla de bienvenida del chat
  const welcome  = document.getElementById('waWelcome');
  const chatArea = document.getElementById('waChatArea');
  if (welcome)  welcome.style.display  = 'flex';
  if (chatArea) chatArea.style.display = 'none';
  renderConversations();
  updateMsgBadge();
  showToast('Chat eliminado');
}

/** Silenciar / activar notificaciones del chat activo */
function toggleChatMute() {
  if (!_activeChatBizId) return;
  const key    = 'fynderMutedChats';
  const muted  = JSON.parse(localStorage.getItem(key) || '[]');
  const id     = String(_activeChatBizId);
  const isMuted = muted.includes(id);
  if (isMuted) {
    localStorage.setItem(key, JSON.stringify(muted.filter(x => x !== id)));
    showToast('Notificaciones activadas 🔔');
  } else {
    muted.push(id);
    localStorage.setItem(key, JSON.stringify(muted));
    showToast('Notificaciones silenciadas 🔕');
  }
  // Actualizar label del botón si está visible
  const btn = document.getElementById('waChatMuteBtn');
  if (btn) {
    const nowMuted = !isMuted;
    btn.innerHTML = `<i class="fas fa-bell${nowMuted ? '' : '-slash'}"></i> ${nowMuted ? 'Activar notificaciones' : 'Silenciar notificaciones'}`;
  }
}

/* CHAT PROFILE: botones funcionales */

/** Flecha atrás — vuelve al chat si estaba activo, si no a mensajes */
function cproGoBack() {
  if (_activeChatBizId) {
    if (window.innerWidth >= 769) {
      goPage('messages');
    } else {
      goPage('chat');
    }
  } else {
    goPage('messages');
  }
}

/** Llamar al negocio */
function cproCall() {
  if (!_activeChatBizId) return;
  const biz = BUSINESSES.find(b => String(b.id) === String(_activeChatBizId));
  if (!biz) return;
  const phone = biz.phone || biz.whatsapp;
  if (phone) {
    const clean = String(phone).replace(/[\s\-\(\)]/g, '');
    window.location.href = 'tel:' + clean;
  } else {
    showToast('Este negocio no tiene número de teléfono registrado 📵');
  }
}

/** Buscar en el chat activo */
function cproSearchInChat() {
  const q = prompt('Buscar en el chat con ' + (document.getElementById('cproName')?.textContent || 'este negocio') + ':');
  if (!q || !q.trim() || !_activeChatBizId) return;
  const term = q.trim().toLowerCase();
  const msgs = _getMsgs(_activeChatBizId);
  const matches = msgs.filter(m => m.text && m.text.toLowerCase().includes(term));
  if (!matches.length) {
    showToast(`No se encontraron mensajes con "${q}"`);
    return;
  }
  showToast(`${matches.length} mensaje${matches.length > 1 ? 's' : ''} encontrado${matches.length > 1 ? 's' : ''}`);
  // Volver al chat y resaltar
  cproGoBack();
  setTimeout(() => {
    const bubbles = document.querySelectorAll('#chatMessages .chat-bubble');
    bubbles.forEach(b => {
      b.style.outline = b.textContent.toLowerCase().includes(term)
        ? '2px solid var(--msg-accent)'
        : '';
    });
    const first = document.querySelector('#chatMessages .chat-bubble[style*="outline"]');
    if (first) first.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => {
      document.querySelectorAll('#chatMessages .chat-bubble').forEach(b => b.style.outline = '');
    }, 3500);
  }, 350);
}

/** Ver mapa — con fallback a address si no hay mapQuery */
function openChatProfileMap() {
  if (!_activeChatBizId) return;
  const biz = BUSINESSES.find(b => String(b.id) === String(_activeChatBizId));
  if (!biz) { showToast('Negocio no encontrado'); return; }
  const query = biz.mapQuery || biz.address;
  if (query) {
    window.open('https://maps.google.com/?q=' + encodeURIComponent(query.replace(/\+/g, ' ')), '_blank');
  } else {
    showToast('Ubicación no disponible para este negocio 📍');
  }
}

/** Contactar por WhatsApp */
function cproWhatsApp() {
  if (!_activeChatBizId) return;
  const biz = BUSINESSES.find(b => String(b.id) === String(_activeChatBizId));
  if (!biz) return;
  const wa = biz.whatsapp || biz.phone;
  if (wa) {
    const clean = String(wa).replace(/[\s\-\(\)\+]/g, '');
    window.open('https://wa.me/' + clean, '_blank');
  } else {
    showToast('WhatsApp no disponible para este negocio');
  }
}

/** Compartir el perfil del negocio */
function cproShareProfile() {
  if (!_activeChatBizId) return;
  const biz = BUSINESSES.find(b => String(b.id) === String(_activeChatBizId));
  const name = biz ? biz.name : 'este negocio';
  const text = `¡Descubrí ${name} en Fynder! 🚀 Encuéntralo en la app.`;
  if (navigator.share) {
    navigator.share({ title: name, text: text, url: window.location.href })
      .catch(() => {});
  } else {
    navigator.clipboard.writeText(text).then(() => {
      showToast('¡Enlace copiado al portapapeles! 📋');
    }).catch(() => {
      showToast('No se pudo compartir en este navegador');
    });
  }
}

/** Menú contextual del ⋮ del perfil */
let _cproMenuOpen = false;
function toggleCproMenu(btn) {
  const menu = document.getElementById('cproCtxMenu');
  if (!menu) return;
  _cproMenuOpen = !_cproMenuOpen;
  menu.style.display = _cproMenuOpen ? 'flex' : 'none';
}
function closeCproMenu() {
  const menu = document.getElementById('cproCtxMenu');
  if (menu) menu.style.display = 'none';
  _cproMenuOpen = false;
}
// Cerrar al hacer click fuera
document.addEventListener('click', (e) => {
  const menu = document.getElementById('cproCtxMenu');
  const btn  = document.getElementById('cproMenuBtn');
  if (!menu || menu.style.display === 'none') return;
  if (btn && btn.contains(e.target)) return;
  if (!menu.contains(e.target)) closeCproMenu();
});

/* RAIL DE ÍCONOS: lógica de navegación y avatar */

/** Cambia la sección activa del rail */
function waRailSwitch(section, btn) {
  // Quitar activo de todos los botones del rail
  document.querySelectorAll('.wa-rail-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  // Sincronizar con las tabs y paneles existentes
  if (section === 'chats') {
    if (typeof msgSwitchTab === 'function') msgSwitchTab('chats');
  } else if (section === 'bookmarks') {
    if (typeof msgSwitchTab === 'function') msgSwitchTab('bookmarks');
  } else if (section === 'notif') {
    if (typeof msgSwitchSection === 'function') msgSwitchSection('notif');
  }
}

/** Sincroniza el avatar del usuario en el rail */
function waRailSyncAvatar() {
  const btn = document.getElementById('waRailAvatar');
  if (!btn) return;
  const photo  = localStorage.getItem('fynderAvatarPhoto');
  const preset = localStorage.getItem('fynderAvatarPreset');
  const user   = JSON.parse(localStorage.getItem('fynderUser') || '{}');
  const initial = (user.name || 'U')[0].toUpperCase();
  const bg = localStorage.getItem('fynderAvatarInitialBg') || '#67B8B4';

  if (photo) {
    btn.innerHTML = `<img src="${photo}" alt="avatar" style="width:36px;height:36px;object-fit:cover;border-radius:50%;">`;
  } else if (preset) {
    btn.innerHTML = `<span style="font-size:1.3rem">${preset}</span>`;
  } else if (user.name) {
    btn.innerHTML = `<span style="width:32px;height:32px;border-radius:50%;background:${bg};display:flex;align-items:center;justify-content:center;font-size:.85rem;font-weight:700;color:#fff;font-family:'Poppins',sans-serif;">${initial}</span>`;
  } else {
    btn.innerHTML = '<i class="fas fa-user-circle"></i>';
  }
}

/** Actualiza el badge de mensajes no leídos en el rail */
function waRailUpdateBadge() {
  const badge = document.getElementById('railBadgeChats');
  const navBadge = document.getElementById('navMsgBadge');
  if (!badge) return;
  const count = navBadge ? (parseInt(navBadge.textContent) || 0) : 0;
  if (count > 0) {
    badge.textContent = count > 99 ? '99+' : count;
    badge.style.display = 'flex';
  } else {
    badge.style.display = 'none';
  }
}

// Inicializar el rail cuando se abre la página de mensajes
document.addEventListener('DOMContentLoaded', () => {
  // Parchear goPage para sincronizar el rail al entrar a mensajes
  const _origGoPageRail = window.goPage;
  if (_origGoPageRail) {
    const _patchedGoPage = function(p) {
      _origGoPageRail(p);
      if (p === 'messages') {
        waRailSyncAvatar();
        waRailUpdateBadge();
        // Marcar chats como activo en el rail
        document.querySelectorAll('.wa-rail-btn').forEach(b => b.classList.remove('active'));
        const railChats = document.getElementById('railBtnChats');
        if (railChats) railChats.classList.add('active');
      }
    };
    // Solo parchear si no fue ya parcheado
    if (!window._waRailPatched) {
      window._waRailPatched = true;
      window.goPage = _patchedGoPage;
    }
  }
});

/* AJUSTES DEL CHAT: modo oscuro y fondo del chat */

/** Toggle modo oscuro/día desde el panel de ajustes del chat */
function msgToggleTheme() {
  toggleDarkMode(); // usa la función global existente
  _syncMsgSettingsTheme();
}

/** Sincroniza el toggle y label del tema en el panel */
function _syncMsgSettingsTheme() {
  const isDark   = document.documentElement.getAttribute('data-theme') === 'dark';
  const toggle   = document.getElementById('settingThemeToggle');
  const sub      = document.getElementById('settingThemeSub');
  const icon     = document.getElementById('settingThemeIcon');

  if (toggle) toggle.classList.toggle('on', isDark);
  if (sub)    sub.textContent    = isDark ? 'Tema actual: oscuro' : 'Tema actual: claro';
  if (icon)   icon.innerHTML     = isDark
    ? '<i class="fas fa-moon"></i>'
    : '<i class="fas fa-sun" style="color:#F4D35E"></i>';
}

/** Toggle genérico de ajustes del chat (online, etc.) */
function msgToggleSetting(key, btnId) {
  const lsKey  = 'fynderMsgOpt_' + key;
  const btn    = document.getElementById(btnId);
  const isOn   = btn ? btn.classList.contains('on') : localStorage.getItem(lsKey) !== '0';
  const newVal = !isOn;
  localStorage.setItem(lsKey, newVal ? '1' : '0');
  if (btn) btn.classList.toggle('on', newVal);
  showToast(newVal ? 'Activado' : 'Desactivado');
}

/** Cambiar fondo del chat */
function setChatWallpaper(wp, btn) {
  // Quitar clases anteriores del área de mensajes
  const msgs1 = document.getElementById('chatMessages');
  const msgs2 = document.getElementById('chatMessagesMobile');
  [msgs1, msgs2].forEach(el => {
    if (!el) return;
    el.classList.remove('wp-dots', 'wp-gradient', 'wp-dark', 'wp-nature');
    if (wp !== 'default') el.classList.add('wp-' + wp);
  });

  // Guardar preferencia
  localStorage.setItem('fynderChatWallpaper', wp);

  // Actualizar dots activos
  document.querySelectorAll('.msg-wallpaper-dot').forEach(d => d.classList.remove('active'));
  if (btn) btn.classList.add('active');

  // Actualizar sub-label
  const wpLabels = { default:'Patrón por defecto', dots:'Puntos', gradient:'Gradiente', dark:'Oscuro total', nature:'Verde' };
  const sub = document.getElementById('settingWallpaperSub');
  if (sub) sub.textContent = wpLabels[wp] || wp;

  showToast('Fondo actualizado');
}

/** Restaurar fondo del chat al cargar */
function _restoreChatWallpaper() {
  const wp = localStorage.getItem('fynderChatWallpaper') || 'default';
  const msgs1 = document.getElementById('chatMessages');
  const msgs2 = document.getElementById('chatMessagesMobile');
  [msgs1, msgs2].forEach(el => {
    if (!el) return;
    el.classList.remove('wp-dots', 'wp-gradient', 'wp-dark', 'wp-nature');
    if (wp !== 'default') el.classList.add('wp-' + wp);
  });

  // Sync dots en el panel
  document.querySelectorAll('.msg-wallpaper-dot').forEach(d => {
    d.classList.toggle('active', d.dataset.wp === wp);
  });
  const wpLabels = { default:'Patrón por defecto', dots:'Puntos', gradient:'Gradiente', dark:'Oscuro total', nature:'Verde' };
  const sub = document.getElementById('settingWallpaperSub');
  if (sub) sub.textContent = wpLabels[wp] || wp;
}

// Parchear openMsgSettings para sincronizar el tema y wallpaper al abrir
const _origOpenMsgSettings = window.openMsgSettings;
window.openMsgSettings = function() {
  if (_origOpenMsgSettings) _origOpenMsgSettings();
  _syncMsgSettingsTheme();
  _restoreChatWallpaper();
};

// Restaurar wallpaper al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  _restoreChatWallpaper();
  _syncMsgSettingsTheme();
});

// HEADER CHATS — Menú de tres puntitos (dropdown)

let _msgHeaderMenuOpen = false;

function toggleMsgHeaderMenu() {
  const dd = document.getElementById('msgHeaderDropdown');
  if (!dd) return;
  _msgHeaderMenuOpen = !_msgHeaderMenuOpen;
  dd.style.display = _msgHeaderMenuOpen ? 'block' : 'none';
  if (_msgHeaderMenuOpen) {
    setTimeout(() => {
      document.addEventListener('click', _closeMsgHeaderMenuOutside, { once: true });
    }, 10);
  }
}

function closeMsgHeaderMenu() {
  const dd = document.getElementById('msgHeaderDropdown');
  if (dd) dd.style.display = 'none';
  _msgHeaderMenuOpen = false;
}

function _closeMsgHeaderMenuOutside(e) {
  const wrap = document.getElementById('msgHeaderMenuWrap');
  if (wrap && wrap.contains(e.target)) return;
  closeMsgHeaderMenu();
}

/** Marca todos los chats como leídos (limpia badges) */
function msgMarkAllRead() {
  const convs = _getConversations();
  convs.forEach(c => {
    c.unread = 0;
    const msgs = _getMsgs(c.bizId);
    msgs.forEach(m => { m.read = true; });
    _saveMsgs(c.bizId, msgs);
  });
  _saveConversations(convs);
  renderConversations();
  updateMsgBadge();
  showToast('✅ Todos los chats marcados como leídos');
}

/** Ordena los chats por criterio */
function msgSortChats(by) {
  const convs = _getConversations();
  if (by === 'unread') {
    convs.sort((a, b) => (b.unread || 0) - (a.unread || 0));
  } else {
    // recent: orden por timestamp del último mensaje
    convs.sort((a, b) => (b.lastTime || 0) - (a.lastTime || 0));
  }
  _saveConversations(convs);
  renderConversations();
  showToast(by === 'unread' ? '📬 Ordenado por no leídos' : '🕐 Ordenado por recientes');
}

/** Limpia todo el historial de chats (pide confirmación) */
function msgClearAllChats() {
  if (!confirm('¿Limpiar todo el historial de chats? Esta acción no se puede deshacer.')) return;
  const convs = _getConversations();
  convs.forEach(c => {
    localStorage.removeItem('fynderChat_' + c.id);
  });
  _saveConversations([]);
  renderConversations();
  showToast('🗑️ Historial eliminado');
}

// BOTÓN LÁPIZ — Modal "Nuevo chat"

function openNewChatModal() {
  const overlay = document.getElementById('newChatOverlay');
  const modal   = document.getElementById('newChatModal');
  const input   = document.getElementById('newChatSearchInput');
  if (!overlay || !modal) return;
  overlay.style.display = 'block';
  modal.style.display   = 'flex';
  _renderNewChatList('');
  if (input) { input.value = ''; input.focus(); }
}

function closeNewChatModal() {
  document.getElementById('newChatOverlay').style.display = 'none';
  document.getElementById('newChatModal').style.display   = 'none';
}

function filterNewChatList(q) {
  _renderNewChatList(q);
}

function _renderNewChatList(q) {
  const list = document.getElementById('newChatList');
  if (!list) return;
  const term = (q || '').trim().toLowerCase();

  // Negocios con los que ya hay conversación
  const existingIds = new Set(_getConversations().map(c => String(c.bizId)));

  let businesses = BUSINESSES;
  if (term) {
    businesses = businesses.filter(b =>
      b.name.toLowerCase().includes(term) ||
      (b.category || '').toLowerCase().includes(term)
    );
  }

  if (businesses.length === 0) {
    list.innerHTML = `<div class="msg-newchat-empty"><i class="fas fa-search"></i><p>Sin resultados para "${q}"</p></div>`;
    return;
  }

  list.innerHTML = businesses.map(b => {
    const hasChat = existingIds.has(String(b.id));
    const cat     = CATEGORIES.find(c => c.id === b.category);
    const stars   = b.rating ? '⭐ ' + b.rating.toFixed(1) : '';
    return `
      <div class="msg-newchat-item" onclick="closeNewChatModal();openChatById(${b.id})">
        <div class="msg-newchat-avatar" style="background:${cat ? cat.color + '22' : '#eee'}">
          ${b.image
            ? `<img src="${b.image}" alt="${b.name}" style="width:100%;height:100%;object-fit:cover;border-radius:50%">`
            : `<span style="font-weight:700;color:${cat ? cat.color : '#555'};font-size:1rem">${b.name.charAt(0)}</span>`
          }
        </div>
        <div class="msg-newchat-info">
          <span class="msg-newchat-name">${b.name}</span>
          <span class="msg-newchat-meta">${cat ? cat.label : ''} ${stars ? '· ' + stars : ''}</span>
        </div>
        ${hasChat
          ? `<span class="msg-newchat-badge-existing"><i class="fas fa-comment-dots"></i></span>`
          : `<button class="msg-newchat-badge-new msg-newchat-add-btn" onclick="event.stopPropagation();closeNewChatModal();openChatById(${b.id})" title="Iniciar chat"><i class="fas fa-plus"></i></button>`
        }
      </div>`;
  }).join('');
}

// RESPUESTAS INTELIGENTES DEL NEGOCIO

function _pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Detecta el subtipo específico de un negocio basándose en sus tags y descripción.
 * Devuelve una clave como "panaderia", "sushi", "heladeria", etc.
 */
function _getBizSubtype(biz) {
  if (!biz) return 'general';
  const haystack = ((biz.tags || []).join(' ') + ' ' + (biz.description || '') + ' ' + (biz.name || '')).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');

  // Restaurantes - subtipos (orden importa: más específico primero)
  if (/panaderia|panadero/.test(haystack) || /pan fresco|pan artesanal|pan de/.test(haystack)) return 'panaderia';
  if (/baguette|croissant|hojaldre|bolleria/.test(haystack)) return 'panaderia';
  if (/heladeria|helado|sorbete|gelato/.test(haystack)) return 'heladeria';
  if (/sushi|ramen|japones|nikkei|sashimi|noodle|tonkotsu|miso/.test(haystack)) return 'sushi_ramen';
  if (/pizza|horno de lena|napolitano/.test(haystack)) return 'pizzeria';
  if (/hamburguesa|burger/.test(haystack)) return 'hamburgueseria';
  if (/mariscos|ceviche|corvina|camaron|langosta|tiradito/.test(haystack)) return 'mariscos';
  if (/tacos|burrito|mexicano|quesadilla|al pastor/.test(haystack)) return 'mexicano';
  if (/paste|torta|reposteria|cheesecake|macaron|bizcocho/.test(haystack)) return 'pasteleria';
  if (/asado|parrilla|bife|costilla|asador|steak/.test(haystack) && !/pizza/.test(haystack)) return 'parrilla';
  if (/vegano|vegetariano|plant-based|bowl veggie/.test(haystack)) return 'vegano';
  if (/tailandes|thai|pad thai|curry verde|tom yum/.test(haystack)) return 'tailandes';
  if (/crepe|wafle|pancake|brunch|huevo benedicto|mimosa/.test(haystack)) return 'brunch';
  if (/empanada/.test(haystack)) return 'empanadas';
  if (/smoothie|jugo natural|acai|superalimento/.test(haystack)) return 'jugos';
  if (/coffee|barista|espresso|cold brew|metodo alternativo|v60|aeropress|chemex/.test(haystack)) return 'cafeteria';
  if (/cafe literario|cafe boutique|cafe de origen/.test(haystack)) return 'cafeteria';
  if (/asiatico|wok|dim sum|pho|bao/.test(haystack)) return 'asiatico';
  if (/panameno|sancocho|patacon|tembleque|bienmesabe|crioll/.test(haystack)) return 'panameno';
  if (/dulceria|alfajor|cocada|polvoron/.test(haystack)) return 'dulceria';

  // Belleza - subtipos
  if (/manicure|pedicure|nail|unas/.test(haystack)) return 'nail';
  if (/masaje|spa|facial|aromaterapia|bienestar|relajante/.test(haystack)) return 'spa';
  if (/tatuaje|tattoo|piercing/.test(haystack)) return 'tattoo';
  if (/barberia|barber|fade|afeitado/.test(haystack)) return 'barberia';

  // Salud - subtipos
  if (/dental|odontolog|ortodoncia|blanqueamiento|implante/.test(haystack)) return 'dental';
  if (/gym|gimnasio|fitness|crossfit|spinning|zumba/.test(haystack)) return 'gym';
  if (/optica|lentes|gafas|vision/.test(haystack)) return 'optica';

  // Tecnología - subtipos
  if (/red|redes|camara de seguridad|cctv|servidor/.test(haystack)) return 'redes';

  // Transporte - subtipos
  if (/mecanica|taller|frenos|aceite|suspension|diagnostico/.test(haystack)) return 'mecanica';
  if (/ejecutivo|aeropuerto|premium|chofer/.test(haystack)) return 'transporte_ejecutivo';

  // Hogar - subtipos
  if (/libreria|libro|literatura|comic|lectura/.test(haystack)) return 'libreria';
  if (/ferreteria|herramienta|construccion|plomeria/.test(haystack)) return 'ferreteria';

  // Turismo - subtipos
  if (/fotografia|retrato|sesion|estudio foto/.test(haystack)) return 'fotografia';
  if (/tour|guia|excursion|canal|casco viejo/.test(haystack)) return 'tours';

  return 'general';
}

/**
 * Detecta la intención del usuario usando múltiples señales:
 * palabras clave, frases completas, contexto negativo ("no me quedó"),
 * verbos de acción ("cambiar", "devolver") y variantes coloquiales.
 */
function _detectIntent(t) {
  // t ya viene en minúsculas sin acentos normalizados
  const intents = [];

  // ── DEVOLUCIÓN / CAMBIO / NO QUEDÓ ──
  if (/(no me qued|no qued|no sirvi|no funcion|no jal|no encaj|no entr|cambiar|cambi|devolver|devolución|devolucion|reembolso|reembolsar|quiero cambiar|me la cambia|me lo cambia|talla mal|talla equivocad|quedó grande|quedó pequeño|quedo grande|quedo pequeño|no era lo que|vino mal|llegó mal|llegó roto|llegó dañado|llegó defectuoso|en mal estado|producto malo|no es lo que ped|no coincide|no es correcto|artículo incorrecto)/.test(t)) {
    intents.push('cambio_devolucion');
  }

  // ── QUEJA / PROBLEMA / MAL SERVICIO ──
  if (/(queja|reclamo|molest|inconveniente|pésimo|pesimo|mal servicio|mala atención|mala atencion|me trataron|irresponsable|tardaron mucho|nunca llegó|nunca llego|me estafaron|me robaron|me cobraron de más|cobro de mas|no cumplieron|incumplieron|fallaron|decepcionante|deplorable|negligencia|dañaron|rompieron|perdieron mi|extraviaron)/.test(t)) {
    intents.push('queja');
  }

  // ── PRODUCTO DAÑADO / DEFECTO ──
  if (/(dañad|roto|defecto|defectuos|no funciona|se dañó|se daño|se rompió|se rompio|no enciende|no prende|no carga|no corre|falla|fallo|error|no abre|no cierra|suena raro|hace ruido|se calienta demasiado|se sobre calienta|pantalla rota|pantalla rayada|pantalla quebrada)/.test(t)) {
    intents.push('producto_danado');
  }

  // ── PRECIO / COTIZACIÓN ──
  if (/(precio|costo|cuánto|cuanto|cuánto cuesta|cuanto cuesta|cuánto cobran|cuanto cobran|tarifa|valor|cuánto sale|cuanto sale|presupuesto|cotización|cotizacion|cotizar|cuánto me costaría|cuanto me costaria|qué precio|que precio|tienen precio|tienen tarifa|economico|barato|caro)/.test(t)) {
    intents.push('precio');
  }

  // ── HORARIO ──
  if (/(horario|qué hora|que hora|a qué hora|a que hora|cuándo abren|cuando abren|cuándo cierran|cuando cierran|están abiertos|estan abiertos|abren hoy|cierran hoy|hora de apertura|hora de cierre|cuándo atienden|cuando atienden|abierto ahora|hasta qué hora|hasta que hora|desde qué hora|desde que hora)/.test(t)) {
    intents.push('horario');
  }

  // ── DIRECCIÓN / UBICACIÓN ──
  if (/(dónde están|donde estan|dónde quedan|donde quedan|dirección|direccion|ubicación|ubicacion|cómo llego|como llego|cómo llegar|como llegar|están en|estan en|dónde se encuentran|donde se encuentran|local|sucursal|tienen tienda|tienen local|qué zona|que zona|en qué barrio|en que barrio|mapa|google maps)/.test(t)) {
    intents.push('ubicacion');
  }

  // ── CITA / RESERVA ──
  if (/(cita|reserva|reservar|agendar|agenda|turno|appointment|quiero una hora|pedir hora|disponibilidad|cupo|cuándo puedo ir|cuando puedo ir|puedo ir hoy|puedo ir mañana|puedo ir manana|me pueden atender|me pueden recibir|me dan un espacio)/.test(t)) {
    intents.push('cita');
  }

  // ── MENÚ / PRODUCTOS / QUÉ OFRECEN ──
  if (/(menú|menu|carta|qué platos|que platos|qué tienen|que tienen|qué ofrecen|que ofrecen|qué venden|que venden|qué servicios|que servicios|catálogo|catalogo|lista de precios|productos disponibles|tienen.*\?|venden.*\?|ofrecen.*\?)/.test(t)) {
    intents.push('menu_productos');
  }

  // ── DELIVERY / ENVÍO ──
  if (/(delivery|domicilio|envío|envio|mandan a|despachan|llevan a|traen a|a mi casa|a mi dirección|a mi direccion|entregan|hacen entregas|llega a|reparto|mensajería|mensajeria|shipping)/.test(t)) {
    intents.push('delivery');
  }

  // ── PAGO ──
  if (/(pago|pagar|cómo pago|como pago|métodos de pago|metodos de pago|efectivo|tarjeta|transferencia|yappy|nequi|sinpe|visa|mastercard|crédito|credito|débito|debito|depósito|deposito|digital|billetera|billetera digital|aceptan tarjeta|aceptan efectivo)/.test(t)) {
    intents.push('pago');
  }

  // ── DESCUENTO / PROMO ──
  if (/(descuento|promoción|promo|oferta|rebaja|especial|cupón|cupon|2x1|gratis|precio especial|precio de oferta|tienen algo barato|algo económico|algo economico|sale|hay algún descuento|hay algun descuento|están de oferta|estan de oferta)/.test(t)) {
    intents.push('descuento');
  }

  // ── TIEMPO / URGENCIA ──
  if (/(cuánto tarda|cuanto tarda|cuánto demora|cuanto demora|tiempo de espera|qué tan rápido|que tan rapido|urgente|para hoy|para ya|lo más pronto|lo mas pronto|inmediato|express|rápido|rapido|mismo día|mismo dia|en el día|en el dia|antes de las|para mañana|para manana)/.test(t)) {
    intents.push('tiempo');
  }

  // ── INFORMACIÓN CONTACTO ──
  if (/(teléfono|telefono|número|numero|whatsapp|llamar|llamada|contacto|correo|email|instagram|facebook|redes|página web|pagina web|página|pagina|web|redes sociales)/.test(t)) {
    intents.push('contacto');
  }

  // ── AGRADECIMIENTO ──
  if (/(gracias|thank|muchas gracias|muy amable|perfecto|excelente|genial|increíble|increible|muy bien|buenísimo|buenisimo|satisfecho|satisfecha|todo bien|quedé feliz|quede feliz|quedé contento|quede contento|estuvo bien|me gustó|me gusto|les quedo bien|les quedó bien)/.test(t)) {
    intents.push('gracias');
  }

  // ── SALUDO ──
  if (/(^hola|^buenas|^buenos|^hey|^hi |^buen dia|^buen día|saludos|^ola |buenas tardes|buenas noches|buenos dias|buenos días)/.test(t)) {
    intents.push('saludo');
  }

  // ── DISPONIBILIDAD / HAY STOCK ──
  if (/(disponible|disponibilidad|hay|tienen en stock|queda|quedan|en existencia|lo tienen|lo tienen disponible|está disponible|esta disponible|puedo conseguir|puedo comprar)/.test(t) && !intents.includes('menu_productos')) {
    intents.push('disponibilidad');
  }

  // ── CONFIRMACIONES / RESPUESTAS CORTAS ──
  if (/^(si|sí|no|ok|dale|listo|perfecto|claro|va|venga|bueno|está bien|esta bien|entendido|de acuerdo|acepto|confirmo|confirmado|correcto|exacto|así es|eso es)$/.test(t.trim())) {
    intents.push('confirmacion');
  }

  // ── PREFERENCIAS DE COMIDA / INGREDIENTES (para restaurantes) ──
  if (/(sin gluten|sin lactosa|sin azucar|sin carne|sin mariscos|sin nueces|vegetariano|vegano|celiaco|intolerante|alergico|alergia|pan|panes|carne|pollo|res|cerdo|mariscos|verduras|ensalada|picante|no picante|suave|sin sal|saludable|light|keto|paleo)/.test(t)) {
    if (!intents.includes('menu_productos') && !intents.includes('precio')) {
      intents.push('preferencia_comida');
    }
  }

  return intents;
}

function _getSmartReply(userText, cat, bizName, biz, lastBizText = '') {
  // Normalizar: minúsculas, quitar acentos para la detección
  const t = userText.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
  const tOrig = userText.toLowerCase();
  // Contexto del último mensaje del bot (para responder "sí/no" coherentemente)
  const prevBot = (lastBizText || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');

  const intents = [...new Set([..._detectIntent(t), ..._detectIntent(tOrig)])];

  const hours  = biz && biz.hours   ? biz.hours   : 'Lun–Sáb 8:00am – 6:00pm';
  const addr   = biz && biz.address ? biz.address : 'nuestra dirección en el perfil';
  const phone  = biz && biz.phone   ? biz.phone   : 'disponible en nuestro perfil';
  const ig     = biz && biz.instagram ? biz.instagram : '@' + bizName.toLowerCase().replace(/\s/g,'_');
  const sub    = _getBizSubtype(biz);

  // ── Prioridad: intenciones específicas primero ──

  if (intents.includes('cambio_devolucion')) return _pick([
    `¡Por supuesto! En ${bizName} aceptamos cambios 😊. ¿Tienes el comprobante de compra?`,
    `Claro, para el cambio necesitamos el artículo y el recibo. ¿Lo tienes a mano?`,
    `Sin problema. ¿Qué talla o modelo diferente necesitas? Lo gestionamos ya 🔄`,
    `Pasa por ${addr} con el artículo y el recibo. ¿Hay algo específico que prefieras?`,
    `¡Tranquilo/a! Lo resolvemos. ¿Fue un problema de talla, color o vino defectuoso?`,
    `Los cambios los procesamos en 24h. ¿Tienes el ticket de compra? 🧾`,
    `Sin costo adicional si es por defecto de fábrica. ¿Qué pasó exactamente? 🔄`,
    `¿Prefieres cambio por otro producto o reembolso? Ambas opciones disponibles 💳`,
  ]);

  if (intents.includes('producto_danado')) return _pick([
    `¡Lamentamos eso! 😟 Si vino defectuoso tiene garantía. ¿Qué falla exactamente?`,
    `Eso no debería pasar. Cubrimos productos defectuosos sin costo. ¿Cuándo lo compraste?`,
    `Entendemos. ¿El daño fue al recibirlo o después de usarlo? Eso nos ayuda con la garantía 🔧`,
    `Por favor tráenos el producto y lo revisamos o reemplazamos. ¿Cuándo puedes venir?`,
    `Toma foto del daño y compártela por aquí 📸. Así aceleramos el proceso.`,
    `¿Tienes el número de orden o factura? Lo revisamos ahora mismo 🧾`,
    `Garantía cubre defectos de fábrica hasta 6 meses. ¿En qué estado llegó? 🔍`,
    `Lo sentimos mucho. Tu satisfacción es lo más importante 🙏. ¿Lo resolvemos hoy?`,
  ]);

  if (intents.includes('queja')) return _pick([
    `Lamentamos mucho lo ocurrido 😔. ¿Nos cuentas en detalle qué pasó para resolverlo?`,
    `Gracias por decírnoslo, es la única forma de mejorar. ¿Cómo podemos compensarte?`,
    `Lo tomamos muy en serio 🙏. ¿Tienes fecha o número de pedido para revisarlo?`,
    `Disculpa el inconveniente. Vamos a revisar tu caso de inmediato. ¿Más detalles?`,
    `Tu opinión es muy importante para nosotros. ¿Qué podríamos hacer diferente? 💬`,
    `Pedimos disculpas sinceras. ¿Podemos llamarte para resolver esto personalmente? 📞`,
    `Queremos convertir esta experiencia negativa en positiva. ¿Nos das la oportunidad? 🌟`,
    `Escalamos tu caso de inmediato. ¿Cuál es el mejor horario para contactarte? ⏰`,
  ]);

  if (intents.includes('precio')) {
    const subP = {
      pasteleria:  [`Tortas personalizadas desde $35 🎂. Mini tortas $15. ¿Para cuántas personas?`, `Pasteles artesanales desde $25. ¿Es para alguna ocasión especial? 🎉`, `Cupcakes $2 c/u, tortas desde $35. ¿Qué decoración tienes en mente? 🍰`],
      panaderia:   [`Pan del día $1–$3, baguettes $2.50, postres $3–$8 🥐. ¿Qué buscas?`, `Desayunos completos desde $5. Croissants y bollería freshita cada mañana ☕`, `Pedidos especiales de pan artesanal disponibles. ¿Cuántas piezas necesitas? 🍞`],
      heladeria:   [`Bola sencilla $1.50, doble $2.50, copa especial $4 🍦. ¿Quieres conocer los sabores disponibles?`, `Paletas y helados desde $1.50. Combinaciones ilimitadas 🌈. ¿Cuál te llama la atención?`, `Todo entre $1.50 y $6. Sin colorantes artificiales 😋. ¿Qué sabor tropicaL prefieres?`],
      sushi_ramen: [`Rolls desde $8, combos desde $15 🍱. ¿Prefieres sushi, ramen o fusión?`, `Ramen desde $10, sushi sets desde $18 con 12 piezas 🍜. ¿Cuántas personas van a comer?`, `Menú ejecutivo de almuerzo $12 (roll + sopa + bebida) 🥢. ¿Es para hoy?`],
      pizzeria:    [`Pizzas personales $8, medianas $14, grandes $20 🍕. ¿Cuántas personas son?`, `Con horno de leña el sabor no tiene precio 🔥. Grandes $20 con ingredientes premium. ¿Cuál prefieres?`, `Promo: 2 pizzas grandes $35 esta semana 🎉. ¿Qué ingredientes te gustan?`],
      hamburgueseria:[`Hamburguesas desde $8 hasta $16 según el tamaño 🍔. ¿Prefieres clásica o gourmet?`, `Combo (burger+papas+bebida) $12. ¿Qué adicionamos? 😄`, `Burgers artesanales $10–$16 con pan casero. ¿Con queso extra o doble carne? 🧀`],
      mariscos:    [`Ceviche $10, corvina al ajillo $18, mixto de mariscos $22 🦐. ¿Para cuántos?`, `Platos fuertes de mariscos $15–$35. Frescos del Pacífico 🌊. ¿Qué prefieres?`, `Combo ceviche + corvina para 2 personas $30. ¿Lo apartamos? 🐟`],
      mexicano:    [`Tacos $2.50 c/u, burritos $7, quesadillas $8 🌮. ¿Cuántos quieres?`, `Combo 3 tacos + bebida $8.50. Rellenos a escoger 🔥. ¿Cuál prefieres?`, `Todo entre $2.50 y $12. Salsas caseras incluidas 🌶️. ¿Qué tan picante te gusta?`],
      parrilla:    [`Bife de chorizo $22, asado de tira $18, entraña $20 🥩. ¿Para cuántas personas?`, `Tabla parrillera para 2 personas $38. Para 4 personas $65. ¿Alguna celebración? 🍷`, `Cortes premium con 30 días de maduración. ¿Lo prefieres término medio o bien cocido? 🔥`],
      vegano:      [`Bowls desde $10, wraps $9, postres sin azúcar desde $4 🥗. ¿Tienes alguna alergia?`, `Menú completo (entrada+plato+bebida) $15 sin gluten ni lácteos 🌱. ¿Te interesa?`, `Hamburguesas de plantas $10. Sabor sin culpa 😄. ¿Primera vez aquí?`],
      brunch:      [`Pancakes $8, huevos benedictinos $10, waffles $9 🥞. ¿Con mimosa +$4?`, `Brunch completo $18 (entrada+plato+bebida). Solo sábados y domingos 🌅. ¿Ya tienes reserva?`, `Todo entre $8 y $18. El mejor brunch de la ciudad 🎉. ¿Para cuántas personas?`],
      empanadas:   [`Empanadas desde $1.50 c/u. Docena $15. Más de 20 rellenos 🫓. ¿Qué relleno prefieres?`, `Individuales $1.50, combo 6 unidades $8 con bebida 😋. ¿Para llevar o en el local?`, `Pedidos de eventos: docenas desde $14. ¿Para cuántas personas necesitas? 🎉`],
      jugos:       [`Jugos naturales $3, smoothies $5, acai bowl $8 🥤. ¿Qué necesitas hoy?`, `Shots de bienestar $2 c/u. Combos desde $6 🌿. ¿Buscas energía o desintoxicarte?`, `Todo fresco del día, sin azúcar añadida. Desde $3 😊. ¿Tienes alguna fruta favorita?`],
      cafeteria:   [`Espresso $1.50, americano $2, cappuccino $3, cold brew $4 ☕. ¿Cómo te gusta el café?`, `Desayuno completo $7 (café+croissant+jugo). ¿Lo probaste? 🥐`, `Granos de origen único, métodos alternativos. Desde $2.50. ¿Eres fan del V60? ☕`],
      tailandes:   [`Pad Thai $11, curry verde $13, tom yum $9 🍜. ¿Cuántas personas son?`, `Combo almuerzo $14 (plato+arroz+bebida). Solo mediodía 🌺. ¿Es para hoy?`, `Platos principales $10–$18. Auténtico estilo Chiang Mai 🇹🇭. ¿Con qué nivel de picante?`],
      asiatico:    [`Platos desde $9. Wok, dim sum y sopas asiáticas 🥢. ¿Qué cocina prefieres hoy?`, `Menú variado China, Japón, Vietnam. Desde $9 hasta $18 🌏. ¿Para cuántos?`, `Dim sum para 2 $15. Baos $3 c/u. Pho $10 🍲. ¿Qué te antoja?`],
      panameno:    [`Sancocho $8, arroz con pollo $9, ropa vieja $10 🇵🇦. ¿Cuántas personas son?`, `Menú del día $8 (sopa+plato+fresco). Sabor de casa 🏡. ¿Lo apartamos?`, `Comida criolla auténtica desde $7. Nada de congelados 😋. ¿Qué plato se te antoja?`],
      dulceria:    [`Dulces desde $0.50 c/u. Cajas regalo desde $15 🎁. ¿Para qué ocasión?`, `Alfajores $2, cocadas $1, polvorones $1.50. ¿Quieres una caja surtida? 🍬`, `Pedidos al por mayor con descuento. ¿Para evento o regalo? 🎊`],
      dental:      [`Limpieza $60, blanqueamiento $180, ortodoncia desde $800 🦷. ¿Tienes seguro médico?`, `Consulta de revisión $40. Presupuesto sin compromiso. ¿Cuándo quieres venir? 😁`, `Implantes desde $800 por pieza, con garantía de 5 años. ¿Tienes alguna consulta específica? 🩺`],
      spa:         [`Masaje relajante 60 min $55, 90 min $80 💆. ¿Alguna zona de tensión específica?`, `Facial completo $65. Paquete spa día completo $120 🌸. ¿Es para un regalo?`, `Primer masaje 15% OFF. Desde $55. ¿Lo agendamos para esta semana? ✨`],
      gym:         [`Mensualidad $35, trimestral $90, anual $300 💪. ¿Tienes experiencia en el gimnasio?`, `Plan estudiantil $25/mes. Incluye clases de spinning y yoga 🧘. ¿Eres estudiante?`, `Prueba gratis 3 días sin compromiso 🎉. ¿Cuándo puedes venir?`],
      mecanica:    [`Cambio de aceite $25, diagnóstico computarizado $15 🔧. ¿Qué tiene tu vehículo?`, `Frenos completos desde $80. Suspensión desde $60. ¿Cuál es el modelo del carro? 🚗`, `Diagnóstico gratuito esta semana. ¿Lo traes hoy o mañana? ⚙️`],
      transporte_ejecutivo:[`Aeropuerto desde $25, zonas urbanas desde $15 🚗. ¿Para cuándo y a dónde?`, `Tarifa fija al aeropuerto $30, sin sorpresas 🛫. ¿A qué hora es tu vuelo?`, `Servicio 24h. ¿Necesitas traslado o tour privado? Te cotizamos ya 📱`],
      tours:       [`City tour $35/persona, Canal de Panamá $45 🗺️. ¿Para cuántos van?`, `Tour Casco Viejo + Canal $55 con guía bilingüe ✈️. ¿Cuándo llegas a la ciudad?`, `Grupos de 5+ personas 15% OFF. ¿Cuántos van en total? 🌍`],
      fotografia:  [`Sesión de retratos $80/h, eventos $150/h 📸. ¿Qué tipo de sesión necesitas?`, `Paquete familiar $100 (1h + 20 fotos editadas). ¿Para cuándo? 📷`, `Edición profesional incluida en todos los paquetes. ¿Cuál es el evento? ✨`],
      redes:       [`Instalación de cámaras desde $120 por cámara 🔒. ¿Cuántas necesitas?`, `Redes empresariales desde $200 según el tamaño. ¿Es para casa u oficina? 🖥️`, `Diagnóstico de red gratis. Mantenimiento mensual $50. ¿Cuántos equipos tienes? 💻`],
    };
    const catP = {
      restaurantes: [`Platos desde $5 hasta $25 🍽️. ¿Quieres la carta completa?`, `Menú del día $8 (sopa + plato + bebida). ¿Algo en especial?`, `Opciones para todos los presupuestos. ¿Qué prefieres?`],
      belleza:      [`Corte $15 💇, tinte $45, manicure $12, pedicure $18. ¿Qué servicio?`, `¿Corte, color o tratamiento? Te doy el precio exacto 💅`, `Paquete básica dama $20 (corte+lavado). ¿Quieres más info?`],
      salud:        [`Consulta general $40, especialistas desde $60 🩺. ¿Tienes seguro médico?`, `Los exámenes de laboratorio arrancan desde $15. ¿Qué examen necesitas?`],
      tecnologia:   [`Diagnóstico gratis 🔧. Pantalla desde $35, batería $20. ¿Qué equipo tienes?`, `Reparaciones con garantía de 3 meses. ¿Cuál es el problema? 💻`],
      hogar:        [`Visita de diagnóstico sin costo 🏠. Trabajos desde $30. ¿Qué necesitas?`, `Presupuesto gratis y sin compromiso. ¿Cuál es el trabajo? 🔨`],
      turismo:      [`Tours desde $35/persona 🗺️. Grupos 5+ tienen 15% de descuento.`, `Paquetes desde $50 con transporte y guía. ¿Qué destino? ✈️`],
      transporte:   [`Aeropuerto desde $20, zonas urbanas desde $8 🚗. ¿A dónde vas?`],
      ropa:         [`Prendas desde $10 hasta $80 👗. ¿Qué tipo de prenda buscas?`, `Esta semana hasta 30% de descuento. ¿Quieres ver las ofertas? 🏷️`],
      deportes:     [`Equipos desde $15 ⚽. ¿Qué deporte practicas?`, `Zapatillas desde $35, ropa deportiva desde $15. ¿Tienes presupuesto? 💪`],
    };
    return _pick(subP[sub] || catP[cat] || [`Precios varían según el servicio 💰. ¿Qué necesitas exactamente?`, `Con gusto cotizamos. ¿Qué te interesa?`]);
  }

  if (intents.includes('horario')) return _pick([
    `Nuestro horario es ${hours} ⏰. ¿Algún día en especial que te convenga?`,
    `Atendemos ${hours}. Para citas puedes reservar con anticipación 📅`,
    `Disponibles ${hours}. ¿Necesitas agendar algo? 🗓️`,
    `Estamos abiertos ${hours}. ¿Tienes alguna duda sobre el día de hoy? 😊`,
    `Horario: ${hours}. Si vienes entre semana hay menos espera ⚡`,
    `Atendemos ${hours}. Los fines de semana te recomendamos reservar antes 📱`,
    `${hours} es nuestro horario. ¿Quieres que te avisemos si hay cambios? 🔔`,
    `¡Respondemos rápido en ese horario! ${hours} ⏰. ¿Para cuándo piensas venir?`,
  ]);

  if (intents.includes('ubicacion')) return _pick([
    `Estamos en ${addr} 📍. ¿Vienes en carro o transporte público?`,
    `Nos encuentras en ${addr}. Búscanos en Google Maps como "${bizName}" 🗺️`,
    `Dirección: ${addr}. ¿Necesitas que te expliquemos la ruta? 📌`,
    `Estamos ubicados en ${addr} 🏠. ¿Tienes referencia del sector?`,
    `${addr} es nuestra dirección. ¿Hay algún punto de referencia que te ayude a llegar? 🧭`,
    `Te esperamos en ${addr} 📍. Si llegas en Uber dales esa dirección exacta.`,
    `Puedes encontrarnos en ${addr}. En Google Maps busca "${bizName}" 🔍`,
    `Estamos en ${addr}. El estacionamiento más cercano está a media cuadra 🅿️`,
  ]);

  if (intents.includes('cita')) return _pick([
    `¡Agendamos! ¿Qué fecha y hora te viene bien? 📅`,
    `Con gusto. ¿Para cuántas personas y qué día prefieres? 🗓️`,
    `Tenemos disponibilidad esta semana. ¿Mañana o pasado? ⏰`,
    `¿Prefieres mañana, tarde o noche? Apartamos tu espacio ✅`,
    `Para la cita: ¿nombre y servicio que deseas? 😊`,
    `¡Claro! ¿Cuál es tu nombre y para qué día lo necesitas? 📋`,
    `Agenda confirmada en menos de 5 min. ¿Qué día y hora prefieres? ⚡`,
    `Tenemos turnos disponibles. ¿Prefieres que te confirmemos por aquí o por llamada? 📱`,
    `¿Para ti solo o vas acompañado? Así coordinamos mejor el espacio 😊`,
    `Perfecto. ¿Tienes preferencia de horario, mañana o tarde? 🗓️`,
  ]);

  if (intents.includes('delivery')) return _pick([
    `¡Sí hacemos entregas! 🛵 30–45 min aprox. ¿Cuál es tu dirección?`,
    `Delivery dentro de la ciudad 📦. ¿Dónde estás?`,
    `Envío gratis en compras mayores a $20 🎉. ¿Tu ubicación?`,
    `¡Claro que sí! ¿A qué barrio o zona enviamos? 🗺️`,
    `Hacemos delivery todos los días. ¿A qué hora lo necesitas? ⏰`,
    `Tenemos servicio a domicilio 🛵. ¿La dirección exacta para calcular el tiempo?`,
    `Delivery disponible. ¿Pagas efectivo o digital al recibir? 💳`,
    `Repartidores propios para llegar en tiempo y forma 🚴. ¿Tu dirección?`,
    `¡Llevamos hasta tu puerta! ¿A qué hora estarás en casa? 🏠`,
  ]);

  if (intents.includes('pago')) return _pick([
    `Efectivo, tarjeta débito/crédito y transferencias 💳. ¿Cuál prefieres?`,
    `Visa, Mastercard, efectivo y Yappy 📱. ¡El método que quieras!`,
    `Todos los métodos: efectivo, tarjeta y digital ✅. ¿Necesitas factura?`,
    `Aceptamos efectivo, tarjeta y transferencia bancaria 🏦. ¿Cuál te queda mejor?`,
    `Pago digital con Yappy, Nequi o transferencia. ¿Cuál usas? 📲`,
    `¡Sin problema de pago! Efectivo o tarjeta, lo que prefieras 😊`,
    `Todas las tarjetas aceptadas. ¿Necesitas recibo o factura? 🧾`,
    `Pagos seguros en todos los métodos. ¿Tienes alguna preferencia? 🔒`,
    `También aceptamos QR y pago móvil. Muy cómodo y rápido ⚡`,
  ]);

  if (intents.includes('descuento')) return _pick([
    `¡Sí tenemos promos! 🎉 Esta semana 20% de descuento. ¿Te interesa?`,
    `Clientes nuevos: 15% off en su primera compra 🌟. ¿Es tu primera vez?`,
    `2 servicios por el precio de 1 los martes 🔥. ¿Te apuntas?`,
    `Tenemos programa de lealtad: acumula puntos y canjea descuentos 🎁`,
    `Síguenos en Instagram ${ig} para ver las promos exclusivas 📸`,
    `Descuento del 10% si traes un amigo nuevo. ¡Recomiéndanos! 👥`,
    `Oferta de temporada activa. ¿Quieres que te cuente los detalles? 🏷️`,
    `Promociones los miércoles y viernes. ¿Cuál es mejor para ti? 📅`,
    `Primera visita con 15% off. ¿Ya viniste antes? 😊`,
    `Combo especial del mes disponible. ¿Te lo cuento? 🌟`,
  ]);

  if (intents.includes('tiempo')) {
    const subT = {
      pasteleria:   [`Tortas personalizadas necesitan 48–72h de anticipación 🎂. ¿Para cuándo la necesitas?`, `Pedidos con menos de 48h dependen de disponibilidad. ¿Cuándo es la fecha? 📅`],
      panaderia:    [`El pan está listo cada mañana desde las 7am 🥐. ¿Necesitas algo para hoy?`, `Pedidos especiales con 24h de anticipación. ¿Para cuándo? 🍞`],
      heladeria:    [`Estamos listos apenas abres la puerta 🍦. Sin espera. ¿Vienes hoy?`, `Los pedidos para eventos los preparamos en 24h. ¿Es para una fiesta? 🎉`],
      sushi_ramen:  [`Ramen 10–15 min, sushi rolls 15–20 min 🍜. ¿Estás en el local o pides delivery?`, `Delivery 35–50 min según zona. ¿Cuál es tu dirección? 🛵`],
      pizzeria:     [`Pizza al horno de leña: 20–25 min 🍕. Vale la espera. ¿La pides aquí o delivery?`, `Delivery 40–50 min, en el local 20–25 min. ¿Cómo prefieres? 🚴`],
      hamburgueseria:[`Burger lista en 12–15 min ⏱️. Sin prisa, con calidad. ¿Para comer aquí o llevas?`, `Para pedidos grandes (+5 burgers) avisa con 20 min. ¿Cuántas necesitas? 🍔`],
      mariscos:     [`Ceviche: inmediato, cocinados 20–30 min 🐟. ¿Qué pediste?`, `Delivery de mariscos 40–50 min para que llegue fresco. ¿Tu dirección? 🛵`],
      vegano:       [`Bowls listos en 10–15 min 🥗. Todo fresco. ¿Estás en el local?`, `Delivery 30–40 min. Todo preparado al momento, sin precocidos 🌱`],
      cafeteria:    [`Espresso en 2 min, cold brew listo en barra ☕. ¿Vienes a quedarte o para llevar?`, `Desayunos en 5–8 min. ¿A qué hora llegas? ⏰`],
      dental:       [`Consulta regular: puntual con cita. Sin cita según disponibilidad 🦷. ¿Agendamos?`, `Emergencias dentales atendemos el mismo día 🚨. ¿Es urgente?`],
      spa:          [`Masaje: 60 o 90 min. Facial: 60–75 min 💆. ¿Cuánto tiempo tienes?`, `Agenda con 24h de anticipación para garantizarte el horario 🌸. ¿Qué día prefieres?`],
      gym:          [`Puedes venir cualquier día en horario ${hours} 💪. ¿Cuándo quieres empezar?`, `Clases de spinning 45 min, yoga 60 min, zumba 50 min 🧘. ¿Cuál te interesa?`],
      mecanica:     [`Cambio de aceite: 30 min ⚡. Frenos: 2–3h. Diagnóstico: 30–45 min. ¿Qué tiene tu carro?`, `Si es urgente puede venir sin cita y atendemos por orden de llegada 🔧. ¿Lo traes hoy?`],
    };
    const catT = {
      tecnologia:   [`Reparaciones básicas en el día ⚡, complejas 24–48h. ¿Qué tiene tu equipo?`, `Pantalla: 2h. Batería: 1h. Software: mismo día 🔧. ¿Cuál es tu caso?`],
      restaurantes: [`En mesa: 15–20 min ⏱️. Delivery: 30–45 min. ¿Para cuándo lo necesitas?`, `Si reservas garantizamos tu mesa al llegar 🍽️`],
      belleza:      [`Corte 30 min, tinte 2h, manicure 1h 💅. ¿Qué servicio te interesa?`, `¿Agendamos cita para garantizarte la hora? 📅`],
      hogar:        [`Trabajos pequeños: mismo día ⚡. Remodelaciones: 2–7 días. ¿Qué necesitas?`, `Técnicos disponibles hoy si es urgente 🔨. ¿Cuál es el trabajo?`],
      transporte:   [`Confirmamos el vehículo en 15 min 🚗. Llegamos en 20–30 min. ¿Para cuándo?`, `Traslado al aeropuerto: te recogemos con 30 min de anticipación 🛫`],
      turismo:      [`Tours de medio día: 4–5h. Día completo: 8–10h 🗺️. ¿Cuánto tiempo tienes?`, `Los tours salen por la mañana. ¿Cuántos días estarás? ✈️`],
      salud:        [`Consultas con cita: espera máx 15 min 🩺. Sin cita según disponibilidad.`, `Exámenes de laboratorio listos en 24–48h. Urgentes en el día 🏥`],
    };
    return _pick(subT[sub] || catT[cat] || [`Depende del servicio. ¿Nos das más detalles? ⏱️`, `Trabajamos rápido. ¿Qué tan urgente es? ⚡`]);
  }

  if (intents.includes('contacto')) return _pick([
    `Llámanos al ${phone} 📞. También atendemos aquí en Fynder.`,
    `Número: ${phone}. ¿Prefieres que te contactemos? 📲`,
    `¡Escríbenos aquí! O si prefieres llamar: ${phone} ☎️`,
    `Instagram: ${ig} 📸. Teléfono: ${phone}.`,
    `Puedes contactarnos al ${phone} o por aquí mismo 💬. ¿Qué prefieres?`,
    `Estamos disponibles al ${phone} y por Fynder Chat 🤝`,
    `Tel: ${phone}. WhatsApp también disponible 📱. ¿Cómo te queda mejor?`,
    `Síguenos en ${ig} para novedades 📸. Para urgencias: ${phone}`,
    `Respondemos este chat en menos de 5 minutos ⚡. ¿O prefieres que te llamemos?`,
  ]);

  if (intents.includes('gracias')) return _pick([
    `¡A ti por preferirnos! 🙏 ¡Hasta pronto!`,
    `¡Gracias a ti! 😊 Que tengas un excelente día.`,
    `¡De nada! Tu satisfacción es nuestra prioridad ⭐`,
    `Es un honor servirte. ¡Siempre estamos aquí! 💚`,
    `¡Fue un placer atenderte! Vuelve pronto 🌟`,
    `¡Gracias por confiar en ${bizName}! 🙌 ¡Hasta la próxima!`,
    `¡Con mucho gusto! Si necesitas algo más, aquí estaremos 😊`,
    `¡Feliz de haberte ayudado! ¿Hay algo más antes de irte? 💬`,
    `Nos alegra que todo haya quedado claro. ¡Buen día! ☀️`,
    `¡Igualmente! Tu visita nos alegra 😄 ¿Nos dejas una reseña? ⭐`,
  ]);

  if (intents.includes('disponibilidad')) return _pick([
    `¡Sí tenemos disponibilidad! ✅ ¿Para qué fecha?`,
    `Déjame verificar. ¿Qué es lo que buscas exactamente? 🔍`,
    `Sí contamos con eso. ¿Lo apartamos ahora? 📦`,
    `¡Disponible! ¿Lo reservo a tu nombre? 📋`,
    `Tenemos stock/disponibilidad para esta semana. ¿Cuándo lo necesitas? 📅`,
    `¡Sí hay! ¿Cuántas unidades o para cuántas personas? 😊`,
    `Disponibilidad confirmada ✅. ¿Quieres que lo separemos?`,
    `¡Perfecto momento para pedirlo! Aún tenemos. ¿Continúo con la reserva? 🎉`,
  ]);

  if (intents.includes('menu_productos')) {
    const subM = {
      pasteleria:   [`Tortas personalizadas, cupcakes, pasteles de temporada y postres de autor 🎂. ¿Para qué ocasión?`, `Especialidades: tortas de boda, cumpleaños, bautizos y eventos corporativos. ¿Tienes algún diseño en mente? 🎨`, `También hacemos mesas de dulces y postres para eventos. ¿Cuándo es la celebración? 🎉`],
      panaderia:    [`Pan artesanal, baguettes, croissants, galletas, brownies y postres caseros 🍞. ¿Qué te apetece?`, `Pan fresco cada mañana desde las 7am. También pedidos especiales. ¿Qué necesitas? 🥐`, `Recetas tradicionales de abuela: pan de yema, rosquillas, almojábanas 😋. ¿Tienes algún favorito?`],
      heladeria:    [`Más de 30 sabores de frutas tropicales: maracuyá, guanábana, tamarindo, carambola 🍦. ¿Cuál quieres probar?`, `Helados artesanales, paletas, sorbetes y helados de crema 🌈. ¿Prefieres frutal o cremoso?`, `Sin colorantes artificiales 🌿. Sabores de temporada también. ¿Cuál es tu fruta favorita?`],
      sushi_ramen:  [`Rolls creativos, sashimi premium, ramen tonkotsu/shoyu/miso y platos de fusión nikkei 🍱. ¿Qué prefieres?`, `Combinados de sushi desde 12 piezas, ramen con noodles frescos y chashu de cerdo 🍜. ¿Para cuántos son?`, `También tenemos tapas japonesas, gyozas y edamame de entrada 🥢. ¿Es tu primera vez?`],
      pizzeria:     [`Pizzas al horno de leña: margherita, pepperoni, cuatro quesos, hawaiana y especiales del día 🍕. ¿Cuál te gusta?`, `Masa madre fermentada 48h con tomates San Marzano importados. ¿La prefieres clásica o con ingredientes premium? 🇮🇹`, `También tenemos antipastos, ensaladas y postres italianos. ¿Con qué empezamos? 🫒`],
      hamburgueseria:[`Burgers clásica, con queso, doble carne, bacon, BBQ y opciones del chef 🍔. ¿Cuál te llama la atención?`, `Carne 100% nacional, panes artesanales, quesos importados. También papas fritas y batidos 🥤. ¿Qué combinas?`, `Menú completo con salsas secretas de la casa 😍. ¿Tienes alguna restricción alimentaria?`],
      mariscos:     [`Ceviche clásico y mixto, corvina al ajillo, camarones en salsa, langosta y pescados a la parrilla 🦐. ¿Qué prefieres?`, `Frescos del Pacífico cada día. También tiraditos y leche de tigre. ¿Quieres algo del mar? 🌊`, `Platos fuertes y entradas de mariscos. Vista al mar incluida 🐟. ¿Para cuántos son?`],
      mexicano:     [`Tacos de carne asada, al pastor, pollo y veggie. Burritos, quesadillas y nachos 🌮. ¿Qué prefieres?`, `Salsas caseras: verde, roja, habanero (niveles de picante 1 al 5) 🌶️. ¿Con qué lo acompañamos?`, `También tenemos guacamole fresco, elotes y aguas frescas de Jamaica y tamarindo 🫙. ¿Primera visita?`],
      parrilla:     [`Asado de tira, bife de chorizo, entraña, costillas y mollejas al carbón 🥩. ¿Qué corte prefieres?`, `Empanadas de entrada, ensaladas y vinos argentinos seleccionados. ¿Lo piensas para hoy? 🍷`, `También tenemos opciones para niños y vegetarianos. ¿Alguna restricción en el grupo? 🌿`],
      vegano:       [`Bowls, wraps, hamburguesas de plantas, smoothies y postres sin azúcar refinada 🥗. ¿Qué buscas?`, `Menú 100% vegano y vegetariano, sin gluten en varias opciones 🌱. ¿Tienes alguna alergia?`, `También tenemos opciones raw y sin soya. ¿Es tu primera vez comiendo vegano? 😊`],
      tailandes:    [`Pad Thai, curry verde/rojo, tom yum, mango sticky rice y satay 🍜. ¿Has probado comida tailandesa antes?`, `Recetas auténticas de Chiang Mai. Ingredientes importados directamente 🇹🇭. ¿Con qué nivel de picante?`, `También tenemos dim sum thai, sopas y postres tropicales 🥥. ¿Cuántos son en la mesa?`],
      brunch:       [`Pancakes, waffles, huevos benedictinos, avocado toast, smoothie bowls y mimosas 🥞. ¿Qué antoja?`, `Menú de brunch solo sábados y domingos 🌅. ¿Ya tienes reserva para este fin de semana?`, `Opciones dulces y saladas, con y sin gluten 😊. ¿Prefieres algo ligero o abundante?`],
      empanadas:    [`Más de 20 rellenos: pollo, res, champiñones, queso, camarones, jalapeño y dulces 🫓. ¿Cuál prefieres?`, `Colombianas y panameñas, fritas y al horno. También salsas caseras 😋. ¿Llevas o comes aquí?`, `Para eventos hacemos pedidos de docenas personalizados. ¿Tienes alguna celebración? 🎉`],
      jugos:        [`Jugos naturales, smoothies tropicales, acai bowls, shots de jengibre y cúrcuma 🥤. ¿Qué necesita tu cuerpo hoy?`, `Todo sin azúcar añadida, con frutas frescas y superalimentos 🌿. ¿Buscas energía o detox?`, `También tenemos leches vegetales y bases de smoothie. ¿Tienes alguna intolerancia? 😊`],
      cafeteria:    [`V60, aeropress, chemex, cold brew y espresso de origen único ☕. ¿Cómo prefieres tu café?`, `Granos de origen sostenible, tés artesanales y repostería fina 🥐. ¿Con algo de comer?`, `Baristas certificados. Cada taza es especial. ¿Ya conoces el cold brew? ❄️`],
      asiatico:     [`China (dim sum, chow mein), Japón (sushi, ramen), Tailandia (curry), Vietnam (pho) 🥢. ¿Qué cocina hoy?`, `Wok al fuego vivo, baos rellenos, dumplings y sopas asiáticas 🌏. ¿Tienes favorito?`, `Menú fusión que cambia según la temporada. ¿Tienes alergias a mariscos o soya? 🍜`],
      panameno:     [`Sancocho de gallina, arroz con pollo, ropa vieja, patacones y tembleque 🇵🇦. ¿Qué plato te lleva a casa?`, `Comida criolla auténtica, recetas de generación en generación 🏡. ¿Cuándo fue la última vez que comiste bienmesabe?`, `También almuerzo ejecutivo y para llevar. ¿Para cuántos es? 🍽️`],
      dulceria:     [`Alfajores, cocadas, polvorones, dulce de leche, tamales dulces y conservas 🍬. ¿Para regalo o personal?`, `Cajas surtidas para eventos y celebraciones. Empaque artesanal incluido 🎁. ¿Qué ocasión?`, `Sabores tradicionales panameños y latinoamericanos. ¿Tienes algún favorito de la infancia? 😄`],
      dental:       [`Ortodoncia, blanqueamiento, implantes, limpiezas, resinas y odontología estética 🦷. ¿Qué necesitas?`, `También extracciones, endodoncias y prótesis dentales. ¿Es urgente o programado? 🩺`, `Tecnología digital para diagnósticos precisos. ¿Cuándo fue tu última visita al dentista? 😁`],
      spa:          [`Masajes relajantes, descontracturantes, de piedras calientes, faciales, tratamientos corporales y aromaterapia 💆. ¿Qué buscas?`, `Paquetes individuales, de pareja y grupos. ¿Es para regalo o para ti? 🌸`, `También hacemos exfoliaciones, envolturas y tratamientos anti-estrés 🕯️. ¿Cuánto tiempo tienes?`],
      gym:          [`Pesas, cardio, spinning, yoga, zumba, crossfit y planes nutricionales 💪. ¿Qué objetivo tienes?`, `Entrenadores certificados para rutinas personalizadas. ¿Quieres bajar de peso, ganar músculo o mejorar tu condición? 🏋️`, `Área de funcional, clases grupales y sesiones individuales 🧘. ¿Ya tienes experiencia?`],
      mecanica:     [`Diagnóstico computarizado, frenos, suspensión, cambio de aceite, alineación y mantenimiento general 🔧. ¿Qué tiene tu vehículo?`, `Servicio para todos los modelos y marcas. ¿Es gasolina o diesel? 🚗`, `También hacemos revisión previa a viajes largos. ¿Cuándo saldrás? ✅`],
    };
    const catM = {
      restaurantes: [`Entradas, sopas, platos fuertes, postres y bebidas 🍽️. ¿Quieres las especialidades del día?`, `Menú del día $10 (sopa+plato+bebida) 🥗. ¿Qué prefieres?`],
      belleza:      [`Cortes, tintes, manicure, pedicure, maquillaje y tratamientos capilares 💅. ¿Qué te interesa?`],
      tecnologia:   [`Reparamos pantallas, baterías, cámaras, puertos y software 🔧. ¿Qué equipo?`],
      salud:        [`Medicina general, pediatría, nutrición, fisioterapia y más 🏥. ¿Qué especialidad?`],
      hogar:        [`Plomería, electricidad, pintura, carpintería y remodelaciones 🏠. ¿Qué necesitas?`],
      turismo:      [`City tours, aventura, ecoturismo y paquetes de varios días 🗺️. ¿Qué experiencia buscas?`],
      transporte:   [`Aeropuerto, city tour, ejecutivo y traslados especiales 🚗. ¿Qué necesitas?`],
      ropa:         [`Casual, formal, sport y ocasiones especiales 👗. ¿Qué estilo buscas?`],
      deportes:     [`Ropa, calzado y equipamiento para todo deporte ⚽. ¿Qué deporte practicas?`],
    };
    return _pick(subM[sub] || catM[cat] || [`En ${bizName} tenemos amplia variedad. ¿Qué buscas? 😊`, `¡Cuéntanos qué necesitas y te orientamos! 🌟`]);
  }

  if (intents.includes('confirmacion')) {
    // ── Respuesta contextual basada en lo que preguntó el bot antes ──
    if (prevBot) {
      // Bot preguntó por alergia / restricción
      if (/(alergia|restriccion|celiaco|intolerante|evitar|gluten|lactosa|soya|nueces|mariscos|sin carne|vegetariano|vegano)/.test(prevBot)) {
        if (/^(si|sí|yes)$/.test(t.trim())) return _pick([
          `Gracias por avisarnos 🙏. ¿Qué ingrediente debemos evitar exactamente?`,
          `Entendido. ¿Tienes celiaquía, intolerancia o alergia severa? Así lo preparamos con cuidado 🌿`,
          `Lo tenemos en cuenta. ¿Puedes especificar cuál es la restricción? 😊`,
        ]);
        if (/^no$/.test(t.trim())) return _pick([
          `¡Perfecto! Entonces puedes disfrutar todo el menú sin problema 🎉. ¿Qué te provoca?`,
          `¡Qué bien! Sin restricciones podemos recomendarte los favoritos de la casa 😋. ¿Cuáles?`,
          `Sin restricciones, ¡perfecto! ¿Qué se te antoja hoy? 😊`,
        ]);
      }
      // Bot preguntó si es primera vez
      if (/(primera vez|primera visita|ya nos conoces|has estado|has venido)/.test(prevBot)) {
        if (/^(si|sí|yes)$/.test(t.trim())) return _pick([
          `¡Bienvenido por primera vez! 🎉 Te recomendamos empezar con nuestro clásico más popular. ¿Cuál es tu gusto?`,
          `¡Qué gusto que nos pruebes! Los favoritos de la casa son los más pedidos 🌟. ¿Quieres que te los contemos?`,
          `¡Primera vez aquí! Prometemos que no será la última 😄. ¿Tienes alguna preferencia?`,
        ]);
        if (/^no$/.test(t.trim())) return _pick([
          `¡Qué bueno tenerte de vuelta! 🙌 ¿Qué vas a pedir hoy?`,
          `¡Ya eres parte de la familia! 💚 ¿El de siempre o probamos algo nuevo?`,
          `¡Bienvenido de regreso! ¿Ya sabes lo que quieres o te contamos las novedades? 😊`,
        ]);
      }
      // Bot preguntó por delivery / si viene o delivery
      if (/(delivery|domicilio|traemos|llevamos|a tu casa|envio|envío|pides aqui|comer aqui|para llevar)/.test(prevBot)) {
        if (/^(si|sí|yes|delivery|domicilio)/.test(t.trim())) return _pick([
          `¡Perfecto! ¿Cuál es tu dirección? 📍 Calculamos el tiempo de entrega.`,
          `¡Enviamos para allá! ¿La dirección completa por favor? 🛵`,
          `Delivery confirmado. ¿A qué dirección y a qué hora lo necesitas? ⏰`,
        ]);
        if (/^no$/.test(t.trim())) return _pick([
          `¡Genial, te esperamos entonces! ¿Para qué hora? 🍽️`,
          `¡Perfecto! Mesa lista para ti. ¿Para cuántas personas? 😊`,
          `¡Te esperamos en ${addr}! ¿A qué hora llegas? ⏰`,
        ]);
      }
      // Bot preguntó por tamaño, cantidad o personas
      if (/(cuantas personas|para cuantos|cuantos son|tamano|tamaño|grande|mediana|personal|cuantas)/.test(prevBot)) {
        return _pick([
          `¡Perfecto! Con ese dato ya puedo preparar la recomendación ideal 😊. ¿Algo más?`,
          `¡Anotado! ¿Hay alguna preferencia de sabor o ingrediente en el grupo? 🍽️`,
          `¡Genial! ¿Cuándo vienen / para cuándo lo necesitan? 📅`,
        ]);
      }
      // Bot preguntó por fecha / hora
      if (/(cuand|fecha|que dia|que hora|para cuando|que semana|este fin|manana|pasado)/.test(prevBot)) {
        if (/^(si|sí|yes|dale|va|claro|bueno|listo)$/.test(t.trim())) return _pick([
          `¡Confirmado! ¿A nombre de quién queda la reserva? 📋`,
          `¡Perfecto, agendado! ¿Cuántas personas son? 😊`,
          `¡Listo! Te enviaremos recordatorio. ¿Cuál es el número de contacto? 📱`,
        ]);
      }
      // Bot preguntó por regalo / ocasión especial
      if (/(regalo|ocasion especial|celebracion|cumpleanos|boda|evento|fiesta)/.test(prevBot)) {
        if (/^(si|sí|yes)$/.test(t.trim())) return _pick([
          `¡Qué bonito! 🎁 ¿Para qué fecha es y cuántas personas?`,
          `¡Perfecto para un regalo especial! ¿Tienes algún presupuesto en mente? 💰`,
          `¡Encantados de hacer parte de esa celebración! ¿Cuéntanos los detalles? 🎉`,
        ]);
        if (/^no$/.test(t.trim())) return _pick([
          `¡Claro! Para uso personal también es un placer atenderte 😊. ¿Qué necesitas?`,
          `Perfecto. ¿Cuándo lo necesitas? 📅`,
        ]);
      }
      // Bot preguntó si le interesa algo específico (¿te interesa? / ¿lo pruebas? / ¿lo vemos?)
      if (/(te interesa|lo pruebas|lo vemos|lo pedimos|lo apartamos|te apuntas|te animas|lo agendamos|lo hacemos|lo sumamos|lo confirmo|lo separamos|lo cotizamos|lo reservamos)/.test(prevBot)) {
        if (/^(si|sí|yes|dale|va|claro|bueno|listo|perfecto|genial)$/.test(t.trim())) return _pick([
          `¡Excelente elección! 🎉 ¿Para cuándo lo necesitas?`,
          `¡Genial! ¿Hay algo más que quieras agregar? 😊`,
          `¡Perfecto! ¿Para cuántas personas o qué cantidad? 📦`,
          `¡Hecho! ¿Cuál es el mejor momento para coordinar los detalles? 📅`,
        ]);
        if (/^no$/.test(t.trim())) return _pick([
          `¡Sin problema! ¿Hay otra opción que te llame la atención? 😊`,
          `Entendido. ¿Qué sería lo ideal para ti entonces? 💬`,
          `¡Claro que no! ¿Qué prefieres en su lugar? 🌟`,
        ]);
      }
      // Bot preguntó nivel de picante
      if (/(picante|nivel|jalapeño|habanero|suave|medio|fuerte)/.test(prevBot)) {
        return _pick([
          `¡Perfecto! Lo preparamos a tu gusto 🌶️. ¿Algo más en el pedido?`,
          `¡Anotado el nivel de picante! ¿Con qué bebida lo acompañamos? 🥤`,
          `¡Listo! ¿Para llevar o comes aquí? 😋`,
        ]);
      }
      // Bot preguntó por término de cocción de la carne
      if (/(termino|termino medio|tres cuartos|bien cocido|poco hecho|jugoso)/.test(prevBot)) {
        return _pick([
          `¡Perfecto punto de cocción! 🥩 ¿Qué acompañamiento le ponemos?`,
          `¡Anotado! ¿Vinos para acompañar? Tenemos selección argentina 🍷`,
          `¡Listo el corte! ¿Empanadas de entrada? Son caseras 😋`,
        ]);
      }
      // Fallback contextual genérico para "sí"
      if (/^(si|sí|yes)$/.test(t.trim())) {
        const subConf = {
          pasteleria:   [`¡Perfecto! 🎂 ¿Confirmas la fecha y el diseño?`, `¡Genial! ¿Para cuántas personas y qué sabor? 🍰`, `¡Anotado! ¿Algún detalle especial de decoración? ✨`],
          panaderia:    [`¡Listo! 🥐 ¿Para qué hora pasas?`, `¡Entendido! ¿Cuántas unidades? 🍞`],
          heladeria:    [`¡Dale! 🍦 ¿Cuántas bolas y de qué sabores?`, `¡Perfecto! ¿Lo comes aquí o llevas? 🌈`],
          sushi_ramen:  [`¡Listo! 🍱 ¿Para cuántas personas? Te organizo el combo 🥢`, `¡Genial! ¿Sushi, ramen o los dos? 🍜`],
          pizzeria:     [`¡Va! 🍕 ¿Grande o mediana? ¿Para aquí o delivery?`, `¡Perfecto! ¿Qué ingredientes? 🧀`],
          hamburgueseria:[`¡Dale! 🍔 ¿Cuántas burgers y con qué salsa?`, `¡Claro! ¿Papas o aros de cebolla? 🥤`],
          mariscos:     [`¡Perfecto! 🐟 ¿Para comer aquí o domicilio?`, `¡Genial! ¿Mesa con vista al mar? 🌊`],
          vegano:       [`¡Genial! 🌱 ¿Para cuándo lo necesitas?`, `¡Perfecto! ¿Alguna alergia a considerar? 🥗`],
          cafeteria:    [`¡Genial! ☕ ¿Para tomar aquí o llevar?`, `¡Perfecto! ¿Con leche de vaca, almendras o avena? 🥛`],
          dental:       [`¡Agendado! 🦷 ¿Qué día y hora te viene bien?`, `¡Perfecto! ¿Es consulta inicial o tratamiento? 🩺`],
          spa:          [`¡Reservado! 💆 ¿A nombre de quién y cuándo?`, `¡Genial! ¿Masaje o facial? 🌸`],
          gym:          [`¡Excelente! 💪 ¿Cuándo empiezas? Te asignamos entrenador.`, `¡Perfecto! ¿Mañana o tarde? 🏋️`],
          mecanica:     [`¡Listo! 🔧 ¿Lo traes hoy o mañana?`, `¡Perfecto! ¿Año y modelo del vehículo? ⚙️`],
          tours:        [`¡Genial! 🗺️ ¿Para cuántas personas y qué fecha?`, `¡Perfecto! ¿Español o inglés el tour? 🌍`],
        };
        return _pick(subConf[sub] || [
          `¡Perfecto! ¿Con qué continuamos? 😊`,
          `¡Genial! ¿Cuándo lo necesitas? 📅`,
          `¡Listo! ¿Cuántas personas o qué cantidad? 📦`,
          `¡Excelente! ¿Hay algo más que quieras agregar? 🌟`,
        ]);
      }
      // Fallback contextual genérico para "no"
      if (/^no$/.test(t.trim())) return _pick([
        `¡Sin problema! ¿Hay algo más en lo que podamos ayudarte? 😊`,
        `Entendido. ¿Qué necesitas entonces? 💬`,
        `¡Claro! Dinos qué prefieres y lo buscamos 🔍`,
        `¡De acuerdo! ¿Tienes alguna otra pregunta? 🙏`,
      ]);
    }
    // Sin contexto previo del bot → respuesta genérica de confirmación por subtipo
    const subConf = {
      pasteleria:   [`¡Perfecto! 🎂 ¿Confirmas la fecha y el diseño? Te envío el presupuesto.`, `¡Genial! ¿Para cuántas personas y el sabor? 🍰`, `¡Anotado! ¿Algún detalle especial? ✨`],
      panaderia:    [`¡Listo! 🥐 ¿Para qué hora pasas a recogerlo?`, `¡Entendido! ¿Cuántas unidades? 🍞`, `¡Genial! ¿Pagas al recoger o adelanto? 💳`],
      heladeria:    [`¡Dale! 🍦 ¿Cuántas bolas y de qué sabores?`, `¡Perfecto! ¿Aquí o llevas? 🌈`, `¡Vamos! ¿Con toppings? 🥥`],
      sushi_ramen:  [`¡Listo! 🍱 ¿Mesa o delivery? ¿Cuántas personas? 🥢`, `¡Genial! ¿Algo sin mariscos en el grupo? 🍜`],
      pizzeria:     [`¡Va! 🍕 ¿Aquí o llevas? ¿Grande o mediana?`, `¡Perfecto! ¿Qué ingredientes? 🧀`],
      hamburgueseria:[`¡Dale! 🍔 ¿Cuántas burgers y qué salsa?`, `¡Claro! ¿Papas fritas o aros? 🥤`],
      mariscos:     [`¡Perfecto! 🐟 ¿Aquí o domicilio?`, `¡Genial! ¿Mesa con vista al mar? 🌊`],
      mexicano:     [`¡Órale! 🌮 ¿Cuántos tacos y de qué relleno?`, `¡Listo! ¿Salsa suave o picante? 🌶️`],
      parrilla:     [`¡Fuego! 🔥 ¿Cuántas personas y qué cortes?`, `¡Genial! ¿Término de cocción? 🥩`],
      vegano:       [`¡Qué bien! 🌱 ¿Para aquí o llevas?`, `¡Perfecto! ¿Alguna alergia? 🥗`],
      brunch:       [`¡Reservado! 🥞 ¿A nombre de quién y cuántas personas?`, `¡Perfecto! ¿Con mimosas? 🥂`],
      empanadas:    [`¡Anoté! 🫓 ¿Cuántas de cada relleno?`, `¡Genial! ¿Fritas o al horno? 😋`],
      jugos:        [`¡Va! 🥤 ¿Tamaño pequeño, mediano o grande?`, `¡Listo! ¿Con o sin hielo? 🌿`],
      cafeteria:    [`¡Genial! ☕ ¿Para tomar aquí o llevas?`, `¡Listo! ¿Con leche de vaca, almendras o avena? 🥛`],
      dental:       [`¡Listo! 🦷 ¿Día y hora? ¿Consulta o tratamiento?`, `¡Perfecto! ¿Alergia a medicamentos? 🩺`],
      spa:          [`¡Agendado! 💆 ¿Nombre y día?`, `¡Genial! ¿Zona de tensión? 🌸`],
      gym:          [`¡Excelente! 💪 ¿Cuándo empiezas?`, `¡Perfecto! ¿Objetivo? 🏋️`],
      mecanica:     [`¡Listo! 🔧 ¿Lo traes hoy?`, `¡Entendido! ¿Año y modelo? ⚙️`],
      tours:        [`¡Genial! 🗺️ ¿Cuántas personas y fecha?`, `¡Perfecto! ¿Español o inglés? 🌍`],
      fotografia:   [`¡Genial! 📸 ¿Fecha, hora y tipo de sesión?`, `¡Perfecto! ¿En estudio o exterior? 🖼️`],
      transporte_ejecutivo:[`¡Confirmado! 🚗 ¿Dirección de recogida y destino?`, `¡Perfecto! ¿A qué hora? 🛫`],
    };
    return _pick(subConf[sub] || [
      `¡Perfecto! 😊 ¿Con qué continuamos?`,
      `¡Genial! ¿Necesitas algo más?`,
      `¡Entendido! ¿Algo más en lo que podamos ayudarte? ✅`,
      `¡De acuerdo! ¿Confirmamos los detalles? 🙏`,
      `¡Hecho! ¿Hay algo más? 💬`,
      `¡Listo! Quedamos atentos 😊`,
    ]);
  }

  if (intents.includes('preferencia_comida')) {
    const subPref = {
      pasteleria:   [`¡Sin problema! Trabajamos con opciones sin gluten y sin lactosa 🎂. ¿Para cuántas personas?`, `Adaptamos la receta a tus necesidades 🌿. ¿Qué ingredientes debemos evitar?`, `Tortas sin gluten y sin azúcar disponibles. ¿Es por salud o preferencia? 😊`],
      panaderia:    [`Pan artesanal sin gluten disponible con pedido 24h previo 🍞. ¿Para cuándo?`, `También hacemos pan integral, de semillas y sin sal. ¿Cuál buscas? 🌾`, `Pan sin lactosa también disponible. ¿Qué restricción tienes? 😊`],
      sushi_ramen:  [`La mayoría de rolls no llevan gluten. ¿Tienes celiaquía? 🥢`, `Ramen sin mariscos: caldo de pollo disponible. ¿Lo preparamos así? 🍜`, `Sin soya en varios platos. Indicamos cuáles al momento 🌿`],
      vegano:       [`¡Aquí todo es tuyo! 🌱 Vegano, sin gluten, sin soya a petición.`, `Menú 100% plant-based. ¿Alergia adicional? 😊`, `Sin lácteos, sin huevo, sin gluten si lo necesitas. Todo flexible 🌿`],
      mexicano:     [`¡Salsas aparte siempre! Sin picante sin problema 🌮. ¿Qué relleno?`, `Opción veggie: frijoles, champiñones o nopales 🥑. ¿Te interesa?`, `Sin cilantro si no te gusta. Personalizamos cada pedido 😄`],
      mariscos:     [`Solo pescado sin mariscos es posible 🐟. ¿Corvina o pargo?`, `Ceviche de solo corvina para quien evita mariscos 🌊. ¿Lo pedimos?`, `Indicamos alérgenos en cada plato. ¿Tienes alergia específica? 🦐`],
      hamburgueseria:[`Sin gluten: pan sin gluten disponible bajo pedido 🍔. ¿Lo solicitamos?`, `Sin lactosa: sin queso ni mayonesa. ¿Qué le dejamos? 🥬`, `Burger vegetariana también disponible. ¿La prefieres? 🌱`],
      parrilla:     [`Cortes solo de res, sin cerdo si lo necesitas 🥩. ¿Cuál prefieres?`, `Sin acompañamiento con lácteos disponible. ¿Alguna restricción más? 🌿`, `Sin sal añadida en los cortes si lo pides. ¿Es por salud? 😊`],
      cafeteria:    [`Leche de almendras, avena o coco disponibles ☕. ¿Cuál prefieres?`, `Sin azúcar en todos los cafés. ¿Con edulcorante o solo? 🌿`, `Repostería sin gluten disponible. ¿Tienes celiaquía? 🥐`],
      tailandes:    [`Sin picante: preparamos con cero chile. ¿Lo prefieres así? 🌺`, `Sin mariscos en curry y Pad Thai posible 🍜. ¿Lo confirmamos?`, `Sin cacahuetes disponible. ¿Alergia a nueces? 🥜`],
      brunch:       [`Sin gluten: pancakes y waffles de avena disponibles 🥞. ¿Los pedimos?`, `Sin lácteos: leche de avena en todo. ¿Te parece? 🌱`, `Opciones sin gluten y veganas marcadas en el menú. ¿Tenemos alguna restricción específica? 😊`],
      jugos:        [`Todo sin azúcar añadida por defecto 🥤. ¿Sin endulzante también?`, `Sin frutas que no te gusten. Dime cuáles y las omitimos 🌿`, `Opción sin proteína en polvo si lo prefieres. ¿Cómo lo quieres? 😊`],
      dulceria:     [`Dulces sin azúcar refinada disponibles. ¿Es por diabetes? 🍬`, `Sin gluten en algunos productos. ¿Cuáles necesitas? 😊`, `Endulzados con panela o stevia. ¿Cuál prefieres? 🌿`],
      gym:          [`Rutinas adaptadas para lesiones o condiciones físicas 💪. ¿Cuál es la tuya?`, `Sin impacto si tienes problemas articulares. ¿Qué área te molesta? 🏋️`, `Planes para principiantes sin experiencia previa. ¿Nunca has ido al gym? 🧘`],
      spa:          [`Aceites sin perfume para pieles sensibles 💆. ¿Lo indicamos?`, `Sin presión fuerte si tienes alguna condición. ¿Nos comentas? 🌸`, `Tratamientos sin gluten y sin parabenos disponibles. ¿Cuál es tu preferencia? 🕯️`],
    };
    return _pick(subPref[sub] || [
      `¡Sin problema! Nos adaptamos a tus preferencias 😊. ¿Qué necesitas evitar?`,
      `Tenemos opciones para diferentes necesidades alimentarias 🌿. ¿Cuéntanos?`,
      `Siempre buscamos que disfrutes sin preocupaciones 🙏. ¿Qué restricción tienes?`,
      `Personalizamos para ti. ¿Qué debemos tener en cuenta? ✅`,
      `Tu comodidad primero 😊. ¿Alergia, intolerancia o preferencia personal?`,
    ]);
  }

  if (intents.includes('saludo')) return _pick([
    `¡Hola! 👋 Bienvenido a ${bizName}. ¿En qué podemos ayudarte?`,
    `¡Buenas! 😊 Gracias por contactar a ${bizName}. ¿Cómo servirte?`,
    `¡Hola! Un gusto. Estamos para atenderte. ¿Qué necesitas?`,
    `¡Bienvenido! 🌟 En ${bizName} estamos para lo que necesites.`,
    `¡Hey! 👋 Me alegra que nos escribas. ¿En qué te ayudamos hoy?`,
    `¡Hola! 😄 ¿Es tu primera vez con nosotros o ya nos conoces?`,
    `¡Buenas! Qué gusto tenerte aquí. ¿Cómo podemos ayudarte? 🙌`,
    `¡Hola hola! 👋 En ${bizName} estamos listos para atenderte.`,
    `¡Bienvenido/a! 🎉 ¿Qué te trae por aquí hoy?`,
    `¡Hola! Escríbenos lo que necesitas y te respondemos de inmediato 💬`,
  ]);

  // ── Fallback por subtipo específico (cuando no se detectó intención) ──
  const subFb = {
    pasteleria:   [
      `¿Es para una ocasión especial? 🎂 Personalizamos cada torta al detalle.`,
      `Pasteles artesanales con ingredientes frescos. ¿Qué sabor te gusta más? 🍰`,
      `También hacemos delivery de pasteles. ¿Para cuándo lo necesitas? 🎁`,
      `¿Tienes algún diseño en mente? Tráenos la foto y lo recreamos 🎨`,
      `Trabajamos con fondant, buttercream y pasta de azúcar. ¿Cuál prefieres? ✨`,
      `Tortas para bodas, quinceañeras y cumpleaños 🎉. ¿Cuándo es la fecha?`,
      `También hacemos cupcakes y postres individuales. ¿Para cuántas personas? 🧁`,
      `Nuestros postres no llevan conservantes artificiales 🌿. ¿Tienes alguna alergia?`,
    ],
    panaderia:    [
      `Pan artesanal fresco cada mañana 🥖. ¿Cuándo puedes pasar?`,
      `Las galletas de avena de hoy salieron perfectas 😋. ¿Quieres una caja?`,
      `Panadería con recetas de abuela. ¿Hay algún pan que recuerdes de tu infancia? 🍞`,
      `También hacemos pedidos para eventos y catering. ¿Necesitas algo especial? 🎉`,
      `¿Desayuno o merienda? Tenemos algo para cada momento del día ☕`,
      `Brownies recién horneados disponibles. ¿Con nueces o sin nueces? 🍫`,
      `Pan de queso y pan de ajo son los más pedidos hoy 🧀. ¿Los pruebas?`,
      `Pedidos especiales con 24h de anticipación. ¿Para cuándo lo necesitas? 📅`,
    ],
    heladeria:    [
      `El helado de maracuyá de hoy está para chuparte los dedos 🍦. ¿Lo pruebas?`,
      `Más de 30 sabores tropicales sin colorantes. ¿Cuál es tu fruta favorita? 🌈`,
      `¿Vienes tú solo o traes a alguien? Tenemos opciones para todos 😊`,
      `Hoy el sabor especial es guanábana con coco 🌴. ¿Te interesa?`,
      `El calor pide helado 🌞. ¿Cuándo pasas por acá?`,
      `También hacemos paletas y sorbetes de frutas naturales 🍓. ¿Lo sabías?`,
      `Copa especial con 3 bolas, salsa y topping $4 🍨. ¿Cuántas quieres?`,
      `Sin lactosa también disponemos de opciones. ¿Eres intolerante? 🌿`,
    ],
    sushi_ramen:  [
      `¿Sushi o ramen hoy? 🍜 Ambos están fresquísimos.`,
      `El tonkotsu está hirviendo desde las 6am 🍲. ¿Para cuándo reservamos?`,
      `Rolls especiales de hoy: tempura de langostino y aguacate 🥢. ¿Te animas?`,
      `¿Eres fan del ramen? El caldo lo preparamos 18 horas. Nada de sobres 😄`,
      `Fusión nikkei: lo mejor de Japón y Perú en un mismo plato 🌏. ¿Lo probaste?`,
      `También hacemos combos para 2 personas con ahorro incluido 🍱. ¿Vienen en pareja?`,
      `El sashimi de hoy llegó fresco esta mañana 🐟. ¿Lo incluimos en el pedido?`,
      `Gyozas de cerdo o vegetarianas para empezar. ¿Las agregamos? 🥟`,
    ],
    pizzeria:     [
      `La pizza al horno de leña huele diferente 🔥. ¿Cuándo nos visitas?`,
      `Masa madre de 48h fermentadas. ¿Prefieres finita o gruesa? 🍕`,
      `¿Para llevar, comer aquí o delivery? Dinos y la preparamos 🛵`,
      `Esta semana: pizza especial de trufa y funghi. ¿Te interesa? 🍄`,
      `Ingredientes importados de Italia. Sabor auténtico 🇮🇹`,
      `La orilla rellena de mozzarella es un imprescindible. ¿La agregas? 🧀`,
      `También hacemos calzone y focaccia artesanal 🫒. ¿Los conoces?`,
      `Combo familiar: 2 pizzas grandes + bebidas $35. ¿Para cuántos son? 🎉`,
    ],
    hamburgueseria:[
      `Las burgers de hoy están jugosas 🍔. ¿Cuántas personas son?`,
      `¿Clásica o la del chef con doble carne y bacon crujiente? 🥓`,
      `Papas fritas con sazón secreto. ¿Con salsa de la casa? 😋`,
      `Para llevar o comer aquí. Ambas opciones disponibles 🛵`,
      `Batidos artesanales que van perfecto con la burger 🥤. ¿De qué sabor?`,
      `Carne 100% nacional, sin rellenos ni conservantes. ¿Lo sabías? 🐄`,
      `También tenemos opciones sin gluten y burger vegetariana 🌱. ¿Te interesa?`,
      `La Burger del mes tiene queso brie y cebolla caramelizada 🧅. ¿La pruebas?`,
    ],
    mariscos:     [
      `Los mariscos llegaron frescos del Pacífico esta mañana 🌊. ¿Qué prefieres?`,
      `Ceviche clásico o mixto, ¿cuál te gusta más? 🐟`,
      `La corvina al ajillo es el plato estrella. ¿La has probado? 🍋`,
      `Vista al mar y mariscos frescos. Difícil superar eso 🌅`,
      `¿Vienes a comer o pides delivery? Ambas opciones disponibles 🛵`,
      `Los langostinos al ajillo de hoy están increíbles 🦐. ¿Los agregamos?`,
      `También tenemos tiraditos y leche de tigre estilo peruano 🔥. ¿Lo conoces?`,
      `Música en vivo los viernes 🎵. ¿Harías una reserva para el fin de semana?`,
    ],
    mexicano:     [
      `¿Cuántos tacos te preparamos hoy? 🌮 Al pastor son los favoritos.`,
      `Las salsas caseras van del nivel 1 (suave) al 5 (fuego). ¿Cuánto aguantas? 🌶️`,
      `Burritos cargados o quesadillas crocantes. ¿Qué se te antoja? 😋`,
      `Todo con ingredientes frescos y auténticos. ¿Primera vez aquí? 🍅`,
      `También tenemos opción vegetariana con frijoles y aguacate 🥑`,
      `El guacamole lo preparamos al momento. ¿Lo sumamos al pedido? 😍`,
      `Aguas frescas de Jamaica, tamarindo y horchata 🫙. ¿Con cuál acompañas?`,
      `Martes de promo: 3 tacos + bebida por $7. ¿Vienes esta semana? 🎉`,
    ],
    parrilla:     [
      `La parrilla está encendida 🔥. ¿Qué corte prefieres hoy?`,
      `Bife de chorizo término medio o bien cocido. ¿Cómo lo quieres? 🥩`,
      `Vinos argentinos seleccionados. ¿Celebramos algo? 🍷`,
      `Tabla parrillera para compartir. ¿Para cuántas personas? 🍽️`,
      `Las empanadas de entrada son caseras. ¿Las sumamos? 😋`,
      `Los 30 días de maduración de la carne marcan la diferencia 🔑. ¿Lo notas?`,
      `Entraña y asado de tira son los favoritos del mediodía 🥩. ¿Reservas?`,
      `Ambiente íntimo y elegante. ¿Es para una cena especial? 🕯️`,
    ],
    vegano:       [
      `¿Qué busca tu cuerpo hoy? 🌱 Opciones energéticas y desintoxicantes.`,
      `Todo sin carne, sin lácteos, sin culpa 😄. ¿Tienes alguna alergia?`,
      `El bowl de quinoa con aguacate de hoy está increíble 🥗. ¿Lo pruebas?`,
      `¿Primera vez comiendo vegano? Te ayudamos a elegir 🙏`,
      `Postres sin azúcar refinada que saben a nube ☁️. ¿Hueco para el postre?`,
      `También hacemos jugos prensados en frío para acompañar 🥤. ¿Lo sabías?`,
      `Ambiente zen y tranquilo, perfecto para un almuerzo sin prisa 🧘. ¿Nos visitas?`,
      `Wrap de vegetales asados y hummus: el más pedido esta semana 🌯. ¿Lo pruebas?`,
    ],
    cafeteria:    [
      `El V60 de hoy viene de granos etíopes. Frutal y aromático ☕. ¿Lo probamos?`,
      `¿Espresso, filtrado o cold brew? Cada uno cuenta su historia 🫗`,
      `Baristas certificados, granos de origen. No es solo un café, es una experiencia ✨`,
      `¿Lo acompañamos con algo de repostería? El croissant está perfecto 🥐`,
      `¿Te quedas un rato? Tenemos eventos culturales semanales 📚`,
      `El cold brew macerado 24h tiene un sabor único ❄️. ¿Ya lo probaste?`,
      `Granos de Guatemala, Etiopía y Colombia disponibles. ¿Tienes preferencia de origen? 🌍`,
      `También hacemos latte de lavanda y matcha. ¿Te atreves? 🌸`,
    ],
    tailandes:    [
      `El Pad Thai hoy viene con langostinos frescos 🍜. ¿Lo pruebas?`,
      `¿Curry verde o rojo? Ambos recién preparados con pasta casera 🌿`,
      `El tom yum es perfecto para hoy 🍲. ¿Qué tan picante te gusta?`,
      `Recetas auténticas de Chiang Mai 🇹🇭`,
      `¿Primera vez comiendo tailandés? Te explicamos el menú 😊`,
      `El mango sticky rice es el postre favorito. ¿Lo incluimos? 🥭`,
      `También tenemos satay de pollo con salsa de cacahuete 🥜. ¿Lo conoces?`,
      `Platos para compartir disponibles. ¿Cuántas personas son? 🌺`,
    ],
    brunch:       [
      `Solo sábados y domingos 🌅. ¿Ya tienes reserva para este fin de semana?`,
      `Pancakes de masa madre con frutos rojos 🥞. ¿Con mimosa?`,
      `El brunch más Instagram-able de la ciudad 📸. ¿Para cuántas personas?`,
      `Waffles, huevos benedictinos y avocado toast en el mismo lugar 😍`,
      `¿Dulce o salado para empezar? Tenemos las dos opciones 😊`,
      `Mimosas incluidas en el brunch premium. ¿Cuál versión prefieres? 🥂`,
      `Mesa en terraza o interior según prefieras. ¿Cómo te queda mejor? 🌞`,
      `Smoothie bowls de açaí para empezar ligero. ¿O algo más contundente? 🍓`,
    ],
    empanadas:    [
      `¿Para llevar o comer aquí? 🫓 Rellenos recién salidos del horno.`,
      `Más de 20 rellenos. ¿Cuál es tu preferido? 😋`,
      `Las de camarones y jalapeño son las más pedidas 🔥. ¿Las pruebas?`,
      `Pedidos de docenas para eventos 🎉. ¿Necesitas para alguna celebración?`,
      `Fritas o al horno. ¿Cuál prefieres? Ambas deliciosas 😄`,
      `Relleno de pollo con champiñones es el nuevo favorito. ¿Lo conoces? 🍄`,
      `Empanadas dulces también disponibles: manjar, guayaba y queso 🍯. ¿Cuántas?`,
      `Pedido mínimo de 6 para delivery. ¿Cuánto te mando? 🛵`,
    ],
    jugos:        [
      `¿Qué necesita tu cuerpo hoy? 🥤 ¿Energía, vitaminas o detox?`,
      `Shot de jengibre para empezar el día 💪. ¿Lo añadimos?`,
      `Acai bowl con granola y frutas frescas 🍓. El desayuno más completo.`,
      `Todo sin azúcar añadida. ¿Tienes alguna fruta que no te guste? 😊`,
      `El smoothie verde de espinaca, piña y jengibre está arrasando 🌿`,
      `Detox de 3 días disponible. ¿Has hecho uno antes? 🌱`,
      `Jugo de remolacha con naranja: el favorito de los corredores 🏃. ¿Lo pruebas?`,
      `Combo desayuno (jugo+bowl+shot) $10. ¿Lo aparto? ⚡`,
    ],
    asiatico:     [
      `Wok al fuego vivo 🔥. ¿China, japonés o vietnamita hoy?`,
      `El pho viene con fideos frescos y caldo de 6 horas 🍜. ¿Lo prueban?`,
      `Los baos de cerdo BBQ son el hit del menú 🥟. ¿Cuántos pedimos?`,
      `¿Alergias a mariscos o soya? Te ayudamos a elegir 🌏`,
      `Dim sum: clásico que no falla 😄. ¿Para cuántos?`,
      `Chow mein con vegetales salteados: opción rápida y sabrosa 🥢. ¿Lo vemos?`,
      `Menú del mediodía $11 (plato+arroz+bebida) de lunes a viernes 🌏`,
      `Postres asiáticos: mochi de helado y dorayaki 🍡. ¿Los conoces?`,
    ],
    panameno:     [
      `El sancocho de hoy huele como el de la abuela 🍲. ¿Para cuántos?`,
      `Arroz con pollo, patacones y ensalada. El clásico panameño 🇵🇦. ¿Lo apartamos?`,
      `¿Cuándo fue la última vez que comiste bienmesabe? 😋 Lo tenemos.`,
      `Comida criolla auténtica, sin atajos. ¿Para comer aquí o llevar?`,
      `Yuca frita y hojaldre de acompañante. Acompañan perfecto 🏡`,
      `El tembleque lo preparamos con coco natural. ¿Lo agregas de postre? 🥥`,
      `Carimañola de pollo y ropa vieja entre los más pedidos 🇵🇦. ¿Cuál prefieres?`,
      `Almuerzo ejecutivo $8. Sopa, plato, fresco y postre. ¿Lo apartamos? 🍽️`,
    ],
    dulceria:     [
      `Las cocadas de hoy salieron con coco fresco 🥥. ¿Quieres probar?`,
      `¿Para regalo o para ti? 🎁 Armamos cajas personalizadas.`,
      `Alfajores, polvorones y dulce de leche artesanal 🍬. ¿Cuál es tu favorito?`,
      `Dulces tradicionales que ya no se encuentran fácil 😄. ¿Los recuerdas?`,
      `Pedidos especiales para bodas y eventos 🎉`,
      `Caja de 12 dulces surtidos $15. ¿La hacemos para ti? 🎁`,
      `También tenemos conservas y mermeladas artesanales 🍯. ¿Las conoces?`,
      `Envío a domicilio para cajas de dulces. ¿Cuándo la necesitas? 🛵`,
    ],
    dental:       [
      `¿Cuándo fue tu última revisión? 🦷 La limpieza preventiva es clave.`,
      `Sonrisa bonita = confianza. ¿Quieres consultar sobre blanqueamiento? ✨`,
      `Ortodoncia invisible disponible. ¿Tienes alguna consulta? 😁`,
      `Tecnología digital para diagnósticos precisos y sin dolor 🩺. ¿Agendamos?`,
      `¿Tienes seguro médico? Trabajamos con varias aseguradoras 📋`,
      `Emergencias dentales atendidas el mismo día 🚨. ¿Tienes dolor ahora?`,
      `Blanqueamiento LED en 60 min. ¿Para cuándo lo agendamos? ✨`,
      `Revisión preventiva para niños también. ¿Tienes hijos? 👨‍👩‍👧`,
    ],
    spa:          [
      `¿Cuándo fue tu último masaje? 💆 Tu cuerpo lo necesita.`,
      `Aromaterapia + masaje: combinación perfecta contra el estrés 🕯️. ¿Agendamos?`,
      `Paquete de pareja disponible. ¿Para el fin de semana? 🌸`,
      `Primer masaje con 15% de descuento 😊. ¿Es tu primera vez?`,
      `El facial hidratante deja la piel como nueva 🌟. ¿Te interesa?`,
      `Piedras calientes para tensión muscular profunda 🔥. ¿Lo añadimos?`,
      `Tratamiento anti-estrés de 2h: masaje + facial + aromaterapia $95 🌺`,
      `Ambiente de total relajación y privacidad. ¿Lo reservamos? ✨`,
    ],
    gym:          [
      `¿Cuándo empezamos? 💪 El mejor día es hoy.`,
      `3 días de prueba gratis sin compromiso 🎉. ¿Cuándo puedes venir?`,
      `¿Bajar de peso, ganar músculo o moverte más? Tenemos el plan 🏋️`,
      `Clases de yoga mañana a las 7am. ¿Te apuntas? 🧘`,
      `Entrenador personal para tu primera rutina 😊. ¿Qué objetivo tienes?`,
      `Equipos de última generación en todas las áreas 💪. ¿Los quieres conocer?`,
      `Clases de crossfit, spinning y zumba incluidas en la mensualidad 🔥. ¿Te interesa?`,
      `Plan nutricional personalizado disponible. ¿Quieres más info? 🥗`,
    ],
    mecanica:     [
      `¿Qué síntoma tiene tu vehículo? Cuéntanos 🔧`,
      `Diagnóstico computarizado gratis esta semana ⚡. ¿Lo traes hoy?`,
      `¿Cuándo fue el último cambio de aceite? Lo revisamos 🚗`,
      `Mecánicos certificados con años de experiencia ⚙️. ¿Qué modelo es tu carro?`,
      `Si suena raro o jala hacia un lado, mejor revisarlo 🛠️. ¿Cuándo lo traes?`,
      `Trabajo garantizado. Si falla en 30 días, lo arreglamos sin costo 🛡️`,
      `¿Viaje largo próximo? Revisión de viaje completa $20. ¿La hacemos? 🗺️`,
      `Frenos, suspensión y alineación: el combo de seguridad. ¿Cuándo lo revisamos? 🚘`,
    ],
    transporte_ejecutivo:[
      `¿A dónde necesitas ir? 🚗 Choferes certificados y vehículos premium.`,
      `Servicio 24 horas, 365 días. ¿Para cuándo el traslado? 🛫`,
      `Aeropuerto, hotel, eventos o tour privado 😊`,
      `Flota moderna, puntualidad garantizada. ¿Cuántas personas? 🚐`,
      `¿Tienes vuelo pronto? Te recogemos con tiempo de sobra ✈️`,
      `Vehículos con aire acondicionado, WiFi y agua incluidos 🌟. ¿Lo sabías?`,
      `También hacemos traslados para eventos corporativos y bodas 🎊. ¿Nos cuentas el evento?`,
      `Tarifa fija sin sorpresas. ¿Cotizamos tu ruta ahora? 💳`,
    ],
    tours:        [
      `¿Primera vez en la ciudad o quieres descubrir más? 🗺️`,
      `Casco Viejo, Canal de Panamá y barrios emblemáticos. ¿Qué te interesa? ✨`,
      `Guías bilingües español/inglés. ¿Qué idioma prefieres? 🌍`,
      `Grupos pequeños para experiencia personalizada. ¿Para cuántos? 🎒`,
      `¿Cuántos días estarás en Panamá? Armamos el tour ideal 😊`,
      `Tour nocturno del Casco Viejo disponible los viernes 🌙. ¿Te interesa?`,
      `Foto profesional incluida en tour premium 📸. ¿Lo agregamos?`,
      `Transporte desde tu hotel incluido en todos los tours 🚐. ¿Dónde te hospedas?`,
    ],
    fotografia:   [
      `¿Para qué tipo de sesión nos contactas? 📸 ¿Retratos, familia, eventos o productos?`,
      `Edición profesional incluida en todos los paquetes 🖼️. ¿Cuándo necesitas las fotos?`,
      `Sesión de graduación, quinceañera, boda o empresarial 🎓. ¿Cuál es tu ocasión?`,
      `Estudio profesional con fondos ilimitados ✨. ¿Lo visitamos primero?`,
      `¿Viste algún estilo fotográfico que te guste? Tráenos referencias 😊`,
      `Entrega digital de fotos en 48–72h tras la sesión 📩. ¿Te parece bien?`,
      `También hacemos fotos de productos para e-commerce. ¿Tienes un negocio? 🛍️`,
      `Sesión en locación (playa, ciudad, parque). ¿La prefieres exterior? 🌅`,
    ],
    libreria:     [
      `¿Buscas algo en especial o vienes a explorar? 📚 Ambas opciones bienvenidas.`,
      `Literatura latinoamericana, ciencia ficción y cómics. ¿Cuál es tu género? 🌎`,
      `Eventos literarios mensuales y club de lectura activo. ¿Te interesa? 📖`,
      `Títulos difíciles de encontrar en otras librerías. ¿Buscas algo específico? 🔍`,
      `¿Es para regalo? Te ayudamos a elegir según los gustos del receptor 🎁`,
      `Club de lectura: próxima sesión este sábado. ¿Te inscribes? 📅`,
      `También tenemos libros en inglés y bilingües. ¿Necesitas alguno? 🇬🇧`,
      `Pedidos especiales de títulos no disponibles. ¿Qué buscas? 📬`,
    ],
    ferreteria:   [
      `¿Qué proyecto tienes en mente? 🔨 Te ayudamos con todo.`,
      `Herramientas, materiales y asesoramiento. ¿Vienes hoy? 🏠`,
      `¿Plomería, electricidad o carpintería? Tenemos todo 🔧. ¿De qué trata el trabajo?`,
      `Asesoramiento personalizado sin costo. ¿Qué vas a construir? 💡`,
      `¿Urgente o planificado? Si es urgente te damos prioridad hoy ⚡`,
      `También tenemos pinturas, barnices y esmaltes. ¿Qué color buscas? 🎨`,
      `Alquiler de herramientas eléctricas disponible. ¿Lo necesitas? 🔌`,
      `Asesor técnico en tienda para guiarte paso a paso 🤝. ¿Cuándo vienes?`,
    ],
  };

  // Fallback por categoría (si no hay subtipo específico)
  const catFb = {
    restaurantes: [
      `¿Mesa para comer aquí, para llevar o delivery? 🍽️`,
      `¿Qué tipo de comida te provoca hoy? Dinos y te orientamos 😋`,
      `¿Celebrando algo especial? Cuéntanos para preparar algo personalizado 🎂`,
      `¿Tienes alguna restricción alimentaria? Te ayudamos a elegir 🥗`,
      `¿Has estado aquí antes? Si es tu primera vez te recomendamos los favoritos 😊`,
      `Menú del día disponible de lunes a viernes 🍲. ¿Quieres saber qué hay?`,
    ],
    belleza:      [
      `¿Cambio de look o mantenimiento? Cuéntanos tu idea ✨`,
      `¿Primera vez aquí? La consulta inicial es gratis 💇`,
      `¿Viste algo en Instagram? Tráenos la foto y lo recreamos 📸`,
      `Productos profesionales para el mejor resultado 🌿`,
      `¿Tienes un evento próximo? Planificamos juntos el look ideal 💃`,
      `Atendemos con cita previa para garantizarte el horario. ¿Cuándo te viene bien? 📅`,
    ],
    salud:        [
      `¿Consulta, examen o tratamiento? 🏥 Cuéntanos para orientarte.`,
      `¿Es urgente o consulta programada? Te ayudamos 🚑`,
      `Trae tu seguro médico si tienes. Trabajamos con varias aseguradoras 📋`,
      `Telemedicina disponible si no puedes venir presencialmente 💻. ¿Te interesa?`,
      `Horario de ${hours}. ¿Cuándo puedes venir? 🗓️`,
    ],
    tecnologia:   [
      `¿Qué equipo necesitas reparar? 💻`,
      `Diagnóstico gratuito y sin compromiso 🔧. ¿Lo traes hoy?`,
      `¿Cayó al agua, pantalla rota o no enciende? Cuéntanos los síntomas 📱`,
      `Reparaciones con garantía de 3 meses ✅. ¿Cuál es el problema?`,
      `También vendemos accesorios y repuestos originales. ¿Necesitas algo? 🛒`,
    ],
    hogar:        [
      `¿Qué trabajo necesitas en tu hogar? 🏠`,
      `Presupuesto sin costo. ¿Describimos el trabajo? 📋`,
      `Plomería, electricidad, pintura y remodelaciones 🔨`,
      `Técnicos disponibles esta semana. ¿Cuándo te viene bien? ⚡`,
      `Trabajos con garantía escrita. ¿Nos cuentas qué necesitas? 🛡️`,
    ],
    turismo:      [
      `¿Tours locales o experiencias de aventura? ✈️`,
      `¿Para cuántas personas y cuándo planeas el viaje? 🗓️`,
      `Guías bilingües disponibles. ¿Qué destino te interesa? 🗺️`,
      `Transporte incluido en todos los paquetes 🚐. ¿Dónde te hospedas?`,
      `Grupos privados o grupales. ¿Cuál prefieres? 🎒`,
    ],
    transporte:   [
      `¿Para qué fecha y destino necesitas el servicio? 🚗`,
      `¿Aeropuerto o ruta específica? Cuéntanos 🛫`,
      `Sedanes, SUVs y vans disponibles. ¿Cuántas personas? 🚐`,
      `Servicio puntual y confiable. ¿A qué hora necesitas salir? ⏰`,
      `También hacemos traslados para grupos y eventos. ¿Es algo corporativo? 🤝`,
    ],
    ropa:         [
      `¿Casual, formal, sport o para una ocasión especial? 👗`,
      `¿Cuál es tu talla? Verificamos disponibilidad 👕`,
      `¿Es para regalo? Empaque especial sin costo 🎁`,
      `Nueva colección disponible esta semana. ¿Quieres ver fotos? 📸`,
      `También hacemos envíos a domicilio. ¿Lo prefieres así? 🛵`,
    ],
    deportes:     [
      `¿Qué deporte practicas o qué equipo necesitas? 🏋️`,
      `¿Principiante o con experiencia? Así te recomendamos mejor 🎽`,
      `Marcas originales con garantía. ¿Tienes marca preferida? ⚽`,
      `También medimos tu pisada gratis para el calzado correcto 👟`,
      `Suplementos y accesorios disponibles. ¿Necesitas algo específico? 💪`,
    ],
  };

  return _pick(subFb[sub] || catFb[cat] || [
    `¡Gracias por escribir a ${bizName}! 😊 ¿En qué podemos ayudarte?`,
    `Recibimos tu mensaje. ¿Puedes contarnos más? 🙏`,
    `¡Con gusto te atendemos! ¿Qué necesitas exactamente?`,
    `Estamos aquí para ayudarte ✅. ¿Cuéntanos?`,
    `¿Cómo podemos hacer tu día mejor hoy? 💬`,
    `¡Hola! Cuéntanos qué buscas y encontramos la solución 🌟`,
  ]);
}


/* CHAT: REACCIONES Y MENÚ CONTEXTUAL DE MENSAJES */

// Emojis de reacción rápida (mismos que WhatsApp)
const QUICK_REACTIONS = ['👍','❤️','😂','😮','😢','🙏'];

// Estado interno del contexto activo
let _ctxBizId  = null;   // bizId del chat activo
let _ctxMsgId  = null;   // id del mensaje sobre el que se abrió el menú
let _ctxIsOut  = false;  // si el mensaje es del usuario (outgoing)

// ---- Guardar / leer reacciones en localStorage ----
function _getReactions(bizId) {
  try { return JSON.parse(localStorage.getItem('fynderReactions_' + bizId) || '{}'); }
  catch(e) { return {}; }
}
function _saveReactions(bizId, obj) {
  localStorage.setItem('fynderReactions_' + bizId, JSON.stringify(obj));
}

// ---- Añadir/quitar reacción a un mensaje ----
function toggleMsgReaction(bizId, msgId, emoji) {
  const reactions = _getReactions(bizId);
  if (!reactions[msgId]) reactions[msgId] = {};
  const mine = reactions[msgId]['__mine__'];
  if (mine === emoji) {
    // quitar
    delete reactions[msgId]['__mine__'];
    if (reactions[msgId][emoji]) {
      reactions[msgId][emoji]--;
      if (reactions[msgId][emoji] <= 0) delete reactions[msgId][emoji];
    }
  } else {
    // quitar anterior si existía
    if (mine) {
      if (reactions[msgId][mine]) {
        reactions[msgId][mine]--;
        if (reactions[msgId][mine] <= 0) delete reactions[msgId][mine];
      }
    }
    // agregar nueva
    reactions[msgId]['__mine__'] = emoji;
    reactions[msgId][emoji] = (reactions[msgId][emoji] || 0) + 1;
  }
  _saveReactions(bizId, reactions);

  // Cerrar menú y re-renderizar
  closeMsgBubbleCtxMenu();
  if (typeof renderChatMessages === 'function' && _activeChatBizId === bizId) {
    renderChatMessages(bizId);
  }
}

// ---- Construir HTML de badges de reacción para un mensaje ----
function _buildReactionBadgesHTML(bizId, msgId) {
  const reactions = _getReactions(bizId);
  const msgReacts = reactions[msgId];
  if (!msgReacts) return '';
  const mine = msgReacts['__mine__'];
  const badges = Object.entries(msgReacts)
    .filter(([k]) => k !== '__mine__')
    .map(([emoji, count]) => {
      const isMine = mine === emoji ? 'mine' : '';
      return `<button class="chat-bubble-reaction-badge ${isMine}"
        onclick="event.stopPropagation();toggleMsgReaction('${bizId}','${msgId}','${emoji}')"
        title="${isMine ? 'Quitar reacción' : 'Reaccionar con ' + emoji}">
        ${emoji}${count > 1 ? `<span class="react-count">${count}</span>` : ''}
      </button>`;
    });
  if (!badges.length) return '';
  return `<div class="chat-bubble-reactions">${badges.join('')}</div>`;
}

// ---- Abrir menú contextual de burbuja ----
function openMsgBubbleCtxMenu(event, bizId, msgId, isOut) {
  event.preventDefault();
  event.stopPropagation();

  // Cerrar la barra de reacciones si estaba abierta
  _closeReactionBar();

  _ctxBizId = bizId;
  _ctxMsgId = msgId;
  _ctxIsOut = isOut;

  // Construir tira de reacciones
  const strip = document.getElementById('ctxReactionStrip');
  if (strip) {
    const reactions = _getReactions(bizId);
    const mine = reactions[msgId] && reactions[msgId]['__mine__'];
    strip.innerHTML = QUICK_REACTIONS.map(em => {
      const reacted = mine === em ? 'reacted' : '';
      return `<button class="chat-reaction-btn ${reacted}"
        onclick="toggleMsgReaction('${bizId}','${msgId}','${em}');closeMsgBubbleCtxMenu();"
        title="${em}">${em}</button>`;
    }).join('') +
    `<button class="react-more"
      onclick="closeMsgBubbleCtxMenu();openReactionEmojiPicker('${bizId}','${msgId}');"
      title="Más emojis">+</button>`;
  }

  // Actualizar etiqueta "Fijar" según estado actual
  const msgs = _getMsgs(bizId);
  const msg  = msgs.find(m => String(m.id) === String(msgId));
  const pinItem = document.querySelector('#msgBubbleCtxMenu .ctx-menu-item[onclick*="pin"]');
  if (pinItem && msg) {
    pinItem.innerHTML = msg.pinned
      ? `<i class="fas fa-thumbtack"></i> Desfijar`
      : `<i class="fas fa-thumbtack"></i> Fijar`;
  }
  const starItem = document.querySelector('#msgBubbleCtxMenu .ctx-menu-item[onclick*="star"]');
  if (starItem && msg) {
    starItem.innerHTML = msg.starred
      ? `<i class="fas fa-star" style="color:#f59e0b"></i> Quitar destacado`
      : `<i class="fas fa-star"></i> Destacar`;
  }

  // Posicionamiento
  const menu = document.getElementById('msgBubbleCtxMenu');
  if (!menu) return;
  menu.classList.remove('open');

  const x = event.clientX || (event.touches && event.touches[0].clientX) || 0;
  const y = event.clientY || (event.touches && event.touches[0].clientY) || 0;

  // Poner provisionalmente para medir tamaño
  menu.style.left = x + 'px';
  menu.style.top  = y + 'px';
  menu.classList.add('open');

  // Ajustar para que no se salga del viewport
  requestAnimationFrame(() => {
    const rect = menu.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    let finalX = x;
    let finalY = y;
    if (finalX + rect.width > vw - 8)  finalX = vw - rect.width - 8;
    if (finalY + rect.height > vh - 8) finalY = vh - rect.height - 8;
    if (finalX < 8) finalX = 8;
    if (finalY < 8) finalY = 8;
    menu.style.left = finalX + 'px';
    menu.style.top  = finalY  + 'px';
    menu.style.transformOrigin = isOut ? 'top right' : 'top left';
  });
}

// ---- Cerrar menú contextual ----
function closeMsgBubbleCtxMenu() {
  const menu = document.getElementById('msgBubbleCtxMenu');
  if (menu) menu.classList.remove('open');
  _ctxBizId = null;
  _ctxMsgId = null;
}

// ---- Ejecutar acción del menú ----
function chatCtxAction(action) {
  const bizId = _ctxBizId;
  const msgId = _ctxMsgId;
  closeMsgBubbleCtxMenu();
  if (!bizId || !msgId) return;

  const msgs = _getMsgs(bizId);
  const msg  = msgs.find(m => String(m.id) === String(msgId));
  if (!msg && action !== 'select') return;

  switch (action) {

    case 'reply': {
      // Mostrar barra de respuesta sobre el input
      const bar = _getOrCreateReplyBar();
      if (bar) {
        const preview = msg.text
          ? msg.text.slice(0, 60) + (msg.text.length > 60 ? '…' : '')
          : (msg.attach ? '📎 Adjunto' : '');
        bar.dataset.quoteId   = msgId;
        bar.dataset.quoteBizId = bizId;
        bar.querySelector('.reply-text').textContent = preview;
        bar.style.display = 'flex';
        // Foco al input
        const inp = document.getElementById('chatInput') || document.getElementById('chatInputMobile');
        if (inp) inp.focus();
      }
      break;
    }

    case 'copy': {
      const text = msg.text || (msg.attach ? msg.attach.name : '');
      if (text) {
        if (navigator.clipboard) {
          navigator.clipboard.writeText(text).then(() => showToast('Mensaje copiado'));
        } else {
          // fallback
          const ta = document.createElement('textarea');
          ta.value = text;
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
          showToast('Mensaje copiado');
        }
      }
      break;
    }

    case 'forward': {
      const text = msg.text || '';
      // Abrir nueva conversación o simplemente copiar — mostramos toast informativo
      showToast('Mensaje copiado para reenviar', 'info');
      if (navigator.clipboard && text) navigator.clipboard.writeText(text);
      break;
    }

    case 'pin': {
      msg.pinned = !msg.pinned;
      _saveMsgs(bizId, msgs);
      showToast(msg.pinned ? '📌 Mensaje fijado' : 'Mensaje desfijado');
      if (typeof renderChatMessages === 'function') renderChatMessages(bizId);
      break;
    }

    case 'star': {
      msg.starred = !msg.starred;
      _saveMsgs(bizId, msgs);
      showToast(msg.starred ? '⭐ Mensaje destacado' : 'Destacado eliminado');
      if (typeof renderChatMessages === 'function') renderChatMessages(bizId);
      break;
    }

    case 'select': {
      // Entrar en modo selección y marcar este mensaje
      enterSelectMode(bizId, msgId);
      break;
    }

    case 'report': {
      showToast('Mensaje reportado', 'info');
      break;
    }

    case 'delete': {
      // Abrir modal estilo WhatsApp
      openDeleteMsgModal(bizId, msgId);
      break;
    }
  }
}

// ---- Barra de respuesta (reply bar) ----
function _getOrCreateReplyBar() {
  // Buscar input container del chat activo
  const inputWrap = document.querySelector('.chat-input-bar') ||
                    document.querySelector('.wa-input-bar')   ||
                    document.querySelector('#chatInputWrap');
  if (!inputWrap) return null;
  let bar = document.getElementById('chatReplyBar');
  if (!bar) {
    bar = document.createElement('div');
    bar.id = 'chatReplyBar';
    bar.className = 'chat-reply-bar';
    bar.style.display = 'none';
    bar.innerHTML = `<i class="fas fa-reply" style="color:var(--primary);font-size:.85rem;flex-shrink:0"></i>
      <span class="reply-text"></span>
      <button class="reply-close" onclick="dismissReplyBar()" title="Cancelar">
        <i class="fas fa-times"></i>
      </button>`;
    inputWrap.insertBefore(bar, inputWrap.firstChild);
  }
  return bar;
}

function dismissReplyBar() {
  const bar = document.getElementById('chatReplyBar');
  if (bar) { bar.style.display = 'none'; bar.dataset.quoteId = ''; }
}

// ---- Parche al renderizador: agrega reacciones, iconos de fijado/destacado,
//      y event listeners para hover-bar y menú contextual ----
(function patchRenderForReactions() {
  const _origRender = window._renderMsgsInto;
  if (!_origRender) return;

  window._renderMsgsInto = function(container, bizId) {
    _origRender.call(this, container, bizId);

    const msgs = _getMsgs(bizId);
    container.querySelectorAll('.chat-msg-row').forEach((row, i) => {
      const msg = msgs[i];
      if (!msg) return;
      const isOut = msg.from === 'user';
      const bubble = row.querySelector('.chat-bubble');
      if (!bubble) return;

      // 1. Ícono de fijado
      if (msg.pinned) {
        const meta = bubble.querySelector('.chat-bubble-meta');
        if (meta && !meta.querySelector('.chat-bubble-pinned-icon')) {
          const pin = document.createElement('span');
          pin.className = 'chat-bubble-pinned-icon';
          pin.innerHTML = '<i class="fas fa-thumbtack"></i>';
          pin.title = 'Fijado';
          meta.insertBefore(pin, meta.firstChild);
        }
      }

      // 2. Ícono de destacado
      if (msg.starred) {
        const meta = bubble.querySelector('.chat-bubble-meta');
        if (meta && !meta.querySelector('.chat-bubble-starred-icon')) {
          const star = document.createElement('span');
          star.className = 'chat-bubble-starred-icon';
          star.innerHTML = '<i class="fas fa-star"></i>';
          star.title = 'Destacado';
          meta.insertBefore(star, meta.firstChild);
        }
      }

      // 3. Cita (reply quote)
      if (msg.quoteText && !bubble.querySelector('.chat-bubble-quote')) {
        const quote = document.createElement('div');
        quote.className = 'chat-bubble-quote';
        quote.textContent = msg.quoteText;
        bubble.insertBefore(quote, bubble.firstChild);
      }

      // 4. Badges de reacciones — envolver bubble en .chat-bubble-wrap
      let wrap = bubble.closest('.chat-bubble-wrap');
      if (!wrap) {
        wrap = document.createElement('div');
        wrap.className = 'chat-bubble-wrap';
        bubble.parentNode.insertBefore(wrap, bubble);
        wrap.appendChild(bubble);
      }
      wrap.querySelectorAll('.chat-bubble-reactions').forEach(el => el.remove());
      row.classList.remove('has-reactions');
      const badgesHTML = _buildReactionBadgesHTML(bizId, msg.id);
      if (badgesHTML) {
        wrap.insertAdjacentHTML('beforeend', badgesHTML);
        row.classList.add('has-reactions');
      }

      // 5b. Botón chevron ∨ dentro del bubble (abre menú contextual completo)
      let wrapForChevron = bubble.closest('.chat-bubble-wrap') || bubble.parentElement;
      if (wrapForChevron && !wrapForChevron.querySelector('.chat-bubble-menu-btn')) {
        const chevron = document.createElement('button');
        chevron.className = 'chat-bubble-menu-btn';
        chevron.title = 'Opciones';
        chevron.innerHTML = '<i class="fas fa-chevron-down"></i>';
        chevron.addEventListener('click', (e) => {
          e.stopPropagation();
          openMsgBubbleCtxMenu(e, bizId, msg.id, isOut);
        });
        wrapForChevron.appendChild(chevron);
      }

      // 6. Clic derecho → menú contextual
      row.addEventListener('contextmenu', (e) => {
        openMsgBubbleCtxMenu(e, bizId, msg.id, isOut);
      });

      // 7. Long press (móvil) → menú contextual
      let _lpTimer = null;
      row.addEventListener('touchstart', (e) => {
        _lpTimer = setTimeout(() => openMsgBubbleCtxMenu(e, bizId, msg.id, isOut), 500);
      }, { passive: true });
      row.addEventListener('touchend',  () => clearTimeout(_lpTimer));
      row.addEventListener('touchmove', () => clearTimeout(_lpTimer));
    });
  };
})();

// ── Barra de reacciones flotante global (shared, one instance) ──────────────
let _reactBarBizId = null;
let _reactBarMsgId = null;

function _getOrCreateReactBar() {
  let bar = document.getElementById('globalReactionBar');
  if (!bar) {
    bar = document.createElement('div');
    bar.id = 'globalReactionBar';
    bar.className = 'chat-reaction-bar';
    document.body.appendChild(bar);
    // Cerrar al hacer clic fuera de la barra
    document.addEventListener('click', (e) => {
      if (!bar.contains(e.target)) _closeReactionBar();
    }, true);
  }
  return bar;
}

function _openReactionBar(triggerEvent, bizId, msgId, isOut, onClose) {
  const bar = _getOrCreateReactBar();
  _reactBarBizId = bizId;
  _reactBarMsgId = msgId;

  const reactions = _getReactions(bizId);
  const mine = reactions[msgId] && reactions[msgId]['__mine__'];

  bar.innerHTML = QUICK_REACTIONS.map(em => {
    const reacted = mine === em ? 'reacted' : '';
    return `<button class="chat-reaction-btn ${reacted}"
      onclick="event.stopPropagation();toggleMsgReaction('${bizId}','${msgId}','${em}');_closeReactionBar();"
      title="${em}">${em}</button>`;
  }).join('') +
  `<button class="react-more"
    onclick="event.stopPropagation();_closeReactionBar();openReactionEmojiPicker('${bizId}','${msgId}');"
    title="Más emojis">+</button>`;

  // Guardar callback para cuando se cierre
  bar._onClose = onClose || null;

  // Posicionar encima del botón que la disparó
  bar.classList.remove('open');
  bar.style.visibility = 'hidden';
  bar.classList.add('open');

  requestAnimationFrame(() => {
    const btnRect = triggerEvent.currentTarget
      ? triggerEvent.currentTarget.getBoundingClientRect()
      : { left: triggerEvent.clientX, top: triggerEvent.clientY, width: 0, height: 0 };
    const barRect = bar.getBoundingClientRect();
    const vw = window.innerWidth;

    let x = isOut
      ? btnRect.left - barRect.width + btnRect.width + 8
      : btnRect.left - 8;
    let y = btnRect.top - barRect.height - 8;

    if (x + barRect.width > vw - 8) x = vw - barRect.width - 8;
    if (x < 8) x = 8;
    if (y < 8) y = btnRect.bottom + 8;

    bar.style.left       = x + 'px';
    bar.style.top        = y + 'px';
    bar.style.visibility = '';
  });
}

function _closeReactionBar() {
  const bar = document.getElementById('globalReactionBar');
  if (bar) {
    if (typeof bar._onClose === 'function') bar._onClose();
    bar._onClose = null;
    bar.classList.remove('open');
  }
  _reactBarBizId = null;
  _reactBarMsgId = null;
}

/* (botón "+")Reutiliza el emoji picker existente se aplica como reacción al mensaje en lugar de insertarlo en el input*/

// Estado del modo reacción
let _reactionPickerBizId = null;
let _reactionPickerMsgId = null;

function openReactionEmojiPicker(bizId, msgId) {
  _reactionPickerBizId = bizId;
  _reactionPickerMsgId = msgId;

  // Construir tabs si no existen
  const tabsEl = document.getElementById('emojiPickerTabs');
  if (tabsEl && !tabsEl.children.length) {
    tabsEl.innerHTML = EMOJI_CATS.map((cat, i) =>
      `<button class="emoji-tab-btn${i === 0 ? ' active' : ''}" onclick="emojiSelectCat(${i})" title="${cat.label}">${cat.icon}</button>`
    ).join('');
  }

  // aplique la reacción al mensaje activo h
  window._prevInsertEmoji = window.insertEmoji;
  window.insertEmoji = function(emoji) {
    if (_reactionPickerBizId && _reactionPickerMsgId) {
      toggleMsgReaction(_reactionPickerBizId, _reactionPickerMsgId, emoji);
    }
    // Restaurar comportamiento normal y cerrar picker
    window.insertEmoji = window._prevInsertEmoji;
    _reactionPickerBizId = null;
    _reactionPickerMsgId = null;
    closeEmojiPicker();
  };

  // Mostrar titulo de "Escoge una reaccion" en el picker
  const picker = document.getElementById('emojiPicker');
  if (picker) {
    let lbl = picker.querySelector('.emoji-reaction-label');
    if (!lbl) {
      lbl = document.createElement('div');
      lbl.className = 'emoji-reaction-label';
      picker.insertBefore(lbl, picker.firstChild);
    }
    lbl.textContent = 'Escoge una reacción';
    lbl.style.cssText = 'font-size:.75rem;color:var(--primary,#67b8b4);font-weight:600;padding:6px 12px 0;';
  }

  // Renderizar primera categoria y abrir
  renderEmojiCat(0);
  document.getElementById('emojiSearch').value = '';
  document.getElementById('emojiOverlay').classList.add('open');
  document.getElementById('emojiPicker').classList.add('open');

  // Al cerrar el overlay (clic en overlay o Escape) restaurar insertEmoji
  const overlayEl = document.getElementById('emojiOverlay');
  const _restore = () => {
    if (window.insertEmoji !== window._prevInsertEmoji && window._prevInsertEmoji) {
      window.insertEmoji = window._prevInsertEmoji;
    }
    _reactionPickerBizId = null;
    _reactionPickerMsgId = null;
    // quitar el label
    const lbl = document.getElementById('emojiPicker')?.querySelector('.emoji-reaction-label');
    if (lbl) lbl.remove();
    overlayEl.removeEventListener('click', _restore);
  };
  overlayEl.addEventListener('click', _restore, { once: true });
}

// ---- cerrar menu al hacer clic fuera ----
document.addEventListener('click', (e) => {
  const menu = document.getElementById('msgBubbleCtxMenu');
  if (menu && menu.classList.contains('open') && !menu.contains(e.target)) {
    closeMsgBubbleCtxMenu();
  }
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeMsgBubbleCtxMenu();
    // Si el picker estaba en modo reaccion, restaurar insertEmoji
    if (_reactionPickerBizId && window._prevInsertEmoji) {
      window.insertEmoji = window._prevInsertEmoji;
      _reactionPickerBizId = null;
      _reactionPickerMsgId = null;
    }
  }
});


/* Modal con "Eliminar para todos" whatsApp de temu/ "Eliminar para mí" */

let _deleteMsgBizId = null;
let _deleteMsgId    = null;

function openDeleteMsgModal(bizId, msgId) {
  _deleteMsgBizId = bizId;
  _deleteMsgId    = msgId;
  const overlay = document.getElementById('deleteMsgOverlay');
  const modal   = document.getElementById('deleteMsgModal');
  if (!overlay || !modal) return;
  overlay.style.display = 'block';
  modal.style.display   = 'block';
}

function closeDeleteMsgModal() {
  const overlay = document.getElementById('deleteMsgOverlay');
  const modal   = document.getElementById('deleteMsgModal');
  if (overlay) overlay.style.display = 'none';
  if (modal)   modal.style.display   = 'none';
  _deleteMsgBizId = null;
  _deleteMsgId    = null;
}

function confirmDeleteMsg(type) {
  const bizId = _deleteMsgBizId;
  const msgId = _deleteMsgId;
  closeDeleteMsgModal();
  if (!bizId || !msgId) return;

  const msgs = _getMsgs(bizId);
  const msg  = msgs.find(m => String(m.id) === String(msgId));
  if (!msg) return;

  if (type === 'me') {
    // Solo para mí marcar como hidden, no se renderiza
    msg.deletedForMe = true;
    _saveMsgs(bizId, msgs);
    showToast('Mensaje eliminado');
  } else {
    // Para todos reemplazar contenido con aviso
    msg.deletedForAll = true;
    msg.text  = '';
    msg.attach = null;
    _saveMsgs(bizId, msgs);
    showToast('Mensaje eliminado para todos');
  }

  // Re-renderizar
  const _rf = window.innerWidth >= 769 ? renderChatMessages : renderChatMessagesMobile;
  if (typeof _rf === 'function') _rf(bizId);
}

/*SELECCIÓN DE MENSAJES Checkboxes + barra inferior con "X seleccionados" no sirve hay que correjirlo */

let _selectModeBizId  = null;
const _selectedMsgIds = new Set();

function enterSelectMode(bizId, firstMsgId) {
  _selectModeBizId = bizId;
  _selectedMsgIds.clear();
  if (firstMsgId) _selectedMsgIds.add(String(firstMsgId));

  document.body.classList.add('select-mode');
  _renderSelectCheckboxes(bizId);
  _updateSelectBar();
  document.getElementById('msgSelectBar').style.display = 'flex';
}

function exitSelectMode() {
  document.body.classList.remove('select-mode');
  _selectedMsgIds.clear();
  _selectModeBizId = null;

  // Quitar checkboxes del DOM
  document.querySelectorAll('.msg-checkbox').forEach(el => el.remove());
  document.querySelectorAll('.chat-msg-row').forEach(r => r.classList.remove('selected-msg'));
  document.getElementById('msgSelectBar').style.display = 'none';
}

function _renderSelectCheckboxes(bizId) {
  const msgs = _getMsgs(bizId);
  const containers = [
    document.getElementById('chatMessages'),
    document.getElementById('chatMessagesMobile')
  ];
  containers.forEach(container => {
    if (!container) return;
    container.querySelectorAll('.chat-msg-row').forEach((row, i) => {
      if (row.querySelector('.msg-checkbox')) return;
      const msg = msgs[i];
      if (!msg) return;
      const cb = document.createElement('input');
      cb.type  = 'checkbox';
      cb.className = 'msg-checkbox';
      cb.checked   = _selectedMsgIds.has(String(msg.id));
      cb.addEventListener('change', () => {
        if (cb.checked) {
          _selectedMsgIds.add(String(msg.id));
          row.classList.add('selected-msg');
        } else {
          _selectedMsgIds.delete(String(msg.id));
          row.classList.remove('selected-msg');
        }
        _updateSelectBar();
      });
      if (row.classList.contains('out')) {
        row.appendChild(cb);
      } else {
        row.insertBefore(cb, row.firstChild);
      }
      // Marcar si ya estaba seleccionado
      if (_selectedMsgIds.has(String(msg.id))) row.classList.add('selected-msg');
    });
  });
}

function _updateSelectBar() {
  const n = _selectedMsgIds.size;
  const countEl = document.getElementById('msgSelectCount');
  if (countEl) countEl.textContent = `${n} seleccionado${n !== 1 ? 's' : ''}`;
  // Habilitar/deshabilitar botones según si hay selección
  document.querySelectorAll('.msg-select-action').forEach(btn => {
    btn.style.opacity = n > 0 ? '1' : '.35';
    btn.disabled = n === 0;
  });
}

function deleteSelectedMsgs() {
  if (!_selectModeBizId || !_selectedMsgIds.size) return;
  openDeleteMsgModal(_selectModeBizId, [..._selectedMsgIds][0]);
  // Sobreescribir temporalmente confirmDeleteMsg para manejar múltiples mensajes
  const _origConfirm = window.confirmDeleteMsg;
  window.confirmDeleteMsg = function(type) {
    window.confirmDeleteMsg = _origConfirm;
    const bizId = _deleteMsgBizId;
    closeDeleteMsgModal();
    if (!bizId) return;
    const msgs = _getMsgs(bizId);
    _selectedMsgIds.forEach(mid => {
      const m = msgs.find(x => String(x.id) === String(mid));
      if (!m) return;
      if (type === 'me') {
        m.deletedForMe = true;
      } else {
        m.deletedForAll = true;
        m.text  = '';
        m.attach = null;
      }
    });
    _saveMsgs(bizId, msgs);
    showToast(type === 'me' ? 'Mensajes eliminados' : 'Mensajes eliminados para todos');
    exitSelectMode();
    const _rf = window.innerWidth >= 769 ? renderChatMessages : renderChatMessagesMobile;
    if (typeof _rf === 'function') _rf(bizId);
  };
}

function shareSelectedMsgs() {
  if (!_selectedMsgIds.size) return;
  const bizId = _selectModeBizId;
  const msgs  = _getMsgs(bizId);
  const texts = [..._selectedMsgIds].map(mid => {
    const m = msgs.find(x => String(x.id) === String(mid));
    if (!m || m.deletedForMe || m.deletedForAll) return null;
    const who = m.from === 'user' ? 'Yo' : 'Negocio';
    return `[${m.time}] ${who}: ${m.text || '[Adjunto]'}`;
  }).filter(Boolean);

  const shareText = texts.join('\n');
  if (navigator.share) {
    navigator.share({ text: shareText }).catch(() => {});
  } else if (navigator.clipboard) {
    navigator.clipboard.writeText(shareText);
    showToast(`${_selectedMsgIds.size} mensaje${_selectedMsgIds.size !== 1 ? 's' : ''} copiado${_selectedMsgIds.size !== 1 ? 's' : ''}`);
  }
  exitSelectMode();
}
//  mostrar el bubble especial para "eliminado para todos"
(function patchRenderForDeleted() {
  const _prev = window._renderMsgsInto;
  if (!_prev) return;
  window._renderMsgsInto = function(container, bizId) {
    // Filtrar temporalmente los deletedForMe antes de renderizar
    const _origGet = window._getMsgs;
    window._getMsgs = function(id) {
      const all = _origGet(id);
      return all.filter(m => !m.deletedForMe);
    };
    _prev.call(this, container, bizId);
    window._getMsgs = _origGet;

    // Marcar bubbles deletedForAll con clase especial
    const allMsgs = _origGet(bizId).filter(m => !m.deletedForMe);
    container.querySelectorAll('.chat-msg-row').forEach((row, i) => {
      const msg = allMsgs[i];
      if (!msg || !msg.deletedForAll) return;
      const bubble = row.querySelector('.chat-bubble');
      if (!bubble) return;
      bubble.classList.add('deleted-for-all');
      // Reemplazar contenido con el aviso
      const isOut = msg.from === 'user';
      const icon  = isOut ? '🚫' : '🚫';
      const label = isOut ? 'Eliminaste este mensaje.' : 'Se eliminó este mensaje.';
      // Preservar solo la meta (tiempo + ticks)
      const meta = bubble.querySelector('.chat-bubble-meta');
      bubble.innerHTML = `<span style="opacity:.7">${icon} ${label}</span>`;
      if (meta) bubble.appendChild(meta);
    });

    // Re-aplicar checkboxes si estamos en modo selección
    if (document.body.classList.contains('select-mode') && _selectModeBizId === bizId) {
      _renderSelectCheckboxes(bizId);
    }
  };
})();


/*Se muestra solo si el usuario no tiene sesión y no lo ha descartado en esta visita*/