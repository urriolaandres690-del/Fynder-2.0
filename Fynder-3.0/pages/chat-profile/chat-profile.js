/**
 * ═══════════════════════════════════════════════════════════════
 *  Fynder — JS de: chat-profile
 *  Extraído de fynder.js (mensajes.js)
 *
 *  Las funciones GLOBALES (goPage, showToast, openModal, etc.)
 *  están en shared/fynder.js — las funciones del sistema de
 *  mensajes (cproGoBack, cproCall, cproWhatsApp, etc.) viven
 *  en pages/mensajes/mensajes.js.
 *  Este archivo es de referencia para funciones específicas
 *  del perfil de negocio en el chat.
 * ═══════════════════════════════════════════════════════════════
 */

/* ── Navegación ── */
function cproGoBack() {
  const isDesktop = window.innerWidth >= 769;
  if (isDesktop) {
    closeWaChatInfoPanel();
  } else {
    goPage('chat');
  }
}

/* ── Menú contextual ── */
function toggleCproMenu(btn) {
  const menu = document.getElementById('cproCtxMenu');
  if (!menu) return;
  const isVisible = menu.style.display !== 'none';
  menu.style.display = isVisible ? 'none' : 'block';
}

function closeCproMenu() {
  const menu = document.getElementById('cproCtxMenu');
  if (menu) menu.style.display = 'none';
}

/* ── Compartir perfil ── */
function cproShareProfile() {
  showToast('Compartir perfil próximamente');
}

/* ── Buscar en el chat ── */
function cproSearchInChat() {
  showToast('Búsqueda en el chat próximamente');
}
