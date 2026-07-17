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

function openStatModal(type){
  const total=BUSINESSES.length;
  const allRatings=BUSINESSES.map(b=>b.rating).filter(Boolean);
  const avgRating=(allRatings.reduce((a,b)=>a+b,0)/allRatings.length).toFixed(1);
  const highSat=BUSINESSES.filter(b=>b.rating>=4.0).length;
  const satPct=Math.round((highSat/total)*100);
  const byCat=CATEGORIES.map(c=>({label:c.label,color:c.color,bg:c.bg,count:BUSINESSES.filter(b=>b.categoryId===c.id).length})).filter(x=>x.count>0).sort((a,b)=>b.count-a.count);
  const configs={
    negocios:{icon:'🏪',title:'Negocios Registrados',value:total,unit:'negocios',desc:'Total de negocios activos en FYNDER.',color:'#67B8B4',
      extra:`<div class="smodal-extra-row"><span>Nuevos este mes</span><strong style="color:#67B8B4">+${BUSINESSES.filter(b=>b.isNew).length}</strong></div><div class="smodal-extra-row"><span>Destacados</span><strong style="color:#F4D35E">⭐ ${BUSINESSES.filter(b=>b.isFeatured).length}</strong></div><div class="smodal-extra-row"><span>Populares</span><strong style="color:#EF4444">🔥 ${BUSINESSES.filter(b=>b.isPopular).length}</strong></div>`,
      chartTitle:'Negocios por categoría',chart:byCat,chartType:'bar'},
    usuarios:{icon:'👥',title:'Usuarios Activos',value:USERS_EST.toLocaleString('es')+'+',unit:'usuarios',desc:'Personas que usan FYNDER.',color:'#2F5BB7',
      extra:`<div class="smodal-extra-row"><span>Nuevos/mes</span><strong style="color:#2F5BB7">+${Math.round(USERS_EST*0.08).toLocaleString('es')}</strong></div><div class="smodal-extra-row"><span>Retención</span><strong style="color:#10B981">92%</strong></div>`,
      chartTitle:'Actividad mensual',chart:[{label:'Ene',count:Math.round(USERS_EST*.55),color:'#2F5BB7',bg:'#EEF2FF'},{label:'Feb',count:Math.round(USERS_EST*.62),color:'#2F5BB7',bg:'#EEF2FF'},{label:'Mar',count:Math.round(USERS_EST*.70),color:'#2F5BB7',bg:'#EEF2FF'},{label:'Abr',count:Math.round(USERS_EST*.78),color:'#2F5BB7',bg:'#EEF2FF'},{label:'May',count:Math.round(USERS_EST*.88),color:'#2F5BB7',bg:'#EEF2FF'},{label:'Jun',count:USERS_EST,color:'#2F5BB7',bg:'#EEF2FF'}],chartType:'bar'},
    rating:{icon:'⭐',title:'Valoración Promedio',value:avgRating,unit:'/ 5 estrellas',desc:'Promedio de todos los negocios.',color:'#F4D35E',
      extra:`<div class="smodal-extra-row"><span>Rating 5.0 ⭐</span><strong style="color:#F4D35E">${BUSINESSES.filter(b=>b.rating>=4.9).length} negocios</strong></div>`,
      chartTitle:'Distribución de ratings',chart:[{label:'5.0 ⭐',count:BUSINESSES.filter(b=>b.rating>=4.9).length,color:'#F4D35E',bg:'#FFFBEB'},{label:'4.5–4.8',count:BUSINESSES.filter(b=>b.rating>=4.5&&b.rating<4.9).length,color:'#F97316',bg:'#FFF7ED'},{label:'4.0–4.4',count:BUSINESSES.filter(b=>b.rating>=4.0&&b.rating<4.5).length,color:'#10B981',bg:'#ECFDF5'},{label:'<4.0',count:BUSINESSES.filter(b=>b.rating<4.0).length,color:'#6B7280',bg:'#F3F4F6'}],chartType:'bar'},
    satisfaccion:{icon:'📈',title:'Índice de Satisfacción',value:satPct+'%',unit:'de negocios ≥ 4.0★',desc:'Negocios con 4.0 o más estrellas.',color:'#10B981',
      extra:`<div class="smodal-extra-row"><span>Satisfactorios</span><strong style="color:#10B981">${highSat} de ${total}</strong></div>`,
      chartTitle:'Satisfacción por categoría',chart:CATEGORIES.map(c=>{const bs=BUSINESSES.filter(b=>b.categoryId===c.id);if(!bs.length)return null;const avg=(bs.reduce((s,b)=>s+(b.rating||0),0)/bs.length);return{label:c.label,count:Math.round(avg*10)/10,color:c.color,bg:c.bg,isRating:true};}).filter(Boolean).sort((a,b)=>b.count-a.count),chartType:'bar'}
  };
  const cfg=configs[type]; if(!cfg)return;
  const chartMax=Math.max(...cfg.chart.map(x=>x.count));
  const barsHTML=cfg.chart.map(x=>{const pct=chartMax>0?Math.round((x.count/chartMax)*100):0;const label=x.isRating?x.count.toFixed(1)+'★':x.count.toLocaleString('es');return`<div class="smodal-bar-row"><div class="smodal-bar-label">${x.label}</div><div class="smodal-bar-track"><div class="smodal-bar-fill" style="width:${pct}%;background:${x.color}" data-pct="${pct}"></div></div><div class="smodal-bar-val" style="color:${x.color}">${label}</div></div>`;}).join('');
  document.getElementById('statModalOverlay').innerHTML=`<div class="smodal-box" onclick="event.stopPropagation()"><button class="smodal-close" onclick="closeStatModal()">✕</button><div class="smodal-header" style="--scolor:${cfg.color}"><div class="smodal-icon-big">${cfg.icon}</div><div><div class="smodal-main-val" style="color:${cfg.color}">${cfg.value}</div><div class="smodal-main-unit">${cfg.unit}</div></div></div><h3 class="smodal-title">${cfg.title}</h3><p class="smodal-desc">${cfg.desc}</p><div class="smodal-extras">${cfg.extra}</div><div class="smodal-chart-section"><div class="smodal-chart-title">${cfg.chartTitle}</div><div class="smodal-bars">${barsHTML}</div></div></div>`;
  const ov=document.getElementById('statModalOverlay');
  ov.classList.remove('hide');
  document.body.style.overflow='hidden';
  requestAnimationFrame(()=>{
    ov.querySelectorAll('.smodal-bar-fill').forEach((el,i)=>{const w=el.dataset.pct+'%';el.style.width='0%';setTimeout(()=>{el.style.width=w;},80+i*60);});
  });
}

function closeStatModal(){
  document.getElementById('statModalOverlay').classList.add('hide');
  document.body.style.overflow='';
}

function heroSearchGo(){
  const q = document.getElementById('heroSearch').value.trim();
  goDirectoryQuery(q);
}

// Inicializar al cargar
buildCategories();
buildHome();
document.addEventListener('DOMContentLoaded', () => { setTimeout(initCatFiltersDrag, 200); });
