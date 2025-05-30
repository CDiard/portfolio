import template from './home.html';
import './home.css';

export default function Home() {
    const div = document.createElement('div');
    div.innerHTML = template;
    return div;
}