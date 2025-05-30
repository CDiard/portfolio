import template from './header.html';
import './header.css';

class AppHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = template;
    }
}

customElements.define('app-header', AppHeader);
