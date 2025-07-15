import './training.css';

import data from '/src/assets/data/training-data.json';

class AppTraining extends HTMLElement {
    connectedCallback() {
        this.renderSlides();
    }

    renderSlides() {
        this.innerHTML = `
        <div class="d-flex flex-column gap-3">
            <h2 class="m-0">Formations</h2>
            <div class="container-resume d-flex flex-column gap-2">
                ${data.map(item => `
                    <div class="d-flex flex-row gap-3">
                        <p class="date-resume m-0"><strong>${item.date}</strong></p>
                        <p class="text-resume m-0">${item.training}</p>
                    </div>
                `).join('')}
            </div>
        </div>`;
    }
}

customElements.define('app-training', AppTraining);
