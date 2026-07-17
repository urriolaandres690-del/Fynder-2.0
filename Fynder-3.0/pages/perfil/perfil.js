/**
 * ═══════════════════════════════════════════════════════════════
 *  Fynder — JS de: perfil
 *  Extraído de fynder.js
 *
 *  Las funciones GLOBALES (goPage, toggleFav, showToast, etc.)
 *  están en shared/fynder.js — este archivo contiene solo
 *  las funciones específicas de esta sección.
 * ═══════════════════════════════════════════════════════════════
 */

function loadProfile(){
    const user = JSON.parse(localStorage.getItem("fynderUser"));
    if(!user){
        showToast("Debes iniciar sesión para ver tu perfil.", "error");
        goPage("login");
        return;
    }

    // Cabecera: nombre y email
    const pname  = document.getElementById("profileName");
    const pemail = document.getElementById("profileEmail");
    if(pname)  pname.textContent  = user.name;
    if(pemail) pemail.textContent = user.email;

    // Avatar y portada
    applyAvatarDisplay();
    applyProfileCover();

    // Ciudad badge
    const cityBadge = document.getElementById("profileCityBadge");
    const cityLabel = document.getElementById("profileCityLabel");
    if(cityBadge && cityLabel && user.city){
        cityLabel.textContent = user.city;
        cityBadge.style.display = 'inline-flex';
    } else if(cityBadge){
        cityBadge.style.display = 'none';
    }

    // Estado
    const savedStatus = localStorage.getItem("fynderUserStatus") || "active";
    applyStatusUI(savedStatus);

    // Campos del formulario
    const eName  = document.getElementById("profileEditName");
    const eEmail = document.getElementById("profileEditEmail");
    const ePhone = document.getElementById("profileEditPhone");
    const eCity  = document.getElementById("profileEditCity");
    const eBio   = document.getElementById("profileEditBio");
    if(eName)  eName.value  = user.name  || '';
    if(eEmail) eEmail.value = user.email || '';
    if(ePhone) ePhone.value = user.phone || '';
    if(eCity)  eCity.value  = user.city  || '';
    if(eBio){
        eBio.value = user.bio || '';
        updateBioCount();
        // Evitar duplicar el listener
        eBio.oninput = updateBioCount;
    }

    // Estadísticas
    const sf = document.getElementById("statFavs");
    const sb = document.getElementById("statBiz");
    if(sf) sf.textContent = favorites.size;
    if(sb) sb.textContent = JSON.parse(localStorage.getItem("fynderBusinesses")||"[]").length;

    hideAvatarOptions();
}

/* ── Avatar ── */
/* ── Avatar ── */
function applyAvatarDisplay(){
    const avt = document.getElementById("profileAvatar");
    if(!avt) return;
    const stored = localStorage.getItem("fynderAvatarPhoto");
    const preset = localStorage.getItem("fynderAvatarPreset");   // emoji preset
    const initBg = localStorage.getItem("fynderAvatarInitialBg"); // color inicial
    const user   = JSON.parse(localStorage.getItem("fynderUser"));

    if(stored){
        // Foto subida o tomada con cámara
        avt.innerHTML = `<img src="${stored}" alt="Foto de perfil" style="width:100%;height:100%;object-fit:cover;border-radius:50%;display:block">`;
        avt.style.background = '';
    } else if(preset){
        // Avatar emoji predeterminado
        avt.innerHTML = `<span style="font-size:1.9rem;line-height:1;pointer-events:none;user-select:none">${preset}</span>`;
        avt.style.background = '#F0FEFE';
    } else {
        // Iniciales del usuario con color elegido (o degradado por defecto)
        const initials = user?.name ? _getInitials(user.name) : '?';
        const bg = initBg || 'linear-gradient(135deg,#67B8B4,#2F5BB7)';
        avt.style.background = bg;
        const fs = initials.length > 1 ? '1.3rem' : '1.6rem';
        avt.innerHTML = `<span style="font-size:${fs};font-weight:800;color:#fff;pointer-events:none;user-select:none;font-family:'Poppins',sans-serif;letter-spacing:1px">${initials}</span>`;
    }
}

