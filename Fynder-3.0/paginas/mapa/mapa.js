// ── mapa.js ──

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
function initMap() {
  // Si ya está inicializado solo actualizar tamaño y redibuja filtros
  if (_mapInitialized) {
    _map.invalidateSize();
    _filterAndRenderMap();
    return;
  }
  _mapInitialized = true;

  // Detectar modo oscuro para tiles
  const dark = document.documentElement.getAttribute('data-theme') === 'dark';

  _map = L.map('mapCanvas', {
    center: [9.0, -79.52],
    zoom: 13,
    zoomControl: false
  });

  // Tiles — CartoDB claro/oscuro (sin API key)
  const tileUrl = dark
    ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
    : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';

  L.tileLayer(tileUrl, {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | © <a href="https://carto.com">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19
  }).addTo(_map);

  // Zoom control en esquina superior derecha
  L.control.zoom({ position: 'topright' }).addTo(_map);

  // Chips de categoría
  _buildMapCatFilters();

  // Marcadores
  _placeAllMarkers();

  // Panel lateral
  _filterAndRenderMap();

  // Cierra popup al click en mapa vacío
  _map.on('click', () => closeMapPopup());
}

// ── Cambia tiles cuando cambia el tema ──
document.addEventListener('themeChanged', () => {
  if (!_mapInitialized || !_map) return;
  _map.eachLayer(l => { if (l._url) _map.removeLayer(l); });
  const dark = document.documentElement.getAttribute('data-theme') === 'dark';
  L.tileLayer(
    dark
      ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
      : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    { attribution: '© OpenStreetMap | © CARTO', subdomains: 'abcd', maxZoom: 19 }
  ).addTo(_map);
});

// ── Chips de filtro por categoría ──
function _buildMapCatFilters() {
  const wrap = document.getElementById('mapCatFilters');
  if (!wrap) return;

  // Chip "Todos"
  const all = _chipEl('Todos', '', _mapActiveCat === '');
  all.onclick = () => _setMapCat('');
  wrap.appendChild(all);

  // Una chip por categoría que tenga negocios con coords
  const usedCats = new Set(
    BUSINESSES
      .filter(b => BIZ_COORDS[b.id])
      .map(b => b.categoryId)
  );

  CATEGORIES.forEach(cat => {
    if (!usedCats.has(cat.id)) return;
    const chip = _chipEl(cat.label, cat.id, false);
    chip.style.setProperty('--chip-color', cat.color);
    chip.onclick = () => _setMapCat(cat.id);
    wrap.appendChild(chip);
  });
}

function _chipEl(label, catId, active) {
  const el = document.createElement('button');
  el.className = 'map-filter-chip' + (active ? ' active' : '');
  el.dataset.catId = catId;
  el.textContent = label;
  return el;
}

function _setMapCat(catId) {
  _mapActiveCat = catId;
  // Actualizar chips
  document.querySelectorAll('.map-filter-chip').forEach(chip => {
    chip.classList.toggle('active', chip.dataset.catId === catId);
  });
  _filterAndRenderMap();
}

