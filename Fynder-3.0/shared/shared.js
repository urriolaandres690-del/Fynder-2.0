/* ── Portada ── */
function updateCoverPreview(url) {
  const img   = document.getElementById('writeCoverImg');
  const ph    = document.getElementById('writeCoverPlaceholder');
  const rmBtn = document.getElementById('writeCoverRemove');
  if (!img) return;
  if (url && url.startsWith('http')) {
    img.src = url;
    img.style.display = 'block';
    if (ph)    ph.style.display    = 'none';
    if (rmBtn) rmBtn.style.display = 'flex';
  } else {
    img.style.display = 'none';
    img.src = '';
    if (ph)    ph.style.display    = 'flex';
    if (rmBtn) rmBtn.style.display = 'none';
  }
  updateWritePreview();
}

function removeCoverImage() {
  const urlInput = document.getElementById('writeCoverUrl');
  if (urlInput) urlInput.value = '';
  updateCoverPreview('');
}

/* ── Helpers de conteo ── */
function updateWriteCharCount(inputId, countId, max) {
  const input = document.getElementById(inputId);
  const count = document.getElementById(countId);
  if (input && count) count.textContent = input.value.length;
}

function autoResizeTextarea(el) {
  el.style.height = 'auto';
  el.style.height = el.scrollHeight + 'px';
}

/* ── Formato y herramientas del editor ── */
function writeFormat(cmd) {
  document.getElementById('writeEditor')?.focus();
  document.execCommand(cmd, false, null);
  onWriteEditorInput();
}

function writeInsert(type) {
  const editor = document.getElementById('writeEditor');
  if (!editor) return;
  editor.focus();
  const sel          = window.getSelection();
  const selectedText = sel && !sel.isCollapsed ? sel.toString() : '';

  const inserts = {
    h2:        `<h2>${selectedText || 'Título de sección'}</h2>`,
    h3:        `<h3>${selectedText || 'Subtítulo'}</h3>`,
    ul:        `<ul><li>${selectedText || 'Elemento de lista'}</li></ul>`,
    ol:        `<ol><li>${selectedText || 'Elemento numerado'}</li></ol>`,
    quote:     `<blockquote>${selectedText || 'Cita aquí...'}</blockquote>`,
    hr:        `<hr>`,
    link:      `<a href="https://">${selectedText || 'texto del enlace'}</a>`,
    highlight: `<mark>${selectedText || 'texto destacado'}</mark>`,
  };

  if (inserts[type]) {
    document.execCommand('insertHTML', false, inserts[type]);
    onWriteEditorInput();
  }
}

function clearWriteEditor() {
  const editor = document.getElementById('writeEditor');
  if (!editor) return;
  editor.innerHTML = '';
  onWriteEditorInput();
}

function onWriteEditorInput() {
  const editor = document.getElementById('writeEditor');
  if (!editor) return;
  const text  = editor.innerText || '';
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const el    = document.getElementById('writeWordCount');
  const ec    = document.getElementById('writeEditorCharCount');
  if (el) el.textContent = words + ' palabras';
  if (ec) ec.textContent = text.length + ' caracteres';
  updateWritePreview();
}

function handleWriteEditorKey(e) {
  if (e.key === 'b' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); writeFormat('bold'); }
  if (e.key === 'i' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); writeFormat('italic'); }
}

/* ── Preview ── */
function toggleWritePreview() {
  const previewPanel = document.getElementById('writePreviewPanel');
  const btn          = document.getElementById('writeBtnPreview');
  if (!previewPanel) return;

  const showing = previewPanel.style.display !== 'none';
  previewPanel.style.display = showing ? 'none' : 'block';
  if (btn) btn.classList.toggle('active', !showing);
  if (!showing) updateWritePreview();
}

function updateWritePreview() {
  const title    = (document.getElementById('writeTitle')    || {}).value || '';
  const category = (document.getElementById('writeCategory') || {}).value || '';
  const readTime = (document.getElementById('writeReadTime') || {}).value || '3 min';
  const author   = (document.getElementById('writeAuthor')   || {}).value || 'Autor';
  const coverUrl = (document.getElementById('writeCoverUrl') || {}).value || '';
  const bodyHTML = document.getElementById('writeEditor')?.innerHTML || '';

  const previewTitle   = document.getElementById('previewTitle');
  const previewCat     = document.getElementById('previewCategory');
  const previewBody    = document.getElementById('previewBody');
  const previewRead    = document.getElementById('previewReadTime');
  const previewAuthor  = document.getElementById('previewAuthorName');
  const previewAv      = document.getElementById('previewAuthorAv');
  const previewDate    = document.getElementById('previewDate');
  const previewHero    = document.getElementById('previewHero');
  const previewHeroImg = document.getElementById('previewHeroImg');

  if (previewTitle)  previewTitle.textContent  = title || 'Tu título aparecerá aquí';
  if (previewCat)    previewCat.textContent     = category;
  if (previewBody)   previewBody.innerHTML      = bodyHTML;
  if (previewRead)   previewRead.textContent    = readTime;
  if (previewAuthor) previewAuthor.textContent  = author || 'Autor';
  if (previewAv)     previewAv.textContent      = (author || '?').charAt(0).toUpperCase();
  if (previewDate)   previewDate.textContent    = new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });

  if (previewHero && previewHeroImg) {
    if (coverUrl && coverUrl.startsWith('http')) {
      previewHeroImg.src = coverUrl;
      previewHero.style.display = 'block';
    } else {
      previewHero.style.display = 'none';
    }
  }
}

/* ── Publicar artículo ── */
function publishArticle() {
  const title    = (document.getElementById('writeTitle')    || {}).value?.trim();
  const category = (document.getElementById('writeCategory') || {}).value;
  const readTime = (document.getElementById('writeReadTime') || {}).value || '3 min';
  const author   = (document.getElementById('writeAuthor')   || {}).value?.trim();
  const coverUrl = (document.getElementById('writeCoverUrl') || {}).value?.trim();
  const bodyHTML = document.getElementById('writeEditor')?.innerHTML || '';
  const bodyText = document.getElementById('writeEditor')?.innerText?.trim() || '';

  if (!title)    { showToast('El artículo necesita un título.', 'error'); return; }
  if (!bodyText) { showToast('El artículo no tiene contenido.', 'error'); return; }

  const logged      = !!localStorage.getItem('fynderLogged');
  const user        = JSON.parse(localStorage.getItem('fynderUser') || 'null');
  const finalAuthor = author || (logged && user ? user.name : 'Visitante');

  const now     = new Date();
  const dateStr = now.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });

  const articles   = JSON.parse(localStorage.getItem('fynderUserArticles') || '[]');
  const newArticle = {
    id:      'u_' + Date.now(),
    title, category,
    summary: bodyText.substring(0, 180) + (bodyText.length > 180 ? '…' : ''),
    body:    bodyHTML,
    image:   coverUrl || 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=350&fit=crop&auto=format',
    author:  finalAuthor,
    authorInitial: finalAuthor.charAt(0).toUpperCase(),
    date: dateStr, readTime,
  };
  articles.push(newArticle);
  localStorage.setItem('fynderUserArticles', JSON.stringify(articles));

  showToast('¡Artículo publicado exitosamente! 🎉');
  goPage('blog');
}