/* ── Portada: usa background-image para no tocar el DOM del div ── */
function applyProfileCover(){
    const cover = document.getElementById("profileCover");
    if(!cover) return;
    const photo  = localStorage.getItem("fynderCoverPhoto");
    const icon   = cover.querySelector('.profile-cover-default-icon');
    const delBtn = document.getElementById('coverDelBtn');
    if(photo){
        cover.style.backgroundImage    = `url(${photo})`;
        cover.style.backgroundSize     = 'cover';
        cover.style.backgroundPosition = 'center';
        if(icon)   icon.style.visibility = 'hidden';
        if(delBtn) delBtn.style.display  = 'inline-flex';
    } else {
        cover.style.backgroundImage = '';
        if(icon)   icon.style.visibility = '';
        if(delBtn) delBtn.style.display  = 'none';
    }
}

function onCoverFileSelected(event){
    const file = event.target.files && event.target.files[0];
    if(!file) return;
    if(!file.type.startsWith('image/')){
        showToast('Selecciona un archivo de imagen.', 'error'); return;
    }
    if(file.size > 8 * 1024 * 1024){
        showToast('La imagen supera 8 MB.', 'error'); return;
    }
    const reader = new FileReader();
    reader.onload = function(e){
        localStorage.setItem('fynderCoverPhoto', e.target.result);
        applyProfileCover();
        showToast('¡Foto de portada actualizada! 🖼️');
    };
    reader.readAsDataURL(file);
    event.target.value = '';
}

function removeCover(){
    localStorage.removeItem("fynderCoverPhoto");
    applyProfileCover();
    showToast("Foto de portada eliminada.");
}

/* ── Disparadores de file input — se recrean cada vez para garantizar el disparo del evento ── */
function _openFilePicker(accept, callback){
    // Eliminar cualquier input previo
    const old = document.getElementById('_dynFileInput');
    if(old) old.remove();

    const inp = document.createElement('input');
    inp.type = 'file';
    inp.id   = '_dynFileInput';
    inp.accept = accept;
    inp.style.cssText = 'position:fixed;top:-9999px;left:-9999px;opacity:0;width:1px;height:1px';
    inp.addEventListener('change', function(){
        if(this.files && this.files[0]) callback(this.files[0]);
        this.remove();
    });
    document.body.appendChild(inp);
    // Pequeño timeout para que el DOM lo registre antes del click
    setTimeout(() => inp.click(), 10);
}

function triggerAvatarPicker(){
    hideAvatarOptions();
    _openFilePicker('image/*', (file) => _saveImageToStorage(file, 'avatar'));
}

function triggerCameraCapture(){
    hideAvatarOptions();
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
        cameraOpen('avatar');
    } else {
        _openFilePicker('image/*', (file) => _saveImageToStorage(file, 'avatar'));
        showToast('Cámara no disponible. Selecciona una imagen guardada.');
    }
}

function triggerCoverPicker(){
    _openFilePicker('image/*', (file) => _saveImageToStorage(file, 'cover'));
}

function _saveImageToStorage(file, target){
    if(!file.type.startsWith('image/')){
        showToast('Selecciona un archivo de imagen válido.', 'error'); return;
    }
    const maxMB = target === 'cover' ? 8 : 5;
    if(file.size > maxMB * 1024 * 1024){
        showToast(`La imagen supera ${maxMB} MB. Elige una más pequeña.`, 'error'); return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
        const dataUrl = e.target.result;
        if(target === 'cover'){
            localStorage.setItem('fynderCoverPhoto', dataUrl);
            applyProfileCover();
            showToast('¡Foto de portada actualizada! 🖼️');
        } else {
            // Al subir foto real, limpiar preset e inicial
            localStorage.removeItem('fynderAvatarPreset');
            localStorage.removeItem('fynderAvatarInitialBg');
            localStorage.setItem('fynderAvatarPhoto', dataUrl);
            applyAvatarDisplay();
            _saveCurrentAccount();  // sincronizar foto en la lista de cuentas
            showToast('¡Foto de perfil actualizada! 📸');
        }
    };
    reader.readAsDataURL(file);
}

// handlers de cambio de archivo
function handleAvatarChange(input){
    const file = input.files && input.files[0];
    if(file) _saveImageToStorage(file, 'avatar');
    input.value = '';   // reset para poder subir el mismo archivo de nuevo
}

