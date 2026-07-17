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
