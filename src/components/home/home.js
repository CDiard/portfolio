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
    const root = document.documentElement;

    const gradients = [
        { x: 45, y: 70, targetX: 45, targetY: 70, speed: 0.008 },
        { x: 85, y: 40, targetX: 85, targetY: 40, speed: 0.008 },
        { x: 20, y: 35, targetX: 20, targetY: 35, speed: 0.008 },
    ];

    function animateGradients() {
        gradients.forEach((g, i) => {
            // interpolation
            g.x += (g.targetX - g.x) * g.speed;
            g.y += (g.targetY - g.y) * g.speed;

            root.style.setProperty(`--x${i + 1}`, `${g.x.toFixed(2)}%`);
            root.style.setProperty(`--y${i + 1}`, `${g.y.toFixed(2)}%`);

            // Reverse when close to target
            if (Math.abs(g.x - g.targetX) < 1 && Math.abs(g.y - g.targetY) < 1) {
                const newTargetX = Math.random() * 100;
                const newTargetY = Math.random() * 100;
                g.targetX = newTargetX;
                g.targetY = newTargetY;
            }
        });

        requestAnimationFrame(animateGradients);
    }

    animateGradients();

    div.innerHTML = template;
    return div;
}