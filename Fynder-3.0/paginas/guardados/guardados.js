(function(){
function renderFavorites(){
  const el = document.getElementById('favsResults');
  const fc = document.getElementById('favsCount');

  // Si no hay sesión, mostrar estado de "requiere login"
  if (!localStorage.getItem('fynderLogged')) {
    if (fc) fc.textContent = '0 negocios guardados';
    el.innerHTML = `
      <div class="empty-state">
        <div class="fav-empty-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
        </div>
        <div class="empty-title">Inicia sesión para ver tus guardados</div>
        <div class="empty-desc" style="max-width:360px">Crea una cuenta o inicia sesión para guardar tus negocios favoritos y acceder a ellos en cualquier momento.</div>
        <button onclick="goPage('login')" style="margin-top:20px;padding:11px 28px;border-radius:14px;border:none;background:var(--primary);color:#fff;font-family:'Poppins',sans-serif;font-size:.875rem;font-weight:600;cursor:pointer;display:inline-flex;align-items:center;gap:8px;">
          <i class="fas fa-right-to-bracket"></i> Iniciar sesión
        </button>
      </div>`;
    return;
  }

  const favs = BUSINESSES.filter(b => favorites.has(b.id));
  if (fc) fc.textContent = `${favs.length} negocio${favs.length!==1?'s':''} guardado${favs.length!==1?'s':''}`;
  el.innerHTML = favs.length === 0
    ? `<div class="empty-state"><div class="fav-empty-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg></div><div class="empty-title">Tu lista está vacía</div><div class="empty-desc" style="max-width:360px">Guarda tus negocios favoritos tocando el ícono del corazón.</div></div>`
    : `<div class="cards-grid">${favs.map(gridCardHTML).join('')}</div>`;
} 

buildCategories();buildHome();updateNav();
// drag scroll en filtros
// tambien se llama desde goPage
document.addEventListener('DOMContentLoaded', ()=>{ setTimeout(initCatFiltersDrag, 200); });
})();