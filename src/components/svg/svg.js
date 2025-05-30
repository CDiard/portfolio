import callIcon from '/src/assets/images/svg/call.svg';
import githubIcon from '/src/assets/images/svg/github.svg';
import linkedinIcon from '/src/assets/images/svg/linkedin.svg';
import mailIcon from '/src/assets/images/svg/mail.svg';
import addIcon from '/src/assets/images/svg/add.svg';
import arrowRightIcon from '/src/assets/images/svg/arrow_right.svg';
import downloadIcon from '/src/assets/images/svg/download.svg';
import homeIcon from '/src/assets/images/svg/home.svg';
import sendIcon from '/src/assets/images/svg/send.svg';

const icons = {
    call: callIcon,
    github: githubIcon,
    linkedin: linkedinIcon,
    mail: mailIcon,
    add: addIcon,
    arrow_right: arrowRightIcon,
    download: downloadIcon,
    home: homeIcon,
    send: sendIcon,
};

class AppSvg extends HTMLElement {
    connectedCallback() {
        const name = this.getAttribute('icon');
        const svg = icons[name];

        if (!svg) {
            console.warn(`Icône "${name}" introuvable`);
            return;
        }

        this.innerHTML = svg;
    }
}

customElements.define('app-svg', AppSvg);