/**
 * ═══════════════════════════════════════════════════════════════
 *  Fynder — JS de: bienvenida-modal
 *  Extraído de fynder.js
 *
 *  Las funciones GLOBALES (goPage, toggleFav, showToast, etc.)
 *  están en shared/fynder.js — este archivo contiene solo
 *  las funciones específicas de esta sección.
 * ═══════════════════════════════════════════════════════════════
 */

/*Se muestra solo si el usuario no tiene sesión y no lo ha descartado en esta visita*/
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

