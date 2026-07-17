/**
 * ═══════════════════════════════════════════════════════════════
 *  Fynder — JS de: login
 *  Extraído de fynder.js
 *
 *  Las funciones GLOBALES (goPage, toggleFav, showToast, etc.)
 *  están en shared/fynder.js — este archivo contiene solo
 *  las funciones específicas de esta sección.
 * ═══════════════════════════════════════════════════════════════
 */

function loginUser(event){
    event.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const pass  = document.getElementById("loginPass").value;

    // Buscar en el array de todas las cuentas registradas
    const accounts = _getSavedAccounts();
    const acc = accounts.find(a => a.email === email);

    // Compatibilidad: también revisar fynderUser si todavía no hay accounts
    const legacyUser = JSON.parse(localStorage.getItem("fynderUser") || 'null');

    const matchedAcc  = acc && acc.pass === pass ? acc : null;
    const matchedLegacy = !matchedAcc && legacyUser && legacyUser.email === email && legacyUser.pass === pass ? legacyUser : null;

    if(!matchedAcc && !matchedLegacy){
        if(accounts.length === 0 && !legacyUser){
            showToast("No existe ninguna cuenta registrada. Crea una primero.", "error");
        } else {
            showToast("Correo o contraseña incorrectos.", "error");
        }
        return;
    }

    const user = matchedAcc
        ? { name: matchedAcc.name, email: matchedAcc.email, pass: matchedAcc.pass,
            city: matchedAcc.city || '', bio: matchedAcc.bio || '', phone: matchedAcc.phone || '' }
        : legacyUser;

    // Guardar estado de la cuenta anterior y limpiar datos visuales
    _saveCurrentAccount();
    _clearProfileVisualData();

    // Restaurar datos de esta cuenta
    localStorage.setItem("fynderUser", JSON.stringify(user));
    localStorage.setItem("fynderLogged", "true");
    localStorage.setItem("fynderUserStatus", "active");

    // Restaurar avatar/portada de esta cuenta si existen
    if(matchedAcc){
        if(matchedAcc.avatarPhoto)  localStorage.setItem('fynderAvatarPhoto',     matchedAcc.avatarPhoto);
        if(matchedAcc.avatarPreset) localStorage.setItem('fynderAvatarPreset',    matchedAcc.avatarPreset);
        if(matchedAcc.avatarInitBg) localStorage.setItem('fynderAvatarInitialBg', matchedAcc.avatarInitBg);
        if(matchedAcc.coverPhoto)   localStorage.setItem('fynderCoverPhoto',      matchedAcc.coverPhoto);

        // Restaurar favoritos de esta cuenta
        if(matchedAcc.favorites){
            const favArr = JSON.parse(matchedAcc.favorites || '[]');
            favorites.clear();
            favArr.forEach(id => favorites.add(id));
            localStorage.setItem('fynderFavorites', matchedAcc.favorites);
        }
    }

    document.getElementById("userName").textContent = "Hola, " + user.name;
    _saveCurrentAccount();
    localStorage.removeItem('fynderAddingAccount');
    // Siempre arrancar en modo claro al iniciar sesión
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('fynderTheme', 'light');
    updateNav();
    showToast("¡Bienvenido de nuevo, " + user.name + "!");
    goPage("home");
}

function forgotPassword(){
    const email = prompt("Ingresa tu correo electrónico para recuperar tu contraseña:");
    if(!email) return;

    const user = JSON.parse(localStorage.getItem("fynderUser"));

    if(!user){
        showToast("No existe ninguna cuenta registrada.", "error");
        return;
    }

    if(email.trim() === user.email){
        showToast("Tu contraseña es: " + user.pass);
    }else{
        showToast("No se encontró ninguna cuenta con ese correo.", "error");
    }
}

// logout() definido más abajo (línea ~3114) — esta referencia se elimina para evitar sobreescritura

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
        eBio.oninput = updateBioCount;
    }

    // Estadísticas
    const sf = document.getElementById("statFavs");
    const sb = document.getElementById("statBiz");
    if(sf) sf.textContent = favorites.size;
    if(sb) sb.textContent = JSON.parse(localStorage.getItem("fynderBusinesses")||"[]").length;

    hideAvatarOptions();
}
