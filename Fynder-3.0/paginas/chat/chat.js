/**
 * ═══════════════════════════════════════════════════════════════
 *  Fynder — JS de: chat
 *  Extraído de fynder.js (mensajes.js)
 *
 *  Las funciones GLOBALES (goPage, showToast, etc.) están en
 *  shared/fynder.js — las funciones del sistema de mensajes
 *  están en pages/mensajes/mensajes.js.
 *  Este archivo es de referencia; la lógica del chat móvil
 *  (sendChatMessageMobile, toggleEmojiPickerMobile, etc.)
 *  vive en mensajes.js.
 * ═══════════════════════════════════════════════════════════════
 */

/* ── Abrir perfil del negocio desde el chat móvil ── */
function openChatProfile() {
  goPage('chat-profile');
}
