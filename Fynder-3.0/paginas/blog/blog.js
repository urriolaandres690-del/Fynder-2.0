// ── blog.js ──

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
