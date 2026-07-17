// ── sobre-fynder.js ──

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