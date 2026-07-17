/* ── home.js — Lógica exclusiva de la página de Inicio ── */

function initCatFiltersDrag(){
  const el = document.getElementById('dirCatFilters');
  if(!el) return;
  let isDown=false, startX=0, scrollLeft=0;
  el.addEventListener('mousedown', e => { isDown=true; el.classList.add('dragging'); startX=e.pageX-el.offsetLeft; scrollLeft=el.scrollLeft; });
  el.addEventListener('mouseleave', () => { isDown=false; el.classList.remove('dragging'); });
  el.addEventListener('mouseup',    () => { isDown=false; el.classList.remove('dragging'); });
  el.addEventListener('mousemove',  e => {
    if(!isDown) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    el.scrollLeft = scrollLeft - (x - startX) * 1.2;
  });
}

function buildCategories(){
  const el = document.getElementById('catGrid');
  if(!el) return;
  el.innerHTML = CATEGORIES.map(c => {
    const count = BUSINESSES.filter(b => b.categoryId === c.id).length;
    return `<button class="cat-card" onclick="goDirectoryQuery('','${c.id}')"><div class="cat-icon" style="background:${c.bg};color:${c.color}">${c.svg}</div><div class="cat-name">${c.label}</div><div class="cat-count">${count} negocio${count!==1?'s':''}</div></button>`;
  }).join('');
}

function _initCarouselDrag(id){
  const el = document.getElementById(id);
  if(!el) return;
  let isDown=false, startX=0, scrollLeft=0, moved=false;
  el.addEventListener('mousedown', e => { isDown=true; moved=false; startX=e.pageX-el.offsetLeft; scrollLeft=el.scrollLeft; el.classList.add('is-dragging'); });
  el.addEventListener('mouseleave', () => { isDown=false; el.classList.remove('is-dragging'); });
  el.addEventListener('mouseup',    e => { isDown=false; el.classList.remove('is-dragging'); if(moved) e.stopPropagation(); });
  el.addEventListener('mousemove',  e => {
    if(!isDown) return;
    e.preventDefault();
    const walk = (e.pageX - el.offsetLeft - startX) * 1.4;
    if(Math.abs(walk) > 5) moved = true;
    el.scrollLeft = scrollLeft - walk;
  });
  el.addEventListener('click', e => { if(moved){ e.stopPropagation(); moved=false; } }, true);
}

const USERS_EST = Math.max(1200, BUSINESSES.length * 14);

function buildHome(){
  const featGrid = document.getElementById('featuredGrid');
  if(featGrid) featGrid.innerHTML = BUSINESSES.filter(b=>b.isFeatured).map(gridCardHTML).join('');
  const popList = document.getElementById('popularList');
  if(popList) popList.innerHTML = BUSINESSES.filter(b=>b.isPopular).map(listCardHTML).join('');
  _initCarouselDrag('featuredGrid');

  const popWrap = document.querySelector('.popular-scroll-wrap');
  if(popWrap){
    const updateFade = () => {
      const atEnd = popWrap.scrollTop + popWrap.clientHeight >= popWrap.scrollHeight - 8;
      popWrap.classList.toggle('scrolled-end', atEnd);
    };
    popWrap.addEventListener('scroll', updateFade, {passive:true});
    updateFade();
  }

  const total = BUSINESSES.length;
  const allRatings = BUSINESSES.map(b=>b.rating).filter(Boolean);
  const avgRating = allRatings.length ? (allRatings.reduce((a,b)=>a+b,0)/allRatings.length).toFixed(1) : '4.8';
  const highSat = BUSINESSES.filter(b=>b.rating>=4.0).length;
  const satPct  = Math.round((highSat/total)*100);

  const setEl = (id, val) => { const el=document.getElementById(id); if(el) el.textContent=val; };
  setEl('heroStatNegocios',      total);
  setEl('heroStatUsuarios',      USERS_EST.toLocaleString('es')+'+');
  setEl('heroStatRating',        avgRating);
  setEl('heroStatSatisfaccion',  satPct+'%');
  setEl('heroStatNegociosMobile',    total);
  setEl('heroStatUsuariosMobile',    USERS_EST.toLocaleString('es')+'+');
  setEl('heroStatRatingMobile',      avgRating);
  setEl('heroStatSatisfaccionMobile',satPct+'%');
  setEl('loginNegociosCount',    `+${total} negocios registrados`);
}
