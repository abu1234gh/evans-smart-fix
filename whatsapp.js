document.addEventListener("DOMContentLoaded", function () {
    const whatsappButton = document.createElement("a");

    whatsappButton.href = "https://wa.me/447861154960";
    whatsappButton.target = "_blank";
    whatsappButton.className = "whatsapp-button";

    whatsappButton.innerHTML = `
        <span>💬</span>
        WhatsApp Us
    `;

    document.body.appendChild(whatsappButton);
});
