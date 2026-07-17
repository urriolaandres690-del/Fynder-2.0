// ── dashboard.js ──

/*modo oscuro*/
function toggleDarkMode(){
    // Solo permitir modo oscuro si hay sesión activa
    if (!localStorage.getItem('fynderLogged')) {
      showToast('Inicia sesión para activar el modo oscuro 🌙', 'info');
      return;
    }
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const next   = isDark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('fynderTheme', next);
    // Actualizar navbar scrolled en modo oscuro
    _applyNavbarTheme();
}

function _applyNavbarTheme(){
    const navbar = document.getElementById('navbar');
    if(!navbar) return;
    // Si está scrolled, el CSS ya lo maneja; solo forzamos repaint
    navbar.style.transition = 'background .3s, box-shadow .3s';
}

// iniciar tema guardado — por defecto siempre modo claro
(function initTheme(){
    const saved  = localStorage.getItem('fynderTheme');
    const logged = localStorage.getItem('fynderLogged');
    // Si no hay sesión activa, siempre modo claro (la opción oscuro aún no se activa sin login)
    // Si hay sesión, respetar el tema que el usuario eligió
    const theme = (logged && saved === 'dark') ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    if (!logged) localStorage.setItem('fynderTheme', 'light');
})();

/* ── Auto-estado al cerrar la pestaña/navegador ── */
window.addEventListener('beforeunload', function(){
    if(localStorage.getItem('fynderLogged')){
        localStorage.setItem('fynderUserStatus', 'offline');
    }
});


// panel del usuario

// datos de planes
const PLAN_DATA = {
  basico: {
    name: 'Básico',
    price: '$0',
    period: 'para siempre',
    icon: '🏪',
    iconBg: '#E6F5F4',
    iconColor: '#67B8B4',
    badge: 'dash-plan-badge-free',
    level: 0
  },
  pro: {
    name: 'Pro',
    price: '$9.99',
    period: '/ mes',
    icon: '⚡',
    iconBg: 'linear-gradient(135deg,#1E8F8B,#2F5BB7)',
    iconColor: '#fff',
    badge: 'dash-plan-badge-pro',
    level: 1
  },
  business: {
    name: 'Business',
    price: '$24.99',
    period: '/ mes',
    icon: '🏢',
    iconBg: '#EEF2FF',
    iconColor: '#2F5BB7',
    badge: 'dash-plan-badge-biz',
    level: 2
  },
  premium: {
    name: 'Premium',
    price: '$59.99',
    period: '/ mes',
    icon: '👑',
    iconBg: 'linear-gradient(135deg,#7c3aed,#a855f7)',
    iconColor: '#fff',
    badge: 'dash-plan-badge-premium',
    level: 3
  }
};

// datos de analiticas simulados
function generateAnalytics(period) {
  const bizCount = JSON.parse(localStorage.getItem('fynderBusinesses') || '[]').length;
  const base = Math.max(bizCount * 15, 5);
  const seed = period === '7d' ? 1 : period === '30d' ? 4.5 : 12;

  const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  const views   = rand(Math.floor(base * seed * 0.8), Math.floor(base * seed * 1.4));
  const saves   = rand(Math.floor(views * 0.12), Math.floor(views * 0.22));
  const clicks  = rand(Math.floor(views * 0.08), Math.floor(views * 0.18));
  const reviews = rand(0, Math.max(1, Math.floor(views * 0.04)));

  const deltaViews   = rand(-15, 35);
  const deltaSaves   = rand(-10, 40);
  const deltaClicks  = rand(-8, 30);
  const deltaReviews = rand(0, 20);

  return { views, saves, clicks, reviews, deltaViews, deltaSaves, deltaClicks, deltaReviews };
}

// etiquetas para la grafica
function generateChartLabels(period) {
  const days = period === '7d' ? 7 : period === '30d' ? 10 : 12;
  const labels = [];
  const now = new Date();
  const step = period === '90d' ? 7 : (period === '30d' ? 3 : 1);
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i * step);
    labels.push(d.getDate() + '/' + (d.getMonth() + 1));
  }
  return labels;
}

