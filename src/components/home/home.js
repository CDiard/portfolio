import template from './home.html';
import './home.css';

import '/src/components/svg/svg.js';
import '/src/components/swiper/swiper.js';
import '/src/components/training/training.js';
import '/src/components/experience/experience.js';
import '/src/components/skill/skill.js';
import '/src/components/contact/contact.js';

export default function Home() {
    const div = document.createElement('div');
    div.innerHTML = template;
    return div;
}