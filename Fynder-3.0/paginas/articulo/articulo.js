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

