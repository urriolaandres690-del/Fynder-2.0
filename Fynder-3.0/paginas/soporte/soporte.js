// ── soporte.js ──

function sendSupport(event) {
    event.preventDefault();
    const name    = document.getElementById("supportName").value.trim();
    const email   = document.getElementById("supportEmail").value.trim();
    const subject = document.getElementById("supportSubject").value;
    const msg     = document.getElementById("supportMsg").value.trim();
    if (!name || !email || !subject || !msg) return;
    // Demo: guardar en localStorage
    const tickets = JSON.parse(localStorage.getItem("fynderSupportTickets") || "[]");
    tickets.push({ name, email, subject, msg, date: new Date().toISOString() });
    localStorage.setItem("fynderSupportTickets", JSON.stringify(tickets));
    document.getElementById("supportForm").reset();
    showToast("¡Mensaje enviado! Te responderemos en menos de 24 horas 💬");
}
