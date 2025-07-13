import './skill.css';

import data from '/src/assets/data/skill-data.json';

class AppSkill extends HTMLElement {
    connectedCallback() {
        this.renderSlides();
    }

    renderSlides() {
        this.innerHTML = `
        <div class="d-flex flex-column gap-3">
            <h2 class="m-0">Compétences</h2>
            ${data.map(item => `
                <div class="category-skills d-flex flex-column gap-2 p-2">
                    <p class="m-0"><strong>${item.title}</strong></p>
                    <div class="d-flex flex-row flex-wrap gap-2">
                        ${item.skills.map(skill => `
                            <p class="element-skills m-0">${skill}</p>
                        `).join('')}
                    </div>
                </div>
            `).join('')}
        </div>`;
    }
}

customElements.define('app-skill', AppSkill);
