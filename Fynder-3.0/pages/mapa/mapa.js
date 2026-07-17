/**
 * ---------------------------------------------------------------
 *  Fynder — JS de: mapa
 *  Extraído de fynder.js
 *
 *  Las funciones GLOBALES (goPage, toggleFav, showToast, etc.)
 *  están en shared/fynder.js — este archivo contiene solo
 *  las funciones específicas de esta sección.
 * ---------------------------------------------------------------
 */

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

// -- Estado del mapa --
let _map            = null;   // instancia Leaflet
let _mapMarkers     = {};     // { bizId: L.marker }
let _mapActiveCat   = '';     // categoría filtrada
let _mapSelectedId  = null;   // id negocio seleccionado
let _mapInitialized = false;

// -- Entrada principal --
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

// -- Cambia tiles cuando cambia el tema --
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

// -- Chips de filtro por categoría --
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

// -- Coloca todos los marcadores en el mapa --
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

// -- Emoji por categoría --
function _catEmoji(catId) {
  const map = {
    restaurantes: '???',
    salud:        '??',
    belleza:      '??',
    transporte:   '??',
    turismo:      '??',
    hogar:        '??',
    tecnologia:   '??',
    ropa:         '??',
    deportes:     '?'
  };
  return map[catId] || '??';
}

// -- Filtra marcadores visibles y actualiza panel + badge --
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

// -- Panel lateral de resultados --
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

// -- Seleccionar un negocio (click en marcador o card) --
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

// -- Popup flotante --
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

