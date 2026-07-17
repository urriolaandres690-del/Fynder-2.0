function registerBusiness(event) {
    event.preventDefault();

    const name      = document.getElementById("bizName").value.trim();
    const category  = document.getElementById("bizCategory").value;
    const desc      = document.getElementById("bizDesc").value.trim();
    const address   = document.getElementById("bizAddress").value.trim();
    const phone     = document.getElementById("bizPhone").value.trim();
    const hours     = document.getElementById("bizHours").value.trim();
    const website   = document.getElementById("bizWebsite").value.trim();
    const instagram = document.getElementById("bizInstagram").value.trim();
    const facebook  = document.getElementById("bizFacebook").value.trim();

    const business = { name, category, desc, address, phone, hours, website, instagram, facebook };

    // Guardar en localStorage (demo)
    const saved = JSON.parse(localStorage.getItem("fynderBusinesses") || "[]");
    saved.push(business);
    localStorage.setItem("fynderBusinesses", JSON.stringify(saved));

    showToast("¡Negocio publicado exitosamente! 🚀 Ya está visible en el directorio.");
    document.getElementById("businessForm").reset();
    goPage("home");
}

function subscribeBlog(event) {
    event.preventDefault();
    const email = document.getElementById("blogEmail")?.value?.trim();
    if (!email) return;
    showToast("¡Suscripción confirmada! Te notificaremos de nuevos artículos. 📬");
    if (document.getElementById("blogEmail")) document.getElementById("blogEmail").value = "";
}

