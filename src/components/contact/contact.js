import template from './contact.html';
import './contact.css';

class AppContact extends HTMLElement {
    connectedCallback() {
        this.innerHTML = template;

        document.getElementById("contactForm").addEventListener("submit", async function(e) {
            e.preventDefault();

            const form = e.target;
            const formData = new FormData(form);
            const fields = ["firstname", "lastname", "email", "subject", "message"];
            const responseMessage = document.getElementById("responseMessage");

            // Réinitialiser les messages
            document.querySelectorAll(".error-message").forEach(el => el.textContent = "");
            responseMessage.textContent = "";

            let hasError = false;

            // Vérification manuelle des champs
            for (const name of fields) {
                const input = form.elements[name];
                const errorField = input.parentElement.querySelector(".error-message");

                if (!input.value.trim()) {
                    errorField.textContent = "Ce champ est requis.";
                    hasError = true;
                    continue;
                }

                if (name === "email" && !/^\S+@\S+\.\S+$/.test(input.value)) {
                    errorField.textContent = "Email invalide.";
                    hasError = true;
                }
            }

            if (hasError) return;

            try {
                const res = await fetch("/sendMail.php", {
                    method: "POST",
                    body: formData
                });

                responseMessage.textContent = await res.text();

                if (res.ok) {
                    form.reset(); // vider le formulaire
                }
            } catch (err) {
                responseMessage.textContent = "Une erreur est survenue lors de l'envoi.";
                responseMessage.style.color = "red";
            }
        });
    }
}

customElements.define('app-contact', AppContact);
