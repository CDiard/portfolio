import './experience.css';

import data from '/src/assets/data/experience-data.json';

class AppExperience extends HTMLElement {
    connectedCallback() {
        this.renderSlides();
    }

    renderSlides() {
        this.innerHTML = `
        <div class="d-flex flex-column gap-3">
            <h2 class="glow-effect m-0">Expériences</h2>
            <div class="grid-experience">
                ${data.map(item => `
                        <p class="date-resume glow-effect m-0"><strong>${item.date}</strong></p>
                        <p class="glow-effect m-0">${item.experience}</p>
                `).join('')}
            </div>
        </div>`;
    }
}

customElements.define('app-experience', AppExperience);
