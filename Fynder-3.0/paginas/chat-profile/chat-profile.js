function cproGoBack() {
  const isDesktop = window.innerWidth >= 769;
  if (isDesktop) {
    closeWaChatInfoPanel();
  } else {
    goPage('chat');
  }
}

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

function cproShareProfile() {
  showToast('Compartir perfil próximamente');
}

function cproSearchInChat() {
  showToast('Búsqueda en el chat próximamente');
}
