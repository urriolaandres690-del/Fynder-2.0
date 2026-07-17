function initAboutPage() {
  spawnAboutParticles();
  animateAboutBars();
  animateAboutCounters();
}

function spawnAboutParticles() {
  const wrap = document.getElementById('aboutParticles');
  if (!wrap) return;
  wrap.innerHTML = '';
  for (let i = 0; i < 18; i++) {
    const p = document.createElement('div');
    p.className = 'about-particle';
    p.style.cssText = `
      left:${Math.random()*100}%;
      top:${40 + Math.random()*50}%;
      animation-delay:${Math.random()*3}s;
      animation-duration:${2.5 + Math.random()*2}s;
      width:${3 + Math.random()*4}px;
      height:${3 + Math.random()*4}px;
      background:rgba(${Math.random()>.5?'103,184,180':'244,211,94'},${0.4+Math.random()*.4});
    `;
    wrap.appendChild(p);
  }
}

function animateAboutBars() {
  const bars = document.querySelectorAll('#page-about .about-impact-bar-fill');
  if (!bars.length) return;
  setTimeout(() => {
    bars.forEach(bar => {
      const w = bar.style.width;
      bar.style.width = '0';
      requestAnimationFrame(() => { bar.style.width = w; });
    });
  }, 300);
}

function animateAboutCounters() {
  // Stat 0: 85 negocios
  animateCount('aStat0', 0, 85, 1200, '', '');
  // Stat 2: 4.8 rating
  animateCount('aStat2', 0, 4.8, 1400, '', '★', 1);
}

function animateCount(id, from, to, duration, prefix, suffix, decimals = 0) {
  const el = document.getElementById(id);
  if (!el) return;
  const start = performance.now();
  function step(now) {
    const p = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    const val = from + (to - from) * ease;
    el.textContent = prefix + (decimals ? val.toFixed(decimals) : Math.round(val)) + suffix;
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}


/* MAPA DE NEGOCIOS — Motor completo */

// Coordenadas de los negocios (Panama City y alrededores)
const BIZ_COORDS = {
  "1":  [8.9936, -79.5197],  // Centro
  "2":  [8.9914, -79.5302],  // Zona Rosa
  "3":  [9.0007, -79.5200],  // Plaza
  "5":  [8.9878, -79.5150],  // Barrio El Jardín
  "6":  [8.9945, -79.5260],  // Col. Médica
  "7":  [9.0021, -79.5185],  // Paseo Comercial
  "8":  [9.0044, -79.5310],  // Las Palmas Blvd Norte
  "9":  [8.9830, -79.5280],  // Calle 50 Miraflores
  "10": [8.9921, -79.5350],  // Vía Argentina
  "11": [8.9880, -79.5420],  // Av. Balboa Bella Vista
  "12": [8.9505, -79.5348],  // San Felipe
  "13": [9.0100, -79.5230],  // Tumba Muerto
  "14": [8.9832, -79.4978],  // Paitilla
  "15": [8.9521, -79.5340],  // Casco Viejo
  "16": [8.9898, -79.5275],  // Bella Vista
  "17": [8.9958, -79.5078],  // San Francisco
  "18": [8.9630, -79.5412],  // El Chorrillo
  "19": [9.0080, -79.5140],  // Av. Ricardo Alfaro
  "20": [9.0170, -79.5155],  // El Dorado
  "21": [8.9802, -79.5055],  // Punta Pacífica
  "22": [8.9841, -79.5090],  // Calle 50 San Francisco
  "23": [8.9905, -79.5330],  // El Cangrejo
  "300":[9.0052, -79.5320],
  "301":[9.0210, -79.5200],
  "302":[8.9744, -79.5115],
  "303":[9.0310, -79.5010],
  "304":[8.9590, -79.5460],
  "305":[9.0650, -79.6820],  // Canal de Panamá
  "306":[9.5620, -78.9830],  // San Blas
  "307":[9.1100, -79.6700],  // Parque Soberanía
  "308":[8.9520, -79.5338],  // Casco Viejo
  "309":[8.8080, -82.5400],  // Volcán Barú
  "310":[8.9960, -79.5180],
  "311":[9.0088, -79.5090],
  "312":[8.9523, -79.5345],
  "313":[9.0200, -79.5100],
  "314":[8.9940, -79.5170],
  "315":[9.0031, -79.5255],
  "316":[9.0144, -79.5085],
  "317":[8.9883, -79.5032],
  "318":[9.0200, -79.5060],
  "319":[8.9935, -79.5145],
  "320":[9.0060, -79.5270],
  "321":[9.0120, -79.5340],
  "322":[9.0245, -79.5180],
  "323":[9.0015, -79.5300],
  "324":[9.0068, -79.5220]
};

// ── Estado del mapa ──
let _map            = null;   // instancia Leaflet
let _mapMarkers     = {};     // { bizId: L.marker }
let _mapActiveCat   = '';     // categoría filtrada
let _mapSelectedId  = null;   // id negocio seleccionado
let _mapInitialized = false;

// ── Entrada principal ──