function handleCoverChange(input){
    const file = input.files && input.files[0];
    if(file) _saveImageToStorage(file, 'cover');
    input.value = '';
}

/* ── Cámara con getUserMedia ── */
let _cameraStream = null;
let _cameraTarget = 'avatar'; // 'avatar' | 'cover'

function cameraOpen(target){
    _cameraTarget = target || 'avatar';
    const modal = document.getElementById('cameraModal');
    const video = document.getElementById('cameraVideo');
    if(!modal || !video) return;

    navigator.mediaDevices.getUserMedia({ video: { width:640, height:480, facingMode:'user' }, audio:false })
        .then(stream => {
            _cameraStream = stream;
            video.srcObject = stream;
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        })
        .catch(err => {
            console.warn('Camera error:', err);
            // Fallback a input file si la cámara falla
            _openFilePicker('image/*', (file) => _saveImageToStorage(file, _cameraTarget));
            showToast('No se pudo acceder a la cámara. Selecciona una foto guardada.', 'error');
        });
}

function cameraSnap(){
    const video  = document.getElementById('cameraVideo');
    const canvas = document.getElementById('cameraCanvas');
    if(!video || !canvas) return;

    canvas.width  = video.videoWidth  || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    // Espejo horizontal (selfie natural)
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL('image/jpeg', 0.88);
    cameraClose();

    if(_cameraTarget === 'cover'){
        localStorage.setItem('fynderCoverPhoto', dataUrl);
        applyProfileCover();
        showToast('¡Foto de portada tomada! 🖼️');
    } else {
        localStorage.removeItem('fynderAvatarPreset');
        localStorage.removeItem('fynderAvatarInitialBg');
        localStorage.setItem('fynderAvatarPhoto', dataUrl);
        applyAvatarDisplay();
        _saveCurrentAccount();  // sincronizar foto en la lista de cuentas
        showToast('¡Foto de perfil tomada! 📸');
    }
}

function cameraClose(){
    const modal = document.getElementById('cameraModal');
    if(modal) modal.style.display = 'none';
    document.body.style.overflow = '';
    if(_cameraStream){
        _cameraStream.getTracks().forEach(t => t.stop());
        _cameraStream = null;
    }
}

/* ── Panel de opciones de avatar ── */

// colores del avatar
const INITIAL_COLORS = [
    'linear-gradient(135deg,#67B8B4,#2F5BB7)',
    'linear-gradient(135deg,#EF4444,#EC4899)',
    'linear-gradient(135deg,#F59E0B,#EF4444)',
    'linear-gradient(135deg,#10B981,#0EA5E9)',
    'linear-gradient(135deg,#8B5CF6,#EC4899)',
    'linear-gradient(135deg,#0EA5E9,#2F5BB7)',
    'linear-gradient(135deg,#F97316,#FBBF24)',
    'linear-gradient(135deg,#6366F1,#8B5CF6)',
];

// emojis predeterminados
const AVATAR_PRESETS = [
    '🦊','🐺','🦁','🐯','🐻','🐼',
    '🐨','🐸','🦋','🐙','🦄','🐲',
    '🤖','👾','👻','🎃','🐦‍⬛','🐋',
    '🎯','🚀','⚡','🌟','🔥','💎',
    '💀','🐱','🦝','🐞','🦈','🐌',
    '🐝','🐍','🦖','🐢','🦑','🐬',
    '🐦‍🔥','🦥','🦇','🐹','🐭','🐰',
    '🦭','🐶','🐙','🦕','🦉','👽',
];

function showAvatarOptions(){
    const panel = document.getElementById("avatarOptionsPanel");
    if(!panel) return;
    const isHidden = panel.classList.contains("hide");
    if(isHidden){
        _buildInitialsGrid();
        _buildPresetsGrid();
        panel.classList.remove("hide");
    } else {
        panel.classList.add("hide");
    }
}

function hideAvatarOptions(){
    const panel = document.getElementById("avatarOptionsPanel");
    if(panel) panel.classList.add("hide");
}

