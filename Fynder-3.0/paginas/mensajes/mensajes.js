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
