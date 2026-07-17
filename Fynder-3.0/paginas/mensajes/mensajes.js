(function(){
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

// ---- Renderizar lista de conversaciones (versión completa con búsqueda y menú contextual) ----

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


(function initWelcomeModal() {
  function _show() {
    // Solo mostrar si NO hay sesión activa
    const logged = localStorage.getItem('fynderLogged') === 'true';
    if (logged) return;

    // Si ya lo descartó en esta carga (no en toda la sesión de pestaña),
    // usar un flag de instancia en memoria — se resetea al recargar
    if (window._fynderWelcomeShown) return;

    const overlay = document.getElementById('welcomeModalOverlay');
    if (!overlay) return;

    window._fynderWelcomeShown = true;
    setTimeout(() => {
      overlay.classList.add('active');
    }, 900);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', _show);
  } else {
    _show();
  }
})();

function closeWelcomeModal(e) {
  if (e && e.target !== document.getElementById('welcomeModalOverlay')) return;
  dismissWelcomeModal();
}

function dismissWelcomeModal() {
  const overlay = document.getElementById('welcomeModalOverlay');
  if (!overlay) return;
  overlay.classList.remove('active');
}
})();