/* ── login.js — Lógica de Login ── */

function loginUser(event){
  event.preventDefault();
  const email = document.getElementById("loginEmail").value.trim();
  const pass  = document.getElementById("loginPass").value;
  const accounts = _getSavedAccounts();
  const acc = accounts.find(a => a.email === email);
  const legacyUser = JSON.parse(localStorage.getItem("fynderUser") || 'null');
  const matchedAcc    = acc && acc.pass === pass ? acc : null;
  const matchedLegacy = !matchedAcc && legacyUser && legacyUser.email === email && legacyUser.pass === pass ? legacyUser : null;
  if(!matchedAcc && !matchedLegacy){
    showToast(accounts.length === 0 && !legacyUser ? "No existe ninguna cuenta registrada." : "Correo o contraseña incorrectos.", "error");
    return;
  }
  const user = matchedAcc
    ? { name:matchedAcc.name, email:matchedAcc.email, pass:matchedAcc.pass, city:matchedAcc.city||'', bio:matchedAcc.bio||'', phone:matchedAcc.phone||'' }
    : legacyUser;
  _saveCurrentAccount();
  _clearProfileVisualData();
  localStorage.setItem("fynderUser", JSON.stringify(user));
  localStorage.setItem("fynderLogged", "true");
  localStorage.setItem("fynderUserStatus", "active");
  if(matchedAcc){
    if(matchedAcc.avatarPhoto)  localStorage.setItem('fynderAvatarPhoto', matchedAcc.avatarPhoto);
    if(matchedAcc.avatarPreset) localStorage.setItem('fynderAvatarPreset', matchedAcc.avatarPreset);
    if(matchedAcc.avatarInitBg) localStorage.setItem('fynderAvatarInitialBg', matchedAcc.avatarInitBg);
    if(matchedAcc.coverPhoto)   localStorage.setItem('fynderCoverPhoto', matchedAcc.coverPhoto);
    if(matchedAcc.favorites){
      const favArr = JSON.parse(matchedAcc.favorites || '[]');
      favorites.clear();
      favArr.forEach(id => favorites.add(id));
      localStorage.setItem('fynderFavorites', matchedAcc.favorites);
    }
  }
  const uname = document.getElementById("userName");
  if(uname) uname.textContent = "Hola, " + user.name;
  _saveCurrentAccount();
  localStorage.removeItem('fynderAddingAccount');
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
  if(!user){ showToast("No existe ninguna cuenta registrada.", "error"); return; }
  if(email.trim() === user.email) showToast("Tu contraseña es: " + user.pass);
  else showToast("No se encontró ninguna cuenta con ese correo.", "error");
}

function togglePassVisibility(inputId, btn){
  const input = document.getElementById(inputId);
  const icon  = btn.querySelector("i");
  if(input.type === "password"){
    input.type = "text";
    if(icon) icon.classList.replace("fa-eye", "fa-eye-slash");
  } else {
    input.type = "password";
    if(icon) icon.classList.replace("fa-eye-slash", "fa-eye");
  }
}
