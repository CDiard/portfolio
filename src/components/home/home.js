import template from './home.html';
import './home.css';

import '/src/components/svg/svg.js';

export default function Home() {
    const div = document.createElement('div');
    div.innerHTML = template;
    return div;
}