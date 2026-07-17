/**
 * ═══════════════════════════════════════════════════════════════
 *  Fynder — JS de: directorio
 *  Extraído de fynder.js
 *
 *  Las funciones GLOBALES (goPage, toggleFav, showToast, etc.)
 *  están en shared/fynder.js — este archivo contiene solo
 *  las funciones específicas de esta sección.
 * ═══════════════════════════════════════════════════════════════
 */

function buildDirCatFilters(){const dealsActive=dirActiveCategory==='__deals__';document.getElementById('dirCatFilters').innerHTML=`<button class="filter-chip ${!dirActiveCategory?'active':''}" onclick="setDirCat('')">Todos</button><button class="filter-chip filter-chip-deals ${dealsActive?'active':''}" onclick="setDirCat('__deals__')"><i class="fas fa-tags"></i> Ofertas</button>`+CATEGORIES.map(c=>`<button class="filter-chip ${dirActiveCategory===c.id?'active':''}" onclick="setDirCat('${c.id}')" style="${dirActiveCategory===c.id?'background:'+c.color+';color:#fff;':''}">${c.label}</button>`).join('');initCatFiltersDrag();} 

function setDirCat(id){dirActiveCategory=id;buildDirCatFilters();renderDirectory();} 

function setView(v){dirViewMode=v;document.getElementById('viewGrid').classList.toggle('active',v==='grid');document.getElementById('viewList').classList.toggle('active',v==='list');renderDirectory();} 

function filterDir(){const v=document.getElementById('dirSearch').value;document.getElementById('dirClear').classList.toggle('hide',!v);renderDirectory();} 

function clearDirSearch(){document.getElementById('dirSearch').value='';document.getElementById('dirClear').classList.add('hide');renderDirectory();} 

function renderDirectory(){buildDirCatFilters();const q=document.getElementById('dirSearch').value.toLowerCase().trim();const isDeals=dirActiveCategory==='__deals__';const res=BUSINESSES.filter(b=>{const mc=isDeals?!!b.deal:(!dirActiveCategory||b.categoryId===dirActiveCategory);const mq=!q||b.name.toLowerCase().includes(q)||b.category.toLowerCase().includes(q)||b.tags.some(t=>t.toLowerCase().includes(q))||b.description.toLowerCase().includes(q);return mc&&mq;});const cl=isDeals?'Ofertas':dirActiveCategory?CATEGORIES.find(c=>c.id===dirActiveCategory)?.label:'';document.getElementById('dirCount').innerHTML=`<strong>${res.length}</strong> negocio${res.length!==1?'s':''} encontrado${res.length!==1?'s':''}${cl?` en <span class="highlight">${cl}</span>`:''}`;const el=document.getElementById('dirResults');if(res.length===0){el.innerHTML=`<div class="empty-state"><div class="empty-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg></div><div class="empty-title">Sin resultados</div><div class="empty-desc">Intenta con otra búsqueda o categoría.</div></div>`;return;}el.innerHTML=dirViewMode==='grid'?`<div class="cards-grid">${res.map(gridCardHTML).join('')}</div>`:`<div class="cards-list">${res.map(listCardHTML).join('')}</div>`;} 

function renderFavorites(){
  const el = document.getElementById('favsResults');
  const fc = document.getElementById('favsCount');

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

