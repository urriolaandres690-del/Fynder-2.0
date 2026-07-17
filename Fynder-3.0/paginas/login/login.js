(function(){
function registerUser(event){
    event.preventDefault();

    const name  = document.getElementById("regName").value.trim();
    const email = document.getElementById("regEmail").value.trim();
    const phone = document.getElementById("regPhone").value.trim();
    const pass  = document.getElementById("regPass").value;
    const pass2 = document.getElementById("regPass2").value;
    const passError = document.getElementById("passError");

    // Validar mínimo 6 caracteres
    if(pass.length < 6){
        document.getElementById("passLengthError").classList.remove("hide");
        document.getElementById("regPass").focus();
        return;
    }
    document.getElementById("passLengthError").classList.add("hide");

    // Validar que las contraseñas coincidan
    if(pass !== pass2){
        passError.classList.remove("hide");
        document.getElementById("regPass2").focus();
        return;
    }
    passError.classList.add("hide");

    // Verificar si ya existe una cuenta con ese email
    const accounts = _getSavedAccounts();
    if(accounts.find(a => a.email === email)){
        showToast("Ya existe una cuenta con ese correo. Inicia sesión.", "error");
        goPage("login");
        return;
    }

    const user = { name, email, phone, pass };

    // Guardar estado de la cuenta actual antes de cambiar (si había sesión)
    _saveCurrentAccount();

    // Limpiar datos de perfil visual del usuario anterior
    _clearProfileVisualData();

    localStorage.setItem("fynderUser", JSON.stringify(user));
    localStorage.setItem("fynderLogged", "true");
    localStorage.setItem("fynderUserStatus", "active");
    document.getElementById("userName").textContent = "Hola, " + name;
    _saveCurrentAccount();  // guardar la nueva cuenta en la lista
    localStorage.removeItem('fynderAddingAccount');
    // Siempre arrancar en modo claro al registrarse
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('fynderTheme', 'light');
    updateNav();
    showToast("¡Cuenta creada! Bienvenido a FYNDER, " + name + " 🎉");
    goPage("home");
}

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
})();