// ── Coloca todos los marcadores en el mapa ──
function _placeAllMarkers() {
  BUSINESSES.forEach(biz => {
    const coords = BIZ_COORDS[biz.id];
    if (!coords) return;

    const cat = CATEGORIES.find(c => c.id === biz.categoryId);
    const color = cat ? cat.color : '#67B8B4';

    const icon = L.divIcon({
      className: '',
      html: `<div class="map-marker" style="background:${color}">
               <div class="map-marker-inner">${_catEmoji(biz.categoryId)}</div>
             </div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -34]
    });

    const marker = L.marker(coords, { icon })
      .addTo(_map)
      .on('click', () => _selectBiz(biz));

    _mapMarkers[biz.id] = marker;
  });
}

// ── Emoji por categoría ──
function _catEmoji(catId) {
  const map = {
    restaurantes: '🍽️',
    salud:        '❤️',
    belleza:      '💄',
    transporte:   '🚗',
    turismo:      '✈️',
    hogar:        '🏠',
    tecnologia:   '💻',
    ropa:         '👗',
    deportes:     '⚽'
  };
  return map[catId] || '📍';
}

// ── Filtra marcadores visibles y actualiza panel + badge ──
function _filterAndRenderMap() {
  const q = (document.getElementById('mapSearch')?.value || '').toLowerCase().trim();

  const visible = BUSINESSES.filter(b => {
    if (!BIZ_COORDS[b.id]) return false;
    if (_mapActiveCat && b.categoryId !== _mapActiveCat) return false;
    if (q && !b.name.toLowerCase().includes(q) && !b.category.toLowerCase().includes(q) && !b.address.toLowerCase().includes(q)) return false;
    return true;
  });

  // Mostrar/ocultar marcadores
  Object.entries(_mapMarkers).forEach(([id, marker]) => {
    const show = visible.some(b => b.id === id);
    if (show) {
      if (!_map.hasLayer(marker)) marker.addTo(_map);
    } else {
      if (_map.hasLayer(marker)) _map.removeLayer(marker);
    }
  });

  // Badge
  const badge = document.getElementById('mapCount');
  if (badge) badge.textContent = `${visible.length} negocio${visible.length !== 1 ? 's' : ''}`;

  // Clear button en buscador
  const clearBtn = document.getElementById('mapClear');
  if (clearBtn) clearBtn.classList.toggle('hide', !q);

  // Panel lateral
  _renderMapPanel(visible);
}

// ── Panel lateral de resultados ──
function _renderMapPanel(list) {
  const container = document.getElementById('mapPanelList');
  const panel     = document.getElementById('mapPanel');
  if (!container) return;

  if (!list.length) {
    container.innerHTML = `<div style="padding:24px 16px;text-align:center;color:var(--muted);font-size:.875rem">
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="margin:0 auto 12px;display:block;opacity:.35"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
      Sin resultados para esta búsqueda
    </div>`;
    if (panel) panel.classList.remove('hidden');
    return;
  }

  container.innerHTML = list.map(b => {
    const cat   = CATEGORIES.find(c => c.id === b.categoryId);
    const color = cat ? cat.color : '#67B8B4';
    const stars = `<svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="#F4D35E" stroke="#F4D35E" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
    const isSelected = _mapSelectedId === b.id;
    return `<div class="map-list-card${isSelected ? ' selected' : ''}" onclick="javascript:_selectBiz(BUSINESSES.find(x=>x.id==='${b.id}'))" data-map-card="${b.id}">
      <img class="map-list-img" src="${b.image}" alt="${b.name}" onerror="this.src='https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=56&h=56&fit=crop'">
      <div class="map-list-body">
        <div class="map-list-name">${b.name}</div>
        <div class="map-list-cat" style="color:${color}">${b.category}</div>
        <div class="map-list-addr">${b.address}</div>
        <div class="map-list-rating">${stars} ${b.rating} <span style="color:var(--muted);font-weight:400">(${b.reviews})</span></div>
      </div>
    </div>`;
  }).join('');

  if (panel) panel.classList.remove('hidden');
}

// ── Seleccionar un negocio (click en marcador o card) ──
function _selectBiz(biz) {
  if (!biz) return;

  // Deseleccionar anterior
  if (_mapSelectedId && _mapMarkers[_mapSelectedId]) {
    _mapMarkers[_mapSelectedId].getElement()?.querySelector('.map-marker')?.classList.remove('selected');
  }

  _mapSelectedId = biz.id;

  // Resaltar marcador seleccionado
  const markerEl = _mapMarkers[biz.id]?.getElement()?.querySelector('.map-marker');
  if (markerEl) markerEl.classList.add('selected');

  // Centrar mapa
  const coords = BIZ_COORDS[biz.id];
  if (coords) _map.panTo(coords, { animate: true });

  // Resaltar card en panel
  document.querySelectorAll('.map-list-card').forEach(el => {
    el.classList.toggle('selected', el.dataset.mapCard === biz.id);
  });

  // Scroll panel al card
  const card = document.querySelector(`[data-map-card="${biz.id}"]`);
  card?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  // Abrir popup
  _openMapPopup(biz);
}

// ── Popup flotante ──
function _openMapPopup(biz) {
  const cat   = CATEGORIES.find(c => c.id === biz.categoryId);
  const color = cat ? cat.color : '#67B8B4';
  const stars = starsHTML(biz.rating);

  document.getElementById('mpImg').src   = biz.image;
  document.getElementById('mpImg').alt   = biz.name;
  document.getElementById('mpCat').textContent    = biz.category;
  document.getElementById('mpCat').style.color    = color;
  document.getElementById('mpName').textContent   = biz.name;
  document.getElementById('mpAddrText').textContent = biz.address;

  const ratingEl = document.getElementById('mpRating');
  ratingEl.innerHTML = `${stars}
    <strong style="margin-left:4px">${biz.rating}</strong>
    <span style="font-weight:400;color:var(--muted)">(${biz.reviews} reseñas)</span>`;

  // Botón "Ver detalle"
  const btnDetail = document.getElementById('mpBtnDetail');
  btnDetail.onclick = () => { closeMapPopup(); openModal(biz.id); };

  // Botón Google Maps
  const btnGmaps = document.getElementById('mpBtnGmaps');
  btnGmaps.href = `https://www.google.com/maps/search/?api=1&query=${biz.mapQuery || encodeURIComponent(biz.address)}`;

  // Teléfono rápido si existe
  let phoneHtml = '';
  if (biz.phone) {
    phoneHtml = `<a href="tel:${biz.phone}" class="map-popup-btn map-popup-btn-phone" style="flex:0 0 auto;padding:9px 12px;border-radius:12px;background:rgba(16,185,129,.1);color:#10B981;border:none;cursor:pointer;display:flex;align-items:center;gap:5px;font-size:.8rem;font-weight:600;font-family:'Poppins',sans-serif;text-decoration:none">
      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.09 6.09l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
      Llamar
    </a>`;
  }

  // Inyectar botón de llamada si no existe
  const actionsEl = document.querySelector('.map-popup-actions');
  if (actionsEl) {
    const existingPhone = actionsEl.querySelector('.map-popup-btn-phone');
    if (existingPhone) existingPhone.remove();
    if (biz.phone) actionsEl.insertAdjacentHTML('beforeend', phoneHtml);
  }

  // Deal badge
  const dealBadge = document.getElementById('mpDeal');
  if (dealBadge) {
    if (biz.deal) {
      dealBadge.textContent  = biz.deal.label;
      dealBadge.style.background = biz.deal.color;
      dealBadge.style.display    = 'inline-block';
    } else {
      dealBadge.style.display = 'none';
    }
  }

  document.getElementById('mapBizPopup').classList.add('visible');
}

function closeMapPopup() {
  document.getElementById('mapBizPopup')?.classList.remove('visible');
  if (_mapSelectedId && _mapMarkers[_mapSelectedId]) {
    _mapMarkers[_mapSelectedId].getElement()?.querySelector('.map-marker')?.classList.remove('selected');
  }
  _mapSelectedId = null;
  document.querySelectorAll('.map-list-card').forEach(el => el.classList.remove('selected'));
}

function closeMapPanel() {
  document.getElementById('mapPanel')?.classList.add('hidden');
}

function filterMapMarkers() {
  _filterAndRenderMap();
}

function clearMapSearch() {
  const input = document.getElementById('mapSearch');
  if (input) input.value = '';
  _filterAndRenderMap();
}

// Reinicializar mapa cuando se cambia el tema (para tiles)
const _origToggleDark = typeof toggleDarkMode === 'function' ? toggleDarkMode : null;
if (_origToggleDark) {
  // El evento 'themeChanged' se dispara desde toggleDarkMode si lo emitimos
  const _realToggle = toggleDarkMode;
  window.toggleDarkMode = function() {
    _realToggle();
    document.dispatchEvent(new Event('themeChanged'));
  };
}


/* GLOBO TERRÁQUEO FYNDER — versión completa con texturas reales, shader día/noche, nubes, arcos tipo tubo, labels flotantes, tarjetas orbitantes, ticker y controles de zoom. Panamá 🇵🇦 destacado como hub principal. */
(function () {
  'use strict';

  let _globeReady = false;

  /* Se llama desde initMap() */
  window.initGlobe = function () {
    if (_globeReady) return;
    if (typeof THREE === 'undefined') {
      setTimeout(window.initGlobe, 300);
      return;
    }
    _globeReady = true;
    _bootGlobe();
  };

  function _bootGlobe() {
    const wrap        = document.getElementById('globe-wrap');
    const canvas      = document.getElementById('globeCanvas');
    const loaderEl    = document.getElementById('globe-loader');
    const loaderText  = document.getElementById('globe-loader-text');
    const labelsLayer = document.getElementById('globe-labels-layer');
    const tooltip     = document.getElementById('globe-city-tooltip');
    const ttName      = document.getElementById('gTtName');
    const ttInfo      = document.getElementById('gTtInfo');
    if (!wrap || !canvas) return;

    /* ── Loading manager ── */
    const manager = new THREE.LoadingManager();
    manager.onProgress = (url, loaded, total) => {
      if (loaderText) loaderText.textContent =
        'Iniciando red global… ' + Math.round(loaded / total * 100) + '%';
    };
    manager.onLoad = () => {
      if (loaderEl) loaderEl.classList.add('hidden');
      _startCountUp();
    };
    const texLoader = new THREE.TextureLoader(manager);

    /* ── Escena ── */
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, wrap.clientWidth / wrap.clientHeight, 0.1, 2000);
    const BASE_Z = 285;
    camera.position.set(0, 0, BASE_Z);
    const baseCameraPos = camera.position.clone();

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.setSize(wrap.clientWidth, wrap.clientHeight);

    const RADIUS = 100;

    /* ── Estrellas ── */
    const starCount = 1400;
    const starGeo   = new THREE.BufferGeometry();
    const starPos   = new Float32Array(starCount * 3);
    const starCol   = new Float32Array(starCount * 3);
    const palette   = [[1,1,1],[.75,.85,1],[1,.9,.75],[.9,.7,1]];
    for (let i = 0; i < starCount; i++) {
      const r  = 560 + Math.random() * 440;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(Math.random() * 2 - 1);
      starPos[i*3]   = r * Math.sin(ph) * Math.cos(th);
      starPos[i*3+1] = r * Math.sin(ph) * Math.sin(th);
      starPos[i*3+2] = r * Math.cos(ph);
      const c = palette[Math.floor(Math.random() * palette.length)];
      starCol[i*3] = c[0]; starCol[i*3+1] = c[1]; starCol[i*3+2] = c[2];
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute('color',    new THREE.BufferAttribute(starCol, 3));
    const starField = new THREE.Points(starGeo, new THREE.PointsMaterial({
      size: 1.4, vertexColors: true, transparent: true, opacity: 0.86, sizeAttenuation: true
    }));
    scene.add(starField);

    /* ── Grupo globo ── */
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    /* Texturas */
    const dayTex   = texLoader.load('https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg');
    const nightTex = texLoader.load('https://threejs.org/examples/textures/planets/earth_lights_2048.png');
    const cloudTex = texLoader.load('https://threejs.org/examples/textures/planets/earth_clouds_1024.png');

    /* Textura de glow generada en canvas */
    function _makeGlowTex() {
      const sz = 128, cv = document.createElement('canvas');
      cv.width = sz; cv.height = sz;
      const ctx = cv.getContext('2d');
      const g = ctx.createRadialGradient(sz/2,sz/2,0,sz/2,sz/2,sz/2);
      g.addColorStop(0,   'rgba(255,255,255,1)');
      g.addColorStop(.25, 'rgba(255,255,255,.55)');
      g.addColorStop(1,   'rgba(255,255,255,0)');
      ctx.fillStyle = g; ctx.fillRect(0,0,sz,sz);
      return new THREE.CanvasTexture(cv);
    }
    const glowTex = _makeGlowTex();

    /* ── Sol ── */
    let sunAngle = Math.atan2(0.8, 0.6);
    const sunDir = new THREE.Vector3(0.6, 0.35, 0.8).normalize();
    const sunDirLive = new THREE.Vector3();
    const sunSprite = new THREE.Sprite(new THREE.SpriteMaterial({
      map: glowTex, color: 0xfff0c4, transparent: true,
      blending: THREE.AdditiveBlending, depthWrite: false
    }));
    sunSprite.scale.set(195, 195, 1);
    scene.add(sunSprite);

    /* ── Shader Tierra día/noche ── */
    const earthMat = new THREE.ShaderMaterial({
      uniforms: {
        dayTexture:   { value: dayTex },
        nightTexture: { value: nightTex },
        sunDirection: { value: sunDir.clone() }
      },
      vertexShader: `
        varying vec2 vUv; varying vec3 vWorldNormal;
        void main(){
          vUv = uv;
          vWorldNormal = normalize(mat3(modelMatrix)*normal);
          gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0);
        }`,
      fragmentShader: `
        uniform sampler2D dayTexture,nightTexture;
        uniform vec3 sunDirection;
        varying vec2 vUv; varying vec3 vWorldNormal;
        void main(){
          vec3 day   = texture2D(dayTexture,  vUv).rgb;
          vec3 night = texture2D(nightTexture,vUv).rgb;
          float intensity = dot(normalize(vWorldNormal),normalize(sunDirection));
          float mix1 = smoothstep(-0.25,0.35,intensity);
          vec3 color = mix(night*1.6, day*0.95, mix1);
          float band = 1.0 - smoothstep(0.0,0.4,abs(intensity));
          color += vec3(1.0,0.45,0.15)*band*0.35;
          gl_FragColor = vec4(color,1.0);
        }`
    });
    globeGroup.add(new THREE.Mesh(new THREE.SphereGeometry(RADIUS, 96, 96), earthMat));

    /* ── Nubes ── */
    const cloudMesh = new THREE.Mesh(
      new THREE.SphereGeometry(RADIUS + 1.5, 64, 64),
      new THREE.MeshBasicMaterial({
        map: cloudTex, transparent: true, opacity: 0.36,
        blending: THREE.AdditiveBlending, depthWrite: false
      })
    );
    globeGroup.add(cloudMesh);

    /* ── Atmósfera glow ── */
    globeGroup.add(new THREE.Mesh(
      new THREE.SphereGeometry(RADIUS + 6, 64, 64),
      new THREE.ShaderMaterial({
        uniforms: { glowColor: { value: new THREE.Color(0x34d399) } },
        vertexShader: `
          varying vec3 vNormal;
          void main(){ vNormal=normalize(normalMatrix*normal);
            gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
        fragmentShader: `
          varying vec3 vNormal; uniform vec3 glowColor;
          void main(){
            float intensity=pow(0.55-dot(vNormal,vec3(0,0,1)),2.5);
            gl_FragColor=vec4(glowColor,clamp(intensity,0.0,1.0)*0.9); }`,
        blending: THREE.AdditiveBlending, side: THREE.BackSide, transparent: true
      })
    ));

    /* ── Helper lat/lon → Vector3 ── */
    function ll2v(lat, lon, r) {
      const phi   = (90 - lat)  * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      return new THREE.Vector3(
        -r * Math.sin(phi) * Math.cos(theta),
         r * Math.cos(phi),
         r * Math.sin(phi) * Math.sin(theta)
      );
    }

    /* ── Ciudades ── */
    const cityData = [
      { name:'Nueva York',       lat:40.7,   lon:-74.0,   label:true,  info:'Hub financiero global' },
      { name:'Londres',          lat:51.5,   lon:-0.1,    label:true,  info:'Capital europea de negocios' },
      { name:'Lagos',            lat:6.5,    lon:3.4,     label:false, info:'Mayor ciudad de África' },
      { name:'El Cairo',         lat:30.0,   lon:31.2,    label:false, info:'Ciudad milenaria de Egipto' },
      { name:'Dubái',            lat:25.2,   lon:55.3,    label:true,  info:'Centro comercial de Oriente Medio' },
      { name:'Bombay',           lat:19.1,   lon:72.9,    label:false, info:'Capital financiera de India' },
      { name:'Singapur',         lat:1.35,   lon:103.8,   label:false, info:'Centro tecnológico de Asia' },
      { name:'Tokio',            lat:35.7,   lon:139.7,   label:true,  info:'Metrópolis más grande del mundo' },
      { name:'Sídney',           lat:-33.9,  lon:151.2,   label:false, info:'Principal ciudad de Oceanía' },
      { name:'Los Ángeles',      lat:34.0,   lon:-118.2,  label:false, info:'Capital del entretenimiento' },
      { name:'São Paulo',        lat:-23.5,  lon:-46.6,   label:true,  info:'Motor económico de Latinoamérica' },
      { name:'Ciudad de México', lat:19.4,   lon:-99.1,   label:false, info:'Capital de México' },
      { name:'Bogotá',           lat:4.7,    lon:-74.1,   label:false, info:'Capital de Colombia' },
      { name:'Lima',             lat:-12.0,  lon:-77.0,   label:false, info:'Capital de Perú' },
      { name:'Buenos Aires',     lat:-34.6,  lon:-58.4,   label:false, info:'Capital de Argentina' },
      { name:'Madrid',           lat:40.4,   lon:-3.7,    label:false, info:'Capital de España' },
      { name:'Nairobi',          lat:-1.3,   lon:36.8,    label:false, info:'Capital de Kenia' },
      { name:'Toronto',          lat:43.7,   lon:-79.4,   label:false, info:'Mayor ciudad de Canadá' },
      { name:'Moscú',            lat:55.75,  lon:37.6,    label:false, info:'Capital de Rusia' },
      { name:'Shanghái',         lat:31.2,   lon:121.5,   label:false, info:'Hub financiero de China' },
      { name:'Panamá',           lat:8.98,   lon:-79.52,  label:true,  highlight:true, info:'🇵🇦 Hub logístico de las Américas · Fynder HQ' },
    ];

    const markerGeo   = new THREE.SphereGeometry(1.1, 10, 10);
    const markerWorld = [];

    const cities = cityData.map(c => {
      const pos   = ll2v(c.lat, c.lon, RADIUS + 1.2);
      const color = c.highlight ? 0xff5c5c : 0xffc773;
      const mesh  = new THREE.Mesh(markerGeo, new THREE.MeshBasicMaterial({ color }));
      mesh.position.copy(pos);
      mesh.scale.setScalar(c.highlight ? 1.9 : 1);
      globeGroup.add(mesh);

      const halo = new THREE.Sprite(new THREE.SpriteMaterial({
        map: glowTex, color, transparent: true,
        blending: THREE.AdditiveBlending, depthWrite: false
      }));
      halo.scale.setScalar(c.highlight ? 22 : 11);
      halo.position.copy(pos);
      globeGroup.add(halo);

      let ring = null;
      if (c.highlight) {
        ring = new THREE.Mesh(
          new THREE.RingGeometry(1, 1.35, 40),
          new THREE.MeshBasicMaterial({ color: 0xffd166, transparent: true, opacity: 0.8,
            side: THREE.DoubleSide, blending: THREE.AdditiveBlending })
        );
        ring.position.copy(pos);
        ring.lookAt(0, 0, 0);
        globeGroup.add(ring);
      }

      let labelEl = null;
      if (c.label) {
        labelEl = document.createElement('div');
        labelEl.className = c.highlight ? 'globe-city-label globe-highlight-label' : 'globe-city-label';
        const flag = c.highlight ? '🇵🇦 ' : '';
        labelEl.innerHTML = `<span class="globe-city-ring"></span><span class="globe-city-name">${flag}${c.name}</span>`;
        if (labelsLayer) labelsLayer.appendChild(labelEl);
      }

      markerWorld.push({ mesh, city: c });
      return { ...c, mesh, halo, ring, ringT: Math.random(), labelEl, phase: Math.random() * Math.PI * 2 };
    });

    /* ── Arcos tipo tubo ── */
    const arcPairs = [
      ['Nueva York',      'Londres'],
      ['Londres',         'El Cairo'],
      ['El Cairo',        'Dubái'],
      ['Dubái',           'Bombay'],
      ['Bombay',          'Singapur'],
      ['Singapur',        'Tokio'],
      ['Tokio',           'Los Ángeles'],
      ['Los Ángeles',     'Panamá'],
      ['Panamá',          'Nueva York'],
      ['Panamá',          'São Paulo'],
      ['São Paulo',       'Lagos'],
      ['Lagos',           'Londres'],
      ['Panamá',          'Ciudad de México'],
      ['Panamá',          'Bogotá'],
      ['São Paulo',       'Buenos Aires'],
      ['Ciudad de México','Los Ángeles'],
    ];

    function _findCity(name) { return cities.find(c => c.name === name); }
    const trailGeo = new THREE.SphereGeometry(1.0, 8, 8);
    const arcs = [];

    arcPairs.forEach(([a, b]) => {
      const fc = _findCity(a);
      const tc = _findCity(b);
      if (!fc || !tc) return;
      const start = fc.mesh.position.clone();
      const end   = tc.mesh.position.clone();
      const mid   = start.clone().add(end).multiplyScalar(0.5);
      mid.setLength(RADIUS + 1 + start.distanceTo(end) * 0.42);
      const curve   = new THREE.QuadraticBezierCurve3(start, mid, end);
      const tubeGeo = new THREE.TubeGeometry(curve, 64, 0.35, 6, false);
      const isPanama = a === 'Panamá' || b === 'Panamá';
      const tubeMat  = new THREE.MeshBasicMaterial({
        color: isPanama ? 0xffd166 : 0x9fe6c9,
        transparent: true, opacity: isPanama ? 0.55 : 0.38,
        blending: THREE.AdditiveBlending
      });
      globeGroup.add(new THREE.Mesh(tubeGeo, tubeMat));
      const trailMeshes = [];
      for (let i = 0; i < 5; i++) {
        const m = new THREE.Mesh(trailGeo, new THREE.MeshBasicMaterial({
          color: 0xffffff, transparent: true, opacity: 1 - i / 5,
          blending: THREE.AdditiveBlending
        }));
        m.scale.setScalar(1 - i * 0.14);
        globeGroup.add(m);
        trailMeshes.push(m);
      }
      arcs.push({ curve, trailMeshes, t: Math.random(), speed: 0.0028 + Math.random() * 0.0016 });
    });

    /* ── Interacción: drag + inercia + zoom ── */
    let isDragging = false, prevX = 0, prevY = 0;
    let velX = 0.0015;
    let targetZ = BASE_Z;
    const MIN_Z = 170, MAX_Z = 420;
    const AUTO_SPEED = 0.0014;
    let pointerNormX = 0, pointerNormY = 0;

    wrap.addEventListener('pointerdown', e => {
      isDragging = true; prevX = e.clientX; prevY = e.clientY;
      _checkCityClick(e);
    });
    window.addEventListener('pointerup', () => { isDragging = false; });
    window.addEventListener('pointermove', e => {
      pointerNormX = (e.clientX / window.innerWidth)  * 2 - 1;
      pointerNormY = (e.clientY / window.innerHeight) * 2 - 1;
      if (!isDragging) return;
      const dx = e.clientX - prevX, dy = e.clientY - prevY;
      globeGroup.rotation.y += dx * 0.005;
      globeGroup.rotation.x += dy * 0.003;
      globeGroup.rotation.x = Math.max(-0.9, Math.min(0.9, globeGroup.rotation.x));
      velX = dx * 0.0006;
      prevX = e.clientX; prevY = e.clientY;
    });

    wrap.addEventListener('wheel', e => {
      e.preventDefault();
      targetZ = Math.max(MIN_Z, Math.min(MAX_Z, targetZ + e.deltaY * 0.22));
    }, { passive: false });

    let lastPinch = 0;
    wrap.addEventListener('touchstart', e => {
      if (e.touches.length === 2)
        lastPinch = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
    }, { passive: true });
    wrap.addEventListener('touchmove', e => {
      if (e.touches.length === 2) {
        const d = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
        targetZ = Math.max(MIN_Z, Math.min(MAX_Z, targetZ - (d - lastPinch) * 0.6));
        lastPinch = d;
      }
    }, { passive: true });

    const btnIn  = document.getElementById('gBtnZoomIn');
    const btnOut = document.getElementById('gBtnZoomOut');
    const btnRst = document.getElementById('gBtnReset');
    if (btnIn)  btnIn.addEventListener('click',  () => { targetZ = Math.max(MIN_Z, targetZ - 30); });
    if (btnOut) btnOut.addEventListener('click', () => { targetZ = Math.min(MAX_Z, targetZ + 30); });
    if (btnRst) btnRst.addEventListener('click', () => {
      targetZ = BASE_Z;
      globeGroup.rotation.x = 0;
      velX = 0.0015;
      if (tooltip) tooltip.style.opacity = '0';
    });

    window.addEventListener('resize', () => {
      const w = wrap.clientWidth, h = wrap.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });

    /* ── Raycaster para click en ciudades ── */
    const raycaster = new THREE.Raycaster();
    const mouse     = new THREE.Vector2();
    let   ttTimeout = null;

    function _checkCityClick(e) {
      const rect = canvas.getBoundingClientRect();
      mouse.x =  ((e.clientX - rect.left) / rect.width)  * 2 - 1;
      mouse.y = -((e.clientY - rect.top)  / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObjects(markerWorld.map(m => m.mesh));
      if (hits.length) {
        const hit = markerWorld.find(m => m.mesh === hits[0].object);
        if (hit) _showTooltip(e.clientX, e.clientY, hit.city);
      } else {
        _hideTooltip();
      }
    }

    function _showTooltip(x, y, city) {
      if (!tooltip) return;
      if (ttName) ttName.textContent = city.name;
      if (ttInfo) ttInfo.textContent = city.info || '';
      tooltip.style.left    = (x + 14) + 'px';
      tooltip.style.top     = (y - 10) + 'px';
      tooltip.style.opacity = '1';
      clearTimeout(ttTimeout);
      ttTimeout = setTimeout(_hideTooltip, 3200);
    }

    function _hideTooltip() {
      if (tooltip) tooltip.style.opacity = '0';
    }

    /* ── Count-up del número de negocios ── */
    function _startCountUp() {
      const el = document.getElementById('gStatNumber');
      if (!el) return;
      const target   = parseInt(el.textContent) || 85;
      const duration = 1600;
      const t0 = performance.now();
      function tick(now) {
        const p = Math.min(1, (now - t0) / duration);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }

    /* ── Tarjetas orbitantes ── */
    const orbitCards = [
      { el: document.getElementById('gCardLeft'),  angle: Math.PI * 0.78, speed: 0.10,  rx: 0.47, ry: 0.40, dir:  1 },
      { el: document.getElementById('gCardRight'), angle:-Math.PI * 0.22, speed: 0.075, rx: 0.45, ry: 0.36, dir: -1 },
      { el: document.getElementById('gCardSmall'), angle: Math.PI * 0.12, speed: 0.13,  rx: 0.40, ry: 0.42, dir:  1 },
    ];

    function _updateOrbitCards(delta) {
      const cx = wrap.clientWidth / 2, cy = wrap.clientHeight / 2;
      const min = Math.min(wrap.clientWidth, wrap.clientHeight);
      orbitCards.forEach(o => {
        if (!o.el) return;
        o.angle += o.dir * o.speed * delta;
        const x = cx + Math.cos(o.angle) * min * o.rx;
        const y = cy + Math.sin(o.angle) * min * o.ry;
        o.el.style.left      = x + 'px';
        o.el.style.top       = y + 'px';
        o.el.style.transform = 'translate(-50%,-50%)';
      });
    }
    _updateOrbitCards(0);

    /* ── Labels flotantes ── */
    const tmpVec    = new THREE.Vector3();
    const tmpNormal = new THREE.Vector3();
    const camDir    = new THREE.Vector3();

    function _updateLabels() {
      cities.forEach(c => {
        if (!c.labelEl) return;
        c.mesh.getWorldPosition(tmpVec);
        tmpNormal.copy(tmpVec).normalize();
        camDir.copy(camera.position).sub(tmpVec).normalize();
        const facing  = tmpNormal.dot(camDir);
        const opacity = Math.max(0, Math.min(1, (facing + 0.05) / 0.35));
        const proj    = tmpVec.clone().project(camera);
        const x = (proj.x * 0.5 + 0.5) * wrap.clientWidth;
        const y = (-proj.y * 0.5 + 0.5) * wrap.clientHeight;
        c.labelEl.style.left    = x + 'px';
        c.labelEl.style.top     = (y - 10) + 'px';
        c.labelEl.style.opacity = opacity.toFixed(2);
      });
    }

    /* ── Loop de animación ── */
    const clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);
      const delta = Math.min(clock.getDelta(), 0.05);
      const t     = clock.getElapsedTime();

      /* Auto-rotación + inercia */
      if (!isDragging) {
        globeGroup.rotation.y += AUTO_SPEED + velX;
        velX *= 0.94;
      }

      /* Zoom suave */
      camera.position.z += (targetZ - camera.position.z) * 0.08;

      /* Sol orbita */
      sunAngle += delta * 0.01;
      sunDirLive.set(Math.cos(sunAngle), 0.35, Math.sin(sunAngle)).normalize();
      earthMat.uniforms.sunDirection.value.copy(sunDirLive);
      sunSprite.position.copy(sunDirLive).multiplyScalar(480);

      /* Nubes giran lento */
      cloudMesh.rotation.y += 0.00018;

      /* Pulso de marcadores */
      cities.forEach(c => {
        const base = c.highlight ? 1.9 : 1;
        const s    = base * (1 + Math.sin(t * 2 + c.phase) * 0.18);
        c.mesh.scale.setScalar(s);
        c.halo.scale.setScalar((c.highlight ? 22 : 11) * (1 + Math.sin(t * 1.6 + c.phase) * 0.15));
        if (c.ring) {
          c.ringT += delta * 0.4;
          if (c.ringT > 1) c.ringT = 0;
          const sc = 1 + c.ringT * 2.2;
          c.ring.scale.setScalar(sc);
          c.ring.material.opacity = 0.8 * (1 - c.ringT);
        }
      });

      /* Cometas en arcos */
      arcs.forEach(arc => {
        arc.t += arc.speed;
        if (arc.t > 1.15) arc.t = -0.15;
        arc.trailMeshes.forEach((m, i) => {
          const tt = arc.t - i * 0.028;
          if (tt < 0 || tt > 1) { m.visible = false; return; }
          m.visible = true;
          m.position.copy(arc.curve.getPoint(tt));
        });
      });

      /* Estrellas derivan lento */
      starField.rotation.y += 0.00006;

      /* Paralaje de cámara con el mouse */
      camera.position.x = baseCameraPos.x + pointerNormX * 12;
      camera.position.y = baseCameraPos.y - pointerNormY * 8;
      camera.lookAt(0, 0, 0);

      _updateOrbitCards(delta);
      _updateLabels();
      renderer.render(scene, camera);
    }

    animate();

  } // fin _bootGlobe

  /* ── Hook a initMap ── */
  const _prevInitMap = window.initMap;
  window.initMap = function () {
    if (typeof _prevInitMap === 'function') _prevInitMap();
    requestAnimationFrame(() => requestAnimationFrame(window.initGlobe));
  };

}()); // fin IIFE

