// ── registro.js ──

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
