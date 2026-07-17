/**
 * ═══════════════════════════════════════════════════════════════
 *  Fynder — JS de: blog
 *  Extraído de fynder.js
 *
 *  Las funciones GLOBALES (goPage, toggleFav, showToast, etc.)
 *  están en shared/fynder.js — este archivo contiene solo
 *  las funciones específicas de esta sección.
 * ═══════════════════════════════════════════════════════════════
 */

function subscribeBlog(event) {
    event.preventDefault();
    const email = document.getElementById("blogEmail").value.trim();
    if (!email) return;
    // Demo: guardar en localStorage
    const subs = JSON.parse(localStorage.getItem("fynderBlogSubs") || "[]");
    if (subs.includes(email)) {
        showToast("Este correo ya está suscrito.", "error");
        return;
    }
    subs.push(email);
    localStorage.setItem("fynderBlogSubs", JSON.stringify(subs));
    document.getElementById("blogEmail").value = "";
    showToast("¡Suscripción exitosa! Te avisaremos cuando haya nuevo contenido 📬");
}

function openArticle(id) {
  const articles = {

function openArticle(id) {
  const articles = {
    "1": {
      title: "Cómo llevar tu negocio local al siguiente nivel con presencia digital",
      category: "Emprendimiento", color: "#67B8B4",
      author: "Ana Martínez", authorInitial: "A", authorGrad: "135deg,#67B8B4,#2F5BB7",
      date: "15 jun 2026", readTime: "5 min",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&h=450&fit=crop&auto=format",
      body: `<p>En un mundo cada vez más conectado, tener visibilidad digital ya no es opcional para los negocios locales. Los estudios muestran que el <strong>87% de los consumidores</strong> busca información en línea antes de visitar un negocio físico.</p>
<h3>¿Por qué importa la presencia digital?</h3>
<p>Un negocio sin presencia en internet es prácticamente invisible para una generación entera de consumidores. Sin embargo, estar en línea no significa tener una web costosa o compleja. Plataformas como FYNDER te dan visibilidad inmediata y gratuita.</p>
<h3>Pasos para empezar hoy mismo</h3>
<p><strong>1. Registra tu negocio en FYNDER.</strong> Es gratis, toma menos de 2 minutos y te coloca frente a miles de usuarios locales que buscan exactamente lo que ofreces.</p>
<p><strong>2. Completa tu perfil al 100%.</strong> Agrega fotos de calidad, horarios actualizados y una descripción clara de tus servicios. Los negocios con perfiles completos reciben hasta 3 veces más visitas.</p>
<p><strong>3. Activa tus redes sociales.</strong> No necesitas estar en todas. Elige una o dos plataformas donde esté tu cliente ideal y publica de forma constante.</p>
<p><strong>4. Pide reseñas a tus clientes.</strong> Las opiniones positivas son el mejor marketing que existe. Un cliente satisfecho que deja una reseña vale oro.</p>
<h3>El impacto real de dar el salto digital</h3>
<p>Los negocios que dan el salto digital reportan en promedio un <strong>23% más de clientes</strong> en los primeros 6 meses. No es magia, es visibilidad. Cuando alguien en tu ciudad busca lo que vendes, tú apareces.</p>
<p>FYNDER fue creado exactamente para esto: eliminar las barreras digitales para los emprendedores locales. No necesitas saber de tecnología, no necesitas presupuesto. Solo necesitas empezar.</p>`
    },
    "2": {
      title: "5 razones para preferir los restaurantes de tu barrio",
      category: "Gastronomía", color: "#EF4444",
      author: "Carlos Vega", authorInitial: "C", authorGrad: "135deg,#EF4444,#F97316",
      date: "10 jun 2026", readTime: "4 min",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&h=450&fit=crop&auto=format",
      body: `<p>Cadenas internacionales y franquicias dominan el paisaje gastronómico urbano. Sin embargo, los restaurantes locales tienen algo que ninguna cadena puede replicar: <strong>alma, historia e ingredientes del territorio</strong>.</p>
<h3>1. Ingredientes más frescos</h3>
<p>Los restaurantes locales suelen abastecerse de mercados y productores cercanos. Eso se traduce en ingredientes más frescos, más nutritivos y con mejor sabor que los productos procesados a escala industrial.</p>
<h3>2. Recetas únicas e irrepetibles</h3>
<p>Detrás de cada plato hay una historia familiar, una tradición que se ha pasado de generación en generación. Es imposible encontrar ese sancocho de gallina o esa sopa de frijoles en ningún otro lugar del mundo.</p>
<h3>3. Tu dinero se queda en la comunidad</h3>
<p>Estudios económicos demuestran que el <strong>68% del dinero gastado</strong> en negocios locales permanece circulando en la comunidad, frente al 43% en cadenas nacionales y apenas el 28% en franquicias internacionales.</p>
<h3>4. Atención personalizada</h3>
<p>En el restaurante de tu barrio, el dueño te conoce por tu nombre, recuerda que no te gusta el picante y sabe cuál es tu plato favorito. Ese nivel de atención es imposible de escalar en una franquicia.</p>
<h3>5. Apoya a tu vecino</h3>
<p>Detrás de cada restaurante local hay una familia que trabaja duro para sacar adelante un sueño. Cada vez que eliges su menú sobre el de una cadena, estás invirtiendo en la historia de tu comunidad.</p>`
    },
    "3": {
      title: "Guía para registrar tu negocio en FYNDER paso a paso",
      category: "Emprendimiento", color: "#2F5BB7",
      author: "María López", authorInitial: "M", authorGrad: "135deg,#2F5BB7,#67B8B4",
      date: "5 jun 2026", readTime: "3 min",
      image: "https://images.unsplash.com/photo-1556742111-a301076d9d18?w=900&h=450&fit=crop&auto=format",
      body: `<p>Registrar tu negocio en FYNDER es completamente gratuito y toma menos de 2 minutos. Aquí te explicamos cada paso para que tu perfil quede impecable desde el primer día.</p>
<h3>Paso 1: Haz clic en "Registrar negocio"</h3>
<p>Encontrarás este botón en la barra de navegación superior o en la sección principal de la página de inicio. Te llevará directamente al formulario de registro.</p>
<h3>Paso 2: Completa la información básica</h3>
<p>Nombre del negocio, categoría, descripción, dirección, teléfono y horario. Tómate tu tiempo para escribir una buena descripción: es lo primero que verán los clientes potenciales.</p>
<h3>Paso 3: Agrega tus redes sociales</h3>
<p>Si tienes Instagram, Facebook o página web, añádelos. Los usuarios podrán seguirte directamente desde tu perfil en FYNDER.</p>
<h3>Paso 4: Publica</h3>
<p>Haz clic en "Publicar negocio" y listo. Tu negocio aparecerá instantáneamente en el directorio y estará visible para todos los usuarios de tu área.</p>
<h3>Consejos para un perfil exitoso</h3>
<p>✓ Usa una descripción clara y específica de lo que ofreces.</p>
<p>✓ Mantén tus horarios actualizados, especialmente en días festivos.</p>
<p>✓ Responde rápido cuando los clientes te contacten a través de tus redes.</p>`
    },
    "4": {
      title: "Los mejores salones de belleza en tu ciudad: ¿cómo elegir el tuyo?",
      category: "Estilo de vida", color: "#EC4899",
      author: "Laura Soto", authorInitial: "L", authorGrad: "135deg,#EC4899,#8B5CF6",
      date: "1 jun 2026", readTime: "4 min",
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=900&h=450&fit=crop&auto=format",
      body: `<p>Encontrar el salón de belleza ideal puede ser una odisea si no sabes qué buscar. Más allá del precio, hay varios factores que determinan si un lugar realmente vale la pena.</p>
<h3>La especialidad importa</h3>
<p>No todos los salones son expertos en todos los servicios. Algunos se especializan en coloración, otros en tratamientos capilares o en uñas. Antes de ir, investiga en qué destacan.</p>
<h3>Lee las reseñas con criterio</h3>
<p>Las opiniones de otros clientes son invaluables. Busca reseñas específicas sobre el servicio que te interesa. Una calificación alta en cortes no garantiza que los tratamientos de keratina sean igualmente buenos.</p>
<h3>La consulta inicial lo dice todo</h3>
<p>Un buen estilista siempre preguntará sobre el historial de tu cabello antes de aplicar cualquier producto. Si no lo hace, es una señal de alerta.</p>
<h3>El ambiente y la limpieza</h3>
<p>Un salón limpio y ordenado refleja la profesionalidad del equipo. Fíjate en los instrumentos de trabajo: deben estar desinfectados y en buen estado.</p>
<h3>Cómo usar FYNDER para encontrarlo</h3>
<p>Filtra por la categoría "Belleza" en nuestro directorio y compara los perfiles. Revisa las fotos, las reseñas de clientes reales y los servicios específicos de cada salón antes de hacer tu cita.</p>`
    },
    "5": {
      title: "Dónde reparar tu smartphone sin salir del barrio",
      category: "Tecnología", color: "#2F5BB7",
      author: "Roberto Díaz", authorInitial: "R", authorGrad: "135deg,#2F5BB7,#1E8F8B",
      date: "28 may 2026", readTime: "3 min",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&h=450&fit=crop&auto=format",
      body: `<p>La pantalla rota de un smartphone es hoy tan común como un grifo que gotea. Y al igual que para el grifo, no hay razón para llamar a alguien de la otra punta de la ciudad cuando hay un especialista a pocas cuadras de tu casa.</p>
<h3>¿Por qué evitar las cadenas de reparación masivas?</h3>
<p>Los centros de reparación de las grandes cadenas suelen tener tiempos de espera largos, precios inflados y a veces usan repuestos genéricos. Los técnicos locales especializados, en cambio, conocen cada modelo al dedillo y trabajan con piezas de calidad.</p>
<h3>Qué buscar en un buen técnico</h3>
<p><strong>Garantía escrita.</strong> Un técnico confiable siempre te da garantía por el trabajo realizado, generalmente entre 30 y 90 días.</p>
<p><strong>Diagnóstico gratuito.</strong> Antes de comprometerte a pagar, tienes derecho a saber exactamente qué le pasa a tu equipo y cuánto costará arreglarlo.</p>
<p><strong>Repuestos originales o certificados.</strong> Pregunta siempre qué tipo de piezas van a usar.</p>
<h3>Usa FYNDER para encontrar técnicos certificados</h3>
<p>En nuestra categoría "Tecnología" encontrarás talleres de reparación verificados cerca de ti. Lee las reseñas de clientes anteriores para elegir con confianza.</p>`
    },
    "6": {
      title: "El impacto real de comprar local: datos que sorprenden",
      category: "Comunidad", color: "#10B981",
      author: "Paola Ruiz", authorInitial: "P", authorGrad: "135deg,#10B981,#67B8B4",
      date: "22 may 2026", readTime: "5 min",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=900&h=450&fit=crop&auto=format",
      body: `<p>Detrás de cada compra local hay una cadena de efectos positivos que van mucho más allá del simple intercambio comercial. Los números son contundentes y deberían cambiar la forma en que todos tomamos decisiones de consumo.</p>
<h3>El efecto multiplicador del dinero local</h3>
<p>Según investigaciones del Institute for Local Self-Reliance, por cada <strong>$100 gastados en un negocio local</strong>, $68 permanecen en la comunidad, frente a $43 de cadenas nacionales y apenas $28 de grandes franquicias internacionales.</p>
<h3>Empleos de calidad</h3>
<p>Los pequeños negocios locales generan el <strong>60-80% de los nuevos empleos</strong> en economías en desarrollo. Son empleos con horarios humanos, cercanía al hogar y trato personalizado que las cadenas rara vez ofrecen.</p>
<h3>Diversidad económica y resiliencia</h3>
<p>Las ciudades con economías dominadas por negocios locales diversificados son más resistentes a las crisis económicas que aquellas dependientes de pocas cadenas grandes. Cuando cierran los gigantes, los locales siguen.</p>
<h3>El impacto medioambiental</h3>
<p>Comprar local generalmente significa cadenas de suministro más cortas, menos embalaje industrial y menor huella de carbono. El pan que compras en la panadería de la esquina recorrió muchísimos menos kilómetros que el de la gran cadena de supermercados.</p>
<h3>¿Qué puedes hacer tú hoy?</h3>
<p>La próxima vez que necesites algo, busca primero en FYNDER si hay un negocio local cerca que lo ofrezca. El cambio empieza con decisiones pequeñas y cotidianas.</p>`
    },
    "7": {
      title: "7 fotos que transformarán el perfil de tu negocio",
      category: "Consejos", color: "#F97316",
      author: "Jorge Castillo", authorInitial: "J", authorGrad: "135deg,#F97316,#F4D35E",
      date: "18 may 2026", readTime: "4 min",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=900&h=450&fit=crop&auto=format",
      body: `<p>Una imagen vale más que mil palabras, especialmente en el mundo digital. Los perfiles con al menos 5 fotos de calidad reciben hasta <strong>3 veces más clics</strong> que los que no tienen imágenes. Y lo mejor: no necesitas un fotógrafo profesional.</p>
<h3>Foto 1: La fachada o entrada</h3>
<p>Que los clientes reconozcan tu negocio cuando lleguen. Una foto clara de la entrada, tomada con buena luz natural, es esencial.</p>
<h3>Foto 2: El ambiente interior</h3>
<p>Muestra cómo se siente estar dentro. Busca la mejor iluminación, ordena el espacio y captura la esencia de tu negocio.</p>
<h3>Foto 3: Tu producto o servicio estrella</h3>
<p>¿Cuál es el plato más pedido? ¿El producto del que más te enorgulleces? Esa foto tiene que brillar.</p>
<h3>Foto 4: El equipo humano</h3>
<p>Las personas detrás de un negocio generan confianza. Una foto del equipo sonriente humaniza tu marca y crea conexión emocional.</p>
<h3>Foto 5: El proceso</h3>
<p>Un pastelero decorando una torta, un mecánico revisando un motor, una estilista trabajando. El proceso en acción genera credibilidad.</p>
<h3>Fotos 6 y 7: Clientes felices y detalles únicos</h3>
<p>Con su permiso, fotografía a clientes satisfechos. Y captura esos pequeños detalles que hacen especial a tu negocio: la pizarra del menú, el detalle en el empaque, la planta en el mostrador.</p>
<h3>Tip final</h3>
<p>Usa siempre luz natural cuando sea posible, limpia el lente del celular antes de fotografiar y toma varias opciones para elegir la mejor. La fotografía móvil actual es más que suficiente para brillar en FYNDER.</p>`
    }
  };

  const art = articles[id];
  if(!art){ showToast("Artículo no encontrado.", "error"); return; }

  // Llenar la página de artículo
  document.getElementById('artHeroImg').src = art.image;
  document.getElementById('artHeroImg').alt = art.title;
  document.getElementById('artCatLabel').textContent = art.category;
  document.getElementById('artCatLabel').style.color = art.color;
  document.getElementById('artTitle').textContent = art.title;
  document.getElementById('artAuthorAv').style.background = `linear-gradient(${art.authorGrad})`;
  document.getElementById('artAuthorAv').textContent = art.authorInitial;
  document.getElementById('artAuthorName').textContent = art.author;
  document.getElementById('artDate').textContent = art.date;
  document.getElementById('artReadTime').textContent = art.readTime;
  document.getElementById('artBody').innerHTML = art.body;

  _currentArticleId = id;
  renderArticleComments(id);

  goPage('article');
}

/* ── Sistema de comentarios de artículos ── */
let _currentArticleId = null;
const ART_COMMENT_COLORS = [
  'linear-gradient(135deg,#67B8B4,#2F5BB7)',
  'linear-gradient(135deg,#EF4444,#F97316)',
  'linear-gradient(135deg,#10B981,#67B8B4)',

/* ── Sistema de comentarios de artículos ── */
let _currentArticleId = null;
const ART_COMMENT_COLORS = [
  'linear-gradient(135deg,#67B8B4,#2F5BB7)',
  'linear-gradient(135deg,#EF4444,#F97316)',
  'linear-gradient(135deg,#10B981,#67B8B4)',
  'linear-gradient(135deg,#8B5CF6,#EC4899)',
  'linear-gradient(135deg,#2F5BB7,#1E8F8B)',
  'linear-gradient(135deg,#F97316,#F4D35E)',
];

function _getArticleComments(articleId) {
  try { return JSON.parse(localStorage.getItem('fynderComments_' + articleId) || '[]'); }
  catch(e){ return []; }
}
function _saveArticleComments(articleId, comments) {
  localStorage.setItem('fynderComments_' + articleId, JSON.stringify(comments));
}

function _getInitials(name) {
  if(!name || !name.trim()) return '?';
  const parts = name.trim().split(/\s+/);
  if(parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

function _getUserAvatarHTML(size = 36) {
  const stored  = localStorage.getItem('fynderAvatarPhoto');
  const preset  = localStorage.getItem('fynderAvatarPreset');
  const initBg  = localStorage.getItem('fynderAvatarInitialBg');
  const user    = JSON.parse(localStorage.getItem('fynderUser') || 'null');
  const name    = user?.name || 'Visitante';
  const initials = _getInitials(name);

  const base = `width:${size}px;height:${size}px;border-radius:50%;flex-shrink:0;overflow:hidden;display:flex;align-items:center;justify-content:center;`;
  if(stored) {
    return `<div style="${base}"><img src="${stored}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;display:block" alt="avatar"></div>`;
  } else if(preset) {
    return `<div style="${base}background:#F0FEFE;font-size:${size*0.55}px;line-height:1">${preset}</div>`;
  } else {
    const bg = initBg || 'linear-gradient(135deg,#67B8B4,#2F5BB7)';
    const fs = initials.length > 1 ? size*0.38 : size*0.45;
    return `<div style="${base}background:${bg};font-weight:700;font-size:${fs}px;color:#fff;font-family:'Poppins',sans-serif;letter-spacing:.5px">${initials}</div>`;
  }
}

function renderArticleComments(articleId) {
  const comments = _getArticleComments(articleId);
  const list = document.getElementById('artCommentList');
  const countEl = document.getElementById('artCommentCount');
  if(countEl) countEl.textContent = comments.length;
  if(!list) return;

  if(comments.length === 0) {
    list.innerHTML = `<div class="article-no-comments"><i class="fas fa-comments"></i>Sé el primero en comentar este artículo.</div>`;
    return;
  }

  const logged = !!localStorage.getItem('fynderLogged');
  const user   = JSON.parse(localStorage.getItem('fynderUser') || 'null');
  const likedKey = 'fynderCommentLikes_' + articleId;
  const liked = JSON.parse(localStorage.getItem(likedKey) || '[]');

  list.innerHTML = comments.slice()
    .sort((a, b) => {
      // Primero por likes DESC, empate por fecha (id timestamp) DESC
      const likeDiff = (b.likes || 0) - (a.likes || 0);
      if (likeDiff !== 0) return likeDiff;
      return parseInt(b.id) - parseInt(a.id);
    })
    .map((c) => {
    const isLiked = liked.includes(c.id);
    const isOwn   = logged && user && c.userId === (user.email || user.name);
    const colorIdx = c.colorIdx !== undefined ? c.colorIdx : 0;
    // Si el comentario guardó avatarPhoto, úsala; si no, usa el color
    let avatarHTML;
    if(c.avatarPhoto) {
      avatarHTML = `<img src="${c.avatarPhoto}" style="width:36px;height:36px;border-radius:50%;object-fit:cover;flex-shrink:0;display:block" alt="avatar">`;
    } else if(c.avatarPreset) {
      avatarHTML = `<div class="article-comment-av" style="background:#F0FEFE;font-size:1.1rem">${c.avatarPreset}</div>`;
    } else {
      const initFs = (c.initial && c.initial.length > 1) ? '.7rem' : '.9rem';
      avatarHTML = `<div class="article-comment-av" style="background:${ART_COMMENT_COLORS[colorIdx]};font-size:${initFs};letter-spacing:.5px">${c.initial}</div>`;
    }
    return `
    <div class="article-comment" id="comment-${c.id}">
      <div class="article-comment-header">
        ${avatarHTML}
        <div class="article-comment-meta">
          <span class="article-comment-name">${c.name}</span>
          <span class="article-comment-date">${c.date}</span>
        </div>
      </div>
      <div class="article-comment-text">${escapeHtml(c.text)}</div>
      <div class="article-comment-actions">
        <button class="article-comment-like-btn ${isLiked ? 'liked' : ''}" onclick="likeComment('${articleId}','${c.id}',this)">
          <i class="fas fa-heart"></i> ${c.likes || 0}
        </button>
        ${isOwn ? `<button class="article-comment-delete-btn" onclick="deleteComment('${articleId}','${c.id}')"><i class="fas fa-trash-alt"></i> Eliminar</button>` : ''}
      </div>
    </div>`;
  }).join('');
}

function artCommentCharCount(el) {
  const c = document.getElementById('artCommentChars');
  if(c) c.textContent = el.value.length + ' / 500';
}

function submitArticleComment() {
  const ta = document.getElementById('artCommentText');
  const text = ta ? ta.value.trim() : '';
  if(!text) { showToast('Escribe algo antes de comentar.', 'error'); return; }
  if(text.length < 3) { showToast('El comentario es demasiado corto.', 'error'); return; }

  const logged = !!localStorage.getItem('fynderLogged');
  const user   = JSON.parse(localStorage.getItem('fynderUser') || 'null');
  const name   = logged && user ? user.name : 'Visitante';
  const initial = _getInitials(name);
  const userId  = logged && user ? (user.email || user.name) : null;
  const colorIdx = Math.floor(Math.random() * ART_COMMENT_COLORS.length);

  // Capturar avatar actual del usuario
  const avatarPhoto  = localStorage.getItem('fynderAvatarPhoto') || null;
  const avatarPreset = !avatarPhoto ? (localStorage.getItem('fynderAvatarPreset') || null) : null;
  const avatarInitBg = (!avatarPhoto && !avatarPreset) ? (localStorage.getItem('fynderAvatarInitialBg') || null) : null;

  const now = new Date();
  const dateStr = now.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });

  const comment = {
    id: Date.now().toString(),
    name, initial, userId, colorIdx,
    avatarPhoto, avatarPreset, avatarInitBg,
    text,
    date: dateStr,
    likes: 0,
  };

  const comments = _getArticleComments(_currentArticleId);
  comments.push(comment);
  _saveArticleComments(_currentArticleId, comments);

  ta.value = '';
  artCommentCharCount(ta);
  renderArticleComments(_currentArticleId);
  showToast('¡Comentario publicado! 💬');
}

function likeComment(articleId, commentId, btn) {
  const likedKey = 'fynderCommentLikes_' + articleId;
  const liked = JSON.parse(localStorage.getItem(likedKey) || '[]');
  const comments = _getArticleComments(articleId);
  const idx = comments.findIndex(c => c.id === commentId);
  if(idx === -1) return;

  if(liked.includes(commentId)) {
    // unlike
    comments[idx].likes = Math.max(0, (comments[idx].likes || 0) - 1);
    const newLiked = liked.filter(l => l !== commentId);
    localStorage.setItem(likedKey, JSON.stringify(newLiked));
  } else {
    comments[idx].likes = (comments[idx].likes || 0) + 1;
    liked.push(commentId);
    localStorage.setItem(likedKey, JSON.stringify(liked));
    // Animación del corazón al dar like
    if(btn) {
      btn.classList.add('like-pop');
      setTimeout(() => btn.classList.remove('like-pop'), 350);
    }
  }
  _saveArticleComments(articleId, comments);
  renderArticleComments(articleId);
}

function deleteComment(articleId, commentId) {
  const comments = _getArticleComments(articleId);
  const newComments = comments.filter(c => c.id !== commentId);
  _saveArticleComments(articleId, newComments);
  renderArticleComments(articleId);
  showToast('Comentario eliminado.');
}

function escapeHtml(str) {
  return str
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;')
    .replace(/\n/g,'<br>');
}

function sendSupport(event) {
    event.preventDefault();
    const name    = document.getElementById("supportName").value.trim();
    const email   = document.getElementById("supportEmail").value.trim();
    const subject = document.getElementById("supportSubject").value;
    const msg     = document.getElementById("supportMsg").value.trim();
    if (!name || !email || !subject || !msg) return;
    // Demo: guardar en localStorage
    const tickets = JSON.parse(localStorage.getItem("fynderSupportTickets") || "[]");
    tickets.push({ name, email, subject, msg, date: new Date().toISOString() });
    localStorage.setItem("fynderSupportTickets", JSON.stringify(tickets));
    document.getElementById("supportForm").reset();
    showToast("¡Mensaje enviado! Te responderemos en menos de 24 horas 💬");
}

/*modo oscuro*/
function toggleDarkMode(){
    // Solo permitir modo oscuro si hay sesión activa
    if (!localStorage.getItem('fynderLogged')) {