function _buildInitialsGrid(){
    const container = document.getElementById("avatarInitialsGrid");
    if(!container) return;
    const user     = JSON.parse(localStorage.getItem("fynderUser"));
    const initials = user?.name ? _getInitials(user.name) : '?';
    const current  = localStorage.getItem("fynderAvatarInitialBg");

    container.innerHTML = INITIAL_COLORS.map((bg, i) => {
        const sel = (!localStorage.getItem("fynderAvatarPhoto") && !localStorage.getItem("fynderAvatarPreset") && bg === (current || INITIAL_COLORS[0])) ? 'selected' : '';
        return `<button class="avatar-initial-chip ${sel}" style="background:${bg}" onclick="setAvatarInitial('${bg}')" title="Iniciales ${initials}">${initials}</button>`;
    }).join('');
}

function _buildPresetsGrid(){
    const container = document.getElementById("avatarPresetsGrid");
    if(!container) return;
    const current = localStorage.getItem("fynderAvatarPreset");

    container.innerHTML = AVATAR_PRESETS.map(emoji => {
        const sel = emoji === current ? 'selected' : '';
        return `<button class="avatar-preset-item ${sel}" onclick="setAvatarPreset('${emoji}')" title="${emoji}">${emoji}</button>`;
    }).join('');
}

function setAvatarInitial(bg){
    localStorage.removeItem("fynderAvatarPhoto");
    localStorage.removeItem("fynderAvatarPreset");
    localStorage.setItem("fynderAvatarInitialBg", bg);
    applyAvatarDisplay();
    hideAvatarOptions();
    showToast("¡Avatar de inicial actualizado! ✨");
}

function setAvatarPreset(emoji){
    localStorage.removeItem("fynderAvatarPhoto");
    localStorage.removeItem("fynderAvatarInitialBg");
    localStorage.setItem("fynderAvatarPreset", emoji);
    applyAvatarDisplay();
    hideAvatarOptions();
    showToast(`¡Avatar ${emoji} seleccionado!`);
}

function removeAvatar(){
    localStorage.removeItem("fynderAvatarPhoto");
    localStorage.removeItem("fynderAvatarPreset");
    localStorage.removeItem("fynderAvatarInitialBg");
    applyAvatarDisplay();
    hideAvatarOptions();
    showToast("Foto de perfil eliminada.");
}

/* ── Estado del usuario ── */
const STATUS_CONFIG = {
    active:    { label:'Activo',        color:'#22C55E', bg:'#DCFCE7', textColor:'#16A34A', dot:'●' },
    away:      { label:'Ausente',       color:'#F59E0B', bg:'#FEF3C7', textColor:'#D97706', dot:'●' },
    busy:      { label:'Ocupado',       color:'#EF4444', bg:'#FEF2F2', textColor:'#DC2626', dot:'●' },
    dnd:       { label:'No molestar',   color:'#6B7280', bg:'#F3F4F6', textColor:'#4B5563', dot:'⊘' },
    invisible: { label:'Invisible',     color:'#9CA3AF', bg:'#F9FAFB', textColor:'#6B7280', dot:'○' },
    offline:   { label:'Desactivado',   color:'#374151', bg:'#F3F4F6', textColor:'#374151', dot:'●' },
};

function toggleStatusDropdown(){
    const dd = document.getElementById('statusDropdown');
    if(!dd) return;
    dd.classList.toggle('hide');
    // Cerrar al hacer click fuera
    if(!dd.classList.contains('hide')){
        setTimeout(() => {
            document.addEventListener('click', _closeStatusDropdown, { once: true });
        }, 10);
    }
}

function _closeStatusDropdown(e){
    const wrap = document.getElementById('statusBadgeWrap');
    if(wrap && wrap.contains(e.target)) return;
    const dd = document.getElementById('statusDropdown');
    if(dd) dd.classList.add('hide');
}

function setUserStatus(status){
    localStorage.setItem('fynderUserStatus', status);
    applyStatusUI(status);
    // Cerrar dropdown
    const dd = document.getElementById('statusDropdown');
    if(dd) dd.classList.add('hide');
    showToast(`Estado: ${STATUS_CONFIG[status]?.label || status}`);
}

