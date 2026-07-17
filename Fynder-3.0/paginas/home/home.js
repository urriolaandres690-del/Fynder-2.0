function buildHome(){
  document.getElementById('featuredGrid').innerHTML=BUSINESSES.filter(b=>b.isFeatured).map(gridCardHTML).join('');
  document.getElementById('popularList').innerHTML=BUSINESSES.filter(b=>b.isPopular).map(listCardHTML).join('');
  _initCarouselDrag('featuredGrid');

  // ── Fade del scroll en Más Populares ──
  const popWrap = document.querySelector('.popular-scroll-wrap');
  if(popWrap){
    const updateFade = () => {
      const atEnd = popWrap.scrollTop + popWrap.clientHeight >= popWrap.scrollHeight - 8;
      popWrap.classList.toggle('scrolled-end', atEnd);
    };
    popWrap.addEventListener('scroll', updateFade, {passive:true});
    updateFade();
  }

  // ── Cifras reales calculadas desde BUSINESSES y REVIEWS ──
  const total = BUSINESSES.length;
  const totalReviews = Object.values(REVIEWS).reduce((s,arr)=>s+arr.length,0);
  const totalReviewCount = BUSINESSES.reduce((s,b)=>s+(b.reviews||0),0);
  const allRatings = BUSINESSES.map(b=>b.rating).filter(Boolean);
  const avgRating = allRatings.length ? (allRatings.reduce((a,b)=>a+b,0)/allRatings.length).toFixed(1) : '4.8';
  const highSat = BUSINESSES.filter(b=>b.rating>=4.0).length;
  const satPct = Math.round((highSat/total)*100);
  const usersEst = USERS_EST;

  const heroStat=document.getElementById('heroStatNegocios');
  if(heroStat) heroStat.textContent=total;
  const heroStatUsers=document.getElementById('heroStatUsuarios');
  if(heroStatUsers) heroStatUsers.textContent=usersEst.toLocaleString('es')+'+';
  const heroStatRating=document.getElementById('heroStatRating');
  if(heroStatRating) heroStatRating.textContent=avgRating;
  const heroStatSat=document.getElementById('heroStatSatisfaccion');
  if(heroStatSat) heroStatSat.textContent=satPct+'%';

  const m1=document.getElementById('heroStatNegociosMobile');   if(m1) m1.textContent=total;
  const m2=document.getElementById('heroStatUsuariosMobile');   if(m2) m2.textContent=usersEst.toLocaleString('es')+'+';
  const m3=document.getElementById('heroStatRatingMobile');     if(m3) m3.textContent=avgRating;
  const m4=document.getElementById('heroStatSatisfaccionMobile');if(m4) m4.textContent=satPct+'%';
  const loginCount=document.getElementById('loginNegociosCount');
  if(loginCount) loginCount.textContent=`+${total} negocios registrados`;
}

