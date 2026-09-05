document.addEventListener("DOMContentLoaded", function () {

    const whatsappButton = document.createElement("a");

    whatsappButton.href = "https://wa.me/447861154960";
    whatsappButton.target = "_blank";
    whatsappButton.className = "whatsapp-button";

    whatsappButton.innerHTML = `
        <img src="images/whatsapp.png" alt="WhatsApp">
        <span class="whatsapp-text">WhatsApp Us</span>
    `;

    document.body.appendChild(whatsappButton);

});