function applyStatusUI(status){
    const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.active;

    // Badge en la cabecera
    const dot   = document.getElementById('statusDotBadge');
    const label = document.getElementById('profileStatusLabel');
    const badge = document.getElementById('profileStatusBadge');
    if(dot)   dot.style.color   = cfg.color;
    if(label) label.textContent = cfg.label;
    if(badge){
        badge.style.background = cfg.bg        || '#DCFCE7';
        badge.style.color      = cfg.textColor || '#16A34A';
    }

    // Dot en el título de la tarjeta
    const titleDot = document.getElementById('statusDotTitle');
    if(titleDot) titleDot.style.color = cfg.color;

    // Marcar la opción activa en la tarjeta de estado
    document.querySelectorAll('.status-option').forEach(btn => {
        btn.classList.toggle('status-option-active', btn.dataset.status === status);
    });

    // Marcar el item activo en el dropdown del badge
    document.querySelectorAll('.status-dropdown-item').forEach(btn => {
        const s = btn.getAttribute('onclick')?.match(/'(\w+)'/)?.[1];
        btn.style.fontWeight = s === status ? '700' : '';
        btn.style.background = s === status ? cfg.bg : '';
        btn.style.color      = s === status ? cfg.textColor : '';
    });
}

function updateBioCount(){
    const bio = document.getElementById("profileEditBio");
    const counter = document.getElementById("bioCount");
    if(bio && counter) counter.textContent = bio.value.length;
}

function saveProfile(event){
    event.preventDefault();
    const user = JSON.parse(localStorage.getItem("fynderUser"));
    if(!user) return;
    user.name  = document.getElementById("profileEditName").value.trim()  || user.name;
    user.email = document.getElementById("profileEditEmail").value.trim() || user.email;
    user.phone = document.getElementById("profileEditPhone").value.trim();
    user.city  = document.getElementById("profileEditCity")?.value.trim() || '';
    user.bio   = document.getElementById("profileEditBio")?.value.trim()  || '';
    localStorage.setItem("fynderUser", JSON.stringify(user));
    document.getElementById("userName").textContent = "Hola, " + user.name;
    _saveCurrentAccount();  // sincronizar cambios en la lista de cuentas
    showToast("¡Perfil actualizado correctamente! ✓");
    loadProfile();
}

function changePassword(event){
    event.preventDefault();
    const user        = JSON.parse(localStorage.getItem("fynderUser"));
    const current     = document.getElementById("currentPass").value;
    const newP        = document.getElementById("newPass").value;
    const confirmNewP = document.getElementById("confirmNewPass").value;
    if(!user) return;
    if(current !== user.pass){
        showToast("La contraseña actual no es correcta.", "error"); return;
    }
    if(newP !== confirmNewP){
        showToast("Las contraseñas nuevas no coinciden.", "error"); return;
    }
    if(newP.length < 6){
        showToast("La contraseña debe tener al menos 6 caracteres.", "error"); return;
    }
    user.pass = newP;
    localStorage.setItem("fynderUser", JSON.stringify(user));
    document.getElementById("passForm").reset();
    showToast("¡Contraseña actualizada correctamente! 🔐");
}

function deleteAccount(){
    if(!confirm("¿Seguro que deseas eliminar tu cuenta? Esta acción no se puede deshacer.")) return;
    const user = JSON.parse(localStorage.getItem("fynderUser") || 'null');
    // Eliminar del array de cuentas guardadas
    if(user){
        const accounts = _getSavedAccounts().filter(a => a.email !== user.email);
        _setSavedAccounts(accounts);
    }
    localStorage.removeItem("fynderUser");
    localStorage.removeItem("fynderLogged");
    _clearProfileVisualData();
    favorites.clear();
    localStorage.removeItem("fynderFavorites");
    document.getElementById("userName").textContent = "";
    updateNav();
    showToast("Cuenta eliminada. ¡Hasta pronto!");
    goPage("home");
}

function togglePassVisibility(inputId, btn){
    const input = document.getElementById(inputId);
    const icon  = btn.querySelector("i");
    if(input.type === "password"){
        input.type = "text";
        icon.classList.replace("fa-eye", "fa-eye-slash");
    }else{
        input.type = "password";
        icon.classList.replace("fa-eye-slash", "fa-eye");
    }
}

function showToast(msg, type = "success"){

