import template from './contact.html';
import './contact.css';

class AppContact extends HTMLElement {
    connectedCallback() {
        this.innerHTML = template;
    }
}

customElements.define('app-contact', AppContact);