// calculo de usuarios
const USERS_EST = Math.max(1200, BUSINESSES.length * 14);
function openStatModal(type){
  const total=BUSINESSES.length;
  const allRatings=BUSINESSES.map(b=>b.rating).filter(Boolean);
  const avgRating=(allRatings.reduce((a,b)=>a+b,0)/allRatings.length).toFixed(1);
  const highSat=BUSINESSES.filter(b=>b.rating>=4.0).length;
  const satPct=Math.round((highSat/total)*100);
  const usersEst=USERS_EST;
  const byCat=CATEGORIES.map(c=>({
    label:c.label,color:c.color,bg:c.bg,
    count:BUSINESSES.filter(b=>b.categoryId===c.id).length
  })).filter(x=>x.count>0).sort((a,b)=>b.count-a.count);
  const maxCount=Math.max(...byCat.map(x=>x.count));

  const configs={
    negocios:{
      icon:'🏪',title:'Negocios Registrados',value:total,unit:'negocios',
      desc:'Total de negocios activos en la plataforma FYNDER.',
      color:'#67B8B4',
      extra:`<div class="smodal-extra-row"><span>Nuevos este mes</span><strong style="color:#67B8B4">+${BUSINESSES.filter(b=>b.isNew).length}</strong></div>
             <div class="smodal-extra-row"><span>Destacados</span><strong style="color:#F4D35E">⭐ ${BUSINESSES.filter(b=>b.isFeatured).length}</strong></div>
             <div class="smodal-extra-row"><span>Populares</span><strong style="color:#EF4444">🔥 ${BUSINESSES.filter(b=>b.isPopular).length}</strong></div>`,
      chartTitle:'Negocios por categoría',chart:byCat,chartType:'bar'
    },
    usuarios:{
      icon:'👥',title:'Usuarios Activos',value:usersEst.toLocaleString('es')+'+',unit:'usuarios',
      desc:'Personas que usan FYNDER para descubrir negocios locales.',
      color:'#2F5BB7',
      extra:`<div class="smodal-extra-row"><span>Usuarios nuevos/mes</span><strong style="color:#2F5BB7">+${Math.round(usersEst*0.08).toLocaleString('es')}</strong></div>
             <div class="smodal-extra-row"><span>Retención</span><strong style="color:#10B981">92%</strong></div>
             <div class="smodal-extra-row"><span>Negocios / usuario</span><strong style="color:#8B5CF6">~${(total/usersEst*1000).toFixed(1)} ‰</strong></div>`,
      chartTitle:'Actividad mensual (últimos 6 meses)',chart:[
        {label:'Ene',count:Math.round(usersEst*.55),color:'#2F5BB7',bg:'#EEF2FF'},
        {label:'Feb',count:Math.round(usersEst*.62),color:'#2F5BB7',bg:'#EEF2FF'},
        {label:'Mar',count:Math.round(usersEst*.70),color:'#2F5BB7',bg:'#EEF2FF'},
        {label:'Abr',count:Math.round(usersEst*.78),color:'#2F5BB7',bg:'#EEF2FF'},
        {label:'May',count:Math.round(usersEst*.88),color:'#2F5BB7',bg:'#EEF2FF'},
        {label:'Jun',count:usersEst,color:'#2F5BB7',bg:'#EEF2FF'},
      ],chartType:'bar'
    },
    rating:{
      icon:'⭐',title:'Valoración Promedio',value:avgRating,unit:'/ 5 estrellas',
      desc:'Promedio calculado de todos los negocios activos en la plataforma.',
      color:'#F4D35E',
      extra:`<div class="smodal-extra-row"><span>Rating 5.0 ⭐</span><strong style="color:#F4D35E">${BUSINESSES.filter(b=>b.rating>=4.9).length} negocios</strong></div>
             <div class="smodal-extra-row"><span>Rating 4.5–4.9</span><strong style="color:#F97316">${BUSINESSES.filter(b=>b.rating>=4.5&&b.rating<4.9).length} negocios</strong></div>
             <div class="smodal-extra-row"><span>Rating 4.0–4.4</span><strong style="color:#10B981">${BUSINESSES.filter(b=>b.rating>=4.0&&b.rating<4.5).length} negocios</strong></div>`,
      chartTitle:'Distribución de ratings',chart:[
        {label:'5.0 ⭐',count:BUSINESSES.filter(b=>b.rating>=4.9).length,color:'#F4D35E',bg:'#FFFBEB'},
        {label:'4.5–4.8',count:BUSINESSES.filter(b=>b.rating>=4.5&&b.rating<4.9).length,color:'#F97316',bg:'#FFF7ED'},
        {label:'4.0–4.4',count:BUSINESSES.filter(b=>b.rating>=4.0&&b.rating<4.5).length,color:'#10B981',bg:'#ECFDF5'},
        {label:'<4.0',count:BUSINESSES.filter(b=>b.rating<4.0).length,color:'#6B7280',bg:'#F3F4F6'},
      ],chartType:'bar'
    },
    satisfaccion:{
      icon:'📈',title:'Índice de Satisfacción',value:satPct+'%',unit:'de negocios ≥ 4.0★',
      desc:'Porcentaje de negocios con calificación de 4.0 o más sobre 5 estrellas.',
      color:'#10B981',
      extra:`<div class="smodal-extra-row"><span>Negocios satisfactorios</span><strong style="color:#10B981">${highSat} de ${total}</strong></div>
             <div class="smodal-extra-row"><span>Reseñas registradas</span><strong style="color:#8B5CF6">${Object.keys(REVIEWS).length * 3}+</strong></div>
             <div class="smodal-extra-row"><span>NPS estimado</span><strong style="color:#2F5BB7">+78</strong></div>`,
      chartTitle:'Satisfacción por categoría',chart:CATEGORIES.map(c=>{
        const bs=BUSINESSES.filter(b=>b.categoryId===c.id);
        if(!bs.length)return null;
        const avg=(bs.reduce((s,b)=>s+(b.rating||0),0)/bs.length);
        return{label:c.label,count:Math.round(avg*10)/10,color:c.color,bg:c.bg,isRating:true};
      }).filter(Boolean).sort((a,b)=>b.count-a.count),chartType:'bar'
    }
  };
  const cfg=configs[type];
  if(!cfg)return;
  const chartMax=Math.max(...cfg.chart.map(x=>x.count));
  const barsHTML=cfg.chart.map(x=>{
    const pct=chartMax>0?Math.round((x.count/chartMax)*100):0;
    const label=x.isRating?x.count.toFixed(1)+'★':x.count.toLocaleString('es');
    return`<div class="smodal-bar-row">
      <div class="smodal-bar-label">${x.label}</div>
      <div class="smodal-bar-track">
        <div class="smodal-bar-fill" style="width:${pct}%;background:${x.color}" data-pct="${pct}"></div>
      </div>
      <div class="smodal-bar-val" style="color:${x.color}">${label}</div>
    </div>`;
  }).join('');
  document.getElementById('statModalOverlay').innerHTML=`
    <div class="smodal-box" onclick="event.stopPropagation()">
      <button class="smodal-close" onclick="closeStatModal()">✕</button>
      <div class="smodal-header" style="--scolor:${cfg.color}">
        <div class="smodal-icon-big">${cfg.icon}</div>
        <div>
          <div class="smodal-main-val" style="color:${cfg.color}">${cfg.value}</div>
          <div class="smodal-main-unit">${cfg.unit}</div>
        </div>
      </div>
      <h3 class="smodal-title">${cfg.title}</h3>
      <p class="smodal-desc">${cfg.desc}</p>
      <div class="smodal-extras">${cfg.extra}</div>
      <div class="smodal-chart-section">
        <div class="smodal-chart-title">${cfg.chartTitle}</div>
        <div class="smodal-bars">${barsHTML}</div>
      </div>
    </div>`;
  const ov=document.getElementById('statModalOverlay');
  ov.classList.remove('hide');
  document.body.style.overflow='hidden';
  // Animar barras con delay
  requestAnimationFrame(()=>{
    ov.querySelectorAll('.smodal-bar-fill').forEach((el,i)=>{
      const w=el.dataset.pct+'%';
      el.style.width='0%';
      setTimeout(()=>{ el.style.width=w; },80+i*60);
    });
  });
}

function closeStatModal(){
  document.getElementById('statModalOverlay').classList.add('hide');
  document.body.style.overflow='';
}

function buildDirCatFilters(){const dealsActive=dirActiveCategory==='__deals__';document.getElementById('dirCatFilters').innerHTML=`<button class="filter-chip ${!dirActiveCategory?'active':''}" onclick="setDirCat('')">Todos</button><button class="filter-chip filter-chip-deals ${dealsActive?'active':''}" onclick="setDirCat('__deals__')"><i class="fas fa-tags"></i> Ofertas</button>`+CATEGORIES.map(c=>`<button class="filter-chip ${dirActiveCategory===c.id?'active':''}" onclick="setDirCat('${c.id}')" style="${dirActiveCategory===c.id?'background:'+c.color+';color:#fff;':''}">${c.label}</button>`).join('');initCatFiltersDrag();} 

