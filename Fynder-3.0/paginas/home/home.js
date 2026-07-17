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