// datos de visitas
function generateChartData(period) {
  const points = period === '7d' ? 7 : period === '30d' ? 10 : 12;
  const base = Math.max(JSON.parse(localStorage.getItem('fynderBusinesses') || '[]').length * 2, 2);
  const multiplier = period === '7d' ? 8 : period === '30d' ? 20 : 60;
  return Array.from({ length: points }, () =>
    Math.floor(Math.random() * base * multiplier + base * 3)
  );
}

let dashChart = null;

function renderDashChart(period) {
  const canvas = document.getElementById('dashChartVisits');
  if (!canvas) return;

  const labels = generateChartLabels(period);
  const data   = generateChartData(period);
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

  const gridColor  = isDark ? 'rgba(255,255,255,.07)' : 'rgba(0,0,0,.06)';
  const labelColor = isDark ? '#94A3B8' : '#6B7280';
  const lineColor  = '#67B8B4';
  const fillColor  = isDark ? 'rgba(103,184,180,.12)' : 'rgba(103,184,180,.15)';

  // Destruir gráfica anterior si existe
  if (dashChart) { dashChart.destroy(); dashChart = null; }

  // Usamos Canvas API directamente (sin Chart.js para no añadir dependencias)
  const ctx = canvas.getContext('2d');
  const W = canvas.offsetWidth || 700;
  const H = 220;
  canvas.width  = W;
  canvas.height = H;

  const pad = { top: 20, right: 20, bottom: 40, left: 44 };
  const chartW = W - pad.left - pad.right;
  const chartH = H - pad.top - pad.bottom;
  const maxVal = Math.max(...data) * 1.15 || 10;

  ctx.clearRect(0, 0, W, H);

  // Grid lines
  const gridLines = 5;
  ctx.strokeStyle = gridColor;
  ctx.lineWidth = 1;
  for (let i = 0; i <= gridLines; i++) {
    const y = pad.top + (chartH / gridLines) * i;
    ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(W - pad.right, y); ctx.stroke();

    // Labels eje Y
    const val = Math.round(maxVal - (maxVal / gridLines) * i);
    ctx.fillStyle = labelColor;
    ctx.font = '11px Inter, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(val >= 1000 ? (val/1000).toFixed(1)+'k' : val, pad.left - 6, y + 4);
  }

  // Points x
  const xs = labels.map((_, i) => pad.left + (chartW / (labels.length - 1)) * i);
  const ys = data.map(v => pad.top + chartH - (v / maxVal) * chartH);

  // Fill area
  const grad = ctx.createLinearGradient(0, pad.top, 0, pad.top + chartH);
  grad.addColorStop(0, fillColor);
  grad.addColorStop(1, 'rgba(103,184,180,0)');
  ctx.beginPath();
  ctx.moveTo(xs[0], ys[0]);
  for (let i = 1; i < xs.length; i++) {
    const cpx = (xs[i-1] + xs[i]) / 2;
    ctx.bezierCurveTo(cpx, ys[i-1], cpx, ys[i], xs[i], ys[i]);
  }
  ctx.lineTo(xs[xs.length-1], pad.top + chartH);
  ctx.lineTo(xs[0], pad.top + chartH);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();

  // Line
  ctx.beginPath();
  ctx.moveTo(xs[0], ys[0]);
  for (let i = 1; i < xs.length; i++) {
    const cpx = (xs[i-1] + xs[i]) / 2;
    ctx.bezierCurveTo(cpx, ys[i-1], cpx, ys[i], xs[i], ys[i]);
  }
  ctx.strokeStyle = lineColor;
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // Dots
  xs.forEach((x, i) => {
    ctx.beginPath();
    ctx.arc(x, ys[i], 4, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 2;
    ctx.stroke();
  });

  // Labels eje X
  ctx.fillStyle = labelColor;
  ctx.font = '11px Inter, sans-serif';
  ctx.textAlign = 'center';
  const step = Math.max(1, Math.floor(labels.length / 7));
  labels.forEach((lbl, i) => {
    if (i % step === 0 || i === labels.length - 1) {
      ctx.fillText(lbl, xs[i], H - 10);
    }
  });
}

let currentDashPeriod = '7d';

function changePeriod(period, btn) {
  currentDashPeriod = period;
  document.querySelectorAll('.dash-period-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  updateDashStats(period);
  renderDashChart(period);
}

function updateDashStats(period) {
  const plan = localStorage.getItem('fynderPlan') || 'basico';
  const isLocked = plan === 'basico';

  const statIds = ['statViews','statSaves','statClicks','statReviews'];
  const deltaIds = ['statViewsDelta','statSavesDelta','statClicksDelta','statReviewsDelta'];

  if (isLocked) {
    statIds.forEach(id => { const el = document.getElementById(id); if(el) el.textContent = '—'; });
    deltaIds.forEach(id => { const el = document.getElementById(id); if(el) el.textContent = ''; });
    return;
  }

  const d = generateAnalytics(period);
  const vals   = [d.views, d.saves, d.clicks, d.reviews];
  const deltas = [d.deltaViews, d.deltaSaves, d.deltaClicks, d.deltaReviews];

  statIds.forEach((id, i) => {
    const el = document.getElementById(id);
    if (el) el.textContent = vals[i].toLocaleString('es');
  });

  deltaIds.forEach((id, i) => {
    const el = document.getElementById(id);
    if (!el) return;
    const delta = deltas[i];
    const sign  = delta >= 0 ? '+' : '';
    el.textContent = sign + delta + '% vs período anterior';
    el.className   = 'dash-stat-delta ' + (delta >= 0 ? 'up' : 'down');
  });
}

function loadDashboard() {
  const user = JSON.parse(localStorage.getItem('fynderUser'));
  if (!user) { goPage('login'); return; }

  // Bienvenida
  const welcome = document.getElementById('dashWelcome');
  if (welcome) welcome.textContent = 'Hola, ' + user.name + ' 👋';

  const plan = localStorage.getItem('fynderPlan') || 'basico';
  const planInfo = PLAN_DATA[plan] || PLAN_DATA.basico;

  // ---- Plan card ----
  const planCard = document.getElementById('dashPlanCard');
  if (planCard) {
    const since = localStorage.getItem('fynderPlanSince') || 'Hoy';
    planCard.innerHTML = `
      <div class="dash-plan-icon" style="background:${planInfo.iconBg};color:${planInfo.iconColor};font-size:1.6rem">
        ${planInfo.icon}
      </div>
      <div class="dash-plan-info">
        <h3 class="dash-plan-name">Plan ${planInfo.name}</h3>
        <p class="dash-plan-meta">Activo desde: ${since}</p>
        <span class="dash-plan-badge ${planInfo.badge}">
          <i class="fas fa-circle" style="font-size:.4rem"></i> Activo
        </span>
      </div>
      <div class="dash-plan-price-block">
        <div class="dash-plan-price">${planInfo.price}</div>
        <span class="dash-plan-period">${planInfo.period}</span>
        <div style="margin-top:12px">
          <button class="dash-biz-btn" onclick="goPage('plans')" style="font-size:.78rem">
            <i class="fas fa-arrow-right-arrow-left"></i> Cambiar plan
          </button>
        </div>
      </div>
    `;
  }

  // ---- Upgrade strip ----
  const upgradeStrip = document.getElementById('dashUpgradeStrip');
  if (upgradeStrip) upgradeStrip.style.display = planInfo.level >= 3 ? 'none' : 'flex';

  // ---- Plan badge en gráfica ----
  const chartBadge = document.getElementById('dashPlanBadgeChart');
  if (chartBadge) {
    chartBadge.textContent = 'Plan ' + planInfo.name;
    chartBadge.className = 'dash-chart-badge ' + planInfo.badge;
  }

  // ---- Locked overlay ----
  const lockedOverlay = document.getElementById('dashLockedOverlay');
  const isLocked = planInfo.level === 0;
  if (lockedOverlay) lockedOverlay.style.display = isLocked ? 'flex' : 'none';

  // ---- Stats ----
  updateDashStats(currentDashPeriod);

  // ---- Gráfica ----
  setTimeout(() => renderDashChart(currentDashPeriod), 80);

  // ---- Negocios ----
  const bizList = document.getElementById('dashBizList');
  if (bizList) {
    const businesses = JSON.parse(localStorage.getItem('fynderBusinesses') || '[]');
    if (businesses.length === 0) {
      bizList.innerHTML = `
        <div class="dash-biz-empty">
          <i class="fas fa-store"></i>
          Aún no tienes negocios registrados.
          <br><br>
          <button class="btn-teal" style="padding:10px 20px" onclick="goPage('business')">
            <i class="fas fa-plus" style="font-size:.7rem"></i> Registrar negocio
          </button>
        </div>
      `;
    } else {
      bizList.innerHTML = businesses.map((biz, i) => {
        const catObj = CATEGORIES.find(c => c.id === biz.category);
        const emoji  = catObj ? '' : '🏪';
        return `
          <div class="dash-biz-item">
            <div class="dash-biz-emoji" style="${catObj ? 'background:'+catObj.bg+';' : ''}">
              ${catObj ? catObj.svg : emoji}
            </div>
            <div class="dash-biz-info">
              <p class="dash-biz-name">${biz.name || 'Sin nombre'}</p>
              <span class="dash-biz-cat">${catObj ? catObj.label : (biz.category || 'Sin categoría')} ${biz.city ? '· ' + biz.city : ''}</span>
            </div>
            <div class="dash-biz-actions">
              <button class="dash-biz-btn" onclick="openBusinessDetail(${i})">
                <i class="fas fa-eye"></i> Ver
              </button>
            </div>
          </div>
        `;
      }).join('');
    }
  }

  // ---- Actividad reciente ----
  const activityList = document.getElementById('dashActivityList');
  if (activityList) {
    const businesses = JSON.parse(localStorage.getItem('fynderBusinesses') || '[]');
    const activities = [];

    activities.push({ dot: '#10B981', text: 'Sesión iniciada correctamente', time: 'Ahora' });
    if (businesses.length > 0) {
      activities.push({ dot: '#67B8B4', text: `Negocio "${businesses[businesses.length-1].name || 'Sin nombre'}" registrado`, time: 'Reciente' });
    }
    if (favorites && favorites.size > 0) {
      activities.push({ dot: '#F4D35E', text: `${favorites.size} negocio${favorites.size!==1?'s':''} guardado${favorites.size!==1?'s':''}`, time: 'Esta sesión' });
    }
    activities.push({ dot: '#2F5BB7', text: `Plan ${planInfo.name} activo`, time: since || 'Hoy' });

    activityList.innerHTML = activities.map(a => `
      <div class="dash-activity-item">
        <span class="dash-activity-dot" style="background:${a.dot}"></span>
        <span class="dash-activity-text">${a.text}</span>
        <span class="dash-activity-time">${a.time}</span>
      </div>
    `).join('');
  }
}

// abre detalle del negocio
function openBusinessDetail(index) {
  const businesses = JSON.parse(localStorage.getItem('fynderBusinesses') || '[]');
  const biz = businesses[index];
  if (!biz) return;
  // Buscar en BUSINESSES por nombre
  const match = BUSINESSES.find(b => b.name === biz.name);
  if (match) {
    openModal(match.id);
  } else {
    showToast('Este negocio aún no está en el directorio público.');
  }
}


// animaciones pagina saber mas

let fynderObserver = null;
