import template from './footer.html';
import './footer.css';

class AppFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = template;
    }
}

customElements.define('app-footer', AppFooter);
