/* ── registro.js — Lógica de Registro de usuario ── */

function registerUser(event){
  event.preventDefault();
  const name  = document.getElementById("regName").value.trim();
  const email = document.getElementById("regEmail").value.trim();
  const phone = document.getElementById("regPhone").value.trim();
  const pass  = document.getElementById("regPass").value;
  const pass2 = document.getElementById("regPass2").value;
  const passLengthErr = document.getElementById("passLengthError");
  const passMatchErr  = document.getElementById("passError");

  if(pass.length < 6){
    if(passLengthErr) passLengthErr.classList.remove("hide");
    document.getElementById("regPass").focus();
    return;
  }
  if(passLengthErr) passLengthErr.classList.add("hide");

  if(pass !== pass2){
    if(passMatchErr) passMatchErr.classList.remove("hide");
    document.getElementById("regPass2").focus();
    return;
  }
  if(passMatchErr) passMatchErr.classList.add("hide");

  const accounts = _getSavedAccounts();
  if(accounts.find(a => a.email === email)){
    showToast("Ya existe una cuenta con ese correo. Inicia sesión.", "error");
    goPage("login");
    return;
  }

  _saveCurrentAccount();
  _clearProfileVisualData();

  const user = { name, email, phone, pass };
  localStorage.setItem("fynderUser", JSON.stringify(user));
  localStorage.setItem("fynderLogged", "true");
  localStorage.setItem("fynderUserStatus", "active");
  const uname = document.getElementById("userName");
  if(uname) uname.textContent = "Hola, " + name;
  _saveCurrentAccount();
  localStorage.removeItem('fynderAddingAccount');
  document.documentElement.setAttribute('data-theme', 'light');
  localStorage.setItem('fynderTheme', 'light');
  updateNav();
  showToast("¡Cuenta creada! Bienvenido a FYNDER, " + name + " 🎉");
  goPage("home");
}
